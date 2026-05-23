import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Star,
  Save,
  Send,
  User,
  Users,
  Shield
} from 'lucide-react';
import { AKHLAK_VALUES, RATING_SCALE, EMPLOYEES } from '../data/akhlasData';

const ASSESSMENT_TYPES = {
  self: {
    title: 'Self Assessment',
    subtitle: 'Penilaian terhadap diri sendiri',
    icon: User,
    color: 'blue'
  },
  peer: {
    title: 'Penilaian Rekan Kerja',
    subtitle: 'Penilaian terhadap rekan kerja',
    icon: Users,
    color: 'purple'
  },
  subordinate: {
    title: 'Penilaian Bawahan',
    subtitle: 'Penilaian terhadap bawahan langsung',
    icon: Shield,
    color: 'green'
  }
};

export default function Assessment() {
  const { type = 'self' } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [ratings, setRatings] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [notes, setNotes] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const assessmentConfig = ASSESSMENT_TYPES[type] || ASSESSMENT_TYPES.self;
  const Icon = assessmentConfig.icon;

  // Get employees for peer/subordinate selection
  const availableEmployees = type !== 'self'
    ? EMPLOYEES.filter(e => e.id !== user?.employeeId)
    : [];

  const totalSteps = type !== 'self' && !selectedEmployee ? 1 : AKHLAK_VALUES.length;
  const currentValue = AKHLAK_VALUES[currentStep];
  const canGoNext = selectedValue !== null;
  const canGoBack = currentStep > 0;

  const handleRatingSelect = (rating) => {
    setSelectedValue(rating);
  };

  const handleNext = () => {
    if (selectedValue !== null) {
      setRatings(prev => ({
        ...prev,
        [currentValue.id]: selectedValue
      }));
      setSelectedValue(null);

      if (currentStep < AKHLAK_VALUES.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setSelectedValue(ratings[AKHLAK_VALUES[currentStep - 1].id] || null);
    }
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSubmit = async () => {
    // Check if all ratings are complete
    if (Object.keys(ratings).length < AKHLAK_VALUES.length) {
      // Auto-complete remaining ratings with neutral value (3)
      const remaining = AKHLAK_VALUES.filter(v => ratings[v.id] === undefined);
      remaining.forEach(value => {
        setRatings(prev => ({ ...prev, [value.id]: 3 }));
      });
      // Show warning
      alert(`Nilai yang belum dinilai akan diisi otomatis dengan skor 3 (Cukup). Silakan submit lagi.`);
      return;
    }

    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);
    setCompleted(true);
  };

  const handleSaveDraft = () => {
    // Save draft logic
    console.log('Saving draft:', { ratings, notes });
  };

  const getProgress = () => {
    const completed = Object.keys(ratings).length;
    return (completed / AKHLAK_VALUES.length) * 100;
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Penilaian Berhasil Disimpan!</h2>
          <p className="text-slate-600 mb-6">
            Terima kasih telah menyelesaikan penilaian.
            {type === 'self' && ' Hasil akan tersedia setelah diproses oleh sistem.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors btn-press"
            >
              Kembali ke Dashboard
            </button>
            <button
              onClick={() => navigate('/results')}
              className="px-6 py-3 bg-primary-800 text-white font-medium rounded-xl hover:bg-primary-900 transition-colors btn-press"
            >
              Lihat Hasil
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Employee Selection Step
  if (type !== 'self' && !selectedEmployee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{assessmentConfig.title}</h1>
            <p className="text-sm text-slate-500">{assessmentConfig.subtitle}</p>
          </div>
        </div>

        <div className="grid gap-4">
          {availableEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelectEmployee(employee)}
              className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-primary-300 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
                  <span className="text-white font-semibold">{employee.avatar}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{employee.name}</h3>
                  <p className="text-sm text-slate-500">{employee.position}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${assessmentConfig.color}-100`}>
              <Icon className={`w-5 h-5 text-${assessmentConfig.color}-600`} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{assessmentConfig.title}</h1>
              <p className="text-sm text-slate-500">
                {type !== 'self' && selectedEmployee ? `Menilai: ${selectedEmployee.name}` : assessmentConfig.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">
            Progres: {Object.keys(ratings).length} dari {AKHLAK_VALUES.length}
          </span>
          <span className="text-sm font-mono font-semibold text-primary-600">
            {Math.round(getProgress())}%
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getProgress()}%` }}
            className="h-full bg-gradient-to-r from-primary-600 to-primary-800 rounded-full"
          />
        </div>
        <div className="flex justify-between mt-2">
          {AKHLAK_VALUES.map((value, index) => (
            <button
              key={value.id}
              onClick={() => {
                if (ratings[value.id] !== undefined) {
                  setCurrentStep(index);
                  setSelectedValue(ratings[value.id]);
                }
              }}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${ratings[value.id] !== undefined
                  ? 'text-white'
                  : index === currentStep
                    ? 'border-2 border-primary-600 text-primary-600'
                    : 'bg-slate-100 text-slate-400'
                }
              `}
              style={ratings[value.id] !== undefined ? { backgroundColor: value.color } : {}}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Value Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentValue.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
        >
          {/* Value Header */}
          <div
            className="p-6 text-white"
            style={{ backgroundColor: currentValue.color }}
          >
            <div className="flex items-center justify-between">
              {/* AKHLAK Letters */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-lg font-bold">A</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-lg font-bold">K</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-lg font-bold">H</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-lg font-bold">L</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-lg font-bold">A</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-lg font-bold">K</span>
                </div>
              </div>
              {/* Current Value Badge */}
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <p className="text-sm font-medium">{currentValue.fullName}</p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Indikator yang Dinilai
            </h3>
            <ul className="space-y-2">
              {currentValue.indicators.map((indicator, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: currentValue.color }}
                  />
                  {indicator}
                </li>
              ))}
            </ul>
          </div>

          {/* Rating Scale */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Pilih Skor (1-5)
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {RATING_SCALE.map((scale) => (
                <motion.button
                  key={scale.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRatingSelect(scale.value)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200 text-center
                    ${selectedValue === scale.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 hover:border-slate-300'
                    }
                  `}
                  style={{
                    borderColor: selectedValue === scale.value ? scale.color : undefined,
                    backgroundColor: selectedValue === scale.value ? `${scale.color}10` : undefined
                  }}
                >
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: selectedValue === scale.value ? scale.color : scale.color }}
                  >
                    {scale.value}
                  </div>
                  <div className="text-xs font-medium text-slate-600">{scale.label}</div>
                </motion.button>
              ))}
            </div>

            {/* Selected Rating Description */}
            <AnimatePresence>
              {selectedValue && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 p-4 rounded-xl"
                  style={{ backgroundColor: `${RATING_SCALE[selectedValue - 1].color}10` }}
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5" style={{ color: RATING_SCALE[selectedValue - 1].color }} />
                    <div>
                      <p className="font-medium" style={{ color: RATING_SCALE[selectedValue - 1].color }}>
                        {RATING_SCALE[selectedValue - 1].label}
                      </p>
                      <p className="text-sm text-slate-600">
                        {RATING_SCALE[selectedValue - 1].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={!canGoBack}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
            ${canGoBack
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              : 'bg-slate-50 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          <ArrowLeft className="w-4 h-4" />
          Sebelumnya
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Simpan Draft</span>
          </button>

          {currentStep < AKHLAK_VALUES.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all btn-press
                ${canGoNext
                  ? 'bg-primary-800 text-white hover:bg-primary-900'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              Selanjutnya
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all btn-press
                ${submitting
                  ? 'bg-green-600 text-white cursor-wait'
                  : Object.keys(ratings).length < AKHLAK_VALUES.length
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }
              `}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Menyimpan...
                </>
              ) : Object.keys(ratings).length < AKHLAK_VALUES.length ? (
                <>
                  <Send className="w-4 h-4" />
                  Lengkapi Dulu ({Object.keys(ratings).length}/{AKHLAK_VALUES.length})
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Penilaian
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
