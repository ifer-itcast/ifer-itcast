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

analyze.ts

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
const analyze = Analyze.getInstance();
new Crowller(analyze, url);
```

analyze.ts

```javascript
export default class Anylyzer implements IAnalyze {
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

可以把一组东西封装进去 `namespace`，通过 `export` 对外提供统一的接口，想暴露哪个才暴露哪个

```
tsc -init 或 tsc --init 生成配置文件
```

修改 tsconfig.json

```javascript
{
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
    }
}
```

### 问题

过多全局变量，其实只需要暴露一个 Page 就好了

`src/page.ts`

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

new Page();
```

### 解决

`src/page.ts`

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

`src/components.ts`

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

`src/page.ts`

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
<!-- 注意这里也要引入的 components.js 文件 -->
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
// 注意，合并需要开始 amd，但这里打包后的代码并不是 amd 的形式
{
    "module": "amd",
    "outFile": "./dist/page.js"
}
```

page.ts

```javascript
// 最好明确的表示命名空间的相互引用的关系，其实即便不写的话 Components 也能找到，因为 namespace Components 是全局的
///<reference path="./components.ts"/>

namespace Home {
    export class Page {
        constructor() {
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
    }
}
new Home.Page();
```

index.html

```html
<!-- 只需要引入一个 page.js 即可 -->
<script src="./dist/page.js"></script>
<script>
// new Components.Header(); // 同样也能使用 Components 下的内容
</script>
```

命名空间也可以导出一个接口定义

```javascript
namespace Info {
    // namespace 中也可以直接暴露一个接口定义
    export interface User {
        name: string;
    }
}

namespace Home {
    export class page {
        // 用到了另一个命名空间的接口定义
        user: Info.User = {
            name: 'ifer'
        }
    }
}
```

或者导出的是另一个命名空间也是 ok 的

```javascript
namespace Info {
    // 命名空间中也可以直接再导出一个子命名空间
    export namespace Sub {
        export class Test {
            constructor() {
                console.log('hello world');
            }
        }
    }
}

new Info.Sub.Test(); // hello world
```

## import 对应的模块化

可以用 ES6 import/export 语法代替 namespace

tsconfig.json

```javascript
// 注意这里打包后的代码也是 amd 的形式
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

上面使用的 `require.js` 能帮助我们识别编译后的下面的语法

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
declare var $: (params: () => void) => void; // 注意 var 声明函数，返回值用的是 =>
```

```javascript
// 上面是导出一个变量 $，$ 装的是一个函数，其实也可以这样直接导出一个函数
declare function $(params: () => void): void; // function 声明函数，返回值用的是 :

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

上面接口的方式，当 $ `既是函数又是对象`的时候就不好弄了，还是需要配合 `namespace` 的形式，写法如下

jquery.d.ts

注意写到 `.d.ts` 中的代码只是类型定义，不是实现！

```javascript
interface JqueryInstance {
    html: (html: string) => JqueryInstance
}

// 函数重载
declare function $(readyFunc: () => void): void;
declare function $(selector: string): JqueryInstance;

// new $.fn.init()，类型定义文件命名空间中嵌套的其他内容，无需进行 export
declare namespace $ {
    namespace fn {
        class init {}
    }
}
```

下面才是实现，才会执行，命名空间中嵌套的其他内容，需要手动 export 才能被使用，注意和类型定义文件中的写法进行区分

```javascript
namespace $ {
    export namespace fn {
        export class init {
            constructor() {
                console.log(1);
            }
        }
    }
}
new $.fn.init();
```

page.ts

```javascript
$(function() {
    $('body').html('<div>hello</div>');
    new $.fn.init();
});
```

## ES6 方式类型定义

```
npm i jquery
```

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

`tsconfig.json`

细化编译入口和出口

```javascript
{
    "compilerOptions": {
        "outDir": "./build", // 出口
        "rootDir": "./src", // 入口
    }
}
```

### 创建服务器及模块化路由

需求：每次输入 `http://localhost:7001/getData` 都是爬取一次数据

```
yarn add express @types/express
```

`src/index.ts`

```javascript
import express, { Request, Response } from 'express';
const app = express();

import router from './routes';

app.use(router);

app.listen(7001, () => console.log('Server running on http://localhost:7001'));
```

`src/routes/index.ts`

```javascript
import { Router, Request, Response } from 'express';
const router = Router();

import Crowller from '../crowller';
import Analyze from '../analyze';

router.get('/getData', (req: Request, res: Response) => {
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
    const analyze = Analyze.getInstance();
    new Crowller(analyze, url); // 分析对象、要分析的地址
    res.send('get success');
});

export default router;
```

### 输入密码跳转时获取数据

```
yarn add body-parser
```

`src/index.ts`

```javascript
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(7001, () => console.log('Server running on http://localhost:7001'));
```

输入正确密码跳转到 `/getData` 爬取数据，`src/routes/index.ts`

```javascript
router.get('/', (req: Request, res: Response) => {
    res.send(`
        <html>
            <body>
                <form method="post" action="/login">
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
        // 爬！
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
        const analyze = Analyze.getInstance();
        new Crowller(analyze, url); // 分析对象、要分析的地址
        res.send('get success');
    } else {
        res.send('get error');
    }
});
```

### 问题解决

问题1：Express 库的类型定义文件描述不准确，例如 `req.body.password` 推断出的类型是 any，因为接口 Request 的 body 中并没有关于 password 的任何定义

`src/route/index.ts`

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

自定义的类型定义文件 `custom.d.ts`（名字叫什么无所谓），TS 会自动和原有的进行融合

```javascript
declare namespace Express {
    interface Request {
        username: string
    }
}
```

或者直接在 `src/index.ts` 中定义

```javascript
/* interface RequestWithBody extends Request {
    [propName: string]: any
} */
interface RequestWithBody extends Request {
    username?: string; // 这里要加 ?，因为当给 req 指定 RequestWithBody 类型时，此时还不具备 username 属性呢
}
```

### 接口实现

首页、登录、退出、爬取、展示等

```
npm install cookie-session
npm install @types/cookie-session -D
```

`src/index.ts`

```javascript
import cookieSession from 'cookie-session';
app.use(
    cookieSession({
        name: 'session',
        keys: [],
        maxAge: 24 * 60 * 60 * 1000, // 24h
    })
);
```

首页显示登录框或退出按钮的判断

`src/routes/index.ts`

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
        res.send(`
            <html>
                <body>
                    <form method="post" action="/login">
                        <input type="password" name="password"/>
                        <button>提交</button>
                    </form>
                </body>
            </html>
        `);
    }
});
```

