import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { getContactContent } from "@/lib/content";
import { Fireflies } from "./Fireflies";
import { IconGithub, IconLinkedIn, IconMail, IconFile } from "./Icons";

const iconMap: Record<string, React.ComponentType<{ width?: number; height?: number }>> = {
  mail: IconMail,
  github: IconGithub,
  linkedin: IconLinkedIn,
  file: IconFile,
};

export function Contact() {
  const contact = getContactContent();

  return (
    <section id="contact" className="relative isolate mt-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image src="/assets/lydt/bg/bg-contact-moon-tea-room-desktop.png" alt="" fill sizes="100vw" className="object-cover object-top" />
        <Image src="/assets/lydt/scene/moon-window-full-moon.png" alt="" width={320} height={320} className="absolute right-[7vw] top-8 hidden opacity-[0.55] drop-shadow-[0_0_38px_rgba(184,212,224,.18)] lg:block" />
        <Image src="/assets/lydt/scene/desk-tea-alpha.png" alt="" width={520} height={270} className="absolute bottom-[-54px] right-[6vw] hidden opacity-[0.55] drop-shadow-[0_24px_38px_rgba(0,0,0,.45)] xl:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,18,16,0.28)] via-[rgba(7,18,16,0.54)] to-[var(--color-ink-950)]" />
      </div>
      <Fireflies count={8} />

      <div className="mx-auto max-w-[1280px] px-6 pt-14 pb-16 md:pt-16 md:pb-18">
        <SectionHeader title={contact.title} sub={contact.sub} align="center" />
        <p className="mx-auto mt-4 max-w-[600px] text-center text-[13px] leading-[1.75] text-[#cfc4a8]">
          {contact.description}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {contact.cards.map((c) => {
            const Icon = iconMap[c.icon] ?? IconMail;
            return (
              <a
                key={c.key}
                href={c.href}
                target={c.icon === "file" ? "_self" : "_blank"}
                rel="noreferrer"
                className="group relative overflow-hidden rounded-xl border border-[rgba(185,209,196,0.28)] bg-[rgba(11,33,29,0.58)] px-4 py-5 backdrop-blur-md transition hover:border-[rgba(156,240,189,0.5)] hover:bg-[rgba(11,33,29,0.78)]"
              >
                <div className="absolute inset-0 -z-10 opacity-30 [background-image:url('/assets/lydt/texture/texture-wood-grain-dark.png')] bg-[length:320px_320px]" />
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(192,163,93,0.4)] bg-[rgba(7,18,16,0.55)] text-[var(--color-gold-300)] transition group-hover:text-[var(--color-firefly-300)]">
                    <Icon width={18} height={18} />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-[14px] tracking-[0.14em] text-[var(--color-moon)]">{c.label}</div>
                    <div className="mt-1 truncate text-[11px] text-[#a99d82]">{c.value}</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
