---
title: ES2015(ES6)
date: 2019-07-15 21:23:57
tags:
---

主要是 ES6 的知识梳理 ~

<!-- more -->
## let/const

``` javascript
// 有代码块的概念
{
    let a = 12;
}
console.log(a);// ReferenceError: a is not defined
```

``` javascript
// 不允许重复声明
let a = 12;
let a = 5;
```

``` javascript
let f = 10;
function fn() {
    f = 7; // 暂时性死去，报错
    let f = 2;
}
fn();
```

``` javascript
// 不支持预解析（变量提升）了
console.log(a); // ReferenceError: a is not defined
let a = 1;
```

``` javascript
// 循环语句之内是一个父作用域，循环体之中是一个子作用域
for(let i = 0; i < 3; i ++) {
    let i = 10;
    console.log(i);
}
console.log(i); // 报错，i is not defined
```

``` javascript
// const 必须给初始值，且一旦赋值，终身不变
// const 对象的话是可以修改内部的值的
const a = {
    name: 'yangk'
};
a.name = 'momo';
console.log(a.name);
```

## 关于字符串

### 模板字符串

``` javascript
// 基础套路
let name = "yangk"
let age = 22;
let str = `my name is ${name}, age ${age}.`;
```

``` javascript
// 尝试替换 ${xxx}
let name = 'yangk';
let age = 22;
let str = 'my name is ${name}, age ${age}.';

str = str.replace(/\$\{([^}]+)\}/g, function() {
    return eval(arguments[1]);
});
```

``` javascript
// 标签函数
function fn(args) {
    console.log(args);
}
fn`aaa`;
```

``` javascript
// 自定义模板
let name = 'yangk';
let age = 22;

function fn() {
    // console.log(arguments);// [["my name is ", ", age ", "."], "yangk", 22]
    let strings = arguments[0];
    // 把第一项后面的变成数组
    let values = [].slice.call(arguments, 1);
    let res = '';
    for(let i = 0; i < values.length; i ++)  {
        res += `${strings[i]}~${values[i]}~`;
    }
    res += strings[strings.length - 1];
    return res;
}
let str = fn`my name is ${name}, age ${age}.`;

console.log(str);
```

### 新增方法

``` javascript
// includes 代替 indexOf
let str = 'hello world';
console.log(str.includes('hello'));
```

``` javascript
// startWith/endsWith
let str = 'hello world';
console.log(str.startsWith('hello'));// true
console.log(str.endsWith('world'));// true
```

``` javascript
// repeat
let str = 'hello world';
console.log(str.repeat(3)); // hello worldhello worldhello world
```

``` javascript
// padStart/padEnd
let str = 'hello world';
// 长度，要往前填充的内容
console.log(str.padStart(20, 'x')); // xxxxxxxxxhello world
// 长度，要往后填充的内容
console.log(str.padEnd(20, 'x')); // hello worldxxxxxxxxx
```

## 解构赋值

### 解构普通数组

``` javascript
let [a,b,c] = [12,54,74];
```

``` javascript
let [a, [b, c], d] = [12, [1, 2], 6];
let [{a, e}, [b, c], d] = [{a: 'haha',e: 'xixi'}, [1, 2], 6];
```

### 解构 JSON 对象

``` javascript
// 解构一个对象，与顺序无关
let {a,b,c} = {b: 5, c: 7, a: 12}
```

``` javascript
// 解构 [] 对象的 length 属性
let {length} = ['哈', 9];
console.log(length); // 2
```

``` javascript
// 使用别名，不然直接使用 default 关键字会报错
let {default: d} = {default: 2};
```

``` javascript
// 默认值
let {time=12,id=0} = {time:33};
console.log(time); // 33
```

### 解构字符串

``` javascript
let [a, b, c, d] = '1234';
console.log(a, b, c, d);
```

``` javascript
let {length: len} = 'test';
console.log(len); // 4
```

### 其他解构赋值

``` javascript
let {toString: ts} = 1;
let {toString: bs} = true;

console.log(ts === Number.prototype.toString);
console.log(bs === Boolean.prototype.toString);
```

注：null 和 undefined 是不能进行解构赋值的

## Iterator 和 for of

Iterator 可以为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署 Iterator 接口，就可以完成遍历操作，而且这种遍历是依次进行的

- 为各种数据结构，提供一个统一的、简便的访问接口
- 使得数据结构的成员能够按某种次序排列
- Iterator 结构主要供 for of 循环来消费

```javascript
// Iterator 遍历过程：
// - 创建一个指针对象，指向当前数据结构的起始位置
// - 第一次调用指针对象的 next 方法，将指针对象指向数据结构的第一个成员
// - ...
const arr = [1, 2, 3];

function iterator(arr) {
    let index = 0;
    return {
        next: function() {
            return index < arr.length ? {
                value: arr[index++],
                done: false
            } : {
                value: undefined,
                done: true
            };
        }
    };
}

let it = iterator(arr);

console.log( it.next() );
console.log( it.next() );
console.log( it.next() );
console.log( it.next() );
```

