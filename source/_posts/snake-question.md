---
title: 数据在内存中的存储形式
date: 2019-05-25 10:09:44
tags: [贪吃蛇,引用类型]
categories: JS 高级
---

学习贪吃蛇时，往蛇身体增加最后一节，当时代码是直接这样写的 `this.body.push({ x: last.x, y: last.y, color: last.color })`，有些同学问 last 这个变量保存的数据和 `{ x: last.x, y: last.y, color: last.color }` “长的一样”，为什么不能直接 `this.body.push(last)` 呢？

<!-- more -->

## 基本数据类型存储

要说清楚上面的问题，首先大家要明白不同数据类型在内存中的存储形式是怎样的。我们都知道 JS 中的数据类型分为 2 大类，分别是：

- 基本数据类型：Number、String、Boolean、Null、Undefined、Symbol(ES6)
- 复杂数据类型：Object(包括数组、对象、函数、正则)

其中基本数据类型存储在栈内存中，他们是按值存放的，例如：

```javascript
var age1 = 18;
var age2 = age1;
age2 = 20;
console.log(age1, age2); // 18 20
```

上面代码在内存中的表现形式如下：

<img src="/resource/images/pages/jsadvanced/snake.jpg" alt="">

## 复杂数据类型存储

复杂数据类型的真实数据是存放在堆内存中的，变量保存的只是在栈内存中的一个地址，这个地址指向堆内存中数据。例如：

```javascript
var obj1 = { age: 18 };
var obj2 = obj1;
obj2.age = 20; // obj2 是改变堆内存中的同一份数据
console.log(obj1.age); // 所以 obj1 的数据也被影响了，结果是 20
```

上面代码在内存中的表现形式如下：

<img src="/resource/images/pages/jsadvanced/snake2.jpg" alt="">

## 解释贪吃蛇的问题

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

如果直接 this.body.push(last) 的话，相当于每次添加的还是堆内存中的同一个 last，那在下次 move 修改数据的时候就会相互影响，无论你往后面 push 多少项 last，在修改到最前面的 three 时也会把后面的给修改掉（因为都是堆内存中的同一份数据），所以你看到的结果是后面的数据都是重复的，对应到页面上也就是最后一节的元素都是覆盖在一起的。测试代码如下：

```javascript
var one = {x: 26, y: 14, color: "red"};
var two = {x: 25, y: 14, color: "blue"};
var three = {x: 24, y: 14, color: "blue"};
var arr = [one, two, three, three];

for (var i = arr.length - 1; i > 0; i--) {
  	arr[i].x = arr[i - 1].x;
  	arr[i].y = arr[i - 1].y;
}
console.log(arr);
```

## 该如何解决

```javascript
var arr = [
    {x: 26, y: 14, color: "red"},
    {x: 25, y: 14, color: "blue"},
    {x: 24, y: 14, color: "blue"}
];

var last = arr[arr.length - 1];
// 每次造一个全新的对象
var newObj = { x: last.x, y: last.y, color: last.color };
// 或者拷贝原来的对象
// var newObj = JSON.parse(JSON.stringify(last));

arr.push(newObj);

for (var i = arr.length - 1; i > 0; i--) {
  	arr[i].x = arr[i - 1].x;
  	arr[i].y = arr[i - 1].y;
}
console.log(arr);
```