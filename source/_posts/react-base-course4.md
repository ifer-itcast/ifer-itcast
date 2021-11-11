---
title: 04_React 组件进阶
date: 2021-11-09 22:46:15
tags:
---

## 今日目标

✔ children 属性。

✔ props 校验。

✔ props 默认值。

✔ 生命周期与钩子函数。

<!-- more -->

## children 属性

### 目标

掌握 props 中 children 属性的用法。

### 内容

-   children 属性：表示该组件的子节点，只要组件有子节点，props 就有该属性。

-   children 属性与普通的 props 一样，值可以是任意值（文本、React 元素、组件，甚至是函数）。

### 代码

```jsx
function Hello(props) {
    return <div>该组件的子节点：{props.children}</div>
}
```

```jsx
;<Hello>我是子节点</Hello>
// children 是一个特殊的 prop，和上面等价，建议上面写法更加直观
;<Hello children='我是子节点' />
```

## props 校验

### 目标

校验接收的 props 的数据类型，增加组件的健壮性。

### 内容

对于组件来说，props 是外来的，无法保证组件使用者传入什么格式的数据，如果传入的数据格式不对，可能会导致组件内部报错，**而组件的使用者不能很明确的知道错误的原因**。

### 演示 props 校验的意义

`App.jsx`

```jsx
import React, { Component } from 'react'
import Test from './Test'

export default class App extends Component {
    render() {
        return (
            <div>
                <Test colors={'red'} />
            </div>
        )
    }
}
```

`Test.jsx`

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Test extends Component {
    render() {
        return (
            <ul>
                {this.props.colors.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        )
    }
}

Test.propTypes = {
    colors: PropTypes.array,
}
export default Test
```

<img src="/resource/images/ifer_error.png"/>

### props 的使用步骤

1.  安装 `prop-types` 包。

2.  使用 `组件名.propTypes = {}` 来给组件的 props 添加校验规则。

3.  校验规则通过 `PropTypes` 对象来指定。

### 总结

通过 props 校验的目的，能够增强组件的健壮性。

## 常见规则

### 目标

了解 React 组件常见的 props 校验规则。

### 内容

1. 常见类型：array、bool、func、number、object、string。

2. React 元素类型（JSX）：element。

3. 必填项：isRequired。

4. 特定结构的对象：shape({})。

```jsx
{
    // 常见类型
    fn1: PropTypes.func,
    // 必选
    fn2: PropTypes.func.isRequired,
    // 特定结构的对象
    obj: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    })
}
```

## props 默认值

### 目标

掌握给组件的 props 提供默认值。

### 内容

通过 `defaultProps` 可以给组件的 props 设置默认值，在未传入 props 的时候生效。

```jsx
import React, { Component } from 'react'
class Test extends Component {
    render() {
        return <div>{this.props.age}</div>
    }
}

Test.defaultProps = {
    age: 18,
}
export default Test

// 没有传入 pageSize 属性
;<Test />
```

更建议写法（利用 JS 自身的能力来完成）。

```jsx
import React, { Component } from 'react'
class Test extends Component {
    render() {
        const { age = 18 } = this.props
        return <div>{age}</div>
    }
}

export default Test
```

## 类的静态属性

### 目标

能够通过类的 static 语法简化 props 校验和默认值。

### 内容

-   实例成员: 通过实例调用的属性或者方法，叫做实例成员（属性或者方法）。

-   静态成员：通过类或者构造函数本身才能访问的属性或者方法。

```jsx
class Person {
    // 实例
    name = 'zs',
    // 静态
    static age = 18
    // 原型
    sayHi() {
        console.log('哈哈')
    }
}
```

简写

```jsx
import React, { Component } from 'react'
class Test extends Component {
    static defaultProps = {
        age: 18,
    }
    render() {
        return <div>{this.props.age}</div>
    }
}