有些数据结构本身就具备了 Iterator 接口，例如数组、字符串、set、map，对象就没有 Iterator 接口，凡是具有 Symbol.iterator 属性的数据结构都具有 Iterator 接口

``` javascript
const arr = [1, 2, 3];
const set = new Set(['a', 'b', 'c']);
const map = new Map([
    ['name', 'aaayang']
]);

const itArr = arr[Symbol.iterator]();
const itSet = set[Symbol.iterator]();
const itMap = map[Symbol.iterator]();

console.log(itArr, itSet, itMap); // 打印 Iterator 的对象指针

console.log(itSet.next()); // {value: 'a', done: false}
console.log(itSet.next());
console.log(itSet.next());
console.log(itSet.next());
```

``` javascript
const obj = {};
console.log(obj[Symbol.iterator]); // undefined，说明对象并不具备 Iterator 接口
```

具备 iterator 接口的数据结构都可以进行结构赋值、扩展运算符、for of

``` javascript
const set = new Set(['a', 'b', 'c']);
let [x, y] = set;
console.log(x, y);
```

``` javascript
let str = 'test'; // 类数组，也具备 Iterator 接口
let arrStr = [...str];

console.log(arrStr); // ['t', 'e', 's', 't']
```

``` javascript
// 数组去重
let arr = [1, 1];
let newArr = [...new Set(arr)];
console.log(newArr);
```

``` javascript
let arr = ['a', 'b', 'c'];

for (let i of arr) {
    console.log(i); // a, b, c
}
```

``` javascript
const m = new Map();
m.set('a', 1).set('b', 2).set('c', 3);

for(let i of m) {
    console.log(i); // ['a', 1], ['b', 2], ['c', 3]
}
```

``` javascript
const m = new Map();
m.set('a', 1).set('b', 2).set('c', 3);
// 也可以在循环的时候对数组进行解构
for(let [k, v] of m) {
    console.log(k, v); // a 1, b 2, c 3
}
```

给一个不具备 Iterator 接口的对象部署一个 Iterator 接口

``` javascript
let obj = {
    name: 'aaayang',
    age: 18
};

obj[Symbol.iterator] = function() {
    let keys = Object.keys(obj);
    let len = keys.length;
    let i = 0;
    // 该函数必须返回一个对象
    return {
        // 返回对象中必须包含 next 方法，这个 next 方法就是给迭代进行调用的，比如 for of，每次迭代就是调用这个 next()
        next() {
            return i < len ? {
                value: obj[keys[i++]],
                done: false
            } : {
                value: undefined,
                done: true
            };
        }
    };
};

for(let i of obj) {
    console.log(i);
}
```

## 展开和收缩

主要针对的是数组（ES2018对象也可以了），既可以扩展，也可以收缩，也可以剩余（写在函数参数中）

### 扩展成多个（值）

可以用来拷贝对象，并且对新对象的修改不会影响到原对象

``` javascript
let arr1 = [1, 2, 3];
let arr2 = [];
// 先扩展数组，在放进数组
arr2 = [...arr1]; // 也可以 Array.from(arr1)
arr2.pop();
console.log(arr1);
```

``` javascript
let aDiv = document.getElementsByTagName('div');
// let aEle = [].slice.call(aDiv);
// Array.from
let aEle = [...aDiv];
console.log(aEle);
```

``` javascript
// 之前的做法
function show(a,b,c,d) {
    console.log(a,b,c,d);
}
show.apply(null, [1, 2, 3, 4]);
```

``` javascript
// 现在的做法
function show(a,b,c,d) {
    console.log(a,b,c,d);
}
show(...[1, 2, 3, 4]);
```

### 收缩为一个（数组）

之前的做法是：Array.prototype.slice.call(arguments)，现在可以用 Array.from 或扩展运算符

``` javascript
function show(...args){
    args.push(5);// args 就是一个数组，直接可以push
    console.log(...args);
}
show(1,2,3,4);
```

### 对象的收缩和展开

``` javascript
let { x, y, ...z } = { x: 1, y: 2, z: 3, m: 4 };
console.log(z); // {z: 3, m: 4}
```

``` javascript
// 常用来复制一个对象
let json1 = { x: 1, y: 2, z: 3, m: 4 };
let json2 = {...json1};
console.log(json2);
```

## 关于数组

### reduce

``` javascript
// 求和，因为没有默认值，第一次 prev 是 1，next 是 2，nextIndex 就是 1
let arr = [1, 2, 3, 4];
let res = arr.reduce((prev, next, nextIndex, arr) => {
    // 返回结果会作为下一次循环的 prev
    return prev + next;
});
console.log(res);
```

``` javascript
// 加默认值就多循环了一次，第一次 prev 是 0，next 是1，nextIndex 在数组中的索引也就是 0
let arr = [1, 2, 3, 4];
let res = arr.reduce((prev, next, nextIndex, arr) => {
    return prev + next;
},0);
```

``` javascript
// 求平均数
let arr = [1, 2, 3, 4];
let res = arr.reduce((prev, next, nextIndex, arr) => {
    if(arr.length -1  === nextIndex) {
        return (prev + next)/arr.length;
    }
    return prev + next;
});
console.log(res);
```

