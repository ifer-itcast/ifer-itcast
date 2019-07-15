---
title: Webpack 基础梳理
date: 2019-07-14 08:15:38
tags:
---

**本篇内容根据《Webpack 实战：入门、进阶与调优》记录！**

## Webpack 简介

### 何为 Webpack

一个开源的 JS 模块打包工具，核心是解决模块之间的依赖，把各个模块按照特定到的规则和顺序组织在一起，最终合并成一个或多个 JS 文件，这个过程叫做模块打包！

### 为什么需要 Webpack

#### 何为模块

项目中引入的一个日期处理的 npm 包，或者编写的一个提供工具方法的 JS 文件都可以称为模块！

#### JavaScript 中的模块

AMD、CommonJS、CMD、ES6 模块等

#### 模块打包工具

就是为了解决模块间的依赖，使其打包后的结果能运行在浏览器上，比较流行的有 Webpack、Parcel、Rollup 等。

#### 为什么选择 Webpack

完备！

### 安装

```javascript
npm init -y // 初始化 package.json
npm install webpack webpack-cli --save-dev // 安装 webpack 核心模块和命令行工具
npx webpack -v // 查看 webpack 版本号
npx webpack-cli -v // 查看 webpack-cli 版本号
```

### 打包第一个应用

#### Hello World

```javascript
// 以开发模式打包 ./index.js 文件到 ./dist/bundle.js
npx webpack --entry=./index.js --output-filename=bundle.js --mode=development
```

#### 使用 npm scripts

```javascript
// package.json
{
    "scripts": {
        "build": "webpack --entry=./index.js --output-filename=bundle.js --mode=development"
    }
}
```

#### 使用默认目录配置

Webpack 默认的源代码入口是 src/index.js，把 index.js 放到 src 下可以省略 --entry 配置，默认出口是 dist

```javascript
// package.json
{
    "scripts": {
        "build": "webpack --output-filename=bundle.js --mode=development"
    }
}
```

#### 使用配置文件

```javascript
npx webpack -h // 查看 webpack 配置项以及命令行
```

当项目需要越来越多的配置时，都添加到 package.json 中后期就会变得难以维护！为了解决这个问题，可以把这些配置项专门放到一个配置文件里，这个文件默认就是 webpack.config.js。

```javascript
// webpack.config.js
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    mode: 'development'
};
```

```javascript
// package.json
{
    "scripts": {
        "build": "webpack"
    }
}
```

#### webpack-dev-server

每次改变 JS 都要执行 npm run build，然后刷新页面才能看到效果，有没有更好的方法呢？答案是使用 wepack-dev-server，两大好处：快（打包结果在内存中）、live-reloading（自动刷新）

```javascript
// 项目上线时就可以通过 npm install --production 过滤掉 devDependencies 中的冗余模块
npm install webpack-dev-server --save-dev
```

```javascript
// webpack.config.js
module.exports = {
    devServer: {
        // 生成的 bundle.js 在内存中的路径
        // http://localhost:8080/dist/bundle.js
        publicPath: '/dist'
    }
};
```

```javascript
// package.json
{
    "scripts": {
        "build": "webpack",
        "dev": "webpack-dev-server"
    },
}
```

## 模块打包

### CommonJS

CommonJS 是 JS 社区 2009 年提出的标准，Node.js 采用了 CommonJS 标准的一部分并在此基础上进行了调整！

#### 模块

CommonJS 规定每个文件是一个模块！所有的变量及函数只有自己能访问，对外是不可见的。

```javascript
// calculator.js
var name = 'calculator.js';
```

```javascript
// index.js
var name = 'index.js';

require('./calculator');
console.log(name); // index.js
```

#### 导出与导入

导出是一个模块向外暴露自身的唯一方式！除了 module.exports 外，使用 exports 也可以导出，但注意不要直接对 exports 进行赋值！

```javascript
// calculator.js
module.exports = {
    name: 'calculator',
    add: function(a, b) {
        return a + b;
    }
};
console.log('hello ~');
```

下面代码尽管有两个地方 require 了 calculator，但 calculator.js 内部代码只执行了一次！

```javascript
// index.js
const calculator = require('./calculator');
require('./calculator');

const sum = calculator.add(2, 3);
console.log(sum);
```

### ES6 module

2015 年 6 月，TC39 标准委员会正式发布了 ES6，从此 JS 这门语言才具备了模块这一特性！

#### 模块

