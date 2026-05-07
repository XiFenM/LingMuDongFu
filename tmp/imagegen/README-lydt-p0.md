# LYDT P0 image generation

These prompt batches were prepared from:

- `灵木洞天个人主页prd.md`
- `design/prompt-reference.md`
- `design/灵木洞天网页落地美术素材需求文档.md`
- `design/灵木洞天设计系统tokens与组件库规范.md`
- `design/灵木洞天常规主站ui设计拆分.md`
- `design/pages/*.png`

The prompt set targets the P0 raster assets that are appropriate for `gpt-image-2`:

- `bg`: 7 reusable/page hero backgrounds
- `texture`: 4 global background/card textures
- `thumbnails`: 6 project covers and 2 blog featured illustrations
- `fx`: chroma-key firefly source images
- `resume`: generic avatar illustration placeholder

Assets such as Logo SVG, social icons, category icons, certificate icons, jade tags, paper/card borders, and divider lines should be implemented as SVG/CSS assets for precision and scalability, then stored under `public/assets/lydt/logo`, `decor`, and `icons`.

Dry-run validation:

```bash
python3 /root/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch --input tmp/imagegen/lydt-p0-bg.jsonl --out-dir public/assets/lydt/bg --model gpt-image-2 --dry-run
python3 /root/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch --input tmp/imagegen/lydt-p0-texture.jsonl --out-dir public/assets/lydt/texture --model gpt-image-2 --dry-run
python3 /root/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch --input tmp/imagegen/lydt-p0-project-thumbnails.jsonl --out-dir public/assets/lydt/thumbnails --model gpt-image-2 --dry-run
python3 /root/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch --input tmp/imagegen/lydt-p0-blog-illustrations.jsonl --out-dir public/assets/lydt/thumbnails --model gpt-image-2 --dry-run
python3 /root/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch --input tmp/imagegen/lydt-p0-fx-resume.jsonl --out-dir tmp/imagegen/lydt-p0-fx-resume --model gpt-image-2 --dry-run
```

Live generation requires `OPENAI_API_KEY`, the `openai` Python package, and network access:

```bash
python3 /root/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch --input tmp/imagegen/lydt-p0-bg.jsonl --out-dir public/assets/lydt/bg --model gpt-image-2 --concurrency 2 --max-attempts 3
python3 /root/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch --input tmp/imagegen/lydt-p0-texture.jsonl --out-dir public/assets/lydt/texture --model gpt-image-2 --concurrency 2 --max-attempts 3
python3 /root/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch --input tmp/imagegen/lydt-p0-project-thumbnails.jsonl --out-dir public/assets/lydt/thumbnails --model gpt-image-2 --concurrency 2 --max-attempts 3
python3 /root/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch --input tmp/imagegen/lydt-p0-blog-illustrations.jsonl --out-dir public/assets/lydt/thumbnails --model gpt-image-2 --concurrency 2 --max-attempts 3
python3 /root/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch --input tmp/imagegen/lydt-p0-fx-resume.jsonl --out-dir tmp/imagegen/lydt-p0-fx-resume --model gpt-image-2 --concurrency 2 --max-attempts 3
```

After live generation, remove the magenta chroma key for the firefly assets:

```bash
python3 /root/.codex/skills/.system/imagegen/scripts/remove_chroma_key.py --input tmp/imagegen/lydt-p0-fx-resume/firefly-small-sprite-chroma.png --out public/assets/lydt/fx/firefly-small-sprite.png --auto-key border --soft-matte --transparent-threshold 12 --opaque-threshold 220 --despill
python3 /root/.codex/skills/.system/imagegen/scripts/remove_chroma_key.py --input tmp/imagegen/lydt-p0-fx-resume/firefly-large-guide-chroma.png --out public/assets/lydt/fx/firefly-large-guide.png --auto-key border --soft-matte --transparent-threshold 12 --opaque-threshold 220 --despill
```

Move the generated avatar after review:

```bash
cp tmp/imagegen/lydt-p0-fx-resume/avatar-yinjie-illustration.webp public/assets/lydt/resume/avatar-yinjie-illustration.webp
```
