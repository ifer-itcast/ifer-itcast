---
title: React 组件
date: 2021-11-06 13:55:00
tags:
---

## 今日目标

-   掌握组件创建的两种方式。

-   掌握事件绑定以及 this 指向的问题。

-   掌握表单处理。

## React 组件介绍

### 目标

了解 React 组件的意义。

### 概念

组件就是页面中的一部分，是 React 的一等公民，使用 React 就是在用组件。所谓组件化采用的就是分而治之的思想来管理繁杂的页面开发。

<font color=#909090>🧐 了解模块：JS 模块一般是向外提供特定功能的代码片段，通常来说是一个文件。</font>

### 特点

可复用、独立、可组合。

### 分类

-   UI 组件（AntD）和业务组件（留言板）

-   普通组件（在一个组件中直接使用的组件）和路由组件（通过路由跳转访问到的组件）

## 创建组件的 2 种方式

### 目标

了解创建组件的 2 种方式：函数式组件和 class 组件。

### 示例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

const title = <h1>react的两种组件</h1>

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

### 简单对比

类组件比较繁琐，函数式组件比较简便，目前两者都有都有在用。

## 函数式组件

### 目标

掌握函数式组件的创建及注意点。

### 使用

a，函数组件，又称简单组件或无状态组件（Hooks 之前没有自己的状态），使用 JS 的函数创建组件。

b，函数名称<font color=#e32d40>**必须以大写字母开头**</font>，函数组件<font color=#e32d40>**必须有返回值**</font>，表示该组件的结构，返回 null，则表示不渲染任何内容。

