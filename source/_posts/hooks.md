---
title: Hooks
date: 2021-10-24 11:11:45
tags:
---

React Hooks 是 React 16.8 引入的新特性，允许我们在不使用 Class 的前提下使用 state 和其他特性。React Hooks 要解决的问题是状态共享，是继 render-props 和 higher-order components 之后的第三种状态逻辑复用方案，不会产生 JSX 嵌套地狱问题。

<!-- more -->

## useState

-   基本使用

```jsx
import React, { useState } from 'react'

export default function App() {
    // 声明一个叫 count 的变量，默认 0，通过 setCount 方法可以用来修改 count
    const [count, setCount] = useState(0)
    return (
        <div>
            <p>You clicked {count} times</p>
            <button type='button' class='btn btn-danger' onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}
```

-   setCount 参数可以是一个函数

```jsx
import React, { useState } from 'react'

export default function App() {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);

        setCount((prevState) => prevState + 1)
        setCount((prevState) => prevState + 1)
        setCount((prevState) => prevState + 1)
    }
    return (
        <div>
            <p>You clicked {count} times</p>
            <button type='button' className='btn btn-danger' onClick={handleClick}>
                Click me
            </button>
        </div>
    )
}
```

-   class 写法

```jsx
import React from 'react'
export default class App extends React.Component {
    state = {
        count: 0,
    }
    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button type='button' className='btn btn-danger' onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Click me
                </button>
            </div>
        )
    }
}
```

-   一个问题

`index.js`

```js
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App defaultCount={3} />, document.querySelector('#root'))
```

`App.jsx`

```jsx
import React, { useState } from 'react'

export default function App(props) {
    console.log('每次点击按钮渲染这里都会执行，其实 defaultCount 的赋值没必要每次都进行')
    const defaultCount = props.defaultCount || 0
    const [count, setCount] = useState(defaultCount)
    const handleClick = () => {
        setCount((prevState) => prevState + 1)
    }
    return (
        <div>
            <p>You clicked {count} times</p>
            <button type='button' className='btn btn-danger' onClick={handleClick}>
                Click me
            </button>
        </div>
    )
}
```

-   解决问题

`App.jsx`

```jsx
import React, { useState } from 'react'

export default function App(props) {
    // useState 参数可以是一个回调函数，可以把初始值当做此函数的返回值
    const [count, setCount] = useState(() => {
        console.log('这里只是初始化时执行一次！')
        return props.defaultCount || 0
    })
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}
```

-   复杂数据状态的修改

```jsx
import React, { useState } from 'react'

export default function App() {
    const [fruits, setFruits] = useState([
        {
            name: 'apple',
            count: 1,
        },
        {
            name: 'banana',
            count: 2,
        },
    ])

    function handleClick(index) {
        const newFruits = [...fruits]
        newFruits[index].count++
        setFruits(newFruits)
    }

    return (
        <div>
            <ul>
                {fruits.map((item, index) => (
                    <li key={index}>
                        {item.name}
                        {item.count}
                        <button onClick={(e) => handleClick(index)}>add</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
```

## useEffect

作用：可以在函数组件中执行副作用操作

-   基本使用

`App.jsx`

```jsx
import React, { useState, useEffect } from 'react'

export default function App() {
    const [count, setCount] = useState(0)
    // 模拟 componentDidMount 和 componentDidUpdate
    useEffect(() => {
        // 初始化和任何状态发生变化的时触发
        document.title = `You clicked ${count} times`
    })

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}
```

-   相当于 class 的如下写法

`App.jsx`

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        count: 0,
    }
    componentDidMount() {
        document.title = this.state.count
    }
    componentDidUpdate() {
        document.title = this.state.count
    }
    render() {
        return (
            <div>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>add</button>
            </div>
        )
    }
}
```

-   useEffect 是可以写多个的

```jsx
import React, { useEffect, useState } from 'react'

export default function App() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        // 修改 DOM，只期望 count 状态变化时执行
        document.title = count
    }, [count])
    useEffect(() => {
        // 网络请求、订阅事件，期望只执行一次
    }, [])
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
        </div>
    )
}
```

-   清除 Effect

有些副作用可能需要清除，需要返回一个函数！

```jsx
import { useState, useEffect } from 'react'

