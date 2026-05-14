import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "灵木洞天 / LYDT — Yinjie Shen",
  description: "AI Framework Engineer · GPU Computing · Distributed Training。在树中仙府记录我的 GPU 与系统笔记。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
