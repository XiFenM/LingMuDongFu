# 原设计图生成背景

不是用一条孤立的、可见的 prompt 去生成每张图，而是让图像模型吃掉了当前上下文：首页设计图、PRD、设计系统、页面拆分文档，以及逐页推进的设计目标。工具记录里没有保存一条可复制的原始 prompt。

# 等效复现提示词框架

提示词骨架主要来自这三类信息：PRD 中“灵木洞天”个人主页的定位、信息结构和东方仙侠视觉方向；设计系统中的深墨绿、古木色、月白、淡金、灵萤青、纸质卡片、竹简、月窗、年轮等 token 和组件语言；以及 UI 拆分文档中对博客、项目、404、简历等页面的模块要求。  

## 通用母版 Prompt

这条相当于“灵木洞天设计总咒文”，后面每个页面都在它的基础上换页面结构。

```text
Create a full-page desktop website UI mockup for a personal portfolio site named “灵木洞天 / LYDT”.

Style:
A professional AI infrastructure engineer portfolio placed inside a quiet mystical tree sanctuary. Eastern xianxia-inspired but restrained, elegant, readable, not game UI, not flashy. Dark ink-green and deep wood background, moonlit tree hollow, round paper window, moss, vines, subtle mist, firefly particles, bamboo slips, jade tags, old paper cards, tree-ring ornaments, thin gold dividers, warm lantern light.

Design language:
Modern web UI structure with decorative oriental woodland details. Use clean grid, clear hierarchy, reusable components, readable cards, practical navigation, professional technical content. Keep text areas clean and high contrast.

Color palette:
deep ink green, dark teal, old wood brown, moss green, moon white, warm parchment, muted gold, small firefly cyan glow. Avoid large saturated red, purple, neon, cheap fantasy game effects.

Typography:
Chinese serif display headings, clean sans-serif body text, readable mixed Chinese and English technical terms. Use elegant Chinese UI labels.

Global layout:
Top navigation bar with LYDT circular tree-ring logo, site name “灵木洞天”, nav items 首页 / 关于 / 技能 / 项目 / 博客 / 联系, GitHub icon, LinkedIn icon, resume button. Full-page vertical website screenshot, desktop 1440px style, premium product design, no browser chrome.

Visual quality:
High-end Figma-like UI mockup, detailed but not cluttered, atmospheric cinematic background, crisp cards, consistent spacing, subtle glows, realistic parchment and wood textures, readable interface.
```

## 通用 Negative Prompt

这条我建议每次都附上，像给模型挂一盏“别跑偏”的灯笼。

```text
Avoid: mobile layout, browser frame, messy collage, unreadable tiny text, random lorem ipsum, cyberpunk neon, sci-fi spaceship, western medieval fantasy, over-saturated gold, purple glow, red game UI, heavy MMORPG interface, excessive dragon patterns, horror mood, low contrast text, cluttered decorations, distorted navigation, inconsistent card styles, cartoonish style, flat generic dashboard.
```

---

## 1. 博客列表页 Prompt

