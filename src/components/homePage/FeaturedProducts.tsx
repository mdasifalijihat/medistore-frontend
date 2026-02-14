"use client";

import { Medicine } from "@/shop";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { env } from "@/env";
import { useRouter } from "next/navigation";

interface ShopCartProps {
  medicine: Medicine;
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export default function FeaturedProducts({ medicine }: ShopCartProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      {/* Stock Badge */}
      {medicine.stock === 0 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-20">
          Out of Stock
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <Image
          src="/medicine-placeholder.png" // change if you have image field
          alt={medicine.name}
          width={180}
          height={180}
          className="object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <p className="text-sm text-gray-400 mb-1">{medicine.category?.name}</p>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {medicine.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {medicine.description}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-green-600">
            ৳ {medicine.price}
          </span>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={medicine.stock === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              medicine.stock === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white shadow-md"
            }`}
            onClick={() => router.push(`/shop/${medicine.id}`)}
          >
            <ShoppingCart size={16} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
