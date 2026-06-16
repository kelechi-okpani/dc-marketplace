'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface ReusableSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

export const ReusableSearch = ({ 
  onSearch, 
  placeholder = "Search...", 
  className = "",
  initialValue = ""
}: ReusableSearchProps) => {
  const [value, setValue] = useState(initialValue);

  // Sync internal state if prop changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Debounce logic: Wait 300ms after user stops typing before triggering search
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(handler);
  }, [value, onSearch]);

  const handleClear = () => {
    setValue('');
    // onSearch will be triggered by the useEffect above when value changes to ''
  };

  return (
    <div 
      className={`relative w-full flex items-center ${className}`}
      role="search"
    >
      {/* Search Icon */}
      <div className="absolute left-3 text-slate-400">
        <Search size={18} />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        className="w-full pl-10 pr-10 py-3 bg-[#FFFFFF] border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all"
      />

      {/* Clear Button */}
      {value && (
        <button 
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
          className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};