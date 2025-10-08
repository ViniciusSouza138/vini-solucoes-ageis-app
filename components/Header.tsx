import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { BoltIcon } from './icons/BoltIcon';
import { UserType } from '../types';

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const homePath = user?.type === UserType.Worker ? '/dashboard' : '/';

  return (
    <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={homePath} className="flex items-center gap-2 text-2xl font-bold text-white">
          <BoltIcon className="w-8 h-8 text-brand-red" />
          <span className="font-poppins">Vini <span className="text-brand-red">Soluções Ágeis</span></span>
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="bg-brand-red text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Entrar</Link>
              <Link to="/register" className="bg-brand-red text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                Cadastre-se
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;