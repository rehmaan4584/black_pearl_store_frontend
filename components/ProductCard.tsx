// components/ProductCard.tsx (SSR)
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import type { Product } from '@/types';

function getSwatchColor(color: string, colorHex?: string | null) {
  return colorHex || color.toLowerCase().replace(/_/g, '');
}

export function ProductCard({ product }: { product: Product }) {
  // Get primary image from first variant
  const primaryImage = product.variants[0]?.images.find(img => img.isPrimary) 
    || product.variants[0]?.images[0];
  
  const minPrice = Math.min(...product.variants.map(v => v.price));

  return (
    <Link href={`/products/${product.id}`} className="group h-full">
      <Card className="glass border-white/5 overflow-hidden transition-all duration-300 hover:scale-[1.02] cyan-glow-hover h-full flex flex-col">
        <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-56 md:h-72">
          <Image
            src={primaryImage?.url || '/placeholder.png'}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-3 right-3 glass border-white/10 uppercase tracking-widest text-[10px] font-bold">
            {product.gender}
          </Badge>
        </div>
        
        <CardContent className="flex flex-1 flex-col justify-between gap-3 p-3 sm:gap-4 sm:p-5">
          <div className="space-y-1 sm:space-y-2">
            <h3 className="line-clamp-1 text-base font-bold tracking-tight text-white transition-colors group-hover:text-primary sm:text-xl">
              {product.title}
            </h3>
            <p className="line-clamp-2 min-h-0 text-xs font-medium leading-relaxed text-teal-100/50 sm:min-h-[40px] sm:text-sm">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-black text-white sm:text-2xl">
              Rs. {minPrice.toLocaleString()}
            </p>
            <div className="flex gap-2">
              {product.variants.slice(0, 4).map(v => (
                <div
                  key={v.id}
                  className="w-5 h-5 rounded-full border border-white/10 shadow-inner"
                  style={{ backgroundColor: getSwatchColor(v.color, v.colorHex) }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}