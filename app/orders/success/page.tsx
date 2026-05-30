import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type SuccessPageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function OrderSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { orderId } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="glass mx-auto max-w-xl border-white/5">
        <CardContent className="space-y-6 p-8 text-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Pending Order Created
            </p>
            <h1 className="mt-3 text-4xl font-black text-white">
              Order Reserved
            </h1>
          </div>

          <p className="text-teal-100/60">
            Your order has been created and inventory has been reserved. Stripe
            payment will be connected in the next phase.
          </p>

          {orderId && (
            <p className="rounded-xl border border-white/10 p-4 text-sm text-teal-100/70">
              Order ID: <span className="font-bold text-white">{orderId}</span>
            </p>
          )}

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
    </div>
  );
}
