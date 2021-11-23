---
title: 02_React 组件基础
date: 2021-11-06 13:55:00
tags:
---

## 今日目标

✔ 掌握组件创建的两种方式。

✔ 掌握定义和操作状态的方法。

✔ 掌握事件绑定以及 this 指向的问题。

✔ 掌握表单处理的两种方式。

✔ 完成带交互的 B 站评论列表案例。

<!-- more -->

## 组件介绍

### 目标

了解 React 组件的概念、特点、分类。

### 概念

组件就是页面中的一部分，是 React 的一等公民，使用 React 就是在用组件，而所谓的组件化开发就是采用分而治之的思想来管理繁杂的页面逻辑。

<img src="/resource/images/components.png" class="highlight2"/>

<font color=#909090>🧐 了解模块：JS 模块一般是向外提供特定功能的代码片段，通常来说是一个 JS 文件。</font>

### 特点

独立、可复用、可组合。

### 分类

-   功能：UI 组件（AntD）和业务组件（留言板）。

-   使用：普通组件（在一个组件中直接使用的组件）和路由组件（通过路由跳转访问到的组件）。

<img src="/resource/images/ifer_router.png"/>

### 小结

-   组件是什么？

-   组件的特点是什么？

-   组件的分类是什么？

## 函数式组件

### 目标

-   掌握函数式组件的创建及注意点。

-   了解 `ReactDOM.render()` 渲染函数式组件的过程。

### 内容

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

<font color=#909090>🧐 了解 `ReactDOM.render()` 解析函数式组件的过程：React 解析 `<Hello/>` 标签，发现是大写开头的会被当做组件进行解析，解析的时候又发现其是一个函数式组件，随后调用此函数，将返回的虚拟 DOM 转为真实 DOM，并渲染到页面中。</font>

### 小结

-   函数式组件本质是一个\_\_\_?

-   函数式组件的要求：函数名？

-   如果不需要有返回值，用什么表示？

-   `ReactDOM.render()` 解析函数式组件的过程是什么？

## 类组件

### 目标

-   掌握类组件的基本使用。

-   了解 ReactDOM.render 渲染类组件的过程。

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

<font color=#909090>🧐 了解 `ReactDOM.render()` 解析类式组件的过程：React 解析 `<Hello/>` 标签，发现是大写开头的会被当做组件进行解析，解析的时候又发现其是一个类组件，会自动的 new 出来该类的实例，并通过实例调用原型上的 `render()` 方法，将 `render()` 方法返回的虚拟 DOM 转为真实 DOM，并渲染到页面中。</font>

### 小结

1. class 组件的格式是：`class 类名 ___ from ____`?

2. 类组件的名称有什么要求?

3. 类组件的内部必须提供 `____` 方法？

4. `ReactDOM.render()` 解析类组件的过程是什么？

## 提取组件

### 目标

能够将 React 组件提取到独立的 JS 文件中。

### 内容

思考：项目中的组件多了之后，该如何组织这些组件呢？

-   选择 1：将所有组件放在同一个 JS 文件中。

-   选择 2：将每个组件放到单独的 JS 文件中。

### 实现

1. 创建 App.js，创建组件（函数 或 类）。

2. 在 App.js 中通过 export default 默认导出该组件。

3. 在 index.js 中通过 import 默认导入 App 组件。

4. 渲染组件。

### 代码

