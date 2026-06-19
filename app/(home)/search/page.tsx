import React, { Suspense } from 'react';
import SearchLayout from '@/component/marketplace/Hero/SearchLocation';
import { Products } from '@/component/utils/data/data';

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">
          Loading search...
        </div>
      }
    >
      <SearchLayout
        allProducts={Products}
        subCategoryName=""
      />
    </Suspense>
  );
}