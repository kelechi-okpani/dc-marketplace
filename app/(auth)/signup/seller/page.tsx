'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Building, Layers, FileText, Mail, Lock, Eye, EyeOff } from 'lucide-react';

type AuthTab = 'signin' | 'signup';

export default function SellerCorporateOnboarding() {
  const [activeTab, setActiveTab] = useState<AuthTab>('signup');
  const [showPassword, setShowPassword] = useState(false);
  
  // Single, clean state container handling fields for both actions
  const [formData, setFormData] = useState({
    repName: '',
    businessName: '',
    category: '',
    taxId: '',
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'signup') {
      console.log('Processing Seller Registration Ledger:', formData);
      // Integrate registration logic / server action invocation here
    } else {
      console.log('Processing Seller Session Initialization:', {
        email: formData.email,
        password: formData.password
      });
      // Integrate authentication hook here
    }
  };

  return (
    <div className="min-h-screen bg-[#1E40AF] flex flex-col justify-between font-sans selection:bg-blue-900/40">
      
   

      {/* Main Content Form Card Workspace Frame */}
      <main className="w-full max-w-xl mx-auto my-auto p-4 z-10">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
          
          {/* Internal Sign-In / Sign-Up Dual Tab Strip */}
          <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-100 text-xs font-black text-center text-slate-400">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`py-3.5 border-r border-slate-100 uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                activeTab === 'signin' 
                  ? 'bg-white text-[#1E40AF] border-t-2 border-[#1E40AF]' 
                  : 'hover:bg-slate-100/70 text-slate-400'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`py-3.5 uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                activeTab === 'signup' 
                  ? 'bg-white text-[#1E40AF] border-t-2 border-[#1E40AF]' 
                  : 'hover:bg-slate-100/70 text-slate-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Contextual Header Generation Based on Tab State */}
            <div className="text-center space-y-1">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight transition-all">
                {activeTab === 'signup' ? (
                  <>
                    Seller Commercial Onboarding: <br />
                    <span className="text-[#1E40AF] font-extrabold text-sm sm:text-base tracking-normal">Dynamic Authentication Forms</span>
                  </>
                ) : (
                  <>
                    Welcome Back, Merchant <br />
                    <span className="text-[#1E40AF] font-extrabold text-sm sm:text-base tracking-normal">Access Your Vendor Dashboard</span>
                  </>
                )}
              </h2>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pt-2">
                {activeTab === 'signup' ? 'Step 3 of 4: Verification Details' : 'Secure Enterprise Portal'}
              </p>
            </div>

            {/* Micro Multi-step Progress Bar Indicator — Only visible during registration */}
            <div className={`w-full bg-slate-100 h-1.5 rounded-full overflow-hidden relative transition-all duration-300 ${
              activeTab === 'signup' ? 'opacity-100 max-h-2' : 'opacity-0 max-h-0'
            }`}>
              <div className="absolute top-0 left-0 bg-blue-600 h-full w-[75%] rounded-full transition-all duration-500" />
            </div>

            {/* Form Workspace Execution Interface */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {activeTab === 'signup' ? (
                /* ================= REGISTRATION FIELDS BLOCK ================= */
                <div className="space-y-4 animate-fadeIn">
                  {/* Representative Row */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 tracking-wide">
                      Legal Representative Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute top-3 left-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        required
                        value={formData.repName}
                        onChange={(e) => handleInputChange('repName', e.target.value)}
                        placeholder="Enter full name"
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Business Identification Field */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 tracking-wide">
                      Registered Business Name
                    </label>
                    <div className="relative group">
                      <Building className="absolute top-3 left-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        placeholder="Enter legal business name"
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Functional Dynamic Select Module: Category */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 tracking-wide">
                      Inventory Category
                    </label>
                    <div className="relative group">
                      <Layers className="absolute top-3 left-3 h-4 w-4 text-slate-400 pointer-events-none" />
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white py-3 pr-10 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all font-medium appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select a category (e.g., Electronics, Fashion, Services)</option>
                        <option value="electronics">Consumer Electronics & Hardware</option>
                        <option value="fashion">Luxury Fashion & Apparel Accessories</option>
                        <option value="raw-materials">Raw Materials & Technical Supply</option>
                        <option value="services">On-Demand Corporate Managed Services</option>
                      </select>
                      <div className="absolute top-4 right-4 h-4 w-4 text-slate-400 pointer-events-none border-l border-slate-100 pl-1.5">
                        <span className="block border-t border-r border-slate-500 rotate-135 w-1.5 h-1.5" />
                      </div>
                    </div>
                  </div>

                  {/* Tax or Business ID Row */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 tracking-wide">
                      Tax/Registration ID
                    </label>
                    <div className="relative group">
                      <FileText className="absolute top-3 left-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        required
                        value={formData.taxId}
                        onChange={(e) => handleInputChange('taxId', e.target.value)}
                        placeholder="Enter tax or business ID"
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* ================= SIGN IN FIELDS BLOCK ================= */
                <div className="space-y-4 animate-fadeIn">
                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 tracking-wide">
                      Merchant Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute top-3 left-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="merchant@company.com"
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Secure Password Input Field */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-bold text-slate-700 tracking-wide">
                        Password
                      </label>
                      <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute top-3 left-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white py-3 pr-10 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button Segment Layout */}
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-md shadow-blue-600/10 active:scale-98 cursor-pointer"
              >
                {activeTab === 'signup' ? 'Submit & Continue' : 'Authenticate Session'}
              </button>
            </form>

          </div>
        </div>
      </main>


    </div>
  );
}