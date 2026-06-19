import React, { useState, useMemo } from 'react';
import { ChevronRight, ArrowLeft, Search } from 'lucide-react';
import { LOCATION_CONFIG } from '@/component/utils/search/Location';


interface LocationFilterProps {
  onSelect: (locationName: string) => void;
}


export default function LocationFilter({ onSelect }: LocationFilterProps) {
    
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Search logic for both States and Districts
  const filteredStates = useMemo(() => {
    return Object.entries(LOCATION_CONFIG).filter(([key, data]) => 
      data.stateName.toLowerCase().includes(search.toLowerCase()) ||
      data.districts.some(d => d.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  return (
    <div className="bg-white rounded-lg shadow-lg border w-full max-w-3xl p-6">
      {/* Search Bar */}
      <div className="flex items-center gap-3 pb-6 border-b mb-6">
        {selectedState && (
          <ArrowLeft className="cursor-pointer hover:text-blue-600" onClick={() => setSelectedState(null)} />
        )}
        <Search className="text-gray-400" />
        <input 
          className="flex-1 outline-none text-sm"
          placeholder="Find state, city or district......"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid View (States) */}
      {!selectedState ? (
        <div className="grid grid-cols-3 gap-6">
          {filteredStates.map(([key, data]) => (
            <button 
              key={key} 
              onClick={() => setSelectedState(key)}
              className="text-left text-sm font-medium hover:text-blue-600 flex justify-between group"
            >
              {data.stateName}
              <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600" />
            </button>
          ))}
        </div>
      ) : (
        /* Drill-down View (Districts) */
        <div className="grid grid-cols-3 gap-y-4 gap-x-8">
          {LOCATION_CONFIG[selectedState].districts.map((d) => (
            <button 
              key={d.id} 
              onClick={() => onSelect(d.name)}
              className="text-left text-xs text-gray-600 hover:text-blue-600 truncate"
            >
              {d.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}