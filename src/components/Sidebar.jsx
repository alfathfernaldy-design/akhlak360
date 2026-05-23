import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  ClipboardCheck,
  FileText,
  BarChart3,
  Settings,
  Users,
  Calendar,
  Shield,
  X,
  Target,
  ChevronRight,
  ChevronLeft,
  LogOut,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = {
  admin: [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/hr-admin', label: 'Kelola Data', icon: Users },
    { path: '/assessment', label: 'Penilaian', icon: ClipboardCheck },
    { path: '/results', label: 'Hasil', icon: FileText },
    { path: '/gap-analysis', label: 'Gap Analysis', icon: Target },
    { path: '/management', label: 'Analytics', icon: BarChart3 },
  ],
  manajemen: [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/management', label: 'Analytics', icon: BarChart3 },
    { path: '/results', label: 'Laporan', icon: FileText },
    { path: '/gap-analysis', label: 'Gap Analysis', icon: Target },
  ],
  atasan: [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/assessment/self', label: 'Self Assessment', icon: ClipboardCheck },
    { path: '/assessment/peer', label: 'Penilaian Rekan', icon: Users },
    { path: '/assessment/subordinate', label: 'Penilaian Bawahan', icon: Shield },
    { path: '/results', label: 'Hasil', icon: FileText },
    { path: '/gap-analysis', label: 'Gap Analysis', icon: Target },
  ],
  karyawan: [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/assessment/self', label: 'Self Assessment', icon: ClipboardCheck },
    { path: '/assessment/peer', label: 'Penilaian Rekan', icon: Users },
    { path: '/results', label: 'Hasil', icon: FileText },
    { path: '/gap-analysis', label: 'Gap Analysis', icon: Target },
  ],
  peer: [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/assessment/self', label: 'Self Assessment', icon: ClipboardCheck },
    { path: '/assessment/peer', label: 'Penilaian Rekan', icon: Users },
    { path: '/results', label: 'Hasil', icon: FileText },
  ]
};

export default function Sidebar({ isOpen, onClose, collapsed, onToggle }) {
  const { user, logout } = useApp();
  const location = useLocation();

  const navItems = NAV_ITEMS[user?.role] || NAV_ITEMS.karyawan;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:flex-col lg:fixed lg:top-0 lg:bottom-0 bg-gradient-to-b from-primary-800 to-primary-900 z-50 transition-all duration-300 ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}>
        <SidebarContent navItems={navItems} user={user} onClose={onClose} logout={logout} collapsed={collapsed} onToggle={onToggle} />

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 transition-colors z-50"
        >
          {collapsed ? (
            <PanelLeft className="w-4 h-4 text-slate-500" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-slate-500" />
          )}
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl"
          >
            <SidebarContent navItems={navItems} user={user} onClose={onClose} logout={logout} isMobile />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({ navItems, user, onClose, logout, isMobile, collapsed, onToggle }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`p-4 border-b border-slate-100 ${collapsed ? 'px-2' : ''}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-800 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-slate-800 text-lg">AKHLAK 360°</h1>
                <p className="text-xs text-slate-500">PT Energi Nusanstara</p>
              </div>
            )}
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto ${collapsed ? 'px-2' : 'px-4'}`}>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-primary-800 to-primary-900 text-white shadow-lg shadow-primary-800/25'
                    : 'text-primary-700 hover:bg-primary-50'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
                onClick={isMobile ? onClose : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-primary-600'}`} />
                {!collapsed && (
                  <>
                    <span className={`font-medium text-sm ${isActive ? 'text-white' : 'text-primary-700'}`}>{item.label}</span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-slate-100 ${collapsed ? 'px-2' : ''}`}>
        {!collapsed ? (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">
                  {user?.avatar || user?.name?.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.avatar || user?.name?.charAt(0)}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Keluar"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