export default function App() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })
    const onResize = () => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }
    useEffect(() => {
        // useEffect 第二个参数传递空数组，初始化时才会执行，而绑定事件的操作也只需要执行这一次！
        window.addEventListener('resize', onResize)
        return () => {
            // useEffect 第一个参数中返回的函数，在组件卸载时会触发
            window.removeEventListener('resize', onResize)
        }
    }, [])
    return (
        <div>
            <p id='size'>
                width: {size.width}, height: {size.height}
            </p>
        </div>
    )
}
```

-   一个问题

由于选择元素绑定事件的操作只是初始化的时候对当前的 DOM 元素执行了一次

一旦 count 变化（DOM 元素被替换/其实是销毁了，下次加载的又是全新的），点击事件的效果就“失效”了。DOM 元素在相同标签下替换无此问题，因为 DOM Diff 时会被复用！

```jsx
import React, { useState, useEffect } from 'react'

export default function App() {
    const [count, setCount] = useState(0)
    const onClick = () => {
        console.log('一旦绑定事件的元素被替换过了，此元素就不再具备事件效果了，因为新替换的元素并没有进行事件绑定')
    }
    useEffect(() => {
        document.querySelector('#size').addEventListener('click', onClick)
        return () => {
            document.querySelector('#size').removeEventListener('click', onClick)
        }
    }, [])
    return (
        <div>
            <p>{count}</p>
            <button
                onClick={() => {
                    setCount(count + 1)
                }}
            >
                click
            </button>
            {count % 2 ? <div id='size'>hello world2</div> : <p id='size'>hello world1</p>}
        </div>
    )
}
```

-   解决方案

有涉及到【根据状态】来进行元素切换（此元素绑定的有事件），每次状态变化时都进行重新绑定！

```js
useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick)
    return () => {
        document.querySelector('#size').removeEventListener('click', onClick)
    }
}, [count])
```

## useContext

-   基本使用

`App.jsx`

```jsx
import React, { useState } from 'react'
import Foo from './components/Foo'
import Bar from './components/Bar'
import Counter from './components/Counter'
import { CounterContext } from './context'

export default function App() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>click {count}</button>
            <CounterContext.Provider value={count}>
                <Foo />
                <Bar />
                <Counter />
            </CounterContext.Provider>
        </div>
    )
}
```

-   基础写法：适用于类和函数

`components/Foo/index.jsx`

```jsx
import React, { Component } from 'react'
import { CounterContext } from '../../context'

export default class Foo extends Component {
    render() {
        return <CounterContext.Consumer>{(count) => <h2>{count}</h2>}</CounterContext.Consumer>
    }
}
```

-   优雅写法：适用于类，搞不定多状态嵌套

```jsx
import React, { Component } from 'react'
import { CounterContext } from '../../context'

export default class Foo extends Component {
    static contextType = CounterContext
    render() {
        return <h2>{this.context}</h2>
    }
}
```

-   Hooks 写法：适用于函数

```jsx
import { useContext } from 'react'
import { CounterContext } from '../../context'

export default function Foo() {
    const count = useContext(CounterContext)
    return <h2>{count}</h2>
}
```

## useReducer

useReducer 是 useState 的替代方案！在使用上几乎跟 Redux 中 reducer 的差不多，最大的差异是无法使用 redux 提供的中间件，还有一点需要注意，如果 reducer 函数被不同的组件使用的话，共享的只是函数本身，状态不会共享（不会相互影响）

`App.jsx`

```jsx
import React, { useReducer } from 'react'

const initialState = {
    name: 'ifer',
    count: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + action.payload }
        case 'decrement':
            return { ...state, count: state.count - action.payload }
        default:
            throw new Error()
    }
}
export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement', payload: 5 })}>-</button>
        </div>
    )
}
```

## useCallback

useCallback 会返回一个函数的 memoized（记忆的）值，在依赖不变的情况下，即便多次定义的时候返回的值也是相同的。

-   问题重现

App 组件的 props 或者状态发生变化就会触发重渲染，即使跟 Foo 组件不相关，倘若 Foo 组件是一个大型的组件树，Virtual DOM Diff 的浪费是巨大的！

```jsx
import React, { Component } from 'react'

class Foo extends Component {
    render() {
        console.log('Foo render')
        return <div>hello world</div>
    }
}

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
        const { count } = this.state
        return (
            <div>
                {count}
                <button onClick={this.handleClick}>add</button>
                <Foo />
            </div>
        )
    }
}
```

-   解决方案

```jsx
import React, { Component, PureComponent } from 'react'

