"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { env } from "@/env";
import { useCartStore } from "@/store/cart.store";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface Props {
  medicineId: string;
}

export default function AddToCartSection({ medicineId }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { data: session } = authClient.useSession();
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medicineId,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      addItem(data); // 🔥 Zustand update
      toast.success("Added to cart 🛒");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span>Quantity:</span>

        <div className="flex items-center border rounded">
          <button
            className="px-3 py-1"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            -
          </button>

          <span className="px-4">{quantity}</span>

          <button
            className="px-3 py-1"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <Button onClick={handleAddToCart}>Add To Cart</Button>
    </div>
  );
}
