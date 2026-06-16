'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Bell, MessageSquare, Search, Menu, X, User, Settings, LogOut, ShieldCheck, Heart, Home, Bookmark, PlusSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { selectCartItemsCount, selectWishlistItemsCount } from '@/store/selectors';

interface NavRoute {
  label: string;
  href: string;
}

const routes: NavRoute[] = [
  { label: 'Products', href: '/products' },
  { label: 'Agro Products', href: '/agric' },
  { label: 'Services', href: '/services' },
  { label: 'Escrow Hub', href: '/escrow' },
];

const bottomNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Saved', href: '/wishlist', icon: Bookmark },
  { label: 'Sell', href: '/sell', icon: PlusSquare },
  { label: 'Messages', href: '/messages', icon: MessageSquare },
  { label: 'Profile', href: '/profile', icon: User },
];

export default function MainNavbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);

  const cartCount = useAppSelector(selectCartItemsCount);
  const wishlistCount = useAppSelector(selectWishlistItemsCount);
  const router = useRouter();

  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

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
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white backdrop-blur-md transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* BRAND LOGO */}
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="group flex items-center focus:outline-none">
                <div className="relative h-8 w-38 sm:h-12 sm:w-36 md:w-40 transition-all">
                  <Image src="/dc.svg" alt="DC Marketplace Logo" fill sizes="(max-width: 640px) 192px, 240px" priority className="object-contain object-left" />
                </div>
              </Link>
            </div>

            {/* DESKTOP NAV ROUTES */}
            {/* <nav className="hidden h-full items-center gap-1 md:flex">
              {routes.map((route) => {
                const isActive = pathname === route.href;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`relative flex h-full items-center px-3.5 text-xs font-bold transition-all duration-200 ${
                      isActive ? 'text-[#1877F2]' : 'text-slate-600 hover:text-[#1877F2]' 
                    }`}
                  >
                    <span className="relative z-10">{route.label}</span>
                    {isActive && <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t-full bg-[#1877F2] origin-bottom" />}
                  </Link>
                );
              })}
            </nav> */}

            {/* UTILITY TRAYS */}
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden md:flex flex-1 mx-auto px-4 sm:px-6">
                <form 
                  onSubmit={handleSearchSubmit} 
                  className="flex items-center border border-gray-300 rounded-full pl-4 pr-1 focus-within:ring-2 focus-within:ring-[#1877F2] bg-white"
                >
                  <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..." 
                    className="w-full py-2 px-3 outline-none text-gray-700 text-sm bg-transparent"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#1877F2] text-white px-4 sm:px-6 py-1 rounded-full hover:bg-[#166fe5] transition flex-shrink-0 text-sm font-medium"
                  >
                    <span className="hidden sm:inline">Search</span>
                    <span className="sm:hidden">Go</span>
                  </button>
                </form>
              </div>

              {/* Wishlist */}
              <Link href="/wishlist" className="rounded-full text-slate-500 hover:bg-[#E7F3FF] hover:text-[#1877F2] transition-all active:scale-95" aria-label="Wishlist">
                <button className="relative rounded-full p-2 text-slate-500 hover:bg-[#E7F3FF] hover:text-[#1877F2] transition-all active:scale-95 cursor-pointer">
                  <Heart className="h-5 w-5 stroke-[2]" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white ring-2 ring-white ">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </Link>

              {/* Shopping Cart */}
              <Link href="/cart" className="rounded-full text-slate-500 hover:bg-[#E7F3FF] hover:text-[#1877F2] transition-all active:scale-95" aria-label="Cart">
                <button className="relative rounded-full p-2 text-slate-500 hover:bg-[#E7F3FF] hover:text-[#1877F2] transition-all active:scale-95 cursor-pointer">
                  <ShoppingCart className="h-5 w-5 stroke-[2]" />
                  {cartCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2] text-[9px] font-black text-white ring-2 ring-white">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>

              <div className="hidden h-4 w-px bg-slate-200 sm:block mx-1.5" />

              {/* ACCOUNT DROPDOWN */}
              <div className="relative hidden sm:block" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="focus:outline-none flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="h-8 w-8 overflow-hidden rounded-xl bg-[#1877F2] shadow-sm border border-[#1877F2]/10 flex items-center justify-center text-xs font-black text-white transition-transform active:scale-95">
                    KO
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                      <p className="text-xs font-black text-slate-900 truncate">Kelechi Okpani</p>
                      <p className="text-[10px] font-medium text-slate-400 truncate mt-0.5">Buyer & Verified Provider</p>
                    </div>
                    <Link href="/choose-role" className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#E7F3FF] hover:text-[#1877F2] transition-colors">
                      <User className="h-4 w-4 stroke-[2]" /> Sign In
                    </Link>
                    <Link href="/escrow/dashboard" className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#E7F3FF] hover:text-[#1877F2] transition-colors">
                      <ShieldCheck className="h-4 w-4 stroke-[2]" /> Escrow Protection
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#E7F3FF] hover:text-[#1877F2] transition-colors">
                      <Settings className="h-4 w-4 stroke-[2]" /> Settings
                    </Link>
                    <hr className="my-1 border-slate-100" />
                    <button className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer">
                      <LogOut className="h-4 w-4 stroke-[2]" /> Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Trigger */}
              <button onClick={() => setIsMobileOpen(true)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 focus:outline-none md:hidden transition-all active:scale-95 cursor-pointer">
                <Menu className="h-5 w-5 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <div className="fixed inset-0 z-50 md:hidden pointer-events-none" role="dialog">
        <div className={`absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileOpen(false)} />
        <div className={`absolute top-0 bottom-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col justify-between p-5 transform transition-transform duration-300 pointer-events-auto ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="relative h-7 w-40">
                <Image src="/dc.svg" alt="Logo" fill sizes="160px" className="object-contain object-left" />
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer">
                <X className="h-5 w-5 stroke-[2]" />
              </button>
            </div>

            {/* <nav className="flex flex-col gap-1">
              {routes.map((route) => {
                const isActive = pathname === route.href;
                return (
                  <Link key={route.href} href={route.href} onClick={() => setIsMobileOpen(false)} className={`block rounded-xl px-4 py-3 text-sm font-bold transition-all ${isActive ? 'bg-[#E7F3FF] text-[#1877F2]' : 'text-slate-700 hover:bg-slate-50 hover:text-[#1877F2]'}`}>
                    {route.label}
                  </Link>
                );
              })}
            </nav> */}
          </div>

          <div className="border-t border-slate-100 pt-4 mt-auto">
            <div className="flex flex-col gap-2">
              <Link href="/login" onClick={() => setIsMobileOpen(false)} className="w-full text-center rounded-lg bg-[#1877F2] px-4 py-2 text-xs font-bold text-white hover:bg-[#166fe5] transition-colors">Sign In</Link>
              <Link href="choose-role" onClick={() => setIsMobileOpen(false)} className="w-full text-center rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">Create Account</Link>
              <Link href="/login" onClick={() => setIsMobileOpen(false)} className="w-full text-center rounded-lg bg-yellow-600 px-4 py-2 text-xs font-bold text-white hover:bg-yellow-700 transition-colors">Sell</Link>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 z-40 flex h-16 w-full items-center justify-around border-t border-slate-200 bg-white md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${isActive ? 'text-[#1877F2]' : 'text-slate-500 hover:text-[#1877F2]'}`}>
              <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}