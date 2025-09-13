# VIP 扫码支付系统

一个基于 HTML/CSS/JavaScript 的 VIP 会员服务扫码支付系统，支持设备绑定、时长管理和多种支付方式。

## 🚀 项目概述

这是一个完整的 VIP 会员付费系统，包含支付页面、调试工具和服务页面。用户可以通过扫描二维码购买 VIP 会员服务，系统会验证设备绑定并管理会员时长。

## 📁 项目结构

```
paysysA/
├── pay.html          # 主支付页面
├── pay-debug.html    # 调试版支付页面
├── service.html      # VIP服务页面
└── README.md        # 项目说明文档
```

## ✨ 主要功能

### 支付系统功能

- **多套餐选择**: 支持日卡（￥ 3.33/天）和月卡（￥ 29.9/30 天）
- **双支付方式**: 支持支付宝和微信支付二维码
- **订单管理**: 自动生成订单编号和订单详情
- **支付倒计时**: 15 分钟支付时限，超时自动失效
- **支付状态**: 实时显示支付进度（等待中/成功/失败）

### 设备绑定系统

- **设备指纹**: 基于浏览器和设备特征生成唯一标识
- **单设备绑定**: VIP 服务只能在购买设备上使用
- **防盗用机制**: 自动检测和阻止跨设备使用

### VIP 管理系统

- **时长管理**: 精确到小时的 VIP 时长计算
- **自动过期**: 到期自动失效，需重新购买
- **状态持久化**: 使用 localStorage 保存 VIP 状态

### 调试功能（pay-debug.html）

- **调试面板**: 实时显示设备 ID、VIP 状态、剩余时间
- **快速操作**: 一键激活 VIP、清除状态、增加时长
- **状态监控**: 5 秒间隔自动更新调试信息
- **面板切换**: 支持隐藏/显示调试面板

## 🖥️ 页面说明

### pay.html - 主支付页面

- 简洁的用户界面，专注于支付流程
- 支持 VIP 套餐选择和支付方式切换
- 模拟支付功能，便于测试
- 支付成功后自动跳转到服务页面

### pay-debug.html - 调试版支付页面

- 包含完整的调试工具面板
- 增强的 UI 设计和动画效果
- 开发者友好的调试功能
- 实时状态监控和快速操作

### service.html - VIP 服务页面

- 验证 VIP 访问权限
- 3 秒加载动画过渡
- 嵌入目标服务页面
- 安全保护措施（禁用开发者工具、右键菜单）

## 🔧 技术特点

### 前端技术

- **纯 HTML/CSS/JavaScript**: 无需后端，可直接部署
- **响应式设计**: 支持 PC 和移动端设备
- **现代 CSS**: 使用 Flexbox、Grid、渐变和动画
- **FontAwesome 图标**: 丰富的图标支持

### 安全机制

- **设备指纹**: 基于 Canvas 指纹和设备特征
- **本地存储加密**: Base64 编码保护敏感信息
- **防调试**: 禁用 F12、右键菜单等开发者工具
- **防嵌套**: 防止页面被恶意嵌入

### 用户体验

- **流畅动画**: CSS3 动画和过渡效果
- **状态反馈**: 实时的支付状态和进度提示
- **错误处理**: 完善的异常情况处理
- **加载动画**: 优雅的页面加载过渡

## 🚀 快速开始

### 环境要求

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 支持 localStorage 的浏览器
- 支持 HTML5 Canvas 的浏览器
- Python 3.x 或 Node.js（用于启动本地服务器）

### 部署步骤

1. **下载项目文件**

   ```bash
   git clone <repository-url>
   cd paysysA
   ```

2. **准备支付二维码图片**

   - 准备支付宝二维码图片，命名为 `Ali$.jpg`
   - 准备微信支付二维码图片，命名为 `Wx$.jpg`
   - 将图片放在项目根目录

3. **启动本地服务器**

   ```bash
   # 使用Python3启动HTTP服务器（推荐）
   python3 -m http.server 8000

   # 或使用Python2
   python -m SimpleHTTPServer 8000

   # 或使用Node.js
   npx http-server -p 8000

   # 或使用PHP
   php -S localhost:8000
   ```

4. **访问应用**
   - 🏠 主支付页面: `http://localhost:8000/pay.html`
   - 🔧 调试版页面: `http://localhost:8000/pay-debug.html`
   - 🎯 服务页面: `http://localhost:8000/service.html`

### 🎮 快速测试

1. **测试支付流程**
   - 访问 `http://localhost:8000/pay-debug.html`
   - 选择VIP套餐类型（日卡或月卡）
   - 点击"模拟支付成功"按钮
   - 系统会自动跳转到服务页面

2. **使用调试功能**
   - 在调试版页面右上角有调试面板
   - 可以查看设备ID、VIP状态、剩余时间
   - 支持一键激活VIP、清除状态、增加时长等操作

3. **验证设备绑定**
   - 在不同浏览器或设备上测试
   - 验证VIP服务的设备绑定机制

