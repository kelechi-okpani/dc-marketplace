'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import LocationFilter from '../ui/Location';
import SearchInput from '../ui/SearchInput';



export default function HeaderSearchSection() {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close location modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-2 w-full max-w-3xl mx-auto" ref={containerRef}>
      
      {/* Location Trigger */}
      <button 
        onClick={() => setIsLocationOpen(!isLocationOpen)}
        className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all flex-shrink-0 min-w-[140px] shadow-sm hover:border-[#1877F2]/50"
      >
        <MapPin className="h-4 w-4 text-[#1877F2]" />
        <span className="truncate">{selectedLocation || 'All Nigeria'}</span>
      </button>

      {/* Global Search Input */}
      <div className="flex-1">
        <SearchInput selectedLocation={selectedLocation} />
      </div>

      {/* Location Modal/Popover */}
      {isLocationOpen && (
        <div className="absolute top-full mt-2 left-0 w-full z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <LocationFilter 
            onSelect={(loc: string) => {
              setSelectedLocation(loc);
              setIsLocationOpen(false);
            }} 
          />
        </div>
      )}
    </div>
  );
}