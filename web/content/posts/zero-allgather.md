---
slug: "zero-allgather"
title: "ZeRO 参数分片与 AllGather 流程分析"
visual: "pages"
image: "/assets/lydt/thumbnails/blog/blog-ink-zero-allgather.png"
tags: ["LLM", "ZeRO", "Distributed"]
date: "2025-03-10"
readTime: "19 分钟阅读"
href: "/blog/zero-allgather"
category: "札记"
excerpt: "解析 ZeRO 各阶段的内存优化策略，深入 AllGather 的执行流程与通信开销。"
---

## 引言

ZeRO 通过切分优化器状态、梯度和参数来降低单卡显存压力。AllGather 则是参数重组与计算恢复过程中的关键通信动作。

## 核心流程

- 参数按 rank 分片存储。
- 前向或反向需要完整参数时触发 AllGather。
- 计算完成后释放或重新分片，降低峰值显存。

## 性能关注点

AllGather 的时机、粒度和 overlap 策略会影响端到端吞吐。过细会带来调度开销，过粗会增加显存峰值。

## 小结

ZeRO 的收益来自显存与通信之间的平衡。理解 AllGather 流程，有助于解释训练中的显存峰值和通信等待。
