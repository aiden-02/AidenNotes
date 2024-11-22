# js 高级

## this 指向

1. 默认绑定：绑定到 globalThis、严格默认下为 undefined

2. 隐式绑定：绑定到函数的**调用对象**上，注意，不是函数定义的位置

3. 显式绑定：apply、call、bind

   > 如果函数绑定的是 null 或 undefined，则显式绑定会被忽略，使用默认绑定规则
   >
   > ```js
   > foo.call(null) // window
   > foo.call(undefined) // window
   > const bar = foo.bind(null)
   > bar() // window
   > ```

4. new 绑定

   - 创建一个全新的对象
   - 新对象的[[prototype]]指向构造函数的 prototype 对象上
   - 将 this 绑定到该新对象上
   - 若是没有指定的返回对象，则返回这个新对象

优先级：new > bind > apply、call > 显式 > 隐式

## 箭头函数

箭头函数不会绑定 this、arguments 属性，且不能作为构造函数使用。

箭头函数不适用 this 的四种绑定规则，而是根据外层作用域来决定 this
