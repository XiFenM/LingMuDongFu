# 《灵木洞天》设计系统 Tokens + 组件库规范

## 1. 文档目的

本文档基于当前《灵木洞天》常规主站首页视觉稿，沉淀一套可复用的设计系统规范，用于后续 Figma 组件库、前端组件开发、AI 设计生成、页面扩展和视觉一致性验收。

本设计系统的目标是：

> 将“灵木洞天”这套东方仙侠树中仙府美学，转译成稳定、清晰、可复用、可维护的设计 tokens 与组件规范。

该系统服务于以下页面：

- 首页 `/`
- 项目详情页 `/projects/[id]`
- 项目列表页 `/projects`
- 博客列表页 `/blog`
- 博客详情页 `/blog/[slug]`
- 简历页 `/resume`
- 404 页面
- 游戏彩蛋入口相关 UI

---

## 2. 设计原则

### 2.1 核心原则

1. **专业信息优先**  
   灵木洞天是视觉外衣，个人能力展示才是核心内容。

2. **东方意象克制使用**  
   使用古树、年轮、灵萤、竹简、玉片、月窗、青苔、云雾等元素，但不堆砌符号。

3. **深色沉浸，亮色点睛**  
   主体以深青绿、墨绿、古木深棕为背景，以月白、淡金、灵萤青作为信息和高光。

4. **组件现代，装饰东方**  
   卡片、按钮、导航、标签的结构应保持现代 UI 逻辑，装饰层再引入树纹、竹简、玉片、灵光。

5. **游戏彩蛋不侵占主站效率**  
   彩蛋入口可以神秘，但主站所有重要信息必须直接可见。

---

## 3. 设计系统命名规则

### 3.1 Token 命名格式

推荐采用语义化命名：

```ts
category.role.variant.state
```

示例：

```ts
color.bg.page.default
color.text.primary
color.border.card.hover
space.section.lg
radius.card.md
shadow.glow.firefly
motion.duration.normal
```

### 3.2 组件命名格式

React / Vue 组件建议采用 PascalCase：

```ts
HeaderNav
HeroSection
ProjectCard
SkillTree
TimelineRingDisc
BlogCard
PortalModal
```

CSS class 或 Tailwind preset 可采用 kebab-case：

```css
.lydt-card
.lydt-button-primary
.lydt-firefly
.lydt-ring-disc
```

### 3.3 主题前缀

建议统一使用项目前缀：

```text
lydt
```

含义：Lingmu Y洞天 / 灵木洞天。

---

## 4. Color Tokens 色彩系统

### 4.1 基础色板 Primitive Colors

以下色值为建议值，可在视觉实现阶段微调，但整体色相关系应保持稳定。

```ts
export const primitiveColors = {
  inkGreen950: '#071714',
  inkGreen900: '#0B211D',
  inkGreen850: '#0F2A25',
  inkGreen800: '#12352E',
  inkGreen700: '#18483E',

  wood950: '#160F0A',
  wood900: '#24180F',
  wood800: '#352416',
  wood700: '#4A321D',
  wood600: '#62452B',

  moss800: '#263D2D',
  moss700: '#33513A',
  moss600: '#456C4E',
  moss500: '#5E8A67',

  jade700: '#4E7A68',
  jade600: '#6A9580',
  jade500: '#8EB09B',
  jade300: '#B9D1C4',

  firefly600: '#7AD7A5',
  firefly500: '#9CF0BD',
  firefly300: '#C9FFD9',

  moonWhite: '#E8E2CF',
  paperWhite: '#F0E5C9',
  paperWarm: '#D8C7A2',
  oldPaper: '#B8A67E',

  gold600: '#9F8243',
  gold500: '#C0A35D',
  gold300: '#E0CC88',

  cinnabar700: '#7A2F26',
  cinnabar600: '#9A4336',

  black: '#030807',
  white: '#FFFFFF'
};
```

### 4.2 语义色 Tokens

```ts
export const colorTokens = {
  bg: {
    page: {
      default: primitiveColors.inkGreen950,
      elevated: primitiveColors.inkGreen900,
      deep: primitiveColors.black
    },
    section: {
      default: primitiveColors.inkGreen900,
      alternate: primitiveColors.inkGreen850,
      wood: primitiveColors.wood900,
      paper: primitiveColors.paperWhite
    },
    card: {
      dark: 'rgba(11, 33, 29, 0.78)',
      darker: 'rgba(7, 23, 20, 0.86)',
      wood: 'rgba(36, 24, 15, 0.82)',
      paper: primitiveColors.paperWhite,
      jade: 'rgba(142, 176, 155, 0.16)'
    },
    overlay: {
      modal: 'rgba(3, 8, 7, 0.72)',
      mist: 'rgba(232, 226, 207, 0.06)',
      glass: 'rgba(7, 23, 20, 0.62)'
    }
  },

  text: {
    primary: primitiveColors.moonWhite,
    secondary: '#CFC4A8',
    tertiary: '#A99D82',
    muted: '#807765',
    inverse: primitiveColors.inkGreen950,
    accent: primitiveColors.gold300,
    link: primitiveColors.firefly300,
    linkHover: primitiveColors.firefly500,
    onPaper: '#2A2117',
    onPaperMuted: '#5D513F'
  },

  border: {
    subtle: 'rgba(224, 204, 136, 0.18)',
    default: 'rgba(224, 204, 136, 0.32)',
    strong: 'rgba(224, 204, 136, 0.56)',
    jade: 'rgba(185, 209, 196, 0.34)',
    glow: 'rgba(156, 240, 189, 0.62)',
    paper: 'rgba(74, 50, 29, 0.48)'
  },

  icon: {
    default: primitiveColors.moonWhite,
    muted: primitiveColors.oldPaper,
    accent: primitiveColors.gold300,
    glow: primitiveColors.firefly300,
    dark: primitiveColors.inkGreen950
  },

  action: {
    primary: primitiveColors.paperWhite,
    primaryHover: primitiveColors.moonWhite,
    primaryText: primitiveColors.inkGreen950,
    secondary: 'rgba(7, 23, 20, 0.44)',
    secondaryHover: 'rgba(156, 240, 189, 0.10)',
    secondaryText: primitiveColors.moonWhite,
    disabled: 'rgba(232, 226, 207, 0.24)'
  },

  status: {
    success: primitiveColors.firefly600,
    warning: primitiveColors.gold500,
    danger: primitiveColors.cinnabar600,
    info: primitiveColors.jade500
  }
};
```

