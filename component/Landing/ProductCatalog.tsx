'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, 
  ArrowUpDown,  RotateCcw, 
   CheckCircle2, ChevronDown, ChevronUp,
  Layers
} from 'lucide-react';
import FlashDealsMarquee from '../utils/product/FlashDealsMarquee';
import ProductGrid from '../utils/product/ProductGrid';
import { brands, mainCategories, mockProducts } from '../utils/data/mockProducts';



export default function ProductCatalogPage() {
  // Navigation Filter Matrix States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [onlyOfficial, setOnlyOfficial] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  
  // Track which category's accordion is expanded in the sidebar view
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Pagination Parameters
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; 

  // Auto-reset down to first index layout page on filter updates
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubCategory, searchQuery, selectedBrands, minPrice, maxPrice, minRating, onlyOfficial, sortBy]);

  // Compute live contextual item tallies for every single category bucket item
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mockProducts.length };
    mockProducts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
      counts[`sub:${p.subCategory}`] = (counts[`sub:${p.subCategory}`] || 0) + 1;
    });
    return counts;
  }, []);

  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
  };

  // Main Computing Filtration Pipeline
  const filteredProducts = useMemo(() => {
    let dataset = [...mockProducts];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      dataset = dataset.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (activeCategory !== 'all') {
      // If filtering by "official-store", grab items marked as official
      if (activeCategory === 'official-store') {
        dataset = dataset.filter(p => p.isOfficialStore);
      } else {
        dataset = dataset.filter(p => p.category === activeCategory);
      }
    }
    if (activeSubCategory !== 'all') {
      dataset = dataset.filter(p => p.subCategory === activeSubCategory);
    }
    if (selectedBrands.length > 0) {
      dataset = dataset.filter(p => selectedBrands.includes(p.brand));
    }
    if (minPrice !== '') {
      dataset = dataset.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice !== '') {
      dataset = dataset.filter(p => p.price <= Number(maxPrice));
    }
    if (minRating !== null) {
      dataset = dataset.filter(p => p.rating >= minRating);
    }
    if (onlyOfficial) {
      dataset = dataset.filter(p => p.isOfficialStore);
    }

    // Sort Maps
    if (sortBy === 'price-asc') dataset.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') dataset.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') dataset.sort((a, b) => b.rating - a.rating);
    
    return dataset;
  }, [activeCategory, activeSubCategory, searchQuery, selectedBrands, minPrice, maxPrice, minRating, onlyOfficial, sortBy]);

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
    setActiveCategory('all');
    setActiveSubCategory('all');
    setSearchQuery('');
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setMinRating(null);
    setOnlyOfficial(false);
    setSortBy('popularity');
    setExpandedCategory(null);
  };

  return (
    <div className="bg-[#f1f5f9] min-h-screen pb-16 font-sans text-slate-800 antialiased">
      <FlashDealsMarquee />

      {/* ================= SEARCH SEARCH CONTROLS HERO HEADER ================= */}
      <div className="mx-auto max-w-[1400px] px-4 mb-4">
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, dynamic sub-categories or brands..."
              className="w-full pl-10 pr-4 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all text-slate-900 placeholder:text-slate-400 font-normal"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 bg-white"
            >
              <SlidersHorizontal className="h-4 w-4 text-blue-600" />
              <span>Catalog Parameters</span>
            </button>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 cursor-pointer focus:outline-hidden focus:border-blue-600"
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

      {/* ================= CORE TWO-COLUMN DIRECTORY CANVAS ================= */}
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          
          {/* ================= LEFT ACCORDION CATEGORY SIDEBAR ================= */}
          <aside className={`bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-5 md:block ${showMobileFilters ? 'block' : 'hidden'}`}>
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-600" />
                <span>Categories</span>
              </h3>
              <button 
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Main Category Dynamic Accordion List Engine */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveSubCategory('all');
                  setExpandedCategory(null);
                }}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                  activeCategory === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="h-4 w-4 opacity-80" />
                  <span>All Categories</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeCategory === 'all' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {categoryCounts['all']}
                </span>
              </button>

              {mainCategories.map((cat) => {
                // const CategoryIcon = cat.icon;
                const isSelected = activeCategory === cat.id;
                const isExpanded = expandedCategory === cat.id;
                const totalInCat = categoryCounts[cat.id] || 0;

                return (
                  <div key={cat.id} className="rounded-lg overflow-hidden transition-all">
                    <div className={`flex items-center justify-between w-full pr-2 ${isSelected ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                      <button
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setActiveSubCategory('all');
                          setExpandedCategory(isExpanded ? null : cat.id);
                        }}
                        className="flex-1 text-left px-2.5 py-2 text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer"
                      >
                        {/* <CategoryIcon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} /> */}
                        <span className="truncate">{cat.label}</span>
                      </button>
                      
                      <div className="flex items-center gap-1.5">
                        {totalInCat > 0 && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>
                            {totalInCat}
                          </span>
                        )}
                        <button 
                          onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                          className="p-1 hover:bg-slate-200/50 rounded-md cursor-pointer text-slate-400"
                        >
                          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>

                    {/* Subcategories drawer block toggle */}
                    {isExpanded && (
                      <div className="  bg-slate-50/70 border-l-2 border-blue-500 ml-4 pl-3 py-1.5 pr-2 flex flex-col gap-1 space-y-0.5 animate-in slide-in-from-top-1 duration-150">
                        <button
                          onClick={() => setActiveSubCategory('all')}
                          className={`cursor-pointer text-left text-[11px] font-bold py-0.5 ${activeSubCategory === 'all' ? 'text-blue-600 font-extrabold underline' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          All {cat.label}
                        </button>
                        {cat.subCats.map((sub) => {
                          const subCount = categoryCounts[`sub:${sub}`] || 0;
                          return (
                            <button
                              key={sub}
                              onClick={() => setActiveSubCategory(sub)}
                              className={`mt-2 cursor-pointer text-left text-[11px] font-medium py-0.5 flex items-center justify-between ${
                                activeSubCategory === sub ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              <span>{sub}</span>
                              {subCount > 0 && <span className="text-[9px] text-slate-400 font-mono">({subCount})</span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Official Store Toggle Check */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input 
                  type="checkbox"
                  checked={onlyOfficial}
                  onChange={(e) => setOnlyOfficial(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 fill-blue-50" />
                  Official Brands Only
                </span>
              </label>
            </div>

            {/* Brands Multiselect */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Brand Filters</h4>
              <div className="max-h-36 overflow-y-auto no-scrollbar space-y-1.5 pr-1">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                    />
                    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Inputs Boundary */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Price Window (₦)</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 text-xs font-bold rounded-lg bg-slate-50 border border-slate-200 focus:outline-hidden focus:bg-white focus:border-blue-600"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2 text-xs font-bold rounded-lg bg-slate-50 border border-slate-200 focus:outline-hidden focus:bg-white focus:border-blue-600"
                />
              </div>
            </div>

          </aside>

          {/* ================= RIGHT MARKET GRID LIST CANVAS ================= */}
          <section className="md:col-span-3 space-y-4">
            
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
              <p className="text-xs font-medium text-slate-500">
                Displaying <span className="font-bold text-slate-800">{recordMetrics.start}</span> - <span className="font-bold text-slate-800">{recordMetrics.end}</span> of <span className="font-black text-blue-600">{recordMetrics.total}</span> products verified
              </p>
            </div>
                <ProductGrid
                    products={paginatedProducts}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    onResetFilters={resetAllFilters}
                    onViewDetails={(prod) => console.log('Details preview triggered:', prod.id)}
                />
          </section>

        </div>
      </div>
    </div>
  );
}