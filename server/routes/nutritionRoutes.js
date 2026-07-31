import express from 'express';
import { getNutrition, addNutrition } from '../controllers/nutritionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getNutrition)
  .post(protect, addNutrition);

export default router;
