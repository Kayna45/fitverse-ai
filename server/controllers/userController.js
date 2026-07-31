import User from '../models/User.js';
import { calculateFitnessMetrics } from '../utils/fitnessUtils.js';

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile / complete onboarding
// @route   PUT /api/user/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.gender = req.body.gender || user.gender;

      const fitnessInputs = {
        age: req.body.age !== undefined ? req.body.age : user.age,
        gender: req.body.gender || user.gender,
        height: req.body.height !== undefined ? req.body.height : user.height,
        weight: req.body.weight !== undefined ? req.body.weight : user.weight,
        targetWeight: req.body.targetWeight !== undefined ? req.body.targetWeight : user.targetWeight,
        activityLevel: req.body.activityLevel || user.activityLevel,
        goal: req.body.goal || user.goal
      };

      // Recalculate metrics
      const computedMetrics = calculateFitnessMetrics(fitnessInputs);

      user.age = computedMetrics.age;
      user.height = computedMetrics.height;
      user.weight = computedMetrics.weight;
      user.targetWeight = computedMetrics.targetWeight;
      user.activityLevel = computedMetrics.activityLevel;
      user.goal = computedMetrics.goal;
      user.bmi = computedMetrics.bmi;
      user.caloriesGoal = req.body.caloriesGoal || computedMetrics.caloriesGoal;
      user.proteinGoal = req.body.proteinGoal || computedMetrics.proteinGoal;
      user.waterGoal = req.body.waterGoal || computedMetrics.waterGoal;
      
      if (req.body.onboarded !== undefined) {
        user.onboarded = req.body.onboarded;
      } else {
        user.onboarded = true;
      }

      // Update Gamification if sent
      if (req.body.xp !== undefined) user.xp = req.body.xp;
      if (req.body.level !== undefined) user.level = req.body.level;
      if (req.body.streak !== undefined) user.streak = req.body.streak;
      
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
