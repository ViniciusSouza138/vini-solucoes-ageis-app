import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { findUserByEmail } from '../services/api';
import { UserType } from '../types';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { AppleIcon } from '../components/icons/AppleIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { EyeSlashIcon } from '../components/icons/EyeSlashIcon';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (user) {
      // Redireciona ambos os tipos de usuário para o dashboard após o login
      const targetPath = from || '/dashboard';
      navigate(targetPath, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const foundUser = findUserByEmail(email);

    if (foundUser && password) {
      login(foundUser);
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };
  
  const handleSocialLogin = (provider: string) => {
    alert(`Login com ${provider} ainda não implementado. (Simulação)`);
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
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red pr-10"
              required
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-6 h-6" />
              ) : (
                <EyeIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-brand-red text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Entrar
        </button>
      </form>

      <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-600 before:mt-0.5 after:flex-1 after:border-t after:border-gray-600 after:mt-0.5">
        <p className="text-center font-semibold mx-4 text-gray-400">OU</p>
      </div>

      <div className="space-y-3">
         <button onClick={() => handleSocialLogin('Google')} className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-2.5 px-4 rounded-md hover:bg-gray-200 transition-colors">
            <GoogleIcon className="w-6 h-6"/>
            <span>Entrar com Google</span>
         </button>
         <button onClick={() => handleSocialLogin('Facebook')} className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-semibold py-2.5 px-4 rounded-md hover:bg-[#166fe5] transition-colors">
            <FacebookIcon className="w-6 h-6"/>
            <span>Entrar com Facebook</span>
         </button>
         <button onClick={() => handleSocialLogin('Apple')} className="w-full flex items-center justify-center gap-3 bg-black text-white font-semibold py-2.5 px-4 rounded-md hover:bg-gray-800 transition-colors">
            <AppleIcon className="w-6 h-6"/>
            <span>Entrar com Apple</span>
         </button>
      </div>
      
      <p className="text-center text-gray-400 mt-6">
        Não tem uma conta? <Link to="/register" className="text-brand-red hover:underline">Cadastre-se</Link>
      </p>
       <p className="text-center text-gray-500 mt-4 text-sm">
        <Link to="/" className="hover:underline">Continuar sem login &rarr;</Link>
      </p>
    </div>
  );
};

export default LoginPage;