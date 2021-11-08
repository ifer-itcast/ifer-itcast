---
title: React 组件通信
date: 2021-11-07 11:04:13
tags:
---

## 今日目标

-   组件通讯的三种方式（父子、子父、兄弟）。

-   Context 组件通讯。

-   评论列表案例。

<!-- more -->

## 组件拆分到文件

### 目标

掌握抽取组件的方式。

### 原来

`src/index.js`

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
    render() {
        return <div>Hello React</div>
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

### 现在

`App.js`

```jsx
import { Component } from 'react'
// 导出
export default class App extends Component {
    render() {
        return <div>Hello React</div>
    }
}
```

`index.js`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
// 导入
import App from './App'

ReactDOM.render(<App />, document.querySelector('#root'))
```

### 要点

-   组件名采用大驼峰命名法。

-   组件文件名与组件名一致。

## 代码提示插件

ES7 React/Redux/GraphQL/React-Native snippets

## 组件通讯概述

-   组件是独立且封闭的单元，默认情况下，只能使用组件自己的数据。

-   在组件化过程中，我们将一个完整的功能拆分成多个组件，以更好的完成整个应用的功能。

-   而在这个过程中，多个组件之间不可避免的要共享某些数据。

-   为了实现这些功能，就需要打破组件的独立封闭性，让其与外界沟通，这个过程就是**组件通讯**。

## 父传子

### 目标

-   掌握父传子的套路。

### 内容

1. 父组件（使用组件的地方）通过属性提供要传递的数据。

```jsx
<App name='ifer' />
```

2. 子组件（定义组件的地方）通过 props 进行接收。

函数组件

```jsx
const App = (props) => {
    return <div>Hello {props.name}</div>
}

export default App
```

类组件

```jsx
import React from 'react'
export default class App extends React.Component {
    render() {
        return <div>接收到的数据：{this.props.name}</div>
    }
}
```

### 小结

-   父怎么给子传递数据？

## Props 的注意点

a，可以给组件传递任意类型的数据，例如数字、字符串、对象等。

b，Props 是只读的，不能修改。

c，使用类组件时，如果写了构造函数，应该在 constructor 中接收 props，并将 props 传递给 super，否则无法在构造函数中使用 this.props。

d，Props 的特殊属性：children。

```jsx
import React from 'react'
export default class App extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props === props)
    }
    render() {
        return <div>接收到的数据：{this.props.age}</div>
    }
}
```

### 小结

-   使用 props 的注意点是什么？

## 子传父

### 目标

掌握子传父的套路。

### 内容

a，父组件通过属性传递一个回调函数。

b，子组件调用传递过来的回调函数，并将要传递的数据作为回调函数的实参。

c，父组件在回调函数中通过形参接收传递过来的数据。

`App.jsx`

```jsx
import React from 'react'

class Hello extends React.Component {
    state = {
        childMsg: 'Hello World',
    }
    handleClick = () => {
        this.props.getMsg(this.state.childMsg)
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>点我，给父组件传递数据</button>
            </div>
        )
    }
}

export default class App extends React.Component {
    getChildMsg = (msg) => {
        console.log('接收到的子组件的数据：' + msg)
    }
    render() {
        return (
            <div>
                父组件
                <hr />
                <Hello getMsg={this.getChildMsg} />
            </div>
        )
    }
}
```

### 小结

子传父的流程是什么？

## TodoList

<img src="/resource/images/ifer_todo.png" width="500"/>

[体验地址](https://todomvc.com/)

### 静态界面

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="./base.css" />
        <link rel="stylesheet" href="./index.css" />
    </head>

    <body>
        <div class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input id="toggle-all" class="toggle-all" type="checkbox" />
                <label for="toggle-all"></label>
                <input class="new-todo" placeholder="输入任务名称-回车确认" autofocus />
            </header>
            <ul class="todo-list">
                <!-- 完成状态，li 上加 completed class，同时 input 加 checked 属性 -->
                <li class="completed">
                    <div class="view">
                        <input class="toggle" type="checkbox" checked />
                        <label>吃饭</label>
                        <button class="destroy"></button>
                    </div>
                    <input type="text" class="edit" />
                </li>
                <!-- 编辑状态，li 上增加 editing class -->
                <li class="editing">
                    <div class="view">
                        <input class="toggle" type="checkbox" />
                        <label>xxx</label>
                        <button class="destroy"></button>
                    </div>
                    <input type="text" class="edit" value="写代码" />
                </li>
                <!-- 正常状态，li 上没有 class，input 上也没有 checked 属性 -->
                <li>
                    <div class="view">
                        <input class="toggle" type="checkbox" />
                        <label>睡觉</label>
                        <button class="destroy"></button>
                    </div>
                    <input type="text" class="edit" />
                </li>
            </ul>
            <footer class="footer">
                <span class="todo-count">剩余<strong>1</strong></span>
                <ul class="filters">
                    <li>
                        <a class="selected" href="javascript:;">全部</a>
                    </li>
                    <li>
                        <a href="javascript:;">未完成</a>
                    </li>
                    <li>
                        <a href="javascript:;">已完成</a>
                    </li>
                </ul>
                <button class="clear-completed">清除已完成</button>
            </footer>
        </div>
    </body>
</html>
```

`base.css`

```css
/* base.css */
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

`index.css`

```css
/* index.css */
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

:focus {
    outline: 0;
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
    font-weight: 300;
    color: rgba(0, 0, 0, 0.4);
}

.todoapp input::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.4);
}

.todoapp input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.4);
}

.todoapp h1 {
    position: absolute;
    top: -140px;
    width: 100%;
    font-size: 80px;
    font-weight: 200;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
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
    width: 60px;
    height: 34px;
    font-size: 0;
    position: absolute;
    top: 12px;
    left: -13px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    z-index: 9999;
}

.toggle-all + label:before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
    color: #737373;
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
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center left;
}

.todo-list li .toggle:checked + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

.todo-list li label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
    font-weight: 400;
    color: #4d4d4d;
}

.todo-list li.completed label {
    color: #cdcdcd;
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
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
    color: #af5b5e;
}

.todo-list li .destroy:after {
    content: '×';
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
    border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
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
```
