---
title: 关于数组塌陷
date: 2019-06-23 10:53:16
tags: [数组塌陷, splice]
categories: JS 基础
---

关于数组的方法有很多，[splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 算是比较强大的一个，它能用来删除、添加、替换数组中的元素，实际开发中非常实用！

## 基本语法

```javascript
// start: 从哪里开始，也支持负值，-n 相当于 arr.length - n
// deleteCount: 要删除几个（可选）
// item1, item2: 要添加进数组的元素（可选）

// 返回值: 以数组的形式返回删除的那些元素
array.splice(start, deleteCount, item1, item2);
```

## 代码演练

删除：从第 2 位开始，删除 2 个

```javascript
var arr = ['apple', 'orange', 'banana', 'watermelon'];
arr.splice(2, 2);
console.log(arr); // ['apple', 'orange']
```

添加：从第 2 位开始，删除 0 个，添加 🤣😎

```javascript
var arr = ['apple', 'orange', 'banana', 'watermelon'];
arr.splice(2, 0, '🤣', '😎');
console.log(arr); // ["apple", "orange", "🤣", "😎", "banana", "watermelon"]
```

替换：从第 2 项开始，删除 2 项并添加🍌和🍉

```javascript
var arr = ['apple', 'orange', 'banana', 'watermelon'];
arr.splice(2, 2, '🍌', '🍉');
console.log(arr); // ["apple", "orange", "🍌", "🍉"]
```

## 数组塌陷

需求：利用 splice 删除数组中的指定元素

```javascript
var arr = ['apple', 'orange', 'banana', 'watermelon'];
// 从 0 开始删到最后，并不能指定删除某个元素
arr.splice(0);
console.log(arr); // []
```

```javascript
// 删除指定的某个元素时就需要遍历，但最终的结果和我们想的不一样！
var arr = ['apple', 'orange', 'banana', 'watermelon'];
for(var i = 0; i < arr.length; i ++) {
    // 从第 i 个开始，删除 1 个
    arr.splice(i, 1);
}
console.log(arr); // ["orange", "watermelon"]
```

上面的写法删不干净，因为 splice 每删除一个元素就会改变原来数组的索引以及长度，而 i 的值永远是个递增的状态，代码分析如下（建议断点调试）：

<p><font color=#ccc size=2>第 1 次 i 等于 0， arr.splice(0, 1) 后的结果是 ['orange', 'banana', 'watermelon']，arr 的 length 变为了 3；</font></p>

<p style="margin-top:-15px"><font color=#ccc size=2>第 2 次 i 等于 1，arr.splice(1, 1) 后的结果是 ['orange', 'watermelon']，arr 的 length 变为了 2；</font></p>

<p style="margin-top:-15px"><font color=#ccc size=2>第 3 次 i 等于 2， i < arr.length 条件为假，结束循环；</font></p>

## 解决方法

需求：解决上面利用 splice 删除不干净的问题！

**每次删除数组的第一个元素**

```javascript
var arr = ['apple', 'orange', 'banana', 'watermelon'];
for(var i = 0; i < arr.length; i ++) {
    arr.splice(i, 1);
    // 每次删除后进行 i--，这样就能保证删除的永远都是数组的第一个元素（说第一个元素不太准确，取决于i的值变化到哪里了）
    i --;
}
console.log(arr); // []
```

```javascript
// 原理和上面一样，永远删除数组最前面那个元素
while(arr.length) {
    arr.splice(0, 1);
}
```

**倒着删**

```javascript
// 可以通过断点调试查看代码执行过程
var arr = ['apple', 'orange', 'banana', 'watermelon'];
for(var i = arr.length - 1; i >= 0; i --) {
    arr.splice(i, 1);
}
console.log(arr);
```

## 使用场景

数组去重：每次用当前元素和后面的所有元素进行比较，如果相同就利用 splice 删除掉后面相同的那个元素 j（或当前的 i）

```javascript
var arr = ['apple', 'apple', 'apple', 'orange', 'apple'];
for(var i = 0; i < arr.length; i ++) {
    for(var j = i + 1; j < arr.length; j ++) {
        if(arr[i] === arr[j]) {
            arr.splice(j, 1);
            // 解决 splice 后带来的数组塌陷问题
            j --;
        }
    }
}
```

## 题目测试

需求：在数组 `var arr = ['a', 'b', 'c', 'd'];` 每一项的前面添加 @ 字符

```javascript
// Way1
for(var i = arr.length - 1; i >= 0; i --) {
    arr.splice(i, 0, '@');
}

console.log(arr); // ["@", "a", "@", "b", "@", "c", "@", "d"]
```

```javascript
// Way2
for(var i = 0; i < arr.length; i ++) {
    arr.splice(i, 0, '@');
    // ['@', 'a', 'b', 'c', 'd'] 下次 'b' 的索引已经是 2 了，需要再次进行 i++
    i++;
}

console.log(arr); // ["@", "a", "@", "b", "@", "c", "@", "d"]
```

```javascript
// Way3
for(var i = 0; i < arr.length; i ++) {
    arr.splice(i, 1, '@'+arr[i]);
}
arr = arr.join('').split('');

console.log(arr); // ["@", "a", "@", "b", "@", "c", "@", "d"]
```

## 其他方法

用 splice 删除指定元素的目的，换句话说无非是想得到**想要**的元素，其实数组也提供了 [filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 方法，可以帮我们筛选出想要的数组元素！

```javascript
// 具体使用看文档，这里不再啰嗦了！
var arr = ['apple', 'orange', 'banana', 'watermelon'];
// 返回一个新的、由通过测试的元素组成的新数组
var newArr = arr.filter(word => !word);
console.log(newArr); // []
```