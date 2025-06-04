import { Timestamp } from 'firebase-admin/firestore';
import { db } from '../config/firebase';
import { UserScore } from '../types/trivia-types';

export const ensureUserExists = async (userId: string): Promise<void> => {
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    await userRef.set({
      id: userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } else {
    await userRef.update({
      lastLogin: Timestamp.now(),
    });
  }
};

export const updateUserScore = async (
  userId: string,
  playlistId: number,
  newScore: number
): Promise<UserScore> => {
  const scoreRef = db
    .collection('user_scores')
    .doc(userId)
    .collection('playlists')
    .doc(String(playlistId));

  const scoreDoc = await scoreRef.get();
  const now = Timestamp.now();

  if (!scoreDoc.exists) {
    const newUserScore: UserScore = {
      userId,
      playlistId,
      highestScore: newScore,
      lastPlayed: now,
      playCount: 1,
    };

    await scoreRef.set({
      userId: newUserScore.userId,
      playlistId: newUserScore.playlistId,
      highestScore: newUserScore.highestScore,
      lastPlayed: newUserScore.lastPlayed,
      playCount: newUserScore.playCount,
    });

    return newUserScore;
  }

  const currentScore = scoreDoc.data() as UserScore;

  const updated: UserScore = {
    userId,
    playlistId,
    highestScore: Math.max(currentScore.highestScore, newScore),
    lastPlayed: now,
    playCount: Number(currentScore.playCount) + 1 || 1,
  };

  await scoreRef.update({
    highestScore: updated.highestScore,
    lastPlayed: updated.lastPlayed,
    playCount: updated.playCount,
  });

  return updated;
};

export const getScoreUser = async (
  userId: string,
  playlistId: string
): Promise<UserScore | null> => {
  const scoreRef = db.collection('user_scores').doc(userId).collection('playlists').doc(playlistId);

  const scoreDoc = await scoreRef.get();
  return scoreDoc.exists ? (scoreDoc.data() as UserScore) : null;
};
