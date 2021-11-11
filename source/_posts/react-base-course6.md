---
title: 06_Hooks 进阶
date: 2021-11-11 15:13:26
tags:
---

## 今日目标

✔ useState 回调函数形式的参数。

✔ useEffect 清理副作用。

✔ useRef 操作 DOM。

✔ useContext 组件通讯。

<!-- more -->

## useState-回调函数参数

### 目标

能够给 useState 通过回调函数的形式给 useState 提供初始参数。

**内容：**

useState 的参数可以有两种形式：

-   `useState(普通的数据)` => useState(0) / useState('abc')

-   `useState(回调函数)` => useState(() => { return 初始值 })

    a，回调函数的返回值就是状态的初始值。

    b，该回调函数只会触发一次。

-   该使用哪种形式？

    a，如果状态就是一个普通的数据（比如，字符串、数字、数组等）都可以直接使用 `useState(普通的数据)`。

    b，如果状态是经过一些计算得到的，此时，推荐使用 `useState(回调函数)`。

```js
// 第一种
// 这种情况下，只要组件更新，此处的 localStorage 等操作就会执行
// const initList = JSON.parse(localStorage.getItem('list')) || comments
// const [list, setList] = useState(initList)

// 优化方式1：useState 的初始化只会在第一次进行
const [list, setList] = useState(JSON.parse(localStorage.getItem('list')) || arr)

// 优化方式2：适用于更加复杂的逻辑处理
// 这种方式，因为回调函数只会执行一次，所以，此处的 localStorage 等操作代码只会执行一次
const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem('comments')) || comments
})
```

## useEffect 清理副作用

### 目标

能够在组件卸载的时候，清除注册的事件。

### 内容

-   effect 的返回值是可选的，也可以返回一个清理函数，用来执行事件解绑、清除定时器等清理操作。

-   清理函数的执行时机：

    a，useEffect 的第二个参数不写，清理函数会在下一次副作用回调函数调用的时候以及组件卸载时执行，用于清除上一次或卸载前的副作用。

    b，useEffect 的第二个参数为空数组，那么会在组件卸载时会执行。相当于组件的 `componetWillUnmount`。

-   推荐：一个 useEffect 只处理一个功能，有多个功能时，使用多次 useEffect。

执行时机演示，`Test.js`

```jsx
import React, { useEffect, useState } from 'react'

export default function Test() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('effect')
        return () => {
            // 点击按钮的时候会先清理上一次的副作用，在执行 useEffect
            console.log('clear effect')
        }
    })
    const handleClick = () => {
        setCount(count + 1)
    }
    return (
        <div>
            {count}
            <button onClick={handleClick}>click</button>
        </div>
    )
}
```

`App.js`

```jsx
import React, { useState } from 'react'
import Test from './Test'

export default function App() {
    const [flag, setFlag] = useState(true)
    return (
        <div>
            {flag && <Test />}
            <button onClick={() => setFlag(!flag)}>销毁/创建</button>
        </div>
    )
}
```

定时器演示：`Test.js`

```jsx
import React, { useEffect, useState } from 'react'

export default function Test() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(1)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])
    const handleClick = () => {
        setCount(count + 1)
    }
    return (
        <div>
            {count}
            <button onClick={handleClick}>click</button>
        </div>
    )
}
```

## 案例-获取当前鼠标位置

### 目标

能够实现案例，让图片跟随鼠标移动。

### 内容

-   通过 useState 提供状态。

-   通过 useEffect 给 document 注册鼠标移动事件。

-   在组件销毁的时候清理副作用。

```jsx
import React, { useState, useEffect } from 'react'
import avatar from './images/avatar.png'

export default function App() {
    const [pos, setPos] = useState({
        x: 0,
        y: 0,
    })
    useEffect(() => {
        const move = (e) => {
            setPos({
                x: e.pageX,
                y: e.pageY,
            })
        }
        document.addEventListener('mousemove', move)
        return () => {
            document.removeEventListener('mousemove', move)
        }
    }, [])
    return (
        <div>
            <img src={avatar} alt='头像' style={{ position: 'absolute', top: pos.y, left: pos.x }} />
        </div>
    )
}
```

## 自定义 hooks

### 目标

能够使用自定义 hooks 实现状态的逻辑复用。

### 内容

-   除了使用内置的 Hooks 之外，还可以创建自己的 Hooks（自定义 Hooks）。

-   使用场景：将组件状态逻辑提取到可重用的函数（自定义 Hooks）中，实现状态逻辑复用。