### 4.3 色彩使用比例

| 色彩类型 | 建议比例 | 用途 |
|---|---:|---|
| 深青绿 / 墨绿 | 55% - 65% | 页面底色、背景、深色容器 |
| 古木色 / 暗棕 | 15% - 20% | 卡片边框、插画、装饰结构 |
| 月白 / 宣纸色 | 10% - 15% | 文字、浅色卡片、按钮 |
| 淡金 | 5% - 8% | 标题、细线、年轮、重点标记 |
| 灵萤青 | 2% - 5% | hover、彩蛋、发光节点、链接 |
| 朱砂 | < 2% | 印章、少量强调、警示状态 |

---

## 5. Typography Tokens 字体系统

### 5.1 字体族

```ts
export const fontFamily = {
  sans: 'Inter, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
  serif: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", serif',
  mono: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
  display: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", serif',
  decorative: '"Noto Serif SC", "Source Han Serif SC", serif'
};
```

### 5.2 字号 Tokens

```ts
export const fontSize = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  md: '18px',
  lg: '20px',
  xl: '24px',
  '2xl': '30px',
  '3xl': '36px',
  '4xl': '48px',
  '5xl': '60px',
  '6xl': '72px'
};
```

### 5.3 行高 Tokens

```ts
export const lineHeight = {
  tight: '1.15',
  snug: '1.3',
  normal: '1.55',
  relaxed: '1.75',
  reading: '1.85'
};
```

### 5.4 字重 Tokens

```ts
export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};
```

### 5.5 字体层级

```ts
export const typography = {
  heroTitle: {
    fontFamily: fontFamily.display,
    fontSize: fontSize['5xl'],
    lineHeight: lineHeight.tight,
    fontWeight: fontWeight.bold,
    letterSpacing: '0.02em'
  },
  pageTitle: {
    fontFamily: fontFamily.display,
    fontSize: fontSize['4xl'],
    lineHeight: lineHeight.tight,
    fontWeight: fontWeight.bold
  },
  sectionTitle: {
    fontFamily: fontFamily.display,
    fontSize: fontSize['3xl'],
    lineHeight: lineHeight.snug,
    fontWeight: fontWeight.semibold,
    letterSpacing: '0.04em'
  },
  sectionEyebrow: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.medium,
    letterSpacing: '0.18em',
    textTransform: 'uppercase'
  },
  cardTitle: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.snug,
    fontWeight: fontWeight.semibold
  },
  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.regular
  },
  bodySerif: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.base,
    lineHeight: lineHeight.reading,
    fontWeight: fontWeight.regular
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.regular
  },
  code: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.regular
  }
};
```

### 5.6 移动端字体缩放

| 类型 | Desktop | Mobile |
|---|---:|---:|
| Hero Title | 60px - 72px | 36px - 44px |
| Page Title | 48px | 34px - 40px |
| Section Title | 36px | 26px - 32px |
| Card Title | 24px | 18px - 22px |
| Body | 16px - 18px | 15px - 17px |

---

## 6. Spacing Tokens 间距系统

### 6.1 基础间距

采用 4px 基础步进。

```ts
export const space = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px'
};
```

### 6.2 语义间距

```ts
export const semanticSpace = {
  pageX: {
    desktop: space[20],
    tablet: space[10],
    mobile: space[5]
  },
  sectionY: {
    sm: space[20],
    md: space[28],
    lg: space[36]
  },
  cardPadding: {
    sm: space[4],
    md: space[6],
    lg: space[8]
  },
  clusterGap: {
    xs: space[2],
    sm: space[3],
    md: space[4],
    lg: space[6],
    xl: space[8]
  }
};
```

---

## 7. Layout Tokens 布局系统

### 7.1 容器宽度

```ts
export const container = {
  xs: '640px',
  sm: '768px',
  md: '960px',
  lg: '1120px',
  xl: '1200px',
  article: '740px',
  wide: '1360px'
};
```

### 7.2 Breakpoints

```ts
export const breakpoints = {
  mobile: '390px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px'
};
```

### 7.3 栅格

| 设备 | Columns | Gutter | Margin |
|---|---:|---:|---:|
| Desktop 1440 | 12 | 24px | 80px - 120px |
| Laptop 1280 | 12 | 24px | 64px - 80px |
| Tablet 768 | 8 | 20px | 40px |
| Mobile 390 | 4 | 16px | 20px |

---

## 8. Radius Tokens 圆角系统

