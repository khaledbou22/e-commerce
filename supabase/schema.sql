-- جدول الطلبات — الأقدام المضادة للاهتزاز
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  full_name TEXT NOT NULL,
  wilaya TEXT NOT NULL,
  commune TEXT NOT NULL,
  delivery_type TEXT NOT NULL CHECK (delivery_type IN ('home', 'office')),
  bundle_quantity INTEGER NOT NULL,
  bundle_price INTEGER NOT NULL,
  delivery_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "السماح بإدراج الطلبات"
  ON orders FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "منع القراءة العامة"
  ON orders FOR SELECT TO anon
  USING (false);