-   内置 Hooks 为函数组件赋予了 class 组件的功能；在此之上，自定义 Hooks 针对不同组件可以实现不同状态逻辑复用。

    -   自定义 Hooks 是一个函数，规定函数名称必须以 use 开头，React 就是通过函数名称是否以 use 开头来判断是不是 Hook。

    -   Hook 只能在函数组件中或其他自定义 Hook 中使用，否则，会报错！

    -   自定义 Hook 用来提取组件的状态逻辑，根据不同功能可以有不同的参数和返回值（就像使用普通函数一样）。

核心代码

hooks.js

```jsx
import { useState, useEffect } from 'react'
export const useMouse = () => {
    const [pos, setPos] = useState({
        x: 0,
        y: 0,
    })
    useEffect(() => {
        const move = (e) => {
            setPos({
                x: e.pageX,
                y: e.pageY,
            })
        }
        document.addEventListener('mousemove', move)
        return () => {
            document.removeEventListener('mousemove', move)
        }
    }, [])
    return pos
}
```

App.js

```js
import React from 'react'
import avatar from './images/avatar.png'
import { useMouse } from './hooks'
export default function App() {
    const pos = useMouse()
    return (
        <div>
            <img src={avatar} alt='头像' style={{ position: 'absolute', top: pos.y, left: pos.x }} />
        </div>
    )
}
```

尝试封装记录滚动位置的 Hook

```js
export const useScroll = () => {
    const [scroll, setScroll] = useState({
        scrollLeft: 0,
        scrollTop: 0,
    })
    useEffect(() => {
        const scroll = (e) => {
            setScroll({
                scrollLeft: window.pageXOffset,
                scrollTop: window.pageYOffset,
            })
        }
        window.addEventListener('scroll', scroll)
        return () => {
            window.removeEventListener('scroll', scroll)
        }
    }, [])
    return scroll
}
```

## useEffect 发送请求

### 目标

能够在函数组件中通过 useEffect 发送 ajax 请求。

### 内容

-   在组件中，使用 useEffect Hook 发送请求获取数据（side effect）。

-   注意：effect 只能是一个同步函数，不能使用 async。

-   如果 effect 是 async 的，此时返回值是 Promise 对象，这样的话，就无法保证清理函数被立即调用。

-   为了使用 async/await 语法，可以在 effect 内部创建 async 函数，并调用。

错误演示

```jsx
// 发请求是没问题，但清理副作用的操作就出事了
useEffect(async () => {
    const res = awiat xxx()
    return ()=> {}
}, [])
```

正确使用

```js
useEffect(() => {
    async function fetchMyAPI() {
        let url = 'http://something/' + productId
        let config = {}
        const response = await myFetch(url)
    }

    fetchMyAPI()
}, [productId])
```

演示发请求

```jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
    const [list, setList] = useState([])
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('http://geek.itheima.net/v1_0/user/channels')
            setList(res.data.data.channels)
        }
        getData()
    }, [])
    return (
        <ul>
            {list.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    )
}
```

## useRef-操作 DOM

### 目标

能够使用 useRef 操作 DOM。

### 内容

-   使用场景：在 React 中进行 DOM 操作时，用来获取 DOM

-   作用：返回一个带有 current 属性的可变对象，通过该对象就可以进行 DOM 操作了。

### 使用

-   参数：在获取 DOM 时，一般都设置为 null。

-   返回值：包含 current 属性的对象。

-   注意：只要在 React 中进行 DOM 操作，都可以通过 useRef Hook 来获取 DOM（比如，获取 DOM 的宽高等）。

-   注意：useRef 不仅仅可以用于操作 DOM，还可以操作类组件。

代码展示，useRef 获取 DOM

```jsx
/*
  1. 使用 useRef 能够创建一个 ref 对象，有 current 属性，{ current: null }
    const xxxRef = useRef(null)

  2. 通过 ref 属性关联到某个 DOM 对象上后，{ current: DOM }
    <div ref={xxxRef}></div>

  3. 可以通过 xxxRef.current 访问到对应的 DOM
*/
import React, { useRef } from 'react'

const App = () => {
    const inputRef = useRef(null)
    const add = () => {
        console.log(inputRef.current.value)
    }
    return (
        <section>
            <input placeholder='请输入内容' ref={inputRef} />
            <button onClick={add}>添加</button>
        </section>
    )
}

export default App
```

代码展示，useRef 获取类组件

`App.js`

```jsx
import React, { useRef } from 'react'
import Test from './Test'

const App = () => {
    const testClassCmp = useRef(null)
    const add = () => {
        testClassCmp.current.handleClick()
    }
    return (
        <section>
            <Test ref={testClassCmp} />
            <button onClick={add}>添加</button>
        </section>
    )
}

export default App
```

`Test.js`

