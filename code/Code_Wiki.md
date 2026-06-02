# 个人资源站 Code Wiki

## 项目概述

**项目名称**：个人资源站

**项目类型**：前端静态网站

**创建时间**：2026年

**项目描述**：一个用于整合和展示各类资源的个人网站，包含实用工具、学习文档、精品软件等分类。

---

## 项目架构

### 整体架构图

```
个人资源站/
├── 111/                    # 主项目目录
│   ├── index.html          # 首页
│   ├── index.css           # 全局样式
│   ├── index.js            # 交互逻辑
│   ├── comments.html       # 聊天工具页
│   ├── code.html           # 编程开发页
│   ├── tools.html          # 工具页
│   └── ...                 # 其他副本文件
├── code 2026/              # 历史版本代码归档
│   ├── 260309/
│   ├── 260313/
│   ├── 260314/
│   └── ...                 # 其他日期归档
├── font/                   # 字体资源
├── img/                    # 图片资源
└── pictures/               # 图片素材
```

### 技术栈

| 技术 | 版本/说明 | 用途 |
|------|-----------|------|
| HTML5 | - | 页面结构 |
| CSS3 | - | 页面样式 |
| JavaScript (ES6+) | - | 交互逻辑 |
| Font Awesome | 6.4.0 | 图标库 |

---

## 主要模块职责

### 1. 首页模块 ([index.html](file:///e:/web/code/111/index.html))

**文件路径**：[e:\web\code\111\index.html](file:///e:/web/code/111/index.html)

**职责**：
- 展示网站顶部导航栏
- 展示侧边栏导航菜单
- 展示横幅广告区域
- 展示各类资源卡片网格
- 提供搜索功能入口

**主要结构**：
```html
<header>         <!-- 顶部导航栏 -->
<aside>          <!-- 侧边栏 -->
<main>           <!-- 主内容区 -->
  <banner>       <!-- 横幅 -->
  <resource-grid> <!-- 资源卡片网格 -->
<footer>         <!-- 页脚 -->
```

### 2. 样式模块 ([index.css](file:///e:/web/code/111/index.css))

**文件路径**：[e:\web\code\111\index.css](file:///e:/web/code/111/index.css)

**职责**：
- 定义全局样式变量
- 实现响应式布局
- 提供卡片、按钮等组件样式
- 处理移动端适配

**核心样式变量**：
```css
:root {
  --apple-blue: #007aff;        /* 主色调 */
  --bg-light: #f5f5f7;          /* 背景色 */
  --card-bg: #ffffff;           /* 卡片背景 */
  --text-primary: #1d1d1f;      /* 主文本色 */
  --text-secondary: #86868b;    /* 次要文本色 */
}
```

### 3. 交互模块 ([index.js](file:///e:/web/code/111/index.js))

**文件路径**：[e:\web\code\111\index.js](file:///e:/web/code/111/index.js)

**职责**：
- 实现工具卡片的展开/收起功能
- 实现搜索功能
- 处理用户交互事件

---

## 关键类与函数说明

### CSS 关键类

| 类名 | 用途 | 位置 |
|------|------|------|
| `.header-inner` | 导航栏内部容器 | [index.css](file:///e:/web/code/111/index.css#L41-L48) |
| `.sidebar-item` | 侧边栏菜单项 | [index.css](file:///e:/web/code/111/index.css#L100-L108) |
| `.res-card` | 资源卡片 | [index.css](file:///e:/web/code/111/index.css#L170-L179) |
| `.tools-grid` | 工具卡片网格 | [index.css](file:///e:/web/code/111/index.css#L302-L312) |

### JavaScript 关键函数

#### 1. DOMContentLoaded 事件监听器

**位置**：[index.js](file:///e:/web/code/111/index.js#L2-L46)

**功能**：页面加载完成后初始化所有交互功能

#### 2. 工具卡片展开/收起功能

**位置**：[index.js](file:///e:/web/code/111/index.js#L4-L18)

```javascript
toggleBtn.addEventListener('click', function () {
  toolsGrid.classList.toggle('show-all');
  toggleBtn.textContent = toolsGrid.classList.contains('show-all') ? '收起' : '查看更多';
});
```

**功能**：点击按钮切换工具网格的显示/隐藏状态

#### 3. 搜索功能

**位置**：[index.js](file:///e:/web/code/111/index.js#L20-L45)

```javascript
searchInput.addEventListener('input', function () {
  const keyword = this.value.trim().toLowerCase();
  // 筛选卡片并隐藏顶部内容
});
```

**功能**：根据输入关键词筛选工具卡片，并在搜索时隐藏顶部横幅和分类

---

## 依赖关系

### 外部依赖

| 依赖项 | 来源 | 用途 |
|--------|------|------|
| Font Awesome 6.4.0 | CDN (cdnjs.cloudflare) | 提供图标 |

### 内部文件依赖

```
index.html
  ├── index.css (样式)
  ├── index.js (脚本)
  ├── comments.html (导航链接)
  ├── code.html (导航链接)
  └── tools.html (导航链接)
```

---

## 项目运行方式

### 本地运行

1. **直接打开**：
   - 在浏览器中直接打开 [index.html](file:///e:/web/code/111/index.html)

2. **使用本地服务器（推荐）**：
   ```bash
   # 使用 Python
   cd e:\web\code\111
   python -m http.server 8080
   
   # 或使用 Node.js (http-server)
   npx http-server -p 8080
   ```
   然后在浏览器访问 `http://localhost:8080`

### 部署

直接将 `111/` 目录下的所有文件上传到任何静态文件托管服务即可，如：
- GitHub Pages
- Vercel
- Netlify
- 传统Web服务器（Apache/Nginx）

---

## 历史版本归档

项目历史版本保存在 `code 2026/` 目录下，按日期归档：

| 日期 | 目录 | 说明 |
|------|------|------|
| 2026-03-09 | 260309/ | 早期版本 |
| 2026-03-13 | 260313/ | 设计稿版本 |
| 2026-03-14 | 260314/ | 网页地图版本 |
| ... | ... | ... |

---

## 注意事项

1. **图片资源**：当前使用 picsum.photos 作为占位图片，生产环境需替换为真实资源
2. **搜索范围**：搜索功能仅适用于工具卡片网格
3. **响应式断点**：
   - 900px：侧边栏变为图标模式
   - 640px：隐藏搜索框，调整横幅高度

---

## 更新日志

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026 | 初始版本 |

