import { Router } from 'express';
import { startTrivia, resumeTrivia, submitAnswer } from '../controllers/trivia-controller';
import { validateSchema } from '../middlewares/validate-schema';
import { startTriviaSchema, submitAnswerSchema } from '../schemas/trivia-schema';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.post('/start', authenticate, validateSchema({ body: startTriviaSchema }), startTrivia);
router.post('/answer', authenticate, validateSchema({ body: submitAnswerSchema }), submitAnswer);
router.get('/resume', authenticate, resumeTrivia);

export default router;
