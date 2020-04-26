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

数组里面放普通数据

```javascript
// 不写注解也会进行推断
const numberArr: number[] = [1, 2, 3];
const arr: (number | string)[] = [1, '2', 3];
```

数组里面放对象

```javascript
// 数组为空也 ok
const objectArr1: {name: string}[] = [];
```

```javascript
// 一旦数组里面有内容，那里面的列表必须严格和注解一致，不能多也不能少
const objectArr2: {name: string}[] = [{ name: 'xxx' }];
```

```javascript
// 使用类型别名
type User = { name: string };
const objectArr3: User[] = [{ name: 'xxx' }];
```

class 也可以被当做类型使用，意思是：此类的实例或具备此类数据结构的对象

```javascript
class User {
    name: string;
}
// 数组里面必须是 User 类的实例，或者具备 name、age 属性也 ok
const objectArr: User[] = [
    new Teacher(),
    { name: 'xxx' }
];
```

**关于元组**

```javascript
// 下面依然是数组
const info1: (string|number)[] = ['xxx', 18];

// 元组，和上面的差异是：数组长度和每一项的类型都是固定的
// 例如：第 1 项必须是 string、第 2 项必须是 number，且必须只有 2 项
const info2: [string, number] = ['xxx', 18];
```

```javascript
// 数组
const info1:(string|number)[][] = [
    ['xxx', 'male', 18],
    ['yyy', 'female', 19],
    ['zzz', 'male', 28],
];

// 元组处理 csv 文件
const info2:[string, string, number][] = [
    ['xxx', 'male', 18],
    ['yyy', 'female', 19],
    ['zzz', 'male', 28],
];
```

## Interface 接口

**基本操作**

```javascript
interface Person {
    name: string;
    age?: number;
}

const getPersonName = (person: Person): void => {
    console.log(person.name);
};

// 多了一个 sex 这里也没问题，但用字面量的形式传递整个对象就会有问题（强校验）
const person = { name: 'xxx', sex: 'male' };
getPersonName(person);
```

字面量的形式传递，在参数较多的时候如何保证不报错呢？

```javascript
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

const getPersonName = (person: Person): void => {
    console.log(person.name);
};

getPersonName({ name: 'xxx', sex: 'male' });
```

**参数是类的实例时，可以比接口定义的属性多，例如：**

```javascript
interface Person {
    name: string;
}

class Star {
    constructor(public name: string, public age: number) {}
}

function show(star: Person) {
    // 如果传递过来的是一个类的实例，里面只要覆盖接口的定义即可，属性可以比接口多
}

show(new Star('刘德华', 18));
```


**类可以应用一个接口**

```javascript
interface Person {
    name: string;
    say(): string;
    age?: number;
    [propName: string]: any;
}

// 类应用一个接口，此类需要具备接口必须的参数
class User implements Person {
    name = 'xxx'
    say = () => this.name;
}
```

**接口之间可以互相继承**

```javascript
interface Person {
    name: string;
    say(): string;
    age?: number;
    [propName: string]: any;
}

// Teacher 继承 Person 的同时又具备自己的方法
interface Teacher extends Person {
    teach(): string;
}

class User implements Teacher {
    name = 'xxx'
    say = () => this.name;
    teach = () => '前端';
}
```

**接口也可以用来表示一个函数类型**

```javascript
interface SayHi {
    (word: string): string; // 注意表示函数类型时这里并没有起名字
}

const say: SayHi = (word: string) => word;
console.log(say('hello')); // hello
```

## 类的特性

类中的访问类型有 public（类的内外都可以访问），private（允许在类内被使用），protected（允许在类内及继承的子类中使用）。下面是关于类的继承

```javascript
class Person {
    name = 'xxx';
    getName() {
        return this.name;
    }
}

class Teacher extends Person {
    getTeacherName() {
        return 'yyy';
    }
    // 可以重写父类的方法
    getName() {
        return super.getName() + '~~~';
    }
}

const person = new Teacher();
console.log(person.getName()); // xxx~~~
console.log(person.getTeacherName()); // yyy
```

