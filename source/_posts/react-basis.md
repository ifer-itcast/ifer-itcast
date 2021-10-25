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

-   <font color=#e32d40>相比较于 Vue，React 尽可能的利用 JS 语言自身的能力来编写 UI，而不是通过造轮子增强 HTML 的功能</font>

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

2. 部分属性需要改成小驼峰的形式，例如 label 的 for 属性改为 `htmlFor`，colspan 改为 `colSpan`。

3. 元素若没有子节点，可以使用单标签闭合，例如 `<span/>`。

4. 推荐使用小括号包裹 JSX，从而避免 JS 中[自动插入分号陷阱](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)。

5. 只能有 1 个根节点，或者根节点是 `<></>`。

6. JSX 中不能直接使用对象，除非是行内样式（后续讲）。

-   <font color=#e32d40>在 JSX 中使用表达式</font>

1. **单大括号**中可以使用任意的 JSX 表达式，但 JS 对象是一个例外，一般只会出现在 style 属性中。

2. JSX 自身也是表达式。

3. 注意表达式和语句的区别。

[表达式和语句](https://zh.wikipedia.org/wiki/%E9%99%B3%E8%BF%B0%E5%BC%8F)，简单来说，表达式就是可以**产生结果**的式子，一般由变量或运算符组成，例如 `a`、`a + b`、`fn(1)`、`arr.map()` 等；语句是使用特定命令告诉计算机执行特定操作的句子，通常没有返回结果，例如 `if {}`、`for() {}`、`switch() {}` 等。

-   <font color=#e32d40>JSX 中的条件渲染</font>

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

-   <font color=#e32d40>JSX 中的列表渲染</font>

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

## 关于组件

组件就是页面中的一部分，是 React 的一等公民，使用 React 就是在用组件；组件的特点：可复用、独立、可组合；所谓组件化采用的就是分而治之的思想。

<font color=#909090>🧐 了解模块：JS 模块一般是向外提供特定功能的代码片段，通常来说是一个文件。</font>

-   <font color=#e32d40>创建组件的 2 种方式</font>

<font size=4>1. 函数式组件</font>

a，函数组件，又称简单组件或无状态组件（Hooks 之前没有自己的状态），使用 JS 的函数创建组件。

b，函数名称<font color=#e32d40>**必须以大写字母开头**</font>，函数组件<font color=#e32d40>**必须有返回值**</font>，表示该组件的结构，返回 null，则表示不渲染任何内容。

c，函数式组件中的 this 是 undefined，因为 babel 编译后的代码开启了严格模式，[Babel 试一试](https://www.babeljs.cn/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABAWQJ4GEC2AHAFASkQG8AoASACcBTKECpAHgAsBGAPkF_FQB1NB4fUBG_QG9yDAPSs2JAL5A&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Ces2015%2Creact%2Cstage-0&prettier=false&targets=&version=7.15.8&externalPlugins=)。

```jsx
import ReactDOM from 'react-dom'

function Hello() {
    return <div>这是第一个函数组件</div>
}
// const Hello = () => <h1>这是一个函数组件！</h1>;

// 把函数的名字作为标签名进行渲染
ReactDOM.render(<Hello />, document.getElementById('root'))
```

<font color=#909090>🧐 了解 `ReactDOM.render()` 解析函数式组件的过程：React 解析 `<Hello/>` 组件，发现是函数定义的，随后调用此函数，将返回的虚拟 DOM 转为真实 DOM，并渲染到页面中。</font>

<font size=4>2. 类式组件</font>

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

## 事件绑定

语法：`on + 事件名称 = 事件处理函数`，比如 `onClick = function(){}`

a，React 中使用的是合成事件，而不是原生的 DOM 事件（为了兼容性）

b，React 中的事件是通过事件委托的方式处理的（委托给组件内最外层元素，为了高效，v17 之后做了改动）

c，通过 `e` 可以拿到事件对象，例如 `e.target` 就是触发事件的那个 DOM 元素

类

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    handleClick() {
        console.log('Hello World')
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>click</button>
            </div>
        )
    }
}
```

函数

```jsx
import React from 'react'

