
'use client';
import React, { useMemo, useRef } from 'react';
import { Category } from "../utils/types";
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';


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
  const scrollRef = useRef<HTMLDivElement>(null);

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


    const scrollCarousel = (direction: 'up' | 'down') => {
    if (scrollRef.current) {
      const scrollAmount = 250; // Adjust this to match roughly 3-4 items height
      scrollRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };



  return (
<div className="relative w-70 h-[90vh] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col">      {/* Up Button */}
      <button 
        onClick={() => scrollCarousel('up')}
        className="w-full h-8 flex items-center justify-center bg-white hover:bg-slate-50 border-b border-slate-100 z-10 transition-colors"
      >
        <ChevronUp size={16} className="text-slate-400" />
      </button>

      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-hidden scrollbar-hide"
      >
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <div
              key={cat.id}
              onMouseEnter={() => onMouseEnter(cat)}
              onClick={() => handleCategoryClick(cat)}
              className={`group px-2 py-4 cursor-pointer flex justify-between items-center transition-all duration-200 border-b border-gray-200 ${
                activeId === cat.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={cat.icon} alt={cat.name} className="w-10 h-9 object-contain" />
                <div>
                  <p className={`text-xs font-bold ${activeId === cat.id ? 'text-blue-600' : 'text-slate-700'}`}>
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {cat.totalItems.toLocaleString()} ads
                  </p>
                </div>
              </div>
              <span className={`transition-transform duration-200 text-3xl font-bold ${activeId === cat.id ? 'translate-x-1 text-blue-500' : 'text-slate-300'}`}>
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

      {/* Down Button */}
      <button 
        onClick={() => scrollCarousel('down')}
        className="w-full h-8 flex items-center justify-center bg-white hover:bg-slate-50 border-t border-slate-100 z-10 transition-colors"
      >
        <ChevronDown size={16} className="text-slate-400" />
      </button>
    </div>


    // <div className="w-70 bg-white shadow-lg border border-slate-100 h-full hidden md:flex flex-col">
    //   {filteredCategories.length > 0 ? (
    //     filteredCategories.map((cat) => (
    //       <div
    //         key={cat.id}
    //         onMouseEnter={() => onMouseEnter(cat)}
    //         onClick={() => handleCategoryClick(cat)}
    //         // onClick={() => onSelect(cat)} // Trigger selection on click
    //         className={`group px-2 py-4 cursor-pointer flex justify-between items-center transition-all duration-200 border-b border-gray-200 ${
    //           activeId === cat.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
    //         }`}
    //       >
    //         <div className="flex items-center gap-3">
    //           <img 
    //             src={cat.icon} 
    //             alt={cat.name} 
    //             className="w-9 h-9 object-contain" 
    //           />
    //           <div>
    //             <p className={`text-xs font-bold ${activeId === cat.id ? 'text-blue-600' : 'text-slate-700'}`}>
    //               {cat.name}
    //             </p>
    //             <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
    //               {cat.totalItems.toLocaleString()} ads
    //             </p>
    //           </div>
    //         </div>
    //         <span className={`transition-transform duration-200 text-2xl ${activeId === cat.id ? 'translate-x-1 text-blue-500' : 'text-slate-300'}`}>
    //           ›
    //         </span>
    //       </div>
    //     ))
    //   ) : (
    //     <div className="p-4 text-center">
    //       <p className="text-xs text-slate-400">No results for "{searchQuery}"</p>
    //     </div>
    //   )}
    // </div>
  );
};
