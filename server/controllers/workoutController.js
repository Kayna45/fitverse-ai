import Workout from '../models/Workout.js';

// @desc    Get logged in user's workouts
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add a new workout
// @route   POST /api/workouts
// @access  Private
export const addWorkout = async (req, res) => {
  try {
    const { exerciseName, sets, reps, duration, caloriesBurned, date } = req.body;

    const workout = new Workout({
      userId: req.user._id,
      exerciseName,
      sets,
      reps,
      duration,
      caloriesBurned: caloriesBurned || 0,
      date: date || Date.now()
    });

    const createdWorkout = await workout.save();

    // Optionally increment user XP here
    // req.user.xp += 10;
    // await req.user.save();

    res.status(201).json(createdWorkout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
