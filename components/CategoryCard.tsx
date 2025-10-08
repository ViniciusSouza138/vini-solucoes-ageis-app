import React from 'react';
import { ServiceCategory, SpecificService } from '../types';
import { ClockIcon } from './icons/ClockIcon';

interface CategoryCardProps {
  category: ServiceCategory;
  services: SpecificService[];
  isOpen: boolean;
  onToggle: () => void;
  onServiceSelect: (service: SpecificService) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, services, isOpen, onToggle, onServiceSelect }) => {
  const Icon = category.icon;

  return (
    <div className="bg-brand-gray rounded-lg shadow-lg transition-all duration-300 overflow-hidden">
      <div
        onClick={onToggle}
        className="p-6 cursor-pointer flex justify-between items-center hover:bg-brand-light-gray"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          {Icon && <Icon className="w-12 h-12 text-brand-red" />}
          <h3 className="text-xl font-bold font-montserrat text-left">{category.name}</h3>
        </div>
        <svg
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.94 8.56-7.94 7.94-7.94-7.94" />
        </svg>
      </div>

      {/* Expanded Content */}
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-brand-light-gray p-4 md:p-6 space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onServiceSelect(service)}
              className="bg-brand-dark p-4 rounded-md hover:bg-black/50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white">{service.name}</h4>
                <div className="text-right">
                    <span className="text-sm font-semibold text-gray-300 whitespace-nowrap">a partir de</span>
                    <p className="text-lg font-bold text-brand-red whitespace-nowrap">R$ {service.minPrice.toFixed(2)}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3">{service.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ClockIcon className="w-4 h-4" />
                <span>Tempo estimado: {service.estimatedTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;