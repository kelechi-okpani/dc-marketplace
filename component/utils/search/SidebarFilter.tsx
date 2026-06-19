import { ChevronRight, Filter, Search, X } from "lucide-react";
import { FilterConfig } from "./filterConfig";
import { useMemo } from "react";
import { ALL_BRANDS } from "./brandList";
import { Product } from "../types";

interface SidebarContentProps {
  targetCategory?: {
    id: number;
    parentName: string;
    subcategories: { name: string; count: number }[];
  } | null;
  categoryConfig: Record<string, { 
    id: number;
    parentName: string; 
    subcategories: { name: string; count: number }[] 
  }>;
  currentSelection: string;
  filters: FilterConfig[];
  filteredProducts: Product[];
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
  targetCategory,
  categoryConfig, 
  currentSelection,
  filters,
  filteredProducts,
  activeFilters,
  priceRange,
  searchInputs,
  setPriceRange,
  setSearchInputs,
  handleFilterChange,
  setIsMobileFilterOpen,
  onSubCategorySelect,
}: SidebarContentProps) {

  // Get only brands that belong to the target category
  const categoryBrands = useMemo(() => {
    if (!targetCategory) return [];
    return ALL_BRANDS.filter(b => b.categoryId === targetCategory.id);
  }, [targetCategory]);

  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* 1. Contextual Categories */}
      {targetCategory && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="bg-[#1877F2] px-4 py-3 text-white font-bold text-xs uppercase tracking-wide rounded-t-lg">
            {targetCategory.parentName}
          </div>
          <div className="p-2 space-y-0.5">
            {targetCategory.subcategories.map((sub) => {
              const isSelected = (activeFilters['subCategory'] || []).includes(sub.name.toLowerCase());
              return (
                <button
                  key={sub.name}
                  onClick={() => handleFilterChange('subCategory', sub.name.toLowerCase(), 'radio')}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors ${
                    isSelected ? 'bg-[#E7F3FF] text-[#1877F2] font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sub.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Contextual Brands */}
      {categoryBrands.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm mt-4">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-xs uppercase tracking-wide text-slate-700">
            Brands
          </div>
          <div className="p-2 space-y-0.5 max-h-60 overflow-y-auto">
            {categoryBrands.map((brand) => {
              const isSelected = (activeFilters['brand'] || []).includes(brand.value);
              return (
                <button
                  key={brand.value}
                  onClick={() => handleFilterChange('brand', brand.value, 'checkbox')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md transition-colors ${
                    isSelected ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{brand.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Dynamic Attribute Filters Panel */}
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
            let baseOptions = filter.options || [];

            // Cross-reference generic brands with category-specific brands
            if (filter.id.toLowerCase() === 'brand' || filter.title.toLowerCase().includes('brand')) {
              // If we already rendered Contextual Brands above, skip this duplicate completely
              if (categoryBrands.length > 0) return null; 
              
              // Otherwise, enforce the category limitations
              if (targetCategory) {
                const validBrandValues = categoryBrands.map((b) => b.value.toLowerCase());
                baseOptions = baseOptions.filter((opt) =>
                  validBrandValues.includes(opt.value.toLowerCase())
                );
              }
            }

            // Apply search input filtering
            const searchVal = (searchInputs[filter.id] || '').toLowerCase();
            const filteredOptions = baseOptions.filter(opt => 
              opt.label.toLowerCase().includes(searchVal)
            );

            // Hide empty filters to prevent broken UI blocks
            if (filter.type !== 'range' && filteredOptions.length === 0) {
              return null;
            }

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


// import { ChevronRight, Filter, Search, X } from "lucide-react";
// import { FilterConfig } from "./filterConfig";
// import { useMemo } from "react";
// import { ALL_BRANDS } from "./brandList";
// import { Product } from "../types";

// interface SidebarContentProps {
//   targetCategory?: {
//     id: number;
//     parentName: string;
//     subcategories: { name: string; count: number }[];
//   } | null,
//   categoryConfig: Record<string, { 
//     id: number;
//     parentName: string; 
//     subcategories: { name: string; count: number }[] 
//   }>;
//   currentSelection: string
//   filters: FilterConfig[];
//   filteredProducts: Product[]
//   activeFilters: Record<string, string[]>;
//   priceRange: { min: string; max: string };
//   searchInputs: Record<string, string>;
//   setPriceRange: React.Dispatch<React.SetStateAction<{ min: string; max: string }>>;
//   setSearchInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>;
//   handleFilterChange: (filterId: string, value: string, type: FilterConfig['type']) => void;
//   setIsMobileFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   onSubCategorySelect: (name: string) => void; 
// }



// export default function SidebarContent({
//   targetCategory,
//   categoryConfig, // New prop
//   currentSelection,
//   filters,
//   filteredProducts,
//   activeFilters,
//   priceRange,
//   searchInputs,
//   setPriceRange,
//   setSearchInputs,
//   handleFilterChange,
//   setIsMobileFilterOpen,
//   onSubCategorySelect,
// }: SidebarContentProps) {

// // Find the group that contains the current selection
//   // const activeGroup = useMemo(() => {
//   //   return Object.values(categoryConfig).find(group => 
//   //     group.subcategories.some(sub => sub.name === currentSelection) || 
//   //     group.parentName === currentSelection
//   //   );
//   // }, [categoryConfig, currentSelection]);

//   // Replace your existing activeGroup logic with this:
//  // Inside SidebarContent

// // -----  NEW CODE -------
// //   const activeGroup = useMemo(() => {
// //   const keyword = currentSelection.toLowerCase();

// //   // 1. Try to find a direct match
// //   const foundGroup = Object.values(categoryConfig).find(group => 
// //     group.parentName.toLowerCase().includes(keyword) ||
// //     group.subcategories.some(sub => sub.name.toLowerCase().includes(keyword))
// //   );

// //   // 2. Fallback to product categorization
// //   if (!foundGroup && filteredProducts.length > 0) {
// //     const categoryCounts: Record<number, number> = {};
// //     filteredProducts.forEach((p) => {
// //       // CORRECTED: Access p.categoryId directly from the product object
// //       const catId = p.categoryId; 
// //       if (catId) categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;
// //     });

// //     const entries = Object.entries(categoryCounts);
// //     if (entries.length > 0) {
// //       // Find the category ID with the highest count
// //       const topCategoryId = entries.sort((a, b) => b[1] - a[1])[0][0];
// //       return Object.values(categoryConfig).find(g => g.id === Number(topCategoryId));
// //     }
// //   }

// //   return foundGroup;
// //  }, [categoryConfig, currentSelection, filteredProducts]);


// //  // Inside SidebarContent component
// //     const availableBrands = useMemo(() => {
// //       const brandCounts: Record<string, number> = {};
      
// //       filteredProducts.forEach(p => {
// //         if (p.brand && p.brand !== 'N/A') {
// //           brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
// //         }
// //       });

// //       return Object.entries(brandCounts).map(([label, count]) => ({
// //         label,
// //         value: label.toLowerCase(),
// //         count
// //       }));
// //     }, [filteredProducts]);


//   // Inside SidebarContent component

// // 1. Get only categories that exist in the current search results
// const relevantCategories = useMemo(() => {
//   const categoryMap = new Map();
  
//   filteredProducts.forEach((p) => {
//     if (!categoryMap.has(p.categoryId)) {
//       // Find the group to get the parent name
//       const group = Object.values(categoryConfig).find(g => g.id === p.categoryId);
//       if (group) {
//         categoryMap.set(p.categoryId, {
//           parentName: group.parentName,
//           subcategories: new Set()
//         });
//       }
//     }
//     categoryMap.get(p.categoryId)?.subcategories.add(p.subCategory);
//   });
  
//   return categoryMap;
// }, [filteredProducts, categoryConfig]);

// // 2. Get only brands present in the search results
// const availableBrands = useMemo(() => {
//   const brandCounts: Record<string, number> = {};
//   filteredProducts.forEach(p => {
//     if (p.brand && p.brand !== 'N/A') {
//       brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
//     }
//   });
//   return Object.entries(brandCounts).map(([label, count]) => ({
//     label, value: label.toLowerCase(), count
//   }));
// }, [filteredProducts]);


//   return (
//     <div className="flex flex-col gap-4 w-full">
//       {/* Interactive Category Filter */}
// {/* 
//     <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
//       <div className="bg-[#1877F2] px-4 py-3 text-white font-bold text-xs uppercase tracking-wide rounded-t-lg">
//         Categories
//       </div>
//       <div className="p-2 space-y-0.5">
//         {Object.values(categoryConfig).map((group) => (
//           <div key={group.id} className="mb-2">
//             <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase">{group.parentName}</div>
//             {group.subcategories.map((sub) => {
//               const isSelected = (activeFilters['subCategory'] || []).includes(sub.name.toLowerCase());
//               return (
//                 <button
//                   key={sub.name}
//                   onClick={() => handleFilterChange('subCategory', sub.name.toLowerCase(), 'radio')}
//                   className={`w-full text-left px-3 py-1.5 text-xs rounded-md ${
//                     isSelected ? 'bg-[#E7F3FF] text-[#1877F2] font-bold' : 'text-slate-600 hover:bg-slate-50'
//                   }`}
//                 >
//                   {sub.name}
//                 </button>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </div>

//     {availableBrands.length > 0 && (
//       <div className="bg-white rounded-lg border border-slate-200 shadow-sm mt-4">
//         <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-xs uppercase tracking-wide text-slate-700">
//           Brands
//         </div>
//         <div className="p-2 space-y-0.5 max-h-60 overflow-y-auto">
//           {availableBrands.map((brand) => {
//             const isSelected = (activeFilters['brand'] || []).includes(brand.value);
//             return (
//               <button
//                 key={brand.value}
//                 onClick={() => handleFilterChange('brand', brand.value, 'checkbox')}
//                 className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md ${
//                   isSelected ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
//                 }`}
//               >
//                 <span>{brand.label}</span>
//                 <span className="text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded border">{brand.count}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     )} */}


// {/* 1. Contextual Categories */}
// <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
//   <div className="bg-[#1877F2] px-4 py-3 text-white font-bold text-xs uppercase tracking-wide rounded-t-lg">
//     Categories
//   </div>
//   <div className="p-2 space-y-2">
//     {Array.from(relevantCategories.entries()).map(([id, data]) => (
//       <div key={id}>
//         <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase">{data.parentName}</div>
//         {Array.from(data.subcategories).map((sub:any) => (
//           <button
//             key={sub}
//             onClick={() => handleFilterChange('subCategory', sub as string, 'radio')}
//             className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-md"
//           >
//             {sub}
//           </button>
//         ))}
//       </div>
//     ))}
//   </div>
// </div>

// {/* 2. Contextual Brands */}
// {availableBrands.length > 0 && (
//   <div className="bg-white rounded-lg border border-slate-200 shadow-sm mt-4">
//     <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-bold text-xs uppercase tracking-wide text-slate-700">
//       Brands
//     </div>
//     <div className="p-2 space-y-0.5 max-h-60 overflow-y-auto">
//       {availableBrands.map((brand) => (
//         <button
//           key={brand.value}
//           onClick={() => handleFilterChange('brand', brand.value, 'checkbox')}
//           className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded-md"
//         >
//           <span>{brand.label}</span>
//           <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{brand.count}</span>
//         </button>
//       ))}
//     </div>
//   </div>
// )}


//           {/* Dynamic Attribute Filters Panel */}
//           <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm transition-all duration-200 hover:shadow-md">
//             <div className="flex justify-between items-center md:hidden pb-3 border-b border-slate-100 mb-4">
//               <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
//                 <Filter size={16} className="text-[#1877F2]" /> Filter Options
//               </h2>
//               <button 
//                 onClick={() => setIsMobileFilterOpen(false)} 
//                 className="p-1 hover:bg-slate-100 rounded-full transition-colors"
//                 aria-label="Close filters"
//               >
//                 <X size={18} className="text-slate-500" />
//               </button>
//             </div>

//             <div className="space-y-5">
//               {filters.map((filter) => {
//                 const searchVal = (searchInputs[filter.id] || '').toLowerCase();
//                 const filteredOptions = filter.options?.filter(opt => 
//                   opt.label.toLowerCase().includes(searchVal)
//                 ) || [];

//                 return (
//                   <div key={filter.id} className="border-b border-slate-100 pb-4 last:border-none last:pb-0">
//                     <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3 flex items-center justify-between">
//                       <span>{filter.title}</span>
//                       {activeFilters[filter.id]?.length > 0 && (
//                         <span className="w-2 h-2 bg-[#1877F2] rounded-full" />
//                       )}
//                     </h3>
                    
//                     {/* Range Filters Box */}
//                     {filter.type === 'range' && (
//                       <div className="flex items-center gap-2">
//                         <div className="relative flex-1">
//                           <span className="absolute left-2.5 top-2 text-[10px] font-bold text-slate-400 uppercase">Min</span>
//                           <input
//                             type="number"
//                             placeholder="₦ 0"
//                             value={priceRange.min}
//                             onChange={(e) => setPriceRange(p => ({ ...p, min: e.target.value }))}
//                             className="w-full border border-slate-200 rounded-lg pl-9 pr-2 py-2 text-xs font-semibold text-slate-700 outline-none transition-all focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/10 bg-slate-50/50"
//                           />
//                         </div>
//                         <span className="text-slate-400 text-xs font-bold">-</span>
//                         <div className="relative flex-1">
//                           <span className="absolute left-2.5 top-2 text-[10px] font-bold text-slate-400 uppercase">Max</span>
//                           <input
//                             type="number"
//                             placeholder="Any"
//                             value={priceRange.max}
//                             onChange={(e) => setPriceRange(p => ({ ...p, max: e.target.value }))}
//                             className="w-full border border-slate-200 rounded-lg pl-9 pr-2 py-2 text-xs font-semibold text-slate-700 outline-none transition-all focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/10 bg-slate-50/50"
//                           />
//                         </div>
//                       </div>
//                     )}

//                     {/* Selection Filters Container */}
//                     {(filter.type === 'checkbox' || filter.type === 'search-checkbox' || filter.type === 'radio') && (
//                       <div className="flex flex-col gap-2.5 max-h-52 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
//                         {filter.type === 'search-checkbox' && (
//                           <div className="relative mb-1">
//                             <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
//                             <input
//                               type="text"
//                               placeholder={`Search ${filter.title.toLowerCase()}...`}
//                               value={searchInputs[filter.id] || ''}
//                               onChange={(e) => setSearchInputs(p => ({ ...p, [filter.id]: e.target.value }))}
//                               className="w-full border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none transition-all focus:border-[#1877F2] bg-slate-50/50"
//                             />
//                           </div>
//                         )}

//                         <div className="space-y-2">
//                           {filteredOptions.map((opt) => {
//                             const isChecked = (activeFilters[filter.id] || []).includes(opt.value);
//                             return (
//                               <label key={opt.value} className="flex items-start gap-3 cursor-pointer group py-0.5 select-none">
//                                 <div className="flex items-center h-4 mt-0.5">
//                                   <input
//                                     type={filter.type === 'radio' ? 'radio' : 'checkbox'}
//                                     name={filter.type === 'radio' ? filter.id : undefined}
//                                     checked={isChecked}
//                                     onChange={() => handleFilterChange(filter.id, opt.value, filter.type)}
//                                     className={`w-4 h-4 text-[#1877F2] border-slate-300 transition-all focus:ring-0 focus:ring-offset-0 ${
//                                       filter.type === 'radio' 
//                                         ? 'focus:ring-1 focus:ring-[#1877F2]' 
//                                         : 'rounded border-slate-300 text-[#1877F2]'
//                                     }`}
//                                     style={{ accentColor: '#1877F2' }}
//                                   />
//                                 </div>
//                                 <span className={`text-xs transition-colors flex-1 leading-normal ${
//                                   isChecked ? 'text-slate-900 font-semibold' : 'text-slate-600 group-hover:text-slate-900'
//                                 }`}>
//                                   {opt.label}
//                                   <span className="text-slate-400 font-normal text-[10px] ml-1.5 bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100">
//                                     {opt.count.toLocaleString()}
//                                   </span>
//                                 </span>
//                               </label>
//                             );
//                           })}
//                           {filteredOptions.length === 0 && (
//                             <p className="text-[11px] text-slate-400 italic text-center py-2">No matches found</p>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//     </div>
//   );
// }
