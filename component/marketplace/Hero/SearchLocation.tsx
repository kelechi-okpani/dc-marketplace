'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, Grid, List } from 'lucide-react';
import { Product } from '@/component/utils/types';
import SidebarContent from '@/component/utils/search/SidebarFilter';
import ProductGrid from '@/component/marketplace/Product/ProductGrid';
import { CATEGORY_CONFIG, FilterConfig } from '@/component/utils/search/filterConfig';
import { getDynamicFiltersForSearch } from '@/component/utils/search/Filters';

interface Props {
  allProducts: Product[];
  subCategoryName: string;
}

export default function SearchLayout({ allProducts, subCategoryName }: Props) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const locationQuery = searchParams.get('location') || 'all';

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchInputs, setSearchInputs] = useState<Record<string, string>>({});  
  const [currentSelection, setCurrentSelection] = useState(subCategoryName);

  // Derived filters based on the global search context
//   const filters = useMemo(() => getDynamicFiltersForSearch(), []);

//   const filters = useMemo(() => getDynamicFiltersForSearch(allProducts))

//   const filters = useMemo(
//   () => getDynamicFiltersForSearch(allProducts),
//   [allProducts]
// );

  // 1. Target Category LogicrgetCategory, activeFilters, priceRange]);


//   const targetCategory = useMemo(() => {
//     const q = searchQuery.toLowerCase().trim();
//     if (!q) return null;

//     // Find the category/subcategory that best matches the search query
//     return Object.values(CATEGORY_CONFIG).find(group => 
//       group.parentName.toLowerCase().includes(q) || 
//       group.subcategories.some(sub => sub.name.toLowerCase().includes(q))
//     );
//   }, [searchQuery]);


  
  // 2. Comprehensive Filtering (Search + Category + Active Checkboxes + Price)
//   const filteredProducts = useMemo(() => {
//     return allProducts.filter((product) => {
//       const q = searchQuery.toLowerCase().trim();
      
//       // A. Match target category OR search terms
//       const matchesCategory = targetCategory ? product.categoryId === targetCategory.id : true;
//       const matchesSearch = !q || product.title.toLowerCase().includes(q) || product.brand.toLowerCase().includes(q);
      
//       if (!(matchesCategory && matchesSearch)) return false;

//       // B. Match Price Range
//       if (priceRange.min && product.price < Number(priceRange.min)) return false;
//       if (priceRange.max && product.price > Number(priceRange.max)) return false;

//       // C. Match Dynamic Filters (Brands, Subcategories, etc.)
//       const matchesFilters = Object.entries(activeFilters).every(
//             ([key, values]) => {
//                 if (!values.length) return true;

//                 const productValue = String(
//                 (product as any)[key] || ''
//                 ).toLowerCase();

//                 return values.some(
//                 value => value.toLowerCase() === productValue
//                 );
//             }
//             );

//       return matchesFilters;
//     });
//   }, [allProducts, searchQuery, ta




// const baseFilteredProducts = useMemo(() => {
//   const q = searchQuery.toLowerCase().trim();

//   return allProducts.filter((product) => {
//     const matchesSearch =
//       !q ||
//       product.title.toLowerCase().includes(q) ||
//       product.brand.toLowerCase().includes(q);

//     return matchesSearch;
//   });
// }, [allProducts, searchQuery]);


const baseFilteredProducts = useMemo(() => {
  const q = searchQuery.toLowerCase().trim();

  return allProducts.filter((product) => {
    return (
      !q ||
      product.title.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q)
    );
  });
}, [allProducts, searchQuery]);


const filteredProducts = useMemo(() => {
  return baseFilteredProducts.filter((product) => {
    if (priceRange.min && product.price < Number(priceRange.min)) return false;
    if (priceRange.max && product.price > Number(priceRange.max)) return false;

    // const matchesFilters = Object.entries(activeFilters).every(([key, values]) => {
    //   if (!values.length) return true;

    //   const productValue = String((product as any)[key] || '').toLowerCase();
    //   return values.some(v => v.toLowerCase() === productValue);
    // });

    // return matchesFilters;
  });
}, [baseFilteredProducts, activeFilters, priceRange]);


// const targetCategory = useMemo(() => {
//   if (!baseFilteredProducts.length) return null;

//   // Count category frequency from matched products
//   const freqMap: Record<number, number> = {};

//         baseFilteredProducts.forEach((p) => {
//             if (p.categoryId) {
//             freqMap[p.categoryId] = (freqMap[p.categoryId] || 0) + 1;
//             }
//         });

