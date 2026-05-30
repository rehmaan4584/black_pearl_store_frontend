'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getStoredToken } from '@/lib/auth-token';
import { getCart, removeCartItem, updateCartItem } from '@/lib/cart-api';
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
  }

  async function handleRemove(cartItemId: number) {
    const updatedCart = await removeCartItem(cartItemId);
    setCart(updatedCart);
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
      <div className="container mx-auto px-4 py-12">
        <p className="text-teal-100/60">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-black text-white">Your Cart</h1>
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
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-black text-white">Your Cart</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <Card key={item.id} className="glass border-white/5">
              <CardContent className="flex gap-4 p-4">
                <div className="relative size-28 overflow-hidden rounded-xl bg-white/5">
                  {item.variant.imageUrl ? (
                    <Image
                      src={item.variant.imageUrl}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-3">
                  <div>
                    <h2 className="font-bold text-white">{item.product.title}</h2>
                    <p className="text-sm text-teal-100/50">
                      {item.variant.size} / {item.variant.color} / SKU:{' '}
                      {item.variant.sku}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
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
                    <span className="w-8 text-center font-bold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.variant.availableQuantity}
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

                <p className="font-black text-primary">
                  Rs. {item.lineTotal.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass h-fit border-white/5">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl font-black text-white">Summary</h2>
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
              className="h-12 w-full font-bold"
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
