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
  MessageCircle,
  X,
  ArrowUpRight
} from 'lucide-react';

export interface Artisan {
  id: string;
  name: string;
  role: string;
  category: string; 
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

// Rich custom dynamic category tag definitions mapping border, background text and light gradients
const CATEGORY_THEME_MAP: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  "Electricians": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", border: "border-amber-200" },
  "Solar Specialists": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-200" },
  "Web Developers": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", border: "border-blue-200" },
  "Fashion Designers": { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500", border: "border-rose-200" },
};

export default function ServicesMarketplace() {
  const [activeTag, setActiveTag] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="min-h-screen bg-white text-slate-900 pb-24 selection:bg-indigo-600/10 selection:text-indigo-900 antialiased overflow-hidden">
      
      {/* ================= 1. PREMIUM RADIANT HERO HEADER ================= */}
      <header className="relative py-20 sm:py-28 border-b border-slate-100 bg-slate-50/50">
        
        {/* Colorful High-Contrast Ambient Blur Rings */}
        <div className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-[120px] pointer-events-none z-10" />
        <div className="absolute left-[-100px] bottom-[-100px] h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 blur-[100px] pointer-events-none z-10" />

        {/* Hero Banner Background Graphic Mix */}
        <div className="absolute inset-0 z-0 opacity-75 select-none pointer-events-none mix-blend-multiply">
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" /> */}
          <Image
            src="/hero/service.webp" 
            alt="Marketplace Freelancer Collaborative Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center contrast-110 scale-105"
          />
        </div>

        {/* Main Content Content Frame */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-bold tracking-wide text-indigo-600 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
              Verified Professional Ecosystem
            </span>
          </div>
          
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight bg-gradient-to-r from-slate-950 via-slate-800 to-indigo-950 bg-clip-text text-transparent">
            Hire Elite Vetted Artisans & Freelancers
          </h1>
          
          <p className="text-sm sm:text-base text-slate-900 max-w-xl mx-auto font-medium leading-relaxed">
            Collaborate safely with top-tier premium specialists backed by automated secure milestone escrow protections.
          </p>

          {/* Luxury Floating Input Hub */}
          <div className="max-w-2xl mx-auto pt-4 px-2 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-2xl bg-white border border-slate-200/80 shadow-xl shadow-indigo-900/5">
              <div className="relative flex-1 group flex items-center">
                <Search className="absolute left-4 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, craft, skill, or keyword..."
                  className="w-full bg-transparent py-3 pr-10 pl-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all active:scale-98 cursor-pointer shadow-lg shadow-indigo-600/20 shrink-0">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= 2. SCROLLABLE HORIZONTAL FILTER RAIL ================= */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]">
          {filterTags.map((tag, idx) => {
            const isSelected = activeTag === tag;
            return (
              <button
                key={idx}
                onClick={() => setActiveTag(tag)}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold tracking-wide transition-all duration-300 shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20 -translate-y-[1px]'
                    : 'bg-slate-50 border-slate-200/60 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ================= 3. PLATFORM TRUST BAR ================= */}
      <aside className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-teal-50/30 to-transparent border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
              <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xs font-black tracking-wider uppercase text-emerald-800">100% Escrow Milestone Protection Bonded</h3>
              <p className="text-xs text-slate-500 font-medium leading-normal mt-0.5">
                Funds remain secure inside dedicated smart ledger channels until the contract deliverables are fully approved.
              </p>
            </div>
          </div>
          <a href="#" className="text-xs font-black text-emerald-600 hover:text-emerald-700 shrink-0 uppercase tracking-widest border-b border-emerald-500/20 pb-0.5 transition-colors">
            Protocol Rules
          </a>
        </div>
      </aside>

      {/* ================= 4. PREMIUM CONTENT GRID LAYOUT ================= */}
      <main className="mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Curated Talent Index</span>
            <h2 className="text-base font-black text-slate-900 mt-0.5 tracking-tight">Verified Talents</h2>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
            {filteredArtisans.length} verified match{filteredArtisans.length !== 1 ? 'es' : ''}
          </span>
        </div>

        {filteredArtisans.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {filteredArtisans.map((artisan) => {
              const currentTheme = CATEGORY_THEME_MAP[artisan.category] || { bg: "bg-slate-50", text: "text-slate-700", dot: "bg-slate-400", border: "border-slate-200" };
              
              return (
                <Link 
                  key={artisan.id}
                  href={`/services/${artisan.id}`}
                  className="group relative flex flex-col rounded-2xl border border-slate-150 bg-white p-5 transition-all duration-300 hover:border-indigo-200 hover:bg-slate-50/30 cursor-pointer overflow-hidden hover:-translate-y-1 shadow-xs hover:shadow-xl hover:shadow-indigo-900/5"
                >
                  {/* Subtle dynamic background color pop on hover */}
                  <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${currentTheme.bg}`} />

                  {/* Header Profile Info Row */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative h-14 w-14 shrink-0 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm border border-slate-800 transition-all group-hover:bg-indigo-600 group-hover:border-indigo-500 shadow-md shadow-slate-950/10">
                      {artisan.name.split(' ').map(n => n[0]).join('')}
                      {artisan.isAvailable && (
                        <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-4 ring-white animate-pulse" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 max-w-full">
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate">{artisan.name}</h3>
                        <CheckCircle2 className="h-3.5 w-3.5 fill-indigo-600 text-white shrink-0" />
                      </div>
                      <p className="text-xs font-medium text-slate-500 truncate mt-0.5">{artisan.role}</p>
                      
                      {/* Dynamic Color Pill Tag */}
                      <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border mt-2 ${currentTheme.bg} ${currentTheme.text} ${currentTheme.border}`}>
                        <span className={`w-1 h-1 rounded-full ${currentTheme.dot}`} />
                        {artisan.category}
                      </span>
                    </div>
                  </div>

                  {/* Metrics Row Grid Container */}
                  <div className="mt-5 grid grid-cols-2 gap-2 border-y border-slate-100 py-3 my-4">
                    <div>
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Hourly Rate</span>
                      <span className="text-sm font-black text-slate-900 tracking-tight">
                        ₦{artisan.baseRate.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Client Rating</span>
                      <div className="flex items-center gap-1 text-amber-500 mt-0.5">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-black text-slate-800">{artisan.rating}</span>
                        <span className="text-[10px] text-slate-400 font-bold">({artisan.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Availability Info Status Row */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-0.5 mb-4">
                    <span>Availability Status</span>
                    <span className={artisan.isAvailable ? 'text-emerald-600' : 'text-slate-400'}>
                      {artisan.isAvailable ? '● Open to hire' : '✕ Fully Booked'}
                    </span>
                  </div>

                  {/* Actions CTA Section Block */}
                  <div className="mt-auto grid grid-cols-2 gap-2.5">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 px-3 py-2.5 text-xs font-bold text-slate-700 transition-colors cursor-pointer shadow-xs"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-slate-500" />
                      Chat
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-3 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-indigo-600/10 transition-all cursor-pointer"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      Book
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty Search Fallback State Layout */
          <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-2xl max-w-7xl mx-auto mx-4 p-6">
            <Search className="h-8 w-8 text-slate-300 mx-auto mb-4" />
            <p className="text-sm font-bold text-slate-800">No custom providers match criteria</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Try clarifying your target search query keyword strings or reset the active filter tag index tracker.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveTag("All Services"); }}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 cursor-pointer border-b border-indigo-600/20 pb-0.5 transition-colors"
            >
              Reset Filters 
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}