import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req) => {
    if (req.path.startsWith('/trivia/game')) {
      return 50;
    }

    if (req.path.startsWith('/trivia/playlist')) {
      return 100;
    }
    
    return 1000;
  },
  message: 'Too many requests, please try again later.',
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
});