```ts
export const radius = {
  none: '0px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '28px',
  full: '999px',

  button: '12px',
  card: '18px',
  panel: '24px',
  modal: '28px',
  tag: '999px'
};
```

### 使用建议

- 普通按钮：12px。
- 项目卡片：16px - 20px。
- 大面板：24px。
- 标签：全圆角。
- 年轮盘、灵光节点：全圆。

---

## 9. Border Tokens 边框系统

```ts
export const borderWidth = {
  none: '0px',
  hairline: '1px',
  thin: '1.5px',
  medium: '2px',
  strong: '3px'
};

export const borderStyle = {
  card: `${borderWidth.hairline} solid ${colorTokens.border.default}`,
  cardHover: `${borderWidth.hairline} solid ${colorTokens.border.glow}`,
  paper: `${borderWidth.thin} solid ${colorTokens.border.paper}`,
  divider: `${borderWidth.hairline} solid ${colorTokens.border.subtle}`,
  glow: `${borderWidth.hairline} solid ${colorTokens.border.glow}`
};
```

### 边框视觉语言

- 深色卡片使用淡金细边框。
- 纸质卡片使用古木色边框。
- hover 状态使用灵萤青发光边框。
- 分割线可以使用树枝线、藤蔓线或年轮线，但需要保持轻量。

---

## 10. Shadow & Glow Tokens 阴影与发光

```ts
export const shadow = {
  sm: '0 4px 12px rgba(0, 0, 0, 0.22)',
  md: '0 12px 32px rgba(0, 0, 0, 0.32)',
  lg: '0 24px 64px rgba(0, 0, 0, 0.42)',
  innerWood: 'inset 0 0 24px rgba(0, 0, 0, 0.28)',

  glowFireflySm: '0 0 8px rgba(156, 240, 189, 0.42)',
  glowFireflyMd: '0 0 18px rgba(156, 240, 189, 0.48)',
  glowFireflyLg: '0 0 32px rgba(156, 240, 189, 0.42)',

  glowGoldSm: '0 0 8px rgba(224, 204, 136, 0.32)',
  glowGoldMd: '0 0 20px rgba(224, 204, 136, 0.36)',

  cardHover: '0 16px 36px rgba(0, 0, 0, 0.34), 0 0 18px rgba(156, 240, 189, 0.16)'
};
```

### 使用原则

- 发光必须少量使用。
- 默认状态不要到处发光。
- hover / active / 彩蛋入口 / 年轮节点 / 技能节点可以发光。
- 金色发光用于年轮、标题细线和重点节点。
- 灵萤青发光用于交互反馈和隐藏入口。

---

## 11. Z-Index Tokens 层级系统

```ts
export const zIndex = {
  base: 0,
  background: -1,
  decorative: 1,
  content: 10,
  header: 100,
  dropdown: 200,
  modalBackdrop: 800,
  modal: 900,
  toast: 1000
};
```

---

## 12. Motion Tokens 动效系统

### 12.1 时长

```ts
export const duration = {
  instant: '80ms',
  fast: '140ms',
  normal: '220ms',
  slow: '420ms',
  ambient: '1600ms',
  drifting: '6000ms'
};
```

### 12.2 缓动

```ts
export const easing = {
  standard: 'cubic-bezier(0.2, 0.0, 0, 1)',
  gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)'
};
```

### 12.3 常用动效

```ts
export const motionPreset = {
  cardHover: {
    transform: 'translateY(-4px)',
    transition: `transform ${duration.normal} ${easing.out}, box-shadow ${duration.normal} ${easing.out}`
  },
  buttonHover: {
    transform: 'translateY(-1px)',
    transition: `all ${duration.fast} ${easing.standard}`
  },
  sectionReveal: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  fireflyFloat: {
    duration: duration.drifting,
    easing: easing.inOut
  }
};
```

### 12.4 动效禁区

禁止：

- 高频闪烁。
- 大面积背景快速移动。
- CTA 持续跳动。
- hover 后导致布局变化。
- 页面初始化时超过 1 秒的阻塞动画。

---

## 13. Texture & Decoration Tokens 纹理与装饰

### 13.1 纹理类型

```ts
export const textureTokens = {
  woodGrain: 'texture/wood-grain-dark.webp',
  treeRing: 'texture/tree-ring-subtle.webp',
  paperFiber: 'texture/paper-fiber.webp',
  mossNoise: 'texture/moss-noise.webp',
  mist: 'texture/mist-layer.webp'
};
```

### 13.2 纹理透明度

```ts
export const textureOpacity = {
  subtle: 0.04,
  soft: 0.08,
  medium: 0.14,
  strong: 0.22
};
```

### 13.3 装饰母题

| 母题 | 应用组件 | 使用限制 |
|---|---|---|
| 年轮 | TimelineRingDisc、LogoMark、SectionDivider | 不要每个模块都大面积使用 |
| 树枝 | SkillTree、Divider、背景线条 | 不应影响文字层级 |
| 竹简 | BlogCard、ArticleMeta、PortalModal | 避免过度拟物化 |
| 玉片 | Tag、Badge、IconButton | 适合小尺寸组件 |
| 月窗 | ContactSection、404 页面 | 适合大插画，不适合小组件 |
| 灵萤 | HiddenPortal、hover、loading | 数量少，避免廉价闪烁 |
| 青苔 | Card corner、Section edge | 仅作边缘装饰 |

---

## 14. Icon Tokens 图标系统

### 14.1 图标风格

