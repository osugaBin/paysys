// D1数据库订单处理器 - Cloudflare Workers 环境
// 这是一个模拟的D1数据库API处理器

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 处理订单相关的API请求
    if (url.pathname === '/api/orders' && request.method === 'POST') {
      try {
        const orderData = await request.json();
        
        // 验证订单数据
        if (!orderData.orderNumber || !orderData.deviceId) {
          return new Response(JSON.stringify({
            success: false,
            error: '订单数据不完整'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // 保存到D1数据库
        const result = await env.DB.prepare(`
          INSERT INTO orders (
            order_number, device_id, vip_type, product_name, 
            price, duration, expiry_time, payment_status, 
            payment_method, create_time, update_time
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          orderData.orderNumber,
          orderData.deviceId,
          orderData.vipType,
          orderData.productName,
          orderData.price,
          orderData.duration,
          orderData.expiryTime,
          orderData.paymentStatus,
          orderData.paymentMethod,
          orderData.createTime,
          orderData.updateTime
        ).run();
        
        if (result.success) {
          return new Response(JSON.stringify({
            success: true,
            orderId: result.meta.last_row_id,
            message: '订单保存成功'
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          throw new Error('数据库写入失败');
        }
        
      } catch (error) {
        console.error('保存订单错误:', error);
        return new Response(JSON.stringify({
          success: false,
          error: error.message
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // 获取订单列表
    if (url.pathname === '/api/orders' && request.method === 'GET') {
      try {
        const { results } = await env.DB.prepare(`
          SELECT * FROM orders ORDER BY create_time DESC LIMIT 100
        `).all();
        
        return new Response(JSON.stringify({
          success: true,
          orders: results
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      } catch (error) {
        console.error('获取订单错误:', error);
        return new Response(JSON.stringify({
          success: false,
          error: error.message
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    return new Response('Not Found', { status: 404 });
  }
};