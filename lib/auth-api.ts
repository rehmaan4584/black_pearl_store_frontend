import { apiRequest } from './api';

type AuthResponse = {
  token: string;
};

type UserResponse = {
  id: number;
  name: string | null;
  email: string;
  role: string;
};

type CurrentUserResponse = {
  userId: number;
  email: string;
  role: string;
};

export function loginBuyer(data: { email: string; password: string }) {
  return apiRequest<AuthResponse>('/auth/login', 'POST', data);
}

export function registerBuyer(data: {
  name: string;
  email: string;
  password: string;
}) {
  return apiRequest<UserResponse>('/auth/register', 'POST', data);
}

export function getCurrentUser() {
  return apiRequest<CurrentUserResponse>('/auth/me');
}
