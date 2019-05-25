---
title: 数据类型检测的 N 中方式
date: 2019-05-26 00:40:04
tags: 判断数据类型
categories: JS 高级
---

从 JS 基础第一天开始，我们就学习了如何使用 `typeof` 去判断数据类型，学习构造函数时我们又说了  `constructor` 以及 `instanceof` 也可以去进行类型检测，到 JS 高级时还讲了 `Object.prototype.toString()` 方法也可以去判断数据类型，那么问题来了，这么多方法它们之间有什么异同吗？不同场景下该怎样使用才比较合适呢？

<!-- more -->

## 数据类型知多少

既然要检测数据类型，首先要明确 JS 中的数据类型有以下 7 种：

- 简单数据类型：Number、String、Boolean、Null、Undefined、Symbol（ES6）
- 复杂数据类型：Object（包括函数、数组、对象、正则、日期等）

## typeof

typeof 它的使用方法有两种：

```javascript
// 可以不带括号，直接跟数据
console.log(typeof 36);
// 也可以带括号
console.log(typeof(36));
```

typeof 的返回值永远是一个**全小写字符串**，例如：

```javascript
console.log(typeof (typeof (typeof 66))); // string
```

typeof 的返回值除了上面 7 种数据类型外，还多了一个 function，例如：

```javascript
function test() {}
console.log(typeof test); // function
```

总结：

- 除了 Null（返回 object），typeof 对于基本数据类型都能返回正确的结果
- 除了 Function（返回 function），typeof 对于复杂数据类型都返回 object

缺点：

- typeof 对于复杂数据类型的处理，只能返回处于原型链最顶端的 Object 类型，不能细分

## constructor

新建一个（构造）函数 Fn 时，JS 引擎会给自 Fn 添加一个 prototype 属性，prototype 下又有一个 constructor 指向 Fn 函数，可用如下代码表示：

```javascript
function Fn() {}
console.log(Fn.prototype.constructor === Fn); // true
```

当我们执行 `new Fn` 来创建 Fn 的实例后，这个实例的 constructor 也就指向 Fn，如下：

```javascript
function Fn() {}
var f1 = new Fn;
// f1 下本没有 constructor，自己没有则会通过原型链向上查找到 Fn.prototype 上
console.log(f1.constructor === Fn); // true
```

如此一来我们就可以通过 constructor 来判断某个实例对象具体的类型（来源），例如上面代码从原型链的角度来说 f1 的类型（来源）就是 Fn。

同样的道理，其他数据的也可以通过 constructor 来判断具体的类型，它可以解决 typeof 对应复杂数据类型的判断无能为力的问题，测试如下：

```javascript
console.log([].constructor === Array); // true
console.log(new Date().constructor === Date); // true
console.log(new Function().constructor === Function);
console.log(''.constructor === String);
console.log(true.constructor === Boolean);
console.log(new Error().constructor === Error);
console.log(document.constructor === HTMLDocument);
```

constructor 的小问题：

- null 和 undefined 上没有 constructor 这属性，不能通过 constructor 来判断
- 当 prototype 被不小写重写后，会导致 constructor 判断不准确的问题，例如：

    ```javascript
    function Test() {}
    var t1 = new Test;
    console.log(t1.constructor === Test); // true

    // 重写原型会导致 Test.prototype.constructor 指向不正确
    // 当然对应的实例对象在用 constructor 去判断类型的时候也就会指向不正确
    Test.prototype = {
        showAge: function() {}
    };
    var t2 = new Test();
    console.log(t2.constructor === Test); // false
    ```

## instanceof

它主要用来判断一个对象是否能够通过原型链找到另一个对象的原型，什么意思呢？例如：

```javascript
// [] 可以通过 __proto__ 找到 Array.prototype，所以结果是 true
console.log([] instanceof Array);
```

```javascript
// [].__proto__.__proto__ === Object.prototype
// 说明 [] 也是可以通过原型链找过 Object 的原型，所以下面结果也是 true
console.log([] instanceof Object);
```

所以大家也看到了，instanceof 并不能准确的找到某个实例的类型，但它相对于 constructor 有这样一个特点，**即便构造函数的原型被重写后，实例也能通过 instanceof 去判断自己的类型**，例如：

```javascript
function Test() {}
Test.prototype = {
    showAge: function() {}
};
var t1 = new Test();
console.log(t1 instanceof Test); // true
console.log(t1 instanceof Object); // 当然对应顶级对象 Object 也是 true，还是不能准确判断就是 Test 类型
```

instanceof 还有另外一个问题需要你注意的，当页面中引入 iframe 时，实例化** iframe 窗口**下的对象和**当前窗口**下相对应的构造函数进行 instanceof 判断时也会出现问题。例如：

```javascript
var oFrame = document.createElement('iframe');
document.body.appendChild(oFrame);
// ifame 窗口下实例化的 arr
var arr = new window.frames[0].Array;

console.log(arr instanceof window.frames[0].Array); // true

console.log(arr instanceof Array); // false

// 针对上面的问题 ES5 提供了 Array.isArray() 这个方法进行判断
console.log(Array.isArray(arr)); // true
```

## Object.prototype.toString

他返回的信息格式是 `[object Xxx]`（注意第一个 X 是大写），对于 {} 直接调用 toString 既可以返回 `[object Object]`，其他类型需要借助 call/apply 方法去调用，例如：

```javascript
// 也可以把 Object.prototype 替换成 {}
// 因为调用 {} 下的 toString() 方法，自己没有会通过原型链去 Object.prototype 上面找
console.log(Object.prototype.toString.call(233)); // [object Number]
console.log(Object.prototype.toString.call('233')); // [object String]
console.log(Object.prototype.toString.call(true)); // [object Boolean]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(Symbol())); // [object Symbol]

console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call(new Function)); // [object Function]
console.log(Object.prototype.toString.call(new Date)); // [object Date]
console.log(Object.prototype.toString.call(new RegExp)); // [object RegExp]
```

可见 `Object.prototype.toString()` 简直太好用啦，推荐使用！