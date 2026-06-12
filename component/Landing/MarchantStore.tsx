'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingCart, Eye, Heart, Search, SlidersHorizontal, 
  ArrowUpDown, ChevronLeft, ChevronRight, RotateCcw, 
  PackageX, Star, CheckCircle2, ChevronDown, ChevronUp,
  Store, Refrigerator, Smartphone, Sparkles, Home, 
  Tv, Shirt, Apple, Monitor, Baby, Gamepad2, Layers,
  MapPin, Calendar, Award, CheckCircle, ArrowLeft, Package
} from 'lucide-react';
import Link from 'next/link';
import { mainCategories, MOCK_STORES_DATABASE, mockProducts } from '../utils/data/mockProducts';
import ProductGrid from '../utils/product/ProductGrid';

export default function StoreFrontPage({ params }: { params: { id: string } }) {
  const currentStoreId = params.id || "aeon-appliances-nigeria";
  const storeData = MOCK_STORES_DATABASE[currentStoreId] || MOCK_STORES_DATABASE["aeon-appliances-nigeria"];
  const { merchant, categories: allowedCategories } = storeData;

  // Filter out non-relevant global categories for this specific vendor profile page
  const storeCategories = useMemo(() => {
    return mainCategories.filter(cat => allowedCategories.includes(cat.id));
  }, [allowedCategories]);

  // Navigation Filter Matrix States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Pagination Parameters
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Auto-reset pagination indexing on any parameters alteration
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubCategory, searchQuery, minPrice, maxPrice, minRating, sortBy]);

  // Target isolated mock data scoping to match current store context
  const merchantBaseProducts = useMemo(() => {
    return mockProducts.filter(p => {
      if (currentStoreId === "aeon-appliances-nigeria") return p.isOfficialStore;
      return !p.isOfficialStore; // Splits inventory conditionally for demo purposes
    });
  }, [currentStoreId]);

  // Compute live local items numbers relative to merchant catalog bounds
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: merchantBaseProducts.length };
    merchantBaseProducts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
      counts[`sub:${p.subCategory}`] = (counts[`sub:${p.subCategory}`] || 0) + 1;
    });
    return counts;
  }, [merchantBaseProducts]);

  // Primary Filtration Computation Pipeline
  const filteredProducts = useMemo(() => {
    let dataset = [...merchantBaseProducts];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      dataset = dataset.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (activeCategory !== 'all') {
      dataset = dataset.filter(p => p.category === activeCategory);
    }
    if (activeSubCategory !== 'all') {
      dataset = dataset.filter(p => p.subCategory === activeSubCategory);
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

    // Sort mappings
    if (sortBy === 'price-asc') dataset.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') dataset.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') dataset.sort((a, b) => b.rating - a.rating);
    
    return dataset;
  }, [merchantBaseProducts, activeCategory, activeSubCategory, searchQuery, minPrice, maxPrice, minRating, sortBy]);

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
    setMinPrice('');
    setMaxPrice('');
    setMinRating(null);
    setSortBy('popularity');
    setExpandedCategory(null);
  };

  return (
    <div className="bg-[#f1f5f9] min-h-screen pb-16 font-sans text-slate-800 antialiased selection:bg-emerald-600 selection:text-white">
      
      {/* Dynamic Navigation Bar Context */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-2xs">
        <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Marketplace Home
          </Link>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-sm">
            Verified Storefront Space
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-4 space-y-4">
        
        {/* ================= PROFILE OWNER HEADER CARD BLOCK ================= */}
        <div className={`relative rounded-xl bg-emerald-700 ${merchant.bannerColor} text-white p-6 md:p-8 shadow-md overflow-hidden`}>
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
            <Store className="w-64 h-64" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
            <div className="flex items-start md:items-center gap-4">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xs shrink-0">
                <Store className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-black tracking-tight">{merchant.storeName}</h1>
                  {merchant.isOfficial && (
                    <span className="inline-flex items-center gap-1 bg-white text-emerald-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-2xs">
                      <CheckCircle className="h-3 w-3 fill-emerald-600 text-white" /> Official Store
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-50 font-bold tracking-wide flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 opacity-90" /> {merchant.verifiedStatus}
                </p>
                <p className="text-xs text-white/80 max-w-xl font-normal leading-relaxed pt-1 line-clamp-2 md:line-clamp-none">
                  {merchant.description}
                </p>
              </div>
            </div>

            {/* Performance Panels */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 min-w-[115px] text-center sm:text-left">
                <p className="text-[10px] text-white/70 font-black uppercase tracking-wider">Quality Score</p>
                <p className="text-sm font-black mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                  <Star className="h-3.5 w-3.5 fill-white text-transparent" /> {merchant.score.split(' ')[0]}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 min-w-[115px] text-center sm:text-left">
                <p className="text-[10px] text-white/70 font-black uppercase tracking-wider">Followers</p>
                <p className="text-sm font-black mt-0.5">{merchant.followers.split(' ')[0]}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/90 font-bold">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 opacity-80" /> {merchant.location}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 opacity-80" /> {merchant.joinedDate}</span>
          </div>
        </div>

        {/* ================= CONTROLS TOOLBAR CONTROLS ================= */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search explicitly within this store's collection..."
              className="w-full pl-10 pr-4 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-all text-slate-900 placeholder:text-slate-400 font-normal"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 bg-white cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
              <span>Filter Items ({recordMetrics.total})</span>
            </button>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 cursor-pointer focus:outline-hidden focus:border-emerald-600"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= CORE TWO-COLUMN DESIGN SPLIT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          
          {/* ================= LEFT ACCORDION VENDOR SIDEBAR ================= */}
          <aside className={`bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-5 md:block ${showMobileFilters ? 'block' : 'hidden'}`}>
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-600" />
                <span>Store Catalog</span>
              </h3>
              <button 
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-slate-400 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Dynamic Store Accordion Categories Engine */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveSubCategory('all');
                  setExpandedCategory(null);
                }}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeCategory === 'all' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="h-4 w-4 opacity-80" />
                  <span>All Store Products</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeCategory === 'all' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {categoryCounts['all']}
                </span>
              </button>

              {storeCategories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const isExpanded = expandedCategory === cat.id;
                const totalInCat = categoryCounts[cat.id] || 0;

                return (
                  <div key={cat.id} className="rounded-lg overflow-hidden transition-all">
                    <div className={`flex items-center justify-between w-full pr-2 ${isSelected ? 'bg-emerald-50 text-emerald-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                      <button
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setActiveSubCategory('all');
                          setExpandedCategory(isExpanded ? null : cat.id);
                        }}
                        className="flex-1 text-left px-2.5 py-2 text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer"
                      >
                        <span className="truncate">{cat.label}</span>
                      </button>
                      
                      <div className="flex items-center gap-1.5">
                        {totalInCat > 0 && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-emerald-200 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
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

                    {/* Subcategories drawer framework logic */}
                    {isExpanded && (
                      <div className="bg-slate-50/70 border-l-2 border-emerald-500 ml-4 pl-3 py-1.5 pr-2 flex flex-col gap-1 space-y-0.5 animate-in slide-in-from-top-1 duration-150">
                        <button
                          onClick={() => setActiveSubCategory('all')}
                          className={`cursor-pointer text-left text-[11px] font-bold py-0.5 ${activeSubCategory === 'all' ? 'text-emerald-600 font-extrabold underline' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          All {cat.label}
                        </button>
                        {cat.subCats.map((sub) => {
                          const subCount = categoryCounts[`sub:${sub}`] || 0;
                          return (
                            <button
                              key={sub}
                              onClick={() => setActiveSubCategory(sub)}
                              className={`cursor-pointer text-left text-[11px] font-medium py-0.5 flex items-center justify-between ${
                                activeSubCategory === sub ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              <span>{sub}</span>
                              {subCount > 0 && <span className="text-[9px] text-slate-400 font-mono font-normal">({subCount})</span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Price Window Boundary Input Elements */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Price Bounds (₦)</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 text-xs font-bold rounded-lg bg-slate-50 border border-slate-200 focus:outline-hidden focus:bg-white focus:border-emerald-600 shadow-2xs"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2 text-xs font-bold rounded-lg bg-slate-50 border border-slate-200 focus:outline-hidden focus:bg-white focus:border-emerald-600 shadow-2xs"
                />
              </div>
            </div>

            {/* Merchant Rating Filtering Metric */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Minimum Rating</h4>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setMinRating(minRating === star ? null : star)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star 
                      className={`h-5 w-5 ${
                        minRating !== null && star <= minRating 
                          ? 'text-amber-400 fill-amber-400' 
                          : 'text-slate-200 hover:text-amber-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* ================= RIGHT ACTIVE CATALOG CONTENT CONTAINER ================= */}
          <section className="md:col-span-3 space-y-4">
            
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
              <p className="text-xs font-medium text-slate-500">
                Viewing items <span className="font-bold text-slate-800">{recordMetrics.start}</span> - <span className="font-bold text-slate-800">{recordMetrics.end}</span> of <span className="font-black text-emerald-600">{recordMetrics.total}</span> merchant products loaded
              </p>
            </div>

            {/* High-Fidelity ProductGrid Component Integration */}
            <ProductGrid
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onResetFilters={resetAllFilters}
              onViewDetails={(prod) => console.log('Details module triggered:', prod.id)}
            />
          </section>

        </div>
      </div>
    </div>
  );
}