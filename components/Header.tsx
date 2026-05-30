import Link from 'next/link';
import { BlackPearlLogo } from './BlackPearlLogo';
import { HeaderAuthActions } from './HeaderAuthActions';
import { StoreHeaderNav } from './StoreHeaderNav';

export function Header() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <Link href="/" className="shrink-0">
          <BlackPearlLogo size="md" subtext="store" />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2 lg:justify-center">
          <StoreHeaderNav />
        </div>

        <HeaderAuthActions />
      </div>
    </header>
  );
}
