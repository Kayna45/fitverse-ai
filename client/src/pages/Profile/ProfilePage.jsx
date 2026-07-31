import React, { useState } from 'react';
import { User, Award, Flame, Coins, Sliders, Camera, Sparkles, CheckCircle2, Lock, Edit3, Scale, Activity, Droplet, Utensils, Dumbbell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';
import OnboardingModal from '../../components/Onboarding/OnboardingModal';

export default function ProfilePage() {
  const { user } = useAuth();
  const { achievements } = useWorkout();

  const [showEditModal, setShowEditModal] = useState(false);

  // Progress Photo Slider state (0 to 100 percentage)
  const [sliderPos, setSliderPos] = useState(50);

  const beforeImg = "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80";
  const afterImg = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80";

  const currentUser = user || {
    name: 'Kayna',
    email: 'kayna@fitverse.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
    streak: 0,
    coins: 100,
    weight: 70,
    targetWeight: 65,
    height: 170,
    age: 22,
    gender: 'Female',
    bmi: 22.5,
    caloriesGoal: 2200,
    proteinGoal: 120,
    waterGoal: 3.0,
    goal: 'Weight Loss'
  };

  const nextLevelXp = currentUser.nextLevelXp || 1000;
  const avatarUrl = currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";

  return (
    <div className="space-y-8 animate-fadeIn">
      <OnboardingModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} />

      {/* User Header Profile Card */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center space-x-5">
          <img src={avatarUrl} alt={currentUser.name} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/50" />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-white">{currentUser.name}</h1>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                PRO Athlete
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{currentUser.email} • Goal: <span className="text-emerald-400 font-bold">{currentUser.goal}</span></p>

            <div className="flex items-center gap-4 mt-3 text-xs font-bold">
              <span className="text-amber-400 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-400" /> {currentUser.streak || 0} Day Streak
              </span>
              <span className="text-yellow-400 flex items-center gap-1">
                <Coins className="w-4 h-4" /> {currentUser.coins || 100} FitCoins
              </span>
            </div>
          </div>
        </div>

        {/* Action Button & XP Bar */}
        <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Fitness Profile</span>
          </button>

          <div className="w-full sm:w-64 bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-300">
              <span>Level {currentUser.level || 1}</span>
              <span className="text-emerald-400">{currentUser.xp || 0} / {nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${Math.min(100, ((currentUser.xp || 0) / nextLevelXp) * 100)}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 DYNAMIC PERSONALIZED METRICS GRID */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <span>Personalized Fitness Metrics (MongoDB Synced)</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
            <div className="text-gray-400 font-semibold flex items-center gap-1">
              <Scale className="w-4 h-4 text-blue-400" /> Current / Target Weight
            </div>
            <div className="text-lg font-bold text-white">{currentUser.weight} kg <span className="text-xs text-gray-400 font-normal">/ {currentUser.targetWeight} kg</span></div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
            <div className="text-gray-400 font-semibold flex items-center gap-1">
              <Activity className="w-4 h-4 text-cyan-400" /> Body Mass Index (BMI)
            </div>
            <div className="text-lg font-bold text-white">{currentUser.bmi || 22.5}</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
            <div className="text-gray-400 font-semibold flex items-center gap-1">
              <Utensils className="w-4 h-4 text-amber-400" /> Daily Calories Goal
            </div>
            <div className="text-lg font-bold text-white">{currentUser.caloriesGoal || 2200} kcal</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1">
            <div className="text-gray-400 font-semibold flex items-center gap-1">
              <Dumbbell className="w-4 h-4 text-emerald-400" /> Daily Protein Goal
            </div>
            <div className="text-lg font-bold text-white">{currentUser.proteinGoal || 120} g</div>
          </div>
        </div>
      </div>

      {/* 📷 PROGRESS PHOTOS BEFORE / AFTER SLIDER */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
            <Camera className="w-5 h-5" />
            <span>Progress Photos Comparison</span>
          </div>
          <span className="text-xs text-gray-400">Drag slider to compare Week 1 vs Week 12</span>
        </div>

        <div className="relative w-full max-w-xl mx-auto h-80 rounded-2xl overflow-hidden border border-emerald-500/30 select-none">
          {/* Before Image (Left Layer) */}
          <img src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-cover" />

          {/* After Image (Right Layer Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img src={afterImg} alt="After" className="w-full h-full object-cover max-w-none" style={{ width: '100%' }} />
          </div>

          {/* Slider Line Divider */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-emerald-400 cursor-ew-resize flex items-center justify-center shadow-lg"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-black font-extrabold text-xs flex items-center justify-center shadow-xl">
              ↔
            </div>
          </div>

          {/* Range Overlay Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
          />

          <span className="absolute left-4 bottom-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
            Before (Week 1)
          </span>
          <span className="absolute right-4 bottom-4 bg-emerald-500 text-black px-3 py-1 rounded-full text-xs font-extrabold shadow-lg">
            After ({currentUser.weight}kg)
          </span>
        </div>
      </div>

      {/* ACHIEVEMENTS & BADGES SYSTEM */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Unlocked Achievements & Badges</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                ach.unlocked
                  ? 'glass-card border-emerald-500/40 bg-emerald-500/10'
                  : 'bg-white/5 border-white/5 opacity-50'
              }`}
            >
              <div className="text-3xl">{ach.icon}</div>
              <h4 className="text-xs font-bold text-white">{ach.title}</h4>
              <p className="text-[10px] text-gray-400 line-clamp-2">{ach.description}</p>
              {ach.unlocked ? (
                <span className="inline-block text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Unlocked</span>
              ) : (
                <span className="inline-block text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
