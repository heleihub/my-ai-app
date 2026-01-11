# 🎭 小何 AI 情绪对话盲盒 (AI Emotion Box)

这是一个基于 **Next.js 14** 和 **Google Gemini 1.5 Flash** 开发的专业级 AI 对话应用。通过精准的 System Prompt 调教，本项目实现了三种截然不同的人格模式，为用户提供极致的情绪互动体验。

## ✨ 项目亮点

- **独立网站架构**：完全脱离第三方托管平台界面，拥有纯净、专业的独立 UI。
- **三种人格切换**：
  - **极致杠精 💢**：无论你说什么，它都能找到刁钻的角度反驳你。
  - **极致舔狗 ❤️**：毫无原则的赞美，提供最高等级的情绪按摩。
  - **阴阳怪气 🍵**：优雅地冒犯，每一句话都让你感到“话里有话”。
- **商业化集成**：侧边栏原生集成 **微信/支付宝收款码**，打赏变现路径极短。
- **国内访问优化**：利用 Next.js API Routes 后端代理，无需特殊网络即可在国内稳定调取 Gemini 接口。
- **全设备适配**：响应式设计，支持 PC、手机浏览器流畅访问。

---

## 🚀 快速开始 (如何部署属于你的盲盒)

本项目支持一键 **Fork**。如果你想拥有一个完全属于自己的 AI 情绪网站，请按以下步骤操作：

### 1. 获取 Gemini API Key
前往 [Google AI Studio](https://aistudio.google.com/) 点击 "Get API key" 免费获取。

### 2. Fork 本仓库
点击页面右上角的 **Fork** 按钮，将项目克隆到你的 GitHub 账号下。

### 3. 一键部署到 Netlify (推荐)
1. 登录 [Netlify](https://app.netlify.com/)。
2. 点击 **"Add new site"** -> **"Import from git"**。
3. 选择你 Fork 的仓库。
4. **配置环境变量** (关键)：在 `Site settings` -> `Environment variables` 中添加：
   - `GOOGLE_API_KEY`: 填入你第一步获取的密钥。
5. 点击 **Deploy**，等待 1 分钟即可生成你的独立网址。

---

## 🛠️ 自定义配置

### 修改收款码
请在项目文件夹中找到 `src/components/Sidebar.tsx`：
- 将微信图片链接替换为你自己的链接。
- 将支付宝图片链接替换为你自己的链接。

### 本地开发测试
1. 安装依赖：
   ```bash
   npm install
