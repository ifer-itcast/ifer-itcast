---
title: 数据处理
date: 2020-03-31 19:23:42
tags: 数据处理
categories: JS 高级
---

总结一些项目中实际涉及到的数据处理相关的代码，慢慢更新...

<!-- more -->

## 关于 Reduce

### 基本使用

有同学对数组的 [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 方法不理解，其实不难，使用如下：

```javascript
const arr = [1, 2, 3];
const result = arr.reduce((accVal, curVal, curIdx, arr) => accVal + curVal, initVal);
console.log(result); // 6
```

**注意：**accVal 和 curVal 的取值有两种情况：如果提供了 initVal，初始取值 accVal 取值为 initVal，curVal 取数组中的第一个值；如果没有提供 initVal，那么 accVal 取数组中的第一个值，curVal 取数组中的第二个值！

### 模拟实现

```javascript
Array.prototype.reduce = Array.prototype.reduce || function (cb, initVal) {
    var startIdx = 0;
    if (typeof initVal === 'undefined') {
        // 没提供初始值，就把 0 个当做初始值，从第 1 个开始循环
        initVal = this[0];
        startIdx = 1;
    }
    for (startIdx; startIdx < this.length; startIdx++) {
        initVal = cb(initVal, this[startIdx], startIdx, this);
    }
    return initVal;
};
```

### 实际应用

把 `['a', 'b', 'c']` 转成 `{ a: { b: { c: {} } } }` 的形式

```javascript
const format = arr => arr.reduceRight((accVal, curVal) => ({
    [curVal]: accVal
}), {});

console.log(format(['a', 'b', 'c']));
```

