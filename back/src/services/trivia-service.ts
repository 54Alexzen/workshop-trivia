import { db } from '../config/firebase';
import { Timestamp } from 'firebase-admin/firestore';
import {
  TriviaAnswer,
  TriviaQuestion,
  TriviaScoreResult,
  TriviaSession,
  UserScore,
} from '../types/trivia-types';
import { shuffleArray } from '../utils/shuffle-array';
import { updateUserScore } from './user-service';

export const generateTriviaQuestions = async (
  playlistId: string,
  questionCount: number = 10,
  optionsCount: number = 4
): Promise<TriviaQuestion[]> => {
  const playlistRef = db.collection('playlists').doc(playlistId);
  const playlistDoc = await playlistRef.get();

  if (!playlistDoc.exists) {
    throw new Error('Playlist not found.');
  }

  const tracksSnapshot = await playlistRef.collection('tracks').get();
  const tracks = tracksSnapshot.docs.map((doc) => doc.data());

  if (tracks.length < optionsCount) {
    throw new Error(
      `Playlist must have at least ${optionsCount} tracks to generate trivia questions.`
    );
  }

  const selectedTracks = shuffleArray([...tracks]).slice(0, questionCount);
  const questions = selectedTracks.map((track) => {
    const incorrectOptions = shuffleArray(tracks.filter((t) => t.id !== track.id)).slice(
      0,
      optionsCount - 1
    );

    const allOptions = [
      { id: track.id, text: `${track.title} - ${track.artist.name}` },
      ...incorrectOptions.map((t) => ({
        id: t.id,
        text: `${t.title} - ${t.artist.name}`,
      })),
    ];

    return {
      trackId: track.id,
      previewUrl: track.preview,
      options: shuffleArray(allOptions),
    };
  });

  return questions;
};

export const createTriviaSession = async (
  userId: string,
  playlistId: number,
  questions: TriviaQuestion[]
): Promise<string> => {
  const activeSession = await getActiveSession(userId);
  if (activeSession) throw new Error('An active trivia session already exists for this user.');

  const now = Timestamp.now();
  const totalDuration = questions.length * 30 * 1000;
  const expiresAt = Timestamp.fromMillis(now.toMillis() + totalDuration);

  const sessionRef = db.collection('user_scores').doc(userId).collection('sessions').doc();

  await sessionRef.set({
    sessionId: sessionRef.id,
    playlistId,
    userId,
    isComplete: false,
    isActive: true,
    createdAt: now,
    expiresAt,
    score: 0,
    questions,
    answers: [],
  });

  return sessionRef.id;
};

export const getActiveSession = async (userId: string) => {
  const session = await db
    .collection('user_scores')
    .doc(userId)
    .collection('sessions')
    .where('isActive', '==', true)
    .where('isComplete', '==', false)
    .limit(1)
    .get();

  return session.docs[0] || null;
};

export const getSessionData = async (userId: string, sessionId: string) => {
  const sessionRef = db.collection('user_scores').doc(userId).collection('sessions').doc(sessionId);
  const sessionDoc = await sessionRef.get();

  if (!sessionDoc.exists) return null;

  const session = sessionDoc.data() as TriviaSession;

  if (isExpiredSession(session)) {
    await sessionRef.update({ isActive: false, isComplete: true, expired: true });
    return null;
  }

  return {
    sessionId: session.sessionId,
    playlistId: session.playlistId,
    questions: session.questions,
    answers: session.answers || [],
  };
};

const isExpiredSession = (session: TriviaSession): boolean => {
  return session.expiresAt.toMillis() < Date.now();
};

export const saveUserAnswer = async (
  userId: string,
  sessionId: string,
  answer: TriviaAnswer
): Promise<void> => {
  const sessionRef = db.collection('user_scores').doc(userId).collection('sessions').doc(sessionId);
  const sessionDoc = await sessionRef.get();

  if (!sessionDoc.exists) throw new Error('Session not found');

  const session = sessionDoc.data() as TriviaSession;
  const updatedAnswers = Array.isArray(session.answers) ? [...session.answers] : [];

  const existingIndex = updatedAnswers.findIndex((a) => a.questionId === answer.questionId);
  if (existingIndex !== -1) {
    updatedAnswers[existingIndex] = answer;
  } else {
    updatedAnswers.push(answer);
  }

  await sessionRef.update({ answers: updatedAnswers });
};

export const calculateTriviaScore = (answers: TriviaAnswer[]): TriviaScoreResult => {
  const correctAnswers = answers.filter(
    (answer) => answer.selectedOptionId === answer.questionId
  ).length;

  return {
    score: correctAnswers * 100,
    correctAnswers,
  };
};

export const completeTriviaSession = async (
  userId: string,
  sessionId: string,
  playlistId: number,
  newScore: number
): Promise<UserScore> => {
  const sessionRef = db.collection('user_scores').doc(userId).collection('sessions').doc(sessionId);

  await sessionRef.update({
    isComplete: true,
    isActive: false,
    finishedAt: Timestamp.now(),
    score: newScore,
  });

  return updateUserScore(userId, playlistId, newScore);
};
