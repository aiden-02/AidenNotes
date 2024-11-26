---
title: BFC
order: 4
---

# BFC

block formatting context

## 哪些情况会创建 BFC

- 根元素(\<html>）
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值），表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、 row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 计算值(Computed)不为 visible 的块元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- display 值为 flow-root 的元素

## BFC 性质

- 在 BFC 中，box 会在垂直方向上一个挨着一个的排布；
- 垂直方向的间距由 margin 属性决定；
- 在同一个 BFC 中，相邻两个 box 之间的 margin 会折叠（collapse）；
- 在 BFC 中，每个元素的左边缘是紧挨着包含块的左边缘的；

## BFC 作用

- 解决 margin 的折叠问题
- 解决浮动高度塌陷的问题

:::warning 注意

为什么可以解决浮动高度的塌陷问题，但是不能解决绝对定位元素的高度塌陷问题呢？

事实上，BFC 解决高度塌陷需要满足两个条件：

1.  浮动元素的父元素触发 BFC

2.  浮动元素的父元素的高度是 auto 的；

BFC 的高度是 auto 的情况下，是如下方法计算高度的

1.  如果只有 inline-level，是行高的顶部和底部的距离；

2.  如果有 block-level，是由最底层的块上边缘和最底层块盒子的下边缘之间的距离;

3.  **如果有绝对定位元素，将被忽略**；

4.  **如果有浮动元素，那么会增加高度以包括这些浮动元素的下边缘**
