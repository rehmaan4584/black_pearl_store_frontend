// app/page.tsx (SSR)
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 8); // First 8 products

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20 from-blue-50 to-blue-100 rounded-lg mb-12">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Black Pearl
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Premium Fashion for Men & Women
        </p>
        <Link href="/products">
          <Button size="lg">Shop Now</Button>
        </Link>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['JEANS', 'SHORTS', 'SHIRTS', 'KNICKERS'].map(type => (
            <Link key={type} href={`/products?type=${type}`}>
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                <span className="text-2xl font-semibold">{type}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featuredProducts.map((product:any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}