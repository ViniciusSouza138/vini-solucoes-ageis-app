
export enum UserType {
  Client = 'CLIENT',
  Worker = 'WORKER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  type: UserType;
  reputation: number;
  areas?: string[];
  basePrice?: number;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
}

export enum BookingStatus {
  Requested = 'SOLICITADO',
  Accepted = 'ACEITO',
  InProgress = 'EM_ANDAMENTO',
  Completed = 'CONCLUIDO',
  Canceled = 'CANCELADO',
}

export interface Booking {
  id: string;
  client: User;
  worker: User;
  service: Service;
  date: string;
  time: string;
  distance: number;
  totalValue: number;
  status: BookingStatus;
  negotiationValue?: number;
}

export interface Review {
  id: string;
  author: User;
  target: User;
  rating: number;
  comment: string;
}
