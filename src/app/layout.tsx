import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "الأقدام المضادة للاهتزاز للغسالة — Amina",
  description:
    "أقدام مضادة للاهتزاز للغسالة. تقليل الضوضاء والاهتزاز. توصيل لجميع الولايات — الدفع عند الاستلام.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-cairo antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
