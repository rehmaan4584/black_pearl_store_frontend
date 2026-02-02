// lib/api.ts

import { dummyProducts } from './dummyData';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const USE_DUMMY_DATA = true; // Change to false when backend ready

export async function getProducts() {
  if (USE_DUMMY_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return dummyProducts;
  }
  
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProduct(id: string) {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = dummyProducts.find(p => p.id === parseInt(id));
    if (!product) throw new Error('Product not found');
    return product;
  }
  
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}