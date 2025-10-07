import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { BookingStatus } from '../types';
import { getClientBookings } from '../services/api';
import { CalendarDaysIcon } from '../components/icons/CalendarDaysIcon';
import { ClockIcon } from '../components/icons/ClockIcon';
import { WrenchScrewdriverIcon } from '../components/icons/WrenchScrewdriverIcon';

const ClientDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const clientBookings = user ? getClientBookings(user.id) : [];

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
      <h1 className="text-4xl font-bold text-white mb-2">Olá, <span className="text-brand-red">{user?.name}!</span></h1>
      <p className="text-gray-300 mb-8">Aqui estão seus agendamentos.</p>
      
      <div className="space-y-6">
        {clientBookings.length > 0 ? clientBookings.map(booking => (
          <div key={booking.id} className="bg-brand-gray p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-grow">
               <div className="flex items-center gap-4 mb-3">
                 <WrenchScrewdriverIcon className="w-6 h-6 text-brand-red"/>
                 <h2 className="text-2xl font-bold font-montserrat">{booking.service.name}</h2>
               </div>
               <p className="text-gray-300">com <span className="font-semibold text-white">{booking.worker.name}</span></p>
               <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-gray-400">
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-5 h-5"/>
                    <span>{booking.date}</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5"/>
                    <span>{booking.time}</span>
                  </div>
               </div>
            </div>
             <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusChip(booking.status)}`}>
                  {booking.status}
                </span>
                <p className="text-2xl font-bold text-brand-red">R$ {booking.totalValue.toFixed(2)}</p>
                 <button className="bg-brand-light-gray text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors w-full md:w-auto">
                    Ver Detalhes
                </button>
             </div>
          </div>
        )) : (
          <p className="text-center text-gray-400 py-10 bg-brand-gray rounded-lg">Você ainda não possui nenhum agendamento.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;