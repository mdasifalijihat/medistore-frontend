import { shopService } from "@/service/shop.service";
import { Medicine } from "@/shop";
import Image from "next/image";
import { Star } from "lucide-react";
import DetailsTabs from "@/components/homePage/DetailsTabs";
import AddToCartSection from "@/components/homePage/AddToCartSection";

export const dynamicParams = false;

// 🔥 Generate static params
export async function generateStaticParams() {
  const medicines = await shopService.getMedicines();

  return medicines.map((medi: Medicine) => ({
    id: medi.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const medicines = await shopService.getMedicines();
  const medicine = medicines.find((m) => m.id === id);

  if (!medicine) {
    return <div className="text-center py-20">Medicine not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      {/* LEFT: IMAGE */}
      <div className="relative h-100 w-full">
        <Image
          src={medicine?.image || "/placeholder.png"}
          alt={medicine?.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* RIGHT: DETAILS */}
      <div className="space-y-4">
        {/* Name */}
        <h1 className="text-3xl font-bold">{medicine.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < (medicine.rating ?? 4)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-primary">৳ {medicine.price}</p>

        {/* Category */}
        <p className="text-sm text-gray-500">
          Category: {medicine.category?.name}
        </p>
        {/* Add to Cart */}
        <AddToCartSection medicineId={medicine.id} />
      </div>
      {/* Description + Review Tabs */}
      <DetailsTabs
        description={medicine.description}
        medicineId={medicine.id}
      />
    </div>
  );
}
