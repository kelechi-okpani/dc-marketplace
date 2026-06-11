'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Swapped native img for optimized Next.js Image
import { useAppDispatch, useAppSelector } from '@/store/store';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { selectCartTotalAmount } from '@/store/selectors';
import { 
  Trash2, ShoppingBag, ArrowRight, Minus, Plus, 
  ShieldCheck, ArrowLeft, Coins, ReceiptText
} from 'lucide-react';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartTotal = useAppSelector(selectCartTotalAmount);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Ambient Background Color Glows */}
      <div className="absolute top-0 right-0 h-[350px] w-[350px] rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-400/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-12 left-[-50px] h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-emerald-400/5 to-blue-400/10 blur-[90px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Marketplace
          </Link>
        </div>

        {/* Header Zone */}
        <header className="border-b border-slate-200/80 pb-6 mb-10">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/15">
              <ShoppingBag className="h-5 w-5" />
            </div>
            Shopping Cart 
            <span className="text-sm font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100 ml-1">
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 max-w-2xl leading-relaxed">
            Review escrow-protected orders and adjust item quantities before transaction pipeline routing.
          </p>
        </header>

        {/* Layout Conditional Tree */}
        {cartItems.length === 0 ? (
          <div className="w-full bg-white border border-dashed border-slate-300 rounded-3xl p-16 flex flex-col items-center text-center max-w-xl mx-auto my-12 shadow-xl shadow-slate-200/50">
            <div className="h-16 w-16 bg-gradient-to-tr from-indigo-50 to-violet-50 text-indigo-500 border border-indigo-100 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">Your cart is empty</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xs mt-2 leading-relaxed mb-8">
              Explore our verified merchant catalog to find items protected by safe escrow channels.
            </p>
            <Link 
              href="/" 
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs uppercase tracking-widest py-3 px-8 rounded-xl transition-all shadow-md shadow-indigo-600/10 active:scale-98"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Rows */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-indigo-200/80 hover:shadow-lg hover:shadow-indigo-950/5 transition-all duration-300 group/row"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative h-20 w-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0 shadow-inner group-hover/row:border-indigo-100 transition-colors">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.title} 
                        fill
                        sizes="80px"
                        className="object-cover object-center group-hover/row:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <span className="inline-block text-[9px] font-black tracking-widest text-indigo-600 bg-indigo-50/70 border border-indigo-100/60 px-2 py-0.5 rounded-md uppercase">
                        {item.brand}
                      </span>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1 max-w-[280px] md:max-w-[360px]">
                        {item.title}
                      </h3>
                      <p className="text-sm font-black text-slate-950 bg-slate-50 inline-block px-2 py-0.5 rounded-md border border-slate-100">
                        {formatNaira(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Modifier Block */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50/80 p-0.5 shadow-2xs">
                      <button 
                        type="button"
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all cursor-pointer shadow-none hover:shadow-xs active:scale-90"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-slate-900 select-none">
                        {item.quantity}
                      </span>
                      <button 
                        type="button"
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all cursor-pointer shadow-none hover:shadow-xs active:scale-90"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button 
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="h-9 w-9 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Checkout Receipt Aggregator */}
            <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/40 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-2.5 pb-2">
                <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <ReceiptText className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Order Ledger</h2>
                  <p className="text-[10px] text-slate-400 font-medium">Final balance calculations</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-b border-slate-100 py-4">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Subtotal Matrix</span>
                  <span className="text-slate-900 font-black">{formatNaira(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1">
                    Escrow Routing Fee
                  </span>
                  <span className="text-emerald-700 font-black tracking-widest text-[9px] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md uppercase">
                    FREE
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Total Valuation:</span>
                <span className="text-2xl font-black text-slate-950 tracking-tight bg-gradient-to-r from-slate-950 to-indigo-900 bg-clip-text text-transparent">
                  {formatNaira(cartTotal)}
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <button className="w-full bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:via-indigo-500 hover:to-violet-500 text-white font-black text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/10 active:scale-99 cursor-pointer group">
                  <Coins className="h-4 w-4 text-indigo-200" />
                  <span>Proceed To Secure Escrow</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white/80 transition-transform group-hover:translate-x-0.5" />
                </button>
                
                <div className="flex gap-3 bg-gradient-to-br from-indigo-50/40 via-indigo-50/20 to-transparent p-4 rounded-xl border border-indigo-100/60 text-[11px] leading-relaxed text-slate-500 font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
                  <p>
                    Protected by structural security. Funds remain safely inside our network system and are released exclusively upon verified product delivery confirmation.
                  </p>
                </div>
              </div>
            </aside>

          </div>
        )}

      </div>
    </div>
  );
}