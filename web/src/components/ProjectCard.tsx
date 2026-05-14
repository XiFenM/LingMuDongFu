import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/data";
import { techIconFor } from "@/lib/asset-icons";
import { IconArrowRight, IconCalendar, IconEye, IconStar } from "./Icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className="card-wood group block overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:border-[rgba(156,240,189,.48)] hover:shadow-[0_0_48px_-18px_rgba(156,240,189,.8)]"
    >
      <div className="relative aspect-[16/8.1] overflow-hidden rounded-t-[13px] border-b border-[rgba(224,204,136,.18)]">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,14,13,.58)] via-transparent to-[rgba(5,14,13,.18)]" />
        <span className="absolute left-4 top-4 rounded-md border border-[rgba(224,204,136,.4)] bg-[rgba(7,18,16,.72)] px-3 py-1 text-[12px] tracking-[0.12em] text-[var(--color-gold-300)] backdrop-blur-sm">
          {project.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-[18px] leading-snug tracking-[0.08em] text-[var(--color-moon)]">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[40px] text-[12.5px] leading-[1.7] text-[#cfc4a8]">
          {project.summary}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag} className="tag-jade">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={techIconFor(tag)} alt="" aria-hidden className="h-3.5 w-3.5 opacity-85" />
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-[rgba(224,204,136,.14)] pt-3 text-[11px] text-[#a99d82]">
          <span className="inline-flex items-center gap-1"><IconCalendar width={13} height={13} /> {project.date}</span>
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1"><IconStar width={13} height={13} /> {project.stars}</span>
            <span className="inline-flex items-center gap-1"><IconEye width={13} height={13} /> {project.views}</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(224,204,136,.4)] text-[var(--color-gold-300)] transition group-hover:border-[var(--color-firefly-500)] group-hover:text-[var(--color-firefly-300)]">
              <IconArrowRight width={15} height={15} />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
