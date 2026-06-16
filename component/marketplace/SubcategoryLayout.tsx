'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Filter, X, Search, Grid, List, ChevronRight } from 'lucide-react';
import { Product } from '@/component/utils/types';
import ProductGrid from './Product/ProductGrid';
import { CATEGORY_CONFIG, FilterConfig } from '../utils/search/filterConfig';
import {  getCategoryCardContext, getDynamicFiltersForSubcategory } from '../utils/search/Filters';
import SidebarContent from '../utils/search/SidebarFilter';


interface Props {
  initialProducts: Product[];
  subCategoryName: string;
}


export default function SubcategoryLayout({ initialProducts, subCategoryName }: Props) {

const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchInputs, setSearchInputs] = useState<Record<string, string>>({});
  const [currentSelection, setCurrentSelection] = useState(subCategoryName);

  // Sync state if URL param changes
  useEffect(() => {
    setCurrentSelection(subCategoryName);
  }, [subCategoryName]);

  // Derive context safely
  const categoryContext = useMemo(() => getCategoryCardContext(currentSelection), [currentSelection]);

  // Derived filters based on current selection
  // const filters = useMemo(() => getDynamicFiltersForSubcategory(currentSelection), [currentSelection]);

  
  // Inside SubcategoryLayout.tsx
