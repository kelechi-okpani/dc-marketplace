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
      path: '/signup/buyer'
    },
      {
      id: 'artisan' as RoleId,
      title: 'Artisan',
      description: 'Showcase unique crafts and receive gig assignments.',
      icon: Wrench,
      path: '/signup/artisan'
    },
    {
      id: 'seller' as RoleId,
      title: 'Seller Merchant',
      description: 'Manage products, process orders, and track sales.',
      icon: Store,
      path: '/signup/seller'
    },
  
    {
      id: 'admin' as RoleId,
      title: 'Super Admin',
      description: 'Full system access for governance and oversight.',
      icon: ShieldCheck,
      path: '/admin/login'
    }
  ];

  const activeRoleDetails = roles.find(r => r.id === selectedRole);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans text-slate-800 antialiased selection:bg-green-600/20">


      {/* Center Dynamic Selection Frame */}
      <main className="w-full max-w-4xl mx-auto my-auto py-12 flex flex-col items-center">
        <div className="text-center space-y-2 mb-10 max-w-xl">
          <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Welcome. Choose Your Account.
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
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
                className={`relative group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'bg-green-50/40 border-green-600 shadow-xs ring-1 ring-green-600'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-xs'
                }`}
              >
                {/* Visual Icon Container */}
                <div className={`p-4 rounded-xl mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                  isSelected ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  <IconComponent className="h-6 w-6 stroke-[2]" />
                </div>

                <h3 className={`text-base font-black tracking-wide mb-1 ${isSelected ? 'text-green-700' : 'text-slate-800'}`}>
                  {role.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium max-w-[220px] leading-relaxed">
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
            className="w-full inline-flex items-center justify-center text-center rounded-xl bg-green-600 hover:bg-green-700 active:scale-98 text-xs sm:text-sm font-black text-white py-3.5 px-6 transition-all shadow-md shadow-green-600/10 tracking-wide capitalize"
          >
            Continue with {selectedRole}
          </Link>
        </div>
      </main>
    </div>
  );
}