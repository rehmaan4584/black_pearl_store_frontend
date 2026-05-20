import Link from 'next/link';
import { Button } from './ui/button';
import { BlackPearlLogo } from './BlackPearlLogo';

export function Header() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <BlackPearlLogo size="md" subtext="store" />
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