``` javascript
// 默认值的使用
let arr = [{
    count: 1
},{
    count: 2
},{
    count: 3
}];

/* let res = arr.reduce((prev, next, nextIndex, arr) => {
    // 第一次没问题，第二次返回的结果 3 会作为下一次的 prev，3.count 这是什么鬼
    return prev.count + next.count;
}); */

let res = arr.reduce((prev, next, nextIndex, arr) => {
    // 第一次没问题，第二次返回的结果 3 会作为下一次的 prev，3.count 这是什么鬼
    return prev + next.count;
},0);
```

``` javascript
// 实现 reduce
Array.prototype.myReduce = function (fn, prev) {
    for (let i = 0; i < this.length; i++) {
        if (typeof prev === 'undefined') {
            prev = fn(this[i], this[i + 1], i + 1, this);
            // ++i;
        } else {
            prev = fn(prev, this[i], i, this);
        }
    }
    return prev;
};
```

``` javascript
// 没有默认值，reduce 回调只执行了一次，只能展开二维数组
let arr = [
    [1,2,3],
    [4,5,6]
];
arr = arr.reduce((prev,next, nextIndex,ary) => {
    return [...prev,...next];
});

console.log(arr);
```

### forEach

forEach 可以完全代替 for

``` javascript
// ['a', 'b', 'c', 'd'].forEach(console.log);
['a', 'b', 'c', 'd'].forEach(function (value, index, array) {
    console.log(this,value); // this 默认 window，现在改成了 'xxx'
}, 'xxx');
```

``` javascript
['a', 'b', 'c', 'd'].forEach( (value, index, array) => {
    console.log(this,value); // 用箭头函数第二个参数就凉了
}, 'xxx');
```

``` javascript
// 注意 jQuery 中的第一个参数是 index ...
$.each([], function(index, value, array) {
    // ...
});
```

``` javascript
// 应用
let sum = 0;
[1, 2, 3, 4].forEach(function(value,index,array){
    // console.log(array[index] == value);
    sum += value;
});
console.log(sum);// 10
```

### map

``` javascript
// map 对元素重新组装，生成新数组
let arr = [1, 2, 3, 4];
let arrNew = arr.map(function (item) {
    return item * item;// 一般配合return使用
});
console.log(arrNew); // 1, 4, 9, 16
```

### filter

``` javascript
let arr = [1, 2, 3, 4];
// filter 筛选出符合条件的元素，返回新数组
let result3 = arr.filter(function(item, index) {
    if(item >= 2) {
        return true;
    }
});
console.log(result3);
```

### find

``` javascript
// 返回数组中符合条件的第一个元素
let array1 = [5, 12, 8, 130, 44];
let found = array1.find(function (element) {
    return element > 10;
});
console.log(found); // 12
```

### findIndex

``` javascript
// 返回数组中符合的第一个元素的索引
let array1 = [5, 12, 8, 130, 44];
let found = array1.findIndex(function (element) {
    return element > 10;
});
console.log(found); // 1
```

### some

``` javascript
let arr = [1, 2, 3, 4];
// some 判断是否有至少一个元素符合条件，返回true or false
let result2 = arr.some(function (item, index) {
    if (item < 4) {
        return true;
    }
});
console.log(result2); // true
```

### every

``` javascript
// every 判断所有元素是否都符合条件，返回true or false
let arr = [1, 2, 3, 4];
let result = arr.every(function(item, index) {
    if(item < 4) {
        return true;
    }
});
console.log(result); // false
```

### fill

``` javascript
let arr = new Array(5);
arr.fill('xxx');
console.log(arr); // ["xxx", "xxx", "xxx", "xxx", "xxx"]
```

### includes

数组也有 includes，和字符串的一样的意思

### from

类数组转数组

#### 复制一份

对新赋值对象的修改不会影响原来的对象

``` javascript
let arr1 = [1, 2, 3];
let arr2 = [];
arr2 = Array.from(arr1);
arr2.pop();
console.log(arr1);
```

#### 类数组转数组

``` javascript
let aDiv = document.getElementsByTagName('div');
// let aEle = [].slice.call(aDiv);
let aEle = Array.from(aDiv);// 类数组转数组
console.log(aEle);
```

``` javascript
// 一般有 length 就是类数组，就可以转
let json = {
    0: 'xxx',
    1: 'yyy',
    2: 'zzz',
    length: 2
};

let arr = Array.from(json);
console.log(arr); // ['xxx', 'yyy']
```

#### 字符串拆分成数组

``` javascript
let name = 'yangk';
let arrName = Array.from(name);
console.log(arrName); //  ["y", "a", "n", "g", "k"]
```

### of

也可以把一堆参数组合成数组

``` javascript
let arr = Array.of(1,2,3,4,5);
console.log(arr); // [1, 2, 3, 4, 5]
```

## 函数变更

### 默认参数

``` javascript
function show(a='hello', b='world') {
    console.log(a,b);
}
show();
```