ES6 module 也是将每个文件作为一个模块，每个模块拥有自身的作用域，它还会自动采用严格模式！

#### 导出

- 命名导出

```javascript
// 写法1
export const name = 'calculator';
export const add = function(a, b) {
    return a + b;
};
```

```javascript
// 写法2
const name = 'calculator';
const add = function(a, b) {
    return a + b;
};

// 可以使用 as 关键字对变量进行重命名
export {name, add as getSum};
```

第 1 种写法将变量的声明和导出写在一行；第 2 种先声明再统一导出，两种写法效果一样！

- 默认导出

```javascript
export default 'This is calculator.js';
export default class {}
export default function() {}
```

#### 导入

```javascript
// calculator.js
const name = 'calculator';
const add = function(a, b) {
    return a + b;
};

export {name, add};
```

```javascript
// index.js
// 加载带有命名导出的模块时，import 后面要跟一对大括号将导入的变量名包裹起来，并且这些变量名需要与导出时的一致！
import {name, add as getSum} from './calculator.js';
console.log(getSum(2, 3));
```

```javascript
// 导入多个变量时，还可以采用整体导入的方式
import * as calculator from './calculator.js';
calculator.add(2, 3);
```

### 加载 npm 模块

```javascript
// 实际加载的时 ./node_modules/lodash/package.json 中 main.js 对应的 lodash.js 文件
import _ from 'lodash';
```

也可以单独引入某个用到的 JS 文件，减小打包资源的体积！

```javascript
import all from 'lodash/fp/all.js';
```

## 资源输入输出

### 配置资源入口

#### context

资源入口的路径前缀，默认为当前工程的根目录，可以让 entry 的编写更加简洁，尤其在过入口情况下！

```javascript
module.exports = {
    context: path.join(__dirname, './src'),
    entry: './index.js',
    mode: 'development'
};
```

#### entry

entry 的值可以是字符串、数组、对象、函数！

- 字符串类型入口

```javascript
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    mode: 'development'
};
```

- 数组类型入口

将多个资源预先合并，将数组中的最后一个元素作为实际的入口路径！可以**多入口单出口**

```javascript
module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js'
    },
    mode: 'development'
};
```

上面配置等同于

```javascript
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    mode: 'development'
};
```

```javascript
// index.js
import 'babel-polyfill';
```

- 对象类型入口


使用字符串或数组定义单入口时，没有办法更改 chunk name，只能为默认的 main。使用对象定义多入口时，则必须为每一个出口定义 chunk name，即必须**多入口多出口**。

```javascript
module.exports = {
    entry: {
        // 对象的属性值也可以为字符串或数组
        index: ['babel-polyfill', './src/index.js'],
        lib: './src/lib.js'
    },
    output: {
        filename: '[name].js'
    },
    mode: 'development'
};
```

- 函数类型入口

用函数作为入口时，只需返回上面介绍的任何配置形式即可！使用函数的优势是可以在里面写入一些动态逻辑来获取工程的入口！

```javascript
module.exports = {
    entry: () => './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    mode: 'development'
};
```

#### 实例

- 单页应用

对于 SPA 来说，一般单一入口即可！好处是只会产生一个 JS 文件依赖关系清晰，弊端是当应用规模上升后导致资源体积过大，降低页面的渲染速度！

只产生一个 JS 文件并且它的体积很大，一旦产生代码更新，即便只有一点点改动，用户都要下载整个资源文件，这对于页面的性能不友好！为了解决这个问题，可以提取 vendor，需要配置 optimization.splitChunks！

- 多页应用

各个页面都只加载各自必要的逻辑，而不是将所有的 bundle 打包到同一个 bundle 中！

### 配置资源出口

#### filename

输出资源的文件名，也可以是一个路径，即便这个路径不存在也没关系，Webpack 会自动创建！

#### path

资源输出的位置，必须为绝对路径，例如 `path.join(__dirname, 'dist')`，默认就是此路径无需配置！

#### publicPath

用来指定资源的请求位置。

页面的资源分为两种，一种是由HTML页面直接请求的，比如通过 script 标签加载的 JS；另一种是由JS或CSS请求的，如异步加载的JS、从CSS请求的图片字体等。publicPath 的作用就是指定这部分简洁资源的请求位置！

注意 webpack-dev-server 中的 publicPath 是指定静态资源服务路径。

**为了避免开发环境和生产环境的不一致，建议把 output.path 和 webpack-dev-server 的 publicPath 设置的路径一直！**

