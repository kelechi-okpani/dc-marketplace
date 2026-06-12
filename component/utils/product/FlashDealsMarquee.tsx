'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashProduct {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  category: string;
  subCategory?: string;
  brand?: string;
}

export default function FlashDealsMarquee() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Synced with structural product database matching production dynamic asset bucket topology
  const products: FlashProduct[] = [
    { 
      id: '1', 
      title: 'Samsung Galaxy S24 Ultra Phone (256GB, Titanium Gray)', 
      price: 1250000, 
      oldPrice: 1500000,
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&h=400&q=80', 
      category: 'phones-tablets',
      subCategory: 'Mobile Phones'
    },
    { 
      id: '3', 
      title: 'Oraimo Traveler 4 20000mAh Power Bank Fast Charging', 
      price: 24500, 
      oldPrice: 32000,
      imageUrl: 'https://images.unsplash.com/photo-1609592424083-040203f196a6?auto=format&fit=crop&w=400&h=400&q=80', 
      category: 'phones-tablets',
      subCategory: 'Power Banks'
    },
    { 
      id: '16', 
      title: 'Oraimo FreePods 4 TWS True Wireless Stereo Earbuds', 
      price: 36000, 
      oldPrice: 45000,
      imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&h=400&q=80', 
      category: 'electronics',
      subCategory: 'Audio Gear'
    },
    { 
      id: '26', 
      title: 'Men Casual Slim-Fit Structured Button Up Shirt', 
      price: 14500, 
      oldPrice: 22000,
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&h=400&q=80', 
      category: 'fashion', 
      subCategory: 'Mens Fashion'
    },
    { 
      id: '28', 
      title: 'Premium Cashmere Senator Soft Plain Fabric Material (4 Yards)', 
      price: 28000, 
      oldPrice: 35000,
      imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&h=400&q=80', 
      category: 'fashion', 
      subCategory: 'Fabrics'
    },
    { 
      id: '38', 
      title: 'Nivea Perfect & Radiant Even Tone Day Cream SPF 15', 
      price: 6800, 
      oldPrice: 8500,
      imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=400&h=400&q=80', 
      category: 'health-beauty', 
      subCategory: 'Skin Care'
    }
  ];

  // Triplicating array constructs a perfectly continuous visual cycle loop boundary
  const duplicatedProducts = [...products, ...products, ...products];

  // Utility to handle localized currency notation safely
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(amount);
  };

  // Utility to compute inline Markdown drops mathematically
  const calculateDiscount = (price: number, oldPrice?: number) => {
    if (!oldPrice || oldPrice <= price) return null;
    const discount = ((oldPrice - price) / oldPrice) * 100;
    return `${Math.round(discount)}% OFF`;
  };

  const handleManualScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = window.innerWidth < 640 ? 180 : 210;
    const gap = 16; 
    const scrollAmount = (cardWidth + gap) * 2; 

    container.style.scrollBehavior = 'smooth';
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden mb-6">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 mt-6">
        <div>
          <h3 className="text-lg font-black tracking-tight text-slate-900">⚡ Trending Flash Deals</h3>
          <p className="text-xs text-slate-500 font-medium">Secured markdown drops updating live</p>
        </div>
        
        <div className="flex gap-1.5 z-20">
          <button 
            onClick={() => handleManualScroll('left')}
            aria-label="Scroll left"
            className="rounded-full border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 active:scale-90 hover:text-emerald-600 hover:border-emerald-200 shadow-xs transition-all duration-150 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          </button>
          <button 
            onClick={() => handleManualScroll('right')}
            aria-label="Scroll right"
            className="rounded-full border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 active:scale-90 hover:text-emerald-600 hover:border-emerald-200 shadow-xs transition-all duration-150 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* ================= MARQUEE TRACK ================= */}
      <div className="relative w-full overflow-hidden py-1 bg-slate-50/50 border-y border-slate-100">
        {/* Soft edge gradient fades */}
        <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] overflow-x-auto no-scrollbar py-2 px-4"
          style={{
            transform: 'translate3d(0, 0, 0)' // Hardware acceleration triggers
          }}
        >
          {duplicatedProducts.map((product, index) => {
            const discountLabel = calculateDiscount(product.price, product.oldPrice);
            
            return (
              <div 
                key={`${product.id}-${index}`} 
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md w-[180px] sm:w-[210px] shrink-0"
              >
                {/* Product Image Window */}
                <div className="relative aspect-square w-full rounded-xl bg-white overflow-hidden mb-2.5 select-none border border-slate-100">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  
                  {/* Sale Tag Indicator */}
                  {discountLabel && (
                    <span className="absolute top-2 left-2 rounded-lg bg-red-600 px-2 py-0.5 text-[9px] font-black text-white tracking-wide shadow-xs uppercase">
                      {discountLabel}
                    </span>
                  )}

                  {/* Category Micro-badge */}
                  <span className="absolute bottom-2 right-2 rounded-md bg-slate-900/70 text-white backdrop-blur-xs px-1.5 py-0.5 text-[8px] font-bold tracking-wider uppercase">
                    {product.subCategory || product.category}
                  </span>
                </div>

                {/* Title & Price Information */}
                <div className="flex flex-col flex-1">
                  <h4 className="line-clamp-2 text-xs font-black text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors h-8">
                    {product.title}
                  </h4>
                  
                  <div className="mt-3 flex flex-col gap-0.5">
                    <p className="text-sm font-black text-slate-950 flex items-baseline gap-0.5">
                      <span className="text-[11px] font-bold">₦</span>{formatCurrency(product.price)}
                    </p>
                    {product.oldPrice && product.oldPrice > product.price && (
                      <p className="text-[10px] font-medium text-slate-400 line-through">
                        ₦{formatCurrency(product.oldPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Injection for Keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.3333%, 0, 0); }
        }
      `}</style>
    </div>
  );
}