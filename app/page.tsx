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
      <section className="text-center py-24 glass rounded-3xl mb-16 relative overflow-hidden border-white/5">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent pointer-events-none" />
        <h1 className="text-6xl font-extrabold mb-6 text-white tracking-tight relative z-10">
          Welcome to Black Pearl
        </h1>
        <p className="text-2xl text-teal-100/60 mb-10 max-w-2xl mx-auto relative z-10">
          Premium Fashion for Men & Women
        </p>
        <Link href="/products" className="relative z-10">
          <Button size="lg" className="cyan-glow font-bold h-14 px-10 text-lg">Shop Now</Button>
        </Link>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['JEANS', 'SHORTS', 'SHIRTS', 'KNICKERS'].map(type => (
            <Link key={type} href={`/products?type=${type}`}>
              <div className="h-40 glass rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all duration-300 cyan-glow-hover group">
                <span className="text-xl font-bold tracking-widest text-white group-hover:text-primary transition-colors">{type}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}