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
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <Card className="glass mx-auto w-full max-w-xl border-white/5">
        <CardContent className="space-y-5 p-6 text-center sm:space-y-6 sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary sm:text-sm">
              Pending Order Created
            </p>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Order Reserved
            </h1>
          </div>

          <p className="text-sm text-teal-100/60 sm:text-base">
            Your order has been created and inventory has been reserved.
          </p>

          {orderId && (
            <p className="rounded-xl border border-white/10 p-4 text-sm text-teal-100/70">
              Order ID: <span className="font-bold text-white">{orderId}</span>
            </p>
          )}

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
    </div>
  );
}