**给类的实例属性赋值的两种写法**

```javascript
class Person {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
}
```

```javascript
// 这种写法和上面等价
class Person {
    constructor(public name: string) {}
}
const p = new Person('xxx');
console.log(p.name); // xxx
```

**类中的 Getter 和 Setter**

```javascript
class Person {
    constructor(private _name: string) {}
    get name() {
        return this._name;
    }
    set name(val) {
        this._name = '~~' + val + '~~';
    }
}

const person = new Person('xxx');
console.log(person.name); // xxx
person.name = 'yyy';
console.log(person.name); // ~~yyy~~
```

**TS 如何实现单例模式？**

```javascript
class Demo {
    // 只能内部访问 instance 这个私有的静态属性，instance 规定为 Demo 的一个实例
    private static instance: Demo;
    // 限制外部进行 new Demo 的操作
    private constructor(public name: string) {}
    static getInstance() {
        // 静态方法中的 this 就是类本身 Demo
        if (!this.instance) {
            this.instance = new Demo('xxx');
        }
        return this.instance; 
    }
}

const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();

console.log(demo1 === demo2); // true
```

**抽象类：一般把多个类共有的东西提取出来，抽象类只能被继承，而不能被实例化**

```javascript
abstract class Geom {
    getType() { // 可以有具体的方法
        return 'Gemo';
    }
    abstract getArea(): number; // 也可以有抽象的方法
}
// 继承抽象类
class Circle extends Geom{
    getArea() {
        return 123;
    }
}
class Square extends Geom {
    getArea() {
        return 456;
    }
}
```

**接口一般把对象等各种各样的东西提炼出来，例如：**

```javascript
interface Person { name: string; }

interface Teacher extends Person { money: number; }
interface Student extends Person { age: number; }

const teacher: Teacher = { name: 'ifer', money: 1 };
const student: Student = { name: 'elser', age: 18 };

const getUserInfo = (user: Person) => user.name;

console.log(getUserInfo(teacher));
console.log(getUserInfo(student));
```

## 爬虫小案例

### 基本配置

```
npm init -y
tsc --init
npm i ts-node typescript -D
npm i superagent -S
npm i @types/superagent -D
```

```javascript
// package.json
{
    "scripts": {
        "dev": "ts-node ./src/crowller.ts"
    }
}
```

### 爬取数据

```javascript
import superagent from 'superagent';

class Crowller {
    private secret = 'x3b174jsx';
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

    async getRawHtml() {
        const result = await superagent.get(this.url);
        console.log(result.text);
    }

    constructor() {
        this.getRawHtml();
    }
}

const crowller = new Crowller();
```

### 解析数据

```
npm i cheerio -S
npm i @types/cheerio -D
```

```javascript
class Crowller {
    // ...
    getCourseData(str: string) {
        // 先 load 得到一个 $ 对象，然后就可以按照 jQuery 的语法进行操作了
        const $ = cheerio.load(str);
        const items = $('.course-item');

        const courseInfo: CourseInfo[] = []; // 定义数组类型的正确姿势！

        items.map(function(index, domEle) {
            const descs = $(domEle).find('.course-desc');
            const title = descs.eq(0).text();
            const count = parseInt(descs.eq(1).text().split('：')[1], 10);
            courseInfo.push({
                title, count
            });
        });

        const result = { time: new Date().getTime(), data: courseInfo };
    }
    
    async getRawHtml() {
        const result = await superagent.get(this.url);
        this.getCourseData(result.text);
    }
    // ...
}
```

### 存储数据

优化设计：解决 `getRawHtml` 和 `getCourseData` 的耦合，每一个函数的职责尽量单一、明确！

```javascript
interface CourseInfo {
    title: string;
    count: number
}

interface CourseResult {
    time: number;
    data: CourseInfo[]
}

interface Content {
    [propName: number]: CourseInfo[];
}
```

