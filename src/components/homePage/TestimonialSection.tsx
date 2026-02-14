"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Rahim Ahmed",
    location: "Dhaka, BD",
    review:
      "MEDISTORE delivers genuine medicines on time. Their fast delivery and affordable prices make them my go-to online pharmacy.",
    image: "/user1.jpg",
  },
  {
    name: "Sadia Islam",
    location: "Chattogram, BD",
    review:
      "I ordered vitamins and received them within hours. Excellent customer service and authentic healthcare products!",
    image: "/user2.jpg",
  },
  {
    name: "Tanvir Hasan",
    location: "Sylhet, BD",
    review:
      "Reliable pharmacy with great discounts. I trust MEDISTORE for my family’s health needs.",
    image: "/user3.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-green-600 font-semibold uppercase tracking-wide">
            Trusted By Our Customers
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            What Our Customers Say 💬
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 mb-6">{item.review}</p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                {/* <div className="w-12 h-12 relative rounded-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div> */}
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
