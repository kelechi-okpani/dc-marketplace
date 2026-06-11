'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Eye, Heart, Star, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/mockProducts';

// Global State Integration Hooks & Actions
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void; // Maintained for custom analytics/logging if needed
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
    <div className="group bg-white rounded-xl border border-slate-200 p-3 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:border-slate-300">
      
      {/* ================= IMAGE WINDOW CONTAINER ================= */}
      <Link href={productDetailsUrl} className="relative aspect-square w-full rounded-lg bg-slate-50 overflow-hidden mb-2.5 block cursor-pointer">
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Floating Percentage Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 rounded-md bg-red-600 px-1.5 py-0.5 text-[9px] font-black text-white tracking-wide shadow-xs">
            -{discount}% OFF
          </span>
        )}

        {/* Verified Merchant/Official Store Badge */}
        {product.isOfficialStore && (
          <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
            <CheckCircle2 className="h-2 w-2 fill-white text-blue-600" />
            Official Store
          </span>
        )}
      </Link>

      {/* ================= META FIELDS BLOCK ================= */}
      <div className="flex flex-col flex-1">
        {/* Brand Label Context */}
        <span className="text-[9px] font-black text-blue-600 uppercase tracking-wider mb-0.5">
          {product.brand}
        </span>
        
        {/* Component Title linked with Next.js dynamic detail route tracking */}
        <Link href={productDetailsUrl} className="block cursor-pointer mb-1 h-8">
          <h4 className="line-clamp-2 text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
            {product.title}
          </h4>
        </Link>

        {/* Rating Star Vector Row */}
        <div className="flex items-center gap-1 mb-2">
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
          <span className="text-[10px] font-bold text-slate-400">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Leaf Subcategory Badge Indicator Tag */}
        <div className="mb-2">
          <span className="bg-slate-100 text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded-md">
            {product.subCategory}
          </span>
        </div>

        {/* Pricing Matrix Stack */}
        <div className="mt-auto pt-2 border-t border-slate-50">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm font-black text-slate-950">
              {/* Fallback pattern to catch numerical pricing safely */}
              ₦{(product.price || 0).toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-[11px] text-slate-400 line-through font-medium">
                ₦{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= CARD ACTION CTA INTERACTION ROW ================= */}
      <div className="mt-3.5 grid grid-cols-4 gap-1.5 border-t border-slate-100 pt-3">
        {/* Action: Add Product to Cart */}
        <button
          onClick={() => dispatch(addToCart(product))}
          className="cursor-pointer col-span-2 inline-flex items-center justify-center gap-1 rounded-lg bg-blue-600 px-2 py-1.5 text-xs font-bold text-white transition-all hover:bg-blue-700 active:scale-95"
        >
          <ShoppingCart className="h-3 w-3 stroke-[2.5]" />
          <span>Buy Now</span>
        </button>
        
        {/* Navigation Detail Route Element Link */}
        <Link
          href={productDetailsUrl}
          onClick={() => onViewDetails?.(product)}
          className="cursor-pointer col-span-1 inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600 active:scale-95"
          aria-label="View Product Details"
        >
          <Eye className="h-3 w-3" />
        </Link>
        
        {/* Action: Toggle Product inside Wishlist Array Slice */}
        <button
          onClick={() => dispatch(toggleWishlist(product))}
          className="cursor-pointer col-span-1 inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-red-500 active:scale-95"
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`h-3 w-3 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500 border-red-500' : ''}`} />
        </button>
      </div>

    </div>
  );
}