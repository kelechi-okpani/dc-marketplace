import React from 'react';
import { Inter } from 'next/font/google';

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
    <div className={`${inter.variable} font-sans antialiased`}>
    
      <div className="min-h-screen w-full relative bg-[#090D1A] overflow-x-hidden selection:bg-blue-600/30">
        
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-950/40 blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full min-h-screen flex flex-col">
          {children}
        </div>
        
      </div>
    </div>
  );
}