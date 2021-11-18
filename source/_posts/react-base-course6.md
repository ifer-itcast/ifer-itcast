---
title: 06_Hooks 进阶
date: 2021-11-11 15:13:26
tags:
---

## 今日目标

✔ 掌握 useEffect 清理副作用。

✔ 掌握 useRef 操作 DOM。

✔ 掌握 useContext 组件通讯。

<!-- more -->

## useEffect 清理副作用

### 目标

掌握 useEffect 清理副作用的写法。

### 内容

-   useEffect 可以返回一个函数

    这个函数称为清理函数，在此函数内用来执行清理相关的操作（例如事件解绑、清除定时器等）。

-   清理函数的执行时机

    a，useEffect 的第 2 个参数不写，清理函数会在<font color=e32d40>**下一次副作用回调函数调用时**</font>以及<font color=e32d40>**组件卸载时**</font>执行，用于清除上一次或卸载前的副作用。

    b，useEffect 的第 2 个参数为空数组，那么会在组件卸载时会执行，相当于组件的 `componetWillUnmount`。

-   一般一个 useEffect 只用来处理一个功能，有多个功能时，建议使用多个 useEffect。

### 执行时机演示

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

`Test.js`

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

### 清理定时器演示

`Test.js`

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

### 小结

useEffect 清理函数的执行时机是什么？

## 跟随鼠标的天使 📝

### 目标

能够完成让图片跟随鼠标移动的效果。

### 步骤

1. 通过 useState 提供状态。

2. 通过 useEffect 给 document 注册鼠标移动事件

3. 在事件回调里面修改状态为鼠标的坐标。

4. 组件销毁的时候记得清理副作用（解绑事件）。

### 代码

`App.js`

```js
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

## 自定义 Hook

### 目标

能够使用自定义的 Hook 实现状态逻辑的复用。

### 内容

-   作用：将组件的状态逻辑提取到自定义 Hook 中，实现复用。

-   自定义 Hook 是一个函数，规定函数名称必须以 use 开头，React 内部会据此来区分是否是一个 Hook。

-   自定义 Hook 只能在函数组件或其他自定义 Hook 中使用，否则，会报错！

### 案例

封装一个获取鼠标位置的 Hook，`hooks.js`

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

### 封装记录滚动位置的 Hook

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

### 小结

自定义 Hook 的作用/目的是什么？

## useEffect 发送请求

### 目标

能够在函数组件中通过 useEffect 发送 AJAX 请求。

### 内容

-   在函数组件中，可以使用 useEffect 发送请求获取数据。

-   注意：effect 只能是一个同步函数，不能使用 async。

-   原因：如果 effect 是 async 的，此时返回值是 Promise 对象，这样的话，就无法保证清理函数被立即调用。

-   为了使用 async/await 语法，可以在 effect 内部再次创建 async 函数并调用。

错误演示

```jsx
// 发请求是没问题，但涉及清理副作用的操作就出事了
useEffect(async () => {
    const res = await xxx()
    return () => {}
}, [])
```

正确使用

```js
useEffect(() => {
    async function fetchMyAPI() {
        let url = 'http://something/' + productId
        const response = await myFetch(url)
    }

    fetchMyAPI()
}, [productId])
```

### 演示发请求

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

## useRef 操作 DOM

### 目标

能够使用 useRef 操作 DOM。

### 内容

-   使用场景：在 React 中进行 DOM 操作时，用来获取 DOM。

-   作用：返回一个带有 current 属性的对象，通过该对象就可以进行 DOM 操作了。

### 使用

-   参数：在获取 DOM 时，一般都设置为 null。

-   返回值：包含 current 属性的对象。

-   注意：只要在 React 中进行 DOM 操作，都可以通过 useRef 来获取 DOM。

-   注意：useRef 不仅仅可以用于获取 DOM，还可以获取类组件实例。

### useRef 获取 DOM

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

### useRef 获取类组件

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

## createContext

### 目标

回顾 Context 跨级组件通讯的使用。

### 内容

-   使用场景：跨组件共享数据。

-   Context 作用：实现跨组件传递数据，而不必在每个级别手动传递 props，简化组件之间的数据传递过程。

![image-20210901215518365](/resource/images/image-20210901215518365-16347403277492-16362080009754.png)

-   <Context.Provider value>：通过 value 属性提供数据。

-   <Context.Consumer>：通过 render props 模式，在 JSX 中获取 Context 中提供的数据。

-   使用 Provider 组件，如果传递了 value，Consumer 获取到的是 Provider 中的 value 属性值。

-   如果没有传递 value，Consumer 获取到的是 createContext(defaultValue) 的 defaultValue 值。

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

## useContext 使用

### 目标

能够通过 useContext 实现跨级组件通讯。

### 内容

-   作用：在函数组件中，获取 Context.Provider 提供的数据。

-   useContext 的参数：Context 对象，即通过 createContext 函数创建的对象。

-   useContext 的返回值：Context 中提供的 value 数据。

```js
import { useContext } from 'react'
import { context } from './countContext'