export default function App() {
    const handleClick = () => {
        console.log('Hello World')
    }
    return (
        <div>
            <button onClick={handleClick}>click</button>
        </div>
    )
}
```

## 组件 State

组件被称为状态机，意思是通过更新组件的状态（state）就能达到更新对应界面的目的！状态（state）即数据，是组件内部的私有属性，<font color=#e32d40>**state 对应的值必须是一个对象**</font>。

> 需求：计数器（点击按钮加 1）

1. 定义 state

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            count: 0,
        }
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

state 的简写形式

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

<font color=#909090>🧐 思考 2 种定义形式的差异？</font>

2. 修改 state 中的数据（count）

<font color=#e32d40>错误写法：`this.state.count += 1`</font>，数据确实也会变，但不是响应式的！

<font color=#e32d40>正确写法：`this.setState({ count: this.state.count + 1 })`</font>

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        count: 0,
    }
    handleClick() {
        // 如果 handleClick 是被 App 的实例调用的，这里的 this 应该是组件实例
        // 但！这个方法并不是 App 的实例调用的，而是点击按钮的时候，被 React 内部直接调用的，而【直接调用】 class 中的方法，this 指向就是 undefined
        console.log(this)
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

<font color=#909090>🧐 了解什么叫【直接调用】？</font>

```js
class Person {
    say() {
        console.log(this) // undefined
    }
}
const p = new Person()
const temp = p.say
temp()
```

<font color=#909090>🧐 如何把 `say()` 中的 this 指向实例？</font>

```js
class Person {
    say = () => {
        console.log(this) // undefined
    }
}
const p = new Person()
const temp = p.say
temp()
```

<font color=#909090>🧐 类中赋值语句定义函数（箭头/普通）和直接定义函数的区别？</font>

```js
class Person {
    // 挂载到实例本身上的
    say1 = () => {
        console.log(this)
    }
    // 挂载到原型上的
    say2() {}
}
const p1 = new Person()
const p2 = new Person()
console.log(p1.say1 === p2.say1) // false
console.log(p1.say2 === p2.say2) // true
```

3. 修复 this 指向的问题

思路 1：通过赋值语句往实例上面添加一个箭头函数。

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        count: 0,
    }
    handleClick = () => {
        this.setState({
            count: this.state.count + 1,
        })
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

思路 2：`<button onClick={this.handleClick.bind(this)}>+1</button>`

思路 3：在 `constructor()` 构造函数中进行一次绑定

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    constructor() {
        super()
        // 1. 往实例自身上又挂载了一个 handleClick 函数
        // 2. 此函数是通过原型上 handleClick 函数生成的新函数
        // 3. 并把原型上 handleClick 函数中的 this 通过 bind 绑定为了 this，而这里构造函数中的 this 正是实例对象
        // 4. 其实点击的时候调用的是这个构造函数 handleClick，而这个构造函数中的 handleClick 又会去调用原型上的 handleClick
        this.handleClick = this.handleClick.bind(this)
    }
    state = {
        count: 0,
    }
    handleClick() {
        this.setState({
            count: this.state.count + 1,
        })
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

## 表单处理

[官方文档](https://zh-hans.reactjs.org/docs/forms.html#gatsby-focus-wrapper)

-   <font color=#e32d40>受控组件</font>

<font size=4>1. 概念</font>

受控不受控一般是针对表单来说的，所谓受控组件，**即对视图的操作会影响状态（数据），状态的变化又会反映到视图上**；非受控组件则是通过操作 DOM 的方式来获取数据。

<font size=4>2. 使用步骤</font>

a，在 state 中添加一个状态，作为表单元素的 value 值（数据影响视图）

b，给表单元素绑定 onChange 事件，将表单元素的值设置为 state 的值（视图影响数据）

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

<font size=4>3. 其他文本框演示</font>

富文本框（和文本框一样）

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        content: '',
    }
    handleChange = (e) => {
        this.setState({
            content: e.target.value,
        })
    }
    render() {
        return (
            <div>
                <textarea value={this.state.content} onChange={this.handleChange}></textarea>
            </div>
        )
    }
}
```

选择下拉框

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        frame: 'react',
    }
    handleChange = (e) => {
        this.setState({
            frame: e.target.value,
        })
    }
    render() {
        return (
            <div>
                <select value={this.state.frame} onChange={this.handleChange}>
                    <option value='vue'>Vue</option>
                    <option value='react'>React</option>
                    <option value='angular'>Angular</option>
                </select>
            </div>
        )
    }
}
```

<font color=E6A23C>**操作单选按钮和复选框时：注意区分 `e.target.checked` 和 `e.target.value` 的差异！**</font>

多个单选按钮，绑定的值可以是一个字符串。

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        isCheckedRadio: 'male',
    }
    handleChange = (e) => {
        this.setState({
            isCheckedRadio: e.target.value,
        })
    }
    render() {
        return (
            <div>
                <input id='male' type='radio' value='male' checked={this.state.isCheckedRadio === 'male'} onChange={this.handleChange} />
                <label htmlFor='male'>男</label>
                <input id='female' type='radio' value='female' checked={this.state.isCheckedRadio === 'female'} onChange={this.handleChange} />
                <label htmlFor='female'>女</label>
                <input id='unknow' type='radio' value='unknow' checked={this.state.isCheckedRadio === 'unknow'} onChange={this.handleChange} />
                <label htmlFor='unknow'>未知</label>
            </div>
        )
    }
}
```