```text
Create a full-page desktop website UI mockup for the blog list page of “灵木洞天 / LYDT”.

Page route: /blog
Page theme: 藏书枝阁, a mystical branch library inside an ancient tree.

Use the global 灵木洞天 visual system:
dark ink-green background, moonlit wooden library, round paper window, bookshelves embedded in tree roots, lantern light, moss, vines, subtle fireflies, parchment cards, bamboo-slip details, muted gold dividers, jade category tags.

Page structure:
1. Top navigation bar, active item “博客”.
2. Hero section:
   - breadcrumb: 首页 / 博客
   - large title: 藏书枝阁
   - subtitle: 收录技术文章、学习札记与工程复盘
   - search input with placeholder: 搜索文章、标签或关键词
   - right side background: cozy tree hollow library, circular moon window, desk, scrolls, books, lantern.
3. Category filter bar:
   Tabs: 全部, CUDA, PyTorch, Distributed, AI Framework, LLM, Engineering, Notes.
   Include sort dropdown: 最新发布.
4. Featured posts section:
   Section title: 精选卷宗
   Two large horizontal parchment article cards.
   Cards include ink illustration, title, excerpt, date, reading time, tags, button “阅读全文”.
   Example titles:
   - Triton 与 CUDA 核心原理整理
   - PyTorch 调度器干货大合集
5. Blog archive section:
   Section title: 全部文章
   Dense two-column list of parchment cards.
   Each card includes icon, title, excerpt, date, reading time, tags, arrow icon.
   Example titles:
   - Megatron 并行机制笔记
   - 自定义 AllReduce 算子实现思路
   - ProcessGroup 与 NCCL 通信路径梳理
   - 从 Softmax Kernel 到性能优化
   - TorchScript / FX / torch.compile 关系总结
   - ZeRO 参数分片与 AllGather 流程分析
6. Pagination with glowing active page.
7. Contact/footer area consistent with homepage:
   moon window tea desk illustration, contact cards Email / GitHub / LinkedIn / 下载简历, final footer.

Design requirements:
The blog list should feel more information-dense than the homepage but still poetic. Use parchment article cards with old paper edges, subtle ink wash illustrations, clear metadata icons, gold and jade tags. Keep all technical labels readable.
```

---

## 2. 博客详情页 Prompt

```text
Create a full-page desktop website UI mockup for the blog article detail page of “灵木洞天 / LYDT”.

Page route: /blog/pytorch-dispatcher-notes
Page theme: 技术文章阅读页 inside a quiet moonlit tree library.

Use the global 灵木洞天 visual system:
dark ink-green background, ancient tree hollow study, circular moon window, bookshelves, lantern, bamboo and parchment textures, muted gold lines, jade tags, subtle firefly glow.

Page structure:
1. Top navigation bar, active item “博客”.
2. Article hero:
   - breadcrumb: 博客 / PyTorch / 调度器专题
   - large article title: PyTorch 调度器干货大合集
   - subtitle: 系统梳理 PyTorch Dispatcher、Kernel 注册与分发策略，覆盖自定义算子集成与性能陷阱，帮助真正理解计算图背后的调度逻辑。
   - metadata chips: 2025-04-12, 18 分钟阅读, PyTorch, Distributed, Engineering
   - author row: 沈寅杰 / Yinjie Shen
   - right side background illustration: tree hollow library desk, round moon window, bamboo scroll, hanging banner.
3. Main content layout:
   - Left main article column with large parchment paper reading panel.
   - Right sticky sidebar with dark panel TOC and article info.
4. Article content in parchment panel:
   Include H2 sections:
   - 引言
   - 为什么要理解 Dispatcher？
   - 核心概念速览
   - 一个典型调用流程
   - 常见误区与排查建议
   - Dispatcher 关注点
   - 小结
   Include paragraph text, bullet list, quote block, dark code block with filename label “dispatcher_call.cpp”, small table.
5. Code block:
   Deep dark green-black code area, monospace text, language badge C++, copy button, gold/wood border, no broken alignment.
6. Right sidebar:
   Panel 1 title: 目录 TOC
   Current item highlighted with firefly glow.
   Panel 2 title: 文章信息
   Include category, publish date, update date, reading time, tags.
   Button: 返回文章列表.
7. Below article:
   Previous / next article navigation cards.
   Related articles section with three compact parchment blog cards.
8. Bottom contact/footer:
   Moon window contact area, Email / GitHub / LinkedIn / Resume cards, footer nav.

Design requirements:
Prioritize reading experience. Article body width around 720px, high contrast, line height spacious. Decorations should frame the text, not cover it. The page should look like a technical paper placed on an old scholar desk inside a mystical tree library.
```

---

## 3. 项目列表页 Prompt

