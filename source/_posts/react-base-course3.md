---
title: 03_React 组件通信
date: 2021-11-07 11:04:13
tags:
---

## 今日目标

✔ 组件通讯的三种方式（父子、子父、兄弟）。

✔ Context 组件通讯。

✔ 评论列表案例。

<!-- more -->

## 代码提示插件

ES7 React/Redux/GraphQL/React-Native snippets

## 组件通讯概述

### 目标

了解为什么需要组件通讯？

### 内容

-   组件是独立且封闭的单元，默认情况下，只能使用组件自己的数据。

-   在组件化过程中，我们将一个完整的功能拆分成多个组件，以更好的完成整个应用的功能。

-   而在这个过程中，多个组件之间不可避免的要共享某些数据。

-   为了实现这些功能，就需要**打破组件的独立封闭性**，让其与外界沟通，这个过程就是组件通讯。

### 总结

## Props 基本使用

### 目标

掌握 props 的使用语法。

### 内容

-   property 属性的简写。

```jsx
// 一个 prop 就代表一个属性，组件内可以通过 props 拿到传递过来的属性
<App name='ifer' age={18} />
```

-   作用：接收（其他组件内）传递给当前组件的数据。

-   如何传递？给组件标签添加属性，就表示给组件传递数据。

-   如何接收？函数组件通过参数 `props` 接收数据，类组件通过 `this.props`。

### 举例

`index.js`

```jsx
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App name='ifer' age={18} />, document.querySelector('#root'))
```

函数组件：`App.jsx`

```jsx
import React from 'react'

const App = (props) => {
    return (
        <div>
            {props.name}
            {props.age}
        </div>
    )
}

export default App
```

类组件：`App.jsx`

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <div>
                {this.props.name}
                {this.props.age}
            </div>
        )
    }
}
```

### 小结

props 是实现组件通讯的关键，在实现组件通讯之前，需要先掌握 props 的基本语法。

## Props 的注意事项

### 目标

了解 props 的特点，知道什么是单向数据流。

### 内容

a，Props 是只读的，不能修改。

-   `单向数据流`，也叫做：自上而下的数据流。

-   表示：父组件中的数据可以通过自定义属性（props）传递给子组件，并且，当父组件中的数据更新时，子组件就会自动接收到最新的数据。

-   父组件的数据更新会流动到子组件，但不能反过来，例如子组件直接去修改父组件的数据。

-   类比：就像瀑布的水一样只能从上往下流动，并且，当上游的水变浑浊，下游的水也会受到影响。

b，可以给组件传递任意类型的数据，例如数字、字符串、布尔、对象、函数、JSX 等。

### 举例

修改会报错

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    handleClick = () => {
        this.props.name = 'xxx'
    }
    render() {
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <button onClick={this.handleClick}>修改</button>
            </div>
        )
    }
}
```

<!-- c，使用类组件时，如果写了构造函数，应该在 constructor 中接收 props，并将 props 传递给 super，否则无法在构造函数中使用 this.props。 -->

<!-- d，Props 的特殊属性：children。 -->

### 小结

-   使用 props 的注意点是什么？

## 父传子

### 目标

-   将父组件的数据，传递给子组件。

### 内容

1. 父组件（使用组件的地方）通过属性提供要传递的数据。

```jsx
import React, { Component } from 'react'
import Child from './Child'

class Parent extends Component {
    state = {
        money: 8888,
    }
    render() {
        return <Child money={this.state.money}></Child>
    }
}

export default Parent
```

2. 子组件（定义组件的地方）通过 props 进行接收。

类组件

```jsx
import React, { Component } from 'react'

export default class Child extends Component {
    render() {
        return <div>{this.props.money}</div>
    }
}
```

### 小结

父怎么给子传递数据？

## 父传子练习

### 目标

<img src="/resource/images/ifer_cmp.png"/>

### 准备父组件

数据、结构、样式

`Parent.jsx`

```jsx
import React, { Component } from 'react'
import Child from './Child'
import './parent.css'

class Parent extends Component {
    state = {
        list: [
            {
                id: 1,
                name: '超级好吃的棒棒糖',
                price: 18.8,
                info: '开业大酬宾，全场8折',
            },
            {
                id: 2,
                name: '超级好吃的大鸡腿',
                price: 34.2,
                info: '开业大酬宾，全场8折',
            },
            {
                id: 3,
                name: '超级无敌的冰激凌',
                price: 14.2,
                info: '开业大酬宾，全场8折',
            },
        ],
    }
    render() {
        return (
            <div className='parent'>
                <Child></Child>
                <Child></Child>
            </div>
        )
    }
}

export default Parent
```

`parent.css`

```css
.parent {
    width: 400px;
    margin: 60px auto 0;
    border: 2px solid #333;
}
```

### 准备子组件

结构、样式

`Child.jsx`

```jsx
import React, { Component } from 'react'
import './child.css'

export default class Child extends Component {
    render() {
        return (
            <div className='child'>
                <h3 className='title'>标题：超级好吃的棒棒糖</h3>
                <p className='price'>价格：18.8</p>
                <p className='product'>开业大酬宾，全场8折</p>
            </div>
        )
    }
}
```