- 线性图标为主。
- 线宽建议 1.5px - 2px。
- 圆角端点。
- 技术图标可使用品牌图标，但需要统一尺寸和颜色。
- 东方装饰图标使用简化线稿，不使用复杂插画作为小图标。

### 14.2 图标尺寸

```ts
export const iconSize = {
  xs: '14px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
  emblem: '48px',
  logo: '56px'
};
```

### 14.3 常用图标

| 图标 | 用途 |
|---|---|
| Mail | Email |
| GitHub | GitHub 链接 |
| Linkedin | LinkedIn 链接 |
| FileText | 简历下载 |
| ExternalLink | 外链 |
| ArrowRight | 查看更多 |
| Sparkle / Firefly | 彩蛋入口、灵光 |
| BookOpen | 博客 |
| Cpu | GPU / 系统 |
| Network | 分布式 |
| Code | 代码 / 项目 |
| Leaf | 技能树 / 生态 |
| CircleDot | 年轮节点 |

---

## 15. Component Library 组件库规范

## 15.1 AppShell 页面外壳

### 用途

全站页面外壳，负责背景、导航、页脚、全局装饰层。

### Props 建议

```ts
type AppShellProps = {
  children: React.ReactNode;
  variant?: 'home' | 'content' | 'article' | 'minimal';
  showHeader?: boolean;
  showFooter?: boolean;
  background?: 'treeSanctuary' | 'paper' | 'dark' | 'none';
};
```

### 视觉规范

- 默认背景为深青绿。
- 首页使用大气氛背景图。
- 内容页减少插画复杂度，提升阅读效率。
- 所有页面都应有低透明度纹理层。

---

## 15.2 HeaderNav 顶部导航

### 用途

全站主导航。

### 结构

```text
HeaderNav
├── LogoMark + SiteName
├── NavLinks
├── SocialIconLinks
└── ResumeButton
```

### Props

```ts
type HeaderNavProps = {
  activeSection?: 'about' | 'skills' | 'projects' | 'blog' | 'contact';
  variant?: 'transparent' | 'glass' | 'solid';
  sticky?: boolean;
};
```

### 尺寸

| 状态 | 高度 |
|---|---:|
| Desktop default | 80px |
| Desktop compact | 64px |
| Mobile | 64px |

### 视觉状态

| 状态 | 视觉 |
|---|---|
| Default | 透明或极深色半透明 |
| Scrolled | 毛玻璃深青绿背景，细淡金底线 |
| Hover nav item | 文字变月白，底部出现灵萤青细线 |
| Active nav item | 淡金文字 + 小圆点 |
| Mobile open | 深色木纹抽屉或全屏菜单 |

### 实现建议

```css
.header-nav {
  backdrop-filter: blur(18px);
  background: rgba(7, 23, 20, 0.62);
  border-bottom: 1px solid rgba(224, 204, 136, 0.18);
}
```

---

## 15.3 LogoMark 标识组件

### 用途

展示站点标识。

### 视觉

- 圆形年轮图案。
- 中心可放 `LYDT` 或个人姓名缩写。
- 外圈可用淡金线条。
- 小尺寸时简化为圆形年轮 + 字母。

### Props

```ts
type LogoMarkProps = {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'full' | 'markOnly';
};
```

### 尺寸

| size | mark | text |
|---|---:|---:|
| sm | 32px | 16px |
| md | 44px | 20px |
| lg | 56px | 24px |

---

## 15.4 Section 章节容器

### 用途

统一页面模块布局。

### Props

```ts
type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'wood' | 'paper' | 'transparent';
  density?: 'compact' | 'normal' | 'spacious';
  children: React.ReactNode;
};
```

### 视觉规范

- Section 上下间距默认 112px。
- 标题区域左侧可有细竖线装饰。
- eyebrow 使用英文小字、淡金色、大字距。
- title 使用中文 serif 标题。

### SectionHeader 结构

```text
SectionHeader
├── Eyebrow
├── Title
└── Description optional
```

---

## 15.5 Button 按钮组件

### 类型

```ts
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'jade'
  | 'paper'
  | 'danger';

type ButtonSize = 'sm' | 'md' | 'lg';
```

### Props

```ts
type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
};
```

### 尺寸

| size | height | padding | font-size |
|---|---:|---:|---:|
| sm | 36px | 12px 16px | 14px |
| md | 44px | 14px 22px | 15px |
| lg | 52px | 16px 28px | 16px |

### Variant 视觉

#### primary

- 背景：宣纸白 / 月白。
- 文字：墨绿。
- 边框：淡金。
- hover：微微上浮，出现金色阴影。

#### secondary

- 背景：深色半透明。
- 文字：月白。
- 边框：淡金弱边框。
- hover：边框转灵萤青，背景变亮。

#### ghost

- 背景透明。
- 文字淡金或月白。
- hover 有底部细线。

#### jade

- 背景：低透明玉绿色。
- 文字：月白。
- 边框：玉色。
- 适合标签式按钮或次要 CTA。

#### paper

- 背景：纸色。
- 文字：深木色。
- 适合卡片内部按钮。

---

## 15.6 Tag / Badge 标签组件

### 用途

技术栈、分类、状态、重点标识。

### Props

```ts
type TagProps = {
  variant?: 'tech' | 'category' | 'status' | 'highlight' | 'jade' | 'paper';
  size?: 'sm' | 'md';
  selected?: boolean;
  children: React.ReactNode;
};
```

### 视觉规范

- 圆角全圆。
- 高度 26px - 32px。
- 技术标签使用深色底 + 淡金/玉色边框。
- 博客分类可以使用纸色底 + 深绿字。
- selected 状态使用灵萤青边框或淡金填充。

