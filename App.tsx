
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AuthContext from './contexts/AuthContext';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-brand-dark font-poppins">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
              <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
              <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
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
