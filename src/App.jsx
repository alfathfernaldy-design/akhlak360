import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import GapAnalysis from './pages/GapAnalysis';
import Management from './pages/Management';
import HRAdmin from './pages/HRAdmin';
import Layout from './components/Layout';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-800 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, loading } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-800 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="assessment/:type" element={<Assessment />} />
        <Route path="results" element={<Results />} />
        <Route path="gap-analysis" element={<GapAnalysis />} />
        <Route path="management" element={
          <ProtectedRoute allowedRoles={['manajemen', 'admin']}>
            <Management />
          </ProtectedRoute>
        } />
        <Route path="hr-admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <HRAdmin />
          </ProtectedRoute>
        } />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
