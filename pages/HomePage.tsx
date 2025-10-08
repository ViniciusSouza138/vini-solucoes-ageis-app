import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpecificService, User } from '../types';
import WorkerCard from '../components/WorkerCard';
import CategoryCard from '../components/CategoryCard'; // Updated component
import { MOCK_CATEGORIES, getSpecificServicesByCategory, getWorkersByService } from '../services/api';
import { calculateDistance } from '../utils/geo';
import { calculateFinalPriceRange } from '../utils/pricing';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { MapPinIcon } from '../components/icons/MapPinIcon';

const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<SpecificService | null>(null);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  // Filters
  const [priceRange, setPriceRange] = useState<number>(500);
  const [distanceFilter, setDistanceFilter] = useState<number>(50); // New distance filter
  const [availabilityDate, setAvailabilityDate] = useState<string>('');
  
  const navigate = useNavigate();
  
  const clientLocation = { latitude: -23.5505, longitude: -46.6333 }; 

  const handleCategoryToggle = (categoryId: string) => {
    setOpenCategoryId(prevId => (prevId === categoryId ? null : categoryId));
  };
  
  const handleSelectService = (service: SpecificService) => {
    setSelectedService(service);
    window.scrollTo(0, 0);
  };

  const handleSelectWorker = (worker: User, service: SpecificService) => {
    navigate(`/agendar/${worker.id}/${service.id}`);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
  };
  
  const getAverageFinalPrice = (worker: User, service: SpecificService) => {
      const distance = calculateDistance(clientLocation, { latitude: worker.latitude, longitude: worker.longitude });
      const { minFinalPrice, maxFinalPrice } = calculateFinalPriceRange(service, worker, distance);
      return (minFinalPrice + maxFinalPrice) / 2;
  };

  const availableWorkers = useMemo(() => {
    if (!selectedService) return [];
    
    const workers = getWorkersByService(selectedService.name);
    
    return workers.filter(worker => {
        const distance = calculateDistance(clientLocation, { latitude: worker.latitude, longitude: worker.longitude });
        if (distance > distanceFilter) return false;

        const averageFinalPrice = getAverageFinalPrice(worker, selectedService);
        if (averageFinalPrice > priceRange) return false;

        // Dummy date filter logic for demonstration
        const dateFilterPassed = !availabilityDate || true; 
        return dateFilterPassed;
    });
  }, [selectedService, priceRange, distanceFilter, availabilityDate]);


  const renderContent = () => {
    if (selectedService) {
        // Worker Selection View
        return (
            <div>
              <button onClick={handleBackToServices} className="flex items-center gap-2 mb-8 text-brand-red hover:text-red-400 transition-colors font-semibold">
                <ArrowLeftIcon className="w-5 h-5" />
                Voltar para Serviços
              </button>
              <h2 className="text-3xl font-bold mb-2 text-white">Profissionais para <span className="text-brand-red">{selectedService?.name}</span></h2>
              <p className="text-gray-400 mb-8">Encontramos estes profissionais para você.</p>
              
              {/* Filters */}
              <div className="bg-brand-gray p-4 rounded-lg mb-8 flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 w-full">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">Preço Máximo: <span className="font-bold text-brand-red">R$ {priceRange.toFixed(0)}</span></label>
                      <input type="range" id="price" min="50" max="800" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-red" />
                  </div>
                  <div className="flex-1 w-full">
                      <label htmlFor="distance" className="block text-sm font-medium text-gray-300 mb-2">Distância Máxima: <span className="font-bold text-brand-red">{distanceFilter} km</span></label>
                      <input type="range" id="distance" min="1" max="100" value={distanceFilter} onChange={(e) => setDistanceFilter(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-red" />
                  </div>
                   <div className="flex-1 w-full">
                      <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Disponível a partir de:</label>
                      <input type="date" id="date" value={availabilityDate} onChange={(e) => setAvailabilityDate(e.target.value)} className="w-full bg-brand-light-gray border border-gray-600 rounded-md py-1.5 px-3 text-white"/>
                  </div>
              </div>

              {availableWorkers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {availableWorkers.map(worker => {
                    const distance = calculateDistance(clientLocation, { latitude: worker.latitude, longitude: worker.longitude });
                    return (
                      <WorkerCard 
                        key={worker.id} 
                        worker={worker} 
                        distance={distance} 
                        onSelect={() => handleSelectWorker(worker, selectedService!)}
                        selectedService={selectedService!} 
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="bg-brand-gray p-10 rounded-lg text-center">
                   <MapPinIcon className="w-12 h-12 text-brand-red mx-auto mb-4"/>
                  <p className="text-lg text-white font-semibold">Nenhum profissional encontrado</p>
                  <p className="text-gray-400">Tente ajustar os filtros de preço ou distância.</p>
                </div>
              )}
            </div>
        );
    } else {
        // Category and Service Selection View
        return (
            <>
              <div 
                className="py-20 rounded-lg shadow-2xl text-center relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1455165814004-1126a7199f9b?q=80&w=2070&auto=format&fit=crop')" }}
              >
                <div className="absolute inset-0 bg-black/70 z-0"></div>
                 <div className="relative z-10 p-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight font-montserrat">
                      Vini Soluções Ágeis — a forma mais ágil de solucionar seus problemas.
                    </h1>
                    <p className="text-lg text-gray-300 font-medium">
                       Seu lar, resolvido com agilidade e confiança. Encontre o profissional ideal para qualquer reparo.
                    </p>
                </div>
              </div>
              
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">O que você precisa hoje?</h2>
                <div className="max-w-4xl mx-auto space-y-4">
                  {MOCK_CATEGORIES.map((category) => (
                    <CategoryCard 
                      key={category.id} 
                      category={category} 
                      services={getSpecificServicesByCategory(category.id)}
                      isOpen={openCategoryId === category.id}
                      onToggle={() => handleCategoryToggle(category.id)}
                      onServiceSelect={handleSelectService}
                    />
                  ))}
                </div>
              </div>
            </>
        );
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default HomePage;