export default Test
```

## 生命周期概述

### 目的

能够理解什么是组件的生命周期以及为什么需要研究组件的生命周期。

### 内容

-   生命周期：一个事物从创建到最后消亡经历的整个过程。

-   组件的生命周期：组件从被创建到挂载到页面中运行，再到组件不用时卸载的过程。

-   意义：组件的生命周期有助于理解组件的运行方式、完成更复杂的组件功能、分析组件错误原因等。

-   生命周期钩子函数的作用：为开发人员在不同阶段操作组件提供了时机。

-   <font color=e32d40>**只有类组件才有生命周期。**</font>

<img src="/resource/images/ifer_life2.png"/>

## 生命周期说明

### 目的

能够说出组件生命周期总共有几个阶段。

### 内容

[生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## 挂载阶段

### 目标

能够说出组件的挂载阶段的钩子函数以及执行时机。

### 内容

-   执行时机：组件创建时（页面加载时）。

-   执行顺序，constructor => render => componentDidMount。

| 钩子函数          | 触发时机                    | 作用                                       |
| ----------------- | --------------------------- | ------------------------------------------ |
| constructor       | 创建组件时，最先执行        | 1. 初始化 state 2. 创建 Ref 等             |
| render            | 每次组件渲染都会触发        | 渲染 UI（**注意： 不能调用 setState()** ） |
| componentDidMount | 组件挂载（完成 DOM 渲染）后 | 1. 发送网络请求 2.DOM 操作                 |

### 演示

### 小结

-   挂载阶段有几个钩子？

-   每一个阶段一般做什么事情？

## 更新阶段

### 目标

能够说出组件的更新阶段的钩子函数以及执行时机。

### 内容

-   执行时机：`setState()`、`forceUpdate()`、`New props`（父组件进行了 render）。

-   说明：以上三者任意一种变化，组件就会重新渲染。

-   执行顺序。

| 钩子函数           | 触发时机                    | 作用                                                     |
| ------------------ | --------------------------- | -------------------------------------------------------- |
| render             | 每次组件渲染都会触发        | 渲染 UI（与 挂载阶段 是同一个 render）                   |
| componentDidUpdate | 组件更新（完成 DOM 渲染）后 | DOM 操作，可以获取到更新后的 DOM 内容，不要调用 setState |

### 演示

### 小结

## 卸载阶段

### 目标

能够说出组件的销毁阶段的钩子函数以及执行时机。

### 内容

执行时机：组件从页面中消失。

| 钩子函数             | 触发时机                 | 作用                               |
| -------------------- | ------------------------ | ---------------------------------- |
| componentWillUnmount | 组件卸载（从页面中消失） | 执行清理工作（比如：清理定时器等） |

### 演示

定时器和解绑事件。

### 小结

## setState 更新数据的特点

### 目的

能够理解 setState 是"异步"的。

### 内容

-   setState 方法是异步的【这句话有毛病，暂且这么理解】。

-   当调用 setState 的时候，React 并不会马上修改 state （为什么，性能，如果是同步的则更新期间执行不了任何操作）。

-   而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来**合并**到 state 当中，然后再触发组件更新。

-   可以多次调用 setState() ，只会触发一次重新渲染。

```js
// 初始
state = { count: 1 }

// 更新
this.setState({
    count: this.state.count + 1,
})
// 输出
console.log(this.state.count) // 1
// 通过 DOM 也是不能马上获取的
```

解释合并

```js
this.setState({
    count: 1,
})
this.setState({
    count: 2,
})
this.setState({
    count: 1,
})
```

先排队，再把排队中的数据进行合并，最后执行 1 次 setState，所以并不需要担心多次进行 `setState` 会带来性能问题。

### 总结

-   好处：性能。

-   问题/现象：不能拿到立即拿到更新后的数据；多次进行 setState 会进行合并而不是累计。

## setState 推荐语法

### 目标

-   能够解决上面的两个问题/现象。

-   能够掌握 setState 箭头函数的语法。

-   掌握 setState 第二个参数的使用。

### 第一个问题

通过 setState 第二个参数可以立即拿到更新后的数据。

-   场景：在状态更新（页面完成重新渲染）后立即执行某个操作。

-   语法：`setState(updater[, callback])`。

```jsx
this.setState(
    (state) => ({}),
    () => {
        console.log('这个回调函数会在状态更新后立即执行')
    }
)
```

### 第二个问题

-   推荐：使用 `setState((preState) => {})` 语法。

-   参数 preState: React 会把上一个 `setState` 的结果传入这个函数。

```jsx
// 初始
state = { count: 1 }

// 更新
this.setState((preState) => {
    return {
        count: preState.count + 1,
    }
})

this.setState((preState) => {
    return {
        count: preState.count + 2,
    }
})