`child.css`

```css
.child {
    border: 1px solid #333;
    margin: 20px;
    padding: 10px;
}
```

### 传递数据

`Parent.jsx`

```jsx
import React, { Component } from 'react'
import Child from './Child'
import './parent.css'

class Parent extends Component {
    {/* ... */}
    render() {
        return (
            <div className='parent'>
                {this.state.list.map((item) => (
                    <Child key={item.id} {...item} />
                ))}
            </div>
        )
    }
}
```

`Child.jsx`

```jsx
import React, { Component } from 'react'
import './child.css'

export default class Child extends Component {
    render() {
        const { name, price, info } = this.props
        return (
            <div className='child'>
                <h3 className='title'>标题：{name}</h3>
                <p className='price'>价格：{price}</p>
                <p className='info'>{info}</p>
            </div>
        )
    }
}
```

### 完整

`Parent.jsx`

```jsx
import React, { Component } from 'react'
import Child from './Child'
import './parent.css'

class Parent extends Component {
    state = {
        list: [
            {
                id: 1,
                name: '超级好吃的棒棒糖',
                price: 18.8,
                info: '开业大酬宾，全场8折',
            },
            {
                id: 2,
                name: '超级好吃的大鸡腿',
                price: 34.2,
                info: '开业大酬宾，全场8折',
            },
            {
                id: 3,
                name: '超级无敌的冰激凌',
                price: 14.2,
                info: '开业大酬宾，全场8折',
            },
        ],
    }
    render() {
        return (
            <div className='parent'>
                {this.state.list.map((item) => (
                    <Child key={item.id} {...item} />
                ))}
            </div>
        )
    }
}

export default Parent
```

`Child.jsx`

```jsx
import React, { Component } from 'react'
import './child.css'

export default class Child extends Component {
    render() {
        const { name, price, info } = this.props
        return (
            <div className='child'>
                <h3 className='title'>标题：{name}</h3>
                <p className='price'>价格：{price}</p>
                <p className='info'>{info}</p>
            </div>
        )
    }
}
```

## 子传父

### 目标

能够将子组件的数据传递给父组件。

### 内容

a，父组件通过属性传递一个回调函数。

b，子组件调用传递过来的回调函数，并将要传递的数据作为回调函数的实参。

c，父组件在回调函数中通过形参接收传递过来的数据。

`App.jsx`

```jsx
import React from 'react'
import Hello from './Hello'

export default class App extends React.Component {
    // 注意这个函数要是箭头函数，保证 this 指向自己的组件实例
    getChildMsg = (msg) => {
        // #3 在回调函数中接收参数
        console.log('接收到的子组件的数据：' + msg)
    }
    render() {
        return (
            <div>
                父组件
                <hr />
                {/* #1 父组件提供回调函数 */}
                <Hello getMsg={this.getChildMsg} />
            </div>
        )
    }
}
```

`Hello.jsx`

```jsx
// #2 子组件调用传递过来的回调函数并传参
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
```

### 小结

子传父的流程是什么？

## 子传父练习

### 砍价

`Child.jsx`

```jsx
import React, { Component } from 'react'
import './child.css'

export default class Child extends Component {
    handlePrice = () => {
        // 将 id 和 price 传递给父
        const price = Math.floor(Math.random() * 3 + 1) // 1 ~ 3
        this.props.handlePrice(this.props.id, price)
    }
    render() {
        const { name, price, info } = this.props
        return (
            <div className='child'>
                <h3 className='title'>标题：{name}</h3>
                <p className='price'>价格：{price}</p>
                <p className='info'>{info}</p>
                <button onClick={this.handlePrice}>砍一刀</button>
            </div>
        )
    }
}
```

`Parent.jsx`

```jsx
import React, { Component } from 'react'
import Child from './Child'
import './parent.css'

class Parent extends Component {
    state = {
        list: [
            {
                id: 1,
                name: '超级好吃的棒棒糖',
                price: 18.8,
                info: '开业大酬宾，全场8折',
            },
            {
                id: 2,
                name: '超级好吃的大鸡腿',
                price: 34.2,
                info: '开业大酬宾，全场8折',
            },
            {
                id: 3,
                name: '超级无敌的冰激凌',
                price: 14.2,
                info: '开业大酬宾，全场8折',
            },
        ],
    }
    handlePrice = (id, price) => {
        this.setState({
            list: this.state.list.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        price: item.price - price,
                    }
                } else {
                    return item
                }
            }),
        })
    }
    render() {
        return (
            <div className='parent'>
                {this.state.list.map((item) => (
                    <Child key={item.id} {...item} handlePrice={this.handlePrice} />
                ))}
            </div>
        )
    }
}

export default Parent
```

### 细节

保留 2 位小数，加个为负的处理。

`Parent.jsx`

