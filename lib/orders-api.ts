import type { OrderDetail, OrderListItem } from '@/types/order.types';
import { apiRequest } from './api';

export function fetchMyOrders() {
  return apiRequest<OrderListItem[]>('/orders/my', 'GET');
}

export function fetchMyOrderById(orderId: number) {
  return apiRequest<OrderDetail>(`/orders/my/${orderId}`, 'GET');
}
