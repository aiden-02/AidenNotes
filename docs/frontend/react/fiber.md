---
title: Fiber
order: 2
---

# React Fiber

`Fiber` 是 React 16 引入的一种新的协调引擎，用于解决和优化 React 应对`复杂 UI 渲染`时的`性能问题`

React 源码解析英文版  [https://pomb.us/build-your-own-react/](https://pomb.us/build-your-own-react/)

## Fiber 的作用

为了解决 `React15` 在`大组件更新`时产生的卡顿现象，React 团队提出了 `Fiber` 架构，并在 `React16` 发布，将 `同步递归无法中断的更新` 重构为 `异步的可中断更新`

它实现了 4 个具体目标

1. `可中断的渲染`：Fiber 允许将大的渲染任务拆分成多个`小的工作单元`（Unit of Work），使得 React 可以在`空闲时间`执行这些小任务。当浏览器需要处理`更高优先级`的任务时（如用户输入、动画），可以`暂停渲染`，先处理这些任务，然后再`恢复`未完成的渲染工作。
2. `优先级调度`：在 Fiber 架构下，React 可以根据`不同任务的优先级`决定何时更新哪些部分。React 会优先更新`用户可感知的部分`（如动画、用户输入），而低优先级的任务（如数据加载后的界面更新）可以延后执行。
3. `双缓存树（Fiber Tree）`：Fiber 架构中有两棵 Fiber 树——`current fiber tree`（当前正在渲染的 Fiber 树）和 `work in progress fiber tree`（正在处理的 Fiber 树）。React 使用这两棵树来`保存更新前后的状态`，从而更高效地进行`比较和更新`。
4. `任务切片`：在浏览器的空闲时间内（利用 `requestIdleCallback` 思想），React 可以将渲染任务拆分成多个`小片段`，逐步完成 Fiber 树的构建，避免一次性完成所有渲染任务导致的阻塞。