``` javascript
function show({x=0,y=1}={}) {
    console.log(x,y);
}

show({x:8});
```

### 箭头函数

``` javascript
document.onclick = () => {
    // this => window
    document.body.style.background = "red";
};
```

### this 指向

``` javascript
let json = {
    a: 1,
    b: 2,
    show: () => {
        // this => window
        console.log(this.a);
    }
};
json.show();// undefined
```

``` javascript
let json = {
    a: 1,
    b: 2,
    show: () => {
        setTimeout(() => {
            console.log(this.a);    
        }, 1000);
    }
};
json.show();// undefined
```

``` javascript
let json = {
    a: 1,
    b: 2,
    show: function() {
        setTimeout(() => {
            // 取决于父级中的 this
            console.log(this.a);    
        }, 1000);
    }
};
json.show();// 1
```

### arguments

箭头函数中没有 arguments

``` javascript
let show = ()=>{
    console.log(arguments);// arguments is not defined
};
show(1,2,3);
```

``` javascript
// 常用
let show = (...args) => {
    console.log(args); // [1,2,3]
};
show(1, 2, 3);
```

### 简便写法

``` javascript
let name = "yangk";
let age = 18;
let person = {
    name,
    age,
    showName(){
        // this => window
        console.log(this.name);
    }
};
person.showName();
```

### 箭头函数不能当构造函数使用

``` javascript
// 错误姿势
let Show = (name) => {
    this.name = name;
}
let show = new Show('xxx');
```

## 对象简洁语法

``` javascript
let name = 'aaa';
let age = 18;

let json = {
    name,
    age,
    // 里面的方法不要用箭头函数，不然自找蛋疼
    showName() {
        console.log(this.name);
    }
};

json.showName(); // aaa
```

## Object

### Object.assign

只会拷贝源对象自身的并且可枚举的属性到目标对象，注意是浅拷贝

``` javascript
let json1 = {
    name: 'xxx'
};
let json2 = {
    name: 'yyy',
    age: 18
};
let json3 = {
    hobby: '足球'
};

// 目标用新的空对象，假如去掉会对原来的 json1 造成影响
let obj = Object.assign({}, json1, json2, json3);
```

``` javascript
// 也可以对数组进行复制操作
let arr1 = ['a', 'b', 'c'];
let arr2 = Object.assign([],arr1);
console.log(arr2);
```

### Object.keys

``` javascript
let json = {
    name: 'aaayang',
    age: 18
};
for(let key of Object.keys(json)) {
    console.log(key); // name, age, for in 循环得到的是 0, 1
}
```

### Object.values

### Object.entries

### Object.is

``` javascript
Object.is(NaN, NaN); // true
```

``` javascript
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
```

### setPrototypeOf

``` javascript
// 设
let obj1 = {
    name: 'aaayang'
};
let obj2 = {
    age: 18
};
// 链：__proto__，任何东西都有
obj1.__proto__ = obj2;
// 先找自己的，找不到通过链找
console.log(obj1.age);
```

``` javascript
// 取
// console.log(obj1.__proto__); // {age: 18}

Object.getPrototypeOf(obj1); // {age: 18}
```

``` javascript
// 可以通过 super 找到父
let obj1 = {
    name: 'aaayang'
};
let obj2 = {
    name: 'bbb',
    getPName() {
        return super.name;
    },
    __proto__: obj1
};
console.log(obj2.name); // bbb
console.log(obj2.getPName()); // aaayang
```

## 异步的发展

### 回调函数

#### 函数返回函数

高阶函数：函数返回函数，或函数当做参数传递

``` javascript
// 简单判断类型的需求
function isType(type, content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
}
// 麻烦
isType('String', 'hello')
isType('String', 'world')
```

``` javascript
function isType(type) {
    return function(content) {
        return Object.prototype.toString.call(content) === `[object ${type}]`;
    }
}

let arr = ['String', 'Number', 'Array', 'Object', 'Null'];
let util = {};

arr.forEach(item => {
    util['is'+item] = isType(item);
});

console.log(util.isString('hello'));
```

#### 函数当做参数

高阶函数：函数返回函数，或函数当做参数传递

``` javascript
// 调用 3 次 fn 才执行回调
let fn = after(3, function() {
    console.log('done');
});
// 当达到某个条件时执行 callback
function after(times, callback) {
    return function() {
        // 这里可以写一些逻辑 xxx
        // xxx
        if(--times === 0) {
            callback();
        }
    }
}

fn();
fn();
fn(); // done
```

#### 能干什么

``` javascript
// 把两个文件读取的结果同时打印出来
let fs = require('fs');
fs.readFile('./a.txt', 'utf-8', function(err, data) {
    out(data);
});

fs.readFile('./b.txt', 'utf-8', function (err, data) {
    out(data)
});

let arr = [];
function out(data) {
    arr.push(data);
    if (arr.length === 2) {
        console.log(arr);
    }
}
```