### 示例

```text
[PyTorch Internals] [CUDA] [Distributed Training]
```

---

## 15.7 Card 基础卡片

### 用途

所有卡片的基础容器。

### Props

```ts
type CardProps = {
  variant?: 'dark' | 'paper' | 'wood' | 'jade' | 'glass';
  interactive?: boolean;
  decorative?: 'none' | 'moss' | 'bamboo' | 'treeRing' | 'jadeCorner';
  children: React.ReactNode;
};
```

### Variant 视觉

#### dark

- 背景：深青绿半透明。
- 边框：淡金弱线。
- 适合 About、Skill、Timeline 文本卡。

#### paper

- 背景：宣纸色。
- 文字：深木色。
- 适合 ProjectCard、BlogCard。

#### wood

- 背景：深木色。
- 适合边栏、装饰卡、联系模块。

#### jade

- 背景：玉绿色半透明。
- 适合 ContactCard、Badge 面板。

#### glass

- 背景：深色毛玻璃。
- 适合 Header、Modal。

### Interactive 状态

| 状态 | 视觉 |
|---|---|
| default | 静态阴影 + 细边框 |
| hover | 上浮 4px，边框转灵萤青，轻微 glow |
| active | 位移回落，边框更亮 |
| focus | 明确 focus ring |

---

## 15.8 HeroSection 首页首屏

### 结构

```text
HeroSection
├── HeroContent
│   ├── Title
│   ├── Subtitle
│   ├── Intro
│   ├── TagGroup
│   └── CTAGroup
├── HeroVisual
│   ├── TreeSanctuaryImage
│   ├── FireflyParticles
│   └── HiddenPortalHint
└── VerticalScrollTag optional
```

### Props

```ts
type HeroSectionProps = {
  nameCn: string;
  nameEn: string;
  subtitle: string;
  intro: string;
  tags: string[];
  primaryCta: CTA;
  secondaryCta: CTA;
  showPortalHint?: boolean;
};
```

### 布局

| 设备 | 布局 |
|---|---|
| Desktop | 左文字 45% - 50%，右插画 50% - 55% |
| Tablet | 上下结构或 45/55 双栏 |
| Mobile | 文字优先，插画作为背景弱化 |

### 视觉要求

- Hero 高度 desktop 建议 760px - 900px。
- 背景插画不可压低文字对比度。
- CTA 必须清晰。
- 灵萤彩蛋只作为细节，不抢主 CTA。

---

## 15.9 AboutCard 关于卡片

### 结构

```text
AboutCard
├── IconEmblem optional
├── Title optional
└── BodyText
```

### Props

```ts
type AboutCardProps = {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'intro' | 'focus' | 'traits';
};
```

### 特质 Badge

```text
系统思维
性能优化
工程落地
```

### 视觉要求

- About 区域使用深色卡片。
- 文案保持现代专业。
- 特质卡可使用圆形小图标 + 胶囊标签。

---

## 15.10 SkillTree 技能树组件

### 用途

展示技术能力结构。

### 结构

```text
SkillTree
├── TreeTrunkLogo
├── SkillBranchGroup left
│   └── SkillBranch
│       ├── BranchTitle
│       └── SkillNodeList
└── SkillBranchGroup right
    └── SkillBranch
        ├── BranchTitle
        └── SkillNodeList
```

### 数据结构

```ts
type SkillCategory = {
  id: string;
  title: string;
  icon?: string;
  skills: string[];
  side?: 'left' | 'right';
  relatedProjects?: string[];
  relatedPosts?: string[];
};
```

### 视觉规范

- 中央树干为视觉核心。
- 分类卡片围绕树干左右分布。
- 连接线像树枝，但不要影响阅读。
- 技能名称使用小号清晰字体。
- 每个分类卡片最多 4 - 8 个技能项。

### 响应式

| 设备 | 行为 |
|---|---|
| Desktop | 完整树形布局 |
| Tablet | 简化树形或双列卡片 |
| Mobile | 分组列表卡片，不显示复杂连接线 |

### 状态

| 状态 | 视觉 |
|---|---|
| default | 淡金边框，弱连接线 |
| hover category | 卡片边框变亮，相关树枝高亮 |
| hover skill | 技能项出现 tooltip |
| active | 可跳转项目或文章时显示外链图标 |

---

## 15.11 ProjectCard 项目卡片

### 用途

展示项目摘要，是首页与项目列表的核心组件。

### 结构

```text
ProjectCard
├── SideRibbon optional
├── Header
│   ├── Title
│   └── TagGroup
├── Summary
├── Highlight / Metric
└── Actions
    ├── DetailButton
    └── GitHubButton optional
```

### Props

```ts
type ProjectCardProps = {
  title: string;
  summary: string;
  tags: string[];
  metric?: string;
  featuredIndex?: string;
  href?: string;
  githubUrl?: string;
  variant?: 'featured' | 'compact' | 'list';
};
```

### 视觉规范

- 首页 featured 项目使用纸质卡片。
- 卡片边框可模拟竹简 / 法器匣，但信息区域现代。
- 左侧可有竖向编号，如“其一 / 其二 / 其三”。
- 卡片底部按钮使用 paper/secondary 风格。

### 尺寸建议

| 类型 | 宽度 | 高度 |
|---|---:|---:|
| featured desktop | 320px - 360px | 260px - 320px |
| compact | 280px - 320px | auto |
| list | 100% | auto |

