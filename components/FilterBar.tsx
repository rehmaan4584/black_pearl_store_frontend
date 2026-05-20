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
    <div className="flex gap-6 mb-12 flex-wrap items-end bg-white/2 p-6 rounded-3xl border border-white/5 glass">
      {/* Gender Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-teal-100/60 ml-1">Gender</label>
        <Select value={currentGender || 'all'} onValueChange={handleGenderChange}>
          <SelectTrigger className="w-[180px] h-12 glass border-white/10 hover:border-primary/50 transition-colors uppercase tracking-widest text-xs font-bold">
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
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-teal-100/60 ml-1">Category</label>
        <Select value={currentType || 'all'} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[180px] h-12 glass border-white/10 hover:border-primary/50 transition-colors uppercase tracking-widest text-xs font-bold">
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
        <Button variant="ghost" onClick={clearFilters} className="h-12 px-6 text-destructive hover:bg-destructive/10 font-bold uppercase tracking-widest text-xs">
          Clear Filters
        </Button>
      )}
    </div>
  );
}