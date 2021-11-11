---
title: 07_Redux 基础
date: 2021-11-11 13:54:40
tags:
---

## 今日目标

✔ redux 基本介绍。

✔ redux 核心概念。

✔ react-redux 的使用。

## 为什么要用 Redux

### 目标

能够说出为什么需要使用 Redux。

### 内容

[redux 中文文档](http://cn.redux.js.org/)

[redux 英文文档](https://redux.js.org/)

> 概念

Redux 是 react 中最流行的状态管理工具之一 。

> 起源

React 只是 DOM 的一个抽象层（UI 库），并不是 Web 应用的完整解决方案。因此 react 在涉及到数据的处理以及组件之间的通信时会比较复杂

-   对于大型的复杂应用来说，这两方面恰恰是最关键的。因此，只用 React，写大型应用比较吃力。
-   2014 年 Facebook 提出了 Flux 架构的概念，引发了很多的实现。
-   2015 年，Redux 出现，将 Flux 与函数式编程（reducer）结合一起，很短时间内就成为了最热门的前端架构。
-   Flux 是最早的状态管理 工具，它提供了状态管理的思想，也提供对应的实现
-   除了 Flux、Redux 之外，还有：Mobx 等状态管理工具

> 问题：为什么要用 Redux?

![with redux](images/with-redux.png)

-   主要的区别：**组件之间的通讯问题**
-   不使用 Redux (图左边) ：
    -   只能使用父子组件通讯、状态提升等 React 自带机制
    -   处理远房亲戚(非父子)关系的组件通讯时乏力
    -   组件之间的数据流混乱，出现 Bug 时难定位
-   使用 Redux (图右边)：
    -   **集中式存储和管理应用的状态**
    -   处理组件通讯问题时，**无视组件之间的层级关系**
    -   简化大型复杂应用中组件之间的通讯问题
    -   数据流清晰，易于定位 Bug

## redux 开发环境准备

### 目标

能够在 react 项目中准备 redux 开发环境

### 内容

使用 React CLI 来创建项目，并安装 Redux 包即可。

1. 创建 React 项目：`npx create-react-app redux-basic`

2. 启动项目：`yarn start`

3. 安装 Redux 包：`yarn add redux`

## Redux 核心概念-概述

### 目标

能够理解 Redux 三个核心概念的职责。

### 内容

为了让**代码各部分职责清晰、明确**，Redux 代码被分为三个核心概念：action/reducer/store

-   action -> reducer -> store

-   **action**（动作）：描述要做的事情

-   **reducer**（函数）：更新状态

-   **store**（仓库）：整合 action 和 reducer

通过例子来理解三个核心概念：

-   action：相当于公司中要做的事情，比如软件开发、测试，打扫卫生等

-   reducer：相当于公司的员工，负责干活的

-   store：相当于公司的老板

-   流程：老板(store)分配（dispatch）公司中要做的事情(action)给员工(reducer)，员工干完活把结果交给老板

## Redux 核心概念-action

### 目标

定义一个最基本的 action。

### 内容

-   action 行动（名词）

-   action：描述要做的事情，项目中的每一个功能都是一个 action，比如

    -   计数器案例：计数器加 1、减 1

    -   todomvc 案例：添加任务、删除任务等

    -   项目：登录，退出等

-   特点

    -   只描述做什么

    -   JS 对象，必须带有 `type` 属性，用于区分动作的类型

    -   根据功能的不同，可以携带额外的数据(payload)，配合该数据来完成相应功能

```js
// action
{ type： 'increment' } // +1
{ type： 'decrement', payload： 2 } // -1

// todomvc 案例
// { type: 'addTodo' }
{ type: 'addTodo', payload: '吃饭' }
{ type: 'addTodo', payload: '睡觉' }
// { type: 'removeTodo' }
{ type: 'removeTodo', payload: 3 }
```

## Redux 核心概念-action creator

### 目标

使用函数去创建一个 action。

### 内容

1.  直接使用对象来创建 action 不灵活，参数写死了。一般会使用函数来创建 action，我们把创建 action 的函数叫做 actionCreator

2.  action creator 创建函数只是简单的返回一个 action

3.  action creator 创建函数的好处是更容易被移植和测试

核心代码

```js
const increment = {
    type: 'INCREMENT',
}
const increment = () => {
    return {
        type: 'INCREMENT',
    }
}
const increment = () => ({
    type: 'INCREMENT',
})

// 使用action创建函数：（添加任务）
const addTodo = {
    type: 'ADD_TODO',
    text: '加班',
}

const addTodo = (text) => ({
    type: 'ADD_TODO',
    text,
})
addTodo('加班') // {type: '', text: ''}
addTodo('下课')
```

## Redux 核心概念-reducer

### 目标

能够掌握 reducer 的基本写法

### 内容

-   这个名字是参考了 JS 数组中的 `reduce` 这个方法

    -   数组中的 `reduce` 方法，可以来实现累积（比如，累加或者累减）

-   reducer：函数，**用来处理 action,更新状态，是 Redux 状态更新的地方**，特点如下

    -   函数签名为：`(prevState, action) => newState`

    -   接收上一次的状态和 action 作为参数，根据 action 的类型，执行不同操作，最终返回新的状态

    -   reducer 就是一个`纯函数`，接收旧的 state 和 action，返回新的 state

    -   原则：不要在 reducer 函数内部直接修改 state

核心代码

```jsx
export default function reducer(state = 100, action) {
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
```

## Redux 核心概念-纯函数

### 目标

了解纯函数的特点。

### 内容

-   纯函数是*函数式编程*中的概念，对于纯函数来说，**相同的输入总是得到相同的输出**

```jsx
function add(a, b) {
    return a + b
}
add(1, 2)

function add(a, b) {
    return a + b + Math.random()
}
add(1, 2)
add(1, 2)

// 数组中
const arr = [1, 2, 3, 4, 5]
arr.slice(1, 2)
arr.slice(1, 2)
arr.slice(1, 2)

arr.splice(1, 2)
arr.splice(1, 2)
```

-   原则：（一定要遵守！！！）

    -   不得改写参数

    -   不能调用 Date.now()或者 Math.random()等不纯的方法，因为每次会得到不一样的结果

    -   不能使用全局变量

-   reducer 必须是一个纯函数

-   纯函数主要的含义就是它不可以修改影响输入值

-   没有副作用，副作用指的是例如函数中一些异步调用或者会影响函数作用域之外的变量一类的操作

## Redux 核心概念-store

### 目标

通过 store 关联 action 和 reducer。

### 内容

-   store：仓库，Redux 的核心，整合 action 和 reducer

```jsx
// store: 整个数据的仓库，复杂关联reducer和action
// store可以给reducer分配action
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

export default store
```

-   特点：
    -   **一个应用只有一个 store**
    -   维护应用的状态，获取状态：`store.getState()`
    -   创建 store 时**接收 reducer 作为参数**：`const store = createStore(reducer)`
    -   发起状态更新时，需要分发 action：`store.dispatch(action)`
-   其他 API，
    — 订阅(监听)状态变化：`const unSubscribe = store.subscribe(() => {}) `
    — 取消订阅状态变化： `unSubscribe()`

**核心代码**

```js
import { createStore } from 'redux'

// 创建 store
const store = createStore(reducer)

// 更新状态
// dispatch 派遣，派出。表示：分发一个 action，也就是发起状态更新
store.dispatch(action)

// ---
// 其他 API

// 监听状态变化
const unSubscribe = store.subscribe(() => {
    // 状态改变时，执行相应操作
})

// 取消监听状态变化
unSubscribe()
```

## Redux 获取默认值的执行过程

-   我们发现：只要创建 store，那么，Redux 就会调用一次 reducer
-   这一次调用 reducer 的目的：**获取状态的默认值**
-   如何调用 reducer？

    -   Redux 内部第一次调用 reducer： `reducer(undefined, {type: "@@redux/INITv.a.4.t.t.p"})`

-   因为传入的状态值是 undefined ，并且是一个随机的 action type，所以：
    -   状态值因为 undefined，所以，我们设置的默认值就会生效，比如，此处的：10
    -   因为是一个随机的 action type，所以，reducer 中 switch 一定无法处理该 action，那就一定会走 default。也就是直接返回了状态的默认值，也就是：10
-   Redux 内部拿到状态值（比如，此处的 10）以后，就用这个状态值，来作为了 store 中状态的最新值
-   因此，将来当我们调用 `store.getState()` 方法来获取 Redux 状态值的时候，拿到的就是 10 了

```js
// 1 导入 createStore
import { createStore } from 'redux'
// 2 创建 store
const store = createStore(reducer)

// action => { type: 'increment' }
function reducer(state = 10, action) {
    console.log('reducer:', state, action)
    switch (action.type) {
        case 'increment':
            return state + 1
        default:
            return state
    }
}

console.log('store 状态值为：', store.getState())
```

## Redux 代码执行过程

1. 创建 store 时，Redux 就会先调用一次 reducer，来获取到默认状态
2. 当你需要更新状态时，就先分发动作 `store.dispatch(action)`
3. Redux 内部，store 就会调用 reducer，传入：上一次的状态（当前示例中就是：`10`）和 action（`{ type: 'increment' }`），计算出新的状态，并返回
4. reducer 执行完毕后，将最新的状态交给 store，store 用最新的状态替换旧状态，状态更新完毕

```js
import { createStore } from 'redux'
const store = createStore(reducer)

function reducer(state = 10, action) {
    console.log('reducer:', state, action)
    switch (action.type) {
        case 'increment':
            return state + 1
        default:
            return state
    }
}

console.log('状态值为：', store.getState()) // 10

// 发起更新状态：
// 参数： action 对象
store.dispatch({ type: 'increment' })
// 相当于： reducer(10, { type: 'increment' })

console.log('更新后：', store.getState()) // 11
```

## React-redux 基本介绍

**目标：**能够说出为什么需要使用 react-redux

**内容：**

-   问题:为什么要使用 React-Redux 绑定库?
-   回答:React 和 Redux 是两个独立的库，两者之间职责独立。因此，为了实现在 React 中使用 Redux 进行状态管理 ，就需要一种机制，将这两个独立的库关联在一起。这时候就用到 React-Redux 这个绑定库了。
-   作用:为 React 接入 Redux，实现在 React 中使用 Redux 进行状态管理。
-   react-redux 库是 Redux 官方提供的 React 绑定库。

## react-redux-基本使用

**目标**：使用[react-redux](https://react-redux.js.org/introduction/getting-started)简化 redux 在 react 项目中的使用

**内容**：

1. 介绍 react-redux => `yarn add react-redux`
2. 安装并且配置 react-redux => 参考文档
3. 优化刚才的代码

**核心代码**

`index.js`

```js
import ReactDOM from 'react-dom'
import App from './App.js'
import store from './store/store.js'
import { Provider } from 'react-redux'
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)
```

## react-redux-useSelector

**目标**：结合 hooks 使用 react-redux

**内容**：

1. react-redux 提供了 useSelector
2. useSelector： 从 Redux 的 store 中获取 状态(state) 数据。
3. selector 函数应该是个纯函数

**核心代码**

`App.js`

```js
import { useSelector } from 'react-redux'
import { addMore, addOne, subMore, subOne } from './store/action'
export default function App() {
    // 通过redux实现金钱管理
    // 通过store.getState() 就可以获取到store的状态
    const money = useSelector((state) => state)
    return (
        <div>
            <h1>我是根组件</h1>
            <div>当前的金钱：{money}</div>
            <div>
                <button>+1</button>
                <button>-1</button>
                <button>+5</button>
                <button>-5</button>
                <button>+10</button>
                <button>-10</button>
            </div>
        </div>
    )
}
```

`要点`：

-   Provider 组件依然需要使用

## react-redux-useDispatch

**目标**：结合 hooks 使用 react-redux，修改数据

**内容**：

1. react-redux 提供了 useDispatch
2. useDispatch：修改数据的 hooks

**核心代码**

`App.js`

```js
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addMore, addOne, subMore, subOne } from './store/action'
export default function App() {
    // 通过redux实现金钱管理
    // 通过store.getState() 就可以获取到store的状态
    const money = useSelector((state) => state)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>我是根组件</h1>
            <div>当前的金钱：{money}</div>
            <div>
                <button onClick={() => dispatch(addOne())}>+1</button>
                <button onClick={() => dispatch(subOne())}>-1</button>
                <button onClick={() => dispatch(addMore(5))}>+5</button>
                <button onClick={() => dispatch(subMore(5))}>-5</button>
                <button>+10</button>
                <button>-10</button>
            </div>
        </div>
    )
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

## 综合案例-todomvc
