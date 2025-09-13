# 🚀 部署指南 - GitHub Pages & Cloudflare Pages

本指南将详细说明如何将PDF多页在线盖章工具支付系统部署到GitHub Pages和Cloudflare Pages。

## 📋 目录
- [GitHub Pages 部署](#github-pages-部署)
- [Cloudflare Pages 部署](#cloudflare-pages-部署)
- [Cloudflare D1 数据库配置](#cloudflare-d1-数据库配置)
- [域名配置](#域名配置)
- [SSL证书配置](#ssl证书配置)
- [性能优化](#性能优化)

---

## 🌐 GitHub Pages 部署

### 步骤1: 启用GitHub Pages

1. **访问仓库设置**
   - 打开 https://github.com/osugaBin/paysys
   - 点击 `Settings` 选项卡

2. **配置Pages设置**
   - 在左侧菜单找到 `Pages`
   - Source: 选择 `Deploy from a branch`
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
   - 点击 `Save`

3. **等待部署完成**
   - GitHub会自动构建和部署
   - 通常需要1-5分钟
   - 部署完成后会显示访问链接

### 步骤2: 访问应用

部署完成后，您可以通过以下链接访问：

```
https://osugaBin.github.io/paysys/
```

**页面访问地址：**
- 🏠 主支付页面: https://osugaBin.github.io/paysys/pay.html
- 🔧 调试页面: https://osugaBin.github.io/paysys/pay-debug.html
- 📊 数据库管理: https://osugaBin.github.io/paysys/database-admin.html
- 🧪 测试工具: https://osugaBin.github.io/paysys/init-test-data.html
- 🎯 服务页面: https://osugaBin.github.io/paysys/service.html

### 步骤3: 验证功能

1. **基础功能测试**
   ```bash
   # 访问主页面
   curl -I https://osugaBin.github.io/paysys/pay.html
   
   # 检查资源加载
   curl -I https://osugaBin.github.io/paysys/Ali$.jpg
   ```

2. **功能验证清单**
   - ✅ 页面正常加载
   - ✅ CSS样式正确显示
   - ✅ JavaScript功能正常
   - ✅ 图片资源加载成功
   - ✅ 本地存储功能正常

### GitHub Pages 限制

⚠️ **注意事项：**
- 只支持静态文件托管
- 不支持服务端代码执行
- D1数据库功能需要Cloudflare环境
- 系统会自动降级到localStorage存储

---

## ☁️ Cloudflare Pages 部署

### 步骤1: 连接GitHub仓库

1. **登录Cloudflare Dashboard**
   - 访问 https://dash.cloudflare.com/
   - 登录您的Cloudflare账户

2. **创建Pages项目**
   - 点击 `Pages` → `Create a project`
   - 选择 `Connect to Git`
   - 授权GitHub访问权限
   - 选择 `osugaBin/paysys` 仓库

3. **配置构建设置**
   ```yaml
   Project name: paysys
   Production branch: main
   Build command: (留空)
   Build output directory: /
   Root directory: /
   ```

4. **环境变量配置**
   ```bash
   # 可选：添加环境变量
   NODE_ENV=production
   ```

### 步骤2: 部署完成

- Cloudflare会自动构建和部署
- 部署完成后获得访问链接：`https://paysys.pages.dev`
- 每次推送到main分支都会自动重新部署

### 步骤3: 自定义域名（可选）

1. **添加自定义域名**
   - 在Pages项目中点击 `Custom domains`
   - 点击 `Set up a custom domain`
   - 输入您的域名（如：pay.yourdomain.com）

2. **DNS配置**
   ```dns
   # 添加CNAME记录
   pay.yourdomain.com CNAME paysys.pages.dev
   ```

---

## 🗄️ Cloudflare D1 数据库配置

### 步骤1: 创建D1数据库

1. **创建数据库**
   ```bash
   # 使用Wrangler CLI
   npx wrangler d1 create paysys-db
   ```

2. **获取数据库信息**
   ```bash
   # 记录数据库ID和名称
   Database ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   Database Name: paysys-db
   ```

### 步骤2: 初始化数据库表

1. **执行SQL脚本**
   ```bash
   # 上传数据库结构
   npx wrangler d1 execute paysys-db --file=./src/services/database.sql
   ```

2. **验证表创建**
   ```bash
   # 查看表结构
   npx wrangler d1 execute paysys-db --command="SELECT name FROM sqlite_master WHERE type='table';"
   ```

### 步骤3: 创建Workers函数

1. **创建wrangler.toml配置**
   ```toml
   name = "paysys-api"
   main = "src/handlers/orders.js"
   compatibility_date = "2024-01-01"

   [[d1_databases]]
   binding = "DB"
   database_name = "paysys-db"
   database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
   ```

2. **部署Workers**
   ```bash
   # 部署API处理器
   npx wrangler deploy
   ```

### 步骤4: 配置Pages绑定

1. **在Pages项目中添加绑定**
   - 进入Pages项目设置
   - 点击 `Functions` → `Bindings`
   - 添加D1数据库绑定：
     ```
     Variable name: DB
     D1 database: paysys-db
     ```

2. **更新环境变量**
   ```bash
   # 添加API端点
   API_ENDPOINT=https://paysys-api.your-subdomain.workers.dev
   ```

---

## 🔧 完整部署脚本

### GitHub Pages 一键部署

```bash
#!/bin/bash
# github-pages-deploy.sh

echo "🚀 开始部署到GitHub Pages..."

# 检查Git状态
git status

# 添加所有文件
git add .

# 提交更改
git commit -m "🚀 部署到GitHub Pages - $(date)"

# 推送到GitHub
git push origin main

echo "✅ GitHub Pages部署完成！"
echo "🌐 访问地址: https://osugaBin.github.io/paysys/"
```

### Cloudflare Pages + D1 完整部署

```bash
#!/bin/bash
# cloudflare-deploy.sh

echo "☁️ 开始部署到Cloudflare Pages + D1..."

# 1. 安装Wrangler CLI
npm install -g wrangler

# 2. 登录Cloudflare
wrangler auth login

# 3. 创建D1数据库
echo "📊 创建D1数据库..."
wrangler d1 create paysys-db

# 4. 初始化数据库表
echo "🗄️ 初始化数据库表..."
wrangler d1 execute paysys-db --file=./src/services/database.sql

# 5. 部署Workers API
echo "⚡ 部署Workers API..."
wrangler deploy

# 6. 推送到GitHub（触发Pages部署）
echo "📤 推送到GitHub..."
git add .
git commit -m "☁️ Cloudflare Pages + D1 部署 - $(date)"
git push origin main

echo "✅ Cloudflare部署完成！"
echo "🌐 Pages地址: https://paysys.pages.dev"
echo "⚡ API地址: https://paysys-api.your-subdomain.workers.dev"
```

---

## 📊 部署后验证

### 功能测试清单

#### GitHub Pages 测试
```bash
# 1. 页面访问测试
curl -I https://osugaBin.github.io/paysys/pay.html

# 2. 资源加载测试
curl -I https://osugaBin.github.io/paysys/Ali$.jpg
curl -I https://osugaBin.github.io/paysys/Wx$.jpg

# 3. JavaScript功能测试
# 在浏览器中测试：
# - 订单编号生成
# - VIP套餐选择
# - 本地存储功能
```

#### Cloudflare Pages + D1 测试
```bash
# 1. Pages访问测试
curl -I https://paysys.pages.dev/pay.html

# 2. D1数据库测试
curl -X POST https://paysys-api.your-subdomain.workers.dev/api/orders \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# 3. 完整功能测试
# 在浏览器中测试：
# - 订单创建和保存
# - 数据库管理面板
# - 调试功能
```

---

## 🔒 安全配置

### HTTPS配置

#### GitHub Pages
- 自动提供HTTPS支持
- 强制HTTPS重定向已启用

#### Cloudflare Pages
```bash
# 在Cloudflare Dashboard中配置
# SSL/TLS → Overview → Full (strict)
# SSL/TLS → Edge Certificates → Always Use HTTPS: On
```

### 安全头配置

创建 `_headers` 文件：
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;
```

---

## 🚀 性能优化

### 缓存配置

#### Cloudflare Pages缓存规则
```javascript
// _worker.js
export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    
    // 设置缓存头
    if (request.url.includes('.jpg') || request.url.includes('.png')) {
      response.headers.set('Cache-Control', 'public, max-age=31536000');
    }
    
    return response;
  }
};
```

### 资源优化

1. **图片压缩**
   ```bash
   # 压缩二维码图片
   npx imagemin Ali$.jpg Wx$.jpg --out-dir=optimized/
   ```

2. **代码压缩**
   ```bash
   # 压缩CSS和JS
   npx terser pay.html --compress --mangle -o pay.min.html
   ```

---

## 📈 监控和分析

### Cloudflare Analytics

1. **启用Web Analytics**
   - 在Cloudflare Dashboard中启用Analytics
   - 添加跟踪代码到HTML页面

2. **性能监控**
   ```javascript
   // 添加到页面头部
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
           data-cf-beacon='{"token": "your-token"}'></script>
   ```

### 自定义监控

```javascript
// 添加到页面中的监控代码
function trackEvent(event, data) {
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, data, timestamp: Date.now() })
  });
}