c，函数式组件中的 this 是 undefined，因为 babel 编译后的代码开启了严格模式，[Babel 试一试](https://www.babeljs.cn/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABAWQJ4GEC2AHAFASkQG8AoASACcBTKECpAHgAsBGAPkF_FQB1NB4fUBG_QG9yDAPSs2JAL5A&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Ces2015%2Creact%2Cstage-0&prettier=false&targets=&version=7.15.8&externalPlugins=)。

```jsx
import ReactDOM from 'react-dom'

function Hello() {
    return <div>这是第一个函数组件</div>
}
// const Hello = () => <h1>这是一个函数组件！</h1>;

// 把函数的名字作为标签名进行渲染，可以使用单闭合，或双标签的形式
ReactDOM.render(<Hello />, document.getElementById('root'))
```

<font color=#909090>🧐 了解 `ReactDOM.render()` 解析函数式组件的过程：React 解析 `<Hello/>` 组件，发现是函数定义的，随后调用此函数，将返回的虚拟 DOM 转为真实 DOM，并渲染到页面中。</font>

### 小结

-   函数式组件本质是一个\_\_\_?

-   函数式组件可以使用箭头函数吗？

-   函数式组件的要求：函数名？返回值？

## 类组件

### 目标

掌握类组件的基本使用。

### 内容

a，使用 ES6 语法的 class 创建的组件，又称复杂组件或有状态组件。

b，类名称也必须要大写字母开头。

c，类组件应该继承 `React.Component` 父类，从而可以使用父类中提供的方法或者属性。

d，类组件必须提供 `render()` 方法，此方法中的 this 指向此组件的实例对象，此方法中必须要有 return 返回值。

```jsx
class Hello extends React.Component {
    render() {
        return <div>这是第一个类组件</div>
    }
}
ReactDOM.render(<Hello />, document.getElementById('root'))
```

<font color=#909090>🧐 了解 `ReactDOM.render()` 解析类式组件的过程：React 解析 `<Hello/>` 组件，发现是类组件，会自动的 new 出来该类的实例，并通过实例调用原型上的 `render()` 方法，将 `render()` 方法返回的虚拟 DOM 转为真实 DOM，并渲染到页面中。</font>

### 小结

1. class 组件的格式是：`class 类名 ___ from ____`?

2. 对类组件的名称要求是?

3. 类组件的内部必须提供 `____` 方法？

## 有状态组件和无状态组件

### 目标

理解状态的概念，理解有状态组件和无状态组件的概念。

### 关于状态

#### 概念

状态就是用来描述事物在某一时刻的的数据，例如：9 月 23 号时书的库存数量；18 岁时人的身高等。

#### 特点

状态能被改变，改变了之后视图会有对应的变化。

#### 作用

-   保存数据。

-   数据变化响应到视图（React 包内部的操作）。

### 有状态/无状态组件

有状态组件：能定义 state 的组件，类组件就是有状态组件。无状态组件：不能定义 state 的组件，函数组件一般叫做`无状态组件`。

<font color=909090>🧐 2019 年 02 月 06 日，rect 16.8 中引入了 React Hooks，从而函数式组件也能定义自己的状态了。</font>

### 无状态组件的应用场景

-   组件本身就不需要有状态，例如渲染一段固定的内容。

-   组件本身就没有状态，可以从外部传入。

### 小结

-   状态就是用来描述事物在某一时刻的的数据。

-   状态的特点: 能被修改，改了之后对应的视图也能更新。

-   函数组件是\_**\_组件，类组件是\_\_**组件

## 类组件的状态

### 目标

掌握 React 类组件中如何定义和渲染状态。

### 定义

```jsx
class App extends React.Component {
    state = {
        list: [
            { id: 1, name: '明天会更好' },
            { id: 2, name: '今天' },
        ],
    }
    // ...
}
```

### 使用

```jsx
class App extends React.Component {
    // ...
    render() {
        return (
            <>
                <h1>歌曲数量：{this.state.list.length}</h1>
                <ul>
                    {this.state.list.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </>
        )
    }
}
```

### 小结

## 事件绑定

### 目标

-   掌握 React 中如何进行事件绑定

-   掌握 React 中如何获取事件对象。

### 语法

```jsx
<元素 事件名1={事件处理函数1} 事件名2={事件处理函数2}></元素>
```

注意：React 事件名采用驼峰命名法，比如 onClick、onMouseEnter 等

### 类组件中事件绑定

```jsx
class App extends React.Component {
    render() {
        return (
            <button
                onClick={() => {
                    console.log('Hello World')
                }}
            >
                click
            </button>
        )
    }
}
```

也可以把事件处理函数进行提取

```jsx
class App extends React.Component {
    handleClick() {
        console.log('Hello World')
    }
    render() {
        return <button onClick={this.handleClick}>click</button>
    }
}
```

### 函数式组件中的事件绑定

```jsx
const App = () => {
    const handleClick = () => {
        console.log('Hello World')
    }
    return <button onClick={handleClick}>click</button>
}
```

### 获得事件对象

通过形参 `e` 可以拿到事件对象，例如 `e.target` 就是触发事件的那个 DOM 元素。

### 小结

## 点击计数

### 目标

了解事件处理程序中 this 指向异常并能知道原因

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

3. 分析原因

-   render 函数是被组件实例调用的，因此 render 函数中的 this 指向当前组件实例，所以在 render 函数中通过 this 实例访问 state 和 handleClick 没有问题。

-   但！this.handleClick 这个方法是点击按钮的时候，由 React 内部直接调用的，而【直接调用】 class 中的方法，this 指向就是 undefined（class 的内部，开启了局部严格模式 `use strict`，所以 this 不会指向 window ）

### 小结

## 解决 this 指向问题

### 目标

掌握常见的 this 指向问题的解决方案。

### 方法 1

包裹一层箭头函数

```jsx
class App extends Component {
    state = {
        count: 0,
    }
    handleClick() {
        console.log(this.state.count)
    }
    render() {
        return (
            <div>
                <h2>计数器：{this.state.count}</h2>
                <button onClick={() => this.handleClick()}>+1</button>
            </div>
        )
    }
}
```

### 方法 2

使用 bind

```jsx
class App extends Component {
    state = {
        count: 0,
    }
    handleClick() {
        console.log(this.state.count)
    }
    render() {
        return (
            <div>
                <h2>计数器：{this.state.count}</h2>
                <button onClick={this.handleClick.bind(this)}>+1</button>
            </div>
        )
    }
}
```

### 方法 3

通过赋值语句往实例上面添加一个箭头函数。

```jsx
class App extends Component {
    state = {
        count: 0,
    }
    handleClick = () => {
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

### 小结

你最喜欢哪一种？为什么

## 修改状态

### 目标

掌握 setState 修改状态的写法。

### 错误写法

```jsx
this.state.count += 1 // 数据确实也会变，但不是响应式的！
```

### 正确写法

-   语法：`this.setState({ 要修改的部分数据 })`。

-   作用：修改 state 并更新视图。

-   来源：setState 是通过继承而来的。

```jsx
this.setState({ count: this.state.count + 1 })
```

### 小结

## 状态的不可变性

### 目标

了解 React 的核心理念，状态的不可变性。

### 原因

TODO: xxx

### 错误写法

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
    state = {
        count: 0,
        list: [1, 2, 3],
        person: {
            name: 'jack',
            age: 18,
        },
    }
    changeCount = () => {
        this.state.count++
        this.setState({
            count: this.state.count,
        })
    }
    changeList = () => {
        this.state.list.push('Hello React')
        this.setState({
            list: this.state.list,
        })
    }
    changePerson = () => {
        this.state.person.name = 'ifer'
        this.state.person.age = 19
        this.setState({
            person: this.state.person,
        })
    }
    render() {
        return (
            <div>
                <h3>count</h3>
                <p>{this.state.count}</p>
                <button onClick={this.changeCount}>click</button>
                <hr />
                <h3>list</h3>
                <ul>
                    {this.state.list.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <button onClick={this.changeList}>click</button>
                <hr />
                <h3>person</h3>
                <p>
                    {this.state.person.name} {this.state.person.age}
                </p>
                <button onClick={this.changePerson}>click</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

### 正确写法

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
    state = {
        count: 0,
        list: [1, 2, 3],
        person: {
            name: 'jack',
            age: 18,
        },
    }
    changeCount = () => {
        this.setState({
            count: this.state.count + 1,
        })
    }
    changeList = () => {
        this.setState({
            list: [...this.state.list, 'Hello React'],
        })
    }
    changePerson = () => {
        this.setState({
            person: {
                ...this.state.person,
                name: 'ifer',
                age: 19,
            },
        })
    }
    render() {
        return (
            <div>
                <h3>count</h3>
                <p>{this.state.count}</p>
                <button onClick={this.changeCount}>click</button>
                <hr />
                <h3>list</h3>
                <ul>
                    {this.state.list.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <button onClick={this.changeList}>click</button>
                <hr />
                <h3>person</h3>
                <p>
                    {this.state.person.name} {this.state.person.age}
                </p>
                <button onClick={this.changePerson}>click</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

## 受控表单组件

### 目标

能够使用受控组件的方式获取文本框的值。

### 概念

受控不受控一般是针对表单来说的，所谓受控组件，即对视图的操作会影响状态（数据），状态的变化又会反映到视图上。

### 使用步骤

1. 在 state 中添加一个状态，作为表单元素的 value 值（数据影响视图）。

2. 给表单元素绑定 onChange 事件，将表单元素的值设置为 state 的值（视图影响数据）。

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        username: '',
    }
    handleChange = (e) => {
        this.setState({
            username: e.target.value,
        })
    }
    render() {
        return (
            <div>
                <input type='text' value={this.state.username} onChange={this.handleChange} />
            </div>
        )
    }
}
```

## 非受控表单组件

### 概念

非受控组件则是通过操作 DOM 的方式来获取数据，表单中的 value 并没有和 state 中的数据进行绑定。

### 内容

通过 React.createRef() 获取 DOM。

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    // Step1
    input = React.createRef()
    handleChange = () => {
        // Step3
        console.log(this.input.current.value)
    }
    render() {
        return (
            <div>
                {/* Step2 */}
                <input ref={this.input} type='text' placeholder='输入内容' onChange={this.handleChange} />
            </div>
        )
    }
}
```

## 综合案例 📝
