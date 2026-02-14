"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import bg1 from "../../../public/bg-1.png";
import bg2 from "../../../public/bg-2-2.png";
import bg3 from "../../../public/bg-4.png";
import bg4 from "../../../public/hero-bg.png";
import Link from "next/link";

const slides = [bg1, bg2, bg3, bg4];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[65vh] overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current]}
            alt="Hero Background"
            fill
            priority
            className="object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 text-white max-w-6xl">
        <motion.h1
          key={current + "title"}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Premium Quality Medicine <br />
          For A Healthier Tomorrow 💊
        </motion.h1>

        <motion.p
          key={current + "desc"}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl mb-8 max-w-2xl"
        >
          Trusted pharmacy products delivered fast and safely to your doorstep.
          Your health is our priority.
        </motion.p>

        <Link href={`/shop`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-fit px-8 py-3 backdrop-blur-md bg-white/20 border border-white/30 rounded-full text-lg font-semibold shadow-xl hover:bg-green-500 transition-all duration-300"
          >
            Shop Now
          </motion.button>
        </Link>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
              current === index ? "bg-green-500 w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
