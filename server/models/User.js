// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   weight: { type: Number, default: 70 },
//   targetWeight: { type: Number, default: 65 },
//   level: { type: Number, default: 12 },
//   xp: { type: Number, default: 1200 },
//   streak: { type: Number, default: 7 },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.models.User || mongoose.model('User', userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    default: 22
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Female"
  },

  height: {
    type: Number,
    default: 165
  },

  weight: {
    type: Number,
    default: 70
  },

  targetWeight: {
    type: Number,
    default: 65
  },

  activityLevel: {
    type: String,
    default: "Moderate"
  },

  goal: {
    type: String,
    default: "Weight Loss"
  },

  caloriesGoal: {
    type: Number,
    default: 2200
  },

  proteinGoal: {
    type: Number,
    default: 120
  },

  waterGoal: {
    type: Number,
    default: 3
  },

  bmi: {
    type: Number,
    default: 22.5
  },

  onboarded: {
    type: Boolean,
    default: false
  },

  level: {
    type: Number,
    default: 1
  },

  xp: {
    type: Number,
    default: 0
  },

  streak: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User ||
mongoose.model("User", userSchema);