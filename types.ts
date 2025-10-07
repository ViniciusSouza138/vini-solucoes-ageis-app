// FIX: Add React import for using React types like ComponentType.
import React from 'react';

// FIX: Removed a circular self-import of 'UserType' that conflicted with its declaration below.
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
}

export interface SpecificService {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  basePrice: number;
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
}

export interface Review {
  id: string;
  author: User;
  target: User;
  rating: number;
  comment: string;
}