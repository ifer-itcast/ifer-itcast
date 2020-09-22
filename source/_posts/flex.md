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

规定子元素该如何分配父元素的剩余空间，默认值 0，表示不分配父元素的剩余空间，值越大，分配的越多。不支持负值！

```
分配多少和【剩余宽度】以及【当前 flex-grow】 有关！
```

**如果 flex 元素的 flex-grow 之和大于等于 1**

有剩余宽度 `w`，三个 flex 元素的 flex-grow 分别是 x，y，z，假设 sum = x + y + z，则每个元素的分配空间分别是 w \* x / sum、w \* y / sum、w \* z / sum

**如果 flex 元素的 flex-grow 之和小于 1**

分配空间 = 剩余空间 \* 当前 flex-grow

## flex-shrink

[文档](https://www.w3.org/TR/css-flexbox-1/#valdef-flex-flex-shrink)

规定当父元素的宽度小于子元素的宽度之和时（即子元素超出了父元素），子元素该如何缩小自己的宽度。默认值 1，表示父元素装不下弹性盒子时，弹性盒子就会减小，值越大，减小的越厉害，设置为 0 则代表不会减小！

```
收缩多少和【超出宽度】、【自身宽度】以及【当前 flex-shrink】 有关
```

**如果 flex 元素的 flex-shrink 之和大于等于 1**

元素最终大小为：【自身宽度 - 收缩宽度】

假设超出宽度为 w，两个元素的宽度分别为 x，y，flex-shrink 分别为 a，b，则：

收缩宽度 = 超出的宽度 \* （当前宽度 \* 当前 flex-shrink / 当前宽度 \* 当前 flex-shrink + 其他宽度 \* 其他 flex-shrink）

即一个元素的收缩宽度 = w \* (x \* a / x \* a + y \* b)

**如果 flex 元素的 flex-shrink 之和小于 1**

则收缩宽度 = w * flex 元素的 flex-shrink 之和，其他计算同上，例如容器宽度为 400，A 元素宽 100，flex-shrink 为 0.6，B 元素宽 300，flex-shrink 为 0.3，则：

```javascript
收缩宽度 = 100 * (0.6 + 0.3) * (100* 0.6 / 100 * 0.6 + 300 * 0.3) 3/4
```

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