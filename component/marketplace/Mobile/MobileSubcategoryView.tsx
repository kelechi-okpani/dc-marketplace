'use client';
import React, { useMemo } from 'react';
import { Category } from '@/component/utils/types';
import { ChevronLeft } from 'lucide-react';
import { ReusableSearch } from '@/component/utils/search/ReusableSearch';

interface MobileSubcategoryViewProps {
  category: Category;
  onBack: () => void;
  onSelectSubcategory: (name: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string; // Add this prop
}

export const MobileSubcategoryView = ({ 
  category, 
  onBack,
  onSelectSubcategory,
  onSearch,
  searchQuery
}: MobileSubcategoryViewProps) => {

  // Logic to filter subcategories based on the search query
  const filteredSubcategories = useMemo(() => {
    if (!searchQuery.trim()) return category.subcategories;
    
    const lowerQuery = searchQuery.toLowerCase();
    return category.subcategories.filter((sub) => 
      sub.name.toLowerCase().includes(lowerQuery)
    );
  }, [category.subcategories, searchQuery]);
  

  return (
    <div className="fixed inset-0 bg-[#FFFFFF] z-50 md:hidden flex flex-col">
      {/* Header */}
      <div className="bg-[#FFFFFF] border-b border-slate-100 p-2 flex items-center gap-2">
        <button onClick={onBack} className="text-[#1877F2] p-2">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <ReusableSearch 
            onSearch={onSearch} 
            initialValue={searchQuery}
            placeholder={`Search in ${category.name}...`} 
          />
        </div>
      </div>

      {/* Subcategory List */}
      <div className="flex-1 overflow-y-auto">
        {filteredSubcategories.length > 0 ? (
          filteredSubcategories.map((sub) => (
            <button 
              key={sub.id} 
              onClick={() => {
                onSelectSubcategory(sub.name); 
                onBack(); 
              }}
              className="w-full text-left flex items-center gap-4 p-4 border-b border-slate-100 hover:bg-[#1877F2]/5 active:bg-[#1877F2]/10 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#1877F2]/5 rounded-lg shrink-0">
                <span className="text-2xl">{sub.icon || "📁"}</span>
              </div>
              
              <div className="flex flex-col">
                <p className="text-slate-800 text-base font-medium">{sub.name}</p>
                <p className="text-slate-400 text-sm font-semibold">
                  {sub.count.toLocaleString()} ads
                </p>
              </div>
            </button>
          ))
        ) : (
          <div className="p-10 text-center text-slate-400 text-sm">
            No subcategories found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};