'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function BuyerRapidOnboarding() {
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+234');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });

  // Dynamic flag rendering dictionary based on code selection matches
  const getFlagEmoji = (code: string) => {
    switch (code) {
      case '+234': return '🇳🇬';
      case '+1': return '🇺🇸';
      case '+44': return '🇬🇧';
      default: return '🏳️';
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans text-slate-900 selection:bg-green-600/20 relative">
      
      {/* Background ambient grid mesh structure overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Center Layout Module Form Wrap */}
      <main className="w-full max-w-6xl mx-auto my-auto py-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side Branding Header section */}
        <div className="md:col-span-5 space-y-2 md:text-left text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-none">
         Create Your Account
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">
          Provide your details to get instant access to the marketplace.
          </p>
        </div>

        {/* Right Aspect Form Workspace Component Layer Container */}
        <div className="md:col-span-7 w-full max-w-md mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-100 relative">
          
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            
            {/* Full Name Block */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="e.g., John Smith"
                className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-900 placeholder-slate-400 transition-all focus:border-green-600 focus:outline-none focus:ring-4 focus:ring-green-600/10 font-medium shadow-xs"
              />
            </div>

            {/* Email Address Block */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="e.g., john.smith@company.com"
                className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-900 placeholder-slate-400 transition-all focus:border-green-600 focus:outline-none focus:ring-4 focus:ring-green-600/10 font-medium shadow-xs"
              />
            </div>

            {/* Password Block */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 pr-10 px-4 text-slate-900 placeholder-slate-400 transition-all focus:border-green-600 focus:outline-none focus:ring-4 focus:ring-green-600/10 font-medium shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2.5 right-3 h-7 w-7 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold pl-1">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Combined Country Selector + Phone Input Block */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Phone Number
              </label>
              <div className="flex items-center rounded-xl border border-slate-300 bg-white overflow-hidden focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-600/10 transition-all shadow-xs">
                
                {/* Dynamic Region Dropdown Selector */}
                <div className="relative bg-slate-50 border-r border-slate-200 px-3 py-3 flex items-center gap-1 shrink-0">
                  <span className="text-xs">{getFlagEmoji(countryCode)}</span>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  >
                    <option value="+234">🇳🇬 +234</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <span className="text-xs font-bold text-slate-600 font-mono pr-1">{countryCode}</span>
                  <span className="block border-t border-r border-slate-500 rotate-135 w-1 h-1 mt-0.5" />
                </div>

                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="803 123 4567"
                  className="w-full text-xs bg-transparent py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none font-medium font-mono"
                />
              </div>
            </div>

            {/* Action Button Trigger */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full text-center bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-black py-3.5 px-4 rounded-xl transition-all shadow-md shadow-green-600/10 active:scale-98 cursor-pointer"
              >
                Create Account
              </button>
            </div>

          </form>

          {/* Redirection Link Block */}
          <div className="text-center mt-4">
            <p className="text-[11px] text-slate-500 font-medium">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-green-700 font-bold hover:underline">
                Log in
              </Link>
            </p>
          </div>

        </div>
      </main>

    </div>
  );
}