```text
Create a full-page desktop website UI mockup for the projects list page of “灵木洞天 / LYDT”.

Page route: /projects
Page theme: 项目集, a collection of engineering artifacts stored inside the tree sanctuary.

Use the global 灵木洞天 visual system:
dark ink-green and old wood, mystical tree hollow room, circular moon window, lantern light, moss, vines, firefly cyan glow, muted gold borders, jade category pills, dark project cards with magical technical illustrations.

Page structure:
1. Top navigation bar, active item “项目”.
2. Hero section:
   - breadcrumb: 首页 / 项目
   - large title: 项目集
   - English subtitle: PROJECTS
   - description: 在灵木洞天中，每个项目都是一段探索与实践的记录，从想法到实现，从算法到系统，从代码到影响力。
   - left decorative tree-ring compass icon.
   - right hero image: tree hollow workshop, round moon window, desk, lantern, hanging banner with Chinese text.
3. Category filter buttons:
   全部项目, AI / 深度学习, 系统优化, GPU / 内核, 分布式系统, 工具 / 框架, 研究 / 探索.
   Active tab should glow softly.
4. Toolbar:
   Search input: 搜索项目名称、技术栈或关键词...
   Sort dropdown: 排序：最新发布
   View toggle: grid/list icons.
5. Project grid:
   Three-column grid, six dark cards.
   Each card includes:
   - top image thumbnail, abstract technical illustration
   - category pill
   - project title
   - short description
   - tech tags
   - footer metadata: date, stars, views
   - circular arrow button
   Example project cards:
   - Megatron 并行机制笔记
   - CUDA Softmax Kernel
   - PyTorch Custom Collective
   - LLM Inference 优化实践
   - Distributed Training 工程实践
   - PyTorch Dispatcher 调度机制大全
6. Pagination:
   1 2 3 4 5 ... 12 with glowing active state.
7. Bottom CTA:
   Large dark framed panel with lantern illustration.
   Text: 有想法，也有实现。
   Supporting text: 每一个项目，都是一次向内生长的旅程。代码只是载体，思考与探索才是核心。
   Buttons: 探索游戏彩蛋, 联系我们.
8. Footer:
   Logo, copyright, links, back-to-top button.

Design requirements:
The page should feel like a professional project portfolio, not a game inventory. Cards should be modern, comparable, and easy to scan. Use fantasy ornament only at card corners, dividers, and background.
```

---

## 4. 项目详情页 Prompt

