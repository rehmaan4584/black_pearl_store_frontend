'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getStoredToken } from '@/lib/auth-token';
import {
  getCart,
  notifyCartChanged,
  removeCartItem,
  updateCartItem,
} from '@/lib/cart-api';
import { createCheckoutSession } from '@/lib/checkout-api';
import type { Cart } from '@/types';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [message, setMessage] = useState('');

  async function loadCart() {
    try {
      setLoading(true);
      setMessage('');
      const data = await getCart();
      setCart(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load cart');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!getStoredToken()) {
      router.push('/login');
      return;
    }

    loadCart();
  }, [router]);

  async function handleQuantityChange(cartItemId: number, quantity: number) {
    if (quantity < 1) return;
    const updatedCart = await updateCartItem(cartItemId, quantity);
    setCart(updatedCart);
    notifyCartChanged();
  }

  async function handleRemove(cartItemId: number) {
    const updatedCart = await removeCartItem(cartItemId);
    setCart(updatedCart);
    notifyCartChanged();
  }

  async function handleCheckout() {
    try {
      setCheckingOut(true);
      setMessage('');
      const session = await createCheckoutSession();
      if (!session.url) {
        throw new Error('Stripe checkout session URL missing');
      }
      window.location.href = session.url;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not create order');
    } finally {
      setCheckingOut(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="space-y-3">
          <div className="h-8 w-40 animate-pulse rounded-lg bg-white/10" />
          <div className="h-24 animate-pulse rounded-xl bg-white/5" />
          <div className="h-24 animate-pulse rounded-xl bg-white/5" />
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center sm:py-16">
        <h1 className="mb-4 text-3xl font-black text-white sm:text-4xl">Your Cart</h1>
        <p className="mb-8 text-teal-100/60">
          {message || 'Your cart is empty.'}
        </p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 pb-28 sm:py-12 sm:pb-12">
      <h1 className="mb-6 text-3xl font-black text-white sm:mb-8 sm:text-4xl">
        Your Cart
      </h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
        <div className="space-y-3 sm:space-y-4">
          {cart.items.map((item) => (
            <Card key={item.id} className="glass border-white/5">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
                <div className="flex gap-3 sm:gap-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-white/5 sm:size-28">
                    {item.variant.imageUrl ? (
                      <Image
                        src={item.variant.imageUrl}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1 space-y-2 sm:space-y-3">
                    <div>
                      <h2 className="line-clamp-2 font-bold text-white">
                        {item.product.title}
                      </h2>
                      <p className="text-xs text-teal-100/50 sm:text-sm">
                        {item.variant.size} / {item.variant.color}
                      </p>
                      <p className="text-[10px] text-teal-100/30 sm:text-xs">
                        SKU: {item.variant.sku}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        disabled={
                          item.quantity >= item.variant.availableQuantity
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-right text-lg font-black text-primary sm:pt-1">
                  Rs. {item.lineTotal.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass fixed bottom-0 left-0 right-0 z-30 rounded-none border-x-0 border-b-0 shadow-2xl sm:static sm:z-auto sm:rounded-xl sm:border sm:shadow-none lg:h-fit lg:sticky lg:top-24">
          <CardContent className="space-y-3 p-4 sm:space-y-4 sm:p-6">
            <h2 className="text-xl font-black text-white sm:text-2xl">Summary</h2>
            <div className="flex justify-between text-teal-100/70">
              <span>Items</span>
              <span>{cart.totalQuantity}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-white">
              <span>Total</span>
              <span>Rs. {cart.totalAmount.toLocaleString()}</span>
            </div>
            {message && <p className="text-sm text-destructive">{message}</p>}
            <Button
              className="h-11 w-full font-bold sm:h-12"
              onClick={handleCheckout}
              disabled={checkingOut}
            >
              {checkingOut ? 'Redirecting...' : 'Pay with Stripe'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
