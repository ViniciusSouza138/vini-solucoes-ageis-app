import React, { useContext, useMemo, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Booking, BookingStatus } from '../types';
import { getWorkerBookings, MOCK_CATEGORIES, MOCK_SPECIFIC_SERVICES, updateBookingStatus } from '../services/api';
import { getReputationModifierText } from '../utils/pricing';
import { StarIcon } from '../components/icons/StarIcon';
import { MedalIcon } from '../components/icons/MedalIcon';
import { CurrencyDollarIcon } from '../components/icons/CurrencyDollarIcon';
import { BanknotesIcon } from '../components/icons/BanknotesIcon';
import { BellIcon } from '../components/icons/BellIcon';
import { WrenchScrewdriverIcon } from '../components/icons/WrenchScrewdriverIcon';
import { ClockIcon } from '../components/icons/ClockIcon';
import { MegaphoneIcon } from '../components/icons/MegaphoneIcon';


type ActiveTab = 'new' | 'ongoing' | 'history';

const WorkerDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState<Booking[]>([]);
  // FIX: Define state for the active tab to fix multiple 'Cannot find name' errors.
  const [activeTab, setActiveTab] = useState<ActiveTab>('new');

  useEffect(() => {
    if (user) {
      setBookings(getWorkerBookings(user.id));
    }
  }, [user]);

  const handleUpdateStatus = (bookingId: string, status: BookingStatus) => {
    const updatedBooking = updateBookingStatus(bookingId, status);
    if (updatedBooking) {
        setBookings(prevBookings => 
            prevBookings.map(b => b.id === bookingId ? updatedBooking : b)
        );
    }
    console.log(`Booking ${bookingId} status updated to ${status}`);
  };

  const earnings = useMemo(() => {
    if (!bookings) return { realizados: 0, pendentes: 0 };
    
    const realizados = bookings
      .filter(b => b.status === BookingStatus.Completed)
      .reduce((sum, b) => sum + b.totalValue, 0);
      
    const pendentes = bookings
      .filter(b => [BookingStatus.Accepted, BookingStatus.InProgress, BookingStatus.PaymentPending].includes(b.status))
      .reduce((sum, b) => sum + b.totalValue, 0);

    return { realizados, pendentes };
  }, [bookings]);

  const groupedAreas = useMemo(() => {
    if (!user?.areas) return [];
    const serviceMap = new Map<string, string[]>();
    user.areas.forEach(areaName => {
        const service = MOCK_SPECIFIC_SERVICES.find(s => s.name === areaName);
        if (service) {
            const category = MOCK_CATEGORIES.find(c => c.id === service.categoryId);
            if (category) {
                if (!serviceMap.has(category.name)) {
                    serviceMap.set(category.name, []);
                }
                serviceMap.get(category.name)?.push(service.name);
            }
        }
    });
    return Array.from(serviceMap.entries()).map(([categoryName, services]) => ({
        categoryName,
        services
    }));
  }, [user?.areas]);
  
  const sortedBookings = useMemo(() => {
    // Sort primarily by a logical status order, then by date
    const statusOrder: { [key in BookingStatus]: number } = {
      [BookingStatus.Requested]: 1,
      [BookingStatus.PaymentPending]: 2,
      [BookingStatus.Accepted]: 3,
      [BookingStatus.InProgress]: 4,
      [BookingStatus.Completed]: 5,
      [BookingStatus.Canceled]: 6,
    };
    return [...bookings].sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Most recent first
    });
  }, [bookings]);


  const filteredBookings = useMemo(() => {
    switch (activeTab) {
      case 'new':
        return sortedBookings.filter(b => b.status === BookingStatus.Requested);
      case 'ongoing':
        return sortedBookings.filter(b => [BookingStatus.Accepted, BookingStatus.InProgress, BookingStatus.PaymentPending].includes(b.status));
      case 'history':
        return sortedBookings.filter(b => [BookingStatus.Completed, BookingStatus.Canceled].includes(b.status));
      default:
        return sortedBookings;
    }
  }, [activeTab, sortedBookings]);

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
  
  const renderBookingActions = (booking: Booking) => {
    switch (booking.status) {
      case BookingStatus.Requested:
        return (
          <div className="mt-4 pt-4 border-t border-brand-light-gray flex flex-col md:flex-row gap-3">
            <button onClick={() => handleUpdateStatus(booking.id, BookingStatus.PaymentPending)} className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors">Aceitar</button>
            <button onClick={() => alert('Funcionalidade de negociação em desenvolvimento.')} className="flex-1 bg-yellow-600 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors">Negociar</button>
            <button onClick={() => handleUpdateStatus(booking.id, BookingStatus.Canceled)} className="flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">Recusar</button>
          </div>
        );
      case BookingStatus.Accepted:
        return (
          <div className="mt-4 pt-4 border-t border-brand-light-gray flex gap-3">
            <button onClick={() => handleUpdateStatus(booking.id, BookingStatus.InProgress)} className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Iniciar Serviço</button>
          </div>
        );
      case BookingStatus.InProgress:
        return (
          <div className="mt-4 pt-4 border-t border-brand-light-gray flex gap-3">
            <button onClick={() => handleUpdateStatus(booking.id, BookingStatus.Completed)} className="flex-1 bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">Finalizar Serviço</button>
          </div>
        );
       case BookingStatus.PaymentPending:
        return (
          <div className="mt-4 pt-4 border-t border-brand-light-gray text-center">
            <p className="text-yellow-400 font-semibold">Aguardando pagamento do cliente...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="bg-brand-gray p-6 rounded-lg shadow-lg mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Bem-vindo, <span className="text-brand-red">{user?.name}!</span></h1>
          <p className="text-gray-300">Gerencie seus serviços e atendimentos.</p>
        </div>
        <div className="text-right">
            <p className="text-gray-300">Sua Reputação</p>
            <div className="flex items-center justify-end gap-2 text-2xl font-bold text-yellow-400">
                {user && user.reputation >= 4.8 && <MedalIcon className="w-7 h-7 text-yellow-400"/>}
                <StarIcon className="w-6 h-6"/>
                <span>{user?.reputation.toFixed(1)}</span>
            </div>
        </div>
      </div>
      
       <div className="bg-brand-gray p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center gap-3 mb-3">
            <MegaphoneIcon className="w-6 h-6 text-brand-red" />
            <h2 className="text-2xl font-bold text-white">Anúncios da Plataforma</h2>
        </div>
        <div className="bg-brand-dark p-4 rounded-md">
            <p className="text-gray-300"><span className="font-semibold text-brand-red">Importante:</span> Lembre-se de iniciar o serviço no app assim que chegar ao local para que o cliente possa acompanhar o progresso.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1 bg-brand-gray p-6 rounded-lg">
           <h3 className="text-2xl font-bold mb-4 border-b border-brand-light-gray pb-2">Resumo de Ganhos</h3>
           <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-full">
                   <CurrencyDollarIcon className="w-8 h-8 text-green-400"/>
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Ganhos Realizados</p>
                    <p className="text-2xl font-bold text-white">R$ {earnings.realizados.toFixed(2)}</p>
                </div>
              </div>
               <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-full">
                   <BanknotesIcon className="w-8 h-8 text-yellow-400"/>
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Ganhos Pendentes</p>
                    <p className="text-2xl font-bold text-white">R$ {earnings.pendentes.toFixed(2)}</p>
                </div>
              </div>
           </div>
        </div>
        
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-gray p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 border-b border-brand-light-gray pb-2">Minhas áreas de Atuação</h3>
              <div className="space-y-4">
                  {groupedAreas.map(({ categoryName, services }) => (
                      <div key={categoryName}>
                          <h4 className="font-semibold text-brand-red text-lg mb-2">{categoryName}</h4>
                          <div className="flex flex-wrap gap-2">
                              {services.map(serviceName => (
                                  <span key={serviceName} className="bg-brand-light-gray text-gray-200 text-xs font-semibold px-3 py-1 rounded-full">
                                      {serviceName}
                                  </span>
                              ))}
                          </div>
                      </div>
                  ))}
                  {groupedAreas.length === 0 && (
                      <p className="text-gray-400">Nenhuma área de atuação definida.</p>
                  )}
              </div>
            </div>
            <div className="bg-brand-gray p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 border-b border-brand-light-gray pb-2">Impacto da Avaliação</h3>
                <div className="text-center">
                    <p className="text-gray-300">Sua nota de <span className="font-bold text-yellow-400">{user?.reputation.toFixed(1)}</span> aplica o seguinte ajuste:</p>
                    <p className="text-3xl font-bold text-brand-red my-2">{user ? getReputationModifierText(user.reputation) : 'N/A'}</p>
                    <p className="text-xs text-gray-400">Boas avaliações melhoram seus ganhos.</p>
                </div>
            </div>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-6">Painel de Serviços</h2>
      
      {/* Tabs */}
      <div className="flex border-b border-brand-light-gray mb-6">
          <button onClick={() => setActiveTab('new')} className={`flex items-center gap-2 px-4 py-2 font-semibold transition-colors ${activeTab === 'new' ? 'border-b-2 border-brand-red text-white' : 'text-gray-400 hover:text-white'}`}>
            <BellIcon className="w-5 h-5"/> Novas Solicitações
          </button>
          <button onClick={() => setActiveTab('ongoing')} className={`flex items-center gap-2 px-4 py-2 font-semibold transition-colors ${activeTab === 'ongoing' ? 'border-b-2 border-brand-red text-white' : 'text-gray-400 hover:text-white'}`}>
            <WrenchScrewdriverIcon className="w-5 h-5"/> Em Andamento
          </button>
          <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2 px-4 py-2 font-semibold transition-colors ${activeTab === 'history' ? 'border-b-2 border-brand-red text-white' : 'text-gray-400 hover:text-white'}`}>
            <ClockIcon className="w-5 h-5"/> Histórico
          </button>
      </div>

      <div className="space-y-6">
        {filteredBookings.length > 0 ? filteredBookings.map(booking => (
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
            {renderBookingActions(booking)}
          </div>
        )) : (
          <p className="text-center text-gray-400 py-10 bg-brand-gray rounded-lg">Nenhuma solicitação de serviço nesta categoria.</p>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;