### 状态

| 状态 | 视觉 |
|---|---|
| default | 纸色底、木色边框 |
| hover | 上浮，边角青苔/藤蔓更亮，按钮显色 |
| focus | 清晰 focus ring |

---

## 15.12 TimelineRingDisc 年轮盘组件

### 用途

展示个人成长时间线。该组件是根据最新设计调整后的核心时间线表现方式。

### 关键设计要求

时间线不是一串独立年轮节点，而是：

> 一个巨大的年轮盘，事件时间点是这个年轮盘中的一圈圈纹轮或纹轮上的高亮刻痕。

### 结构

```text
TimelineRingDisc
├── SectionHeader
├── RingDiscVisual
│   ├── ConcentricRingLayer
│   ├── CenterEmblem
│   ├── RingMilestoneMarker[]
│   └── GlowTrace optional
└── MilestoneLabels
    ├── MilestoneLabel 2021
    ├── MilestoneLabel 2023
    ├── MilestoneLabel 2024
    └── MilestoneLabel 2025
```

### 数据结构

```ts
type TimelineMilestone = {
  year: string;
  title: string;
  description: string;
  ringIndex: number;
  angle?: number;
  side?: 'left' | 'right' | 'top' | 'bottom';
};
```

### Props

```ts
type TimelineRingDiscProps = {
  milestones: TimelineMilestone[];
  centerLabel?: string;
  variant?: 'disc' | 'halfDisc' | 'compact';
};
```

### 视觉规范

- 年轮盘为横向椭圆或圆形木截面。
- 中心可放 `LYDT` 或树纹 logo。
- 每个年份对应某一圈纹轮上的一个亮点或刻痕。
- 连接线从纹轮上的亮点延伸到对应文字标签。
- 2021、2023、2024、2025 不应表现为四个独立年轮。
- 年轮线条使用暗木色 + 淡金高亮。
- 局部高亮像时间沉积在木纹中的微光。

### 推荐布局

Desktop：

```text
左侧标签        年轮盘中心        右侧标签
2021 ────╮                       ╭──── 2024
2023 ────╯      ◎ LYDT           ╰──── 2025
```

Mobile：

- 年轮盘缩小为顶部视觉。
- 事件标签改为纵向列表。
- 每个列表项保留小型纹轮 icon。

### MilestoneLabel 规范

```text
Year
Title
Description 2-3 lines
```

年份使用淡金大号字体，标题使用月白，说明使用次级文字。

### 状态

| 状态 | 视觉 |
|---|---|
| default | 所有纹轮低亮 |
| hover milestone | 对应纹轮高亮，连接线变亮 |
| active | label 卡片边框发光 |

---

## 15.13 BlogCard 博客卡片

### 用途

展示文章摘要。

### 结构

```text
BlogCard
├── OptionalIllustration
├── Title
├── Excerpt
├── Meta
│   ├── Date
│   ├── ReadingTime optional
│   └── CategoryTag
└── HoverLink optional
```

### Props

```ts
type BlogCardProps = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime?: string;
  href: string;
  illustration?: string;
  variant?: 'preview' | 'list' | 'compact';
};
```

### 视觉规范

- 首页博客卡片使用纸质卡片。
- 可加少量水墨小插图。
- 标题可读性优先。
- 摘要最多 3 行。

### 状态

| 状态 | 视觉 |
|---|---|
| default | 纸色底，旧纸边缘 |
| hover | 轻微上浮，标题颜色变深或金色，出现箭头 |

---

## 15.14 ContactCard 联系卡片

### 用途

展示 Email、GitHub、LinkedIn、Resume 等联系入口。

### 结构

```text
ContactCard
├── Icon
├── Label
├── Value
└── OptionalAction
```

### Props

```ts
type ContactCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  action?: 'copy' | 'link' | 'download';
  variant?: 'jade' | 'paper';
};
```

### 视觉规范

- 使用浅玉色 / 石色卡片。
- 图标居中偏大。
- 下方可有小吊坠装饰，但不影响点击区域。
- Resume 卡片可稍微突出。

### 交互

| action | 行为 |
|---|---|
| copy | 点击复制并显示 toast |
| link | 新窗口打开链接 |
| download | 下载 PDF |

---

## 15.15 Footer 页脚组件

### 结构

```text
Footer
├── LogoMark + SiteName
├── Copyright
├── FooterNav
└── HiddenPortalTextLink
```

### 视觉规范

- 深色背景。
- 与页面主背景自然融合。
- 使用细分割线。
- 彩蛋文字低调发光。

### HiddenPortal 文案

```text
树心深处，似乎还有一扇微微发光的小门。
```

---

## 15.16 HiddenPortal 彩蛋入口组件

### 用途

触发 2D 游戏彩蛋入口。

### 类型

```ts
type HiddenPortalVariant = 'firefly' | 'footerText' | 'treeRune';
```

### Props

```ts
type HiddenPortalProps = {
  variant?: HiddenPortalVariant;
  onOpen: () => void;
  subtle?: boolean;
};
```

### Variant 视觉

#### firefly

- 用于 Hero。
- 一只略亮于其他粒子的灵萤。
- hover 后出现提示：这只灵萤似乎想带你去哪里。

#### footerText

- 用于 Footer。
- 文本链接样式。
- hover 出现灵光下划线。

#### treeRune

- 可用于 Logo 或技能树某节点。
- 符文轻微脉冲。

---

## 15.17 PortalModal 进入洞天弹窗

### 用途

用户点击隐藏入口后确认是否进入游戏。

