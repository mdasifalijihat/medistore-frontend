"use client";

import { useEffect, useState } from "react";
import { shopService } from "@/service/shop.service";
import { toast } from "sonner";
import { Order, Review } from "@/shop";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<{
    medicineId: string;
    rating: number;
    comment: string;
  } | null>(null);

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

  const handleReviewSubmit = async () => {
    if (!selectedReview) return;
    try {
      await shopService.createReview(
        selectedReview.medicineId,
        selectedReview.rating,
        selectedReview.comment,
      );
      toast.success("Review submitted ✅");
      setSelectedReview(null);
      loadOrders();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <h1 className="text-3xl font-bold mb-8">📦 My Orders</h1>

      {orders.length === 0 && <p className="text-gray-500">No orders found</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-xl p-6 shadow-sm space-y-4"
        >
          {/* Order Header */}
          <div className="flex justify-between">
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

          {/* Order Items */}
          <div className="space-y-2">
            {order.orderItems?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm items-center"
              >
                <div>
                  <span>{item.medicine?.name}</span> × {item.quantity}
                  <span className="ml-2 font-medium">
                    ৳ {item.price * item.quantity}
                  </span>
                </div>

                {/* Review Button (if delivered) */}
                {order.status === "DELIVERED" && (
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs"
                    onClick={() =>
                      setSelectedReview({
                        medicineId: item.medicine!.id,
                        rating: 5,
                        comment: "",
                      })
                    }
                  >
                    Review
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-87.5 space-y-4">
            <h2 className="text-lg font-semibold">Leave a Review</h2>

            <div className="flex flex-col gap-2">
              <label className="text-sm">Rating (1-5)</label>
              <input
                type="number"
                min={1}
                max={5}
                value={selectedReview.rating}
                onChange={(e) =>
                  setSelectedReview({
                    ...selectedReview,
                    rating: Number(e.target.value),
                  })
                }
                className="border p-2 rounded"
              />

              <label className="text-sm">Comment</label>
              <textarea
                value={selectedReview.comment}
                onChange={(e) =>
                  setSelectedReview({
                    ...selectedReview,
                    comment: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
