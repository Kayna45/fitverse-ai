// FitVerse AI - Comprehensive Mock Data & Seed Engine

export const EXERCISE_CATEGORIES = [
  'All',
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Arms',
  'Yoga',
  'Cardio',
  'HIIT',
  'CrossFit'
];

export const INITIAL_EXERCISES = [
  // CHEST
  { id: 'ex-1', name: 'Barbell Bench Press', category: 'Chest', equipment: 'Barbell', target: 'Pectoralis Major', caloriesPerMin: 9, description: 'Lie on a flat bench, lower barbell to mid-chest, drive upward explosively.' },
  { id: 'ex-2', name: 'Incline Dumbbell Press', category: 'Chest', equipment: 'Dumbbells', target: 'Upper Chest', caloriesPerMin: 8.5, description: 'Set bench to 30-45 degrees, press dumbbells upward focusing on upper chest contraction.' },
  { id: 'ex-3', name: 'Cable Flyes', category: 'Chest', equipment: 'Cable Machine', target: 'Inner Chest', caloriesPerMin: 7, description: 'Stand in middle of cable crossover, bring handles together in a hugging motion.' },
  { id: 'ex-4', name: 'Bodyweight Push-Ups', category: 'Chest', equipment: 'Bodyweight', target: 'Chest & Triceps', caloriesPerMin: 8, description: 'Maintain rigid plank posture, lower chest until elbows reach 90 degrees.' },
  { id: 'ex-5', name: 'Decline Chest Press', category: 'Chest', equipment: 'Barbell', target: 'Lower Chest', caloriesPerMin: 8, description: 'Press weight on decline bench targeting lower pectoral fibers.' },
  
  // BACK
  { id: 'ex-6', name: 'Lat Pulldown', category: 'Back', equipment: 'Cable Machine', target: 'Latissimus Dorsi', caloriesPerMin: 7.5, description: 'Pull bar down to upper chest level, squeezing shoulder blades together.' },
  { id: 'ex-7', name: 'Bent-Over Barbell Row', category: 'Back', equipment: 'Barbell', target: 'Mid-Back / Lats', caloriesPerMin: 9.5, description: 'Hinge at hips with flat back, row barbell upward towards lower ribcage.' },
  { id: 'ex-8', name: 'Pull-Ups', category: 'Back', equipment: 'Bodyweight', target: 'Lats & Biceps', caloriesPerMin: 10, description: 'Overhand grip, pull body upward until chin clears the bar.' },
  { id: 'ex-9', name: 'Seated Cable Row', category: 'Back', equipment: 'Cable Machine', target: 'Rhomboids', caloriesPerMin: 7, description: 'Drive elbows back while keeping chest upright and core engaged.' },
  { id: 'ex-10', name: 'Deadlift', category: 'Back', equipment: 'Barbell', target: 'Posterior Chain', caloriesPerMin: 12, description: 'Lift barbell from floor by extending hips and knees with neutral spine.' },

  // LEGS
  { id: 'ex-11', name: 'Barbell Back Squat', category: 'Legs', equipment: 'Barbell', target: 'Quadriceps & Glutes', caloriesPerMin: 11, description: 'Squat down until thighs are parallel to ground, drive up through mid-foot.' },
  { id: 'ex-12', name: 'Romanian Deadlift', category: 'Legs', equipment: 'Barbell', target: 'Hamstrings', caloriesPerMin: 9, description: 'Hinge forward at hips maintaining slight knee bend until hamstring stretch is felt.' },
  { id: 'ex-13', name: 'Leg Press', category: 'Legs', equipment: 'Machine', target: 'Quadriceps', caloriesPerMin: 8.5, description: 'Lower weight sled until knees form 90 degree angle, press up smoothly.' },
  { id: 'ex-14', name: 'Walking Lunges', category: 'Legs', equipment: 'Dumbbells', target: 'Glutes & Quads', caloriesPerMin: 9, description: 'Step forward landing smoothly, lowering rear knee towards floor.' },
  { id: 'ex-15', name: 'Standing Calf Raises', category: 'Legs', equipment: 'Machine', target: 'Gastrocnemius', caloriesPerMin: 5, description: 'Raise up onto toes, hold peak contraction, lower stretch below step.' },

  // SHOULDERS
  { id: 'ex-16', name: 'Overhead Barbell Press', category: 'Shoulders', equipment: 'Barbell', target: 'Anterior Deltoid', caloriesPerMin: 9, description: 'Press bar overhead locking out arms with core braced.' },
  { id: 'ex-17', name: 'Dumbbell Lateral Raise', category: 'Shoulders', equipment: 'Dumbbells', target: 'Lateral Deltoid', caloriesPerMin: 6, description: 'Raise dumbbells outward to shoulder height with slight elbow bend.' },
  { id: 'ex-18', name: 'Face Pulls', category: 'Shoulders', equipment: 'Cable Machine', target: 'Rear Delts & Rotator Cuff', caloriesPerMin: 6, description: 'Pull rope attachment towards eyes, flaring elbows out and back.' },

  // ARMS
  { id: 'ex-19', name: 'Barbell Bicep Curl', category: 'Arms', equipment: 'Barbell', target: 'Biceps Brachii', caloriesPerMin: 6.5, description: 'Keep elbows tucked to sides, curl weight upward squeezing biceps.' },
  { id: 'ex-20', name: 'Tricep Rope Pushdown', category: 'Arms', equipment: 'Cable Machine', target: 'Triceps Lateral Head', caloriesPerMin: 6.5, description: 'Push rope down extending elbows, spread handles at bottom.' },
  { id: 'ex-21', name: 'Hammer Curls', category: 'Arms', equipment: 'Dumbbells', target: 'Brachialis & Forearms', caloriesPerMin: 6, description: 'Neutral grip curl focusing on arm thickness and grip strength.' },

  // YOGA
  { id: 'ex-22', name: 'Downward-Facing Dog', category: 'Yoga', equipment: 'Bodyweight', target: 'Full Body Mobility', caloriesPerMin: 4, description: 'Press hands and feet into floor forming inverted V shape.' },
  { id: 'ex-23', name: 'Warrior II Pose', category: 'Yoga', equipment: 'Bodyweight', target: 'Hips & Balance', caloriesPerMin: 4.5, description: 'Deep lunge stance with arms extended parallel to ground.' },

  // CARDIO & HIIT & CROSSFIT
  { id: 'ex-24', name: 'Treadmill Running', category: 'Cardio', equipment: 'Treadmill', target: 'Cardiovascular System', caloriesPerMin: 11, description: 'Continuous steady-state or interval running.' },
  { id: 'ex-25', name: 'Burpees', category: 'HIIT', equipment: 'Bodyweight', target: 'Full Body Endurance', caloriesPerMin: 14, description: 'Drop into push-up, jump feet back, explode upward into jump.' },
  { id: 'ex-26', name: 'Kettlebell Swings', category: 'CrossFit', equipment: 'Kettlebell', target: 'Posterior Explosiveness', caloriesPerMin: 13, description: 'Hinge hips to swing kettlebell to chest height using hip drive.' }
];

