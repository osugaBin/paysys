# 🚀 Cloudflare Pages + D1 完整设置指南

## 📋 设置清单

### ✅ 第一步：Cloudflare Pages部署
- [ ] 登录 https://dash.cloudflare.com/
- [ ] Pages → Create a project → Connect to Git
- [ ] 选择 osugaBin/paysys 仓库
- [ ] 配置项目设置（项目名：paysys，分支：main）
- [ ] 等待首次部署完成

### ✅ 第二步：安装和配置Wrangler CLI
```bash
# 1. 安装Wrangler CLI
npm install -g wrangler

# 2. 登录Cloudflare
wrangler auth login

# 3. 验证登录
wrangler whoami
```

### ✅ 第三步：创建D1数据库
```bash
# 1. 创建数据库
wrangler d1 create paysys-orders

# 2. 记录数据库ID（重要！）
# 输出示例：
# ✅ Successfully created DB 'paysys-orders' in region APAC
# Created your database using D1's new storage backend.
# 
# [[d1_databases]]
# binding = "DB"
# database_name = "paysys-orders"  
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# 3. 初始化数据库表
wrangler d1 execute paysys-orders --file=./src/services/database.sql

# 4. 验证表创建
wrangler d1 execute paysys-orders --command="SELECT name FROM sqlite_master WHERE type='table';"
```

### ✅ 第四步：配置wrangler.toml
1. 编辑 `wrangler.toml` 文件
2. 将 `YOUR_DATABASE_ID_HERE` 替换为实际的数据库ID
3. 保存文件

### ✅ 第五步：部署Workers API
```bash
# 部署API处理器
wrangler deploy

# 记录Workers URL（重要！）
# 输出示例：
# ✅ Successfully published your Worker to the following routes:
#   - https://paysys-api.你的子域名.workers.dev
```

### ✅ 第六步：配置Pages绑定
1. 进入Cloudflare Dashboard
2. Pages → paysys项目 → Settings → Functions
3. 点击 Bindings 标签页
4. 添加绑定：
   ```
   Variable name: DB
   Type: D1 database  
   D1 database: paysys-orders
   ```
5. 点击 Save

### ✅ 第七步：添加环境变量
在Pages项目中添加环境变量：
```
NODE_ENV = production
API_ENDPOINT = https://paysys-api.你的子域名.workers.dev
```

### ✅ 第八步：测试数据库连接
```bash
# 测试数据库连接
wrangler d1 execute paysys-orders --command="SELECT COUNT(*) as count FROM orders;"

# 插入测试数据
wrangler d1 execute paysys-orders --command="
INSERT INTO orders (order_number, device_id, vip_type, product_name, price, duration, expiry_time, payment_status, payment_method, create_time, update_time) 
VALUES ('ORD-2025-TEST', 'test_device', 'daily', 'VIP会员服务（1天）', '￥3.3', '1天', 1735689600000, 'success', 'test', '2025-01-01T00:00:00Z', '2025-01-01T00:00:00Z');
"

# 查询测试数据
wrangler d1 execute paysys-orders --command="SELECT * FROM orders WHERE order_number = 'ORD-2025-TEST';"
```

## 🔧 重要配置文件

### wrangler.toml 配置
```toml
name = "paysys-api"
main = "src/handlers/orders.js"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "paysys-orders"
database_id = "你的数据库ID"  # 必须替换！

[env.production]
vars = { ENVIRONMENT = "production" }
```

### Pages绑定配置
```
D1数据库绑定:
- Variable name: DB
- Type: D1 database
- D1 database: paysys-orders

环境变量:
- NODE_ENV: production
- API_ENDPOINT: https://paysys-api.你的子域名.workers.dev
```

## 🚨 常见问题解决

### Q1: wrangler命令找不到
```bash
# 解决方案：重新安装
npm uninstall -g wrangler
npm install -g wrangler@latest
```

### Q2: 数据库ID在哪里找？
```bash
# 查看所有D1数据库
wrangler d1 list

# 查看特定数据库信息
wrangler d1 info paysys-orders
```

### Q3: Workers部署失败
```bash
# 检查配置
wrangler whoami
wrangler d1 list

# 重新部署
wrangler deploy --force
```

### Q4: Pages绑定不生效
1. 确保D1数据库已创建
2. 检查绑定配置中的数据库名称
3. 重新部署Pages项目

## 📊 验证部署成功

### 1. 访问Pages网站
```
https://paysys.pages.dev/pay.html
```

### 2. 测试API端点
```bash
curl -X GET https://paysys-api.你的子域名.workers.dev/api/orders
```

### 3. 测试完整功能
1. 访问支付页面
2. 选择VIP套餐
3. 点击"支付成功，进入服务"
4. 检查是否正确跳转到服务页面
5. 验证订单是否保存到D1数据库

## 🎯 部署完成标志

当以下所有项目都完成时，部署就成功了：

- ✅ Pages网站可以正常访问
- ✅ D1数据库表已创建
- ✅ Workers API部署成功
- ✅ Pages与D1绑定配置正确
- ✅ 支付流程完整可用
- ✅ 订单数据正确保存到数据库
- ✅ VIP验证和跳转功能正常

## 📞 需要帮助？

如果遇到问题，请提供：
1. 具体的错误信息
2. 执行的命令
3. wrangler.toml配置内容
4. Cloudflare Dashboard截图

技术支持：66617886@qq.com