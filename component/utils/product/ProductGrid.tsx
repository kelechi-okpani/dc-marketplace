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
  onViewDetails?: (product: Product) => void;
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
      /* ================= VIBRANT EMPTY FALLBACK STATE ================= */
      <div className="flex flex-col items-center justify-center py-20 border border-emerald-100 rounded-2xl bg-gradient-to-b from-slate-50 to-white text-center px-4 shadow-3xs max-w-2xl mx-auto my-6">
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl mb-4 transform transition-transform hover:rotate-6 duration-300">
          <PackageX className="h-7 w-7 text-emerald-600" />
        </div>
        <h5 className="text-sm font-black text-slate-900 uppercase tracking-wider">
          Empty Subcategory
        </h5>
        <p className="text-xs text-slate-500 font-medium max-w-xs mt-2 leading-relaxed">
          No products are currently cataloged under this exact filter branch. Let's expand your search horizons.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:from-emerald-700 hover:to-green-700 transition-all active:scale-98 cursor-pointer tracking-wide uppercase"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* ================= MODERN COLORFUL PAGINATION TRACKS ================= */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 mt-8">
        <button
          onClick={() => onPageChange((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="cursor-pointer inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          <span className="hidden xs:inline">Back</span>
        </button>

        {/* Numeric pagination list tracks with high-contrast active bounds */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
            const isCurrent = currentPage === num;
            return (
              <button
                key={num}
                onClick={() => onPageChange(num)}
                className={`cursor-pointer w-8 h-8 rounded-xl text-xs font-black transition-all border ${
                  isCurrent 
                    ? 'bg-gradient-to-br from-emerald-600 to-green-600 text-white border-transparent shadow-xs shadow-emerald-600/20 scale-105' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/30'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="cursor-pointer inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          <span className="hidden xs:inline">Next</span>
          <ChevronRight className="h-4 w-4 stroke-[2.5]" />
        </button>
      </div>
    </>
  );
}