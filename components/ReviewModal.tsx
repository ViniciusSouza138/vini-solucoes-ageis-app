import React, { useState } from 'react';
import { Booking } from '../types';

interface ReviewModalProps {
  booking: Booking;
  onClose: () => void;
  onSubmit: (serviceRating: number, workerRating: number, comment: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ booking, onClose, onSubmit }) => {
  const [serviceRating, setServiceRating] = useState<number | null>(null);
  const [workerRating, setWorkerRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (serviceRating !== null && workerRating !== null) {
      onSubmit(serviceRating, workerRating, comment);
    } else {
      alert('Por favor, selecione uma nota para o serviço e para o profissional.');
    }
  };

  const renderRatingSelector = (
    title: string,
    rating: number | null,
    setRating: (value: number) => void
  ) => (
    <div className="mb-6">
      <label className="block text-gray-300 mb-3 text-center text-lg">{title}</label>
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 11 }, (_, i) => i).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className={`w-10 h-10 rounded-full font-bold text-lg transition-all duration-200 flex items-center justify-center
              ${rating === value ? 'bg-brand-red text-white scale-110' : 'bg-brand-light-gray hover:bg-gray-600'}`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-gray rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-brand-light-gray">
          <h2 className="text-2xl font-bold text-white">Avaliar Serviço</h2>
          <p className="text-gray-400">Deixe sua opinião sobre o serviço de <span className="font-semibold">{booking.worker.name}</span>.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {renderRatingSelector("Qualidade do Serviço (0 a 10)", serviceRating, setServiceRating)}
            {renderRatingSelector("Profissional (0 a 10)", workerRating, setWorkerRating)}
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="comment">Comentário (opcional)</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                placeholder="Descreva sua experiência com o serviço e o profissional..."
              />
            </div>
          </div>
          <div className="p-4 bg-brand-dark rounded-b-lg flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-brand-red text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-500"
              disabled={serviceRating === null || workerRating === null}
            >
              Enviar Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
