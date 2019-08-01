---
title: 一个栗子认识正则
date: 2019-07-28 18:54:16
tags: RegExp
categories: JS 高级
---

需求：取出字符串 `'张三工资：10000，李四工资：20000，我：30000'` 中的所有工资放到数组中。

分别用字符串下的 `match`、`split`、`replace`、`search` 和正则下的 `exec`、`test` 实现，希望大家对正则配合 JS 的使用有一个最基础的认识！

<!-- more -->

## Match 匹配

```javascript
const str = '张三工资：10000，李四工资：20000，我：30000';
let reg = /\d+/g;
console.log(str.match(reg)); // ["10000", "20000", "30000"]
```

## Match 通过改变正则分组捕获

```javascript
const str = '张三工资：10000，李四工资：20000，我：30000';
let reg = /(\d+)，[\u4e00-\u9fa5]+：(\d+)，[\u4e00-\u9fa5]+：(\d+)/; // 加不加 g 无所谓
str.match(reg);

console.log([RegExp.$1, RegExp.$2, RegExp.$3]); // ["10000", "20000", "30000"]
```

## Split 分组

str.split(/xxx/)，以 xxx 把字符串拆分成数组，并且把 xxx 干掉。str.split(/(xxx)/)，这样拆分后的结果也会保留 (xxx) 分组！

```javascript
let str = '张三工资：10000，李四工资：20000，我：30000';

let reg = /(\d+)/g;
let arr = str.split(reg);
console.log(arr); // ["张三工资：", "10000", "，李四工资：", "20000", "，我：", "30000", ""]
let newArr = [];
for(let i = 1; i < arr.length; i +=2) {
    newArr.push(arr[i]);
}
console.log(newArr); // ["10000", "20000", "30000"]
```

## Split 通过改变正则分组捕获

```javascript
const str = '张三工资：10000，李四工资：20000，我：30000';
let reg = /(\d+)，[\u4e00-\u9fa5]+：(\d+)，[\u4e00-\u9fa5]+：(\d+)/; // 加不加 g 无所谓
str.split(reg);

console.log([RegExp.$1, RegExp.$2, RegExp.$3]); // ["10000", "20000", "30000"]
```

## Replace 匹配

```javascript
let str = '张三工资：10000，李四工资：20000，我：30000';

let reg = /\d+/g;
let arr = [];
// 正则对象匹配到的字符串，分组1，分组2，匹配到的字符串在元字符中的偏移量，被匹配的原字符串
str.replace(reg, function(regExpStr, p1, offset,) {
    arr.push(regExpStr);
});
console.log(arr);
```

## Replace 分组捕获

```javascript
let str = '张三工资：10000，李四工资：20000，我：30000';

let reg = /(\d+)/g;
let arr = [];
// 正则对象匹配到的字符串，分组1，分组2，匹配到的字符串在元字符中的偏移量，被匹配的原字符串
str.replace(reg, function(regExpStr, p1, offset,) {
    arr.push(p1);
});
console.log(arr);
```

## Replace 通过改变正则分组捕获

```javascript
const str = '张三工资：10000，李四工资：20000，我：30000';
let reg = /(\d+)，[\u4e00-\u9fa5]+：(\d+)，[\u4e00-\u9fa5]+：(\d+)/; // 加不加 g 无所谓
str.replace(reg);

console.log([RegExp.$1, RegExp.$2, RegExp.$3]); // ["10000", "20000", "30000"]
```

## Search 通过改变正则分组捕获

```javascript
let str = '张三工资：10000，李四工资：20000，我：30000';

let reg = /(\d+)，[\u4e00-\u9fa5]+：(\d+)，[\u4e00-\u9fa5]+：(\d+)/;
str.search(reg);

console.log([RegExp.$1, RegExp.$2, RegExp.$3]);
```

## Exec 匹配

```javascript
const str = '张三工资：10000，李四工资：20000，我：30000';

RegExp.prototype.execAll = function () {
    let str = arguments[0] || '',
        result = [];
    // 如果没有加 g 永远匹配的都是第一项是死循环，我们只让执行一次就行
    if (!this.global) return this.exec(str);
    let arr = this.exec(str);
    // 匹配不上时 arr 就是 null
    while (arr) {
        // 第 0 项就是全局匹配的结果
        result.push(arr[0]);
        arr = this.exec(str);
    }
    return result;
};

let reg = /\d+/g;
console.log(reg.execAll(str)); // ["10000", "20000", "30000"]
```

## Exec 分组捕获

```javascript
const str = '张三工资：10000，李四工资：20000，我：30000';

RegExp.prototype.execAll = function () {
    let str = arguments[0] || '', result = [];
    if (!this.global) return this.exec(str);
    let arr = this.exec(str);
    while (arr) {
        // 第 1 个分组
        result.push(arr[1]);
        arr = this.exec(str);
    }
    return result;
};

let reg = /(\d+)/g;
console.log(reg.execAll(str)); // ["10000", "20000", "30000"]
```

## Exec 通过改变正则分组捕获

```javascript
const str = '张三工资：10000，李四工资：20000，我：30000';
let reg = /(\d+)，[\u4e00-\u9fa5]+：(\d+)，[\u4e00-\u9fa5]+：(\d+)/;
reg.exec(str);

console.log([RegExp.$1, RegExp.$2, RegExp.$3]); // ["10000", "20000", "30000"]
```

## Test 分组捕获

```javascript
let str = '张三工资：10000，李四工资：20000，我：30000';

let reg = /(\d+)/g;
let arr = [];
while(reg.test(str)) {
    // 每次 test lastIndex 的值都会变成下次开始查找的位置
    arr.push(RegExp.$1);
}
console.log(arr); // ["10000", "20000", "30000"]
```

## Test 通过改变正则分组捕获

```javascript
let str = '张三工资：10000，李四工资：20000，我：30000';
let reg = /(\d+)，[\u4e00-\u9fa5]+：(\d+)，[\u4e00-\u9fa5]+：(\d+)/;
reg.test(str);

console.log([RegExp.$1, RegExp.$2, RegExp.$3]); // ["10000", "20000", "30000"]
```