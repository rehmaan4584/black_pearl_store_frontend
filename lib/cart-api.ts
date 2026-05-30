import type { Cart } from '@/types';
import { apiRequest } from './api';

const CART_CHANGE_EVENT = 'buyer-cart-change';

export function notifyCartChanged() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function subscribeToCartChanges(callback: () => void) {
  if (typeof window === 'undefined') return () => undefined;
  window.addEventListener(CART_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener(CART_CHANGE_EVENT, callback);
  };
}

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
