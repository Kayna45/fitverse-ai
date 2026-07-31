import express from 'express';
import { getWorkouts, addWorkout } from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getWorkouts)
  .post(protect, addWorkout);

export default router;
