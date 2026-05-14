from __future__ import annotations

import json
import math
import random
from pathlib import Path
from typing import Iterable, Sequence

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1] / "public" / "assets" / "lydt"
GOLD = "#e0cc88"
GOLD_DARK = "#9f8243"
JADE = "#9cf0bd"
MOON = "#d6e5ec"
INK = "#071714"
WOOD = "#24180f"
PAPER = "#f0e5c9"


def ensure_dirs() -> None:
    for rel in [
        "icons/social",
        "icons/category",
        "icons/tech",
        "icons/ui",
        "icons/code",
        "icons/common",
        "decor",
        "fx",
        "scene",
        "texture",
        "timeline",
        "logo",
        "project-detail",
        "thumbnails/blog",
        "thumbnails/projects",
    ]:
        (ROOT / rel).mkdir(parents=True, exist_ok=True)


def write(path: str, content: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")


def svg(path: str, body: str, view_box: str = "0 0 24 24", stroke: str = GOLD, fill: str = "none", width: int | None = None, height: int | None = None, extra: str = "") -> None:
    size = ""
    if width and height:
        size = f' width="{width}" height="{height}"'
    write(
        path,
        f'''<svg xmlns="http://www.w3.org/2000/svg"{size} viewBox="{view_box}" fill="{fill}" stroke="{stroke}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" {extra}>\n{body}\n</svg>\n''',
    )


def meta(path: Path, prompt: str, kind: str) -> None:
    path.with_suffix(path.suffix + ".json").write_text(
        json.dumps(
            {
                "generated_by": "web/scripts/generate_lydt_asset_pack.py",
                "kind": kind,
                "style": "灵木洞天 / deep ink green, warm gold, moonlight, rice paper texture",
                "prompt": prompt,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )


# ---------- SVG icon and vector asset pack ----------

def generate_icons() -> None:
    social = {
        "icon-mail.svg": '<rect x="3.5" y="5.5" width="17" height="13" rx="2.4"/><path d="m4.5 7 7.5 5.7L19.5 7"/>',
        "icon-github.svg": '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 18v-2.2c-1.8.2-2.5-.7-3-1.8M15.5 18v-2.1c0-.9-.3-1.4-.8-1.8 2.1-.3 3.6-1.2 3.6-4a3.1 3.1 0 0 0-.9-2.3 3.9 3.9 0 0 0-.1-2.3s-1-.2-2.7 1a8.8 8.8 0 0 0-5.2 0c-1.7-1.2-2.7-1-2.7-1a3.9 3.9 0 0 0-.1 2.3 3.1 3.1 0 0 0-.9 2.3c0 2.8 1.5 3.7 3.6 4-.4.3-.7.8-.8 1.5"/>',
        "icon-linkedin.svg": '<rect x="4" y="4" width="16" height="16" rx="2.6"/><path d="M8 10v6M8 7.8v.01M11.5 16v-6M11.5 12.2c.8-1.7 4.5-2.2 4.5 1V16"/>',
        "icon-file-text.svg": '<path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z"/><path d="M14 3.5v5h5"/><path d="M8.5 13h7M8.5 16h5"/>',
        "icon-external-link.svg": '<path d="M14 4h6v6"/><path d="M20 4 10.5 13.5"/><path d="M19 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5H10"/>',
        "icon-arrow-right.svg": '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
        "icon-download.svg": '<path d="M12 4v11"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M5 20h14"/>',
    }
    for name, body in social.items():
        svg(f"icons/social/{name}", body)

    category = {
        "icon-cat-all.svg": '<rect x="4" y="4" width="6" height="6" rx="1.2"/><rect x="14" y="4" width="6" height="6" rx="1.2"/><rect x="4" y="14" width="6" height="6" rx="1.2"/><rect x="14" y="14" width="6" height="6" rx="1.2"/>',
        "icon-cat-ai.svg": '<path d="M8 8.5a4 4 0 0 1 8 0v7a4 4 0 0 1-8 0z"/><path d="M8 11h8M8 14h8M12 4.5V3M12 21v-1.5M4 12h2M18 12h2"/>',
        "icon-cat-cuda.svg": '<path d="M7 4.5h10l3 7.5-3 7.5H7L4 12z"/><path d="M9 9h6v6H9z"/><path d="M12 4.5v4.5M12 15v4.5"/>',
        "icon-cat-pytorch.svg": '<path d="M14.8 5.2A7 7 0 1 1 7.3 6.4"/><path d="M13.5 3.5 17 7"/><circle cx="15.3" cy="9" r="1.1" fill="#e0cc88" stroke="none"/>',
        "icon-cat-distributed.svg": '<circle cx="5" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6.6 10.8 10.5 6.5M13.5 6.5l3.9 4.3M17.4 13.2l-3.9 4.3M10.5 17.5l-3.9-4.3"/>',
        "icon-cat-llm.svg": '<path d="M6 5h9a3 3 0 0 1 3 3v11H9a3 3 0 0 1-3-3z"/><path d="M9 8h6M9 11h5M9 14h7"/><path d="M18 9l2-2M18 13l2 2"/>',
        "icon-cat-kernel.svg": '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M3 9h2M3 15h2M19 9h2M19 15h2M9 3v2M15 3v2M9 19v2M15 19v2"/>',
        "icon-cat-engineering.svg": '<path d="M14 6.5 17.5 3 21 6.5 17.5 10"/><path d="M16 8 8 16"/><path d="M6.5 14.5 3 18l3 3 3.5-3.5"/><path d="M5 5l4 4"/>',
        "icon-cat-notes.svg": '<path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h3"/><path d="M6 7H4M6 12H4M6 17H4"/>',
        "icon-cat-system.svg": '<path d="M5 7l7-4 7 4-7 4z"/><path d="m5 12 7 4 7-4"/><path d="m5 17 7 4 7-4"/>',
        "icon-cat-tools.svg": '<path d="M14.5 5.5a4 4 0 0 0 4.2 5.2L10.2 19a2.2 2.2 0 0 1-3.1-3.1l8.2-8.2a4 4 0 0 1-.8-2.2z"/><path d="M5 5l4 4"/>',
        "icon-cat-research.svg": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/><path d="m10.5 7.5.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z"/>',
    }
    for name, body in category.items():
        svg(f"icons/category/{name}", body)

    tech = {
        "megatron": '<path d="M12 4v16"/><path d="M12 8 6 5M12 8l6-3M12 13l-6 3M12 13l6 3"/><circle cx="12" cy="12" r="2.2"/><circle cx="6" cy="5" r="1.2"/><circle cx="18" cy="5" r="1.2"/><circle cx="6" cy="16" r="1.2"/><circle cx="18" cy="16" r="1.2"/>',
        "pytorch": '<path d="M14.5 5.5a6.8 6.8 0 1 1-7.1.9"/><path d="M13.7 3.7 17 7"/><circle cx="15.2" cy="9.1" r="1" fill="#e0cc88" stroke="none"/>',
        "cuda": '<path d="M6 6h12v12H6z"/><path d="M9 9h6v6H9z"/><path d="M3 9h3M3 15h3M18 9h3M18 15h3M9 3v3M15 3v3M9 18v3M15 18v3"/>',
        "triton": '<path d="M12 3 4.5 8v8l7.5 5 7.5-5V8z"/><path d="M12 3v18M4.5 8l7.5 5 7.5-5"/>',
        "nccl": '<circle cx="6" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="12" cy="18" r="2"/><path d="M8 12h8M12 8v8"/>',
        "zero": '<circle cx="12" cy="12" r="8"/><path d="M7 17 17 7"/><path d="M8 9h3M13 15h3"/>',
        "dispatcher": '<path d="M4 6h5a3 3 0 0 1 3 3v9"/><path d="M12 9a3 3 0 0 1 3-3h5"/><path d="M8 18h8"/><path d="m16 14-4 4-4-4"/>',
        "optimization": '<path d="M4 17c3-8 7-11 16-11"/><path d="M15 6h5v5"/><path d="M5 19h14"/><circle cx="8" cy="14" r="1.2"/><circle cx="13" cy="10" r="1.2"/>',
        "fsdp": '<path d="M4 6h16v12H4z"/><path d="M8 6v12M16 6v12M4 12h16"/>',
        "ddp": '<circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><path d="M10 12h4"/><path d="M7 9V6M17 15v3"/>',
        "kernel": '<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 12h6M12 9v6"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/>',
        "kvcache": '<path d="M6 6c0-1.7 2.7-3 6-3s6 1.3 6 3-2.7 3-6 3-6-1.3-6-3z"/><path d="M6 6v10c0 1.7 2.7 3 6 3s6-1.3 6-3V6"/><path d="M6 11c0 1.7 2.7 3 6 3s6-1.3 6-3"/>',
        "compiler": '<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="M13.5 5 10.5 19"/>',
        "quantization": '<path d="M4 6h7v12H4z"/><path d="M13 8h7v8h-7z"/><path d="M11 12h2"/><path d="M6.5 9h2M6.5 12h2M6.5 15h2"/>',
        "distributed": '<circle cx="5" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6.6 10.6 10.5 6.5M13.5 6.5l3.9 4.1M17.4 13.4l-3.9 4.1M10.5 17.5l-3.9-4.1"/>',
        "llm": '<path d="M5 7h14v10H5z"/><path d="M8 10h3M13 10h3M8 14h8"/><path d="M9 7V4M15 7V4M10 20h4"/>',
        "deepspeed": '<path d="M4 15c4-9 9-9 16-9"/><path d="M14 6h6v6"/><path d="M5 18c5-1 8-3 11-7"/>',
        "python": '<path d="M8 4h6a3 3 0 0 1 3 3v3H9a3 3 0 0 0-3 3v1"/><path d="M16 20h-6a3 3 0 0 1-3-3v-3h8a3 3 0 0 0 3-3v-1"/><circle cx="10" cy="7" r=".6" fill="#e0cc88" stroke="none"/><circle cx="14" cy="17" r=".6" fill="#e0cc88" stroke="none"/>',
        "cpp": '<path d="M12 3 4.5 7.8v8.4L12 21l7.5-4.8V7.8z"/><path d="M13.5 9a3 3 0 1 0 0 6"/><path d="M16 11h4M18 9v4"/>',
        "performance": '<path d="M5 17a7 7 0 1 1 14 0"/><path d="m12 17 4-6"/><path d="M8 17h8"/>',
    }
    for key, body in tech.items():
        svg(f"icons/tech/icon-tech-{key}.svg", body)

    ui = {
        "icon-view-grid.svg": '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
        "icon-view-list.svg": '<path d="M8 6h12M8 12h12M8 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
        "icon-sort-asc.svg": '<path d="M7 17V5"/><path d="m3 9 4-4 4 4"/><path d="M14 8h6M14 12h4M14 16h2"/>',
        "icon-sort-desc.svg": '<path d="M7 5v12"/><path d="m3 13 4 4 4-4"/><path d="M14 8h2M14 12h4M14 16h6"/>',
        "icon-page-prev.svg": '<path d="m15 6-6 6 6 6"/><path d="M20 12H9"/>',
        "icon-page-next.svg": '<path d="m9 6 6 6-6 6"/><path d="M4 12h11"/>',
        "icon-page-jump.svg": '<path d="M5 12h13"/><path d="m13 7 5 5-5 5"/><path d="M5 6v12"/>',
        "icon-filter-clear.svg": '<path d="M4 5h16l-6 7v5l-4 2v-7z"/><path d="M5 20 20 5"/>',
        "icon-filter.svg": '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
        "icon-search.svg": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/>',
        "icon-per-page.svg": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    }
    for name, body in ui.items():
        svg(f"icons/ui/{name}", body)

    code = {
        "icon-code-copy.svg": '<rect x="9" y="9" width="10" height="10" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/>',
        "icon-code-fullscreen.svg": '<path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4"/><path d="M4 4l6 6M20 4l-6 6M4 20l6-6M20 20l-6-6"/>',
        "icon-code-collapse.svg": '<path d="M8 4v6H2M16 4v6h6M8 20v-6H2M16 20v-6h6"/>',
        "icon-code-lang.svg": '<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="M13.5 5 10.5 19"/>',
        "icon-code-linenum.svg": '<path d="M4 7h1M4 12h1M4 17h1"/><path d="M9 7h11M9 12h11M9 17h8"/>',
        "icon-code-run.svg": '<path d="M8 5v14l11-7z" fill="#e0cc88" stroke="none"/>',
    }
    for name, body in code.items():
        svg(f"icons/code/{name}", body)

    common = {
        "icon-book.svg": '<path d="M4 5h7a3 3 0 0 1 3 3v12H7a3 3 0 0 1-3-3z"/><path d="M20 5h-7a3 3 0 0 0-3 3v12h7a3 3 0 0 0 3-3z"/>',
        "icon-cpu.svg": '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4" rx=".8"/><path d="M3 9h3M3 15h3M18 9h3M18 15h3M9 3v3M15 3v3M9 18v3M15 18v3"/>',
        "icon-network.svg": '<circle cx="6" cy="12" r="2"/><circle cx="18" cy="7" r="2"/><circle cx="18" cy="17" r="2"/><path d="M8 11.2 16 7.8M8 12.8l8 3.4"/>',
        "icon-code.svg": '<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="M14 5 10 19"/>',
        "icon-leaf.svg": '<path d="M5 19c9 0 14-5 14-14C10 5 5 10 5 19z"/><path d="M5 19c3-5 7-8 12-11"/>',
        "icon-award.svg": '<circle cx="12" cy="8" r="5"/><path d="m8.5 12.5-1.5 7 5-3 5 3-1.5-7"/>',
        "icon-clock.svg": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        "icon-calendar.svg": '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
        "icon-star.svg": '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
        "icon-eye.svg": '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/>',
        "icon-user.svg": '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
        "icon-home.svg": '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
        "icon-spark.svg": '<path d="M12 2v6M12 16v6M2 12h6M16 12h6"/><path d="m5 5 3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/>',
    }
    for name, body in common.items():
        svg(f"icons/common/{name}", body)


def generate_logo_and_decor() -> None:
    svg(
        "logo/logo-lydt-mark.svg",
        '''<defs><radialGradient id="g" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#e8e2cf"/><stop offset=".62" stop-color="#c0a35d"/><stop offset="1" stop-color="#263d2d"/></radialGradient></defs>
<circle cx="64" cy="64" r="54" fill="#0b211d" stroke="#e0cc88" stroke-width="2"/>
<circle cx="64" cy="64" r="43" fill="none" stroke="#9f8243" stroke-width="1.5" opacity=".75"/>
<circle cx="64" cy="64" r="32" fill="none" stroke="#b8d4e0" stroke-width="1.2" opacity=".46"/>
<path d="M64 20c5 15-15 20-3 35 9 11 25 9 29 27" fill="none" stroke="#c0a35d" stroke-width="1.5" opacity=".5"/>
<path d="M38 92c14-19 21-30 51-44" fill="none" stroke="#9cf0bd" stroke-width="1.4" opacity=".5"/>
<text x="64" y="72" text-anchor="middle" font-family="Georgia,serif" font-size="22" letter-spacing="2" fill="url(#g)" stroke="none">LYDT</text>''',
        view_box="0 0 128 128",
        stroke=GOLD,
        width=128,
        height=128,
    )
    svg(
        "logo/logo-lydt-full.svg",
        '''<defs><radialGradient id="r" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#e8e2cf"/><stop offset="1" stop-color="#c0a35d"/></radialGradient></defs>
<g transform="translate(8 8)"><circle cx="28" cy="28" r="25" fill="#0b211d" stroke="#e0cc88"/><circle cx="28" cy="28" r="18" fill="none" stroke="#9f8243" opacity=".7"/><text x="28" y="34" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="url(#r)" stroke="none">LY</text></g>
<text x="76" y="35" font-family="Noto Serif SC, serif" font-size="24" fill="#e8e2cf" stroke="none" letter-spacing="6">灵木洞天</text>
<text x="78" y="54" font-family="Georgia,serif" font-size="10" fill="#c0a35d" stroke="none" letter-spacing="3">LINGMU DONGTIAN</text>''',
        view_box="0 0 260 72",
        stroke=GOLD,
        width=260,
        height=72,
    )
    write("logo/favicon.svg", (ROOT / "logo/logo-lydt-mark.svg").read_text(encoding="utf-8"))

    svg(
        "decor/card-corner-dark-wood.svg",
        '<path d="M4 44V12a8 8 0 0 1 8-8h32"/><path d="M12 38V16a4 4 0 0 1 4-4h22"/><path d="M5 22c12-4 19-9 25-18" opacity=".4"/>',
        view_box="0 0 48 48",
        width=48,
        height=48,
    )
    svg(
        "decor/tag-jade-pill.svg",
        '<defs><linearGradient id="j" x1="0" x2="1"><stop stop-color="#4e7a68"/><stop offset=".5" stop-color="#b9d1c4"/><stop offset="1" stop-color="#4e7a68"/></linearGradient></defs><rect x="2" y="4" width="92" height="24" rx="12" fill="url(#j)" stroke="#e0cc88" opacity=".72"/><path d="M11 16h74" opacity=".3"/>',
        view_box="0 0 96 32",
        fill="none",
        width=96,
        height=32,
    )
    svg(
        "decor/side-tab-bamboo.svg",
        '<defs><linearGradient id="b" y1="0" y2="1"><stop stop-color="#62452b"/><stop offset="1" stop-color="#24180f"/></linearGradient></defs><rect x="5" y="3" width="22" height="90" rx="5" fill="url(#b)" stroke="#e0cc88"/><path d="M5 23h22M5 47h22M5 71h22" opacity=".45"/>',
        view_box="0 0 32 96",
        width=32,
        height=96,
    )
    svg(
        "decor/rune-circle.svg",
        '<circle cx="64" cy="64" r="54"/><circle cx="64" cy="64" r="40" opacity=".6"/><circle cx="64" cy="64" r="24" opacity=".4"/><path d="M64 10v14M64 104v14M10 64h14M104 64h14M26 26l10 10M92 92l10 10M102 26 92 36M36 92 26 102"/><path d="M44 64h40M64 44v40" opacity=".5"/>',
        view_box="0 0 128 128",
        width=128,
        height=128,
    )
    svg(
        "decor/glow-card-hover.svg",
        '<rect x="5" y="5" width="118" height="70" rx="12" stroke="#e0cc88" opacity=".5"/><path d="M12 28V12h18M116 52v16H98" stroke="#9cf0bd" opacity=".8"/><path d="M22 6c16 6 34 6 52 0" opacity=".35"/>',
        view_box="0 0 128 80",
        width=128,
        height=80,
    )
    svg(
        "decor/decor-hanging-scroll-blank.svg",
        '<defs><linearGradient id="p" y1="0" y2="1"><stop stop-color="#f0e5c9"/><stop offset="1" stop-color="#b8a67e"/></linearGradient></defs><path d="M16 14h64M16 114h64" stroke="#62452b" stroke-width="8"/><rect x="22" y="18" width="52" height="92" rx="5" fill="url(#p)" stroke="#9f8243"/><path d="M30 28c10 3 24 1 36 4M30 99c9-4 24-2 34-5" opacity=".35"/><path d="M48 4v12M48 114v12"/>',
        view_box="0 0 96 128",
        width=96,
        height=128,
    )
    svg(
        "decor/decor-wood-sign-horizontal.svg",
        '<defs><linearGradient id="w" y1="0" y2="1"><stop stop-color="#62452b"/><stop offset="1" stop-color="#24180f"/></linearGradient></defs><path d="M18 16h108l10 20-10 20H18L8 36z" fill="url(#w)" stroke="#e0cc88"/><path d="M28 28h88M26 43h92" opacity=".25"/><circle cx="26" cy="36" r="2" fill="#e0cc88" stroke="none"/><circle cx="118" cy="36" r="2" fill="#e0cc88" stroke="none"/>',
        view_box="0 0 144 72",
        width=144,
        height=72,
    )
    svg(
        "decor/decor-wood-sign-vertical.svg",
        '<defs><linearGradient id="w" x1="0" x2="1"><stop stop-color="#24180f"/><stop offset=".5" stop-color="#62452b"/><stop offset="1" stop-color="#24180f"/></linearGradient></defs><path d="M18 12h52l8 12v104l-8 12H18l-8-12V24z" fill="url(#w)" stroke="#e0cc88"/><path d="M28 28v90M47 28v90M62 28v90" opacity=".2"/><path d="M44 2v15"/>',
        view_box="0 0 88 148",
        width=88,
        height=148,
    )

    svg(
        "timeline/timeline-ring-center-lydt.svg",
        '<defs><radialGradient id="c" cx="50%" cy="50%" r="60%"><stop stop-color="#e8e2cf"/><stop offset=".55" stop-color="#c0a35d"/><stop offset="1" stop-color="#263d2d"/></radialGradient></defs><circle cx="64" cy="64" r="56" fill="#0b211d" stroke="#e0cc88" stroke-width="2"/><circle cx="64" cy="64" r="45"/><circle cx="64" cy="64" r="33" opacity=".6"/><circle cx="64" cy="64" r="22" opacity=".45"/><path d="M64 8v16M64 104v16M8 64h16M104 64h16"/><text x="64" y="72" text-anchor="middle" font-family="Georgia,serif" font-size="20" letter-spacing="2" fill="url(#c)" stroke="none">LYDT</text>',
        view_box="0 0 128 128",
        width=128,
        height=128,
    )


def generate_project_detail_vectors() -> None:
    svg(
        "project-detail/diagram-triton-cuda.svg",
        '''<defs>
<radialGradient id="core" cx="50%" cy="45%" r="55%"><stop stop-color="#c9ffd9"/><stop offset=".35" stop-color="#55b994"/><stop offset="1" stop-color="#0b211d"/></radialGradient>
<linearGradient id="panel" y1="0" y2="1"><stop stop-color="#12352e"/><stop offset="1" stop-color="#071714"/></linearGradient>
<filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect x="6" y="8" width="612" height="328" rx="22" fill="#071714" stroke="#9f8243" opacity=".96"/>
<path d="M36 274c70-70 140-70 210-14s142 54 240-20" fill="none" stroke="#9cf0bd" opacity=".18" stroke-width="16"/>
<g transform="translate(54 58)"><rect width="164" height="180" rx="14" fill="url(#panel)" stroke="#e0cc88" opacity=".82"/><path d="M18 38h96M18 66h126M18 94h82M18 122h116" opacity=".6"/><circle cx="27" cy="24" r="3" fill="#9cf0bd" stroke="none"/><path d="M20 153h124" opacity=".35"/></g>
<g transform="translate(406 58)"><rect width="164" height="180" rx="14" fill="url(#panel)" stroke="#e0cc88" opacity=".82"/><path d="M18 38h116M18 66h96M18 94h126M18 122h70" opacity=".6"/><circle cx="27" cy="24" r="3" fill="#ddb87a" stroke="none"/><path d="M20 153h124" opacity=".35"/></g>
<g filter="url(#glow)"><path d="M312 78 238 122v87l74 44 74-44v-87z" fill="url(#core)" stroke="#c9ffd9"/><path d="M312 78v175M238 122l74 44 74-44" fill="none" stroke="#e8e2cf" opacity=".45"/></g>
<path d="M218 148h46M360 148h46M218 194h50M356 194h50" stroke="#9cf0bd" opacity=".8"/>
<g opacity=".9"><rect x="96" y="262" width="432" height="40" rx="20" fill="#0f2a25" stroke="#9f8243"/><path d="M133 282h88M268 282h88M403 282h88"/><circle cx="114" cy="282" r="4" fill="#e0cc88" stroke="none"/><circle cx="249" cy="282" r="4" fill="#9cf0bd" stroke="none"/><circle cx="384" cy="282" r="4" fill="#b8d4e0" stroke="none"/></g>''',
        view_box="0 0 624 344",
        width=624,
        height=344,
    )
    for name, body in {
        "panel-code-triton.svg": '<rect x="4" y="4" width="184" height="116" rx="12" fill="#0b211d" stroke="#e0cc88"/><path d="M18 26h92M18 48h132M18 70h70M18 92h114"/><circle cx="158" cy="26" r="5" fill="#9cf0bd" stroke="none"/>',
        "panel-code-cuda.svg": '<rect x="4" y="4" width="184" height="116" rx="12" fill="#0b211d" stroke="#e0cc88"/><path d="M18 26h112M18 48h90M18 70h130M18 92h78"/><circle cx="158" cy="26" r="5" fill="#ddb87a" stroke="none"/>',
        "rune-circle-lab.svg": '<circle cx="64" cy="64" r="52"/><circle cx="64" cy="64" r="36" opacity=".55"/><path d="M64 16v96M16 64h96M30 30l68 68M98 30 30 98" opacity=".55"/><path d="M46 64a18 18 0 1 0 36 0 18 18 0 1 0-36 0"/>',
        "project-motivation-card.svg": '<rect x="4" y="4" width="216" height="124" rx="14" fill="#f0e5c9" stroke="#9f8243"/><path d="M22 88c28-42 56-52 88-24s56 18 86-20" fill="none" stroke="#4a321d" opacity=".45"/><path d="M30 100h156" opacity=".3"/><circle cx="174" cy="42" r="16" fill="#ddb87a" opacity=".18" stroke="#9f8243"/>',
    }.items():
        svg(f"project-detail/{name}", body, view_box="0 0 224 132" if name == "project-motivation-card.svg" else "0 0 192 124" if name.startswith("panel") else "0 0 128 128")

    feature_icons = {
        "feature-book.svg": '<path d="M20 22h30a13 13 0 0 1 13 13v55H33a13 13 0 0 1-13-13z"/><path d="M108 22H76a13 13 0 0 0-13 13v55h32a13 13 0 0 0 13-13z"/><path d="M40 42h16M40 58h14M82 42h18M82 58h14"/>',
        "feature-code.svg": '<path d="M43 48 24 64l19 16"/><path d="m85 48 19 16-19 16"/><path d="M73 30 55 98"/><rect x="14" y="18" width="100" height="92" rx="14" opacity=".35"/>',
        "feature-gauge.svg": '<path d="M28 88a40 40 0 1 1 72 0"/><path d="m64 88 24-36"/><path d="M36 88h56"/><circle cx="64" cy="88" r="4" fill="#e0cc88" stroke="none"/>',
        "feature-tools.svg": '<path d="M75 30a22 22 0 0 0 22 28L58 97a12 12 0 0 1-17-17l39-39a22 22 0 0 1-5-11z"/><path d="M26 34l24 24"/><path d="M20 28l12-12 30 30-12 12z" opacity=".45"/>',
    }
    for name, body in feature_icons.items():
        svg(f"project-detail/{name}", body, view_box="0 0 128 128", width=128, height=128)


def generate_scene_vectors() -> None:
    svg(
        "scene/lantern-body.svg",
        '<defs><linearGradient id="l" y1="0" y2="1"><stop stop-color="#f0c989"/><stop offset=".45" stop-color="#ddb87a"/><stop offset="1" stop-color="#7a2f26"/></linearGradient></defs><path d="M48 6v18"/><path d="M24 30h48"/><path d="M28 36c4-9 36-9 40 0v44c-4 12-36 12-40 0z" fill="url(#l)" stroke="#e0cc88"/><path d="M34 38v40M48 34v50M62 38v40" opacity=".35"/><path d="M30 84h36M38 96h20"/><path d="M48 96v18"/>',
        view_box="0 0 96 120",
        width=96,
        height=120,
    )
    svg(
        "scene/lantern-glow.svg",
        '<defs><radialGradient id="g" cx="50%" cy="45%" r="50%"><stop stop-color="#f0c989" stop-opacity=".72"/><stop offset=".45" stop-color="#ddb87a" stop-opacity=".2"/><stop offset="1" stop-color="#ddb87a" stop-opacity="0"/></radialGradient></defs><circle cx="80" cy="80" r="76" fill="url(#g)" stroke="none"/>',
        view_box="0 0 160 160",
        stroke="none",
        width=160,
        height=160,
    )
    svg(
        "scene/bookshelf.svg",
        '<defs><linearGradient id="w" y1="0" y2="1"><stop stop-color="#4a321d"/><stop offset="1" stop-color="#160f0a"/></linearGradient></defs><rect x="8" y="12" width="176" height="104" rx="8" fill="url(#w)" stroke="#9f8243"/><path d="M18 46h156M18 82h156"/><rect x="28" y="24" width="12" height="22" fill="#b8a67e" stroke="#e0cc88"/><rect x="43" y="21" width="10" height="25" fill="#263d2d" stroke="#e0cc88"/><rect x="58" y="26" width="14" height="20" fill="#7a2f26" stroke="#e0cc88"/><rect x="92" y="58" width="48" height="10" rx="4"/><rect x="40" y="92" width="70" height="10" rx="4"/><circle cx="150" cy="64" r="8" fill="#ddb87a" opacity=".2"/>',
        view_box="0 0 192 128",
        width=192,
        height=128,
    )
    svg(
        "scene/book-pile.svg",
        '<rect x="18" y="70" width="92" height="14" rx="3" fill="#62452b" stroke="#e0cc88"/><rect x="26" y="54" width="80" height="14" rx="3" fill="#263d2d" stroke="#e0cc88"/><rect x="12" y="38" width="96" height="14" rx="3" fill="#7a2f26" stroke="#e0cc88"/><path d="M30 45h55M38 61h44M32 77h60" opacity=".45"/>',
        view_box="0 0 128 96",
        width=128,
        height=96,
    )
    svg(
        "scene/scroll-stack.svg",
        '<path d="M18 28h90c8 0 8 14 0 14H18c-8 0-8-14 0-14z" fill="#f0e5c9" stroke="#9f8243"/><path d="M28 48h76c8 0 8 14 0 14H28c-8 0-8-14 0-14z" fill="#d8c7a2" stroke="#9f8243"/><path d="M18 68h90c8 0 8 14 0 14H18c-8 0-8-14 0-14z" fill="#f0e5c9" stroke="#9f8243"/><path d="M30 35h60M40 55h48M30 75h60" opacity=".36"/>',
        view_box="0 0 128 108",
        width=128,
        height=108,
    )
    svg(
        "scene/tree-root-foreground-left.svg",
        '<path d="M6 0c28 34 34 70 18 128H0V0z" fill="#071714" stroke="#263d2d"/><path d="M30 24c22 26 42 32 88 28"/><path d="M22 72c30 12 47 28 60 54"/><path d="M18 104c23-4 43 2 63 18"/>',
        view_box="0 0 128 128",
        stroke="#263d2d",
        fill="none",
        width=128,
        height=128,
    )
    svg(
        "scene/tree-root-foreground-right.svg",
        '<path d="M122 0c-28 34-34 70-18 128h24V0z" fill="#071714" stroke="#263d2d"/><path d="M98 20C72 42 54 46 16 42"/><path d="M106 76C78 84 55 104 48 126"/><path d="M111 104c-23-4-43 2-63 18"/>',
        view_box="0 0 128 128",
        stroke="#263d2d",
        fill="none",
        width=128,
        height=128,
    )


# ---------- Raster asset helpers ----------

def radial_gradient(size: tuple[int, int], colors: Sequence[tuple[float, tuple[int, int, int, int]]], center: tuple[float, float] = (0.5, 0.5), radius: float = 0.7) -> Image.Image:
    w, h = size
    img = Image.new("RGBA", size)
    px = img.load()
    cx, cy = center[0] * w, center[1] * h
    max_r = radius * max(w, h)
    stops = sorted(colors, key=lambda x: x[0])
    for y in range(h):
        for x in range(w):
            t = min(1.0, math.hypot(x - cx, y - cy) / max_r)
            for i in range(len(stops) - 1):
                if stops[i][0] <= t <= stops[i + 1][0]:
                    a, ca = stops[i]
                    b, cb = stops[i + 1]
                    f = 0 if b == a else (t - a) / (b - a)
                    c = tuple(int(ca[j] * (1 - f) + cb[j] * f) for j in range(4))
                    px[x, y] = c
                    break
            else:
                px[x, y] = stops[-1][1]
    return img


def add_noise(img: Image.Image, opacity: int = 18) -> Image.Image:
    noise = Image.effect_noise(img.size, 48).convert("L")
    alpha = Image.new("L", img.size, opacity)
    noise_rgba = Image.merge("RGBA", [noise, noise, noise, alpha])
    return Image.alpha_composite(img, noise_rgba)


def draw_mountains(draw: ImageDraw.ImageDraw, w: int, h: int, base_y: int, layers: int, seed: int, colors: Sequence[tuple[int, int, int, int]]) -> None:
    rng = random.Random(seed)
    for layer in range(layers):
        y = base_y + layer * int(h * 0.06)
        pts = [(0, h)]
        x = 0
        while x <= w:
            peak = y - rng.randint(int(h * 0.08), int(h * 0.23)) + layer * 24
            pts.append((x, peak))
            x += rng.randint(int(w * 0.08), int(w * 0.16))
        pts += [(w, h)]
        draw.polygon(pts, fill=colors[min(layer, len(colors)-1)])


def draw_fireflies(draw: ImageDraw.ImageDraw, count: int, w: int, h: int, seed: int) -> None:
    rng = random.Random(seed)
    for _ in range(count):
        x = rng.randint(40, w-40)
        y = rng.randint(40, h-40)
        r = rng.randint(2, 5)
        draw.ellipse((x-r*3, y-r*3, x+r*3, y+r*3), fill=(221, 184, 122, 18))
        draw.ellipse((x-r, y-r, x+r, y+r), fill=(224, 204, 136, 170))


def save_png(img: Image.Image, rel: str, prompt: str, kind: str) -> None:
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path)
    meta(path, prompt, kind)


def generate_fog_and_glow() -> None:
    rng = random.Random(42)
    for idx, alpha in enumerate([42, 30, 22], start=1):
        w, h = 2400, 800
        base = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        d = ImageDraw.Draw(base, "RGBA")
        for _ in range(34 + idx * 8):
            x = rng.randint(-200, w)
            y = rng.randint(int(h * 0.15), int(h * 0.92))
            rx = rng.randint(180, 520)
            ry = rng.randint(36, 130)
            col = (184, 212, 224, rng.randint(5, alpha))
            d.ellipse((x-rx, y-ry, x+rx, y+ry), fill=col)
        base = base.filter(ImageFilter.GaussianBlur(28 + idx * 12))
        save_png(base, f"texture/texture-mist-layer-0{idx}.png", f"transparent drifting mist layer {idx}, moonlit ink green atmosphere", "transparent atmosphere layer")
        save_png(base, f"scene/fog-layer-0{idx}.png", f"transparent drifting mist layer {idx}, reusable foreground fog", "transparent scene layer")

    moon = radial_gradient((1200, 900), [(0, (214, 229, 236, 150)), (.38, (184, 212, 224, 46)), (1, (184, 212, 224, 0))], center=(.45, .34), radius=.72)
    save_png(moon, "texture/texture-moonlight-mask.png", "cool moonlight alpha mask for circular window and desk scenes", "alpha light mask")
    save_png(moon, "fx/fx-glow-moon.png", "soft cool moon glow reusable radial light", "glow")
    lantern = radial_gradient((900, 900), [(0, (240, 201, 137, 160)), (.3, (221, 184, 122, 58)), (1, (221, 184, 122, 0))], center=(.5, .5), radius=.65)
    save_png(lantern, "fx/fx-glow-lantern.png", "warm lantern radial glow reusable alpha", "glow")

    for i, size in enumerate([96, 128, 72], start=1):
        img = radial_gradient((size, size), [(0, (201, 255, 217, 235)), (.28, (156, 240, 189, 110)), (1, (156, 240, 189, 0))], radius=.6)
        save_png(img, f"fx/firefly-small-0{i}.png", f"small firefly particle variant {i}", "particle")
    large = radial_gradient((220, 220), [(0, (224, 204, 136, 255)), (.18, (201, 255, 217, 170)), (.6, (156, 240, 189, 44)), (1, (156, 240, 189, 0))], radius=.62)
    save_png(large, "fx/firefly-large-guide.png", "large guide firefly for 404 hint and hidden entrance", "particle")


def generate_moon_windows() -> None:
    specs = [
        ("moon-window-stair.png", "warm stair forest moon window scene", 4, "stair"),
        ("moon-window-full-moon.png", "huge full moon above cloud sea and distant mountains", 8, "full"),
        ("moon-window-night-mountain.png", "distant night mountain circular window with bamboo silhouettes", 13, "mountain"),
    ]
    for name, prompt, seed, mode in specs:
        size = 1200
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        circle = Image.new("L", (size, size), 0)
        cd = ImageDraw.Draw(circle)
        cd.ellipse((40, 40, size-40, size-40), fill=255)
        bg = radial_gradient((size, size), [(0, (32, 58, 51, 255)), (.48, (11, 33, 29, 255)), (1, (7, 23, 20, 255))], center=(.5, .35), radius=.7)
        d = ImageDraw.Draw(bg, "RGBA")
        if mode == "full":
            d.ellipse((365, 130, 835, 600), fill=(214, 229, 236, 170), outline=(224, 204, 136, 100), width=5)
            d.ellipse((420, 190, 520, 290), fill=(184, 212, 224, 24))
            for y in [620, 680, 742]:
                for x in range(-100, size, 170):
                    d.ellipse((x, y-60, x+310, y+60), fill=(214, 229, 236, 30))
            draw_mountains(d, size, size, 760, 3, seed, [(9, 28, 27, 205), (15, 47, 42, 170), (32, 58, 51, 145)])
        elif mode == "stair":
            d.ellipse((770, 210, 940, 380), fill=(240, 201, 137, 70))
            draw_mountains(d, size, size, 760, 3, seed, [(8, 24, 20, 210), (18, 55, 46, 180), (38, 74, 58, 150)])
            # stairs
            for i in range(14):
                y = 930 - i * 42
                x0 = 420 + i * 8
                x1 = 780 - i * 8
                d.rounded_rectangle((x0, y, x1, y + 22), radius=5, fill=(78, 54, 34, 150), outline=(224, 204, 136, 55), width=2)
            for x in [320, 860]:
                d.line((x, 300, x-70 if x > 500 else x+70, 1010), fill=(7, 23, 20, 205), width=28)
                for b in range(8):
                    yy = 360 + b * 70
                    d.line((x, yy, x + (-90 if x > 500 else 90), yy+30), fill=(13, 40, 34, 180), width=12)
            draw_fireflies(d, 30, size, size, seed)
        else:
            d.ellipse((690, 180, 890, 380), fill=(214, 229, 236, 92), outline=(224, 204, 136, 72), width=3)
            draw_mountains(d, size, size, 730, 4, seed, [(8, 24, 23, 225), (18, 45, 42, 185), (37, 61, 56, 145), (70, 88, 78, 100)])
            # bamboo silhouettes
            for x in [180, 220, 980, 1020]:
                d.line((x, 190, x + random.Random(seed + x).randint(-35, 35), 1040), fill=(7, 23, 20, 205), width=10)
                for j in range(7):
                    y = 250 + j*90
                    d.line((x, y, x + (45 if x < 600 else -45), y+22), fill=(7, 23, 20, 160), width=5)
            draw_fireflies(d, 16, size, size, seed)
        # paper-like subtle vignette
        bg = add_noise(bg, 9)
        img.paste(bg, (0, 0), circle)
        frame = ImageDraw.Draw(img, "RGBA")
        frame.ellipse((40, 40, size-40, size-40), outline=(224, 204, 136, 160), width=8)
        frame.ellipse((70, 70, size-70, size-70), outline=(159, 130, 67, 100), width=4)
        save_png(img, f"scene/{name}", prompt, "moon window circular scene")


def draw_root_asset(rel: str, side: str) -> None:
    w, h = 900, 1200
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img, "RGBA")
    rng = random.Random(91 if side == "left" else 92)
    if side == "left":
        trunk = [(0, 0), (210, 0), (300, 260), (230, 540), (310, 830), (190, 1200), (0, 1200)]
        branch_start_x = 170
        direction = 1
    elif side == "right":
        trunk = [(900, 0), (690, 0), (600, 260), (670, 540), (590, 830), (710, 1200), (900, 1200)]
        branch_start_x = 730
        direction = -1
    else:
        trunk = [(0, 0), (900, 0), (900, 210), (650, 180), (450, 260), (220, 160), (0, 220)]
        branch_start_x = 450
        direction = 1
    d.polygon(trunk, fill=(5, 14, 13, 235), outline=(38, 61, 45, 140))
    for _ in range(14):
        if side == "top":
            x0 = rng.randint(0, w)
            y0 = rng.randint(20, 190)
            x1 = x0 + rng.randint(-220, 220)
            y1 = y0 + rng.randint(120, 340)
        else:
            y0 = rng.randint(80, h - 120)
            x0 = branch_start_x + rng.randint(-45, 45)
            x1 = x0 + direction * rng.randint(130, 520)
            y1 = y0 + rng.randint(-120, 200)
        d.line((x0, y0, x1, y1), fill=(7, 23, 20, 210), width=rng.randint(18, 42))
        d.line((x0, y0, x1, y1), fill=(51, 81, 58, 70), width=rng.randint(3, 8))
        # moss spots
        for __ in range(3):
            mx = int(x0 * .6 + x1 * .4) + rng.randint(-40, 40)
            my = int(y0 * .6 + y1 * .4) + rng.randint(-40, 40)
            d.ellipse((mx-10, my-5, mx+20, my+10), fill=(69, 108, 78, 70))
    img = img.filter(ImageFilter.GaussianBlur(.45))
    save_png(img, rel, f"transparent {side} tree root foreground occluder", "transparent foreground layer")


def generate_scene_rasters() -> None:
    generate_fog_and_glow()
    generate_moon_windows()
    draw_root_asset("scene/tree-root-foreground-left.png", "left")
    draw_root_asset("scene/tree-root-foreground-right.png", "right")
    draw_root_asset("scene/tree-root-foreground-top.png", "top")

    # transparent desk/tea component
    w, h = 1000, 520
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img, "RGBA")
    d.rounded_rectangle((120, 320, 880, 410), radius=36, fill=(36, 24, 15, 238), outline=(159, 130, 67, 120), width=4)
    d.polygon([(160, 390), (250, 390), (210, 510), (120, 510)], fill=(22, 15, 10, 220))
    d.polygon([(750, 390), (840, 390), (900, 510), (810, 510)], fill=(22, 15, 10, 220))
    d.ellipse((460, 240, 580, 330), fill=(30, 65, 50, 210), outline=(224, 204, 136, 130), width=3)
    d.ellipse((492, 220, 548, 270), fill=(13, 40, 34, 230), outline=(224, 204, 136, 120), width=3)
    d.arc((390, 180, 640, 330), 200, 338, fill=(184, 212, 224, 85), width=5)
    d.rounded_rectangle((245, 260, 420, 320), radius=14, fill=(216, 199, 162, 210), outline=(159, 130, 67, 120), width=2)
    d.line((270, 286, 385, 286), fill=(74, 50, 29, 80), width=3)
    d.ellipse((660, 278, 755, 338), fill=(122, 47, 38, 190), outline=(224, 204, 136, 115), width=3)
    save_png(img, "scene/desk-tea-alpha.png", "transparent tea desk component with tea cup scroll and small incense", "transparent scene component")

    # transparent resume scroll/desk component
    img = Image.new("RGBA", (1100, 560), (0, 0, 0, 0))
    d = ImageDraw.Draw(img, "RGBA")
    d.rounded_rectangle((90, 360, 1010, 450), radius=38, fill=(36, 24, 15, 238), outline=(159, 130, 67, 130), width=4)
    d.rounded_rectangle((260, 140, 840, 382), radius=24, fill=(240, 229, 201, 232), outline=(159, 130, 67, 150), width=4)
    d.ellipse((220, 150, 300, 380), fill=(216, 199, 162, 236), outline=(159, 130, 67, 150), width=4)
    d.ellipse((800, 150, 880, 380), fill=(216, 199, 162, 236), outline=(159, 130, 67, 150), width=4)
    for y in [200, 238, 276, 314]:
        d.line((340, y, 760, y), fill=(74, 50, 29, 58), width=3)
    d.ellipse((150, 305, 240, 365), fill=(30, 65, 50, 205), outline=(224, 204, 136, 110), width=3)
    save_png(img, "scene/desk-resume-scroll-alpha.png", "transparent desk with open resume scroll component", "transparent scene component")


