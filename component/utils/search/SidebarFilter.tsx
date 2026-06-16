import { ChevronRight, Filter, Search, X } from "lucide-react";
import { FilterConfig } from "./filterConfig";
import { useMemo } from "react";

interface SidebarContentProps {
  // categoryContext: { parentName: string; subcategories: { name: string; count: number; isActive: boolean }[] };
  // categoryContext: { 
  //   parentName: string; 
  //   subcategories: { name: string; count: number; isActive: boolean }[] 
  // } | null;
  categoryConfig: Record<string, { 
    parentName: string; 
    subcategories: { name: string; count: number }[] 
  }>;
  currentSelection: string
  filters: FilterConfig[];
  activeFilters: Record<string, string[]>;
  priceRange: { min: string; max: string };
  searchInputs: Record<string, string>;
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: string; max: string }>>;
  setSearchInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleFilterChange: (filterId: string, value: string, type: FilterConfig['type']) => void;
  setIsMobileFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubCategorySelect: (name: string) => void; 
}



export default function SidebarContent({
  categoryConfig, // New prop
  currentSelection,
  filters,
  activeFilters,
  priceRange,
  searchInputs,
  setPriceRange,
  setSearchInputs,
  handleFilterChange,
  setIsMobileFilterOpen,
  onSubCategorySelect,
}: SidebarContentProps) {

// Find the group that contains the current selection
  const activeGroup = useMemo(() => {
    return Object.values(categoryConfig).find(group => 
      group.subcategories.some(sub => sub.name === currentSelection) || 
      group.parentName === currentSelection
    );
  }, [categoryConfig, currentSelection]);



  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Category Tree Navigation Card */}
      {/* {categoryContext && (
        <div className="bg-white rounded-t-lg border border-slate-200/80 overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="bg-[#1877F2] px-4 py-3.5 text-white font-bold text-sm tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-white rounded-full opacity-70" />
            Categories
          </div>
          <div className="p-3 flex flex-col">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 px-2 pb-2 font-bold flex items-center gap-1">
              <span>{categoryContext.parentName}</span>
              <ChevronRight size={10} className="stroke-[3]" />
            </div>
            
            <div className="space-y-0.5">
              {categoryContext.subcategories.map((sub) => (
                <button
                  key={sub.name}
                  type="button"
                  // SWAPPED: Triggers state filter + auto-closes mobile drawer instead of hard navigation
                  onClick={() => {
                    onSubCategorySelect(sub.name);
                    setIsMobileFilterOpen(false);
                  }}
                  className={` cursor-pointer w-full flex items-center justify-between px-3 py-2.5 text-xs rounded-lg transition-all duration-200 group ${
                    sub.isActive 
                      ? 'bg-[#E7F3FF] text-[#1877F2] font-bold shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate max-w-[150px] font-medium text-left">{sub.name}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                    sub.isActive 
                      ? 'bg-[#1877F2]/20 text-[#1877F2]' 
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                    {sub.count.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )} */}

{/* Render all categories from your config */}
    {activeGroup && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="bg-[#1877F2] px-4 py-3 text-white font-bold text-xs uppercase tracking-wide rounded-t-lg">
            {activeGroup.parentName}
          </div>
          
          <div className="p-2 space-y-0.5">
            {activeGroup.subcategories.map((sub) => (
              <button
                key={sub.name}
                onClick={() => {
                  onSubCategorySelect(sub.name);
                  setIsMobileFilterOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-md transition-all ${
                  sub.name === currentSelection
                    ? 'bg-[#E7F3FF] text-[#1877F2] font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Attribute Filters Panel */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex justify-between items-center md:hidden pb-3 border-b border-slate-100 mb-4">
          <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Filter size={16} className="text-[#1877F2]" /> Filter Options
          </h2>
          <button 
            onClick={() => setIsMobileFilterOpen(false)} 
            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close filters"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="space-y-5">
          {filters.map((filter) => {
            const searchVal = (searchInputs[filter.id] || '').toLowerCase();
            const filteredOptions = filter.options?.filter(opt => 
              opt.label.toLowerCase().includes(searchVal)
            ) || [];

            return (
              <div key={filter.id} className="border-b border-slate-100 pb-4 last:border-none last:pb-0">
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>{filter.title}</span>
                  {activeFilters[filter.id]?.length > 0 && (
                    <span className="w-2 h-2 bg-[#1877F2] rounded-full" />
                  )}
                </h3>
                
                {/* Range Filters Box */}
                {filter.type === 'range' && (
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-2 text-[10px] font-bold text-slate-400 uppercase">Min</span>
                      <input
                        type="number"
                        placeholder="₦ 0"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(p => ({ ...p, min: e.target.value }))}
                        className="w-full border border-slate-200 rounded-lg pl-9 pr-2 py-2 text-xs font-semibold text-slate-700 outline-none transition-all focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/10 bg-slate-50/50"
                      />
                    </div>
                    <span className="text-slate-400 text-xs font-bold">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-2 text-[10px] font-bold text-slate-400 uppercase">Max</span>
                      <input
                        type="number"
                        placeholder="Any"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(p => ({ ...p, max: e.target.value }))}
                        className="w-full border border-slate-200 rounded-lg pl-9 pr-2 py-2 text-xs font-semibold text-slate-700 outline-none transition-all focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/10 bg-slate-50/50"
                      />
                    </div>
                  </div>
                )}

                {/* Selection Filters Container */}
                {(filter.type === 'checkbox' || filter.type === 'search-checkbox' || filter.type === 'radio') && (
                  <div className="flex flex-col gap-2.5 max-h-52 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    {filter.type === 'search-checkbox' && (
                      <div className="relative mb-1">
                        <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder={`Search ${filter.title.toLowerCase()}...`}
                          value={searchInputs[filter.id] || ''}
                          onChange={(e) => setSearchInputs(p => ({ ...p, [filter.id]: e.target.value }))}
                          className="w-full border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none transition-all focus:border-[#1877F2] bg-slate-50/50"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      {filteredOptions.map((opt) => {
                        const isChecked = (activeFilters[filter.id] || []).includes(opt.value);
                        return (
                          <label key={opt.value} className="flex items-start gap-3 cursor-pointer group py-0.5 select-none">
                            <div className="flex items-center h-4 mt-0.5">
                              <input
                                type={filter.type === 'radio' ? 'radio' : 'checkbox'}
                                name={filter.type === 'radio' ? filter.id : undefined}
                                checked={isChecked}
                                onChange={() => handleFilterChange(filter.id, opt.value, filter.type)}
                                className={`w-4 h-4 text-[#1877F2] border-slate-300 transition-all focus:ring-0 focus:ring-offset-0 ${
                                  filter.type === 'radio' 
                                    ? 'focus:ring-1 focus:ring-[#1877F2]' 
                                    : 'rounded border-slate-300 text-[#1877F2]'
                                }`}
                                style={{ accentColor: '#1877F2' }}
                              />
                            </div>
                            <span className={`text-xs transition-colors flex-1 leading-normal ${
                              isChecked ? 'text-slate-900 font-semibold' : 'text-slate-600 group-hover:text-slate-900'
                            }`}>
                              {opt.label}
                              <span className="text-slate-400 font-normal text-[10px] ml-1.5 bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100">
                                {opt.count.toLocaleString()}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                      {filteredOptions.length === 0 && (
                        <p className="text-[11px] text-slate-400 italic text-center py-2">No matches found</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
