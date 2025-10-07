import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { findUserByEmail } from '../services/api';
import { UserType } from '../types';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  // Efeito para redirecionar APÓS o estado do usuário ser atualizado.
  useEffect(() => {
    // Se o usuário foi autenticado com sucesso, navegue.
    if (user) {
      const targetPath = from || (user.type === UserType.Worker ? '/dashboard' : '/');
      navigate(targetPath, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // NOTE: Esta é uma simulação. A senha é verificada apenas para não ser vazia.
    // E-mails válidos: ana@cliente.com, carlos@worker.com
    const foundUser = findUserByEmail(email);

    if (foundUser && password) {
      // Apenas chama o login. O useEffect cuidará da navegação.
      login(foundUser);
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-brand-gray p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-white mb-6 font-montserrat">Acesse sua conta</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
            required
            placeholder="seu@email.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
            required
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-brand-red text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Entrar
        </button>
      </form>

      <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-600 before:mt-0.5 after:flex-1 after:border-t after:border-gray-600 after:mt-0.5">
        <p className="text-center font-semibold mx-4 text-gray-400">OU</p>
      </div>
      
      <Link
        to="/"
        className="block w-full bg-brand-light-gray text-white font-bold py-3 px-4 rounded-md hover:bg-gray-600 transition-colors text-center"
      >
        Usar sem login
      </Link>

      <p className="text-center text-gray-400 mt-6">
        Não tem uma conta? <Link to="/register" className="text-brand-red hover:underline">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default LoginPage;