```javascript
class Crowller {
    // ...
    private realPath = path.join(__dirname, '..', 'data', 'course.json');
    // ...
    saveData(course: CourseResult) {
        let obj:Content = {};
        if (fs.existsSync(this.realPath)) {
            obj = JSON.parse(fs.readFileSync(this.realPath, 'utf8'));
        }
        obj[course.time] = course.data;
        return obj;
    }
    writeFile(str: string) {
        fs.writeFileSync(this.realPath, str);
    }
    async init() {
        // 获取数据
        const text = await this.getRawHtml();
        // 解析数据
        const result = this.getCourseData(text);
        // 存储数据
        this.writeFile(JSON.stringify(this.saveData(result)));
    }
    // ...
}
```

### 组合模式

crowller.ts

```javascript
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';

import Analyzer from './analyzer';

export interface IAnalyzer {
    resolve: (str: string, url: string) => string;
}

class Crowller {
    private realPath = path.join(__dirname, '..', 'data', 'course.json');
    
    private async getRawHtml() {
        const result = await superagent.get(this.url);
        return result.text;
    }
    
    private writeFile(str: string) {
        fs.writeFileSync(this.realPath, str);
    }
    private async init() {
        // 获取数据
        const text = await this.getRawHtml();
        
        // 传过去【原始数据】和【存储路径】
        // 【解析数据】，并把存储路径的数据和当前解析数据拼接后返回
        const str = this.analyzer.resolve(text, this.realPath);
        this.writeFile(str);
    }
    // 如果传递过来的是一个类的实例，此实例只需要覆盖接口的定义即可，属性可以比接口多
    constructor(private analyzer: IAnalyzer, private url: string) {
        this.init();
    }
}

const secret = 'x3b174jsx';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const analyzer = new Analyzer();

// 分析对象、要分析的地址
new Crowller(analyzer, url);
```

analyzer.ts

```javascript
import fs = require('fs');
import cheerio from 'cheerio';
import { IAnalyzer } from './crowller';

interface CourseInfo {
    title: string;
    count: number
}
interface CourseResult {
    time: number;
    data: CourseInfo[]
}

interface Content {
    [propName: number]: CourseInfo[];
}

export default class Anylyzer implements IAnalyzer {
    private getCourseData(str: string) {
        // 先 load 得到一个 $ 对象，然后就可以按照 jQuery 的语法进行操作了
        const $ = cheerio.load(str);
        const items = $('.course-item');

        const courseInfo: CourseInfo[] = []; // 定义数组类型的正确姿势！

        items.map(function(index, domEle) {
            const descs = $(domEle).find('.course-desc');
            const title = descs.eq(0).text();
            const count = parseInt(descs.eq(1).text().split('：')[1], 10);
            courseInfo.push({
                title, count
            });
        });

        const result = {
            time: new Date().getTime(),
            data: courseInfo
        };
        return result;
    }
    private concatData(course: CourseResult, url: string) {
        let obj:Content = {};
        if (fs.existsSync(url)) {
            obj = JSON.parse(fs.readFileSync(url, 'utf8'));
        }
        obj[course.time] = course.data;
        return obj;
    }
    public resolve(str: string, url: string) {
        let obj = this.getCourseData(str);
        return JSON.stringify(this.concatData(obj, url));
    }
}
```

### 单例模式

crowller.ts

```javascript
const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
const analyzer = Analyzer.getInstance();
new Crowller(analyzer, url);
```

analyzer.ts

```javascript
export default class Anylyzer implements IAnalyzer {
    // ...
    private static instance: Anylyzer;
    static getInstance() {
        if (!this.instance) {
            this.instance = new Anylyzer();
        }
        return this.instance;
    }
    private constructor() {}
}
```

### 代码编译

`package.json` 配置，注意 `concurrently` 是并行的，不能保证 build 下生成 crowller.js 后再执行 `dev:start`，当 build 目录下没有 `crowller.js` 生成时，执行 `dev:start` 就会出错，所以先执行 `npm run dev:build`，再 `npm run dev`

```javascript
{
    "scripts": {
        "dev:build": "tsc -w",
        "dev:start": "nodemon ./build/crowller.js",
        "dev": "concurrently npm:dev:*"
    },
    "nodemonConfig": {
        "ignore": [
            "data/*"
        ]
    }
}
```

