import React from 'react';
import { Products } from '@/component/utils/data/data';
import SubcategoryLayout from '@/component/marketplace/SubcategoryLayout';

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function SubcategoryPage({ params }: PageProps) {
  // 1. Await the dynamic parameters exactly like your working version
  const { name } = await params;
  const selectionName = decodeURIComponent(name);

 const products = Products.filter((p) => 
    p.category.toLowerCase() === selectionName.toLowerCase() || 
    p.subCategory.toLowerCase() === selectionName.toLowerCase()
  );

  return (
    <SubcategoryLayout 
      initialProducts={products} 
      subCategoryName={selectionName} 
    />
  );
}

