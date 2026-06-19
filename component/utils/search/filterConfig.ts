import { ALL_BRANDS } from "./brandList";

export interface FilterOption {
  label: string;
  value: string;
  count: number;
  icon?: string;
}

export interface SubcategoryContextItem {
  name: string;
  count: number;
  isActive: boolean;
}

export interface CategoryCardContext {
  parentName: string;
  subcategories: SubcategoryContextItem[];
}

// Ensure your existing interfaces are exported
export interface FilterOption {
  label: string;
  value: string;
  count: number;
  icon?: string;
}

export interface FilterConfig {
  id: string;
  title: string;
  type: 'checkbox' | 'search-checkbox' | 'range' | 'radio';
  options?: FilterOption[];
}

export interface SubcategoryData {
  name: string;
  count: number;
}


export interface CategoryGroup {

  id: number; // Add this
  parentName: string;
  icon: string; // Add this
  subcategories: SubcategoryData[];
  filters: FilterConfig[];

  // parentName: string;
  // subcategories: SubcategoryData[];
  // filters: FilterConfig[];
}

export interface SubcategoryContextItem {
  name: string;
  count: number;
  isActive: boolean;
}

export interface CategoryCardContext {
  parentName: string;
  subcategories: SubcategoryContextItem[];
}



export const CATEGORY_CONFIG: Record<string, CategoryGroup> = {
  "vehicles": {
    id: 1,
    parentName: "Vehicles",
    icon: "/jiji/car.png",
    subcategories: [
      { name: "Cars", count: 18450 },
      { name: "Buses & Microbuses", count: 820 },
      { name: "Trucks & Trailers", count: 640 },
      { name: "Motorcycles & Scooters", count: 3100 },
      { name: "Heavy Equipment", count: 540 },
      { name: "Watercraft & Boats", count: 120 },
      { name: "Vehicle Parts", count: 9800 },
      { name: "Vehicle Accessories", count: 4500 },
      { name: "Auto Repair Services", count: 1560 },
      { name: "Vehicle Rentals", count: 700 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'brand', title: 'Make-Brand', type: 'search-checkbox' }]
  },
  "property": {
    id: 2,
    parentName: "Property",
    icon: "/jiji/property.png",
    subcategories: [
      { name: "Houses & Apartments for Sale", count: 14500 },
      { name: "Houses & Apartments for Rent", count: 18300 },
      { name: "Land & Plots", count: 7600 },
      { name: "Commercial Property", count: 4100 },
      { name: "Short Let", count: 3400 },
      { name: "Event Centers", count: 890 },
      { name: "Property Services", count: 6500 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "phones-tablets": {
    id: 3,
    parentName: "Phones & Tablets",
    icon: "/jiji/phones.png",
    subcategories: [
      { name: "Smartphones", count: 32000 },
      { name: "Tablets", count: 5800 },
      { name: "Smart Watches", count: 4100 },
      { name: "Accessories", count: 16600 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'brand', title: 'Brand', type: 'search-checkbox' }]
  },
  "electronics": {
    id: 4,
    parentName: "Electronics",
    icon: "/jiji/electronics.png",
    subcategories: [
      { name: "TVs", count: 12500 },
      { name: "Audio & Music Equipment", count: 4200 },
      { name: "Computer Hardware", count: 14500 },
      { name: "Computer Accessories", count: 18000 },
      { name: "Cameras", count: 3100 },
      { name: "Printers", count: 1800 },
      { name: "Networking Equipment", count: 4200 },
      { name: "Video Game Consoles", count: 4200 },
      { name: "Security Equipment", count: 1500 },
      { name: "Generators", count: 2000 },
      { name: "Solar Equipment", count: 2000 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'condition', title: 'Condition', type: 'radio' }]
  },
  "home-furniture": {
    id: 5,
    parentName: "Home, Furniture & Appliances",
    icon: "/jiji/homes.png",
    subcategories: [
      { name: "Furniture", count: 12500 },
      { name: "Kitchen Appliances", count: 14500 },
      { name: "Home Decor", count: 6100 },
      { name: "Beds & Mattresses", count: 5400 },
      { name: "Chairs", count: 4300 },
      { name: "Tables", count: 3900 },
      { name: "Sofas", count: 5100 },
      { name: "Wardrobes", count: 2700 },
      { name: "Air Conditioners", count: 4600 },
      { name: "Refrigerators", count: 5200 },
      { name: "Washing Machines", count: 4200 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "fashion": {
    id: 6,
    parentName: "Fashion",
    icon: "/jiji/fashion.png",
    subcategories: [
      { name: "Clothing", count: 15600 },
      { name: "Shoes", count: 15600 },
      { name: "Bags", count: 6500 },
      { name: "Watches", count: 5200 },
      { name: "Jewelry", count: 4100 },
      { name: "Wedding Wear", count: 1500 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'gender', title: 'Segment', type: 'radio' }]
  },
  "beauty-personal-care": {
    id: 7,
    parentName: "Beauty & Personal Care",
    icon: "/jiji/health.png",
    subcategories: [
      { name: "Makeup", count: 9000 },
      { name: "Hair Care", count: 7200 },
      { name: "Skin Care", count: 18500 },
      { name: "Fragrances", count: 3500 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'beauty_type', title: 'Product Focus', type: 'checkbox' }]
  },
  "services": {
    id: 8,
    parentName: "Services",
    icon: "/jiji/services.png",
    subcategories: [
      { name: "Cleaning", count: 5000 },
      { name: "Logistics", count: 5000 },
      { name: "Banking & Finance", count: 125000 },
      { name: "Telecommunications", count: 53200 },
      { name: "Photography", count: 5000 },
      { name: "Digital Services", count: 35000 }
    ],
    filters: [{ id: 'price', title: 'Budget (₦)', type: 'range' }]
  },
  "repair-construction": {
    id: 9,
    parentName: "Repair & Construction",
    icon: "/jiji/repair.png",
    subcategories: [
      { name: "Building Materials", count: 25500 },
      { name: "Industrial/Engineering", count: 10000 }
    ],
    filters: [{ id: 'price', title: 'Service Fee Range (₦)', type: 'range' }]
  },
  "commercial-equipment": {
    id: 10,
    parentName: "Commercial Equipment & Tools",
    icon: "/jiji/equipment.png",
    subcategories: [
      { name: "Industrial/Manufacturing", count: 8000 },
      { name: "Restaurant/Store", count: 6000 },
      { name: "Medical/Electrical", count: 7500 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'industrial_condition', title: 'Equipment State', type: 'radio' }]
  },
  "leisure-activities": {
    id: 11,
    parentName: "Leisure & Activities",
    icon: "/jiji/hobbies.png",
    subcategories: [
      { name: "Books", count: 4200 },
      { name: "Sports Equipment", count: 5100 },
      { name: "Musical Instruments", count: 3600 },
      { name: "Art/Camping/Gaming", count: 5300 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "babies-kids": {
    id: 12,
    parentName: "Babies & Kids",
    icon: "/jiji/babies.png",
    subcategories: [
      { name: "Baby Clothing/Care", count: 7600 },
      { name: "Toys", count: 6100 },
      { name: "Strollers/Car Seats", count: 4000 },
      { name: "School Supplies", count: 1800 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'age_bracket', title: 'Target Age', type: 'checkbox' }]
  },
  "food-agriculture": {
    id: 13,
    parentName: "Food, Agriculture & Farming",
    icon: "/jiji/agriculture.png",
    subcategories: [
      { name: "FMCG Products", count: 110000 },
      { name: "Agro-Inputs & Livestock", count: 18500 },
      { name: "Food & Drink", count: 18500 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "animals-pets": {
    id: 14,
    parentName: "Animals & Pets",
    icon: "/jiji/animals.png",
    subcategories: [
      { name: "Pets (Dogs/Cats/Birds)", count: 9100 },
      { name: "Pet Accessories/Services", count: 5100 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "jobs": {
    id: 15,
    parentName: "Jobs",
    icon: "/jiji/jobs.png",
    subcategories: [
      { name: "General/Admin/Sales", count: 15000 },
      { name: "IT/Engineering/Healthcare", count: 16200 },
      { name: "Marketing/Teaching", count: 5300 }
    ],
    filters: [{ id: 'salary', title: 'Salary Range (₦)', type: 'range' }]
  },
  "seeking-work": {
    id: 16,
    parentName: "Seeking Work - CVs",
    icon: "/jiji/jobseekers.png",
    subcategories: [
      { name: "Corporate/Finance CVs", count: 3900 },
      { name: "Technical/IT/Eng CVs", count: 4800 },
      { name: "Vocational/Teaching CVs", count: 3700 }
    ],
    filters: [{ id: 'salary', title: 'Expected Pay (₦)', type: 'range' }, { id: 'experience', title: 'Experience Level', type: 'checkbox' }]
  },
  "health-medical": {
    id: 17,
    parentName: "Health & Medical",
    icon: "/jiji/medical.png",
    subcategories: [
      { name: "Pharmaceuticals", count: 5000 },
      { name: "Medical Equipment", count: 4000 },
      { name: "Supplements & Vitamins", count: 3000 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "office-stationery": {
    id: 18,
    parentName: "Office & Stationery",
    icon: "/jiji/office.png",
    subcategories: [
      { name: "Office Furniture", count: 5000 },
      { name: "Stationery & Supplies", count: 10000 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "automotive-services": {
    id: 19,
    parentName: "Automotive Services",
    icon: "/jiji/auto-service.png",
    subcategories: [
      { name: "Insurance", count: 3000 },
      { name: "Logistics & Clearing", count: 5000 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  }
};


export const categories = Object.values(CATEGORY_CONFIG).map(cat => ({
  id: cat.id,
  name: cat.parentName,
  icon: cat.icon,
  totalItems: cat.subcategories.reduce((sum, sub) => sum + sub.count, 0),
  subcategories: cat.subcategories,

  // Dynamically filter brands belonging to this category ID
  brands: ALL_BRANDS.filter((brand) => brand.categoryId === cat.id)
}));