tsconfig.json

```javascript
{
    "compilerOptions": {
        "outDir": "./build"
    }
}
```

## 配置文件

include: 指定需要编译的文件，例如 `{"include": ["./demo.ts"]}`
files: 指定需要编译的文件，和 include 类似
exclude: 指定排除编译的文件，例如 `{"exclude": ["./demo.ts"]}`
removeComments: 编译后的 JS 是否保留注释，注意 `tsc demo.ts` 并不会用到根目录下的配置文件，直接执行 `tsc` 会用到配置
noImplicitAny: 是否要求显式设置 any，false 代表不必！例如：

```javascript
// Parameter 'name' implicitly has an 'any' type.
function abc(name) {
    return name;
}
```

strictNullChecks: 是否强制检查 null 类型，false 代表不，例如下面这样写也是 ok 的，例如：

```javascript
const teacher: string = null;
```

incremental: 是否增量编译，只编译本次发生变化的内容
allowJs: 是否编译 JS 文件
checkJs: 是否对 JS 文件也进行静态检查

noUnusedLocals: 设置为 true 代表有数据导出时，要对没有用的的本地变量进行检查，例如：

```javascript
// 'teacher' is declared but its value is never read.
const teacher: string = 'xxx';
export const age = 18;
```

noUnusedParameters: 设置为 true 代表对没有用到的参数进行校验

```javascript
// 'name' is declared but its value is never read.
function fn(name: string, age: number) {
    console.log(age);
}
```

## 类型保护

断言

```javascript
interface Bird {
    fly: boolean;
    sing: () => {}
}

interface Dog {
    fly: boolean;
    bark: () => {};
}

function trainAnimal(animal: Bird | Dog) {
    // 联合类型 animal 只能使用 Bird 和 Dog 共有的属性和方法 fly
    // 输入 animal. 只能看到 fly 属性提示，直接使用 animal.sing or animal.bark 会报错（需要进行类型保护）
    if (animal.fly) {
        (animal as Bird).sing();
    } else {
        (animal as Dog).bark();
    }
}
```

in 语法

```javascript
function trainAnimal(animal: Bird | Dog) {
    // 这种方式的好处是会有方法的提示
    if ('sing' in animal) {
        animal.sing();
    } else {
        // 'sing' 不在 Bird 里，那就是 Dog 了，所以也会有 Dog 相关的提示
        animal.bark();
    }
}
```

typeof 语法

```javascript
function add(first: string | number, second: string | number) {
    // return first + second; // Operator '+' cannot be applied to types 'string | number' and 'string | number'.
    // TS 认为非数字间使用 + 号拼接是不科学的
    if (typeof first === 'string' || typeof second === 'string') {
        return `${first}${second}`;
    }
    return first + second;
}
```

instanceof

```javascript
// 这里不能用 interface，因为不能和下面的 instanceof 配合
class NumberObj {
    constructor(public count: number) {}
}
// class 也可以当做类型使用，代表要是此 class 的实例！
function add(first: object | NumberObj, second: object | NumberObj) {
    if (first instanceof NumberObj && second instanceof NumberObj) {
        return first.count + second.count;
    }
}
const res = add(new NumberObj(3), new NumberObj(4));
```

## 关于枚举

糟糕的代码

```javascript
function getResult(status: number) {
    if (status === 0) {
        return 'offline';
    } else if (status === 1) {
        return 'online';
    } else if (status === 2) {
        return 'deleted';
    }
    return 'error';
}
```

常规优化

```javascript
const Status = {
    OFFLINE: 0,
    ONLINE: 1,
    DELETED: 2
};

function getResult(status: number) {
    if (status === Status.OFFLINE) {
        return 'offline';
    } else if (status === Status.ONLINE) {
        return 'online';
    } else if (status === Status.DELETED) {
        return 'deleted';
    }
    return 'error';
}
const result = getResult(Status.OFFLINE);
```

枚举优化

