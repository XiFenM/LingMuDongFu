# 2026-05-14 home fixes

针对用户反馈修复首页三个问题：

1. 首页首屏移除突兀挂轴叠层，避免遮挡树洞/圆窗主视觉。
2. 灵木技能树移除 LYDT 圆标，改为代码化 SVG 灵木树干/枝干结构。
3. 年轮时间线移除 LYDT 中心标，弃用粗糙中心图片，改为代码化 SVG 椭圆年轮盘和时间点连线。

验证：
- `npm run build` 通过
- `npx tsc --noEmit --pretty false` 通过（build 后重新执行）
- 截图见 `screenshots/`
