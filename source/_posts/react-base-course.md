---
title: React 基础
date: 2021-11-05 23:08:54
tags:
---

## 阶段概述

## React 介绍

### 目标

了解 React 的基本概念。

### 是什么

[React](https://react.docschina.org/) 是一个用于<font color=#e32d40>**构建用户界面**</font>的 JavaScript 库。

### 扩展

-   框架背景

a，[React](https://react.docschina.org/) 起源于 Facebook(Meta) 的内部项目，后又用来架设 Instagram 网站，并用 2013 年 5 月开源。

b，Vue 主要是尤雨溪个人开源的渐进式 JavaScript 框架。

c，Angular 是 Google 公司的产品。

-   趋势

a，React 全球第一。

b，Vue 在国内较多，React 也慢慢多了。

c，Angular 在跨国公司使用较多。

[NPM 下载量](https://www.npmtrends.com/angular-vs-react-vs-vue)

### 小结

## React 特点

### 目标

了解 React 的特点。

### 介绍

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

-   <font color=#e32d40>相比较于 Vue，React 强调尽可能的利用 JS 语言自身的能力来编写 UI，而不是通过造轮子增强 HTML 的功能。</font>

### 小结

## 基本使用

### 目标

了解 React 在 HTML 页面中的使用。

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

3. 引入下面 2 个 JS 文件

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

## React 脚手架创建项目

### 目标

掌握使用 React 脚手架创建项目的方法。

### 意义

现代的 Web 应用要考虑的问题很多，除了编写业务代码之外，还要考虑代码规范、预编译、压缩合并、打包上线等工作，需要有一套完整的解决方案来辅助我们快速开发，这就是 [React 脚手架](https://create-react-app.dev/)。React 脚手架零配置，开箱即用，让我们从繁杂的 Webpack 配置当中解脱出来，更关注于业务本身。

### 使用

```bash
npx create-react-app my-app # 创建项目
yarn start # 启动项目
```

<font color=#909090>🧐 了解 npx 和 Yarn</font>

npx 是 `npm@5.2.0` 引入的一条命令，目的是提升命令行工具的使用体验，原来需要先安装全局的脚手架工具，再使用这个工具中提供的命令，现在无需安装全局的脚手架工具包，就可以直接使用这个包提供的命令，香。

Yarn 是 Facebook 发布的包管理工具，具有安全、快速可靠的特点，可以看做是 NPM 的替代品。

### 小结

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

### 启动原理

内部会使用 Webpack 通过解析入口文件中的代码，把把最终的结果打包到 `public/index.html` 文件中。

### 小结

我们平常写的代码会在哪个文件夹中进行？项目的入口文件是哪个？

## 如何在脚手架中渲染自己的界面

### 目标

掌握通过 React 渲染页面的基本步骤。

### 步骤

1. 引入 React 核心库和涉及 DOM 操作的包

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

### 小结

使用 React 和 ReactDOM 渲染页面的步骤是？

## 练习案例

### 目标

用脚手架工具创建一个名为 `react-demo` 的项目，并在页面上渲染如下 DOM 结构。

```html
<div>
    <h1>第一个react程序</h1>
    <p>react是用来构建用户界面的js库</p>
</div>
```

### 要点

```js
React.createElement('标签名', { 标签上的属性1：值1 }, 子元素1, 子元素2)
```

## JSX 基础语法

### 目标

了解 JSX 的定义和使用，了解它的工作过程。

### 为什么要有 JSX

`React.createElement()` 的问题：繁琐/不简洁；不直观，无法一眼看出所描述的结构；代码不容易维护！

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

JSX 是 JavaScript XML 的简写，表示在 JavaScript 代码中写 XML（HTML） 格式的代码，优势：声明式语法更加直观，与 HTML 结构相同，降低了学习成本，提高了开发效率，JSX 是 React 的核心之一。

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

🤔 换句话说，为什么 React 脚手架中可以直接使用 JSX？

1. JSX 并不是标准的 ECMAScript 语法，它是 ECMAScript 的语法扩展。

2. JSX 需要使用 Babel 编译处理后，才能在浏览器中使用。

3. `create-react-app` 脚手架中已经内置了该配置，无需手动再配。

4. 编译 JSX 语法的包为：[@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react)。

[在线体验地址](https://www.babeljs.cn/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=DwCwjAfAEgpgNnA9gAgFIGUAawD04JA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.16.2&externalPlugins=&assumptions=%7B%7D)

### 小结

1\. JSX 是什么的简写？

2\. JSX 相比较 React.createElement 的优势是什么？

3\. 为什么 React 脚手架中可以直接使用 JSX？

## JSX 注意点

TODO: 一个一个举例说明

### 目标

掌握 JSX 使用的注意点。

### 内容

1. 必须有 1 个根节点，或者虚拟根节点 `<></>`、`React.Fragment`。

2. 属性名一般是驼峰的写法且不能是 JS 中的关键字

例如 class 改成 className，例如 label 的 for 属性改为 `htmlFor`，colspan 改为 `colSpan`。

3. 元素若没有子节点，使用单标签时需要闭合，例如 `<span/>`。

4. JSX 中不能直接使用对象，除非是行内样式（后续讲）。

5. React16.8 之前先引入 React 才能使用 JSX

6. 换行建议使用 `()` 进行包裹

### 总结

## 在 JSX 中使用表达式

### 目标

### 内容

1. **单大括号**中可以使用任意的 JSX 表达式，但 JS 对象是一个例外，一般只会出现在 style 属性中。

2. JSX 自身也是表达式。

3. 注意表达式和语句的区别。

[表达式和语句](https://zh.wikipedia.org/wiki/%E9%99%B3%E8%BF%B0%E5%BC%8F)，简单来说，表达式就是可以**产生结果**的式子，一般由变量或运算符组成，例如 `a`、`a + b`、`fn(1)`、`arr.map()` 等；语句是使用特定命令告诉计算机执行特定操作的句子，通常没有返回结果，例如 `if {}`、`for() {}`、`switch() {}` 等。

### 总结

## JSX 中的条件渲染

### 目标

### 内容

可以根据不同的条件显示特定的 HTML 结构，需求：loading

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

## JSX 中的列表渲染

### 目标

1. 可以使用 `map()` 方法渲染一组数据。

2. 渲染列表的时候应该加 key，key 值要保证唯一，尽量避免使用索引号当做 key。

3. `map()` 遍历谁，就把 key 加在谁上。

```jsx
import ReactDOM from 'react-dom'

const list = [
    { id: 1, name: 'Vue' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Angular' },
]

const loadData = () => {
    return (
        <ul>
            {list.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    )
}

ReactDOM.render(loadData(), document.querySelector('#root'))
```

-   <font color=#e32d40>JSX 中的样式处理</font>

1. 类名使用 `className`，<font color=#e32d40>**推荐**</font>。

2. 行内样式，`<div style={{ color: 'red' }}>Hello</div>`。
