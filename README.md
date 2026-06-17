# NAPELL BIO — Sustainable Coffee Ecosystem

![NAPELL BIO](https://img.shields.io/badge/Status-Online-green) ![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue)

NAPELL BIO 官方网站 — 专注于通过组培和气雾培技术消除全球咖啡供应链中的碳排放。

## 🌐 Live Site

👉 **[https://erikcywong.github.io/napell.com](https://erikcywong.github.io/napell.com)**（请替换为您的实际 GitHub Pages URL）

## 📁 项目结构

```
napell.com/
├── index.html              # 主站首页 (NAPELL BIO)
├── .nojekyll              # 禁用 Jekyll 处理
├── README.md              # 本文件
├── css/                   # 主站样式（如有）
└── life/                  # Napell Life 子站
    ├── index.html         # Napell Life 首页
    ├── css/common.css     # 共享样式
    ├── js/common.js       # 共享脚本
    ├── soundscapes/
    ├── music-platform/
    ├── device-gateway/
    ├── api/
    ├── research/
    ├── pricing/
    ├── community/
    ├── contact/
    ├── get-started/
    └── about/
```

## 🚀 部署到 GitHub Pages

### 方式一：从 `/ (root)` 发布（推荐）

1. 在 GitHub 创建新仓库（如 `napell.com`）
2. 将 `napell.com/` 目录内容推送到仓库根目录：
   ```bash
   cd napell.com
   git init
   git add .
   git commit -m "Initial commit: NAPELL BIO website"
   git remote add origin https://github.com/erikcywong/napell.com.git
   git push -u origin main
   ```
3. 进入仓库 **Settings → Pages**
4. **Source** 选择 `Deploy from a branch`
5. **Branch** 选择 `main` 和 `/ (root)`
6. 点击 **Save**

### 方式二：使用 `docs/` 目录

将 `napell.com/` 目录重命名为 `docs/`，然后在 GitHub Pages 设置中选择 `/docs`。

## 🛠 本地预览

直接用浏览器打开 `index.html`，或使用本地服务器：

```bash
# Python
cd napell.com && python -m http.server 8000

# Node.js
npx serve napell.com
```

然后访问 `http://localhost:8000`

## 🎨 技术栈

- 纯 HTML5 / CSS3 / Vanilla JavaScript
- 无框架依赖，无构建步骤
- 响应式设计，支持移动端
- Dashboard 风格数据展示
- 悬停下拉导航

## 📊 核心功能

- **NAPELL BIO 主站**：碳排放数据 Dashboard、国家数据、2050 愿景
- **Napell Life 子站**：声波助长咖啡科学、产品展示、研究论文、定价方案

## 📝 License

© 2026 NAPELL BIO. All rights reserved.

---

**Contact:** erik.wong@napell.bio | [WhatsApp +852 9318 8252](https://wa.me/85293188252)
