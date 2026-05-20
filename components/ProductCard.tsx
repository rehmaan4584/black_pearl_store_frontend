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
    <Link href={`/products/${product.id}`} className="group h-full">
      <Card className="glass border-white/5 overflow-hidden transition-all duration-300 hover:scale-[1.02] cyan-glow-hover h-full flex flex-col">
        <div className="relative h-72 w-full shrink-0 overflow-hidden">
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
        
        <CardContent className="p-5 flex flex-col flex-1 justify-between gap-4">
          <div className="space-y-2">
            <h3 className="font-bold text-xl text-white tracking-tight group-hover:text-primary transition-colors line-clamp-1">{product.title}</h3>
            <p className="text-sm text-teal-100/50 line-clamp-2 font-medium leading-relaxed min-h-[40px]">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-2xl font-black text-white">
              Rs. {minPrice.toLocaleString()}
            </p>
            <div className="flex gap-2">
              {product.variants.slice(0, 4).map(v => (
                <div
                  key={v.id}
                  className="w-5 h-5 rounded-full border border-white/10 shadow-inner"
                  style={{ backgroundColor: v.color.toLowerCase() }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}