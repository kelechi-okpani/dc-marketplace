import { Product } from "../types";
import { ALL_BRANDS } from "./brandList";
import { CATEGORY_CONFIG, FilterConfig, CategoryCardContext } from "./filterConfig";


export function getCategoryCardContext(name: string): CategoryCardContext {
  const normalizedName = name.trim().toLowerCase();
  const categoryKeys = Object.keys(CATEGORY_CONFIG) as (keyof typeof CATEGORY_CONFIG)[];

  // Try to find a match (Category OR Subcategory)
  const parentKey = categoryKeys.find((key) => {
    const group = CATEGORY_CONFIG[key];
    const isCategoryMatch = key.toLowerCase() === normalizedName;
    const isSubCategoryMatch = group.subcategories.some(s => s.name.toLowerCase() === normalizedName);
    return isCategoryMatch || isSubCategoryMatch;
  });

  // Default return if no match found (avoids crashing the sidebar)
  if (!parentKey) {
    return { parentName: "All Categories", subcategories: [] };
  }

  const group = CATEGORY_CONFIG[parentKey];
  return {
    parentName: group.parentName,
    subcategories: group.subcategories.map(sub => ({
      name: sub.name,
      count: sub.count,
      isActive: sub.name.toLowerCase() === normalizedName
    }))
  };
}


export function getDynamicFiltersForSubcategory(
  subCategoryName: string,
  initialProducts: Product[]
): FilterConfig[] {
  const normalizedSubName = subCategoryName.trim().toLowerCase();
  
  // 1. Get products for this specific subcategory
  const productsInSub = initialProducts.filter(
    (p) => p.subCategory?.toLowerCase() === normalizedSubName
  );

  const categoryKeys = Object.keys(CATEGORY_CONFIG) as (keyof typeof CATEGORY_CONFIG)[];
  const categoryKey = categoryKeys.find((key) =>
    CATEGORY_CONFIG[key].subcategories.some(
      (sub) => sub.name.toLowerCase() === normalizedSubName
    )
  );

  if (!categoryKey) return [];

  return CATEGORY_CONFIG[categoryKey].filters.map((filter): FilterConfig => {
    if (filter.id === 'brand') {
      // 2. Calculate brand counts dynamically based on actual products in sub
      const brandCounts: Record<string, number> = {};
      productsInSub.forEach((p) => {
        if (p.brand) {
          brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
        }
      });

      return {
        ...filter,
        type: filter.type as FilterConfig['type'],
        options: ALL_BRANDS
          .filter((b) => b.originCategory === categoryKey && brandCounts[b.label] > 0)
          .map((b) => ({
            ...b,
            count: brandCounts[b.label] || 0 // Use the real-time count
          }))
      };
    }

    return {
      ...filter,
      type: filter.type as FilterConfig['type']
    };
  });
}

/**
 * Dynamically injects brand options into the filter configuration
 * based on the category of the subcategory provided.
//  */
// export function getDynamicFiltersForSubcategory(subCategoryName: string): FilterConfig[] {
//   const normalizedSubName = subCategoryName.trim().toLowerCase();
//   const categoryKeys = Object.keys(CATEGORY_CONFIG) as (keyof typeof CATEGORY_CONFIG)[];

//   const categoryKey = categoryKeys.find((key) =>
//     CATEGORY_CONFIG[key].subcategories.some(
//       (sub) => sub.name.toLowerCase() === normalizedSubName
//     )
//   );

//   if (!categoryKey) return [];

//   // Map the filters and ensure they strictly conform to FilterConfig
//   return CATEGORY_CONFIG[categoryKey].filters.map((filter): FilterConfig => {
//     if (filter.id === 'brand') {
//       return {
//         ...filter,
//         type: filter.type as FilterConfig['type'],
//         options: ALL_BRANDS
//           .filter((b) => b.originCategory === categoryKey)
//           .map(({ label, value, count, icon }) => ({ label, value, count, icon }))
//       };
//     }
    
//     // Ensure all other filters also map correctly to FilterConfig
//     return {
//       ...filter,
//       type: filter.type as FilterConfig['type']
//     };
//   });
// }