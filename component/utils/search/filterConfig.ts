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
  parentName: string;
  subcategories: SubcategoryData[];
  filters: FilterConfig[];
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

export const CATEGORY_CONFIG = {
  "vehicles": {
    id: 1,
    parentName: "Vehicles",
    icon: "/jiji/car.png",
    subcategories: [
      { id: 101, name: "Cars", icon: "🚙", count: 18450 },
      { id: 102, name: "Buses & Microbuses", icon: "🚌", count: 820 },
      { id: 103, name: "Trucks & Trailers", icon: "🚛", count: 640 },
      { id: 104, name: "Motorcycles & Scooters", icon: "🏍️", count: 3100 },
      { id: 105, name: "Heavy Equipment", icon: "🏗️", count: 540 },
      { id: 106, name: "Watercraft & Boats", icon: "🚤", count: 120 },
      { id: 107, name: "Vehicle Parts", icon: "🔧", count: 9800 },
      { id: 108, name: "Vehicle Accessories", icon: "🛞", count: 4500 },
      { id: 109, name: "Auto Repair Services", icon: "🧰", count: 1560 },
      { id: 110, name: "Vehicle Rentals", icon: "🔑", count: 700 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'brand', title: 'Make-Brand', type: 'search-checkbox' }]
  },
  "property": {
    id: 2,
    parentName: "Property",
    icon: "/jiji/property.png",
    subcategories: [
      { id: 201, name: "Houses & Apartments for Sale", icon: "🏡", count: 14500 },
      { id: 202, name: "Houses & Apartments for Rent", icon: "🏢", count: 18300 },
      { id: 203, name: "Land & Plots", icon: "🌍", count: 7600 },
      { id: 204, name: "Commercial Property", icon: "🏬", count: 4100 },
      { id: 205, name: "Short Let", icon: "🛏️", count: 3400 },
      { id: 206, name: "Event Centers", icon: "🎪", count: 890 },
      { id: 207, name: "Property Services", icon: "🧑‍🔧", count: 6500 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "phones-tablets": {
    id: 3,
    parentName: "Phones & Tablets",
    icon: "/jiji/phones.png",
    subcategories: [
      { id: 301, name: "Smartphones", icon: "📱", count: 32000 },
      { id: 302, name: "Tablets", icon: "📲", count: 5800 },
      { id: 303, name: "Smart Watches", icon: "⌚", count: 4100 },
      { id: 304, name: "Accessories", icon: "🔌", count: 16600 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'brand', title: 'Brand', type: 'search-checkbox' }]
  },
  "electronics": {
    id: 4,
    parentName: "Electronics",
    icon: "/jiji/electronics.png",
    subcategories: [
      { id: 401, name: "TVs", icon: "📺", count: 12500 },
      { id: 402, name: "Audio & Music Equipment", icon: "🎧", count: 4200 },
      { id: 403, name: "Computer Hardware", icon: "🖥️", count: 14500 },
      { id: 404, name: "Computer Accessories", icon: "🖱️", count: 18000 },
      { id: 405, name: "Cameras", icon: "📷", count: 3100 },
      { id: 406, name: "Printers", icon: "🖨️", count: 1800 },
      { id: 407, name: "Networking Equipment", icon: "📡", count: 4200 },
      { id: 408, name: "Video Game Consoles", icon: "🎮", count: 4200 },
      { id: 409, name: "Security Equipment", icon: "📹", count: 1500 },
      { id: 410, name: "Generators", icon: "⚡", count: 2000 },
      { id: 411, name: "Solar Equipment", icon: "☀️", count: 2000 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'condition', title: 'Condition', type: 'radio' }]
  },
  "home-furniture": {
    id: 5,
    parentName: "Home, Furniture & Appliances",
    icon: "/jiji/homes.png",
    subcategories: [
      { id: 501, name: "Furniture", icon: "🪑", count: 12500 },
      { id: 502, name: "Kitchen Appliances", icon: "🍳", count: 14500 },
      { id: 503, name: "Home Decor", icon: "🖼️", count: 6100 },
      { id: 504, name: "Beds & Mattresses", icon: "🛏️", count: 5400 },
      { id: 505, name: "Chairs", icon: "💺", count: 4300 },
      { id: 506, name: "Tables", icon: "🪵", count: 3900 },
      { id: 507, name: "Sofas", icon: "🛋️", count: 5100 },
      { id: 508, name: "Wardrobes", icon: "🚪", count: 2700 },
      { id: 509, name: "Air Conditioners", icon: "❄️", count: 4600 },
      { id: 510, name: "Refrigerators", icon: "🧊", count: 5200 },
      { id: 511, name: "Washing Machines", icon: "🧺", count: 4200 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "fashion": {
    id: 6,
    parentName: "Fashion",
    icon: "/jiji/fashion.png",
    subcategories: [
      { id: 601, name: "Clothing", icon: "👗", count: 15600 },
      { id: 602, name: "Shoes", icon: "👟", count: 15600 },
      { id: 603, name: "Bags", icon: "👜", count: 6500 },
      { id: 604, name: "Watches", icon: "⌚", count: 5200 },
      { id: 605, name: "Jewelry", icon: "💍", count: 4100 },
      { id: 606, name: "Wedding Wear", icon: "👰", count: 1500 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'gender', title: 'Segment', type: 'radio' }]
  },
  "beauty-personal-care": {
    id: 7,
    parentName: "Beauty & Personal Care",
    icon: "/jiji/health.png",
    subcategories: [
      { id: 701, name: "Makeup", icon: "💋", count: 9000 },
      { id: 702, name: "Hair Care", icon: "💇", count: 7200 },
      { id: 703, name: "Skin Care", icon: "🧴", count: 18500 },
      { id: 704, name: "Fragrances", icon: "🌸", count: 3500 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'beauty_type', title: 'Product Focus', type: 'checkbox' }]
  },
  "services": {
    id: 8,
    parentName: "Services",
    icon: "/jiji/services.png",
    subcategories: [
      { id: 801, name: "Cleaning", icon: "🧹", count: 5000 },
      { id: 802, name: "Logistics", icon: "🚚", count: 5000 },
      { id: 803, name: "Banking & Finance", icon: "🏦", count: 125000 },
      { id: 804, name: "Telecommunications", icon: "🌐", count: 53200 },
      { id: 805, name: "Photography", icon: "📸", count: 5000 },
      { id: 806, name: "Digital Services", icon: "💻", count: 35000 }
    ],
    filters: [{ id: 'price', title: 'Budget (₦)', type: 'range' }]
  },
  "repair-construction": {
    id: 9,
    parentName: "Repair & Construction",
    icon: "/jiji/repair.png",
    subcategories: [
      { id: 901, name: "Building Materials", icon: "🧱", count: 25500 },
      { id: 902, name: "Industrial/Engineering", icon: "🏗️", count: 10000 }
    ],
    filters: [{ id: 'price', title: 'Service Fee Range (₦)', type: 'range' }]
  },
  "commercial-equipment": {
    id: 10,
    parentName: "Commercial Equipment & Tools",
    icon: "/jiji/equipment.png",
    subcategories: [
      { id: 1001, name: "Industrial/Manufacturing", icon: "🏭", count: 8000 },
      { id: 1002, name: "Restaurant/Store", icon: "🍳", count: 6000 },
      { id: 1003, name: "Medical/Electrical", icon: "🩺", count: 7500 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'industrial_condition', title: 'Equipment State', type: 'radio' }]
  },
  "leisure-activities": {
    id: 11,
    parentName: "Leisure & Activities",
    icon: "/jiji/hobbies.png",
    subcategories: [
      { id: 1101, name: "Books", icon: "📚", count: 4200 },
      { id: 1102, name: "Sports Equipment", icon: "⚽", count: 5100 },
      { id: 1103, name: "Musical Instruments", icon: "🎸", count: 3600 },
      { id: 1104, name: "Art/Camping/Gaming", icon: "🎮", count: 5300 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "babies-kids": {
    id: 12,
    parentName: "Babies & Kids",
    icon: "/jiji/babies.png",
    subcategories: [
      { id: 1201, name: "Baby Clothing/Care", icon: "👶", count: 7600 },
      { id: 1202, name: "Toys", icon: "🧸", count: 6100 },
      { id: 1203, name: "Strollers/Car Seats", icon: "🛒", count: 4000 },
      { id: 1204, name: "School Supplies", icon: "🎒", count: 1800 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }, { id: 'age_bracket', title: 'Target Age', type: 'checkbox' }]
  },
  "food-agriculture": {
    id: 13,
    parentName: "Food, Agriculture & Farming",
    icon: "/jiji/agriculture.png",
    subcategories: [
      { id: 1301, name: "FMCG Products", icon: "🍞", count: 110000 },
      { id: 1302, name: "Agro-Inputs & Livestock", icon: "🐄", count: 18500 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "animals-pets": {
    id: 14,
    parentName: "Animals & Pets",
    icon: "/jiji/animals.png",
    subcategories: [
      { id: 1401, name: "Pets (Dogs/Cats/Birds)", icon: "🐕", count: 9100 },
      { id: 1402, name: "Pet Accessories/Services", icon: "🦴", count: 5100 }
    ],
    filters: [{ id: 'price', title: 'Price Range (₦)', type: 'range' }]
  },
  "jobs": {
    id: 15,
    parentName: "Jobs",
    icon: "/jiji/jobs.png",
    subcategories: [
      { id: 1501, name: "General/Admin/Sales", icon: "🏢", count: 15000 },
      { id: 1502, name: "IT/Engineering/Healthcare", icon: "💻", count: 16200 },
      { id: 1503, name: "Marketing/Teaching", icon: "📣", count: 5300 }
    ],
    filters: [{ id: 'salary', title: 'Salary Range (₦)', type: 'range' }]
  },
  "seeking-work": {
    id: 16,
    parentName: "Seeking Work - CVs",
    icon: "/jiji/jobseekers.png",
    subcategories: [
      { id: 1601, name: "Corporate/Finance CVs", icon: "🧾", count: 3900 },
      { id: 1602, name: "Technical/IT/Eng CVs", icon: "💻", count: 4800 },
      { id: 1603, name: "Vocational/Teaching CVs", icon: "📚", count: 3700 }
    ],
    filters: [{ id: 'salary', title: 'Expected Pay (₦)', type: 'range' }, { id: 'experience', title: 'Experience Level', type: 'checkbox' }]
  }
};

// Derived helper for navigation components
export const categories = Object.values(CATEGORY_CONFIG).map(cat => ({
  id: cat.id,
  name: cat.parentName,
  icon: cat.icon,
  totalItems: cat.subcategories.reduce((sum, sub) => sum + sub.count, 0),
  subcategories: cat.subcategories
}));