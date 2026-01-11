// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // 如果没有这个文件也没关系，系统会自动处理

export const metadata: Metadata = {
  title: "小何 AI 情绪对话盲盒",
  description: "极致杠精/舔狗/阴阳怪气模式切换",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
