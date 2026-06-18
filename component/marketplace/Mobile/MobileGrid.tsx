'use client';
import React from 'react';
import { Category } from '@/component/utils/types';
import { ReusableSearch } from '@/component/utils/search/ReusableSearch';

export const MobileGrid = ({ 
  categories, 
  onCategoryClick,
  onSearch,
  // searchQuery
}: { 
  categories: any[], 
  onCategoryClick: (cat: any) => void,
  onSearch: (query: string) => void
}) => (
  <div className="flex flex-col bg-[#FFFFFF] md:hidden">

  

    {/* Categories Grid */}
    <div className="grid grid-cols-2 gap-2 p-3">
      {categories.map((cat) => (
        <div 
          key={cat.id} 
          onClick={() => onCategoryClick(cat)}
          className="flex flex-col items-center justify-center gap-2 p-2 bg-[#FFFFFF] rounded-xl border border-slate-100 shadow-sm cursor-pointer active:bg-[#1877F2]/5 transition-all duration-200"
        >
          <img 
            src={cat.icon} 
            alt={cat.name} 
            className="w-14 h-14 object-contain" 
          />
          <p className="text-[10px] font-bold text-slate-800 leading-tight text-center">
            {cat.name}
          </p>
        </div>
      ))}
    </div>
  </div>
);