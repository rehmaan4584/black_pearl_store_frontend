// components/ProductInfo.tsx (CSR - has state)
'use client'

import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Product } from '@/types';

export function ProductInfo({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    console.log('Add to cart:', {
      variant: selectedVariant,
      quantity
    });
    // TODO: Implement cart logic
    alert(`Added ${quantity} item(s) to cart!`);
  };

  return (
    <div>
      {/* Product Title */}
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      
      {/* Brand & Gender */}
      <div className="flex gap-2 mb-4">
        <Badge>{product.brand}</Badge>
        <Badge variant="outline">{product.gender}</Badge>
      </div>
      
      {/* Price */}
      <p className="text-3xl font-bold text-blue-600 mb-6">
        Rs. {selectedVariant.price.toLocaleString()}
      </p>
      
      {/* Size Selection */}
      <div className="mb-6">
        <label className="font-semibold mb-2 block">Size</label>
        <div className="flex gap-2">
          {sizes.map(size => (
            <Button
              key={size}
              variant={selectedVariant.size === size ? 'default' : 'outline'}
              onClick={() => handleSizeChange(size)}
              className="w-16"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Color Selection */}
      <div className="mb-6">
        <label className="font-semibold mb-2 block">Color</label>
        <div className="flex gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-10 h-10 rounded-full border-2 ${
                selectedVariant.color === color 
                  ? 'border-black' 
                  : 'border-gray-300'
              }`}
              style={{ 
                backgroundColor: color.toLowerCase().replace('_', '') 
              }}
              title={color}
            />
          ))}
        </div>
      </div>
      
      {/* Quantity */}
      <div className="mb-6">
        <label className="font-semibold mb-2 block">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <Button
            variant="outline"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= (selectedVariant.inventory?.quantity || 0)}
          >
            +
          </Button>
        </div>
      </div>
      
      {/* Stock Status */}
      <p className="text-sm text-gray-600 mb-6">
        {selectedVariant.inventory && selectedVariant.inventory.quantity > 0 ? (
          <span className="text-green-600">
            ✓ In Stock ({selectedVariant.inventory.quantity} available)
          </span>
        ) : (
          <span className="text-red-600">✗ Out of Stock</span>
        )}
      </p>
      
      {/* Add to Cart Button */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleAddToCart}
        disabled={!selectedVariant.inventory || selectedVariant.inventory.quantity === 0}
      >
        Add to Cart
      </Button>
      
      {/* SKU */}
      <p className="text-sm text-gray-500 mt-4">
        SKU: {selectedVariant.sku}
      </p>
    </div>
  );
}