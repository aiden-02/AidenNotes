# flex 布局

开启了 flex 布局的元素叫 flex container，子元素叫 flex item

:::tip 提示

flex item 的布局将受 flex container 属性的设置来进行控制和布局;

flex item 不再严格区分块级元素和行内级元素;

flex item 默认情况下是包裹内容的, 但是可以**设置宽度和高度**;

:::

flex-direction: row|row-reverse|column|column-reverse 设置主轴方向

flex-wrap: no-warp|wrap|wrap-reverse 决定了 flex container 是单行还是多行

justify-content: 决定了 flex items 在 main axis 上的对齐方式

align-items: 决定了 flex items 在 cross axis 上的对齐方式

align-content: 决定了**多行** flex items 在 cross axis 上的对齐方式

## flex-grow

- 决定了当 flex container 在 main axis 方向上有**剩余 size** 时， flex items 如何**扩展**(拉伸/成长)。
- 如果所有 flex items 的 flex-grow 总和 sum 超过 1，每个 flex item 扩展的 size 为 flex container 的剩余 size \* flex-grow / sum。
- flex items 扩展后的最终 size 不能超过 max-width\max-height

## flex-shrink

- 决定了当 flex items 在 main axis 方向上**超过**了 flex container 的 size 时，flex items 如何收缩(缩小)。
- 如果所有 flex items 的 flex-shrink 总和超过 1，每个 flex item 收缩的 size 为 flex items 超出 flex container 的 size \* 收缩比例 / 所有 flex items 的收缩比例之和。
- flex items 收缩后的最终 size 不能小于 min-width\min-height

## flex-basis

- 用来设置 flex items 在 main axis 方向上的 base size

## flex 属性

flex 是 flex-grow || flex-shrink || flex-basis 的简写

[`<'flex-grow'>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex#flex-grow)

定义 flex 项目的 [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow) 。负值无效。省略时默认值为 1。 (初始值为 `0`)

[`<'flex-shrink'>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex#flex-shrink)

定义 flex 元素的 [`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink) 。负值无效。省略时默认值为`1`。 (初始值为 `1`)

[`<'flex-basis'>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex#flex-basis)

定义 flex 元素的 [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) 属性。若值为`0`，则必须加上单位，以免被视作伸缩性。省略时默认值为 0。(初始值为 auto)
