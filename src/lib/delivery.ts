// منطق حساب أسعار التوصيل — شمال / جنوب

// الولايات الشمالية: 500 دج منزل / 400 دج مكتب
const NORTHERN_WILAYAS = [
  "01", "02", "05", "06", "07", "09", "10", "12", "13", "14", "15",
  "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26",
  "27", "28", "29", "31", "34", "35", "36", "38", "40", "41", "42",
  "43", "44", "46", "48",
];

export type DeliveryType = "home" | "office";

export function getDeliveryPrice(
  wilayaCode: string,
  deliveryType: DeliveryType
): number | null {
  if (!wilayaCode) return null;

  const isNorthern = NORTHERN_WILAYAS.includes(wilayaCode);
  let price: number;

  if (isNorthern) {
    price = deliveryType === "home" ? 500 : 400;
  } else {
    price = deliveryType === "home" ? 800 : 650;
  }

  return price;
}

export function getTotalPrice(
  bundlePrice: number,
  wilayaCode: string,
  deliveryType: DeliveryType
): number | null {
  const delivery = getDeliveryPrice(wilayaCode, deliveryType);
  if (delivery === null) return null;
  return bundlePrice + delivery;
}
