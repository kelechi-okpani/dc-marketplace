'use client';

import React from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { selectCartTotalAmount } from '@/store/selectors';
import { 
  Trash2, ShoppingBag, ArrowRight, Minus, Plus, 
  ShieldCheck, ArrowLeft 
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
            <ShoppingBag className="h-6 w-6 text-blue-600" />
            Shopping Cart ({cartItems.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Review escrow-protected orders and adjust item quantities before payment routing.
          </p>
        </header>

        {/* Layout Conditonal Tree */}
        {cartItems.length === 0 ? (
          <div className="w-full bg-white border border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center text-center max-w-xl mx-auto my-12 shadow-3xs">
            <div className="h-14 w-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">Your cart is empty</h3>
            <p className="text-xs text-slate-400 font-medium max-w-xs mt-1.5 leading-normal mb-6">
              Explore our verified manufacturer catalog to populate items here.
            </p>
            <Link 
              href="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-lg transition-colors shadow-xs"
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
                  className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="h-20 w-20 object-cover rounded-lg bg-slate-50 border border-slate-100 shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[9px] font-black tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">
                        {item.brand}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 max-w-[280px] md:max-w-[400px]">
                        {item.title}
                      </h3>
                      <p className="text-xs font-black text-slate-950">
                        {formatNaira(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Modifier Block */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50/50">
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-900 select-none">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Checkout Receipt Aggregator */}
            <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-6">
              <div className="space-y-1.5">
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Order Ledger</h2>
                <p className="text-[11px] text-slate-500 leading-normal">Final calculation metrics before checkout pipeline initialization.</p>
              </div>

              <div className="space-y-3 border-t border-b border-slate-100 py-4">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Subtotal Matrix</span>
                  <span className="font-bold text-slate-800">{formatNaira(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Escrow Routing Fee</span>
                  <span className="text-emerald-600 font-bold uppercase tracking-wide text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded-md">FREE</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-900">Total Valuation:</span>
                <span className="text-xl font-black text-slate-950">{formatNaira(cartTotal)}</span>
              </div>

              <div className="space-y-3 pt-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs active:scale-99 cursor-pointer group">
                  <span>Proceed To Secure Escrow</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                
                <div className="flex gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] leading-relaxed text-slate-500 font-medium">
                  <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <p>Protected securely. Funds are released exclusively upon verified product delivery confirmation metrics.</p>
                </div>
              </div>
            </aside>

          </div>
        )}

      </div>
    </div>
  );
}