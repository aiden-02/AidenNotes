# CSS

## 一、选择器

元素选择器

```css
div {
}
```

类选择器

```css
.box {
}
```

id 选择器

```css
#id {
}
```

属性选择器

- 有某一个属性[attr]
- 属性等于某个值[attr=val]

```css
[attr='val'] {
}
```

后代选择器

1. 所有后代选择

```css
.box span {
}
```

2. 直接子代选择器

```css
.box > span {
}
```

兄弟选择器

1. 相邻兄弟选择器

```css
.box + span {
}
```

1. 普遍兄弟选择器

```css
.box ~ span {
}
```

交集并集选择器

1. 交集选择器: 在开发中为了精准的选择某个元素

```css
div.one {
}
```

1. 并集选择器

```css
.one,
.two {
}
```

伪类、伪元素

:nth-child()、:nth-of-type()

> :nth-child(1) 是父元素中的第 1 个子元素
>
> :nth-child(2n)
>
> - n 代表任意正整数和 0
> - 是父元素的第偶数个子元素（第 2、4、6、8...个）
> - 跟:nth-child(even)同义
>
> :nth-child(2n+1)
>
> - n 代表任意正整数和 0
> - 是父元素的第奇数个子元素（第 1、3、7、9...个）
> - 跟:nth-child(odd)同义
>
> :nth-child(-n+2) 代表前 2 个子元素

::before、::after

## 二、选择器权重

- !important：10000
- 内联样式：1000
- id 选择器： 100
- 类、属性、伪类选择器：10
- 元素、伪元素选择器：1
- 通配符：0

## 三、元素隐藏方法

1. display: none；元素不占据位置
2. visibility: hidden；元素不可见，但仍占据空间
3. rgba，将 a 设置为 0；a 是 alpha 值，设置透明度，不影响子元素
4. opacity: 0；设置整个元素的透明度，会影响子元素

## 四、盒子模型

HTML 中每一个元素都可以看做是一个盒子

具备四个属性

1. 内容(content)：元素的内容 width/height
2. 内边距(padding)：元素和内容之间的间距
3. 边框(border)：元素自己的边框
4. 外边距(margin)：元素和其他元素之间的间距

box-sizing

1. content-box

   - 元素实际占用宽度：border+padding+width
   - 元素实际占用高度：border+padding+height

2. border-box

   - 元素实际占用宽度：width

   - 元素实际占用高度：height

## 五、元素水平居中方案

- 行内级元素：text-align：center；
- 块级元素：margin：0 auto；

## 六、元素定位

### position

static|relative|absolute|sticky|fixed

定位元素：position 非 static

绝对定位元素：position 为 absolute|fixed

- static: 元素按照 normal flow 布局，left、right、top、bottom 无效
- relative: 元素按照 normal flow 布局，left、right、top、bottom 有效，定位参照对象是元素自己原来的位置
- fixed: 元素脱离 normal flow（脱离标准流、脱标），可以通过 left、right、top、bottom 进行定位 ， 定位参照对象是视口（viewport ），当画布滚动时，固定不动

- absolute: 脱标，可以通过 left、right、top、bottom 进行定位 ， 定位参照对象是**最邻近的定位祖先元素**，如果找不到这样的祖先元素，则参照对象是**视口**
- sticky: 非脱标，元素在其父容器内是按照正常文档流进行定位的，因此它不是脱标元素。只有在滚动到一定位置时，它才会变为固定定位。

元素脱标后，可随意设置宽高，不再给父元素汇报宽高数据。脱标元素内部默认还是按照标准流布局

### z-index

z-index 属性用来设置定位元素的层叠顺序（仅对**定位元素**有效）

比较原则

- 如果是兄弟关系

  - z-index 越大，层叠在越上面
  - z-index 相等，写在**后面的**那个元素层叠在上面

- 如果不是兄弟关系
  - 各自从元素自己以及祖先元素中，找出最邻近的 2 个定位元素进行比较
  - 而且这 2 个定位元素必须有设置 z-index 的具体数值

### float

元素一旦浮动，则脱标

