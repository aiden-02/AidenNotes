---
title: 元素定位
order: 2
---

# 元素定位

## position

static|relative|absolute|sticky|fixed

定位元素：position 非 static

绝对定位元素：position 为 absolute|fixed

- `static`: 元素按照 normal flow 布局，left、right、top、bottom `无效`
- `relative`: 元素按照 normal flow 布局，left、right、top、bottom `有效`，定位参照对象是元素`自己原来的位置`
- `fixed`: 元素脱离 normal flow（脱离标准流、`脱标`），可以通过 left、right、top、bottom 进行定位 ， 定位参照对象是`视口`（viewport ），当画布滚动时，固定不动

:::tip 什么是视口？
视口（Viewport）是指用户在设备屏幕上可以看到的网页内容的区域。它是浏览器窗口中显示网页内容的可视部分，不包括浏览器的工具栏、菜单栏等
:::

- `absolute`: 脱标，可以通过 left、right、top、bottom 进行定位 ， 定位参照对象是**最邻近的定位祖先元素**，如果找不到这样的祖先元素，则参照对象是**视口**
- `sticky`: 非脱标，元素在其父容器内是按照正常文档流进行定位的，因此它不是脱标元素。只有在滚动到一定位置时，它才会变为固定定位。

元素脱标后，可随意设置宽高，不再给父元素汇报宽高数据。脱标元素内部默认还是按照标准流布局

## z-index

z-index 属性用来设置定位元素的层叠顺序（仅对**定位元素**有效）

比较原则

- 如果是兄弟关系

  - z-index 越大，层叠在越上面
  - z-index 相等，写在**后面的**那个元素层叠在上面

- 如果不是兄弟关系
  - 各自从元素自己以及祖先元素中，找出最邻近的 2 个定位元素进行比较
  - 而且这 2 个定位元素必须有设置 z-index 的具体数值

## float

元素一旦浮动，则脱标

朝着向左或向右的方向移动，直到自己的边界紧贴着**包含块**或者**其他浮动元素的边界**为止

定位元素会层叠在浮动元素**上面**

浮动元素**不能**与行内级内容层叠，行内级内容将会被浮动元素推出

清除浮动的方法

方法一：给父元素设置`固定高度`

方法二：在父元素最后增加一个空的块级子元素，并且让它设置 `clear：both`

方法三： 给父元素添加一个`伪元素::after`

```css
.clear-fix::after {
  content: '';
  display: block;
  clear: both;

  visibility: hidden;
  height: 0;
}
```
