import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "夕丰木 — Yinjie Shen",
  description: "AI Framework Engineer · GPU Computing · Distributed Training。在夕丰木记录我的 GPU 与系统笔记。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
