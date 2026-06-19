import MarketplaceHome from "@/component/Landing/Marketplace";
import HeaderSearchSection from "@/component/marketplace/Hero/HeaderSearchSection";
import Hero_section from "@/component/marketplace/Hero/Hero";
import HomePage from "@/component/marketplace/Main";


export default function Home() {
  return (
    <div>
       <Hero_section/>
       <HeaderSearchSection/>
       
        <main className="flex-grow flex flex-col items-center w-full ">
              <div className="w-full max-w-6xl">
              <HomePage/>
            </div>
        </main>
   
       

    </div>
  );
}
