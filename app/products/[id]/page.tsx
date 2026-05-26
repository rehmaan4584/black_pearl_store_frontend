// app/products/[id]/page.tsx
import { getProduct } from '@/lib/api';
import { ProductImages } from '@/components/ProductImages';
import { ProductInfo } from '@/components/ProductInfo';
import { notFound } from 'next/navigation';

// Add this interface
interface PageProps {
  params: Promise<{ id: string }>; // Changed: params is now a Promise
}

export default async function ProductDetailPage({ params }: PageProps) {
  // Await params
  const { id } = await params;
  
  let product;
  
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left: Images */}
        <div className="w-full lg:w-3/5 sticky top-24">
          <ProductImages product={product} />
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-2/5 glass p-8 rounded-3xl border-white/5 space-y-8">
          <ProductInfo product={product} />
          
          <div className="pt-8 border-t border-white/5">
            <h2 className="text-xl font-bold mb-4 text-white uppercase tracking-widest text-xs">Description</h2>
            <p className="text-teal-100/60 leading-relaxed text-lg font-medium">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}