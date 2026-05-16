import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/data";
import { techIconFor } from "@/lib/asset-icons";
import { getUiContent } from "@/lib/content";
import { IconArrowRight, IconCalendar, IconClock } from "./Icons";

type Props = {
  post: Post;
  variant?: "featured" | "archive" | "paper";
};

export function BlogCard({ post, variant = "archive" }: Props) {
  const featured = variant === "featured";
  const paper = variant === "paper";
  const ui = getUiContent();
  return (
    <Link
      href={post.href}
      className={`${paper || featured ? "card-paper text-[#2a2117]" : "card-wood"} group relative block overflow-hidden p-0 transition duration-300 hover:-translate-y-0.5`}
    >
      <div className="bamboo-tab hidden sm:block">{post.category}</div>
      <div className={`grid ${featured ? "md:grid-cols-[1fr_180px]" : paper ? "" : "md:grid-cols-[1fr_170px]"} gap-0`}>
        <div className={`${featured ? "p-6" : paper ? "p-5" : "p-5"}`}>
          <h3 className={`font-display leading-snug tracking-[0.08em] ${featured ? "text-[22px]" : "text-[18px]"} ${paper || featured ? "text-[#2a2117]" : "text-[var(--color-moon)]"}`}>
            {post.title}
          </h3>
          <p className={`mt-3 line-clamp-2 text-[13px] leading-[1.75] ${paper || featured ? "text-[#5d513f]" : "text-[#cfc4a8]"}`}>
            {post.excerpt}
          </p>
          <div className={`mt-4 flex flex-wrap items-center gap-4 text-[12px] ${paper || featured ? "text-[#5d513f]" : "text-[#a99d82]"}`}>
            <span className="inline-flex items-center gap-1"><IconCalendar width={13} height={13} /> {post.date}</span>
            <span className="inline-flex items-center gap-1"><IconClock width={13} height={13} /> {post.readTime}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <ul className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <li key={tag} className={`${paper || featured ? "rounded-md border border-[rgba(74,50,29,.32)] bg-[rgba(255,255,255,.18)] px-2 py-1 text-[12px] text-[#5d4a2c]" : "tag-jade"} inline-flex items-center gap-1`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={techIconFor(tag)} alt="" aria-hidden className={`h-3.5 w-3.5 ${paper || featured ? "opacity-70 mix-blend-multiply" : "opacity-85"}`} />
                  {tag}
                </li>
              ))}
            </ul>
            <span className={`${paper || featured ? "bg-[#0b211d] text-[var(--color-gold-300)]" : "text-[var(--color-gold-300)]"} inline-flex items-center gap-2 rounded-md border border-[rgba(224,204,136,.35)] px-3 py-2 text-[12px] tracking-[0.14em] transition group-hover:border-[rgba(156,240,189,.6)] group-hover:text-[var(--color-firefly-300)]`}>
              {ui.blogCardReadMoreLabel} <IconArrowRight width={13} height={13} />
            </span>
          </div>
        </div>
        {!paper ? (
          <div className={`${featured ? "hidden min-h-[185px] md:block" : "hidden min-h-full md:block"} relative overflow-hidden border-l border-[rgba(224,204,136,.18)]`}>
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(min-width: 768px) 190px, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[rgba(9,23,20,.24)] mix-blend-multiply" />
          </div>
        ) : (
          <div className="mx-4 mb-4 aspect-[16/9] overflow-hidden rounded-md ring-1 ring-[rgba(74,50,29,.32)]">
            <Image
              src={post.image}
              alt=""
              width={640}
              height={360}
              sizes="(min-width: 768px) 30vw, 100vw"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
