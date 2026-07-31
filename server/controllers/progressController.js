import Progress from '../models/Progress.js';
import User from '../models/User.js';

// @desc    Get logged in user's progress
// @route   GET /api/progress
// @access  Private
export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user._id }).sort({ date: 1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add a new progress log
// @route   POST /api/progress
// @access  Private
export const addProgress = async (req, res) => {
  try {
    const { weight, bodyFat, date } = req.body;

    // Calculate BMI
    const user = req.user;
    const heightInMeters = user.height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    const progress = new Progress({
      userId: req.user._id,
      weight,
      bodyFat,
      bmi: Number(bmi.toFixed(1)),
      date: date || Date.now()
    });

    const createdProgress = await progress.save();

    // Also update the user's current weight
    user.weight = weight;
    await user.save();

    res.status(201).json(createdProgress);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
