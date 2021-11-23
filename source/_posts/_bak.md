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

<!-- 第二天 -->

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
