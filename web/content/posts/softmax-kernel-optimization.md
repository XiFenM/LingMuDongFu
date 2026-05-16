---
slug: "softmax-kernel-optimization"
title: "从 Softmax Kernel 到性能优化"
visual: "steps"
image: "/assets/lydt/thumbnails/blog/blog-ink-softmax-kernel.png"
tags: ["CUDA", "Kernel", "Optimization"]
date: "2025-03-20"
readTime: "14 分钟阅读"
href: "/blog/softmax-kernel-optimization"
category: "札记"
excerpt: "分析 Softmax 的计算特征与访存模式，探讨 Kernel 优化方法与性能对比。"
---

## 引言

Softmax 是深度学习模型中的高频算子。它看似简单，却同时包含规约、指数计算、归一化和数值稳定性处理。

## 优化路径

- 先处理数值稳定性，使用 max trick 避免溢出。
- 观察访存模式，减少重复读写。
- 使用 warp-level reduction 降低同步开销。
- 对不同 shape 选择不同 kernel 策略。

## 性能观察

Softmax 的瓶颈常常不在计算量，而在访存与规约组织方式。对小维度、大 batch 和长序列，需要分别设计不同路径。

## 小结

一个好的 Softmax Kernel，应该在可读性、可维护性和性能之间取得平衡。
