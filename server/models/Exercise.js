import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  equipment: { type: String },
  target: { type: String },
  caloriesPerMin: { type: Number, default: 8 },
  description: { type: String }
});

export default mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema);
