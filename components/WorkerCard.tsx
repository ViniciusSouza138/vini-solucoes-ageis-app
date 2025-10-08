import React, { useState, useEffect, useMemo } from 'react';
import { User, SpecificService } from '../types';
import { StarIcon } from './icons/StarIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { MedalIcon } from './icons/MedalIcon';
import { HeartIcon } from './icons/HeartIcon';
import { calculateFinalPriceRange } from '../utils/pricing';
import { MOCK_CATEGORIES, MOCK_SPECIFIC_SERVICES } from '../services/api';

interface WorkerCardProps {
  worker: User;
  distance: number;
  selectedService: SpecificService;
  onSelect: () => void;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker, distance, selectedService, onSelect }) => {
  const { minFinalPrice, maxFinalPrice } = calculateFinalPriceRange(selectedService, worker, distance);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteWorkers') || '[]');
    setIsFavorite(favorites.includes(worker.id));
  }, [worker.id]);

  const mainCategories = useMemo(() => {
    if (!worker.areas) return [];
    
    const categoryIds = worker.areas.map(areaName => {
        const service = MOCK_SPECIFIC_SERVICES.find(s => s.name === areaName);
        return service ? service.categoryId : null;
    }).filter(Boolean);

    const uniqueCategoryIds = [...new Set(categoryIds)];

    return uniqueCategoryIds.map(catId => {
        return MOCK_CATEGORIES.find(c => c.id === catId)?.name;
    }).filter(Boolean) as string[];

  }, [worker.areas]);


  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when favoriting
    const favorites = JSON.parse(localStorage.getItem('favoriteWorkers') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((id: string) => id !== worker.id)
      : [...favorites, worker.id];
    localStorage.setItem('favoriteWorkers', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };
  
  const getReputationMessage = (reputation: number) => {
    if (reputation >= 4.8) return "💬 Profissional Ouro com avaliação excepcional.";
    if (reputation < 2.5) return "💬 Profissional iniciante com valor de incentivo.";
    return "💬 Este profissional possui uma ótima avaliação.";
  };

  return (
    <div className="bg-brand-gray p-6 rounded-lg shadow-lg flex flex-col justify-between hover:scale-105 hover:shadow-brand-red/40 transition-all duration-300 relative">
       <button onClick={toggleFavorite} className="absolute top-4 right-4 text-gray-500 hover:text-brand-red transition-colors z-10">
        <HeartIcon className={`w-7 h-7 ${isFavorite ? 'fill-brand-red text-brand-red' : 'fill-transparent'}`} />
      </button>
      <div>
        <div className="flex items-start gap-4 mb-4">
            <img 
                src={worker.profilePictureUrl} 
                alt={worker.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-light-gray"
            />
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white font-montserrat">{worker.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-sm text-yellow-400">
                        <StarIcon className="w-4 h-4" />
                        <span className="font-bold">{worker.reputation.toFixed(1)}</span>
                    </div>
                    {worker.reputation >= 4.8 && (
                        <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">
                            <MedalIcon className="w-3 h-3" />
                            <span>Profissional Ouro</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300 mb-4 text-sm">
          <MapPinIcon className="w-5 h-5 text-brand-red" />
          <span>Aprox. {distance.toFixed(1)} km de distância</span>
        </div>
        <p className="text-xs text-gray-400 italic mb-4 h-8">{getReputationMessage(worker.reputation)}</p>
        <div>
          <h4 className="font-semibold text-gray-200 text-sm mb-2">Especialidades:</h4>
          <div className="flex flex-wrap gap-2">
            {mainCategories.slice(0, 3).map((categoryName) => (
              <span key={categoryName} className="bg-brand-light-gray text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">{categoryName}</span>
            ))}
            {mainCategories.length > 3 && (
                 <span className="bg-brand-light-gray text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">+{mainCategories.length - 3}</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center border-t border-brand-light-gray pt-4">
        <p className="text-md text-gray-300">Valor para <span className="font-bold text-white">{selectedService.name}</span>:</p>
        <p className="text-3xl font-bold text-brand-red">
            R$ {minFinalPrice.toFixed(2)} - {maxFinalPrice.toFixed(2)}
        </p>
        <p className="text-xs text-gray-500 mt-2 text-center group relative">
            💡 Valor final estimado.
            <span className="absolute bottom-full mb-2 w-60 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg z-10">
                O valor inclui o preço do serviço (ajustado pela avaliação do profissional) e o frete por distância.
            </span>
        </p>
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