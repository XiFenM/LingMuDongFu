import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import "./globals.css";

export function generateMetadata(): Metadata {
  const site = getSiteContent();
  return {
    title: site.metadataTitle,
    description: site.metadataDescription,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
