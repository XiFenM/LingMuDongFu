"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconGithub, IconLinkedIn } from "./Icons";

type NavItem = { label: string; href: string };
type Props = {
  brandName: string;
  nav: NavItem[];
  github: string;
  linkedin: string;
  resumeLabel: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderClient({ brandName, nav, github, linkedin, resumeLabel }: Props) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 -z-10 bg-[rgba(7,23,20,0.72)] [background-image:url('/assets/lydt/texture/texture-wood-grain-dark.png')] [background-blend-mode:multiply] bg-[length:480px_480px]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(192,163,93,0.45)] to-transparent" />

      <nav className="mx-auto flex max-w-[1280px] items-center gap-8 px-6 py-3 lg:py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-10 w-10 overflow-hidden rounded-full ring-1 ring-[rgba(192,163,93,0.38)]">
            <Image src="/assets/lydt/logo/logo-lydt-mark.png" alt={brandName} fill sizes="40px" className="object-cover transition group-hover:scale-105" />
          </span>
          <span className="font-display text-lg tracking-[0.35em] text-[var(--color-moon)]">
            {brandName}
          </span>
        </Link>

        <ul className="ml-4 hidden gap-6 text-[13px] tracking-[0.2em] text-[#cfc4a8] md:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link href={item.href} className={`relative px-1 py-2 transition ${active ? "text-[var(--color-gold-300)]" : "hover:text-[var(--color-gold-300)]"}`}>
                  {item.label}
                  <span className={`absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-gold-300)] to-transparent transition-all ${active ? "w-12 opacity-100" : "w-0 opacity-0"}`} />
                  {active ? <span className="absolute -bottom-[5px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border border-[var(--color-gold-300)] bg-[var(--color-ink-900)]" /> : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-3 text-[#cfc4a8]">
          <a href={github} target="_blank" rel="noreferrer" className="rounded-md p-2 transition hover:bg-[rgba(156,240,189,0.08)] hover:text-[var(--color-firefly-300)]" aria-label="GitHub">
            <IconGithub />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" className="rounded-md p-2 transition hover:bg-[rgba(156,240,189,0.08)] hover:text-[var(--color-firefly-300)]" aria-label="LinkedIn">
            <IconLinkedIn />
          </a>
          <Link href="/resume" className="hidden items-center gap-1 rounded-md border border-[rgba(224,204,136,0.35)] bg-[rgba(232,226,207,.86)] px-4 py-2 text-[12px] tracking-[0.2em] text-[var(--color-ink-950)] shadow-[0_0_18px_-12px_rgba(224,204,136,.9)] transition hover:border-[rgba(224,204,136,0.7)] hover:bg-[var(--color-moon)] md:inline-flex">
            {resumeLabel}
          </Link>
        </div>
      </nav>
    </header>
  );
}
