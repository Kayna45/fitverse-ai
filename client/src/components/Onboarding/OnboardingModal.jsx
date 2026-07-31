import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  Scale,
  Activity,
  Target,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  UserCheck,
  Droplet,
  Dumbbell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function OnboardingModal({ isOpen, onClose }) {
  const { updateUserProfile, user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    age: user?.age || 24,
    gender: user?.gender || 'Male',
    height: user?.height || 175,
    weight: user?.weight || 75,
    targetWeight: user?.targetWeight || 70,
    activityLevel: user?.activityLevel || 'Moderate',
    goal: user?.goal || 'Weight Loss'
  });

  if (!isOpen) return null;

  const calculatePreview = () => {
    const age = Number(formData.age) || 24;
    const height = Number(formData.height) || 175;
    const weight = Number(formData.weight) || 75;
    const heightM = height / 100;
    const bmi = Number((weight / (heightM * heightM)).toFixed(1));

    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (formData.gender === 'Male') bmr += 5;
    else bmr -= 161;

    const mults = { 'Sedentary': 1.2, 'Light': 1.375, 'Moderate': 1.55, 'Active': 1.725, 'Very Active': 1.9 };
    const tdee = bmr * (mults[formData.activityLevel] || 1.55);

    let caloriesGoal = Math.round(tdee);
    if (formData.goal === 'Weight Loss') caloriesGoal = Math.max(1200, Math.round(tdee - 500));
    else if (formData.goal === 'Muscle Gain') caloriesGoal = Math.round(tdee + 350);

    let proteinGoal = Math.round(weight * 1.8);
    if (formData.goal === 'Weight Loss') proteinGoal = Math.round(weight * 2.0);
    else if (formData.goal === 'Muscle Gain') proteinGoal = Math.round(weight * 2.2);
    else if (formData.goal === 'Maintenance') proteinGoal = Math.round(weight * 1.6);

    const waterGoal = Number((weight * 0.035).toFixed(1));

    return { bmi, caloriesGoal, proteinGoal, waterGoal };
  };

  const preview = calculatePreview();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateUserProfile({
        ...formData,
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
        targetWeight: Number(formData.targetWeight),
        onboarded: true
      });
      setLoading(false);
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save fitness profile');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
      <div className="glass-card max-w-xl w-full rounded-3xl p-6 md:p-8 border border-emerald-500/40 relative shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-black flex items-center justify-center mx-auto mb-3 font-bold shadow-lg shadow-emerald-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Personalize Your FitVerse Plan</h2>
          <p className="text-xs text-gray-400 mt-1">Tell us about your body and goals so AI can tailor your daily metrics</p>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 bg-emerald-400' : s < step ? 'w-4 bg-emerald-600' : 'w-4 bg-white/10'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Body Biometrics */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" /> Step 1: Body Biometrics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    min="12"
                    max="100"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Male" className="bg-gray-900">Male</option>
                    <option value="Female" className="bg-gray-900">Female</option>
                    <option value="Other" className="bg-gray-900">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Current (kg)</label>
                  <input
                    type="number"
                    min="30"
                    max="300"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Target (kg)</label>
                  <input
                    type="number"
                    min="30"
                    max="300"
                    value={formData.targetWeight}
                    onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Goal & Activity */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Step 2: Goal & Daily Activity
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Fitness Goal</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Weight Loss', 'Muscle Gain', 'Maintenance'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, goal: g })}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                        formData.goal === g
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 ring-2 ring-emerald-500/30'
                          : 'glass-panel text-gray-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Activity Level</label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Sedentary" className="bg-gray-900">Sedentary (Desk Job / Minimal Exercise)</option>
                  <option value="Light" className="bg-gray-900">Light Active (Exercise 1-3 days/week)</option>
                  <option value="Moderate" className="bg-gray-900">Moderate Active (Exercise 3-5 days/week)</option>
                  <option value="Active" className="bg-gray-900">Very Active (Heavy Exercise 6-7 days/week)</option>
                  <option value="Very Active" className="bg-gray-900">Athlete Level (Physical Job & Intense Training)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Preview & Confirm */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> Step 3: Your Calculated AI Targets
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-3.5 rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
                  <div className="flex items-center space-x-1 text-cyan-400 text-xs font-bold mb-1">
                    <Scale className="w-4 h-4" /> <span>Calculated BMI</span>
                  </div>
                  <div className="text-2xl font-extrabold text-white">{preview.bmi}</div>
                  <p className="text-[10px] text-gray-300">Body Mass Index</p>
                </div>

                <div className="glass-panel p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/10">
                  <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold mb-1">
                    <Flame className="w-4 h-4" /> <span>Daily Calories Target</span>
                  </div>
                  <div className="text-2xl font-extrabold text-white">{preview.caloriesGoal} kcal</div>
                  <p className="text-[10px] text-gray-300">TDEE Adjusted Target</p>
                </div>

                <div className="glass-panel p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
                  <div className="flex items-center space-x-1 text-emerald-400 text-xs font-bold mb-1">
                    <Dumbbell className="w-4 h-4" /> <span>Protein Target</span>
                  </div>
                  <div className="text-2xl font-extrabold text-white">{preview.proteinGoal}g</div>
                  <p className="text-[10px] text-gray-300">Daily Macronutrient</p>
                </div>

                <div className="glass-panel p-3.5 rounded-2xl border border-blue-500/30 bg-blue-500/10">
                  <div className="flex items-center space-x-1 text-blue-400 text-xs font-bold mb-1">
                    <Droplet className="w-4 h-4" /> <span>Water Goal</span>
                  </div>
                  <div className="text-2xl font-extrabold text-white">{preview.waterGoal} L</div>
                  <p className="text-[10px] text-gray-300">Optimal Hydration</p>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                These values are saved to your MongoDB profile and dynamically update your dashboard metrics!
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="glass-panel hover:bg-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl border border-white/10"
              >
                Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-1"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold text-xs px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center space-x-2 transition-transform hover:scale-105"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{loading ? 'Saving to MongoDB...' : 'Save & Launch Dashboard'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