//   // Get most common category
//   const topCategoryId = Object.entries(freqMap)
//     .sort((a, b) => b[1] - a[1])[0]?.[0];

//   if (!topCategoryId) return null;

//   return Object.values(CATEGORY_CONFIG).find(
//     (c) => c.id === Number(topCategoryId)
//   );
// }, [baseFilteredProducts]);

const targetCategory = useMemo(() => {
  if (!baseFilteredProducts.length) return null;

  const freqMap: Record<number, number> = {};

  baseFilteredProducts.forEach((p) => {
    if (p.categoryId) {
      freqMap[p.categoryId] = (freqMap[p.categoryId] || 0) + 1;
    }
  });

  const topCategoryId = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  if (!topCategoryId) return null;

  return Object.values(CATEGORY_CONFIG).find(
    (c) => c.id === Number(topCategoryId)
  );
}, [baseFilteredProducts]);


const filters = useMemo(
  () => getDynamicFiltersForSearch(baseFilteredProducts),
  [baseFilteredProducts]
);


useEffect(() => {
  if (!targetCategory || !baseFilteredProducts.length) return;

  // pick most common subcategory
  const freq: Record<string, number> = {};

  baseFilteredProducts.forEach((p: any) => {
    if (p.subCategory) {
      freq[p.subCategory] = (freq[p.subCategory] || 0) + 1;
    }
  });

  const topSub = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  if (topSub) {
    setActiveFilters((prev) => ({
      ...prev,
      subCategory: [topSub.toLowerCase()],
    }));
  }
}, [targetCategory, baseFilteredProducts]);


  const handleFilterChange = (filterId: string, value: string, type: FilterConfig['type']) => {
    setActiveFilters((prev) => {
      const current = prev[filterId] || [];
      
      const updatedValues = type === 'radio' 
        ? [value] 
        : current.includes(value) ? current.filter((v) => v !== value) : [...current, value];

      return { ...prev, [filterId]: updatedValues };
    });
  };

  const sharedSidebarProps = {
    targetCategory, // <-- CRITICAL FIX: Passed this down so SidebarContent can use it
    categoryConfig: CATEGORY_CONFIG,
    currentSelection: searchQuery,
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

  return (
    <div className="flex flex-col md:flex-row gap-5 items-start w-full px-4 pt-6 max-w-7xl mx-auto">
      
      {/* Mobile Trigger */}
      <div className="w-full flex justify-between items-center bg-white p-3 rounded-lg border shadow-sm md:hidden">
        <p className="text-xs font-medium text-slate-500">{filteredProducts.length} results for "{searchQuery}"</p>
        <button onClick={() => setIsMobileFilterOpen(true)} className="bg-[#1877F2] text-white px-3 py-2 rounded-lg text-xs font-bold">
          <Filter size={14} className="inline mr-1" /> Filters
        </button>
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col gap-4 w-64 shrink-0 sticky top-4">
         <SidebarContent filteredProducts={filteredProducts} {...sharedSidebarProps}  />
      </aside>

      {/* Drawer Overlay Slide Layer (Mobile View Only) */}
            {isMobileFilterOpen && (
              <div className="fixed inset-0 bg-black/50 z-50 md:hidden flex justify-start backdrop-blur-xs transition-opacity duration-300">
                <aside className="w-[85%] max-w-[300px] bg-[#F2F4F7] h-full overflow-y-auto p-3.5 shadow-2xl flex flex-col">
                  <SidebarContent filteredProducts={filteredProducts} {...sharedSidebarProps} />
                </aside>
                <div className="flex-1" onClick={() => setIsMobileFilterOpen(false)} />
              </div>
            )}

      {/* Main Content */}
      <main className="flex-1 w-full overflow-hidden">
        <div className="bg-white p-4 rounded-xl border shadow-sm mb-4 hidden md:flex justify-between items-center">
          <div>
            <h1 className="text-lg font-black text-slate-900">Results for "{searchQuery}"</h1>
            <p className="text-xs text-slate-400">Showing {filteredProducts.length} listings in {locationQuery}</p>
          </div>
          <div className="flex items-center gap-2 border p-1 rounded-lg">
             <Grid size={16} className="text-[#1877F2]" />
             <List size={16} className="text-slate-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <ProductGrid
            products={filteredProducts}
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
            onResetFilters={() => {
              setActiveFilters({});
              setPriceRange({ min: '', max: '' });
            }}
          />
        </div>
      </main>
    </div>
  );
}
