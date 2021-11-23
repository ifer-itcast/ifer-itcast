---
title: bak
date: 2021-11-22 10:00:48
tags:
---

<!-- 第一天 -->

## 基本使用

### 目标

掌握 React 在 HTML 页面中的基本使用。

### 步骤

1. 新建文件夹并初始化包管理文件。

```bash
mkdir myreact && cd myreact
yarn init -y
```

2. 下载 `react` 和 `react-dom`。

```bash
yarn add react react-dom
```

3. 创建 `index.html` 并引入上面 2 个 JS 文件。

```html
<!-- React 核心依赖包 -->
<script src="./node_modules/react/umd/react.development.js"></script>
<!-- 用来将 React 元素渲染到 DOM 元素中 -->
<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
```

4. 创建 React 元素。

```js
// 元素名称、元素属性、元素子节点1、元素子节点2...
const title = React.createElement('h1', null, 'Hello World')
```

5. 渲染 React 元素到页面中。

```html
<div id="root"></div>
<script>
    // 渲染谁、渲染到哪里
    ReactDOM.render(title, document.querySelector('#root'))
</script>
```

### 小结

使用 React 一般需要哪 2 个包？

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

<!-- 第二天 -->

## 创建组件的 2 种方式

### 目标

掌握创建组件的 2 种方式：函数式组件和 class 组件。

### 示例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

const title = <h1>创建组件的两种方式</h1>

// 定义一个函数式组件
const Com1 = () => {
    return <div>第一个函数式组件</div>
}

// 定义一个类组件
class Com2 extends React.Component {
    render() {
        return <div>第一个类组件</div>
    }
}

const content = (
    <div>
        {title}
        {<Com1 />}
        <hr />
        {<Com2 />}
    </div>
)

ReactDOM.render(content, document.getElementById('root'))
```

### 小结

创建组件有几种方式，分别是什么？

## 点击计数

<p style="text-align: center;">需求：点击按钮让数字在原来数字的基础上进行 +1。</p>

<img src="/resource/images/ifer_calc.gif" class="highlight2"/>

### 目标

-   掌握事件绑定的基本应用。

-   掌握获取 state 中的数据以及如何修改数据。

### 步骤

1. 给按钮绑定点击事件。

2. 在事件回调里面获取原来的数据。

3. 通过 setState 进行修改数据。

### 实现

📝 需求：计数器（点击按钮加 1）

1. 定义 State

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    // 直接使用赋值语句
    state = {
        count: 0,
    }
    render() {
        return (
            <div>
                <h2>计数器：{this.state.count}</h2>
            </div>
        )
    }
}
```

2. 绑定点击事件

```jsx
class App extends Component {
    state = {
        count: 0,
    }
    handleClick() {
        // Cannot read properties of undefined (reading 'state')
        console.log(this.state.count)
    }
    render() {
        return (
            <div>
                <h2>计数器：{this.state.count}</h2>
                <button onClick={this.handleClick}>+1</button>
            </div>
        )
    }
}
```

<font color=909090>🧐 注意：this.handleClick 不要加括号，加括号表示立即调用，期望的是点击按钮的时候才调用。</font>

3. 分析原因

-   render 函数是被组件实例调用的（可以通过修改 render 函数的名字来观察到），因此 render 函数中的 this 指向当前组件实例，所以在 render 函数中通过 this 实例访问 state 和 handleClick 没有问题。

-   但！`<button onClick={this.handleClick}>+1</button>`，这样写，本质上是把 `this.handleClick` 这个方法赋值给了 onClick 这个属性，当点击按钮的时候，由 React 内部直接调用 onClick，那么 this 指向就是 undefined（class 的内部，开启了局部严格模式，所以 this 不会指向 window ）。

### 小结

render 函数中的 this 指向是什么？
