
import React from 'react';
import { User } from '../types';
import { StarIcon } from './icons/StarIcon';
import { MapPinIcon } from './icons/MapPinIcon';

interface WorkerCardProps {
  worker: User;
  distance: number;
  onSelect: (worker: User) => void;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker, distance, onSelect }) => {
  const finalPrice = (worker.basePrice || 50) + (distance * 2.5) * (1 + (worker.reputation - 3) / 10);

  return (
    <div className="bg-brand-gray p-6 rounded-lg shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white font-montserrat">{worker.name}</h3>
          <div className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold">
            <StarIcon className="w-4 h-4" />
            <span>{worker.reputation.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-300 mb-2">
          <MapPinIcon className="w-5 h-5 text-brand-red" />
          <span>Aprox. {distance.toFixed(1)} km de distância</span>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold text-gray-200 mb-2">Especialidades:</h4>
          <div className="flex flex-wrap gap-2">
            {worker.areas?.map((area) => (
              <span key={area} className="bg-gray-700 text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">{area}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <p className="text-lg text-gray-300">Valor estimado:</p>
        <p className="text-3xl font-bold text-brand-red">R$ {finalPrice.toFixed(2)}</p>
        <button
          onClick={() => onSelect(worker)}
          className="mt-4 w-full bg-brand-red text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Solicitar
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;