## 📱 使用流程

### 用户购买流程

1. 打开支付页面，选择 VIP 套餐类型
2. 查看订单信息和支付金额
3. 使用支付宝或微信扫描对应二维码
4. 完成支付后等待页面自动跳转
5. 进入 VIP 服务页面开始使用

### 开发调试流程

1. 打开调试版支付页面（pay-debug.html）
2. 查看右上角调试面板的实时信息
3. 使用调试按钮快速测试各种状态
4. 验证 VIP 功能和设备绑定机制

## ⚙️ 配置说明

### VIP 套餐配置

在 JavaScript 中可以修改 VIP 套餐配置：

```javascript
const vipTypes = {
  daily: {
    name: "VIP会员服务（1天）",
    price: "￥3.33",
    duration: "1天",
    expiryHours: 24,
  },
  monthly: {
    name: "VIP会员服务（30天）",
    price: "￥29.9",
    duration: "30天",
    expiryHours: 24 * 30,
  },
};
```

### 目标服务 URL 配置

在 service.html 中修改目标服务地址：

```javascript
// Base64编码的目标URL
const targetUrl = atob("aHR0cHM6Ly9yaWRpbmcucHp5dC50b3A=");
```

## 🔒 安全注意事项

1. **生产环境部署**

   - 使用 HTTPS 协议确保数据传输安全
   - 定期更新安全策略和防护机制
   - 监控异常访问和潜在攻击

2. **支付安全**

   - 实际部署时需接入真实的支付 API
   - 验证支付回调的真实性和完整性
   - 实施服务端验证避免前端绕过

3. **数据保护**
   - 敏感信息应使用更强的加密方式
   - 定期清理过期的本地存储数据
   - 实施访问日志和行为监控

## 🛠️ 自定义开发

### 添加新的支付方式

1. 在 HTML 中添加新的二维码显示区域
2. 在 CSS 中添加对应的样式
3. 在 JavaScript 中扩展支付逻辑

### 修改 VIP 套餐

1. 更新`vipTypes`配置对象
2. 修改 HTML 中的套餐选择界面
3. 调整相关的价格和时长显示

### 集成后端 API

1. 替换模拟支付函数为真实 API 调用
2. 实施服务端 VIP 状态验证
3. 添加支付回调处理机制

## 🔧 故障排除

### 常见问题

1. **页面无法加载**
   - 确保HTTP服务器正在运行
   - 检查端口8000是否被占用
   - 尝试使用其他端口：`python3 -m http.server 8080`

2. **二维码图片不显示**
   - 确认 `Ali$.jpg` 和 `Wx$.jpg` 文件存在于项目根目录
   - 检查图片文件名是否正确（区分大小写）
   - 验证图片格式是否为JPG

3. **VIP状态异常**
   - 打开浏览器开发者工具（F12）
   - 在Console中执行：`localStorage.clear()`
   - 刷新页面重新测试

4. **跨域问题**
   - 必须通过HTTP服务器访问，不能直接打开HTML文件
   - 确保使用 `http://localhost:8000` 而不是 `file://` 协议

### 调试技巧

1. **查看本地存储数据**
   ```javascript
   // 在浏览器控制台中执行
   console.log('VIP设备ID:', localStorage.getItem('vip_device_id'));
   console.log('VIP过期时间:', localStorage.getItem('vip_expiry'));
   console.log('VIP状态:', localStorage.getItem('vip_active'));
   ```

2. **手动设置VIP状态**
   ```javascript
   // 激活24小时VIP
   const deviceId = 'your_device_id';
   const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
   localStorage.setItem('vip_device_id', deviceId);
   localStorage.setItem('vip_expiry', expiryTime);
   localStorage.setItem('vip_active', 'true');
   ```

## 📞 技术支持

如果在使用过程中遇到问题，可以：

1. 查看浏览器控制台的错误信息
2. 使用调试版页面（pay-debug.html）进行问题排查
3. 检查 localStorage 中的数据状态
4. 验证网络连接和资源加载
5. 确认HTTP服务器正常运行

## 🚀 项目状态

- ✅ **已启动**: HTTP服务器运行在 `http://localhost:8000`
- ✅ **可访问**: 所有页面功能正常
- ✅ **已测试**: 支付流程和VIP管理功能
- ✅ **调试就绪**: 调试工具可用

## 📄 许可证

本项目仅供学习和研究使用，商业使用请确保遵守相关法律法规。

---

**注意**: 这是一个演示项目，实际生产环境中需要实现真实的支付接口和服务端验证机制。

## 📋 更新日志

### v2.0 (当前版本)
- ✨ 增强的调试功能和面板
- 🎨 改进的UI设计和动画效果
- 🔧 更完善的设备绑定机制
- 📱 优化的移动端适配

### v1.0
- 🎯 基础支付功能
- 💳 VIP套餐管理
- 🔒 设备绑定系统
- 📄 服务页面集成
