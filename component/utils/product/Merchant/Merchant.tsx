'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Store, ArrowRight } from 'lucide-react';

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
  storeId: string; 
  products: ProductItem[];
  // Extended configuration fallback for premium custom themes
  gradientTheme?: 'blue' | 'orange' | 'purple' | 'emerald' | 'rose' | 'amber';
}

const THEME_MAP = {
  blue: { header: 'from-blue-600 via-blue-700 to-indigo-800', border: 'hover:border-blue-500/40', badge: 'bg-blue-600' },
  orange: { header: 'from-orange-500 via-orange-600 to-red-600', border: 'hover:border-orange-500/40', badge: 'bg-orange-600' },
  purple: { header: 'from-purple-600 via-purple-700 to-fuchsia-800', border: 'hover:border-purple-500/40', badge: 'bg-purple-600' },
  emerald: { header: 'from-emerald-600 via-emerald-700 to-teal-800', border: 'hover:border-emerald-500/40', badge: 'bg-emerald-600' },
  rose: { header: 'from-rose-500 via-rose-600 to-pink-600', border: 'hover:border-rose-500/40', badge: 'bg-rose-600' },
  amber: { header: 'from-amber-500 via-amber-600 to-orange-600', border: 'hover:border-amber-500/40', badge: 'bg-amber-600' }
};

export default function ProductDealCarousel({
  title,
  storeId,
  products,
  gradientTheme = 'blue'
}: ProductDealCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const activeTheme = THEME_MAP[gradientTheme] || THEME_MAP.blue;

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-NG').format(val);
  
  const getDiscount = (p: number, o?: number) => {
    if (o && o > p) {
      return `-${Math.round(((o - p) / o) * 100)}%`;
    }
    return null;
  };

  // Dynamically toggle visibility weights of overlay arrows
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Run once on assembly to handle viewport limitations
      checkScrollPosition();
    }
    return () => container?.removeEventListener('scroll', checkScrollPosition);
  }, [products]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Dynamic sliding based on immediate width metrics
    const scrollAmount = container.clientWidth * 0.75; 
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const navigateToStore = () => {
    router.push(`/merchant/${storeId}`);
  };

  return (
    <div className="w-full rounded-lg overflow-hidden bg-slate-50/40 border border-slate-100/80 shadow-2xs mt-6">
      
      {/* ================= HIGH CONTRAST GRADIENT BAR HEADER ================= */}
      <div 
        onClick={navigateToStore}
        className={`bg-gradient-to-r ${activeTheme.header} px-5 py-3.5 flex items-center justify-between text-white select-none cursor-pointer group/header relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent)] pointer-events-none" />
        
        <h2 className="text-sm sm:text-base font-bold tracking-tight flex items-center gap-2.5 z-10">
          <div className="p-1.5 rounded-lg bg-white/15 backdrop-blur-xs shadow-inner">
            <Store className="h-4 w-4 text-white" />
          </div>
          {title}
        </h2>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigateToStore();
          }}
          className="z-10 text-xs font-bold uppercase tracking-wider flex items-center gap-1 bg-white/10 hover:bg-white text-white hover:text-slate-900 px-3 py-1.5 rounded-full backdrop-blur-xs transition-all duration-300 transform group-hover/header:translate-x-0.5 shadow-2xs cursor-pointer"
        >
          See All 
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/header:translate-x-0.5" />
        </button>
      </div>

      {/* ================= SCROLL TRACK RUNNER ================= */}
      <div className="relative p-3 group">
        
        {/* Smart Toggle Arrow Left */}
        <button 
          onClick={() => handleScroll('left')}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/90 text-white p-2.5 rounded-full shadow-xl hover:bg-slate-950 transition-all cursor-pointer border border-white/10 ${
            canScrollLeft ? 'opacity-0 group-hover:opacity-100 flex items-center justify-center' : 'hidden'
          }`}
          aria-label="Scroll Left"
        >
          <ChevronLeft className="h-4 w-4 stroke-[3]" />
        </button>
        
        {/* Smart Toggle Arrow Right */}
        <button 
          onClick={() => handleScroll('right')}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/90 text-white p-2.5 rounded-full shadow-xl hover:bg-slate-950 transition-all cursor-pointer border border-white/10 ${
            canScrollRight ? 'opacity-0 group-hover:opacity-100 flex items-center justify-center' : 'hidden'
          }`}
          aria-label="Scroll Right"
        >
          <ChevronRight className="h-4 w-4 stroke-[3]" />
        </button>

        {/* Horizontal Slider Rail */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-3.5 h-full overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-2 py-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {products.map((product) => {
            const discount = getDiscount(product.price, product.oldPrice);
            
            return (
              <div 
                key={product.id}
                className={`w-[176px] sm:w-[192px] shrink-0 bg-white p-3 rounded-xl border border-slate-100/70 shadow-2xs transition-all duration-300 snap-start flex flex-col justify-between group/card hover:-translate-y-1 hover:shadow-md ${activeTheme.border}`}
              >
                {/* Image Canvas Box */}
                <div className="relative h-[150px] sm:h-[165px] w-full bg-linear-to-b from-slate-50/50 to-white overflow-hidden rounded-lg mb-3 select-none shrink-0 border border-slate-50 flex items-center justify-center">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-[88%] h-[88%] object-contain transition-transform duration-500 ease-out group-hover/card:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Brand Badge (Clean top-left tag) */}
                  {product.brandBadgeUrl && (
                    <div className="absolute top-1.5 left-1.5 bg-white/90 shadow-2xs p-1 rounded-md backdrop-blur-xs border border-slate-100">
                      <img 
                        src={product.brandBadgeUrl} 
                        alt="brand"
                        className="h-3.5 object-contain"
                      />
                    </div>
                  )}

                  {/* Official Store Badge Ribbon */}
                  {product.officialStoreBadge && !product.brandBadgeUrl && (
                    <span className="absolute top-1.5 left-1.5 bg-slate-900 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs">
                      Official
                    </span>
                  )}

                  {/* Vibrant Calculated Discount Badge */}
                  {discount && (
                    <span className="absolute top-1.5 right-1.5 bg-red-50 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-red-100/50">
                      {discount}
                    </span>
                  )}

                  {/* Dark Mode Overlay Spec Tag */}
                  {product.extraBadgeText && (
                    <span className="absolute bottom-1.5 right-1.5 bg-slate-900/90 text-white text-[9px] font-bold tracking-tight px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                      {product.extraBadgeText}
                    </span>
                  )}
                </div>

                {/* Typography Block */}
                <div className="space-y-3 text-left flex-1 flex flex-col justify-between">
                  <h3 className="text-xs text-slate-600 font-medium line-clamp-2 leading-snug tracking-tight group-hover/card:text-slate-900 transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-900 tracking-tight">
                        ₦ {formatCurrency(product.price)}
                      </p>
                      {product.oldPrice && (
                        <p className="text-[11px] text-slate-400 line-through font-medium">
                          ₦ {formatCurrency(product.oldPrice)}
                        </p>
                      )}
                    </div>

                    {/* Integrated CTA Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToStore();
                      }}
                      className={`w-full text-[10px] uppercase font-bold tracking-wider text-white py-2 rounded-lg transition-all duration-200 opacity-0 group-hover/card:opacity-100 shadow-2xs cursor-pointer text-center block ${activeTheme.badge}`}
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