def generate_paper_and_wood_pngs() -> None:
    # paper 9-slice PNG with worn border
    w, h = 512, 384
    img = Image.new("RGBA", (w, h), (240, 229, 201, 238))
    img = add_noise(img, 14)
    d = ImageDraw.Draw(img, "RGBA")
    rng = random.Random(12)
    # irregular edge
    for i in range(180):
        x = rng.randint(0, w)
        y = rng.choice([rng.randint(0, 22), rng.randint(h-32, h-1)])
        r = rng.randint(2, 9)
        d.ellipse((x-r, y-r, x+r, y+r), fill=(74, 50, 29, rng.randint(10, 28)))
    d.rounded_rectangle((18, 18, w-18, h-18), radius=18, outline=(74, 50, 29, 120), width=3)
    d.rounded_rectangle((36, 36, w-36, h-36), radius=12, outline=(159, 130, 67, 55), width=2)
    save_png(img, "decor/card-border-paper-9s_t56r56b80l56.png", "rice paper card 9-slice border with aged edge", "9-slice card skin")

    w, h = 512, 320
    img = Image.new("RGBA", (w, h), (11, 33, 29, 238))
    img = add_noise(img, 12)
    d = ImageDraw.Draw(img, "RGBA")
    d.rounded_rectangle((16, 16, w-16, h-16), radius=18, outline=(224, 204, 136, 90), width=3)
    d.rounded_rectangle((42, 42, w-42, h-42), radius=8, outline=(159, 130, 67, 45), width=2)
    for y in range(48, h-40, 28):
        d.line((42, y, w-42, y+rng.randint(-6,6)), fill=(98, 69, 43, 32), width=3)
    save_png(img, "decor/card-border-dark-wood-9s_t48r48b48l48.png", "dark wood 9-slice border with gold corner lines", "9-slice card skin")


