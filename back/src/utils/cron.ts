import cron from 'node-cron';
import { addPlaylistsToFirebase } from '../services/playlist-service';

export const cronSchedule = () => {
  const schedule = '06 0 * * *';

  cron.schedule(schedule, async () => {
    await addPlaylistsToFirebase();
  });

  const [minute, hour] = schedule.split(' ');
  console.log(`🕑 Cron job scheduled to run every day at ${hour}:${minute}`);
};
