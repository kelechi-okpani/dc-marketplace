'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Coins, 
  Scale, 
  Search,
  ShoppingBag,
  Wrench,
  ChevronDown
} from 'lucide-react';

const faqs = [
  {
    q: "What exactly is an Escrow milestone account?",
    a: "Instead of paying an artisan or seller directly upfront, your funds are deposited into a locked, secure platform ledger channel. The funds are held safely by the system and are only released when you verify that the agreed stage of the project or item delivery has been completed perfectly."
  },
  {
    q: "What happens if an item or job is not completed?",
    a: "If a milestone isn't met, a package is never shipped, or the provider defaults, you can raise a dispute flag. Our 4-way platform mediation protocol steps in to evaluate the delivery ledger or work logs. If verified incomplete, your locked funds are refunded back to your wallet balance."
  },
  {
    q: "Are there any hidden fees for using Escrow protection?",
    a: "No hidden fees. We charge a flat 3% to 5% processing fee on completed contract releases depending on user membership tier, covering secure contract deployment and automated arbitration backing."
  },
  {
    q: "How long does dispute resolution take?",
    a: "Most disputes are resolved within 24 to 48 hours. Both parties submit tracking references, images, chat logs, or project scopes directly through their platform dashboards for immediate review by our neutral arbitration panels."
  }
];

