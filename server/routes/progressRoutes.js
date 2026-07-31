import express from 'express';
import { getProgress, addProgress } from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getProgress)
  .post(protect, addProgress);

export default router;
