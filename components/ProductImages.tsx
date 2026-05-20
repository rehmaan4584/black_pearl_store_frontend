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
    <div className="space-y-6">
      {/* Main Image Container */}
      <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden glass shadow-2xl border-white/5">
        <Image
          src={selectedImage?.url || '/placeholder.png'}
          alt={product.title}
          fill
          className="object-cover transition-all duration-700 ease-in-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
        {allImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`relative flex-shrink-0 size-24 rounded-2xl overflow-hidden glass transition-all duration-300 border-2 ${
              selectedImage?.id === image.id 
                ? 'border-primary cyan-glow scale-105' 
                : 'border-white/5 hover:border-white/20'
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