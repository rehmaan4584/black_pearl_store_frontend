import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
        404
      </p>
      <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-sm text-teal-100/60 sm:text-base">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
}