// 输出
console.log(this.state.count) // 依然是 1
```

**这种语法依旧是异步的，但是通过 preState 可以获取到最新的状态，适用于需要调用多次 setState 的情况。**

## 案例练习

```jsx
import React, { Component, createRef } from 'react'

export default class App extends Component {
    state = {
        showInput: false,
    }
    inputRef = createRef()
    handleClick = () => {
        this.setState({
            showInput: !this.state.showInput,
        })
        this.inputRef.current.focus()
    }
    render() {
        return (
            <div>
                <h1>我是根组件</h1>
                {this.state.showInput ? <input ref={this.inputRef} type='text' placeholder='请输入你的回复' /> : <button onClick={this.handleClick}>回复</button>}
            </div>
        )
    }
}
```

## setState 同步/异步

### 目标

能够说出 setState 到底是同步的还是异步。

### 内容

-   setState 本身并不是一个异步方法，其之所以会表现出一种异步的形式，是因为 React 框架本身的一个性能优化机制。

-   React 会将 setState 放到队列里面，并将多个 setState 中的数据合并为一个，也就是说，当执行 setState 的时候，并没有马上调用。

-   setState 如果是在 react 的生命周期中或者是合成事件处理函数中，表现出来是*异步的*。

-   setState 如果是在 setTimeout/setInterval 或者原生事件中，表现出来是*同步的*。

```jsx
// 另一种解决方式
handleClick = async () => {
    await this.setState({
        showInput: !this.state.showInput,
    })
    this.inputRef.current.focus()
}
```

### 总结

-   setState 是同步的方法，但是 react 为了性能优化，所以 setState 在 react 的事件中表现得像异步。

-   参考链接：https://zhuanlan.zhihu.com/p/158725289。

## B 站评论列表

持久化到本地

```jsx
import React, { Component } from 'react'
import Tabs from './components/Tabs'
import Form from './components/Form'
import List from './components/List'

export default class App extends Component {
    state = {
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
                time: new Date('2021-11-10 09:09:00').toLocaleString(),
                img: 'https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 1,
            },
            {
                id: 2,
                author: '周杰伦',
                comment: '听妈妈的话',
                time: new Date('2021-12-11 09:09:00').toLocaleString(),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 0,
            },
            {
                id: 3,
                author: '陈奕迅',
                comment: '十年',
                time: new Date('2021-10-11 10:09:00').toLocaleString(),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: -1,
            },
        ],
    }
    // 更新的时候存储到本地
    componentDidUpdate() {
        localStorage.setItem('list', JSON.stringify(this.state.list))
    }
    // 挂载完成从本地获取，并设置到 state 中
    componentDidMount() {
        const list = JSON.parse(localStorage.getItem('list')) || []
        this.setState({ list })
    }
    // 把 toLocaleString() 的操作放在了这里提前进行处理
    changeTab = (active) => {
        this.setState({
            active,
        })
    }
    addComment = (c) => {
        const comment = {
            id: Date.now(),
            author: 'ifer',
            comment: c,
            time: new Date().toLocaleString(),
            attitude: 0,
        }
        this.setState({
            list: [...this.state.list, comment],
        })
    }
    delComment = (id) => {
        this.setState({
            list: this.state.list.filter((item) => item.id !== id),
        })
    }
    changeAttitude = (id, attitude) => {
        this.setState({
            list: this.state.list.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        attitude,
                    }
                } else {
                    return item
                }
            }),
        })
    }
    render() {
        const { tabs, active, list } = this.state
        return (
            <div className='App'>
                <div className='comment-container'>
                    <div className='comment-head'>
                        <span>1 评论</span>
                    </div>
                    {/* tabs */}
                    <Tabs tabs={tabs} active={active} changeTab={this.changeTab} />
                    {/* form */}
                    <Form addComment={this.addComment} />
                    {/* list */}
                    <List list={list} active={active} delComment={this.delComment} changeAttitude={this.changeAttitude} />
                </div>
            </div>
        )
    }
}
```

## TODOLIST

### 模拟接口

`data.json`

```json
{
    "todos": [
        {
            "id": 1,
            "name": "死豆",
            "done": false
        },
        {
            "name": "打死豆豆",
            "done": true,
            "id": 4
        }
    ]
}
```

```bash
json-server data.json --port 8888
```

PUT 是全量修改，要把之前的那些数据带过去，不然会干掉

PATCH 是补丁，传什么修改什么

### 静态结构

[地址](https://github.com/tastejs/todomvc-app-template)

`App.jsx`

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <section className='todoapp'>
                <header className='header'>
                    <h1>todos</h1>
                    <input className='new-todo' placeholder='What needs to be done?' autoFocus />
                </header>
                <section className='main'>
                    <input id='toggle-all' className='toggle-all' type='checkbox' />
                    <label htmlFor='toggle-all'>Mark all as complete</label>
                    <ul className='todo-list'>
                        <li className='completed'>
                            <div className='view'>
                                <input className='toggle' type='checkbox' checked />
                                <label>Taste JavaScript</label>
                                <button className='destroy'></button>
                            </div>
                            <input className='edit' value='Create a TodoMVC template' />
                        </li>
                        <li>
                            <div className='view'>
                                <input className='toggle' type='checkbox' />
                                <label>Buy a unicorn</label>
                                <button className='destroy'></button>
                            </div>
                            <input className='edit' value='Rule the web' />
                        </li>
                    </ul>
                </section>
                <footer className='footer'>
                    <span className='todo-count'>
                        <strong>0</strong> item left
                    </span>
                    <ul className='filters'>
                        <li>
                            <a className='selected' href='#/'>
                                All
                            </a>
                        </li>
                        <li>
                            <a href='#/active'>Active</a>
                        </li>
                        <li>
                            <a href='#/completed'>Completed</a>
                        </li>
                    </ul>
                    <button className='clear-completed'>Clear completed</button>
                </footer>
            </section>
        )
    }
}
```

