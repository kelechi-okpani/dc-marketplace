'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Store, Refrigerator, Smartphone, Sparkles, Home, Tv, 
  Shirt, Apple, Monitor, Baby, Gamepad2, Layers,
  ChevronLeft, ChevronRight, LucideIcon
} from 'lucide-react';
import { mainCategories } from '../../data/mockProducts';

const ICON_REGISTRY: Record<string, LucideIcon> = {
  'official-store': Store,
  'appliances': Refrigerator,
  'phones-tablets': Smartphone,
  'health-beauty': Sparkles,
  'home-office': Home,
  'electronics': Tv,
  'fashion': Shirt,
  'supermarket': Apple,
  'computing': Monitor,
  'baby-products': Baby,
  'gaming': Gamepad2,
  'other-categories': Layers,
};

export default function CategoriesTab() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const activeCategoryId = typeof params?.id === 'string' ? params.id : null;

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mt-6 bg-white py-2 xs:py-3 px-3 sm:px-6 w-full select-none font-sans border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto relative group">
        
        {/* Responsive Arrow: Left Controls */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="absolute left-[-12px] md:left-[-16px] top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-slate-900 text-white p-1.5 md:p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 backdrop-blur-xs hidden md:block cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
        </button>

        {/* Dynamic Multi-screen Scroller Framework */}
        <div
          ref={sliderRef}
          className="flex items-start gap-2.5 xs:gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pt-1 px-0.5 no-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {mainCategories.map((cat) => {
            const IconComponent = ICON_REGISTRY[cat.id] || Layers;
            const isSelected = activeCategoryId === cat.id;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="flex flex-col items-center text-center space-y-1 xs:space-y-1.5 snap-start shrink-0 w-[72px] xs:w-[84px] sm:w-[96px] md:w-[104px] group/item focus:outline-hidden"
              >
                {/* Fluid Adaptive Icon Circle/Frame */}
                <div 
                  className={`w-14 h-14 xs:w-16 h-16 sm:w-18 sm:h-18 md:w-19 md:h-19 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-200 transform group-hover/item:scale-102 group-active/item:scale-98 relative overflow-hidden
                    ${isSelected 
                      ? 'bg-blue-600 text-white shadow-xs shadow-blue-600/10' 
                      : 'bg-[#f8fafc] border border-slate-100 text-slate-700 group-hover/item:bg-slate-50 group-hover/item:border-slate-200 group-hover/item:shadow-xs'
                    }`}
                >
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 mix-blend-overlay" />
                  )}
                  
                  <IconComponent 
                    className={`h-5 w-5 xs:h-6 w-6 md:h-7 md:w-7 transition-transform duration-200 group-hover/item:rotate-2 ${
                      isSelected ? 'text-white' : 'text-slate-500 group-hover/item:text-slate-800'
                    }`} 
                  />
                </div>

                {/* Highly Scalable Typography System */}
                <span 
                  className={`text-[10px] xs:text-[11px] font-bold leading-tight px-0.5 tracking-tight max-w-full break-words line-clamp-2 transition-colors duration-150
                    ${isSelected ? 'text-blue-600 font-extrabold' : 'text-slate-600 group-hover/item:text-slate-900'}`}
                >
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Responsive Arrow: Right Controls */}
        <button
          type="button"
          onClick={() => scroll('right')}
          className="absolute right-[-12px] md:right-[-16px] top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-slate-900 text-white p-1.5 md:p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 backdrop-blur-xs hidden md:block cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4 stroke-[2.5]" />
        </button>

      </div>
    </div>
  );
}