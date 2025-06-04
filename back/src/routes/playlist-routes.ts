import { Router } from 'express';
import { getPlaylists } from '../controllers/playlist-controller';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.get('/', authenticate, getPlaylists);

export default router;
