"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { PRODUCT_IMAGES } from "@/lib/product-images";

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % PRODUCT_IMAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  return (
    <div
      className="w-full mb-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
        {PRODUCT_IMAGES.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[400ms] ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={src}
              alt={`صورة المنتج ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority={idx === 0}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={goPrev}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white text-lg"
          aria-label="الصورة السابقة"
        >
          ›
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white text-lg"
          aria-label="الصورة التالية"
        >
          ‹
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {PRODUCT_IMAGES.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === current ? "bg-primary scale-110" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`الانتقال إلى الصورة ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