### 结构

```text
PortalModal
├── ModalHeader
│   └── Title: 进入灵木洞天？
├── ModalBody
│   └── Description
├── ModalActions
│   ├── EnterButton
│   └── CancelButton
└── OptionalDecoration
```

### 文案

```text
这是一个隐藏的 2D 探索彩蛋。你可以在树屋房间中查看项目、技能和笔记，也可以随时返回常规主页。
```

按钮：

- 进入洞天
- 还是看看主页

### 视觉规范

- 弹窗像树心门牌或发光竹简。
- 背景遮罩不要过黑。
- 不自动播放音乐。
- 移动端全宽卡片，保留边距。

---

## 15.18 ArticleRenderer 文章正文组件

### 用途

渲染博客详情页正文。

### 结构支持

- H1 / H2 / H3。
- Paragraph。
- Link。
- Blockquote。
- CodeBlock。
- Table。
- Image。
- List。
- Callout。

### 阅读规范

- 正文最大宽度：720px - 760px。
- 行高：1.75 - 1.9。
- 代码块深色背景。
- 表格支持横向滚动。
- 目录 TOC 桌面端可固定右侧。

---

## 15.19 CodeBlock 代码块组件

### Props

```ts
type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
};
```

### 视觉规范

- 背景：接近黑绿。
- 边框：淡金弱线。
- 复制按钮右上角。
- 语言标签左上角。
- 字体使用 mono。
- 不使用过度装饰影响代码对齐。

---

## 15.20 EmptyState / 404 组件

### 用途

空状态、错误页、404 页面。

### 视觉文案

404：

```text
你似乎走进了一间尚未长成的树洞。
```

按钮：

- 返回首页
- 去藏书枝阁

### 视觉

- 空树洞、迷雾、微弱月光。
- 保持温和，不做恐怖风。

---

## 16. Component State Matrix 组件状态矩阵

| 组件 | Default | Hover | Active | Focus | Disabled | Loading |
|---|---|---|---|---|---|---|
| Button | 必需 | 必需 | 必需 | 必需 | 必需 | 可选 |
| NavLink | 必需 | 必需 | 必需 | 必需 | 不需要 | 不需要 |
| ProjectCard | 必需 | 必需 | 可选 | 必需 | 不需要 | 不需要 |
| BlogCard | 必需 | 必需 | 可选 | 必需 | 不需要 | 不需要 |
| SkillNode | 必需 | 必需 | 必需 | 必需 | 可选 | 不需要 |
| Tag | 必需 | 必需 | selected | 必需 | 可选 | 不需要 |
| ContactCard | 必需 | 必需 | 可选 | 必需 | 可选 | 可选 |
| PortalModal | 必需 | 不需要 | 不需要 | 必需 | 不需要 | 可选 |

---

## 17. Accessibility 可访问性规范

### 17.1 对比度

- 正文文字对比度至少达到 WCAG AA。
- 深色背景上的月白文字必须足够清晰。
- 淡金色小字不应用于长正文。
- 灵萤青发光不能作为唯一状态提示。

### 17.2 键盘操作

必须支持：

- HeaderNav。
- Buttons。
- Cards links。
- PortalModal。
- Footer links。
- Article TOC。

### 17.3 Focus 样式

Focus ring 建议：

```css
outline: 2px solid rgba(156, 240, 189, 0.9);
outline-offset: 3px;
box-shadow: 0 0 0 4px rgba(156, 240, 189, 0.16);
```

### 17.4 动效可关闭

应支持：

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 18. Responsive Component Rules 响应式组件规则

### 18.1 首页组件响应式

| 组件 | Desktop | Mobile |
|---|---|---|
| HeaderNav | 横向导航 | Logo + 汉堡菜单 |
| HeroSection | 左文右图 | 文案优先，插图弱化为背景 |
| AboutSection | 双栏 / 三卡 | 单列卡片 |
| SkillTree | 中心树形布局 | 技能分类列表 |
| ProjectGrid | 三列卡片 | 单列卡片 |
| TimelineRingDisc | 大年轮盘 + 四周标签 | 小年轮盘 + 纵向列表 |
| BlogGrid | 三列卡片 | 单列卡片 |
| ContactSection | 月窗插画 + 卡片组 | 插画缩小，卡片两列或单列 |
| Footer | 多列 | 单列居中或左对齐 |

### 18.2 Mobile 简化原则

移动端优先保证：

- 阅读。
- CTA。
- 联系方式。
- 性能。

移动端可以减少：

- 粒子数量。
- 复杂树枝连接线。
- 背景插画细节。
- hover 专属效果。

---

## 19. Figma 组件库组织建议

### 19.1 Pages

```text
00 Cover
01 Foundations
02 Tokens
03 Components
04 Patterns
05 Homepage
06 Project Pages
07 Blog Pages
08 Game Portal
09 Archive / Drafts
```

### 19.2 Component Sections

```text
Components
├── Navigation
├── Buttons
├── Tags & Badges
├── Cards
├── Forms
├── Content
├── Timeline
├── SkillTree
├── Portal
├── Feedback
└── Decorations
```

### 19.3 Variant 命名

示例：

```text
Button / Primary / Md / Default
Button / Primary / Md / Hover
Button / Secondary / Md / Default
Card / Project / Featured / Default
Card / Project / Featured / Hover
Tag / Tech / Selected
```

---

