import FeaturedProducts from "@/components/homePage/FeaturedProducts";
import HeroSection from "@/components/homePage/HeroSection";
import WelcomeMedicine from "@/components/homePage/WelcomeMedicine";
import { shopService } from "@/service/shop.service";

export default async function page() {
  const medicines = await shopService.getMedicines();
  console.log("home", medicines);

  return (
    <div className="container mx-auto">
      {/* hero seciton  */}
      <div className="py-2">
        <HeroSection />
      </div>
      {/* Featured Products */}
      <div className="my-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

        <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="min-w-75 max-w-75 shrink-0">
              <FeaturedProducts medicine={medicine} />
            </div>
          ))}
        </div>
      </div>
      {/* welcome medicine  */}

      <div className="my-12">
        <WelcomeMedicine />
      </div>
    </div>
  );
}
