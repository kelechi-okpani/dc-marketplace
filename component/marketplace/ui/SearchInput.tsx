'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  selectedLocation?: string | null;
}

export default function SearchInput({
  placeholder = 'Search products...',
  className = '',
  selectedLocation,
}: SearchInputProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const searchTerm = query.trim();

    if (!searchTerm) return;

    const params = new URLSearchParams();

    params.set('q', searchTerm);

    if (
      selectedLocation &&
      selectedLocation !== 'all'
    ) {
      params.set('location', selectedLocation);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex items-center border border-gray-300 rounded-full pl-4 pr-1 bg-white focus-within:ring-2 focus-within:ring-[#1877F2] ${className}`}
    >
      <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-full py-2 px-3 outline-none text-gray-700 text-sm bg-transparent"
      />

      <button
        type="submit"
        className="bg-[#1877F2] text-white px-4 sm:px-6 py-1 rounded-full hover:bg-[#166fe5] transition flex-shrink-0 text-sm font-medium"
      >
        <span className="hidden sm:inline">Search</span>
        <span className="sm:hidden">Go</span>
      </button>
    </form>
  );
}