`styles/base.css`

```css
hr {
    margin: 20px 0;
    border: 0;
    border-top: 1px dashed #c5c5c5;
    border-bottom: 1px dashed #f7f7f7;
}

.learn a {
    font-weight: normal;
    text-decoration: none;
    color: #b83f45;
}

.learn a:hover {
    text-decoration: underline;
    color: #787e7e;
}

.learn h3,
.learn h4,
.learn h5 {
    margin: 10px 0;
    font-weight: 500;
    line-height: 1.2;
    color: #000;
}

.learn h3 {
    font-size: 24px;
}

.learn h4 {
    font-size: 18px;
}

.learn h5 {
    margin-bottom: 0;
    font-size: 14px;
}

.learn ul {
    padding: 0;
    margin: 0 0 30px 25px;
}

.learn li {
    line-height: 20px;
}

.learn p {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.3;
    margin-top: 0;
    margin-bottom: 0;
}

#issue-count {
    display: none;
}

.quote {
    border: none;
    margin: 20px 0 60px 0;
}

.quote p {
    font-style: italic;
}

.quote p:before {
    content: '“';
    font-size: 50px;
    opacity: 0.15;
    position: absolute;
    top: -20px;
    left: 3px;
}

.quote p:after {
    content: '”';
    font-size: 50px;
    opacity: 0.15;
    position: absolute;
    bottom: -42px;
    right: 3px;
}

.quote footer {
    position: absolute;
    bottom: -40px;
    right: 0;
}

.quote footer img {
    border-radius: 3px;
}

.quote footer a {
    margin-left: 5px;
    vertical-align: middle;
}

.speech-bubble {
    position: relative;
    padding: 10px;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 5px;
}

.speech-bubble:after {
    content: '';
    position: absolute;
    top: 100%;
    right: 30px;
    border: 13px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.04);
}

.learn-bar > .learn {
    position: absolute;
    width: 272px;
    top: 8px;
    left: -300px;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.6);
    transition-property: left;
    transition-duration: 500ms;
}

@media (min-width: 899px) {
    .learn-bar {
        width: auto;
        padding-left: 300px;
    }

    .learn-bar > .learn {
        left: 8px;
    }
}
```

`styles/index.css`

