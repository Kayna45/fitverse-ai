import React, { useState } from 'react';
import {
  Dumbbell,
  Search,
  Filter,
  Plus,
  Play,
  Save,
  CheckCircle2,
  Sparkles,
  Bot,
  Clock,
  Flame,
  Zap,
  Info
} from 'lucide-react';
import { INITIAL_EXERCISES, EXERCISE_CATEGORIES } from '../../utils/mockData';
import { useWorkout } from '../../context/WorkoutContext';
import { generateAIWorkoutPlan } from '../../services/aiService';

export default function WorkoutPage() {
  const { logWorkoutSession, workoutLogs } = useWorkout();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'builder' | 'logger'
  const [selectedExerciseModal, setSelectedExerciseModal] = useState(null);

  // Logger Form state
  const [logExercise, setLogExercise] = useState('Barbell Bench Press');
  const [logWeight, setLogWeight] = useState(50);
  const [logSets, setLogSets] = useState(4);
  const [logReps, setLogReps] = useState(12);

  // AI Workout Generator state
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiGoal, setAiGoal] = useState('Muscle Gain');
  const [aiExp, setAiExp] = useState('Intermediate');
  const [aiDays, setAiDays] = useState(5);
  const [aiResult, setAiResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredExercises = INITIAL_EXERCISES.filter(ex => {
    const matchesCat = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || ex.target.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleLogSubmit = (e) => {
    e.preventDefault();
    logWorkoutSession(logExercise, logWeight, logSets, logReps);
    alert(`Successfully logged ${logSets} sets x ${logReps} reps of ${logExercise} (${logWeight}kg)! 🎉`);
  };

  const handleGenerateAiWorkout = async () => {
    setIsGenerating(true);
    const plan = await generateAIWorkoutPlan({ goal: aiGoal, experience: aiExp, days: aiDays });
    setAiResult(plan);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-emerald-400" />
            <span>Workout Module</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">100+ Exercise Library, Drag & Drop Routine Builder, Set Logger & AI Program Generator</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'library' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-gray-400 hover:text-white'
            }`}
          >
            Exercise Library (100+)
          </button>
          <button
            onClick={() => setActiveTab('logger')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'logger' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-gray-400 hover:text-white'
            }`}
          >
            Workout Logger
          </button>
          <button
            onClick={() => setShowAiModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-black px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1 hover:scale-105 transition-transform"
          >
            <Bot className="w-4 h-4" />
            <span>AI Workout Generator</span>
          </button>
        </div>
      </div>

      {/* EXERCISE LIBRARY TAB */}
      {activeTab === 'library' && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Bench Press, Squat, Yoga..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2">
              {EXERCISE_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                      : 'glass-panel text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((ex) => (
              <div
                key={ex.id}
                className="glass-card p-5 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all group relative"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md">
                      {ex.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5 group-hover:text-emerald-400 transition-colors">
                      {ex.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedExerciseModal(ex)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-all"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 mb-4">{ex.description}</p>

                <div className="flex items-center justify-between text-[11px] text-gray-300 border-t border-white/5 pt-3">
                  <span>🎯 {ex.target}</span>
                  <span className="text-amber-400 font-bold">🔥 {ex.caloriesPerMin} kcal/min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WORKOUT LOGGER TAB */}
      {activeTab === 'logger' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logger Input Form */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <Zap className="w-5 h-5" />
              <span>Real-Time Workout Logger</span>
            </div>

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Select Exercise</label>
                <select
                  value={logExercise}
                  onChange={(e) => setLogExercise(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  {INITIAL_EXERCISES.map(ex => (
                    <option key={ex.id} value={ex.name} className="bg-gray-900 text-white">
                      {ex.name} ({ex.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={logWeight}
                    onChange={(e) => setLogWeight(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Sets</label>
                  <input
                    type="number"
                    value={logSets}
                    onChange={(e) => setLogSets(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Reps</label>
                  <input
                    type="number"
                    value={logReps}
                    onChange={(e) => setLogReps(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500 text-center font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Set & Earn +50 XP</span>
              </button>
            </form>
          </div>

          {/* Log History */}
          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <h3 className="text-base font-bold text-white mb-4">Today's Logged Sessions</h3>
            <div className="space-y-3">
              {workoutLogs.map((log) => (
                <div key={log.id} className="glass-panel p-4 rounded-2xl flex items-center justify-between border border-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{log.exerciseName}</h4>
                      <p className="text-xs text-gray-400">{log.sets} sets × {log.reps} reps @ {log.weight}kg</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-amber-400">+{log.caloriesBurned} kcal</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI WORKOUT GENERATOR MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-cyan-500/40 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-base">
                <Bot className="w-6 h-6 animate-pulse" />
                <span>AI Workout Generator</span>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Fitness Goal</label>
                <select value={aiGoal} onChange={e => setAiGoal(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white">
                  <option value="Muscle Gain" className="bg-gray-900">Muscle Gain & Hypertrophy</option>
                  <option value="Weight Loss" className="bg-gray-900">Weight Loss & Fat Burn</option>
                  <option value="Endurance" className="bg-gray-900">Endurance & CrossFit</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Experience Level</label>
                <select value={aiExp} onChange={e => setAiExp(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white">
                  <option value="Beginner" className="bg-gray-900">Beginner</option>
                  <option value="Intermediate" className="bg-gray-900">Intermediate</option>
                  <option value="Advanced" className="bg-gray-900">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Days Per Week ({aiDays} Days)</label>
                <input type="range" min="3" max="6" value={aiDays} onChange={e => setAiDays(e.target.value)} className="w-full accent-cyan-400" />
              </div>

              <button
                onClick={handleGenerateAiWorkout}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-extrabold py-3 rounded-xl transition-all hover:scale-102 shadow-lg shadow-cyan-500/20"
              >
                {isGenerating ? 'AI Engine Synthesizing Schedule...' : 'Generate Customized Schedule'}
              </button>

              {aiResult && (
                <div className="space-y-2 mt-4 max-h-60 overflow-y-auto pr-2">
                  <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">AI Generated Routine</h4>
                  {aiResult.map((day, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <p className="font-bold text-white">{day.day}: <span className="text-cyan-400">{day.title}</span></p>
                      <p className="text-[11px] text-gray-400 mt-1">{day.exercises.join(' • ')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EXERCISE DETAIL MODAL */}
      {selectedExerciseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card max-w-md w-full rounded-3xl p-6 border border-emerald-500/40 relative">
            <button onClick={() => setSelectedExerciseModal(null)} className="absolute right-4 top-4 text-gray-400 hover:text-white font-bold">✕</button>
            <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md">
              {selectedExerciseModal.category}
            </span>
            <h3 className="text-xl font-extrabold text-white mt-2">{selectedExerciseModal.name}</h3>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed">{selectedExerciseModal.description}</p>
            <div className="mt-4 space-y-2 text-xs">
              <p className="text-gray-400">⚙️ Equipment: <span className="text-white font-bold">{selectedExerciseModal.equipment}</span></p>
              <p className="text-gray-400">🎯 Target Muscle: <span className="text-white font-bold">{selectedExerciseModal.target}</span></p>
              <p className="text-amber-400 font-bold">🔥 Est. Burn: {selectedExerciseModal.caloriesPerMin} kcal / minute</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
