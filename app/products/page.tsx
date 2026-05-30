// app/products/page.tsx (SSR)
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { FilterBar } from '@/components/FilterBar';

interface SearchParams {
  gender?: string;
  type?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products = await getProducts();
  
  // Filter products based on search params
  let filteredProducts = products;
  
  if (searchParams.gender) {
    filteredProducts = filteredProducts.filter(
      (product) => product.gender === searchParams.gender
    );
  }
  
  if (searchParams.type) {
    filteredProducts = filteredProducts.filter(
      (product) => product.type === searchParams.type
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="mb-6 text-3xl font-bold sm:mb-8 sm:text-4xl">Our Products</h1>
      
      {/* Filter Bar */}
      <FilterBar />
      
      {/* Products Count */}
      <p className="text-teal-100/60 mb-6 font-medium">
        Showing {filteredProducts.length} products
      </p>
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/5 py-16 text-center glass sm:py-20">
          <p className="text-lg font-semibold text-teal-100/60 sm:text-xl">
            No products found
          </p>
          <p className="mt-2 text-sm text-teal-100/40">
            Try changing filters or check back later.
          </p>
        </div>
      )}
    </div>
  );
}