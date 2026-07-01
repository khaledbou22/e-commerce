const TRUST_BADGES = [
  { icon: "🚚", text: "التسليم السريع" },
  { icon: "✅", text: "منتجات أصلية" },
  { icon: "🔄", text: "تفقد المنتج" },
];

export default function TrustSection() {
  return (
    <section className="w-full bg-white border-t border-gray-100 py-10 md:py-12 px-4 md:px-8">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.text}
            className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <span className="text-4xl">{badge.icon}</span>
            <p className="font-bold text-gray-800 text-base md:text-lg">{badge.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