```css
html,
body {
    margin: 0;
    padding: 0;
}

button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #111111;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
}

.hidden {
    display: none;
}

.todoapp {
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
}

.todoapp input::-moz-placeholder {
    font-style: italic;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
}

.todoapp input::input-placeholder {
    font-style: italic;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
}

.todoapp h1 {
    position: absolute;
    top: -140px;
    width: 100%;
    font-size: 80px;
    font-weight: 200;
    text-align: center;
    color: #b83f45;
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.new-todo {
    padding: 16px 16px 16px 60px;
    height: 65px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
}

.toggle-all {
    width: 1px;
    height: 1px;
    border: none; /* Mobile Safari */
    opacity: 0;
    position: absolute;
    right: 100%;
    bottom: 100%;
}

.toggle-all + label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 65px;
    font-size: 0;
    position: absolute;
    top: -65px;
    left: -0;
}

.toggle-all + label:before {
    content: '❯';
    display: inline-block;
    font-size: 22px;
    color: #949494;
    padding: 10px 27px 10px 27px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
}

.toggle-all:checked + label:before {
    color: #484848;
}

.todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.todo-list li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
    border-bottom: none;
}

.todo-list li.editing {
    border-bottom: none;
    padding: 0;
}

.todo-list li.editing .edit {
    display: block;
    width: calc(100% - 43px);
    padding: 12px 16px;
    margin: 0 0 0 43px;
}

.todo-list li.editing .view {
    display: none;
}

.todo-list li .toggle {
    text-align: center;
    width: 40px;
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none; /* Mobile Safari */
    -webkit-appearance: none;
    appearance: none;
}

.todo-list li .toggle {
    opacity: 0;
}

.todo-list li .toggle + label {
    /*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center left;
}

.todo-list li .toggle:checked + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
}

.todo-list li label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
    font-weight: 400;
    color: #484848;
}

.todo-list li.completed label {
    color: #949494;
    text-decoration: line-through;
}

.todo-list li .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #949494;
    transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover,
.todo-list li .destroy:focus {
    color: #c18585;
}

.todo-list li .destroy:after {
    content: '×';
    display: block;
    height: 100%;
    line-height: 1.1;
}

.todo-list li:hover .destroy {
    display: block;
}

.todo-list li .edit {
    display: none;
}

.todo-list li.editing:last-child {
    margin-bottom: -1px;
}

.footer {
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    font-size: 15px;
    border-top: 1px solid #e6e6e6;
}

.footer:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
    float: left;
    text-align: left;
}

.todo-count strong {
    font-weight: 300;
}

.filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
}

.filters li {
    display: inline;
}

.filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
}

.filters li a:hover {
    border-color: #db7676;
}

.filters li a.selected {
    border-color: #ce4646;
}

.clear-completed,
html .clear-completed:active {
    float: right;
    position: relative;
    line-height: 19px;
    text-decoration: none;
    cursor: pointer;
}

.clear-completed:hover {
    text-decoration: underline;
}

.info {
    margin: 65px auto 0;
    color: #4d4d4d;
    font-size: 11px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
}

.info p {
    line-height: 1;
}

.info a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
}

.info a:hover {
    text-decoration: underline;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
    .toggle-all,
    .todo-list li .toggle {
        background: none;
    }

    .todo-list li .toggle {
        height: 40px;
    }
}

@media (max-width: 430px) {
    .footer {
        height: 50px;
    }

    .filters {
        bottom: 10px;
    }
}

:focus,
.toggle:focus + label,
.toggle-all:focus + label {
    box-shadow: 0 0 2px 2px #cf7d7d;
    outline: 0;
}
```

### 组件拆分

`App.jsx`

```jsx
import React, { Component } from 'react'
import TodoFooter from './components/TodoFooter'
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'

export default class App extends Component {
    render() {
        return (
            <section className='todoapp'>
                {/* TodoHeader */}
                <TodoHeader />
                {/* TodoMain */}
                <TodoMain />
                {/* TodoFooter */}
                <TodoFooter />
            </section>
        )
    }
}
```

### 请求数据并渲染

`App.jsx`

```jsx
import React, { Component } from 'react'
import TodoFooter from './components/TodoFooter'
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import axios from 'axios'
export default class App extends Component {
    state = {
        list: [],
    }
    async componentDidMount() {
        const res = await axios.get('http://localhost:8888/todos')
        this.setState({
            list: res.data,
        })
    }
    render() {
        const { list } = this.state
        return (
            <section className='todoapp'>
                {/* TodoHeader */}
                <TodoHeader />
                {/* TodoMain */}
                <TodoMain list={list} />
                {/* TodoFooter */}
                <TodoFooter />
            </section>
        )
    }
}
```

