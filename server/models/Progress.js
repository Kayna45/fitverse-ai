import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  bodyFat: {
    type: Number
  },
  bmi: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Progress || mongoose.model('Progress', progressSchema);