export default function Child() {
    const value = useContext(context)
    return (
        <div>
            Child
            <h3>{value.count}</h3>
        </div>
    )
}
```

## 购物车案例

### 获取列表数据

#### 目标

发送请求，获取到购物车数据。

#### 步骤

1. 安装 axios。

2. 使用 useState 提供状态。

3. 使用 useEffect 发送请求获取数据。

需求：本地有，就用本地的，本地没有，从远端获取。

`App.js`

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
;<div className='right'>
    <div className='top'>{goods_name}</div>
    <div className='bottom'>
        <span className='price'>¥ {goods_price}</span>
        <MyCount />
    </div>
</div>
```

### 数量控制 层层传递

`components/MyCount/index.js`

```js
export default function MyCount({ count, changeCount }) {
    const plus = () => {
        changeCount(count + 1)
    }
    const minus = () => {
        if (count <= 1) return
        changeCount(count - 1)
    }
    return (
        <div className='my-counter'>
            <button type='button' className='btn btn-light' onClick={minus}>
                -
            </button>
            <input type='number' className='form-control inp' value={count} />
            <button type='button' className='btn btn-light' onClick={plus}>
                +
            </button>
        </div>
    )
}
```

`components/GoodsItem/index.js`

```js
export default function GoodsItem({ goods_count, goods_img, goods_name, goods_price, goods_state, id, changeState, changeCount }) {
    return (
        <div className='my-goods-item'>
            <div className='right'>
                <div className='top'>{goods_name}</div>
                <div className='bottom'>
                    <span className='price'>¥ {goods_price}</span>
                    <MyCount count={goods_count} changeCount={(count) => changeCount(id, count)} />
                </div>
            </div>
        </div>
    )
}
```

`App.js`

```js
export default function App() {
    const changeCount = (id, count) => {
        setList(
            list.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        goods_count: count,
                    }
                } else {
                    return item
                }
            })
        )
    }

    return (
        <div className='app'>
            <MyHeader>购物车</MyHeader>
            {list.map((item) => (
                <GoodsItem key={item.id} {...item} changeState={changeState} changeCount={changeCount}></GoodsItem>
            ))}
        </div>
    )
}
```

### 数量控制 useContext

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
            <GoodsItem key={item.id} {...item} changeState={changeState}></GoodsItem>
        ))}

        <MyFooter list={list} changeAll={changeAll}></MyFooter>
    </div>
</Context.Provider>
```

3. 在 `components/GoodsItem/index.js` 中把 id 传递过去

```jsx
<div className='right'>
    <div className='top'>{goods_name}</div>
    <div className='bottom'>
        <span className='price'>¥ {goods_price}</span>
        <MyCount count={goods_count} id={id} />
    </div>
</div>
```

4. 在 myCount 组件中，使用 useContext 获取数据

```jsx
import React, { useContext } from 'react'
import { Context } from '../../App'
import './index.scss'

export default function MyCount({ count, id }) {
    const { changeCount } = useContext(Context)
    const plus = () => {
        changeCount(id, count + 1)
    }
    const minus = () => {
        if (count <= 1) return
        changeCount(id, count - 1)
    }
    return (
        <div className='my-counter'>
            <button type='button' className='btn btn-light' onClick={minus}>
                -
            </button>
            <input type='number' className='form-control inp' value={count} />
            <button type='button' className='btn btn-light' onClick={plus}>
                +
            </button>
        </div>
    )
}
```

输入处理，`components/MyCount/index.js`

```js
import React, { useContext } from 'react'
import { Context } from '../../App'
import './index.scss'

export default function MyCount({ count, id }) {
    const { changeCount } = useContext(Context)
    const plus = () => {
        changeCount(id, count + 1)
    }
    const minus = () => {
        if (count <= 1) return
        changeCount(id, count - 1)
    }
    const handleChange = (e) => {
        let num = +e.target.value
        if (e.target.value < 0) {
            num = 0
        }
        changeCount(id, num)
    }
    return (
        <div className='my-counter'>
            <button type='button' className='btn btn-light' onClick={minus}>
                -
            </button>
            <input type='number' className='form-control inp' value={count} min='0' onChange={handleChange} />
            <button type='button' className='btn btn-light' onClick={plus}>
                +
            </button>
        </div>
    )
}
```
