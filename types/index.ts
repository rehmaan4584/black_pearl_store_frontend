export interface Product {
  id: number;
  title: string;
  description: string;
  type: 'JEANS' | 'SHORTS' | 'SHIRTS' | 'KNICKERS';
  gender: 'MEN' | 'WOMEN' | 'UNISEX';
  brand: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  productId: number;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: 'BLACK' | 'BLUE' | 'DARK_BLUE' | 'LIGHT_BLUE';
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