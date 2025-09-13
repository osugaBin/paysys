# Cloudflare Pages 部署修复指南

## 问题诊断
您遇到的 "This content is blocked. Contact the site owner to fix the issue." 错误通常由以下原因引起：

### 1. 内容安全策略 (CSP) 问题
- Cloudflare Pages 默认启用严格的安全策略
- 需要配置 `_headers` 文件来允许必要的资源加载

### 2. 跨域资源共享 (CORS) 问题
- 页面跳转和资源加载可能被阻止
- 需要正确配置域名和路径

## 解决方案

### 步骤1: 检查部署文件
确保以下文件已正确上传到 Cloudflare Pages：

```bash
# 检查项目根目录是否包含：
_headers          # 安全头配置
_redirects        # 重定向规则
pay.html          # 主页面
service.html      # 服务页面
Ali$.jpg          # 支付宝二维码
Wx$.jpg           # 微信二维码
```

### 步骤2: 验证 _headers 文件内容
确保 `_headers` 文件包含正确的安全策略：

```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/*.html
  Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' *.pages.dev *.workers.dev; frame-ancestors 'self'
```

### 步骤3: 检查 Cloudflare Pages 设置

1. **登录 Cloudflare Dashboard**
   - 进入 Pages 项目设置
   - 检查 "Build and deployments" 配置

2. **构建设置**
   ```
   Build command: (留空)
   Build output directory: /
   Root directory: /
   ```

3. **环境变量**
   - 确保没有设置冲突的环境变量
   - 检查 `NODE_ENV` 等变量

### 步骤4: 域名和DNS配置

1. **自定义域名**（如果使用）
   - 确保 DNS 记录正确指向 Cloudflare
   - 检查 SSL/TLS 设置为 "Full" 或 "Full (strict)"

2. **默认域名**
   - 使用 `your-project.pages.dev` 进行测试
   - 确保域名解析正常

### 步骤5: 调试步骤

1. **浏览器开发者工具**
   ```bash
   # 按 F12 打开开发者工具
   # 查看 Console 标签页的错误信息
   # 查看 Network 标签页的请求状态
   ```

2. **测试不同页面**
   ```
   https://your-project.pages.dev/pay.html
   https://your-project.pages.dev/service.html
   ```

3. **检查资源加载**
   - 确保图片文件 (Ali$.jpg, Wx$.jpg) 可以正常访问
   - 验证 CSS 和 JavaScript 是否正常加载

### 步骤6: 重新部署

如果问题仍然存在，尝试重新部署：

```bash
# 方法1: 通过 Git 推送触发重新部署
git add .
git commit -m "Fix Cloudflare Pages deployment issues"
git push origin main

# 方法2: 在 Cloudflare Dashboard 手动触发重新部署
# Pages > 项目名称 > Deployments > Retry deployment
```

## 常见错误排查

### 错误1: "This content is blocked"
**原因**: CSP 策略过于严格
**解决**: 检查并更新 `_headers` 文件

### 错误2: 页面跳转失败
**原因**: 相对路径问题
**解决**: 使用 `./page.html` 而不是 `page.html`

### 错误3: 图片无法显示
**原因**: 文件路径或权限问题
**解决**: 确保图片文件已上传且路径正确

### 错误4: JavaScript 功能异常
**原因**: CSP 阻止内联脚本
**解决**: 在 CSP 中添加 `'unsafe-inline'` 和 `'unsafe-eval'`

## 验证部署成功

部署成功后，您应该能够：

1. ✅ 正常访问支付页面
2. ✅ 选择VIP套餐类型
3. ✅ 查看订单信息和二维码
4. ✅ 点击按钮跳转到服务页面
5. ✅ 服务页面正常加载和显示

## 联系支持

如果问题仍然存在，请提供：
- Cloudflare Pages 项目 URL
- 浏览器控制台错误信息
- 具体的错误页面截图

这将帮助进一步诊断和解决问题。