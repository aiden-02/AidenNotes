# [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

- `Promise` 是一个类，可以翻译成 承诺、许诺 、期约；
- 当我们需要的时候，给予调用者一个承诺：待会儿我会给你回调数据时，就可以创建一个 `Promise` 的对象；
- 在通过 new 创建 `Promise` 对象时，我们需要传入一个回调函数，我们称之为 `executor`

  ✓ 这个回调函数会被`立即执行`，并且给传入另外两个回调函数 `resolve`、`reject`；

  ✓ 当我们调用 `resolve` 回调函数时，会执行 Promise 对象的 `then(onFulfillment)` 方法传入的回调函数；

  ✓ 当我们调用 `reject` 回调函数时，会执行 Promise 对象的`then(..., onRejection)` 或者 `catch` 方法传入的回调函数；

## Promise 状态

一个 `Promise` 必然处于以下几种状态之一：

- _待定（pending）_：初始状态，既没有被兑现，也没有被拒绝。
- _已兑现（fulfilled）_：意味着操作成功完成。
- _已拒绝（rejected）_：意味着操作失败。

还记得上文中的 `executor`， 它的两个入参 `resolve、reject` 可以确定 `Promise` 状态

- 通过 `resolve`，可以兑现（`fulfilled`）Promise 的状态，我们也可以称之为已决议（resolved）；
- 通过 `reject`，可以拒绝（`rejected`）Promise 的状态；

一旦状态被确定下来，Promise 的状态会被 `锁死`，该 Promise 的状态是不可更改的

## resolve

情况一：如果`resolve`传入一个普通的值或者对象，那么这个值会作为 then 回调的参数；

情况二：如果`resolve`中传入的是另外一个`Promise`，那么这个新 Promise 会决定原 Promise 的状态：

情况三：如果`resolve`中传入的是一个`thenable`对象,那么会执行该 then 方法，并且根据 then 方法的结果来决定 Promise 的状态：

```js
// 情况一
new Promise((resolve) => {
  resolve('normal resolve')
}).then(console.log) // normal resolve
// 情况二
new Promise((resolve) => {
  resolve(Promise.resolve('nested resolve'))
}).then(console.log) // nested resolve
// 情况二
new Promise((resolve) => {
  resolve(new Promise((resolve) => resolve('nested resolve')))
}).then(console.log) // nested resolve
// 情况三
new Promise((resolve) => {
  resolve({
    then: (resolve) => resolve('thenable resolve'),
  })
}).then(console.log) // thenable resolve
```

## then

`then` 方法是 Promise 原型上的方法 `Promise.prototype.then`

`then` 方法接受两个参数

- `fulfilled` 的回调函数，当状态变成 fulfilled 时会回调的函数
- `rejected` 的回调函数，当状态变成 rejected 时会回调的函数
