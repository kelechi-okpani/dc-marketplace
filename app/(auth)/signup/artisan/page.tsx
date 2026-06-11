'use client';

import React, { useState } from 'react';
import { Briefcase, Wrench, Globe, Mail, Lock, Eye, EyeOff, Sliders, Link } from 'lucide-react';

export default function ArtisanRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [operatingRadius, setOperatingRadius] = useState(50);
  const [formData, setFormData] = useState({
    legalName: '',
    skillClass: '',
    portfolioUrl: '',
    email: '',
    password: ''
  });

  return (
    <div className="min-h-screen w-full relative bg-[url('/image_6792a0.png')] bg-cover bg-center flex items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* Absolute Fallback dark backdrop mask matching original vignette blur */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs z-0" />

      {/* High-fidelity Floating Frosted Container card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/40 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,43,127,0.3)] shadow-blue-500/10 text-white space-y-6">
        
        {/* Core Header Layout */}
        <div className="text-center space-y-4">
          <h1 className="text-xl sm:text-2xl font-black tracking-widest uppercase text-white">
            Artisan Portal
          </h1>
          
          {/* Authentic Segmented Control Toggle Pill */}
          <div className="bg-black/30 border border-white/5 rounded-xl p-1 grid grid-cols-2 max-w-[280px] mx-auto text-xs font-bold">
            <button type="button" className="py-2 px-4 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer">
              Sign In
            </button>
            <button type="button" className="py-2 px-4 rounded-lg bg-blue-600 text-white shadow-sm cursor-pointer">
              Sign Up
            </button>
          </div>
        </div>

        {/* Dynamic Structural Input Controls */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          
          {/* Legal Business Name Row */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide">
              Professional Legal Name
            </label>
            <div className="relative group">
              <Briefcase className="absolute top-3 left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                required
                value={formData.legalName}
                onChange={(e) => setFormData({...formData, legalName: e.target.value})}
                placeholder="e.g., Samuel Ade Artisans Ltd"
                className="w-full text-xs rounded-xl border border-white/10 bg-slate-950/40 py-3 pr-4 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
            </div>
          </div>

          {/* Trade Skill Classification Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide">
              Trade Skill Classification
            </label>
            <div className="relative group">
              <Wrench className="absolute top-3 left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                required
                value={formData.skillClass}
                onChange={(e) => setFormData({...formData, skillClass: e.target.value})}
                className="w-full text-xs rounded-xl border border-white/10 bg-slate-950/70 py-3 pr-10 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-slate-900 text-slate-400">Select Skill (e.g., Carpentry, Jewelry)</option>
                <option value="electrician" className="bg-slate-900 text-white">Electrician & Power Grid</option>
                <option value="plumbing" className="bg-slate-900 text-white">Hydraulic Systems & Plumbing</option>
                <option value="carpentry" className="bg-slate-900 text-white">Premium Woodcraft & Carpentry</option>
                <option value="fashion" className="bg-slate-900 text-white">Bespoke Couture Fashion Design</option>
              </select>
              <div className="absolute top-3.5 right-3.5 h-4 w-4 text-slate-400 pointer-events-none border-l border-white/10 pl-1">
                <span className="block border-t border-r border-slate-400 rotate-135 w-1.5 h-1.5 mx-auto mt-0.5" />
              </div>
            </div>
          </div>

          {/* Custom Slider Module: Operating Radius */}
          <div className="space-y-2 py-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 uppercase tracking-wide">
              <span>Operating Radius (miles)</span>
              <span className="text-blue-400 font-mono tracking-normal">{operatingRadius} miles</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-950/30 border border-white/5 rounded-xl px-3 py-2">
              <input
                type="range"
                min="5"
                max="150"
                value={operatingRadius}
                onChange={(e) => setOperatingRadius(Number(e.target.value))}
                className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          {/* Portfolio URL Input */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide">
              Portfolio URL
            </label>
            <div className="relative group">
              <Globe className="absolute top-3 left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})}
                placeholder="https://yourwork.com"
                className="w-full text-xs rounded-xl border border-white/10 bg-slate-950/40 py-3 pr-4 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
            </div>
          </div>

          {/* Email Block */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute top-3 left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="artisan@dominion.corp"
                className="w-full text-xs rounded-xl border border-white/10 bg-slate-950/40 py-3 pr-4 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
            </div>
          </div>

          {/* Secure Password Complex Block */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute top-3 left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full text-xs rounded-xl border border-white/10 bg-slate-950/40 py-3 pr-10 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Action Block Container */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-blue-600/10 active:scale-98 tracking-wide cursor-pointer"
          >
            Create Artisan Account
          </button>
        </form>

        {/* Footer Redirect Navigation Element */}
        <div className="text-center space-y-4 pt-2">
          <p className="text-[11px] text-slate-400 font-medium">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-400 font-bold hover:underline">
              Sign In
            </Link>
          </p>
          <div className="border-t border-white/5 pt-3 flex justify-center items-center gap-1.5 text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
            <span>Dominion Marketplace</span>
          </div>
        </div>

      </div>
    </div>
  );
}