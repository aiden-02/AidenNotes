# js 初级

## 一、数据类型

7 种值类型，1 种引用类型（Object）

- Number
- String
- Boolean
- Null
- Undefined
- Symbol
- Bigint
- Object

## 二、事件对象 event

常见的属性：

- type：事件的类型
- target：当前事件发生的元素；
- currentTarget：当前处理事件的元素；
- eventPhase：事件所处的阶段；
- offsetX、offsetY：事件发生在元素内的位置；
- clientX、clientY：事件发生在客户端内的位置；
- pageX、pageY：事件发生在客户端相对于 document 的位置；
- screenX、screenY：事件发生相对于屏幕的位置；

常见的方法：

- preventDefault：取消事件的默认行为；
- stopPropagation：阻止事件的进一步传递（冒泡或者捕获都可以阻止）；

## 三、事件委托

当子元素被点击，父元素可以通过冒泡监听到子元素被点击。可以通过 event.target 获取到当前被点击的子元素。在父元素中处理子元素事件，而不用给每个子元素添加一个监听器。

某些事件委托可能需要对具体的子组件进行区分，这个时候我们可以使用 data-\*属性进行标记，然后通过 event.target.dataset.\*来拿到标记

## 四、DOM

文档对象模型 Document Object Model

在 DOM（文档对象模型）中，`Node` 和 `Element` 是两个不同的概念，它们有不同的用途和特性。

### Node

`Node` 是 DOM 中的基本单元，表示文档树中的一个节点。所有的 DOM 节点类型都继承自 `Node` 接口。`Node` 可以是以下几种类型之一：

- **元素节点（Element）**：表示 HTML 元素。
- **文本节点（Text）**：表示元素或属性中的文本内容。
- **注释节点（Comment）**：表示注释。
- **文档节点（Document）**：表示整个文档。
- **文档片段节点（DocumentFragment）**：表示轻量级的文档对象，可以包含多个节点。
- **属性节点（Attr）**：表示元素的属性（在现代浏览器中已被废弃）。

### Element

`Element` 是一种特定类型的 `Node`，表示 HTML 或 XML 文档中的一个元素。`Element` 继承自 `Node`，并且具有特定于元素的属性和方法，例如操作属性、类名、样式等。

### 区别总结

- **Node** 是一个基类，表示 DOM 树中的任何节点。
- **Element** 是 `Node` 的子类，表示具体的 HTML 或 XML 元素。

节点 node 之间的导航

父节点：parentNode、前兄弟节点：previousSibling、后兄弟节点：nextSibling、子节点：childNodes、第一个子节点：firstChild、第二个子节点：lastChild

元素 element 之间的导航

父元素：parentElement、前兄弟元素：previousElementSibling、后兄弟元素：nextElementSibling、子元素：children、第一个子元素：firstElementChild、第二个子元素：lastElementChild
