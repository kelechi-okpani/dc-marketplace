'use client';
import React, { useState, useMemo } from 'react';
import ProductGrid from './ProductGrid';
import { Products } from '@/component/utils/data/data';
import { ProductSectionProps } from '@/component/utils/types';


export default function ProductSection({ selectedCategory, selectedSubCategory, searchQuery }: ProductSectionProps) {
  // Use state only if you still need pagination internally
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // 3. Use props in your filtering logic
  const filteredProducts = useMemo(() => {
    let data = Products;
    
    if (selectedCategory) {
      data = data.filter((p) => p.category === selectedCategory);
    }
    if (selectedSubCategory) {
      data = data.filter((p) => p.subCategory === selectedSubCategory);
    }

    // New: Filter by search query
  if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      data = data.filter((p) => 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    
    return data;
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <section className="container mx-auto px-1">
      <ProductGrid
        products={paginatedProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onResetFilters={() => { setCurrentPage(1)}}
      />
    </section>
  );
}