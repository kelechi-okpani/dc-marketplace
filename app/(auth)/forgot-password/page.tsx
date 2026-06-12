'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans text-slate-900 selection:bg-green-600/20 relative">
      
      {/* Background ambient grid mesh structure overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Center Layout Module Form Wrap */}
      <main className="w-full max-w-6xl mx-auto my-auto py-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side Branding Header section */}
        <div className="md:col-span-5 space-y-2 md:text-left text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-none">
            Recover Password
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">
            No worries, it happens. Enter your registered account email address to get back on track.
          </p>
        </div>

        {/* Right Aspect Form Workspace Component Layer Container */}
        <div className="md:col-span-7 w-full max-w-md mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-100 relative">
          
          {!isSubmitted ? (
            <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-4">
              
              {/* Email Address Block */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., john.smith@company.com"
                  className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-900 placeholder-slate-400 transition-all focus:border-green-600 focus:outline-none focus:ring-4 focus:ring-green-600/10 font-medium shadow-xs"
                />
              </div>

              {/* Action Button Trigger */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full text-center bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-black py-3.5 px-4 rounded-xl transition-all shadow-md shadow-green-600/10 active:scale-98 cursor-pointer"
                >
                  Send Reset Link
                </button>
              </div>

            </form>
          ) : (
            /* Success Feedback Layout Block */
            <div className="text-center py-4 space-y-3">
              <div className="h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h3 className="text-sm font-bold text-slate-900">Check your email</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                We have sent secure security instructions to <span className="font-semibold text-slate-800">{email}</span> if it matches an existing account.
              </p>
            </div>
          )}

          {/* Redirection Link Block */}
          <div className="text-center mt-6 pt-4 border-t border-slate-100">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-green-700 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to sign in
            </Link>
          </div>

        </div>
      </main>

    </div>
  );
}