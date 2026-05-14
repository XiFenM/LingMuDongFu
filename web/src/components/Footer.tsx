import Image from "next/image";
import Link from "next/link";
import { NAV, SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(192,163,93,0.18)] bg-[rgba(7,18,16,0.88)] [background-image:url('/assets/lydt/texture/texture-wood-grain-dark.png')] [background-blend-mode:multiply] bg-[length:480px_480px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-6 py-7 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex h-9 w-9 overflow-hidden rounded-full ring-1 ring-[rgba(192,163,93,0.3)]">
            <Image src="/assets/lydt/logo/logo-lydt-mark.png" alt="LYDT" fill sizes="36px" className="object-cover" />
          </span>
          <div>
            <div className="font-display tracking-[0.32em] text-[var(--color-moon)]">{SITE.name}</div>
            <div className="text-[11px] tracking-[0.18em] text-[#807765]">© 2025 Yinjie Shen. All rights reserved.</div>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] tracking-[0.18em] text-[#807765]">
          {NAV.map((item) => (
            <li key={item.href}><Link href={item.href} className="transition hover:text-[var(--color-gold-300)]">{item.label.replace("首页", "首页")}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
