'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cancelCheckoutOrder } from '@/lib/checkout-api';

export function CheckoutCancelClient({ orderId }: { orderId?: string }) {
  const [message, setMessage] = useState('Restoring reserved inventory...');

  useEffect(() => {
    async function cancelOrder() {
      if (!orderId) {
        setMessage('Checkout was cancelled.');
        return;
      }

      try {
        await cancelCheckoutOrder(Number(orderId));
        setMessage('Checkout cancelled. Reserved inventory has been restored.');
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : 'Checkout cancelled, but inventory restore failed.',
        );
      }
    }

    cancelOrder();
  }, [orderId]);

  return (
    <Card className="glass mx-auto w-full max-w-xl border-white/5">
      <CardContent className="space-y-5 p-6 text-center sm:space-y-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-destructive sm:text-sm">
          Checkout Cancelled
        </p>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Payment Not Completed
        </h1>
        <p className="text-sm text-teal-100/60 sm:text-base">{message}</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/cart">Back to Cart</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
