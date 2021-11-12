---
title: 01_React 初识
date: 2021-11-05 23:08:54
tags:
---

## 今日目标

✔ 了解 React 的特点。

✔ 掌握使用脚手架创建项目。

✔ 掌握 JSX 的基本使用。

<!-- more -->

## React 介绍

### 目标

了解 React 的背景和基本概念。

### 背景

[React](https://react.docschina.org/) 起源于 Facebook(Meta) 的内部项目（2011，News Feed），之后又被用来开发网站（2012，Instagram），并于 2013 年 5 月开源。

### 内容

[React](https://react.docschina.org/) 是一个用于构建<font color=#e32d40>**用户界面**</font>的 JavaScript <font color=#e32d40>**库**</font>。

-   用户界面：HTML 界面。

-   Library（库）和 Framework（框架）：库的特点是**小而巧**，针对特定问题的单一解决方案。框架的特点是**大而全**，提供了一整套的解决方案。

### 趋势

从 [NPM 下载量](https://www.npmtrends.com/angular-vs-react-vs-vue) 来看，React > Vue > Angular。

### 小结

-   React 是哪个公司开发的？

-   React 是用来干什么？

-   React 的定位是库还是框架？

-   从 NPM 下载量来看，哪个框架/库使用量最多？

## React 特点

### 目标

了解 React 的特点。

### 内容

-   <font color=#e32d40>声明式</font>

只需要描述 UI（HTML）看起来是什么样子，就像写 HTML 一样简单，React 内部负责渲染 UI，并在数据变化时更新 UI。

```jsx
const jsx = (
    <div className='app'>
        <h1>Hello World！</h1>
        <p>动态数据：{count}</p>
    </div>
)
```

-   <font color=#e32d40>组件化</font>

把复杂的页面拆分成一个一个的单元，这些组成页面的基本单元就是组件，通过组合、复用组件来编写复杂界面的方式，就是组件化。

-   <font color=#e32d40>一次学习，随处使用</font>

使用 React 除了可以开发 Web 应用，还可以使用 React Native 开发原生移动应用，甚至可以开发 VR（虚拟现实）应用（React 360）。

-   相比较于 Vue，React 强调尽可能的利用 JS 语言自身的能力来编写 UI，而不是通过造轮子增强 HTML 的功能。

### 小结

-   React 的特点有哪几个？

-   从个人角度看 React 特点，大厂必备（阿里、字节、美团...）

## 基本使用

### 目标

掌握 React 在 HTML 页面中的基本使用。

### 步骤

1. 新建文件夹并初始化包管理文件

```bash
mkdir myreact && cd myreact
yarn init -y
```

2. 下载 `react` 和 `react-dom`

```bash
yarn add react react-dom
```

3. 创建 `index.html` 并引入上面 2 个 JS 文件

```html
<!-- React 核心依赖包 -->
<script src="./node_modules/react/umd/react.development.js"></script>
<!-- 用来将 React 元素渲染到 DOM 元素中 -->
<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
```

4. 创建 React 元素

```js
// 元素名称、元素属性、元素子节点1、元素子节点2...
const title = React.createElement('h1', null, 'Hello World')
```

5. 渲染 React 元素到页面中

```html
<div id="root"></div>
<script>
    // 渲染谁、渲染到哪里
    ReactDOM.render(title, document.querySelector('#root'))
</script>
```

### 小结

-   使用 React 一般需要哪 2 个包？

## 脚手架创建项目

### 目标

掌握使用 React 脚手架创建项目的方法。

### 意义

现代的 Web 应用要考虑的问题很多，除了编写业务代码之外，还要考虑代码规范、预编译、压缩合并、打包上线等工作，需要有一套完整的解决方案来辅助我们快速开发，而 [React 脚手架](https://create-react-app.dev/) 就是这么一套完整的解决方案，它零配置，开箱即用，让我们从繁杂的 Webpack 配置当中解脱出来，更关注于业务本身。

### 使用

使用 [create-react-app](https://create-react-app.dev/) 这个命令行工具，它是 React 官方团队出的一个构建 React 应用的脚手架工具。

<font color=d23e40>**方法一**</font>

1. 全局安装`npm i -g create-react-app`或者`yarn global add create-react-app`。

2. 初始化项目`create-react-app my-app`，my-app 表示项目名称，可以修改。

3. 启动项目：`yarn start`or `npm start`。

缺点：全局安装命令无法保证命令一直是最新版本。

<font color=d23e40>**方法二**</font>

1. 命令：`npx create-react-app react-basic`。

2. 启动项目：`yarn start`or `npm start`。

3. npx 是 `npm@v5.2` 版本新添加的命令，用来简化 npm 工具包的使用流程。

优点：npx 会调用最新的 create-react-app 直接创建 React 项目。

### 小结

使用脚手架创建项目的命令是什么？

## 目录文件说明

### 目标

了解目录文件所代表的含义。

### 初始化文件说明

```bash
|-- package.json # 包管理文件
|-- public # 静态资源文件，不会被打包
|   |-- favicon.ico # favicon
|   |-- index.html # 模板文件
|   |-- logo192.png # 用于指定网页添加到手机主屏幕后的图标
|   |-- logo512.png # 同上
|   |-- manifest.json # 应用加壳时的配置文件
|   `-- robots.txt # 配置爬虫规则
|-- src # 项目源代码，会被打包
|   |-- App.css # App 组件的样式
|   |-- App.js # 根组件
|   |-- App.test.js # App 组件的测试文件
|   |-- index.css # 全局样式
|   |-- index.js # 应用的入口文件
|   |-- logo.svg # Logo
|   |-- reportWebVitals.js # 性能分析文件
|   `-- setupTests.js # 项目测试文件
`-- yarn.lock # 记录包的详细信息，提高安装速度
```

### 模板文件说明

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <!-- %PUBLIC_URL% 代表 public 文件夹 -->
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <!-- 开启理想视口，用于做移动端适配 -->
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- 配置浏览器页签 + 地址栏的颜色（仅支持部分安卓手机浏览器） -->
        <meta name="theme-color" content="#000000" />
        <!-- 网站描述信息，For SEO -->
        <meta name="description" content="Web site created using create-react-app" />
        <!-- 用于指定网页添加到手机主屏幕后的图标 -->
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <!-- 网页加壳（称为 WebAPP）时的配置文件，提供了对此应用的描述（例如应用名称、作者、图标等） -->
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <!-- 网页标题 -->
        <title>React App</title>
    </head>

    <body>
        <!-- 禁用 JS 后显示的提示信息 -->
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
    </body>
</html>
```

### 入口文件说明

`index.js`

```js
// 引入 React 核心库和涉及 DOM 操作的核心包
import React from 'react'
import ReactDOM from 'react-dom'
// 引入全局样式
import './index.css'
// 引入根组件
import App from './App'
// 引入性能分析文件
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    // 开启严格模式
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

// 调用性能分析函数
reportWebVitals()
```

### 启动流程

通过 Webpack 解析入口文件中的代码和依赖，并把最终的结果打包到 `public/index.html` 文件中。

### 小结

-   我们平常写的代码会在哪个文件夹中进行？

-   项目的入口文件是哪个？

## 渲染自己的界面

### 目标

掌握通过 React 脚手架渲染页面的基本步骤。

### 步骤

1. 删除 src 和 public 目录中的所有内容。

2. 新建 `public/index.html`。

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>

    <body>
        <div id="root"></div>
    </body>
</html>
```

3. 新建 `src/index.js` 文件。

4. 引入 React 核心库和涉及 DOM 操作的包。

`src/index.js`

```js
// create-react-app 脚手架生成的项目中已经下载好了 react 和 react-dom，无需重复下载，直接使用即可
import React from 'react'
import ReactDOM from 'react-dom'
```

5. 调用 `React.createElement()` 方法创建 React 元素。

```js
// 标签名、标签属性、标签内容，返回的是一个 React 元素（虚拟 DOM）
const title = React.createElement('h1', null, 'Hello World')
```

6. 调用 `ReactDOM.render()` 方法渲染 React 元素到页面。

```js
ReactDOM.render(title, document.querySelector('#root'))
```

### 小结

在脚手架中，使用 React 和 ReactDOM 渲染页面的步骤是？

## React.createElement() 📝

### 目标

如何用 `React.createElement()` 创建出如下结构？

```html
<div className="wrap">
    <ul>
        <li>React</li>
        <li>Vue</li>
        <li>Angular</li>
    </ul>
</div>
```

### 要点

```js
React.createElement('标签名', { 标签上的属性1：值1 }, 子元素1, 子元素2)
```

### 小结

假如有更加复杂的页面结构怎么办呢？

## JSX 基本介绍

### 目标

了解 JSX 的定义和使用，了解它的工作过程。

### 为什么要有 JSX

`React.createElement()` 创建 React 元素的问题：繁琐/不简洁；不直观，无法一眼看出所描述的结构；代码不容易维护！

```jsx
React.createElement(
    'div',
    { className: 'wrap' },
    React.createElement('ul', null, React.createElement('li', null, 'React'), React.createElement('li', null, 'Vue'), React.createElement('li', null, 'Angular'))
)
```

对比下面 JSX 的写法

```html
<div className="wrap">
    <ul>
        <li>React</li>
        <li>Vue</li>
        <li>Angular</li>
    </ul>
</div>
```

### JSX 是什么

JSX 是 JavaScript XML 的简写，表示可以在 JavaScript 代码中写 XML（HTML） 格式的代码。

优势：声明式语法更加直观，与 HTML 结构相同，降低了学习成本，提高了开发效率，JSX 是 React 的核心之一。

### JSX 基本使用

1. 使用 JSX 创建 React 元素

```js
const title = <h1>Hello JSX</h1>
```

2. 使用 `ReactDOM.render()` 方法渲染 React 元素到页面中

```js
ReactDOM.render(title, document.querySelector('#root'))
```

### JSX 是如何工作的

🤔 换句话说，JSX 并不是标准的 ECMAScript 语法，为什么 React 脚手架中可以直接使用 JSX 呢？

-   JSX 需要使用 Babel 编译处理后，才能在浏览器中使用，`create-react-app` 脚手架中已经内置了该配置，无需手动再配。

-   编译 JSX 语法的包为：[@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react)，[在线体验](https://www.babeljs.cn/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=DwCwjAfAEgpgNnA9gAgFIGUAawD04JA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.16.2&externalPlugins=&assumptions=%7B%7D)。

### 小结

1\. JSX 是什么的简写？

2\. JSX 相比较 `React.createElement()` 的优势是什么？

3\. 为什么 React 脚手架中可以直接使用 JSX？

## JSX 注意点

### 目标

掌握 JSX 使用的注意点。

### 内容

```jsx
const r = (
    <div className='wrap'>
        <h1>Hello World</h1>
        <p>React</p>
    </div>
)
```

1. 必须有 1 个根节点，或者虚拟根节点 `<></>`、`<React.Fragment></React.Fragment>`。

2. 属性名一般是驼峰的写法且不能是 JS 中的关键字，例如 class 改成 className，label 的 for 属性改为 `htmlFor`，colspan 改为 `colSpan`。

3. 元素若没有子节点，可以使用单标签，但一定要闭合，例如 `<span/>`。

4. `React@16.14 之前`需要先引入 React 才能使用 JSX（这个也好理解，因为 JSX 最后还是要被转成 React.createElement() 的形式）。

5. 换行建议使用 `()` 进行包裹，防止换行的时候[自动插入分号](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)的 Bug。

<img src="/resource/images/ifer_bug.png" style="box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%); border-radius: 5px;"/>

### 总结

至少说出 JSX 的三个注意点？

## 使用表达式

### 目标

掌握在 JSX 中使用表达式。

### 内容

**单大括号**中可以使用任意的表达式（可以产生结果的式子）。

普通的简单数据类型

```jsx
const name = 'zs'
const age = 18
const title = (
    <h1>
        姓名：{name}, 年龄：{age}
    </h1>
)
```

对象中的属性

```jsx
const car = {
    brand: '玛莎拉蒂',
}
const title = <h1>汽车：{car.brand}</h1>
```

数组中的某一项甚至整个数组

```jsx
const friends = ['张三', '李四']
const title = <h1>汽车：{friends}</h1>
```

可以调用方法

```jsx
function sayHi() {
    return '你好'
}
const title = <h1>姓名：{sayHi()}</h1>
```

### 注意

-   JS 对象虽然也是表达式，但是不能直接嵌套在 `{}` 中，一般只会出现在 style 属性中。

-   JSX 本身也是表达式。

```jsx
const span = <span>我是一个span</span>
const title = <h1>盒子{span}</h1>
```

### 小结

-   JSX 中可以包含任意的表达式（除了对象）。

-   JSX 中不能放语句，例如 `if`、`switch`、`for`、`while` 等

## 条件渲染

### 目标

掌握条件渲染的写法。

### 内容

可以根据不同的条件渲染不同的 HTML 结构，需求：isLoading 是 true，显示“加载中...”，否则显示“加载完毕！”。

```jsx
import ReactDOM from 'react-dom'

const isLoading = true

const loadData = () => {
    if (isLoading) {
        return <h2>数据加载中，请稍后...</h2>
    }
    return <h2>数据加载完成，此处显示了加载后的数据</h2>
}

ReactDOM.render(loadData(), document.querySelector('#root'))
```

三元表达式

```jsx
const loadData = () => {
    return <h2>{isLoading ? '数据加载中，请稍后...' : '数据加载完成，此处显示了加载后的数据'}</h2>
}
```

### 小结

条件渲染使用\_\_ 和 \_\_？

## 列表渲染

### 目标

-   能在 JSX 中使用数组的 map 方法来生成列表结构。

-   了解 key 的作用。

### 需求

后端返回的数据

```js
;[
    { id: 1, name: 'Vue' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Angular' },
]
```

期望实现的效果

```html
<ul>
    <li>Vue</li>
    <li>React</li>
    <li>Angular</li>
</ul>
```

### 代码实现

手动拼接

```jsx
<ul>
    <li>{list[0].name}</li>
    <li>{list[1].name}</li>
    <li>{list[2].name}</li>
</ul>
```

简化上面的代码：可以使用 `map()` 方法渲染一组数据。

```jsx
import ReactDOM from 'react-dom'

const list = [
    { id: 1, name: 'Vue' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Angular' },
]

const arrJsx = list.map((item) => <li key={item.id}>{item.name}</li>)

const loadData = () => {
    return <ul>{arrJsx}</ul>
}

ReactDOM.render(loadData(), document.querySelector('#root'))
```

### 关于 key

1. 特点：key 值要保证唯一，尽量避免使用索引号当做 key。

2. 加在哪里：`map()` 遍历谁，就把 key 加在谁上。

3. 作用：React 内部用来进行**性能优化**时使用的，key 在最终的 HTML 结构中是看不见的。

### 小结

-   生成一组列表使用哪个方法？

-   循环列表的时候要加什么？

-   key 的作用是什么？

## 渲染数据 📝

### 目标

掌握使用 map 方法来进行列表渲染。

### 内容

```js
const list = [
    { id: 1, name: '武汉黑马前端64期', salary: 11000 },
    { id: 2, name: '武汉黑马前端66期', salary: 13000 },
    { id: 3, name: '武汉黑马前端68期', salary: 15000 },
]
```

需求：根据上面数据生成下面结果。

```html
<ul>
    <li>
        <h3>班级：武汉黑马前端64期</h3>
        <p>工资：11000</p>
    </li>
    <li>
        <h3>班级：武汉黑马前端66期</h3>
        <p>工资：15000</p>
    </li>
</ul>
```

## 样式处理

### 目标

掌握 React 中使用样式的两种方式。

### 行内样式

语法

```jsx
<元素 style={ {css属性1：值1,css属性2：值2} }></元素>
```

示例

```jsx
<div style={{ width: 200, height: 200, backgroundColor: 'black', color: 'white' }}>Hello React</div>
```

注意点

-   为啥有两个`{{ }}`，外层的 `{}` 表示要开始写 JS 表达式了，内层的 `{}` 表示是一个对象。

-   属性名是小驼峰格式，例如 `background-color` 需要写成 `backgroundColor`。

-   属性值是字符串，如果单位是 px，可以简写成数值。

### className

-   用 className 定义类名。

-   在外部准备 `*.css` 文件，然后通过 `import` 引入 `*.css` 文件。

`index.css`

```css
.title {
    width: 200px;
    height: 200px;
    color: white;
    background-color: black;
}
```

```jsx
import './index.css'
;<div className='title'>Hello React</div>
```

### 小结

-   类名使用 `className`，<font color=#e32d40>**推荐**</font>。

-   行内样式，`<div style={{ color: 'red' }}>Hello</div>`。

## 渲染 B 站评论列表 📝

### 案例目标

综合使用 JSX 的知识，结合数据、结构和样式渲染成如下效果。

<img src="/resource/images/ifer_list3.png"/>

### 资源准备

#### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="./index.css" />
    </head>

    <body>
        <div class="App">
            <div class="comment-container">
                <div class="comment-head"><span>1 评论</span></div>
                <div class="tabs-order">
                    <ul class="sort-container">
                        <li class="">按热度排序</li>
                        <li class="on">按时间排序</li>
                    </ul>
                </div>
                <div class="comment-send">
                    <div class="user-face"><img class="user-head" src="avatar.png" alt="" /></div>
                    <div class="textarea-container"><textarea cols="80" rows="5" placeholder="发条友善的评论" class="ipt-txt"></textarea><button class="comment-submit">发表评论</button></div>
                    <div class="comment-emoji"><i class="face"></i><span class="text">表情</span></div>
                </div>
                <div class="comment-list">
                    <div class="list-item">
                        <div class="user-face"><img class="user-head" src="https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000" alt="" /></div>
                        <div class="comment">
                            <div class="user">刘德华</div>
                            <p class="text">给我一杯忘情水</p>
                            <div class="info">
                                <span class="time">2021-10-10 09:09:00</span><span class="like liked"><i class="icon"></i></span><span class="hate"><i class="icon"></i></span
                                ><span class="reply btn-hover">删除</span>
                            </div>
                        </div>
                    </div>
                    <div class="list-item">
                        <div class="user-face"><img class="user-head" src="https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000" alt="" /></div>
                        <div class="comment">
                            <div class="user">周杰伦</div>
                            <p class="text">听妈妈的话</p>
                            <div class="info">
                                <span class="time">2021-10-11 09:09:00</span><span class="like"><i class="icon"></i></span><span class="hate"><i class="icon"></i></span
                                ><span class="reply btn-hover">删除</span>
                            </div>
                        </div>
                    </div>
                    <div class="list-item">
                        <div class="user-face"><img class="user-head" src="https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000" alt="" /></div>
                        <div class="comment">
                            <div class="user">陈奕迅</div>
                            <p class="text">十年</p>
                            <div class="info">
                                <span class="time">2021-10-11 10:09:00</span><span class="like"><i class="icon"></i></span><span class="hate hated"><i class="icon"></i></span
                                ><span class="reply btn-hover">删除</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
```

#### `index.css`

```css
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
.App {
    /* width: 1090px; */

    width: 80%;
    margin: 50px auto;
}
.comment-head {
    margin: 0 0 20px;
    font-size: 18px;
    line-height: 24px;
    color: #222;
}

.comment-send {
    margin: 10px 0;
}

.user-face {
    float: left;
    margin: 7px 0 0 5px;
    position: relative;
}

.user-head {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}

.textarea-container {
    position: relative;
    margin-left: 85px;
    margin-right: 80px;
}
.textarea-container:hover .ipt-txt {
    background-color: #fff;
    border-color: #00a1d6;
}

.ipt-txt {
    font-size: 12px;
    display: inline-block;
    box-sizing: border-box;
    background-color: #f4f5f7;
    border: 1px solid #e5e9ef;
    overflow: auto;
    border-radius: 4px;
    color: #555;
    width: 100% !important;
    height: 65px;
    transition: 0s;
    padding: 5px 10px;
    line-height: normal;
    resize: none;
    outline: none;
}

.comment-submit {
    width: 70px;
    height: 64px;
    position: absolute;
    right: -80px;
    top: 0;
    padding: 4px 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    min-width: 60px;
    vertical-align: top;
    cursor: pointer;
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
    transition: 0.1s;
    user-select: none;
    outline: none;
}
.comment-submit:hover {
    background-color: #00b5e5;
    border-color: #00b5e5;
}

.comment-emoji {
    padding: 0;
    width: 66px;
    height: 24px;
    color: #99a2aa;
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    position: relative;
    font-size: 12px;
    text-align: center;
    line-height: 23px;
    margin-left: 86px;
    margin-top: 3px;
    cursor: pointer;
    display: inline-block;
}
.comment-emoji:hover {
    color: #6d757a;
}

.face {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background: url(data:image/png;base64,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)
        no-repeat -408px -24px;
}
.comment-emoji:hover .face {
    background-position: -472px -24px;
}

.comment-emoji .text {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    font-size: 12px !important;
}

.tabs-order {
    margin: 0 0 24px 0;
    border-bottom: 1px solid #e5e9ef;
}

.sort-container {
    display: flex;
}

.tabs-order li {
    background-color: transparent;
    border-radius: 0;
    border: 0;
    padding: 8px 0;
    margin-right: 16px;
    border-bottom: 1px solid transparent;
    position: relative;
    float: left;
    cursor: pointer;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #222;
}

.tabs-order li:last-child {
    margin: 0 16px;
}

.tabs-order li.on {
    border-bottom: 1px solid #00a1d6;
    color: #00a1d6;
}

.tabs-order li.on::after {
    content: '';
    width: 6px;
    height: 3px;
    background: transparent
        url(data:image/png;base64,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) -669px -31px
        no-repeat;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
    visibility: visible;
}

.list-item {
    display: flex;
}
.list-item:first-child {
    padding-top: 22px;
}

.comment {
    flex: 1;
    position: relative;
    margin-left: 35px;
    padding: 22px 0 14px 0;
    border-top: 1px solid #e5e9ef;
}
.list-item:last-child .comment {
    border-bottom: 1px solid #e5e9ef;
}

.comment .user {
    color: #6d757a;
    font-size: 12px;
    font-weight: bold;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
    position: relative;
}

.comment .text {
    line-height: 20px;
    padding: 2px 0;
    font-size: 14px;
    text-shadow: none;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
}

.info {
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}

.icon {
    cursor: pointer;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoCAMAAAB6fSTWAAAA51BMVEUAAACYoKhwd3yboqni5emDjJL7+/yZoqoAodbnix8AodYAodaZoqoAodYAodaln5jnix8Aodbnix8AodaZoqoAodbnix8Aodbnix/yXY6ZoqoAodYAodYAodaZoqoAodaZoqryXY7yXY4AodbyXY6ZoqryXY6ZoqoAodaZoqoAodaZoqryXY7nix8AodYAodbnix+ZoqqZoqrnix8AodYAodbnix+Zoqr////19vfM0NcAoda/v7/l6e9MyP//u1PlL+z/s3yS0eWV3bL/bAAVFRX/AACEHPnnix+M2fn/1pbyXY4iIiIkv4BgAAAAOHRSTlMA9fUreZKu4eI+EfDtgtwP7AkexYcv2WfIsP3refnX0mcmGUPyxsScjXkXF++zoZpMMyn+Ppl8Q6/LsKoAAA3QSURBVHja7NvdbtowGIfxP7UsaEqbfkGj0bWVpqofiK0f2nZALyD3f0V7E4KsbULCjpRA9fykQDjw4SOb2BEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG2cF4X64vzAeJc+/sDYeGDH3Q0e1MrV1x9q4eW0LNUTP2j4xPEHDS9gp70O50O1MRk9j5Tu13tZhX4+LdS5ejJvpnUlqCfzZloXsMPym99qFfrZ7Telh54vyop1Xk7VNevbqeas+KT5fD2eOR3b+FhR1/L84dJaz42SZNnPR2UnWZadKV7+Mi1rss7P1THXdB7u47iq83DP/3RsijtQpevQ78bjL/fS29CMHxTvana0vDjT5MTMviuSVb6movvO5Qe+Wr2vLvsRP6H7avW+ujxTOjaErrrw+mq+1K1hrqHWxoo3yjTS2kyRTssQeh9sEg+hO/uIZJN4CN3xLx07G7pC6G/3KaErhD65UKQyUGEfhbplaYfQlRK6Quja29CPj4W/febQn55ahn59vY+hO9VcWuhh/P6GfrxcUvq/PnHo965l6BcTRZruwNLdexnv05buYfzeLt2tc0qPkBi6qb77D31+o3ahP58o1mERQl8U/TyMc3bZjUt9GOfsshvHwzhsDt00jdf3fYZ+d9ky9KtHxcsPe99ec746NJO+veZ8dWiG7TVs9PGfzkOfr0PPb16TQn9eh57dTtoemCm0NQ7MAHH76OOVJylxH/2oNrtufQR2oa1xBBbYN/ZSy7ui8VILsF94TRUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAH3buoMVNIAzA8BxESA5ldyHkUui1p/Y6YrJ71v//g/rFmFoKaaMBdZPngTWzh+/4MqKTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwIMqyirnqizungfWqihzryzum5c6rFVkWrUfoa0i1Unzx+Y9NMfTPKzZvv6ZnlJ02n702ih1wnzz3muUzrrt6rpOS3kbFrMrzp0PpRdj57vOh9LdvbNer/WCob+9bFJn8zJ/6eWl87Y9l16OnW/6xpvuakvnvw5naW7bbX2y3W5f0xI2UXr/MbciV33nffBVLsbNH/vO++CPtnSuxT3o/k/z2td/+JGWEIkv0vmwobf596KcsqE3ORa2dK46nNLuLsNiXpF3/F2kRUTkC3QeqnzpPBadXI2bv3Qei07Mg9CvlR6dLyDnc+ehqqou9Dxu/tJ5zB+70HOCtYf+Nd3sgUKvcqedGno/3widTxL6Lt3skW7do+/ofPKtezh17tadf4YeTp8rCP1Lup2HcR7GMSL00BfeNb5o6N/TzR7r9Vobnd/zeq2Jzr1e47rD35YM/dsujfMwB2bauE4/MNMdl7Ghs2r7+o5HcY7AOgILn4AvtcAz8DVVeAZ+eAKegp+SAgAAAAAAAAAAAAAAAAAAAH6xczctbQRxAIf/RmHDGgyiQWisCkV8gxaF0nZDTjkF+v0/T4dNrIFe6g5JnOR5srksDHP6wTCzDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlKhZdXRY3HjgPzS/Vkybd5fW/FyRxmfOr3RorS/0ZHqUEXqSxufODyRrDD1pckJPmuz5gQihQxc3g8GnwcJDdHAxPp4ct8aXUR6hsx+qp6iiNbx6jvfrP0Y/WvX1KIojdDZtthCbVbVP6+a8S+jt07q4j+IsQjvIDH2eGfpU6Dtutioi2WLoT1d5oT+eRHEWof0+yAt9Ms8LvZkKfbfNoi28/be2GXrcHmaFHmflrd2XoafSs0KfzPNCb6ZC32kfK/SHh7zQL8vbjluGnkrPC30yzwu9mQp9l62Evv2le7zc5oU+OovS/A29J3Q66BT6Vjbjhm+hx6BD6PVb6DGO0ryG3rN0Z41e406/jNBzz9FvI16qZHDX7Rz97DRGJ8n4a5RmGXrPZhzr1Gb92vjyzaYNh3fnMbwaJtFFXX+/j/qkruvTKM4itJ7jNdZq9q/YuFT5j6iiu9PrL9GPIvlghj3yXD1VkWHUfxS60Pnwbg7uIsfF529RJKHDHhA67AEXT8AecJUU7IHG5ZAAAAAAAAAAAAAAAMAfdu6etUEgDuDwNcnkUMgQshS6dmrXeOKSLdDv/3kqlxeELCVXk9T/84Aogtz0w+OUAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAmVqu8ti/ex74RWe5b8dueH43Vj0+8PdWfVsV2mrofOyG8YUOU8ttXWh5Vxd6boUOV4QOt9h2F28pHqETwxD4cBTvmxSO0Lm3/VGqUBd695HCuYT2Uhn6oTL0Xuhzth8rdx4Z+msKJ587/64L/dDVhd5noc/ZPpXCy1E8LPQi3tw9nzuvC/3Q1YXeZ6HP2pOFHm85Lp86rwv90NWF3mehz9so9CeYug+X0Rz7WgidKzN+o0cN3dSdaZ36LufHhL7tRj5TNLk9WliMY0Il69J3xap7paYpkTdNs07h5PZk4fMa09lfS/e3Djlr98MM0WyELnQC2HZfKSShQwBChwBsPAEB2EoKIljaHBIAAAAAAAAAAPhhzw5WGwSiMIzekCGbkF1Wgb5HhzIL3/+lClaCEixCCMl4zwER3H/8OgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADtX2gYlgJ617w1aAD0TOiQgdEhA6JCA0CEBoUMCQocEhA4JCB0SEDokIHRIQOiQgNBJ6nq4xlMu50t0Q+gkdbsd4ilfP+fohtB5o+FPbGTRhU4vhrkYr+CB0OnbEPfChb5O6PTtU0L36i505l4Z+vRkI4dxQqcXi9AHi75C6PRt6nu6+0ZfIXT6NmY99i30/widrg0z/qOvEjo4jBM6WHShQ0ZChwSEDgkIHRIQOiQgdEhA6JDAQ+i1tSp02Je2rLy2cjyWVqvQYUfaYsxPJUbl1KrQYTfaYszjbpx1of+yZ8c4DINAFAW3QJwpFO64/5kiMAUU6eP1jGS5oH76loEcajvGfDlnvdUAnqxc7dOuY8yPWZ/HJYBHK3WN+e9jnQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPyNfgsgmb6LQeiQTo9Z+P2ERYeUhA4vsIXu0x2y2kOfhA75rL7HW+iQ1cx69O2vO+TVN+7RAQAAAAAAAAAAvuzZwQnAIBBE0a1u+i8pqBch15wm74FawWdFAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvpFjgDK5zSJ0qJPZhZ81JjpUEjr8wBW6qzu0ek10oUOfTJZ1Ch1aZW/JeHWHXrn4RwcAAAAAAHjYs2MbgIEQCIKURv9VWY8dfAGOjhkJUcFGBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8I9+FRCmb3UIHeJ0TeFzQ+iQR+iwgNBhAaHDAl/f5wsdUk3W07fQIVZf7OgAAAAPe3ZQA0AIQ1Gw7r5/Rxu6lwrgVGYSqIIXCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANyRXwHLZKpD6LBOqgvv1UPosI/Q4QEjdFd32MqJDg9I5ThT6LBVekvKqzvslcE/+sduHZ0AAIIAFHQ5918pMggH6MvuQJzgoQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/kEcAw2cUmdBgnowqvqSV0mEfo8IEWutcdprqh17joiz07tgEQhgEgmBoEUuQaZZDU3n8lCBUbIFl3hT3BNzaUlC2XtYUOVeU7MpurO9SVH/7oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL+L+YgGVBZzaUBp2xA6FNaP8zqPmEPoUFaPueyxCf1mz45NIIaBIAAqdCKBcOTAgZBDh86uhO+/n9fzTZhjJtgOloNbSKtGm322qGX3jIOsWjwrn2gFSOuMvrLHWYC0WkwXHbKrsc0+t6gFSKvv8bP3AuT139H1HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4OXGcV3HKEBi4/4st6Z/2bODG4BhEAaArJFnoyjLeP99WnUMuHuwgQXC0NnK2vsbBfR1sqt2TgF9CToM4HSHATzjYIJnJeo16O3mdwvoS9BhhqSA7q51DgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAve3AgAAAAAADk/9oIqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqrCHhwIAAAAAAD5vzaCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwBwcCAAAAAED+r42gqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqirtwQEJAAAAgKD/r9sRqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8BfEgGFMI1IvvAAAAABJRU5ErkJggg==)
        no-repeat;
}

.time {
    margin-right: 20px;
}

.like {
    cursor: pointer;
    margin-right: 20px;
}

.like > i {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background-position: -153px -25px;
}
.like:hover > i {
    background-position: -218px -25px;
}
.info .liked > i {
    background-position: -154px -89px;
}

.hate {
    cursor: pointer;
    margin-right: 15px;
}

.hate > i {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background-position: -153px -153px;
}

.hate:hover > i {
    background-position: -217px -153px;
}
.info .hated > i {
    background-position: -154px -217px;
}

.btn-hover {
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer;
    display: inline-block;
}

.btn-hover:hover {
    color: #00a1d6;
    background: #e5e9ef;
}
```

### 实现步骤

#### 导入样式和图片

```js
import ReactDOM from 'react-dom'
import './index.css'
import avatar from './images/avatar.png'
```

#### 渲染数据和结构

```js
const state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
        {
            id: 1,
            name: '热度',
            type: 'hot',
        },
        {
            id: 2,
            name: '时间',
            type: 'time',
        },
    ],
    active: 'time',
    list: [
        {
            id: 1,
            author: '刘德华',
            comment: '给我一杯忘情水',
            time: '2021-10-10 09:09:00',
            img: 'https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000',
            // 1: 点赞 0：无态度 -1:踩
            attitude: 1,
        },
        {
            id: 2,
            author: '周杰伦',
            comment: '听妈妈的话',
            time: '2021-10-11 09:09:00',
            img: 'https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000',
            // 1: 点赞 0：无态度 -1:踩
            attitude: 0,
        },
        {
            id: 3,
            author: '陈奕迅',
            comment: '十年',
            time: '2021-10-11 10:09:00',
            img: 'https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000',
            // 1: 点赞 0：无态度 -1:踩
            attitude: -1,
        },
    ],
}
```

```jsx
const content = (
    <div class='App'>
        <div class='comment-container'>
            <div class='comment-head'>
                <span>1 评论</span>
            </div>
            <div class='tabs-order'>
                <ul class='sort-container'>
                    <li class=''>按热度排序</li>
                    <li class='on'>按时间排序</li>
                </ul>
            </div>
            <div class='comment-send'>
                <div class='user-face'>
                    <img class='user-head' src='avatar.png' alt='' />
                </div>
                <div class='textarea-container'>
                    <textarea cols='80' rows='5' placeholder='发条友善的评论' class='ipt-txt'></textarea>
                    <button class='comment-submit'>发表评论</button>
                </div>
                <div class='comment-emoji'>
                    <i class='face'></i>
                    <span class='text'>表情</span>
                </div>
            </div>
            <div class='comment-list'>
                <div class='list-item'>
                    <div class='user-face'>
                        <img class='user-head' src='https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000' alt='' />
                    </div>
                    <div class='comment'>
                        <div class='user'>刘德华</div>
                        <p class='text'>给我一杯忘情水</p>
                        <div class='info'>
                            <span class='time'>2021-10-10 09:09:00</span>
                            <span class='like liked'>
                                <i class='icon'></i>
                            </span>
                            <span class='hate'>
                                <i class='icon'></i>
                            </span>
                            <span class='reply btn-hover'>删除</span>
                        </div>
                    </div>
                </div>
                <div class='list-item'>
                    <div class='user-face'>
                        <img class='user-head' src='https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000' alt='' />
                    </div>
                    <div class='comment'>
                        <div class='user'>周杰伦</div>
                        <p class='text'>听妈妈的话</p>
                        <div class='info'>
                            <span class='time'>2021-10-11 09:09:00</span>
                            <span class='like'>
                                <i class='icon'></i>
                            </span>
                            <span class='hate'>
                                <i class='icon'></i>
                            </span>
                            <span class='reply btn-hover'>删除</span>
                        </div>
                    </div>
                </div>
                <div class='list-item'>
                    <div class='user-face'>
                        <img class='user-head' src='https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000' alt='' />
                    </div>
                    <div class='comment'>
                        <div class='user'>陈奕迅</div>
                        <p class='text'>十年</p>
                        <div class='info'>
                            <span class='time'>2021-10-11 10:09:00</span>
                            <span class='like'>
                                <i class='icon'></i>
                            </span>
                            <span class='hate hated'>
                                <i class='icon'></i>
                            </span>
                            <span class='reply btn-hover'>删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
```

```js
ReactDOM.render(content, document.querySelector('#root'))
```

#### 处理 class 和 avatar

```jsx
const content = (
    <div className='App'>
        <div className='comment-container'>
            <div className='comment-head'>
                <span>1 评论</span>
            </div>
            <div className='tabs-order'>
                <ul className='sort-container'>
                    <li className=''>按热度排序</li>
                    <li className='on'>按时间排序</li>
                </ul>
            </div>
            <div className='comment-send'>
                <div className='user-face'>
                    <img className='user-head' src={avatar} alt='' />
                </div>
                <div className='textarea-container'>
                    <textarea cols='80' rows='5' placeholder='发条友善的评论' className='ipt-txt'></textarea>
                    <button className='comment-submit'>发表评论</button>
                </div>
                <div className='comment-emoji'>
                    <i className='face'></i>
                    <span className='text'>表情</span>
                </div>
            </div>
            <div className='comment-list'>
                <div className='list-item'>
                    <div className='user-face'>
                        <img className='user-head' src='https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000' alt='' />
                    </div>
                    <div className='comment'>
                        <div className='user'>刘德华</div>
                        <p className='text'>给我一杯忘情水</p>
                        <div className='info'>
                            <span className='time'>2021-10-10 09:09:00</span>
                            <span className='like liked'>
                                <i className='icon'></i>
                            </span>
                            <span className='hate'>
                                <i className='icon'></i>
                            </span>
                            <span className='reply btn-hover'>删除</span>
                        </div>
                    </div>
                </div>
                <div className='list-item'>
                    <div className='user-face'>
                        <img className='user-head' src='https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000' alt='' />
                    </div>
                    <div className='comment'>
                        <div className='user'>周杰伦</div>
                        <p className='text'>听妈妈的话</p>
                        <div className='info'>
                            <span className='time'>2021-10-11 09:09:00</span>
                            <span className='like'>
                                <i className='icon'></i>
                            </span>
                            <span className='hate'>
                                <i className='icon'></i>
                            </span>
                            <span className='reply btn-hover'>删除</span>
                        </div>
                    </div>
                </div>
                <div className='list-item'>
                    <div className='user-face'>
                        <img className='user-head' src='https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000' alt='' />
                    </div>
                    <div className='comment'>
                        <div className='user'>陈奕迅</div>
                        <p className='text'>十年</p>
                        <div className='info'>
                            <span className='time'>2021-10-11 10:09:00</span>
                            <span className='like'>
                                <i className='icon'></i>
                            </span>
                            <span className='hate hated'>
                                <i className='icon'></i>
                            </span>
                            <span className='reply btn-hover'>删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
```

#### 处理评论数和排序

```jsx
const content = (
    <div className='App'>
        <div className='comment-container'>
            <div className='comment-head'>
                <span>{state.list.length} 评论</span>
            </div>
            <div className='tabs-order'>
                <ul className='sort-container'>
                    {state.tabs.map((item) => (
                        <li className={item.type === state.active ? 'on' : ''} key={item.id}>
                            按{item.name}排序
                        </li>
                    ))}
                </ul>
            </div>
            {/* ... */}
        </div>
    </div>
)
```

5. 循环评论列表。

```jsx
const content = (
    <div className='App'>
        <div className='comment-container'>
            {/* ... */}
            <div className='comment-list'>
                {state.list.map((item) => (
                    <div className='list-item' key={item.id}>
                        <div className='user-face'>
                            <img className='user-head' src={item.img} alt='' />
                        </div>
                        <div className='comment'>
                            <div className='user'>{item.author}</div>
                            <p className='text'>{item.comment}</p>
                            <div className='info'>
                                <span className='time'>{item.time}</span>
                                <span className={item.attitude === 1 ? 'like liked' : 'like'}>
                                    <i className='icon'></i>
                                </span>
                                <span className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                                    <i className='icon'></i>
                                </span>
                                <span className='reply btn-hover'>删除</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)
```

class 的另外一种处理方式。

```jsx
<span className={['like', item.attitude === 1 ? 'liked' : ''].join(' ')}>
    <i className='icon'></i>
</span>
```

### 最终代码

```jsx
import ReactDOM from 'react-dom'
import './index.css'
import avatar from './images/avatar.png'

const state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
        {
            id: 1,
            name: '热度',
            type: 'hot',
        },
        {
            id: 2,
            name: '时间',
            type: 'time',
        },
    ],
    active: 'time',
    list: [
        {
            id: 1,
            author: '刘德华',
            comment: '给我一杯忘情水',
            time: '2021-10-10 09:09:00',
            img: 'https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000',
            // 1: 点赞 0：无态度 -1:踩
            attitude: 1,
        },
        {
            id: 2,
            author: '周杰伦',
            comment: '听妈妈的话',
            time: '2021-10-11 09:09:00',
            img: 'https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000',
            // 1: 点赞 0：无态度 -1:踩
            attitude: 0,
        },
        {
            id: 3,
            author: '陈奕迅',
            comment: '十年',
            time: '2021-10-11 10:09:00',
            img: 'https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000',
            // 1: 点赞 0：无态度 -1:踩
            attitude: -1,
        },
    ],
}

const content = (
    <div className='App'>
        <div className='comment-container'>
            <div className='comment-head'>
                <span>{state.list.length} 评论</span>
            </div>
            <div className='tabs-order'>
                <ul className='sort-container'>
                    {state.tabs.map((item) => (
                        <li className={item.type === state.active ? 'on' : ''} key={item.id}>
                            按{item.name}排序
                        </li>
                    ))}
                </ul>
            </div>
            <div className='comment-send'>
                <div className='user-face'>
                    <img className='user-head' src={avatar} alt='' />
                </div>
                <div className='textarea-container'>
                    <textarea cols='80' rows='5' placeholder='发条友善的评论' className='ipt-txt'></textarea>
                    <button className='comment-submit'>发表评论</button>
                </div>
                <div className='comment-emoji'>
                    <i className='face'></i>
                    <span className='text'>表情</span>
                </div>
            </div>
            <div className='comment-list'>
                {state.list.map((item) => (
                    <div className='list-item' key={item.id}>
                        <div className='user-face'>
                            <img className='user-head' src={item.img} alt='' />
                        </div>
                        <div className='comment'>
                            <div className='user'>{item.author}</div>
                            <p className='text'>{item.comment}</p>
                            <div className='info'>
                                <span className='time'>{item.time}</span>
                                <span className={item.attitude === 1 ? 'like liked' : 'like'}>
                                    <i className='icon'></i>
                                </span>
                                <span className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                                    <i className='icon'></i>
                                </span>
                                <span className='reply btn-hover'>删除</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

ReactDOM.render(content, document.querySelector('#root'))
```

## 今日总结