`App.jsx`

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return <div>Hello World</div>
    }
}
```

`index.js`

```js
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.querySelector('#root'))
```

### 小结

-   如何默认导出一个组件？

-   如何默认导入一个组件？

## 开发者工具

[极简插件](https://chrome.zzzmh.cn/)

## 组件的状态

### 目标

-   了解 React 中状态的概念、特点和作用。

-   了解什么是有状态组件和无状态组件。

### 关于状态

#### 概念

状态就是用来描述事物在某一时刻的的数据，例如：9 月 23 号时书的库存数量；18 岁时人的身高等。

#### 特点

状态能被改变，改变了之后视图会有对应的变化。

#### 作用

-   保存数据。

-   数据变化响应到视图（React 包内部的操作）。

### 有状态/无状态组件

-   有状态组件：能定义 state 的组件，类组件就是**有状态组件**。

-   无状态组件：不能定义 state 的组件，函数组件一般叫做**无状态组件**。

<font color=909090>🧐 2019 年 02 月 06 日，React v16.8 中引入了 React Hooks，从而函数式组件也能定义自己的状态了。</font>

### 无状态组件的应用场景

-   组件本身就不需要有状态，例如渲染一段静态的内容。

-   组件本身就没有状态，有可能只需要从外部传入的状态就够了。

### 小结

-   状态是什么？

-   React 中状态的特点是什么？

-   函数组件是\_\_组件，类组件是\_\_组件。

## 类组件的状态

### 目标

掌握 React 类组件中如何定义和使用状态。

### 定义

第一种方式：在 constructor 中通过 `this.state = {}`。

```jsx
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [
                { id: 1, name: '明天会更好' },
                { id: 2, name: '今天' },
            ],
        }
    }
}
```

第二种方式：通过 state 来定义状态，<font color=#e32d40>**state 对应的值必须是一个对象**</font>。

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

<font color=909090>🧐 思考两种方式的差异？</font>

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

-   定义组件的状态有哪两种方式？

-   `this.state` 对应的值必须是一个什么？

## 事件绑定

### 目标

-   掌握 React 中如何进行事件绑定。

-   掌握 React 中如何获取事件对象。

### 语法

```jsx
<元素 事件名1={事件处理函数1} 事件名2={事件处理函数2}></元素>
```

注意：React 事件名采用驼峰命名法，比如 onClick、onMouseEnter 等。

### 类组件中事件绑定

需求：点击按钮控制台打印 'Hello World'。

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

也可以把事件处理函数进行提取。

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

-   事件命名的规则是什么？

-   如何拿到事件对象？

## 点击计数

<p style="text-align: center;">需求：点击按钮让数字在原来数字的基础上进行 +1。</p>

<img src="/resource/images/ifer_calc.gif" class="highlight2"/>

### 目标

了解事件处理函数中的 this 指向问题。

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

## 解决 this 指向问题

### 目标

掌握常见的 this 指向问题的解决方案。

### 方法 1

高阶函数：通过 this 来直接**调用** handleClick 并返回箭头函数。

<font color=909090>🧐 柯里化：通过函数调用继续返回函数的形式，实现多次接收参数最后统一处理的函数编码形式。</font>

```jsx
class App extends React.Component {
    state = {
        count: 0,
    }
    handleClick() {
        // 这里的 this 指向是什么？那就看是谁调用的！
        return () => {
            console.log(this.state.count)
        }
    }
    render() {
        return (
            <div>
                <h2>计数器：{this.state.count}</h2>
                <button onClick={this.handleClick()}>+1</button>
            </div>
        )
    }
}
```

### 方法 2

<font color=e32d40>包裹一层箭头函数。</font>

箭头函数中的 this 指向“外部”，即 render 函数，而 render 函数中的 this 正是组件实例。

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

### 方法 3

<font color=e32d40>使用 bind。</font>

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

### 扩展

🤔 关于 class 中的实例方法和原型方法？

原型方法演示

```js
class App {
    handleClick() {}
}

const app1 = new App()
const app2 = new App()
// 通过打印也能发现 handleClick 确实是挂载到原型上的
console.log(app1)
// 每一个实例访问到的都是挂载到原型上的方法，所以等价
console.log(app1.handleClick === app2.handleClick)
```

实例方法演示

```js
class App {
    handleClick = () => {}
}

const app1 = new App()
const app2 = new App()
// 通过打印也能发现 handleClick 确实是挂载到实例上的
console.log(app1)
// 每一个实例访问到的都是挂载到自己上的方法，所以不等价
console.log(app1.handleClick === app2.handleClick)
```

所以，要明白在 class 中直接写的方法和通过赋值语句添加的方法本质上不一样。

<font color=e32d40>**注意：在 constructor 中挂载的方法也是实例方法。**</font>

### 方法 4

<font color=e32d40>通过赋值语句往**实例**上面添加一个箭头函数。</font>

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

证明“外层” this 确实是组件实例

```jsx
class App {
    temp = this
}

const app = new App()
console.log(app === app.temp)
```

### 方法 5

<font color=d32e40>在构造函数中再创建一个实例方法，和原型方法公用一个函数体。</font>

```jsx
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            count: 0,
        }
        // 1. 往实例自身上又挂载了一个 handleClick 函数
        // 2. 此函数的函数体是通过原型上 handleClick 函数生成的新函数
        // 3. 并把原型上 handleClick 函数中的 this 通过 bind 绑定为了 this，而这里构造函数中的 this 正是实例对象
        // 4. 其实点击的时候调用的是这个构造函数 handleClick（就近原则），而这个构造函数中的 handleClick 执行的是原型上的 handleClick 的函数体
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
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

掌握通过 setState 修改状态的写法。

### 错误写法

```jsx
this.state.count += 1 // 数据确实也会变，但不是响应式的！
```

### 内容

-   语法：`this.setState({ 要修改的部分数据 })`。

