import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  Calendar,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  BarChart3
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { AKHLAK_VALUES } from '../data/akhlasData';

export default function Results() {
  const [expandedSection, setExpandedSection] = useState('summary');
  const [selectedPeriod, setSelectedPeriod] = useState('2024');

  const radarData = AKHLAK_VALUES.map(value => ({
    subject: value.name,
    value: 3.5 + Math.random() * 1.5,
    fullMark: 5
  }));

  const breakdownData = [
    { name: 'Self', score: 4.3, color: '#3B82F6' },
    { name: 'Peer', score: 4.2, color: '#8B5CF6' },
    { name: 'Atasan', score: 4.5, color: '#10B981' },
    { name: 'Bawahan', score: 4.0, color: '#F59E0B' }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleExportPDF = () => {
    alert('Fitur export PDF akan mengunduh laporan dalam format PDF.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hasil Penilaian</h1>
          <p className="text-slate-500">Hasil penilaian 360° periode penilaian</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
          >
            <option value="2024">Periode 2024</option>
            <option value="2023">Periode 2023</option>
          </select>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-primary-800 text-white rounded-xl hover:bg-primary-900 transition-colors btn-press"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero"
      >
        <div className="hero-content">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-3xl font-bold">4.25</span>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Skor Keseluruhan</p>
                <h2 className="text-3xl font-bold mb-2">Sangat Baik</h2>
                <p className="text-white/80 text-sm">
                  Berdasarkan {8} penilaian dari berbagai pihak
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/70">Rating</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold">#3</p>
                <p className="text-xs text-white/70">Peringkat</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">+0.15</p>
                <p className="text-xs text-white/70">vs Periode Lalu</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="core-box"
        >
          <div className="core-content">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Profil Nilai AKHLAK</h3>
                <p className="text-sm text-slate-500">Visualisasi penilaian per nilai</p>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 12, fontWeight: 600, fill: '#475569' }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 5]}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <Radar
                    name="Skor"
                    dataKey="value"
                    stroke="#1e40af"
                    fill="#1e40af"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Breakdown by Evaluator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="core-box"
        >
          <div className="core-content">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Rincian per Penilai</h3>
                <p className="text-sm text-slate-500">Skor dari berbagai sumber penilaian</p>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdownData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={80}
                    tick={{ fontSize: 12, fontWeight: 500, fill: '#1e293b' }}
                  />
                  <Tooltip
                    formatter={(value) => [value.toFixed(1), 'Skor']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px -12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar
                    dataKey="score"
                    radius={[0, 8, 8, 0]}
                    maxBarSize={40}
                  >
                    {breakdownData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
      >
        <button
          onClick={() => toggleSection('scores')}
          className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-slate-800">Detail Skor per Nilai AKHLAK</h3>
          </div>
          {expandedSection === 'scores' ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {expandedSection === 'scores' && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {AKHLAK_VALUES.map((value, index) => {
                const score = 3.5 + Math.random() * 1.5;

                return (
                  <motion.div
                    key={value.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: value.bgColor }}
                      >
                        <span className="text-sm font-bold" style={{ color: value.color }}>
                          {value.name}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{value.fullName}</p>
                        <p className="text-xs text-slate-500">{value.meaning}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(score / 5) * 100}%` }}
                            transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: value.color }}
                          />
                        </div>
                      </div>
                      <span
                        className="text-lg font-bold font-mono"
                        style={{ color: value.color }}
                      >
                        {score.toFixed(1)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Peer Comments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
      >
        <button
          onClick={() => toggleSection('comments')}
          className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-slate-800">Komentar Penilai</h3>
          </div>
          {expandedSection === 'comments' ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {expandedSection === 'comments' && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 space-y-4">
              {[
                { name: 'Ahmad Wijaya', role: 'Peer', comment: 'Sangat kolaboratif dan mau membagi ilmu dengan tim.' },
                { name: 'Maya Indriyani', role: 'Peer', comment: 'Kompeten dalam menghadapi tantangan teknis dan cepat menemukan solusi.' },
                { name: 'Fajar Nugroho', role: 'Atasan', comment: 'Dapat diandalkan dan selalu menjaga komunikasi yang transparan.' }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic">"{item.comment}"</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