export default function EscrowHub() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contractIdInput, setContractIdInput] = useState("");

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 text-slate-900 selection:bg-indigo-600/10 selection:text-indigo-900 antialiased overflow-hidden">
      
      {/* ================= 1. RADIANT BRANDED HERO HEADER ================= */}
      <header className="relative py-66 border-b border-slate-200/60 bg-gradient-to-b from-indigo-50/60 via-white to-transparent">
        
        {/* Cinematic Multi-Color Blur Ambient Glow Fields */}
        <div className="absolute -right-24 top-0 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-emerald-400/15 to-teal-400/10 blur-[130px] pointer-events-none z-10" />
        <div className="absolute left-[-50px] bottom-[-50px] h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-indigo-400/15 to-purple-400/10 blur-[110px] pointer-events-none z-10" />

        {/* Live Graphic Background Layer Mix */}
     
  <div className="absolute inset-0 z-0 opacity-95 select-none pointer-events-none mix-blend-multiply">
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" /> */}
          <Image
           src="/hero/escrow.webp" 
            alt="Marketplace Freelancer Collaborative Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center contrast-110 scale-105"
          />
        </div>


        {/* Hero Content Container */}
        <div className="mx-auto max-w-5xl px-4 text-center space-y-6 relative z-20">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
              Bank-Grade Transaction Protection Bonded
            </span>
          </div>
          
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl bg-gradient-to-r from-slate-950 via-slate-800 to-indigo-950 bg-clip-text text-transparent leading-tight max-w-3xl mx-auto">
            Secure Marketplace Escrow Hub
          </h1>
          
          <p className="text-sm sm:text-base text-slate-900 max-w-xl mx-auto font-medium leading-relaxed">
            Eliminate structural financial risk. Keep project payments safely protected inside our secure infrastructure while coordinating with retail merchants or local service providers.
          </p>

          {/* Luxury Input Engine Card */}
          <div className="max-w-md mx-auto pt-4 px-2 sm:px-0">
            <div className="relative group flex items-center bg-white rounded-2xl border border-slate-200 shadow-xl shadow-indigo-950/5 p-1.5">
              <Search className="absolute left-4 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                value={contractIdInput}
                onChange={(e) => setContractIdInput(e.target.value)}
                placeholder="Enter Secure Escrow ID or Order Reference..."
                className="w-full bg-transparent py-3 pr-4 pl-11 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md shadow-indigo-600/10 shrink-0 transition-all active:scale-98">
                Track Status
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= 2. TWO-STREAM VIBRANT ECOSYSTEM OVERVIEW ================= */}
      <section className="mx-auto max-w-5xl px-4 pt-16">
        <div className="text-center mb-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Dual Processing Networks</span>
          <p className="text-2xl font-black text-slate-900 mt-3 tracking-tight">Unified Safe Channels For Goods & Services</p>
          <div className="h-1 w-8 bg-indigo-500 mx-auto mt-2.5 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stream A: Product Purchases */}
          <div className="group bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5">
            <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
              <ShoppingBag className="h-5 w-5 stroke-[2]" />
            </div>
            <h3 className="text-sm font-black text-slate-900 mt-4 group-hover:text-blue-600 transition-colors">1. Product Purchase Escrow</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2">
              Designed for physical assets and standard stock merchandise items. Capital remains guarded within our primary vault while your seller fulfills logistics. We verify products match documentation specs perfectly before releasing payouts.
            </p>
          </div>

          {/* Stream B: Artisan Services */}
          <div className="group bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:border-purple-200 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/5">
            <div className="h-11 w-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xs">
              <Wrench className="h-5 w-5 stroke-[2]" />
            </div>
            <h3 className="text-sm font-black text-slate-900 mt-4 group-hover:text-purple-600 transition-colors">2. Artisan Service Milestones</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2">
              Tailored specifically for contractual project milestones, technical trades, and professional gigs. Overall milestones are segmented transparently, allowing funds to deploy incrementally as each specific item is systematically finalized.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 3. CHROMATIC PIPELINE WORKFLOW CARD ================= */}
      <section className="mx-auto max-w-5xl px-4 pt-20">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl shadow-indigo-950/20">
          
          {/* Internal Geometric Decorative Ambient Pop */}
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-emerald-500/10 to-transparent blur-2xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 rounded-full">Automated Pipeline Lifecycle</span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">How Protection Chains Work For You</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Step 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
              <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-xs">
                <Lock className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">1. Client Depositing</h4>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Once a custom scope is finalized or an item checkout triggers, the buyer funds the project balance straight into localized system smart vaults.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
              <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-xs">
                <Coins className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">2. Execution Period</h4>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                With complete confirmation that capital assets are safely backed inside the ledger, the provider initiates logistics routing or active workforce execution.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-xs">
                <Unlock className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">3. Verified Release</h4>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                The client reviews the physical item package or evaluates digital task files. Upon direct approval, capital assets instantly deploy into provider balances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. SPLIT MEDIATION ARCHITECTURE ================= */}
      <section className="mx-auto max-w-5xl px-4 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Space Info */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[10px] font-black text-amber-800 uppercase tracking-wide">
              <Scale className="h-3.5 w-3.5 text-amber-600" />
              Neutral Mediation Protocol
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug sm:text-3xl">
              Disagreements? Our Arbitration Panel Has You Covered.
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              If an item shows up fractured, logistics waybills fail verification, or milestones remain underdelivered, either channel operator can halt fund movement. Our dedicated neutral review system instantly locks transaction assets to conduct impartial contract evaluations.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Instant ledger balance freezing features",
                "Consolidated file upload channels",
                "Standard operating platform protection laws"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Security Tips Cards Grid */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-200 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="h-9 w-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Preventing Common Offline Scams</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
                    Never send funds via off-platform peer transfers or direct banking channels. Doing so violates secure core conditions and results in immediate protection drop safeguards.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-200 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Automated Vector Verification</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
                    Vendor entities and artisan profiles pass background checks prior to handling financial workflows, maintaining rigorous compliance across the ecosystem network.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 5. ACCORDION FAQ DIRECTORY ================= */}
      <section className="mx-auto max-w-3xl px-4 pt-20">
        <div className="text-center mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Knowledge Hub</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1.5">Frequently Asked Questions</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-indigo-200 shadow-md shadow-indigo-950/5' : 'border-slate-200'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className={`w-full flex items-center justify-between p-4 text-left font-bold text-xs transition-colors cursor-pointer ${isOpen ? 'text-indigo-600 bg-indigo-50/20' : 'text-slate-800 hover:bg-slate-50/60'}`}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-slate-100' : 'max-h-0'}`}>
                  <div className="p-4 bg-slate-50/40">
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}