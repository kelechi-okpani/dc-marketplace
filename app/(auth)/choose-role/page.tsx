'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Store, Wrench, ShieldCheck, HelpCircle } from 'lucide-react';

type RoleId = 'buyer' | 'seller' | 'artisan' | 'admin';

export default function RoleSelectionPortal() {
  const [selectedRole, setSelectedRole] = useState<RoleId>('artisan');

  const roles = [
    {
      id: 'buyer' as RoleId,
      title: 'Buyer',
      description: 'Browse and purchase goods or services.',
      icon: ShoppingCart,
      path: '/auth/signup/buyer'
    },
    {
      id: 'seller' as RoleId,
      title: 'Seller',
      description: 'Manage products, process orders, and track sales.',
      icon: Store,
      path: '/auth/signup/seller'
    },
    {
      id: 'artisan' as RoleId,
      title: 'Artisan',
      description: 'Showcase unique crafts and receive gig assignments.',
      icon: Wrench,
      path: '/auth/signup/artisan'
    },
    {
      id: 'admin' as RoleId,
      title: 'Super Admin',
      description: 'Full system access for governance and oversight.',
      icon: ShieldCheck,
      path: '/auth/admin/login'
    }
  ];

  const activeRoleDetails = roles.find(r => r.id === selectedRole);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#002B7F] via-[#001E56] to-[#000F30] flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans text-white selection:bg-blue-500/30">
      
      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-white flex items-center justify-center shadow-md">
            <span className="text-[#002B7F] font-black text-base">D</span>
          </div>
          <span className="font-black text-xs sm:text-sm tracking-wider uppercase">
            Dominion Enterprise Marketplace
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <button className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer">
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </button>
          <Link href="/auth/login" className="border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-lg text-white transition-all text-xs font-bold">
            Sign In
          </Link>
        </div>
      </header>

      {/* Center Dynamic Selection Frame */}
      <main className="w-full max-w-4xl mx-auto my-auto py-8 flex flex-col items-center">
        <div className="text-center space-y-2 mb-10 max-w-xl">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Welcome. Choose Your Role.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300/90 font-medium">
            Select your access level to continue to the hybrid marketplace.
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 cursor-pointer border backdrop-blur-md ${
                  isSelected
                    ? 'bg-white/10 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.35)] ring-2 ring-blue-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8 shadow-md'
                }`}
              >
                {/* Visual Glow Indicator ring behind icon */}
                <div className={`p-4 rounded-xl mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                  isSelected ? 'bg-blue-500/20 text-white' : 'bg-white/5 text-slate-300'
                }`}>
                  <IconComponent className="h-8 w-8 stroke-[1.75]" />
                </div>

                <h3 className="text-base font-bold tracking-wide mb-1">{role.title}</h3>
                <p className="text-xs text-slate-300 font-medium max-w-[220px] leading-relaxed">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Context Action Trigger */}
        <div className="w-full max-w-md mt-10">
          <Link
            href={activeRoleDetails?.path || '#'}
            className="w-full inline-flex items-center justify-center text-center rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-xs sm:text-sm font-bold text-white py-3.5 px-6 transition-all shadow-lg shadow-blue-600/20 tracking-wide capitalize"
          >
            Continue with {selectedRole} (1 selected)
          </Link>
        </div>
      </main>

      {/* Micro-Footer block */}
      <footer className="w-full text-center py-2 text-[11px] text-slate-400 font-medium">
        © 2026 Dominion Hybrid Systems. Secure Gateway Infrastructure.
      </footer>
    </div>
  );
}