朝着向左或向右的方向移动，直到自己的边界紧贴着**包含块**或者**其他浮动元素的边界**为止

定位元素会层叠在浮动元素**上面**

浮动元素**不能**与行内级内容层叠，行内级内容将会被浮动元素推出

清除浮动的方法

1. 给父元素设置固定高度

2. 在父元素最后增加一个空的块级子元素，并且让它设置 clear：both

3. 给父元素添加一个伪元素::after

   ```css
   .clear-fix::after {
     content: '';
     display: block;
     clear: both;

     visibility: hidden;
     height: 0;
   }
   ```

## 七、flex 布局

开启了 flex 布局的元素叫 flex container，子元素叫 flex item

> flex item 的布局将受 flex container 属性的设置来进行控制和布局;
>
> flex item 不再严格区分块级元素和行内级元素;
>
> flex item 默认情况下是包裹内容的, 但是可以**设置宽度和高度**;

flex-direction: row|row-reverse|column|column-reverse 设置主轴方向

flex-wrap: no-warp|wrap|wrap-reverse 决定了 flex container 是单行还是多行

justify-content: 决定了 flex items 在 main axis 上的对齐方式

align-items: 决定了 flex items 在 cross axis 上的对齐方式

align-content: 决定了**多行** flex items 在 cross axis 上的对齐方式

flex-grow

- 决定了当 flex container 在 main axis 方向上有**剩余 size** 时， flex items 如何**扩展**(拉伸/成长)。
- 如果所有 flex items 的 flex-grow 总和 sum 超过 1，每个 flex item 扩展的 size 为 flex container 的剩余 size \* flex-grow / sum。
- flex items 扩展后的最终 size 不能超过 max-width\max-height

flex-shrink

- 决定了当 flex items 在 main axis 方向上**超过**了 flex container 的 size 时，flex items 如何收缩(缩小)。
- 如果所有 flex items 的 flex-shrink 总和超过 1，每个 flex item 收缩的 size 为 flex items 超出 flex container 的 size \* 收缩比例 / 所有 flex items 的收缩比例之和。
- flex items 收缩后的最终 size 不能小于 min-width\min-height

flex-basis

- 用来设置 flex items 在 main axis 方向上的 base size

flex 属性

flex 是 flex-grow || flex-shrink || flex-basis 的简写

[`<'flex-grow'>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex#flex-grow)

定义 flex 项目的 [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow) 。负值无效。省略时默认值为 1。 (初始值为 `0`)

[`<'flex-shrink'>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex#flex-shrink)

定义 flex 元素的 [`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink) 。负值无效。省略时默认值为`1`。 (初始值为 `1`)

[`<'flex-basis'>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex#flex-basis)

定义 flex 元素的 [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) 属性。若值为`0`，则必须加上单位，以免被视作伸缩性。省略时默认值为 0。(初始值为 auto)

## 八、BFC

block formatting context

哪些情况会创建 BFC：

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

BFC 性质

- 在 BFC 中，box 会在垂直方向上一个挨着一个的排布；
- 垂直方向的间距由 margin 属性决定；
- 在同一个 BFC 中，相邻两个 box 之间的 margin 会折叠（collapse）；
- 在 BFC 中，每个元素的左边缘是紧挨着包含块的左边缘的；

BFC 作用

- 解决 margin 的折叠问题
- 解决浮动高度塌陷的问题

> 为什么可以解决浮动高度的塌陷问题，但是不能解决绝对定位元素的高度塌陷问题呢？
>
> 事实上，BFC 解决高度塌陷需要满足两个条件：
>
> 1. 浮动元素的父元素触发 BFC
>
> 2. 浮动元素的父元素的高度是 auto 的；
>
> BFC 的高度是 auto 的情况下，是如下方法计算高度的
>
> 1. 如果只有 inline-level，是行高的顶部和底部的距离；
>
> 2. 如果有 block-level，是由最底层的块上边缘和最底层块盒子的下边缘之间的距离;
>
> 3. **如果有绝对定位元素，将被忽略**；
>
> 4. **如果有浮动元素，那么会增加高度以包括这些浮动元素的下边缘**
