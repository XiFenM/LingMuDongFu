import type { ReactElement } from "react";
import type { VisualKind } from "@/lib/data";

type Props = {
  kind: VisualKind;
  title?: string;
  tone?: "dark" | "paper";
  className?: string;
};

const motifPaths: Record<VisualKind, ReactElement> = {
  tree: (
    <g>
      <path d="M120 128 C110 102 112 78 128 52 C144 78 146 102 136 128" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M128 58 C102 68 84 88 72 116" fill="none" stroke="currentColor" strokeWidth="2" opacity=".65" />
      <path d="M128 58 C156 69 174 88 184 118" fill="none" stroke="currentColor" strokeWidth="2" opacity=".65" />
      <path d="M128 88 C96 90 78 70 70 48" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".45" />
      <path d="M128 86 C162 88 182 68 190 46" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".45" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const r = 26 + (i % 5) * 9;
        return <circle key={i} cx={128 + Math.cos(a) * r} cy={78 + Math.sin(a) * r * 0.72} r={1.8} fill="currentColor" opacity={0.35 + (i % 3) * 0.15} />;
      })}
    </g>
  ),
  cube: (
    <g>
      <path d="M128 52 184 84v64l-56 32-56-32V84Z" fill="rgba(156,240,189,.08)" stroke="currentColor" strokeWidth="2" />
      <path d="M72 84 128 116l56-32M128 116v64" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".8" />
      <path d="M92 96h72M92 136h72M108 68v96M148 68v96" stroke="currentColor" opacity=".28" />
      <circle cx="128" cy="116" r="10" fill="currentColor" opacity=".42" />
    </g>
  ),
  vortex: (
    <g>
      {Array.from({ length: 7 }).map((_, i) => (
        <ellipse key={i} cx="128" cy="116" rx={30 + i * 14} ry={12 + i * 5} fill="none" stroke="currentColor" strokeWidth="1.4" opacity={0.55 - i * 0.055} transform={`rotate(${i * 17} 128 116)`} />
      ))}
      <circle cx="128" cy="116" r="9" fill="currentColor" opacity=".5" />
      <path d="M66 102 C96 56 158 60 190 92" fill="none" stroke="currentColor" opacity=".35" />
    </g>
  ),
  lantern: (
    <g>
      <path d="M104 76h48M112 68h32M110 164h36M116 76c-16 24-16 58 0 82h24c16-24 16-58 0-82Z" fill="rgba(224,204,136,.12)" stroke="currentColor" strokeWidth="2" />
      <path d="M128 76v82M106 116h44" stroke="currentColor" opacity=".55" />
      <circle cx="128" cy="118" r="48" fill="currentColor" opacity=".08" />
    </g>
  ),
  network: (
    <g>
      {[[68,70],[106,100],[154,76],[188,126],[126,152],[76,142]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="currentColor" opacity=".55" />
      ))}
      <path d="M68 70 106 100 154 76 188 126 126 152 76 142 106 100 126 152 154 76" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".55" />
      {Array.from({ length: 32 }).map((_, i) => (
        <circle key={i} cx={48 + ((i * 37) % 160)} cy={48 + ((i * 53) % 112)} r="1.2" fill="currentColor" opacity=".25" />
      ))}
    </g>
  ),
  bonsai: (
    <g>
      <path d="M92 160h72M108 146h40l-8 14h-24Z" fill="rgba(224,204,136,.12)" stroke="currentColor" />
      <path d="M128 146 C120 120 134 104 128 76" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M128 104 C98 98 84 84 82 62M130 100 C158 98 176 82 178 60" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="88" cy="62" rx="34" ry="18" fill="none" stroke="currentColor" opacity=".55" />
      <ellipse cx="172" cy="60" rx="34" ry="18" fill="none" stroke="currentColor" opacity=".55" />
      <ellipse cx="128" cy="78" rx="38" ry="20" fill="none" stroke="currentColor" opacity=".42" />
    </g>
  ),
  scroll: (
    <g>
      <path d="M74 74h108v84H74z" fill="rgba(240,229,201,.08)" stroke="currentColor" strokeWidth="1.8" />
      <path d="M74 74c-18 0-18 22 0 22M182 136c18 0 18 22 0 22" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M94 98h68M94 116h50M94 134h62" stroke="currentColor" opacity=".55" />
      <path d="M68 158c34-16 78-16 120 0" fill="none" stroke="currentColor" opacity=".28" />
    </g>
  ),
  route: (
    <g>
      <path d="M64 154 C88 112 98 134 118 90 C138 48 160 78 192 52" fill="none" stroke="currentColor" strokeWidth="2.2" />
      {[64,118,192].map((x, i) => <circle key={x} cx={x} cy={[154,90,52][i]} r="9" fill="rgba(156,240,189,.12)" stroke="currentColor" />)}
      <path d="M72 60h44M140 142h56" stroke="currentColor" opacity=".35" />
    </g>
  ),
  waves: (
    <g>
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M48 ${76 + i * 16} C82 ${56 + i * 16} 104 ${96 + i * 16} 136 ${76 + i * 16} S184 ${56 + i * 16} 208 ${76 + i * 16}`} fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.7 - i * 0.08} />
      ))}
      <circle cx="128" cy="116" r="24" fill="none" stroke="currentColor" opacity=".45" />
    </g>
  ),
  steps: (
    <g>
      <path d="M70 158h118v-20h-24v-20h-24V98h-24V78H92v80Z" fill="rgba(224,204,136,.1)" stroke="currentColor" />
      <path d="M92 78c30-22 64-24 96-8M70 158c44 16 86 12 122-4" fill="none" stroke="currentColor" opacity=".35" />
      <circle cx="178" cy="66" r="9" fill="currentColor" opacity=".35" />
    </g>
  ),
  gates: (
    <g>
      {[0,1,2].map((i) => <path key={i} d={`M${70+i*32} 154V82h28v72M${64+i*32} 82h40`} fill="none" stroke="currentColor" strokeWidth="2" opacity={0.5+i*0.13} />)}
      <path d="M60 154h136M64 108h128" stroke="currentColor" opacity=".28" />
    </g>
  ),
  pages: (
    <g>
      {[0,1,2,3].map((i) => <path key={i} d={`M${78+i*22} ${72+i*10}h72v74h-72z`} fill="rgba(240,229,201,.07)" stroke="currentColor" opacity={0.45+i*0.1} />)}
      <path d="M100 94h38M100 112h48M100 130h28" stroke="currentColor" opacity=".5" />
      <path d="M92 168 C118 152 148 152 176 168" fill="none" stroke="currentColor" opacity=".3" />
    </g>
  ),
};

export function ArtworkThumb({ kind, title, tone = "dark", className }: Props) {
  const isPaper = tone === "paper";
  return (
    <div
      className={`relative overflow-hidden ${isPaper ? "bg-[#e8dac0] text-[#4a321d]" : "bg-[rgba(7,18,16,.72)] text-[var(--color-firefly-300)]"} ${className ?? ""}`}
      aria-label={title}
    >
      <div className="absolute inset-0 opacity-70 [background-image:url('/assets/lydt/texture/texture-tree-ring-subtle.png')] bg-[length:420px_420px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(156,240,189,.24),transparent_22%),radial-gradient(circle_at_18%_12%,rgba(224,204,136,.18),transparent_18%),radial-gradient(circle_at_80%_82%,rgba(192,163,93,.16),transparent_22%)]" />
      <svg viewBox="0 0 256 192" className="relative h-full w-full drop-shadow-[0_0_16px_rgba(156,240,189,.22)]" aria-hidden>
        <defs>
          <linearGradient id={`fade-${kind}-${tone}`} x1="0" x2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity=".08" />
            <stop offset=".5" stopColor="currentColor" stopOpacity=".45" />
            <stop offset="1" stopColor="currentColor" stopOpacity=".08" />
          </linearGradient>
        </defs>
        <path d="M24 150 C70 112 92 132 128 96 C164 60 186 82 232 48" fill="none" stroke={`url(#fade-${kind}-${tone})`} strokeWidth="1.2" />
        {motifPaths[kind]}
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(7,18,16,.55)] via-transparent to-transparent" />
    </div>
  );
}
