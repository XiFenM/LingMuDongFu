---
id: "cuda-softmax"
title: "CUDA Softmax Kernel"
subtitle: "从 Triton 与 CUDA 视角拆解 GPU 编程、内核优化与算子实现。"
category: "GPU / 内核"
visual: "cube"
image: "/assets/lydt/thumbnails/projects/project-cuda-softmax.png"
tags: ["CUDA","Kernel","Performance"]
summary: "基于 warp-level 优化的高性能 Softmax Kernel 实现，支持 FP32/FP16 混合精度加速。"
date: "2024-11-28"
stars: "2.8k"
views: "12k"
readTime: "40 min"
href: "/projects/cuda-softmax"
sourceHref: "https://github.com/XiFenM"
demoHref: "/blog/triton-vs-cuda"
features: [{"title":"系统化梳理","desc":"从基础概念到高阶优化。"},{"title":"大量示例","desc":"提供可复现源码与注释。"},{"title":"性能导向","desc":"用指标驱动优化路径。"},{"title":"工程可用","desc":"结构清晰，便于迁移。"}]
metrics: [{"label":"PyTorch FP32","value":"43.21ms","note":"1.00x"},{"label":"Triton FP32","value":"18.76ms","note":"2.30x"},{"label":"CUDA FP32","value":"13.42ms","note":"3.21x"}]
---

## 项目概览

该项目系统梳理 Triton 与 CUDA 的核心概念、编程模型、内存层次、并行执行、性能优化方法与常见高性能算子实现方式。

## 背景与动机

在深度学习与科学计算领域，GPU 已经成为性能核心。项目通过从零实现 Softmax，观察访存、规约与数值稳定性如何共同决定吞吐。

## 核心特性

包含 shared memory 缓存、warp-level reduction、向量化访存、在线归并与性能基线对照。
