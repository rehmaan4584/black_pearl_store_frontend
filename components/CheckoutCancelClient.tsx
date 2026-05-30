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
    <Card className="glass mx-auto max-w-xl border-white/5">
      <CardContent className="space-y-6 p-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-destructive">
          Checkout Cancelled
        </p>
        <h1 className="text-4xl font-black text-white">Payment Not Completed</h1>
        <p className="text-teal-100/60">{message}</p>
        <div className="flex justify-center gap-3">
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
