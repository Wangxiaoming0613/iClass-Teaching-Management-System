# iClass 教学管理平台 - 高保真交互原型

本项目为 iClass 智慧课堂教学管理平台的高保真前端交互原型。
采用原生 HTML5 + Tailwind CSS (CDN) + Vanilla JS 构建，旨在快速验证产品交互逻辑与视觉效果。

## 核心特性

- **零依赖开发**：不依赖 Node.js、Webpack 等构建工具，开箱即用。
- **高保真交互**：包含完整的 CRUD 模拟、弹窗交互、Toast 提示、下拉筛选等。
- **响应式布局**：基于 Flexbox 和 Tailwind Grid 系统，适配不同屏幕尺寸。
- **组件化设计**：封装了通用的下拉筛选 (`setupFilterDropdown`)、模态框等逻辑。

## 目录结构

```text
iClass教学管理平台-demo/
├── index.html                  # 平台主框架（Shell：侧边栏、顶部导航、TagsView）
├── login.html                  # 登录页
├── css/
│   └── style.css               # 全局样式与自定义动画
├── js/
│   └── main.js                 # 全局逻辑（路由管理、菜单交互、全屏控制）
├── assets/                     # 静态资源（图片/图标）
└── pages/                      # 功能模块子页面
    ├── dashboard.html          # 仪表盘/首页
    ├── data-display.html       # 数据展示
    ├── organization-management.html # 组织架构管理
    ├── course-management.html  # 课程管理
    ├── schedule.html           # 排课管理
    ├── semester.html           # 学期管理
    ├── system.html             # 系统管理（用户管理、角色筛选）
    ├── user/                   # 用户中心
    │   ├── teacher.html        # 教师管理
    │   ├── teacher_profile.html# 教师个人资料
    │   ├── student.html        # 学生管理
    │   └── student_profile.html# 学生个人资料
    └── ai/                     # AI 智慧教学
        ├── course.html         # AI 课程配置
        ├── knowledge.html      # 知识库列表
        ├── knowledge-detail.html # 知识库详情（附件管理、解析状态筛选）
        └── knowledge-parsing.html # 知识库解析管理
```

## 功能模块详情

1.  **系统框架**
    *   **Shell 布局**：经典的左侧导航 + 顶部 Header + 内容区 iframe 布局。
    *   **Tags View**：支持多标签页切换，右键/点击关闭。
    *   **面包屑导航**：基于页面路径自动生成。
    *   **全屏模式**：一键切换全屏显示。
    *   **用户菜单**：点击头像展开/收起个人中心入口。

2.  **系统管理 (`system.html`)**
    *   用户列表展示与分页。
    *   **角色筛选**：支持按（教师/管理员/教务管理员/超级管理员）筛选用户。
    *   **用户操作**：新建用户、编辑用户、批量删除、重置密码（模拟）。

3.  **AI 知识库 (`pages/ai/`)**
    *   **知识库管理**：创建、编辑、删除知识库。
    *   **知识详情**：
        *   附件管理：支持文件上传（拖拽）、类型筛选（图片/视频/压缩包）。
        *   状态筛选：支持按“解析状态”（待解析/解析中/成功/失败）和“启用状态”双重筛选。
        *   列表交互：批量操作、全选逻辑。

4.  **用户管理 (`pages/user/`)**
    *   **教师/学生管理**：模拟真实的增删改查交互。
    *   **个人资料页**：统一的下拉筛选 UI，展示详细信息。

5.  **基础教学管理**
    *   **组织/课程/排课/学期**：包含完整的表格展示、搜索过滤、模态框编辑功能。
    *   **数据展示**：使用 ECharts（如有）或 CSS 绘制的统计图表（Dashboard）。

## 技术实现细节

*   **样式方案**：主要使用 Tailwind CSS Utility Classes，辅以 `style.css` 处理特殊动画（如 Modal 进出动画）和滚动条样式。
*   **图标库**：FontAwesome 6 (CDN)。
*   **数据模拟**：
    *   使用 JavaScript 动态生成 Mock Data（如 `generateMockData` 函数）。
    *   部分状态使用 `localStorage` 进行持久化模拟（如用户信息修改）。
*   **交互逻辑**：
    *   `setupFilterDropdown`：标准化的自定义下拉组件，支持回调、外部点击关闭。
    *   `iframe` 通信：主页面通过 `iframe` 加载子页面，实现单页应用 (SPA) 般的体验。

## 运行说明

1.  **推荐环境**：使用 VS Code 安装 **Live Server** 插件，右键 `index.html` -> "Open with Live Server"。
2.  **直接运行**：直接双击 `index.html` 或 `login.html` 亦可运行（部分跨域特性可能会受浏览器安全策略限制）。
