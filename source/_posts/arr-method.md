---
title: arr-method
date: 2019-12-09 19:04:46
tags:
---

## forEach

## filter

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

## map

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

## reduce

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
