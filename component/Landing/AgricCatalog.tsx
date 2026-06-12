'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, 
  ArrowUpDown, RotateCcw, 
  CheckCircle2, ChevronDown, ChevronUp,
  Layers, ChevronLeft, ChevronRight, ShoppingBag
} from 'lucide-react';
import FlashDealsMarquee from '../utils/product/FlashDealsMarquee';
import ProductGrid from '../utils/product/ProductGrid';
import { brands, mockProducts } from '../utils/data/mockProducts';

// Luxury High-Contrast Real Agricultural Photography Slider Dataset
const HERO_SLIDES = [
  {
    id: 1,
    title: "Premium Cash Crops & Raw Farm Produce",
    tagline: "Direct Farm-Gate Sourcing Hub",
    description: "Secure certified export-grade cash crops, whole grains, and organic tubers with transparent bulk matrix pricing.",
    bgImage: "/farm/banner1.webp",
    badge: "100% Verified Sellers"
  },
  {
    id: 2,
    title: "Bulk Agro-Inputs & Soil Fertilizers",
    tagline: "Maximize Crop Cultivation Yields",
    description: "Direct distribution pipelines for certified Indorama Urea, Notore NPK blends, and premium hybrid farm seeds.",
    bgImage: "/farm/banner2.jpg",
    badge: "Government Certified Inputs"
  },
  {
    id: 3,
    title: "Fresh Farm Harvests & Fresh Produce",
    tagline: "From Local Fields to Regional Markets",
    description: "Sourced directly from agricultural hubs across Zaria, Benue, and Mile 12 under verified inspection standards.",
     bgImage: "/farm/banner4.jpeg",
    badge: "Sourced Fresh Daily"
  }
];

// Single target category specification configuration
const TARGET_CATEGORY = { 
  id: 'agric-farm-produce', 
  label: 'Agric & Farm Produce', 
  subCats: [
    'Grains & Flours',       
    'Tubers & Roots',        
    'Oils & Local Spices',   
    'Livestock & Poultry',   
    'Fresh Fruits & Veggies',
    'Cash Crops Bulk',     
    'Agro-Chemicals',        
    'Fertilizers & Soil',    
    'Animal Feed & Care',   
    'Farm Tools & Machinery' 
  ] 
};

