import { apiRequest } from './api';

type CheckoutSessionResponse = {
  orderId: number;
  sessionId: string;
  url: string | null;
};

export function createCheckoutSession() {
  return apiRequest<CheckoutSessionResponse>('/checkout/session', 'POST');
}

export function cancelCheckoutOrder(orderId: number) {
  return apiRequest('/checkout/cancel', 'POST', { orderId });
}
