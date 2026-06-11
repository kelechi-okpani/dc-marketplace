
'use client';

import React, { useState } from 'react';
import { Mail, Key, ShieldAlert, PhoneIncoming, Lock, Sparkles } from 'lucide-react';

export default function SuperAdminSecureAccess() {
  const [mfaSent, setMfaSent] = useState(false);
  const [formData, setFormData] = useState({
    corporateEmail: '',
    enterpriseId: '',
    keyPhrase: '',
    mfaCode: ''
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#001D4A] via-[#002B7F] to-[#0A1128] flex flex-col items-center justify-between font-sans text-slate-900 selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* Structural Network circuit blueprint abstract elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />
      
      {/* Top Left Super Admin Identification Anchor Badge banner header */}
      <div className="absolute top-6 left-6 hidden md:block">
        <h1 className="text-xl lg:text-3xl font-black uppercase tracking-tight text-white/90 drop-shadow-md">
          Super Admin Secure Access
        </h1>
      </div>

      {/* Main Secure Layout Workspace Layer */}
      <main className="w-full max-w-5xl mx-auto my-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side Visual Indicator Lock Asset Module representing 3D padlock vector logo in image_6792d9.png */}
        <div className="md:col-span-5 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="relative group">
            {/* Soft Ambient Inner Glow Layout component */}
            <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-2xl group-hover:bg-blue-500/30 transition-all duration-300" />
            <div className="relative h-44 w-44 rounded-3xl bg-gradient-to-b from-blue-900 to-slate-950 border border-blue-400/40 p-6 flex flex-col items-center justify-center shadow-2xl">
              <Lock className="h-20 w-20 text-blue-400 stroke-[1.25] drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              <div className="mt-2 flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-blue-400">
                <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
                <span>Vault Vault</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block space-y-1">
            <p className="text-xs font-black text-blue-400 uppercase tracking-widest">Network Node Status</p>
            <p className="text-[11px] font-bold text-slate-400">Encrypted AES-256 Session Initialized.</p>
          </div>
        </div>

        {/* Right Side Secure Credential Validation Form Component Card */}
        <div className="md:col-span-7 w-full max-w-lg mx-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden border border-slate-200">
          
          {/* Internal Portal Top Banner line strip */}
          <div className="bg-[#004BCE] text-white px-4 py-3 flex items-center justify-center gap-2 border-b border-blue-700">
            <span className="text-sm">👑</span>
            <span className="text-[10px] font-black uppercase tracking-widest">
              Dominion Enterprise Secure Portal
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Title block banner information content segment */}
            <div className="space-y-1 text-center">
              <h2 className="text-xl font-black tracking-wide text-[#002B7F] uppercase">
                Super Admin Authentication
              </h2>
              <p className="text-xs font-bold text-slate-500 max-w-sm mx-auto leading-normal">
                High-Security Access for System Control. All Actions Monitored.
              </p>
            </div>

            {/* Credential Data Form Controls layout structure block */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              
              {/* Corporate Email Address Field */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Corporate Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute top-3 left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    required
                    value={formData.corporateEmail}
                    onChange={(e) => setFormData({...formData, corporateEmail: e.target.value})}
                    placeholder="enter.corporate.email@dominion.corp"
                    className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 pr-4 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Enterprise ID Code Field Input row */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Enterprise ID Code
                </label>
                <div className="relative group">
                  <Key className="absolute top-3 left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    required
                    value={formData.enterpriseId}
                    onChange={(e) => setFormData({...formData, enterpriseId: e.target.value})}
                    placeholder="e.g., DMN-8274-SA"
                    className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 pr-4 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Administrative Key Phrase Field module block */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Administrative Key Phrase
                </label>
                <div className="relative group">
                  <ShieldAlert className="absolute top-3 left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="password"
                    required
                    value={formData.keyPhrase}
                    onChange={(e) => setFormData({...formData, keyPhrase: e.target.value})}
                    placeholder="Enter your unique key phrase"
                    className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 pr-4 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Multi-Factor Authentication Nested Panel Card Container */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-slate-900">Multi-Factor Authentication Required</h4>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setMfaSent(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-700 hover:bg-slate-50 active:scale-98 transition-all cursor-pointer shadow-2xs"
                  >
                    <PhoneIncoming className="h-3.5 w-3.5 text-slate-500" />
                    <span>Send Verification Code</span>
                  </button>
                </div>

                <div className="relative group">
                  <Lock className="absolute top-3 left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    maxLength={6}
                    disabled={!mfaSent}
                    value={formData.mfaCode}
                    onChange={(e) => setFormData({...formData, mfaCode: e.target.value})}
                    placeholder={mfaSent ? "Enter 6-Digit Verification Code" : "Click button above to unlock field input"}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white disabled:bg-slate-100 disabled:text-slate-400 py-3 pr-4 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 transition-all font-mono font-bold tracking-widest text-center"
                  />
                </div>
              </div>

              {/* Authenticate Vault Verification Access Button Trigger */}
              <button
                type="submit"
                className="w-full bg-[#002B7F] hover:bg-blue-900 text-white text-xs font-black uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-98 mt-2 cursor-pointer"
              >
                Secure Login
              </button>
            </form>

            {/* Need Help Link Anchor segment */}
            <div className="text-center text-[11px] font-bold text-slate-500 pt-1 border-t border-slate-100">
              Need Help?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Contact Security Admin
              </a>
            </div>

          </div>

          {/* Copyright System Core Footnote Frame */}
          <div className="bg-slate-50 text-center py-3 text-[10px] font-medium text-slate-400 border-t border-slate-100 tracking-wide">
            © 2026 Dominion Hybrid Systems. Restricted Access Only. Unauthorized access is prohibited.
          </div>

        </div>
      </main>

      <footer className="w-full py-4" />
    </div>
  );
}