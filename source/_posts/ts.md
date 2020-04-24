---
title: TS
date: 2020-04-24 15:16:44
tags: TS
categories: React
---

## 基础基本概述

### TS 优势

JS 的超集，具有更好的错误提示、更好的语法提示、类型约束（不易出错且语义化）

### 类型是静态的

TS 类型是静态的：类型一旦定义就不能修改，其上的属性和方法也已确定了

```javascript
let count: number = 666;
count = '六六六'; // Type '"六六六"' is not assignable to type 'number'
```

当输入 `count.` 的时候下面就会出现和 count 这个类型相关属性和方法的提示

```javascript
let count: number = 666;
count.toString();
```

### 代码初体验

```javascript
// Parameter 'data' implicitly has an 'any' type
function tsDemo(data) {
    return Math.sqrt(data.x ** 2 + data.y ** 2);
}
```

```javascript
function tsDemo(data: { x: number, y: number }) {
    return Math.sqrt(data.x ** 2 + data.y ** 2);
}
```

```javascript
// type Point = { x: number, y: number }; // 类型别名
interface Point { x: number; y: number }; // 接口

function tsDemo(data: Point) {
    return Math.sqrt(data.x ** 2 + data.y ** 2);
}
tsDemo({ x: 1, y: 2 });
```

## 基础环境搭建

VS Code 设置 quote 和 tab，安装插件 prettier，通过在配置里面搜索 save，可以设置 Format on Save

```
npm i typescript -g
tsc -v
tsc demo.ts
node demo.js
```

`ts-node` 简化上面的流程

```
npm i ts-node -g
ts-node demo.ts
```

## 基础类型和对象类型

基础类型

```javascript
const num: number = 18;
```

对象类型

```javascript
// 注意这里不要 const teacher: object = { xxx }，这样使用 teacher 的时候不具有提示
const teacher: { name: string; age: number; } = {
    name: 'xxx',
    age: 18
};
```

```javascript
const numbers: number[] = [1, 2, 3];
```

```javascript
class Person {}
// xxx 必须是 Person 类对应的实例对象
const xxx: Person = new Person();
```

```javascript
// 冒号后面是类型定义，等号后面是函数实现
const getTotal: () => number = () => 888;
// 当然直接下面的写法 getTotal 也会进行类型推断
const getTotal = () => 888;
```

## 类型注解和类型推断

类型注解：明确告诉 TS 变量是什么类型

```javascript
// 声明和赋值一起时会具备类型推断
let count1 = 123;
```

```javascript
// 声明和赋值不一起时就要进行类型注解了
let count1: number;
count1 = 123;
```

```javascript
interface Person {
    name: string;
}
const rawData = '{ "name": "xxx" }';
// 使用 JSON.parse 时也需要进行类型注解，不然 newData 会是 any 类型，再使用 newData 时也就没有了相关属性的提示
const newData:Person = JSON.parse(rawData);
```

类型推断：TS 会自动的分析类型，其实若 TS 能自动推断出类型，就没有必要进行类型注解了，例如下面求和的例子：

```javascript
const firstNumber = 1;
const secondNumber = 2;
const res = firstNumber + secondNumber;
```

```javascript
// 形参这里就需要类型注解了，不然 firstNumber 会推断出 any 类型
function getTotal(firstNumber: number, secondNumber: number) {
    return firstNumber + secondNumber;
}
// total 这里会自动进行类型推荐，无需注解
const total = getTotal(1, 2);
```

## 函数相关类型

```javascript
function add(first: number, second: number): number {
    // 求两个数之和，这里建议明确写返回值是 number，不然下面一不小心写错的代码也能通过
    // return first + second + '';
    return first + second;
}
// const total: number = add(1, 2); // 如果函数返回值没有进行注解的话，通过这种方式也能看到错误，最好的方式还是对返回值进行注解
const total = add(1, 2);
```

关于 never 类型，代表永远不可能执行到最后，例如最后的 console 永远都不会执行

```javascript
function error(): never {
    throw new Error('error');
    console.log('hello world');
}
```

```javascript
function error(): never {
    while(true) {}
    console.log('hello world');
}
```

函数参数解构时如何进行类型注解呢？

```javascript
function add({ first, second }: { first: number, second: number }): number {
    return first + second;
}
const total = add({ first: 1, second: 2});
console.log(total);
```

## 数组和元组

