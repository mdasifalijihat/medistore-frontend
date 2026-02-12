"use client";

import { useState } from "react";

export default function DetailsTabs({ description }: { description: string }) {
  const [active, setActive] = useState<"desc" | "review">("desc");

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
      <div className="mt-4 text-gray-600">
        {active === "desc" ? (
          <p>{description}</p>
        ) : (
          <div>
            ⭐⭐⭐⭐☆ <br />
            Very good medicine. Fast delivery.
          </div>
        )}
      </div>
    </div>
  );
}
