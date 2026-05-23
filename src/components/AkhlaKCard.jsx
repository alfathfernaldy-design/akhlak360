import { motion } from 'framer-motion';
import { Shield, GraduationCap, Heart, Flag, Zap, Users } from 'lucide-react';

const iconMap = {
  Shield: Shield,
  GraduationCap: GraduationCap,
  Heart: Heart,
  Flag: Flag,
  Zap: Zap,
  Users: Users
};

export default function AkhlaKCard({ value, score, index = 0, compact = false, selected = false, onClick }) {
  const Icon = iconMap[value.icon] || Shield;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center gap-3"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: value.bgColor }}
        >
          <Icon className="w-4 h-4" style={{ color: value.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-700">{value.name}</span>
            <span className="text-xs font-mono font-semibold" style={{ color: value.color }}>
              {score?.toFixed(1)}
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / 5) * 100}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
              className="h-full rounded-full"
              style={{ backgroundColor: value.color }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`
        bg-white rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer
        ${selected ? 'border-primary-500 shadow-lg shadow-primary-500/20' : 'border-slate-100 hover:border-slate-200'}
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: value.bgColor }}
        >
          <Icon className="w-7 h-7" style={{ color: value.color }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800">{value.fullName}</h3>
            {score !== undefined && (
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{ backgroundColor: value.bgColor, color: value.color }}
              >
                {score.toFixed(1)}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 mb-3">{value.description}</p>
          <p className="text-xs text-slate-400 italic">{value.meaning}</p>
        </div>
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-slate-100"
        >
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Indikator Penilaian
          </h4>
          <ul className="space-y-2">
            {value.indicators.map((indicator, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: value.color }}
                />
                {indicator}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
