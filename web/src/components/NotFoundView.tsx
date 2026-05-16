import Link from "next/link";
import Image from "next/image";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
import { PageHero } from "./PageHero";
import { IconBook, IconHome, IconSpark } from "./Icons";
import { getNotFoundContent, getSiteContent } from "@/lib/content";

export function NotFoundView() {
  const content = getNotFoundContent();
  const site = getSiteContent();
  const iconMap = {
    home: IconHome,
    book: IconBook,
    spark: IconSpark,
  };

  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-404-unfinished-tree-hole-desktop.png"
          crumbs={[{ label: site.homeLabel, href: "/" }, { label: content.title }]}
          title={content.title}
          description={content.description}
          bannerText={content.bannerText}
          heightClass="min-h-[680px]"
        >
          <div className="flex flex-wrap gap-4">
            {content.actions.map((action, index) => {
              const Icon = iconMap[action.icon as keyof typeof iconMap] ?? IconSpark;
              return (
                <Link key={action.href} href={action.href} className={`${index === 0 ? "border-[rgba(224,204,136,.4)] bg-[rgba(232,226,207,.9)] text-[var(--color-ink-950)]" : "border-[rgba(192,163,93,.35)] bg-[rgba(7,18,16,.55)] text-[var(--color-gold-300)]"} inline-flex items-center gap-2 rounded-md border px-5 py-3 text-[14px] tracking-[0.14em]`}>
                  <Icon /> {action.label}
                </Link>
              );
            })}
          </div>
          <div className="card-paper mt-12 max-w-[620px] p-7">
            <div className="bamboo-tab">{content.tipTab}</div>
            <h2 className="font-display text-[26px] tracking-[0.12em] text-[#2a2117]">{content.tipTitle}</h2>
            <div className="my-5 h-px bg-[rgba(74,50,29,.24)]" />
            <p className="text-[14px] leading-[1.8] text-[#5d513f]">{content.tipBody}</p>
          </div>
        </PageHero>
        <div className="mx-auto grid max-w-[1280px] gap-6 px-6 py-8 md:grid-cols-[320px_1fr] md:items-center">
          <div className="relative aspect-square overflow-hidden rounded-[18px] border border-[rgba(224,204,136,.22)] bg-[rgba(7,18,16,.5)]">
            <Image src="/assets/lydt/scene/portal-small-door.png" alt="" fill sizes="320px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,18,16,.45)] to-transparent" />
          </div>
          <div className="text-center font-display text-[18px] tracking-[0.14em] text-[var(--color-gold-300)] md:text-left">
            {content.sceneTitle}
            <p className="mt-3 font-sans text-[14px] leading-[1.8] tracking-normal text-[#cfc4a8]">
              {content.sceneBody}
            </p>
          </div>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