```text
Create a full-page desktop website UI mockup for a project detail page of “灵木洞天 / LYDT”.

Page route: /projects/triton-cuda-notes
Page theme: A detailed engineering project case study inside a tree-hollow research chamber.

Use the global 灵木洞天 visual system:
dark ink-green background, old wood, moonlit round window, parchment panels, gold dividers, jade tech tags, lantern light, subtle fireflies, restrained eastern xianxia atmosphere, professional technical portfolio.

Project content:
Project title: Triton & CUDA 核心原理整理
Subtitle: 从 Triton 与 CUDA 视角拆解 GPU 编程、内核优化与算子实现的核心原理
Tags: CUDA, Triton, GPU Computing, Performance, Kernel
Primary buttons: 查看源码, 在线阅读, 演示 / Demo
Stats: 最后更新 2025-05-26, 阅读时长 ≈ 40 min, Star 2.8k, Fork 412, 语言 Python / CUDA

Page structure:
1. Top navigation bar, active item “项目”.
2. Breadcrumb: 首页 / 项目 / Triton & CUDA 核心原理整理.
3. Hero:
   Left side project title, subtitle, tags, CTA buttons, stat strip.
   Right side cinematic illustration: tree hollow desk, open technical scroll, moon window, glowing circular diagram on wooden table, hanging banner.
4. Main layout:
   Three-column feel:
   - Left sticky section navigation panel.
   - Center main content panel.
   - Right sidebar cards.
5. Left section navigation:
   Title: 目录
   Items: 项目概览, 背景与动机, 核心特性, 技术架构, 关键内容, 性能示例, 项目结构, 应用场景, 未来计划, 相关资源.
   Bottom small card: 探索树中仙府 / 进入 2D 彩蛋世界.
6. Center content:
   Section 项目概览:
   Dark panel with paragraph and a technical diagram comparing Triton and CUDA around a glowing cube.
   Include labels: Global Memory, L2 Cache, Shared Memory, Registers, CUDA Cores.
   Section 背景与动机:
   Parchment card with text and ink landscape illustration.
   Section 核心特性:
   Four small parchment feature cards:
   - 系统化梳理
   - 大量示例
   - 性能导向
   - 工程可用
   Section 性能示例:
   Dark table with rows PyTorch, Triton, CUDA and columns matrix size, hardware, time, TFLOPS, relative performance.
7. Right sidebar:
   Card 项目信息:
   项目类型, 开源协议, 开发语言 icons, 创建时间, 最近更新, 仓库地址.
   Card 快速导航:
   环境 & 安装, 快速开始, 目录结构, 贡献指南, 常见问题.
   Card 相关项目:
   Megatron 并行机制笔记, PyTorch 调度器手册大全, CUDA Softmax Kernel 深度解析.
8. Bottom CTA:
   Large decorative panel:
   想在树中仙府里继续探索吗？
   Button: 进入树中仙府.
9. Footer.

Design requirements:
Make it look like a serious technical case study, with enough structure for engineering documentation. Use dark panels for diagrams and tables, parchment cards for explanations, clear sidebars, sticky TOC feel, no clutter.
```

---

## 5. 404 页面 Prompt

```text
Create a full-page desktop website UI mockup for the 404 error page of “灵木洞天 / LYDT”.

Page route: /404
Page theme: an unfinished tree hollow path inside the mystical tree sanctuary.

Use the global 灵木洞天 visual system:
dark ink-green forest, huge ancient tree hollow, broken wooden bridge, moonlit circular window, lanterns, moss, vines, subtle mist, small fireflies, muted gold ornaments, parchment hint card.

Page structure:
1. Top navigation bar with LYDT logo and nav items 首页 / 关于 / 技能 / 项目 / 博客 / 联系, resume button.
2. Breadcrumb: 首页 / 404.
3. Main hero:
   Large number “404” in warm parchment stone texture.
   Big Chinese headline: 你似乎走进了一间尚未长成的树洞。
   Supporting text:
   此路尚未成形，枝叶仍在生长之中。
   或许你可以回到洞天的主径，继续探索更多已长成的方向。
4. Primary actions:
   Button 1: 返回首页
   Button 2: 去藏书枝阁
   Button 3: 查看项目
5. Right side hero illustration:
   A deep tree tunnel, unfinished wooden bridge leading to a circular moon window, lanterns, moss, hanging wooden sign with Chinese text “此路未成，枝叶待长”.
6. Hint card:
   Parchment card with side label “小提示”.
   Text: 也许这只灵萤能带你回到正确的路。
   Include a glowing firefly illustration.
7. Hidden portal text strip near footer:
   树心深处，似乎还有一扇微微发光的小门。
8. Contact/footer area consistent with other pages:
   Moon window tea desk, site intro, Email / GitHub / LinkedIn / Resume cards, final footer.

Design requirements:
The 404 page should feel poetic, calm, and helpful, not scary. It should clearly guide the user back. The unfinished tree path is the main visual metaphor. Keep buttons obvious and accessible.
```

---

## 6. 简历页 Prompt

