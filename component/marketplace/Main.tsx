'use client';
import { useState } from 'react';
import { MobileGrid } from './Mobile/MobileGrid';
import { Sidebar } from './Sidebar';
import { SubcategoryDrawer } from './SubCategoryDrawer';
import { Category } from '../utils/types';
import { categories } from '../utils/search/categories';
import { MobileSubcategoryView } from './Mobile/MobileSubcategoryView';
import ProductSection from './Product/ProductSection';
import { Products } from '../utils/data/data';
import { ReusableSearch } from '../utils/search/ReusableSearch';


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [activeMobileCategory, setActiveMobileCategory] = useState<any>(null);


  return (
   <div className="bg-gray-100 min-h-screen pt-2 pb-6 px-2">

    {/* --- SHARED SEARCH (Visible everywhere) --- */}
      {/* <div className="max-w-7xl mx-auto mb-4 pt-4 hidden md:flex"> */}
      <div className="max-w-7xl mx-auto mb-4 pt-4">
        <ReusableSearch 
          placeholder="Search products in DC Marketplace..." 
          onSearch={(query) => setSearchQuery(query)}
        />
      </div>


{/* --- MOBILE VIEW --- */}
      <div className="md:hidden">
        {/* If we have a subcategory, show the Results Header and Product List */}
        {activeSubCategory ? (
          <div className="flex flex-col">
            {/* Results Header */}
            <div className="bg-white p-4 border-b flex items-center justify-between shadow-sm sticky top-0 z-10">
              <button 
                onClick={() => {
                  setActiveSubCategory(null); // Clear filter
                  setActiveMobileCategory(null); // Return to categories
                }}
                className="text-gray-600 font-bold text-xs"
              >
                ← Back to Categories
              </button>
              <h5 className="font-bold text-gray-800 text-xs">{activeSubCategory}</h5>
            </div>
            
            <ProductSection 
              selectedCategory={activeMobileCategory?.name} 
              selectedSubCategory={activeSubCategory} 
              searchQuery={searchQuery}
            />
          </div>
        ) : (
          /* If NO subcategory is selected, show the Grid or the Subcategory selection view */
          activeMobileCategory ? (
            <MobileSubcategoryView 
              category={activeMobileCategory} 
              onBack={() => setActiveMobileCategory(null)} 
              onSelectSubcategory={(subName) => setActiveSubCategory(subName)}
              onSearch={(query) => setSearchQuery(query)}
              searchQuery={searchQuery}
            />
          ) : (
            <MobileGrid 
              categories={categories} 
              onCategoryClick={(cat: any) => setActiveMobileCategory(cat)} 
              onSearch={(query) => setSearchQuery(query)}
           
            />
          )
        )}
      </div>


      {/* Desktop View */}
      <div className="hidden md:block max-w-7xl mx-auto mt-6">

      
      <div   className="relative flex h-[980px]  shadow-sm border border-slate-200 overflow-hidden"
            onMouseLeave={() => setActiveCategory(null)} // Wraps sidebar + drawer
            >
          {/* Sidebar */}


        <Sidebar 
            searchQuery={searchQuery}
            categories={categories} 
            activeId={activeCategory?.id || null}
            onMouseEnter={(cat) => {
                  setActiveCategory(cat);
                  setActiveSubCategory(null);
              }}
              onSelect={(cat) => {
                console.log("Selected category:", cat.name);
                setActiveCategory(cat);
          }}
        />

          {/* Flyout Drawer */}
          {activeCategory && (
            <SubcategoryDrawer 
              category={activeCategory} 
              onMouseLeave={() => setActiveCategory(null)}
              onSelectSubcategory={(subName) => setActiveSubCategory(subName)}
              activeSub={activeSubCategory}
            />
          )}

          {/* Main Content Area */}
        <div className="flex-1 p-1 overflow-y-auto h-full px-4">
            <h4 className="text-1xl font-bold text-gray-800 px-4 mt-2">
               {/* {activeSubCategory ? `Results for ${activeSubCategory}` : "All Products"} */}
            
            
            
          {activeSubCategory && `${activeSubCategory} Found` }
              
            </h4>
            
            {/* PASS FILTERS HERE */}
            <ProductSection 
              selectedCategory={activeCategory?.name} 
              selectedSubCategory={activeSubCategory} 
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
}