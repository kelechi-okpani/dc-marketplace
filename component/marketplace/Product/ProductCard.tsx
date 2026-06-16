'use client';
import React from 'react';
import Link from 'next/link';
import { Heart, Star, ShoppingCart, Tag, FolderTree, Building2 } from 'lucide-react';
import { Product } from '@/component/utils/types';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void; // Added handler
}

export default function ProductCard({ product, viewMode, onViewDetails, onAddToCart }: ProductCardProps) {
  const isGrid = viewMode === 'grid';
  const productDetailsUrl = `/products/${product.id}`;

  return (
    <div className={`group bg-white border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-[#1877F2]/30 ${isGrid ? 'rounded-lg p-2 flex flex-col' : 'rounded-xl p-3 flex flex-row gap-4'}`}>
      
      {/* --- Image Section --- */}
      <Link href={productDetailsUrl} className={`relative overflow-hidden bg-slate-100 ${isGrid ? 'w-full aspect-square rounded-xl mb-2' : 'w-40 h-32 rounded-lg shrink-0'}`}>
        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        {product.isOfficialStore && (
          <span className="absolute top-2 left-2 bg-[#1877F2] text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm">OFFICIAL</span>
        )}
      </Link>

      {/* --- Details Section --- */}
      <div className={`flex flex-col justify-between ${isGrid ? 'flex-1' : 'flex-1'}`}>
        <div>
          <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-[#1877F2]">
             {product.title}
          </h4>
          
          <div className="flex items-center gap-1 mt-1">
             <span className="text-sm font-black text-slate-950">₦{(product.price || 0).toLocaleString()}</span>
          </div>

          {/* Expanded Metadata */}
          <div className="flex flex-col gap-0.5 mt-2 text-[10px] text-slate-500">
             <div className="flex items-center gap-1"><Building2 size={10} /> {product.brand}</div>
             <div className="flex items-center gap-1"><FolderTree size={10} /> {product.category} / {product.subCategory}</div>
          </div>
        </div>

        {/* --- Footer (Actions) --- */}
        <div className={`flex items-center justify-between mt-3 ${isGrid ? 'pt-2 border-t' : ''}`}>
           <div className="flex items-center text-amber-500">
              <Star size={12} className="fill-amber-500" />
              <span className="text-[10px] text-slate-500 ml-1 font-bold">4.5</span>
           </div>
           
           <div className="flex items-center gap-2">
             <button className="text-slate-400 hover:text-[#1877F2] transition-colors">
                <Heart size={18} />
             </button>
             <button 
                onClick={() => onAddToCart?.(product)}
                className="bg-[#1877F2] hover:bg-[#1565c0] text-white p-2 rounded-full transition-all active:scale-90"
                title="Add to cart"
             >
                <ShoppingCart size={16} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

// 'use client';
// import React from 'react';
// import Link from 'next/link';
// import { Heart, Star } from 'lucide-react';
// import { Product } from '@/component/utils/types';

// interface ProductCardProps {
//   product: Product;
//   viewMode: 'grid' | 'list';
//   onViewDetails?: (product: Product) => void;
// }

// export default function ProductCard({ product, viewMode, onViewDetails }: ProductCardProps) {
//   const isGrid = viewMode === 'grid';
//   const productDetailsUrl = `/products/${product.id}`;

//   return (
//     <div className={`group bg-white border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-[#1877F2]/30 ${isGrid ? 'rounded-2xl p-2 flex flex-col' : 'rounded-xl p-3 flex flex-row gap-4'}`}>
      
//       {/* --- Image Section --- */}
//       <Link href={productDetailsUrl} className={`relative overflow-hidden bg-slate-100 ${isGrid ? 'w-full aspect-square rounded-xl mb-2' : 'w-40 h-32 rounded-lg shrink-0'}`}>
//         <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
//         {/* Badges */}
//         <div className="absolute top-2 left-2 flex flex-col gap-1">
//              {product.isOfficialStore && (
//                 <span className="bg-[#1877F2] text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm">OFFICIAL</span>
//              )}
//         </div>
//       </Link>

//       {/* --- Details Section --- */}
//       <div className={`flex flex-col justify-between ${isGrid ? '' : 'flex-1'}`}>
//         <div>
//           <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-[#1877F2]">
//              {product.title}
//           </h4>
          
//           <div className="flex items-center gap-1 mt-1">
//              <span className="text-xs font-black text-slate-950">₦{(product.price || 0).toLocaleString()}</span>
//           </div>

//           <p className="text-[10px] text-slate-400 mt-0.5">{product.brand} • {product.subCategory}</p>
//         </div>

//         {/* --- Footer (Actions) --- */}
//         <div className={`flex items-center justify-between mt-2 ${isGrid ? 'pt-2 border-t' : ''}`}>
//            <div className="flex items-center text-[#1877F2]">
//               <Star size={12} className="fill-[#1877F2]" />
//               <span className="text-[10px] text-slate-400 ml-1 font-bold">4.5</span>
//            </div>
//            <button className="text-slate-400 hover:text-[#1877F2]">
//               <Heart size={16} />
//            </button>
//         </div>
//       </div>
//     </div>
//   );
// }