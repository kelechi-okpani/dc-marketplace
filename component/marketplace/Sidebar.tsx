
'use client';
import React, { useMemo } from 'react';
import { Category } from "../utils/types";
import { useRouter } from 'next/navigation';


export const Sidebar = ({ 
  searchQuery, 
  categories, 
  onMouseEnter, 
  onSelect, // New prop
  activeId 
}: { 
  searchQuery: string,
  categories: Category[], 
  onMouseEnter: (cat: Category) => void, 
  onSelect: (cat: Category) => void, // Added type definition
  activeId: number | null 
}) => {


  const router = useRouter();
  // Keep the filtering logic so search works
  const filteredCategories = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') return categories;
    return categories.filter((cat) => 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);


    const handleCategoryClick = (cat: Category) => {
    onSelect(cat); 
    router.push(`/categories/${encodeURIComponent(cat.name)}`); 
  };

  return (
    <div className="w-60 bg-white border-r border-slate-100 h-full hidden md:flex flex-col">
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat) => (
          <div
            key={cat.id}
            onMouseEnter={() => onMouseEnter(cat)}
            onClick={() => handleCategoryClick(cat)}
            // onClick={() => onSelect(cat)} // Trigger selection on click
            className={`group px-2 py-4 cursor-pointer flex justify-between items-center transition-all duration-200 border-b border-gray-200 ${
              activeId === cat.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <img 
                src={cat.icon} 
                alt={cat.name} 
                className="w-8 h-8 object-contain" 
              />
              <div>
                <p className={`text-xs font-bold ${activeId === cat.id ? 'text-blue-600' : 'text-slate-700'}`}>
                  {cat.name}
                </p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  {cat.totalItems.toLocaleString()} ads
                </p>
              </div>
            </div>
            <span className={`transition-transform duration-200 text-2xl ${activeId === cat.id ? 'translate-x-1 text-blue-500' : 'text-slate-300'}`}>
              ›
            </span>
          </div>
        ))
      ) : (
        <div className="p-4 text-center">
          <p className="text-xs text-slate-400">No results for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};
