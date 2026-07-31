import React from 'react';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Activity,
  Award
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';
import { exportToCSV, exportWorkoutReportPDF } from '../../services/exportService';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const { workoutLogs, foodLogs, progressLogs } = useWorkout();

  const weightProgressData = progressLogs && progressLogs.length > 0 
    ? progressLogs.map(log => ({
        date: new Date(log.date).toLocaleDateString(),
        weight: log.weight
      }))
    : [
        { date: 'Start', weight: user.weight },
        { date: 'Current', weight: user.weight },
        { date: 'Target', weight: user.targetWeight }
      ];

  const calorieBurnVsIntakeData = [
    { day: 'Mon', intake: 1950, burn: 2300 },
    { day: 'Tue', intake: 2100, burn: 2450 },
    { day: 'Wed', intake: 1800, burn: 2200 },
    { day: 'Thu', intake: 2050, burn: 2350 },
    { day: 'Fri', intake: 1900, burn: 2500 },
    { day: 'Sat', intake: 2200, burn: 2600 },
    { day: 'Sun', intake: 1850, burn: 2100 }
  ];

  const muscleGroupRadarData = [
    { muscle: 'Chest', score: 85 },
    { muscle: 'Back', score: 78 },
    { muscle: 'Legs', score: 92 },
    { muscle: 'Shoulders', score: 70 },
    { muscle: 'Arms', score: 88 },
    { muscle: 'Core', score: 65 }
  ];

  const handleDownloadPdf = () => {
    exportWorkoutReportPDF(user, workoutLogs, foodLogs);
  };

  const handleDownloadCsv = () => {
    exportToCSV(`FitVerse_Workout_History_${user.name}.csv`, workoutLogs);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-emerald-400" />
            <span>Analytics & Reports</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Multi-metric Interactive Recharts, Monthly Heatmaps & PDF/CSV Export System</p>
        </div>

        {/* Download Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPdf}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF Report</span>
          </button>
          <button
            onClick={handleDownloadCsv}
            className="glass-panel hover:bg-white/10 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/15 flex items-center space-x-1.5 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* GRAPH ROW 1: Weight Progress Line & Calorie Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Trend Line Chart */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Weight Journey Over Time (kg)</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} domain={[70, 95]} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="weight" stroke="#22c55e" strokeWidth={3} dot={{ r: 5, fill: '#22c55e' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calorie Intake vs Burn Bar Chart */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Calories Intake vs Burned</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={calorieBurnVsIntakeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }} />
                <Legend />
                <Bar dataKey="intake" fill="#f59e0b" name="Intake (kcal)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="burn" fill="#38bdf8" name="Burned (kcal)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* GRAPH ROW 2: Muscle Group Radar Chart */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 max-w-xl mx-auto space-y-4">
        <h3 className="text-base font-bold text-white text-center flex items-center justify-center gap-2">
          <Award className="w-5 h-5 text-purple-400" />
          <span>Muscle Group Activation Balance</span>
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={muscleGroupRadarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="muscle" stroke="#9ca3af" fontSize={12} />
              <PolarRadiusAxis stroke="#374151" />
              <Radar name="Volume Score" dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
              <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
