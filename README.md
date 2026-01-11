# 🎭 小何 AI 情绪对话盲盒 (AI Emotion Box)

这是一个基于 **Next.js 14** 和 **Google Gemini 1.5 Flash** 开发的专业级 AI 对话应用。通过精心调教的 System Prompt，本项目实现了三种截然不同的人格模式，为用户提供极致的情绪互动体验。

---

## ✨ 项目特色

- **独立网站架构**：完全脱离第三方托管平台，拥有属于自己的、纯净且专业的独立 UI 界面。
- **核心人格切换**：
  - **极致杠精 💢**：无论你说什么，它都能找到逻辑漏洞进行刁钻反驳，抗压练习神器。
  - **极致舔狗 ❤️**：毫无原则的赞美，全方位提供最高等级的情绪价值。
  - **阴阳怪气 🍵**：表面客气实则讽刺，每一句话都让你感到“话里有话”。
- **商业化变现**：侧边栏原生集成 **微信/支付宝收款码** 展示，打赏转化路径极短，适合个人创作者。
- **国内访问优化**：利用 Next.js API Routes 后端代理技术，无需特殊网络即可在国内稳定调取 Google API 接口。
- **全设备适配**：完美的响应式设计，支持 PC 端、平板及手机浏览器流畅访问。

---

## 🚀 快速开始 (一键部署你的盲盒)

本项目支持一键 **Fork**。如果你想拥有一个完全属于自己的 AI 情绪网站，请按以下步骤操作：

### 第一步：获取 API Key
前往 [Google AI Studio](https://aistudio.google.com/) 点击 "Create API Key" 免费获取你的 Gemini 密钥。

### 第二步：Fork 本仓库
点击本项目页面右上角的 **Fork** 按钮，将项目完整克隆到你自己的 GitHub 账号下。

### 第三步：部署到 Netlify (推荐)
1. 登录 [Netlify](https://app.netlify.com/) 并点击 **"Add new site"** -> **"Import from git"**。
2. 选择你刚刚 Fork 的仓库。
3. **配置环境变量 (重要)**：在 `Site settings` -> `Environment variables` 中点击添加：
   - Key 设置为: `GOOGLE_API_KEY`
   - Value 设置为: 你的 Gemini API 密钥。
4. 点击 **Deploy**，等待约 1 分钟，你的网站就正式上线了！

---

## 🛠️ 自定义与二次开发

### 修改你的收款码
在项目中找到 `src/components/Sidebar.tsx` 文件：
- 找到微信图片标签，将 `src` 后的链接换成你自己的微信收款码链接。
- 找到支付宝图片标签，将 `src` 后的链接换成你自己的支付宝收款码链接。

### 本地环境搭建
1. 克隆代码后安装依赖：`npm install`
2. 在项目根目录创建 `.env.local` 文件并填入：`GOOGLE_API_KEY=你的密钥`
3. 启动开发环境：`npm run dev`

---

## 📂 项目文件结构
- **src/app/api/chat/route.ts**: 后端代理路由，用于保护 API Key 安全并优化连接。
- **src/app/page.tsx**: 聊天主界面逻辑与 UI 布局。
- **src/components/Sidebar.tsx**: 侧边栏组件，负责模式切换与收款码展示。
- **package.json**: 项目依赖包与运行脚本配置。

---

## 📜 免责声明
本项目仅供技术交流与学习使用。请妥善保管你的 API Key，因个人保管不当导致的额度损耗与作者无关。

**如果这个项目对你有帮助，请给个 ⭐ Star 支持作者小何！**
