import app from './app';
import { PORT } from './config/environments';
import { cronSchedule } from './utils/cron';

cronSchedule();

app.listen(PORT, () => {
  console.log(`🎵 Trivia Musical API ejecutándose en http://localhost:${PORT}`);
  console.log('✨ ¡Servidor listo para adivinar artistas!');
});
