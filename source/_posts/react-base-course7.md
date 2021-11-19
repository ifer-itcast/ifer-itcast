---
title: 07_Redux 基础
date: 2021-11-12 13:54:40
tags:
---

## 今日目标

✔ 掌握 Redux 核心概念和基本使用。

✔ 掌握 react-redux 的使用。

✔ 掌握 TODOLIST 的实现思路。

<!-- more -->

## 了解 Redux

### 目标

能够说出为什么需要使用 Redux。

### 内容

[Redux 中文官网](http://cn.redux.js.org/)，[中文文档](https://www.redux.org.cn/)

-   概念

Redux 是一个全局状态管理的 JS 库。

-   背景

    a，React 的定位只是一个用来构建用户界面的库，并不是 Web 应用的完整解决方案。因此 React 在涉及到复杂组件之间的通信时会比较棘手，而对于大型项目来说，这方面恰恰是最关键的，因此只用 React 写大型项目会比较吃力。

    b，2014 年 Facebook 提出了 [Flux](http://www.ruanyifeng.com/blog/2016/01/flux.html) 架构的概念，引发了很多的实现。

    c，2015 年，Redux 出现，将 Flux 与函数式编程（Reducer）结合一起，很短时间内就成为了最热门的前端状态管理库，类似的还有 Mobx、Saga 等状态管理工具。

### 为什么要用 Redux

<img src="/resource/images/with_redux.png" class="highlight2" width="400"/>

-   不使用 Redux（图左边）

    a，只能使用父子组件通讯、状态提升等 React 自带机制，理远房亲戚（非父子）关系的组件通讯时乏力。

    b，组件之间的数据流混乱，出现 Bug 时难定位。

-   使用 Redux（图右边）

    a，**集中式存储和管理应用的状态**，处理组件通讯问题时，无视组件之间的层级关系。

    b，简化复杂应用中的数据传递问题，数据流清晰，易于定位 Bug。

### 小结

Redux 解决了什么问题？

## Redux 安装

### 目标

能够在 React 项目中准备 Redux 开发环境。

### 步骤

1. 创建 React 项目。

```bash
npx create-react-app redux-basic
```

2. 启动项目

```bash
yarn start
```

3. 安装 Redux 包

```bash
yarn add redux
```

## Redux 核心概念

### 目标

能够了解 Redux 三个核心概念的职责。

### 内容

[阮一峰](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

为了让**代码各部分职责清晰、明确**，Redux 提出三个核心概念：action / reducer / store，需要我们写代码的时候遵守。

-   **action**（动作）：描述要做的事情（要干啥）

-   **reducer**（函数）：更新状态（怎么干）

-   **store**（仓库）：整合 action 和 reducer（谁来指挥）

通过例子来理解三个核心概念

-   action：相当于公司里面要做的事情，比如打扫卫生这个事等

-   reducer：相当于公司的员工，负责执行的

-   store：相当于公司的老板

-   流程：老板（store）分配（dispatch）要做的事情（action）给员工（reducer），员工干完活把结果交给老板。

-   在视图当中，通过 store dispatch 一个 action，reducer 会自动收到通知来更新 state，state 一旦变化，说有使用 state 的视图自然就变了。

<img src="/resource/images/redux.png" width="400"/>

## Redux 核心概念 action

### 目标

定义一个最基本的 action。

### 内容

-   action：描述要做的事情，项目中的每一个功能都是一个 action，比如

    a，计数器案例：计数器加 1、减 1

    b，todomvc 案例：添加任务、删除任务等

    c，项目：登录，退出等

-   特点

    -   只描述做什么

    -   本质上就是一个 JS 对象，必须带有 `type` 属性，用于区分动作的类型

    -   可以通过 payload 携带额外的数据

```js
{ type： 'increment' }

// payload: 参数
{ type： 'decrement', payload： 2 }

{ type: 'addTodo', payload: '吃饭' }
{ type: 'addTodo', payload: '睡觉' }
{ type: 'removeTodo', payload: 3 }
```

`store/actions.js`

```js
export const incremen = {
    type: 'INCREMENT',
    payload: 5,
}

export const decrement = {
    type: 'DECREMENT',
    payload: 5,
}
```

## Redux 核心概念 action creator

### 目标

学会使用函数（actionCreator）去创建一个 action。

### 内容

1.  问题：直接使用对象来创建 action 不灵活，参数写死了。

2.  解决：可以使用函数来创建 action，通过传参把不一样的数据传递过去就好了，我们把这个创建 action 的函数叫做 actionCreator。

3.  返回值：返回一个 action 对象。

4.  好处：代码更加简洁，容易复用。

核心代码

`store/actions.js`

```js
export const increment = (payload) => ({
    type: 'INCREMENT',
    payload,
})

export const decrement = (payload) => ({
    type: 'DECREMENT',
    payload,
})
```

### 小结

actionCreator 的作用和返回值是什么？

## Redux 核心概念 reducer

### 目标

能够掌握 reducer 的基本写法。

### 内容

reducer：本质上是一个函数，作用是根据 action 来更新状态，有如下特点。

-   函数签名为：`(prevState, action) => newState`。

-   接收上一次的状态和 action，根据 action 的类型执行对应的操作，最终返回新的状态。

-   原则：不要在 reducer 函数内部直接修改 state。

store/reducers.js

```jsx
export default function counter(state = 10, action) {
    // 处理各种各样的 action
    switch (action.type) {
        case 'INCREMENT':
            return state + action.payload
        case 'DECREMENT':
            return state - action.payload
        default:
            // 记得要有默认返回的处理
            return state
    }
}
```

## Redux 核心概念 纯函数

### 目标

了解纯函数的特点。

### 内容

纯函数是[函数式编程](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)中的概念，对于纯函数来说，**相同的输入总是得到相同的输出**。

```js
const add = (a, b) => a + b
add(1, 2)
```

```js
const add = (a, b) => a + b + Math.random()
add(1, 2)
add(1, 2)
```

```js
const arr = [1, 2, 3, 4, 5]
arr.slice(1, 2)
arr.slice(1, 2)
arr.slice(1, 2)
```

```js
const arr = [1, 2, 3, 4, 5]
arr.splice(1, 2)
arr.splice(1, 2)
```

-   纯函数原则

    a，<font color=e32d40>不得改写参数</font>

    b，不能调用 Date.now() 或者 Math.random() 等不纯的方法，因为每次会得到不一样的结果

    c，不能使用全局变量

    d，没有副作用，副作用：AJAX 请求、操作本地数据、或者操作函数外部的变量等。

-   好处：方便测试，性能优化。

-   为什么说纯函数呢？因为 reducer 就必须是一个纯函数。

## Redux 核心概念 store

### 目标

掌握 store 的创建和基本使用。

### 内容

-   store：仓库，是 Redux 的核心，负责整合 action 和 reducer。

-   特点

    a，一个应用只有一个 store。

    b，创建：`const store = createStore(reducer)`。

    c，获取数据：`store.getState()`。

    d，更新数据：`store.dispatch(action)`。

-   其他 API

    a，订阅（监听）状态变化：`const unSubscribe = store.subscribe(() => {})`，注意要<font color=e32d40>**先**</font>订阅，后续的更新才能被观测到。

    b，取消订阅状态变化：`unSubscribe()`。

`store/index.js`，注意演示上面 API 需要先在 `index.js` 中引入此文件。

```js
// store: 整个数据的仓库，负责关联 reducer 和 action，通过 store 对象可以给 reducer 分配 action
import { createStore } from 'redux'
import reducer from './reducers'
const store = createStore(reducer)
export default store
```

### 小结

如何创建 store？

## 点击计数 📝

### 目标

掌握在视图中使用和更新数据。

### 读取数据

<img src="/resource/images/ifer_store.png" class="highlight2"/>

App.js

```js
import React, { Component } from 'react'
import store from './store'

export default class App extends Component {
    render() {
        return (
            <div>
                <p>count: {store.getState()}</p>
            </div>
        )
    }
}
```

### 更改数据

```js
import React from 'react'
import store from './store'
import { increment, decrement } from './store/actions'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h3>{store.getState()}</h3>
                <div>
                    <button onClick={() => store.dispatch(increment(1))}>+1</button>
                    <button onClick={() => store.dispatch(increment(5))}>+5</button>
                    <button onClick={() => store.dispatch(decrement(1))}>-1</button>
                    <button onClick={() => store.dispatch(decrement(5))}>-5</button>
                </div>
            </div>
        )
    }
}
```

### 解决问题

在组件的 componentDidMount 钩子中订阅数据的变化并更新视图（想办法触发 render）。

```js
import React from 'react'
import store from './store'
import { increment, decrement } from './store/actions'

export default class App extends React.Component {
    componentDidMount() {
        store.subscribe(() => {
            // console.log(1)
            // console.log(store.getState())
            // this.setState({})
            this.forceUpdate()
        })
    }
    render() {
        return (
            <div>
                <h3>{store.getState()}</h3>
                <div>
                    <button onClick={() => store.dispatch(increment(1))}>+1</button>
                    <button onClick={() => store.dispatch(increment(5))}>+5</button>
                    <button onClick={() => store.dispatch(decrement(1))}>-1</button>
                    <button onClick={() => store.dispatch(decrement(5))}>-5</button>
                </div>
            </div>
        )
    }
}
```

假如还有其他 A、B、C... 使用到 store 中的数据怎么办？

```js
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'

ReactDOM.render(<App />, document.querySelector('#root'))

store.subscribe(() => {
    ReactDOM.render(<App />, document.querySelector('#root'))
})
```

### 小结

store 中的数据变化，如何让视图更新？

## Redux 执行过程

### 目标

了解 Redux 的执行过程。

### 获取默认值的执行过程

-   只要创建 store，Redux 内部就会调用一次 reducer，打印试一下 `console.log(action.type)`。

-   类似：`reducer(undefined, {type: "@@redux/INITv.a.4.t.t.p"})`。

-   这一次调用 reducer 的目的：**获取状态的默认值**。

-   因为传入的状态值是 undefined ，并且是一个随机的 action type，所以!

    a，状态值因为 undefined，所以，我们设置的默认值就会生效，比如，此处的：10。

    b，因为是一个随机的 action type，所以，reducer 中 switch 一定无法命中，那就一定会走 default，也就是直接返回了状态的默认值，也就是：10。

-   Redux 内部拿到这个数据（比如此处的 10）以后，就用这个数据作为了 store 中的最新状态值。

-   因此，将来当我们调用 `store.getState()` 方法来获取 Redux 状态值的时候，拿到的就是 10 了。

```js
import { createStore } from 'redux'
import reducer from './reducer'
// 只要创建 store 传递了 reducer，Redux 内部就会自动的 dispatch 一次 action
// 目的：就是为了 store 能够有初始值，store.dispatch({ type: '@@xx699' })
const store = createStore(reducer)

// 所以可以拿到初始值
store.getState()

export default store
```

### 点击按钮后的执行过程

1. 点击按钮，派发动作 `store.dispatch(action)`。

2. 只要触发了 action，Redux 内部就会自动调用 reducer，根据上一次的状态和 action 计算出新的状态并返回。

3. reducer 执行完毕后，将最新的状态交给 store，store 用最新的状态替换旧状态，状态更新完毕。

### 小结

点击按钮视图更新的流程是什么？

## react-redux

### 基本介绍

-   问题：为什么要使用 react-redux 这个库?

-   回答：React 和 Redux 是两个独立的库，两者之间职责独立，因此，为了更好的实现在 React 中使用 Redux 进行状态管理，就需要一种机制，将这两个独立的库关联在一起，这就是 react-redux 出现的原因。

-   react-redux 是 Redux 官方提供的 React 绑定库。

### 基本使用

1. 安装

```bash
yarn add react-redux
```

2. 配置

`index.js`

```js
import ReactDOM from 'react-dom'
import App from './App.js'
import store from './store/store.js'
import { Provider } from 'react-redux'

// 通过 Provider 提供 store 供其他组件内部使用
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)

// 用了 react-redux 下面手动触发更新的方式就没用了
/* store.subscribe(() => {
    ReactDOM.render(<App />, document.querySelector('#root'))
}) */
```

<font color=e32d40>**一旦使用了 react-redux，获取和更新数据的方式就变化了，要按照这个库的要求来。**</font>

### useSelector

1. react-redux 提供了 useSelector。

2. useSelector 作用：从 store 中获取状态。

3. selector 函数应该是个纯函数。

`App.js`

```js
import React from 'react'
import { useSelector } from 'react-redux'
const App = () => {
    const count = useSelector((state) => state)
    return (
        <div>
            <h3>{count}</h3>
        </div>
    )
}
export default App
```

### useDispatch

作用：得到 dispatch 来触发 action（触发 action 会执行 reducer，reducer 负责数据的修改，react-redux 内部会监听数据的变化自动进行视图更新）。

`App.js`

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './store/actions'
const App = () => {
    const count = useSelector((state) => state)
    const dispatch = useDispatch()
    return (
        <div>
            <h3>{count}</h3>
            <div>
                <button onClick={() => dispatch(increment(1))}>+1</button>
                <button onClick={() => dispatch(increment(5))}>+5</button>
                <button onClick={() => dispatch(decrement(1))}>-1</button>
                <button onClick={() => dispatch(decrement(5))}>-5</button>
            </div>
        </div>
    )
}
export default App
```

如果 Test 组件想用，看看有多方便吧，无需传值，直接拽过来！

```js
import React from 'react'
import { useSelector } from 'react-redux'

export default function Test() {
    const money = useSelector((state) => state)
    return <div>{money}</div>
}
```

## Reducer 的分离与合并

-   随着项目功能变得越来越复杂，需要 Redux 管理的状态也会越来越多

-   此时，有两种方式来处理状态的更新：

    1. 使用一个 reducer：处理项目中所有状态的更新

    2. 使用多个 reducer：按照项目功能划分，每个功能使用一个 reducer 来处理该功能的状态更新

-   推荐：**使用第二种方案(多个 reducer)**，每个 reducer 处理的状态更单一，职责更明确

-   此时，项目中会有多个 reducer，但是 **store 只能接收一个 reducer**，因此，需要将多个 reducer 合并为一根 reducer，才能传递给 store

-   合并方式：使用 Redux 中的 `combineReducers` 函数

-   注意：**合并后，Redux 的状态会变为一个对象，对象的结构与 combineReducers 函数的参数结构相同**

    -   比如，此时 Redux 状态为：`{ a： aReducer 处理的状态, b： bReducer 处理的状态 }`

-   注意：虽然在使用 `combineReducers` 以后，整个 Redux 应用的状态变为了`对象`，但是，对于每个 reducer 来说，每个 reducer 只负责整个状态中的某一个值。也就是每个 reducer 各司其职，最终，由多个 reducer 合作完成整个应用状态的更新。

    -   也就是：**每个 reducer 只负责整个应用状态中的某一部分**，每个 reducer 都很自私只关注自己的数据

    -   举个例子：

        -   登录功能：`loginReducer` 处理的状态只应该是跟登录相关的状态

        -   个人资料：`profileReducer` 处理的状态只应该是跟个人资料相关的状态

        -   文章列表、文章详情、文章评论 等

```jsx
import { combineReducers } from 'redux'
function money(state = 1000, action) {
    console.log('reducer执行', action)
    // 处理各种各样的action
    switch (action.type) {
        case 'addOne':
            return state + 1
        case 'subOne':
            return state - 1
        case 'addMore':
            return state + action.payload
        case 'subMore':
            return state - action.payload
        default:
            // 很重要
            return state
    }
}

function user(state = { name: 'zs', password: '123456' }, action) {
    if (action.type === 'setName') {
        return {
            ...state,
            name: action.payload,
        }
    }
    return state
}

// 合并多个reducer
const rootReducer = combineReducers({
    // a 和 b指的就是模块的名字
    money,
    user,
})

export default rootReducer
```

`App.js`

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addMore, addOne, subMore, subOne } from './store/actions'
import Test from './Test'

const App = () => {
    const money = useSelector((state) => state.money)
    const dispatch = useDispatch()
    return (
        <div>
            <p>count: {money}</p>
            <Test />
            <div>
                <button onClick={() => dispatch(addOne())}>+1</button>
                <button onClick={() => dispatch(subOne())}>-1</button>
                <button onClick={() => dispatch(addMore(5))}>+5</button>
                <button onClick={() => dispatch(subMore(5))}>-5</button>
            </div>
            <div>
                <p>用户名：</p>
                <p>密码：</p>
            </div>
        </div>
    )
}

export default App
```

`Test.js`

```js
import React from 'react'
import { useSelector } from 'react-redux'

export default function Test() {
    const money = useSelector((state) => state.money)
    return <div>{money}</div>
}
```

修改用户名

`App.js`

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addMore, addOne, subMore, subOne } from './store/actions'
import Test from './Test'
import { setName } from './store/actions'

const App = () => {
    const money = useSelector((state) => state.money)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    return (
        <div>
            <p>count: {money}</p>
            <Test />
            <div>
                <button onClick={() => dispatch(addOne())}>+1</button>
                <button onClick={() => dispatch(subOne())}>-1</button>
                <button onClick={() => dispatch(addMore(5))}>+5</button>
                <button onClick={() => dispatch(subMore(5))}>-5</button>
            </div>
            <div>
                <p>用户名：{user.name}</p>
                <button onClick={() => dispatch(setName('xxx'))}>修改用户名</button>
            </div>
        </div>
    )
}

export default App
```

`action.js`

```js
export const setName = (payload) => ({
    type: 'setName',
    payload,
})
```

## Action Type 的使用

-   Action Type 指的是：action 对象中 type 属性的值

-   Redux 项目中会多次使用 action type，比如，action 对象、reducer 函数、dispatch(action) 等

-   目标：**集中处理 action type，保持项目中 action type 的一致性**

处理方式：

1. 在 store 目录中创建 `actionTypes` 目录或者 `constants` 目录，集中处理

2. 使用**常量**来存储 action type

3. action type 的值采用：`'domain/action'(功能/动作)形式`，进行分类处理，比如，

    - 计数器：`'counter/increment'` 表示 Counter 功能中的 increment 动作

    - TodoMVC：`'todos/add'` 表示 TodoMVC 案例中 add 动作等

    - 登录：`login/getCode` 表示登录获取验证码的动作；`login/submit` 表示登录功能

    - 个人信息：`profile/get` 表示获取个人资料；`profile/updateName` 表示修改昵称

4. 将项目中用到 action type 的地方替换为这些常量，从而保持项目中 action type 的一致性

```js
export const SET_NAME = 'user/setName'
export const SUB_MORE = 'money/subMore'
```

## TODOLIST

拆分，`components/TodoHeader.js`、`components/TodoMain.js`、`components/TodoFooter.js`

`App.js`

```js
import React from 'react'
import TodoFooter from './components/TodoFooter'
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'

export default function App() {
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
```

基本的 store 跑通

index.js

```js
import ReactDOM from 'react-dom'
import './styles/base.css'
import './styles/index.css'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

console.log(store.getState()) // 打印试一下

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)
```

`store/index.js`

```js
import { createStore } from 'redux'
import reducer from './reducers'
const store = createStore(reducer)
export default store
```

`store/reducers/index.js`

```js
import { combineReducers } from 'redux'
import todos from './todos'
const rootReducer = combineReducers({
    todos,
})

export default rootReducer
```

`store/reducers/todos.js`

```js
export default function todos(state = [], action) {
    return state
}
```

### 列表渲染

准备初始数据，store/reducers/todos.js

```js
const initState = [
    {
        id: 1,
        name: '吃饭',
        done: true,
    },
    {
        id: 2,
        name: '睡觉',
        done: false,
    },
]

export default function todos(state = initState, action) {
    return state
}
```

`components/TodoMain.js`

```js
import React from 'react'
import { useSelector } from 'react-redux'

export default function TodoMain() {
    const list = useSelector((state) => state.todos)
    return (
        <section className='main'>
            <input id='toggle-all' className='toggle-all' type='checkbox' />
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className='todo-list'>
                {list.map((item) => (
                    <li key={item.id} className={item.done ? 'completed' : ''}>
                        <div className='view'>
                            <input className='toggle' type='checkbox' checked={item.done} onChange={() => {}} />
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
```

### 删除

actions/todos.js

```js
import { DEL_TODO } from '../constants/todos'

/**
 * 删除 todo 的 action
 * @param {Number} id
 * @returns
 */
export const delTodo = (id) => ({
    type: DEL_TODO,
    id,
})
```

`constants/todos.js`

```js
export const DEL_TODO = 'DEL_TODO'
```

`reducers/todos.js`

```js
export default function todos(state = initState, action) {
    if (action.type === DEL_TODO) {
        return state.filter((item) => item.id !== action.id)
    }
    return state
}
```

components/TodoMain.js

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { delTodo } from '../store/actions/todos'

export default function TodoMain() {
    const list = useSelector((state) => state.todos)
    const dispatch = useDispatch()
    return (
        <section className='main'>
            <input id='toggle-all' className='toggle-all' type='checkbox' />
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className='todo-list'>
                {list.map((item) => (
                    <li key={item.id} className={item.done ? 'completed' : ''}>
                        <div className='view'>
                            <input className='toggle' type='checkbox' checked={item.done} onChange={() => {}} />
                            <label>{item.name}</label>
                            <button className='destroy' onClick={() => dispatch(delTodo(item.id))}></button>
                        </div>
                        <input className='edit' value='Create a TodoMVC template' />
                    </li>
                ))}
            </ul>
        </section>
    )
}
```

### 修改任务状态

`actions/todos.js`

```js
export const changeDone = (id) => ({
    type: CHANGE_DONE,
    id,
})
```

`constants/todos.js`

```js
export const DEL_TODO = 'DEL_TODO'
export const CHANGE_DONE = 'CHANGE_DONE'
```

`reducers/todos.js`

```js
export default function todos(state = initState, action) {
    if (action.type === DEL_TODO) {
        return state.filter((item) => item.id !== action.id)
    }
    if (action.type === CHANGE_DONE) {
        return state.map((item) => {
            if (item.id === action.id) {
                return {
                    ...item,
                    done: !item.done,
                }
            } else {
                return item
            }
        })
    }
    return state
}
```

components/TodoMain.js

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeDone, delTodo } from '../store/actions/todos'

export default function TodoMain() {
    const list = useSelector((state) => state.todos)
    const dispatch = useDispatch()
    return (
        <section className='main'>
            <input id='toggle-all' className='toggle-all' type='checkbox' />
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className='todo-list'>
                {list.map((item) => (
                    <li key={item.id} className={item.done ? 'completed' : ''}>
                        <div className='view'>
                            <input className='toggle' type='checkbox' checked={item.done} onChange={() => dispatch(changeDone(item.id))} />
                            <label>{item.name}</label>
                            <button className='destroy' onClick={() => dispatch(delTodo(item.id))}></button>
                        </div>
                        <input className='edit' value='Create a TodoMVC template' />
                    </li>
                ))}
            </ul>
        </section>
    )
}
```

### 添加任务

constants/todos.js

```js
export const DEL_TODO = 'DEL_TODO'
export const CHANGE_DONE = 'CHANGE_DONE'
export const ADD_TODO = 'ADD_TODO'
```

actions/todos.js

```js
import { DEL_TODO, CHANGE_DONE, ADD_TODO } from '../constants/todos'

/**
 * 删除 todo 的 action
 * @param {Number} id
 * @returns
 */
export const delTodo = (id) => ({
    type: DEL_TODO,
    id,
})

export const changeDone = (id) => ({
    type: CHANGE_DONE,
    id,
})

export const addTodo = (name) => ({
    type: ADD_TODO,
    name,
    id: Date.now(),
})
```

`reducers/todos.js`

```js
import { ADD_TODO, CHANGE_DONE, DEL_TODO } from '../constants/todos'
let lastid = 2
const initState = [
    {
        id: 1,
        name: '吃饭',
        done: true,
    },
    {
        id: 2,
        name: '睡觉',
        done: false,
    },
]

export default function todos(state = initState, action) {
    if (action.type === DEL_TODO) {
        return state.filter((item) => item.id !== action.id)
    }
    if (action.type === CHANGE_DONE) {
        return state.map((item) => {
            if (item.id === action.id) {
                return {
                    ...item,
                    done: !item.done,
                }
            } else {
                return item
            }
        })
    }
    if (action.type === ADD_TODO) {
        // const todo = {
        //   // id: Date.now(), // 不存了
        //   id: ++lastid, // 不存了
        //   name: action.name,
        //   done: false,
        // }
        const todo = {
            id: action.id,
            name: action.name,
            done: false,
        }
        return [todo, ...state]
    }
    return state
}
```

`components/TodoHeader.js`

```js
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/actions/todos'

export default function TodoHeader() {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const add = (e) => {
        if (e.code === 'Enter') {
            if (!name) return alert('内容不能为空')
            dispatch(addTodo(name))
            setName('')
        }
    }
    return (
        <header className='header'>
            <h1>todos</h1>
            <input className='new-todo' placeholder='What needs to be done?' autoFocus value={name} onChange={(e) => setName(e.target.value)} onKeyUp={add} />
        </header>
    )
}
```

### 全选

constants/todos.js

```js
export const DEL_TODO = 'DEL_TODO'
export const CHANGE_DONE = 'CHANGE_DONE'
export const ADD_TODO = 'ADD_TODO'
export const CHANGE_ALL_DONE = 'CHANGE_ALL_DONE'
```

actions/todos.js

```js
export const changeAllDone = (done) => ({
    type: CHANGE_ALL_DONE,
    done,
})
```

reducers/todos.js

```js
import { ADD_TODO, CHANGE_DONE, DEL_TODO, CHANGE_ALL_DONE } from '../constants/todos'
let lastid = 2
const initState = [
    {
        id: 1,
        name: '吃饭',
        done: true,
    },
    {
        id: 2,
        name: '睡觉',
        done: false,
    },
]

export default function todos(state = initState, action) {
    if (action.type === DEL_TODO) {
        return state.filter((item) => item.id !== action.id)
    }
    if (action.type === CHANGE_DONE) {
        return state.map((item) => {
            if (item.id === action.id) {
                return {
                    ...item,
                    done: !item.done,
                }
            } else {
                return item
            }
        })
    }
    if (action.type === ADD_TODO) {
        // const todo = {
        //   // id: Date.now(), // 不存了
        //   id: ++lastid, // 不存了
        //   name: action.name,
        //   done: false,
        // }
        const todo = {
            id: action.id,
            name: action.name,
            done: false,
        }
        return [todo, ...state]
    }
    if (action.type === CHANGE_ALL_DONE) {
        return state.map((item) => {
            return {
                ...item,
                done: action.done,
            }
        })
    }

    return state
}
```

components/TodoMain.js

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeAllDone, changeDone, delTodo } from '../store/actions/todos'

export default function TodoMain() {
    const list = useSelector((state) => state.todos)
    const dispatch = useDispatch()
    const isCheckAll = list.every((item) => item.done)
    return (
        <section className='main'>
            <input id='toggle-all' className='toggle-all' type='checkbox' checked={isCheckAll} onChange={() => dispatch(changeAllDone(!isCheckAll))} />
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className='todo-list'>
                {list.map((item) => (
                    <li key={item.id} className={item.done ? 'completed' : ''}>
                        <div className='view'>
                            <input className='toggle' type='checkbox' checked={item.done} onChange={() => dispatch(changeDone(item.id))} />
                            <label>{item.name}</label>
                            <button className='destroy' onClick={() => dispatch(delTodo(item.id))}></button>
                        </div>
                        <input className='edit' value='Create a TodoMVC template' onChange={() => {}} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
```

### 双击显示弹框

```js
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { changeAllDone, changeDone, delTodo } from '../store/actions/todos'

export default function TodoMain() {
    const list = useSelector((state) => state.todos)
    const dispatch = useDispatch()
    const isCheckAll = list.every((item) => item.done)

    const [currentId, setCurrentId] = useState('')
    return (
        <section className='main'>
            <input id='toggle-all' className='toggle-all' type='checkbox' checked={isCheckAll} onChange={() => dispatch(changeAllDone(!isCheckAll))} />
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className='todo-list'>
                {list.map((item) => (
                    <li
                        key={item.id}
                        className={classNames({
                            completed: item.done,
                            editing: item.id === currentId,
                        })}
                    >
                        <div className='view'>
                            <input className='toggle' type='checkbox' checked={item.done} onChange={() => dispatch(changeDone(item.id))} />
                            <label onDoubleClick={() => setCurrentId(item.id)}>{item.name}</label>
                            <button className='destroy' onClick={() => dispatch(delTodo(item.id))}></button>
                        </div>
                        <input className='edit' value='Create a TodoMVC template' onChange={() => {}} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
```

### 自动获取焦点并回填

焦点

```js
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { changeDone, delTodo } from '../store/actions/todos'

export default function TodoItem({ item }) {
    const [currentId, setCurrentId] = useState('')
    const ref = useRef(null)
    const dispatch = useDispatch()
    const showEdit = (id) => {
        setCurrentId(id)
        // ref.current.focus()
    }
    useEffect(() => {
        ref.current.focus()
    }, [currentId])
    return (
        <li
            className={classNames({
                completed: item.done,
                editing: item.id === currentId,
            })}
        >
            <div className='view'>
                <input className='toggle' type='checkbox' checked={item.done} onChange={() => dispatch(changeDone(item.id))} />
                <label onDoubleClick={() => showEdit(item.id)}>{item.name}</label>
                <button className='destroy' onClick={() => dispatch(delTodo(item.id))}></button>
            </div>
            <input className='edit' value='Create a TodoMVC template' onChange={() => {}} ref={ref} />
        </li>
    )
}
```

原来 currentId 放哪里？只会有一个，现在呢？

拆分是为了都有自己的 ref

TodoMain.js

```js
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { changeAllDone, changeDone, delTodo } from '../store/actions/todos'
import TodoItem from './TodoItem'

export default function TodoMain() {
    const list = useSelector((state) => state.todos)
    const dispatch = useDispatch()
    const isCheckAll = list.every((item) => item.done)
    return (
        <section className='main'>
            <input id='toggle-all' className='toggle-all' type='checkbox' checked={isCheckAll} onChange={() => dispatch(changeAllDone(!isCheckAll))} />
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className='todo-list'>
                {list.map((item) => (
                    <TodoItem key={item.id} item={item} />
                ))}
            </ul>
        </section>
    )
}
```

TodoItem.js

```js
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { changeDone, delTodo } from '../store/actions/todos'

export default function TodoItem({ item }) {
    const [currentId, setCurrentId] = useState('')
    const ref = useRef(null)
    const dispatch = useDispatch()
    const showEdit = (id) => {
        setCurrentId(id)
        // ref.current.focus()
    }
    useEffect(() => {
        ref.current.focus()
    }, [currentId])
    return (
        <li
            className={classNames({
                completed: item.done,
                editing: item.id === currentId,
            })}
        >
            <div className='view'>
                <input className='toggle' type='checkbox' checked={item.done} onChange={() => dispatch(changeDone(item.id))} />
                <label onDoubleClick={() => showEdit(item.id)}>{item.name}</label>
                <button className='destroy' onClick={() => dispatch(delTodo(item.id))}></button>
            </div>
            <input className='edit' value='Create a TodoMVC template' onChange={() => {}} ref={ref} onBlur={() => setCurrentId('')} />
        </li>
    )
}
```

### 完成

记住输入的内容

```js
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { changeDone, delTodo } from '../store/actions/todos'

export default function TodoItem({ item }) {
    const [currentId, setCurrentId] = useState('')
    // #1
    const [currentName, setCurrentName] = useState('')
    const ref = useRef(null)
    const dispatch = useDispatch()
    const showEdit = (id, name) => {
        setCurrentId(id)
        // #2
        setCurrentName(name)
        // ref.current.focus()
    }
    useEffect(() => {
        ref.current.focus()
    }, [currentId])
    return (
        <li
            className={classNames({
                completed: item.done,
                editing: item.id === currentId,
            })}
        >
            <div className='view'>
                <input className='toggle' type='checkbox' checked={item.done} onChange={() => dispatch(changeDone(item.id))} />
                {/* #3 */}
                <label onDoubleClick={() => showEdit(item.id, item.name)}>{item.name}</label>
                <button className='destroy' onClick={() => dispatch(delTodo(item.id))}></button>
            </div>
            {/* #4、#5 */}
            <input className='edit' value={currentName} onChange={(e) => setCurrentName(e.target.value)} ref={ref} onBlur={() => setCurrentId('')} />
        </li>
    )
}
```

### 完成修改

components/TodoItem.js

```js
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { changeDone, changeName, delTodo } from '../store/actions/todos'

export default function TodoItem({ item }) {
    const [currentId, setCurrentId] = useState('')
    // #1
    const [currentName, setCurrentName] = useState('')
    const ref = useRef(null)
    const dispatch = useDispatch()
    const showEdit = (id, name) => {
        setCurrentId(id)
        // #2
        setCurrentName(name)
        // ref.current.focus()
    }
    const edit = (e) => {
        if (e.keyCode === 27) {
            setCurrentId('')
        }
        if (e.keyCode === 13) {
            dispatch(changeName(currentId, currentName))
            setCurrentId('')
        }
    }
    useEffect(() => {
        ref.current.focus()
    }, [currentId])
    return (
        <li
            className={classNames({
                completed: item.done,
                editing: item.id === currentId,
            })}
        >
            <div className='view'>
                <input className='toggle' type='checkbox' checked={item.done} onChange={() => dispatch(changeDone(item.id))} />
                {/* #3 */}
                <label onDoubleClick={() => showEdit(item.id, item.name)}>{item.name}</label>
                <button className='destroy' onClick={() => dispatch(delTodo(item.id))}></button>
            </div>
            {/* #4、#5 */}
            <input className='edit' value={currentName} onChange={(e) => setCurrentName(e.target.value)} ref={ref} onBlur={() => setCurrentId('')} onKeyUp={edit} />
        </li>
    )
}
```

constants/todos.js

```js
export const DEL_TODO = 'DEL_TODO'
export const CHANGE_DONE = 'CHANGE_DONE'
export const ADD_TODO = 'ADD_TODO'
export const CHANGE_ALL_DONE = 'CHANGE_ALL_DONE'
export const CHANGE_NAME = 'CHANGE_NAME'
```

actions/todos.js

```js
export const changeName = (id, name) => ({
    type: CHANGE_NAME,
    id,
    name,
})
```

`reducers/todos.js`

```js
import { ADD_TODO, CHANGE_DONE, DEL_TODO, CHANGE_ALL_DONE, CHANGE_NAME } from '../constants/todos'
let lastid = 2
const initState = [
    {
        id: 1,
        name: '吃饭',
        done: true,
    },
    {
        id: 2,
        name: '睡觉',
        done: false,
    },
]

export default function todos(state = initState, action) {
    if (action.type === DEL_TODO) {
        return state.filter((item) => item.id !== action.id)
    }
    if (action.type === CHANGE_DONE) {
        return state.map((item) => {
            if (item.id === action.id) {
                return {
                    ...item,
                    done: !item.done,
                }
            } else {
                return item
            }
        })
    }
    if (action.type === ADD_TODO) {
        // const todo = {
        //   // id: Date.now(), // 不存了
        //   id: ++lastid, // 不存了
        //   name: action.name,
        //   done: false,
        // }
        const todo = {
            id: action.id,
            name: action.name,
            done: false,
        }
        return [todo, ...state]
    }
    if (action.type === CHANGE_ALL_DONE) {
        return state.map((item) => {
            return {
                ...item,
                done: action.done,
            }
        })
    }
    if (action.type === CHANGE_NAME) {
        return state.map((item) => {
            if (item.id === action.id) {
                return {
                    ...item,
                    name: action.name,
                }
            } else {
                return item
            }
        })
    }

    return state
}
```

### 清空任务

剩余

```js
import React from 'react'
import { useSelector } from 'react-redux'

export default function TodoFooter() {
    const list = useSelector((state) => state.todos)
    const leftCount = list.filter((item) => !item.done).length
    return (
        <footer className='footer'>
            <span className='todo-count'>
                <strong>{leftCount}</strong> item left
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
```

清空

constants/todos.js

```js
export const DEL_TODO = 'DEL_TODO'
export const CHANGE_DONE = 'CHANGE_DONE'
export const ADD_TODO = 'ADD_TODO'
export const CHANGE_ALL_DONE = 'CHANGE_ALL_DONE'
export const CHANGE_NAME = 'CHANGE_NAME'
export const CLEAR_TODO = 'CLEAR_TODO'
```

actions/todos.js

```js
export const clearTodo = () => ({
    type: CLEAR_TODO,
})
```

reducers/todos.js

```js
import { ADD_TODO, CHANGE_DONE, DEL_TODO, CHANGE_ALL_DONE, CHANGE_NAME, CLEAR_TODO } from '../constants/todos'
let lastid = 2
const initState = [
    {
        id: 1,
        name: '吃饭',
        done: true,
    },
    {
        id: 2,
        name: '睡觉',
        done: false,
    },
]

export default function todos(state = initState, action) {
    if (action.type === DEL_TODO) {
        return state.filter((item) => item.id !== action.id)
    }
    if (action.type === CHANGE_DONE) {
        return state.map((item) => {
            if (item.id === action.id) {
                return {
                    ...item,
                    done: !item.done,
                }
            } else {
                return item
            }
        })
    }
    if (action.type === ADD_TODO) {
        // const todo = {
        //   // id: Date.now(), // 不存了
        //   id: ++lastid, // 不存了
        //   name: action.name,
        //   done: false,
        // }
        const todo = {
            id: action.id,
            name: action.name,
            done: false,
        }
        return [todo, ...state]
    }
    if (action.type === CHANGE_ALL_DONE) {
        return state.map((item) => {
            return {
                ...item,
                done: action.done,
            }
        })
    }
    if (action.type === CHANGE_NAME) {
        return state.map((item) => {
            if (item.id === action.id) {
                return {
                    ...item,
                    name: action.name,
                }
            } else {
                return item
            }
        })
    }

    if (action.type === CLEAR_TODO) {
        // 保留没完成，清空已完成
        return state.filter((item) => !item.done)
    }

    return state
}
```

components/TodoFooter.js

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearTodo } from '../store/actions/todos'

export default function TodoFooter() {
    const list = useSelector((state) => state.todos)
    const leftCount = list.filter((item) => !item.done).length
    const dispatch = useDispatch()
    return (
        <footer className='footer'>
            <span className='todo-count'>
                <strong>{leftCount}</strong> item left
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
            <button className='clear-completed' onClick={() => dispatch(clearTodo())}>
                Clear completed
            </button>
        </footer>
    )
}
```

### 点击高亮

constants/filter.js

```js
export const CHANGE_FILTER = 'CHANGE_FILTER'
```

actions/filter.js

```js
import { CHANGE_FILTER } from '../constants/filter'

export const changeFilter = (filter) => ({
    type: CHANGE_FILTER,
    filter,
})
```

`reducers/filter.js`

```js
import { CHANGE_FILTER } from '../constants/filter'

export default function filter(state = 'all', action) {
    if (action.type === CHANGE_FILTER) {
        return action.filter
    }
    return state
}
```

`reducers/index.js`

```js
import { combineReducers } from 'redux'
import todos from './todos'
import filter from './filter'
const rootReducer = combineReducers({
    todos,
    filter,
})

export default rootReducer
```

`components/TodoFooter.js`

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeFilter } from '../store/actions/filter'
import { clearTodo } from '../store/actions/todos'

export default function TodoFooter() {
    const list = useSelector((state) => state.todos)
    const leftCount = list.filter((item) => !item.done).length
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.filter)
    const arr = ['all', 'active', 'completed']
    return (
        <footer className='footer'>
            <span className='todo-count'>
                <strong>{leftCount}</strong> item left
            </span>
            <ul className='filters'>
                {arr.map((item) => (
                    <li key={item}>
                        <a className={item === filter ? 'selected' : ''} href='#/' onClick={() => dispatch(changeFilter(item))}>
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
            <button className='clear-completed' onClick={() => dispatch(clearTodo())}>
                Clear completed
            </button>
        </footer>
    )
}
```

### 切换数据

components/TodoMain.js

```js
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { changeAllDone, changeDone, delTodo } from '../store/actions/todos'
import TodoItem from './TodoItem'

export default function TodoMain() {
    const list = useSelector((state) => {
        if (state.filter === 'active') {
            return state.todos.filter((item) => !item.done)
        } else if (state.filter === 'completed') {
            return state.todos.filter((item) => item.done)
        } else {
            return state.todos
        }
    })
    const dispatch = useDispatch()
    const isCheckAll = list.every((item) => item.done)
    return (
        <section className='main'>
            <input id='toggle-all' className='toggle-all' type='checkbox' checked={isCheckAll} onChange={() => dispatch(changeAllDone(!isCheckAll))} />
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className='todo-list'>
                {list.map((item) => (
                    <TodoItem key={item.id} item={item} />
                ))}
            </ul>
        </section>
    )
}
```
