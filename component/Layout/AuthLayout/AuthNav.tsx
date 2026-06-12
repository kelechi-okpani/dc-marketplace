'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

export default function AuthNav() {
  return (
    <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 border-b border-slate-100">
      {/* Brand Architecture Layout */}
         <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="group flex items-center focus:outline-none">
                <div className="relative h-7 w-48 sm:h-12 sm:w-56 md:w-60 transition-all">
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


      {/* Global Context Triggers */}
      <div className="flex items-center gap-4 text-xs font-semibold">
        <button 
          type="button" 
          className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <HelpCircle className="h-4 w-4" />
          <span>Help</span>
        </button>
        <Link 
          href="/auth/signin" 
          className="border border-slate-200 bg-slate-50 hover:bg-slate-100 px-4 py-1.5 rounded-lg text-slate-700 transition-all text-xs font-bold"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}