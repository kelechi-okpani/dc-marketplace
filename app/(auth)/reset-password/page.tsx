'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle implementation strategy logic execution here
    router.push('/signin');
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
            Set New Password
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">
            Create a secure password configuration that you don't use elsewhere to protect your marketplace profile.
          </p>
        </div>

        {/* Right Aspect Form Workspace Component Layer Container */}
        <div className="md:col-span-7 w-full max-w-md mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-100 relative">
          
          <form onSubmit={handleUpdate} className="space-y-4">
            
            {/* New Password Input Block */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                New Password
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

            {/* Confirm Password Input Block */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="••••••••"
                className="w-full text-xs rounded-xl border border-slate-300 bg-white py-3 px-4 text-slate-900 placeholder-slate-400 transition-all focus:border-green-600 focus:outline-none focus:ring-4 focus:ring-green-600/10 font-medium shadow-xs"
              />
            </div>

            {/* Action Button Trigger */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full text-center bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-black py-3.5 px-4 rounded-xl transition-all shadow-md shadow-green-600/10 active:scale-98 cursor-pointer"
              >
                Update Password
              </button>
            </div>

          </form>

        </div>
      </main>

    </div>
  );
}