import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCategory, SpecificService, User } from '../types';
import WorkerCard from '../components/WorkerCard';
import CategoryCard from '../components/CategoryCard';
import { MOCK_CATEGORIES, getSpecificServicesByCategory, getWorkersByService } from '../services/api';
import { calculateDistance } from '../utils/geo';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

type SelectionStep = 'category' | 'service' | 'worker';

const HomePage: React.FC = () => {
  const [step, setStep] = useState<SelectionStep>('category');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedService, setSelectedService] = useState<SpecificService | null>(null);

  // Filtros
  const [priceRange, setPriceRange] = useState<number>(500);
  const [availabilityDate, setAvailabilityDate] = useState<string>('');
  
  const navigate = useNavigate();
  
  const clientLocation = { latitude: -23.5505, longitude: -46.6333 }; 

  const handleSelectCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setStep('service');
    window.scrollTo(0, 0);
  };
  
  const handleSelectService = (service: SpecificService) => {
    setSelectedService(service);
    setStep('worker');
    window.scrollTo(0, 0);
  };

  const handleSelectWorker = (worker: User, service: SpecificService) => {
    navigate(`/agendar/${worker.id}/${service.id}`);
  };

  const handleBack = (targetStep: SelectionStep) => {
    if (targetStep === 'category') {
        setSelectedCategory(null);
        setSelectedService(null);
    }
    if (targetStep === 'service') {
        setSelectedService(null);
    }
    setStep(targetStep);
  };
  
  const specificServices = selectedCategory ? getSpecificServicesByCategory(selectedCategory.id) : [];
  
  const calculateFinalPrice = (worker: User, service: SpecificService) => {
      const distance = calculateDistance(clientLocation, { latitude: worker.latitude, longitude: worker.longitude });
      const basePrice = service.basePrice;
      const freightRate = 2.50;
      const distanceFee = distance * freightRate;
      const reputationBonus = Math.max(0, worker.reputation - 3.0) * 0.25;
      const reputationModifier = 1 + reputationBonus;
      return (basePrice + distanceFee) * reputationModifier;
  };

  const availableWorkers = useMemo(() => {
    if (!selectedService) return [];
    
    const workers = getWorkersByService(selectedService.name);
    
    return workers.filter(worker => {
        const finalPrice = calculateFinalPrice(worker, selectedService);
        // Lógica de filtro de data (simulada)
        const dateFilterPassed = !availabilityDate || true; // Em um app real, verificaria a agenda do worker
        return finalPrice <= priceRange && dateFilterPassed;
    });
  }, [selectedService, priceRange, availabilityDate]);


  const renderContent = () => {
    switch (step) {
      case 'service':
        return (
            <div>
              <button onClick={() => handleBack('category')} className="flex items-center gap-2 mb-8 text-brand-red hover:text-red-400 transition-colors font-semibold">
                <ArrowLeftIcon className="w-5 h-5" />
                Voltar para Categorias
              </button>
              <h2 className="text-3xl font-bold mb-8 text-white">Qual serviço de <span className="text-brand-red">{selectedCategory?.name}</span> você precisa?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {specificServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleSelectService(service)}
                      className="bg-brand-gray p-6 rounded-lg shadow-lg hover:shadow-brand-red/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <h3 className="text-xl font-bold mb-2 font-montserrat">{service.name}</h3>
                      <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                      <p className="text-brand-red font-bold text-lg">A partir de R$ {service.basePrice.toFixed(2)}</p>
                    </div>
                ))}
              </div>
            </div>
        );
      case 'worker':
        return (
            <div>
              <button onClick={() => handleBack('service')} className="flex items-center gap-2 mb-8 text-brand-red hover:text-red-400 transition-colors font-semibold">
                <ArrowLeftIcon className="w-5 h-5" />
                Voltar para Serviços
              </button>
              <h2 className="text-3xl font-bold mb-2 text-white">Profissionais para <span className="text-brand-red">{selectedService?.name}</span></h2>
              <p className="text-gray-400 mb-8">Encontramos estes profissionais para você.</p>
              
              {/* Filtros */}
              <div className="bg-brand-gray p-4 rounded-lg mb-8 flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Preço Máximo: <span className="font-bold text-brand-red">R$ {priceRange.toFixed(2)}</span></label>
                      <input type="range" id="price" min="50" max="500" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-red" />
                  </div>
                   <div className="flex-1 w-full">
                      <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Disponível a partir de:</label>
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
                  <p className="text-gray-300">Nenhum profissional encontrado com os filtros selecionados.</p>
                </div>
              )}
            </div>
        );
      default: // 'category'
        return (
            <>
              <div 
                className="py-20 rounded-lg shadow-2xl bg-cover bg-center relative overflow-hidden" 
                style={{backgroundImage: `url('https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`}}
              >
                 <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                 <div className="relative z-10 p-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight font-montserrat">
                      Vini Soluções Ágeis
                    </h1>
                    <p className="text-lg text-gray-200 font-medium">
                      a forma mais ágil de solucionar seus problemas. Seu lar, resolvido com agilidade e confiança.
                    </p>
                </div>
              </div>
              
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-white mb-8">O que você precisa hoje?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {MOCK_CATEGORIES.map((category) => (
                    <CategoryCard key={category.id} category={category} onSelect={handleSelectCategory} />
                  ))}
                </div>
              </div>
            </>
        );
    }
  };

  return (
    <div className="text-center">
      {renderContent()}
    </div>
  );
};

export default HomePage;