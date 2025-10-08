import React, { useMemo } from 'react';
import { Booking } from '../types';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import { ClockIcon } from './icons/ClockIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { CurrencyDollarIcon } from './icons/CurrencyDollarIcon';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';
import { StarIcon } from './icons/StarIcon';
import { calculateFinalPriceRange, getReputationModifierText } from '../utils/pricing';

interface BookingDetailModalProps {
  booking: Booking;
  onClose: () => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({ booking, onClose }) => {

  const priceDetails = useMemo(() => {
    return calculateFinalPriceRange(booking.service, booking.worker, booking.distance);
  }, [booking]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'ACEITO': return { text: 'Confirmado', chip: 'bg-green-500/20 text-green-400' };
      case 'CONCLUÍDO': return { text: 'Concluído', chip: 'bg-blue-500/20 text-blue-400' };
      case 'CANCELADO': return { text: 'Cancelado', chip: 'bg-red-500/20 text-red-400' };
      case 'EM ANDAMENTO': return { text: 'Em Andamento', chip: 'bg-yellow-500/20 text-yellow-400' };
      case 'SOLICITADO': return { text: 'Solicitado', chip: 'bg-purple-500/20 text-purple-400' };
      case 'PAGAMENTO PENDENTE': return { text: 'Aguardando Pagamento', chip: 'bg-orange-500/20 text-orange-400' };
      default: return { text: status, chip: 'bg-gray-700' };
    }
  };
  
  const statusInfo = getStatusInfo(booking.status);


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-gray rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-brand-light-gray flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Detalhes do Agendamento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <WrenchScrewdriverIcon className="w-6 h-6 text-brand-red" />
                <div>
                  <p className="text-sm text-gray-400">Serviço</p>
                  <p className="font-semibold text-white">{booking.service.name}</p>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <StarIcon className="w-6 h-6 text-brand-red" />
                <div>
                  <p className="text-sm text-gray-400">Profissional</p>
                  <p className="font-semibold text-white">{booking.worker.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDaysIcon className="w-6 h-6 text-brand-red" />
                <div>
                  <p className="text-sm text-gray-400">Data e Hora</p>
                  <p className="font-semibold text-white">{booking.date} - {booking.time}</p>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <MapPinIcon className="w-6 h-6 text-brand-red" />
                <div>
                  <p className="text-sm text-gray-400">Local</p>
                  <p className="font-semibold text-white">{booking.client.address}</p>
                </div>
              </div>
          </div>
          
          {/* Detalhamento de Custos */}
          <div className="pt-4 mt-4 border-t border-brand-light-gray">
             <h3 className="text-lg font-bold text-white mb-3">Detalhamento de Custos</h3>
             <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Serviço (base):</span>
                  <span className="font-semibold text-white">R$ {booking.service.minPrice.toFixed(2)} - {booking.service.maxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ajuste (Reputação {booking.worker.reputation.toFixed(1)} ⭐):</span>
                  <span className="font-semibold text-white">{getReputationModifierText(booking.worker.reputation)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete ({booking.distance.toFixed(1)} km):</span>
                  <span className="font-semibold text-white">R$ {priceDetails.freightCost.toFixed(2)}</span>
                </div>
             </div>
          </div>
          
          {/* Total e Status */}
           <div className="flex justify-between items-center pt-4 mt-4 border-t border-brand-light-gray">
            <div>
              <p className="text-sm text-gray-400">Total Pago</p>
              <p className="font-bold text-brand-red text-2xl">R$ {booking.totalValue.toFixed(2)}</p>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Status</p>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusInfo.chip}`}>
                  {statusInfo.text}
                </span>
            </div>
           </div>
        </div>
        <div className="p-4 bg-brand-dark rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="bg-brand-red text-white font-semibold py-2 px-6 rounded-md hover:bg-red-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
