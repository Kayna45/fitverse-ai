import React, { useState } from 'react';
import {
  Utensils,
  Search,
  Plus,
  PieChart as PieIcon,
  Bot,
  Flame,
  Sparkles,
  Check,
  TrendingUp
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FOOD_DATABASE } from '../../utils/mockData';
import { useWorkout } from '../../context/WorkoutContext';
import { useAuth } from '../../context/AuthContext';
import { generateAIMealPlan } from '../../services/aiService';

export default function NutritionPage() {
  const { user } = useAuth();
  const {
    foodLogs,
    logFoodItem,
    caloriesConsumed,
    totalProtein,
    totalCarbs,
    totalFat
  } = useWorkout();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('Breakfast');
  const [logAmount, setLogAmount] = useState(100);

  const caloriesGoal = user?.caloriesGoal || 2200;
  const proteinGoal = user?.proteinGoal || 150;

  // AI Diet Generator Modal state
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiGoal, setAiGoal] = useState(user?.goal || 'Weight Loss');
  const [aiDiet, setAiDiet] = useState('Vegetarian');
  const [aiBudget, setAiBudget] = useState('Budget Friendly');
  const [aiDietResult, setAiDietResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredFoods = FOOD_DATABASE.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pieData = [
    { name: 'Protein (g)', value: totalProtein || 80, color: '#22c55e' },
    { name: 'Carbs (g)', value: totalCarbs || 180, color: '#38bdf8' },
    { name: 'Fat (g)', value: totalFat || 50, color: '#f59e0b' }
  ];

  const handleLogFood = (food) => {
    logFoodItem(food, selectedMealType, Number(logAmount));
    alert(`Logged ${logAmount}g of ${food.name} to ${selectedMealType}! 🥗`);
  };

  const handleGenerateAiDiet = async () => {
    setIsGenerating(true);
    const plan = await generateAIMealPlan({ goal: aiGoal, diet: aiDiet, budget: aiBudget });
    setAiDietResult(plan);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Utensils className="w-8 h-8 text-emerald-400" />
            <span>Nutrition & Diet Tracker</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Food Macro Search, Recharts Macro Breakdown, Meal Logging & AI Complete Diet Generator</p>
        </div>

        <button
          onClick={() => setShowAiModal(true)}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <Bot className="w-4 h-4" />
          <span>AI Meal Generator</span>
        </button>
      </div>

      {/* TOP MACRO SUMMARY & RECHARTS PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Summary Card */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>Daily Intake Summary</span>
          </h2>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
            <p className="text-3xl font-extrabold text-amber-400">{caloriesConsumed} <span className="text-xs text-gray-400 font-normal">/ {caloriesGoal} kcal</span></p>
            <p className="text-xs text-gray-400 mt-1">Total Calories Logged Today</p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
              <span className="font-semibold text-emerald-400">Protein</span>
              <span className="font-bold text-white">{totalProtein}g / {proteinGoal}g</span>
            </div>
            <div className="flex justify-between items-center bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/20">
              <span className="font-semibold text-cyan-400">Carbs</span>
              <span className="font-bold text-white">{totalCarbs}g / 220g</span>
            </div>
            <div className="flex justify-between items-center bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
              <span className="font-semibold text-amber-400">Fats</span>
              <span className="font-bold text-white">{totalFat}g / 65g</span>
            </div>
          </div>
        </div>

        {/* Recharts Pie Chart */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 lg:col-span-2 flex flex-col justify-between">
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-cyan-400" />
            <span>Macro Distribution Ratio</span>
          </h2>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* FOOD SEARCH & LOGGING SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Search & Database */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Paneer, Eggs, Oats..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedMealType}
                onChange={e => setSelectedMealType(e.target.value)}
                className="bg-white/5 border border-white/10 text-xs text-white rounded-xl py-2 px-3 focus:outline-none"
              >
                <option value="Breakfast" className="bg-gray-900">Breakfast</option>
                <option value="Lunch" className="bg-gray-900">Lunch</option>
                <option value="Dinner" className="bg-gray-900">Dinner</option>
                <option value="Snacks" className="bg-gray-900">Snacks</option>
              </select>

              <input
                type="number"
                value={logAmount}
                onChange={e => setLogAmount(e.target.value)}
                className="w-20 bg-white/5 border border-white/10 text-xs text-center font-bold text-white rounded-xl py-2 focus:outline-none"
                placeholder="Grams"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
            {filteredFoods.map(food => (
              <div key={food.id} className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center justify-between hover:border-emerald-500/40 transition-all">
                <div>
                  <h4 className="text-sm font-bold text-white">{food.name}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{food.unit} • <span className="text-amber-400 font-bold">{food.calories} kcal</span></p>
                  <p className="text-[10px] text-emerald-400 font-semibold mt-1">P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g</p>
                </div>
                <button
                  onClick={() => handleLogFood(food)}
                  className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Logs Breakdown */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white">Today's Logged Meals</h3>
          <div className="space-y-3">
            {foodLogs.map(item => {
              const factor = item.amount / 100;
              const kcal = Math.round(item.food.calories * factor);
              return (
                <div key={item.id} className="glass-panel p-3 rounded-2xl border border-white/5 text-xs">
                  <div className="flex justify-between font-bold text-white">
                    <span>{item.food.name} ({item.amount}g)</span>
                    <span className="text-amber-400">{kcal} kcal</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.mealType} • Protein: {Math.round(item.food.protein * factor)}g</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI MEAL GENERATOR MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-emerald-500/40 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
                <Bot className="w-6 h-6 animate-pulse" />
                <span>AI Complete Diet Generator</span>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Fitness Goal</label>
                <select value={aiGoal} onChange={e => setAiGoal(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white">
                  <option value="Weight Loss" className="bg-gray-900">Weight Loss & Fat Shred</option>
                  <option value="Muscle Gain" className="bg-gray-900">Lean Muscle Gain & Surplus</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Dietary Preference</label>
                <select value={aiDiet} onChange={e => setAiDiet(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white">
                  <option value="Vegetarian" className="bg-gray-900">Vegetarian (Paneer, Oats, Pulses)</option>
                  <option value="Non-Vegetarian" className="bg-gray-900">Non-Vegetarian (Chicken, Eggs, Fish)</option>
                  <option value="Vegan" className="bg-gray-900">Vegan (Soya, Tofu, Nuts)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Budget Strategy</label>
                <select value={aiBudget} onChange={e => setAiBudget(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white">
                  <option value="Budget Friendly" className="bg-gray-900">Budget Friendly (Student / Home Foods)</option>
                  <option value="Premium Complete" className="bg-gray-900">Premium Complete (Organic + Supplements)</option>
                </select>
              </div>

              <button
                onClick={handleGenerateAiDiet}
                disabled={isGenerating}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                {isGenerating ? 'AI Synthesizing Macros...' : 'Generate AI Diet Plan'}
              </button>

              {aiDietResult && (
                <div className="space-y-3 mt-4 max-h-60 overflow-y-auto pr-2">
                  <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30 text-emerald-400 font-bold">
                    Target: {aiDietResult.dailyCalories} kcal | Protein: {aiDietResult.proteinGrams}g
                  </div>
                  {aiDietResult.meals.map((m, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <p className="font-bold text-white">{m.type}: <span className="text-amber-400">{m.name} ({m.calories} kcal)</span></p>
                      <p className="text-[11px] text-gray-400 mt-1">{m.details}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
