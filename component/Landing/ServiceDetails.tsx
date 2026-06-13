'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle2, Star, MessageSquare, ArrowLeft, ShieldCheck, Wrench, Briefcase } from 'lucide-react';
import { mockArtisans } from '../utils/service/ServiceGrid';




const artisanDetailsExtension: Record<string, {
  bio: string[];
  skills: string[];
  license: string;
  projects: { title: string; image: string }[];
}> = {
  '1': {
    bio: [
      "Samuel Ade has 10+ years of experience in domestic and industrial development, designing efficient installations and smart power distribution setups. He works with an emphasis on energy efficiency and modern component infrastructure.",
      "As a master electrical engineer, Samuel focuses on creating safe hardware operations and emergency framework structures. His practice centers on code compliance, complex wiring arrays, and sustainable grid engineering across commercial developments.",
      "Equipped with premium tools and multi-tier diagnostic equipment, he covers fault finding, system testing, and full industrial overhauls."
    ],
    skills: ["Solar Installation", "Fault Finding", "Industrial Wiring", "Breaker Panels", "Home Automation"],
    license: "Certified Master Electrician License #EL-7788",
    projects: [
      { title: "Industrial Control Overhaul", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80" },
      { title: "Smart Home Automated Matrix", image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" },
      { title: "Commercial Conduit Pipeline", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80" },
      { title: "Grid Solar Cell Arrays", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  '2': {
    bio: ["Solar infrastructure expert specializing in off-grid backup transitions.", "Delivers scalable clean energy solutions across high-capacity local grids."],
    skills: ["Inverter Synch", "Battery Calibration", "Load Computations"],
    license: "Renewable Energy Guild Code #RE-9942",
    projects: [{ title: "Mini-Grid Operations", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80" }]
  },
  '3': {
    bio: ["Full-stack software specialist managing responsive software ecosystems.", "Designs production systems using Next.js, Node architecture, and optimized databases."],
    skills: ["React / Next.js", "TypeScript Matrix", "GraphQL APIs", "PostgreSQL Architecture"],
    license: "Verified Engineering Hub ID #DEV-4112",
    projects: [{ title: "Enterprise Database Sync", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" }]
  },
  '4': {
    bio: ["Luxury designer curating bespoke apparel collections and tailored garments.", "Brings fashion concepts to life with highly detailed construction and craftsmanship."],
    skills: ["Bespoke Tailoring", "Pattern Drafting", "Textile Sourcing"],
    license: "Fashion Craft Authority #TEX-8831",
    projects: [{ title: "Runway Collection Showcase", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" }]
  }
};

export default function ServiceDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const baseProfile = mockArtisans.find(artisan => artisan.id === id);
  const extendedDetails = artisanDetailsExtension[id || '1'];

  if (!baseProfile) {
    return (
      <div className="text-center py-20 bg-slate-50 min-h-screen">
        <p className="text-sm font-bold text-slate-500">Artisan profile workspace not found.</p>
        <button onClick={() => router.push('/')} className="mt-4 text-xs font-black text-emerald-600 uppercase tracking-wider">Return to Marketplace</button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-16">
      
      <div className="border-b border-slate-100 bg-white sticky top-0 z-40 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between sm:px-6 lg:px-8">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Providers</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Status:</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${baseProfile.isAvailable ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${baseProfile.isAvailable ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              {baseProfile.isAvailable ? 'Available for Bookings' : 'Fully Booked'}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-48 aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shadow-xs relative shrink-0">
                <div className="w-full h-full flex items-center justify-center text-4xl font-black text-slate-400 bg-gradient-to-br from-slate-50 to-slate-100">
                  {baseProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{baseProfile.name}</h1>
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-black text-white uppercase tracking-wider shadow-xs">
                      <CheckCircle2 className="h-3 w-3 fill-white text-emerald-600" />
                      {baseProfile.role}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">About</h2>
                  <div className="space-y-3 text-sm text-slate-600 leading-relaxed max-w-2xl font-medium">
                    {extendedDetails.bio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-400" />
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">Recent Projects</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {extendedDetails.projects.map((project, idx) => (
                  <div key={idx} className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-emerald-300 transition-all">
                    <div className="aspect-video w-full bg-slate-100 relative">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" />
                    </div>
                    <div className="p-3 bg-white border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{project.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                  {baseProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{baseProfile.name}</h4>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3 w-3 fill-amber-500" />
                    <span className="text-xs font-black text-slate-700">{baseProfile.rating}</span>
                    <span className="text-[11px] text-slate-400 font-medium">({baseProfile.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[22px] font-black text-slate-950">₦{baseProfile.baseRate.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-500"> / hr</span>
              </div>

              <div className="space-y-2 pt-2">
                <button className="w-full inline-flex items-center justify-center rounded-xl bg-emerald-600 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-emerald-100 hover:bg-emerald-700 transition-colors cursor-pointer">
                  Request Custom Quote
                </button>
                <button className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-3 text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
                  <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                  Message Artisan
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3.5">
              <div className="flex items-center gap-1.5 text-slate-800">
                <Wrench className="h-4 w-4 text-slate-400" />
                <h3 className="text-xs font-black uppercase tracking-wider">Skills & Tools</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {extendedDetails.skills.map((skill, idx) => (
                  <span key={idx} className="rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1 text-xs font-bold text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3.5">
              <div className="flex items-center gap-1.5 text-slate-800">
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                <h3 className="text-xs font-black uppercase tracking-wider">Verification Credentials</h3>
              </div>
              <div className="rounded-xl bg-emerald-50/50 border border-emerald-100 p-3 flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 fill-emerald-600 text-white shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-emerald-900 leading-normal">
                  {extendedDetails.license}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}