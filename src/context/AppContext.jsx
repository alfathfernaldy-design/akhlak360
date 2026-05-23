import { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS, EMPLOYEES, ASSESSMENT_RESULTS } from '../data/akhlasData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'Periode penilaian semester 1 telah dimulai', time: '2 jam lalu' },
    { id: 2, type: 'warning', message: '3 penilaian belum selesai', time: '5 jam lalu' },
    { id: 3, type: 'success', message: 'Penilaian Anda telah disubmit', time: '1 hari lalu' }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('akhlak_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = DEMO_USERS.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const employee = EMPLOYEES.find(e => e.id === foundUser.employeeId);
      const userData = { ...foundUser, ...employee };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('akhlak_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    return { success: false, message: 'Username atau password salah' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('akhlak_user');
  };

  const getAssessmentResults = (employeeId) => {
    return ASSESSMENT_RESULTS[employeeId] || null;
  };

  const getPendingAssessments = () => {
    return [
      { id: 1, target: 'Siti Rahayu', type: 'self', status: 'pending', dueDate: '2025-06-30' },
      { id: 2, target: 'Ahmad Wijaya', type: 'peer', status: 'pending', dueDate: '2025-06-30' },
      { id: 3, target: 'Maya Indriyani', type: 'peer', status: 'pending', dueDate: '2025-06-30' }
    ];
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      time: 'Baru saja'
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      notifications,
      login,
      logout,
      getAssessmentResults,
      getPendingAssessments,
      addNotification,
      markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
