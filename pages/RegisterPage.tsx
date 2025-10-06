
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '../types';

const RegisterPage: React.FC = () => {
  const [userType, setUserType] = useState<UserType>(UserType.Client);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call the registration API endpoint
    alert(`Cadastro como ${userType === UserType.Client ? 'Cliente' : 'Profissional'} realizado com sucesso! (Simulação)`);
    navigate('/login');
  };

  return (
    <div className="max-w-lg mx-auto bg-brand-gray p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Crie sua Conta</h2>
      
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800 rounded-lg p-1 flex">
          <button
            onClick={() => setUserType(UserType.Client)}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${userType === UserType.Client ? 'bg-brand-red text-white' : 'text-gray-400'}`}
          >
            Sou Cliente
          </button>
          <button
            onClick={() => setUserType(UserType.Worker)}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${userType === UserType.Worker ? 'bg-brand-red text-white' : 'text-gray-400'}`}
          >
            Sou Profissional
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="name">Nome Completo</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">E-mail</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required />
        </div>
         <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="phone">Telefone</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required />
        </div>
         <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="address">Endereço Completo</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">Senha</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required />
        </div>
        <button type="submit" className="w-full bg-brand-red text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition-colors">
          Cadastrar
        </button>
      </form>
       <p className="text-center text-gray-400 mt-6">
        Já tem uma conta? <Link to="/login" className="text-brand-red hover:underline">Faça login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