## 20. Tailwind Theme 示例

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#071714',
          900: '#0B211D',
          850: '#0F2A25',
          800: '#12352E'
        },
        wood: {
          950: '#160F0A',
          900: '#24180F',
          800: '#352416',
          700: '#4A321D'
        },
        moss: {
          700: '#33513A',
          600: '#456C4E',
          500: '#5E8A67'
        },
        jade: {
          700: '#4E7A68',
          600: '#6A9580',
          500: '#8EB09B',
          300: '#B9D1C4'
        },
        firefly: {
          600: '#7AD7A5',
          500: '#9CF0BD',
          300: '#C9FFD9'
        },
        moon: {
          white: '#E8E2CF'
        },
        paper: {
          white: '#F0E5C9',
          warm: '#D8C7A2',
          old: '#B8A67E'
        },
        gold: {
          600: '#9F8243',
          500: '#C0A35D',
          300: '#E0CC88'
        },
        cinnabar: {
          700: '#7A2F26',
          600: '#9A4336'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        serif: ['Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace']
      },
      borderRadius: {
        button: '12px',
        card: '18px',
        panel: '24px',
        modal: '28px'
      },
      boxShadow: {
        glowFirefly: '0 0 18px rgba(156, 240, 189, 0.48)',
        glowGold: '0 0 20px rgba(224, 204, 136, 0.36)',
        cardHover: '0 16px 36px rgba(0,0,0,0.34), 0 0 18px rgba(156,240,189,0.16)'
      }
    }
  }
};
```

---

## 21. CSS Variables 示例

```css
:root {
  --lydt-color-bg-page: #071714;
  --lydt-color-bg-elevated: #0B211D;
  --lydt-color-text-primary: #E8E2CF;
  --lydt-color-text-secondary: #CFC4A8;
  --lydt-color-accent-gold: #E0CC88;
  --lydt-color-accent-firefly: #9CF0BD;
  --lydt-color-card-paper: #F0E5C9;
  --lydt-color-card-dark: rgba(11, 33, 29, 0.78);

  --lydt-radius-button: 12px;
  --lydt-radius-card: 18px;
  --lydt-radius-panel: 24px;

  --lydt-shadow-card-hover: 0 16px 36px rgba(0,0,0,0.34), 0 0 18px rgba(156,240,189,0.16);

  --lydt-duration-fast: 140ms;
  --lydt-duration-normal: 220ms;
  --lydt-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 22. 页面模式 Patterns

### 22.1 首页 Pattern

```text
HomePage
├── HeaderNav
├── HeroSection
├── AboutSection
├── SkillTreeSection
├── FeaturedProjectsSection
├── TimelineRingDiscSection
├── BlogPreviewSection
├── ContactSection
└── Footer
```

### 22.2 项目详情页 Pattern

```text
ProjectDetailPage
├── HeaderNav
├── ProjectHero
├── ProjectInfoGrid
├── ProblemSection
├── ArchitectureSection
├── ChallengeSection
├── MetricsSection
├── LinksSection
├── RelatedProjects
└── Footer
```

### 22.3 博客详情页 Pattern

```text
BlogPostPage
├── HeaderNav
├── ArticleHeader
├── ArticleLayout
│   ├── ArticleRenderer
│   └── TOC
├── RelatedPosts
└── Footer
```

---

## 23. 设计验收 Checklist

### 23.1 Tokens 验收

- 色彩全部来自 tokens。
- 字号和行高来自 typography tokens。
- 间距遵循 4px 系统。
- 圆角、阴影、边框不随意自造。
- 发光效果只使用 glow tokens。

### 23.2 组件验收

- Button 状态完整。
- Card 状态完整。
- HeaderNav desktop/mobile 完整。
- ProjectCard 至少有 featured、compact 两种。
- BlogCard 至少有 preview、list 两种。
- Timeline 使用统一年轮盘，不回退为多个独立小年轮。
- HiddenPortal 入口有 firefly 和 footerText 两种。

### 23.3 页面验收

- 首页 5 秒内能看懂身份和方向。
- 项目模块足够突出。
- 技能树可读，不是纯装饰。
- 时间线为统一大年轮盘结构。
- 联系入口清楚。
- 彩蛋入口低调但可发现。

### 23.4 风格验收

- 看起来像专业技术个人主页，而不是游戏登录页。
- 东方仙侠元素克制、有气质。
- 没有廉价光污染。
- 没有大面积高饱和红紫金。
- 文字区域没有被纹理污染。

---

## 24. 最小可实现组件优先级

### P0 第一批

- AppShell
- HeaderNav
- LogoMark
- Section / SectionHeader
- Button
- Tag
- Card
- HeroSection
- ProjectCard
- ContactCard
- Footer

### P1 第二批

- SkillTree
- TimelineRingDisc
- BlogCard
- PortalModal
- HiddenPortal
- ArticleRenderer
- CodeBlock

### P2 第三批

- Toast
- TOC
- SearchInput
- CategoryTabs
- ProjectFilter
- EmptyState
- DecorativeFireflies
- MistLayer

---

## 25. 总结

《灵木洞天》设计系统的核心不是“把网页古风化”，而是建立一套稳定的视觉语言：

- 深青绿是洞天的空气。
- 古木色是空间的骨骼。
- 月白是信息的纸面。
- 淡金是年轮里的时间。
- 灵萤青是交互和发现。
- 纸卡、玉片、竹简、树枝和年轮，是内容容器的隐喻。

最终所有页面和组件都应遵循同一个判断标准：

> 信息要像月光一样清楚，装饰要像青苔一样安静，交互要像灵萤一样被发现。

