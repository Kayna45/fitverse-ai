import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Lock, Mail, Key, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('kayna@fitverse.ai');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOtpModal(true);
  };

  const verifyOtpAndLogin = async () => {
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register({ name, email, password });
      }
      navigate('/dashboard');
    } catch (error) {
      alert(isLogin ? "Invalid credentials. Please try again." : "Registration failed. Email might be in use.");
      setShowOtpModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-white/10 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-black text-xl">
              <Dumbbell className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold">FitVerse <span className="text-emerald-400">AI</span></span>
          </Link>
          <h2 className="text-2xl font-bold text-white">{isLogin ? 'Welcome Back 👋' : 'Create Account 🚀'}</h2>
          <p className="text-xs text-gray-400 mt-1">{isLogin ? 'Sign in to resume your AI coaching routine' : 'Sign up to start your fitness journey'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <div className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 flex items-center justify-center">👤</div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
                  placeholder="Kayna Bansal"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
                placeholder="kayna@fitverse.ai"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/10 text-emerald-500 focus:ring-0 bg-white/5"
              />
              <span>Remember Me</span>
            </label>
            <button type="button" onClick={() => alert('Password reset link sent to ' + email)} className="text-emerald-400 font-semibold hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2"
          >
            <span>{isLogin ? 'Continue to Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-400 font-bold hover:underline focus:outline-none"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <div className="my-6 flex items-center space-x-3">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Or {isLogin ? 'Sign In' : 'Sign Up'} With</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Google OAuth Simulation Button */}
        <button
          onClick={verifyOtpAndLogin}
          className="w-full glass-panel hover:bg-white/10 text-white font-semibold text-xs py-3 rounded-xl border border-white/15 flex items-center justify-center space-x-2 transition-all"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
          <span>{isLogin ? 'Sign In' : 'Sign Up'} with Google</span>
        </button>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card max-w-sm w-full rounded-3xl p-6 border border-emerald-500/40 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">OTP Verification</h3>
            <p className="text-xs text-gray-400 mt-1 mb-6">Enter 4-digit code sent to {email}</p>

            <div className="flex justify-center gap-3 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  defaultValue={i + 1}
                  className="w-12 h-12 bg-white/5 border border-emerald-500/40 rounded-xl text-center font-bold text-lg text-emerald-400 focus:outline-none"
                />
              ))}
            </div>

            <button
              onClick={verifyOtpAndLogin}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              Verify & Launch Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
