import express from 'express';
import { chatCoach, generateWorkout, predictGoal } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', chatCoach);
router.post('/workout-generator', generateWorkout);
router.post('/predict', predictGoal);

export default router;
