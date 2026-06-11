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
  Wrench
} from 'lucide-react';

const faqs = [
  {
    q: "What exactly is an Escrow milestone account?",
    a: "Instead of paying an artisan or seller directly upfront, your funds are deposited into a locked, multi-signature contract. The funds are held safely by the platform and are only released when you verify that the agreed stage of the project or item delivery has been completed perfectly."
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
    <div className="min-h-screen bg-[#f8fafc] pb-20 text-slate-900">
      
      {/* ================= 1. PREMIUM TRUST HERO ================= */}
   {/* ================= 1. PREMIUM TRUST HERO ================= */}
    <header className="bg-slate-950 text-white relative overflow-hidden py-20 sm:py-24 border-b border-slate-900">
      
      {/* ================= LIVE BACKGROUND IMAGE SYSTEM ================= */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-90 mix-blend-luminosity">
        {/* Layered dark vignette shader overlay to guarantee crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#020617_85%)] z-10" />
        
        <Image
          src="/images/banner4.jpg" 
          alt="Secure Encrypted Digital Ledger Network"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105"
        />
      </div>

      {/* Ambient Glows */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none z-10" />
      <div className="absolute left-10 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none z-10" />

      {/* Hero Content Container */}
      <div className="mx-auto max-w-5xl px-4 text-center space-y-5 relative z-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            Bank-Grade Transaction Protection
          </span>
        </div>
        
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl text-white drop-shadow-md leading-tight">
          Secure Marketplace Escrow Hub
        </h1>
        
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-xs">
          Eliminate operational risk. Keep your funds fully secured in transit whether you are buying physical inventory products from retail sellers or booking custom artisan services.
        </p>

        {/* Quick Track Component */}
        <div className="max-w-md mx-auto pt-4">
          <div className="relative group">
            <Search className="absolute top-3.5 left-4 h-4 w-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
            <input
              type="text"
              value={contractIdInput}
              onChange={(e) => setContractIdInput(e.target.value)}
              placeholder="Enter Secure Escrow ID or Order Reference..."
              className="w-full rounded-xl border border-slate-800/80 bg-slate-900/60 py-3.5 pr-4 pl-11 text-xs text-white placeholder-slate-500 transition-all focus:border-emerald-500 focus:bg-slate-900/90 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 backdrop-blur-md"
            />
          </div>
        </div>
      </div>
    </header>

      {/* ================= 2. TWO-STREAM ECOSYSTEM OVERVIEW ================= */}
      <section className="mx-auto max-w-5xl px-4 pt-16">
        <div className="text-center mb-10">
          <h2 className="text-xs font-black uppercase tracking-widest text-blue-600">Dual Protection Streams</h2>
          <p className="text-xl font-extrabold text-slate-900 mt-1">Unified Protection for Goods & Services</p>
          <div className="h-1 w-10 bg-blue-500 mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stream A: Product Purchases */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">1. Product Purchase Escrow</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Designed for physical assets and standard stock merchandise sold by corporate entities. Funds remain safe in the platform vault while your vendor ships your parcels, verifying items match descriptions perfectly before payout happens.
            </p>
          </div>

          {/* Stream B: Artisan Services */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <Wrench className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">2. Artisan Service Milestones</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Tailored specifically for contractual gig labor, construction layouts, and technical trades. Project costs are broken down into granular milestones. Funds unlock incrementally as phases are completed and checked off.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 3. THE 3-STEP PIPELINE PROTOCOL ================= */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="text-center mb-10">
          <h2 className="text-xs font-black uppercase tracking-widest text-emerald-600">The Workflow Lifecycle</h2>
          <p className="text-xl font-extrabold text-slate-900 mt-1">How Escrow Protection Protects Everyone</p>
          <div className="h-1 w-10 bg-emerald-500 mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 relative flex flex-col items-center text-center shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg mb-4 border border-blue-100">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">1. Client Depositing</h3>
            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
              Once an order checkout or custom contract scope is approved, the buyer finances the balance. Funds are locked securely inside our centralized safe-haven vault ecosystem.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 relative flex flex-col items-center text-center shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg mb-4 border border-amber-100">
              <Coins className="h-5 w-5 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <h3 className="text-sm font-black text-slate-900">2. Fulfillment & Execution</h3>
            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
              With complete structural assurance that funds are locked, the vendor dispatches the merchandise tracking details or the artisan initiates on-site gig execution.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 relative flex flex-col items-center text-center shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg mb-4 border border-emerald-100">
              <Unlock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">3. Verified Release</h3>
            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
              The buyer inspects the package delivery or reviews the completed milestone. Once approved, funds immediately deploy directly into the provider's active balance.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 4. DISPUTE & MEDIATION ARCHITECTURE ================= */}
      <section className="mx-auto max-w-5xl px-4 pt-16">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[10px] font-bold text-amber-800 uppercase tracking-wide">
              <Scale className="h-3.5 w-3.5 text-amber-600" />
              Neutral Mediation Protocol
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              Disagreements? <br />Our Arbitration Panel Has You Covered.
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              If a seller fails to ship, an item arrives broken, or an artisan delivers incomplete work, either party can freeze the contract. Our neutral resolution team reviews the evidence layout to issue an unbiased judgment.
            </p>
            
            <ul className="space-y-2.5 pt-2">
              {[
                "Instant balance freezing upon dispute initiation",
                "Proof upload channels (images, logistics waybills, message history)",
                "Fair processing according to platform standard operating rules"
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-slate-900">Preventing Common Offline Scams</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-relaxed">
                  Never accept direct bank deposits or external transfers off the platform. Paying through external channels violates security safeguards and invalidates your platform contract protection.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-slate-900">Automated Fraud Detection</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-relaxed">
                  Every merchant profile and artisan background check undergoes validation steps before managing transactions, providing robust security across the marketplace network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. ACCORDION FAQ DIRECTORY ================= */}
      <section className="mx-auto max-w-3xl px-4 pt-16">
        <div className="text-center mb-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Got Questions?</h2>
          <p className="text-xl font-extrabold text-slate-900 mt-1">Frequently Asked Questions</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-slate-800 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <HelpCircle className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="px-4 pb-4 border-t border-slate-100 pt-3 bg-slate-50/30">
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}