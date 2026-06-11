'use client';
import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Calendar, 
  MessageCircle 
} from 'lucide-react';

// ==========================================
// TYPES & DATA STRUCTURES
// ==========================================
export interface Artisan {
  id: string;
  name: string;
  role: string;
  category: string; // Added to handle accurate quick-filter switching
  rating: number;
  reviewsCount: number;
  baseRate: number;
  isAvailable: boolean;
}

export const mockArtisans: Artisan[] = [
  { id: '1', name: 'Samuel Ade', role: 'Certified Master Electrician', category: 'Electricians', rating: 4.9, reviewsCount: 85, baseRate: 8500, isAvailable: true },
  { id: '2', name: 'John Doe', role: 'Solar Power Installation Specialist', category: 'Solar Specialists', rating: 4.8, reviewsCount: 120, baseRate: 15000, isAvailable: true },
  { id: '3', name: 'Amara Nwosu', role: 'Full-Stack Web Developer', category: 'Web Developers', rating: 5.0, reviewsCount: 42, baseRate: 25000, isAvailable: true },
  { id: '4', name: 'Bisi Akande', role: 'Bespoke Fashion Designer', category: 'Fashion Designers', rating: 4.7, reviewsCount: 96, baseRate: 12000, isAvailable: false },
];

const filterTags = [
  "All Services",
  "Electricians",
  "Solar Specialists",
  "Web Developers",
  "Fashion Designers",
  "Plumbers",
];

// ==========================================
// MAIN COMBINED COMPONENT
// ==========================================
export default function ServicesMarketplace() {
  const [activeTag, setActiveTag] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically filter matching items based on Search Input & Category Chips
  const filteredArtisans = useMemo(() => {
    return mockArtisans.filter((artisan) => {
      const matchesCategory = activeTag === "All Services" || artisan.category === activeTag;
      
      const matchesSearch = 
        artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.role.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeTag, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      
    {/* ================= 1. MARKETPLACE HERO HEADER ================= */}
    <header className="bg-slate-950 text-white relative overflow-hidden py-16 sm:py-20 border-b border-slate-900">
      
      {/* ================= BANNER IMAGE BACKGROUND SYSTEM ================= */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-90">
        {/* Modern high-contrast grid overlay to blend banner seamlessly into slate-950 background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020617_90%)] z-10" />
        
        <Image
          src="/images/banner3.jpg" 
          alt="Marketplace Freelancer Collaborative Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 motion-safe:animate-[fadeIn_1.5s_ease-out]"
        />
      </div>

      {/* Ambient Glows */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none z-10" />
      <div className="absolute left-10 bottom-0 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none z-10" />

      {/* Hero Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 text-xs font-semibold text-blue-400 backdrop-blur-md shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
            Verified Professional Marketplace
          </span>
        </div>
        
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl text-white max-w-3xl mx-auto drop-shadow-sm leading-tight">
          Hire Vetted Artisans & Freelancers
        </h1>
        
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-medium drop-shadow-xs leading-relaxed">
          Collaborate safely with top-rated Nigerian specialists backed by secure milestone escrow protection.
        </p>

        {/* Integrated Search Hub */}
        <div className="max-w-2xl mx-auto pt-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1 group">
              <Search className="absolute top-3.5 left-4 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, craft, skill, or keyword..."
                className="w-full rounded-xl border border-slate-800/80 bg-slate-900/60 py-3.5 pr-4 pl-11 text-xs text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:bg-slate-900/90 focus:outline-none focus:ring-4 focus:ring-blue-500/10 backdrop-blur-md"
              />
            </div>
            
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-blue-700 active:scale-98 cursor-pointer shadow-lg shadow-blue-600/20 shrink-0">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* ================= 2. QUICK FILTER CHIPS ================= */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]">
          {filterTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTag(tag)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                activeTag === tag
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </nav>

      {/* ================= 3. PLATFORM TRUST BAR ================= */}
      <aside className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left flex-col sm:flex-row">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-emerald-950">100% Escrow Protection Active</h3>
              <p className="text-[11px] text-emerald-800/80 font-medium leading-normal">
                Your payment remains securely locked inside funded milestone accounts until tasks are fully executed and approved.
              </p>
            </div>
          </div>
          <a href="#" className="text-xs font-black text-emerald-700 hover:text-emerald-900 shrink-0 uppercase tracking-wider">
            How it works
          </a>
        </div>
      </aside>

      {/* ================= 4. DYNAMIC SERVICE GRID LAYER ================= */}
      <main className="mt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">Vetted Service Providers</h2>
            <div className="h-0.5 w-8 bg-blue-600 mt-1 rounded-full" />
          </div>
          <span className="text-xs font-bold text-slate-400">
            {filteredArtisans.length} custom match{filteredArtisans.length !== 1 ? 'es' : ''} found
          </span>
        </div>

        {filteredArtisans.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4 max-w-7xl mx-auto">
            {filteredArtisans.map((artisan) => (
              <Link 
                key={artisan.id}
                href={`/services/${artisan.id}`}
                className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-blue-200 cursor-pointer"
              >
                {/* Header Profile Info Row */}
                <div className="flex items-start gap-4">
                  <div className="relative h-14 w-14 flex-shrink-0 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 border-2 border-blue-50 group-hover:border-blue-500 transition-colors">
                    {artisan.name.split(' ').map(n => n[0]).join('')}
                    {artisan.isAvailable && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{artisan.name}</h3>
                      <CheckCircle2 className="h-4 w-4 fill-blue-500 text-white shrink-0" />
                    </div>
                    <p className="text-xs font-medium text-gray-500 line-clamp-1">{artisan.role}</p>
                    
                    {/* Star Rating Metrics Row */}
                    <div className="mt-1.5 flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                      <span className="text-xs font-bold text-gray-700">{artisan.rating}</span>
                      <span className="text-xs text-gray-400">({artisan.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Rate Matrix Breakdown */}
                <div className="my-5 rounded-xl bg-slate-50 p-3 flex items-center justify-between group-hover:bg-blue-50/40 transition-colors">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Starting Rate</span>
                    <span className="text-sm font-extrabold text-slate-900">
                      ₦{artisan.baseRate.toLocaleString()} <span className="text-[10px] font-normal text-gray-500">/ hr</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Availability</span>
                    <span className={`text-xs font-semibold ${artisan.isAvailable ? 'text-green-600' : 'text-gray-400'}`}>
                      {artisan.isAvailable ? 'Available Now' : 'Fully Booked'}
                    </span>
                  </div>
                </div>

                {/* Card Execution CTA Button Links */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-bold text-gray-700 transition-colors hover:bg-slate-50 cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Message
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-700 shadow-xs cursor-pointer"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Quote
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty Search Fallback State Layout */
          <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl max-w-7xl mx-auto mx-4 p-6">
            <Search className="h-8 w-8 text-slate-300 mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-700">No matching providers found</p>
            <p className="text-[11px] text-slate-400 mt-1">Try adjusting your keyword filter text or resetting your active trade category selector.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveTag("All Services"); }}
              className="mt-4 text-xs font-black text-blue-600 uppercase tracking-wider hover:text-blue-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}