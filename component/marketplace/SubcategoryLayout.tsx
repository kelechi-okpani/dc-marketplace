'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Product } from '@/component/utils/types';
import ProductGrid from './Product/ProductGrid';
import { CATEGORY_CONFIG, FilterConfig } from '../utils/search/filterConfig';
import { getDynamicFiltersForSubcategory } from '../utils/search/Filters';
import SidebarContent from '../utils/search/SidebarFilter';

interface Props {
  initialProducts: Product[];
  subCategoryName: string;
}

const normalize = (v: string) => v.toLowerCase().trim();

export default function SubcategoryLayout({
  initialProducts,
  subCategoryName,
}: Props) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchInputs, setSearchInputs] = useState<Record<string, string>>({});
  const [currentSelection, setCurrentSelection] = useState(subCategoryName);

  // Sync URL param change
  useEffect(() => {
    setCurrentSelection(subCategoryName);
  }, [subCategoryName]);

  // 🔥 Auto-detect dominant subCategory
  useEffect(() => {
    if (!initialProducts.length) return;

    const freq: Record<string, number> = {};

    initialProducts.forEach((p) => {
      if (p.subCategory) {
        const key = normalize(p.subCategory);
        freq[key] = (freq[key] || 0) + 1;
      }
    });

    const topSub = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])[0]?.[0];

    if (topSub) {
      setActiveFilters((prev) => ({
        ...prev,
        subCategory: [topSub],
      }));
    }
  }, [initialProducts]);

  // Sync active subCategory → currentSelection
  useEffect(() => {
    const activeSub = activeFilters.subCategory?.[0];
    if (activeSub) {
      setCurrentSelection(activeSub);
    }
  }, [activeFilters.subCategory]);

  // Filters config
  const filters = useMemo(
    () =>
      getDynamicFiltersForSubcategory(
        currentSelection,
        initialProducts
      ),
    [currentSelection, initialProducts]
  );

  // Category config
  const targetCategory = useMemo(() => {
    const target = normalize(currentSelection);
    if (!target) return null;

    return Object.values(CATEGORY_CONFIG).find(
      (group) =>
        normalize(group.parentName) === target ||
        group.subcategories.some(
          (sub) => normalize(sub.name) === target
        )
    );
  }, [currentSelection]);

  // // Reset filters (but preserve subCategory if auto-selected)
  // useEffect(() => {
  //   setActiveFilters((prev) => {
  //     const subCategory = prev.subCategory;
  //     return subCategory ? { subCategory } : {};
  //   });

  //   setPriceRange({ min: '', max: '' });
  //   setSearchInputs({});
  // }, [currentSelection]);

  // Handle filter changes
  const handleFilterChange = (
    filterId: string,
    value: string,
    type: FilterConfig['type']
  ) => {
    setActiveFilters((prev) => {
      const current = prev[filterId] || [];

      if (type === 'radio') {
        return {
          ...prev,
          [filterId]: current.includes(value) ? [] : [value],
        };
      }

      return {
        ...prev,
        [filterId]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  // 🔥 Product filtering (fully normalized)
  const filteredProducts = useMemo(() => {
    const target = normalize(currentSelection);

    return initialProducts.filter((product) => {
      const pCat = normalize(product.category || '');
      const pSub = normalize(product.subCategory || '');

      if (pCat !== target && pSub !== target) return false;

      if (priceRange.min && product.price < Number(priceRange.min))
        return false;
      if (priceRange.max && product.price > Number(priceRange.max))
        return false;

      for (const [filterId, selectedValues] of Object.entries(
        activeFilters
      )) {
        if (!selectedValues.length) continue;

        const productValue = normalize(
          String((product as any)[filterId] || '')
        );

        if (
          !selectedValues.some(
            (v) => normalize(v) === productValue
          )
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialProducts, currentSelection, activeFilters, priceRange]);

  const primaryQuickFilter = useMemo(() => {
    return filters.find((f) => f.type !== 'range') || filters[0];
  }, [filters]);

  const sharedSidebarProps = {
    targetCategory,
    categoryConfig: CATEGORY_CONFIG,
    currentSelection,
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
    <div className="flex flex-col md:flex-row gap-5 items-start w-full px-4 pt-6">

      {/* Mobile Header */}
      <div className="w-full flex justify-between items-center bg-white p-3 rounded-lg border shadow-sm md:hidden">
        <p className="text-[10px] text-slate-400">
          Total: {filteredProducts.length} items found
        </p>

        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-white bg-[#1877F2] px-3 py-2 rounded-lg"
        >
          <Filter size={14} /> Filters
        </button>
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col gap-4 w-64 sticky top-4">
        <SidebarContent
          filteredProducts={filteredProducts}
          {...sharedSidebarProps}
        />
      </aside>

      {/* Mobile Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden flex">
          <aside className="w-[85%] bg-[#F2F4F7] p-3 overflow-y-auto">
            <SidebarContent
              filteredProducts={filteredProducts}
              {...sharedSidebarProps}
            />
          </aside>
          <div
            className="flex-1"
            onClick={() => setIsMobileFilterOpen(false)}
          />
        </div>
      )}

      {/* Main */}
      <main className="flex-1">

        {/* Quick filters */}
        {primaryQuickFilter?.options && (
          <div className="flex gap-2 overflow-x-auto mb-3">
            {primaryQuickFilter.options.map((opt) => {
              const isSelected = (activeFilters[primaryQuickFilter.id] || []).includes(opt.value);

              return (
                <button
                  key={opt.value}
                  onClick={() =>
                    handleFilterChange(
                      primaryQuickFilter.id,
                      opt.value,
                      primaryQuickFilter.type
                    )
                  }
                  className={`p-2 rounded-lg border ${
                    isSelected
                      ? 'bg-blue-100 border-blue-500 text-blue-600'
                      : 'bg-white'
                  }`}
                >
                  {opt.icon || '📦'} {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Header */}
        <div className="bg-white p-4 rounded-xl border mb-4 hidden md:flex justify-between">
          <p className="text-xs text-slate-400">
            Showing {filteredProducts.length.toLocaleString()} listings
          </p>

          <div className="flex gap-2 text-xs">
            <span className="text-blue-600 flex items-center gap-1">
              <Grid size={14} /> Grid
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <List size={14} /> List
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="bg-white rounded-xl border p-3 md:p-4">
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
