import React, { createContext, useContext, useState, useEffect } from 'react';
import { ACHIEVEMENTS, FOOD_DATABASE } from '../utils/mockData';
import confetti from 'canvas-confetti';
import { apiCall } from '../utils/api';
import { useAuth } from './AuthContext';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [waterIntake, setWaterIntake] = useState(2.5);
  const [waterGoal] = useState(3.0);
  const [sleepHours, setSleepHours] = useState(7.0);
  const [steps, setSteps] = useState(8900);
  const [workoutDuration, setWorkoutDuration] = useState(0);

  const [foodLogs, setFoodLogs] = useState([]);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [progressLogs, setProgressLogs] = useState([]);

  const [achievements, setAchievements] = useState(ACHIEVEMENTS);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchWorkouts();
      fetchNutrition();
      fetchProgress();
    } else {
      setFoodLogs([]);
      setWorkoutLogs([]);
      setProgressLogs([]);
      setWorkoutDuration(0);
    }
  }, [isAuthenticated, token]);

  const fetchWorkouts = async () => {
    try {
      const data = await apiCall('/workouts', 'GET', null, token);
      setWorkoutLogs(data);
      const duration = data.reduce((sum, w) => sum + (w.duration || 15), 0);
      setWorkoutDuration(duration);
    } catch (error) {
      console.error('Failed to fetch workouts', error);
    }
  };

  const fetchNutrition = async () => {
    try {
      const data = await apiCall('/nutrition', 'GET', null, token);
      setFoodLogs(data);
    } catch (error) {
      console.error('Failed to fetch nutrition', error);
    }
  };

  const fetchProgress = async () => {
    try {
      const data = await apiCall('/progress', 'GET', null, token);
      setProgressLogs(data);
    } catch (error) {
      console.error('Failed to fetch progress', error);
    }
  };

  const addWater = (amountLiters) => {
    setWaterIntake(prev => {
      const updated = Math.min(Number((prev + amountLiters).toFixed(2)), 5.0);
      if (updated >= waterGoal && prev < waterGoal) {
        triggerConfetti();
      }
      return updated;
    });
  };

  const logFoodItem = async (food, mealType, amountGram) => {
    const factor = amountGram / 100;
    const body = {
      food: food.name,
      protein: Math.round(food.protein * factor),
      carbs: Math.round(food.carbs * factor),
      fat: Math.round(food.fat * factor),
      calories: Math.round(food.calories * factor),
      mealType
    };

    try {
      const newLog = await apiCall('/nutrition', 'POST', body, token);
      setFoodLogs(prev => [newLog, ...prev]);
    } catch (error) {
      console.error('Failed to add nutrition', error);
    }
  };

  const logWorkoutSession = async (exerciseName, weight, sets, reps) => {
    const caloriesBurned = Math.round(weight * sets * 1.5);
    const body = {
      exerciseName,
      sets: Number(sets),
      reps: Number(reps),
      duration: 15, // Defaulting to 15 min per exercise added
      caloriesBurned
    };

    try {
      const newLog = await apiCall('/workouts', 'POST', body, token);
      setWorkoutLogs(prev => [newLog, ...prev]);
      setWorkoutDuration(prev => prev + 15);
      triggerConfetti();
    } catch (error) {
      console.error('Failed to add workout', error);
    }
  };

  const logProgress = async (weight, bodyFat) => {
    try {
      const body = { weight: Number(weight), bodyFat: Number(bodyFat) };
      const newLog = await apiCall('/progress', 'POST', body, token);
      setProgressLogs(prev => [...prev, newLog]);
    } catch (error) {
      console.error('Failed to add progress', error);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const caloriesConsumed = foodLogs.reduce((sum, item) => sum + (item.calories || 0), 0);
  const totalProtein = foodLogs.reduce((sum, item) => sum + (item.protein || 0), 0);
  const totalCarbs = foodLogs.reduce((sum, item) => sum + (item.carbs || 0), 0);
  const totalFat = foodLogs.reduce((sum, item) => sum + (item.fat || 0), 0);

  return (
    <WorkoutContext.Provider value={{
      waterIntake,
      waterGoal,
      addWater,
      sleepHours,
      setSleepHours,
      steps,
      setSteps,
      workoutDuration,
      foodLogs,
      logFoodItem,
      workoutLogs,
      logWorkoutSession,
      progressLogs,
      logProgress,
      achievements,
      caloriesConsumed,
      totalProtein,
      totalCarbs,
      totalFat,
      triggerConfetti
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);
