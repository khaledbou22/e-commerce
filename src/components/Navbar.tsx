import { BRAND_NAME } from "@/lib/brand";

const NAV_LINKS = ["ACCUEIL", "COLLECTIONS", "ABOUT US", "CONTACT"];

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 py-3 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3 md:gap-4">
        <a href="https://www.facebook.com/profile.php?id=61578809247065" className="text-gray-500 hover:text-primary transition text-lg" aria-label="Facebook">
          f
        </a>
        <a href="tel:06 67 89 69 07" className="text-gray-500 hover:text-primary transition text-lg" aria-label="Phone" dir="ltr">
          📞
        </a>
      </div>

      <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href="#" className="hover:text-primary transition tracking-wide">
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div className="font-extrabold text-xl md:text-2xl text-[#290765] tracking-tight">
        {BRAND_NAME}
      </div>
    </nav>
  );
}
