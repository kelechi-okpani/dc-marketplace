'use client';
import React, { useState, useMemo, useEffect } from 'react';
import ProductGrid from '../utils/product/ProductGrid';
import { mainCategories, mockProducts } from '../utils/data/mockProducts';
import { useSearchParams } from 'next/navigation';


export default function SearchCatalog() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const itemsPerPage = 12;


  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  
// Optimized Filter/Sort Logic
    const filteredProducts = useMemo(() => {
  let dataset = [...mockProducts];

  // 1. Add Search Filtering Logic
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    dataset = dataset.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q)
    );
  }

  // 2. Filter by Category
  if (activeCategory !== 'all') {
    dataset = dataset.filter(p => p.category === activeCategory);
  }

  // 3. Sort Logic
  if (sortBy === 'price-asc') dataset.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') dataset.sort((a, b) => b.price - a.price);
  
  return dataset;
}, [activeCategory, sortBy, searchQuery]); // searchQuery is now correctly utilized

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSortBy('popularity');
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 pt-8">
        
        {/* Left Side: Filter List */}
        <aside className="md:col-span-1 space-y-8 border border-slate-200 px-6 py-8 shadow-lg mb-8 bg-white">
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Categories</h3>
            <div className="space-y-2">
              <button 
                onClick={() => { setActiveCategory('all'); setCurrentPage(1); }}
                className={`block w-full text-left text-sm font-bold ${activeCategory === 'all' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-500'}`}
              >
                All Categories
              </button>
              {mainCategories.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => { setActiveCategory(c.id); setCurrentPage(1); }}
                  className={`cursor-pointer block w-full text-left text-sm mt-4 font-medium ${activeCategory === c.id ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-500'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sort By</h3>
            <div className="space-y-2">
              {['popularity', 'price-asc', 'price-desc'].map((option) => (
                <button 
                  key={option}
                  onClick={() => { setSortBy(option); setCurrentPage(1); }}
                  className={`cursor-pointer block w-full text-left text-sm capitalize ${sortBy === option ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-500'}`}
                >
                  {option.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Side: Product Grid */}
        <div className="md:col-span-4">
          <ProductGrid
            products={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onResetFilters={resetFilters}
            onViewDetails={() => {}}
          />
        </div>
      </div>
    </div>
  );
}