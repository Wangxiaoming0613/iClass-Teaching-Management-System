# iClass 教学管理平台 - 原型 Demo

本项目为 iClass 智慧课堂教学管理平台的快速原型验证项目。
采用原生 HTML + Tailwind CSS (CDN) + Vanilla JS 构建，不依赖复杂的构建工具，方便快速预览和修改。

## 目录结构

```
iClass教学管理平台-demo/
├── index.html           # 主页框架（包含侧边栏导航与 iframe 内容区）
├── login.html           # 登录页面
├── css/
│   └── style.css        # 自定义样式
├── js/
│   └── main.js          # 主页交互逻辑（侧边栏切换、面包屑更新）
├── assets/              # 静态资源
└── pages/               # 各个功能模块的子页面
    ├── dashboard.html   # 首页内容
    ├── data-display.html
    ├── organization.html
    ├── course.html
    ├── schedule.html
    ├── semester.html
    ├── user/
    │   ├── teacher.html
    │   └── student.html
    ├── ai/
    │   ├── course.html
    │   └── knowledge.html
    └── system.html
```

## 运行方式

由于使用了 Tailwind CSS 的 CDN 和 iframe，建议使用本地服务器运行以获得最佳体验（避免 file:// 协议的一些限制，虽然当前设计兼容 file:// 打开）。

1. 直接双击 `login.html` 或 `index.html` 打开。
2. 或者使用 VS Code 的 "Live Server" 插件打开项目根目录。

## 原型说明

- **布局**：采用左侧导航 + 顶部 Header + 内容区 iframe 的经典后台管理布局。
- **样式**：主要使用 Tailwind CSS Utility Classes。
- **交互**：
  - 点击左侧菜单切换右侧内容。
  - 支持二级菜单展开/折叠。
  - 侧边栏可折叠。
  - 简单的面包屑导航自动更新。
