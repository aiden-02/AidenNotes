---
title: 状态更新
order: 4
---

# React 状态更新

## 流程概览

在 React 中，有如下方法可以触发状态更新（排除 SSR 相关）：

- ReactDOM.render

- this.setState

- this.forceUpdate

- useState

- useReducer

这些方法调用的场景各不相同，他们是如何接入同一套状态更新机制呢？

答案是：每次状态更新都会创建一个保存更新状态相关内容的对象，我们叫他 `Update`。在 render 阶段的 `beginWork` 中会根据 `Update` 计算新的 `state`。

让我们继续补全从触发状态更新到 render 阶段的路径。

现在触发状态更新的 fiber 上已经包含 Update 对象。从触发状态更新的 fiber 一直向上遍历到 rootFiber，并返回 `rootFiber`

现在我们拥有一个 `rootFiber`，该 `rootFiber` 对应的 `Fiber` 树中某个 `Fiber` 节点包含一个 `Update`。
接下来通知 `Scheduler` 根据更新的优先级，决定以`同步还是异步`的方式调度本次更新。

这里调度的回调函数是

```js
performSyncWorkOnRoot.bind(null, root)
performConcurrentWorkOnRoot.bind(null, root)
```

即 `render` 阶段的入口函数。

至此，状态更新就和我们所熟知的 `render` 阶段连接上了

### 状态更新调用路径

```js
触发状态更新（根据场景调用不同方法）

    |
    |
    v

创建Update对象（接下来详解）

    |
    |
    v

从fiber到root（`markUpdateLaneFromFiberToRoot`）

    |
    |
    v

调度更新（`ensureRootIsScheduled`）

    |
    |
    v

render阶段（`performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot`）

    |
    |
    v

commit阶段（`commitRoot`）
```

## Update

我们知道状态更新流程开始后首先会创建 Update 对象。

### Update 的分类

我们先来了解 `Update` 的结构。

首先，我们将可以触发更新的方法所隶属的组件分类：

- ReactDOM.render —— HostRoot

- this.setState —— ClassComponent

- this.forceUpdate —— ClassComponent

- useState —— FunctionComponent

- useReducer —— FunctionComponent

可以看到，一共三种组件（`HostRoot` | `ClassComponent` | `FunctionComponent`）可以触发更新。

由于不同类型组件工作方式不同，所以存在两种不同结构的 `Update`，其中 `ClassComponent` 与 `HostRoot` 共用一套 Update 结构，`FunctionComponent` 单独使用一种 Update 结构。

虽然他们的结构不同，但是他们工作机制与工作流程大体相同。在本节我们介绍前一种 Update，FunctionComponent 对应的 Update 在 Hooks 章节介绍。

### Update 的结构

`ClassComponent` 与 `HostRoot`（即 `rootFiber.tag` 对应类型）共用同一种 `Update` 结构

对应的结构如下

```js
const update: Update<*> = {
  eventTime,
  lane,
  suspenseConfig,
  tag: UpdateState,
  payload: null,
  callback: null,

  next: null,
}
```

字段意义如下：

- eventTime：任务时间，通过 `performance.now()` 获取的毫秒数。由于该字段在未来会重构，当前我们不需要理解他。

- lane：优先级相关字段。当前还不需要掌握他，只需要知道不同 `Update` 优先级可能是不同的。

- suspenseConfig：Suspense 相关，暂不关注。

- tag：更新的类型，包括 `UpdateState` | `ReplaceState` | `ForceUpdate` | `CaptureUpdate。`

- payload：更新挂载的数据，不同类型组件挂载的数据不同。对于 `ClassComponent`，`payload` 为 `this.setState` 的第一个传参。对于 `HostRoot`，`payload` 为 `ReactDOM.render` 的第一个传参。

- callback：更新的回调函数。在 `commit` 阶段的 `layout` 子阶段回调。

- next：与其他 `Update` 连接形成链表

### Update 与 Fiber 的联系

我们发现，Update 存在一个连接其他 Update 形成链表的字段 next。联系 React 中另一种以链表形式组成的结构 Fiber，他们之间有什么关联么？

答案是肯定的。

类似 Fiber 节点组成 Fiber 树，`Fiber` 节点上的多个 `Update` 会组成链表并被包含在 `fiber.updateQueue` 中。

`Fiber` 节点最多同时存在两个 `updateQueue`

`current fiber` 保存的 `updateQueue` 即 `current updateQueue`

