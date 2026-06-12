'use client';

import { mockProducts } from '@/component/utils/data/mockProducts';
import ProductGrid from '@/component/utils/product/ProductGrid';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';


export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return mockProducts.filter((product) =>
      product.title.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.subCategory.toLowerCase().includes(q)
    );
  }, [query]);


  if (searchResults.length === 0) {
  return (
    <div className="text-center py-20">
      <h2 className="text-xl font-bold">
        No products found
      </h2>

      <p className="text-slate-500 mt-2">
        Try another search term.
      </p>
    </div>
  );
}


  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="bg-white border rounded-xl p-5 mb-6">
        <h1 className="text-2xl font-black text-slate-900">
          Search Results
        </h1>

        <p className="text-slate-500 mt-2">
          Found{" "}
          <span className="font-bold text-emerald-600">
            {searchResults.length}
          </span>{" "}
          products for "{query}"
        </p>
      </div>

      <ProductGrid
        products={searchResults}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        onResetFilters={() => {}}
        onViewDetails={(product) =>
          console.log(product.id)
        }
      />
    </div>
  );
}