-   作用：修改 state 并更新视图。

-   来源：`setState()` 函数是通过继承而来的。

-   注意：`setState()` 的操作是合并，不会影响没有操作到的数据。

```jsx
this.setState({ count: this.state.count + 1 })
```

### 小结

通过哪个方法来修改 state 中的数据？

## 状态的不可变性

### 目标

了解 React 的核心理念，状态的不可变性。

### 解释

也就是说不要<font color=e32d40>**直接修改**</font>原数据，而是要<font color=e32d40>**产生一份新数据**</font>，然后通过 `setState()` 用新的数据覆盖原数据，这么做的其中一个重要原因就是为了 SCU（shouldComponentUpdate），为了性能优化。

### 不建议写法

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
        // 不要上面的写法，即便通过下面的操作也能做到更新视图
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

### 建议写法

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

能够使用受控组件的方式收集到表单中的数据。

<img src="/resource/images/ifer_form.png" class="highlight2"/>

### 概念

受控不受控一般是针对表单来说的，所谓受控表单组件，即表单元素的 value 值受到了 React 中 state 的控制（对 state 的操作会影响视图，视图的变化又会反映到 state 上）。

### input

1. 在 state 中添加一个状态，作为表单元素的 value 值（数据影响视图）。

2. 给表单元素绑定 onChange 事件，将表单元素的值设置为 state 的值（视图影响数据）。

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        username: '',
    }
    changeText = (e) => {
        this.setState({
            username: e.target.value,
        })
    }
    render() {
        const { username } = this.state
        return (
            <ul>
                <li>
                    <label htmlFor='username'>用户名</label>
                    <input id='username' type='text' value={username} onChange={this.changeText} />
                </li>
            </ul>
        )
    }
}
```

### textarea

操作方式和 input 框一样。

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        content: '',
    }
    changeTextArea = (e) => {
        this.setState({
            content: e.target.value,
        })
    }
    render() {
        const { content } = this.state
        return (
            <ul>
                {/* ... */}
                <li>
                    <label htmlFor='content'>其他信息</label>
                    <textarea id='content' cols='30' rows='10' value={content} onChange={this.changeTextArea}></textarea>
                </li>
            </ul>
        )
    }
}
```

### select

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        frame: 'react',
    }
    changeOption = (e) => {
        this.setState({
            frame: e.target.value,
        })
    }
    render() {
        const { frame } = this.state
        return (
            <ul>
                {/* ... */}
                <li>
                    <label htmlFor='frame'>框架</label>
                    <select id='frame' value={frame} onChange={this.changeOption}>
                        <option value='vue'>Vue</option>
                        <option value='react'>React</option>
                        <option value='angular'>Angular</option>
                    </select>
                </li>
            </ul>
        )
    }
}
```

### radio

多个单选按钮，绑定的值可以是一个字符串。

```jsx
export default class App extends React.Component {
    state = {
        checkedRadio: 'male',
    }
    changeRadio = (e) => {
        this.setState({
            checkedRadio: e.target.value,
        })
    }
    render() {
        const { checkedRadio } = this.state
        return (
            <ul>
                {/* ... */}
                <li>
                    <input id='male' type='radio' value='male' checked={checkedRadio === 'male'} onChange={this.changeRadio} />
                    <label htmlFor='male'>男</label>
                    <input id='female' type='radio' value='female' checked={checkedRadio === 'female'} onChange={this.changeRadio} />
                    <label htmlFor='female'>女</label>
                    <input id='unknow' type='radio' value='unknow' checked={checkedRadio === 'unknow'} onChange={this.changeRadio} />
                    <label htmlFor='unknow'>未知</label>
                </li>
            </ul>
        )
    }
}
```

### checkbox

绑定的值可以是一个数组。

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        username: '',
        content: '',
        frame: 'react',
        checkedRadio: 'male',
        checkedFruit: ['apple'],
    }
    changeText = (e) => {
        this.setState({
            username: e.target.value,
        })
    }
    changeTextArea = (e) => {
        this.setState({
            content: e.target.value,
        })
    }
    changeOption = (e) => {
        this.setState({
            frame: e.target.value,
        })
    }
    changeRadio = (e) => {
        this.setState({
            checkedRadio: e.target.value,
        })
    }
    changeCheckBox = (e) => {
        const checkedFruit = [...this.state.checkedFruit]
        const idx = checkedFruit.indexOf(e.target.value)
        if (idx === -1) {
            // 数组中没有找到，说明没有被选中，那就把数据添加到数组，进行选中的操作
            checkedFruit.push(e.target.value)
        } else {
            // 找到了，说明已被选中，通过删除数组中的数据取消选中
            checkedFruit.splice(idx, 1)
        }
        this.setState({
            checkedFruit,
        })
    }
    render() {
        const { username, content, frame, checkedRadio, checkedFruit } = this.state
        return (
            <ul>
                <li>
                    <label htmlFor='username'>用户名</label>
                    <input id='username' type='text' value={username} onChange={this.changeText} />
                </li>
                <li>
                    <label htmlFor='content'>其他信息</label>
                    <textarea id='content' cols='30' rows='10' value={content} onChange={this.changeTextArea}></textarea>
                </li>
                <li>
                    <label htmlFor='frame'>框架</label>
                    <select id='frame' value={frame} onChange={this.changeOption}>
                        <option value='vue'>Vue</option>
                        <option value='react'>React</option>
                        <option value='angular'>Angular</option>
                    </select>
                </li>
                <li>
                    <input id='male' type='radio' value='male' checked={checkedRadio === 'male'} onChange={this.changeRadio} />
                    <label htmlFor='male'>男</label>
                    <input id='female' type='radio' value='female' checked={checkedRadio === 'female'} onChange={this.changeRadio} />
                    <label htmlFor='female'>女</label>
                    <input id='unknow' type='radio' value='unknow' checked={checkedRadio === 'unknow'} onChange={this.changeRadio} />
                    <label htmlFor='unknow'>未知</label>
                </li>
                <li>
                    <input id='apple' type='checkbox' value='apple' checked={checkedFruit.includes('apple')} onChange={this.changeCheckBox} />
                    <label htmlFor='apple'>Apple</label>
                    <input id='orange' type='checkbox' value='orange' checked={checkedFruit.includes('orange')} onChange={this.changeCheckBox} />
                    <label htmlFor='orange'>Orange</label>
                </li>
            </ul>
        )
    }
}
```

