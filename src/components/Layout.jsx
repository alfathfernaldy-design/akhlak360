import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { Menu, X, Bell, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const { user, logout, notifications } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className={`lg:transition-all lg:duration-300 pb-20 lg:pb-0 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>

            {/* Mobile Logo */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-800 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-slate-800">AKHLAK 360°</span>
            </div>

            {/* Spacer for desktop */}
            <div className="hidden lg:block" />

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Bell className="w-5 h-5 text-slate-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-800">Notifikasi</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                              !notif.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <p className="text-sm text-slate-800">{notif.message}</p>
                            <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                  <p className="text-xs text-slate-600 capitalize">{user?.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-800 to-secondary-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.avatar || user?.name?.charAt(0)}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Overlay for Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
}
