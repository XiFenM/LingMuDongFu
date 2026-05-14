import Link from "next/link";
import Image from "next/image";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
import { PageHero } from "./PageHero";
import { IconBook, IconHome, IconSpark } from "./Icons";

export function NotFoundView() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-404-unfinished-tree-hole-desktop.png"
          crumbs={[{ label: "首页", href: "/" }, { label: "404" }]}
          title="404"
          description={"你似乎走进了一间\n尚未长成的树洞。\n\n此路尚未成形，枝叶仍在生长之中。\n或许你可以回到洞天的主径，继续探索更多已长成的方向。"}
          bannerText="此路未成·枝叶待长"
          heightClass="min-h-[680px]"
        >
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="inline-flex items-center gap-2 rounded-md border border-[rgba(224,204,136,.4)] bg-[rgba(232,226,207,.9)] px-5 py-3 text-[14px] tracking-[0.14em] text-[var(--color-ink-950)]"><IconHome /> 返回首页</Link>
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-md border border-[rgba(192,163,93,.35)] bg-[rgba(7,18,16,.55)] px-5 py-3 text-[14px] tracking-[0.14em] text-[var(--color-gold-300)]"><IconBook /> 去藏书枝阁</Link>
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-md border border-[rgba(192,163,93,.35)] bg-[rgba(7,18,16,.55)] px-5 py-3 text-[14px] tracking-[0.14em] text-[var(--color-gold-300)]"><IconSpark /> 查看项目</Link>
          </div>
          <div className="card-paper mt-12 max-w-[620px] p-7">
            <div className="bamboo-tab">小提示</div>
            <h2 className="font-display text-[26px] tracking-[0.12em] text-[#2a2117]">也许这只灵萤能带你回到正确的路。</h2>
            <div className="my-5 h-px bg-[rgba(74,50,29,.24)]" />
            <p className="text-[14px] leading-[1.8] text-[#5d513f]">跟随微光，回到洞天主径吧。</p>
          </div>
        </PageHero>
        <div className="mx-auto grid max-w-[1280px] gap-6 px-6 py-8 md:grid-cols-[320px_1fr] md:items-center">
          <div className="relative aspect-square overflow-hidden rounded-[18px] border border-[rgba(224,204,136,.22)] bg-[rgba(7,18,16,.5)]">
            <Image src="/assets/lydt/scene/portal-small-door.png" alt="" fill sizes="320px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,18,16,.45)] to-transparent" />
          </div>
          <div className="text-center font-display text-[18px] tracking-[0.14em] text-[var(--color-gold-300)] md:text-left">
            树心深处，似乎还有一扇微微发光的小门。
            <p className="mt-3 font-sans text-[14px] leading-[1.8] tracking-normal text-[#cfc4a8]">
              这张小门素材将作为 404 / 彩蛋入口的通用场景件，后续可以接入隐藏交互。
            </p>
          </div>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