```js
import React, { Component } from 'react'

export default class Test extends Component {
    handleClick() {
        console.log(1)
    }
    render() {
        return <div>类组件</div>
    }
}
```

## createContext 基础

### 目标

回顾 context 跨级组件通讯的使用。

### 内容

-   使用场景：跨组件共享数据。

-   Context 作用：实现跨组件传递数据，而不必在每个级别手动传递 props，简化组件之间的数据传递过程。

![image-20210901215518365](/resource/images/image-20210901215518365-16347403277492-16362080009754.png)

-   <Context.Provider value>：通过 value 属性提供数据。

-   <Context.Consumer>：通过 render props 模式，在 JSX 中获取 Context 中提供的数据。

-   如果提供了 Provider 组件，Consumer 获取到的是 Provider 中 value 属性的值。

-   如果没有提供 Provider 组件，Consumer 获取到的是 createContext(defaultValue) 的 defaultValue 值。

代码演示

`countContext.js`

```js
import { createContext } from 'react'
export const context = createContext()
```

`App.js`

```js
import React from 'react'
import { context } from './countContext'
import Parent from './Parent'

export default function App() {
    return (
        <context.Provider value={{ count: 0 }}>
            App
            <hr />
            <Parent />
        </context.Provider>
    )
}
```

`Parent.js`

```js
import Child from './Child'
export default function Parent() {
    return (
        <div>
            Parent
            <hr />
            <Child />
        </div>
    )
}
```

`Child.js`

```js
import { context } from './countContext'

export default function Child() {
    return (
        <context.Consumer>
            {(value) => {
                return (
                    <div>
                        Child
                        <h3>{value.count}</h3>
                    </div>
                )
            }}
        </context.Consumer>
    )
}
```

## useContext-使用

### 目标

能够通过 useContext hooks 实现跨级组件通讯。

### 内容

作用：在函数组件中，获取 Context 中的值。要配合 Context 一起使用。

`useContext Hook` 与` <Context.Consumer>` 的区别：获取数据的位置不同，

-   `<Context.Consumer>`：在 JSX 中获取 Context 共享的数据。

-   useContext：在 JS 代码中获取 Context 的数据。

![image-20210901215634469](images/image-20210901215634469-16347403601514-16362080009765.png)

解释：

-   useContext 的参数：Context 对象，即：通过 createContext 函数创建的对象。

-   useContext 的返回值：Context 中提供的 value 数据。

## 购物车案例

### 发送请求-获取列表数据

#### 目标

发送请求，获取到购物车数据。

#### 步骤

1. 安装 axios。

2. 使用 useState hooks 提供状态。

3. 使用 useEffect 发送请求获取数据。

代码

-   安装 axios

```bash
yarn add axios
```

-   发送请求，获取数据

```jsx
useEffect(() => {
    // 判断本地是否有数据
    const arr = JSON.parse(localStorage.getItem('list')) || []
    if (arr.length) {
        return setList(arr)
    }
    // 本地没有数据，发送请求，获取数据
    const getList = async () => {
        const res = await axios.get('https://www.escook.cn/api/cart')
        setList(res.data.list)
    }
    getList()
}, [])
```

### MyCount 组件的封装

-   基本结构

```jsx
import React from 'react'
import './index.scss'
export default function MyCount() {
    return (
        <div className='my-counter'>
            <button type='button' className='btn btn-light'>
                -
            </button>
            <input type='number' className='form-control inp' value='1' />
            <button type='button' className='btn btn-light'>
                +
            </button>
        </div>
    )
}
```

-   样式

```scss
.my-counter {
    display: flex;
    .inp {
        width: 45px;
        text-align: center;
        margin: 0 10px;
    }
}
```

-   在 GoodsItem 组件中渲染

```jsx
import MyCount from '../MyCount'
;<MyCount></MyCount>
```

### 数量控制-useContext

#### 目标

使用 useContext 优化组件的通讯。

步骤

1. 在 App.js 中创建 Context 对象，并且导出

```jsx
export const Context = createContext()
```

2. 在 App.js 中，通过 Provider 提供方法

```jsx
<Context.Provider value={{ changeCount }}>
    <div className='app'>
        <MyHeader>购物车</MyHeader>

        {list.map((item) => (
            <GoodsItem key={item.id} {...item} changeState={changeState} changeCount={changeCount}></GoodsItem>
        ))}

        <MyFooter list={list} changeAll={changeAll}></MyFooter>
    </div>
</Context.Provider>
```

3. 在 myCount 组件中，使用 useContext 获取数据

```jsx
import { Context } from '../../App'

const { changeCount } = useContext(Context)
```

### 数量的控制
