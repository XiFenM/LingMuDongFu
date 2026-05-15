---
id: "llm-inference"
title: "LLM Inference 优化实践"
subtitle: "从 Tokenization 到 KV Cache，压缩推理延迟。"
category: "系统优化"
visual: "lantern"
image: "/assets/lydt/thumbnails/projects/project-llm-inference.png"
tags: ["Inference","Optimization","KV Cache"]
summary: "从 Tokenization 到 KV Cache，再到推理优化，记录一系列工程优化实践与方案对比。"
date: "2024-07-21"
stars: "1.6k"
views: "6.3k"
readTime: "31 min"
href: "/projects/llm-inference"
sourceHref: "https://github.com/XiFenM"
demoHref: "/blog/kv-cache-inference"
features: [{"title":"延迟拆解","desc":"TTFT 与 TPOT 分开观察。"},{"title":"缓存策略","desc":"KV Cache 生命周期管理。"},{"title":"服务视角","desc":"兼顾稳定性与吞吐。"}]
metrics: [{"label":"TTFT","value":"-32%","note":"优化后"},{"label":"吞吐","value":"+24%","note":"batching"},{"label":"显存","value":"-18%","note":"缓存复用"}]
---

## 项目概览

梳理大模型推理链路中的延迟来源，并围绕 KV Cache、batching 与内存复用做实验。

## 背景与动机

推理服务的真实瓶颈往往随负载形态变化，需要同时关注首 token 延迟、吞吐、显存与尾延迟。

## 核心特性

包含请求调度、缓存复用、分层指标面板与优化前后对比。