class Foo extends PureComponent {
    render() {
        console.log('Foo render')
        return <div>hello world</div>
    }
}

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
        const { count } = this.state
        return (
            <div>
                {count}
                <button onClick={this.handleClick}>add</button>
                <Foo />
            </div>
        )
    }
}
```

-   传递过去函数

每次传递过去一个新的函数，子组件还是会进行更新

```jsx
import React, { Component, PureComponent } from 'react'

class Foo extends PureComponent {
    render() {
        console.log('Foo render')
        return <div>hello world</div>
    }
}

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
        const { count } = this.state
        return (
            <div>
                {count}
                <button onClick={this.handleClick}>add</button>
                <Foo
                    doSomething={() => {
                        console.log('do something')
                    }}
                />
            </div>
        )
    }
}
```

解决，把函数抽离出去

```jsx
import React, { Component, PureComponent } from 'react'

class Foo extends PureComponent {
    render() {
        console.log('Foo render')
        return <div>hello world</div>
    }
}

export default class App extends Component {
    state = {
        count: 0,
    }
    handleClick = () => {
        this.setState({
            count: this.state.count + 1,
        })
    }
    doSomething = () => {
        console.log('do something')
    }
    render() {
        const { count } = this.state
        return (
            <div>
                {count}
                <button onClick={this.handleClick}>add</button>
                <Foo doSomething={this.doSomething} />
            </div>
        )
    }
}
```

-   Hooks 方案

类组件可以通过 this 挂载函数，但函数组件就没有这么轻松了！

```jsx
import React, { useState, memo, useCallback } from 'react'

const Foo = memo(function Foo() {
    console.log('Foo render')
    return <div>hello world</div>
})

export default function App() {
    const [count, setCount] = useState(0)
    // 第二个参数为空数组代表无论什么情况下该函数的句柄/引用都不会发生改变
    // 非空数组，数组中的任一项一旦值或者引用发生改变，useCallback 就会重新返回一个新的记忆函数提供给后面进行渲染
    const doSomething = useCallback(() => {
        console.log('do something')
    }, [])
    return (
        <div>
            {count}
            <button onClick={() => setCount(count + 1)}>add</button>
            <Foo doSomething={doSomething} />
        </div>
    )
}
```

## useMemo

useCallback 的功能完全可以由 useMemo 所取代，如果你想通过使用 useMemo 返回一个记忆函数也是完全可以的

```js
useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs)
```

上面的例子可以用 useMemo 改写如下

```js
const doSomething = useMemo(() => {
    console.log('初始化的时候会执行一次！')
    return () => {
        console.log('do something')
    }
}, [])
```

区别：useCallback 不会执行第一个参数函数，而是将它返回给你；useMemo 会执行第一个函数并且将函数执行结果返回给你。所以 useCallback 常用记忆函数，生成记忆后的函数并传递给子组件使用，而 useMemo 更适合经过函数计算得到一个确定的值，比如记忆组件。

```jsx
import React, { useState, useMemo } from 'react'

function Child(props) {
    return <div>child: {props.num}</div>
}

function Parent({ num }) {
    // 只有在第二个参数 num 的值发生变化时，才会触发子组件的更新
    const child = useMemo(() => {
        console.log(233)
        return <Child num={num} />
    }, [num])
    return <div>{child}</div>
}

function App() {
    const [count, setCount] = useState(0)
    // 初始化时执行或 count === 3 整体的状态（true or false）发生变化时才会触发函数的执行
    const num = useMemo(() => count * 2, [count === 3])
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>click me</button>
            <Parent num={num} />
        </div>
    )
}
```

减少函数不必要的执行

```jsx
import React, { useState, useMemo } from 'react'

function getSum(count) {
    let sum = 0
    for (let i = 1; i <= count; i++) {
        sum += i
    }
    console.log('触发了吗')
    return sum
}

const Test = () => {
    const [count, setCount] = useState(10)
    const [show, setShow] = useState(true)

    // 每次点的是 show 按钮也会触发 getSum 的重新计算，并不期望！
    // const total = getSum(count);
    const total = useMemo(() => getSum(count), [count])
    return (
        <div>
            <h2>{total}</h2>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setShow(!show)}>show</button>
        </div>
    )
}
```
