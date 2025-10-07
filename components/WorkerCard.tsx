import React from 'react';
import { User, SpecificService } from '../types';
import { StarIcon } from './icons/StarIcon';
import { MapPinIcon } from './icons/MapPinIcon';

interface WorkerCardProps {
  worker: User;
  distance: number;
  selectedService: SpecificService;
  onSelect: () => void;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker, distance, selectedService, onSelect }) => {
  const calculateFinalPrice = () => {
    const basePrice = selectedService.basePrice;
    const freightRate = 2.50; // R$ 2,50 por km
    const distanceFee = distance * freightRate;
    
    // Bônus de reputação: +2.5% para cada 0.1 ponto acima de 3.0, até um máximo de 50%
    const reputationBonus = Math.max(0, worker.reputation - 3.0) * 0.25;
    const reputationModifier = 1 + reputationBonus;
    
    const finalPrice = (basePrice + distanceFee) * reputationModifier;
    
    return finalPrice;
  };

  const finalPrice = calculateFinalPrice();

  return (
    <div className="bg-brand-gray p-6 rounded-lg shadow-lg flex flex-col justify-between hover:scale-105 hover:shadow-brand-red/40 transition-all duration-300">
      <div>
        <div className="flex items-start gap-4 mb-4">
            <img 
                src={worker.profilePictureUrl} 
                alt={worker.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-light-gray"
            />
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white font-montserrat">{worker.name}</h3>
                <div className="flex items-center gap-1 text-sm text-yellow-400">
                    <StarIcon className="w-4 h-4" />
                    <span className="font-bold">{worker.reputation.toFixed(1)}</span>
                </div>
            </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300 mb-4 text-sm">
          <MapPinIcon className="w-5 h-5 text-brand-red" />
          <span>Aprox. {distance.toFixed(1)} km de distância</span>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold text-gray-200 text-sm mb-2">Especialidades:</h4>
          <div className="flex flex-wrap gap-2">
            {worker.areas?.slice(0, 3).map((area) => (
              <span key={area} className="bg-brand-light-gray text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">{area}</span>
            ))}
            {worker.areas && worker.areas.length > 3 && (
                 <span className="bg-brand-light-gray text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">+{worker.areas.length - 3}</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center border-t border-brand-light-gray pt-4">
        <p className="text-md text-gray-300">Valor para <span className="font-bold text-white">{selectedService.name}</span>:</p>
        <p className="text-3xl font-bold text-brand-red">R$ {finalPrice.toFixed(2)}</p>
        <button
          onClick={onSelect}
          className="mt-4 w-full bg-brand-red text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Agendar
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;