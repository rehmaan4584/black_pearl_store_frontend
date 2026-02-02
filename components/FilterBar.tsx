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
    <div className="flex gap-4 mb-8 flex-wrap items-center">
      {/* Gender Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Gender</label>
        <Select value={currentGender || 'all'} onValueChange={handleGenderChange}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="All Genders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="MEN">Men</SelectItem>
            <SelectItem value="WOMEN">Women</SelectItem>
            <SelectItem value="UNISEX">Unisex</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Type Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <Select value={currentType || 'all'} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="JEANS">Jeans</SelectItem>
            <SelectItem value="SHORTS">Shorts</SelectItem>
            <SelectItem value="SHIRTS">Shirts</SelectItem>
            <SelectItem value="KNICKERS">Knickers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {(currentGender || currentType) && (
        <Button variant="outline" onClick={clearFilters} className="mt-6">
          Clear Filters
        </Button>
      )}
    </div>
  );
}