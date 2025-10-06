
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { MOCK_USERS } from '../services/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Mock login logic
    const user = MOCK_USERS.find(u => u.email === email);
    if (user) { // In a real app, you would check the password hash
      login(user);
      navigate('/dashboard');
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-brand-gray p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Acesse sua conta</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-brand-red text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Entrar
        </button>
      </form>
      <p className="text-center text-gray-400 mt-6">
        Não tem uma conta? <Link to="/register" className="text-brand-red hover:underline">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default LoginPage;
