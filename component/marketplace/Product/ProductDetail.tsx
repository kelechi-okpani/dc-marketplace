'use client';

import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, Heart, Share2, Star, 
  ShoppingCart 
} from 'lucide-react';
import { Product } from '@/component/utils/types';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const discountPercentage = useMemo(() => {
    if (product.oldPrice && product.price) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  }, [product.price, product.oldPrice]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 font-sans text-slate-800 antialiased">
      
      {/* ================= HEADER STRIP ================= */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-[1240px] px-4 py-3 flex items-center justify-between text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <span>Home</span>
            <ChevronRight className="h-3 w-3" />
            <span className="uppercase">{product.category}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-800 truncate max-w-xs">{product.title}</span>
          </div>
          <button 
            type="button"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="flex items-center gap-1 hover:text-[#1877F2] transition-colors cursor-pointer"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'text-[#1877F2] fill-[#1877F2]' : ''}`} />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-[1240px] px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: IMAGE GALLERY */}
          <section className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="aspect-4/3 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center relative">
              <img 
                src={product.imageUrl} 
                alt={product.title}
                className="object-cover w-full h-full transition-all duration-300"
              />
            </div>
            
            <div className="border-t border-slate-100 mt-6 pt-4">
              <span className="text-[11px] block font-black text-slate-400 uppercase tracking-wider mb-2">Share:</span>
              <button type="button" className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-slate-800">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* RIGHT PANEL: TRANSACTION MATRIX */}
          <section className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              {product.isOfficialStore && (
                <span className="bg-[#1877F2] text-white font-black uppercase text-[10px] px-2 py-0.5 rounded-sm">Official Store</span>
              )}
              <span className="text-xs text-slate-400 font-medium">Brand: <span className="text-[#1877F2] font-bold">{product.brand}</span></span>
            </div>

            <h1 className="text-xl font-black text-slate-900 leading-snug">{product.title}</h1>

            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-4">
              <div className="flex text-[#1877F2]">
                {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < (product.rating || 0) ? 'fill-current' : 'text-slate-200'}`} />)}
              </div>
              <span className="text-xs text-[#1877F2] font-bold">({product.reviewsCount} ratings)</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-slate-900">₦ {product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-sm font-semibold text-slate-400 line-through">₦ {product.oldPrice.toLocaleString()}</span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-[#E7F3FF] text-[#1877F2] font-black text-xs px-1.5 py-0.5 rounded">-{discountPercentage}%</span>
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <button className="w-[12rem] bg-[#1877F2] hover:bg-[#1565d3] text-white font-black text-xs uppercase py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>

            {/* SPECS TABS */}
            <div className="border border-slate-200 rounded-xl overflow-hidden mt-6">
              <div className="flex bg-slate-50 border-b border-slate-200">
                {(['description', 'specs'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-xs font-black uppercase ${activeTab === tab ? 'bg-white border-b-2 border-[#1877F2] text-[#1877F2]' : 'text-slate-400'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-4">
                {activeTab === 'description' && <p className="text-sm text-slate-600">{product.longDescription}</p>}
                {activeTab === 'specs' && (
                  <table className="w-full text-xs">
                    <tbody>
                      {Object.entries(product.technicalSpecs ?? {}).map(([key, value], i) => (
                        <tr key={key} className={i % 2 === 0 ? 'bg-slate-50' : ''}>
                          <td className="px-4 py-2 font-bold text-slate-500 capitalize">{key}</td>
                          <td className="px-4 py-2 text-slate-800">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs text-slate-600">
              <p className="font-bold text-slate-800 mb-1">Warranty</p>
              <p>{product.warranty}</p>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}