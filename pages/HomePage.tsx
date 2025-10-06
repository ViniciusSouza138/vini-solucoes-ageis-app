
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Service, User, UserType } from '../types';
import ServiceCard from '../components/ServiceCard';
import WorkerCard from '../components/WorkerCard';
import { MOCK_SERVICES, MOCK_WORKERS } from '../services/api';
import { calculateDistance } from '../utils/geo';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Mock client location
  const clientLocation = { latitude: -23.5505, longitude: -46.6333 }; 

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };

  const handleBack = () => {
    setSelectedService(null);
  };
  
  const handleSelectWorker = (worker: User) => {
    // In a real app, this would navigate to a booking page
    alert(`Serviço com ${worker.name} solicitado!`);
  };

  return (
    <div className="text-center">
      {!selectedService ? (
        <>
          <div className="py-20 bg-black/50 rounded-lg shadow-2xl" style={{backgroundImage: `url(https://picsum.photos/1200/400?grayscale&blur=2)`}}>
             <div className="bg-black/60 py-10">
                <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight font-montserrat">
                Sua casa, <span className="text-brand-red">resolvida.</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Conectamos você aos melhores profissionais para reparos domésticos. Elétrica, hidráulica, pintura e muito mais, com agilidade e confiança.
                </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold my-12 text-white">O que você precisa hoje?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} onSelect={handleSelectService} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <button onClick={handleBack} className="flex items-center gap-2 mb-8 text-brand-red hover:text-red-400 transition-colors font-semibold">
            <ArrowLeftIcon className="w-5 h-5" />
            Voltar para Serviços
          </button>
          <h2 className="text-3xl font-bold mb-2 text-white">Profissionais de <span className="text-brand-red">{selectedService.name}</span></h2>
          <p className="text-gray-400 mb-8">Encontramos estes profissionais perto de você.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_WORKERS.filter(worker => worker.areas?.includes(selectedService.name)).map(worker => {
              const distance = calculateDistance(clientLocation, { latitude: worker.latitude, longitude: worker.longitude });
              return (
                <WorkerCard key={worker.id} worker={worker} distance={distance} onSelect={handleSelectWorker} />
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
