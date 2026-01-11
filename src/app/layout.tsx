// src/app/layout.tsx
import type { Metadata } from "next";

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
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
