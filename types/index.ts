export interface Product {
  id: number;
  title: string;
  description: string;
  type: string;
  gender: string;
  brand: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  productId: number;
  size: string;
  color: string;
  colorName?: string;
  colorHex?: string | null;
  sku: string;
  price: number;
  images: ProductVariantImage[];
  inventory?: {
    quantity: number;
  };
}

export interface ProductVariantImage {
  id: number;
  url: string;
  publicId: string;
  isPrimary: boolean;
}