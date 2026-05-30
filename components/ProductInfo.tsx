// components/ProductInfo.tsx (CSR - has state)
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Product } from '@/types';
import { addCartItem } from '@/lib/cart-api';
import { getStoredToken } from '@/lib/auth-token';

function getSwatchColor(color: string, colorHex?: string | null) {
  return colorHex || color.toLowerCase().replace(/_/g, '');
}

export function ProductInfo({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Get unique sizes and colors
  const sizes = [...new Set(product.variants.map(v => v.size))];
  const colors = [...new Set(product.variants.map(v => v.color))];

  const handleSizeChange = (size: string) => {
    const variant = product.variants.find(
      v => v.size === size && v.color === selectedVariant.color
    ) || product.variants.find(v => v.size === size);
    
    if (variant) setSelectedVariant(variant);
  };

  const handleColorChange = (color: string) => {
    const variant = product.variants.find(
      v => v.color === color && v.size === selectedVariant.size
    ) || product.variants.find(v => v.color === color);
    
    if (variant) setSelectedVariant(variant);
  };

  const handleAddToCart = async () => {
    if (!getStoredToken()) {
      router.push('/login');
      return;
    }

    try {
      setIsAdding(true);
      setMessage('');
      await addCartItem({
        productVariantId: selectedVariant.id,
        quantity,
      });
      setMessage('Added to cart successfully.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        {/* Brand & Gender */}
        <div className="flex gap-2 mb-4">
          <Badge className="glass border-white/10 text-teal-100/70 font-bold uppercase tracking-widest text-[10px]">
            {product.brand}
          </Badge>
          <Badge className="glass border-white/10 text-primary font-bold uppercase tracking-widest text-[10px]">
            {product.gender}
          </Badge>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-2 uppercase">{product.title}</h1>
        
        {/* Price */}
        <div className="flex items-baseline gap-4 mt-6">
          <p className="text-4xl font-black text-primary cyan-glow-text">
            Rs. {selectedVariant.price.toLocaleString()}
          </p>
        </div>
      </div>
      
      {/* Size Selection */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <label className="text-xs font-black uppercase tracking-widest text-teal-100/40">Select Size</label>
        <div className="flex flex-wrap gap-3">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`h-12 w-16 rounded-xl border-2 transition-all duration-300 font-bold text-sm ${
                selectedVariant.size === size 
                  ? 'bg-primary text-black border-primary cyan-glow scale-110' 
                  : 'glass border-white/5 text-white/70 hover:border-white/20'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      {/* Color Selection */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <label className="text-xs font-black uppercase tracking-widest text-teal-100/40">Select Color</label>
        <div className="flex flex-wrap gap-4">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`group relative size-8 rounded-full transition-all duration-300 ring-1 ring-offset-2 ring-offset-transparent ${
                selectedVariant.color === color 
                  ? 'ring-primary scale-110' 
                  : 'ring-transparent hover:ring-white/20'
              }`}
              style={{
                backgroundColor: getSwatchColor(
                  color,
                  product.variants.find((variant) => variant.color === color)?.colorHex
                ),
              }}
              title={color}
            >
              <span className={`absolute inset-0 rounded-full border-2 border-white/20 pointer-events-none group-hover:scale-110 transition-transform`} />
            </button>
          ))}
        </div>
      </div>
      
      {/* Quantity & Inventory */}
      <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-white/5">
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-teal-100/40">Quantity</label>
          <div className="flex items-center glass rounded-xl border-white/5 p-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-10 rounded-lg hover:bg-white/5 text-white"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-12 text-center font-bold text-white">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-10 rounded-lg hover:bg-white/5 text-white"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= (selectedVariant.inventory?.quantity || 0)}
            >
              +
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {selectedVariant.inventory && selectedVariant.inventory.quantity > 0 ? (
              <>
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-emerald-500">In Stock</span>
              </>
            ) : (
              <>
                <span className="size-2 rounded-full bg-red-500" />
                <span className="text-sm font-bold text-red-500">Out of Stock</span>
              </>
            )}
          </div>
          <p className="text-xs text-teal-100/30 uppercase tracking-widest font-semibold">
            {selectedVariant.inventory?.quantity || 0} items remaining
          </p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="pt-6 space-y-4">
        <Button
          size="lg"
          className="w-full h-16 text-lg font-black uppercase tracking-widest cyan-glow hover:scale-[1.01] transition-transform"
          onClick={handleAddToCart}
          disabled={
            isAdding ||
            !selectedVariant.inventory ||
            selectedVariant.inventory.quantity === 0
          }
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
        {message && (
          <p className="text-center text-sm font-semibold text-teal-100/70">
            {message}
          </p>
        )}
        <p className="text-center text-[10px] text-teal-100/20 font-bold uppercase tracking-[0.2em]">
          SKU: {selectedVariant.sku} • Secure Futuristic Checkout
        </p>
      </div>
    </div>
  );
}