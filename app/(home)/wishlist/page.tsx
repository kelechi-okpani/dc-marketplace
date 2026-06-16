'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Ambient Background Gradients */}
      <div className="absolute top-0 right-0 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-[#1877F2]/10 to-[#1877F2]/5 blur-[110px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-[-60px] h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-[#1877F2]/5 to-[#1877F2]/10 blur-[95px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-[#1877F2] transition-colors uppercase tracking-wider group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Marketplace
          </Link>
        </div>

        {/* Header Zone */}
        <header className="border-b border-slate-200/80 pb-6 mb-10">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow-md shadow-[#1877F2]/20 animate-pulse">
              <Heart className="h-5 w-5 fill-white/20" />
            </div>
            Your Wishlist
            <span className="text-sm font-black bg-[#E7F3FF] text-[#1877F2] px-3 py-1 rounded-full border border-[#1877F2]/20 ml-1">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 max-w-2xl leading-relaxed">
            Your premium curation pipeline. Inspect curated assets, monitor value benchmarks, or route selections into active order pipelines.
          </p>
        </header>

        {/* Wishlist Conditional Layout Grid */}
        {wishlistItems.length === 0 ? (
          <div className="w-full bg-white border border-dashed border-slate-300 rounded-3xl p-16 flex flex-col items-center text-center max-w-xl mx-auto my-12 shadow-xl shadow-slate-200/50">
            <div className="h-16 w-16 bg-[#E7F3FF] text-[#1877F2] border border-[#1877F2]/20 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
              <Heart className="h-7 w-7" />
            </div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">Your wishlist is empty</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xs mt-2 leading-relaxed mb-8">
              Tap the curated bookmark modifiers across our catalogs to anchor prospective procurements here.
            </p>
            <Link 
              href="/" 
              className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-black text-xs uppercase tracking-widest py-3 px-8 rounded-xl transition-all shadow-md shadow-[#1877F2]/20 active:scale-98"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div 
                key={product.id}
                className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#1877F2]/30 hover:shadow-xl hover:shadow-[#1877F2]/5 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {/* Delete Overlay Handle */}
                <button 
                  type="button"
                  onClick={() => dispatch(toggleWishlist(product))}
                  className="absolute top-3 right-3 z-20 h-8 w-8 bg-white/90 backdrop-blur-md border border-slate-200/60 text-slate-400 hover:text-[#1877F2] rounded-xl flex items-center justify-center transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Remove from Wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Imagery Core Canvas */}
                <div className="aspect-square bg-slate-50 relative overflow-hidden group border-b border-slate-100">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.title} 
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 33vw, 25vw"
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Info & Cart Migration Block */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-white relative z-10">
                  <div className="space-y-1.5">
                    <span className="inline-block text-[9px] font-black tracking-widest text-[#1877F2] bg-[#E7F3FF] border border-[#1877F2]/20 px-2 py-0.5 rounded-md uppercase">
                      {product.brand}
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-2 leading-snug tracking-tight group-hover:text-[#1877F2] transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-sm font-black text-slate-950 tracking-tight bg-gradient-to-r from-slate-950 to-blue-900 bg-clip-text">
                      {formatNaira(product.price)}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        dispatch(addToCart(product));
                      }}
                      className="h-9 px-3 rounded-xl border border-[#1877F2]/20 bg-[#E7F3FF]/50 text-[#1877F2] hover:bg-[#1877F2] hover:text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md hover:shadow-[#1877F2]/20 active:scale-97 group/btn"
                    >
                      <ShoppingBag className="h-3.5 w-3.5 text-[#1877F2] group-hover/btn:text-white transition-colors" />
                      <span>To Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}