```jsx
class Parent extends Component {
    {/*...*/}
    handlePrice = (id, price) => {
        this.setState({
            list: this.state.list.map((item) => {
                if (item.id === id) {
                    // 注意 toFixed 方法的返回值是一个字符串，为了防止后续进行相加的操作出现问题
                    // 所以通过 + 号进行了转换
                    // 而 +'0.20' 进行转换的时候，会把后面没有意义的 0 去掉
                    let newPrice = (item.price - price).toFixed(2)
                    if (newPrice < 0) {
                        newPrice = 0
                    }
                    return {
                        ...item,
                        price: newPrice,
                    }
                } else {
                    return item
                }
            }),
        })
    }
    {/*...*/}
}
```

### 完整

`Parent.jsx`

```jsx
import React, { Component } from 'react'
import Child from './Child'
import './parent.css'

class Parent extends Component {
    state = {
        list: [
            {
                id: 1,
                name: '超级好吃的棒棒糖',
                price: 18.8,
                info: '开业大酬宾，全场8折',
            },
            {
                id: 2,
                name: '超级好吃的大鸡腿',
                price: 34.2,
                info: '开业大酬宾，全场8折',
            },
            {
                id: 3,
                name: '超级无敌的冰激凌',
                price: 14.2,
                info: '开业大酬宾，全场8折',
            },
        ],
    }
    handlePrice = (id, price) => {
        this.setState({
            list: this.state.list.map((item) => {
                if (item.id === id) {
                    // 注意 toFixed 方法的返回值是一个字符串，为了防止后续进行相加的操作出现问题
                    // 所以通过 + 号进行了转换
                    // 而 +'0.20' 进行转换的时候，会把后面没有意义的 0 去掉
                    let newPrice = (item.price - price).toFixed(2)
                    if (newPrice < 0) {
                        newPrice = 0
                    }
                    return {
                        ...item,
                        price: newPrice,
                    }
                } else {
                    return item
                }
            }),
        })
    }
    render() {
        return (
            <div className='parent'>
                {this.state.list.map((item) => (
                    <Child key={item.id} {...item} handlePrice={this.handlePrice} />
                ))}
            </div>
        )
    }
}

export default Parent
```

`Child.jsx`

```jsx
import React, { Component } from 'react'
import './child.css'

export default class Child extends Component {
    handlePrice = () => {
        // 将 id 和 price 传递给父
        const price = Math.floor(Math.random() * 3 + 1) // 1 ~ 3
        this.props.handlePrice(this.props.id, price)
    }
    render() {
        const { name, price, info } = this.props
        return (
            <div className='child'>
                <h3 className='title'>标题：{name}</h3>
                <p className='price'>价格：{price}</p>
                <p className='info'>{info}</p>
                <button onClick={this.handlePrice}>砍一刀</button>
            </div>
        )
    }
}
```

## 位运算符取整

```js
// 位运算符号的特点
// 1. 忽略小数
// 2. 变成二进制进行运算
console.log(1.11 | 0)
console.log(-1.11 | 0)

// 十进制
// 1101 => 1 * 10 的 3 次方 + 1 * 10 的 2 次方 + 0 * 10 的 1 次方 + 1 * 10 的 0 次方

// 二进制
// 32 16 8 4 2 1
// 1101 => 1 * 2 的 3 次方 + 1 * 2 的 2 次方 + 0 * 2 的 1 次方 + 1 * 2 的 0 次方

// 十进制 22 => 10110

// 1011
// 0111
// -------
// 1111
// .................
// 11 | 7

/* const a = 11 | 7
console.log(a) */

// 1011
// 0111
// -------
// 0011
/* const b = 11 & 7
console.log(b) */
```

## 兄弟通信

### 目标

能够将子组件的数据传递给父组件。

### 内容

需求：点击 A 中的按钮，修改 B 中的数据 count。

1. 把需要操作的 B 组件中的数据 count 提升到公共的父组件里面

2. <font color=e32d40>**父组件提供数据和操作数据的方法**。</font>

3. 把数据传递给 B 组件，把操作数据的方法传递给 A 组件。

`App.jsx`

```jsx
import React, { Component } from 'react'
import A from './A'
import B from './B'

export default class App extends Component {
    state = {
        count: 0,
    }
    changeCount = (num) => {
        this.setState({
            count: this.state.count + num,
        })
    }
    render() {
        return (
            <div>
                <A changeCount={this.changeCount} />
                <hr />
                <B count={this.state.count} />
            </div>
        )
    }
}
```

`A.jsx`

```jsx
import React, { Component } from 'react'

export default class A extends Component {
    render() {
        return (
            <div>
                A<button onClick={() => this.props.changeCount(3)}>+1</button>
            </div>
        )
    }
}
```

`B.jsx`

```jsx
import React, { Component } from 'react'

export default class B extends Component {
    render() {
        return <div>B：{this.props.count}</div>
    }
}
```

### 总结

## Context

### 目标

通过 context 实现跨级组件通讯。

### 内容

-   之前通信的局限性。

