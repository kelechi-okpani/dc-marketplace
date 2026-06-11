'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Bell, MessageSquare, Search, Menu, X, User, Settings, LogOut, ShieldCheck, Heart } from 'lucide-react';

import { useAppSelector } from '@/store/store';
import { selectCartItemsCount, selectWishlistItemsCount } from '@/store/selectors';


interface NavRoute {
  label: string;
  href: string;
}

const routes: NavRoute[] = [
  { label: 'Marketplace', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Escrow Hub', href: '/escrow' },
];

export default function MainNavbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);

  const cartCount = useAppSelector(selectCartItemsCount);
  const wishlistCount = useAppSelector(selectWishlistItemsCount);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Close menus when clicking outside profile card
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    console.log(`Searching for: ${searchQuery}`);
    setIsMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* ================= BRAND LOGO SECTION ================= */}
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="group flex items-center focus:outline-none">
                {/* 
                  FIX: Rebalanced structural relative container. 
                  Matches the ~8:1 aspect ratio of the height-reduced logo asset.
                */}
                <div className="relative h-7 w-48 sm:h-8 sm:w-56 md:w-60 transition-all">
                  <Image
                    src="/dc.svg"
                    alt="DC Marketplace Logo"
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 240px"
                    priority       
                    className="object-contain object-left"
                  />
                </div>
              </Link>
            </div>

            {/* ================= DESKTOP NAV ROUTES ================= */}
            <nav className="hidden h-full items-center gap-1 md:flex">
              {routes.map((route) => {
                const isActive = pathname === route.href;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`relative flex h-full items-center px-3.5 text-xs font-bold transition-all duration-200 ${
                      isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600' 
                    }`}
                  >
                    <span className="relative z-10">{route.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t-full bg-blue-600 origin-bottom" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ================= UTILITY TRAYS ================= */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* Messages */}
          
              {/* Notifications */}
               <Link 
                href="/wislist"
                className="rounded-full text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95"
                aria-label="Messages"
              >
                    <button 
                      className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95 cursor-pointer"
                      aria-label="wislist"
                    >
                      <Heart className="h-5 w-5 stroke-[2]" />
                      {wishlistCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white ring-2 ring-white animate-pulse">
                        {wishlistCount}
                      </span>
                      )}
                    </button>
                </Link>


              {/* Shopping Cart */}
               <Link 
                href="/cart"
                className="rounded-full  text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95"
                aria-label="Cart"
              >
                <button 
                  className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95 cursor-pointer"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5 stroke-[2]" />
                  {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white ring-2 ring-white">
                    {cartCount}
                  </span>
                  )}
                </button>

                 </Link>

              <div className="hidden h-4 w-px bg-slate-200 sm:block mx-1.5" />

              {/* ================= INTERACTIVE ACCOUNT DROPDOWN ================= */}
              <div className="relative hidden sm:block" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="focus:outline-none flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="h-8 w-8 overflow-hidden rounded-xl bg-blue-600 shadow-sm border border-blue-700/10 flex items-center justify-center text-xs font-black text-white select-none transition-transform active:scale-95">
                    KO
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                      <p className="text-xs font-black text-slate-900 truncate">Kelechi Okpani</p>
                      <p className="text-[10px] font-medium text-slate-400 truncate mt-0.5">Buyer & Verified Provider</p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <User className="h-4 w-4 stroke-[2]" /> My Profile
                    </Link>
                    <Link href="/escrow/dashboard" className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <ShieldCheck className="h-4 w-4 stroke-[2]" /> Escrow Protection
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <Settings className="h-4 w-4 stroke-[2]" /> Settings
                    </Link>
                    <hr className="my-1 border-slate-100" />
                    <button className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer">
                      <LogOut className="h-4 w-4 stroke-[2]" /> Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Action Trigger */}
              <button
                onClick={() => setIsMobileOpen(true)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 focus:outline-none md:hidden transition-all active:scale-95 cursor-pointer"
                aria-label="Open Menu"
              >
                <Menu className="h-5 w-5 stroke-[2]" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ================= SIDEBAR MOBILE SHEET OVERLAY INTERFACE ================= */}
      <div 
        className="fixed inset-0 z-50 md:hidden pointer-events-none"
        role="dialog"
        aria-modal="true"
      >
        {/* Dimmed Backdrop Tint */}
        <div 
          className={`absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto ${
            isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Sliding Sidebar Drawer */}
        <div 
          className={`absolute top-0 bottom-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col justify-between p-5 transform transition-transform duration-300 ease-out pointer-events-auto border-l border-slate-100 ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top Panel Actions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              {/* 
                FIX: Replaced static text branding system placeholder inside the mobile drawer 
                with the actual height-reduced logo setup to maintain brand consistency.
              */}
              <div className="relative h-7 w-40">
                <Image
                  src="/dc.svg"
                  alt="DC Marketplace Logo"
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                />
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus:outline-none transition-colors cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="h-5 w-5 stroke-[2]" />
              </button>
            </div>

            {/* Responsive Fallback Search Input */}
            <form onSubmit={handleSearchSubmit} className="sm:hidden">
              <div className="relative group/mobsearch">
                <Search className="absolute top-2.5 left-3.5 h-4 w-4 text-slate-400 transition-colors group-focus-within/mobsearch:text-blue-600" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products or services..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </form>

            {/* Navigation Route Link Container */}
            <nav className="flex flex-col gap-1">
              {routes.map((route) => {
                const isActive = pathname === route.href;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    {route.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Account Profile Summary Drawer Footer */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between sm:hidden">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-inner">
                KO
              </div>
              <div className="max-w-[140px]">
                <p className="text-xs font-black text-slate-900 truncate">Kelechi Okpani</p>
                <p className="text-[10px] text-slate-400 font-medium truncate">Verified Provider</p>
              </div>
            </div>
            <Link 
              href="/profile"
              onClick={() => setIsMobileOpen(false)}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              View
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}