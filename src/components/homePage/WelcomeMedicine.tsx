"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Ambulance, Clock, CalendarDays } from "lucide-react";

export default function WelcomeMedicine() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-green-600">MEDISTORE</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Get 100% authentic medicines and healthcare products at affordable
            prices. Your health and safety are our top priority.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Emergency */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <Ambulance className="text-red-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-3">Emergency Case</h3>
            <p className="text-gray-600 mb-4">
              We provide urgent medical supplies and emergency medicines with
              fast delivery service when you need it most.
            </p>
            <Link
              href="/emergency"
              className="text-red-500 font-semibold hover:underline"
            >
              Read More →
            </Link>
          </motion.div>

          {/* 24 Hours */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <Clock className="text-green-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-3">24 Hours Service</h3>
            <p className="text-gray-600 mb-4">
              Our pharmacy operates 24/7 to ensure you always have access to
              essential medicines and healthcare products.
            </p>
            <Link
              href="/service-24"
              className="text-green-600 font-semibold hover:underline"
            >
              Read More →
            </Link>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <CalendarDays className="text-blue-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-3">Opening Hours</h3>
            <p className="text-gray-600">
              Monday – Sunday <br />
              24 Hours Open <br />
              Emergency Support Available Anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
