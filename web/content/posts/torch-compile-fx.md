---
slug: "torch-compile-fx"
title: "TorchScript / FX / torch.compile 关系总结"
visual: "gates"
image: "/assets/lydt/thumbnails/blog/blog-ink-torchscript-fx-compile.png"
tags: ["PyTorch", "Compiler", "FX"]
date: "2025-03-15"
readTime: "17 分钟阅读"
href: "/blog/torch-compile-fx"
category: "札记"
excerpt: "对比三种图表示与编译路径，总结在不同场景下的适用性与最佳实践。"
---

## 引言

PyTorch 的编译体系经历了 TorchScript、FX 到 torch.compile 的演进。每一代机制都在动态图灵活性与静态优化能力之间寻找平衡。

## 三类机制

- TorchScript：更偏静态编译与部署。
- FX：更适合 Python 层图捕获、变换与分析。
- torch.compile：面向动态图程序的端到端捕获与优化入口。

## 使用建议

如果目标是分析模型结构，FX 仍然非常直接。如果目标是生产性能优化，torch.compile 提供了更完整的编译链路。

## 小结

理解这些工具的边界，可以避免把编译工具当作万能黑盒，也能更快定位图捕获失败和性能退化问题。
