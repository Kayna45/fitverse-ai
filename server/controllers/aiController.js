import { GoogleGenAI } from '@google/genai';

// Initialize Gemini Client safely
let ai = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (e) {
  console.warn("Gemini API Key missing or invalid.");
}

export const chatCoach = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, error: 'GEMINI_API_KEY is not configured.' });
    }

    const systemPrompt = `You are FitVerse AI, a world-class personal fitness coach and nutritionist.
Keep your responses concise, highly motivating, and focused on progressive overload, macronutrient balance, and scientific facts.
Always address the user with high energy!`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({ success: true, reply: response.text });
  } catch (err) {
    console.error('AI Chat Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const generateWorkout = async (req, res) => {
  try {
    const { goal = 'Muscle Gain', days = 5, level = 'Beginner' } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, error: 'GEMINI_API_KEY is not configured.' });
    }

    const prompt = `Generate a ${days}-day workout plan for a ${level} aiming for ${goal}. 
Return ONLY a valid JSON array where each object has:
- "day" (e.g., "Monday")
- "title" (e.g., "Chest & Triceps")
- "exercises" (array of strings, e.g., ["Bench Press (4x10)"])`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      }
    });

    const plan = JSON.parse(response.text);
    res.json({ success: true, plan });
  } catch (err) {
    console.error('AI Workout Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const predictGoal = async (req, res) => {
  try {
    const { currentWeight = 70, targetWeight = 65, goal = 'Weight Loss', caloriesIntake = 2000 } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      // Fallback if no API key
      const diff = currentWeight - targetWeight;
      const weeks = Math.ceil((diff * 7700) / 3500);
      return res.json({ success: true, currentWeight, targetWeight, estimatedWeeks: Math.abs(weeks) });
    }

    const prompt = `A user wants to go from ${currentWeight}kg to ${targetWeight}kg. Their goal is ${goal} and they eat ${caloriesIntake} calories daily. 
Analyze this and predict realistically how many weeks it will take.
Return ONLY a valid JSON object with:
- "currentWeight": ${currentWeight}
- "targetWeight": ${targetWeight}
- "estimatedWeeks": (number)
- "advice": (short string)`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      }
    });

    const prediction = JSON.parse(response.text);
    res.json({ success: true, ...prediction });
  } catch (err) {
    console.error('AI Predict Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
