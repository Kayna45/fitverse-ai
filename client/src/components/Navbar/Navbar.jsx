import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell, Flame, Bell, Globe, Palette, Sparkles, User as UserIcon, Crown, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useWorkout } from '../../context/WorkoutContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, changeTheme } = useTheme();
  const { lang, changeLanguage, t } = useLanguage();
  const { achievements } = useWorkout();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login', { replace: true });
  };

  const themes = [
    { id: 'dark', label: '🌙 Dark' },
    { id: 'light', label: '☀️ Light' },
    { id: 'blue', label: '⚡ Blue' },
    { id: 'purple', label: '🔮 Purple' },
    { id: 'cyberpunk', label: '🤖 Cyberpunk' },
    { id: 'neon', label: '💖 Neon' },
  ];

  const languages = [
    { id: 'en', label: '🇬🇧 English' },
    { id: 'hi', label: '🇮🇳 हिंदी' },
    { id: 'fr', label: '🇫🇷 Français' },
    { id: 'de', label: '🇩🇪 Deutsch' },
  ];

  const currentUser = user || {
    name: 'User',
    email: 'user@fitverse.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
    streak: 0
  };

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/10 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <Dumbbell className="w-6 h-6 text-black font-bold" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              FitVerse <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
              <Crown className="w-4 h-4 text-amber-400" />
            </span>
            <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold">AI Fitness Ecosystem</span>
          </div>
        </Link>

        {/* Center Quick Stats */}
        <div className="hidden md:flex items-center space-x-4 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {/* Level & XP */}
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-black px-2 py-0.5 rounded-full text-[11px] font-bold">
              Lvl {currentUser.level || 1}
            </span>
            <div className="w-24 bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, ((currentUser.xp || 0) / (currentUser.nextLevelXp || 1000)) * 100)}%` }}
              ></div>
            </div>
            <span className="text-gray-300 text-[11px]">{currentUser.xp || 0}/{currentUser.nextLevelXp || 1000} XP</span>
          </div>

          <div className="w-px h-4 bg-white/20"></div>

          {/* Streak */}
          <div className="flex items-center space-x-1 text-xs font-bold text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
            <span>{currentUser.streak || 0} {t('streak')}</span>
          </div>
        </div>

        {/* Right Action Icons & User Dropdown */}
        <div className="flex items-center space-x-3">
          {/* Theme Dropdown */}
          <div className="relative group">
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 text-gray-300 hover:text-white transition-all">
              <Palette className="w-5 h-5" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-40 glass-card rounded-xl p-2 hidden group-hover:block shadow-2xl z-50">
              <p className="text-[10px] text-gray-400 uppercase font-semibold px-2 py-1">Themes</p>
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => changeTheme(t.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    theme === t.id ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="relative group">
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 text-gray-300 hover:text-white transition-all">
              <Globe className="w-5 h-5" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-36 glass-card rounded-xl p-2 hidden group-hover:block shadow-2xl z-50">
              <p className="text-[10px] text-gray-400 uppercase font-semibold px-2 py-1">Language</p>
              {languages.map(l => (
                <button
                  key={l.id}
                  onClick={() => changeLanguage(l.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    lang === l.id ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 text-gray-300 hover:text-white transition-all relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-72 glass-card rounded-2xl p-4 shadow-2xl z-50 border border-emerald-500/30">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Reminders & Alerts</h4>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">3 Active</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl">
                    <span className="text-base">💧</span>
                    <div>
                      <p className="font-semibold text-white">Water Goal Reminder</p>
                      <p className="text-[10px] text-gray-400">Drink +500ml water to reach target!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl">
                    <span className="text-base">🏋️</span>
                    <div>
                      <p className="font-semibold text-white">Daily Workout</p>
                      <p className="text-[10px] text-gray-400">Your planned workout is ready.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu & Logout */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-all text-left"
            >
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-emerald-500/50"
              />
              <span className="hidden sm:inline-block text-xs font-bold text-white max-w-[90px] truncate">{currentUser.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 glass-card rounded-2xl p-3 shadow-2xl z-50 border border-emerald-500/30 text-xs">
                {/* User Header */}
                <div className="p-2 border-b border-white/10 mb-2">
                  <p className="font-extrabold text-white truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-gray-400 truncate">{currentUser.email}</p>
                </div>

                {/* Menu Items */}
                <Link
                  to="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-all"
                >
                  <UserIcon className="w-4 h-4 text-emerald-400" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-white/10 text-gray-200 hover:text-white transition-all"
                >
                  <Settings className="w-4 h-4 text-cyan-400" />
                  <span>Settings & Preferences</span>
                </Link>

                <div className="my-1.5 h-px bg-white/10"></div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2.5 p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold transition-all border border-red-500/20"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Sign Out / Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
