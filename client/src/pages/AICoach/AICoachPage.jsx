import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Camera,
  Mic,
  MicOff,
  Users,
  Award,
  Sparkles,
  Play,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Zap,
  Volume2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { askAICoach, predictFitnessGoal } from '../../services/aiService';
import voiceService from '../../services/voiceService';

export default function AICoachPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'form' | 'voice' | 'live' | 'prediction'

  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState
([
    { sender: 'ai', text: `Hi ${user.name}! 👋 I am your Personal AI Fitness Coach. How can I help you today? Ask me about your routine, a missed workout, or posture tips!` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Form Checker state
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [postureFeedback, setPostureFeedback] = useState('Stand in frame to begin AI Squat Posture Detection...');
  const [postureScore, setPostureScore] = useState(96);

  // Voice Coach state
  const [isListening, setIsListening] = useState(false);
  const [voiceLog, setVoiceLog] = useState([
    'Voice Coach initialized. Say "Start Chest Workout" or "Log 20 Pushups".'
  ]);

  // Live Room state
  const [liveParticipants, setLiveParticipants] = useState([
    { name: 'Kayna (You)', reps: 18, status: 'Squatting...', avatar: user.avatar },
    { name: 'Aarav S.', reps: 24, status: 'Pushups...', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100' },
    { name: 'Elena R.', reps: 15, status: 'Plank 45s', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' }
  ]);

  // Prediction state
  const prediction = predictFitnessGoal(user.weight, user.targetWeight, 3500);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    const response = await askAICoach(userText, messages);
    setIsTyping(false);
    setMessages(prev => [...prev, { sender: 'ai', text: response }]);
  };

  // Camera Form Checker setup
  const toggleCamera = async () => {
    if (isCameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      setIsCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
        startPostureSimulation();
      } catch (err) {
        alert('Camera access required for live pose tracking simulation.');
      }
    }
  };

  const startPostureSimulation = () => {
    setInterval(() => {
      const feedbacks = [
        '✨ Perfect hip depth! Keep chest upright.',
        '⚠️ Knees slightly caving inward — flare out toes 15 degrees.',
        '✅ Excellent spine alignment! Drive up through mid-foot.',
        '💪 Great rep execution! Squeeze glutes at peak.'
      ];
      const randomFb = feedbacks[Math.floor(Math.random() * feedbacks.length)];
      setPostureFeedback(randomFb);
      setPostureScore(Math.floor(90 + Math.random() * 9));
    }, 4000);
  };

  // Voice listener toggle
  const toggleVoiceListener = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      const started = voiceService.startListening((command) => {
        setVoiceLog(prev => [`Command: "${command}" -> Processed`, ...prev]);
        voiceService.speak(`Logged command: ${command}`);
      });
      if (started) {
        setIsListening(true);
        voiceService.speak("Voice coach active. Listening for commands.");
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Feature Selector */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Bot className="w-8 h-8 text-cyan-400 animate-pulse" />
            <span>AI Coach Suite (5 Killer Features)</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Interactive Conversational Chat, AI Form Checker, Voice Coach, Live Room & Fitness Predictor</p>
        </div>

        {/* Feature Tabs */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1.5 rounded-2xl overflow-x-auto w-full lg:w-auto">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'chat' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white'
            }`}
          >
            💬 AI Chat Coach
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'form' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-gray-400 hover:text-white'
            }`}
          >
            🎥 AI Form Checker
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'voice' ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' : 'text-gray-400 hover:text-white'
            }`}
          >
            🎙️ Voice Coach
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'live' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white'
            }`}
          >
            👥 Live Room
          </button>
          <button
            onClick={() => setActiveTab('prediction')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'prediction' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-400 hover:text-white'
            }`}
          >
            🔮 Goal Predictor
          </button>
        </div>
      </div>

      {/* 1. CHAT INTERFACE */}
      {activeTab === 'chat' && (
        <div className="glass-card rounded-3xl border border-white/10 flex flex-col h-[580px] overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center font-bold text-black">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">FitVerse AI Coach</h3>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Online • GPT-4o Powered
                </span>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  m.sender === 'user' ? 'bg-emerald-500 text-black' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {m.sender === 'user' ? 'You' : 'AI'}
                </div>
                <div className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed whitespace-pre-line shadow-lg ${
                  m.sender === 'user'
                    ? 'bg-emerald-500 text-black font-semibold rounded-tr-none'
                    : 'glass-panel border border-white/10 text-gray-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-xs text-cyan-400 italic">
                <Bot className="w-4 h-4 animate-spin" />
                <span>AI Coach is typing response...</span>
              </div>
            )}
            <div ref={chatBottomRef}></div>
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5 flex items-center gap-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask anything: 'I missed gym today', 'Paneer vs Chicken protein', 'Fix squat form'..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold p-3 rounded-2xl shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* 2. AI FORM CHECKER (CAMERA POSTURE TRACKER) */}
      {activeTab === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 lg:col-span-2 space-y-4 text-center">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                MediaPipe Landmark Tracking Simulation
              </span>
              <button
                onClick={toggleCamera}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                {isCameraActive ? 'Turn Off Camera' : 'Start Camera Pose Tracker'}
              </button>
            </div>

            {/* Video Canvas Stream Display */}
            <div className="relative w-full h-80 bg-black/60 rounded-2xl overflow-hidden border border-emerald-500/30 flex items-center justify-center">
              {isCameraActive ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
              ) : (
                <div className="text-center p-6 space-y-2">
                  <Camera className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <p className="text-sm font-bold text-white">Click "Start Camera" to enable video posture check</p>
                  <p className="text-xs text-gray-400">Position yourself 5ft back for full body squat alignment analysis.</p>
                </div>
              )}

              {/* Overlay Landmark Joints Simulation */}
              {isCameraActive && (
                <div className="absolute inset-0 pointer-events-none border-2 border-emerald-400/40 m-4 rounded-xl flex items-center justify-center">
                  <span className="text-xs font-bold bg-black/70 text-emerald-400 px-3 py-1 rounded-full border border-emerald-400/50">
                    Joint Alignment Score: {postureScore}%
                  </span>
                </div>
              )}
            </div>

            {/* Live Feedback Text Box */}
            <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/30 text-emerald-400 font-bold text-xs">
              {postureFeedback}
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white">Posture Guidance Rules</h3>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Keep feet shoulder-width apart angled slightly outward.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Break at hips and knees simultaneously for deep parallel depth.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Ensure spine maintains natural neutral curvature.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* 3. VOICE-CONTROLLED WORKOUT */}
      {activeTab === 'voice' && (
        <div className="glass-card p-8 rounded-3xl border border-amber-500/30 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto ring-4 ring-amber-500/30 animate-pulse">
            <Mic className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">Voice-Controlled Workout Coach</h2>
            <p className="text-xs text-gray-400 mt-1">Speak commands hands-free while training at the gym or home.</p>
          </div>

          <button
            onClick={toggleVoiceListener}
            className={`w-full font-extrabold text-sm py-4 rounded-2xl transition-all shadow-xl ${
              isListening
                ? 'bg-red-500 hover:bg-red-400 text-white shadow-red-500/30 animate-pulse'
                : 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/30'
            }`}
          >
            {isListening ? '🛑 Stop Voice Coach' : '🎙️ Activate Hands-Free Voice Listener'}
          </button>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-left space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Recent Recognized Commands</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {voiceLog.map((log, i) => (
                <p key={i} className="text-xs text-gray-300 font-mono">→ {log}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. LIVE MULTIPLAYER WORKOUT ROOM */}
      {activeTab === 'live' && (
        <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-base">
              <Users className="w-6 h-6 animate-pulse" />
              <span>Live Friend Workout Room #402</span>
            </div>
            <span className="text-xs font-bold bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
              3 Athletes Active Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {liveParticipants.map((p, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-white/10 text-center space-y-3 relative overflow-hidden">
                <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-purple-500/50" />
                <div>
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  <p className="text-xs text-purple-300 font-semibold">{p.status}</p>
                </div>
                <div className="bg-purple-500/20 py-1.5 rounded-xl border border-purple-500/30 text-purple-200 font-extrabold text-xs">
                  🔥 {p.reps} Reps Logged
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. FITNESS PREDICTION ENGINE */}
      {activeTab === 'prediction' && (
        <div className="glass-card p-8 rounded-3xl border border-indigo-500/30 space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 text-indigo-400 font-bold text-xl">
            <Award className="w-7 h-7" />
            <span>AI Fitness Target Prediction Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-2xl font-extrabold text-indigo-400">{prediction.targetDateFormatted}</p>
              <p className="text-xs text-gray-400 mt-1">Estimated Goal Reach Date</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-2xl font-extrabold text-emerald-400">{prediction.weeksRequired} Weeks</p>
              <p className="text-xs text-gray-400 mt-1">Total Duration ({prediction.estimatedDays} Days)</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-2xl font-extrabold text-amber-400">{prediction.confidenceScore}%</p>
              <p className="text-xs text-gray-400 mt-1">AI Calculation Confidence</p>
            </div>
          </div>

          <div className="bg-indigo-500/10 p-5 rounded-2xl border border-indigo-500/30 text-xs text-gray-300 leading-relaxed">
            <h4 className="font-bold text-indigo-400 text-sm mb-1">AI Recommendation Breakdown:</h4>
            Based on your current weight of <span className="font-bold text-white">{user.weight}kg</span> and target of <span className="font-bold text-white">{user.targetWeight}kg</span>, maintaining a daily calorie deficit of <span className="font-bold text-amber-400">{prediction.recommendedDailyDeficit} kcal</span> alongside 4 weekly compound workout sessions guarantees target body composition by {prediction.targetDateFormatted}.
          </div>
        </div>
      )}
    </div>
  );
}
