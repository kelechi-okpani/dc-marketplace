'use client';
import React, { useEffect, useMemo, useState } from 'react';
import ProductGrid from '../utils/product/ProductGrid';
import FlashDealsMarquee from '../utils/product/FlashDealsMarquee';
import { mockProducts } from '../utils/data/mockProducts';
import ProductDealCarousel from '../utils/product/Merchant/Merchant';
import ServiceGrid_ from '../utils/service/ServiceGrid_';

export default function MarketplaceHome() {
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
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
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Main View Toggle Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 border-gray-200 pb-5 sm:flex-row">
          
          {/* Segmented Controller Tab Pill - Switched to Emerald Green theme */}
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-black/5">
            <button
              onClick={() => setActiveTab('products')}
              className={`cursor-pointer rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'products'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`cursor-pointer rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'services'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Services
            </button>
          </div>
         
        </div>

        {/* Dynamic Display Rendering */}
        {activeTab === 'products' ? (
          <div className="space-y-6">
            <ProductDealCarousel 
              title="Jessica Store" 
              products={paginatedProducts} 
              storeId="08y92y924" 
              gradientTheme="emerald"
            />   

            <FlashDealsMarquee />

            <ProductGrid
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onResetFilters={resetAllFilters}
              onViewDetails={(prod) => console.log('Details preview triggered:', prod.id)}
            /> 

            <FlashDealsMarquee />

            <ProductDealCarousel 
              title="Kelvin Electronics" 
              products={paginatedProducts} 
              storeId="08y92y924" 
              gradientTheme="emerald"
            />   
          </div>
        ) : (
          <ServiceGrid_ />
        )}
      </main>
    </div>
  );
}