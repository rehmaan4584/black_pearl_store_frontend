'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { getStoredToken } from '@/lib/auth-token';
import { fetchMyOrderById } from '@/lib/orders-api';
import type { OrderDetail } from '@/types/order.types';

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function formatMoney(amount: number) {
  return `Rs. ${amount.toLocaleString()}`;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = Number(params.id);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!getStoredToken()) {
      router.push('/login');
      return;
    }

    if (!Number.isInteger(orderId)) {
      setMessage('Invalid order');
      setLoading(false);
      return;
    }

    async function loadOrder() {
      try {
        setLoading(true);
        setMessage('');
        const data = await fetchMyOrderById(orderId);
        setOrder(data);
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : 'Could not load order',
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="space-y-3">
          <div className="h-8 w-40 animate-pulse rounded-lg bg-white/10" />
          <div className="h-32 animate-pulse rounded-xl bg-white/5" />
          <div className="h-24 animate-pulse rounded-xl bg-white/5" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center sm:py-16">
        <h1 className="mb-4 text-3xl font-black text-white">Order Not Found</h1>
        <p className="mb-8 text-teal-100/60">{message}</p>
        <Button asChild>
          <Link href="/orders">Back to My Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-12">
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href="/orders">
          <ArrowLeft className="mr-2 size-4" />
          My Orders
        </Link>
      </Button>

      <div className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8">
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Order #{order.id}
        </h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3 sm:space-y-4">
          {order.items.map((item) => (
            <Card key={item.id} className="glass border-white/5">
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                <div>
                  <h2 className="font-bold text-white">{item.product.title}</h2>
                  <p className="text-sm text-teal-100/50">
                    {item.variant.size} / {item.variant.color}
                  </p>
                  <p className="mt-1 text-sm text-teal-100/40">
                    {item.quantity} x {formatMoney(item.price)}
                  </p>
                </div>
                <p className="text-lg font-black text-primary">
                  {formatMoney(item.lineTotal)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass h-fit border-white/5 lg:sticky lg:top-24">
          <CardContent className="space-y-4 p-4 sm:p-6">
            <h2 className="text-xl font-black text-white">Summary</h2>
            <div className="space-y-2 text-sm text-teal-100/60">
              <p>Placed: {formatDate(order.createdAt)}</p>
              <p>Updated: {formatDate(order.updatedAt)}</p>
              <p>
                Items: {order.itemCount}
              </p>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-4 text-xl font-black text-white">
              <span>Total</span>
              <span className="text-primary">
                {formatMoney(order.totalAmount)}
              </span>
            </div>
            <Button asChild className="w-full">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
