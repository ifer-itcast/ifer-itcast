---
title: 正则必知必会
date: 2019-07-17 01:11:57
tags: RegExp
categories: JS 高级
---

## Exec

exec 是 RegExp 的方法，有时候会发现 exec 了 N 次后还是相同的结果，原因是 reg.lastIndex 的值并没有发生变化，lastIndex 是正则下一次匹配查找的开始位置，不加正则修饰符 g 的时候这里一直是 0（正则的懒惰性），代码如下：

```javascript
let reg = /\d+/;
let str = '我的账号是351288299，密码是33423';

console.log( reg.exec(str) ); // ["351288299", index: 5, input: "我的账号是351288299，密码是33423", groups: undefined]
console.log( reg.exec(str) ); // ["351288299", index: 5, input: "我的账号是351288299，密码是33423", groups: undefined]
```

可以手动指定 reg.lastIndex 的值吗？

答案是可以，手动指定后虽然确实可以导致 reg.lastIndex 的值变化，但正则下次开始查找的位置并不会变化（还是 0），也就是这个 lastIndex 值的变化并没有发挥实际的作用：

```javascript
let reg = /\d+/;
let str = '我的账号是351288299，密码是33423';

console.log( reg.exec(str) ); // ["351288299", index: 5, input: "我的账号是351288299，密码是33423", groups: undefined]

reg.lastIndex = 18; // 这里指定下次开始查找的位置
console.log(reg.lastIndex); // 这里确实也变成了 18，但发现下面结果并没有变化

console.log( reg.exec(str) ); // ["351288299", index: 5, input: "我的账号是351288299，密码是33423", groups: undefined]
```

那怎么才能实现每次 exec 后都是继续往后匹配呢？

答案是需要给正则加全局修饰符 g，代码如下：

```javascript
let reg = /\d+/g;
let str = '我的账号是351288299，密码是33423';

console.log( reg.exec(str) ); // ["351288299", index: 5, input: "我的账号是351288299，密码是33423", groups: undefined]
console.log( reg.exec(str) ); // ["33423", index: 18, input: "我的账号是351288299，密码是33423", groups: undefined]
```

只匹配两次还好，假如有匹配 N 次的需求，每次 exec 太麻烦，封装个方法一次匹配所有**大正则**的内容可好：

```javascript
let reg = /\d+/g;
let str = '我的账号是351288299，密码是33423，出生日期19961202，身份证号5283233';

RegExp.prototype.execAll = function () {
    let str = arguments[0] || '',
        result = [];
    // 如果没有加 g 是死循环，我们只让执行一次就行
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

console.log(reg.execAll(str)); // ["351288299", "33423", "19961202", "5283233"]
```

## Match

匹配所有大正则的内容，使用 exec 需要我们自己处理才能得到所有的结果，就是有点麻烦，字符串的 match 方法可以帮我们一步实现上面的需求，代码如下：

```javascript
let reg = /\d+/g;
let str = '我的账号是351288299，密码是33423，出生日期19961202，身份证号5283233';

console.log( str.match(reg) ); // ["351288299", "33423", "19961202", "5283233"]
```

相同的效果，str.match 只需一步，reg.exec 需要一堆，那么是不是意味着 str.match 就比 reg.exec 牛呢，下面继续分析。

## Exec 和 Match 对比

### 同

正则不加修饰符 g 的情况下，两则功效是一样的，都能匹配第一次的大正则（//中间的内容成为大正则）和小分组（()里面的内容称为小分组），例如：

```javascript
let reg = /(\d+)/;
let str = '我的账号是351288299，密码是33423，出生日期19961202，身份证号5283233';

console.log(reg.exec(str)); //  ["351288299", "351288299", index: 5, input: "我的账号是351288299，密码是33423，出生日期19961202，身份证号5283233", groups: undefined]
console.log(str.match(reg)); //  ["351288299", "351288299", index: 5, input: "我的账号是351288299，密码是33423，出生日期19961202，身份证号5283233", groups: undefined]
```

### 异

正则在加修饰符 g 的情况下两者才有区别，exec 可以捕获到大正则和小分组，并且每次 exec 都会继续向后匹配，而 match 只能匹配到大正则，例如：

```javascript
let reg = /\d+(.)/g;
let str = '我的账号是351288299，密码是33423。出生日期19961202~身份证号5283233！';

// exec 还可以捕获到分组的内容
console.log(reg.exec(str)); // ["351288299，", "，", index: 5, input: "我的账号是351288299，密码是33423。出生日期19961202~身份证号5283233！", groups: undefined]
console.log(reg.exec(str)); // ["33423。", "。", index: 18, input: "我的账号是351288299，密码是33423。出生日期19961202~身份证号5283233！", groups: undefined]
console.log(reg.exec(str)); // ["19961202~", "~", index: 28, input: "我的账号是351288299，密码是33423。出生日期19961202~身份证号5283233！", groups: undefined]
console.log(reg.exec(str)); // ["5283233！", "！", index: 41, input: "我的账号是351288299，密码是33423。出生日期19961202~身份证号5283233！", groups: undefined]

// 正则加 g match 是匹配不到分组的
console.log(str.match(reg)); //  ["351288299，", "33423。", "19961202~", "5283233！"]
console.log(str.match(reg)); //  ["351288299，", "33423。", "19961202~", "5283233！"]
```

