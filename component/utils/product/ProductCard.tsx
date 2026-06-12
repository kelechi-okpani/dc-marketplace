'use client';
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Eye, Heart, Star, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/mockProducts';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  // Dynamic Lookup: Determine if this item is currently saved in the Redux wishlist state
  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id)
  );
  
  // Calculate discount percentage based on price delta
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Centralized route pointer string targeting your dynamic product canvas
  const productDetailsUrl = `/products/${product.id}`;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/[0.03] hover:border-slate-200/80">
      
      {/* ================= IMAGE WINDOW CONTAINER ================= */}
      <Link 
        href={productDetailsUrl} 
        className="relative aspect-square w-full rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/50 overflow-hidden mb-3 block cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
        />

        {/* Floating Percentage Discount Badge — Upgraded with Gradient */}
        {discount > 0 && (
          <span className="absolute top-2.5 left-2.5 rounded-lg bg-gradient-to-r from-rose-600 to-red-500 px-2 py-0.5 text-[9px] font-black text-white tracking-wider shadow-sm uppercase">
            {discount}% OFF
          </span>
        )}

        {/* Verified Merchant/Official Store Badge — Premium Glassmorphism Accent */}
        {product.isOfficialStore && (
          <span className="absolute bottom-2.5 left-2.5 bg-emerald-600/90 text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-xs flex items-center gap-1 backdrop-blur-xs">
            <CheckCircle2 className="h-2.5 w-2.5 fill-white text-emerald-600" />
            Official Store
          </span>
        )}
      </Link>

      {/* ================= META FIELDS BLOCK ================= */}
      <div className="flex flex-col flex-1">
   
        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">
          {product.brand}
        </span>
        
        {/* Title Node */}
        <Link href={productDetailsUrl} className="block cursor-pointer mb-1.5 h-8">
          <h4 className="line-clamp-2 text-xs font-bold text-slate-800 leading-snug group-hover:text-emerald-600 transition-colors duration-200">
            {product.title}
          </h4>
        </Link>

        {/* Rating Star Vector Row */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-2.5 w-2.5 ${
                  i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.2 rounded-md">
            {product.reviewsCount}
          </span>
        </div>

        {/* Leaf Subcategory Badge Indicator Tag */}
        <div className="mb-3">
          <span className="bg-emerald-50/60 text-emerald-700 border border-emerald-100/30 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
            {product.subCategory}
          </span>
        </div>

        {/* Pricing Matrix Stack */}
        <div className="mt-auto pt-2.5 border-t border-slate-50">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm font-black text-slate-950 bg-gradient-to-r from-slate-950 to-slate-800 bg-clip-text text-transparent">
              ₦{(product.price || 0).toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-[11px] text-slate-400 line-through font-bold">
                ₦{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= CARD ACTION CTA INTERACTION ROW ================= */}
      <div className="mt-4 grid grid-cols-4 gap-1.5 border-t border-slate-100 pt-3">
        {/* Action: Add Product to Cart */}
        <button
          onClick={() => dispatch(addToCart(product))}
          className="cursor-pointer col-span-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-2 py-2 text-xs font-black text-white shadow-xs shadow-emerald-600/10 transition-all hover:from-emerald-700 hover:to-green-700 active:scale-97 tracking-wide uppercase"
        >
          <ShoppingCart className="h-3 w-3 stroke-[2.5]" />
          <span>Buy Now</span>
        </button>
        
        {/* Navigation Detail Route Handle */}
        <Link
          href={productDetailsUrl}
          onClick={() => onViewDetails?.(product)}
          className="cursor-pointer col-span-1 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 active:scale-95"
          aria-label="View Product Details"
        >
          <Eye className="h-3.5 w-3.5" />
        </Link>
        
        {/* Action: Toggle Product with Reactive Color Palette Transitions */}
        <button
          onClick={() => dispatch(toggleWishlist(product))}
          className={`cursor-pointer col-span-1 inline-flex items-center justify-center rounded-xl border transition-all active:scale-95
            ${isWishlisted 
              ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-2xs' 
              : 'bg-white border-slate-200 text-slate-400 hover:bg-rose-50/50 hover:text-rose-500 hover:border-rose-200'
            }`}
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`h-3.5 w-3.5 transition-all duration-300 ${isWishlisted ? 'fill-rose-500 text-rose-600 scale-105' : ''}`} />
        </button>
      </div>

    </div>
  );
}