``` javascript
// 改进上面的代码
let fs = require('fs');
function after(times, callback) {
    // 可以缓存函数，当达到条件时执行回调函数
    let arr = [];
    return function (data) {
        arr.push(data);
        if (--times === 0) {
            callback(arr);
        }
    }
}
fs.readFile('./a.txt', 'utf-8', function (err, data) {
    out(data);
});

fs.readFile('./b.txt', 'utf-8', function (err, data) {
    out(data)
});

let out = after(2, function (arr) {
    console.log(arr);
});
```

### Promise

``` javascript
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 1000);
});
promise.then(res => {
    console.log(res);
}, err => {
    console.log(err);
});
```

### generator

#### 预热

``` javascript
// 有索引，有长度，是一个类数组
let obj = {
    0: 'hello',
    1: 'world',
    length: 2
};

// 默认不可被迭代
// let arr = [...obj];

// 可以使用 Array.from
let arr = Array.from(obj);
console.log(arr);
```

``` javascript
// 模拟迭代
let obj = {
    0: 'hello',
    1: 'world',
    length: 2,
    // 迭代器函数，会返回一个对象，对象中必须有一个 next 方法
    [Symbol.iterator]: function() {
        let index = 0;
        let that = this;
        return {
            next() {
                return {
                    value: that[index],
                    // 是否迭代完成
                    done: index++ === that.length
                }
            }
        }
    }
};

let arr = [...obj];
```

``` javascript
// 模拟迭代器
function read(arr) {
    let index = 0;
    return {
        next() {
            return {
                value: arr[index],
                done: index++ >= arr.length
            };
        }
    };
}

let it = read(['vue', 'react', 'angular']);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next()); // { value: undefined, done: true }
```

#### 正式开始

generator 是一个生成器，生成的是上面我们模拟的迭代器，它可以把一个函数拆分成若干个部分执行。

``` javascript
function *gen() {
    return 1000;
}
let a = gen();
// 碰到 return 认为迭代完成了
console.log(a.next()); // { value: 1000, done: true }
```

``` javascript
function *gen() {
    yield 1000;
}
let a = gen();
// yield 并不认为迭代完成
console.log(a.next()); // { value: 1000, done: false }
```

``` javascript
// 第一次调用迭代器 next 传递的参数没有意义，想穿在调用生成器的时候穿
// 第二次 next 传递的参数是上次 yield 的返回值 ...
function *gen(xxx) {
    let a = yield xxxx;
    let b = yield a;
    return b;
}

let a = gen('买菜');

console.log(a.next());
console.log(a.next('买好的菜')); // 赋值给了 a
console.log(a.next('做菜'));
```

``` javascript
/* const read = function(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if(err) reject(err);
            resolve(data.toString());
        });
    });
}; */
// 读取依赖文件，手工迭代
let fs = require('fs');
let {promisify} = require('bluebird');

let read = promisify(fs.readFile);

function * gen() {
    // read 返回的是个 promise
    let b = yield read('a.txt', 'utf8');
    let c = yield read(b, 'utf8');
    let res = yield read(c, 'utf8');
    return res;
}

let it = gen();
// it.next() 的 read 的返回结果，结果的value 是个 promise
it.next().value.then(data => {
    // data => b.txt => 传递给上面的 b
    it.next(data).value.then(data => {
        // data => c.txt => 传递给上面的 c
        it.next(data).value.then(data => {
            // data => hello world => 传递给上面的 res
            console.log(it.next(data).value)
        });
    });
});
```

``` javascript
// 用 co 帮我们执行上面的迭代，yield 后要求返回的是一个 promise
let fs = require('fs');
let co = require('co');
let {promisify} = require('bluebird');
let read = promisify(fs.readFile);

function * gen() {
    let b = yield read('a.txt', 'utf8');
    let c = yield read(b, 'utf8');
    let res = yield read(c, 'utf8');
    return res;
}

co(gen()).then(data => {
    console.log(data);
});
```

``` javascript
function *a() {
    yield '1';
    yield '2';
}

// 如果在 generator 中调用另一个 generator，加个 *
function *b() {
    yield '3';
    yield * a();
    yield '4';
}

let it = b();
console.log(it.next());
console.log(it.next());
```

### async

async 是 generator 的语法糖

await 后面可以是 promise，也可以是数字、字符串

只要 await 语句后面的 Promise 状态变成 reject，那么整个 async 函数都会中断执行，所以建议任何有 await 的地方都要 try catch，或者用 promise 本身的 catch，比较累

``` javascript
let {promisify} = require('bluebird');
let fs = require('fs');
let read = promisify(fs.readFile);

// async 返回的是个 promise
async function r() {
    let b = await read('./a.txt', 'utf8');
    let c = await read(b, 'utf8');
    let res = await read(c, 'utf8');
    return res;
}

r().then(data => {
    console.log(data);
});
```

``` javascript
async function fn() {
    let [a,b,c] = await Promise.all([
        readFile('./a.txt'),
        readFile('./b.txt'),
        readFile('./c.txt')
    ]);
    console.log(a,b,c);
}
fn();
```

## 模块化

- CommonJS，服务端，同步的

- AMD，requireJS

- CMD，seaJS