`workInProgress fiber` 保存的 `updateQueue` 即 `workInProgress updateQueue`

在 `commit` 阶段完成页面渲染后，`workInProgress Fiber` 树变为 `current Fiber` 树，`workInProgress Fiber` 树内 `Fiber` 节点的 `updateQueue` 就变成 `current updateQueue`。

### updateQueue

`ClassComponent` 与 `HostRoot` 使用的 `UpdateQueue` 结构如下：

```js
const queue: UpdateQueue<State> = {
  baseState: fiber.memoizedState,
  firstBaseUpdate: null,
  lastBaseUpdate: null,
  shared: {
    pending: null,
  },
  effects: null,
}
```

字段说明如下：

- `baseState`：本次更新前该 Fiber 节点的 state，Update 基于该 state 计算更新后的 state。

- `firstBaseUpdate` 与 `lastBaseUpdate`：本次更新前该 `Fiber` 节点已保存的 `Update`。以链表形式存在，链表头为 `firstBaseUpdate`，链表尾为 `lastBaseUpdate`。之所以在更新产生前该 `Fiber` 节点内就存在 `Update`，是由于某些 `Update` 优先级较低所以在上次 `render` 阶段由 `Update` 计算 `state` 时被跳过。

- `shared.pending`：触发更新时，产生的 `Update` 会保存在 `shared.pending` 中形成单向环状链表。当由 `Update` 计算 `state` 时这个环会被剪开并连接在 `lastBaseUpdate` 后面。

- `effects`：数组。保存 `update.callback !== null` 的 `Update`。

### 例子

`updateQueue` 相关代码逻辑涉及到大量链表操作，比较难懂。在此我们举例对 `updateQueue` 的工作流程讲解下。

假设有一个 `fiber` 刚经历 `commit` 阶段完成渲染。

该 `fiber` 上有两个由于优先级过低所以在上次的 `render` 阶段并没有处理的 `Update`。他们会成为下次更新的`baseUpdate`。

我们称其为 `u1` 和 `u2`，其中 `u1.next === u2`。

```js
fiber.updateQueue.firstBaseUpdate === u1
fiber.updateQueue.lastBaseUpdate === u2
u1.next === u2
```

我们用 `-->` 表示链表的指向：

```js
fiber.updateQueue.baseUpdate: u1 --> u2
```

现在我们在 `fiber` 上触发两次状态更新，这会先后产生两个新的 `Update`，我们称为 `u3` 和 `u4`。

每个 `update` 都会通过 `enqueueUpdate` 方法插入到 `updateQueue` 队列上

当插入 `u3` 后：

```js
fiber.updateQueue.shared.pending === u3
u3.next === u3
```

`shared.pending` 的环状链表，用图表示为：

```js
fiber.updateQueue.shared.pending:   u3 ─────┐
                                     ^      |
                                     └──────┘
```

接着插入 `u4` 之后：

```js
fiber.updateQueue.shared.pending === u4
u4.next === u3
u3.next === u4
```

`shared.pending` 是环状链表，用图表示为：

```js
fiber.updateQueue.shared.pending:   u4 ──> u3
                                     ^      |
                                     └──────┘
```

> `shared.pending`会保证始终指向最后一个插入的 `update`，你可以在[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactUpdateQueue.new.js#L208)看到 `enqueueUpdate` 的源码

更新调度完成后进入 `render` 阶段。

此时 `shared.pending` 的环被剪开并连接在 `updateQueue.lastBaseUpdate` 后面：

```js
fiber.updateQueue.baseUpdate: u1 --> u2 --> u3 --> u4
```

接下来遍历 `updateQueue.baseUpdate` 链表，以 `fiber.updateQueue.baseState` 为初始 `state`，依次与遍历到的每个 `Update` 计算并产生新的 `state`（该操作类比 `Array.prototype.reduce`）。

在遍历时如果有优先级低的 `Update` 会被跳过。

当遍历完成后获得的 `state`，就是该 `Fiber` 节点在本次更新的 `state`（源码中叫做 `memoizedState`）。

> `render` 阶段的 `Update` 操作由 `processUpdateQueue` 完成，你可以从[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactUpdateQueue.new.js#L405)看到 `processUpdateQueue` 的源码

`state` 的变化在 `render` 阶段产生与上次更新不同的 `JSX` 对象，通过 `Diff` 算法产生 `effectTag`，在 `commit` 阶段渲染在页面上。

渲染完成后 `workInProgress Fiber` 树变为 `current Fiber` 树，整个更新流程结束。