### 完整代码

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        username: '',
        content: '',
        frame: 'react',
        checkedRadio: 'male',
        checkedFruit: ['apple'],
    }
    changeText = (e) => {
        this.setState({
            username: e.target.value,
        })
    }
    changeTextArea = (e) => {
        this.setState({
            content: e.target.value,
        })
    }
    changeOption = (e) => {
        this.setState({
            frame: e.target.value,
        })
    }
    changeRadio = (e) => {
        this.setState({
            checkedRadio: e.target.value,
        })
    }
    changeCheckBox = (e) => {
        const checkedFruit = [...this.state.checkedFruit]
        const idx = checkedFruit.indexOf(e.target.value)
        if (idx === -1) {
            // 数组中没有找到，说明没有被选中，那就把数据添加到数组，进行选中的操作
            checkedFruit.push(e.target.value)
        } else {
            // 找到了，说明已被选中，通过删除数组中的数据取消选中
            checkedFruit.splice(idx, 1)
        }
        this.setState({
            checkedFruit,
        })
    }
    render() {
        const { username, content, frame, checkedRadio, checkedFruit } = this.state
        return (
            <ul>
                <li>
                    <label htmlFor='username'>用户名</label>
                    <input id='username' type='text' value={username} onChange={this.changeText} />
                </li>
                <li>
                    <label htmlFor='content'>其他信息</label>
                    <textarea id='content' cols='30' rows='10' value={content} onChange={this.changeTextArea}></textarea>
                </li>
                <li>
                    <label htmlFor='frame'>框架</label>
                    <select id='frame' value={frame} onChange={this.changeOption}>
                        <option value='vue'>Vue</option>
                        <option value='react'>React</option>
                        <option value='angular'>Angular</option>
                    </select>
                </li>
                <li>
                    <input id='male' type='radio' value='male' checked={checkedRadio === 'male'} onChange={this.changeRadio} />
                    <label htmlFor='male'>男</label>
                    <input id='female' type='radio' value='female' checked={checkedRadio === 'female'} onChange={this.changeRadio} />
                    <label htmlFor='female'>女</label>
                    <input id='unknow' type='radio' value='unknow' checked={checkedRadio === 'unknow'} onChange={this.changeRadio} />
                    <label htmlFor='unknow'>未知</label>
                </li>
                <li>
                    <input id='apple' type='checkbox' value='apple' checked={checkedFruit.includes('apple')} onChange={this.changeCheckBox} />
                    <label htmlFor='apple'>Apple</label>
                    <input id='orange' type='checkbox' value='orange' checked={checkedFruit.includes('orange')} onChange={this.changeCheckBox} />
                    <label htmlFor='orange'>Orange</label>
                </li>
            </ul>
        )
    }
}
```

### 简化代码

1. 添加 name。

2. 把 key 都替换成 `e.target.name`。

3. 观察规律，提取成一个 handleChange 函数。

4. 根据 `e.target.type` 做出判断。

5. 继续精简。

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        username: '',
        content: '',
        frame: 'react',
        checkedRadio: 'male',
        checkedFruit: ['apple'],
    }
    handleChange = (e) => {
        let v
        if (e.target.type === 'checkbox') {
            const checkedFruit = [...this.state.checkedFruit]
            const idx = checkedFruit.indexOf(e.target.value)
            idx === -1 ? checkedFruit.push(e.target.value) : checkedFruit.splice(idx, 1)
            v = checkedFruit
        } else {
            v = e.target.value
        }
        this.setState({
            [e.target.name]: v,
        })
    }
    render() {
        const { username, content, frame, checkedRadio, checkedFruit } = this.state
        return (
            <ul>
                <li>
                    <label htmlFor='username'>用户名</label>
                    <input id='username' name='username' type='text' value={username} onChange={this.handleChange} />
                </li>
                <li>
                    <label htmlFor='content'>其他信息</label>
                    <textarea id='content' name='content' cols='30' rows='10' value={content} onChange={this.handleChange}></textarea>
                </li>
                <li>
                    <label htmlFor='frame'>框架</label>
                    <select id='frame' name='frame' value={frame} onChange={this.handleChange}>
                        <option value='vue'>Vue</option>
                        <option value='react'>React</option>
                        <option value='angular'>Angular</option>
                    </select>
                </li>
                <li>
                    <input id='male' name='checkedRadio' type='radio' value='male' checked={checkedRadio === 'male'} onChange={this.handleChange} />
                    <label htmlFor='male'>男</label>
                    <input id='female' name='checkedRadio' type='radio' value='female' checked={checkedRadio === 'female'} onChange={this.handleChange} />
                    <label htmlFor='female'>女</label>
                    <input id='unknow' name='checkedRadio' type='radio' value='unknow' checked={checkedRadio === 'unknow'} onChange={this.handleChange} />
                    <label htmlFor='unknow'>未知</label>
                </li>
                <li>
                    <input id='apple' name='checkedFruit' type='checkbox' value='apple' checked={checkedFruit.includes('apple')} onChange={this.handleChange} />
                    <label htmlFor='apple'>Apple</label>
                    <input id='orange' name='checkedFruit' type='checkbox' value='orange' checked={checkedFruit.includes('orange')} onChange={this.handleChange} />
                    <label htmlFor='orange'>Orange</label>
                </li>
            </ul>
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

### 目标

完成带交互的 B 站评论列表案例。

<img src="/resource/images/ifer_list3.png"/>

### 整合数据和视图

把昨天 B 站评论列表的最终代码改造成一个 class 组件的形式来渲染。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import avatar from './images/avatar.png'

class App extends React.Component {
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
    render() {
        const { state } = this
        return (
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
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

### Tab 栏切换功能

1. 给 Tab 栏注册点击事件。

```jsx
<ul className='sort-container'>
    {state.tabs.map((item) => (
        <li className={item.type === state.active ? 'on' : ''} key={item.id} onClick={() => this.changeTab(item.type)}>
            按{item.name}排序
        </li>
    ))}
