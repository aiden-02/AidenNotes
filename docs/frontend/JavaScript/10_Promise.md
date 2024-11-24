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

### 手写 then

```js
Promise.prototype.then = function (onFulfilled, onRejected) {
  const self = this // 保存当前的 Promise 实例
  return new Promise((resolve, reject) => {
    // 返回一个新的 Promise 实例
    const handle = (callback) => {
      // 定义一个处理函数，用于处理回调
      try {
        const result = callback(self.value) // 调用回调函数，并传入当前 Promise 的值
        if (result instanceof Promise) {
          // 如果回调函数返回的是一个 Promise
          result.then(resolve, reject) // 新的 Promise 将跟随这个返回的 Promise
        } else {
          resolve(result) // 否则，新的 Promise 将被 resolve，并传入回调函数的返回值
        }
      } catch (error) {
        reject(error) // 如果回调函数抛出错误，新的 Promise 将被 reject，并传入错误
      }
    }

    if (self.state === 'fulfilled') {
      // 如果当前 Promise 的状态是 fulfilled
      setTimeout(() => handle(onFulfilled), 0) // 异步调用 onFulfilled 回调函数
    } else if (self.state === 'rejected') {
      // 如果当前 Promise 的状态是 rejected
      setTimeout(() => handle(onRejected), 0) // 异步调用 onRejected 回调函数
    }
  })
}
```

## Promise.all

[`Promise.all`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 将多个 Promise 包裹在一起形成一个新的 Promise

当所有输入的 `Promise` 都被兑现时，返回的 Promise 也将被兑现（即使传入的是一个空的可迭代对象），并返回一个包含所有兑现值的`数组`。如果输入的`任何一个 Promise 被拒绝`，则返回的 Promise 将被拒绝，并带有`第一个`被拒绝的原因。

### 手写 `Promise.all`

```js
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'))
    }

    let resolvedCount = 0 // 已经解决的 Promise 数量
    const results = new Array(promises.length) // 存储每个 Promise 的结果

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          resolvedCount++ // 每解决一个 Promise，计数加一
          results[index] = value // 将结果存储在对应的位置

          if (resolvedCount === promises.length) {
            resolve(results) // 如果所有 Promise 都解决了，resolve 最终的结果数组
          }
        },
        (reason) => {
          reject(reason) // 如果有一个 Promise 被拒绝，reject 整个 Promise
        }
      )
    })

    if (promises.length === 0) {
      resolve([]) // 如果传入的是一个空数组，直接 resolve 一个空数组
    }
  })
}
```

## Promise.allSettled

[`Promise.allSettled`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) 静态方法将一个 `Promise 可迭代对象`作为输入，并返回一个单独的 `Promise`。当所有输入的 Promise 都已`敲定`时（包括传入空的可迭代对象时），返回的 Promise 将被`兑现`，并带有`描述每个 Promise 结果的对象数组`。

### 手写 `Promise.allSettled`

```js
Promise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'))
    }

    let settledCount = 0 // 已经敲定的 Promise 数量
    const results = new Array(promises.length) // 存储每个 Promise 的结果

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          results[index] = { status: 'fulfilled', value } // 将结果存储在对应的位置，并标记为 fulfilled
          settledCount++ // 每敲定一个 Promise，计数加一

          if (settledCount === promises.length) {
            resolve(results) // 如果所有 Promise 都敲定了，resolve 最终的结果数组
          }
        },
        (reason) => {
          results[index] = { status: 'rejected', reason } // 将结果存储在对应的位置，并标记为 rejected
          settledCount++ // 每敲定一个 Promise，计数加一

          if (settledCount === promises.length) {
            resolve(results) // 如果所有 Promise 都敲定了，resolve 最终的结果数组
          }
        }
      )
    })

    if (promises.length === 0) {
      resolve([]) // 如果传入的是一个空数组，直接 resolve 一个空数组
    }
  })
}
```

## Promise.race

[`Promise.race()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) 静态方法接受一个 promise 可迭代对象作为输入，并返回一个 Promise。这个返回的 promise 会随着`第一个 promise 的敲定`而敲定。

### 手写 Promise.race

```js
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'))
    }

    promises.forEach((promise) => {
      Promise.resolve(promise).then(
        (value) => {
          resolve(value) // 第一个解决的 Promise，resolve 返回的 Promise
        },
        (reason) => {
          reject(reason) // 第一个被拒绝的 Promise，reject 返回的 Promise
        }
      )
    })

    if (promises.length === 0) {
      resolve() // 如果传入的是一个空数组，直接 resolve
    }
  })
}
```

## Promise.any

[`Promise.any()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) 静态方法将一个 `Promise 可迭代对象`作为输入，并返回一个 Promise。当输入的`任何一个 Promise 兑现`时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。

### 手写 Promise.any

```js
Promise.any = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'))
    }

    let rejectCount = 0 // 已经被拒绝的 Promise 数量
    const errors = new Array(promises.length) // 存储每个被拒绝的原因

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          resolve(value) // 第一个兑现的 Promise，resolve 返回的 Promise
        },
        (reason) => {
          rejectCount++ // 每被拒绝一个 Promise，计数加一
          errors[index] = reason // 将拒绝原因存储在对应的位置

          if (rejectCount === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected')) // 如果所有 Promise 都被拒绝，reject 并传入 AggregateError
          }
        }
      )
    })

    if (promises.length === 0) {
      reject(new AggregateError([], 'All promises were rejected')) // 如果传入的是一个空数组，直接 reject 并传入 AggregateError
    }
  })
}
```
