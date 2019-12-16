---
title: arr-method
date: 2019-12-09 19:04:46
tags:
---

依次模拟数组的方法：[连接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## Array.prototype.concat

## Array.prototype.copyWithin

## Array.prototype.entries

## Array.prototype.every

## Array.prototype.fill

## Array.prototype.filter

```javascript
const arr = ['apple', 'orange', 'banana'];
Array.prototype.filter2 = function(fn) {
    const arr = [];
    for(let i = 0; i < this.length; i ++) {
        // 函数执行结果的返回值是 true，就塞进数组
        fn(this[i]) && arr.push(this[i]);
    }
    return arr;
};
const newArr = arr.filter2(item => item.length > 5);
console.log(newArr);
```

## Array.prototype.find

## Array.prototype.findIndex

## Array.prototype.flat

## Array.prototype.flatMap

## Array.prototype.forEach

```javascript
Array.prototype.forEach2 = function(callback, that) {
    for(let i = 0; i < this.length; i ++) {
        callback.call(that, this[i], i, this);
    }
};
```

## Array.prototype.includes

## Array.prototype.indexOf

## Array.prototype.join

## Array.prototype.keys

## Array.prototype.lastIndexOf

## Array.prototype.map

```javascript
const arr = ['apple', 'orange', 'banana'];
Array.prototype.map2 = function(fn) {
    const arr = [];
    for(let i = 0; i < this.length; i ++) {
        // 把函数执行的结果塞进数组
        arr.push(fn(this[i]));
    }
    return arr;
};
const newArr = arr.map2(item => `**${item}**`);
console.log(newArr);
```

## Array.prototype.pop

## Array.prototype.push

## Array.prototype.reduce

```javascript
// accVal 和 curVal 的取值有两种情况：
// 如果提供了 initVal，accVal 取值为 initVal，curVal 取数组中的第一个值
// 如果没有提供 initVal，那么 accVal 取数组中的第一个值，curVal 取数组中的第二个值
const arr = [1, 3, 5];
Array.prototype.reduce2 = function (reducer, accVal) {
    let startIdx = 0;
    if (accVal === undefined) {
        // 如果没有提供 initVal，那么 accVal 取数组中的第一个值
        // 计算时只需要用 initVal 和数组的第二项开始
        accVal = this[0];
        startIdx = 1;
    }
    for (let i = startIdx, len = this.length; i < len; i++) {
        accVal = reducer(accVal, this[i], i, this);
    }
    return accVal;
};

const result = arr.reduce2((accVal, curVal, curIdx, arr) => accVal + curVal);
console.log(result);
```

## Array.prototype.reduceRight

## Array.prototype.reverse

## Array.prototype.shift

## Array.prototype.slice

## Array.prototype.some