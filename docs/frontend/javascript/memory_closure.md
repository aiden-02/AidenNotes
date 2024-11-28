---
title: 内存管理和闭包
order: 4
---

# JavasScript 内存管理和闭包

JavaScript 的内存管理是自动的，无形的

我们创建的原始值、对象、函数……这一切都会占用内存

但是我们并不需要手动来对它们进行管理，JavaScript 引擎会帮助我们处理好它

JavaScript 会在定义数据时为我们分配内存。

- JS 对于`原始数据类型`内存的分配会在执行时，直接在`栈空间`进行分配；
- JS 对于`复杂数据类型`内存的分配会在`堆内存`中开辟一块空间，并且将这块空间的`指针`返回值变量引用；

## JavaScript 垃圾回收

Garbage Collection，简称 GC

常见的 GC 算法

1. `引用计数`（Reference counting）

- 当一个对象有一个引用指向它时，那么这个对象的引用就+1；
- 当一个对象的引用为 0 时，这个对象就可以被销毁
- 弊端： 会产生循环引用，即互相引用时，得不到销毁

2. `标记清除`（mark-Sweep）

- 标记清除的核心思路是`可达性`（Reachability）
- 这个算法是设置一个根对象（root object），垃圾回收器会定期从这个根开始，找所有从根开始有引用到的对象，对于那些没有引用到的对象，就认为是不可用的对象；
- 标记清除算法通常使用`深度优先搜索`（DFS）来遍历对象图。
- 该算法可以很好的解决循环引用的问题

3. V8 的优化算法

- `标记整理`（Mark-Compact） 和“标记－清除”相似；不同的是，回收期间同时会将保留的存储对象搬运`汇集到连续的内存空间`，从而整合空闲空间，`避免内存碎片化`；
- `分代收集`（Generational collection）—— 对象被分成两组：“新的”和“旧的”。
  - 许多对象出现，完成它们的工作并很快死去，它们可以很快被清理
  - 那些长期存活的对象会变得“老旧”，而且被检查的频次也会减少；
- `增量收集`（Incremental collection）
  - 如果有许多对象，并且我们试图一次遍历并标记整个对象集，则可能需要一些时间，并在执行过程中带来明显的延迟
  - 所以引擎试图将垃圾收集工作分成几部分来做，然后将这几部分会逐一进行处理，这样会有许多微小的延迟而不是一个大的延迟；
- `闲时收集`（Idle-time collection）垃圾收集器只会在 CPU 空闲时尝试运行，以减少可能对代码执行的影响。

## 闭包

`闭包 Closure`，又称词法闭包或函数闭包

是在支持头等函数的编程语言中，实现词法绑定的一种技术

闭包在实现上是一个`结构体`，它`存储了一个函数和一个关联的环境`（相当于一个符号查找表）

闭包和函数最大的区别在于，当捕捉闭包的时候，它的自由变量会在捕捉时被确定，这样即使脱离了捕捉时的上下文，它也能照常运行

MDN 中对闭包的解释

- 一个函数和对其`周围状态（lexical environment，词法环境）的引用`捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）；
- 也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域；
- 在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来；

我的理解和总结

- 一个普通的函数 function，如果它可以访问`外层作用域的自由变量`，那么这个函数和周围环境就是一个闭包；
- `从广义的角度来说：JavaScript 中的函数都是闭包；`
- `从狭义的角度来说：JavaScript 中一个函数，如果访问了外层作用域的变量，那么它是一个闭包；`