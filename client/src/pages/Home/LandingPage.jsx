import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Bot,
  Zap,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Star,
  Award,
  ArrowRight,
  Play
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function LandingPage() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState(null);

  const testimonials = [
    {
      name: 'Rohan Verma',
      role: 'Software Engineer',
      quote: 'FitVerse AI generated a 5-day workout plan that completely transformed my body in 12 weeks! The AI Form Checker fixed my squat posture.',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      rating: 5
    },
    {
      name: 'Ananya Sharma',
      role: 'UI Designer',
      quote: 'The AI Meal Generator made eating clean so easy and budget friendly! I lost 6kg while eating Paneer & Oats daily.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5
    },
    {
      name: 'Marcus Vance',
      role: 'CrossFit Athlete',
      quote: 'Voice-controlled workouts and the Live Room feature with friends keep me 100% accountable. Best fitness app hands down!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5
    }
  ];

  const faqs = [
    { q: 'How does the AI Form Checker work?', a: 'AI Form Checker uses your device camera or uploaded exercise video with landmark pose tracking to detect joint angles and give real-time audio/visual posture recommendations.' },
    { q: 'Can I use FitVerse AI without a paid subscription?', a: 'Yes! FitVerse AI offers a lifetime free plan with 100+ exercises, basic AI Coach chat, workout logger, water & sleep tracking, and progress charts.' },
    { q: 'How does Voice-Controlled Workout work?', a: 'Simply speak commands like "Start chest workout" or "Log 50kg 12 reps". The app listens via your microphone and speaks back set audio confirmations.' },
    { q: 'Does FitVerse AI support Indian diets like Paneer and Dal?', a: 'Absolutely! Our food database includes comprehensive Indian and Global food items with exact calorie and protein macro breakdowns.' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-emerald-500 selection:text-black overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none"></div>

      {/* Header Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-emerald-500/30">
            F
          </div>
          <span className="text-2xl font-extrabold tracking-tight">FitVerse <span className="text-emerald-400">AI</span></span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link
            to="/dashboard"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center space-x-1.5"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Next Gen AI Fitness Revolution</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          Transform Your Body <br />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            With AI Coach
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Your hyper-personalized AI trainer for custom workouts, smart meal plans, real-time posture analysis, and live multiplayer fitness sessions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>Start Free Journey</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            to="/ai-coach"
            className="w-full sm:w-auto glass-panel hover:bg-white/10 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all border border-white/15 flex items-center justify-center space-x-2"
          >
            <Bot className="w-5 h-5 text-cyan-400" />
            <span>Try AI Form Checker</span>
          </Link>
        </div>

        {/* Dynamic Interactive Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Active Users', val: '50,000+' },
            { label: 'Workouts Generated', val: '1.2M+' },
            { label: 'AI Form Accuracy', val: '98.4%' },
            { label: 'Calories Destroyed', val: '500M+' }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 rounded-2xl border border-white/10 text-center hover:border-emerald-500/50 transition-all">
              <h3 className="text-2xl md:text-3xl font-extrabold text-emerald-400">{stat.val}</h3>
              <p className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 KILLER FEATURES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            Powered by Deep Learning & Computer Vision
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4">5 Killer Features That Recruiter Love</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1. AI Form Checker</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Camera pose landmark tracking evaluates your squat and bench press posture to prevent injury and maximize gains.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-cyan-500/50">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Voice-Controlled Workout</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Hands-free voice commands ("Start workout", "Log 50kg 12 reps") with audible audio coach feedback.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-purple-500/50">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Live Workout Session</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Real-time multiplayer workout room with live video sync, friend rep tracking, and live leaderboards.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-amber-500/50 md:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">4. AI Fitness Prediction Engine</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Analyzes your calorie deficit and exercise adherence to predict the exact date you will reach your target 78kg goal.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">5. Gamification & XP System</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Level up, earn 15+ unlockable badges, compete on global leaderboards, and complete seasonal challenges.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Loved by Athletes Worldwide</h2>
          <p className="text-gray-400 text-sm mt-2">See how FitVerse AI transforms daily fitness routines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl border border-white/10">
              <div className="flex items-center space-x-1 text-amber-400 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-300 italic mb-6">"{t.quote}"</p>
              <div className="flex items-center space-x-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50" />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 className="text-3xl font-extrabold text-white text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-5 text-base font-bold text-white flex items-center justify-between"
              >
                <span>{faq.q}</span>
                <span className="text-emerald-400 font-bold">{activeFaq === idx ? '-' : '+'}</span>
              </button>
              {activeFaq === idx && (
                <div className="p-5 pt-0 text-sm text-gray-400 border-t border-white/5 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-gray-500">
          <p>© 2026 FitVerse AI. All rights reserved. Built with React, Node.js, Express, MongoDB & AI.</p>
        </div>
      </footer>
    </div>
  );
}