登录接口

```javascript
router.post('/getData', (req: RequestWithBody, res: Response) => {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send('已经登录');
    } else {
        if (req.body.password === '123' && req.session) {
            req.session.login = true;
            res.send('登录成功');
        } else {
            res.send('登录失败');
        }
    }
});
```

退出接口

```javascript
router.get('/logout', (req: RequestWithBody, res: Response) => {
    // 通过 if 判断来做一个类型保护
    if (req.session) {
        req.session.login = false;
    }
    res.redirect('/');
});
```

爬取内容的接口

```javascript
router.get('/getData', (req: RequestWithBody, res: Response) => {
    const isLogin = req.session ? req.session.login : false;
    // 判断用户的登录状态
    if (isLogin) {
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
        const analyze = Analyze.getInstance();
        new Crowller(analyze, url); // 分析对象、要分析的地址
        res.send('get success');
    } else {
        res.send('请登录后爬取内容');
    }
});
```

显示内容

```javascript
router.get('/showData', (req: Request, res: Response) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        try {
            const position = path.join(__dirname, '../..', 'data', 'courses.json');
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

`src/routes/index.ts`

统一登录拦截

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

```javascript
// 获取数据
router.get('/getData', checkLogin, (req: BodyRequest, res: Response) => {});
// 展示数据
router.get('/showData', checkLogin, (req: Request, res: Response) => {});
```

统一后端返回内容格式

`src/utils/index.ts`

```javascript
interface Result {
    success: boolean;
    errMsg?: string;
    data: any
}

