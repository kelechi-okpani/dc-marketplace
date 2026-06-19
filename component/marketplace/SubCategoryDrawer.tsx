'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // 1. Import router
import { ChevronRight } from 'lucide-react';
import { SubcategoryDrawerProps } from "../utils/types";

export const SubcategoryDrawer = ({ 
  category, 
  onMouseLeave, 
  onSelectSubcategory, 
  activeSub 
}: SubcategoryDrawerProps) => {
  
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // 2. Initialize router

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onMouseLeave();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onMouseLeave]);

  // 3. Handle selection and navigation
  const handleSelect = (name: string) => {
    onSelectSubcategory(name);
    router.push(`/categories/${encodeURIComponent(name)}`);
  };

  return (
    <div 
      ref={drawerRef}
      className="absolute left-60  top-0 w-72  h-[90vh] rounded-2xl bg-white shadow-lg z-10 border-l border-slate-100 animate-in slide-in-from-left-2 duration-300 overflow-y-auto scrollbar-thin"
      onMouseLeave={onMouseLeave}
    >
      <div>
        {category.subcategories.map((sub) => (
          <button 
            key={sub.id}
            onClick={() => handleSelect(sub.name)} // 4. Use the handler
            className="cursor-pointer w-full text-left group flex items-center justify-between py-3 px-4 transition-all duration-200 hover:bg-blue-50 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
                {sub.icon || <span className="text-[10px] font-bold">#</span>}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                  {sub.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                  {sub.count.toLocaleString()} ads
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};