```javascript
enum Status {
    OFFLINE,
    ONLINE,
    DELETED
};

function getResult(status: number) {
    if (status === Status.OFFLINE) {
        return 'offline';
    } else if (status === Status.ONLINE) {
        return 'online';
    } else if (status === Status.DELETED) {
        return 'deleted';
    }
    return 'error';
}
const result = getResult(Status.OFFLINE);
console.log(result); // offline
```

## 函数泛型

泛型：泛指的类型，例如定义了一个 T 这样一个泛指的类型，但实际它具体是什么类型还不知道呢，可以是任意的类型，只有使用的时候才知道

举个例子

```javascript
// 定义了一个 ABC 这样一个泛指的类型，但实际它是什么类型还不知道呢，可以是任意的类型，只有使用的时候才知道
// join 接收了一个 ABC 这样的泛型，那么 first 和 second 都应该是这个类型
function join<ABC>(first: ABC, second: ABC) {
    return `${first}${second}`;
}
console.log(join<number>(1, 1));
```

```javascript
/* function map<ABC>(params: ABC[]) {
    return params;
} */

function map<ABC>(params: Array<ABC>) {
    return params;
}
console.log(map<number>([1, 1]));
```

也可以定义多个泛型

```javascript
function join<T, P>(first: T, second: P) {
    return `${first}${second}`;
}
let res = join<number,string>(1, '1');
console.log(res);
```

## 类中的泛型

普普通通的操作

```javascript
class DataManager {
    constructor(private data: string[]) {}
    getItem(index: number): string{
        return this.data[index];
    }
}

const data = new DataManager(['a', 'b']);
console.log(data.getItem(0));
```

期望参数是 string 或 number 类型的数组

```javascript
// 如果后面还需要存储更多的类型，写起来麻烦！
class DataManager {
    constructor(private data: string[] | number[]) {}
    getItem(index: number): string | number{
        return this.data[index];
    }
}

const data = new DataManager([1, 2]);
console.log(data.getItem(0));
```

泛型来优化

```javascript
// T 代表使用类时传递的任一类型，即 new DataManager<string>
class DataManager<T> {
    // 接收任一类型的数组
    constructor(private data: T[]) {}
    getItem(index: number): T{
        return this.data[index];
    }
}

// const data = new DataManager<string>(['1', '3']);
// const data = new DataManager<number>([1, 3]);
const data = new DataManager<string|number>(['1', '3', 4]);
console.log(data.getItem(2));
```

泛型也可以继承接口

```javascript
interface Item {
    name: string;
}
// 意思是：泛型 T 必须拥有 Item 的东西！
class DataManager<T extends Item> {
    // new 时传递的参数必须是 T 类型的数组
    constructor(private data: T[]) {}
    getItem(index: number): T{
        return this.data[index];
    }
}

// new 时传递的参数必须是 T 类型的数组，这里是 constructor 里的参数决定的
// const data = new DataManager<Item>([{ name: 'ifer' }]);
const data = new DataManager([{ name: 'ifer' }]);
```

一个问题及解决

```javascript
// 期望上面在进行实例化时这个类型不要是 Item 接口，只能 number 或 string 该怎么搞呢？
const data = new DataManager<Item>([{ name: 'ifer' }]);
```

```javascript
// 泛型除了可以继承接口外，还可以继承普通的数据类型
class DataManager<T extends number | string> {
    constructor(private data: T[]) {}
    getItem(index: number): T{
        return this.data[index];
    }
}
const data = new DataManager<number>([]);
```

## 命名空间对应的模块化

把一组东西封装进去 `namespace`，通过 `export` 对外提供统一的接口，想暴露哪个才暴露哪个

### 问题

```javascript
class Header {
    constructor() {
        const ele = document.createElement('div');
        ele.innerText = 'This is Header';
        document.body.appendChild(ele);
    }
}

class Content {
    constructor() {
        const ele = document.createElement('div');
        ele.innerText = 'This is Content';
        document.body.appendChild(ele);
    }
}

class Footer {
    constructor() {
        const ele = document.createElement('div');
        ele.innerText = 'This is Footer';
        document.body.appendChild(ele);
    }
}

class Page {
    constructor() {
        new Header();
        new Content();
        new Footer();
    }
}
```

