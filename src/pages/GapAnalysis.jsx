import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUp,
  ArrowDown,
  Info,
  Download
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
  Cell
} from 'recharts';
import { AKHLAK_VALUES } from '../data/akhlasData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function GapAnalysis() {
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [animateCharts, setAnimateCharts] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setAnimateCharts(true);
  }, []);

  const handleDownloadPDF = async () => {
    const element = contentRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      pdf.save('Gap-Analysis-AKHLAK.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal membuat PDF. Silakan coba lagi.');
    }
  };

  const gapData = AKHLAK_VALUES.map(value => {
    const actual = 3.5 + Math.random() * 1.5;
    const expected = 4.0 + Math.random() * 0.5;
    const gap = actual - expected;
    return {
      name: value.name,
      fullName: value.fullName,
      actual: Math.round(actual * 100) / 100,
      expected: Math.round(expected * 100) / 100,
      gap: Math.round(gap * 100) / 100,
      color: value.color,
      icon: value.icon
    };
  });

  const trendData = [
    { month: 'Jan', amanah: 3.8, kompeten: 4.1, harmonis: 3.9, loyal: 4.0, adaptif: 3.7, kolaboratif: 4.2 },
    { month: 'Feb', amanah: 3.9, kompeten: 4.0, harmonis: 4.0, loyal: 4.1, adaptif: 3.8, kolaboratif: 4.1 },
    { month: 'Mar', amanah: 4.0, kompeten: 4.2, harmonis: 4.1, loyal: 4.0, adaptif: 3.9, kolaboratif: 4.3 },
    { month: 'Apr', amanah: 4.1, kompeten: 4.1, harmonis: 4.0, loyal: 4.2, adaptif: 4.0, kolaboratif: 4.2 },
    { month: 'Mei', amanah: 4.0, kompeten: 4.3, harmonis: 4.2, loyal: 4.1, adaptif: 4.1, kolaboratif: 4.4 },
    { month: 'Jun', amanah: 4.2, kompeten: 4.2, harmonis: 4.1, loyal: 4.3, adaptif: 4.0, kolaboratif: 4.3 }
  ];

  const getGapIcon = (gap) => {
    if (gap > 0.1) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (gap < -0.1) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const getGapColor = (gap) => {
    if (gap > 0.1) return 'text-green-600 bg-green-50';
    if (gap < -0.1) return 'text-red-600 bg-red-50';
    return 'text-slate-600 bg-slate-50';
  };

  const getGapLabel = (gap) => {
    if (gap > 0.1) return 'Di Atas Standar';
    if (gap < -0.1) return 'Perlu Ditingkatkan';
    return 'Sesuai Standar';
  };

  const overallGap = gapData.reduce((acc, item) => acc + item.gap, 0) / gapData.length;

  return (
    <div className="space-y-6" ref={contentRef} id="gap-analysis-content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gap Analysis</h1>
          <p className="text-slate-500">Analisis kesenjangan antara nilai aktual dan standar</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-primary-800 text-white rounded-xl hover:bg-primary-900 transition-colors btn-press"
        >
          <Download className="w-4 h-4" />
          <span>Download Laporan</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Nilai Tertinggi', value: 'Kompeten', gap: '+0.25', positive: true },
          { label: 'Nilai Terendah', value: 'Harmonis', gap: '-0.15', positive: false },
          { label: 'Rata-rata Gap', value: overallGap.toFixed(2), gap: overallGap > 0 ? 'Positif' : 'Negatif', positive: overallGap >= 0 },
          { label: 'Total Indikator', value: gapData.length, gap: '6 Nilai', positive: true }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-slate-100"
          >
            <p className="text-sm text-slate-500 mb-1">{item.label}</p>
            <p className="text-xl font-bold text-slate-800">{item.value}</p>
            <div className={`flex items-center gap-1 mt-2 text-sm ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
              {item.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{item.gap}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Gap Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Gap Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="core-box"
        >
          <div className="core-content">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Gap per Nilai AKHLAK</h3>
                  <p className="text-sm text-slate-500">Selisih nilai aktual vs standar</p>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gapData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12, fill: '#111827' }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={90}
                    tick={{ fontSize: 12, fontWeight: 700, fill: '#111827' }}
                  />
                  <Tooltip
                    formatter={(value, name) => [value.toFixed(2), name === 'actual' ? 'Nilai Aktual' : 'Standar']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px'
                    }}
                    labelStyle={{ color: '#111827', fontWeight: 600 }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}
                  />
                  <Bar dataKey="actual" name="Nilai Aktual" radius={[0, 4, 4, 0]} fill="#3B82F6">
                    {gapData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Gap Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="core-box"
        >
          <div className="core-content">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Tren Perkembangan</h3>
                  <p className="text-sm text-slate-500">Perubahan nilai dari waktu ke waktu</p>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorAmanah" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorKompeten" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHarmonis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLoyal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAdaptif" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorKolaboratif" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#111827' }} />
                  <YAxis domain={[3, 5]} tick={{ fontSize: 12, fill: '#111827' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '10px', color: '#111827' }}
                  />
                  <Area type="monotone" dataKey="amanah" stroke="#3B82F6" fillOpacity={1} fill="url(#colorAmanah)" strokeWidth={2} />
                  <Area type="monotone" dataKey="kompeten" stroke="#10B981" fillOpacity={1} fill="url(#colorKompeten)" strokeWidth={2} />
                  <Area type="monotone" dataKey="harmonis" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorHarmonis)" strokeWidth={2} />
                  <Area type="monotone" dataKey="loyal" stroke="#EF4444" fillOpacity={1} fill="url(#colorLoyal)" strokeWidth={2} />
                  <Area type="monotone" dataKey="adaptif" stroke="#F59E0B" fillOpacity={1} fill="url(#colorAdaptif)" strokeWidth={2} />
                  <Area type="monotone" dataKey="kolaboratif" stroke="#06B6D4" fillOpacity={1} fill="url(#colorKolaboratif)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Gap Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Detail Gap per Nilai</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nilai</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Aktual</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Standar</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Gap</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gapData.map((item, index) => (
                <motion.tr
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: item.color }}
                      >
                        <span className="text-sm font-bold text-white">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{item.fullName}</p>
                        <p className="text-xs text-slate-600">AKHLAK Value</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-lg font-bold font-mono" style={{ color: item.color }}>
                      {item.actual.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-lg font-mono text-slate-400">
                      {item.expected.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {getGapIcon(item.gap)}
                      <span className={`text-sm font-semibold font-mono ${item.gap > 0 ? 'text-green-600' : item.gap < 0 ? 'text-red-600' : 'text-slate-500'}`}>
                        {item.gap > 0 ? '+' : ''}{item.gap.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`table-badge ${item.gap > 0.1 ? 'badge-success' : item.gap < -0.1 ? 'badge-danger' : 'badge-info'}`}>
                      {getGapLabel(item.gap)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Rekomendasi Pengembangan</h3>
            <div className="space-y-3">
              <p className="text-sm text-slate-700">
                Berdasarkan analisis gap, berikut area yang perlu mendapatkan perhatian lebih:
              </p>
              <ul className="space-y-2">
                {gapData.filter(item => item.gap < -0.1).map(item => (
                  <li key={item.name} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-900">{item.fullName}</strong> - Perlu peningkatan
                      untuk mencapai standar perusahaan.
                    </span>
                  </li>
                ))}
                {gapData.filter(item => item.gap >= -0.1).length === gapData.length && (
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <span>Selamat! Seluruh nilai AKHLAK sudah memenuhi atau melebihi standar.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
