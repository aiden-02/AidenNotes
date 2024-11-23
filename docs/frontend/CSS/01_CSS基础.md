# CSS 基础

## 选择器

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

> :nth-child(1) 是父元素中的第 `1` 个子元素
>
> :nth-child(2n)
>
> - n 代表`任意正整数和 0`
> - 是父元素的第偶数个子元素（第 2、4、6、8...个）
> - 跟:nth-child(even)同义
>
> :nth-child(2n+1)
>
> - n 代表`任意正整数和 0`
> - 是父元素的第奇数个子元素（第 1、3、7、9...个）
> - 跟:nth-child(odd)同义
>
> :nth-child(-n+2) 代表前 2 个子元素

::before、::after

## 选择器权重

- !important：`10000`
- 内联样式：`1000`
- id 选择器： `100`
- 类、属性、伪类选择器：`10`
- 元素、伪元素选择器：`1`
- 通配符：`0`

## 元素隐藏方法

1. display: none；元素`不占据位置`
2. visibility: hidden；元素不可见，但`仍占据空间`
3. rgba，将 a 设置为 0；a 是 alpha 值，设置透明度，不影响子元素
4. opacity: 0；设置整个元素的透明度，`会影响子元素`

## 盒子模型

HTML 中每一个元素都可以看做是一个盒子

具备四个属性

1. 内容(content)：元素的内容 width/height
2. 内边距(padding)：元素和内容之间的间距
3. 边框(border)：元素自己的边框
4. 外边距(margin)：元素和其他元素之间的间距

box-sizing

1. content-box

   - 元素实际占用宽度：`border+padding+width`
   - 元素实际占用高度：`border+padding+height`

2. border-box

   - 元素实际占用宽度：`width`

   - 元素实际占用高度：`height`

## 元素水平居中方案

- 行内级元素：text-align：center；
- 块级元素：margin：0 auto；
