import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  ClipboardCheck,
  FileText,
  BarChart3,
  MoreHorizontal
} from 'lucide-react';

const MOBILE_NAV_ITEMS = {
  admin: [
    { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { path: '/assessment', label: 'Penilaian', icon: ClipboardCheck },
    { path: '/results', label: 'Hasil', icon: FileText },
    { path: '/management', label: 'Analytics', icon: BarChart3 },
    { path: '/hr-admin', label: 'Lainnya', icon: MoreHorizontal },
  ],
  manajemen: [
    { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { path: '/management', label: 'Analytics', icon: BarChart3 },
    { path: '/results', label: 'Laporan', icon: FileText },
  ],
  atasan: [
    { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { path: '/assessment/self', label: 'Penilaian', icon: ClipboardCheck },
    { path: '/results', label: 'Hasil', icon: FileText },
  ],
  karyawan: [
    { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { path: '/assessment/self', label: 'Penilaian', icon: ClipboardCheck },
    { path: '/results', label: 'Hasil', icon: FileText },
  ],
  peer: [
    { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { path: '/assessment/self', label: 'Penilaian', icon: ClipboardCheck },
    { path: '/results', label: 'Hasil', icon: FileText },
  ]
};

export default function MobileNav() {
  const { user } = useApp();
  const location = useLocation();

  const navItems = MOBILE_NAV_ITEMS[user?.role] || MOBILE_NAV_ITEMS.karyawan;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path.split('/')[1] === '' ? '/' : '/' + item.path.split('/')[1]));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200
                ${isActive
                  ? 'text-primary-800'
                  : 'text-slate-400'
                }
              `}
            >
              <div className={`
                p-2 rounded-xl transition-all duration-200
                ${isActive ? 'bg-primary-50' : ''}
              `}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-primary-800' : ''}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
