import React from 'react';
import { Products } from '@/component/utils/data/data';
import SubcategoryLayout from '@/component/marketplace/SubcategoryLayout';

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function SubcategoryPage({ params }: PageProps) {
  // 1. Await the dynamic parameters exactly like your working version
  const { name } = await params;
  const subCategoryName = decodeURIComponent(name);
  const selectionName = decodeURIComponent(name);

 const products = Products.filter((p) => 
    p.category.toLowerCase() === selectionName.toLowerCase() || 
    p.subCategory.toLowerCase() === selectionName.toLowerCase()
  );

  return (
    <SubcategoryLayout 
      initialProducts={products} 
      subCategoryName={selectionName} 
      // subCategoryName={subCategoryName} 
    />
  );
}


// import React from 'react';
// import { Products } from '@/component/utils/data/jiji_data';
// import SubcategoryLayout from '@/component/marketplace/SubcategoryLayout';

// // 1. Update the type to Promise<{ name: string }>
// // 2. Mark the component as async
// export default async function SubcategoryPage({ 
//   params 
// }: { 
//   params: Promise<{ name: string }> 
// }) {
//   // 3. Await the params before accessing the property
//   const { name } = await params;
  
//   // Decode the URL param
//   const subCategoryName = decodeURIComponent(name);

//   // Filter your data
//   const products = Products.filter((p) => p.subCategory === subCategoryName);

//   return (
//     <main className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Results for {subCategoryName}</h1>
      
//       {products.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {products.map((product) => (
//              <div key={product.id} className="border p-4 rounded-lg">
//                 <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover rounded" />
//                 <h3 className="font-bold mt-2">{product.title}</h3>
//                 <p>₦{product.price.toLocaleString()}</p>
//              </div>
//           ))}
//         </div>
//       ) : (
//         <p>No products found in this category.</p>
//       )}
//     </main>
//   );
// }

