import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  food: {
    type: String,
    required: true
  },
  protein: {
    type: Number,
    required: true // in grams
  },
  carbs: {
    type: Number,
    required: true // in grams
  },
  fat: {
    type: Number,
    required: true // in grams
  },
  calories: {
    type: Number,
    required: true
  },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Nutrition || mongoose.model('Nutrition', nutritionSchema);
