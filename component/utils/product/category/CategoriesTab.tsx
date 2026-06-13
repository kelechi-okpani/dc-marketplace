'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mainCategories } from '../../data/mockProducts';

// Explicitly typing based on your array structure
interface CategoryItem {
  id: string;
  label: string;
  subCats: string[];
}

const CATEGORY_IMAGE_REGISTRY: Record<string, string> = {
  'official-store': '/categories/office.jpg',
  'agric-farm-produce': '/categories/farm.jpg',
  'books': '/categories/books.jpg',
  'appliances': '/categories/appliances.jpg',
  'phones-tablets': '/categories/phones.jpg',
  'health-beauty': '/categories/beauty.jpg',
  'home-office': '/categories/home.webp',
  'electronics': '/categories/electronics.jpg',
  'fashion': '/categories/fashion.jpg',
  'supermarket': '/categories/supermarket.png',
  'computing': '/categories/computing.jpg',
  'baby-products': '/categories/baby.jpg',
  'gaming': '/categories/gaming.jpg',
  'other-categories': '/categories/deals.jpg',
};

const FALLBACK_IMAGE = '/categories/fallback.png';

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
    <div className="w-full  py-6 px-4 md:px-8 select-none font-sans border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto relative group">
        
        {/* Title Section */}
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
            Categories
          </h2>
        </div>
        
        {/* Navigation Arrow Left - Changes to emerald focus on hover */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="absolute left-[-16px] top-[calc(50%+14px)] -translate-y-1/2 z-20 bg-slate-950/40 hover:bg-emerald-600 text-white p-2.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 backdrop-blur-xs hidden md:flex items-center justify-center cursor-pointer border border-white/10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
        </button>

        {/* Scaled Slider Rail for Full-Bleed square cards */}
        <div
          ref={sliderRef}
          className="bg-white px-4 flex items-start gap-3 sm:gap-4 rounded-lg overflow-x-auto scroll-smooth pb-3 pt-1 no-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {mainCategories.map((cat) => {
            const imageSrc = CATEGORY_IMAGE_REGISTRY[cat.id] || FALLBACK_IMAGE;
            const isSelected = activeCategoryId === cat.id;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="flex flex-col items-center text-center space-y-4 shrink-0 w-[115px] xs:w-[135px] sm:w-[148px] md:w-[160px] group/item focus:outline-hidden"
              >
                {/* Square Container Edge-to-Edge Imagery Layout */}
                <div 
                  className={`w-full aspect-square rounded-xl overflow-hidden bg-slate-50 border transition-all duration-300 
                    ${isSelected 
                      ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-md scale-[1.02]' 
                      : 'border-slate-100 group-hover/item:border-emerald-300 group-hover/item:shadow-xs'
                    }`}
                >
                  <img 
                    src={imageSrc} 
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/item:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                  />
                </div>

                {/* Exact Text Label System */}
                <span 
                  className={`text-[12px] sm:text-[13px] leading-tight px-1 font-bold  max-w-full break-words line-clamp-2 transition-colors duration-200
                    ${isSelected 
                      ? 'text-emerald-700 font-bold' 
                      : 'text-slate-800  group-hover/item:text-emerald-600 font-bold'
                    }`}
                >
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Navigation Arrow Right - Changes to emerald focus on hover */}
        <button
          type="button"
          onClick={() => scroll('right')}
          className="absolute right-[-16px] top-[calc(50%+14px)] -translate-y-1/2 z-20 bg-slate-950/40 hover:bg-emerald-600 text-white p-2.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 backdrop-blur-xs hidden md:flex items-center justify-center cursor-pointer border border-white/10"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 stroke-[2.5]" />
        </button>

      </div>
    </div>
  );
}