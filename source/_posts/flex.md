---
title: Flex
date: 2020-09-21 19:29:50
tags: Flex
categories: HTML5/CSS3
---

## flex-basis

默认值 auto

`flex-basis` 用来设置弹性元素的宽度，当和 `width` 同时使用时，生效的是此属性，当 width 也不设置时，默认是 `content` 的大小，[举例](/resource/demos/demo07/01_flex-basis.html)

flex-basis 受限于 [max-width](/resource/demos/demo07/02_flex-basis.html)/[min-width 举例](/resource/demos/demo07/03_flex-basis.html)

[推荐阅读](https://mastery.games/post/the-difference-between-width-and-flex-basis/)

## flex-grow

### 基本操作

默认值 0，表示不分配父元素的剩余空间，值越大，分配的越多。不支持负值

规定当父元素的宽度大于子元素的宽度之和时，**子元素该如何分配父元素的剩余空间**，[基本演示](/resource/demos/demo07/04_flex-grow.html)

容器宽度 500px，里面 4 个 item 分别设置了 flex: 1，其中一个 .spe 也添加了 width: 50px，[理解并计算 .spe 的宽度应该是多少](/resource/demos/demo07/05_flex-grow.html)

### 其他举例

父元素 500px，A 元素 100px，B 元素 200px，如果 A、B 都不索取剩余空间，则会有 200px 的剩余空间，[代码演示](/resource/demos/demo07/06_flex-grow.html)

如果 A 设置了 `flex-grow: 1;`，B 不索取，则 A 的最终宽度是 自身宽度（100px） + 剩余宽度（200px） = 300px，[代码演示](/resource/demos/demo07/07_flex-grow.html)

如果 A、B 都索取了剩余空间（即都设置 flex-grow），若 A 设置 `flex-grow: 1;`，B 设置 `flex-grow: 2;`，则 A 的最终宽度为：【自身宽度 + A 获得的剩余空间的宽度】，A 获得的剩余空间的宽度 = 剩余宽度（200px） * 自己的 flex-grow（1） / 总的 flex-grow（1 + 2）

B 的最终宽度为：【自身宽度 + B 获得的剩余空间的宽度】，B 获得的剩余空间的宽度 = 剩余宽度（200px） * 自己的 flex-grow（2） / 总的 flex-grow（1 + 2）

[代码演示](/resource/demos/demo07/08_flex-grow.html)

### 规律总结

**仅一个 flex 元素设置了 flex-grow**

如果 flex-grow 值小于 1，则分配给它的是总的剩余空间和这个比例的计算值，例如 flex-grow: 0.5; 则能分配剩余空间的一半，[举例](/resource/demos/demo07/14_flex-grow.html)

如果 flex-grow 值大于等于 1，则独享所有剩余空间

**多个 flex 元素设置了 flex-grow**

如果 flex-grow 值总和小于 1，则分配空间 = 剩余空间 \* 当前元素的 flex-grow，例如剩余空间 200px，A 元素设置 flex: 0.1; 则 A 分配的大小为 200 \* 0.1，[举例](/resource/demos/demo07/15_flex-grow.html)

如果 flex-grow 值总和大于等于1，则所有剩余空间被利用，分配空间 = 剩余空间 * (当前 flex-grow / 所有 flex-grow)

## flex-shrink

[文档](https://www.w3.org/TR/css-flexbox-1/#valdef-flex-flex-shrink)

### 基本操作

默认值 1，表示父元素装不下弹性盒子时，弹性盒子就会减小，值越大，减小的越厉害，设置为 0 则代表不会减小

规定当父元素的宽度小于子元素的宽度之和时（即子元素超出了父元素），子元素该如何缩小自己的宽度的，[代码演示](/resource/demos/demo07/09_flex-shrink.html)

A 的最终大小为：【自身宽度 - A 减小的宽度】

A 减小的宽度 = 超出的宽度 \* （A 的宽度 \* A 的 flex-shrink / A 的宽度 \* A 的 flex-shrink + B 的宽度 \* B 的 flex-shrink）

`100 * (200 * 1 / 200 * 1 + 400 * 1)`

B 的最终大小为：【自身宽度 - B 减小的宽度】

### 其他举例

若 A 设置 flex-shrink: 3;，B 设置 flex-shrink: 2;，则最终的宽度为多少？

A 减小的宽度 = `100 * (200 * 3 / 200 * 3 + 400 * 2)`

B 减小的宽度 = `100 * (400 * 2 / 200 * 3 + 400 * 2)`

[代码展示](/resource/demos/demo07/10_flex-shrink.html)

### 规律总结

**仅一个 flex 元素设置了 flex-shrink**

flex-shrink 值小于 1，则收缩的尺寸不完全，会有一部分内容溢出 flex 容器，`收缩值 = 溢出值 \* flex-shrink`，[举例](/resource/demos/demo07/11_flex-shrink.html)

flex-shrink 值大于等于 1，则收缩完全，正好填满 flex 容器

**多个 flex 元素设置了 flex-shrink**

flex-shrink 值的总和小于1，则收缩的尺寸不完全，收缩值 = 超出值 \* flex-shrink 值的总和，[举例](/resource/demos/demo07/12_flex-shrink.html)

flex-shrink 值的总和大于等于1，则收缩完全，每个元素收缩尺寸和当前 flex 元素大小以及 当前 flex-shrink 有关，[举例](/resource/demos/demo07/13_flex-shrink.html)

## flex

flex 是 flex-grow、flex-shrink、flex-basis 的复合写法，默认 0、1、auto

flex: none; 则表示 flex: 0 0 auto;

flex: auto; 则表示 flex: 1 1 auto;

当 flex 取一个非负数时，则该数字代表 flex-grow 的值，flex-shrink 还是取默认值 1，flex-basis 取 0%

```css
div {
    flex: 1;
}
/* 与上面等价 */
div {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

当 flex 取一个长度或百分比，则代表 flex-basis 的值，flex-grow 取 1，flex-shrink 取默认值 1

```css
div {
    flex: 0%;
}
/* 与上面等价 */
div {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

```css
div {
    flex: 20px;
}
/* 与上面等价 */
div {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 20px;
}
```

当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 去 0%

```css
div {
    flex: 2 3;
}
/* 与上面等价 */
div {
    flex-grow: 2;
    flex-shrink: 3;
    flex-basis: 0%;
}
```

当 flex 取值为一个非负数字和一个长度或百分比，则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取默认值 1

```css
div {
    flex: 2 34px;
}
/* 与上面等价 */
div {
    flex-grow: 2;
    flex-shrink: 1;
    flex-basis: 34px;
}
```