- ES规范，统一客户端和服务端

### 一般套路

服务器环境下运行，默认严格模式

``` javascript
// mod.js
export const name = 'aaa';
```

``` javascript
// 可以相对路径
<script type="module">
import {name} from './mod.js';
console.log(name);
</script>
```

``` javascript
// 也可以绝对路径
<script type="module">
import 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js';
setTimeout(() => {
    $('body').css({
        background: 'red'
    });
});
</script>
```

``` javascript
// 只有 export default 在引入时不需要解构
// 其他情况在引入时要么解构，要么 import * as xxx from './mod'
```

### 动态加载

``` javascript
<script type="module">
let a = 'xxx';
if (a === 'xxx') {
    import('./mod1.js').then(res => {
        console.log(res.name);
    });
} else {
    import('./mod2.js').then(res => {
        console.log(res.name);
    });
}
</script>
```

``` javascript
<script type="module">
import('https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js').then(res => {
    $(function() {
        $('body').css({
            background: 'red'
        });
    });
});
</script>
```

``` javascript
// await 后跟 promise，返回的是 promise 执行的结果
<script type="module">
async function load() {
    const mod1 = await import('./mod1.js');
    const mod2 = await import('./mod2.js');
    console.log(mod1.name);
    console.log(mod2.name);
}
load();
</script>
```

``` javascript
<script type="module">
async function load() {
    const [m1,m2] = await Promise.all([
        import('./mod1.js'),
        import('./mod2.js')
    ]);
    console.log(m1.name, m2.name);
}
load();
</script>
```

## ES6 中的类

class 没有预解析，必须先定义后调用

### ES5和ES6 对比

``` javascript
const Test = function(a, b) {
    this.a = a;
    this.b = b;
    return this;
};

Test.prototype = {
    constructor: Test,
    print: function() {
        console.log(this.a + ' ' + this.b);
    }
};

let t = new Test('hello', 'world');

t.print();
```

``` javascript
class Test {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        return this;
    }
    print() {
        console.log(this.a + ' ' + this.b);
    }
}

new Test('hello', 'world').print();
```

### 基本套路

``` javascript
class Person {
    // 调用 new 自动执行，默认也会添加 contructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // 定义在类中方法都是不可以被枚举的，Object.keys(Person.prototype) 搞不出来
    showName() {
        console.log(this.name);
    }
}
let p1 = new Person('aaayang', 18);
p1.showName();
```

### 方法可以是变量

``` javascript
let hobby = 'hobbyFn';
class Person {
    [hobby]() {
        console.log('hello world');
    }
}

let p1 = new Person();
p1[hobby]();
p1.hobbyFn();
```

### 关于 this

一般定义妥妥的

``` javascript
class Person {
     constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}
 
let p1 = new Person('aaayang');
p1.sayName(); // ok
```

解构后再使用，this 就是 undefined 了

``` javascript
class Person {
     constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}
let p1 = new Person('aaayang');
let {sayName} = p1;
sayName(); // this 是 undefined
```

矫正 this

``` javascript
class Person {
     constructor(name) {
        this.name = name;
        // call 和 apply 也可以矫正 this，但会调用函数
        // bind 只管矫正，并不调用函数
        this.sayName = this.sayName.bind(this);
    }
    sayName() {
        console.log(this.name);
    }
}
let p1 = new Person('aaayang');
let {sayName} = p1;
sayName(); // aaayang
```

### 静态方法

``` javascript
class Person {
    static sayName() {
        console.log('hello world');
    }
}
Person.sayName();
```

### 继承

``` javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}

class Student extends Person {

}
let stu = new Student('xxx');
stu.sayName(); // xxx
```

``` javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}

class Student extends Person {
    constructor(name, age) {
        super(name);
        // 想有自己的属性，必须先继承父级的属性
        this.age = age;
    }
}
let stu = new Student('xxx', 18);
console.log(stu.name, stu.age);
```

执行父的方法

``` javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}

class Student extends Person {
    constructor(name) {
        super(name);
    }
    sayName() {
        // 执行父的方法，也可以是父类的静态方法
        // super 指的是父类的原型对象
        super.sayName();
        console.log(this.name);
    }
}
let stu = new Student('xxx');

stu.sayName();
```

### 总结

- 子类继承父类用 extends 关键字
- 为父类指定静态方法，使用 static 方法名字
- super 在构造函数中可以当一个函数来使用，相当于调用父类的构造函数
- super 在原型方法中可以当一个对象来使用，相当于父类的原型对象，并且会自动绑定 this 到子类上

