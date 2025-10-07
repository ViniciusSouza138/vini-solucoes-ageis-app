import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { BookingStatus } from '../types';
import { getWorkerBookings } from '../services/api';
import { StarIcon } from '../components/icons/StarIcon';

const WorkerDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const workerBookings = user ? getWorkerBookings(user.id) : [];

    const getStatusChip = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.Accepted: return 'bg-green-500/20 text-green-400';
      case BookingStatus.Completed: return 'bg-blue-500/20 text-blue-400';
      case BookingStatus.Canceled: return 'bg-red-500/20 text-red-400';
      case BookingStatus.InProgress: return 'bg-yellow-500/20 text-yellow-400';
      case BookingStatus.Requested: return 'bg-purple-500/20 text-purple-400';
      case BookingStatus.PaymentPending: return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div>
      <div className="bg-brand-gray p-6 rounded-lg shadow-lg mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Bem-vindo, <span className="text-brand-red">{user?.name}!</span></h1>
          <p className="text-gray-300">Gerencie seus serviços e atendimentos.</p>
        </div>
        <div className="text-right">
            <p className="text-gray-300">Sua Reputação</p>
            <div className="flex items-center justify-end gap-1 text-2xl font-bold text-yellow-400">
                <StarIcon className="w-6 h-6"/>
                <span>{user?.reputation.toFixed(1)}</span>
            </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Minhas áreas de atuação</h3>
        <div className="flex flex-wrap gap-3">
          {user?.areas?.map(area => (
            <span key={area} className="bg-brand-red/80 text-white font-semibold px-4 py-2 rounded-full">{area}</span>
          ))}
           <button className="bg-brand-light-gray text-white font-semibold px-4 py-2 rounded-full hover:bg-gray-600 transition-colors">+ Editar</button>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Solicitações de Serviço</h2>
      <div className="space-y-6">
        {workerBookings.length > 0 ? workerBookings.map(booking => (
          <div key={booking.id} className="bg-brand-gray p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white">{booking.service.name}</h3>
                    <p className="text-gray-300">Cliente: {booking.client.name}</p>
                    <p className="text-gray-400 text-sm">{booking.client.address}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-xl font-bold text-brand-red">R$ {booking.totalValue.toFixed(2)}</p>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusChip(booking.status)}`}>
                        {booking.status}
                    </span>
                </div>
            </div>
            {booking.status === BookingStatus.Requested && (
                <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col md:flex-row gap-3">
                    <button className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors">Aceitar</button>
                    <button className="flex-1 bg-yellow-600 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors">Negociar</button>
                    <button className="flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">Recusar</button>
                </div>
            )}
          </div>
        )) : (
          <p className="text-center text-gray-400 py-10 bg-brand-gray rounded-lg">Nenhuma solicitação de serviço no momento.</p>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;