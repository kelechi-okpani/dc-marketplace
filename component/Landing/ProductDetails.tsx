'use client';

import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, Heart, Facebook, Share2, Star, 
  AlertCircle, ShoppingCart, MessageSquare, Truck, 
  RotateCcw, Phone 
} from 'lucide-react';
import { mockProductDetails } from '../utils/data/mockProducts';



export default function ProductDetail() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedVariation, setSelectedVariation] = useState<string>(mockProductDetails.variations[0]);
  const [includeCrossSell, setIncludeCrossSell] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  // Compute multi-buy conditions directly from normalized price schemas
  const totalPurchasePrice = useMemo(() => {
    return includeCrossSell 
      ? mockProductDetails.price + mockProductDetails.crossSell.price 
      : mockProductDetails.price;
  }, [includeCrossSell]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 font-sans text-slate-800 antialiased">
      
      {/* ================= COMPACT BREADCRUMB HEADER STRIP ================= */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-[1240px] px-4 py-3 flex items-center justify-between text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <ChevronRight className="h-3 w-3" />
            <span className="hover:text-blue-600 cursor-pointer uppercase">{mockProductDetails.category}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-800 truncate max-w-xs">{mockProductDetails.title}</span>
          </div>
          <button 
            type="button"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer shrink-0 ml-4"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'text-red-500 fill-red-500' : ''}`} />
            <span className="hidden sm:inline">{isWishlisted ? 'Saved' : 'Save Item'}</span>
          </button>
        </div>
      </div>

      {/* ================= PRIMARY GRID CONTENT AREA ================= */}
      <main className="mx-auto max-w-[1240px] px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: IMAGE ARCHITECTURE GALLERY & SOCIAL (5 Columns) */}
          <section className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="aspect-4/3 rounded-lg overflow-hidden bg-slate-100 border border-slate-100 flex items-center justify-center relative">
              <img 
                src={mockProductDetails.images[selectedImageIndex]} 
                alt={mockProductDetails.title}
                className="object-cover w-full h-full transition-all duration-300"
              />
            
            </div>

            {/* Thumbnail Carousel Strip */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1 no-scrollbar">
              {mockProductDetails.images.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-16 rounded-md overflow-hidden bg-slate-50 border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImageIndex === idx ? 'border-blue-600 shadow-xs scale-95' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={img} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Social Share Footer Matrix */}
            <div className="border-t border-slate-100 mt-6 pt-4">
              <span className="text-[11px] block font-black text-slate-400 uppercase tracking-wider mb-2">
                Share this offering:
              </span>
              <div className="flex items-center gap-2">
                <button type="button" className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-blue-600 cursor-pointer">
                  <Facebook className="h-4 w-4 fill-current" />
                </button>
                <button type="button" className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-slate-800 cursor-pointer">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
              <button type="button" className="text-xs font-bold text-slate-400 hover:text-blue-600 mt-4 block text-left transition-colors cursor-pointer">
                Report incorrect product information
              </button>
            </div>
          </section>

          {/* RIGHT PANEL: TRANSACTION MATRIX & PARAMETERS (7 Columns) */}
          <section className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
            
            <div className="flex flex-wrap items-center gap-2">
              {mockProductDetails.isOfficialStore && (
                <span className="bg-blue-600 text-white font-black uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-sm">
                  Official Store
                </span>
              )}
              <span className="text-xs text-slate-400 font-medium">
                Brand: <span className="text-blue-600 font-bold hover:underline cursor-pointer">{mockProductDetails.brand}</span>
              </span>
            </div>

            <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight leading-snug">
              {mockProductDetails.title}
            </h1>

            {/* Ratings Summary Row */}
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-black text-slate-800">{mockProductDetails.rating}</span>
              <span className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                ({mockProductDetails.reviewCount} verified ratings)
              </span>
            </div>

            {/* Pricing Canvas Block Engine */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-slate-900">
                  ₦ {mockProductDetails.price.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-slate-400 line-through">
                  ₦ {mockProductDetails.originalPrice.toLocaleString()}
                </span>
                <span className="bg-amber-100 text-amber-700 font-black text-xs px-1.5 py-0.5 rounded">
                  -{mockProductDetails.discountPercentage}%
                </span>
              </div>
              <p className="text-xs font-black text-amber-600 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{mockProductDetails.stockStatus}</span>
              </p>
            </div>

            {/* VARIATION PICKER */}
            <div className="space-y-2.5">
              <span className="text-[11px] block font-black text-slate-400 uppercase tracking-widest">
                Variation Available:
              </span>
              <div className="flex flex-wrap gap-2">
                {mockProductDetails.variations.map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setSelectedVariation(v)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      selectedVariation === v
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-extrabold'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* CORE TRANSACTION & INTERACTION STACK */}
            <div className="space-y-3 pt-2">
              <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-wider py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer">
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>

              {/* INTEGRATED MERCHANT PANEL */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-full overflow-hidden bg-slate-200 relative shrink-0 border border-slate-200">
                    <img src={mockProductDetails.merchant.avatarUrl} alt="Merchant contact" className="object-cover w-full h-full" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] block font-black text-slate-400 uppercase tracking-wider">Verified Merchant</span>
                    <span className="text-xs font-bold text-slate-800 hover:underline cursor-pointer block truncate">
                      {mockProductDetails.merchant.name}
                    </span>
                  </div>
                </div>
                <button type="button" className="inline-flex items-center gap-1.5 border border-blue-600 text-blue-600 hover:bg-blue-50 bg-white px-3 py-2 rounded-lg text-xs font-black tracking-wide uppercase transition-all shrink-0 cursor-pointer">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Message Merchant</span>
                </button>
              </div>
            </div>

            {/* PROTECTION INSURANCE CROSS-SELL COMPONENT */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="bg-slate-50 px-4 py-2 flex items-center justify-between border-b border-slate-200">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Cross-Sell Opportunity</span>
                <span className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">Details</span>
              </div>
              <div className="p-4 flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="h-9 w-12 bg-blue-900 rounded text-white font-black text-xs flex items-center justify-center tracking-tight shrink-0">
                    {mockProductDetails.crossSell.logoText}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">
                      {mockProductDetails.crossSell.title}
                    </h4>
                    <span className="text-xs font-black text-slate-900 block mt-1">
                      + ₦ {mockProductDetails.crossSell.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeCrossSell}
                  onChange={(e) => setIncludeCrossSell(e.target.checked)}
                  className="h-4 w-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer mt-1"
                />
              </div>
              
              {includeCrossSell && (
                <div className="bg-amber-50/50 border-t border-slate-100 p-3 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">Bundle Price Matrix:</span>
                  <span className="font-black text-slate-900">₦ {totalPurchasePrice.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* SHIPPING ESTIMATION CALCULATOR PLATFORM */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Truck className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">{mockProductDetails.shippingInfo.estimation}</p>
                  <p className="text-slate-400 font-medium mt-0.5">
                    Shipping base rate fee metrics apply: ₦ {mockProductDetails.shippingInfo.baseCost.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
                <RotateCcw className="h-4 w-4 text-slate-400 shrink-0" />
                <p className="font-medium">
                  {mockProductDetails.shippingInfo.returnPolicy}{' '}
                  <span className="text-blue-600 font-bold hover:underline cursor-pointer">View details</span>
                </p>
              </div>
            </div>

            {/* MANUAL MANIFEST CALL BOX ROUTING */}
            <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2.5 border border-slate-200/60 text-xs font-bold text-slate-700">
              <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Call 02018883300 to finalize manual order routing options if desired.</span>
            </div>

          </section>
        </div>

        {/* ================= DETAILED BOTTOM NAVIGATION PARAMETER TABS ================= */}
        <section className="bg-white rounded-xl border border-slate-200 mt-8 overflow-hidden shadow-xs">
          <div className="flex border-b border-slate-200 bg-slate-50/50">
            {(['description', 'specs', 'reviews'] as const).map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-xs font-black tracking-wide uppercase border-b-2 transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600 bg-white font-black'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab === 'description' && 'Description'}
                {tab === 'specs' && 'Specifications'}
                {tab === 'reviews' && `Reviews (${mockProductDetails.reviewCount})`}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose prose-slate max-w-none text-xs md:text-sm leading-relaxed text-slate-600 font-medium">
                <p>{mockProductDetails.description}</p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <tbody>
                    {mockProductDetails.specifications.map((spec, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-black text-slate-500 border-r border-slate-200 w-1/3">{spec.label}</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100 max-w-sm">
                  <span className="text-3xl font-black text-slate-900">{mockProductDetails.rating}</span>
                  <div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-400">Composite rating score breakdown</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-medium">Verified customer feedback streams are aggregated dynamically.</p>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}