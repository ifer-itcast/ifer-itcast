---
title: 类数组转数组分析
date: 2019-12-20 10:44:09
tags: 类数组
categories: JS 高级
---

```javascript
// 为了方便对类数组进行操作，有时候需要进行转换成数组，下面的操作都会以此类数组举例
let arrlike = { 0: '深圳', 1: '郑州', 2: '武汉', length: 3 };
```

<!-- more -->

## 移花接个木

**利用 Call 或 apply 改变数组方法下的 this 指向，达到“借用”的目的！**

**Array.prototype.slice**：slice(begin, end) 方法返回一个新的数组对象（包括 begin，不包括end），原始数组不会被改变。

```javascript
// 基本使用
let arr = Array.prototype.slice.call(arrlike);
arr.push('西安');
console.log(arr); // ["深圳", "郑州", "武汉", "西安"]
```

```javascript
// 为什么改变 slice 方法内部的 this 指向就能实现类数组转数组呢？
// 假设 slice 内部是下面的实现方式你是否可以理解了呢？
Array.prototype.slice = function (start=0, end=this.length) {
    let newArr = [];
    for (let i = start; i < end; i++) {
        newArr[newArr.length] = this[i];
    }
    return newArr;
};
```

```javascript
// 注意细节：slice 是浅拷贝，修改 newArr 会影响原 arrlike
let arrlike = {
    0: '深圳',
    1: '郑州',
    2: {
        age: 18
    },
    length: 3
};
let newArr = Array.prototype.slice.call(arrlike);
newArr['2'].age = 19;
console.log(arrlike['2'].age); // 19
```

**Array.prototype.splice**：splice(start, deleteCount, item1, item2, ...) 以数组形式返回被修改的内容，此方法会改变原数组。

```javascript
// splice 也可以实现类数组转成数组，原理同上（splice内部实现要依赖 this）
// 需要注意的是 splice 会对原类数组产生影响
let newArr = Array.prototype.splice.call(arrlike, 0);
newArr.push('西安');
console.log(newArr); // ["深圳", "郑州", "武汉", "西安"]
```

**Array.prototype.concat**：同理 concat 也可以实现同样的功能

```javascript
let newArr = Array.prototype.concat.apply([], arrlike);
newArr.push('西安');
console.log(newArr); // ["深圳", "郑州", "武汉", "西安"]
```

## 扩展运算符

```javascript
console.log([...arrlike]); // TypeError: arrlike is not iterable
```

[关于 Iterator 接口](http://es6.ruanyifeng.com/?search=...&x=0&y=0#docs/iterator#%E9%BB%98%E8%AE%A4-Iterator-%E6%8E%A5%E5%8F%A3)

```javascript
// 注意扩展运算符只能转换具备 Iterator 接口的数据，可改写如下
let arrlike = {
    0: '深圳',
    1: '郑州',
    length: 2,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
let arr = [...arrlike]
arr.push('北京');
console.log(arr); // ["深圳", "郑州", "北京"]
```

## Array.from

推荐使用 ES6 新增的 Array.from 方法，语法简洁且通用！

```javascript
let arrlike = {
    0: '深圳',
    1: '郑州',
    length: 2
};
let arr = Array.from(arrlike);
arr.push('北京');
console.log(arr); // ["深圳", "郑州", "北京"]
```