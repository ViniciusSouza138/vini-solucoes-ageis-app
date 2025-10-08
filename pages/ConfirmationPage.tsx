import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { findBookingById } from '../services/api';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { CalendarDaysIcon } from '../components/icons/CalendarDaysIcon';
import { ClockIcon } from '../components/icons/ClockIcon';

const ConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const booking = useMemo(() => findBookingById(bookingId!), [bookingId]);

  if (!booking) {
    return <div className="text-center p-10">Agendamento não encontrado.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto text-center bg-brand-gray p-8 rounded-lg shadow-lg">
      <div className="flex justify-center mb-4">
        <CheckCircleIcon className="w-16 h-16 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2 font-montserrat">Agendamento Confirmado!</h1>
      <p className="text-gray-300 mb-8">Seu serviço foi agendado com sucesso.</p>

      <div className="text-left bg-brand-light-gray p-6 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Serviço:</span>
          <span className="font-semibold text-white text-lg">{booking.service.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Profissional:</span>
          <span className="font-semibold text-white text-lg">{booking.worker.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Data e Hora:</span>
          <div className="flex items-center gap-2 font-semibold text-white text-lg">
            <CalendarDaysIcon className="w-5 h-5"/> {booking.date} <ClockIcon className="w-5 h-5 ml-2"/> {booking.time}
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-600">
          <span className="text-gray-400">Valor Pago:</span>
          <span className="font-bold text-brand-red text-xl">R$ {booking.totalValue.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Link
          to="/"
          className="w-full max-w-xs bg-brand-red text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-colors"
        >
          Solicitar Outro Serviço
        </Link>
        <Link
          to="/dashboard"
          className="font-semibold text-gray-300 hover:text-white transition-colors"
        >
          Ver Meus Agendamentos
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;