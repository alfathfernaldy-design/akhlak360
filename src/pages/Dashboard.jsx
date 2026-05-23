import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  Clock,
  Target,
  Award,
  ArrowRight,
  CheckCircle2,
  Circle,
  BarChart3,
  FileText,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { AKHLAK_VALUES, ORGANIZATION_STATS } from '../data/akhlasData';
import StatCard from '../components/StatCard';
import AkhlaKCard from '../components/AkhlaKCard';

export default function Dashboard() {
  const { user, getPendingAssessments } = useApp();
  const [animatedStats, setAnimatedStats] = useState({
    employees: 0,
    assessments: 0,
    completion: 0
  });

  const pendingAssessments = getPendingAssessments();

  // Animate counters
  useEffect(() => {
    const targets = { employees: 156, assessments: 42, completion: 78 };
    const duration = 1500;
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        employees: Math.round(targets.employees * eased),
        assessments: Math.round(targets.assessments * eased),
        completion: Math.round(targets.completion * eased)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const getRoleTitle = () => {
    const titles = {
      admin: 'Admin HR Dashboard',
      manajemen: 'Dashboard Manajemen',
      atasan: 'Dashboard Atasan',
      karyawan: 'Dashboard Karyawan',
      peer: 'Dashboard Peer'
    };
    return titles[user?.role] || 'Dashboard';
  };

  const getRoleSubtitle = () => {
    const subtitles = {
      admin: 'Kelola data karyawan dan pantau penilaian',
      manajemen: 'Monitor budaya kerja dan analisis organisasi',
      atasan: 'Lakukan penilaian dan lihat hasil bawahan',
      karyawan: 'Lakukan penilaian diri dan rekan kerja',
      peer: 'Berikan penilaian dan lihat hasil'
    };
    return subtitles[user?.role] || '';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="hero">
        <div className="hero-content">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Selamat Datang, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-white/80">{getRoleSubtitle()}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white">
                <p className="text-xs opacity-70">Periode Aktif</p>
                <p className="font-semibold">Semester 1 2025</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Karyawan"
          value={animatedStats.employees}
          color="blue"
          delay={0}
        />
        <StatCard
          icon={ClipboardCheck}
          label="Penilaian Aktif"
          value={animatedStats.assessments}
          color="green"
          delay={0.1}
        />
        <StatCard
          icon={CheckCircle2}
          label="Terselesaikan"
          value={`${animatedStats.completion}%`}
          color="purple"
          delay={0.2}
        />
        <StatCard
          icon={TrendingUp}
          label="Skor Rata-rata"
          value={ORGANIZATION_STATS.averageScore.toFixed(2)}
          color="amber"
          delay={0.3}
          suffix="/5"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Assessments */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800">Penilaian Tertunda</h2>
                  <p className="text-sm text-slate-500">{pendingAssessments.length} penilaian perlu diselesaikan</p>
                </div>
              </div>
              <Link
                to="/assessment"
                className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Lihat Semua
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {pendingAssessments.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        item.type === 'self' ? 'bg-blue-100' :
                        item.type === 'peer' ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        {item.type === 'self' ? (
                          <Users className="w-5 h-5 text-blue-600" />
                        ) : item.type === 'peer' ? (
                          <BarChart3 className="w-5 h-5 text-purple-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{item.target}</p>
                        <p className="text-sm text-slate-500 capitalize">{item.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Batas</p>
                        <p className="text-sm font-medium text-slate-700">
                          {new Date(item.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <Link
                        to={`/assessment/${item.type}`}
                        className="px-4 py-2 bg-primary-800 text-white text-sm font-medium rounded-lg hover:bg-primary-900 transition-colors btn-press"
                      >
                        Isi
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats & AKHLAK */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Aksi Cepat</h3>
            <div className="space-y-3">
              <Link
                to="/assessment/self"
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
              >
                <ClipboardCheck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Self Assessment</span>
                <ArrowRight className="w-4 h-4 text-blue-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/results"
                className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors group"
              >
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-purple-700">Lihat Hasil</span>
                <ArrowRight className="w-4 h-4 text-purple-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/gap-analysis"
                className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
              >
                <Target className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-green-700">Gap Analysis</span>
                <ArrowRight className="w-4 h-4 text-green-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* AKHLAK Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Nilai AKHLAK Saya</h3>
            <div className="space-y-3">
              {AKHLAK_VALUES.slice(0, 4).map((value, index) => (
                <AkhlaKCard key={value.id} value={value} compact score={3.5 + Math.random() * 1.5} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* AKHLAK Values Banner */}
      <motion.div variants={itemVariants} className="core-box">
        <div className="core-content">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Core Values AKHLAK</h3>
              <p className="text-slate-500 max-w-lg">
                Enam nilai utama yang menjadi pedoman dalam perilaku dan budaya kerja di PT Energi Nusanstara
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {AKHLAK_VALUES.map((value, i) => (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="badge-modern"
                  style={{ background: `linear-gradient(135deg, ${value.color}, ${value.color}dd)` }}
                >
                  {value.name}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
