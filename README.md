# f1y0.cc

一个使用 Vue 3 + Vite 构建的现代化个人网站。

## 功能特点

- 🌙 支持深色/浅色模式切换
- 🌤️ 实时天气显示（基于高德地图 API）
- 📝 支持 Markdown 的博客系统
- 🎨 使用 Tailwind CSS 构建的现代化 UI
- 📱 响应式设计，支持移动端

## 快速开始

1. 克隆项目
```bash
git clone https://github.com/yourusername/f1y0.cc.git
cd f1y0.cc
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
- 在项目根目录创建 `.env` 文件
- 添加高德地图 API Key（用于天气功能）：
```env
VITE_AMAP_KEY=你的高德Web服务API key
```

4. 启动开发服务器
```bash
npm run dev
```

5. 构建生产版本
```bash
npm run build
```

## 技术栈

- Vue 3 - 渐进式 JavaScript 框架
- Vite - 下一代前端构建工具
- Tailwind CSS - 实用优先的 CSS 框架
- Vue Router - Vue.js 官方路由
- Pinia - Vue.js 状态管理库
- Vue3-Toastify - 通知提示组件
- 高德开放平台 API - 天气服务

## 项目结构

```
f1y0.cc/
├── src/
│   ├── components/     # 可复用组件
│   ├── views/         # 页面组件
│   ├── router/        # 路由配置
│   ├── stores/        # Pinia 状态管理
│   ├── styles/        # 全局样式
│   └── App.vue        # 根组件
├── public/            # 静态资源
└── index.html         # 入口 HTML
```

## 功能配置

### 天气功能

天气功能使用高德地图 API 实现，需要：

1. 访问[高德开放平台](https://lbs.amap.com/)
2. 注册账号并创建应用
3. 获取 Web 服务 API Key
4. 在 `.env` 文件中配置 API Key

### 深色模式

- 自动跟随系统设置
- 支持手动切换
- 设置会被保存在本地

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

[MIT License](LICENSE)

## 作者

[Your Name](https://github.com/yourusername)
