---
title: React Basis
date: 2021-10-23 18:29:43
tags:
---

## 是什么

[React](https://react.docschina.org/) 是一个用于<font color=#e32d40>**构建用户界面**</font>的 JavaScript 库，如果从 MVC 的角度看，React 仅仅是视图层（V），也就是只负责视图的渲染，并非提供了完整的 M 和 C 的功能。

[React](https://react.docschina.org/) 起源于 Facebook 的内部项目，后又用来架设 Instagram 网站，并用 2013 年 5 月开源。

## React 特点

-   <font color=#e32d40>声明式</font>

你只需要描述 UI（HTML）看起来是什么样子，就像写 HTML 一样简单，React 内部负责渲染 UI，并在数据变化时更新 UI。

```jsx
const jsx = (
    <div className='app'>
        <h1>Hello World！</h1>
        <p>动态数据：{count}</p>
    </div>
)
```

-   <font color=#e32d40>组件化</font>

把复杂的页面拆分成一个一个的单元，这些组成页面的基本单元就是组件，通过组合、复用组件，可以编写复杂的界面系统。

-   <font color=#e32d40>一次学习，随处使用</font>

使用 React 除了可以开发 Web 应用，还可以使用 React Native 开发原生移动应用，甚至可以开发 VR（虚拟现实）应用（React 360）。

## 基本使用

1. 下载 `react` 和 `react-dom`

```bash
yarn add react react-dom
```

2. 引入上面 2 个 JS 文件

```html
<script src="./node_modules/react/umd/react.development.js"></script>
<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
```

3. 创建 React 元素

```js
// 元素名称、元素属性、元素子节点1、元素子节点2...
const title = React.createElement('h1', null, 'Hello World')
```

4. 渲染 React 元素到页面中

```html
<div id="root"></div>
<script>
    // 渲染谁、渲染到哪里
    ReactDOM.render(title, document.querySelector('#root'))
</script>
```

## React 脚手架

-   <font color=#e32d40>意义</font>

现代的 Web 应用要考虑的问题很多，除了编写业务代码之外，还要考虑代码规范、预编译、压缩合并、打包上线等工作，需要有一套完整的解决方案来辅助我们快速开发，这就是 [React 脚手架](https://create-react-app.dev/)。React 脚手架零配置，开箱即用，让我们从繁杂的 Webpack 配置当中解脱出来，更关注于业务本身。

-   <font color=#e32d40>使用</font>

```bash
npx create-react-app my-app # 创建项目
yarn start # 启动项目
```

-   <font color=#e32d40>npx 和 Yarn</font>

npx 是 `npm@5.2.0` 引入的一条命令，目的是提升包内提供的命令行工具的使用体验，原来需要先安装全局的脚手架工具，在使用这个工具中提供的命令，现在无需安装全局的脚手架工具包，就可以直接使用这个包提供的命令，香！Yarn 是 Facebook 发布的包管理工具，具有安全、快速可靠的特点，可以看做是 npm 的替代品。

-   <font color=#e32d40>初始化文件说明</font>

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

-   <font color=#e32d40>如何在脚手架中渲染自己的界面</font>

1. 引入 React 核心库和涉及 DOM 操作的核心包

```js
import React from 'react'
import ReactDOM from 'react-dom'
```

2. 调用 `React.createElement()` 方法创建 React 元素

```js
const title = React.createElement('h1', null, 'Hello World')
```

3. 调用 `ReactDOM.render()` 方法渲染 React 元素到页面

```js
ReactDOM.render(title, document.querySelector('#root'))
```

## JSX 基础语法

-   <font color=#e32d40>为什么要有 JSX</font>

React.createElement() 的问题：繁琐/不简洁；不直观，无法一眼看出所描述的结构；不优雅，用户体验不爽！

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

-   <font color=#e32d40>JSX 是什么</font>

JSX 是 JavaScript XML 的简写，表示在 JavaScript 代码中写 XML（HTML） 格式的代码，优势：声明式语法更加直观，与 HTML 结构相同，降低了学习成本，提高了开发效率，JSX 是 React 的核心之一。

-   <font color=#e32d40>JSX 基本使用</font>

1. 使用 JSX 创建 React 元素

```js
const title = <h1>Hello JSX</h1>
```

2. 使用 `ReactDOM.render()` 方法渲染 React 元素到页面中

```js
ReactDOM.render(title, document.querySelector('#root'))
```

-   <font color=#e32d40>为什么 React 脚手架中可以直接使用 JSX</font>

1. JSX 并不是标准的 ECMAScript 语法，它是 ECMAScript 的语法扩展。

2. JSX 需要使用 Babel 编译处理后，才能在浏览器中使用。

3. `create-react-app` 脚手架中已经内置了该配置，无需手动再配。

4. 编译 JSX 语法的包为：[@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react)。

-   <font color=#e32d40>JSX 注意点</font>

1. 定义虚拟 DOM 时，不要写引号。

2. 样式类名使用 `className`。

3. 写行内样式，`<div style={{ color: 'red' }}>Hello</div>`。

4. 元素若没有子节点，可以使用单标签闭合，例如 `<span/>`。

5. 推荐使用小括号包裹 JSX，从而避免 JS 中[自动插入分号陷阱](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)。

6. 标签首字母，小写开头会被当做 HTML 中的同名标签，大写开头会被当做组件解析。

7. 只能有 1 个根节点，或者根节点是 `<></>`。

-   <font color=#e32d40>在 JSX 中使用表达式</font>