### 解决

```javascript
// change1
namespace Home {
    class Header {
        constructor() {
            const ele = document.createElement('div');
            ele.innerText = 'This is Header';
            document.body.appendChild(ele);
        }
    }

    class Content {
        constructor() {
            const ele = document.createElement('div');
            ele.innerText = 'This is Content';
            document.body.appendChild(ele);
        }
    }

    class Footer {
        constructor() {
            const ele = document.createElement('div');
            ele.innerText = 'This is Footer';
            document.body.appendChild(ele);
        }
    }
    // change2: 只对外暴露了一个 Page
    export class Page {
        constructor() {
            new Header();
            new Content();
            new Footer();
        }
    }
}

// change3: 外部只需要这样使用
new Home.Page();
```

### 拆分

components.ts

```javascript
namespace Components {
    export class Header {
        constructor() {
            const ele = document.createElement('div');
            ele.innerText = 'This is Header';
            document.body.appendChild(ele);
        }
    }

    export class Content {
        constructor() {
            const ele = document.createElement('div');
            ele.innerText = 'This is Content';
            document.body.appendChild(ele);
        }
    }

    export class Footer {
        constructor() {
            const ele = document.createElement('div');
            ele.innerText = 'This is Footer';
            document.body.appendChild(ele);
        }
    }
}
```

page.ts

```javascript
// change1
namespace Home {
    // change2
    export class Page {
        constructor() {
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
    }
}
```

index.html

```html
<!-- 注意这里也引入的 components.js 文件 -->
<script src="./dist/components.js"></script>
<script src="./dist/page.js"></script>
<script>
new Home.Page();
// new Components.Header(); // 也能使用 Components 下的内容
</script>
```

### 合并

把文件合并打包后只保留一个 `page.js`

tsconfig.json

```javascript
{
    "module": "amd",
    "outFile": "./dist/page.js"
}
```

page.ts

```javascript
// 最好明确的表示命名空间的相互引用的关系，其实即便不写的话 Components 也能找到，因为 namespace Components 是全局的
///<reference path="./components.ts"/>

// change1
namespace Home {
    // change2
    export class Page {
        constructor() {
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
    }
}
```

index.html

```html
<!-- 只需要引入一个 page.js 即可 -->
<script src="./dist/page.js"></script>
<script>
new Home.Page();
// new Components.Header(); // 同样也能使用 Components 下的内容
</script>
```

## import 对应的模块化

可以用 ES6 import/export 语法代替 namespace

tsconfig.json

```javascript
{
    "module": "amd",
    "outFile": "./dist/page.js"
}
```

components.ts

```javascript
export class Header {
    constructor() {
        const ele = document.createElement('div');
        ele.innerText = 'This is Header';
        document.body.appendChild(ele);
    }
}

export class Content {
    constructor() {
        const ele = document.createElement('div');
        ele.innerText = 'This is Content';
        document.body.appendChild(ele);
    }
}

export class Footer {
    constructor() {
        const ele = document.createElement('div');
        ele.innerText = 'This is Footer';
        document.body.appendChild(ele);
    }
}
```

page.ts

```javascript
import { Header, Content, Footer } from './components';

export default class Page {
    constructor() {
        new Header();
        new Content();
        new Footer();
    }
}
```

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script>
    <script src="./dist/page.js"></script>
    <script>
        require(['page'], function (page) {
            new page.default();
        });
    </script>
</body>

