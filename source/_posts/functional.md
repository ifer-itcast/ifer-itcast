---
title: 函数式编程
date: 2021-02-04 09:47:49
tags: [函数式编程]
categories: 面试
---

了解函数式编程和纯函数！

<!-- more -->

## 命令式编程

命令式编程：详细的命令机器怎么（How）去处理一件事情以达到你想要的结果（What）

需求，对 `const arr = [1, 2, 3, 4];` 数组中的所有元素加 1

```js
const arr = [1, 2, 3, 4];

const newArr = [];

for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i] + 1);
}

console.log(newArr); // [2, 3, 4, 5]
```

封装一下

```js
const arr = [1, 2, 3, 4];

const newArr = arr => {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(arr[i] + 1);
    }
    return res;
};

console.log(newArr(arr)); // [ 2, 3, 4, 5 ]
```

## 函数式编程

函数式编程：将程序分解为一个个可重用、更小粒度的函数，然后再将他们组合起来，形成一个更易维护、更灵活的程序整体

```js
const arr = [1, 2, 3, 4];

const newArr = (arr, fn) => {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(fn(arr[i]));
    }
    return res;
};

const add1 = item => item + 1; // 加 1
const add3 = item => item + 3; // 加 3
const mul5 = item => item * 5; // 承 5

console.log(newArr(arr, add1));
console.log(newArr(arr, add3));
console.log(newArr(arr, mul5));
```

## 关于纯函数

1\. 相同的输入，产生相同的输入

2\. 不依赖于函数外部任何数据的变化，必须只依赖于其输入参数

3\. 也不改变任何外部数据（无副作用=>修改了外部变量或参数等）

```js
// 非纯函数，不符合 #1、#2
let discount = 0.8;
const calculatePrice = price => price * discount;
const result = calculatePrice(200);

console.log(result);
```

```js
// 非纯函数，不符合 #3
let r = 5;
const foo = () => (r = r * 10);
foo();
console.log(r); // 50
```

数组内置的纯函数/非纯函数

```js
let arr = [1, 2, 3, 4, 5, 6];

// [索引 1，索引 3)
// console.log(arr.slice(1, 3)); // 纯函数，返回 [ 2, 3 ]，原数组不改变

// 从索引 1 开始删除 3 个
// console.log(arr.splice(1, 3)); // 非纯函数，返回 [2, 3, 4]，原数组改变了

console.log(arr.pop()); // 非纯函数，返回 6，原数组改变
```
