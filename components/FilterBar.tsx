// components/FilterBar.tsx (CSR - has interactions)
'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentGender = searchParams.get('gender') || '';
  const currentType = searchParams.get('type') || '';

  const handleGenderChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('gender');
    } else {
      params.set('gender', value);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('type');
    } else {
      params.set('type', value);
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
  };

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/2 p-4 glass sm:mb-12 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6 sm:rounded-3xl sm:p-6">
      {/* Gender Filter */}
      <div className="w-full space-y-2 sm:w-auto">
        <label className="ml-1 text-xs font-bold uppercase tracking-wider text-teal-100/60">Gender</label>
        <Select value={currentGender || 'all'} onValueChange={handleGenderChange}>
          <SelectTrigger className="h-11 w-full glass border-white/10 text-xs font-bold uppercase tracking-widest transition-colors hover:border-primary/50 sm:h-12 sm:w-[180px]">
            <SelectValue placeholder="All Genders" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={8} className="glass-darker border-white/10 min-w-[180px]">
            <SelectItem value="all" className="uppercase tracking-widest text-xs py-3">All Genders</SelectItem>
            <SelectItem value="MEN" className="uppercase tracking-widest text-xs py-3">Men</SelectItem>
            <SelectItem value="WOMEN" className="uppercase tracking-widest text-xs py-3">Women</SelectItem>
            <SelectItem value="UNISEX" className="uppercase tracking-widest text-xs py-3">Unisex</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Type Filter */}
      <div className="w-full space-y-2 sm:w-auto">
        <label className="ml-1 text-xs font-bold uppercase tracking-wider text-teal-100/60">Category</label>
        <Select value={currentType || 'all'} onValueChange={handleTypeChange}>
          <SelectTrigger className="h-11 w-full glass border-white/10 text-xs font-bold uppercase tracking-widest transition-colors hover:border-primary/50 sm:h-12 sm:w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={8} className="glass-darker border-white/10 min-w-[180px]">
            <SelectItem value="all" className="uppercase tracking-widest text-xs py-3">All Categories</SelectItem>
            <SelectItem value="JEANS" className="uppercase tracking-widest text-xs py-3">Jeans</SelectItem>
            <SelectItem value="SHORTS" className="uppercase tracking-widest text-xs py-3">Shorts</SelectItem>
            <SelectItem value="SHIRTS" className="uppercase tracking-widest text-xs py-3">Shirts</SelectItem>
            <SelectItem value="KNICKERS" className="uppercase tracking-widest text-xs py-3">Knickers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {(currentGender || currentType) && (
        <Button variant="ghost" onClick={clearFilters} className="h-11 w-full px-6 text-xs font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 sm:h-12 sm:w-auto">
          Clear Filters
        </Button>
      )}
    </div>
  );
}