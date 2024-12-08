---
title: Diff
order: 3
---

# React diff

观看文档： https://7km.top/algorithm/diff

主要作用:

1. 给新增,移动,和删除节点设置`fiber.flags`(新增, 移动: `Placement`, 删除: `Deletion`)
2. 如果是需要删除的`fiber`,  除了自身打上`Deletion`之外, 还要将其添加到父节点的`effects`链表中

算法复杂度低, 从上至下比较整个树形结构, 时间复杂度被缩短到 O(n)

## 基本原理

比较对象: `旧fiber`对象与`新ReactElement`对象比较, 生成新的`fiber子节点`

两个比较方案：

- 单节点比较
- 可迭代节点比较

## 单节点比较

比较简单

1. 如果是新增节点, 直接新建 fiber
2. 如果是对比更新，如果`key`和`type`都相同, 则复用，否则新建

## 多节点比较

实际就是 2 个序列之间的比较(`链表oldFiber`和`数组newChildren`), 最后返回合理的`fiber`序列
整个核心逻辑分为 3 个 步骤:

1. 第一次循环: 遍历最长`公共`序列(key 相同), 公共序列的节点都视为可复用
   - 如果`newChildren序列`被遍历完, 那么`oldFiber序列`中剩余节点都视为删除(打上`Deletion`标记)
   - 如果`oldFiber序列`被遍历完, 那么`newChildren序列`中剩余节点都视为新增(打上`Placement`标记)
2. 第一次循环后, oldFiber 剩余序列加入到一个 map 中. 以 key 为键，以 fiber 为值。目的是为了第二次循环能方便的找到可复用节点
3. 第二次循环: 遍历剩余`非公共`序列, 优先复用 oldFiber 序列中的节点
   - 根据当前遍历到的 newChildren 的 key 去 map 中寻找有没有可复用的 fiber，并且判断需不需要移动，给需要移动的节点打上标记
   - 第二次循环遍历完成之后, `oldFiber序列中`没有匹配上的节点都视为删除(打上`Deletion`标记)

**那怎么标记移动节点呢**

源码中通过 lastPlacedIndex 和 oldIndex 索引变量来判断

`lastPlacedIndex` 含义是 上一个可复用节点在 oldFiber 中的索引，初始值为 0

`oldIndex` 含义是 当前可复用节点在 oldFiber 中的索引

`oldIndex < lastPlacedIndex`，代表本次更新该节点需要向右移动。

如果 `oldIndex >= lastPlacedIndex`，则 `lastPlacedIndex = oldIndex`。
