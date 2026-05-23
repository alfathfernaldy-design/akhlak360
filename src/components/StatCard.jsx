import { motion } from 'framer-motion';

const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    icon: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600'
  },
  green: {
    bg: 'bg-green-100',
    icon: 'text-green-600',
    gradient: 'from-green-500 to-green-600'
  },
  purple: {
    bg: 'bg-purple-100',
    icon: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600'
  },
  amber: {
    bg: 'bg-amber-100',
    icon: 'text-amber-600',
    gradient: 'from-amber-500 to-amber-600'
  },
  red: {
    bg: 'bg-red-100',
    icon: 'text-red-600',
    gradient: 'from-red-500 to-red-600'
  },
  cyan: {
    bg: 'bg-cyan-100',
    icon: 'text-cyan-600',
    gradient: 'from-cyan-500 to-cyan-600'
  }
};

export default function StatCard({ icon: Icon, label, value, color = 'blue', delay = 0, suffix = '' }) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: '0 10px 40px -12px rgba(0, 0, 0, 0.15)' }}
      className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-800 font-mono">
            {value}{suffix}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
      <div className="mt-4">
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ delay: delay + 0.3, duration: 0.8, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
          />
        </div>
      </div>
    </motion.div>
  );
}
