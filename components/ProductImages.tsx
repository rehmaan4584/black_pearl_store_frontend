// components/ProductImages.tsx (CSR - image gallery)
'use client'

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/types';

export function ProductImages({ product }: { product: Product }) {
  // Get all images from all variants
  const allImages = product.variants.flatMap(v => v.images);
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  return (
    <div>
      {/* Main Image */}
      <div className="relative w-full mb-4 rounded-lg overflow-hidden">
        <Image
          src={selectedImage?.url || '/placeholder.png'}
          alt={product.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {allImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`relative h-24 rounded-lg overflow-hidden border-2 ${
              selectedImage?.id === image.id 
                ? 'border-black' 
                : 'border-gray-200'
            }`}
          >
            <Image
              src={image.url}
              alt={`${product.title} ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}