</ul>
```

另外一种传递参数的写法（changeTab 的最后一个形参就是事件对象），[官方文档](https://react.docschina.org/docs/handling-events.html)。

```jsx
<ul className='sort-container'>
    {state.tabs.map((item) => (
        <li className={item.type === state.active ? 'on' : ''} key={item.id} onClick={this.changeTab.bind(this, item.type)}>
            按{item.name}排序
        </li>
    ))}
</ul>
```

2. 修改 active 进行切换。

```jsx
changeTab(type) {
    this.setState({
        active: type,
    })
}
```

### 删除评论

1. 给删除按钮注册点击事件。

```jsx
<span className='reply btn-hover' onClick={() => this.delItem(item.id)}>
    删除
</span>
```

2. 通过 setState 删除对应的数据。

```jsx
delItem(id) {
    this.setState({
        list: this.state.list.filter((item) => item.id !== id),
    })
}
```

3. 暂无评论。

```jsx
class App extends React.Component {
    render() {
        const { state } = this
        return (
            <div className='App'>
                <div className='comment-container'>{state.list.length > 0 ? <div className='comment-list'>{/* ... */}</div> : <div>暂无更多评论~</div>}</div>
            </div>
        )
    }
}
```

4. 把三元判断抽离为 `renderList` 函数。

### 添加评论

1. 通过受控组件的方式获取到评论内容。

```js
state = {
    content: '',
}
```

```jsx
<textarea value={this.state.content} onChange={this.handleChange}></textarea>
```

```jsx
handleChange = (e) => {
    this.setState({
        content: e.target.value,
    })
}
```

2. 通过 setState 添加评论并重置输入的内容。

```js
addItem = () => {
    const newComment = {
        id: Date.now(),
        author: '作者',
        comment: this.state.content,
        time: new Date(),
        attitude: 0,
    }
    this.setState({
        list: [newComment, ...this.state.list],
        content: '',
    })
}
```

3. 时间处理。

```bash
yarn add moment
```

```jsx
import moment from 'moment'

