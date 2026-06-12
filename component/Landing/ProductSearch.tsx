'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '../utils/product/ProductGrid';
import { brands, mainCategories, mockProducts } from '../utils/data/mockProducts';

export default function SearchCatalog() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Single source of truth for filtering
  const filteredProducts = useMemo(() => {
    let dataset = [...mockProducts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      dataset = dataset.filter(p => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (activeCategory !== 'all') {
      dataset = dataset.filter(p => p.category === activeCategory);
    }
    if (selectedBrands.length > 0) {
      dataset = dataset.filter(p => selectedBrands.includes(p.brand));
    }

    if (sortBy === 'price-asc') dataset.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') dataset.sort((a, b) => b.price - a.price);
    
    return dataset;
  }, [searchQuery, activeCategory, selectedBrands, sortBy]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search marketplace..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Horizontal Filter Bar */}
        <div className="max-w-6xl mx-auto mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <select 
            onChange={(e) => setActiveCategory(e.target.value)}
            className="px-3 py-1.5 text-xs font-bold bg-slate-100 rounded-full border border-slate-200"
          >
            <option value="all">All Categories</option>
            {mainCategories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          
          <select 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 text-xs font-bold bg-slate-100 rounded-full border border-slate-200"
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <button 
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSelectedBrands([]); }}
            className="px-3 py-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" /> Clear
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <ProductGrid
          products={filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
          onPageChange={setCurrentPage}
          onResetFilters={() => {}}
          onViewDetails={() => {}}
        />
      </div>
    </div>
  );
}