export const getResponseData = (data: any, errMsg?: string): Result => {
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

获取数据

```javascript
router.get('/getData', checkLogin, (req: Request, res: Response) => {
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
    const analyze = Analyze.getInstance();
    new Crowller(analyze, url); // 分析对象、要分析的地址
    res.send(getResponseData(true));
});
```

展示数据

```javascript
router.get('/showData', checkLogin, (req: Request, res: Response) => {
    try {
        const position = path.join(__dirname, '../..', 'data', 'courses.json');
        const result = fs.readFileSync(position, 'utf8');
        // res.json(JSON.parse(result));
        res.send(getResponseData(JSON.parse(result)));
    } catch(e) {
        res.send(getResponseData(false, '数据不存在'));
    }
});
```

登录

```javascript
router.post('/getData', (req: BodyRequest, res: Response) => {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send(getResponseData(false, '已经登录过'));
    } else {
        if (req.body.password === '123' && req.session) {
            req.session.login = true;
            res.send(getResponseData(true));
        } else {
            res.send(getResponseData(false, '登录失败'));
        }
    }
});
```

退出

```javascript
router.get('/logout', (req: BodyRequest, res: Response) => {
    if (req.session) {
        req.session.login = false;
    }
    res.send(getResponseData(true));
});
```


## 类的装饰器

```
npm init -y
tsc --init
npm i typescript ts-node -D
```

**使用装饰器前要先把 `tsconfig.json` 中的 `experimentalDecorators` 配置项打开**

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
    console.log('一上来这里会执行');
    if (flag) {
        return function(constructor: any) {
            console.log('一上来这里也会执行');
            constructor.prototype.getName = () => {
                console.log('ifer');
            };
        }
    } else {
        return function(constructor: any) {};
    }
}

// 注意这里加括号了代表是一个调用！
@testDecorator(true)
class Test {}

const test = new Test();
(test as any).getName();
```

上面写法的问题是：使用 test 实例时并没有 getName 方法提示出来，该如何去解决呢？

先来看一个基本操作，不同的类的 constructor 类型应该是不同的

```javascript
// (...args: any[]) => any 返回值为 any 类型的函数
// 接收了很多的参数，合并到了 args 数组上，数组的每一项都是 any 类型
// 接收了很多的参数，参数的每一项都是 any 类型
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

普通方法：第一个参数 target 对应的是【类的 prototype】，key 是被装饰的方法的名字

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

通过装饰器并不能直接修改实例属性的值，可以修改原型上的

```javascript
// target: Test 对应的 prototype
// key 装饰的属性的名字
function nameDecorator(target: any, key: string): any {
    // console.log(target === Test.prototype); // true
    // 修改的是原型上的 name
    target[key] = 'elser';
}

class Test {
    @nameDecorator
    // 注意这里是实例属性上的 name，类似于 constructor 中 this.name = 'ifer'
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

```
npm i reflect-metadata
```

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

### 方法上元数据的定义和获取

`src/controller/decorator.ts`

```javascript
export function controller(target: any) {
    for(let key in target.prototype) {
        // 从类的原型的方法上获取 path
        console.log(Reflect.getMetadata('path', target.prototype, key));
    }
}

export function get(path: string) {
    return function(target: any, key: string) {
        // 'path', /login(定义的数据), 类的原型, login(方法名字)
        // 往类的原型的方法上定义数据 path
        Reflect.defineMetadata('path', path, target, key);
    }
}
```

`src/controller/LoginController.ts`

```javascript
import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from 'express';
import { controller, get } from './decorator';

@controller
class LoginController {
    @get('/login')
    login() {
        // ...
    }

    @get('/')
    home(req: Request, res: Response) {
        // ...
    }
}
```

### 迁移登录和退出GET路由

`src/controller/LoginController.ts`

```javascript
import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from 'express';
import { controller, get } from './decorator';
import { getResponseData } from '../utils';

interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined;
    };
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
    home(req: Request, res: Response) {
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
                            <button>提交</button>
                        </form>
                    </body>
                </html>
            `);
        }
    }
}
```

`src/index.ts`

```javascript
import './controller/LoginController';
import { router } from './controller/decorator';
```

`src/routes/index.ts` 可以全部注释了

### 迁移登录 POST 路由

`src/controller/decorator.ts`

```javascript
import { Router } from 'express';
export const router = Router();

enum Method {
    get = 'get',
    post = 'post',
}

export function controller(target: any) {
    for (let key in target.prototype) {
        // 从类的原型的方法上获取 path
        const path = Reflect.getMetadata('path', target.prototype, key);
        const method: Method = Reflect.getMetadata(
            'method',
            target.prototype,
            key
        );
        const handler = target.prototype[key];
        if (path && method && handler) {
            // 生成路由
            router[method](path, handler);
        }
    }
}

export function get(path: string) {
    return function (target: any, key: string) {
        // 'path', /login(定义的数据), 类的原型, login(方法名字)
        // 往类的原型的方法上定义数据 path
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'get', target, key);
    };
}

export function post(path: string) {
    return function (target: any, key: string) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'post', target, key);
    };
}
```

优化上面 decorator 代码

`src/controller/decorator.ts`

```javascript
// Factory
function getRequestDecorator(type: string) {
    return function post(path: string) {
        return function (target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    }   
}
export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');
```

`src/controller/LoginController.ts`

```javascript
import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from 'express';
import { controller, get, post } from './decorator';
import { getResponseData } from '../utils';

interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined;
    };
}

@controller
class LoginController {
    @post('/login')
    login(req: BodyRequest, res: Response) {
        const isLogin = req.session ? req.session.login : undefined;
        if (isLogin) {
            res.send(getResponseData(false, '已经登录过'));
        } else {
            if (req.body.password === '123' && req.session) {
                req.session.login = true;
                res.send(getResponseData(true));
            } else {
                res.send(getResponseData(false, '登录失败'));
            }
        }
    }
}
```

### 迁移 getData 和 showData 路由

`src/controller/CrowllerController.ts`

```javascript
import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from 'express';
import { controller, get, post, use } from './decorator';
import { getResponseData } from '../utils';
import Crowller from '../crowller';
import Analyze from '../analyze';

interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined;
    };
}

const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    } else {
        res.send(getResponseData(null, '请先登录'));
    }
};

@controller
class CrowllerController {
    @get('/getData')
    @use(checkLogin)
    getData(req: BodyRequest, res: Response) {
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
        const analyze = Analyze.getInstance();
        new Crowller(analyze, url); // 分析对象、要分析的地址
        res.send(getResponseData(true));
    }

    @get('/showData')
    @use(checkLogin)
    showData(req: BodyRequest, res: Response) {
        try {
            const position = path.join(__dirname, '../..', 'data', 'courses.json');
            const result = fs.readFileSync(position, 'utf8');
            res.send(getResponseData(JSON.parse(result)));
        } catch(e) {
            res.send(getResponseData(false, '数据不存在'));
        }
    }
}
```

`src/controller/decorator.ts`

```javascript
import { Router, RequestHandler } from 'express';
export const router = Router();

export function controller(target: any) {
    for (let key in target.prototype) {
        // 从类的原型的方法上获取 path
        const path = Reflect.getMetadata('path', target.prototype, key);
        const method: Method = Reflect.getMetadata('method', target.prototype, key);
        const middleware = Reflect.getMetadata('middleware', target.prototype, key);
        const handler = target.prototype[key];
        if (path && method && handler) {
            if (middleware) {
                router[method](path, middleware, handler);
            } else {
                router[method](path, handler);
            }
        }
    }
}

export function use(middleware: RequestHandler) {
    return function(target: any, key: string) {
        // 把中间件变成了【方法的元数据】
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}
```

最后不要忘了在 `src/index.ts` 中执行下装饰器 `import './controller/CrowllerController';`

### 代码结构优化

统一路由引用

`src/routes/index.ts`

```javascript
import { Router } from 'express';
export default Router();
```

`src/index.ts`

```javascript
import router from './routes';
```

`src/controller/decorator.ts`

```javascript
import router from '../routes';
```

枚举类型优化

`src/controller/decorator.ts`

```javascript
enum Methods {
    get = 'get',
    post = 'post',
}
function getRequestDecorator(type: Methods) {
    return function post(path: string) {
        return function (target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    }   
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
```

独立 controller 装饰器为单独文件

`src/decorator/controller.ts`

```javascript
import router from '../routes';

enum Methods {
    get = 'get',
    post = 'post',
}

export function controller(target: any) {
    for (let key in target.prototype) {
        // 从类的原型的方法上获取 path
        const path = Reflect.getMetadata('path', target.prototype, key);
        const method: Methods = Reflect.getMetadata(
            'method',
            target.prototype,
            key
        );
        const middleware = Reflect.getMetadata('middleware', target.prototype, key);
        const handler = target.prototype[key];
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

`src/decorator/use.ts`

```javascript
import 'reflect-metadata';
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
    return function(target: any, key: string) {
        // 把中间件变成了【方法的元数据】
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}
```

`src/decorator/request.ts`

```javascript
enum Methods {
    get = 'get',
    post = 'post',
}

// Factory
function getRequestDecorator(type: Methods) {
    return function post(path: string) {
        return function (target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    }   
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
```

`src/decorator/index.ts`

```javascript
export * from './controller';
export * from './use';
export * from './request';
```

`src/controller/CrowllerController.ts` 和 `src/controller/LoginController.ts`

```javascript
import { controller, get, post } from '../decorator';
```

### 其他优化

明确指定返回类型为空的情况

`src/controller/CrowllerController.ts`，`src/controller/LoginController.ts` 同理

```javascript
const checkLogin = (req: BodyRequest, res: Response, next: NextFunction): void => {};

@controller
class CrowllerController {
    @get('/getData')
    @use(checkLogin)
    getData(req: BodyRequest, res: Response): void {
    }

    @get('/showData')
    @use(checkLogin)
    showData(req: BodyRequest, res: Response): void {
    }
}
```

isLogin 应该为 布尔 类型

```javascript
const isLogin = !!(req.session ? req.session.login : undefined);
```

```javascript
@controller
class LoginController {
    static isLogin(req: BodyRequest) {
        return !!(req.session ? req.session.login : undefined);
    }
    @post('/login')
    login(req: BodyRequest, res: Response): void {
        // 类并没有被实例化，不能用 this.isLogin，即便上面定义 isLogin 作为原型方法存在也不行
        const isLogin = LoginController.isLogin(req);
    }

    @get('/')
    home(req: Request, res: Response): void {
        const isLogin = LoginController.isLogin(req);
    }
}
```

类型注解

`src/decorator/controller.ts`

```javascript
import { RequestHandler } from 'express';
import router from '../routes';

enum Methods {
    get = 'get',
    post = 'post',
}

export function controller(target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
        // 从类的原型的方法上获取 path
        const path: string = Reflect.getMetadata('path', target.prototype, key);
        const method: Methods = Reflect.getMetadata('method', target.prototype,key);
        const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key);
        const handler = target.prototype[key];
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

`src/decorator/request.ts` 和 `src/decorator/use.ts`  target 类型优化

```javascript

import { CrowllerController, LoginController } from '../controller';

function getRequestDecorator(type: Methods) {
    return function post(path: string) {
        return function (target: CrowllerController | LoginController, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    }   
}
```

`src/controller/index.ts`，注意 controller 中记得导出上面才能使用

```javascript
export * from './CrowllerController';
export * from './LoginController';
```

**扩展 controller 功能**

`src/decorator/controller.ts`

```javascript
import { RequestHandler } from 'express';
import router from '../routes';
import { Methods } from './request';

export function controller(root: string) {
    return function (target: new (...args: any[]) => any) {
        for (let key in target.prototype) {
            // 从类的原型的方法上获取 path
            const path: string = Reflect.getMetadata('path', target.prototype, key);
            const method: Methods = Reflect.getMetadata('method', target.prototype,key);
            const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key);
            const handler = target.prototype[key];
            if (path && method) {
                const foolPath = root === '/' ? path : `${root}${path}`;
                if (middleware) {
                    router[method](foolPath, middleware, handler);
                } else {
                    router[method](foolPath, handler);
                }
            }
        }
    }
}
```

### 支持多个中间件

`src/decorator/use.ts`

```javascript
import 'reflect-metadata';
import { RequestHandler } from 'express';
import { CrowllerController, LoginController } from '../controller';

export function use(middleware: RequestHandler) {
    return function(target: CrowllerController | LoginController, key: string) {
        const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middleware);
        // 把中间件变成了【方法的元数据】
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    };
}
```

`src/decorator/controller.ts`

```javascript
import { RequestHandler } from 'express';
import router from '../routes';
import { Methods } from './request';

export function controller(root: string) {
    return function (target: new (...args: any[]) => any) {
        for (let key in target.prototype) {
            // 从类的原型的方法上获取 path
            const path: string = Reflect.getMetadata('path', target.prototype, key);
            const method: Methods = Reflect.getMetadata('method', target.prototype,key);
            const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key);
            const handler = target.prototype[key];
            if (path && method) {
                const foolPath = root === '/' ? path : `${root}${path}`;
                if (middlewares && middlewares.length) {
                    router[method](foolPath, ...middlewares, handler);
                } else {
                    router[method](foolPath, handler);
                }
            }
        }
    }
}
```

测试

`src/controller/CrowllerController.ts`

```javascript
const checkLogin = (req: BodyRequest, res: Response, next: NextFunction): void => {
    console.log('checkLogin~~~~~~~~~~~~~~');
    next();
};

const test = (req: BodyRequest, res: Response, next: NextFunction): void => {
    console.log('test~~~~~~~~~~~~~~');
    next();
};

@controller('/')
export class CrowllerController {
    @get('/getData')
    @use(checkLogin)
    @use(test)
    getData(req: BodyRequest, res: Response): void {
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx`;
        const analyze = Analyze.getInstance();
        new Crowller(analyze, url); // 分析对象、要分析的地址
        res.send(getResponseData(true));
    }
}
```

## 前端使用 TS

```
npx create-react-app my-app --typescript
```

```
yarn add antd react-router-dom @types/react-router-dom axios
```

### 登录页面

`src/pages/Login/index.tsx`

```javascript
import React, { memo } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './login.css';

export default memo(function Login() {
    const onFinish = (values: any) => {
        console.log(values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };
    return (
        <div className="login-page">
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password
                        prefix={<UserOutlined style={{ color: '#D9D9D9' }} />}
                        placeholder="请输入密码"
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
});
```

`src/App.tsx`

```javascript
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login} />
            </Switch>
        </Router>
    );
};

