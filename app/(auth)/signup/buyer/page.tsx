'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function BuyerRapidOnboarding() {
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#EBF2FF] via-[#E4EDFF] to-[#D5E4FF] flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans text-slate-900 selection:bg-blue-600/20 relative">
      
      {/* Background ambient abstract mesh geometric structures overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Top Brand Minimal Row alignment tracking layout item */}
      <header className="w-full max-w-7xl mx-auto flex items-center gap-1.5 py-2 relative z-10">
        <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center shadow-xs">
          <span className="text-white font-black text-xs">D</span>
        </div>
        <span className="font-extrabold text-xs text-blue-900 tracking-wide">
          Dominion <span className="text-slate-400 font-medium">| Enterprise Marketplace</span>
        </span>
      </header>

      {/* Center Layout Module Form Wrap */}
      <main className="w-full max-w-4xl mx-auto my-auto py-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Aspect Side Structural Page Subtitles section */}
        <div className="md:col-span-5 space-y-2 md:text-left text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-blue-950 font-black tracking-tight leading-none">
            Buyer Rapid Onboarding
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-medium tracking-wide">
            Step 3 of 4: Complete Your Profile for Instant Access
          </p>
        </div>

        {/* Right Aspect Form Workspace Component Layer Container */}
        <div className="md:col-span-7 w-full max-w-md mx-auto bg-white rounded-3xl border-2 border-blue-200 p-6 sm:p-8 shadow-[0_15px_40px_rgba(59,130,246,0.15)] relative">
          
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
                className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium shadow-xs"
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
                className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium shadow-xs"
              />
            </div>

            {/* Password Block Input Element segment configuration */}
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
                  className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 pr-10 mercantile px-4 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium shadow-xs"
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

            {/* Structured Combined Select + Phone Number module component configuration */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Phone Number
              </label>
              <div className="flex items-center rounded-xl border border-slate-300 bg-white overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-xs">
                
                {/* Simulated Region Dropdown selector */}
                <div className="relative bg-slate-50 border-r border-slate-200 px-3 py-3 flex items-center gap-1 shrink-0">
                  <span className="text-xs">🇺🇸</span>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+234">🇳🇬 +234</option>
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
                  placeholder="555-123-4567"
                  className="w-full text-xs bg-transparent py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none font-medium font-mono"
                />
              </div>
            </div>

            {/* Submit Action Execution Module Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full text-center bg-gradient-to-b from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white text-xs sm:text-sm font-black py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-900/30 active:scale-98 cursor-pointer border-t border-blue-500/20"
              >
                Create Account
              </button>
            </div>

          </form>

          {/* Account Login Navigation element redirection link alignment layout block */}
          <div className="text-center mt-4">
            <p className="text-[11px] text-slate-500 font-medium">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-800 font-bold hover:underline">
                Log in
              </Link>
            </p>
          </div>

        </div>
      </main>

      <footer className="w-full" />
    </div>
  );
}