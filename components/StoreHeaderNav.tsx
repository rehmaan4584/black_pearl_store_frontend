'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { href: '/products?gender=MEN', label: 'Men' },
  { href: '/products?gender=WOMEN', label: 'Women' },
  { href: '/products?type=JEANS', label: 'Jeans' },
  { href: '/products?type=SHIRTS', label: 'Shirts' },
];

export function StoreHeaderNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-6 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-semibold text-teal-100/80 transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed left-0 right-0 top-[60px] z-50 flex flex-col gap-1 border-b border-white/10 bg-background/95 p-4 backdrop-blur-xl lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-white/5 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              All Products
            </Link>
          </nav>
        </>
      )}
    </>
  );
}
