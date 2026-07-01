// باقات الأقدام المضادة للاهتزاز
export interface Bundle {
  id: string;
  quantity: number;
  price: number;
  labelAr: string;
  iconCount: number; // عدد أيقونات المجموعة
}

const BASE_BUNDLE_PRICE = 890;
const BASE_BUNDLE_QTY = 4;

export const BUNDLES: Bundle[] = [
  { id: "b4", quantity: 4, price: 890, labelAr: "اشترِ 4 قطع", iconCount: 1 },
  { id: "b8", quantity: 8, price: 1690, labelAr: "اشترِ 8 قطع", iconCount: 2 },
  { id: "b12", quantity: 12, price: 2490, labelAr: "اشترِ 12 قطعة", iconCount: 3 },
  { id: "b16", quantity: 16, price: 3190, labelAr: "اشترِ 16 قطعة", iconCount: 4 },
];

/** حساب نسبة التوفير مقارنة بشراء وحدات بسعر باقة 4 قطع */
export function calcSavingsPercent(quantity: number, price: number): number {
  const fullPrice = (quantity / BASE_BUNDLE_QTY) * BASE_BUNDLE_PRICE;
  if (fullPrice <= price) return 0;
  return Math.round(((fullPrice - price) / fullPrice) * 100);
}

export function getBundleById(id: string): Bundle {
  return BUNDLES.find((b) => b.id === id) ?? BUNDLES[0];
}
