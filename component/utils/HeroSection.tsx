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
    imageUrl: "/hero/banners1.webp",
    gradient: "from-blue-600 via-indigo-900/90 to-transparent",
    accentGlow: "bg-blue-500/30",
    badgeBg: "bg-gradient-to-r from-blue-600 to-indigo-600"
  },
  {
    badge: "Mega Flash Offers",
    title: "Premium Workspace Essentials",
    subtitle: "Secure 100% vetted hardware gear and professional desktop electronics",
    cta: "Explore Tech",
    imageUrl: "/hero/banners2.webp",
    gradient: "from-emerald-600 via-teal-900/90 to-transparent",
    accentGlow: "bg-emerald-500/30",
    badgeBg: "bg-gradient-to-r from-emerald-600 to-teal-600"
  },
  {
    badge: "Fashion Week",
    title: "Vetted Premium Designers",
    subtitle: "Discover bespoke couture and tailored fashion items securely via escrow",
    cta: "Browse Apparel",
    imageUrl: "/hero/banners3.webp",
    gradient: "from-purple-600 via-fuchsia-900/90 to-transparent",
    accentGlow: "bg-purple-500/30",
    badgeBg: "bg-gradient-to-r from-purple-600 to-fuchsia-600"
  },
  {
    badge: "Official Stores",
    title: "Direct From Manufacturers",
    subtitle: "Authenticity guaranteed with absolute price-match protection frameworks",
    cta: "View Brands",
    imageUrl: "/hero/banners1.webp",
    gradient: "from-cyan-600 via-sky-900/90 to-transparent",
    accentGlow: "bg-cyan-500/30",
    badgeBg: "bg-gradient-to-r from-cyan-600 to-sky-600"
  },
  {
    badge: "Home & Comfort",
    title: "Smart Living Spaces",
    subtitle: "Premium energy-efficient appliances built for modern residential infrastructure",
    cta: "Upgrade Now",
    imageUrl: "/hero/banners2.webp",
    gradient: "from-amber-500 via-orange-950/90 to-transparent",
    accentGlow: "bg-amber-500/30",
    badgeBg: "bg-gradient-to-r from-amber-500 to-orange-500"
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
    <section className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ================= CENTER STAGE: TALLER HORIZONTAL SLIDER ================= */}
        <main className="col-span-1 lg:col-span-9 relative overflow-hidden rounded-2xl  text-white aspect-[4/3] xs:aspect-[16/9] lg:h-[480px] lg:aspect-auto border border-slate-800/80 flex flex-col justify-between p-6 sm:p-10 lg:p-12 shadow-2xl group">
          
          {/* Sliding Track Viewport */}
          <div className="absolute inset-0 z-0 flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {promoSlides.map((slide, idx) => (
              <div key={idx} className="relative w-full h-full flex-shrink-0">
                <img 
                  src={slide.imageUrl} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} /> */}
                
                {/* Scaled-up Ambient Radial Backglow */}
                {/* <div className={`absolute -right-20 -top-20 h-96 w-96 rounded-full ${slide.accentGlow} blur-[120px] pointer-events-none`} /> */}
              </div>
            ))}
          </div>

          {/* Top Row: Meta Badge & Indicators */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <span className={`inline-flex items-center rounded-full ${promoSlides[currentSlide].badgeBg} text-white px-3.5 py-1 text-[10px] font-black uppercase tracking-widest shadow-lg`}>
              {promoSlides[currentSlide].badge}
            </span>
            
            {/* Glassmorphic Dots Framework */}
            <div className="flex gap-1.5 backdrop-blur-md bg-black/20 px-3 py-2 rounded-full border border-white/5">
              {promoSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Elevated Content Block for Larger Heights */}
          <div className="relative z-10 max-w-xs sm:max-w-2xl mt-auto pb-4 lg:pb-6">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1] drop-shadow-md transition-all duration-500">
              {/* {promoSlides[currentSlide].title} */}
            </h1>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-200/90 leading-relaxed font-medium max-w-[90%] drop-shadow-sm">
              {/* {promoSlides[currentSlide].subtitle} */}
            </p>
            <div className="mt-6 sm:mt-8">
              <button className="inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-xs font-black text-slate-950 shadow-xl transition-all hover:bg-slate-100 hover:shadow-white/5 active:scale-95 uppercase tracking-wider cursor-pointer group/btn">
                <span>{promoSlides[currentSlide].cta}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 text-slate-950" />
              </button>
            </div>
          </div>

          {/* Manual Slider Arrows */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={prevSlide}
              className="h-9 w-9 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer shadow-lg"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={nextSlide}
              className="h-9 w-9 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer shadow-lg"
              aria-label="Next Slide"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </main>

        {/* ================= RIGHT SIDEBAR: CORRESPONDING TALL CARDS ================= */}
        <aside className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-stretch lg:max-h-[480px]">
          
          {/* Service Banner 1 */}
          <div className=" rounded-2xl border border-blue-500/20 p-6 flex flex-col justify-between shadow-xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/[0.02] mix-blend-overlay pointer-events-none" />
            <div className="flex gap-4 items-start relative z-10">
              <div className="h-10 w-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/20 shadow-inner">
                <ShieldCheck className="h-5.5 w-5.5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-black text-white tracking-wide uppercase">100% Secure Escrow</h4>
                <p className="text-[12px] sm:text-[13px] text-slate-800 leading-relaxed font-medium">
                  Funds held safely via smart contract frameworks until verification clearings pass completely.
                </p>
              </div>
            </div>
            <a href="#" className="text-[11px] font-bold text-blue-400 group-hover:text-blue-300 inline-flex items-center gap-1 mt-6 self-start transition-colors relative z-10">
              <span>Learn protection protocols</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Service Banner 2 */}
          <div className=" rounded-2xl border border-amber-500/20 p-6 flex flex-col justify-between shadow-xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/[0.02] mix-blend-overlay pointer-events-none" />
            <div className="flex gap-4 items-start relative z-10">
              <div className="h-10 w-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20 shadow-inner">
                <Truck className="h-5.5 w-5.5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-black text-white tracking-wide uppercase">Verified Delivery Systems</h4>
                <p className="text-[12px] sm:text-[13px] text-slate-800 leading-relaxed font-medium">
                  Real-time direct shipping with active routing bounds localized straight to your coordinates.
                </p>
              </div>
            </div>
            <a href="#" className="text-[11px] font-bold text-amber-400 group-hover:text-amber-300 inline-flex items-center gap-1 mt-6 self-start transition-colors relative z-10">
              <span>Check rates matrix</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

        </aside>

      </div>
    </section>
  );
}