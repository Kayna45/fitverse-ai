import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './pages/Home/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import WorkoutPage from './pages/Workout/WorkoutPage';
import NutritionPage from './pages/Nutrition/NutritionPage';
import AICoachPage from './pages/AICoach/AICoachPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import CommunityPage from './pages/Community/CommunityPage';
import ProfilePage from './pages/Profile/ProfilePage';
import SettingsPage from './pages/Settings/SettingsPage';
import AdminPage from './pages/Admin/AdminPage';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { WorkoutProvider } from './context/WorkoutContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white/10 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function AppLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white/10 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Landing Route */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />}
      />

      {/* Public Login Route */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />

      {/* Protected App Shell & Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col selection:bg-emerald-500 selection:text-black">
              <Navbar />
              <div className="flex flex-1 max-w-7xl w-full mx-auto">
                <Sidebar />
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/workout" element={<WorkoutPage />} />
                    <Route path="/nutrition" element={<NutritionPage />} />
                    <Route path="/ai-coach" element={<AICoachPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <WorkoutProvider>
            <Router>
              <AppLayout />
            </Router>
          </WorkoutProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