class App extends React.Component {
    formatTime(time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
    addItem = () => {
        const newComment = {
            time: this.formatTime(new Date()),
        }
    }
}
```

### 点赞与踩

1. 注册点击事件

```jsx
<div className='info'>
    <span className='time'>{item.time}</span>
    <span className={item.attitude === 1 ? 'like liked' : 'like'} onClick={() => this.changeAttitude(item.id, item.attitude === 1 ? 0 : 1)}>
        <i className='icon'></i>
    </span>
    <span className={item.attitude === -1 ? 'hate hated' : 'hate'} onClick={() => this.changeAttitude(item.id, item.attitude === -1 ? 0 : -1)}>
        <i className='icon'></i>
    </span>
</div>
```

2. 修改点赞状态

```jsx
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
```

### 完整代码

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import './index.css'
import avatar from './images/avatar.png'

class App extends React.Component {
    state = {
        content: '',
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
    changeTab(type) {
        this.setState({
            active: type,
        })
    }
    delItem(id) {
        this.setState({
            list: this.state.list.filter((item) => item.id !== id),
        })
    }
    handleChange = (e) => {
        this.setState({
            content: e.target.value,
        })
    }
    formatTime(time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
    addItem = () => {
        const newComment = {
            id: Date.now(),
            author: '作者',
            comment: this.state.content,
            time: this.formatTime(new Date()),
            attitude: 0,
        }
        this.setState({
            list: [newComment, ...this.state.list],
            content: '',
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
    renderList() {
        return this.state.list.length > 0 ? (
            <div className='comment-list'>
                {this.state.list.map((item) => (
                    <div className='list-item' key={item.id}>
                        <div className='user-face'>
                            <img className='user-head' src={item.img} alt='' />
                        </div>
                        <div className='comment'>
                            <div className='user'>{item.author}</div>
                            <p className='text'>{item.comment}</p>
                            <div className='info'>
                                <span className='time'>{item.time}</span>
                                <span className={item.attitude === 1 ? 'like liked' : 'like'} onClick={() => this.changeAttitude(item.id, item.attitude === 1 ? 0 : 1)}>
                                    <i className='icon'></i>
                                </span>
                                <span className={item.attitude === -1 ? 'hate hated' : 'hate'} onClick={() => this.changeAttitude(item.id, item.attitude === -1 ? 0 : -1)}>
                                    <i className='icon'></i>
                                </span>
                                <span className='reply btn-hover' onClick={() => this.delItem(item.id)}>
                                    删除
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div>暂无更多评论~</div>
        )
    }
    render() {
        const { state } = this
        return (
            <div className='App'>
                <div className='comment-container'>
                    <div className='comment-head'>
                        <span>{state.list.length} 评论</span>
                    </div>
                    <div className='tabs-order'>
                        <ul className='sort-container'>
                            {state.tabs.map((item) => (
                                <li className={item.type === state.active ? 'on' : ''} key={item.id} onClick={() => this.changeTab(item.type)}>
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
                            <textarea cols='80' rows='5' placeholder='发条友善的评论' className='ipt-txt' value={this.state.content} onChange={this.handleChange}></textarea>
                            <button className='comment-submit' onClick={this.addItem}>
                                发表评论
                            </button>
                        </div>
                        <div className='comment-emoji'>
                            <i className='face'></i>
                            <span className='text'>表情</span>
                        </div>
                    </div>
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

## 留言案例 📝

### 需求分析

a，渲染评论列表（列表渲染）。

b，没有评论数据时渲染：暂无评论（条件渲染）。

c，获取评论信息，包括评论人和评论内容（受控组件）。

d，发表评论，更新评论列表（setState()）。

<img src="/resource/images/ifer_msg.png"/>

### 界面准备

入口文件：`index.js`

```jsx
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))
```

样式文件：`index.css`

```css
.app-top input {
    height: 29px;
}
.app-top textarea::-webkit-input-placeholder {
    line-height: 29px;
}
.app-top button {
    height: 35px;
}

