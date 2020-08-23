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
function jsDemo(data) {
    return Math.sqrt(data.x ** 2 + data.y ** 2);
}
// There is no error prompt when writing code
jsDemo();
```

```javascript
function tsDemo(data) {
    return Math.sqrt(data.x ** 2 + data.y ** 2);
}
// Expected 1 arguments, but got 0.
tsDemo();
```

```javascript
function tsDemo(data: { x: number, y: number }) {
    // 这里输入 data. 的时候，会有很好的提示
    return Math.sqrt(data.x ** 2 + data.y ** 2);
}
tsDemo({x: 2, y: 3});
```

**类型别名和接口**

```javascript
// type Point = { x: number, y: number }; // 类型别名，type 也可以用于描述基础类型，例如 type MyName = string;
interface Point { x: number; y: number }; // 接口

function tsDemo(data: Point) {
    return Math.sqrt(data.x ** 2 + data.y ** 2);
}
tsDemo({ x: 1, y: 2 });
```

## 基础环境搭建

VS Code 设置搜索 quote 和 tab 可以进行单双引号、空格的配置，安装插件 prettier，通过在配置里面搜索 save，可以设置 Format on Save

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

对象类型，**冒号后面是类型定义，等号后面是类型实现**

```javascript
// 注意这里不要 const teacher: object = { name: 'ifer' }，这样使用 teacher 的时候不具有提示
const teacher: { name: string; age: number; } = {
    name: 'xxx',
    age: 18
};
```

可以使用 interface 或 type 优化上面的操作

```javascript
// type Teacher = { name: string; age: number };
// const teacher: Teacher = { name: 'xxx', age: 18 };

interface Teacher { name: string; age: number; }
const teacher: Teacher = { name: 'xxx', age: 18, };
```

```javascript
// numbers 是一个数组，数组里面的每一项是 number 类型
const numbers: number[] = [1, 2, 3];
```

定义实例对象类型

```javascript
class Person {}
// xxx 必须是 Person 类对应的实例对象
const xxx: Person = new Person();
```

定义函数类型

```javascript
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
// 声明和赋值不一起时就要进行类型注解了，不然后面输入 count1. 的时候则不会有相关属性和方法的提示
let count1: number;
count1 = 123;
```

```javascript
interface Person { name: string; }
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
// total 这里会自动进行类型推荐，则无需注解
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
const info1: (string|number)[] = ['xxx', 18, 'ifer'];

// 元组，和上面的差异是：元组的长度和每一项的类型都是固定的
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

// 元组处理 csv 文件，数组里面的每一项是一个元组
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

如果就要使用字面量的形式传递，在参数较多的时候如何保证不报错呢？

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

参数是类的实例时，实例的属性也可以比接口定义的属性多，例如：

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

