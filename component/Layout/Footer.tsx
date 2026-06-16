'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6'; 

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerData: FooterSection[] = [
  {
    title: 'Marketplace',
    links: [
  { label: 'Marketplace', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Agro Products', href: '/agric' },
  { label: 'Services', href: '/services' },

    ],
  },
  {
    title: 'Escrow Security',
    links: [
      { label: 'Escrow Hub', href: '/escrow' },
  
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Support Channels', href: '/support' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200/60 mt-20 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ================= TOP LINK GRID ================= */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5 items-start">
          
          {/* Brand Descriptive Statement */}
          <div className="col-span-2 flex flex-col gap-3">
            <Link href="/" className="group flex items-center font-sans tracking-tight">
              <Image
                src="/dc.svg"
                alt="DC Marketplace Logo"
                width={200}     
                height={100}     
                priority       
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Nigeria's dependable enterprise hybrid multi-role marketplace, delivering physical trades and on-demand verified services guarded by secure non-custodial escrow systems.
            </p>
            {/* Trust Indicator */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 rounded-lg px-2.5 py-1 w-fit mt-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              100% Secure Escrow Protection
            </div>
          </div>

          {/* Dynamic Link Menus */}
          {footerData.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                {section.title}
              </h5>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-emerald-600 hover:translate-x-0.5 transition-all duration-200 ease-in-out"
                    >
                      {link.label}
                      {link.isExternal && <ArrowUpRight className="h-3 w-3 opacity-60" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ================= BOUNDARY DIVIDER ================= */}
        <div className="border-t border-slate-200/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright Context Statement */}
          <p className="text-[11px] font-medium text-slate-400 text-center sm:text-left order-2 sm:order-1">
            &copy; {currentYear} DC Marketplace. Fully secure multi-role settlement architecture. All protective escrow rights reserved.
          </p>

          {/* Social Connections Tray */}
          <div className="flex items-center gap-2.5 order-1 sm:order-2">
            {[
              { icon: FaXTwitter, href: '#', label: 'Twitter Profile' },
              { icon: FaLinkedinIn, href: '#', label: 'LinkedIn Page' },
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-white hover:bg-slate-100 border border-slate-200/60 text-slate-500 hover:text-emerald-600 rounded-xl transition-all shadow-xs active:scale-95"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

        </div>

      </div>
    </footer>
  );
}