export const FOOD_DATABASE = [
  { id: 'f-1', name: 'Paneer (Cottage Cheese)', category: 'Dairy', unit: '100g', calories: 265, protein: 18, carbs: 4, fat: 20 },
  { id: 'f-2', name: 'Chicken Breast (Grilled)', category: 'Poultry', unit: '100g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'f-3', name: 'Rolled Oats', category: 'Grains', unit: '100g', calories: 389, protein: 16.9, carbs: 66, fat: 6.9 },
  { id: 'f-4', name: 'Whole Eggs (Boiled)', category: 'Protein', unit: '2 Large (100g)', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { id: 'f-5', name: 'White Rice (Cooked)', category: 'Grains', unit: '100g', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { id: 'f-6', name: 'Whey Protein Isolate', category: 'Supplements', unit: '1 Scoop (30g)', calories: 120, protein: 25, carbs: 1, fat: 0.5 },
  { id: 'f-7', name: 'Yellow Dal (Cooked)', category: 'Pulses', unit: '100g', calories: 116, protein: 9, carbs: 20, fat: 1.5 },
  { id: 'f-8', name: 'Whole Wheat Roti', category: 'Breads', unit: '1 Roti (40g)', calories: 120, protein: 3.5, carbs: 22, fat: 1.2 },
  { id: 'f-9', name: 'Almonds (Raw)', category: 'Nuts', unit: '30g (Handful)', calories: 172, protein: 6, carbs: 6, fat: 15 },
  { id: 'f-10', name: 'Greek Yogurt (Low Fat)', category: 'Dairy', unit: '150g', calories: 110, protein: 15, carbs: 6, fat: 2 }
];

export const INITIAL_USER = {
  name: 'Kayna',
  email: 'kayna@fitverse.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  weight: 70,
  targetWeight: 65,
  height: 180,
  age: 24,
  gender: 'Male',
  level: 12,
  xp: 1200,
  nextLevelXp: 2000,
  streak: 7,
  coins: 450,
  isPremium: true
};

export const ACHIEVEMENTS = [
  { id: 'ach-1', title: 'First Steps', description: 'Log your very first workout', icon: '🏋️', unlocked: true },
  { id: 'ach-2', title: '7-Day Titan', description: 'Maintain a 7-day workout streak', icon: '🔥', unlocked: true },
  { id: 'ach-3', title: 'Iron Warrior', description: 'Complete 30 Workouts', icon: '⚡', unlocked: false },
  { id: 'ach-4', title: 'Calorie Destroyer', description: 'Burn over 10,000 Total Calories', icon: '💥', unlocked: true },
  { id: 'ach-5', title: 'Hydration Hero', description: 'Hit 3L Water Goal 5 days in a row', icon: '💧', unlocked: true },
  { id: 'ach-6', title: 'Pose Master', description: 'Use AI Form Checker for perfect squat technique', icon: '🤖', unlocked: false }
];

export const CHALLENGES = [
  { id: 'c-1', name: '30 Days Push-Up Blitz', totalDays: 30, currentDay: 14, participants: 1420, xpReward: 500, category: 'Chest & Core' },
  { id: 'c-2', name: '100 Squats Daily Challenge', totalDays: 14, currentDay: 5, participants: 980, xpReward: 350, category: 'Legs & Endurance' },
  { id: 'c-3', name: 'Summer Shred Fat Burn', totalDays: 21, currentDay: 18, participants: 3200, xpReward: 800, category: 'Full Body HIIT' }
];

export const LEADERBOARD = [
  { rank: 1, name: 'Aarav Sharma', xp: 4850, streak: 32, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100' },
  { rank: 2, name: 'Kayna (You)', xp: 3450, streak: 7, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
  { rank: 3, name: 'Elena Rostova', xp: 3200, streak: 19, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { rank: 4, name: 'David Miller', xp: 2900, streak: 12, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { rank: 5, name: 'Sophia Chen', xp: 2750, streak: 15, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' }
];
