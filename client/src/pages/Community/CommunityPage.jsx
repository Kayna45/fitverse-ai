import React, { useState } from 'react';
import { Trophy, Flame, Award, Heart, MessageSquare, Share2, Sparkles, Users, CheckCircle2 } from 'lucide-react';
import { CHALLENGES, LEADERBOARD } from '../../utils/mockData';
import { useAuth } from '../../context/AuthContext';

export default function CommunityPage() {
  const { user, addXP } = useAuth();
  const [activeTab, setActiveTab] = useState('challenges'); // 'challenges' | 'leaderboard' | 'feed'
  const [joinedChallenges, setJoinedChallenges] = useState(['c-1']);

  const [posts, setPosts] = useState([
    {
      id: 'p-1',
      author: 'Aarav Sharma',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
      time: '2 hours ago',
      content: 'Just smashed a 100kg Bench Press 4x8 PR! 🏋️‍♂️ Thanks to FitVerse AI Form Checker for fixing my elbow flare.',
      likes: 42,
      comments: 7,
      liked: false
    },
    {
      id: 'p-2',
      author: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      time: '5 hours ago',
      content: 'Finished Day 14 of the 30-Day Push-up Blitz! 💥 Feeling stronger than ever.',
      likes: 89,
      comments: 12,
      liked: true
    }
  ]);

  const toggleJoinChallenge = (id) => {
    if (joinedChallenges.includes(id)) {
      setJoinedChallenges(prev => prev.filter(c => c !== id));
    } else {
      setJoinedChallenges(prev => [...prev, id]);
      addXP(200);
      alert('Challenge Joined! +200 XP Granted to your account! 🔥');
    }
  };

  const handleLikePost = (id) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Trophy className="w-8 h-8 text-amber-400" />
            <span>Community & Challenges</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Seasonal Fitness Challenges, Global Leaderboard Rankings & Social Feed</p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'challenges' ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' : 'text-gray-400 hover:text-white'
            }`}
          >
            🎯 Challenges
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'leaderboard' ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' : 'text-gray-400 hover:text-white'
            }`}
          >
            🏆 Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'feed' ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' : 'text-gray-400 hover:text-white'
            }`}
          >
            💬 Social Feed
          </button>
        </div>
      </div>

      {/* 1. CHALLENGES TAB */}
      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHALLENGES.map((item) => {
            const isJoined = joinedChallenges.includes(item.id);
            return (
              <div key={item.id} className="glass-card p-6 rounded-3xl border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1 font-bold">
                      <Users className="w-3.5 h-3.5 text-cyan-400" /> {item.participants} Joined
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-2">{item.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">Duration: {item.totalDays} Days • Goal: Daily Rep Target</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-300 font-semibold">
                    <span>Progress ({item.currentDay}/{item.totalDays} Days)</span>
                    <span className="text-amber-400 font-bold">+{item.xpReward} XP</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${(item.currentDay / item.totalDays) * 100}%` }}></div>
                  </div>
                </div>

                <button
                  onClick={() => toggleJoinChallenge(item.id)}
                  className={`w-full font-bold text-xs py-3 rounded-xl transition-all shadow-md ${
                    isJoined
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20'
                  }`}
                >
                  {isJoined ? '✔ Challenge Active' : 'Join Challenge (+200 XP)'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. LEADERBOARD TAB */}
      {activeTab === 'leaderboard' && (
        <div className="glass-card p-6 rounded-3xl border border-white/10 max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Global XP Leaderboard</span>
            </h2>
            <span className="text-xs text-emerald-400 font-bold">Updated Live</span>
          </div>

          <div className="space-y-3">
            {LEADERBOARD.map((usr) => (
              <div
                key={usr.rank}
                className={`glass-panel p-4 rounded-2xl flex items-center justify-between border transition-all ${
                  usr.name.includes('You') ? 'border-amber-400/60 bg-amber-400/10' : 'border-white/5'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs ${
                    usr.rank === 1 ? 'bg-amber-400 text-black' : usr.rank === 2 ? 'bg-slate-300 text-black' : 'bg-amber-700 text-white'
                  }`}>
                    #{usr.rank}
                  </span>
                  <img src={usr.avatar} alt={usr.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{usr.name}</h4>
                    <p className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" /> {usr.streak} Day Streak
                    </p>
                  </div>
                </div>

                <span className="text-sm font-extrabold text-emerald-400">{usr.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SOCIAL FEED TAB */}
      {activeTab === 'feed' && (
        <div className="glass-card p-6 rounded-3xl border border-white/10 max-w-xl mx-auto space-y-6">
          <h2 className="text-base font-bold text-white">Community Activity Feed</h2>
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="glass-panel p-4 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center space-x-3">
                  <img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{post.author}</h4>
                    <p className="text-[10px] text-gray-400">{post.time}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed">{post.content}</p>

                <div className="flex items-center space-x-4 border-t border-white/5 pt-2 text-xs text-gray-400">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center space-x-1 font-semibold transition-colors ${post.liked ? 'text-red-400' : 'hover:text-white'}`}
                  >
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-red-400' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  <span className="flex items-center space-x-1 font-semibold hover:text-white cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
