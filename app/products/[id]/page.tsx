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
  } catch (error) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages product={product} />
        <ProductInfo product={product} />
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
}