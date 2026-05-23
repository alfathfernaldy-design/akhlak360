import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Award,
  PieChart
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Area,
  AreaChart,
  Legend
} from 'recharts';
import { ORGANIZATION_STATS, AKHLAK_VALUES } from '../data/akhlasData';

const COLORS = ['#1e40af', '#059669', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899'];

export default function Management() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Analytics</h1>
          <p className="text-slate-500">Monitoring budaya kerja dan hasil penilaian organisasi</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
          >
            <option value="all">Semua Periode</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-800 text-white rounded-xl hover:bg-primary-900 transition-colors btn-press">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Karyawan', value: ORGANIZATION_STATS.totalEmployees, icon: Users, color: 'blue', change: '+12', positive: true },
          { label: 'Rata-rata Skor', value: ORGANIZATION_STATS.averageScore.toFixed(2), icon: Target, color: 'green', change: '+0.08', positive: true, suffix: '/5' },
          { label: 'Tingkat Partisipasi', value: '78%', icon: TrendingUp, color: 'purple', change: '+5%', positive: true },
          { label: 'Dept Tertinggi', value: 'HR', icon: Building2, color: 'amber', change: '4.31', positive: true }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-slate-100"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-${metric.color}-100 flex items-center justify-center`}>
                <metric.icon className={`w-5 h-5 text-${metric.color}-600`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{metric.change}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800 font-mono">
              {metric.value}{metric.suffix}
            </p>
            <p className="text-sm text-slate-500 mt-1">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Department Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-slate-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Perbandingan per Divisi</h3>
                <p className="text-sm text-slate-500">Skor rata-rata AKHLAK per departemen</p>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ORGANIZATION_STATS.departmentBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[3, 5]} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  formatter={(value) => [value.toFixed(2), 'Skor']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {ORGANIZATION_STATS.departmentBreakdown.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Score Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-slate-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Distribusi Skor</h3>
                <p className="text-sm text-slate-500">Persebaran karyawan berdasarkan skor</p>
              </div>
            </div>
          </div>
          <div className="h-80 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={ORGANIZATION_STATS.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="count"
                  label={({ range, percentage }) => `${range}: ${percentage}%`}
                >
                  {ORGANIZATION_STATS.distribution.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [value + ' karyawan', props.payload.range]}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trend Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Tren Skor Organisasi</h3>
                <p className="text-sm text-slate-500">Perkembangan skor dari waktu ke waktu</p>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ORGANIZATION_STATS.trendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={[3.8, 4.3]} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#059669"
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AKHLAK Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Nilai AKHLAK Org</h3>
              <p className="text-sm text-slate-500">Ringkasan per nilai</p>
            </div>
          </div>
          <div className="space-y-3">
            {AKHLAK_VALUES.map((value, index) => {
              const score = 3.8 + Math.random() * 1;
              return (
                <div key={value.id} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-600 w-12">{value.name}</span>
                  <div className="flex-1 h-6 bg-slate-100 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(score / 5) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className="h-full rounded-lg flex items-center justify-end pr-2"
                      style={{ backgroundColor: value.color }}
                    >
                      <span className="text-xs font-bold text-white">
                        {score.toFixed(2)}
                      </span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Top Performers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Top Performers</h3>
          <p className="text-sm text-slate-500">Karyawan dengan skor tertinggi periode ini</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Peringkat</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Karyawan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Departemen</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase">Skor</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase">Perubahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { rank: 1, name: 'Dewi Kusuma', dept: 'Human Resources', score: 4.52, change: '+0.12' },
                { rank: 2, name: 'Fajar Nugroho', dept: 'Engineering', score: 4.48, change: '+0.08' },
                { rank: 3, name: 'Rizky Pratama', dept: 'Strategy', score: 4.45, change: '+0.15' },
                { rank: 4, name: 'Budi Santoso', dept: 'Engineering', score: 4.42, change: '+0.05' },
                { rank: 5, name: 'Ahmad Wijaya', dept: 'Engineering', score: 4.38, change: '-0.02' }
              ].map((employee, index) => (
                <tr key={employee.rank} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      employee.rank === 1 ? 'bg-amber-100 text-amber-600' :
                      employee.rank === 2 ? 'bg-slate-200 text-slate-600' :
                      employee.rank === 3 ? 'bg-orange-100 text-orange-600' :
                      'bg-slate-50 text-slate-500'
                    }`}>
                      {employee.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-slate-800">{employee.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{employee.dept}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-lg text-primary-700 font-mono">{employee.score.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      parseFloat(employee.change) >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                    }`}>
                      {employee.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
