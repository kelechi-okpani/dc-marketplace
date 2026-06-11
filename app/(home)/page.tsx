import MarketplaceHome from "@/component/Landing/Marketplace";
import HeroSection from "@/component/utils/HeroSection";
import CategoriesTab from "@/component/utils/product/category/CategoriesTab";

export default function Home() {
  return (
    <div>
       <HeroSection/>
       <CategoriesTab/>
       <MarketplaceHome/>
    </div>
  );
}
