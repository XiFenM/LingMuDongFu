---
id: "megatron-parallel"
title: "Megatron 并行机制笔记"
subtitle: "系统梳理 Megatron 与 DeepSpeed 并行策略的工程边界。"
category: "AI / 深度学习"
visual: "tree"
image: "/assets/lydt/thumbnails/projects/project-megatron-parallel.png"
tags: ["PyTorch","Megatron","DeepSpeed"]
summary: "系统性梳理 Megatron 及 DeepSpeed 并行策略与实现细节，结合源码与公式，形成可复用笔记。"
date: "2025-02-12"
stars: "1.9k"
views: "115"
readTime: "35 min"
href: "/projects/megatron-parallel"
sourceHref: "https://github.com/XiFenM"
demoHref: "/blog/megatron-parallelism"
features: [{"title":"并行地图","desc":"TP / PP / SP 边界一图对齐。"},{"title":"通信复盘","desc":"记录 Collective 与 overlap 代价。"},{"title":"工程可用","desc":"配置、指标、排查路径可复用。"}]
metrics: [{"label":"训练卡数","value":"128","note":"H100 集群"},{"label":"并行策略","value":"3","note":"TP / PP / SP"},{"label":"复盘条目","value":"42","note":"工程笔记"}]
---

## 项目概览

围绕 Tensor Parallel、Pipeline Parallel 与 Sequence Parallel，拆解模型切分、通信调度与 bubble 形成机制。

## 背景与动机

当模型规模超过单卡容量后，训练性能不再只取决于算子速度，而取决于通信、显存与调度之间的整体平衡。

## 核心特性

提供并行策略对照、通信路径图、典型配置建议与故障排查清单，便于后续工程复盘。
