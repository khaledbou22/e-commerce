// أسعار التوصيل حسب الولاية ونوع التسليم (دج)

export type DeliveryType = "home" | "office";

export const NOT_AVAILABLE_LABEL = "غير متوفر";

export const DELIVERY_PRICES: Record<string, { home: number; office: number }> = {
  "01": { home: 1400, office: 970 },
  "02": { home: 800, office: 520 },
  "03": { home: 950, office: 620 },
  "04": { home: 750, office: 520 },
  "05": { home: 800, office: 620 },
  "06": { home: 750, office: 520 },
  "07": { home: 950, office: 620 },
  "08": { home: 1100, office: 720 },
  "09": { home: 750, office: 520 },
  "10": { home: 750, office: 520 },
  "11": { home: 1600, office: 1120 },
  "12": { home: 850, office: 520 },
  "13": { home: 900, office: 570 },
  "14": { home: 800, office: 520 },
  "15": { home: 750, office: 520 },
  "16": { home: 600, office: 470 },
  "17": { home: 950, office: 620 },
  "18": { home: 750, office: 520 },
  "19": { home: 500, office: 370 },
  "20": { home: 800, office: 570 },
  "21": { home: 750, office: 520 },
  "22": { home: 800, office: 520 },
  "23": { home: 800, office: 520 },
  "24": { home: 750, office: 520 },
  "25": { home: 750, office: 520 },
  "26": { home: 800, office: 520 },
  "27": { home: 800, office: 520 },
  "28": { home: 850, office: 570 },
  "29": { home: 800, office: 520 },
  "30": { home: 950, office: 670 },
  "31": { home: 750, office: 520 },
  "32": { home: 1100, office: 670 },
  "33": { home: 0, office: 0 },
  "34": { home: 600, office: 520 },
  "35": { home: 750, office: 520 },
  "36": { home: 800, office: 520 },
  "37": { home: 0, office: 0 },
  "38": { home: 800, office: 520 },
  "39": { home: 950, office: 670 },
  "40": { home: 800, office: 520 },
  "41": { home: 750, office: 520 },
  "42": { home: 750, office: 520 },
  "43": { home: 700, office: 520 },
  "44": { home: 750, office: 520 },
  "45": { home: 1100, office: 670 },
  "46": { home: 800, office: 520 },
  "47": { home: 950, office: 620 },
  "48": { home: 800, office: 520 },
  "49": { home: 1400, office: 970 },
  "50": { home: 0, office: 0 },
  "51": { home: 900, office: 520 },
  "52": { home: 1000, office: 970 },
  "53": { home: 1600, office: 0 },
  "54": { home: 1600, office: 0 },
  "55": { home: 950, office: 670 },
  "56": { home: 0, office: 0 },
  "57": { home: 950, office: 520 },
  "58": { home: 1000, office: 0 },
};

/** هل نوع التوصيل متاح للولاية المختارة؟ */
export function isDeliveryAvailable(
  wilayaCode: string,
  deliveryType: DeliveryType
): boolean {
  if (!wilayaCode) return false;
  const prices = DELIVERY_PRICES[wilayaCode];
  if (!prices) return false;
  return prices[deliveryType] > 0;
}

/**
 * حساب سعر التوصيل — يُرجع null إذا لم تُختر ولاية أو التوصيل غير متوفر
 */
export function getDeliveryPrice(
  wilayaCode: string,
  deliveryType: DeliveryType
): number | null {
  if (!wilayaCode) return null;
  const prices = DELIVERY_PRICES[wilayaCode];
  if (!prices) return null;
  const price = prices[deliveryType];
  return price > 0 ? price : null;
}

/** حساب السعر الإجمالي */
export function getTotalPrice(
  bundlePrice: number,
  wilayaCode: string,
  deliveryType: DeliveryType
): number | null {
  const delivery = getDeliveryPrice(wilayaCode, deliveryType);
  if (delivery === null) return null;
  return bundlePrice + delivery;
}
