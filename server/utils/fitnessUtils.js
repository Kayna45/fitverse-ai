/**
 * FitVerse AI - Fitness Calculation Engine
 * Calculates personalized BMI, Calories, Protein, and Water goals based on standard formulas.
 */

export const calculateFitnessMetrics = (data) => {
  const age = Number(data.age) || 22;
  const gender = data.gender || 'Female';
  const height = Number(data.height) || 165; // in cm
  const weight = Number(data.weight) || 70; // in kg
  const targetWeight = Number(data.targetWeight) || 65; // in kg
  const activityLevel = data.activityLevel || 'Moderate';
  const goal = data.goal || 'Weight Loss';

  // 1. Calculate BMI
  const heightInMeters = height / 100;
  const bmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));

  // 2. Calculate BMR (Mifflin-St Jeor Equation)
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  if (gender === 'Male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // 3. Calculate TDEE (Total Daily Energy Expenditure) based on Activity Multiplier
  const activityMultipliers = {
    'Sedentary': 1.2,
    'Light': 1.375,
    'Moderate': 1.55,
    'Active': 1.725,
    'Very Active': 1.9
  };
  const multiplier = activityMultipliers[activityLevel] || 1.55;
  const tdee = bmr * multiplier;

  // 4. Calculate Daily Calories Goal based on Fitness Goal
  let caloriesGoal = Math.round(tdee);
  if (goal === 'Weight Loss') {
    caloriesGoal = Math.max(1200, Math.round(tdee - 500));
  } else if (goal === 'Muscle Gain') {
    caloriesGoal = Math.round(tdee + 350);
  }

  // 5. Calculate Daily Protein Goal (grams)
  let proteinGoal = Math.round(weight * 1.8);
  if (goal === 'Weight Loss') {
    proteinGoal = Math.round(weight * 2.0);
  } else if (goal === 'Muscle Gain') {
    proteinGoal = Math.round(weight * 2.2);
  } else if (goal === 'Maintenance') {
    proteinGoal = Math.round(weight * 1.6);
  }

  // 6. Calculate Water Goal (Liters) -> 35ml per kg of weight
  const waterGoal = Number((weight * 0.035).toFixed(1));

  return {
    age,
    gender,
    height,
    weight,
    targetWeight,
    activityLevel,
    goal,
    bmi,
    caloriesGoal,
    proteinGoal,
    waterGoal
  };
};

export const getBmiCategory = (bmi) => {
  if (!bmi) return 'Normal';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25.0) return 'Normal weight';
  if (bmi < 30.0) return 'Overweight';
  return 'Obese';
};
