import { Request, Response } from 'express';
import { ensureUserExists } from '../services/user-service';
import {
  calculateTriviaScore,
  completeTriviaSession,
  createTriviaSession,
  generateTriviaQuestions,
  getActiveSession,
  getSessionData,
  saveUserAnswer,
} from '../services/trivia-service';

export const startTrivia = async (req: Request, res: Response) => {
  try {
    const { playlistId } = req.body;
    const userId = req.user?.uid;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    await ensureUserExists(userId);
    const activeSession = await getActiveSession(userId);
    if (activeSession) {
      res.status(400).json({
        success: false,
        message: 'You already have an active trivia session. Please complete it first.',
      });
      return;
    }

    const questions = await generateTriviaQuestions(String(playlistId));
    const sessionId = await createTriviaSession(userId, playlistId, questions);

    res.status(200).json({
      success: true,
      data: {
        sessionId,
        playlistId,
        totalQuestions: questions.length,
        questions: questions.map((q) => ({
          trackId: q.trackId,
          previewUrl: q.previewUrl,
          options: q.options,
        })),
      },
    });
  } catch (error) {
    console.error('[StartTrivia] Error:', error);
    res.status(500).json({ success: false, message: 'Error starting trivia' });
  }
};

export const resumeTrivia = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const session = await getActiveSession(userId);
    if (!session) {
      res.status(404).json({ success: false, message: 'No active session found' });
      return;
    }

    const sessionData = await getSessionData(userId, session.id);
    if (!sessionData) {
      res.status(404).json({ success: false, message: 'Session data not found or expired' });
      return;
    }
    const { score, correctAnswers } = calculateTriviaScore(sessionData?.answers || []);
    res.status(200).json({
      success: true,
      data: {
        currentScore: score,
        correctAnswers,
        ...sessionData,
      },
    });
  } catch (error) {
    console.error('[ResumeTrivia] Error:', error);
    res.status(500).json({ success: false, message: 'Failed to resume trivia session' });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.uid;
    const { sessionId, answer } = req.body;

    if (!userId) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const session = await getSessionData(userId, sessionId);
    if (!session) {
      res.status(404).json({ success: false, message: 'Session not found or expired' });
      return;
    }

    await saveUserAnswer(userId, sessionId, answer);

    const updatedSession = await getSessionData(userId, sessionId);
    if (!updatedSession) {
      res.status(404).json({ success: false, message: 'Session not found after saving answer' });
      return;
    }

    const { score, correctAnswers } = calculateTriviaScore(updatedSession.answers || []);
    const totalQuestions = updatedSession.questions.length;
    const answeredQuestions = updatedSession.answers.length;

    if (answeredQuestions >= totalQuestions) {
      const userScore = await completeTriviaSession(
        userId,
        sessionId,
        updatedSession.playlistId,
        score
      );
      res.status(200).json({
        success: true,
        data: {
          isComplete: true,
          score,
          correctAnswers,
          totalQuestions,
          isNewHighScore: userScore.highestScore === score,
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        isComplete: false,
        currentScore: score,
        correctAnswers,
        answeredQuestions,
        totalQuestions,
      },
    });
  } catch (error) {
    console.error('[SubmitTrivia] Error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit trivia' });
  }
};
