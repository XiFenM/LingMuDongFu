import { IconSpark } from "./Icons";
import { categoryIconFor } from "@/lib/asset-icons";

export function FilterTabs({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item, i) => (
        <button
          key={item}
          className={`group inline-flex items-center gap-2 rounded-md border px-4 py-2 text-[13px] tracking-[0.12em] transition ${
            i === active
              ? "border-[rgba(156,240,189,.6)] bg-[rgba(156,240,189,.12)] text-[var(--color-moon)] shadow-[0_0_24px_-10px_rgba(156,240,189,.8)]"
              : "border-[rgba(192,163,93,.28)] bg-[rgba(7,18,16,.55)] text-[#cfc4a8] hover:border-[rgba(224,204,136,.55)] hover:text-[var(--color-gold-300)]"
          }`}
          type="button"
        >
          {i === active ? (
            <IconSpark width={14} height={14} />
          ) : (
            // Asset-pack SVG: G-006 category icon. Kept as an external img so the same files
            // can be reused by future static pages / OG templates.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={categoryIconFor(item)} alt="" aria-hidden className="h-3.5 w-3.5 opacity-75" />
          )}
          {item}
        </button>
      ))}
    </div>
  );
}
