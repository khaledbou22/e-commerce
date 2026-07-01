import Image from "next/image";
import { PRODUCT_IMAGES } from "@/lib/product-images";

export default function ProductImageStack() {
  return (
    <div className="w-full min-h-full bg-[#f8f8f8] p-4 md:p-6">
      <div className="flex flex-col w-full" style={{ gap: "12px" }}>
        {PRODUCT_IMAGES.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt={`صورة المنتج ${idx + 1}`}
            width={800}
            height={600}
            className="w-full h-auto object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 55vw"
            priority={idx < 2}
          />
        ))}
      </div>
    </div>
  );
}
