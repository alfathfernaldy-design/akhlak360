import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, Users, BarChart3, ClipboardCheck } from 'lucide-react';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = login(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 animated-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-secondary-900/90" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-3xl font-bold">A</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">AKHLAK 360°</h1>
                <p className="text-white/70">PT Energi Nusanstara</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Sistem Penilaian<br />
              Karyawan 360°
            </h2>
            <p className="text-lg text-white/80 mb-12 max-w-md">
              Evaluasi performa dan budaya kerja berbasis Core Values AKHLAK
              untuk membangun organisasi yang unggul dan berintegritas.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ClipboardCheck, label: 'Self Assessment' },
                { icon: Users, label: 'Penilaian Rekan' },
                { icon: BarChart3, label: 'Gap Analysis' },
                { icon: Shield, label: 'Validated Results' },
              ].map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
                >
                  <feature.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-500/20 rounded-full" />
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-800 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-slate-800">AKHLAK 360°</h1>
                <p className="text-xs text-slate-500">PT Energi Nusanstara</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Selamat Datang</h2>
              <p className="text-slate-500">Masuk untuk mengakses sistem penilaian</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-slate-600">Ingat saya</span>
                </label>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Lupa password?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-primary-800 to-primary-900 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-800/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-press"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  'Masuk'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center mb-4">
                Demo Credentials (klik untuk autofill)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { role: 'Admin', user: 'admin', pass: 'admin123' },
                  { role: 'Karyawan', user: 'karyawan', pass: 'karyawan123' },
                  { role: 'Atasan', user: 'atasan', pass: 'atasan123' },
                  { role: 'Manajemen', user: 'manajemen', pass: 'manajemen123' },
                ].map((cred) => (
                  <button
                    key={cred.role}
                    type="button"
                    onClick={() => { setUsername(cred.user); setPassword(cred.pass); }}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg transition-colors"
                  >
                    {cred.role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
