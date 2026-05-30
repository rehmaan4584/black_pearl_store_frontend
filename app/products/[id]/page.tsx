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
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-12">
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
        {/* Left: Images */}
        <div className="w-full lg:sticky lg:top-24 lg:w-3/5">
          <ProductImages product={product} />
        </div>

        {/* Right: Info */}
        <div className="w-full space-y-6 rounded-2xl border-white/5 glass p-5 sm:space-y-8 sm:rounded-3xl sm:p-8 lg:w-2/5">
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