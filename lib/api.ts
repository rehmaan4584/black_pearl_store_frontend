// lib/api.ts

import type { Product } from '@/types';
import { clearStoredToken, getStoredToken } from './auth-token';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

function buildApiUrl(path: string) {
  return `${API_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(buildApiUrl('/products'), {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(buildApiUrl(`/products/${id}`), {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

async function readErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const errorData = await res.json();
    if (typeof errorData?.message === 'string') return errorData.message;
    if (Array.isArray(errorData?.message)) return errorData.message.join(', ');
  } catch {
    /* non-JSON error body */
  }
  return fallback;
}

export async function apiRequest<T>(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown,
): Promise<T> {
  const token = getStoredToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(buildApiUrl(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    if (res.status === 401) {
      clearStoredToken();
    }
    throw new Error(await readErrorMessage(res, 'API request failed'));
  }

  return res.json();
}