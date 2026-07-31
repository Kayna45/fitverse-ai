import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseName: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    required: true // in minutes
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
