import ShopCart from "@/components/homePage/shopCart";
import { shopService } from "@/service/shop.service";

export default async function ShopPage() {
  const data = await shopService.getMedicines();
  // console.log(data);

  return (
    <div className="grid grid-cols-3 container mx-auto px-4 gap-6">
      {data?.map((medicine) => (
        <ShopCart key={medicine.id} medicine={medicine} />
      ))}
    </div>
  );
}
