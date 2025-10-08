import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { getClientBookings } from '../services/api';
import { Booking, BookingStatus } from '../types';
import BookingDetailModal from '../components/BookingDetailModal';
import ReviewModal from '../components/ReviewModal';
import { StarIcon } from '../components/icons/StarIcon';
import { CalendarDaysIcon } from '../components/icons/CalendarDaysIcon';
import { WrenchScrewdriverIcon } from '../components/icons/WrenchScrewdriverIcon';
import { MegaphoneIcon } from '../components/icons/MegaphoneIcon';
import { CreditCardIcon } from '../components/icons/CreditCardIcon';
// FIX: Import the missing `InformationCircleIcon` component.
import { InformationCircleIcon } from '../components/icons/InformationCircleIcon';


type ActiveTab = 'upcoming' | 'history';

const ClientDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // Using state to manage bookings to allow for dynamic updates
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    if (user) {
      setBookings(getClientBookings(user.id));
    }
  }, [user]);

  const [activeTab, setActiveTab] = useState<ActiveTab>('upcoming');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  
  const handleOpenDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };
  
  const handleOpenReview = (booking: Booking) => {
    setSelectedBooking(booking);
    setReviewModalOpen(true);
  };

  const handleCloseModals = () => {
    setSelectedBooking(null);
    setReviewModalOpen(false);
  };

  const handleReviewSubmit = (serviceRating: number, workerRating: number, comment: string) => {
    console.log(`Submitting review for booking ${selectedBooking?.id}: Service ${serviceRating}/10, Worker ${workerRating}/10, "${comment}"`);
    alert('Avaliação enviada com sucesso! (Simulação)');
    handleCloseModals();
  };

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const upcomingStatuses = [BookingStatus.Accepted, BookingStatus.InProgress, BookingStatus.Requested, BookingStatus.PaymentPending];
    if (activeTab === 'upcoming') {
      return sortedBookings.filter(b => upcomingStatuses.includes(b.status));
    } else { // history
      return sortedBookings.filter(b => [BookingStatus.Completed, BookingStatus.Canceled].includes(b.status));
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

  return (
    <div>
      <div className="bg-brand-gray p-6 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-4xl font-bold text-white mb-2">Meus Agendamentos</h1>
            <p className="text-gray-300">Acompanhe seus serviços agendados e seu histórico.</p>
        </div>
        <Link to="/" className="bg-brand-red text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-colors text-center">
            Solicitar Novo Serviço
        </Link>
      </div>

       <div className="bg-brand-gray p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center gap-3 mb-3">
            <MegaphoneIcon className="w-6 h-6 text-brand-red" />
            <h2 className="text-2xl font-bold text-white">Anúncios da Plataforma</h2>
        </div>
        <div className="bg-brand-dark p-4 rounded-md">
            <p className="text-gray-300"><span className="font-semibold text-brand-red">Novidade!</span> Agora você pode pagar pelos serviços com PIX ou na entrega. Mais flexibilidade para você.</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-brand-light-gray mb-6">
          <button onClick={() => setActiveTab('upcoming')} className={`flex items-center gap-2 px-4 py-2 font-semibold transition-colors ${activeTab === 'upcoming' ? 'border-b-2 border-brand-red text-white' : 'text-gray-400 hover:text-white'}`}>
            <CalendarDaysIcon className="w-5 h-5"/> Próximos
          </button>
          <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2 px-4 py-2 font-semibold transition-colors ${activeTab === 'history' ? 'border-b-2 border-brand-red text-white' : 'text-gray-400 hover:text-white'}`}>
            <WrenchScrewdriverIcon className="w-5 h-5"/> Histórico
          </button>
      </div>

      <div className="space-y-6">
        {filteredBookings.length > 0 ? filteredBookings.map(booking => (
          <div key={booking.id} className="bg-brand-gray p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white">{booking.service.name}</h3>
                    <p className="text-gray-300">Profissional: {booking.worker.name}</p>
                    <p className="text-gray-400 text-sm">Data: {booking.date} às {booking.time}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <p className="text-xl font-bold text-brand-red">R$ {booking.totalValue.toFixed(2)}</p>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusChip(booking.status)}`}>
                        {booking.status}
                    </span>
                </div>
            </div>
             <div className="mt-4 pt-4 border-t border-brand-light-gray flex flex-col md:flex-row gap-3">
                <button onClick={() => handleOpenDetails(booking)} className="flex-1 bg-brand-light-gray text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                    <InformationCircleIcon className="w-5 h-5"/> Ver Detalhes
                </button>
                 {booking.status === BookingStatus.PaymentPending && (
                    <button onClick={() => navigate(`/pagamento/${booking.id}`)} className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      <CreditCardIcon className="w-5 h-5"/> Pagar Agora
                    </button>
                )}
                {booking.status === BookingStatus.Completed && (
                    <button onClick={() => handleOpenReview(booking)} className="flex-1 bg-yellow-600 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2">
                      <StarIcon className="w-5 h-5"/> Avaliar Serviço
                    </button>
                )}
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-400 py-10 bg-brand-gray rounded-lg">Nenhum agendamento encontrado nesta categoria.</p>
        )}
      </div>

      {selectedBooking && !isReviewModalOpen && (
        <BookingDetailModal 
          booking={selectedBooking} 
          onClose={handleCloseModals} 
        />
      )}

      {selectedBooking && isReviewModalOpen && (
        <ReviewModal
          booking={selectedBooking}
          onClose={handleCloseModals}
          onSubmit={handleReviewSubmit}
        />
      )}

    </div>
  );
};

export default ClientDashboard;