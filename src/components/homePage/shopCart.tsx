"use client";
import { Medicine } from "@/shop";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { env } from "@/env";
import { useCartStore } from "@/store/cart.store";

interface ShopCartProps {
  medicine: Medicine;
}
const API_URL = env.NEXT_PUBLIC_API_URL;

export default function ShopCart({ medicine }: ShopCartProps) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async () => {
    try {
      if (!user) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        credentials: "include", // 🔥 VERY IMPORTANT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medicineId: medicine.id,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      addItem(data);
      toast.success("Added to cart 🛒");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const renderStars = () => {
    const rating = medicine.rating ?? 4;
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="group border rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 bg-white">
      {/* IMAGE SECTION */}
      <div
        className="relative h-52 w-full cursor-pointer overflow-hidden"
        onClick={() => router.push(`/shop/${medicine.id}`)}
      >
        <Image
          src={medicine.image || "/placeholder.png"}
          alt={medicine.name}
          fill
          className="object-cover group-hover:scale-110 transition duration-300"
        />

        {/* Hover Add to Cart */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <Button
            onClick={(e) => {
              e.stopPropagation(); // 🔥 prevent image click
              handleAddToCart();
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-1">{renderStars()}</div>

        {/* Title */}
        <h3 className="text-lg font-semibold line-clamp-1">{medicine.name}</h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {medicine.description}
        </p>

        {/* Price */}
        <p className="text-xl font-bold text-primary">৳ {medicine.price}</p>
      </div>
    </div>
  );
}
