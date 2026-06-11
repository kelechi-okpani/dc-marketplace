'use client';

import React from 'react';
import Link from 'next/link';
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb back to Catalog */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Marketplace
          </Link>
        </div>

        {/* Header Zone */}
        <header className="border-b border-slate-200/80 pb-5 mb-8">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            Your Wishlist ({wishlistItems.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Your saved favorites and product bookmarks.
          </p>
        </header>

        {/* Wishlist Conditional Layout Grid */}
        {wishlistItems.length === 0 ? (
          <div className="w-full bg-white border border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center text-center max-w-xl mx-auto my-12 shadow-3xs">
            <div className="h-14 w-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">Your wishlist is empty</h3>
            <p className="text-xs text-slate-400 font-medium max-w-xs mt-1.5 leading-normal mb-6">
              Tap the heart icon overlays on our catalog to bookmark products you like.
            </p>
            <Link 
              href="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-lg transition-colors shadow-xs"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistItems.map((product) => (
              <div 
                key={product.id}
                className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all duration-300"
              >
                {/* Immediate Delete Overlay Handle */}
                <button 
                  onClick={() => dispatch(toggleWishlist(product))}
                  className="absolute top-3 right-3 z-10 h-7 w-7 bg-white border border-slate-200 text-red-500 hover:bg-red-50 rounded-md flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="Remove from Wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Imagery Core Canvas */}
                <div className="aspect-square bg-slate-50 relative overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                  />
                </div>

                {/* Info & Cart Migration Block */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{product.brand}</p>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                      {product.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-sm font-black text-slate-950">
                      {formatNaira(product.price)}
                    </span>

                    <button
                      onClick={() => {
                        dispatch(addToCart(product));
                        // Optional: uncomment below to auto-remove from wishlist when moved to cart
                        // dispatch(toggleWishlist(product));
                      }}
                      className="h-8 px-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
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