'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import {
  clearStoredToken,
  hasStoredToken,
  subscribeToAuthChanges,
} from '@/lib/auth-token';
import { getCurrentUser } from '@/lib/auth-api';
import { getCart, subscribeToCartChanges } from '@/lib/cart-api';

function getAvatarLabel(email: string) {
  const firstPart = email.split('@')[0] || 'user';
  return firstPart.slice(0, 2).toUpperCase();
}

export function HeaderAuthActions() {
  const router = useRouter();
  const isLoggedIn = useSyncExternalStore(
    subscribeToAuthChanges,
    hasStoredToken,
    () => false,
  );
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadHeaderState() {
      if (!isLoggedIn) {
        setCartCount(0);
        setEmail('');
        return;
      }

      try {
        const [user, cart] = await Promise.all([getCurrentUser(), getCart()]);
        if (cancelled) return;
        setEmail(user.email);
        setCartCount(cart.totalQuantity);
      } catch {
        if (cancelled) return;
        setCartCount(0);
      }
    }

    loadHeaderState();
    const unsubscribe = subscribeToCartChanges(loadHeaderState);

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [isLoggedIn]);

  function handleLogout() {
    clearStoredToken();
    setCartCount(0);
    setEmail('');
    router.refresh();
  }

  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
      <Button variant="ghost" size="icon" asChild className="relative sm:size-auto sm:px-3">
        <Link href="/cart" aria-label={`Cart with ${cartCount} items`}>
          <ShoppingBag className="size-4" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-black">
              {cartCount}
            </span>
          )}
        </Link>
      </Button>
      {isLoggedIn ? (
        <>
          <div
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-primary/15 text-xs font-black text-primary sm:size-10"
            title={email}
            aria-label={email ? `Logged in as ${email}` : 'Logged in user'}
          >
            {email ? getAvatarLabel(email) : 'BP'}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={handleLogout}
            aria-label="Sign out"
          >
            <LogOut className="size-4" />
          </Button>
          <Button onClick={handleLogout} className="hidden sm:inline-flex">
            Logout
          </Button>
        </>
      ) : (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
