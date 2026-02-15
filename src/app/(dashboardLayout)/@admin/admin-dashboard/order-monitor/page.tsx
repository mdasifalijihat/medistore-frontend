"use client";

import { shopService } from "@/service/shop.service";
import { OrderStatus } from "@/shop";
import { AdminOrder } from "@/types";
import React, { useEffect, useState } from "react";

export default function OrderMonitor() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const data =
      statusFilter === "ALL"
        ? await shopService.getAdminOrders()
        : await shopService.getAdminOrders(statusFilter);

    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">📦 Order Monitoring</h1>

      {/* STATUS FILTER */}
      <div className="flex gap-4">
        {[
          "ALL",
          "PLACED",
          "PROCESSING",
          "SHIPPED",
          "DELIVERED",
          "CANCELLED",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status as any)}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === status ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Seller</th>
              <th className="p-4">Total Items</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const sellers = order.orderItems
                .map((item) => item.medicine.seller.name)
                .join(", ");

              const totalItems = order.orderItems.reduce(
                (acc, item) => acc + item.quantity,
                0,
              );

              return (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{order.id.slice(0, 8)}...</td>

                  <td className="p-4">
                    <div>
                      <p className="font-medium">{order.user.name}</p>
                      <p className="text-gray-500 text-xs">
                        {order.user.email}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">{sellers}</td>

                  <td className="p-4">{totalItems}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-600"
                          : order.status === "CANCELLED"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-600"
                          : order.paymentStatus === "FAILED"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