多个复选框，绑定的值可以是一个数组。

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        isCheckedCheckbox: ['apple', 'orange'],
    }
    handleChange = (e) => {
        const isCheckedCheckbox = [...this.state.isCheckedCheckbox]
        /* if (e.target.checked) {
            // 选中状态，就把数据添加到数据
            isCheckedCheckbox.push(e.target.value)
        } else {
            // 非选中状态，就把数据从数组中删除
            const idx = isCheckedCheckbox.indexOf(e.target.value)
            isCheckedCheckbox.splice(idx, 1)
        } */
        const idx = isCheckedCheckbox.indexOf(e.target.value)
        if (idx === -1) {
            // 数组中没有找到，说明没有被选中，那就把数据添加到数组，进行选中的操作
            isCheckedCheckbox.push(e.target.value)
        } else {
            // 找到了，说明已被选中，通过删除数组中的数据取消选中
            isCheckedCheckbox.splice(idx, 1)
        }
        this.setState({
            isCheckedCheckbox,
        })
    }
    render() {
        return (
            <div>
                <input id='apple' type='checkbox' value='apple' checked={this.state.isCheckedCheckbox.includes('apple')} onChange={this.handleChange} />
                <label htmlFor='apple'>Apple</label>
                <input id='orange' type='checkbox' value='orange' checked={this.state.isCheckedCheckbox.includes('orange')} onChange={this.handleChange} />
                <label htmlFor='orange'>Orange</label>
            </div>
        )
    }
}
```

<font size=4>4. 多表单元素优化</font>

问题：每个表单元素都有一个单独的事件处理函数，这样太繁琐，期望使用一个事件处理程序同时处理多个表单元素

a，给表单元素添加 name 属性

b，根据表单类型来获取对应值

c，在 onChange 事件处理程序中通过 `[e.target.name]` 来修改对应的 state

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        username: '',
        content: '',
        frame: 'react',
        isCheckedRadio: 'male',
        isCheckedCheckbox: ['apple', 'orange'],
    }
    handleChange = (e) => {
        let v
        if (e.target.type === 'checkbox') {
            const isCheckedCheckbox = [...this.state.isCheckedCheckbox]
            const idx = isCheckedCheckbox.indexOf(e.target.value)
            if (idx === -1) {
                // 数组中没有找到，说明没有被选中，那就把数据添加到数组，进行选中的操作
                isCheckedCheckbox.push(e.target.value)
            } else {
                // 找到了，说明已被选中，通过删除数组中的数据取消选中
                isCheckedCheckbox.splice(idx, 1)
            }
            v = isCheckedCheckbox
        } else {
            v = e.target.value
        }
        console.log(v, 55555555)
        this.setState({
            [e.target.name]: v,
        })
    }
    render() {
        const { username, content, frame, isCheckedRadio, isCheckedCheckbox } = this.state
        console.log(isCheckedCheckbox, 8888)
        return (
            <ul>
                {/* 输入框 */}
                <li>
                    <input name='username' type='text' value={username} onChange={this.handleChange} />
                </li>
                {/* 富文本框 */}
                <li>
                    <textarea name='content' value={content} onChange={this.handleChange}></textarea>
                </li>
                {/* 下拉选择框 */}
                <li>
                    <select name='frame' value={frame} onChange={this.handleChange}>
                        <option value='vue'>Vue</option>
                        <option value='react'>React</option>
                        <option value='angular'>Angular</option>
                    </select>
                </li>
                {/* 单选按钮 */}
                <li>
                    <input name='isCheckedRadio' id='male' type='radio' value='male' checked={isCheckedRadio === 'male'} onChange={this.handleChange} />
                    <label htmlFor='male'>男</label>
                    <input name='isCheckedRadio' id='female' type='radio' value='female' checked={isCheckedRadio === 'female'} onChange={this.handleChange} />
                    <label htmlFor='female'>女</label>
                    <input name='isCheckedRadio' id='unknow' type='radio' value='unknow' checked={isCheckedRadio === 'unknow'} onChange={this.handleChange} />
                    <label htmlFor='unknow'>未知</label>
                </li>
                {/* 复选框 */}
                <li>
                    <input name='isCheckedCheckbox' id='apple' type='checkbox' value='apple' checked={isCheckedCheckbox.includes('apple')} onChange={this.handleChange} />
                    <label htmlFor='apple'>Apple</label>
                    <input name='isCheckedCheckbox' id='orange' type='checkbox' value='orange' checked={isCheckedCheckbox.includes('orange')} onChange={this.handleChange} />
                    <label htmlFor='orange'>Orange</label>
                </li>
            </ul>
        )
    }
}
```

