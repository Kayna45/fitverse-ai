// FitVerse AI - Intelligent AI Service & Prediction Engine

export const askAICoach = async (userPrompt, chatHistory = []) => {
  // Simulate AI delay for smooth experience
  await new Promise(res => setTimeout(res, 800));

  const promptLower = userPrompt.toLowerCase();

  if (promptLower.includes('missed') || promptLower.includes('skip') || promptLower.includes('no time')) {
    return "Don't sweat it! Missing one gym session won't undo your progress. Let me design a 20-minute intense home HIIT bodyweight session right now so you keep your streak burning! 🔥\n\n1. 30 Bodyweight Squats\n2. 20 Push-ups\n3. 40 Mountain Climbers\n4. 1-Min Plank\n\nRepeat for 3 rounds!";
  }

  if (promptLower.includes('diet') || promptLower.includes('food') || promptLower.includes('protein') || promptLower.includes('paneer')) {
    return "To maximize muscle synthesis while leaning down, aim for 1.8g to 2.2g of protein per kg of body weight. Paneer, Whey Isolate, Eggs, and Chicken Breast are top-tier sources! Remember to space out protein intake across 4 balanced meals.";
  }

  if (promptLower.includes('squat') || promptLower.includes('bench') || promptLower.includes('deadlift') || promptLower.includes('form')) {
    return "For heavy compound lifts like Bench Press or Squats, brace your core like someone is about to punch your gut! Keep your feet firmly planted, drive through your heels, and maintain a neutral spine. Try our camera-based AI Form Checker tool for real-time video feedback!";
  }

  if (promptLower.includes('hi') || promptLower.includes('hello') || promptLower.includes('hey')) {
    return "Hey Kayna! 👋 I'm your FitVerse AI Coach. How are we crushing our goals today? Want to log a workout, check your diet macros, or run an AI posture check?";
  }

  return `Great question! Based on your target weight of 78kg and current level, focusing on progressive overload and keeping your daily calories around 2,100 kcal with a 30% protein macro split will give you optimal results. Keep up the dedication! 💪`;
};

export const generateAIWorkoutPlan = async ({ goal, experience, days }) => {
  await new Promise(res => setTimeout(res, 1200));

  const numDays = parseInt(days) || 5;

  const workoutTemplates = {
    MuscleGain: [
      { day: 'Monday', title: 'Chest & Triceps Hypertrophy', exercises: ['Barbell Bench Press (4x10)', 'Incline Dumbbell Press (3x12)', 'Cable Flyes (3x15)', 'Tricep Rope Pushdown (4x12)'] },
      { day: 'Tuesday', title: 'Back & Biceps Thickness', exercises: ['Lat Pulldown (4x10)', 'Bent-Over Barbell Row (3x10)', 'Seated Cable Row (3x12)', 'Barbell Bicep Curl (4x12)'] },
      { day: 'Wednesday', title: 'Legs & Core Destruction', exercises: ['Barbell Back Squat (4x8)', 'Romanian Deadlift (3x10)', 'Leg Press (3x12)', 'Standing Calf Raises (4x15)'] },
      { day: 'Thursday', title: 'Active Recovery & Mobility', exercises: ['Downward-Facing Dog (5 mins)', 'Warrior II Pose (5 mins)', 'Light Treadmill Walk (20 mins)'] },
      { day: 'Friday', title: 'Shoulders & Upper Chest', exercises: ['Overhead Barbell Press (4x8)', 'Dumbbell Lateral Raise (4x15)', 'Face Pulls (3x15)', 'Bodyweight Push-Ups (3x20)'] },
      { day: 'Saturday', title: 'Full Body HIIT Conditioning', exercises: ['Burpees (4x15)', 'Kettlebell Swings (4x20)', 'Walking Lunges (3x20)'] },
      { day: 'Sunday', title: 'Rest & Deep Sleep', exercises: ['Rest Day', 'Hydrate 3.5L', 'Stretching'] }
    ]
  };

  return workoutTemplates.MuscleGain.slice(0, numDays);
};

export const generateAIMealPlan = async ({ goal, diet, budget }) => {
  await new Promise(res => setTimeout(res, 1200));

  return {
    dailyCalories: goal === 'Weight Loss' ? 1800 : 2400,
    proteinGrams: 160,
    carbsGrams: 180,
    fatGrams: 55,
    meals: [
      { type: 'Breakfast', name: 'Oats & Protein Shake', details: '60g Rolled Oats cooked in water + 1 scoop Whey Protein Isolate + 5 Almonds', calories: 420 },
      { type: 'Lunch', name: 'High-Protein Paneer & Rice Bowl', details: '150g Grilled Paneer + 150g White Rice + 1 Bowl Dal + Cucumber Salad', calories: 580 },
      { type: 'Snack', name: 'Boiled Eggs / Greek Yogurt', details: '3 Boiled Egg Whites + 1 Whole Egg or 150g Low Fat Greek Yogurt', calories: 210 },
      { type: 'Dinner', name: 'Soya / Chicken Stir-Fry & Wheat Roti', details: '150g Chicken/Soya Chunks with Bell Peppers + 2 Whole Wheat Rotis', calories: 540 }
    ]
  };
};

export const predictFitnessGoal = (currentWeight, targetWeight, weeklyDeficit = 3500) => {
  const diffKg = Math.abs(currentWeight - targetWeight);
  // 1 kg of fat = approx 7700 kcal
  const totalKcalRequired = diffKg * 7700;
  const weeksRequired = Math.ceil(totalKcalRequired / weeklyDeficit);
  const estimatedDays = weeksRequired * 7;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + estimatedDays);

  return {
    diffKg,
    weeksRequired,
    estimatedDays,
    targetDateFormatted: targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    recommendedDailyDeficit: Math.round(weeklyDeficit / 7),
    confidenceScore: 94
  };
};
