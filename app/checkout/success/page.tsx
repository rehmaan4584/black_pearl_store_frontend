import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type SuccessPageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { orderId } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="glass mx-auto max-w-xl border-white/5">
        <CardContent className="space-y-6 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
            Payment Submitted
          </p>
          <h1 className="text-4xl font-black text-white">Thank You</h1>
          <p className="text-teal-100/60">
            Your payment was submitted successfully. We&apos;re preparing your
            order now.
          </p>
          {orderId && (
            <p className="rounded-xl border border-white/10 p-4 text-sm text-teal-100/70">
              Order ID: <span className="font-bold text-white">{orderId}</span>
            </p>
          )}
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
