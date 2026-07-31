import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  Bot,
  BarChart3,
  Trophy,
  User,
  Settings,
  ShieldAlert,
  Flame,
  Zap,
  Sparkles,
  Camera,
  Mic,
  Users
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Sidebar() {
  const { t } = useLanguage();

  const navItems = [
    { path: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { path: '/workout', label: t('workout'), icon: Dumbbell, badge: '100+' },
    { path: '/nutrition', label: t('nutrition'), icon: UtensilsCrossed },
    { path: '/ai-coach', label: t('aiCoach'), icon: Bot, isAi: true },
    { path: '/analytics', label: t('analytics'), icon: BarChart3 },
    { path: '/community', label: t('challenges'), icon: Trophy, badge: 'Hot' },
    { path: '/profile', label: t('profile'), icon: User },
    { path: '/settings', label: t('settings'), icon: Settings },
    { path: '/admin', label: 'Admin', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-white/10 hidden md:flex flex-col justify-between min-h-[calc(100vh-65px)] p-4">
      {/* Navigation Items */}
      <div className="space-y-1.5">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-3 mb-2">Navigation</p>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${item.isAi ? 'text-cyan-400 animate-pulse' : ''}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Killer Features Shortcut Card */}
      <div className="bg-gradient-to-br from-emerald-950/60 to-cyan-950/60 border border-emerald-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all"></div>
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>5 Killer Features Ready</span>
        </div>
        <p className="text-[11px] text-gray-300 mb-3">AI Form Checker, Voice Coach, Live Room & Predictor active.</p>
        <NavLink
          to="/ai-coach"
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-lg shadow-emerald-500/30"
        >
          <Bot className="w-4 h-4" />
          <span>Open AI Suite</span>
        </NavLink>
      </div>
    </aside>
  );
}
