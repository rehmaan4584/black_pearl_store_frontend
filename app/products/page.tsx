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
      (p:any) => p.gender === searchParams.gender
    );
  }
  
  if (searchParams.type) {
    filteredProducts = filteredProducts.filter(
      (p:any) => p.type === searchParams.type
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      
      {/* Filter Bar */}
      <FilterBar />
      
      {/* Products Count */}
      <p className="text-gray-600 mb-6">
        Showing {filteredProducts.length} products
      </p>
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product:any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No products found</p>
        </div>
      )}
    </div>
  );
}