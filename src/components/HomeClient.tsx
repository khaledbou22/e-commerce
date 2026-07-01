"use client";

import { useRef, useState, useCallback } from "react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import ProductImageStack from "./ProductImageStack";
import ProductCarousel from "./ProductCarousel";
import OrderFormFields from "./OrderFormFields";
import TrustSection from "./TrustSection";
import Footer from "./Footer";
import StickyBottomBar from "./StickyBottomBar";
import { getBundleById } from "@/lib/bundles";

export default function HomeClient() {
  const [selectedBundleId, setSelectedBundleId] = useState("b4");
  const [priceState, setPriceState] = useState<{
    total: number | null;
    deliveryUnavailable: boolean;
    wilayaSelected: boolean;
  }>({ total: null, deliveryUnavailable: false, wilayaSelected: false });
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const bundle = getBundleById(selectedBundleId);

  const handlePriceChange = useCallback(
    (state: {
      total: number | null;
      deliveryUnavailable: boolean;
      wilayaSelected: boolean;
    }) => {
      setPriceState(state);
    },
    []
  );

  return (
    <>
      <TopBar />
      <Navbar />

      <main className="w-full overflow-x-hidden">
        {/* قسم البطل — عمودان 45/55 */}
        <section id="order-form" className="hero-product w-full">
          {/* المعرض — يظهر أعلى في الموبايل / يمين في RTL */}
          <div className="hero-gallery-col">
            <ProductImageStack />
          </div>

          {/* النموذج — 45% */}
          <div className="hero-form-col bg-white px-5 md:px-10 lg:px-14 py-8 md:py-10">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-snug mb-3">
              Les Pieds Anti Vibrations Pour La Machine À Laver
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-cta text-gray-900 font-extrabold text-lg px-4 py-1.5 rounded-lg shadow-sm">
                {bundle.price} DA
              </span>
              <span className="text-red-600 font-bold text-sm border border-red-200 bg-red-50 px-3 py-1 rounded-full">
                Offre limitée
              </span>
            </div>

            <p className="text-primary font-semibold text-sm md:text-base mb-4 leading-relaxed">
              لراحة عائلتك نقدم لكم الأقدام المضادة للاهتزاز الغسالة 🤩
            </p>

            <ProductCarousel />

            <OrderFormFields
              selectedBundleId={selectedBundleId}
              onBundleChange={setSelectedBundleId}
              onPriceChange={handlePriceChange}
              submitButtonRef={submitButtonRef}
            />
          </div>
        </section>

        <TrustSection />
        <Footer />
      </main>

      <StickyBottomBar
        bundlePrice={bundle.price}
        totalPrice={priceState.total}
        deliveryUnavailable={priceState.deliveryUnavailable}
        wilayaSelected={priceState.wilayaSelected}
        submitButtonRef={submitButtonRef}
      />
    </>
  );
}
