
import { Service, User, UserType, Booking, BookingStatus } from '../types';

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Elétrica', category: 'Reparos', description: 'Instalação e reparo de sistemas elétricos.' },
  { id: '2', name: 'Hidráulica', category: 'Reparos', description: 'Conserto de vazamentos e encanamentos.' },
  { id: '3', name: 'Pintura', category: 'Estética', description: 'Pintura de paredes internas e externas.' },
  { id: '4', name: 'Montagem', category: 'Móveis', description: 'Montagem e desmontagem de móveis.' },
  { id: '5', name: 'Jardinagem', category: 'Externo', description: 'Manutenção de jardins e áreas verdes.' },
  { id: '6', name: 'Manutenção Geral', category: 'Reparos', description: 'Pequenos reparos e ajustes diversos.' },
];

export const MOCK_USERS: User[] = [
  // Clients
  { id: 'c1', name: 'Ana Silva', email: 'ana@cliente.com', phone: '11987654321', address: 'Rua das Flores, 123, São Paulo', latitude: -23.5505, longitude: -46.6333, type: UserType.Client, reputation: 4.8 },
  { id: 'c2', name: 'Bruno Costa', email: 'bruno@cliente.com', phone: '21912345678', address: 'Avenida Copacabana, 456, Rio de Janeiro', latitude: -22.9697, longitude: -43.1868, type: UserType.Client, reputation: 4.5 },

  // Workers
  { id: 'w1', name: 'Carlos Pereira', email: 'carlos@worker.com', phone: '11911112222', address: 'Rua Augusta, 789, São Paulo', latitude: -23.556, longitude: -46.642, type: UserType.Worker, reputation: 4.9, areas: ['Elétrica', 'Manutenção Geral'], basePrice: 80 },
  { id: 'w2', name: 'Daniela Lima', email: 'daniela@worker.com', phone: '21933334444', address: 'Rua do Catete, 101, Rio de Janeiro', latitude: -22.925, longitude: -43.178, type: UserType.Worker, reputation: 4.2, areas: ['Pintura'], basePrice: 120 },
  { id: 'w3', name: 'Eduardo Souza', email: 'eduardo@worker.com', phone: '11955556666', address: 'Avenida Paulista, 1500, São Paulo', latitude: -23.561, longitude: -46.656, type: UserType.Worker, reputation: 3.5, areas: ['Hidráulica'], basePrice: 70 },
  { id: 'w4', name: 'Fernanda Alves', email: 'fernanda@worker.com', phone: '11977778888', address: 'Rua Oscar Freire, 200, São Paulo', latitude: -23.559, longitude: -46.668, type: UserType.Worker, reputation: 5.0, areas: ['Montagem', 'Jardinagem', 'Manutenção Geral'], basePrice: 60 },
];

// Fix: Export MOCK_WORKERS by filtering workers from MOCK_USERS.
export const MOCK_WORKERS: User[] = MOCK_USERS.filter(user => user.type === UserType.Worker);

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    client: MOCK_USERS[0],
    worker: MOCK_USERS[2],
    service: MOCK_SERVICES[0],
    date: '25/07/2024',
    time: '14:00',
    distance: 5.2,
    totalValue: 105.50,
    status: BookingStatus.Completed,
  },
  {
    id: 'b2',
    client: MOCK_USERS[0],
    worker: MOCK_USERS[5],
    service: MOCK_SERVICES[3],
    date: '28/07/2024',
    time: '10:00',
    distance: 8.1,
    totalValue: 95.00,
    status: BookingStatus.Accepted,
  },
   {
    id: 'b3',
    client: MOCK_USERS[1],
    worker: MOCK_USERS[3],
    service: MOCK_SERVICES[2],
    date: '30/07/2024',
    time: '09:00',
    distance: 12.5,
    totalValue: 160.75,
    status: BookingStatus.Requested,
  },
];
