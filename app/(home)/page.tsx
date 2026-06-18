import MarketplaceHome from "@/component/Landing/Marketplace";
import Hero_section from "@/component/marketplace/Hero/Hero";
import HomePage from "@/component/marketplace/Main";
import HeroSection from "@/component/utils/HeroSection";
import CategoriesTab from "@/component/utils/product/category/CategoriesTab";

export default function Home() {
  return (
    <div>
       {/* <HeroSection/> */}
       {/* <CategoriesTab/> */}
       {/* <MarketplaceHome/> */}

       <Hero_section/>
        <main className="flex-grow flex flex-col items-center w-full ">
              <div className="w-full max-w-6xl">
              <HomePage/>
            </div>
        </main>
   
       

    </div>
  );
}
