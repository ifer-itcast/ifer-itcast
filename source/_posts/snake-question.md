---
title: 蛇碰到食物时增加蛇节的正确姿势
date: 2019-05-25 10:09:44
tags: 贪吃蛇
categories: JS 高级
---

## 缘起

讲贪吃蛇时，关于蛇如何吃到食物我们说了这么一段话：在蛇**运动时**，判断蛇头的坐标是否与食物的坐标吻合，如果吻合，则往蛇身体后增加一节，然后再随机食物的坐标即可，代码如下：

```javascript
if (headX === food.x && headY === food.y) {
    // Step1: 获取蛇的最后一节
    var last = this.body[this.body.length - 1];
    // Step2: 添加到身体的最后
    this.body.push({ x: last.x, y: last.y, color: last.color });
    // Step3: 随机随机食物坐标
    food.render(map);
}
```

## 问题

上面代码当然没有什么问题，也符合我们的预期。但这个时候有同学提出这个一个疑问：

老师，既然是往蛇身体后增加最后一节，代码直接这样写 `this.body.push(last)` 不就 ok 了吗？但我这样写测试后为什么却不能达到预期呢？last 的数据明明和 `{ x: last.x, y: last.y, color: last.color }` 长的一样的，为什么 `this.body.push({ x: last.x, y: last.y, color: last.color })` 却是可以的呢？甚是困惑！

## 解释

其实要解释清楚上面的问题，我们要明白复杂数据类型在内存中的存储形式的怎样的。

复杂数据类型（`{ x: last.x, y: last.y, color: last.color }`）是存放在堆内存中的对象，变量（`last`）只是保存的在栈内存中的一个指针，这个指针指向堆内存中数据。什么意思呢，我下面画了个图帮你理解：

<img src="/resource/images/pages/jsadvanced/snake.png" alt="">

我们如果直接 this.body.push(last) 的话，相当于添加的还是同一个 last，那在修改数据的时候就会相互影响，放到代码中就是：

```javascript
var one = {x: 26, y: 14, color: "red"};
var two = {x: 25, y: 14, color: "blue"};
var three = {x: 24, y: 14, color: "blue"};
var arr = [one, two, three, three];
```

后面在 move 时修改数据时就会出现问题：无论你往后面 push 多少项，在修改到最前面的 three 数据时也会把后面的给修改掉，所以你看到的结果是后面的数据都是重复的，对应到页面上也就是最后一节的元素都是覆盖在一起的。

```javascript
for (var i = arr.length - 1; i > 0; i--) {
  	arr[i].x = arr[i - 1].x;
  	arr[i].y = arr[i - 1].y;
}
```

## 解决

...