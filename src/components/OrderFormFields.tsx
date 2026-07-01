"use client";

import { useState, useEffect, FormEvent, Ref } from "react";
import { WILAYAS } from "@/lib/wilayas";
import { getBundleById } from "@/lib/bundles";
import { getDeliveryPrice, getTotalPrice, isDeliveryAvailable, NOT_AVAILABLE_LABEL, DeliveryType } from "@/lib/delivery";
import BundleSelector from "./BundleSelector";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyM2kmF_RXZcNxTFNMCK_ejt5Q0H-B1duYlblTVNtIzR-2F01oredMg5chQYjQ-jeva/exec";

interface OrderFormFieldsProps {
  selectedBundleId: string;
  onBundleChange: (id: string) => void;
  onPriceChange: (state: {
    total: number | null;
    deliveryUnavailable: boolean;
    wilayaSelected: boolean;
  }) => void;
  submitButtonRef: Ref<HTMLButtonElement>;
}

export default function OrderFormFields({
  selectedBundleId,
  onBundleChange,
  onPriceChange,
  submitButtonRef,
}: OrderFormFieldsProps) {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("home");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const bundle = getBundleById(selectedBundleId);
  const deliveryPrice = getDeliveryPrice(wilaya, deliveryType);
  const totalPrice = getTotalPrice(bundle.price, wilaya, deliveryType);
  const deliveryUnavailable = Boolean(wilaya && !isDeliveryAvailable(wilaya, deliveryType));
  const homeAvailable = !wilaya || isDeliveryAvailable(wilaya, "home");
  const officeAvailable = !wilaya || isDeliveryAvailable(wilaya, "office");

  useEffect(() => {
    if (!wilaya) return;
    setDeliveryType((current) => {
      if (isDeliveryAvailable(wilaya, current)) return current;
      if (isDeliveryAvailable(wilaya, "home")) return "home";
      if (isDeliveryAvailable(wilaya, "office")) return "office";
      return current;
    });
  }, [wilaya]);

  useEffect(() => {
    onPriceChange({
      total: totalPrice,
      deliveryUnavailable,
      wilayaSelected: Boolean(wilaya),
    });
  }, [totalPrice, deliveryUnavailable, wilaya, onPriceChange]);

  function validateForm(): boolean {
    const errors: Record<string, string> = {};
    if (!phone.trim()) errors.phone = "رقم الهاتف مطلوب";
    else if (!/^\d{10}$/.test(phone.trim())) errors.phone = "10 أرقام مطلوبة";
    if (!fullName.trim()) errors.fullName = "الاسم واللقب مطلوب";
    if (!wilaya) errors.wilaya = "يرجى اختيار الولاية";
    if (!commune.trim()) errors.commune = "البلدية مطلوبة";
    if (wilaya && !isDeliveryAvailable(wilaya, deliveryType)) {
      errors.deliveryType = "نوع التوصيل المختار غير متوفر لهذه الولاية";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_name: "الأقدام المضادة للاهتزاز",
        currency: "DZD",
        value: totalPrice ?? 0,
        num_items: bundle.quantity,
      });
    }

    setError("");
    if (!validateForm()) return;
    if (deliveryUnavailable || deliveryPrice === null || totalPrice === null) {
      setError("نوع التوصيل المختار غير متوفر لهذه الولاية");
      return;
    }

    setIsLoading(true);
    try {
      const selectedWilaya = WILAYAS.find((w) => w.code === wilaya);
      const wilayaLabel = selectedWilaya
        ? `${selectedWilaya.code} - ${selectedWilaya.nameAr}`
        : wilaya;

      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          full_name: fullName.trim(),
          phone: phone.trim(),
          wilaya: wilayaLabel,
          commune: commune.trim(),
          delivery_type: deliveryType === "home" ? "للمنزل" : "لمكتب التوصيل",
          bundle_quantity: bundle.quantity,
          bundle_price: bundle.price,
          delivery_price: deliveryPrice,
          total_price: totalPrice,
        }),
      });

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Purchase", {
          content_name: "الأقدام المضادة للاهتزاز",
          content_type: "product",
          currency: "DZD",
          value: totalPrice ?? 0,
          num_items: bundle.quantity,
        });
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:opacity-60 ${
      hasError ? "border-red-400" : "border-gray-300"
    }`;

  if (isSuccess) {
    return (
      <div className="bg-green-50 border-2 border-primary rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-primary mb-2">تم استلام طلبك!</h3>
        <p className="text-gray-700">سيتصل بك فريقنا قريباً لتأكيد طلبك</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <BundleSelector selectedId={selectedBundleId} onSelect={onBundleChange} />

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
          رقم الهاتف — Téléphone <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="05XXXXXXXX"
          disabled={isLoading}
          className={inputClass(!!fieldErrors.phone)}
          dir="ltr"
        />
        {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1">
          الاسم واللقب — Nom <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="مثال: أحمد بن علي"
          disabled={isLoading}
          className={inputClass(!!fieldErrors.fullName)}
        />
        {fieldErrors.fullName && <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="wilaya" className="block text-sm font-semibold text-gray-700 mb-1">
          الولاية — Wilaya <span className="text-red-500">*</span>
        </label>
        <select
          id="wilaya"
          value={wilaya}
          onChange={(e) => setWilaya(e.target.value)}
          disabled={isLoading}
          className={`${inputClass(!!fieldErrors.wilaya)} appearance-none`}
        >
          <option value="">— اختر ولايتك —</option>
          {WILAYAS.map((w) => (
            <option key={w.code} value={w.code}>
              {w.code} - {w.nameAr}
            </option>
          ))}
        </select>
        {fieldErrors.wilaya && <p className="text-red-500 text-xs mt-1">{fieldErrors.wilaya}</p>}
      </div>

      <div>
        <label htmlFor="commune" className="block text-sm font-semibold text-gray-700 mb-1">
          البلدية — Commune <span className="text-red-500">*</span>
        </label>
        <input
          id="commune"
          type="text"
          value={commune}
          onChange={(e) => setCommune(e.target.value)}
          placeholder="اكتب اسم بلديتك"
          disabled={isLoading}
          className={inputClass(!!fieldErrors.commune)}
        />
        {fieldErrors.commune && <p className="text-red-500 text-xs mt-1">{fieldErrors.commune}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { value: "home" as const, icon: "🏠", label: "التوصيل لباب المنزل", available: homeAvailable },
          { value: "office" as const, icon: "🏢", label: "التوصيل للمكتب", available: officeAvailable },
        ].map((opt) => (
          <label
            key={opt.value}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition text-center text-sm font-medium ${
              !opt.available
                ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60"
                : deliveryType === opt.value
                  ? "border-primary bg-green-50 text-primary cursor-pointer"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 cursor-pointer"
            } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <input
              type="radio"
              name="deliveryType"
              value={opt.value}
              checked={deliveryType === opt.value}
              onChange={() => setDeliveryType(opt.value)}
              disabled={isLoading || !opt.available}
              className="sr-only"
            />
            <span className="text-2xl">{opt.icon}</span>
            <span className="leading-tight">{opt.label}</span>
            {!opt.available && wilaya && (
              <span className="text-xs text-red-500 font-semibold">{NOT_AVAILABLE_LABEL}</span>
            )}
            {deliveryType === opt.value && opt.available && (
              <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                ✓
              </span>
            )}
          </label>
        ))}
      </div>
      {fieldErrors.deliveryType && (
        <p className="text-red-500 text-xs">{fieldErrors.deliveryType}</p>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>التوصيل:</span>
          <span className="font-semibold text-gray-800">
            {!wilaya
              ? "—"
              : deliveryUnavailable
                ? NOT_AVAILABLE_LABEL
                : `${deliveryPrice} DA`}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="font-bold text-gray-900">المجموع:</span>
          <span className="text-2xl font-extrabold text-gray-900">
            {!wilaya
              ? "—"
              : deliveryUnavailable
                ? NOT_AVAILABLE_LABEL
                : `${totalPrice} DA`}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 text-center">
          ❌ {error}
        </div>
      )}

      <button
        ref={submitButtonRef}
        type="submit"
        disabled={isLoading || deliveryUnavailable}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            جاري الإرسال...
          </>
        ) : (
          <>🛒 اطلب الآن</>
        )}
      </button>
    </form>
  );
}