// 使用示例
trackEvent('payment_attempt', { vip_type: 'daily', amount: 3.3 });
```

---

## 🎯 部署完成检查清单

### GitHub Pages 部署
- [ ] ✅ 仓库Settings中启用Pages
- [ ] ✅ 选择main分支作为源
- [ ] ✅ 等待部署完成（1-5分钟）
- [ ] ✅ 访问 https://osugaBin.github.io/paysys/pay.html
- [ ] ✅ 测试所有页面功能
- [ ] ✅ 验证本地存储功能正常

### Cloudflare Pages 部署
- [ ] ✅ 连接GitHub仓库到Cloudflare Pages
- [ ] ✅ 配置构建设置
- [ ] ✅ 等待首次部署完成
- [ ] ✅ 访问 https://paysys.pages.dev/pay.html
- [ ] ✅ 配置自定义域名（可选）

### Cloudflare D1 数据库
- [ ] ✅ 创建D1数据库实例
- [ ] ✅ 执行数据库初始化脚本
- [ ] ✅ 部署Workers API处理器
- [ ] ✅ 配置Pages与D1的绑定
- [ ] ✅ 测试数据库读写功能
- [ ] ✅ 验证订单管理功能

### 安全和性能
- [ ] ✅ 启用HTTPS强制重定向
- [ ] ✅ 配置安全头
- [ ] ✅ 设置缓存策略
- [ ] ✅ 启用性能监控

---

## 🆘 常见问题解决

### GitHub Pages 问题

**Q: 页面显示404错误**
```bash
# 检查文件路径和大小写
# GitHub Pages区分大小写
# 确保文件名正确
```

**Q: CSS/JS不加载**
```html
<!-- 使用相对路径 -->
<link rel="stylesheet" href="./style.css">
<script src="./script.js"></script>
```

### Cloudflare Pages 问题

**Q: D1数据库连接失败**
```bash
# 检查绑定配置
wrangler pages deployment list
wrangler pages deployment tail

# 验证数据库ID
wrangler d1 list
```

**Q: Workers部署失败**
```bash
# 检查wrangler.toml配置
# 验证账户权限
wrangler auth whoami
```

---

## 📞 技术支持

如果在部署过程中遇到问题，请：

1. **查看部署日志**
   - GitHub Pages: 在Actions标签页查看部署日志
   - Cloudflare Pages: 在项目Dashboard查看构建日志

2. **联系技术支持**
   - 邮箱: 66617886@qq.com
   - GitHub Issues: https://github.com/osugaBin/paysys/issues

3. **参考文档**
   - GitHub Pages: https://docs.github.com/pages
   - Cloudflare Pages: https://developers.cloudflare.com/pages
   - Cloudflare D1: https://developers.cloudflare.com/d1

---

**部署完成后，您将拥有一个完全功能的在线支付系统！** 🎉