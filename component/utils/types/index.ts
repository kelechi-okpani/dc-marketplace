export interface Brand {
  label: string;
  value: string;
  count: number;
  icon: string;
  categoryId: number; 
}

export interface Subcategory {
  id: number;
  name: string;
  count: number;
  icon?: string; 
  totalItems?: number;
}

export interface SubcategoryDrawerProps {
  category: Category;
  onMouseLeave: () => void;
  onSelectSubcategory: (subName: string) => void; // Add this
  activeSub?: string | null; // Optional: to show active state
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  totalItems: number;
  subcategories: Subcategory[];
}

export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number; // Optional as some items might not have a discount
  description: string;
  imageUrl: string;
  category: string;
  subCategory: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  isOfficialStore?: boolean; // Optional
  merchantId?: string; // Optional


  // Detailed Information
  technicalSpecs?: Record<string, string>;
  longDescription?: string;
  whatsInTheBox?: string[];
  warranty?: string;
}

export interface ProductSectionProps {
selectedCategory?: string | undefined;
  selectedSubCategory?: string | null;
  searchQuery?: any
}