import React from 'react';
import { ShieldAlert, Users, DollarSign, Dumbbell, TrendingUp, BarChart3 } from 'lucide-react';
import { INITIAL_EXERCISES } from '../../utils/mockData';

export default function AdminPage() {
  const adminStats = [
    { label: 'Total Platform Users', val: '52,490', sub: '+12% this month', icon: Users, color: 'text-emerald-400' },
    { label: 'Daily Active Users', val: '12,840', sub: 'Peak 8 PM', icon: TrendingUp, color: 'text-cyan-400' },
    { label: 'Monthly Revenue', val: '$48,250', sub: 'MRR Growth', icon: DollarSign, color: 'text-amber-400' },
    { label: 'Active Exercises', val: '100+', sub: '9 Categories', icon: Dumbbell, color: 'text-purple-400' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <ShieldAlert className="w-8 h-8 text-amber-400" />
          <span>Role-Based Admin Dashboard</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Platform Analytics, Total Users, Subscription Revenue, and Exercise Database Management</p>
      </div>

      {/* Admin Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-extrabold text-white">{stat.val}</h3>
              <p className="text-[11px] text-emerald-400 font-semibold">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Exercise Database Management Table */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white">Exercise Database Registry (100+)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="pb-3">Exercise Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Equipment</th>
                <th className="pb-3">Target Muscle</th>
                <th className="pb-3">Calories / Min</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {INITIAL_EXERCISES.slice(0, 8).map(ex => (
                <tr key={ex.id} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white">{ex.name}</td>
                  <td className="py-3 text-emerald-400 font-semibold">{ex.category}</td>
                  <td className="py-3 text-gray-300">{ex.equipment}</td>
                  <td className="py-3 text-gray-300">{ex.target}</td>
                  <td className="py-3 text-amber-400 font-bold">{ex.caloriesPerMin} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
