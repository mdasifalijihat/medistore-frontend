"use client";

import { useEffect, useState } from "react";
import { shopService } from "@/service/shop.service";
import { toast } from "sonner";
import { Order } from "@/shop";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await shopService.getOrders();
      setOrders(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold">Status: {order.status}</p>
                  <p className="text-sm text-gray-500">
                    Payment: {order.paymentStatus}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                {order.orderItems?.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.medicine?.name} × {item.quantity}
                    </span>
                    <span>৳ {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