-   远房亲戚关系（也就是两个组件之间间隔较远），可以使用 Context。

### 核心代码

`App.jsx`

```jsx
import React, { Component, createContext } from 'react'
import A from './A'

export const context = createContext()

export default class App extends Component {
    state = {
        money: 8888,
    }
    changeMoney = (n) => {
        this.setState({
            money: this.state.money + n,
        })
    }
    render() {
        return (
            <context.Provider
                value={{
                    money: this.state.money,
                    changeMoney: this.changeMoney,
                }}
            >
                App
                <hr />
                <A />
            </context.Provider>
        )
    }
}
```

`A.jsx`

```jsx
import React, { Component } from 'react'
import B from './B'

export default class A extends Component {
    render() {
        return (
            <div>
                A
                <hr />
                <B />
            </div>
        )
    }
}
```

`B.jsx`

```jsx
import React, { Component } from 'react'
import { context } from './App'

export default class B extends Component {
    render() {
        return (
            <context.Consumer>
                {(value) => {
                    return (
                        <div>
                            <h1>{value.money}</h1>
                            <button onClick={() => value.changeMoney(8)}>changeMoney</button>
                        </div>
                    )
                }}
            </context.Consumer>
        )
    }
}
```

## B 站评论列表

### 目标

基于第一天的结构进行组件化开发。

### 组件拆分

把静态结构代码提取到 `App.jsx` 中

```jsx
import React, { Component } from 'react'
import avatar from './images/avatar.png'

export default class App extends Component {
    render() {
        return (
            <div className='App'>
                <div className='comment-container'>
                    <div className='comment-head'>
                        <span>1 评论</span>
                    </div>
                    <div className='tabs-order'>
                        <ul className='sort-container'>
                            <li className=''>按热度排序</li>
                            <li className='on'>按时间排序</li>
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
                        <div className='list-item'>
                            <div className='user-face'>
                                <img className='user-head' src='https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000' alt='' />
                            </div>
                            <div className='comment'>
                                <div className='user'>刘德华</div>
                                <p className='text'>给我一杯忘情水</p>
                                <div className='info'>
                                    <span className='time'>2021-10-10 09:09:00</span>
                                    <span className='like liked'>
                                        <i className='icon'></i>
                                    </span>
                                    <span className='hate'>
                                        <i className='icon'></i>
                                    </span>
                                    <span className='reply btn-hover'>删除</span>
                                </div>
                            </div>
                        </div>
                        <div className='list-item'>
                            <div className='user-face'>
                                <img className='user-head' src='https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000' alt='' />
                            </div>
                            <div className='comment'>
                                <div className='user'>周杰伦</div>
                                <p className='text'>听妈妈的话</p>
                                <div className='info'>
                                    <span className='time'>2021-10-11 09:09:00</span>
                                    <span className='like'>
                                        <i className='icon'></i>
                                    </span>
                                    <span className='hate'>
                                        <i className='icon'></i>
                                    </span>
                                    <span className='reply btn-hover'>删除</span>
                                </div>
                            </div>
                        </div>
                        <div className='list-item'>
                            <div className='user-face'>
                                <img className='user-head' src='https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000' alt='' />
                            </div>
                            <div className='comment'>
                                <div className='user'>陈奕迅</div>
                                <p className='text'>十年</p>
                                <div className='info'>
                                    <span className='time'>2021-10-11 10:09:00</span>
                                    <span className='like'>
                                        <i className='icon'></i>
                                    </span>
                                    <span className='hate hated'>
                                        <i className='icon'></i>
                                    </span>
                                    <span className='reply btn-hover'>删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
```

拆分 `Tabs.jsx`、`Form.jsx`、`List.jsx` 组件到 components 文件夹下。

`App.jsx`

```jsx
import React, { Component } from 'react'
import Tabs from './components/Tabs'
import Form from './components/Form'
import List from './components/List'

export default class App extends Component {
    render() {
        return (
            <div className='App'>
                <div className='comment-container'>
                    <div className='comment-head'>
                        <span>1 评论</span>
                    </div>
                    {/* tabs */}
                    <Tabs />
                    {/* form */}
                    <Form />
                    {/* list */}
                    <List />
                </div>
            </div>
        )
    }
}
```

`Tabs.jsx`

```jsx
import React, { Component } from 'react'

export default class Tabs extends Component {
    render() {
        return (
            <div className='tabs-order'>
                <ul className='sort-container'>
                    <li className=''>按热度排序</li>
                    <li className='on'>按时间排序</li>
                </ul>
            </div>
        )
    }
}
```

`Form.jsx`

```jsx
import React, { Component } from 'react'
import avatar from '../images/avatar.png'

export default class Form extends Component {
    render() {
        return (
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
        )
    }
}
```

`List.jsx`

