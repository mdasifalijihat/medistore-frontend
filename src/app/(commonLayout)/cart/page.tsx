"use client";

import { useEffect, useState } from "react";
import { shopService } from "@/service/shop.service";
import { CartItem, CreateOrderPayload, Order, OrderItem } from "@/shop";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const setCart = useCartStore((state) => state.setCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const loadCart = async () => {
    try {
      const data = await shopService.getCart();
      setItems(data.cartItems);
      setTotal(data.totalPrice);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (medicineId: string) => {
    try {
      await shopService.removeFromCart(medicineId);

      // 🔥 Update local state immediately
      const newItems = items.filter((item) => item.medicine.id !== medicineId);

      setItems(newItems);

      // 🔥 Update Zustand store (Navbar badge)
      if (newItems.length === 0) {
        clearCart();
      } else {
        setCart(newItems);
      }

      // 🔥 Recalculate total
      const newTotal = newItems.reduce(
        (sum, item) => sum + item.medicine.price * item.quantity,
        0,
      );

      setTotal(newTotal);

      toast.success("Item removed");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  const handleCheckout = async () => {
    try {
      if (items.length === 0) return;

      const orderPayload: CreateOrderPayload = {
        paymentMethod: "CASH_ON_DELIVERY",
        address: "Dhaka, Bangladesh",
        orderItems: items.map((item) => ({
          medicineId: item.medicine.id,
          price: item.medicine.price,
          quantity: item.quantity,
        })),
      };

      await shopService.createOrder(orderPayload);

      toast.success("Order placed successfully 🎉");

      setItems([]);
      setTotal(0);
      clearCart();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">🛒 My Cart</h1>

      {items.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.medicine.image || "/placeholder.png"}
                      alt={item.medicine.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.medicine.name}
                    </h2>
                    <p className="text-gray-500">
                      ৳ {item.medicine.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="font-bold text-lg">
                    ৳ {item.medicine.price * item.quantity}
                  </p>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(item.medicine.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t pt-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total: ৳ {total}</h2>

            <Button size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