def generate_thumbnails() -> None:
    def thumb(size: tuple[int, int], seed: int, motif: str) -> Image.Image:
        w, h = size
        img = radial_gradient((w, h), [(0, (38, 74, 58, 255)), (.55, (11, 33, 29, 255)), (1, (7, 23, 20, 255))], center=(.58, .38), radius=.85)
        d = ImageDraw.Draw(img, "RGBA")
        draw_mountains(d, w, h, int(h*.78), 3, seed, [(6, 18, 17, 230), (15, 44, 38, 180), (38, 74, 58, 120)])
        rng = random.Random(seed)
        # faint grid/stars
        for _ in range(35):
            x, y = rng.randint(20, w-20), rng.randint(20, int(h*.72))
            d.ellipse((x-2, y-2, x+2, y+2), fill=(224, 204, 136, rng.randint(25, 115)))
        cx, cy = int(w*.52), int(h*.48)
        if motif == "kvcache":
            for r in [120, 90, 60]:
                d.ellipse((cx-r, cy-r*.45, cx+r, cy+r*.45), outline=(224, 204, 136, 110), width=4)
            for i in range(7):
                x = cx - 210 + i*70
                d.ellipse((x-16, cy+70-16, x+16, cy+70+16), fill=(221, 184, 122, 110), outline=(224, 204, 136, 150), width=2)
        elif motif == "flash":
            for i in range(5):
                y = int(h*.25 + i*h*.09)
                d.arc((int(w*.15), y, int(w*.88), y+180), 190, 350, fill=(156, 240, 189, 80+i*15), width=8)
            d.polygon([(cx-20, cy-130), (cx+50, cy-10), (cx+8, cy-10), (cx+22, cy+120), (cx-55, cy-20), (cx-12, cy-18)], fill=(224, 204, 136, 130))
        elif motif == "quant":
            d.pieslice((cx-150, cy-150, cx+150, cy+150), 90, 270, fill=(224, 204, 136, 62), outline=(224, 204, 136, 150), width=4)
            d.pieslice((cx-150, cy-150, cx+150, cy+150), -90, 90, fill=(156, 240, 189, 54), outline=(156, 240, 189, 135), width=4)
            d.line((cx, cy-150, cx, cy+150), fill=(214, 229, 236, 120), width=5)
        elif motif == "compiler":
            for i in range(4):
                scale = 1 - i*.14
                x0 = cx - int(180*scale)
                y0 = cy - int(105*scale) + i*24
                x1 = cx + int(180*scale)
                y1 = cy + int(105*scale) + i*24
                d.rounded_rectangle((x0, y0, x1, y1), radius=18, outline=(224, 204, 136, 120-i*12), width=4)
            d.line((cx-120, cy+5, cx+120, cy+5), fill=(156, 240, 189, 100), width=5)
        elif motif == "triton-cuda":
            # cube + two panels
            d.rounded_rectangle((int(w*.11), int(h*.27), int(w*.34), int(h*.70)), radius=18, fill=(7, 23, 20, 178), outline=(224, 204, 136, 120), width=3)
            d.rounded_rectangle((int(w*.66), int(h*.27), int(w*.89), int(h*.70)), radius=18, fill=(7, 23, 20, 178), outline=(224, 204, 136, 120), width=3)
            for xoff in [.15, .70]:
                for j in range(4):
                    y = int(h*(.36 + j*.08))
                    d.line((int(w*xoff), y, int(w*(xoff+.13)), y), fill=(214, 229, 236, 70), width=4)
            r=90
            pts=[(cx,cy-r),(cx+r,cy-r//2),(cx+r,cy+r//2),(cx,cy+r),(cx-r,cy+r//2),(cx-r,cy-r//2)]
            d.polygon(pts, fill=(156,240,189,82), outline=(201,255,217,160))
            d.line((cx,cy-r,cx,cy+r), fill=(224,204,136,120), width=3)
        elif motif == "allreduce":
            nodes=[]
            R=min(w,h)*.22
            for i in range(8):
                ang=2*math.pi*i/8
                x=cx+int(math.cos(ang)*R); y=cy+int(math.sin(ang)*R)
                nodes.append((x,y))
            for i,(x,y) in enumerate(nodes):
                x2,y2=nodes[(i+1)%len(nodes)]
                d.line((x,y,x2,y2), fill=(156,240,189,110), width=5)
                d.ellipse((x-12,y-12,x+12,y+12), fill=(224,204,136,130), outline=(201,255,217,160), width=2)
        elif motif == "compile":
            for i in range(3):
                x = int(w*(.28+i*.18))
                d.rounded_rectangle((x-60, cy-105, x+60, cy+105), radius=22, fill=(7,23,20,140), outline=(224,204,136,115), width=4)
                d.arc((x-36,cy-36,x+36,cy+36), 20, 320, fill=(156,240,189,80), width=4)
        elif motif == "zero":
            for i in range(7):
                x = int(w*.23 + i*w*.08)
                y = cy + (i%2)*20
                d.rounded_rectangle((x, y-78, x+70, y+78), radius=12, fill=(240,229,201,52), outline=(224,204,136,95), width=3)
            d.arc((int(w*.18), cy-130, int(w*.82), cy+130), 190, 350, fill=(156,240,189,110), width=6)
        elif motif == "network":
            nodes=[]
            for i in range(10):
                x=rng.randint(int(w*.2), int(w*.8)); y=rng.randint(int(h*.22), int(h*.68)); nodes.append((x,y))
            for a,b in zip(nodes,nodes[1:]): d.line((*a,*b), fill=(156,240,189,75), width=4)
            for x,y in nodes: d.ellipse((x-10,y-10,x+10,y+10), fill=(224,204,136,125), outline=(201,255,217,145), width=2)
        else:
            d.ellipse((cx-120,cy-120,cx+120,cy+120), outline=(224,204,136,130), width=5)
        img = add_noise(img, 8)
        # Thumbnails are cover art, not cutouts. Keep them opaque so cards never inherit
        # unexpected transparency from semi-transparent ink strokes.
        img.putalpha(255)
        return img

    blog_specs = [
        ("blog-ink-kvcache.png", "kvcache", 111, "KV Cache and inference acceleration: ancient well and ordered floating lights"),
        ("blog-ink-flash-attention.png", "flash", 112, "Flash Attention mathematical derivation: ink tide and lightning glyph"),
        ("blog-ink-quantization.png", "quant", 113, "quantization and precision loss: jade ring split in two"),
        ("blog-ink-compiler-ir.png", "compiler", 114, "compiler and IR history: deep archive perspective gates"),
    ]
    for file, motif, seed, prompt in blog_specs:
        save_png(thumb((640, 360), seed, motif), f"thumbnails/blog/{file}", prompt, "blog ink thumbnail")

    project_specs = [
        ("project-triton-cuda-core.png", "triton-cuda", 121, "Triton and CUDA core principles project cover, cube and code tablets"),
        ("project-allreduce-nccl.png", "allreduce", 122, "AllReduce NCCL communication route project cover, ring waves and nodes"),
        ("project-torch-compile-fx.png", "compile", 123, "TorchScript FX compile project cover, triple gates and graph paths"),
        ("project-zero-sharding.png", "zero", 124, "ZeRO parameter sharding project cover, split pages gather flow"),
    ]
    for file, motif, seed, prompt in project_specs:
        save_png(thumb((1200, 675), seed, motif), f"thumbnails/projects/{file}", prompt, "project thumbnail")


def main() -> None:
    ensure_dirs()
    generate_icons()
    generate_logo_and_decor()
    generate_project_detail_vectors()
    generate_scene_vectors()
    generate_scene_rasters()
    generate_paper_and_wood_pngs()
    generate_thumbnails()
    print(f"Generated LYDT asset pack under {ROOT}")


if __name__ == "__main__":
    main()
