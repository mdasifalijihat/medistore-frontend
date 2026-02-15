"use client";

import { useEffect, useState } from "react";
import { shopService } from "@/service/shop.service";
import { Review } from "@/shop";

export default function DetailsTabs({
  description,
  medicineId,
}: {
  description: string;
  medicineId: string;
}) {
  const [active, setActive] = useState<"desc" | "review">("desc");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (active === "review") {
      setLoading(true);
      shopService
        .getReviewsByMedicine(medicineId)
        .then((data) => setReviews(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [active, medicineId]);

  return (
    <div className="mt-6">
      {/* Tab Buttons */}
      <div className="flex gap-6 border-b">
        <button
          onClick={() => setActive("desc")}
          className={`pb-2 ${
            active === "desc"
              ? "border-b-2 border-primary font-semibold"
              : "text-gray-500"
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActive("review")}
          className={`pb-2 ${
            active === "review"
              ? "border-b-2 border-primary font-semibold"
              : "text-gray-500"
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4 text-gray-600 space-y-4">
        {active === "desc" ? (
          <p>{description}</p>
        ) : loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-4 shadow-sm space-y-1"
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium">{review.user.name}</p>
                  <span className="text-yellow-500 font-semibold">
                    {"⭐".repeat(review.rating)}{" "}
                    {review.rating < 5 ? "☆".repeat(5 - review.rating) : ""}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
