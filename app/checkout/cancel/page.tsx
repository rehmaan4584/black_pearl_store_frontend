import { CheckoutCancelClient } from '@/components/CheckoutCancelClient';

type CancelPageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function CheckoutCancelPage({
  searchParams,
}: CancelPageProps) {
  const { orderId } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-16">
      <CheckoutCancelClient orderId={orderId} />
    </div>
  );
}
