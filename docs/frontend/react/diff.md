---
title: Diff
order: 3
---

# React diff

传统 diff 算法通过循环递归对节点进行一次对比，效率低下，复杂度达到 O(n^3)
react 将算法进行优化，复杂度降为 O(n)

## 原理

diff 算法主要遵循三个层级的策略

- tree 层级
- component 层级
- element 层级

### tree 层级

DOM 节点`跨层级操作不做优化`，只会对`相同层级节点`进行比较

只有`删除、创建`，没有移动
