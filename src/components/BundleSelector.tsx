"use client";

import { BUNDLES, calcSavingsPercent } from "@/lib/bundles";

interface BundleSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

function BundleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3L4 7v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V7l-8-4z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BundleSelector({ selectedId, onSelect }: BundleSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="text-right mb-2">
        <h3 className="font-bold text-[#1e293b] text-base leading-tight">Bundle &amp; Save</h3>
        <p className="text-xs text-gray-400 mt-0.5">Select the package that works best for you.</p>
      </div>

      <div className="space-y-3">
        {BUNDLES.map((bundle) => {
          const isSelected = bundle.id === selectedId;
          const savings = calcSavingsPercent(bundle.quantity, bundle.price);
          const label =
            bundle.quantity === 12 || bundle.quantity === 16
              ? `إشتري (${bundle.quantity}) قطعة`
              : `إشتري (${bundle.quantity}) قطع`;

          return (
            <button
              key={bundle.id}
              type="button"
              onClick={() => onSelect(bundle.id)}
              dir="ltr"
              className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white transition-all duration-200 ${
                isSelected
                  ? "border-2 border-[#4A7FE8] shadow-md"
                  : "border border-gray-200 shadow-sm hover:border-gray-300"
              }`}
            >
              {/* أيقونة زرقاء دائرية */}
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#4A7FE8] flex items-center justify-center shadow-sm">
                <BundleIcon />
              </div>

              {/* السعر + نسبة التوفير */}
              <div className="flex-shrink-0 flex items-baseline gap-2">
                <span className="font-bold text-[#1e293b] text-base tracking-tight">
                  {bundle.price} DA
                </span>
                <span className="text-gray-400 text-sm font-normal">save {savings}%</span>
              </div>

              {/* اسم الباقة بالعربية */}
              <p className="flex-1 text-right font-bold text-[#1e293b] text-sm md:text-base pr-1" dir="rtl">
                {label}
              </p>

              {/* علامة الاختيار الزرقاء */}
              {isSelected && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#4A7FE8] flex items-center justify-center shadow-sm">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M3 7l3 3 5-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
