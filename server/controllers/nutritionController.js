import Nutrition from '../models/Nutrition.js';

// @desc    Get logged in user's nutrition log
// @route   GET /api/nutrition
// @access  Private
export const getNutrition = async (req, res) => {
  try {
    const nutrition = await Nutrition.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(nutrition);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add a new nutrition log
// @route   POST /api/nutrition
// @access  Private
export const addNutrition = async (req, res) => {
  try {
    const { food, protein, carbs, fat, calories, mealType, date } = req.body;

    const nutrition = new Nutrition({
      userId: req.user._id,
      food,
      protein,
      carbs,
      fat,
      calories,
      mealType,
      date: date || Date.now()
    });

    const createdNutrition = await nutrition.save();
    res.status(201).json(createdNutrition);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
