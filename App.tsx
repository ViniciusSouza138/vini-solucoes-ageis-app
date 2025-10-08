import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User, UserType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import RequestSentPage from './pages/RequestSentPage'; // Import new page
import AuthContext from './contexts/AuthContext';

// Componente para proteger rotas
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="text-center p-10">Carregando...</div>;
  }

  if (!user) {
    // Salva a rota que o usuário tentou acessar e redireciona para o login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Componente para redirecionar funcionários da página inicial para o dashboard
const HomeRedirect: React.FC = () => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div className="text-center p-10">Carregando...</div>;
  }

  if (user && user.type === UserType.Worker) {
    return <Navigate to="/dashboard" replace />;
  }

  return <HomePage />;
};


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simula a verificação de sessão (ex: cookie) ao carregar o app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-brand-dark font-poppins">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomeRedirect />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Rotas Protegidas */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/agendar/:workerId/:serviceId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
              <Route path="/pagamento/:bookingId" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
              <Route path="/confirmacao/:bookingId" element={<ProtectedRoute><ConfirmationPage /></ProtectedRoute>} />
              <Route path="/solicitacao-enviada" element={<ProtectedRoute><RequestSentPage /></ProtectedRoute>} /> {/* Add new route */}


              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
