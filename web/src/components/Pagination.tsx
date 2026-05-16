import { getUiContent } from "@/lib/content";
import { IconArrowRight } from "./Icons";

export function Pagination() {
  const ui = getUiContent();

  return (
    <nav className="mt-12 flex items-center justify-center gap-3 text-[14px] text-[#cfc4a8]" aria-label={ui.paginationAriaLabel}>
      {[1, 2, 3, 4, 5].map((p) => (
        <button
          key={p}
          type="button"
          className={`h-10 w-10 rounded-md border transition ${p === 1 ? "border-[rgba(224,204,136,.75)] bg-[rgba(224,204,136,.14)] text-[var(--color-gold-300)] shadow-[0_0_22px_-8px_rgba(224,204,136,.9)]" : "border-[rgba(192,163,93,.3)] hover:border-[rgba(224,204,136,.55)]"}`}
        >
          {p}
        </button>
      ))}
      <span className="px-1 tracking-[0.25em] text-[var(--color-gold-300)]">...</span>
      <button type="button" className="h-10 w-12 rounded-md border border-[rgba(192,163,93,.3)] transition hover:border-[rgba(224,204,136,.55)]">12</button>
      <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(192,163,93,.3)] text-[var(--color-gold-300)] transition hover:border-[rgba(224,204,136,.55)]">
        <span className="sr-only">{ui.paginationNextLabel}</span>
        <IconArrowRight width={15} height={15} />
      </button>
    </nav>
  );
}
