---
title: 对象高级
order: 6
---

# JavaScript 对象高级

## defineProperty

[`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```js
Object.defineProperty(obj, prop, descriptor)
// obj为要定义属性的对象
// prop为要定义或修改的属性名称
// descriptor则为该属性的描述符
```

### 属性描述符

**数据属性描述符**

`Configurable`：表示属性是否可以通过 `delete` 删除属性，是否可以`修改`它的特性，或者是否可以将它修改为`存取属性描述符`；

- 当我们直接在一个对象上定义某个属性时，这个属性的`Configurable`为 true；
- 当我们通过属性描述符定义一个属性时，这个属性的`Configurable`默认为 false；

`Enumerable`：表示属性是否可以通过 `for-in` 或者 `Object.keys()` 返回该属性；

- 当我们直接在一个对象上定义某个属性时，这个属性的`Enumerable`为 true；
- 当我们通过属性描述符定义一个属性时，这个属性的`Enumerable`默认为 false；

`Writable`：表示是否可以修改属性的值；

- 当我们直接在一个对象上定义某个属性时，这个属性的`Writable`为 true；
- 当我们通过属性描述符定义一个属性时，这个属性的`Writable`默认为 false；

`value`：属性的 value 值，读取属性时会返回该值，修改属性时，会对其进行修改；

- 默认情况下这个值是 `undefined`；

**存取属性描述符**

`get`：获取属性时会执行的函数。默认为 `undefined`

`set`：设置属性时会执行的函数。默认为 `undefined`

## defineProperties

[`Object.defineProperties`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) 方法直接在一个对象上定义 `多个` 新的属性或修改现有属性，并且返回该对象。

```js
const obj = {
  _age: 18,
}
Object.defineProperties(obj, {
  name: {
    writable: true,
    value: 'me',
  },
  age: {
    get: function () {
      return this._age
    },
  },
})
```

## keys、 values、entries

[`Object.keys`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 获取一个对象所有`可枚举字符串`的 key

[`Object.values`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values) 获取所有`可枚举字符串`属性的 value 值

[`Object.entries`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) 返回一个数组，包含给定对象自有的`可枚举字符串`键属性的键值对。

:::warning 注意
以上都是针对字符串键，若是 Symbol 键则无效
:::

## 其它方法补充

获取对象的属性描述符：

- [`getOwnPropertyDescriptor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
- [`getOwnPropertyDescriptors`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)

禁止对象扩展新属性：[`preventExtensions`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)

- 给一个对象添加新的属性会失败（在严格模式下会报错）；

密封对象，不允许配置和删除属性：[`seal`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)

- 实际是调用 preventExtensions
- 并且将现有属性的 configurable: false

冻结对象，不允许修改现有属性： [`freeze`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

- 实际上是调用 seal
- 并且将现有属性的 writable: false