-   <font color=#e32d40>非受控组件</font>

通过 Refs 获取到 DOM，然后拿到 DOM 里面的 value

**1. 字符串形式的 Ref，[性能不高](https://github.com/facebook/react/pull/8333#issuecomment-271648615)**

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    handleChange = () => {
        /* const input = document.getElementById('input')
        console.log(input.value) */
        console.log(this.refs.input.value)
    }
    render() {
        return (
            <div>
                <input id='input' ref='input' type='text' placeholder='输入内容' onChange={this.handleChange} />
            </div>
        )
    }
}
```

**2. 函数形式的 Ref**

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    handleChange = () => {
        console.log(this.input.value)
    }
    render() {
        return (
            <div>
                <input ref={(dom) => (this.input = dom)} type='text' placeholder='输入内容' onChange={this.handleChange} />
            </div>
        )
    }
}
```

[问题演示](https://react.docschina.org/docs/refs-and-the-dom.html)：新的时候会执行 2 次，第一次 dom 是 null，第 2 次才是 dom

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        isHappy: true,
    }
    handleChange = () => {
        console.log(this.input.value)
    }
    render() {
        return (
            <div>
                <h2 onClick={() => this.setState({ isHappy: !this.state.isHappy })}>{this.state.isHappy ? '出去玩' : '睡觉'}</h2>
                <input
                    ref={(dom) => {
                        console.log(dom)
                        this.input = dom
                    }}
                    type='text'
                    placeholder='输入内容'
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}
```

解决：将获取 ref 的回调提取到类的原型方法中

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        isHappy: true,
    }
    getInputDom = (dom) => {
        // 只会在初始化的时候触发一次
        this.input = dom
    }
    handleChange = () => {
        console.log(this.input.value)
    }
    render() {
        return (
            <div>
                <h2 onClick={() => this.setState({ isHappy: !this.state.isHappy })}>{this.state.isHappy ? '出去玩' : '睡觉'}</h2>
                <input ref={this.getInputDom} type='text' placeholder='输入内容' onChange={this.handleChange} />
            </div>
        )
    }
}
```

**3. `React.createRef()`**

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

**4. Ref 扩展**

获取**类**组件

```jsx
import React, { PureComponent, createRef } from 'react'

class Test extends PureComponent {
    state = {
        count: 0,
    }
    sayHello = () => {
        this.setState({ count: this.state.count + 1 })
    }
    render() {
        return <div>{this.state.count}</div>
    }
}

export default class App extends PureComponent {
    testCmpRef = createRef()
    render() {
        return (
            <div>
                <Test ref={this.testCmpRef} />
                {/* {console.log(this.testCmpRef)} */}
                {/* {setTimeout(() => {
                    // 通过 createRef() 获取 DOM/组件 是异步的，不能马上使用
                    console.log(this.testCmpRef)
                }, 1000)} */}
                {/* 所以不能直接 */}
                {/* <button onClick={this.testCmpRef.current.sayHello}>按钮</button> */}
                <button onClick={() => this.testCmpRef.current.sayHello()}>按钮</button>
            </div>
        )
    }
}
```

通过 `forwardRef()` 包裹子函数组件，可以在父组件中获取子函数组件中的 DOM/组件

```jsx
import React, { PureComponent, createRef, forwardRef } from 'react'

// #3: 用 forwardRef() 函数包裹函数式组件
const Test = forwardRef((props, ref) => {
    return (
        // #4: ref 给谁绑定，父组件的 this.testFnCmpDomRef 就是谁，次时代 ref.current 就代表当前的 div
        <div ref={ref} {...props}>
            {props.children}
        </div>
    )
})

export default class App extends PureComponent {
    // #1: 创建 ref（期望表示的是函数式组件内部的 DOM ref）
    testFnCmpDomRef = createRef()
    handleClick = () => {
        // #5: 父组件中使用 this.testFnCmpDomRef
        console.log(this.testFnCmpDomRef.current)
    }
    render() {
        return (
            <div>
                {/* #2: 交给函数式组件的包裹 forWardRef() 函数进行处理 */}
                <Test ref={this.testFnCmpDomRef}>Hello World</Test>
                <button onClick={this.handleClick}>按钮</button>
            </div>
        )
    }
}
```
