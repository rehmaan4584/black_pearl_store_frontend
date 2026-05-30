import type { Cart } from '@/types';
import { apiRequest } from './api';

export function getCart() {
  return apiRequest<Cart>('/cart');
}

export function addCartItem(data: {
  productVariantId: number;
  quantity: number;
}) {
  return apiRequest<Cart>('/cart/items', 'POST', data);
}

export function updateCartItem(cartItemId: number, quantity: number) {
  return apiRequest<Cart>(`/cart/items/${cartItemId}`, 'PATCH', { quantity });
}

export function removeCartItem(cartItemId: number) {
  return apiRequest<Cart>(`/cart/items/${cartItemId}`, 'DELETE');
}
