'use client';
import React, { useState } from 'react';
import { LayoutGrid, List as ListIcon, ArrowUpDown, Clock } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/component/utils/types';

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
  onResetFilters: () => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductGrid({ products, currentPage, totalPages, onPageChange, onResetFilters, onViewDetails }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');


  // FIX: Handle Empty States
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-slate-300 mb-2">🔍</div>
        <h3 className="text-slate-800 font-bold">No products found</h3>
        <p className="text-slate-400 text-sm">Try adjusting your search terms.</p>
        <button 
            onClick={() => window.location.reload()} // Or reset your state logic
            className="mt-4 text-[#1877F2] font-bold text-sm"
        >
            Clear Search
        </button>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      {/* --- Filter/Sort Control Bar --- */}
      <div className="flex flex-wrap mb-2 items-center justify-between gap-3 rounded-lg border border-slate-100 w-full">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-slate-600 hover:text-[#1877F2] whitespace-nowrap px-1">
            <ArrowUpDown size={14} /> 
            <span className="hidden sm:inline">Sort by:</span> Recommended
          </button>
          
          <button className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-slate-600 hover:text-[#1877F2] whitespace-nowrap px-1">
            <Clock size={14} /> 
            <span className="hidden sm:inline">Time:</span> Any
          </button>
        </div>

        {/* RIGHT: View Toggle Group */}
        <div className="flex items-center gap-1 border-l pl-3 border-slate-200 shrink-0">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`cursor-pointer p-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-[#E7F3FF] text-[#1877F2]' : 'text-slate-400 hover:bg-slate-50'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`cursor-pointer p-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-[#E7F3FF] text-[#1877F2]' : 'text-slate-400 hover:bg-slate-50'
            }`}
            aria-label="List view"
          >
            <ListIcon size={20} />
          </button>
        </div>
      </div>

      {/* --- Products Container --- */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" 
        : "flex flex-col gap-2"
      }>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} onViewDetails={onViewDetails} />
        ))}
      </div>
    </div>
  );
}