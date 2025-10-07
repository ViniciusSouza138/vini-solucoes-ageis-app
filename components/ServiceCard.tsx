
import React from 'react';
// FIX: Replaced the non-existent 'Service' type with 'SpecificService', which is defined in types.ts and has the properties used by this component.
import { SpecificService } from '../types';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';

interface ServiceCardProps {
  service: SpecificService;
  onSelect: (service: SpecificService) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(service)}
      className="bg-brand-gray p-6 rounded-lg shadow-lg hover:shadow-brand-red/50 hover:scale-105 transition-all duration-300 cursor-pointer text-center"
    >
      <div className="flex justify-center mb-4">
        <WrenchScrewdriverIcon className="w-12 h-12 text-brand-red" />
      </div>
      <h3 className="text-xl font-bold mb-2 font-montserrat">{service.name}</h3>
      <p className="text-gray-300">{service.description}</p>
    </div>
  );
};

export default ServiceCard;