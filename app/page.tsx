// app/page.tsx (SSR)
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 8); // First 8 products

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Hero Section */}
      <section className="relative mb-10 overflow-hidden rounded-2xl border-white/5 glass py-12 text-center sm:mb-16 sm:rounded-3xl sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent pointer-events-none" />
        <h1 className="relative z-10 mb-4 px-2 text-3xl font-extrabold tracking-tight text-white sm:mb-6 sm:text-5xl lg:text-6xl">
          Welcome to Black Pearl
        </h1>
        <p className="relative z-10 mx-auto mb-8 max-w-2xl px-4 text-base text-teal-100/60 sm:mb-10 sm:text-xl lg:text-2xl">
          Premium Fashion for Men & Women
        </p>
        <Link href="/products" className="relative z-10">
          <Button size="lg" className="cyan-glow h-12 px-8 text-base font-bold sm:h-14 sm:px-10 sm:text-lg">
            Shop Now
          </Button>
        </Link>
      </section>

      {/* Categories */}
      <section className="mb-10 sm:mb-12">
        <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
          {['JEANS', 'SHORTS', 'SHIRTS', 'KNICKERS'].map(type => (
            <Link key={type} href={`/products?type=${type}`}>
              <div className="flex h-28 items-center justify-center rounded-2xl glass transition-all duration-300 cyan-glow-hover group hover:bg-white/5 sm:h-40">
                <span className="text-sm font-bold tracking-widest text-white transition-colors group-hover:text-primary sm:text-xl">{type}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">Featured Products</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}