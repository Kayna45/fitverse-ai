import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Scale,
  Utensils,
  Droplet,
  Moon,
  Dumbbell,
  Footprints,
  Sparkles,
  Bot,
  Plus,
  Trophy,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Award,
  Settings,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';
import { useLanguage } from '../../context/LanguageContext';
import OnboardingModal from '../../components/Onboarding/OnboardingModal';
import { getBmiCategory } from '../../../../server/utils/fitnessUtils.js';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const {
    waterIntake,
    addWater,
    sleepHours,
    steps,
    workoutDuration,
    caloriesConsumed
  } = useWorkout();

  const [showOnboarding, setShowOnboarding] = useState(false);

  // Generate GitHub Contribution Graph Grid Data (52 weeks x 7 days = 364 days)
  const generateContributionData = () => {
    const days = [];
    for (let i = 0; i < 140; i++) {
      let status = 'empty';
      if (i % 7 === 0 || i % 7 === 6) {
        status = 'rest';
      } else if (i % 11 === 0) {
        status = 'missed';
      } else if (i % 15 === 0) {
        status = 'badge';
      } else {
        status = 'workout';
      }
      days.push({ dayIndex: i, status });
    }
    return days;
  };

  const contributionDays = generateContributionData();

  const currentUser = user || {
    name: 'User',
    weight: 70,
    targetWeight: 65,
    caloriesGoal: 2200,
    proteinGoal: 120,
    waterGoal: 3.0,
    bmi: 22.5,
    streak: 0,
    goal: 'Weight Loss',
    onboarded: true
  };

  const bmiCategory = currentUser.bmi ? (
    currentUser.bmi < 18.5 ? 'Underweight' :
    currentUser.bmi < 25 ? 'Normal' :
    currentUser.bmi < 30 ? 'Overweight' : 'Obese'
  ) : 'Normal';

  const topCards = [
    { label: t('weight'), val: `${currentUser.weight || 70} kg`, sub: `Target: ${currentUser.targetWeight || 65}kg`, icon: Scale, color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30' },
    { label: 'BMI Index', val: `${currentUser.bmi || 22.5}`, sub: `Status: ${bmiCategory}`, icon: Activity, color: 'from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30' },
    { label: t('todayCalories'), val: `${caloriesConsumed || 0} kcal`, sub: `Target: ${currentUser.caloriesGoal || 2200} kcal`, icon: Utensils, color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30' },
    { label: t('water'), val: `${waterIntake} L`, sub: `Goal: ${currentUser.waterGoal || 3.0} L`, icon: Droplet, color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30', action: () => addWater(0.25) },
    { label: t('workoutTime'), val: `${workoutDuration} min`, sub: `Protein: ${currentUser.proteinGoal || 120}g/day`, icon: Dumbbell, color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30' },
    { label: t('steps'), val: `${steps.toLocaleString()}`, sub: 'Daily Goal: 10,000', icon: Footprints, color: 'from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Onboarding Modal Triggered if user has not completed onboarding or manual click */}
      <OnboardingModal
        isOpen={!currentUser.onboarded || showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />

      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>FitVerse AI Personal Dashboard</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white">
            Hello {currentUser.name} 👋
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-xl">
            Goal: <span className="text-emerald-400 font-bold">{currentUser.goal}</span> • 
            Streak: <span className="text-amber-400 font-bold">{currentUser.streak || 0}-day streak</span>! 
            Your personalized target is <span className="text-amber-400 font-bold">{currentUser.caloriesGoal} kcal</span> & <span className="text-emerald-400 font-bold">{currentUser.proteinGoal}g protein</span> daily.
          </p>
        </div>

        {/* Quick Launch Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowOnboarding(true)}
            className="flex-1 md:flex-none glass-panel hover:bg-white/10 text-emerald-400 font-bold text-xs px-4 py-3 rounded-2xl border border-emerald-500/30 flex items-center justify-center space-x-1.5 transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>Update Fitness Plan</span>
          </button>
          <Link
            to="/ai-coach"
            className="flex-1 md:flex-none bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-transform hover:scale-105"
          >
            <Bot className="w-4 h-4" />
            <span>Launch AI Coach</span>
          </Link>
        </div>
      </div>

      {/* TOP ANIMATED STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {topCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`glass-card p-4 rounded-2xl border bg-gradient-to-br ${card.color} transition-all duration-300 relative group`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" />
                {card.action && (
                  <button
                    onClick={card.action}
                    className="text-[10px] bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded-full font-bold transition-all"
                  >
                    +250ml
                  </button>
                )}
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">{card.val}</h3>
              <p className="text-[11px] font-semibold text-gray-300 mt-0.5">{card.label}</p>
              <p className="text-[10px] text-gray-400 mt-1">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* GITHUB CONTRIBUTION GRAPH STYLE CALENDAR */}
      <div className="glass-card rounded-3xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-extrabold text-white">Activity & Consistency Calendar</h2>
            </div>
            <p className="text-xs text-gray-400 mt-1">365-day fitness contribution graph highlighting workouts, missed days, and streak milestones.</p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center space-x-1.5 text-gray-300">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
              <span>✔ Workout</span>
            </div>
            <div className="flex items-center space-x-1.5 text-gray-300">
              <span className="w-3 h-3 rounded bg-red-500/60 inline-block"></span>
              <span>❌ Missed</span>
            </div>
            <div className="flex items-center space-x-1.5 text-gray-300">
              <span className="w-3 h-3 rounded bg-amber-400 inline-block"></span>
              <span>🔥 Streak</span>
            </div>
            <div className="flex items-center space-x-1.5 text-gray-300">
              <span className="w-3 h-3 rounded bg-purple-500 inline-block"></span>
              <span>🏆 Badge</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[700px]">
            {contributionDays.map((item) => {
              let colorClass = 'bg-white/5 border border-white/5';
              if (item.status === 'workout') colorClass = 'bg-emerald-500 shadow-sm shadow-emerald-500/50';
              if (item.status === 'missed') colorClass = 'bg-red-500/50 border border-red-500/40';
              if (item.status === 'badge') colorClass = 'bg-purple-500 border border-purple-400 animate-pulse';
              if (item.status === 'rest') colorClass = 'bg-amber-400/80';

              return (
                <div
                  key={item.dayIndex}
                  title={`Day ${item.dayIndex + 1}: ${item.status.toUpperCase()}`}
                  className={`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125 cursor-pointer ${colorClass}`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