### 一个例子

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    canvas {
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.5);
    }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script>
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;

    class Ball {
        constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;
            // ~~ 代表去掉小数部分
            this.color = `rgba(${~~Ball.rpFn([55, 255])}, ${~~Ball.rpFn([55, 255])}, ${~~Ball.rpFn([55, 255])})`;
            return this; // 可以在实例化后继续调用其他的方法
        }

        render(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.r, 0, 2*Math.PI);
            ctx.fill();
            ctx.restore();
            return this;
        }

        static rpFn(arr) { // Ball.rpFn([1, 10])
            let max = Math.max(...arr),
                min = Math.min(...arr);
            
            return Math.random() * (max - min) + min;
        }
    }


    class SuperBall extends Ball {
        constructor(x, y, r) {
            // 继承父类构造函数中所有的属性
            super(x, y, r); // 调用父类的构造函数，相当于之前的 Ball.call(this, x, y, r)
            
            // 继承时，没调 super 这里是没有 this 的
            this.vy = SuperBall.rpFn([2, 4]);
            this.g = SuperBall.rpFn([0.2, 0.4]);
            this.a = 0;
            return this;
        }
        move(ctx) {
            // super(); // 不能在非构造函数中调用
            this.y += this.vy;
            this.vy += this.g;

            let current = this.vy * -0.75;

            if(this.y + this.r >= ctx.canvas.height) {
                this.y = ctx.canvas.height - this.r;
                if(Math.abs(current - this.a) < 0.01) return false;
                this.a = this.vy *= -0.75;
            }

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            // 注意这里的 super 指的是父类的原型对象
            super.render(ctx);
            return true;
        }
    }


    let ball, timer;

    canvas.onclick = function(e) {
        let x = e.offsetX, y = e.offsetY;
        let r = ~~Ball.rpFn([25, 55]);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ball = new SuperBall(x, y, r).render(ctx);
        ballMove();
    };

    function ballMove() {
        timer = window.requestAnimationFrame(ballMove);
        if(!ball.move(ctx)) {
            window.cancelAnimationFrame(timer);
        }
    }
    </script>
</body>
</html>
```

## Symbol

一般当做唯一的 key 使用，Symbol 不能使用 new 去调用

``` javascript
let syml = Symbol('hello');

let json = {
    a: 'apple',
    b: 'bannana',
    [syml]: 'symbol'
};

// console.log(json[syml]); // symbol

// 不能被 for in 出来
for(let key in json){
    console.log(key); // a b
}
```

``` javascript
let obj = {
    [Symbol()]: 123,
    name: 'aaayang'
};
let a = Object.getOwnPropertySymbols(obj);
console.log(a); // [ Symbol() ]

let b = obj[a[0]];
// 可见即使不在外面把 Symbol 当做一个变量，也是可以得到它的值的
console.log(b); // 123
```

``` javascript
// 转成字符串
console.log( String(Symbol('test')) );
console.log( Symbol('test').toString() );

// 转布尔
console.log( !!Symbol() );
```

## generator

执行 generator 函数返回的是什么？？

``` javascript
function* gen() {
    yield 'hello';
    yield 'world';
    return 'last';
}

let g1 = gen();
console.log(g1.next());
console.log(g1.next());
// 最后一个的 done 是不是 true 取决于 generator 函数最后是 return 还是 yield
console.log(g1.next()); //  { value: "last", done: true }
```

for of 遍历

``` javascript
function * gen() {
    yield 'hello';
    yield 'world';
    return 'last';
}

let g1 = gen();
for(let val of g1) {
    console.log(val); // hello workd，return 的东西不会遍历
}
```

``` javascript
function * gen() {
    yield 'hello';
    yield 'world';
    return 'last';
}

let [a,b] = gen();
console.log(a,b); // hello world
console.log(...gen()); // hello world
```

``` javascript
function* gen() {
    yield 'hello';
    yield 'world';
    return 'last';
}

console.log(Array.from(gen())); // ['hello', 'world']
```

``` javascript
function* gen() {
    let val = yield 'aaayang';
    
    yield axios.get(`https://api.github.com/users/${val}`);
}
let g1 = gen();
let username = g1.next().value; // aaayang

g1.next(username).value.then(res => {
    console.log(res);
});
```

## Set/Map

Set 类似于数组，不重复，其实没有真正的 key，所有也就没有 get 方法，因为 get 要通过 key 获取的

Map 类似于 JSON，相对于 Set 多了个 get 方法，另外 key 可以是任意的值

### Set

相当于 Python 中的集合

``` javascript
// 数据结构
// set: 类似数组，里面不能有重复的值
let arr = ['a', 'b', 'c', 'a'];
let set = new Set(arr);
```

``` javascript
// 方法
set.add('xxx'); // 添加
set.delete('xxx'); // 删除
console.log(set.has('c')); // 检测
set.clear(); // 清空
```

``` javascript
// 属性
console.log(set.size); // 长度
```

``` javascript
// 循环
for(let item of set) {
    console.log(item); // a, b, c
}
```

``` javascript
// Set 的 keys 和 values 是一样的
for (let item of set.keys()) {
    console.log(item); // a, b, c
}
// 默认是values()
for(let item of set.values()) {
    console.log(item); // a, b, c
}
for(let item of set.entries()) {
    console.log(item); // ["a", "a"], ["b", "b"] ...
}
for(let [k, v] of set.entries()) {
    console.log(k,v); // a a, b b ...
}
```

``` javascript
// set 有 forEach
set.forEach((val, index) => {
    console.log(val, index);// a a, b b, c c ...
});
```

```javascript
// 可以链式操作 new set(arr).add().add()
set.add('gg').add('bb');
```

``` javascript
// 去重
let xxx = ['1', '1', '2', '3', '3'];
// Set 数据结构变成数组通过 ...
console.log([...new Set(xxx)]);