`components/TodoMain.jsx`

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoMain extends Component {
    static propTypes = {
        list: PropTypes.array,
    }
    render() {
        const { list } = this.props
        return (
            <section className='main'>
                <input id='toggle-all' className='toggle-all' type='checkbox' />
                <label htmlFor='toggle-all'>Mark all as complete</label>
                <ul className='todo-list'>
                    {list.map((item) => (
                        <li key={item.id} className={item.done ? 'completed' : ''}>
                            <div className='view'>
                                <input className='toggle' type='checkbox' checked={item.done} />
                                <label>{item.name}</label>
                                <button className='destroy'></button>
                            </div>
                            <input className='edit' value='Create a TodoMVC template' />
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}
```

### 添加功能

`App.jsx`

```jsx
import React, { Component } from 'react'
import TodoFooter from './components/TodoFooter'
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import axios from 'axios'
export default class App extends Component {
    state = {
        list: [],
    }
    async componentDidMount() {
        this.getTodoList()
    }
    getTodoList = async () => {
        const res = await axios.get('http://localhost:8888/todos')
        this.setState({
            list: res.data,
        })
    }
    render() {
        const { list } = this.state
        return (
            <section className='todoapp'>
                {/* TodoHeader */}
                <TodoHeader getTodoList={this.getTodoList} />
                {/* TodoMain */}
                <TodoMain list={list} />
                {/* TodoFooter */}
                <TodoFooter />
            </section>
        )
    }
}
```

`components/TodoHeader.jsx`

```jsx
import React, { Component } from 'react'
import axios from 'axios'

export default class TodoHeader extends Component {
    state = {
        todoName: '',
    }
    addTodo = async (e) => {
        if (e.keyCode === 13) {
            // 校验
            if (!this.state.todoName.trim()) return
            // 发送请求，添加
            await axios.post('http://localhost:8888/todos', {
                name: this.state.todoName,
                done: false,
            })
            this.setState({
                todoName: '',
            })
            this.props.getTodoList()
        }
    }
    render() {
        return (
            <header className='header'>
                <h1>todos</h1>
                <input
                    className='new-todo'
                    placeholder='What needs to be done?'
                    autoFocus
                    value={this.state.todoName}
                    onChange={(e) => this.setState({ todoName: e.target.value })}
                    onKeyUp={this.addTodo}
                />
            </header>
        )
    }
}
```

### 删除功能

`App.jsx`

```jsx
import React, { Component } from 'react'
import TodoFooter from './components/TodoFooter'
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import axios from 'axios'
export default class App extends Component {
    state = {
        list: [],
    }
    async componentDidMount() {
        this.getTodoList()
    }
    getTodoList = async () => {
        const res = await axios.get('http://localhost:8888/todos')
        this.setState({
            list: res.data,
        })
    }
    render() {
        const { list } = this.state
        return (
            <section className='todoapp'>
                {/* TodoHeader */}
                <TodoHeader getTodoList={this.getTodoList} />
                {/* TodoMain */}
                <TodoMain list={list} getTodoList={this.getTodoList} />
                {/* TodoFooter */}
                <TodoFooter />
            </section>
        )
    }
}
```

`components/TodoMain.jsx`

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class TodoMain extends Component {
    static propTypes = {
        list: PropTypes.array,
    }
    delTodo = async (id) => {
        await axios.delete(`http://localhost:8888/todos/${id}`)
        this.props.getTodoList()
    }
    render() {
        const { list } = this.props
        return (
            <section className='main'>
                <input id='toggle-all' className='toggle-all' type='checkbox' />
                <label htmlFor='toggle-all'>Mark all as complete</label>
                <ul className='todo-list'>
                    {list.map((item) => (
                        <li key={item.id} className={item.done ? 'completed' : ''}>
                            <div className='view'>
                                <input className='toggle' type='checkbox' checked={item.done} />
                                <label>{item.name}</label>
                                <button className='destroy' onClick={() => this.delTodo(item.id)}></button>
                            </div>
                            <input className='edit' value='Create a TodoMVC template' />
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}
```

### 选中功能

`components/TodoMain.jsx`

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class TodoMain extends Component {
    static propTypes = {
        list: PropTypes.array,
    }
    delTodo = async (id) => {
        await axios.delete(`http://localhost:8888/todos/${id}`)
        this.props.getTodoList()
    }

    changeDone = async ({ id, done }) => {
        await axios.patch(`http://localhost:8888/todos/${id}`, {
            done: !done,
        })
        this.props.getTodoList()
    }
    render() {
        const { list } = this.props
        return (
            <section className='main'>
                <input id='toggle-all' className='toggle-all' type='checkbox' />
                <label htmlFor='toggle-all'>Mark all as complete</label>
                <ul className='todo-list'>
                    {list.map((item) => (
                        <li key={item.id} className={item.done ? 'completed' : ''}>
                            <div className='view'>
                                <input className='toggle' type='checkbox' checked={item.done} onChange={() => this.changeDone(item)} />
                                <label>{item.name}</label>
                                <button className='destroy' onClick={() => this.delTodo(item.id)}></button>
                            </div>
                            {/* <input className='edit' value='Create a TodoMVC template' /> */}
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}
```

### 完整代码

`App.jsx`

```jsx
import React, { Component } from 'react'
import TodoFooter from './components/TodoFooter'
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import axios from 'axios'
export default class App extends Component {
    state = {
        list: [],
    }
    async componentDidMount() {
        this.getTodoList()
    }
    getTodoList = async () => {
        const res = await axios.get('http://localhost:8888/todos')
        this.setState({
            list: res.data,
        })
    }
    render() {
        const { list } = this.state
        return (
            <section className='todoapp'>
                {/* TodoHeader */}
                <TodoHeader getTodoList={this.getTodoList} />
                {/* TodoMain */}
                <TodoMain list={list} getTodoList={this.getTodoList} />
                {/* TodoFooter */}
                <TodoFooter />
            </section>
        )
    }
}
```

`components/TodoHeader.jsx`

```jsx
import React, { Component } from 'react'
import axios from 'axios'

export default class TodoHeader extends Component {
    state = {
        todoName: '',
    }
    addTodo = async (e) => {
        if (e.keyCode === 13) {
            // 校验
            if (!this.state.todoName.trim()) return
            // 发送请求，添加
            await axios.post('http://localhost:8888/todos', {
                name: this.state.todoName,
                done: false,
            })
            this.setState({
                todoName: '',
            })
            this.props.getTodoList()
        }
    }
    render() {
        return (
            <header className='header'>
                <h1>todos</h1>
                <input
                    className='new-todo'
                    placeholder='What needs to be done?'
                    autoFocus
                    value={this.state.todoName}
                    onChange={(e) => this.setState({ todoName: e.target.value })}
                    onKeyUp={this.addTodo}
                />
            </header>
        )
    }
}
```

`components/TodoMain.jsx`

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class TodoMain extends Component {
    static propTypes = {
        list: PropTypes.array,
    }
    delTodo = async (id) => {
        await axios.delete(`http://localhost:8888/todos/${id}`)
        this.props.getTodoList()
    }

    changeDone = async ({ id, done }) => {
        await axios.patch(`http://localhost:8888/todos/${id}`, {
            done: !done,
        })
        this.props.getTodoList()
    }
    render() {
        const { list } = this.props
        return (
            <section className='main'>
                <input id='toggle-all' className='toggle-all' type='checkbox' />
                <label htmlFor='toggle-all'>Mark all as complete</label>
                <ul className='todo-list'>
                    {list.map((item) => (
                        <li key={item.id} className={item.done ? 'completed' : ''}>
                            <div className='view'>
                                <input className='toggle' type='checkbox' checked={item.done} onChange={() => this.changeDone(item)} />
                                <label>{item.name}</label>
                                <button className='destroy' onClick={() => this.delTodo(item.id)}></button>
                            </div>
                            {/* <input className='edit' value='Create a TodoMVC template' /> */}
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}
```

`components/TodoFooter.jsx`

```jsx
import React, { Component } from 'react'

export default class TodoFooter extends Component {
    render() {
        return (
            <footer className='footer'>
                <span className='todo-count'>
                    <strong>0</strong> item left
                </span>
                <ul className='filters'>
                    <li>
                        <a className='selected' href='#/'>
                            All
                        </a>
                    </li>
                    <li>
                        <a href='#/active'>Active</a>
                    </li>
                    <li>
                        <a href='#/completed'>Completed</a>
                    </li>
                </ul>
                <button className='clear-completed'>Clear completed</button>
            </footer>
        )
    }
}
```
