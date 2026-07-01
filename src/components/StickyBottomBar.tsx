"use client";

import { useState, useEffect, RefObject } from "react";
import { NOT_AVAILABLE_LABEL } from "@/lib/delivery";

interface StickyBottomBarProps {
  bundlePrice: number;
  totalPrice: number | null;
  deliveryUnavailable: boolean;
  wilayaSelected: boolean;
  submitButtonRef: RefObject<HTMLButtonElement | null>;
}

export default function StickyBottomBar({
  bundlePrice,
  totalPrice,
  deliveryUnavailable,
  wilayaSelected,
  submitButtonRef,
}: StickyBottomBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const button = submitButtonRef.current;
    if (!button) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(button);
    return () => observer.disconnect();
  }, [submitButtonRef]);

  function scrollToForm() {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  }

  if (!visible) return null;

  const priceLabel = deliveryUnavailable
    ? NOT_AVAILABLE_LABEL
    : wilayaSelected && totalPrice !== null
      ? `${totalPrice} DA`
      : `${bundlePrice} DA`;

  return (
    <button
      type="button"
      onClick={scrollToForm}
      disabled={deliveryUnavailable}
      className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#290765] text-white font-bold text-base md:text-lg py-4 px-6 flex items-center justify-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.2)] hover:bg-[#166534] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <span>🛒 اطلب الآن</span>
      <span className="bg-white/20 px-3 py-1 rounded-lg">— {priceLabel}</span>
    </button>
  );
}
