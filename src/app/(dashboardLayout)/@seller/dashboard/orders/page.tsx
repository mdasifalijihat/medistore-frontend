"use client";

import { useEffect, useState } from "react";

import { SellerOrder, OrderStatus } from "@/shop";
import { shopService } from "@/service/shop.service";
import { toast } from "sonner";

const statusLabels: Record<OrderStatus, string> = {
  PLACED: "Placed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await shopService.getSellerOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      await shopService.updateOrderStatus(orderId, status);

      // Use friendly label in the toast
      toast.success(`Order status updated to ${statusLabels[status]} 🎉`);

      fetchOrders();
    } catch (err) {
      toast.error("Failed to update order status ❌");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!loading && orders.length === 0) {
    return <p className="text-center text-gray-500">No orders yet 📭</p>;
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-xl">
          <h2 className="font-bold">Order #{order.id}</h2>
          <p>Customer: {order.user.name}</p>
          <p>Address: {order.address}</p>
          <p>Status: {order.status}</p>

          <select
            value={order.status}
            onChange={(e) =>
              handleStatusChange(order.id, e.target.value as OrderStatus)
            }
            className="border p-2 rounded mt-2"
          >
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <div className="mt-4">
            {order.orderItems.map((item) => (
              <div key={item.id} className="text-sm border-b py-2">
                {item.medicine.name} × {item.quantity} = $
                {item.price * item.quantity}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
