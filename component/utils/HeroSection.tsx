'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ShieldCheck, Truck, ArrowRight, ArrowLeft
} from 'lucide-react';

const promoSlides = [
  {
    badge: "Anniversary Sales",
    title: "Upgrade Your Tech Matrix",
    subtitle: "Up to 40% Off Premium Laptops, Phones & Accessories",
    cta: "Shop Deals",
    imageUrl: "/hero/hero1.png",
    accentGlow: "bg-blue-600/20"
  },
  {
    badge: "Mega Flash Offers",
    title: "Premium Workspace Essentials",
    subtitle: "Secure 100% vetted hardware gear and professional desktop electronics",
    cta: "Explore Tech",
    imageUrl: "/hero/hero2.png",
    accentGlow: "bg-emerald-600/20"
  },
  {
    badge: "Fashion Week",
    title: "Vetted Premium Designers",
    subtitle: "Discover bespoke couture and tailored fashion items securely via escrow",
    cta: "Browse Apparel",
    imageUrl: "/hero/hero3.gif",
    accentGlow: "bg-purple-600/20"
  },
  {
    badge: "Official Stores",
    title: "Direct From Manufacturers",
    subtitle: "Authenticity guaranteed with absolute price-match protection frameworks",
    cta: "View Brands",
    imageUrl: "/hero/hero4.png",
    accentGlow: "bg-cyan-600/20"
  },
  {
    badge: "Home & Comfort",
    title: "Smart Living Spaces",
    subtitle: "Premium energy-efficient appliances built for modern residential infrastructure",
    cta: "Upgrade Now",
    imageUrl: "/hero/hero5.png",
    accentGlow: "bg-amber-600/20"
  }
];

export default function ECommerceHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* ================= CENTER STAGE: FIXED RATIO SLIDER ================= */}
        <main className="col-span-1 lg:col-span-9 relative overflow-hidden rounded-xl bg-slate-950 text-white aspect-[2/1] xs:aspect-[12/5] lg:h-[350px] lg:aspect-auto border border-slate-900 flex flex-col justify-between p-5 sm:p-8 lg:p-10 shadow-xs group">
          
          {/* Background Layer Asset */}
          <div className="absolute inset-0 z-0">
            <img 
              src={promoSlides[currentSlide].imageUrl} 
              alt={promoSlides[currentSlide].title}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-101 group-hover:scale-100"
            />
            {/* Dark gradient mapping to make text highly readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
          </div>

          {/* Ambient Lighting Layer */}
          <div className={`absolute -right-16 -top-16 h-64 w-64 rounded-full ${promoSlides[currentSlide].accentGlow} blur-3xl transition-all duration-700 pointer-events-none z-10`} />

          {/* Slide Progress Metabar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/10 flex gap-1 z-20">
            {promoSlides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-full transition-all duration-500 flex-1 ${idx === currentSlide ? 'bg-blue-500' : 'bg-transparent'}`}
              />
            ))}
          </div>

          {/* Top Meta Badge Block */}
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-md bg-blue-600 text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-xs">
              {promoSlides[currentSlide].badge}
            </span>
          </div>

          {/* Content Transition Box */}
          <div className="relative z-10 max-w-xs sm:max-w-md my-auto pt-2">
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight drop-shadow-xs">
              {promoSlides[currentSlide].title}
            </h1>
            <p className="mt-1 sm:mt-2 text-[10px] xs:text-xs sm:text-sm text-slate-200 leading-normal font-semibold max-w-[90%] drop-shadow-xs">
              {promoSlides[currentSlide].subtitle}
            </p>
            <div className="mt-3 sm:mt-5">
              <button className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-[10px] sm:text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-98 uppercase tracking-wider cursor-pointer group/btn">
                <span>{promoSlides[currentSlide].cta}</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Manual Arrow Slider Controllers */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={prevSlide}
              className="h-6 w-6 rounded-md bg-slate-900/90 border border-white/10 hover:bg-slate-800 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="h-3 w-3" />
            </button>
            <button 
              onClick={nextSlide}
              className="h-6 w-6 rounded-md bg-slate-900/90 border border-white/10 hover:bg-slate-800 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Next Slide"
            >
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </main>

        {/* ================= RIGHT SIDEBAR: ADAPTED CARDS ================= */}
        <aside className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 items-stretch lg:max-h-[350px]">
          
          {/* Service Banner Top Row */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col justify-between shadow-xs group">
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-slate-900">100% Secure Escrow</h4>
                <p className="text-[11px] text-slate-500 leading-normal font-medium">
                  Funds held securely in non-custodial custody until inspection bounds clear.
                </p>
              </div>
            </div>
            <a href="#" className="text-[11px] font-bold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-0.5 mt-2 self-start">
              <span>Learn protection protocols</span>
              <ChevronRight className="h-3 w-3" />
            </a>
          </div>

          {/* Service Banner Bottom Row */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-xl border border-amber-200/60 p-4 flex flex-col justify-between shadow-xs group">
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 bg-amber-500 text-white rounded-lg flex items-center justify-center shrink-0 shadow-xs">
                <Truck className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-amber-900">Verified Delivery Systems</h4>
                <p className="text-[11px] text-amber-800/80 leading-normal font-medium">
                  Direct dispatch options matching transit routing vectors locally.
                </p>
              </div>
            </div>
            <a href="#" className="text-[11px] font-bold text-amber-700 group-hover:text-amber-900 inline-flex items-center gap-0.5 mt-2 self-start">
              <span>Check rates matrix</span>
              <ChevronRight className="h-3 w-3" />
            </a>
          </div>

        </aside>

      </div>
    </section>
  );
}