// 使用数组中的方法
let m = new Set([...new Set(xxx)].map(value => value * 2));
console.log(m);
```

``` javascript
// 正常Set里面放的数组
// 也可以放对象，最好用weakset
let j1 = {
    name: 'aaa'
};
let j2 = {
    age: 18
};
// 注意是 add 进去的
let j3 = new Set().add(j1).add(j2);

j3.forEach(val => console.log(val)); // {name: "aaa"} {age: 18}
```

``` javascript
let wSet = new WeakSet();
let json = {
    name: 'aaa',
    age: 18
};
// 建议存 json
wSet.add(json);
// 没有 size 没有 clear，有add, has, delete
console.log(wSet.size); // undefined ...
```

### Map

相当于 Python 中的字典

```javascript
// 问题，为对象添加了两次 key(是个对象)，结果却只有只有
let data1 = {a:1};
let data2 = {b:2};
let obj = {};

// 如果 key 的对象，会自动调用 toString()，而这两个对象 toString() 后是一样的
obj[data1] = 1;
obj[data2] = 2;

console.log(obj); // { '[object Object]': 2 }
```

Map 数据结构，键的范围不限于字符串，对象也可以，是一种更完善的 Hash 结构的实现

``` javascript
const map = new Map([
    ['a', 1], // 键是a ，值是1
    ['b', 2]
]);
```

``` javascript
let map = new Map();

// 设置
// map.set(key, value)
console.log(map.set('name', 'aaa'));
```

``` javascript
// 可以链式
map.set('name', 'aaayang').set('age', 18);
```

``` javascript
// map 的 key 可以是任意类型
let json = {
    a: 1
};
// key 可以是对象
console.log(map.set(json, 'aaa'));
// 获取
// set 没有获取，只能循环
console.log(map.get(json));
```

``` javascript
map.delete('name'); // 返回true or false

// 判断
console.log(map.has('name'));
// 清空
map.clear();
```

``` javascript
// 默认 values
for(let [key,val] of map) {
    console.log(key, val); // name aaa
}

for(let key of map.keys()) {
    console.log(key);
}

for(let key of map.values()) {
    console.log(key);
}

for(let key of map.entries()) {
    console.log(key);
}


map.forEach((val, key) => {
    console.log(val, key); // aaa name
});
```

``` javascript
// WeakMap key 只能是对象
let obj = {
    name: 'aaa'
};
let weakMap = new WeakMap().set(obj, 'xxx');
```

### 细节

``` javascript
// 会认为 NaN 是一个东西
let map = new Map();
let a = map.set(NaN, '1').set(NaN, '2');
console.log(a); // {NaN => '2'}
```

```javascript
// 两个空对象就不是一个东西了
let map = new Map();
let a = map.set({}, '1').set({}, '2');
console.log(a); // {{} => '1', {} => '2}
```

``` javascript
// map 里面 key 的排列顺序永远是按照添加的顺序进行的
```

## 数值变化

### 进制

``` javascript
// 0b 代表二进制
let a = 0b11;
console.log(a); // 3
```

``` javascript
// 八进制
let a = 0o11;
console.log(a); // 0
```

### Number

- Number.isNaN

- Number.isFinite，是否是数字

- Number.isInteger，是否是整数

- Number.parseInt

- Number.parseFloat

- Number.isSafeInteger(2**53)，是否是安全整数【-(2**53-1) ~ (2**53-1)】

- Number.MAX_SAFE_INTEGER，最大安全整数

- Number.MAX_VALUE

- Math.trunc(1.23)，截取，只保留整数部分

- Math.sign，整数返回1，负数返回-1，0返回0，-0返回-0

### 幂运算

``` javascript
// 2 的 3 次方
console.log(Math.pow(2,3)); // 8
console.log(2**3); // 8
```

## 关于正则

### 命名捕获

``` javascript
let str = '2018-08-25';
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
let arr = str.match(reg);

let {year, month, daty} = arr.groups;
```

``` javascript
let reg = /^(?<aaayang>welcome)-\k<aaayang>$/;
// let reg = /^(?<aaayang>welcome)-\1$/;

let str = 'a-a';
let str2 = 'welcome-welcome';

console.log(reg.test(str));
console.log(reg.test(str2));
```

``` javascript
let str = '2018-08-25';
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

// let a = str.replace(reg, '$2$1$3');
let a = str.replace(reg, '$<year>/$<month>/$<day>');
console.log(a);
```

``` javascript
let str = '2018-08-25';
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

let a = str.replace(reg, (...args) => {
    let {year, month, day} = args[args.length-1];
    return `${year}/${month}/${day}`;
});
console.log(a);
```

``` javascript
// s 修饰符让 . 代表所有
let reg = /^\w.\w$/s;
console.log(reg.test('w\nx')); // false
```