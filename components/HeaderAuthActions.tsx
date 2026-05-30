'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  clearStoredToken,
  hasStoredToken,
  subscribeToAuthChanges,
} from '@/lib/auth-token';

export function HeaderAuthActions() {
  const router = useRouter();
  const isLoggedIn = useSyncExternalStore(
    subscribeToAuthChanges,
    hasStoredToken,
    () => false,
  );

  function handleLogout() {
    clearStoredToken();
    router.refresh();
  }

  return (
    <div className="flex gap-4">
      <Button variant="ghost" asChild>
        <Link href="/cart">Cart</Link>
      </Button>
      {isLoggedIn ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
