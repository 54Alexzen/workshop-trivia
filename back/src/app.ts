import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/cors';
import { limiter } from './middlewares/rate-limit';
import playlistRouter from './routes/playlist-routes';
import gameRouter from './routes/trivia-routes';

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

app.use('/trivia/playlist', playlistRouter);
app.use('/trivia/game', gameRouter);

app.get('/', (req, res) => {
  res.json({
    message: '🚀🎵 Musical Trivia API running successfully.',
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: '🚫 404 Not Found. The requested resource does not exist.',
  });
});

export default app;
