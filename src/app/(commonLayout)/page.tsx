import HeroSection from "@/components/homePage/HeroSection";
import { shopService } from "@/service/shop.service";

export default async function page() {
  const medicines = await shopService.getMedicines();
  console.log("home", medicines);

  return (
    <div className="container mx-auto">
      <div className="py-2">
        <HeroSection />
      </div>
    </div>
  );
}
