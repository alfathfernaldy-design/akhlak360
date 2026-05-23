import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  Calendar,
  Settings,
  Link2,
  BarChart3,
  Shield,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Plus,
  Search,
  Filter,
  ChevronRight,
  User,
  Building2,
  Mail,
  Phone,
  CalendarDays
} from 'lucide-react';
import { EMPLOYEES, ASSESSMENT_PERIODS, AKHLAK_VALUES } from '../data/akhlasData';

const TABS = [
  { id: 'employees', label: 'Data Karyawan', icon: Users },
  { id: 'periods', label: 'Periode Penilaian', icon: Calendar },
  { id: 'relations', label: 'Relasi Penilai', icon: Link2 },
  { id: 'indicators', label: 'Indikator AKHLAK', icon: BarChart3 },
  { id: 'access', label: 'Hak Akses', icon: Shield }
];

export default function HRAdmin() {
  const [activeTab, setActiveTab] = useState('employees');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = EMPLOYEES.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kelola Data</h1>
          <p className="text-slate-500">Pengelolaan sistem penilaian 360°</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all
              ${activeTab === tab.id
                ? 'bg-primary-800 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'employees' && (
          <motion.div
            key="employees"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-2xl p-4 border border-slate-100">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari karyawan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 outline-none"
                />
              </div>
              <button
                onClick={() => handleOpenModal('employee')}
                className="flex items-center gap-2 px-4 py-2 bg-primary-800 text-white rounded-xl hover:bg-primary-900 transition-colors btn-press"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Karyawan</span>
              </button>
            </div>

            {/* Employees Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEmployees.map((employee, index) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-200 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                        <span className="text-white font-bold">{employee.avatar}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{employee.name}</h3>
                        <p className="text-sm text-slate-500">{employee.position}</p>
                      </div>
                    </div>
                    <span className={`
                      px-2 py-1 rounded-lg text-xs font-medium
                      ${employee.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}
                    `}>
                      {employee.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                    <span className={`
                      px-3 py-1 rounded-lg text-xs font-medium capitalize
                      ${employee.role === 'admin' ? 'bg-purple-50 text-purple-600' :
                        employee.role === 'manajemen' ? 'bg-amber-50 text-amber-600' :
                        employee.role === 'atasan' ? 'bg-blue-50 text-blue-600' :
                        'bg-slate-100 text-slate-600'}
                    `}>
                      {employee.role}
                    </span>
                    <div className="flex-1" />
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-500" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'periods' && (
          <motion.div
            key="periods"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex justify-end">
              <button
                onClick={() => handleOpenModal('period')}
                className="flex items-center gap-2 px-4 py-2 bg-primary-800 text-white rounded-xl hover:bg-primary-900 transition-colors btn-press"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Periode</span>
              </button>
            </div>

            <div className="space-y-4">
              {ASSESSMENT_PERIODS.map((period, index) => (
                <motion.div
                  key={period.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        period.status === 'active' ? 'bg-green-100' :
                        period.status === 'completed' ? 'bg-slate-100' : 'bg-blue-100'
                      }`}>
                        <Calendar className={`w-6 h-6 ${
                          period.status === 'active' ? 'text-green-600' :
                          period.status === 'completed' ? 'text-slate-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{period.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                          <span>{new Date(period.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span>-</span>
                          <span>{new Date(period.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`
                        px-3 py-1 rounded-lg text-sm font-medium capitalize
                        ${period.status === 'active' ? 'bg-green-100 text-green-700' :
                          period.status === 'completed' ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-700'}
                      `}>
                        {period.status}
                      </span>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Settings className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'relations' && (
          <motion.div
            key="relations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-6 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Relasi Penilai 360°</h3>
                  <p className="text-sm text-slate-500">Kelola hubungan penilai dan yang dinilai</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-800 text-white rounded-xl hover:bg-primary-900 transition-colors btn-press">
                <Plus className="w-4 h-4" />
                <span>Tambah Relasi</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Yang Dinilai</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Jenis</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Penilai</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { evaluated: 'Siti Rahayu', type: 'Self', evaluator: '-', status: 'completed' },
                    { evaluated: 'Siti Rahayu', type: 'Peer', evaluator: 'Ahmad Wijaya', status: 'pending' },
                    { evaluated: 'Siti Rahayu', type: 'Peer', evaluator: 'Maya Indriyani', status: 'pending' },
                    { evaluated: 'Siti Rahayu', type: 'Atasan', evaluator: 'Budi Santoso', status: 'pending' }
                  ].map((relation, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold">
                            SR
                          </div>
                          <span className="text-sm font-medium">{relation.evaluated}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          relation.type === 'Self' ? 'bg-blue-50 text-blue-600' :
                          relation.type === 'Peer' ? 'bg-purple-50 text-purple-600' :
                          'bg-green-50 text-green-600'
                        }`}>
                          {relation.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {relation.evaluator !== '-' ? (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold">
                              {relation.evaluator.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm">{relation.evaluator}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          relation.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {relation.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="p-2 hover:bg-slate-100 rounded-lg">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'indicators' && (
          <motion.div
            key="indicators"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {AKHLAK_VALUES.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: value.bgColor }}
                    >
                      <span className="text-lg font-bold" style={{ color: value.color }}>
                        {value.name}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{value.fullName}</h3>
                      <p className="text-sm text-slate-500">{value.description}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500">Indikator:</p>
                  <ul className="space-y-1">
                    {value.indicators.map((ind, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: value.color }} />
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'access' && (
          <motion.div
            key="access"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-6 border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Kelola Hak Akses</h3>
                <p className="text-sm text-slate-500">Atur peran dan izin pengguna</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { role: 'Admin HR', description: 'Kelola data karyawan, periode, dan validasi', users: 1, color: 'purple' },
                { role: 'Manajemen', description: 'Dashboard analytics dan monitoring', users: 1, color: 'amber' },
                { role: 'Atasan', description: 'Penilaian bawahan dan lihat hasil', users: 2, color: 'blue' },
                { role: 'Karyawan', description: 'Self assessment dan peer assessment', users: 3, color: 'green' },
                { role: 'Peer', description: 'Penilaian rekan kerja', users: 1, color: 'cyan' }
              ].map((access, index) => (
                <motion.div
                  key={access.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium capitalize bg-${access.color}-50 text-${access.color}-600`}>
                      {access.role}
                    </span>
                    <span className="text-sm text-slate-500">{access.users} user</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{access.description}</p>
                  <button className="w-full py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    Kelola Akses
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                {modalType === 'employee' ? 'Tambah Karyawan Baru' : 'Tambah Periode Penilaian'}
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                  <input type="text" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Departemen</label>
                  <select className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 outline-none">
                    <option>Pilih Departemen</option>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Marketing</option>
                    <option>HR</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-primary-800 text-white rounded-xl hover:bg-primary-900 transition-colors"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
