import type { Order } from '@/types';
import { apiRequest } from './api';

export function createOrderFromCart() {
  return apiRequest<Order>('/orders', 'POST');
}
