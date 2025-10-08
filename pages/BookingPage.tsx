import React, { useState, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findUserById, findServiceById, createBooking } from '../services/api';
import AuthContext from '../contexts/AuthContext';
import { calculateDistance } from '../utils/geo';
import { calculateFinalPriceRange, getReputationModifierText } from '../utils/pricing';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

const BookingPage: React.FC = () => {
  const { workerId, serviceId } = useParams<{ workerId: string; serviceId: string }>();
  const navigate = useNavigate();
  const { user: client } = useContext(AuthContext);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState(client?.address || '');
  const [error, setError] = useState('');

  const worker = useMemo(() => findUserById(workerId!), [workerId]);
  const service = useMemo(() => findServiceById(serviceId!), [serviceId]);

  if (!worker || !service || !client) {
    return <div className="text-center p-10">Dados do agendamento não encontrados.</div>;
  }

  const distance = calculateDistance(
    { latitude: client.latitude, longitude: client.longitude },
    { latitude: worker.latitude, longitude: worker.longitude }
  );

  const { minFinalPrice, maxFinalPrice, freightCost } = useMemo(() => {
    return calculateFinalPriceRange(service, worker, distance);
  }, [service, worker, distance]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !address) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    // Cria a solicitação, mas não vai para o pagamento ainda
    createBooking({
      client,
      worker,
      service,
      date,
      time,
      distance,
      totalValue: (minFinalPrice + maxFinalPrice) / 2, // Use average for booking record
    });
    
    // Redireciona para uma página de confirmação de envio
    navigate(`/solicitacao-enviada`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 mb-8 text-brand-red hover:text-red-400 transition-colors font-semibold"
      >
          <ArrowLeftIcon className="w-5 h-5" />
          Alterar Serviço ou Profissional
      </button>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Coluna do Formulário */}
        <div className="bg-brand-gray p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-6 font-montserrat">Solicitar Serviço</h1>
          <form onSubmit={handleSubmit}>
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-center">{error}</p>}
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="address">Endereço de Atendimento</label>
              <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white" required />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="date">Data</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white" required />
              </div>
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="time">Horário</label>
                <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white" required />
              </div>
            </div>

            <button type="submit" className="w-full bg-brand-red text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition-colors">
              Enviar Solicitação ao Profissional
            </button>
          </form>
        </div>

        {/* Coluna do Resumo */}
        <div className="bg-brand-gray p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 font-montserrat border-b border-brand-light-gray pb-4">Resumo do Pedido</h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span>Profissional:</span>
              <span className="font-semibold text-white">{worker.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Serviço:</span>
              <span className="font-semibold text-white">{service.name}</span>
            </div>
            <hr className="border-brand-light-gray my-2" />
            <div className="flex justify-between">
              <span>Serviço (base):</span>
              <span className="font-semibold text-white">R$ {service.minPrice.toFixed(2)} - {service.maxPrice.toFixed(2)}</span>
            </div>
             <div className="flex justify-between">
              <span>Ajuste (Reputação {worker.reputation.toFixed(1)} ⭐):</span>
              <span className="font-semibold text-white">{getReputationModifierText(worker.reputation)}</span>
            </div>
             <div className="flex justify-between">
              <span>Frete ({distance.toFixed(1)} km):</span>
              <span className="font-semibold text-white">R$ {freightCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg mt-4 pt-4 border-t border-brand-light-gray">
              <span className="font-bold text-white">Total Estimado:</span>
              <span className="font-bold text-brand-red text-2xl">R$ {minFinalPrice.toFixed(2)} - {maxFinalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
