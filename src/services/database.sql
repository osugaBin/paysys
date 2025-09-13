-- D1数据库表结构定义
-- 用于Cloudflare D1数据库的订单表

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    device_id TEXT NOT NULL,
    vip_type TEXT NOT NULL,
    product_name TEXT NOT NULL,
    price TEXT NOT NULL,
    duration TEXT NOT NULL,
    expiry_time INTEGER NOT NULL,
    payment_status TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    create_time TEXT NOT NULL,
    update_time TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_device_id ON orders(device_id);
CREATE INDEX IF NOT EXISTS idx_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_create_time ON orders(create_time);

-- 插入示例数据
INSERT OR IGNORE INTO orders (
    order_number, device_id, vip_type, product_name, 
    price, duration, expiry_time, payment_status, 
    payment_method, create_time, update_time
) VALUES (
    'ORD-2025-1001', 
    'DEMO_DEVICE_001', 
    'daily', 
    'VIP会员服务（1天）', 
    '￥3.3', 
    '1天', 
    1736640000000, 
    'success', 
    'qrcode', 
    '2025-01-12T00:00:00.000Z', 
    '2025-01-12T00:00:00.000Z'
);