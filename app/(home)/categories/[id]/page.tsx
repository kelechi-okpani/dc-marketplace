'use client';

import React, { useState, useMemo, useEffect, use } from 'react'; // <-- Added use hook
import Link from 'next/link';
import { 
  Search, SlidersHorizontal, ArrowUpDown, RotateCcw, 
  CheckCircle2, ArrowLeft
} from 'lucide-react';
import { mainCategories, mockProducts } from '@/component/utils/data/mockProducts';
import FlashDealsMarquee from '@/component/utils/product/FlashDealsMarquee';
import ProductGrid from '@/component/utils/product/ProductGrid';

interface CategoryViewScreenProps {
  params: Promise<{
    id: string;
  }>; // <-- Next.js dynamic params are typed as Promises
}

export default function CategoryViewScreen({ params }: CategoryViewScreenProps) {
  // Safe unwrap of the asynchronous parameters promise
  const resolvedParams = use(params);

  // Decode URL parameters safely to handle spaces/characters (e.g., %20)
  const selectedCategoryId = useMemo(() => {
    if (!resolvedParams?.id) return 'official-store';
    return decodeURIComponent(resolvedParams.id).toLowerCase();
  }, [resolvedParams?.id]);
  
  // 1. Gracefully fallback if route id does not exact-match inside the registry schema
  const currentCategoryObj = useMemo(() => {
    return mainCategories.find(c => c.id === selectedCategoryId) || 
           mainCategories.find(c => c.label.toLowerCase() === selectedCategoryId) || 
           mainCategories[0];
  }, [selectedCategoryId]);

  // Operational State Matrices
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [onlyOfficial, setOnlyOfficial] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Auto-page reset on filter mutations
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryId, activeSubCategory, searchQuery, selectedBrands, minPrice, maxPrice, onlyOfficial, sortBy]);

  // Reset core parameters safely when jumping across target categories
  useEffect(() => {
    setOnlyOfficial(currentCategoryObj.id === 'official-store');
    setSelectedBrands([]); 
    setActiveSubCategory('all');
  }, [currentCategoryObj]);

  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
  };

  // 2. ISOLATED SCOPE BASELINE: Target standard IDs or text labels safely
  const baseCategoryProducts = useMemo(() => {
    if (!mockProducts) return [];
    
    if (currentCategoryObj.id === 'official-store') {
      return mockProducts.filter(p => p.isOfficialStore);
    }
    
    return mockProducts.filter(p => 
      p.category === currentCategoryObj.id || 
      p.category === currentCategoryObj.label
    );
  }, [currentCategoryObj]);

  // 3. DYNAMIC PARAMETER-BASED FILTER EXTRACTIONS
  const availableSubCategoriesForCategory = useMemo(() => {
    const subCatSet = new Set<string>();
    baseCategoryProducts.forEach(p => {
      if (p.subCategory) subCatSet.add(p.subCategory);
    });
    return Array.from(subCatSet).sort();
  }, [baseCategoryProducts]);

  const availableBrandsForCategory = useMemo(() => {
    const brandSet = new Set<string>();
    baseCategoryProducts.forEach(p => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet).sort(); 
  }, [baseCategoryProducts]);

  const totalSubCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    baseCategoryProducts.forEach(p => {
      if (p.subCategory) {
        counts[p.subCategory] = (counts[p.subCategory] || 0) + 1;
      }
    });
    return counts;
  }, [baseCategoryProducts]);

  // Performance Isolation Pipeline for final presentation views
  const filteredProducts = useMemo(() => {
    let dataset = [...baseCategoryProducts];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      dataset = dataset.filter(p => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    if (activeSubCategory !== 'all') {
      dataset = dataset.filter(p => p.subCategory === activeSubCategory);
    }
    if (selectedBrands.length > 0) {
      dataset = dataset.filter(p => selectedBrands.includes(p.brand));
    }
    if (minPrice !== '') dataset = dataset.filter(p => p.price >= Number(minPrice));
    if (maxPrice !== '') dataset = dataset.filter(p => p.price <= Number(maxPrice));
    if (onlyOfficial && currentCategoryObj.id !== 'official-store') {
      dataset = dataset.filter(p => p.isOfficialStore);
    }

    if (sortBy === 'price-asc') dataset.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') dataset.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') dataset.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return dataset;
  }, [baseCategoryProducts, activeSubCategory, searchQuery, selectedBrands, minPrice, maxPrice, onlyOfficial, sortBy, currentCategoryObj]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const recordMetrics = useMemo(() => {
    const total = filteredProducts.length;
    const start = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, total);
    return { start, end, total };
  }, [filteredProducts, currentPage]);

  const resetAllFilters = () => {
    setActiveSubCategory('all');
    setSearchQuery('');
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setOnlyOfficial(currentCategoryObj.id === 'official-store');
    setSortBy('popularity');
  };

  return (
    <div className="bg-[#f1f5f9] min-h-screen pb-16 font-sans text-slate-800 antialiased">
      <FlashDealsMarquee />

      <div className="mx-auto max-w-[1400px] px-4 pt-4 mb-2">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Clear Active Filters</span>
        </Link>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 mb-4">
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3 w-full md:max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search inside ${currentCategoryObj.label}...`}
                className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none transition-all text-slate-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button 
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 bg-white cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4 text-blue-600" />
              <span>{showMobileFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 cursor-pointer focus:outline-none"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          
          <aside className={`bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-5 md:block ${showMobileFilters ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase">Viewing Directory</span>
                <h3 className="text-xs font-black text-slate-900 uppercase truncate max-w-[180px]">{currentCategoryObj.label}</h3>
              </div>
              <button 
                type="button"
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Dynamic Subcategories Setup */}
            <div className="space-y-1">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Sub Categories</h4>
              <button
                type="button"
                onClick={() => setActiveSubCategory('all')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeSubCategory === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Products</span>
              </button>

              {availableSubCategoriesForCategory.map((sub) => {
                const subCount = totalSubCategoryCounts[sub] || 0;
                return (
                  <button
                    type="button"
                    key={sub}
                    onClick={() => setActiveSubCategory(sub)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      activeSubCategory === sub ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub}</span>
                    {subCount > 0 && (
                      <span className={`text-[10px] font-mono font-bold px-1.5 rounded ${activeSubCategory === sub ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>
                        {subCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Conditional Official Checkbox Layout */}
            {currentCategoryObj.id !== 'official-store' && (
              <div className="pt-3 border-t border-slate-100">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={onlyOfficial}
                    onChange={(e) => setOnlyOfficial(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 h-4 w-4 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                    Official Brands Only
                  </span>
                </label>
              </div>
            )}

            {/* Dynamic Brands Filter Section */}
            {availableBrandsForCategory.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Filter Brands</h4>
                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                  {availableBrandsForCategory.map((brand) => (
                    <label key={brand} className="flex items-center gap-2.5 cursor-pointer group select-none">
                      <input 
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded border-slate-300 text-blue-600 h-3.5 w-3.5 focus:ring-blue-500"
                      />
                      <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Window Ranges */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Price Limit (₦)</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 text-xs font-bold rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 transition-all"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2 text-xs font-bold rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-600 transition-all"
                />
              </div>
            </div>
          </aside>

          <section className="md:col-span-3 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-sm">
              <p className="text-xs font-medium text-slate-500">
                Showing <span className="font-bold text-slate-800">{recordMetrics.start}-{recordMetrics.end}</span> of <span className="font-black text-blue-600">{recordMetrics.total}</span> matches inside <span className="font-bold text-slate-800">"{currentCategoryObj.label}"</span>
              </p>
            </div>
            
            <ProductGrid
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onResetFilters={resetAllFilters}
              onViewDetails={(p) => console.log('Detail Modal active:', p.id)}
            />
          </section>

        </div>
      </div>
    </div>
  );
}