**接口也可以用来表示一个函数类型声明**

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
    // 通过 super 可以很好的重写父类的方法
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
// 不需传参
class Person {
    name: string = 'ifer'; // 后续实例对象会有提示 name，实例也可以再对 name 进行修改
}
const p = new Person();
console.log(p.name);
```

```javascript
// 需要传参
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
        // 这里可以加工
        return this._name;
    }
    set name(val) {
        // 这里可以加工
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
    // instance 是一个 Demo 类型的实例
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
// 继承抽象类，继承抽象类的时候，抽象方法必须要被实现
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

// 接口之间的继承
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
npm i superagent
npm i ts-node typescript @types/superagent -D
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

`src/crowller.ts`

```javascript
import superagent from 'superagent';

class Crowller {
    private secret = 'x3b174jsx';
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

    constructor() {
        this.init();
    }
    async init() {
        // 1. 爬取数据
        const rawData = await this.getRawData();
        console.log(rawData);
        // 2. 解析数据
        // 3. 存储数据
    }

    async getRawData() {
        const { text } = await superagent.get(this.url);
        return text;
    }
}

new Crowller();
```

### 解析数据

```
npm i cheerio
npm i @types/cheerio -D
```

解析出 title 和 count，拼成对象收集到数组中，再把此数组作为了对象的 data，此格式也是存储到文件中的格式

```javascript
{
    time: 1597914491239,
    data: [
        { title: 'Vue2.5开发去哪儿网App', count: 5 },
        { title: 'React 16.4 开发简书项目', count: 49 },
    ]
}
```

```javascript
import superagent from 'superagent';
import cheerio from 'cheerio';

interface CourseItem {
    title: string;
    count: number;
}

class Crowller {
    private secret = 'x3b174jsx';
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

    constructor() {
        this.init();
    }
    async init() {
        // 1. 爬取数据
        const rawData = await this.getRawData();
        // 2. 解析数据
        const courseResult = this.analyzeData(rawData);
        console.log(courseResult);
        // 3. 存储数据
    }

    async getRawData() {
        const { text } = await superagent.get(this.url);
        return text;
    }
    analyzeData(data: string) {
        const $ = cheerio.load(data);
        const courseItems = $('.course-item');
        // 空数组可以，里面可以没有 CourseItem，但 const courses: CourseItem = []; 则不 ok
        const courses: CourseItem[] = [];
        courseItems.map(function (i, domEle) {
            const descs = $(domEle).find('.course-desc');
            const title = descs.eq(0).text();
            const count = Number(descs.eq(1).text().split('：')[1]);
            courses.push({ title, count, }); // 都怼到了数组里面
        });
        return {
            time: new Date().getTime(),
            courses: courses,
        };
    }
}

new Crowller();
```

### 存储数据

```javascript
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import cheerio from 'cheerio';

interface CourseItem {
    title: string;
    count: number;
}
interface CourseResult {
    time: number;
    courses: CourseItem[]
}

interface CourseData {
    [propName: number]: CourseItem[]
}

class Crowller {
    private secret = 'x3b174jsx';
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
    private realPath = path.join(__dirname, '..', 'data');
    private realFile = path.join(__dirname, '..', 'data', 'courses.json');

    constructor() {
        this.init();
    }
    async init() {
        // 1. 爬取数据
        const rawData = await this.getRawData();
        // 2. 解析数据
        const courseResult = this.analyzeData(rawData);
        // 3. 存储数据
        this.saveData(courseResult);
    }

    async getRawData() {
        const { text } = await superagent.get(this.url);
        return text;
    }
    analyzeData(data: string) {
        const $ = cheerio.load(data);
        const courseItems = $('.course-item');
        // 空数组可以，里面可以没有 CourseItem，但 const courses: CourseItem = []; 则不 ok
        const courses: CourseItem[] = [];
        courseItems.map(function (i, domEle) {
            const descs = $(domEle).find('.course-desc');
            const title = descs.eq(0).text();
            const count = Number(descs.eq(1).text().split('：')[1]);
            courses.push({ title, count, }); // 都怼到了数组里面
        });
        return {
            time: new Date().getTime(),
            courses: courses,
        };
    }
    saveData(data: CourseResult) {
        // 创建 data，防止 writeFileSync 出错
        if(!fs.existsSync(this.realPath)) fs.mkdirSync(this.realPath);
        let obj:CourseData = {};
        if(fs.existsSync(this.realFile)) {
            // 取
            obj = JSON.parse(fs.readFileSync(this.realFile, 'utf8'));
        };
        obj[data.time] = data.courses;
        // 存
        fs.writeFileSync(this.realFile, JSON.stringify(obj));
    }
}

new Crowller();
```

### 组合模式

crowller.ts

```javascript
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import Analyze from './analyze';

export interface IAnalyze {
    resolve: (data: string, realPath: string, realFile: string) => string;
}
class Crowller {
    private realPath = path.join(__dirname, '..', 'data');
    private realFile = path.join(__dirname, '..', 'data', 'courses.json');
    // 实例只需覆盖接口的定义即可
    constructor(private analyze: IAnalyze, private url: string) {
        this.init();
    }
    private async init() {
        // 1. 爬取数据
        const rawData = await this.getRawData();
        // 2. 解析数据
        const courseResult = this.analyze.resolve(rawData, this.realPath, this.realFile)
        // 3. 存储数据
        this.saveData(courseResult);
    }

    private async getRawData() {
        const { text } = await superagent.get(this.url);
        return text;
    }
    private saveData(str: string) {
        fs.writeFileSync(this.realFile, str);
    }
}

const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
const analyze = new Analyze();
// 分析对象、分析地址（给当前类获取数据时用了）
new Crowller(analyze, url);
```

analyzer.ts

```javascript
import fs from 'fs';
import cheerio from 'cheerio';
import { IAnalyze } from './crowller';
interface CourseItem {
    title: string;
    count: number;
}
interface CourseResult {
    time: number;
    courses: CourseItem[]
}

interface CourseData {
    [propName: number]: CourseItem[]
}
export default class Analyze implements IAnalyze {
    private analyzeData(data: string) {
        const $ = cheerio.load(data);
        const courseItems = $('.course-item');
        // 空数组可以，里面可以没有 CourseItem，但 const courses: CourseItem = []; 则不 ok
        const courses: CourseItem[] = [];
        courseItems.map(function (i, domEle) {
            const descs = $(domEle).find('.course-desc');
            const title = descs.eq(0).text();
            const count = Number(descs.eq(1).text().split('：')[1]);
            courses.push({ title, count, }); // 都怼到了数组里面
        });
        return {
            time: new Date().getTime(),
            courses: courses,
        };
    }
    private concatData(data: CourseResult, realPath: string, realFile: string) {
        // 创建 data，防止 writeFileSync 出错
        if(!fs.existsSync(realPath)) fs.mkdirSync(realPath);
        let obj:CourseData = {};
        if(fs.existsSync(realFile)) {
            // 取
            obj = JSON.parse(fs.readFileSync(realFile, 'utf8'));
        };
        obj[data.time] = data.courses;
        // 存
        return obj;
    }
    public resolve(data: string, realPath: string, realFile: string) {
        // this.analyzeData(data)，返回当前次解析好的数据
        // 返回本地和当前次解析好的数据拼接的结果
        return JSON.stringify(this.concatData(this.analyzeData(data), realPath, realFile));
    }
}
```

尝试爬取 https://www.lexin.com/

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

`package.json` 配置，注意 `concurrently` 是并行的，不能保证 build 下生成 crowller.js 后再执行 `dev:start`，当 build 目录下没有 `crowller.js` 生成时，执行 `dev:start` 就会出错

所以先执行 `npm run dev:build`，再 `npm run dev`

ignore 是忽略 data 下生成的数据文件

可以尝试使用 npm-run-all 并行执行任务试试

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

注意：直接 `tsc xxx.ts` 某个具体的文件时，tsconfig.json 中的配置并不会生效，执行 `tsc` 才 ok，但 `ts-node xxx.ts` 是会应用 tsconfig.json 配置的！

【include】 指定需要编译的文件，例如 `{"include": ["./demo.ts"]}`，则执行 tsc 命令时只会编译这个文件

【exclude】 指定排除编译的文件，例如 `{"exclude": ["./demo.ts"]}`

【files】 也可以限制只编译某些文件，和 include 类似

【removeComments】 编译后的 JS 是否保留注释

【noImplicitAny】 是否要求显式设置 any，默认 true，false 代表不必！例如下面写法会报错，指定 noImplicitAny 为 false 能解决

```javascript
// Parameter 'name' implicitly has an 'any' type.
function abc(name) {
    return name;
}
```

或者明确指定 any 或其他类型

```javascript
// 即便是 any 也不能省略
function abc(name: any) {
    return name;
}
```

【strictNullChecks】 是否强制检查 null 类型，false 代表不，例如下面这样写也是 ok 的，例如：

```javascript
const teacher: string = null;
```

【rootDir】 指定输入文件的路径

【outDir】 指定输出文件的路径

【incremental】 是否增量编译，只编译本次发生变化的内容

【allowJs】 是否编译 JS 文件

【checkJs】 是否对 JS 文件也进行静态检查

【sourceMap】 是否生成 sourceMap 文件

【noUnusedLocals】 设置为 true 代表有数据导出时，要对没有用的的本地变量进行检查，例如：

```javascript
// 'teacher' is declared but its value is never read.
const teacher: string = 'xxx';
export const age = 18;
```

【noUnusedParameters】 设置为 true 代表对没有用到的参数进行校验

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
    if (animal.fly) { // 为 true 时
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

可以指定枚举的初始值

```javascript
enum Status {
    OFFLINE,
    ONLINE = 3,
    DELETED
};
console.log(Status.OFFLINE); // 0
console.log(Status.ONLINE); // 3
console.log(Status.DELETED); // 4
```

枚举也可以进行反查

```javascript
enum Status {
    OFFLINE,
    ONLINE = 3,
    DELETED
};
console.log(Status[0]); // "OFFLINE"
console.log(Status[3]); // "ONLINE"
console.log(Status[4]); // "DELETED"
```

## 函数泛型

泛型：泛指的类型，例如定义了一个 T 这样一个泛指的类型，但实际它具体是什么类型还不知道呢，**可以是任意的类型，只有使用（例如函数调用）的时候才知道！**

举个例子

```javascript
// 定义了一个 ABC 这样一个泛指的类型，但实际它是什么类型还不知道呢，可以是任意的类型，只有使用的时候才知道
// 需求：两个参数的类型保持一致，join 接收了一个 ABC 这样的泛型，那么 first 和 second 都应该是这个类型
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
// let res = join<number,string>(1, '1');
let res = join(1, '1'); // 会自动推断
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

// 把上面所有 T 换成 (string|number) 就比较好理解了
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

泛型作为类型注解

```javascript
function hello<T>(params: T[]): T {
    return params[0]; // 数组中的某一个肯定就是此泛型了
}

// 冒号后面是注解（声明），等号后面是实现
const func: <T>(params: T[]) => T = hello;

// 意思是参数是泛型类型的数组，返回的是此泛型
func<string>(['hello']);
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

## Express 提供接口

### 一个小问题

解决第一次执行 `npm run dev` 可能报错的问题，修改 package.json

```javascript
{
    "scripts": {
        "dev:build": "tsc -w",
        "dev:start": "nodemon ./build/index.js",
        "dev": "tsc && concurrently npm:dev:*"
    }
}
```

### 创建服务器及模块化路由

需求：每次输入 `http://localhost:7001/getData` 都是爬取一次数据

index.ts

```javascript
import express, { Request, Response } from 'express';
const app = express();

import router from './routes';

app.use(router);

app.listen(7001, () => console.log('Server running on http://localhost:7001'));
```

routes/index.js

```javascript
import { Router, Request, Response } from 'express';
const router = Router();

import Crowller from '../crowller';
import Analyzer from '../analyzer';

router.get('/getData', (req: Request, res: Response) => {
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
    const analyzer = Analyzer.getInstance();
    new Crowller(analyzer, url); // 分析对象、要分析的地址
    res.send('get success');
});

export default router;
```

### 输入密码跳转时获取数据

输入正确密码跳转到 `/getData` 爬取数据

routes/index.ts

```javascript
router.get('/', (req: Request, res: Response) => {
    res.send(`
        <html>
            <body>
                <form method="post" action="/getData">
                    <input type="password" name="password"/>
                    <button>提交</button>
                </form>
            </body>
        </html>
    `);
});
```

```javascript
router.post('/getData', (req: Request, res: Response) => {
    if (req.body.password === '123') {
        // ...
    } else {
        res.send('get error');
    }
});
```

### 问题解决

问题1：Express 库的类型定义文件描述不准确，例如 `req.body.password` 的类型定义是 any

route/index.ts

```javascript
interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined;
    }
}
router.post('/getData', (req: RequestWithBody, res: Response) => {
    const { password, xxx } = req.body;
});
```

问题2：当使用中间件对 req、res 做了修改之后（会报错），原因是 req、res 对应的类型定义并没有改变，例如

```javascript
// index.ts
app.use((req: Request, res: Response, next: NextFunction) => {
    req.username = 'dell'; // Request 类型定义并没有 username，会报错
    next()
});
```

```javascript
// custom.d.ts, 自定义的类型定义文件，TS 会自动和原有的进行融合
declare namespace Express {
    interface Request {
        username: string
    }
}
```

### 接口实现

首页、登录、退出、爬取、展示等

```
npm install cookie-session
npm install @types/cookie-session -D
```

首页显示登录框或退出按钮的判断

```javascript
router.get('/', (req: Request, res: Response) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send(`
            <html>
                <body>
                    <a href="/getData">爬取内容</a>
                    <a href="/showData">展示内容</a>
                    <a href="/logout">退出</a>
                </body>
            </html>
        `);
    } else {
        res.send(`这里返回的是登录的 HTML 结构`);
    }
});
```

登录接口 `/login`

```javascript
// routes/index.ts
router.post('/login', (req: RequestWithBody, res: Response) => {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;

    if (isLogin) {
        res.send('已经登陆过');
    } else {
        if (password === '123' && req.session) {
            // 通过对 req.session 是否存在的判断，来做一个类型保护
            req.session.login = true;
            res.send('登录成功');
        } else { 
            res.send('密码错误');
        }
    }
});
```

退出接口 `/logout`

```javascript
router.get('/logout', (req: RequestWithBody, res: Response) => {
    // 通过 if 判断来做一个类型保护
    if (req.session) {
        req.session.login = false;
    }
    res.redirect('/');
});
```

爬取内容的接口 `/getData`

```javascript
router.get('/getData', (req: RequestWithBody, res: Response) => {
    const isLogin = req.session ? req.session.login : false;
    // 判断用户的登录状态
    if (isLogin) {
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
        const analyzer = Analyzer.getInstance();
        new Crowller(analyzer, url); // 分析对象、要分析的地址
        res.send('get success');
    } else {
        res.send('请登录后爬取内容');
    }
});
```

显示内容 `/showData`

```javascript
router.get('/showData', (req: Request, res: Response) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        try {
            const position = path.join(__dirname, '../..', 'data', 'course.json');
            const result = fs.readFileSync(position, 'utf8');
            res.json(JSON.parse(result));
        } catch(e) {
            res.send('尚未爬取到内容');
        }
    } else {
        res.send('请登录后查看内容');
    }
});
```

### 优化代码

优化 `/getData` 和 `/setData` 接口

```javascript
const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    } else {
        res.send('请先登录');
    }
};
```

统一后端返回的内容

```javascript
// util.ts
interface Result {
    success: boolean;
    errMsg?: string;
    data: any
}

export const getResponseData = (data: any, errMsg: string): Result => {
    if (errMsg) {
        return {
            success: false,
            errMsg,
            data
        }
    }
    return {
        success: true,
        data
    }
};
```

```javascript
router.get('/showData', checkLogin, (req: BodyRequest, res: Response) => {
    try {
        const position = path.join(__dirname, '../..', 'data', 'course.json');
        const result = fs.readFileSync(position, 'utf8');
        // res.json(JSON.parse(result));
        res.json(getResponseData(JSON.parse(result)));
    } catch(e) {
        // res.send('尚未爬取到内容');
        res.json(getResponseData(null, '尚未爬取到内容'));
    }
});
```

## 类的装饰器

*使用装饰器前要先把 `tsconfig.json` 中的 `experimentalDecorators` 配置项打开*

类装饰器：对类进行装饰(化妆)的工具，例如通过装饰器可以给类多增加一些内容，其本身是一个函数！

通过 @ 符合可以使用装饰器，**装饰器在类定义好的时候就会执行！**，和是否 new 没关系，和 new 了几次更没关系！

```javascript
// 修饰类的装饰器，收到的参数是类的构造函数
function testDecorator(constructor: any) {
    console.log('decorator');
}
@testDecorator
class Test {}

const t1 = new Test();
const t2 = new Test();
```

### 修饰类

```javascript
// 修饰类的装饰器，收到的参数是类的构造函数（类本身）
function testDecorator(constructor: any) {
    // 往类的原型上面怼了一个 getName 这样的方法
    constructor.prototype.getName = () => {
        console.log('hello ifer');
    };
}

@testDecorator
class Test {}
const test = new Test();
(test as any).getName(); // hello ifer
```

**一个类可以被多个装饰器装饰**

```javascript
function testDecorator1(constructor: any) {
    console.log('decorator1');
}
function testDecorator2(constructor: any) {
    console.log('decorator2');
}

// 装饰器真正执行的时候是从下到上、从右到左的顺序，也就是先收集的装饰器会后面执行
@testDecorator1
@testDecorator2
class Test {}
```

使用装饰器的时候可以传一些参数，装饰器函数内部可以根据此参数做一些处理，例如：

```javascript
function testDecorator(flag: boolean) {
    if (flag) {
        return function(constructor: any) {
            constructor.prototype.getName = () => {
                console.log('ifer');
            };
        }
    } else {
        return function(constructor: any) {};
    }
}

@testDecorator(true)
class Test {}

const test = new Test();
(test as any).getName();
```

上面写法的问题是：使用 test 实例时并没有 getName 方法提示出来，该如何去解决呢？

先来看一个基本操作

```javascript
// (...args: any[]) => any 返回值为 any 类型的函数
// 接收了很多的参数，合并到了 args数组上，数组的每一项都是 any 类型
// new (...args: any[]) => any，代表 new 了一个返回值为 any 类型的构造函数
// T 可以理解为具备此构造函数实例的一个东西
function testDecorator<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
        // testDecorator 对原来的构造函数做一些扩展，把原来的 name 变成 'elser'
        name = 'elser';
        getName() {
            return this.name;
        }
    }
}

@testDecorator
class Test {
    constructor(public name: string) {}
}
const test = new Test('ifer');
(test as any).getName(); // elser
```

解决问题

```javascript
function testDecorator() {
    return function<T extends new (...args: any[]) => any>(constructor: T) {
        return class extends constructor {
            getName() {
                return this.name;
            }
        }
    }
}

const Test = testDecorator()(class {
    constructor(public name: string) {}
});
// 现在的 Test 是装饰器装饰过后的一个类
const test = new Test('ifer');
console.log(test.getName()); // 终于他娘的有提示了
```

### 修饰类的方法

普通方法：第一个参数 target 对应的是类的 prototype，key 是被装饰的方法的名字

```javascript
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    // 作用：控制类的方法不能被修改
    descriptor.writable = false;
}

class Test {
    constructor(public name: string) {}
    @getNameDecorator
    getName() {
        return this.name;
    }
}

const test = new Test('ifer');
/* test.getName = function() { // 更改就会报错
    return '1234';
}; */

console.log(test.getName());
```

静态方法：第一个参数 target 对应的就是【类本身】，key 是被装饰的方法的名字

```javascript
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    target.prototype.age = 18;
}

class Test {
    @getNameDecorator
    static getName() {
        return (this.prototype as any).age; // 注意静态方法中的 this 是类本身
    }
}

console.log(Test.getName()); // 18
```

使用装饰器通过 `descriptor.value` 可以直接**修改被装饰的方法**，例如：

```javascript
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    // descriptor.value 相当于是被装饰方法的引用
    descriptor.value = function() {
        return 'elser';
    };
}

class Test {
    constructor(public name: string) {}
    @getNameDecorator
    getName() {
        return this.name;
    }
}

const test = new Test('ifer');
console.log(test.getName()); // elser
```

### 访问器的装饰器

```javascript
// target: 类的 prototype，key: 访问器的名字，这里就是 'name'
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    // 如果设置了 set 或 get, 就不能设置 descriptor 下 writable 或 value 中的任何一个，否则报错
    target.age = 'zzz';
}

class Test {
    constructor(private _name: string) {
        this._name = _name;
    }
    get name() {
        return this._name;
    }
    @visitDecorator
    set name(name: string) {
        this._name = name;
    }
}

const test = new Test('ifer');
console.log((test as any).age); // zzz
```

### 属性的装饰器

改变属性的 descriptor，规定属性不可写

```javascript
// target: Test 对应的 prototype，key 装饰的属性的名字
function nameDecorator(target: any, key: string): any {
    // 期望 name 是一个 不可写 属性，下面的赋值操作就会报错
    const descriptor: PropertyDescriptor = {
        writable: false
    };
    // 意思是用这个 descriptor 替换掉 name 属性的 descriptor
    return descriptor;
}

class Test {
    @nameDecorator
    name = 'ifer'
}

// 实例化 Test 时才发生“写”的行为，实例化时才会报错
new Test();
```

通过装饰器并不能直接修改该属性的值，可以修改原型上的

```javascript
// target: Test 对应的 prototype
// key 装饰的属性的名字
function nameDecorator(target: any, key: string): any {
    // 这里不能直接拿到 Test，类必须先声明再使用，不好证明 target.constructor === Test
    // 修改的是原型上的 name
    target[key] = 'elser';
}

class Test {
    @nameDecorator
    name = 'ifer'
}
const test = new Test();
console.log(test.name);
console.log((test as any).__proto__.name);
```

### 参数的装饰器

```javascript
// 原型、方法的名字（getInfo）、参数处于第几个位置
function paramDecorator(target: any, methodName: string, paramIndex: number) {
    console.log(target, methodName, paramIndex);
}

class Test {
    getInfo(@paramDecorator name: string, age: number) {
        console.log(name, age);
    }
}
const test = new Test();
test.getInfo('ifer', 18);
```

### 装饰器用于错误捕获

用于捕获错误的 try/catch 存在重复编写的问题

```javascript
const userInfo: any = undefined;
class Test {
    getName() {
        try {
            return userInfo.name;
        } catch(e) {
            console.log('userInfo.name 不存在');
        }
    }
    getAge() {
        try {
            return userInfo.age;
        } catch(e) {
            console.log('userInfo.age 不存在');
        }
    }
}
const t = new Test();
t.getName();
```

解决问题，**装饰器可以用来统一处理异常捕获**

```javascript
const userInfo: any = undefined;

function catchError(msg: string) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        // descriptor.value 就是被装饰的那个方法
        const fn = descriptor.value;
        descriptor.value = function() {
            try {
                fn();
            } catch(e) {
                console.log(msg);
            }
        };
    }
}

class Test {
    @catchError('userInfo.name 不存在')
    getName() {
        return userInfo.name;
    }
    @catchError('userInfo.age 不存在')
    getAge() {
        return userInfo.age;
    }
}
const t = new Test();
t.getName();
t.getAge();
```

## Express 代码改造

```javascript
// tsconfig.json
{
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
}
```

```javascript
// package.json
{
    "scripts": {
        "test": "tsc && node ./build/controller/LoginController.js"
    }
}
```

### 迁移 GET 路由

#### routes/index.ts

```javascript
router.get('/', (req: BodyRequest, res: Response) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send(`
            <html>
                <body>
                    <a href="/getData">爬取内容</a>
                    <a href="/showData">展示内容</a>
                    <a href="/logout">退出</a>
                </body>
            </html>
        `);
    } else {
        res.send(`
            <html>
                <body>
                    <form method="post" action="/login">
                        <input type="password" name="password"/>
                        <button>登录</button>
                    </form>
                </body>
            </html>
        `);
    }
});
```

#### controller/LoginController.ts

```javascript
import 'reflect-metadata';
import { Request, Response } from 'express';
import { controller, get } from './decorator';
import { getResponseData } from '../utils/util';
interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined;
    }
}

@controller
class LoginController {
    @get('/logout')
    logout(req: BodyRequest, res: Response) {
        // 通过 if 判断来做一个类型保护
        if (req.session) {
            req.session.login = false;
        }
        // res.redirect('/');
        res.send(getResponseData(true));
    }

    @get('/')
    home(req: BodyRequest, res: Response) {
        const isLogin = req.session ? req.session.login : false;
        if (isLogin) {
            res.send(`
                <html>
                    <body>
                        <a href="/getData">爬取内容</a>
                        <a href="/showData">展示内容</a>
                        <a href="/logout">退出</a>
                    </body>
                </html>
            `);
        } else {
            res.send(`
                <html>
                    <body>
                        <form method="post" action="/login">
                            <input type="password" name="password"/>
                            <button>登录</button>
                        </form>
                    </body>
                </html>
            `);
        }
    }
}
```

#### controller/decorator.ts

```javascript
import { Router } from 'express';
export const router = Router();

export function controller(target: any) {
    for(let key in target.prototype) {
        // Step2: 想使用的时候通过 'path' 去获取，'path' 只是个名字而已
        const path = Reflect.getMetadata('path', target.prototype, key);
        const handler = target.prototype[key];
        if (path) {
            router.get(path, handler);
        }
    }
}

export function get(path: string) {
    return function(target: any, key: string) {
        // Step1: key, value, 存储到 target 对应的 key 上面去
        Reflect.defineMetadata('path', path, target, key);
    }
}
```

#### src/index.ts

```javascript
import './controller/LoginController';
import { router } from './controller/decorator';
```

### 迁移 POST 路由

```javascript
// controller/LoginController.ts
class LoginController {
    @post('/login')
    login(req: BodyRequest, res: Response) {
    }
}
```

```javascript
// controller/decorator.ts
enum Method {
    get = 'get',
    post = 'post'
};

// target => 类
export function controller(target: any) {
    for(let key in target.prototype) {
        const path = Reflect.getMetadata('path', target.prototype, key);
        const method: Method = Reflect.getMetadata('method', target.prototype, key);
        const handler = target.prototype[key];
        if (path && method && handler) {
            router[method](path, handler);
        }
    }
}

export function get(path: string) {
    return function(target: any, key: string) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'get', target, key);
    }
}

export function post(path: string) {
    return function(target: any, key: string) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'post', target, key);
    }
}
```

优化上面的操作

```javascript
function getRequestDecorator(type: string) {
    return function(path: string) {
        return function(target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        }
    }
}

export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');
```

### 爬取数据相关

新建 `controller/CrowllerController.ts`

```javascript
import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorator';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crowller';
import Analyzer from '../utils/analyzer';
interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined;
    }
}

const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    } else {
        // res.send('请先登录');
        res.send(getResponseData(null, '请先登录'));
    }
};

@controller
class CrowllerController {
    @get('/getData')
    @use(checkLogin)
    getData(req: BodyRequest, res: Response) {
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
        const analyzer = Analyzer.getInstance();
        new Crowller(analyzer, url); // 分析对象、要分析的地址
        // res.send('get success');
        res.send(getResponseData(true));
    }

    @get('/showData')
    @use(checkLogin)
    showData(req: BodyRequest, res: Response){
        try {
            const position = path.join(__dirname, '../..', 'data', 'course.json');
            const result = fs.readFileSync(position, 'utf8');
            res.send(getResponseData(JSON.parse(result)));
        } catch(e) {
            res.send(getResponseData(null, '尚未爬取到内容'));
        }
    }
}
```

修改 `controller/decorator.ts`

```javascript
export function controller(target: any) {
    for(let key in target.prototype) {
        const path = Reflect.getMetadata('path', target.prototype, key);
        const method: Method = Reflect.getMetadata('method', target.prototype, key);
        const handler = target.prototype[key];
        const middleware = Reflect.getMetadata('middleware', target.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                router[method](path, middleware, handler);
            } else {
                router[method](path, handler);
            }
        }
    }
}

// 中间件的类型：RequestHandle
export function use(middleware: RequestHandler) {
    return function(target: any, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    }
}
```

在 `src/index.ts` 中执行 `CrowllerController.ts`

```javascript
import './controller/CrowllerController';
```

### 代码优化

创建路由的代码应该独立出来，新建 src/router.ts

```javascript
import { Router } from 'express';
export default Router();
```

src/controller/decorator.ts 和 src/index.ts

```javascript
import router from '../router';
```

限制传入请求的类型：src/controller/decorator.ts

```javascript
enum Methods {
    get = 'get',
    post = 'post'
};
function getRequestDecorator(type: Methods) {}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
```

提取 decorator.ts 中的代码，src/decorator/index.ts

```javascript
export * from './controller';
```

src/decorator/controller.ts

```javascript
import router from '../router';

enum Methods {
    get = 'get',
    post = 'post'
};

// target => 类
export function controller(target: any) {
    for(let key in target.prototype) {
        const path = Reflect.getMetadata('path', target.prototype, key);
        const method: Methods = Reflect.getMetadata('method', target.prototype, key);
        const handler = target.prototype[key];
        const middleware = Reflect.getMetadata('middleware', target.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                router[method](path, middleware, handler);
            } else {
                router[method](path, handler);
            }
        }
    }
}
```

controller/CrowllerController.ts 和 controller/LoginController.ts 中引入 controller 的代码修改如下：

```javascript
import { controller } from '../decorator'
```

其他 use 和 getRequestDecorator 等装饰器也是如上操作

其他优化

```javascript
// isLogin 的推断是 boolean 类型
const isLogin = !!(req.session ? req.session.login : false);
```

```javascript
export function controller(target: new (...arg: any[]) => any) {}
```

```javascript
// 类型优化
export function controller(target: new (...arg: any[]) => any) {
    for(let key in target.prototype) {
        const path: string = Reflect.getMetadata('path', target.prototype, key);
        const method: Methods = Reflect.getMetadata('method', target.prototype, key);
        const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key);
        const handler = target.prototype[key]; // handler 一定存在
        if (path && method) {
            if (middleware) {
                router[method](path, middleware, handler);
            } else {
                router[method](path, handler);
            }
        }
    }
}
```

优化 decorator/request.ts 的类型，意义不大，了解即可！

```javascript
import { CrowllerController, LoginController } from '../controller';
function getRequestDecorator(type: Methods) {
    return function(path: string) {
        return function(target: CrowllerController | LoginController, key: string) {
            // ...
        }
    }
}
```

增强 controller 功能

```javascript
export function controller(root: string) {
    return function(target: new (...arg: any[]) => any) {
        for(let key in target.prototype) {
            const path: string = Reflect.getMetadata('path', target.prototype, key);
            const method: Methods = Reflect.getMetadata('method', target.prototype, key);
            const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key);
            const handler = target.prototype[key]; // handler 一定存在
            if (path && method) {
                const fullPath = root === '/' ? path : `${root}${path}`;
                if (middleware) {
                    router[method](fullPath, middleware, handler);
                } else {
                    router[method](fullPath, handler);
                }
            }
        }
    }
}
```

### 支持多个中间件

```javascript
// 定义多个中间件的话，上面定义的会覆盖下面定义的，只会走一个 console
const checkLogin = (req: BodyRequest, res: Response, next: NextFunction): void => {
    console.log('hello world222222');
};
const test = (req: BodyRequest, res: Response, next: NextFunction): void => {
    console.log('hello world111111111');
};
```

use.ts

```javascript
export function use(middleware: RequestHandler) {
    return function(target: CrowllerController|LoginController, key: string) {
        // 从 target 的 key 上面先取数据
        const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    }
}
```

controller.ts

```javascript
export function controller(root: string) {
    return function(target: new (...arg: any[]) => any) {
        for(let key in target.prototype) {
            const path: string = Reflect.getMetadata('path', target.prototype, key);
            const method: Methods = Reflect.getMetadata('method', target.prototype, key);
            const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key);
            const handler = target.prototype[key]; // handler 一定存在
            if (path && method) {
                const fullPath = root === '/' ? path : `${root}${path}`;
                if (middlewares && middlewares.length) {
                    router[method](fullPath, ...middlewares, handler);
                } else {
                    router[method](fullPath, handler);
                }
            }
        }
    }
}
```