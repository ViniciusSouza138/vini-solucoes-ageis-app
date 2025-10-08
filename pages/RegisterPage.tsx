import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '../types';
import { MOCK_CATEGORIES, getSpecificServicesByCategory, registerUser, findUserByEmail } from '../services/api';
import { EyeIcon } from '../components/icons/EyeIcon';
import { EyeSlashIcon } from '../components/icons/EyeSlashIcon';

const RegisterPage: React.FC = () => {
  const [userType, setUserType] = useState<UserType>(UserType.Client);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Worker specific fields
  const [cpf, setCpf] = useState('');
  const [areas, setAreas] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleAreaChange = (areaName: string) => {
    setAreas(prevAreas =>
      prevAreas.includes(areaName)
        ? prevAreas.filter(a => a !== areaName)
        : [...prevAreas, areaName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user already exists
    if (findUserByEmail(email)) {
      alert('Este e-mail já está em uso. Por favor, escolha outro.');
      return;
    }

    // Create user data object
    const commonData = {
      name,
      email,
      phone,
      address,
      type: userType,
    };
    
    const userData = userType === UserType.Worker 
      ? { 
          ...commonData, 
          areas, 
          // Assign a random profile picture for mock purposes
          profilePictureUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` 
        } 
      : commonData;

    // Call the new registerUser function to add the user to the mock list
    registerUser(userData);

    alert(`Cadastro como ${userType === UserType.Client ? 'Cliente' : 'Profissional'} realizado com sucesso! Agora você pode fazer o login.`);
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
         {userType === UserType.Worker && (
          <>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red" required />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Áreas de Atuação</label>
              <div className="space-y-4 p-4 bg-gray-800 border border-gray-600 rounded-md max-h-60 overflow-y-auto">
                {MOCK_CATEGORIES.map(category => {
                  const servicesInCategory = getSpecificServicesByCategory(category.id);
                  if (servicesInCategory.length === 0) return null;
                  return (
                    <div key={category.id}>
                      <h4 className="font-semibold text-brand-red mb-2 border-b border-gray-700 pb-1">{category.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pl-2">
                        {servicesInCategory.map(service => (
                          <label key={service.id} className="flex items-center gap-2 text-gray-200 hover:text-white cursor-pointer transition-colors text-sm">
                            <input
                              type="checkbox"
                              checked={areas.includes(service.name)}
                              onChange={() => handleAreaChange(service.name)}
                              className="w-4 h-4 text-brand-red bg-gray-700 border-gray-600 rounded focus:ring-brand-red focus:ring-offset-gray-800"
                            />
                            {service.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red pr-10"
              required
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