```jsx
import React, { Component } from 'react'

export default class List extends Component {
    render() {
        return (
            <div className='comment-list'>
                <div className='list-item'>
                    <div className='user-face'>
                        <img className='user-head' src='https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000' alt='' />
                    </div>
                    <div className='comment'>
                        <div className='user'>刘德华</div>
                        <p className='text'>给我一杯忘情水</p>
                        <div className='info'>
                            <span className='time'>2021-10-10 09:09:00</span>
                            <span className='like liked'>
                                <i className='icon'></i>
                            </span>
                            <span className='hate'>
                                <i className='icon'></i>
                            </span>
                            <span className='reply btn-hover'>删除</span>
                        </div>
                    </div>
                </div>
                <div className='list-item'>
                    <div className='user-face'>
                        <img className='user-head' src='https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000' alt='' />
                    </div>
                    <div className='comment'>
                        <div className='user'>周杰伦</div>
                        <p className='text'>听妈妈的话</p>
                        <div className='info'>
                            <span className='time'>2021-10-11 09:09:00</span>
                            <span className='like'>
                                <i className='icon'></i>
                            </span>
                            <span className='hate'>
                                <i className='icon'></i>
                            </span>
                            <span className='reply btn-hover'>删除</span>
                        </div>
                    </div>
                </div>
                <div className='list-item'>
                    <div className='user-face'>
                        <img className='user-head' src='https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000' alt='' />
                    </div>
                    <div className='comment'>
                        <div className='user'>陈奕迅</div>
                        <p className='text'>十年</p>
                        <div className='info'>
                            <span className='time'>2021-10-11 10:09:00</span>
                            <span className='like'>
                                <i className='icon'></i>
                            </span>
                            <span className='hate hated'>
                                <i className='icon'></i>
                            </span>
                            <span className='reply btn-hover'>删除</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
```

`index.css`

```css
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
.App {
    /* width: 1090px; */

    width: 80%;
    margin: 50px auto;
}
.comment-head {
    margin: 0 0 20px;
    font-size: 18px;
    line-height: 24px;
    color: #222;
}

.comment-send {
    margin: 10px 0;
}

.user-face {
    float: left;
    margin: 7px 0 0 5px;
    position: relative;
}

.user-head {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}

.textarea-container {
    position: relative;
    margin-left: 85px;
    margin-right: 80px;
}
.textarea-container:hover .ipt-txt {
    background-color: #fff;
    border-color: #00a1d6;
}

.ipt-txt {
    font-size: 12px;
    display: inline-block;
    box-sizing: border-box;
    background-color: #f4f5f7;
    border: 1px solid #e5e9ef;
    overflow: auto;
    border-radius: 4px;
    color: #555;
    width: 100% !important;
    height: 65px;
    transition: 0s;
    padding: 5px 10px;
    line-height: normal;
    resize: none;
    outline: none;
}

.comment-submit {
    width: 70px;
    height: 64px;
    position: absolute;
    right: -80px;
    top: 0;
    padding: 4px 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    min-width: 60px;
    vertical-align: top;
    cursor: pointer;
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
    transition: 0.1s;
    user-select: none;
    outline: none;
}
.comment-submit:hover {
    background-color: #00b5e5;
    border-color: #00b5e5;
}

.comment-emoji {
    padding: 0;
    width: 66px;
    height: 24px;
    color: #99a2aa;
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    position: relative;
    font-size: 12px;
    text-align: center;
    line-height: 23px;
    margin-left: 86px;
    margin-top: 3px;
    cursor: pointer;
    display: inline-block;
}
.comment-emoji:hover {
    color: #6d757a;
}

.face {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background: url(data:image/png;base64,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)
        no-repeat -408px -24px;
}
.comment-emoji:hover .face {
    background-position: -472px -24px;
}

.comment-emoji .text {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    font-size: 12px !important;
}

.tabs-order {
    margin: 0 0 24px 0;
    border-bottom: 1px solid #e5e9ef;
}

.sort-container {
    display: flex;
}

.tabs-order li {
    background-color: transparent;
    border-radius: 0;
    border: 0;
    padding: 8px 0;
    margin-right: 16px;
    border-bottom: 1px solid transparent;
    position: relative;
    float: left;
    cursor: pointer;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #222;
}

.tabs-order li:last-child {
    margin: 0 16px;
}

.tabs-order li.on {
    border-bottom: 1px solid #00a1d6;
    color: #00a1d6;
}

.tabs-order li.on::after {
    content: '';
    width: 6px;
    height: 3px;
    background: transparent
        url(data:image/png;base64,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) -669px -31px
        no-repeat;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
    visibility: visible;
}

.list-item {
    display: flex;
}
.list-item:first-child {
    padding-top: 22px;
}

.comment {
    flex: 1;
    position: relative;
    margin-left: 35px;
    padding: 22px 0 14px 0;
    border-top: 1px solid #e5e9ef;
}
.list-item:last-child .comment {
    border-bottom: 1px solid #e5e9ef;
}

.comment .user {
    color: #6d757a;
    font-size: 12px;
    font-weight: bold;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
    position: relative;
}

.comment .text {
    line-height: 20px;
    padding: 2px 0;
    font-size: 14px;
    text-shadow: none;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
}

.info {
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}

.icon {
    cursor: pointer;
    background: url(data:image/png;base64,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)
        no-repeat;
}

.time {
    margin-right: 20px;
}

.like {
    cursor: pointer;
    margin-right: 20px;
}

.like > i {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background-position: -153px -25px;
}
.like:hover > i {
    background-position: -218px -25px;
}
.info .liked > i {
    background-position: -154px -89px;
}

.hate {
    cursor: pointer;
    margin-right: 15px;
}

.hate > i {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background-position: -153px -153px;
}

.hate:hover > i {
    background-position: -217px -153px;
}
.info .hated > i {
    background-position: -154px -217px;
}

.btn-hover {
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer;
    display: inline-block;
}

.btn-hover:hover {
    color: #00a1d6;
    background: #e5e9ef;
}
```

