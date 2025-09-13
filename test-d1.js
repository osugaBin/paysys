// D1数据库测试脚本
// 使用方法: wrangler d1 execute paysys-orders --command="SELECT * FROM orders LIMIT 5;"

// 测试数据库连接
async function testD1Connection() {
    try {
        // 1. 测试表是否存在
        console.log("🔍 检查数据库表...");
        const tables = await DB.prepare("SELECT name FROM sqlite_master WHERE type='table';").all();
        console.log("📊 数据库表:", tables);

        // 2. 插入测试订单
        console.log("📝 插入测试订单...");
        const testOrder = {
            order_number: "ORD-2025-TEST",
            device_id: "test_device_123",
            vip_type: "daily",
            product_name: "VIP会员服务（1天）",
            price: "￥3.3",
            duration: "1天",
            expiry_time: Date.now() + 24 * 60 * 60 * 1000,
            payment_status: "success",
            payment_method: "test",
            create_time: new Date().toISOString(),
            update_time: new Date().toISOString()
        };

        const insertResult = await DB.prepare(`
            INSERT INTO orders (
                order_number, device_id, vip_type, product_name, price, 
                duration, expiry_time, payment_status, payment_method, 
                create_time, update_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            testOrder.order_number,
            testOrder.device_id,
            testOrder.vip_type,
            testOrder.product_name,
            testOrder.price,
            testOrder.duration,
            testOrder.expiry_time,
            testOrder.payment_status,
            testOrder.payment_method,
            testOrder.create_time,
            testOrder.update_time
        ).run();

        console.log("✅ 测试订单插入成功:", insertResult);

        // 3. 查询测试数据
        console.log("🔍 查询测试数据...");
        const orders = await DB.prepare("SELECT * FROM orders WHERE order_number = ?")
            .bind("ORD-2025-TEST").all();
        console.log("📋 查询结果:", orders);

        return { success: true, message: "D1数据库连接测试成功!" };
    } catch (error) {
        console.error("❌ D1数据库测试失败:", error);
        return { success: false, error: error.message };
    }
}

// 导出测试函数
export { testD1Connection };