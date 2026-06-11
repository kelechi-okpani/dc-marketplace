'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Store } from 'lucide-react';

export interface ProductItem {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  brandBadgeUrl?: string; 
  officialStoreBadge?: boolean; 
  extraBadgeText?: string; 
}

interface ProductDealCarouselProps {
  title: string;
  storeId: string; // Required for dynamic target routing
  products: ProductItem[];
  headerBgColor?: string; 
}

export default function ProductDealCarousel({
  title,
  storeId,
  products,
  headerBgColor = 'bg-blue-600' 
}: ProductDealCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-NG').format(val);
  
  const getDiscount = (p: number, o?: number) => {
    if (o && o > p) {
      return `-${Math.round(((o - p) / o) * 100)}%`;
    }
    return null;
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = (176 + 12) * 2; 
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Centralized router hook execution
  const navigateToStore = () => {
    router.push(`/merchant/${storeId}`);
  };

  return (
    <div className="w-full rounded-md overflow-hidden pb-3 mt-4">
      
      {/* ================= BAR HEADER ================= */}
      {/* Clicking the header bar will now automatically take the user to that specific store */}
      <div 
        onClick={navigateToStore}
        className={`${headerBgColor} px-4 py-2.5 flex items-center justify-between text-white select-none cursor-pointer hover:opacity-95 transition-opacity`}
      >
        <h2 className="text-sm sm:text-base font-medium tracking-normal flex items-center gap-2">
          <Store className="h-4 w-4" /> {title}
        </h2>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevents double firing the parent div's onClick
            navigateToStore();
          }}
          className="text-xs font-semibold uppercase tracking-wider flex items-center gap-0.5 hover:underline decoration-2 underline-offset-2 transition-all cursor-pointer"
        >
          See All <ChevronRight className="h-4 w-4 stroke-[3]" />
        </button>
      </div>

      {/* ================= SCROLL TRACK ================= */}
      <div className="relative p-2 group">
        
        {/* Navigation Arrows */}
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 border border-slate-200 p-2 rounded-full text-slate-800 shadow-lg hover:bg-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
        </button>
        
        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 border border-slate-200 p-2 rounded-full text-slate-800 shadow-lg hover:bg-white transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll Right"
        >
          <ChevronRight className="h-5 w-5 stroke-[2.5]" />
        </button>

        {/* Horizontal Card Runner Grid */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 h-full overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-4 py-1"
        >
          {products.map((product) => {
            const discount = getDiscount(product.price, product.oldPrice);
            
            return (
              <div 
                key={product.id}
                className="w-[180px] sm:w-[196px] min-h-[300px] sm:min-h-[320px] shrink-0 bg-white p-2.5 rounded-sm shadow-lg hover:shadow-md transition-all snap-start flex flex-col justify-between group/card"
              >
                {/* Visual Canvas Framing */}
                <div className="relative h-[150px] sm:h-[170px] w-full bg-white overflow-hidden mb-2 select-none shrink-0">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-contain "
                  />
                  
                  {/* Brand Asset Logo Overlay */}
                  {product.brandBadgeUrl && (
                    <div className="absolute top-0 left-0 bg-white/80 p-0.5 rounded-br-xs">
                      <img 
                        src={product.brandBadgeUrl} 
                        alt="brand"
                        className="h-4 object-contain"
                      />
                    </div>
                  )}

                  {/* Official Store Badge Banner Ribbon */}
                  {product.officialStoreBadge && !product.brandBadgeUrl && (
                    <span className="absolute top-0 left-0 bg-[#18356B] text-white text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-br-xs">
                      Official Store
                    </span>
                  )}

                  {/* Dynamic Calculated Percentage Box */}
                  {discount && (
                    <span className="absolute top-0 right-0 bg-[#FFF2E6] text-[#F6921E] text-[11px] font-bold px-1.5 py-0.5 rounded-bl-sm">
                      {discount}
                    </span>
                  )}

                  {/* Product Specification Marker Overlay */}
                  {product.extraBadgeText && (
                    <span className="absolute bottom-1 right-1 bg-slate-900/90 text-white text-[9px] font-black tracking-wide px-1 rounded-xs">
                      {product.extraBadgeText}
                    </span>
                  )}
                </div>

                {/* Typography Matrix & Price Layout */}
                <div className="space-y-2 text-left flex-1 flex flex-col justify-between pt-1">
                  <h3 className="text-xs text-slate-700 font-normal line-clamp-3 leading-tight min-h-[2.5rem]">
                    {product.title}
                  </h3>
                  
                  <div className="space-y-1">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₦ {formatCurrency(product.price)}
                      </p>
                      {product.oldPrice && (
                        <p className="text-[11px] text-slate-400 line-through font-normal">
                          ₦ {formatCurrency(product.oldPrice)}
                        </p>
                      )}
                    </div>

                    {/* Quick Link: Action text button at bottom of card context */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToStore();
                      }}
                      className="w-full mt-1 border border-slate-200 text-[10px] uppercase font-bold tracking-wider text-slate-600 py-1 rounded-xs hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer block text-center"
                    >
                      Visit Store
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}