.app-top input,
.app-top textarea,
.app-top button {
    vertical-align: top;
}
```

根组件：`App.jsx`

```jsx
import React from 'react'

export default class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <div class='app-top'>
                    <input type='text' className='user' placeholder='请输入评论人' />
                    <textarea name='' id='' cols='30' rows='10' placeholder='请输入评论内容' />
                    <button>发表评论</button>
                </div>
                <div className='no-comment'>暂无评论，快去评论吧~</div>
                <ul>
                    <li>
                        <h3>评论人：jack</h3>
                        <p>评论内容：沙发！！！</p>
                    </li>
                </ul>
            </div>
        )
    }
}
```

全局样式：`index.css`

```css
.app {
    width: 300px;
    padding: 10px;
    border: 1px solid #999;
}

.user {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
}

.content {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
}

.no-comment {
    text-align: center;
    margin-top: 30px;
}
```

### 渲染列表

1. 在 state 中初始化评论列表数据。

2. 使用数组的 map 方法遍历 state 中的列表数据。

3. 给每一个被遍历的 li 元素添加 key 属性。

4. 在 render 方法里的 ul 节点下嵌入表达式。

根组件：`App.jsx`

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        comments: [
            { id: 1, name: 'jack', content: '沙发！！！' },
            { id: 2, name: 'rose', content: '板凳~' },
            { id: 3, name: 'tom', content: '楼主好人' },
        ],
    }
    render() {
        const { comments } = this.state
        return (
            <div className='app'>
                <div>
                    <input type='text' className='user' placeholder='请输入评论人' />
                    <br />
                    <textarea placeholder='请输入评论内容' />
                    <br />
                    <button>发表评论</button>
                </div>
                <div className='no-comment'>暂无评论，快去评论吧~</div>
                <ul>
                    {comments.map((item) => (
                        <li key={item.id}>
                            <h3>评论人：{item.name}</h3>
                            <p>评论内容：{item.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
```

### 暂无评论

1. 判断列表数据的长度是否为 0。

2. 如果为 0，则渲染暂无评论。

3. 如果不为 0，那么渲染列表数据。

4. 在 JSX 中大量写逻辑会导致很臃肿，所以我们可以把条件渲染的逻辑抽取成一个函数。

5. 在 render 的 return 方法里面调用这个函数即可。

根组件：`App.jsx`

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        comments: [
            { id: 1, name: 'jack', content: '沙发！！！' },
            { id: 2, name: 'rose', content: '板凳~' },
            { id: 3, name: 'tom', content: '楼主好人' },
        ],
    }
    renderList() {
        if (this.state.comments.length === 0) {
            return <div className='no-comment'>暂无评论，快去评论吧~</div>
        }
        return (
            <ul>
                {this.state.comments.map((item) => (
                    <li key={item.id}>
                        <h3>评论人：{item.name}</h3>
                        <p>评论内容：{item.content}</p>
                    </li>
                ))}
            </ul>
        )
    }
    render() {
        return (
            <div className='app'>
                <div>
                    <input type='text' className='user' placeholder='请输入评论人' />
                    <br />
                    <textarea placeholder='请输入评论内容' />
                    <br />
                    <button>发表评论</button>
                </div>
                {this.renderList()}
            </div>
        )
    }
}
```

### 获取评论

1. 通过受控组件来获取内容。

2. 初始化用户名和用户内容的 state。

3. 在结构中，把表单元素的 value 与 state 进行绑定，还需要绑定 name 属性和 onChange 属性。

4. 在 handleChange 函数中利用 setState 来让数据保持一致。

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        comments: [
            { id: 1, name: 'jack', content: '沙发！！！' },
            { id: 2, name: 'rose', content: '板凳~' },
            { id: 3, name: 'tom', content: '楼主好人' },
        ],
        name: '',
        content: '',
    }
    renderList() {
        const { comments } = this.state
        if (comments.length === 0) {
            return <div className='no-comment'>暂无评论，快去评论吧~</div>
        }
        return (
            <ul>
                {comments.map((item) => (
                    <li key={item.id}>
                        <h3>评论人：{item.name}</h3>
                        <p>评论内容：{item.content}</p>
                    </li>
                ))}
            </ul>
        )
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    render() {
        const { name, content } = this.state
        return (
            <div className='app'>
                <div>
                    <input type='text' name='name' className='user' placeholder='请输入评论人' value={name} onChange={this.handleChange} />
                    <br />
                    <textarea placeholder='请输入评论内容' name='content' value={content} onChange={this.handleChange} />
                    <br />
                    <button>发表评论</button>
                </div>
                {this.renderList()}
            </div>
        )
    }
}
```

