import { ServiceCategory, SpecificService, User, UserType, Booking, BookingStatus } from '../types';
import { BoltIcon } from '../components/icons/BoltIcon';
import { PaintBrushIcon } from '../components/icons/PaintBrushIcon';
import { WrenchIcon } from '../components/icons/WrenchIcon';
import { WrenchScrewdriverIcon } from '../components/icons/WrenchScrewdriverIcon';


export const MOCK_CATEGORIES: ServiceCategory[] = [
  { id: 'cat1', name: 'Elétrica', icon: BoltIcon },
  { id: 'cat2', name: 'Hidráulica', icon: WrenchIcon },
  { id: 'cat3', name: 'Pintura', icon: PaintBrushIcon },
  { id: 'cat4', name: 'Montagem', icon: WrenchScrewdriverIcon },
  { id: 'cat5', name: 'Jardinagem', icon: WrenchScrewdriverIcon },
  { id: 'cat6', name: 'Manutenção Geral', icon: WrenchScrewdriverIcon },
];

export const MOCK_SPECIFIC_SERVICES: SpecificService[] = [
  // Elétrica
  { id: 's1', categoryId: 'cat1', name: 'Troca de Tomada', description: 'Substituição de tomadas antigas ou com defeito.', basePrice: 50 },
  { id: 's2', categoryId: 'cat1', name: 'Instalação de Luminária', description: 'Instalação de lustres, spots e luminárias.', basePrice: 80 },
  // Hidráulica
  { id: 's3', categoryId: 'cat2', name: 'Reparo de Vazamento', description: 'Localização e conserto de vazamentos.', basePrice: 120 },
  { id: 's4', categoryId: 'cat2', name: 'Troca de Torneira', description: 'Substituição de torneiras de pias e tanques.', basePrice: 60 },
  // Pintura
  { id: 's5', categoryId: 'cat3', name: 'Pintura de Parede', description: 'Pintura de uma ou mais paredes internas.', basePrice: 150 },
  // Montagem
  { id: 's6', categoryId: 'cat4', name: 'Montagem de Móveis', description: 'Montagem de guarda-roupas, estantes, etc.', basePrice: 100 },
  { id: 's7', categoryId: 'cat4', name: 'Montagem de Prateleiras', description: 'Fixação de prateleiras em paredes.', basePrice: 40 },
  // Manutenção Geral
  { id: 's8', categoryId: 'cat6', name: 'Revisão de Encanamento', description: 'Verificação geral do sistema hidráulico.', basePrice: 90 },
];


const MOCK_USERS: User[] = [
  // Clients
  { id: 'c1', name: 'Ana Silva', email: 'ana@cliente.com', phone: '11987654321', address: 'Rua das Flores, 123, São Paulo', latitude: -23.5505, longitude: -46.6333, type: UserType.Client, reputation: 4.8 },
  { id: 'c2', name: 'Bruno Costa', email: 'bruno@cliente.com', phone: '21912345678', address: 'Avenida Copacabana, 456, Rio de Janeiro', latitude: -22.9697, longitude: -43.1868, type: UserType.Client, reputation: 4.5 },

  // Workers
  { id: 'w1', name: 'Carlos Pereira', email: 'carlos@worker.com', phone: '11911112222', address: 'Rua Augusta, 789, São Paulo', latitude: -23.556, longitude: -46.642, type: UserType.Worker, reputation: 4.9, areas: ['Troca de Tomada', 'Instalação de Luminária', 'Revisão de Encanamento'], profilePictureUrl: 'https://i.pravatar.cc/150?img=1' },
  { id: 'w2', name: 'Daniela Lima', email: 'daniela@worker.com', phone: '21933334444', address: 'Rua do Catete, 101, Rio de Janeiro', latitude: -22.925, longitude: -43.178, type: UserType.Worker, reputation: 4.2, areas: ['Pintura de Parede'], profilePictureUrl: 'https://i.pravatar.cc/150?img=2' },
  { id: 'w3', name: 'Eduardo Souza', email: 'eduardo@worker.com', phone: '11955556666', address: 'Avenida Paulista, 1500, São Paulo', latitude: -23.561, longitude: -46.656, type: UserType.Worker, reputation: 3.5, areas: ['Reparo de Vazamento', 'Troca de Torneira', 'Troca de Tomada'], profilePictureUrl: 'https://i.pravatar.cc/150?img=3' },
  { id: 'w4', name: 'Fernanda Alves', email: 'fernanda@worker.com', phone: '11977778888', address: 'Rua Oscar Freire, 200, São Paulo', latitude: -23.559, longitude: -46.668, type: UserType.Worker, reputation: 5.0, areas: ['Montagem de Móveis', 'Montagem de Prateleiras'], profilePictureUrl: 'https://i.pravatar.cc/150?img=4' },
];

const MOCK_BOOKINGS_DATA: Booking[] = [
    { id: 'b1', client: MOCK_USERS[0], worker: MOCK_USERS[2], service: MOCK_SPECIFIC_SERVICES[0], date: '25/07/2024', time: '14:00', distance: 5.2, totalValue: 105.50, status: BookingStatus.Completed },
    { id: 'b2', client: MOCK_USERS[0], worker: MOCK_USERS[5], service: MOCK_SPECIFIC_SERVICES[3], date: '28/07/2024', time: '10:00', distance: 8.1, totalValue: 95.00, status: BookingStatus.Accepted },
    { id: 'b3', client: MOCK_USERS[1], worker: MOCK_USERS[3], service: MOCK_SPECIFIC_SERVICES[2], date: '30/07/2024', time: '09:00', distance: 12.5, totalValue: 160.75, status: BookingStatus.Requested },
];

// --- API Functions ---

export const findUserByEmail = (email: string): User | undefined => {
  return MOCK_USERS.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
};

export const findUserById = (id: string): User | undefined => {
  return MOCK_USERS.find(u => u.id === id);
};

export const findServiceById = (id: string): SpecificService | undefined => {
  return MOCK_SPECIFIC_SERVICES.find(s => s.id === id);
};

export const getSpecificServicesByCategory = (categoryId: string): SpecificService[] => {
    return MOCK_SPECIFIC_SERVICES.filter(s => s.categoryId === categoryId);
}

export const getWorkersByService = (serviceName: string): User[] => {
    return MOCK_USERS.filter(user => user.type === UserType.Worker && user.areas?.includes(serviceName));
}

export const getClientBookings = (clientId: string): Booking[] => {
    return MOCK_BOOKINGS_DATA.filter(b => b.client.id === clientId);
}

export const getWorkerBookings = (workerId: string): Booking[] => {
    return MOCK_BOOKINGS_DATA.filter(b => b.worker.id === workerId);
}

export const findBookingById = (bookingId: string): Booking | undefined => {
    return MOCK_BOOKINGS_DATA.find(b => b.id === bookingId);
}

export const createBooking = (bookingData: Omit<Booking, 'id' | 'status'>): Booking => {
    const newBooking: Booking = {
        ...bookingData,
        id: `b${Date.now()}`, // unique id
        status: BookingStatus.PaymentPending
    };
    MOCK_BOOKINGS_DATA.push(newBooking);
    return newBooking;
}

// Simula a confirmação do pagamento e a atualização do status
export const confirmPayment = (bookingId: string): Booking | undefined => {
    const booking = findBookingById(bookingId);
    if (booking) {
        booking.status = BookingStatus.Accepted;
        return booking;
    }
    return undefined;
}