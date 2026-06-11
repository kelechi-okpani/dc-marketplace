'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, PackageX } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../data/mockProducts';

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
  onResetFilters: () => void;
  onViewDetails?: (product: Product) => void; // Maintained if you track detail clicks at the grid level
}

export default function ProductGrid({
  products,
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
  onViewDetails,
}: ProductGridProps) {
  
  if (products.length === 0) {
    return (
      /* ================= EMPTY FALLBACK STATE COMPONENT ================= */
      <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-200 rounded-xl bg-white text-center px-4">
        <div className="p-3 bg-slate-50 rounded-full mb-3">
          <PackageX className="h-6 w-6 text-slate-400" />
        </div>
        <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Empty Subcategory</h5>
        <p className="text-xs text-slate-400 font-medium max-w-xs mt-1 leading-normal">
          No products are currently cataloged under this exact subcategory filter branch. Try expanding your search horizons.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset All Active Filters</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ================= DYNAMIC RENDER MATRIX ================= */}
      {/* Cards internally handle their own Redux dispatch pipelines now */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* ================= PAGINATION NAVIGATOR PANELS ================= */}
      <div className="flex items-center justify-end gap-4 border-t border-slate-200 pt-5 mt-6">
        <button
          onClick={() => onPageChange((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          <span>Back</span>
        </button>

        {/* Numeric pagination list tracks */}
        <div className="hidden sm:flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`cursor-pointer w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                currentPage === num ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4 stroke-[2.5]" />
        </button>
      </div>
    </>
  );
}