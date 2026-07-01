import { BRAND_NAME } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="w-full bg-[#290765] text-white">
      <div className="w-full px-6 md:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div>
          <h4 className="font-bold text-lg mb-4">الجمهور</h4>
          <ul className="space-y-2 text-green-100 text-sm">
            <li><a href="https://www.facebook.com/profile.php?id=61578809247065" className="hover:text-white transition">فيسبوك</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">روابط مفيدة</h4>
          <ul className="space-y-2 text-green-100 text-sm">
            <li><a href="#" className="hover:text-white transition">من نحن</a></li>
            <li><a href="#" className="hover:text-white transition">شروط وضمان</a></li>
            <li><a href="#" className="hover:text-white transition">الشحن</a></li>
            <li><a href="#" className="hover:text-white transition">سياسة الخصوصية</a></li>
            <li><a href="#" className="hover:text-white transition">الشروط العامة</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
          <ul className="space-y-2 text-green-100 text-sm">
            <li dir="ltr">📞 06 67 89 69 07</li>
            <li>📍 سطيف</li>
          </ul>
        </div>

        <div className="flex flex-col items-start sm:items-end">
          <span className="font-extrabold text-3xl mb-2">{BRAND_NAME}</span>
          <p className="text-green-100 text-sm">الأقدام المضادة للاهتزاز</p>
        </div>
      </div>

      <div className="w-full border-t border-green-800 py-4 px-6 text-center text-green-200 text-xs md:text-sm">
        Copyright 2025 © {BRAND_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