### 发表评论

1. 给按钮绑定点击事件。

2. 在事件处理程序中，通过 state 获取评论信息。

3. 将评论信息添加到 state 中，利用 setState 来更新页面。

4. 添加评论前需要判断用户是否输入内容。

5. 添加评论后，需要清空文本框用户输入的值。

```jsx
import React from 'react'

export default class App extends React.Component {
    state = {
        comments: [
            { id: 1, name: 'jack', content: '沙发！！！' },
            { id: 2, name: 'rose', content: '板凳~' },
            { id: 3, name: 'tom', content: '楼主好人' },
        ],
        name: '',
        content: '',
    }
    renderList() {
        const { comments } = this.state
        if (comments.length === 0) {
            return <div className='no-comment'>暂无评论，快去评论吧~</div>
        }
        return (
            <ul>
                {comments.map((item) => (
                    <li key={item.id}>
                        <h3>评论人：{item.name}</h3>
                        <p>评论内容：{item.content}</p>
                    </li>
                ))}
            </ul>
        )
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    handleSubmit = (e) => {
        const { name, content } = this.state
        if (name.trim() === '' || content.trim() === '') {
            alert('请输入内容')
            return
        }
        // 利用数组拓展运算符来进行数据的拼接，把用户输入的存放在数组的第一个位置
        const newComments = [
            {
                id: this.state.comments.length + 1,
                name,
                content,
            },
            ...this.state.comments,
        ]
        this.setState({
            comments: newComments,
            name: '',
            content: '',
        })
    }
    render() {
        const { name, content } = this.state
        return (
            <div className='app'>
                <div>
                    <input type='text' name='name' className='user' placeholder='请输入评论人' value={name} onChange={this.handleChange} />
                    <br />
                    <textarea placeholder='请输入评论内容' name='content' value={content} onChange={this.handleChange} />
                    <br />
                    <button onClick={this.handleSubmit}>发表评论</button>
                </div>
                {this.renderList()}
            </div>
        )
    }
}
```

### 删除功能

a，利用 `findIndex` 并 `splice`

```js
handleDel = (id) => {
    // 不建议在原 state 的基础上直接进行操作，后续做性能优化时会有影响
    const comments = [...this.state.comments]
    const idx = comments.findIndex((item) => item.id === id)
    comments.splice(idx, 1)
    this.setState({
        comments,
    })
}
```

b，利用 `findIndex` 并 `slice`

```js
handleDel = (id) => {
    const idx = this.state.comments.findIndex((item) => item.id === id)
    this.setState({
        comments: [...this.state.comments.slice(0, idx), ...this.state.comments.slice(idx + 1)],
    })
}
```

c，利用 `filter`

```js
handleDel = (id) => {
    this.setState({
        comments: this.state.comments.filter((item) => item.id !== id),
    })
}
```

### 完整代码

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

export default class App extends React.Component {
    state = {
        comments: [
            { id: 1, name: 'jack', content: '沙发！！！' },
            { id: 2, name: 'tom', content: '楼主好人' },
        ],
        name: '',
        content: '',
    }
    renderList() {
        const { comments } = this.state
        if (comments.length === 0) {
            return <div className='no-comment'>暂无评论，快去评论吧~</div>
        }
        return (
            <ul>
                {comments.map((item) => (
                    <li key={item.id}>
                        <h3>评论人：{item.name}</h3>
                        <p>评论内容：{item.content}</p>
                        <button onClick={() => this.handleDel(item.id)}>删除</button>
                    </li>
                ))}
            </ul>
        )
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    handleSubmit = (e) => {
        const { name, content } = this.state
        if (name.trim() === '' || content.trim() === '') {
            alert('请输入内容')
            return
        }
        // 利用数组拓展运算符来进行数据的拼接，把用户输入的存放在数组的第一个位置
        const newComments = [
            {
                id: this.state.comments.length + 1,
                name,
                content,
            },
            ...this.state.comments,
        ]
        this.setState({
            comments: newComments,
            name: '',
            content: '',
        })
    }
    handleDel = (id) => {
        this.setState({
            comments: this.state.comments.filter((item) => item.id !== id),
        })
    }
    render() {
        const { name, content } = this.state
        return (
            <div className='app'>
                <div className='app-top'>
                    <input type='text' name='name' className='user' placeholder='请输入评论人' value={name} onChange={this.handleChange} />
                    <textarea placeholder='请输入评论内容' name='content' value={content} onChange={this.handleChange} />
                    <button onClick={this.handleSubmit}>发表评论</button>
                </div>
                {this.renderList()}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
```
