// components/ProductCard.tsx (SSR)
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import type { Product } from '@/types';

export function ProductCard({ product }: { product: Product }) {
  // Get primary image from first variant
  const primaryImage = product.variants[0]?.images.find(img => img.isPrimary) 
    || product.variants[0]?.images[0];
  
  const minPrice = Math.min(...product.variants.map(v => v.price));

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-64 w-full">
          <Image
            src={primaryImage?.url || '/placeholder.png'}
            alt={product.title}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-2 right-2">
            {product.gender}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{product.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          <p className="text-xl font-bold mt-2">
            Rs. {minPrice.toLocaleString()}
          </p>
          <div className="flex gap-2 mt-2">
            {product.variants.slice(0, 4).map(v => (
              <div
                key={v.id}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: v.color.toLowerCase() }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}