import { z } from 'zod';

export const startTriviaSchema = z.object({
  playlistId: z.number().min(1, 'Playlist ID is required'),
});

export const submitAnswerSchema = z.object({
  sessionId: z.string().min(1),
  answer: z.object({
    questionId: z.number().min(1),
    selectedOptionId: z.number().min(1),
  }),
});
