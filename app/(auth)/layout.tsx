import React from 'react';
import { Inter } from 'next/font/google';
import AuthNav from '@/component/Layout/AuthLayout/AuthNav';
import AuthFooter from '@/component/Layout/AuthLayout/AuthFooter';

// Optimize typography loading for sleek, high-fidelity UI layout
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Authentication Portal | Dominion Enterprise',
  description: 'Secure, multi-role gateway infrastructure for Dominion Enterprise Marketplace.',
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={`${inter.variable} font-sans antialiased bg-white text-slate-900`}>
      <div className="min-h-screen w-full relative overflow-x-hidden selection:bg-green-600/20">
        
        {/* Content Layer */}
        <div className="relative z-10 w-full min-h-screen flex flex-col">
          <AuthNav/>
          {children}
          <AuthFooter/> 
        </div>
        
      </div>
    </div>
  );
}