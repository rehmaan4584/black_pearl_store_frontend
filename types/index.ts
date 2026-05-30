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

export interface CartItem {
  id: number;
  productVariantId: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  product: {
    id: number;
    title: string;
    brand: string;
  };
  variant: {
    id: number;
    sku: string;
    size: string;
    color: string;
    colorHex: string;
    availableQuantity: number;
    imageUrl: string | null;
  };
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

export interface Order {
  id: number;
  status: string;
  totalAmount: number;
  items: {
    id: number;
    productVariantId: number;
    quantity: number;
    price: number;
    lineTotal: number;
    product: {
      id: number;
      title: string;
    };
    variant: {
      size: string;
      color: string;
    };
  }[];
}