### Tabs 切换

`App.jsx`

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
    changeTab = (active) => {
        this.setState({
            active,
        })
    }
    render() {
        const { tabs, active } = this.state
        return (
            <div className='App'>
                <div className='comment-container'>
                    <div className='comment-head'>
                        <span>1 评论</span>
                    </div>
                    {/* tabs */}
                    <Tabs tabs={tabs} active={active} changeTab={this.changeTab} />
                    {/* form */}
                    <Form />
                    {/* list */}
                    <List />
                </div>
            </div>
        )
    }
}
```

`components/Tabs.jsx`

```jsx
import React, { Component } from 'react'

export default class Tabs extends Component {
    render() {
        const { tabs, active, changeTab } = this.props
        return (
            <div className='tabs-order'>
                <ul className='sort-container'>
                    {tabs.map((tab) => {
                        return (
                            <li key={tab.id} className={active === tab.type ? 'on' : ''} onClick={() => changeTab(tab.type)}>
                                按{tab.name}排序
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
```

### 列表展示

`App.jsx`

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
                time: new Date('2021-11-10 09:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 1,
            },
            {
                id: 2,
                author: '周杰伦',
                comment: '听妈妈的话',
                time: new Date('2021-12-11 09:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 0,
            },
            {
                id: 3,
                author: '陈奕迅',
                comment: '十年',
                time: new Date('2021-10-11 10:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: -1,
            },
        ],
    }
    changeTab = (active) => {
        this.setState({
            active,
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
                    <Form />
                    {/* list */}
                    <List list={list} />
                </div>
            </div>
        )
    }
}
```

`components/List.jsx`

```jsx
import React, { Component } from 'react'

export default class List extends Component {
    render() {
        const { list } = this.props
        if (list.length === 0) {
            return <div>暂无评论~~</div>
        }
        return (
            <div className='comment-list'>
                {list.map((item) => (
                    <div className='list-item' key={item.id}>
                        <div className='user-face'>
                            <img className='user-head' src={item.img} alt='' />
                        </div>
                        <div className='comment'>
                            <div className='user'>{item.author}</div>
                            <p className='text'>{item.comment}</p>
                            <div className='info'>
                                <span className='time'>{item.time.toLocaleString()}</span>
                                {/* <span className={`like ${item.attitude === 1 ? 'liked' : ''}`}> */}
                                {/* <span className={item.attitude === 1 ? 'like liked' : 'like'}> */}
                                <span className={['like', item.attitude === 1 ? 'liked' : ''].join(' ')}>
                                    <i className='icon'></i>
                                </span>
                                <span className={`hate ${item.attitude === -1 ? 'hated' : ''}`}>
                                    <i className='icon'></i>
                                </span>
                                <span className='reply btn-hover'>删除</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
```

### classnames

```bash
yarn add classnames
```

`components/List.jsx`

```jsx
import React, { Component } from 'react'
import classNames from 'classnames'

export default class List extends Component {
    render() {
        const { list } = this.props
        if (list.length === 0) {
            return <div>暂无评论~~</div>
        }
        return (
            <div className='comment-list'>
                {list.map((item) => (
                    <div className='list-item' key={item.id}>
                        <div className='user-face'>
                            <img className='user-head' src={item.img} alt='' />
                        </div>
                        <div className='comment'>
                            <div className='user'>{item.author}</div>
                            <p className='text'>{item.comment}</p>
                            <div className='info'>
                                <span className='time'>{item.time.toLocaleString()}</span>
                                <span
                                    className={classNames('like', {
                                        liked: item.attitude === 1,
                                    })}
                                >
                                    <i className='icon'></i>
                                </span>
                                <span
                                    className={classNames('hate', {
                                        hated: item.attitude === -1,
                                    })}
                                >
                                    <i className='icon'></i>
                                </span>
                                <span className='reply btn-hover'>删除</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
```

### 排序功能

`components/List.jsx`

```jsx
import React, { Component } from 'react'
import classNames from 'classnames'

export default class List extends Component {
    render() {
        const { list, active } = this.props
        let showList = []
        if (active === 'hot') {
            showList = [...list].sort((a, b) => b.id - a.id)
        } else if (active === 'time') {
            showList = [...list].sort((a, b) => b.time - a.time)
        }
        if (showList.length === 0) {
            return <div>暂无评论~~</div>
        }
        return (
            <div className='comment-list'>
                {showList.map((item) => (
                    <div className='list-item' key={item.id}>
                        <div className='user-face'>
                            <img className='user-head' src={item.img} alt='' />
                        </div>
                        <div className='comment'>
                            <div className='user'>{item.author}</div>
                            <p className='text'>{item.comment}</p>
                            <div className='info'>
                                <span className='time'>{item.time.toLocaleString()}</span>
                                <span
                                    className={classNames('like', {
                                        liked: item.attitude === 1,
                                    })}
                                >
                                    <i className='icon'></i>
                                </span>
                                <span
                                    className={classNames('hate', {
                                        hated: item.attitude === -1,
                                    })}
                                >
                                    <i className='icon'></i>
                                </span>
                                <span className='reply btn-hover'>删除</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
```

### 添加评论

`App.jsx`

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
                time: new Date('2021-11-10 09:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 1,
            },
            {
                id: 2,
                author: '周杰伦',
                comment: '听妈妈的话',
                time: new Date('2021-12-11 09:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 0,
            },
            {
                id: 3,
                author: '陈奕迅',
                comment: '十年',
                time: new Date('2021-10-11 10:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: -1,
            },
        ],
    }
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
            time: new Date(),
            attitude: 0,
        }
        this.setState({
            list: [...this.state.list, comment],
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
                    <List list={list} active={active} />
                </div>
            </div>
        )
    }
}
```

`components/Form.jsx`

```jsx
import React, { Component } from 'react'
import avatar from '../images/avatar.png'

export default class Form extends Component {
    state = {
        comment: '',
    }
    addComment = () => {
        if (!this.state.comment.trim()) {
            return alert('评论内容不能为空')
        }
        this.props.addComment(this.state.comment)
        this.setState({
            comment: '',
        })
    }
    render() {
        const { comment } = this.state
        return (
            <div className='comment-send'>
                <div className='user-face'>
                    <img className='user-head' src={avatar} alt='' />
                </div>
                <div className='textarea-container'>
                    <textarea cols='80' rows='5' placeholder='发条友善的评论' className='ipt-txt' value={comment} onChange={(e) => this.setState({ comment: e.target.value })}></textarea>
                    <button className='comment-submit' onClick={this.addComment}>
                        发表评论
                    </button>
                </div>
                <div className='comment-emoji'>
                    <i className='face'></i>
                    <span className='text'>表情</span>
                </div>
            </div>
        )
    }
}
```

### 删除评论

`App.jsx`

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
                time: new Date('2021-11-10 09:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 1,
            },
            {
                id: 2,
                author: '周杰伦',
                comment: '听妈妈的话',
                time: new Date('2021-12-11 09:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 0,
            },
            {
                id: 3,
                author: '陈奕迅',
                comment: '十年',
                time: new Date('2021-10-11 10:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: -1,
            },
        ],
    }
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
            time: new Date(),
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
                    <List list={list} active={active} delComment={this.delComment} />
                </div>
            </div>
        )
    }
}
```

`List.jsx`

```jsx
import React, { Component } from 'react'
import classNames from 'classnames'

export default class List extends Component {
    render() {
        const { list, active } = this.props
        let showList = []
        if (active === 'hot') {
            showList = [...list].sort((a, b) => b.id - a.id)
        } else if (active === 'time') {
            showList = [...list].sort((a, b) => b.time - a.time)
        }
        if (showList.length === 0) {
            return <div>暂无评论~~</div>
        }
        return (
            <div className='comment-list'>
                {showList.map((item) => (
                    <div className='list-item' key={item.id}>
                        <div className='user-face'>
                            <img className='user-head' src={item.img} alt='' />
                        </div>
                        <div className='comment'>
                            <div className='user'>{item.author}</div>
                            <p className='text'>{item.comment}</p>
                            <div className='info'>
                                <span className='time'>{item.time.toLocaleString()}</span>
                                <span
                                    className={classNames('like', {
                                        liked: item.attitude === 1,
                                    })}
                                >
                                    <i className='icon'></i>
                                </span>
                                <span
                                    className={classNames('hate', {
                                        hated: item.attitude === -1,
                                    })}
                                >
                                    <i className='icon'></i>
                                </span>
                                <span className='reply btn-hover' onClick={() => this.props.delComment(item.id)}>
                                    删除
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
```

### 点赞评论

`App.jsx`

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
                time: new Date('2021-11-10 09:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 1,
            },
            {
                id: 2,
                author: '周杰伦',
                comment: '听妈妈的话',
                time: new Date('2021-12-11 09:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 0,
            },
            {
                id: 3,
                author: '陈奕迅',
                comment: '十年',
                time: new Date('2021-10-11 10:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: -1,
            },
        ],
    }
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
            time: new Date(),
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

`List.jsx`

```jsx
import React, { Component } from 'react'
import classNames from 'classnames'

export default class List extends Component {
    render() {
        const { list, active, changeAttitude } = this.props
        let showList = []
        if (active === 'hot') {
            showList = [...list].sort((a, b) => b.id - a.id)
        } else if (active === 'time') {
            showList = [...list].sort((a, b) => b.time - a.time)
        }
        if (showList.length === 0) {
            return <div>暂无评论~~</div>
        }
        return (
            <div className='comment-list'>
                {showList.map((item) => (
                    <div className='list-item' key={item.id}>
                        <div className='user-face'>
                            <img className='user-head' src={item.img} alt='' />
                        </div>
                        <div className='comment'>
                            <div className='user'>{item.author}</div>
                            <p className='text'>{item.comment}</p>
                            <div className='info'>
                                <span className='time'>{item.time.toLocaleString()}</span>
                                <span
                                    className={classNames('like', {
                                        liked: item.attitude === 1,
                                    })}
                                    onClick={() => changeAttitude(item.id, item.attitude === 1 ? 0 : 1)}
                                >
                                    <i className='icon'></i>
                                </span>
                                <span
                                    className={classNames('hate', {
                                        hated: item.attitude === -1,
                                    })}
                                    onClick={() => changeAttitude(item.id, item.attitude === -1 ? 0 : -1)}
                                >
                                    <i className='icon'></i>
                                </span>
                                <span className='reply btn-hover' onClick={() => this.props.delComment(item.id)}>
                                    删除
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
```

### 完整代码

`App.jsx`

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
                time: new Date('2021-11-10 09:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 1,
            },
            {
                id: 2,
                author: '周杰伦',
                comment: '听妈妈的话',
                time: new Date('2021-12-11 09:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: 0,
            },
            {
                id: 3,
                author: '陈奕迅',
                comment: '十年',
                time: new Date('2021-10-11 10:09:00'),
                img: 'https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000',
                // 1: 点赞 0：无态度 -1:踩
                attitude: -1,
            },
        ],
    }
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
            time: new Date(),
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

`components/Tabs.jsx`

```jsx
import React, { Component } from 'react'

export default class Tabs extends Component {
    render() {
        const { tabs, active, changeTab } = this.props
        return (
            <div className='tabs-order'>
                <ul className='sort-container'>
                    {tabs.map((tab) => {
                        return (
                            <li key={tab.id} className={active === tab.type ? 'on' : ''} onClick={() => changeTab(tab.type)}>
                                按{tab.name}排序
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
```

`components/Form.jsx`

```jsx
import React, { Component } from 'react'
import avatar from '../images/avatar.png'

export default class Form extends Component {
    state = {
        comment: '',
    }
    addComment = () => {
        if (!this.state.comment.trim()) {
            return alert('评论内容不能为空')
        }
        this.props.addComment(this.state.comment)
        this.setState({
            comment: '',
        })
    }
    render() {
        const { comment } = this.state
        return (
            <div className='comment-send'>
                <div className='user-face'>
                    <img className='user-head' src={avatar} alt='' />
                </div>
                <div className='textarea-container'>
                    <textarea cols='80' rows='5' placeholder='发条友善的评论' className='ipt-txt' value={comment} onChange={(e) => this.setState({ comment: e.target.value })}></textarea>
                    <button className='comment-submit' onClick={this.addComment}>
                        发表评论
                    </button>
                </div>
                <div className='comment-emoji'>
                    <i className='face'></i>
                    <span className='text'>表情</span>
                </div>
            </div>
        )
    }
}
```

`components/List.jsx`

```jsx
import React, { Component } from 'react'
import classNames from 'classnames'

export default class List extends Component {
    render() {
        const { list, active, changeAttitude } = this.props
        let showList = []
        if (active === 'hot') {
            showList = [...list].sort((a, b) => b.id - a.id)
        } else if (active === 'time') {
            showList = [...list].sort((a, b) => b.time - a.time)
        }
        if (showList.length === 0) {
            return <div>暂无评论~~</div>
        }
        return (
            <div className='comment-list'>
                {showList.map((item) => (
                    <div className='list-item' key={item.id}>
                        <div className='user-face'>
                            <img className='user-head' src={item.img} alt='' />
                        </div>
                        <div className='comment'>
                            <div className='user'>{item.author}</div>
                            <p className='text'>{item.comment}</p>
                            <div className='info'>
                                <span className='time'>{item.time.toLocaleString()}</span>
                                <span
                                    className={classNames('like', {
                                        liked: item.attitude === 1,
                                    })}
                                    onClick={() => changeAttitude(item.id, item.attitude === 1 ? 0 : 1)}
                                >
                                    <i className='icon'></i>
                                </span>
                                <span
                                    className={classNames('hate', {
                                        hated: item.attitude === -1,
                                    })}
                                    onClick={() => changeAttitude(item.id, item.attitude === -1 ? 0 : -1)}
                                >
                                    <i className='icon'></i>
                                </span>
                                <span className='reply btn-hover' onClick={() => this.props.delComment(item.id)}>
                                    删除
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
```

## 今日总结

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
