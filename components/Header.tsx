// components/Header.tsx (SSR)
import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Black Pearl
        </Link>
        
        <nav className="flex gap-6">
          <Link href="/products?gender=MEN">Men</Link>
          <Link href="/products?gender=WOMEN">Women</Link>
          <Link href="/products?type=JEANS">Jeans</Link>
          <Link href="/products?type=SHIRTS">Shirts</Link>
        </nav>
        
        <div className="flex gap-4">
          <Button variant="ghost">Cart (0)</Button>
          <Button>Login</Button>
        </div>
      </div>
    </header>
  );
}