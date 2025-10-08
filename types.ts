import React from 'react';

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
  areas?: string[]; // Nomes dos serviços específicos
  profilePictureUrl?: string; 
  priceMargin?: number; // e.g., 1.05 for a 5% increase
}

export interface SpecificService {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  estimatedTime: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}


export enum BookingStatus {
  Requested = 'SOLICITADO',
  Accepted = 'ACEITO',
  InProgress = 'EM ANDAMENTO',
  Completed = 'CONCLUÍDO',
  Canceled = 'CANCELADO',
  PaymentPending = 'PAGAMENTO PENDENTE',
}

export interface Booking {
  id: string;
  client: User;
  worker: User;
  service: SpecificService;
  date: string;
  time: string;
  distance: number;
  totalValue: number;
  status: BookingStatus;
  negotiationValue?: number;
  paymentMethod?: 'pix' | 'card' | 'cash';
}

export interface Review {
  id: string;
  author: User;
  target: User;
  rating: number;
  comment: string;
}