很明显，要想得到所有分组，还是要靠 exec，我们只需改变上面自己封装的 execAll 方法即可，在取到结果时，result.push 的不再是匹配到的全局结果 arr[0]，而是整个 arr（本例中 arr[1] 代表第一个分组），然后再从里面筛选出自己想要的分组数据即可，代码如下：

```javascript
let reg = /\d+(.)/g;
let str = '我的账号是351288299，密码是33423。出生日期19961202~身份证号5283233！';

RegExp.prototype.execAll = function () {
    let str = arguments[0] || '',
        result = [];
    // 如果没有加 g 是死循环，我们只让执行一次就行
    if (!this.global) return this.exec(str);
    let arr = this.exec(str);
    while (arr) {
        // 为了方便展示，这里取的是 arr[1]，实际最好是 result.push(arr)
        result.push(arr[1]);
        arr = this.exec(str);
    }
    return result;
};

console.log(reg.execAll(str)); // ["，", "。", "~", "！"]
```

总结：想得到分组还是要靠 reg.exec。<font size=2 color=#ccc>其实 match 也可以就是比较麻烦！</font>

## Test

reg.test 一般用来验证是否能匹配，例如：

```javascript
let reg = /\d+/g;
let str = 'my age is 18 ~~';

if(reg.test(str)) {
    console.log('匹配 ~');
}
```

每次 test 时也会改变 lastIndex 的索引值（这点和 exec 一样），例如：

```javascript
let reg = /\d+/g;
let str = 'my age is 18 ~~';

if(reg.test(str)) {
    // console.log(reg.lastIndex); // 12
    // test 已经改变了 lastIndex 的值了，再从12往后找就没有啦
    console.log(reg.exec(str)); // null
}
```

其实 test 也可用来捕获小分组（大正则是捕获不到的），例如：

```javascript
let reg = /(\{(\d+)\})/g;
let str = 'my name is {111}, my age {12} ~~';

reg.test(str);
console.log(RegExp.$1); // {111}
console.log(RegExp.$2); // 111

reg.test(str);
console.log(RegExp.$1); // {12}
console.log(RegExp.$2); // 12
```

封装个方法，test 也可以像 exec 一样，一次匹配所有小分组：

```javascript
let reg = /\{(\d+)\}/g;
let str = 'my name is {111}, my age {12} ~~';

// test 每次捕获小分组时比较方便，正则中有多个分组也是可以的 RegExp.$2 ...
function useTest() {
    let result = [];
    if(!reg.global) return reg.test(str);
    while(reg.test(str)) {
        // 这里没有那么灵活，假如有两个分组，还要 RegExp.$2，怎么知道有多少个分组呢？
        result.push(RegExp.$1);
    }
    return result;
}
console.log(useTest()); // ["111", "12"]
```

## Test 和 Exec 比较

- 同：两则都可以用来捕获小分组
- 异：exec 可以用来捕获大正则，test 不行

## 翻车案例

需求：匹配所有工资 `let str = '张三工资：10000，李四工资：20000，我：30000';`

### match 和匹配

```javascript
let reg = /\d+/g;
console.log(str.match(reg)); // ["10000", "20000", "30000"]
```

### match 和分组

```javascript
// 只能得到第一个
let reg = /(\d+)/;
str.match(reg);
console.log(RegExp.$1); // 10000
```

```javascript
// 只能得到最后一个
let reg = /(\d+)/g;
str.match(reg);
console.log(RegExp.$1); // 30000
```

match 并不能改变 reg 下的 lastIndex 的值！<font size=2 color=#ccc>正则下的 exec 和 test 可以！</font>

```javascript
// 通过改变正则！
let str = '张三工资：10000，李四工资：20000，我：30000';

let reg = /(\d+)，[\u4e00-\u9fa5]+：(\d+)，[\u4e00-\u9fa5]+：(\d+)/g;
// reg.test(str); // ok
// reg.exec(str); // ok
// str.split(reg); // ok
// str.replace(reg); // ok
// ...
str.match(reg);
console.log(RegExp.$1); // 10000
console.log(RegExp.$2); // 20000
console.log(RegExp.$3); // 30000
```

### exec 和匹配

```javascript
let reg = /\d+/g;
// execAll 方法的封装见上面
console.log(reg.execAll(str)); // ["10000", "20000", "30000"]
```

### exec 和分组

```javascript
let reg = /(\d+)/g;

RegExp.prototype.execAll = function () {
    // ...
    while (arr) {
        // 第 1 个分组
        result.push(arr[1]);
        arr = this.exec(str);
    }
    return result;
};
console.log(reg.execAll(str)); // ["10000", "20000", "30000"]
```

```javascript
let reg = /(\d+)/g;
let arr = [];
while(reg.exec(str)) {
    // 每次 exec lastIndex 的值都会变成下次开始查找的位置
    arr.push(RegExp.$1);
}
console.log(arr); // ["10000", "20000", "30000"]
```

### test 和分组

```javascript
let reg = /(\d+)/g;
let arr = [];
while(reg.test(str)) {
    // 每次 test lastIndex 的值都会变成下次开始查找的位置
    arr.push(RegExp.$1);
}
console.log(arr); // ["10000", "20000", "30000"]
```