const filters = useMemo(() => {
  return getDynamicFiltersForSubcategory(currentSelection, initialProducts);
}, [currentSelection, initialProducts]);

  // Reset filters when selection changes
  useEffect(() => {
    setActiveFilters({});
    setPriceRange({ min: '', max: '' });
    setSearchInputs({});
  }, [currentSelection]);

  const handleFilterChange = (filterId: string, value: string, type: FilterConfig['type']) => {
    setActiveFilters((prev) => {
      const current = prev[filterId] || [];
      if (type === 'radio') return { ...prev, [filterId]: current.includes(value) ? [] : [value] };
      return {
        ...prev,
        [filterId]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      };
    });
  };

  const filteredProducts = useMemo(() => {
    const target = currentSelection.toLowerCase();
    
    return initialProducts.filter((product) => {
      const pCat = (product.category || "").toLowerCase();
      const pSub = (product.subCategory || "").toLowerCase();

      // Ensure match against Category or SubCategory
      if (pCat !== target && pSub !== target) return false;

      if (priceRange.min && product.price < Number(priceRange.min)) return false;
      if (priceRange.max && product.price > Number(priceRange.max)) return false;

      for (const [filterId, selectedValues] of Object.entries(activeFilters)) {
        if (selectedValues.length === 0) continue;
        const productValue = String((product as any)[filterId] || "").toLowerCase();
        // if (!selectedValues.some(v => v.toLowerCase() === productValue)) return false;
        // Check if any of the selected values (also trimmed/lowered) match
        if (!selectedValues.some(v => v.trim().toLowerCase() === productValue)) return false;
      }
      return true;
    });
  }, [initialProducts, currentSelection, activeFilters, priceRange]);

  const primaryQuickFilter = useMemo(() => {
    return filters.find(f => f.type !== 'range') || filters[0];
  }, [filters]);

  const sharedSidebarProps = {
    categoryConfig: CATEGORY_CONFIG, 
     currentSelection, 


    categoryContext,
    filters,
    activeFilters,
    priceRange,
    searchInputs,
    setPriceRange,
    setSearchInputs,
    handleFilterChange,
    setIsMobileFilterOpen,
    onSubCategorySelect: setCurrentSelection,
  };

  console.log(primaryQuickFilter, "primaryQuickFilter...")


  return (
    <div className="flex flex-col md:flex-row gap-5 items-start w-full px-4 pt-6">

      {/* Mobile Top Header Display Card */}
      <div className="w-full flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200/80 shadow-sm md:hidden pt-2">
        <div>
          {/* <h4 className="font-bold text-slate-900 text-sm tracking-tight">{currentSelection}</h4> */}
          <p className="text-[10px] font-medium text-slate-400 mt-0.5">Total: {filteredProducts.length} items found</p>
        </div>

        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-white bg-[#1877F2] hover:bg-[#166FE5] px-3.5 py-2 rounded-lg transition-all shadow-sm active:scale-95"
        >
          <Filter size={14} className="stroke-[2.5]" /> Filters
        </button>
      </div>

      {/* Fixed Sticky Left Sidebar Area (Desktop) */}
      <aside className="hidden md:flex flex-col gap-4 w-64 shrink-0 sticky top-4">
        <SidebarContent {...sharedSidebarProps} />
      </aside>

      {/* Drawer Overlay Slide Layer (Mobile View Only) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden flex justify-start backdrop-blur-xs transition-opacity duration-300">
          <aside className="w-[85%] max-w-[300px] bg-[#F2F4F7] h-full overflow-y-auto p-3.5 shadow-2xl flex flex-col">
            <SidebarContent {...sharedSidebarProps} />
          </aside>
          <div className="flex-1" onClick={() => setIsMobileFilterOpen(false)} />
        </div>
      )}

      {/* Main Stream Segment View Wrapper */}
      <main className="flex-1 w-full overflow-hidden">
        {/* Horizontal Quick Action Pills Navigation Bar */}
        {primaryQuickFilter && primaryQuickFilter.options && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none snap-x w-full">
            {primaryQuickFilter.options.map((opt) => {
              const isSelected = (activeFilters[primaryQuickFilter.id] || []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => handleFilterChange(primaryQuickFilter.id, opt.value, primaryQuickFilter.type)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl min-w-[98px] h-[84px] border transition-all duration-200 shrink-0 snap-center shadow-xs cursor-pointer select-none active:scale-95 ${
                    isSelected
                      ? 'border-[#1877F2] bg-[#E7F3FF] font-bold ring-1 ring-[#1877F2] text-[#1877F2]'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="text-xl mb-1.5 filter drop-shadow-xs">
                    {opt.icon || '📦'}
                  </span>
                  <span className={`text-[10px] tracking-tight text-center truncate w-full px-1 font-semibold ${
                    isSelected ? 'text-[#1877F2]' : 'text-slate-600'
                  }`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Action Header Display Banner (Desktop Layout Container) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm mb-4 hidden md:flex justify-between items-center">
          <div>
            {/* <h1 className="text-lg font-black text-slate-900 tracking-tight">{currentSubCategory} in Nigeria</h1> */}
            <p className="text-xs text-slate-400 font-medium mt-0.5">Showing {filteredProducts.length.toLocaleString()} verified listings</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 font-bold bg-slate-50 p-1.5 rounded-lg border border-slate-100">
            <span className="flex items-center gap-1.5 bg-white text-[#1877F2] px-2.5 py-1 rounded-md shadow-xs border border-slate-100">
              <Grid size={14} className="stroke-[2.5]" /> Grid
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 px-2 py-1 opacity-60 cursor-not-allowed">
              <List size={14} /> List
            </span>
          </div>
        </div>

        {/* Synchronized Output Result View Matrix */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-2 md:p-4 shadow-xs">
          <ProductGrid
            products={filteredProducts}
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
            onResetFilters={() => {
              setActiveFilters({});
              setPriceRange({ min: '', max: '' });
              setSearchInputs({});
            }}
          />
        </div>
      </main>
    </div>
  );
}

//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [filters, setFilters] = useState<FilterConfig[]>([]);
//   const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
//   const [priceRange, setPriceRange] = useState({ min: '', max: '' });
//   const [searchInputs, setSearchInputs] = useState<Record<string, string>>({});
  
//   // 1. ADDED: Internal tracking for the active subcategory filter state
//   const [currentSubCategory, setCurrentSubCategory] = useState(subCategoryName);

//   // Sync state if the initial server-side property shifts externally
//   useEffect(() => {
//     setCurrentSubCategory(subCategoryName);
//   }, [subCategoryName]);

//   // 2. MOVED: Tree menus and attributes lookup now target the active local state context
//   const categoryContext = useMemo(() => getCategoryCardContext(currentSubCategory), [currentSubCategory]);

//   useEffect(() => {
//     // setFilters(getDynamicFiltersForSubcategory(currentSubCategory));
//     setFilters(getDynamicFiltersForSubcategory(currentSubCategory));
//     setActiveFilters({});
//     setPriceRange({ min: '', max: '' });
//     setSearchInputs({});
//   }, [currentSubCategory]);

//   const handleFilterChange = (filterId: string, value: string, type: FilterConfig['type']) => {
//     setActiveFilters((prev) => {
//       const current = prev[filterId] || [];
//       if (type === 'radio') {
//         return { ...prev, [filterId]: current.includes(value) ? [] : [value] };
//       }
//       return {
//         ...prev,
//         [filterId]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
//       };
//     });
//   };

//   // 3. UPDATED: The client array filters products dynamically against the category state matching
//   // const filteredProducts = useMemo(() => {
//   //   return initialProducts.filter((product) => {
//   //     // Filter out products that don't match the active client-side subcategory selection
//   //     if (currentSubCategory && product.subCategory !== currentSubCategory) return false;

//   //     if (priceRange.min && product.price < Number(priceRange.min)) return false;
//   //     if (priceRange.max && product.price > Number(priceRange.max)) return false;

//   //     for (const [filterId, selectedValues] of Object.entries(activeFilters)) {
//   //       if (selectedValues.length === 0) continue;
//   //       const productValue = (product as Record<string, any>)[filterId];
//   //       if (productValue === undefined || productValue === null) return false;
//   //       if (!selectedValues.includes(String(productValue))) return false;
//   //     }
//   //     return true;
//   //   });
//   // }, [initialProducts, currentSubCategory, activeFilters, priceRange]);


//   const filteredProducts = useMemo(() => {
//   return initialProducts.filter((product) => {
//     // 1. Check if the selection is a parent category (e.g., "Vehicles") 
//     // OR a specific subcategory (e.g., "Cars")
//     const isMatch = product.subCategory === currentSubCategory || 
//                     product.category === currentSubCategory;

//     if (!isMatch) return false;

//     // 2. Price filters
//     if (priceRange.min && product.price < Number(priceRange.min)) return false;
//     if (priceRange.max && product.price > Number(priceRange.max)) return false;

//     // 3. Dynamic attribute filters
//     for (const [filterId, selectedValues] of Object.entries(activeFilters)) {
//       if (selectedValues.length === 0) continue;
//       const productValue = (product as Record<string, any>)[filterId];
//       if (productValue === undefined || productValue === null) return false;
//       if (!selectedValues.includes(String(productValue))) return false;
//     }
//     return true;
//   });
// }, [initialProducts, currentSubCategory, activeFilters, priceRange]);


//   const primaryQuickFilter = useMemo(() => {
//     const targetIds = [
//       'brand', 'bedrooms', 'furnishing', 'condition', 'item_condition', 
//       'industrial_condition', 'gender', 'beauty_type', 'service_tier', 
//       'age_bracket', 'job_type', 'experience_level'
//     ];
//     return (
//       filters.find((f) => targetIds.includes(f.id)) || 
//       filters.find((f) => f.type !== 'range') || 
//       filters[0]
//     );
//   }, [filters]);

//   const sharedSidebarProps = {
//     categoryContext,
//     filters,
//     activeFilters,
//     priceRange,
//     searchInputs,
//     setPriceRange,
//     setSearchInputs,
//     handleFilterChange,
//     setIsMobileFilterOpen,
//     onSubCategorySelect: setCurrentSubCategory, // Passing state mutator safely downwards
//   };
