'use client'
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

const HERO_SLIDES = [
  { id: 1, title: "Premium Cash Crops & Raw Farm Produce", tagline: "Direct Farm-Gate Sourcing Hub", description: "Secure certified export-grade cash crops, whole grains, and organic tubers.", bgImage: "/hero/banners1.webp", badge: "100% Verified Sellers" },
  { id: 2, title: "Bulk Agro-Inputs & Soil Fertilizers", tagline: "Maximize Crop Cultivation Yields", description: "Direct distribution pipelines for certified Urea, NPK blends, and hybrid seeds.", bgImage: "/hero/banners2.webp", badge: "Government Certified" },
  { id: 3, title: "Fresh Farm Harvests", tagline: "From Local Fields to Regional Markets", description: "Sourced directly from agricultural hubs under verified inspection standards.", bgImage: "/hero/banners3.webp", badge: "Sourced Fresh Daily" }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000); // Slides change every 5 seconds
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="w-full mb-6">
      <div 
        className="relative w-full max-w-[1400px] mx-auto h-[150px] sm:h-[250px] md:h-[300px]  overflow-hidden shadow-lg group border border-slate-200"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/60 to-transparent z-10" />
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 z-20 max-w-2xl text-white">
              {/* <span className="inline-block bg-emerald-500/30 backdrop-blur-md text-emerald-100 text-[10px] sm:text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-3 w-max border border-emerald-400/30">
                {slide.badge}
              </span> */}
              {/* <h1 className="text-1xl sm:text-3xl md:text-3xl font-extrabold tracking-tight leading-tight mb-2 sm:mb-4">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-lg text-blue-200 font-medium uppercase tracking-wider mb-2">
                {slide.tagline}
              </p>
              <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed hidden sm:block max-w-lg mb-6">
                {slide.description}
              </p> */}
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 w-max cursor-pointer">
                <ShoppingBag className="h-4 w-4" />
                <span>Order Bulk Supply</span>
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dot Nav */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-blue-400' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}