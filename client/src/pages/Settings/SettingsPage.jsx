import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Palette,
  Globe,
  Bell,
  Watch,
  Music,
  CheckCircle2,
  Play,
  Volume2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function SettingsPage() {
  const { theme, changeTheme } = useTheme();
  const { lang, changeLanguage } = useLanguage();

  const [notifications, setNotifications] = useState({
    workout: true,
    water: true,
    sleep: true,
    meal: false
  });

  const [wearableSync, setWearableSync] = useState({
    googleFit: true,
    appleHealth: false,
    samsungHealth: true
  });

  const themes = [
    { id: 'dark', name: '🌙 Dark Mode' },
    { id: 'light', name: '☀️ Light Mode' },
    { id: 'blue', name: '⚡ Electric Blue' },
    { id: 'purple', name: '🔮 Royal Purple' },
    { id: 'cyberpunk', name: '🤖 Cyberpunk Neon' },
    { id: 'neon', name: '💖 Sunset Pink' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header Bar */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <SettingsIcon className="w-8 h-8 text-emerald-400" />
          <span>App Preferences & Settings</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Configure Theme Engine, Multi-language, Notifications, Wearable Sync & Spotify Workout Music</p>
      </div>

      {/* 🎨 THEME SWITCHER */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-cyan-400" />
          <span>Color Themes (6 Preset Options)</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => changeTheme(t.id)}
              className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all ${
                theme === t.id
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 ring-2 ring-emerald-500/30'
                  : 'glass-panel text-gray-300 hover:text-white border-white/5'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* 🌍 MULTI-LANGUAGE SELECTOR */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-400" />
          <span>Language Preferences</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'en', label: '🇬🇧 English' },
            { id: 'hi', label: '🇮🇳 हिंदी (Hindi)' },
            { id: 'fr', label: '🇫🇷 Français' },
            { id: 'de', label: '🇩🇪 Deutsch' }
          ].map(l => (
            <button
              key={l.id}
              onClick={() => changeLanguage(l.id)}
              className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                lang === l.id
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                  : 'glass-panel text-gray-300 hover:text-white border-white/5'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* ⌚ WEARABLE SYNC & NOTIFICATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Toggles */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <span>Reminder Notifications</span>
          </h3>

          <div className="space-y-3 text-xs">
            {Object.keys(notifications).map(key => (
              <label key={key} className="flex items-center justify-between p-3 rounded-2xl glass-panel cursor-pointer">
                <span className="font-bold text-white capitalize">{key} Reminders</span>
                <input
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={e => setNotifications({ ...notifications, [key]: e.target.checked })}
                  className="w-4 h-4 text-emerald-500 rounded focus:ring-0"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Wearable Sync */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Watch className="w-5 h-5 text-purple-400" />
            <span>Wearable Device Integration</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { id: 'googleFit', name: 'Google Fit', active: wearableSync.googleFit },
              { id: 'appleHealth', name: 'Apple Health', active: wearableSync.appleHealth },
              { id: 'samsungHealth', name: 'Samsung Health', active: wearableSync.samsungHealth }
            ].map(w => (
              <div key={w.id} className="flex items-center justify-between p-3 rounded-2xl glass-panel">
                <span className="font-bold text-white">{w.name}</span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  w.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-400'
                }`}>
                  {w.active ? 'Connected' : 'Sync Off'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🎵 WORKOUT MUSIC SPOTIFY PLAYER WIDGET */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Music className="w-5 h-5 text-emerald-400" />
          <span>Integrated Spotify Workout Music Player</span>
        </h3>

        <div className="bg-black/60 p-4 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Play className="w-6 h-6 fill-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Beast Mode Fitness Mix 2026</h4>
              <p className="text-xs text-gray-400">Curated HIIT & Heavy Lifting Playlist</p>
            </div>
          </div>

          <a
            href="https://spotify.com"
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-500 text-black font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20"
          >
            Open Spotify
          </a>
        </div>
      </div>
    </div>
  );
}
