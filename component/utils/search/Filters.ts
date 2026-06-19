import { Product } from "../types";
import { ALL_BRANDS } from "./brandList";
import { CATEGORY_CONFIG, FilterConfig, CategoryCardContext } from "./filterConfig";



// export function getCategoryCardContext(name: string): CategoryCardContext {
//   if (!name) return { parentName: "All Categories", subcategories: [] };
  
//   const normalizedName = name.trim().toLowerCase();
  
//   // Find the category object where name matches parentName or a subcategory name
//   const group = Object.values(CATEGORY_CONFIG).find((cat) => 
//     cat.parentName.toLowerCase() === normalizedName || 
//     cat.subcategories.some(s => s.name.toLowerCase() === normalizedName)
//   );

//   if (!group) {
//     return { parentName: "All Categories", subcategories: [] };
//   }

//   return {
//     parentName: group.parentName,
//     subcategories: group.subcategories.map(sub => ({
//       name: sub.name,
//       count: sub.count,
//       isActive: sub.name.toLowerCase() === normalizedName
//     }))
//   };
// }



// export function getDynamicFiltersForSubcategory(subCategoryName: string): FilterConfig[] {
//   if (!subCategoryName) return [];
//   const normalizedSubName = subCategoryName.trim().toLowerCase();

//   // Find the category group that contains this subcategory
//   const category = Object.values(CATEGORY_CONFIG).find((cat) =>
//     cat.subcategories.some((sub) => sub.name.toLowerCase() === normalizedSubName)
//   );

//   if (!category) return [];

//   // Map the filters
//   return category.filters.map((filter): FilterConfig => {
//     if (filter.id === 'brand') {
//       return {
//         ...filter,
//         options: ALL_BRANDS
//           .filter((b) => b.categoryId === category.id) // Using category.id now
//           .map(({ label, value, count, icon }) => ({ 
//             label, 
//             value, 
//             count, 
//             icon 
//           }))
//       };
//     }
    
//     return { ...filter };
//   });
// }

// export function getDynamicFiltersForSearch(): FilterConfig[] {
//   return [
//     {
//       id: 'price',
//       title: 'Price Range (₦)',
//       type: 'range',
//       options: [] // Handled by range inputs
//     },
//     {
//       id: 'brand',
//       title: 'Popular Brands',
//       type: 'checkbox',
//       options: ALL_BRANDS.slice(0, 10).map((b) => ({
//         label: b.label,
//         value: b.value,
//         count: b.count,
//         icon: b.icon
//       }))
//     },
//     {
//       id: 'condition',
//       title: 'Condition',
//       type: 'radio',
//       options: [
//         { label: 'New', value: 'new', count: 0 },
//         { label: 'Used', value: 'used', count: 0 },
//         { label: 'Refurbished', value: 'refurbished', count: 0 }
//       ]
//     },
//     {
//       id: 'shipping',
//       title: 'Shipping Options',
//       type: 'checkbox',
//       options: [
//         { label: 'Free Shipping', value: 'free_shipping', count: 0 },
//         { label: 'Express Delivery', value: 'express', count: 0 }
//       ]
//     }
//   ];
// }


export function getCategoryCardContext(
  name: string
): CategoryCardContext {
  if (!name) {
    return {
      parentName: "All Categories",
      subcategories: [],
    };
  }

  const normalized = name.trim().toLowerCase();

  const group = Object.values(CATEGORY_CONFIG).find(
    (cat) =>
      cat.parentName.toLowerCase() === normalized ||
      cat.subcategories.some(
        (sub) => sub.name.toLowerCase() === normalized
      )
  );

  if (!group) {
    return {
      parentName: "All Categories",
      subcategories: [],
    };
  }

  return {
    parentName: group.parentName,
    subcategories: group.subcategories.map((sub) => ({
      name: sub.name,
      count: sub.count,
      isActive:
        sub.name.toLowerCase() === normalized,
    })),
  };
}


export function getCategoryFromProducts(
  products: Product[]
) {
  if (!products.length) return null;

  const counts: Record<string, number> = {};

  products.forEach((product) => {
    const category = product.category?.trim();

    if (!category) return;

    counts[category] =
      (counts[category] || 0) + 1;
  });

  const dominantCategory =
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    Object.values(CATEGORY_CONFIG).find(
      (cat) =>
        cat.parentName.toLowerCase() ===
        dominantCategory?.toLowerCase()
    ) || null
  );
}

export function getDynamicFiltersForSubcategory(
  subCategoryName: string,
  products: Product[]
): FilterConfig[] {
  if (!subCategoryName) return [];

  const normalized =
    subCategoryName.trim().toLowerCase();

  const category = Object.values(
    CATEGORY_CONFIG
  ).find(
    (cat) =>
      cat.parentName.toLowerCase() === normalized ||
      cat.subcategories.some(
        (sub) =>
          sub.name.toLowerCase() === normalized
      )
  );

  if (!category) return [];

  const brands = [
    ...new Set(
      products
        .filter(
          (p) =>
            p.category?.toLowerCase() ===
              normalized ||
            p.subCategory?.toLowerCase() ===
              normalized
        )
        .map((p) => p.brand)
        .filter(Boolean)
    ),
  ];

  return category.filters.map((filter) => {
    if (filter.id === "brand") {
      return {
        ...filter,
        options: brands.map((brand) => ({
          label: brand,
          value: brand.toLowerCase(),
          count: products.filter(
            (p) =>
              p.brand?.toLowerCase() ===
              brand.toLowerCase()
          ).length,
        })),
      };
    }

    return filter;
  });
}


export function getDynamicFiltersForSearch(
products: Product[]): FilterConfig[] {
  const brands = [
    ...new Set(
      products
        .map((p) => p.brand)
        .filter(Boolean)
    ),
  ];

  return [
    {
      id: "price",
      title: "Price Range (₦)",
      type: "range",
      options: [],
    },

    {
      id: "brand",
      title: "Brands",
      type: "checkbox",

      options: brands.map((brand) => ({
        label: brand,
        value: brand.toLowerCase(),
        count: products.filter(
          (p) =>
            p.brand?.toLowerCase() ===
            brand.toLowerCase()
        ).length,
      })),
    },

  {
  id: "condition",
  title: "Condition",
  type: "radio",
  options: [
    {
      label: "New",
      value: "new",
      count: products.filter(
        p => (p.condition || '').toLowerCase() === 'new'
      ).length,
    },
    {
      label: "Used",
      value: "used",
      count: products.filter(
        p => (p.condition || '').toLowerCase() === 'used'
      ).length,
    },
    {
      label: "Refurbished",
      value: "refurbished",
      count: products.filter(
        p => (p.condition || '').toLowerCase() === 'refurbished'
      ).length,
    },
  ],
}
  ];
}