export default App;
```

### Home 页面

`src/App.tsx`

```javascript
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </Router>
    );
};

export default App;
```

`src/pages/Home/index.tsx`

```javascript
import React, { memo } from 'react'
import { Button } from 'antd';
import './style.css';

export default memo(function index() {
    return (
        <div className="home-page">
            <Button type="primary">爬取</Button>
            <Button type="primary">展示</Button>
            <Button type="primary">退出</Button>
        </div>
    )
})
```

`src/pages/Home/style.css`

```javascript
.home-page {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #ccc;
    padding: 20px;
    text-align: center;
    border-radius: 4px;
}
.home-page button {
    margin: 0 30px;
}
```

### 登录检测

`package.json`

```javascript
{
    "proxy": "http://localhost:7001"
}
```

后端代码补充

`src/controller/LoginController.ts`

```javascript
@controller('/')
export class LoginController {
    static isLogin(req: BodyRequest) {
        return !!(req.session ? req.session.login : undefined);
    }
    @get('/api/isLogin')
    isLogin(req: BodyRequest, res: Response): void {
        const isLogin = LoginController.isLogin(req);
        res.json(getResponseData(isLogin));
    }
}
```

`src/pages/Home/index.tsx`

```javascript
import React, { Component } from 'react';
import { Button } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './style.css';