```text
Create a full-page desktop website UI mockup for the resume page of “灵木洞天 / LYDT”.

Page route: /resume
Page theme: 我的简历, a professional resume displayed inside a moonlit tree study.

Use the global 灵木洞天 visual system:
dark ink-green and old wood background, mystical tree hollow study, round moon window, open scroll on desk, lantern light, subtle fireflies, parchment and jade cards, gold dividers, moss and vines, restrained eastern xianxia style.

Page structure:
1. Top navigation bar with active resume button.
2. Breadcrumb: 首页 / 简历.
3. Hero section:
   - large title: 我的简历
   - English subtitle: RESUME
   - short intro:
     热爱系统与性能，专注 AI 基础设施、高性能计算与算法工程。
     持续构建可落地、可扩展、可复用的技术方案。
   - buttons: 下载 PDF 简历, 联系我
   - right side hero illustration: moonlit tree study, round window, open resume scroll, lantern, hanging banner.
4. Main resume layout:
   Two-column layout.
   Left column: profile sidebar card.
   Right column: resume content.
5. Left profile card:
   - circular portrait placeholder inside tree-ring frame
   - name: 沈寅杰 / Yinjie Shen
   - title: AI Framework Engineer
   - subtitle: GPU Computing · Distributed Systems
   - contact info rows: birthday, location 中国 · 上海, email, website, GitHub, LinkedIn
   - section 核心技能概览 with progress bars:
     CUDA / GPU Computing 95%
     PyTorch Internals 90%
     Distributed Training 88%
     Performance Optimization 90%
     System Design & Backend 82%
     LLM / AI Systems 85%
   - section 语言能力:
     中文 母语
     English TOEFL 110 / CET-6 640
   - section 教育背景:
     上海交通大学, 计算机科学与技术 本科, 2018.09 - 2022.06
6. Right content:
   Section 工作经历:
   vertical timeline with glowing nodes.
   Entry 1:
   2023.07 - 至今, AI Framework Engineer, Megatron 团队 / DeepSpeed 社区
   bullet points about Megatron-LM, DeepSpeed, distributed training, profiling tools.
   tags: PyTorch, Distributed, CUDA
   Entry 2:
   2022.06 - 2023.06, 高性能计算研发工程师, 某 AI 基础设施公司
   tags: GPU, Performance, C++
   Entry 3:
   2021.03 - 2022.06, 算法工程实习生, 某研究机构
   tags: Research, PyTorch, System
7. Section 代表项目:
   Three project cards with image thumbnails:
   - Megatron 并行机制笔记
   - PyTorch 调度器手册大全
   - CUDA Softmax Kernel 深度解析
   Include tags and metrics.
8. Section 荣誉与证明:
   Small certificate cards:
   Top Coder LeetCode Top 1%, ACM ICPC Regional Bronze Medal, 国家奖学金 2019/2020, 优秀毕业生, NVIDIA Deep Learning Institute.
9. Bottom CTA:
   Large framed panel with lantern image.
   Text: 期待与你一起探索更多可能。
   Button: 联系我.
10. Footer:
   LYDT logo, copyright, privacy, terms, sitemap, back-to-top button.

Design requirements:
This should look like a polished online resume, not a fantasy character sheet. Keep professional hierarchy, readable resume content, strong two-column layout, elegant cards, restrained decorations.
```

---

## 实际使用的 Prompt 方法

通常不是写“一条很长的神谕”就结束，而是这样拆：

```text
通用风格母版
+ 当前页面的产品目标
+ 页面模块顺序
+ 具体文案与卡片内容
+ 视觉构图要求
+ 禁止项
```

尤其关键的是这几句，几乎每张都在变体里反复使用：

```text
professional technical portfolio, not a fantasy game UI
modern web UI structure with restrained eastern xianxia details
dark ink-green tree sanctuary, moon window, parchment cards, muted gold, firefly glow
readable Chinese typography, clear hierarchy, reusable components
```

这套提示词的真正“灵根”不是堆形容词，而是**先把页面信息架构钉牢，再让视觉风格顺着结构生长**。否则模型很容易把页面画成漂亮海报，卡片、导航、CTA 全都迷路。