export default function AgroCatalog () {
  // Navigation Filter Matrix States
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [onlyOfficial, setOnlyOfficial] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [expandedCategory, setExpandedCategory] = useState<boolean>(true);

  // Hero Slider State Machinery
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Pagination Parameters
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12; 

  // Auto-slide carousel rotation interval execution
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  // Filter modification layout side-effects tracking
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSubCategory, searchQuery, selectedBrands, minPrice, maxPrice, minRating, onlyOfficial, sortBy]);

  // Compute live contextual item tallies isolated strictly to target schema parameters
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { total: 0 };
    mockProducts.forEach(p => {
      if (p.category === TARGET_CATEGORY.id) {
        counts['total'] += 1;
        counts[`sub:${p.subCategory}`] = (counts[`sub:${p.subCategory}`] || 0) + 1;
      }
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
    // Strictly isolate our product canvas datasets to our targeted agricultural id
    let dataset = mockProducts.filter(p => p.category === TARGET_CATEGORY.id);

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      dataset = dataset.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
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

    // Sorting evaluation matrices
    if (sortBy === 'price-asc') dataset.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') dataset.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') dataset.sort((a, b) => b.rating - a.rating);
    
    return dataset;
  }, [activeSubCategory, searchQuery, selectedBrands, minPrice, maxPrice, minRating, onlyOfficial, sortBy]);

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
    setMinRating(null);
    setOnlyOfficial(false);
    setSortBy('popularity');
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24 font-sans text-slate-800 antialiased">

      {/* ================= INTERACTIVE AMAZING HERO CAROUSEL SLIDER ================= */}
      <div className="mx-auto max-w-[1400px] px-4 pt-4 mb-6">
        <div className="relative h-[260px] sm:h-[340px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-md group border border-slate-200">
          
          {/* Inner Slide Elements */}
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* High-Contrast Dark Layer Mask over real textures */}
              <div className="absolute inset-0 bg-linear-to-r from-emerald-950/90 via-emerald-900/70 to-transparent z-10" />
              <img
                src={slide.bgImage}
                alt={slide.title}
                className="w-full h-full object-cover object-center absolute inset-0"
              />
              
              {/* Animated Text Content Box */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 z-20 max-w-xl text-white">
                <span className="inline-block bg-emerald-500/30 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md mb-3 w-max">
                  {slide.badge}
                </span>
                <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xs sm:text-sm text-emerald-200 font-semibold mt-1.5 uppercase tracking-wider">
                  {slide.tagline}
                </p>
                <p className="text-slate-200 text-xs sm:text-sm mt-3 font-normal leading-relaxed hidden sm:block">
                  {slide.description}
                </p>
                <div className="mt-6 flex gap-3">
                  <button className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2">
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Order Bulk Supply</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Interactive Navigation Control Triggers */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-emerald-600/80 backdrop-blur-xs text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-emerald-600/80 backdrop-blur-xs text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Bottom Dot Nav Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  index === currentSlide ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= SEARCH SEARCH CONTROLS HERO HEADER ================= */}
      <div className="mx-auto max-w-[1400px] px-4 mb-4">
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search farm harvests, cash crops or agro-brands..."
              className="w-full pl-10 pr-4 py-2.5 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition-all text-slate-900 placeholder:text-slate-400 font-normal"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 bg-white cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
              <span>Filter Inputs</span>
            </button>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer focus:outline-hidden focus:border-emerald-600"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated Harvests</option>
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
                <Layers className="h-4 w-4 text-emerald-600" />
                <span>Produce Scope</span>
              </h3>
              <button 
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-slate-400 hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All</span>
              </button>
            </div>

            {/* Target Category Accordion Architecture */}
            <div className="space-y-1">
              <div className="rounded-lg overflow-hidden transition-all border border-slate-100 bg-slate-50/40">
                <div className="flex items-center justify-between w-full pr-2 bg-emerald-50/60 text-emerald-800">
                  <button
                    onClick={() => {
                      setActiveSubCategory('all');
                      setExpandedCategory(!expandedCategory);
                    }}
                    className="flex-1 text-left px-2.5 py-2.5 text-xs font-black flex items-center gap-2.5 transition-all cursor-pointer"
                  >
                    <span className="truncate">{TARGET_CATEGORY.label}</span>
                  </button>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-200 text-emerald-800">
                      {categoryCounts['total']}
                    </span>
                    <button 
                      onClick={() => setExpandedCategory(!expandedCategory)}
                      className="p-1 hover:bg-emerald-100 rounded-md cursor-pointer text-emerald-600"
                    >
                      {expandedCategory ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Unified Single Category Drawer Map */}
                {expandedCategory && (
                  <div className="bg-white border-l-2 border-emerald-600 ml-2 pl-3 py-2 pr-2 flex flex-col gap-1">
                    <button
                      onClick={() => setActiveSubCategory('all')}
                      className={`cursor-pointer text-left text-[11px] font-bold py-1 transition-all ${
                        activeSubCategory === 'all' 
                          ? 'text-emerald-600 font-extrabold underline' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      All Produce ({categoryCounts['total']})
                    </button>
                    {TARGET_CATEGORY.subCats.map((sub) => {
                      const subCount = categoryCounts[`sub:${sub}`] || 0;
                      return (
                        <button
                          key={sub}
                          onClick={() => setActiveSubCategory(sub)}
                          className={`cursor-pointer text-left text-[11px] py-1 flex items-center justify-between transition-colors ${
                            activeSubCategory === sub 
                              ? 'text-emerald-600 font-black' 
                              : 'text-slate-500 hover:text-slate-800 font-medium'
                          }`}
                        >
                          <span>{sub}</span>
                          <span className={`text-[9px] font-mono font-bold ${activeSubCategory === sub ? 'text-emerald-600' : 'text-slate-400'}`}>
                            ({subCount})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Official Store Check Box */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input 
                  type="checkbox"
                  checked={onlyOfficial}
                  onChange={(e) => setOnlyOfficial(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 fill-emerald-50" />
                  Official Aggregators Only
                </span>
              </label>
            </div>

            {/* Brand Filters Multi-Select Wrapper */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Agro Brand Pools</h4>
              <div className="max-h-36 overflow-y-auto no-scrollbar space-y-1.5 pr-1">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2.5 cursor-pointer group select-none">
                    <input 
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Windows Inputs Boundary */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Price Bracket (₦)</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 text-xs font-bold rounded-lg bg-slate-50 border border-slate-200 focus:outline-hidden focus:bg-white focus:border-emerald-600"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2 text-xs font-bold rounded-lg bg-slate-50 border border-slate-200 focus:outline-hidden focus:bg-white focus:border-emerald-600"
                />
              </div>
            </div>

          </aside>

          {/* ================= RIGHT MARKET GRID LIST CANVAS ================= */}
          <section className="md:col-span-3 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
              <p className="text-xs font-medium text-slate-500">
                Displaying <span className="font-bold text-slate-800">{recordMetrics.start}</span> - <span className="font-bold text-slate-800">{recordMetrics.end}</span> of <span className="font-black text-emerald-600">{recordMetrics.total}</span> agricultural items verified
              </p>
            </div>
            
            <ProductGrid
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onResetFilters={resetAllFilters}
              onViewDetails={(prod) => console.log('Details display triggered:', prod.id)}
            />
          </section>

        </div>
      </div>
    </div>
  );
}