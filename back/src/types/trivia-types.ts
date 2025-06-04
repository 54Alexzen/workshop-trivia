import { Timestamp } from 'firebase-admin/firestore';

export interface TriviaOption {
  id: number;
  text: string;
}

export interface TriviaQuestion {
  trackId: number;
  previewUrl: string;
  options: TriviaOption[];
}

export interface TriviaAnswer {
  questionId: number;
  selectedOptionId: number;
}

export interface TriviaScoreResult {
  score: number;
  correctAnswers: number;
}

export interface TriviaSession {
  sessionId: string;
  userId: string;
  playlistId: number;
  isComplete: boolean;
  isActive: boolean;
  createdAt: Timestamp;
  expiresAt: Timestamp;
  finishedAt?: Timestamp;
  score: number;
  questions: TriviaQuestion[];
  answers: TriviaAnswer[];
}

export interface UserScore {
  userId: string;
  playlistId: number;
  highestScore: number;
  lastPlayed: Timestamp;
  playCount: number;
}