export default class Home extends Component {
    state = {
        isLogin: true,
        loaded: false,
    };
    componentDidMount() {
        axios.get('/api/isLogin').then(res => {
            if (!res.data.data) {
                this.setState({
                    isLogin: false,
                    loaded: true,
                });
            }
        });
    }
    render() {
        const { isLogin, loaded } = this.state;
        if (isLogin) {
            if (loaded) {
                return (
                    <div className="home-page">
                        <Button type="primary">爬取</Button>
                        <Button type="primary">展示</Button>
                        <Button type="primary">退出</Button>
                    </div>
                );
            }
            return null;
        }
        return <Redirect to="/login" />;
    }
}
```

### 登录和退出

`src/pages/Login/index.tsx`

```javascript
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import './index.css';

export default class extends React.Component {
    state = {
        isLogin: false,
    };
    onFinish = async (values: any) => {
        const { data } = await axios.post('/api/login', qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        if (data.data) {
            this.setState({ isLogin:true });
        } else {
            message.error(data.errMsg);
        }
    };
    onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };
    render() {
        const { isLogin } = this.state;
        return isLogin
            ? <Redirect to="/" />
            : <div className="login-page">
                  <Form
                      onFinish={this.onFinish}
                      onFinishFailed={this.onFinishFailed}
                  >
                      <Form.Item
                          name="password"
                          rules={[{ required: true, message: '请输入密码' }]}
                      >
                          <Input.Password
                              prefix={
                                  <UserOutlined style={{ color: '#D9D9D9' }} />
                              }
                              placeholder="请输入密码"
                          />
                      </Form.Item>
                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                          <Button type="primary" htmlType="submit">
                              Submit
                          </Button>
                      </Form.Item>
                  </Form>
              </div>;
    }
}
```

`src/pages/Home/index.tsx`

```javascript
import React, { Component } from 'react';
import { Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './style.css';

export default class Home extends Component {
    state = {
        isLogin: true,
        loaded: false,
    };
    componentDidMount() {
        // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.in Home (created by Context.Consumer)
        axios.get('/api/isLogin').then(res => {
            if (!res.data.data) {
                this.setState({
                    isLogin: false,
                    loaded: true,
                });
            } else {
                this.setState({
                    loaded: true,
                });
            }
        });
    }
    handleLogoutClick = () => {
        axios.get('/api/logout').then(res => {
            if (res.data.data) {
                this.setState({
                    isLogin: false,
                });
            } else {
                message.error('退出失败');
            }
        });
    };
    render() {
        const { isLogin, loaded } = this.state;
        if (isLogin) {
            if (loaded) {
                return (
                    <div className="home-page">
                        <Button type="primary">爬取</Button>
                        <Button type="primary">展示</Button>
                        <Button type="primary" onClick={this.handleLogoutClick}>
                            退出
                        </Button>
                    </div>
                );
            }
            return null;
        }
        return <Redirect to="/login" />;
    }
}
```

### 爬取数据

`src/pages/Home/index.tsx`

```javascript
export default class Home extends Component {
    handleCrowllerClick = () => {
        axios.get('/api/getData').then(res => {
            if (res.data.data) {
                message.success('爬取成功');
            } else {
                message.error('爬取失败');
            }
        });
    };
}
```

### 数据展示

```
npm install --save echarts-for-react
npm install --save echarts @types/echarts
```

```javascript
import React, { Component } from 'react';
import { Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import './style.css';

export default class Home extends Component {
    state = {
        isLogin: true,
        loaded: false,
    };
    componentDidMount() {
        // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.in Home (created by Context.Consumer)
        axios.get('/api/isLogin').then(res => {
            if (!res.data.data) {
                this.setState({
                    isLogin: false,
                    loaded: true,
                });
            } else {
                this.setState({
                    loaded: true,
                });
            }
        });
    }
    handleLogoutClick = () => {
        axios.get('/api/logout').then(res => {
            if (res.data.data) {
                this.setState({
                    isLogin: false,
                });
            } else {
                message.error('退出失败');
            }
        });
    };
    handleCrowllerClick = () => {
        axios.get('/api/getData').then(res => {
            if (res.data.data) {
                message.success('爬取成功');
            } else {
                message.error('爬取失败');
            }
        });
    };
    getOptions : () => echarts.EChartOption = () => {
        return {
            title: {
                text: '折线图堆叠',
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310],
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410],
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320],
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                },
            ],
        };
    }
    render() {
        const { isLogin, loaded } = this.state;
        if (isLogin) {
            if (loaded) {
                return (
                    <div className="home-page">
                        <div className="btns">
                            <Button
                                type="primary"
                                onClick={this.handleCrowllerClick}
                            >
                                爬取
                            </Button>
                            <Button type="primary">展示</Button>
                            <Button
                                type="primary"
                                onClick={this.handleLogoutClick}
                            >
                                退出
                            </Button>
                        </div>
                        <ReactEcharts option={this.getOptions()} />
                    </div>
                );
            }
            return null;
        }
        return <Redirect to="/login" />;
    }
}
```

### 真实数据

```javascript
import React, { Component } from 'react';
import { Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import './style.css';

interface CourseItem {
    title: string;
    count: number;
}
interface State {
    loaded: boolean;
    isLogin: boolean;
    data: {
        [key: string]: CourseItem[]
    }
}

interface LineData {
    name: string;
    type: string;
    data: number[]
}

export default class Home extends Component {
    state: State = {
        isLogin: true,
        loaded: false,
        data: {}
    };
    componentDidMount() {
        // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.in Home (created by Context.Consumer)
        axios.get('/api/isLogin').then(res => {
            if (!res.data.data) {
                this.setState({
                    isLogin: false,
                    loaded: true,
                });
            } else {
                this.setState({
                    loaded: true,
                });
            }
        });
        axios.get('/api/showData').then(res => {
           if(res.data.data) {
               this.setState({
                   data: res.data.data
               });
           }
        });
    }
    handleLogoutClick = () => {
        axios.get('/api/logout').then(res => {
            if (res.data.data) {
                this.setState({
                    isLogin: false,
                });
            } else {
                message.error('退出失败');
            }
        });
    };
    handleCrowllerClick = () => {
        axios.get('/api/getData').then(res => {
            if (res.data.data) {
                message.success('爬取成功');
            } else {
                message.error('爬取失败');
            }
        });
    };
    getOptions : () => echarts.EChartOption = () => {
        const { data } = this.state;
        const courseNames: string[] = [];
        const times:string[] = [];
        const tempData: {
            [key: string]: number[]
        } = {};
        for(let i in data) {
            const item = data[i];
            times.push(moment(Number(i)).format('MM-DD HH:mm'));
            item.forEach(innerItem => {
                const { title, count } = innerItem;
                if(courseNames.indexOf(title) === -1) {
                    courseNames.push(title);
                }
                tempData[title] ? tempData[title].push(count) : (tempData[title] = [count]);
            })
        }
        const result: LineData[] = [];
        for(let i in tempData) {
            result.push({
                name: i,
                type: 'line',
                data: tempData[i]
            });
        }
        return {
            title: {
                text: '课程在线学习人数',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: courseNames,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: times,
            },
            yAxis: {
                type: 'value',
            },
            series: result,
        };
    }
    render() {
        const { isLogin, loaded } = this.state;
        if (isLogin) {
            if (loaded) {
                return (
                    <div className="home-page">
                        <div className="btns">
                            <Button
                                type="primary"
                                onClick={this.handleCrowllerClick}
                            >
                                爬取
                            </Button>
                            <Button type="primary">展示</Button>
                            <Button
                                type="primary"
                                onClick={this.handleLogoutClick}
                            >
                                退出
                            </Button>
                        </div>
                        <ReactEcharts option={this.getOptions()} />
                    </div>
                );
            }
            return null;
        }
        return <Redirect to="/login" />;
    }
}
```

### 前后端共用类型定义文件

`responseResult.d.ts`

```javascript
declare namespace responseResult {
    interface CourseItem {
        title: string;
        count: number;
    }
    interface DataStructure {
        [key: string]: CourseItem[]
    }
    type isLogin = boolean;
}
```