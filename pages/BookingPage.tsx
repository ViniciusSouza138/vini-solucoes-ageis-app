import React, { useState, useContext, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { findUserById, findServiceById, createBooking } from '../services/api';
import AuthContext from '../contexts/AuthContext';
import { calculateDistance } from '../utils/geo';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { SpecificService } from '../types';

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

  const calculateFinalPrice = (service: SpecificService) => {
    const basePrice = service.basePrice;
    const freightRate = 2.50;
    const distanceFee = distance * freightRate;
    const reputationBonus = Math.max(0, worker.reputation - 3.0) * 0.25;
    const reputationModifier = 1 + reputationBonus;
    return (basePrice + distanceFee) * reputationModifier;
  };

  const finalPrice = calculateFinalPrice(service);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !address) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    const newBooking = createBooking({
      client,
      worker,
      service,
      date,
      time,
      distance,
      totalValue: finalPrice,
    });
    
    navigate(`/pagamento/${newBooking.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="flex items-center gap-2 mb-8 text-brand-red hover:text-red-400 transition-colors font-semibold">
          <ArrowLeftIcon className="w-5 h-5" />
          Alterar Serviço ou Profissional
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Coluna do Formulário */}
        <div className="bg-brand-gray p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-6 font-montserrat">Agendar Serviço</h1>
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
              Ir para Pagamento
            </button>
          </form>
        </div>

        {/* Coluna do Resumo */}
        <div className="bg-brand-gray p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 font-montserrat border-b border-brand-light-gray pb-4">Resumo do Pedido</h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex justify-between">
              <span>Profissional:</span>
              <span className="font-semibold text-white">{worker.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Serviço:</span>
              <span className="font-semibold text-white">{service.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Valor Base:</span>
              <span className="font-semibold text-white">R$ {service.basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete ({distance.toFixed(1)} km):</span>
              <span className="font-semibold text-white">R$ {(distance * 2.50).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg mt-4 pt-4 border-t border-brand-light-gray">
              <span className="font-bold text-white">Valor Total:</span>
              <span className="font-bold text-brand-red text-2xl">R$ {finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;