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

## compose 和 pipe

可以将需要嵌套执行的函数平铺，嵌套执行说的是一个函数的返回值将作为另一个函数的参数

需求：求 x + 10 的返回值再 * 5 的结果

```js
// 命令时编程，也不具备复用性
let calculate = x => (x + 10) * 5;
console.log(calculate(10));
```

改成函数式编程

```js
const add = x => x + 10;
const multiply = y => y * 5;
// 将 add 的输出，作为 multiply 的输入
console.log(multiply(add(10)));
```

封装 compose 串联两个函数

```js
const compose = (m, a) => {
    return function (x) {
        return m(a(x));
    }
};
const add = x => x + 10;
const multiply = y => y * 5;

const calculate = compose(multiply, add); // 从右往左
console.log(calculate(10));
```

通过的 compose 函数

```js
const compose = function() {
    const args = [].slice.call(arguments);
    return function(initValue) {
        // calc 是【初始值】或【上次计算的返回值】
        return args.reduceRight((calc, cur) => {
            return cur(calc);
        }, initValue);
    };
};
const add = x => x + 10;
const multiply = y => y * 5;
const calculate = compose(multiply, add); // 从右往左
console.log(calculate(10));
```

ES6 的写法

```js
const compose = (...args) => initVal => args.reduceRight((calc, cur) => cur(calc), initVal);
const add = x => x + 10;
const multiply = y => y * 5;
const calculate = compose(multiply, add); // 从右往左
console.log(calculate(10));
```

## 高阶函数

函数作为参数或函数作为返回值返回的函数

map、reduce、filter、flat...

```js
const arr = [1, 2, 3, 3, 2, 4, 4, 0];

const r = arr.reduce((calc, cur) => {
    !calc.includes(cur) && calc.push(cur);
    return calc;
}, []);

console.log(r);
```

## memozition

缓存函数，将上次的结果缓存起来，下次调用时，如果遇到相同的参数，就直接返回缓存中的数据

```js
const add = a => a + 8;

// 原理：把参数和对应的结果数据存到一个对象中，调用时，判断参数对应的数据是否存在，若存在就返回对应的结果数据

const memoize = function(func) {
    let cache = {};
    // 并没有考虑多个参数的情况，具体可以参考 underscore
    return function(key) {
        if (!cache[key]) {
            cache[key] = func.apply(this, arguments);
        }
        return cache[key];
    };
};

const calculate = memoize(add);

console.log(calculate(10));
console.log(calculate(10));
```

## curry

函数柯里化：柯里化函数是将使用多个参数的函数转换成一系列使用一个参数的函数的技术

```js
function girl(name, age, single) {
    return `我叫${name}，今年${age}岁，我${single}单身`;
}

let xxx = girl('xxx', 18, '不是');
console.log(xxx);
```

```js
function girl(name) {
    return age => {
        return single => {
            return `我叫${name}，今年${age}岁，我${single}单身`;
        };
    };
}

let xxx = girl('xxx')(18)('不是');
console.log(xxx);
```

实际应用：复用参数

```js
let matching = (reg, str) => reg.test(str);

console.log(matching(/\s+/g, 'hello world')); // true
console.log(matching(/\s+/g, 'xxx'));
```

```js
// 利用柯里化的思想优化
const curry = reg => {
    return str => {
        return reg.test(str);
    };
};

const hasSpace = curry(/\s+/g);

console.log(hasSpace('hello world')); // true
console.log(hasSpace('xxx'));
```

了解 lodash 中的 _.curry

## 偏函数

柯里化：f(a, b, c) => f(a)(b)(c)

偏函数：f(a, b, c) => f(a, b)(c)

```js
const add = (x, y) => x + y;
const rst = add.bind(null, 1);

console.log(rst(2));
```