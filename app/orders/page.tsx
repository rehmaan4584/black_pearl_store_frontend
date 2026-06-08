'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { getStoredToken } from '@/lib/auth-token';
import { fetchMyOrders } from '@/lib/orders-api';
import type { OrderListItem } from '@/types/order.types';

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function formatMoney(amount: number) {
  return `Rs. ${amount.toLocaleString()}`;
}

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!getStoredToken()) {
      router.push('/login');
      return;
    }

    async function loadOrders() {
      try {
        setLoading(true);
        setMessage('');
        const data = await fetchMyOrders();
        setOrders(data);
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : 'Could not load orders',
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="space-y-3">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-white/10" />
          <div className="h-24 animate-pulse rounded-xl bg-white/5" />
          <div className="h-24 animate-pulse rounded-xl bg-white/5" />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center sm:py-16">
        <ClipboardList className="mx-auto mb-6 size-16 text-teal-100/20" />
        <h1 className="mb-4 text-3xl font-black text-white sm:text-4xl">
          My Orders
        </h1>
        <p className="mb-8 text-teal-100/60">
          {message || 'You have not placed any orders yet.'}
        </p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl font-black text-white sm:text-4xl">My Orders</h1>
        <p className="mt-2 text-sm text-teal-100/60">
          Track your purchases and delivery status.
        </p>
      </div>

      {message && (
        <p className="mb-4 text-sm text-destructive">{message}</p>
      )}

      <div className="space-y-3 sm:space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="glass border-white/5">
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg font-bold text-white">
                    Order #{order.id}
                  </p>
                  <OrderStatusBadge status={order.status} />
                </div>
                <p className="text-sm text-teal-100/50">
                  {formatDate(order.createdAt)} · {order.itemCount}{' '}
                  {order.itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <p className="text-xl font-black text-primary">
                  {formatMoney(order.totalAmount)}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/orders/${order.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
