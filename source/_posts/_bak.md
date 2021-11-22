---
title: bak
date: 2021-11-22 10:00:48
tags:
---

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