</html>
```

上面使用的 `require.js` 能帮助我们识别编译后的下面端语法

```javascript
define("page", ["require", "exports"], function (require, exports) {
    var Page = function() {};
    exports.default = Page;
});
```

## Parcel 打包

```
npm init -y
tsc --init
npm i parcel -D
```

tsconfig.json

```javascript
{
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
    }
}
```

package.json

```javascript
{
    "scripts": {
        "test": "parcel ./src/index.html"
    }
}
```

index.html

```html
<script src="./page.ts"></script>
```

```
// my node version is v10.13.0
npm run test
```

## 类型定义文件

index.html

```html
<script src="https://cdn.bootcss.com/jquery/3.5.0/jquery.min.js"></script>
<script src="./page.ts"></script>
```

jquery.d.ts

```javascript
// 定义 $，冒号后面是类型定义！注意这里并不是函数实现
// 类型定义文件也不需要实现，等号后面才是实现
declare var $: (params: () => void) => void;
```

```javascript
// 上面是导出一个变量 $，$ 装的是一个函数，其实也可以这样直接导出一个函数
declare function $(params: () => void): void;

// 多次定义一个函数也是 ok 的，即函数重载
declare function $(params: string): {
    html: (html: string) => string
};
```

通过接口优化上面的写法

```javascript
interface JqueryInstance {
    html: (html: string) => string
}
declare function $(readyFunc: () => void): void;
declare function $(selector: string): JqueryInstance;
```

**接口的方式也可以实现函数重载**

```javascript
// jQuery 这个接口可以 #1 的方式去实现，也可以 #2 的方式去实现
interface jQuery {
    (readyFunc: () => void): void; // #1
    (selector: string): JqueryInstance; // #2
}
// 对外暴露出去
declare var $: jQuery;
```

上面接口的方式，当 $ `既是函数又是对象`的时候就不好弄了，还是需要配合 `namespace` 的形式

jquery.d.ts

```javascript
interface JqueryInstance {
    html: (html: string) => JqueryInstance
}

// 函数重载
declare function $(readyFunc: () => void): void;
declare function $(selector: string): JqueryInstance;

// 如何对对象进行类型的定义，对类该如何定义，命名空间的嵌套
// new $.fn.init()
declare namespace $ {
    namespace fn {
        class init {}
    }
}
```

page.ts

```javascript
$(function() {
    $('body').html('<div>hello</div>');
    new $.fn.init();
});
```

## ES6 方式类型定义

jquery.d.ts

```javascript
declare module 'jquery' {
    interface JqueryInstance {
        html: (html: string) => string;
    }
    function $(readyFunc: () => void): void;
    function $(selector: string): JqueryInstance;

    namespace $ {
        namespace fn {
            class init {}
        }
    }
    export = $; // 注意要进行暴露出去
}
```

page.ts

```javascript
import $ from 'jquery';

$(function() {
    $('body').html('hello world');
});
```

## 泛型中的 keyof

### 问题

```javascript
interface Person {
    name: string;
    age: number;
    gender: string;
}

class Teacher {
    constructor(private info: Person) {}
    // TS 认为这个 key 是不安全的，可以任意写（前提根目录要有 tsconfig.json 相关的配置）
    getInfo(key: string) {
        if (key === 'name' || key === 'age' || key === 'gender') {
            return this.info[key];
        }
    }
}

const teacher = new Teacher({
    name: 'ifer',
    age: 18,
    gender: 'man'
});

// info 推测的类型为 string | number | undefined，太广泛，能不能做到更确切
const info = teacher.getInfo('name');
```

```javascript
// 人为解决：但并不是最好的解决方式
const info = teacher.getInfo('name') as string;
```

### 解决

先明确一点：type 的值不一定是一个具体的类型，甚至可以是一个字符串，例如：

```javascript
type AGE = 'age';
const ifer: AGE = 'age';
```

```javascript
interface Person {
    name: string;
    age: number;
    gender: string;
}

// T extends 'name' 等价于：type T = 'name'
// key: 'name'   => key 就是一个普通字符串 'name'
// Peron['name'] => Person 是一个接口，这样得到的是一个类型（例如 string or number，而非数据）

class Teacher {
    constructor(private info: Person) {}
    getInfo<T extends keyof Person>(key: T): Person[T] {
        return this.info[key];
    }
}

const teacher = new Teacher({
    name: 'ifer',
    age: 18,
    gender: 'man'
});

// info 可以被推断出具体的类型：string
const info = teacher.getInfo('name');
```