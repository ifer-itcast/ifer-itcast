---
title: 05_Hooks 基础
date: 2021-11-10 09:36:20
tags:
---

-   React Hooks 介绍。

-   useState hook。

-   useEffect hook。

<!-- more -->

## Hooks 是什么

### 目标

能够说出 React Hooks 是什么？

### 内容

-   `Hooks`：钩子、钩住，是 **React v16.8** 中的新增功能。

-   作用：为**函数组件**提供状态、生命周期等原本 class 组件中提供的功能，可以理解为通过 Hooks 为函数组件钩入 class 组件的特性。

-   注意：**Hooks 只能在函数组件中使用**，自此，函数组件成为 React 的新宠儿。

-   React v16.8 以前： class 组件（提供状态和生命周期） + 函数组件（展示内容）。

-   React v16.8 及其以后：

    1. class 组件（提供状态和生命周期） + 函数组件（展示内容）。

    2. Hooks（提供状态和生命周期） + 函数组件（展示内容）。

    3. 混用以上两种方式：部分功能用 class 组件，部分功能用 Hooks + 函数组件。

### 总结

-   虽然有了 Hooks，但 React 官方并没有计划从 React 库中移除 class。

-   有了 Hooks 以后，不能再把**函数组件**称为无状态组件了，因为 Hooks 为函数组件提供了状态。

## 为什么要有 Hooks

### 目标

能够说出为什么要有 hooks，hooks 能解决什么问题？

### 内容

**1. 组件的状态逻辑复用问题**

-   在 Hooks 之前，组件的状态逻辑复用经历了：mixins（混入）、HOC（高阶组件）、render props 等模式。

-   （早已废弃）mixins 的问题：1 数据来源不清晰 2 命名冲突。

-   HOC、render props 的问题：重构组件结构，导致组件形成 JSX 嵌套地狱问题。

**2. class 组件自身的问题**

-   选择：函数组件和 class 组件之间的区别以及使用哪种组件更合适。

-   需要理解 class 中的 this 是如何工作的。

-   同一业务的状态或业务逻辑被拆分到不同位置。

```js
{
    state = {
        count: 0
    },
    fn = () => {
        this.setState({ count: this.state.count + 1 })
    },
    componentDidMount() {
        window.addEventListener('resize', this.fn)
    },
    componentWillUnmount(){
        window.addEventListener('resize', this.fn)
    }
}
```

-   相比于函数组件来说，不利于代码压缩和优化，也不利于 TS 的类型推导。

```bash
# 例如不能把 componentDidMount 压缩成 c
# Webpack 打包的时候会自动把没有用到的代码进行 tree shaking，但是对于类组件来说，例如即便没有用到 componentDidMount，其实相关代码也会打包，因为它属于类的一部分
# 例如写 this 的时候没有提示，因为 this 只有在调用的时候才能确定指向，编写代码期间 TS 是不知道的
```

### 总结

正是由于 React 原来存在的这些问题，才有了 Hooks 来解决这些问题。

## hooks 渐进策略

### 目标

能够理解在 React 中什么场景应该使用 hooks。

### 内容

-   React 没有计划从 React 中移除 class [文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)。

-   Hook 和现有代码可以同时工作，你可以渐进式地使用他们。

    -   不推荐：大规模使用 Hooks 直接重构现有组件。

    -   推荐：新功能用 Hooks，复杂功能 Hooks 实现不了的，也可以继续用 class。

    -   找一个功能简单、非核心功能的组件开始使用 hooks。

-   class 组件相关的 API 在 hooks 中可以不用。

    -   state 与 setState。

    -   钩子函数，`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`。

    -   `this` 相关的用法。

-   原来学习的内容还是要用的。

    -   JSX：`{}`、`onClick={handleClick}`、条件渲染、列表渲染、样式处理等。

    -   组件：函数组件、组件通讯。

    -   React 开发理念：`单向数据流`、`状态提升` 等。

    -   解决问题的思路、技巧、常见错误的分析等。

### 总结

-   React 没有计划从 React 中移除 class。

-   React 将继续为 class 组件提供支持。

-   可以在项目中同时使用 hooks 和 class。

## useState 基本使用

### 目标

能够使用 `useState` 为函数组件提供状态。

### 内容

-   一个 Hook 就是一个特殊的函数，可以函数组件中获取或操作状态等。

-   从名称上看，Hook 都以 use 开头`useXxx`。

-   `useState`使用场景：当你想要在**函数组件中，使用组件状态时**，就要使用 **useState** Hook 了。

-   `useState`作用：为函数组件提供状态（state）和修改状态的方法。

### 使用

1. 导入 `useState` 函数。

2. 调用 `useState` 函数，并传入状态的初始值。

3. 从 `useState` 函数的返回值中，拿到状态和修改状态的函数。

4. 在 JSX 中展示状态。

5. 在按钮的点击事件中调用修改状态的函数，来更新状态。

核心代码

```jsx
// #1 导入 useState
import React, { useState } from 'react'

const App = () => {
    // #2 在函数中调用，返回一个数组
    const countArray = useState(0)
    // #3 数组第 0 项是初始值，第 1 项是修改初始值的方法
    const count = countArray[0]
    const setCount = countArray[1]
    const handleClick = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>click</button>
        </div>
    )
}

export default App
```

注意 setState 的细节。

-   参数：**状态初始值**。比如，传入 0 表示该状态的初始值为 0。

-   注意：此处的状态可以是任意值（比如，数值、字符串等），而 class 组件中的 state 必须是对象。

-   返回值：数组，包含两个值：状态值（state）和修改该状态的函数（setState）。

-   约定：修改状态的函数名称以 set 开头，后面跟上状态的名称。

<font>如何简化上面的代码？</font>

## useState-状态的读取和修改

### 目标

能够在函数组件中获取和修改状态。

### 内容

读取状态：该方式提供的状态，是函数内部的局部变量，可以在函数内的任意位置使用

修改状态：

-   `setCount(newValue)` 是一个函数，参数表示：**新的状态值**。

-   调用该函数后，将**使用新的状态值`替换`旧值**。

-   修改状态后，组件自动会重新渲染。

### 注意

修改状态的时候，要使用新的状态替换旧的状态，不要直接修改原状态（状态的不可变）。

```jsx
import React, { useState } from 'react'

const App = () => {
    const [obj, setObj] = useState({
        count: 0,
    })
    const handleClick = () => {
        // Error
        obj.count++
        setObj(obj)
        // Right
        /* setObj({
      count: obj.count + 1,
    }) */
    }
    return (
        <div>
            <p>{obj.count}</p>
            <button onClick={handleClick}>click</button>
        </div>
    )
}

export default App
```

## useState-组件的更新过程

### 目标

能够说出使用功能 `useState` 之后，组件的更新过程。

### 内容

函数组件使用 useState hook 后的执行过程，以及状态值的变化。

-   组件第一次渲染：

    1.  从头开始执行该组件中的代码逻辑（调用函数）。

    2.  调用 `useState(0)` 将传入的参数作为状态初始值，即：0。

    3.  渲染组件，此时，获取到的状态 count 值为：0。

-   组件第二次渲染：

    1. 点击按钮，调用 `setCount(count + 1)` 修改状态，因为状态发生改变，所以，该组件会重新渲染。

    2. 组件重新渲染时，会再次执行该组件中的代码逻辑。

    3. 再次调用 `useState(0)`，此时 **React 内部会拿到最新的状态值而非初始值**，比如，该案例中最新的状态值为 1。

    4. 再次渲染组件，此时，获取到的状态 count 值为：1。

<font color=e32d40>**注意：useState 的初始值(参数)只会在组件第一次渲染时生效**。</font>也就是说，以后的每次渲染，useState 获取到都是最新的状态值。React 组件会记住每次最新的状态值!

## useState-另一种写法

参数也可以是函数，函数的返回值就是初始值，这个函数只会在第一次的时候执行。

```jsx
import React, { useState } from 'react'

const App = () => {
    const [count, setCount] = useState(() => 0)
    const handleClick = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>click</button>
        </div>
    )
}

export default App
```

好处：函数里面可以写一些复杂的业务逻辑代码！

## useState-使用规则

### 目标

能够为函数组件提供多个状态及注意点。

### 内容

-   如何为函数组件提供多个状态？

    -   多次调用 useState Hook 即可，每调用一次 useState Hook 可以提供一个状态。

    -   `useState Hook` 多次调用返回的 [state, setState] 相互之间，互不影响。

-   useState 的使用规则

    -   **React Hooks 只能直接出现在函数组件中**。

    -   **React Hooks 不能嵌套在 if/for/其他函数 中！**（if 的条件判断、for 循环的次数、函数的调用与否都可能会影响 hook 的顺序）。

    -   React 是按照 Hooks 的调用顺序来识别每一个 Hook，如果每次调用的顺序不同，导致 React 无法知道是哪一个状态和修改状态的方法。

    -   可以通过开发者工具进行查看。

## useEffect-副作用介绍

### 目标

能够说出什么是副作用（side effect）。

### 内容

-   类比，对于 999 感冒灵感冒药来说

    -   主作用：用于感冒引起的头痛，发热，鼻塞，流涕，咽痛等。

    -   副作用：可见困倦、嗜睡、口渴、虚弱感。

-   理解组件或一般函数的副作用

    -   组件的副作用：对于 React 组件来说，**主作用就是根据数据（state/props）渲染 UI**，除此之外都是副作用，比如手动修改 DOM、数据（Ajax）请求、localStorage 操作等。

    -   函数的副作用：如果一个函数或其他操作修改了其局部环境之外的状态变量值，那么它就被称为有副作用。

-   关于 useEffect

    -   使用场景：当你想要在函数组件中处理副作用（side effect），就要使用 useEffect Hook 了。

    -   作用：处理函数组件中的副作用（side effect）。

### 总结

对于 React 组件来说，除了渲染 UI 之外的其他操作，都可以称之为副作用。

## useEffect-基本使用

### 目标

能够在函数组件中操作 DOM（处理副作用）。

### 内容

注意：在实际开发中，副作用是不可避免的。因此，React 专门提供了 useEffect Hook 来处理函数组件组件中的副作用。

需求：把变化后的数字展示在网页标题上。

```jsx
import React, { useState, useEffect } from 'react'

const App = () => {
    const [count, setCount] = useState(() => 0)
    useEffect(() => {
        // 1. 初始化时执行
        // 2. 数据变化的时候执行
        document.title = count
    })
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>click</button>
        </div>
    )
}

export default App
```

-   执行时机：初始化时和数据变化的时候执行。

-   相当于 class 中的 componentDidMount + componentDidUpdate。

## useEffect-依赖

### 目标

能够设置 useEffect 的依赖，只在 count 变化时，才执行相应的 effect。

### 内容

-   问题：如果组件中还有另外一个状态，另一个状态更新时，刚刚的 effect 回调，也会执行。

-   默认情况：函数中的任何状态发生更新，useEffect 的回调函数都会执行。

-   性能优化：**跳过不必要的执行，只在 count 变化时，才执行相应的 effect**。

问题展示

```jsx
import React, { useState, useEffect } from 'react'

const App = () => {
    const [count, setCount] = useState(0)
    const [money, setMoney] = useState(100)
    useEffect(() => {
        console.log('执行了 useEffect ~~~')
        document.title = count
    })
    return (
        <div>
            <p>count: {count}</p>
            <p>money: {money}</p>
            <button onClick={() => setCount(count + 1)}>update count</button>
            <button onClick={() => setMoney(money + 1)}>update money</button>
        </div>
    )
}

export default App
```

问题解决

```js
useEffect(() => {
    console.log('执行了 useEffect ~~~')
    document.title = count
}, [count])
```

代码解释

-   第二个参数：可选的，可省略；也可以传一个数组，数组中的元素可以成为依赖项（deps）。

-   该示例中表示：只有当 count 改变时，才会重新执行该 effect。

## useEffect-依赖是一个空数组

### 目标

能够设置 useEffect 的依赖，让组件只有在第一次渲染后会执行。

### 内容

-   useEffect 的第二个参数，还可以是一个空数组（[]），表示只在组件第一次渲染后执行 effect。

-   使用场景：事件绑定、发送请求获取数据等。

### 代码

```js
useEffect(() => {
    const handleResize = () => {}
    window.addEventListener('resize', handleResize)
}, [])
```

### 解释

-   该 effect 只会在组件第一次渲染后执行，因此，可以执行像事件绑定等只需要执行一次的操作。

-   此时，仅相当于 class 组件的 componentDidMount 钩子函数的作用。

-   跟 useState Hook 一样，一个组件中也可以调用 useEffect 多次。

-   推荐：一个 useEffect 只处理一个功能，有多个功能时，使用多次 useEffect。

## useEffect-不要对依赖项撒谎

### 目标

能够理解如果不正确使用依赖项的后果。

### 内容

-   useEffect 回调函数中用到的数据（比如，count）就是依赖数据，就应该出现在依赖项数组中。

-   如果 useEffect 回调函数中用到了某个数据，但是没有出现在依赖项数组中，就会导致一些 Bug 出现（例如不会更新）！

-   所以，不要对 useEffect 的依赖撒谎。

```js
import React, { useState, useEffect } from 'react'

const App = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        // React Hook useEffect has a missing dependency: 'count'. Either include it or remove the dependency array
        document.title = count
    }, [])
    return (
        <div>
            <p>count: {count}</p>
            <button onClick={() => setCount(count + 1)}>update count</button>
        </div>
    )
}

export default App
```

useEffect 完全指南：https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/

### 小结

能够说出 useEffect 的三种使用语法

### 代码

```jsx
// 触发时机：第一次渲染会执行，任何数据变化导致组件更新时执行，相当于 componentDidMount + ComponentDidUpdate
useEffect(() => {})

// 触发时机：只在组件第一次渲染时执行，相当于 componentDidMount
useEffect(() => {}, [])

// 触发时机：第一次渲染会执行，当 count 变化时会再次执行，相当于 componentDidMount + componentDidUpdate(判断)
useEffect(() => {}, [count])
```

## 购物车

### 基本步骤

1. 初始化项目基本结构。

2. 封装 MyHeader 组件。

3. 封装 MyFooter 组件。

4. 商品列表数据展示。

5. 封装 MyGoods 组件。

6. 封装 MyCounter 组件。

### 项目初始化

-   清理目录。

-   安装 bootstrap `yarn add bootstrap@4.5.0`。

-   入口文件中引入 bootstrap 样式文件。

```js
import 'bootstrap/dist/css/bootstrap.css'
```

### 封装 MyHeader 组件

`App.jsx`

```jsx
import React from 'react'
import MyHeader from './components/MyHeader'

export default function App() {
    return (
        <div>
            <MyHeader />
        </div>
    )
}
```

`components/MyHeader/index.js`

```js
import './index.scss'

export default function index() {
    return <div className='my-header'>标题</div>
}
```

`components/MyHeader/index.scss`

```scss
.my-header {
    z-index: 999;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #1d7bff;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
```

<font color=e32d40>**注意：脚手架内置了 scss 的支持，但是需要安装 scss 依赖包。**</font>

需求：让标题组件的内容由外部来决定。

`components/MyHeader/index.js`

```jsx
import './index.scss'

export default function MyHeader({ children = '标题' }) {
    return <div className='my-header'>{children}</div>
}
```

`App.js`

```js
import React from 'react'
import MyHeader from './components/MyHeader'

export default function App() {
    return (
        <div>
            <MyHeader>购物车</MyHeader>
        </div>
    )
}
```

### 封装 MyFooter 组件

#### 目标

#### 步骤

1. 创建 Footer 组件。

2. 提供 Footer 样式。

3. 在 App.js 中渲染

`components/MyFooter/index.js`

```js
import React from 'react'
import './index.scss'
export default function MyFooter() {
    return (
        <div className='my-footer'>
            <div className='custom-control custom-checkbox'>
                <input type='checkbox' className='custom-control-input' id='footerCheck' />
                <label className='custom-control-label' htmlFor='footerCheck'>
                    全选
                </label>
            </div>
            <div>
                <span>合计:</span>
                <span className='price'>¥ 100</span>
            </div>
            <button type='button' className='footer-btn btn btn-primary'>
                结算 (0)
            </button>
        </div>
    )
}
```

`components/MyFooter/index.scss`

```scss
.my-footer {
    z-index: 999;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background: #fff;

    .price {
        color: red;
        font-weight: bold;
        font-size: 15px;
    }
    .footer-btn {
        min-width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 25px;
        padding: 0;
    }
}
```

`App.js`

```js
import React from 'react'
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'

export default function App() {
    return (
        <div>
            <MyHeader>购物车</MyHeader>
            <MyFooter />
        </div>
    )
}
```

### 封装 GoodsItem 组件

#### 目标

能够封装 GoodsItem 组件。

#### 步骤

`components/GoodsItem/index.js`

```js
import React from 'react'
import './index.scss'
export default function GoodsItem() {
    return (
        <div className='my-goods-item'>
            <div className='left'>
                <div className='custom-control custom-checkbox'>
                    <input type='checkbox' className='custom-control-input' id='input' />
                    <label className='custom-control-label' htmlFor='input'>
                        <img src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' alt='' />
                    </label>
                </div>
            </div>
            <div className='right'>
                <div className='top'>商品名称</div>
                <div className='bottom'>
                    <span className='price'>¥ 商品价格</span>
                    <span>counter组件</span>
                </div>
            </div>
        </div>
    )
}
```

`components/GoodsItem/index.scss`

```scss
.my-goods-item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .left {
        img {
            width: 120px;
            height: 120px;
            margin-right: 8px;
            border-radius: 10px;
        }
        .custom-control-label::before,
        .custom-control-label::after {
            top: 50px;
        }
    }
    .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .bottom {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            .price {
                color: red;
                font-weight: bold;
            }
        }
    }
}
```

`App.js`

```jsx
import React from 'react'
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'
import GoodsItem from './components/GoodsItem'

export default function App() {
    return (
        <div>
            <MyHeader>购物车</MyHeader>
            <GoodsItem />
            <MyFooter />
        </div>
    )
}
```

解决样式问题，`App.js`

```js
import React from 'react'
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'
import GoodsItem from './components/GoodsItem'
import './App.scss'

export default function App() {
    return (
        <div className='app'>
            <MyHeader>购物车</MyHeader>
            <GoodsItem />
            <MyFooter />
        </div>
    )
}
```

`App.scss`

```scss
.app {
    padding-top: 45px;
    padding-bottom: 50px;
}
```

### 商品列表渲染

#### 目标

完成商品列表的数据渲染。

#### 步骤

1. `App.js` 组件根据数据渲染商品列表。

2. GoodsItem 接收数据进行渲染。

-   提供数据

```js
// 放到函数外面即可
const arr = [
    {
        id: 1,
        goods_name: '班俏BANQIAO超火ins潮卫衣女士2020秋季新款韩版宽松慵懒风薄款外套带帽上衣',
        goods_img: 'https://www.escook.cn/vuebase/pics/1.png',
        goods_price: 108,
        goods_count: 1,
        goods_state: true,
    },
    {
        id: 2,
        goods_name: '嘉叶希连帽卫衣女春秋薄款2020新款宽松bf韩版字母印花中长款外套ins潮',
        goods_img: 'https://www.escook.cn/vuebase/pics/2.png',
        goods_price: 129,
        goods_count: 1,
        goods_state: true,
    },
    {
        id: 3,
        goods_name: '思蜜怡2020休闲运动套装女春秋季新款时尚大码宽松长袖卫衣两件套',
        goods_img: 'https://www.escook.cn/vuebase/pics/3.png',
        goods_price: 198,
        goods_count: 1,
        goods_state: false,
    },
    {
        id: 4,
        goods_name: '思蜜怡卫衣女加绒加厚2020秋冬装新款韩版宽松上衣连帽中长款外套',
        goods_img: 'https://www.escook.cn/vuebase/pics/4.png',
        goods_price: 99,
        goods_count: 1,
        goods_state: false,
    },
    {
        id: 5,
        goods_name: '幂凝早秋季卫衣女春秋装韩版宽松中长款假两件上衣薄款ins盐系外套潮',
        goods_img: 'https://www.escook.cn/vuebase/pics/5.png',
        goods_price: 156,
        goods_count: 1,
        goods_state: true,
    },
    {
        id: 6,
        goods_name: 'ME&CITY女装冬季新款针织抽绳休闲连帽卫衣女',
        goods_img: 'https://www.escook.cn/vuebase/pics/6.png',
        goods_price: 142.8,
        goods_count: 1,
        goods_state: true,
    },
    {
        id: 7,
        goods_name: '幂凝假两件女士卫衣秋冬女装2020年新款韩版宽松春秋季薄款ins潮外套',
        goods_img: 'https://www.escook.cn/vuebase/pics/7.png',
        goods_price: 219,
        goods_count: 2,
        goods_state: true,
    },
    {
        id: 8,
        goods_name: '依魅人2020休闲运动衣套装女秋季新款秋季韩版宽松卫衣 时尚两件套',
        goods_img: 'https://www.escook.cn/vuebase/pics/8.png',
        goods_price: 178,
        goods_count: 1,
        goods_state: true,
    },
    {
        id: 9,
        goods_name: '芷臻(zhizhen)加厚卫衣2020春秋季女长袖韩版宽松短款加绒春秋装连帽开衫外套冬',
        goods_img: 'https://www.escook.cn/vuebase/pics/9.png',
        goods_price: 128,
        goods_count: 1,
        goods_state: false,
    },
    {
        id: 10,
        goods_name: 'Semir森马卫衣女冬装2019新款可爱甜美大撞色小清新连帽薄绒女士套头衫',
        goods_img: 'https://www.escook.cn/vuebase/pics/10.png',
        goods_price: 153,
        goods_count: 1,
        goods_state: false,
    },
]
// 放到函数内部
const [list, setList] = useState(arr)
```

`App.js` 中根据数据渲染组件

```js
{
    list.map((item) => <GoodsItem key={item.id} {...item}></GoodsItem>)
}
```

`GoodsItem/index.js` 中渲染数据

```jsx
import React from 'react'
import './index.scss'
export default function GoodsItem({ goods_count, goods_img, goods_name, goods_price, goods_state, id }) {
    return (
        <div className='my-goods-item'>
            <div className='left'>
                <div className='custom-control custom-checkbox'>
                    <input type='checkbox' className='custom-control-input' checked={goods_state} id={id} onChange={() => {}} />
                    <label className='custom-control-label' htmlFor={id}>
                        <img src={goods_img} alt='' />
                    </label>
                </div>
            </div>
            <div className='right'>
                <div className='top'>{goods_name}</div>
                <div className='bottom'>
                    <span className='price'>¥ {goods_price}</span>
                    <span>counter组件</span>
                </div>
            </div>
        </div>
    )
}
```

### 切换选中状态

#### 目标

完成商品的选中切换功能。

#### 步骤

1. 注册 onChange 事件。

2. 子传父修改状态。

`GoodsItem/index.js`

```js
<input type='checkbox' className='custom-control-input' checked={goods_state} id={id} onChange={() => changeState(id)} />
```

`App.js`

```js
export default function App() {
    const [list, setList] = useState(arr)
    const changeState = (id) => {
        setList(
            list.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        goods_state: !item.goods_state,
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
                <GoodsItem key={item.id} {...item} changeState={changeState}></GoodsItem>
            ))}
            <MyFooter />
        </div>
    )
}
```

### 底部合计和结算

`components/MyFooter/index.js`

```js
import React from 'react'
import './index.scss'
export default function MyFooter({ list }) {
    const totalCount = list
        .filter((item) => item.goods_state)
        .reduce((acc, cur) => {
            return acc + cur.goods_count
        }, 0)

    const totalPrice = list
        .filter((item) => item.goods_state)
        .reduce((acc, cur) => {
            return acc + cur.goods_count * cur.goods_price
        }, 0)
    return (
        <div className='my-footer'>
            <div className='custom-control custom-checkbox'>
                <input type='checkbox' className='custom-control-input' id='footerCheck' />
                <label className='custom-control-label' htmlFor='footerCheck'>
                    全选
                </label>
            </div>
            <div>
                <span>合计:</span>
                <span className='price'>¥ {totalPrice}</span>
            </div>
            <button type='button' className='footer-btn btn btn-primary'>
                结算 ({totalCount})
            </button>
        </div>
    )
}
```

`App.js`

```js
<MyFooter list={list} />
```

### 商品全选功能

#### 目标

完成商品全选切换功能。

#### 代码

单选控制全选。

`components/MyFooter/index.js`

```js
import React from 'react'
import './index.scss'
export default function MyFooter({ list }) {
    const totalCount = list
        .filter((item) => item.goods_state)
        .reduce((acc, cur) => {
            return acc + cur.goods_count
        }, 0)

    const totalPrice = list
        .filter((item) => item.goods_state)
        .reduce((acc, cur) => {
            return acc + cur.goods_count * cur.goods_price
        }, 0)

    const isCheckAll = list.every((item) => item.goods_state)
    return (
        <div className='my-footer'>
            <div className='custom-control custom-checkbox'>
                <input type='checkbox' className='custom-control-input' id='footerCheck' checked={isCheckAll} />
                <label className='custom-control-label' htmlFor='footerCheck'>
                    全选
                </label>
            </div>
            <div>
                <span>合计:</span>
                <span className='price'>¥ {totalPrice}</span>
            </div>
            <button type='button' className='footer-btn btn btn-primary'>
                结算 ({totalCount})
            </button>
        </div>
    )
}
```

全选控制单选。

`components/MyFooter/index.js`

```js
import React from 'react'
import './index.scss'
export default function MyFooter({ list, changeAll }) {
    const totalCount = list
        .filter((item) => item.goods_state)
        .reduce((acc, cur) => {
            return acc + cur.goods_count
        }, 0)

    const totalPrice = list
        .filter((item) => item.goods_state)
        .reduce((acc, cur) => {
            return acc + cur.goods_count * cur.goods_price
        }, 0)

    const isCheckAll = list.every((item) => item.goods_state)
    return (
        <div className='my-footer'>
            <div className='custom-control custom-checkbox'>
                <input type='checkbox' className='custom-control-input' id='footerCheck' checked={isCheckAll} onChange={() => changeAll(!isCheckAll)} />
                <label className='custom-control-label' htmlFor='footerCheck'>
                    全选
                </label>
            </div>
            <div>
                <span>合计:</span>
                <span className='price'>¥ {totalPrice}</span>
            </div>
            <button type='button' className='footer-btn btn btn-primary'>
                结算 ({totalCount})
            </button>
        </div>
    )
}
```

`App.js`

```js
export default function App() {
    const changeAll = (value) => {
        setList(
            list.map((item) => {
                return {
                    ...item,
                    goods_state: value,
                }
            })
        )
    }
    return (
        <div className='app'>
            {/* ... */}
            <MyFooter list={list} changeAll={changeAll} />
        </div>
    )
}
```

### 数据持久化

`App.js`

```js
export default function App() {
    // #2
    const [list, setList] = useState(() => {
        return JSON.parse(localStorage.getItem('list')) || arr
    })
    // #1
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])
}
```

### 完整代码

#### `index.js`

```js
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<App />, document.querySelector('#root'))
```

#### `App.js`

```js
import React, { useState, useEffect } from 'react'
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'
import GoodsItem from './components/GoodsItem'
import './App.scss'
const arr = [
    {
        id: 1,
        goods_name: '班俏BANQIAO超火ins潮卫衣女士2020秋季新款韩版宽松慵懒风薄款外套带帽上衣',
        goods_img: 'https://www.escook.cn/vuebase/pics/1.png',
        goods_price: 108,
        goods_count: 1,
        goods_state: true,
    },
    {
        id: 2,
        goods_name: '嘉叶希连帽卫衣女春秋薄款2020新款宽松bf韩版字母印花中长款外套ins潮',
        goods_img: 'https://www.escook.cn/vuebase/pics/2.png',
        goods_price: 129,
        goods_count: 1,
        goods_state: true,
    },
    {
        id: 3,
        goods_name: '思蜜怡2020休闲运动套装女春秋季新款时尚大码宽松长袖卫衣两件套',
        goods_img: 'https://www.escook.cn/vuebase/pics/3.png',
        goods_price: 198,
        goods_count: 1,
        goods_state: false,
    },
    {
        id: 4,
        goods_name: '思蜜怡卫衣女加绒加厚2020秋冬装新款韩版宽松上衣连帽中长款外套',
        goods_img: 'https://www.escook.cn/vuebase/pics/4.png',
        goods_price: 99,
        goods_count: 1,
        goods_state: false,
    },
    {
        id: 5,
        goods_name: '幂凝早秋季卫衣女春秋装韩版宽松中长款假两件上衣薄款ins盐系外套潮',
        goods_img: 'https://www.escook.cn/vuebase/pics/5.png',
        goods_price: 156,
        goods_count: 1,
        goods_state: true,
    },
    {
        id: 6,
        goods_name: 'ME&CITY女装冬季新款针织抽绳休闲连帽卫衣女',
        goods_img: 'https://www.escook.cn/vuebase/pics/6.png',
        goods_price: 142.8,
        goods_count: 1,
        goods_state: true,
    },
    {
        id: 7,
        goods_name: '幂凝假两件女士卫衣秋冬女装2020年新款韩版宽松春秋季薄款ins潮外套',
        goods_img: 'https://www.escook.cn/vuebase/pics/7.png',
        goods_price: 219,
        goods_count: 2,
        goods_state: true,
    },
    {
        id: 8,
        goods_name: '依魅人2020休闲运动衣套装女秋季新款秋季韩版宽松卫衣 时尚两件套',
        goods_img: 'https://www.escook.cn/vuebase/pics/8.png',
        goods_price: 178,
        goods_count: 1,
        goods_state: true,
    },
    {
        id: 9,
        goods_name: '芷臻(zhizhen)加厚卫衣2020春秋季女长袖韩版宽松短款加绒春秋装连帽开衫外套冬',
        goods_img: 'https://www.escook.cn/vuebase/pics/9.png',
        goods_price: 128,
        goods_count: 1,
        goods_state: false,
    },
    {
        id: 10,
        goods_name: 'Semir森马卫衣女冬装2019新款可爱甜美大撞色小清新连帽薄绒女士套头衫',
        goods_img: 'https://www.escook.cn/vuebase/pics/10.png',
        goods_price: 153,
        goods_count: 1,
        goods_state: false,
    },
]
export default function App() {
    const [list, setList] = useState(() => {
        return JSON.parse(localStorage.getItem('list')) || arr
    })
    const changeState = (id) => {
        setList(
            list.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        goods_state: !item.goods_state,
                    }
                } else {
                    return item
                }
            })
        )
    }
    const changeAll = (value) => {
        setList(
            list.map((item) => {
                return {
                    ...item,
                    goods_state: value,
                }
            })
        )
    }
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])
    return (
        <div className='app'>
            <MyHeader>购物车</MyHeader>
            {list.map((item) => (
                <GoodsItem key={item.id} {...item} changeState={changeState}></GoodsItem>
            ))}
            <MyFooter list={list} changeAll={changeAll} />
        </div>
    )
}
```

#### `App.scss`

```scss
.app {
    padding-top: 45px;
    padding-bottom: 50px;
}
```

#### `MyHeader/index.js`

```js
import './index.scss'

export default function MyHeader({ children = '标题' }) {
    return <div className='my-header'>{children}</div>
}
```

#### `MyHeader/index.scss`

```scss
.my-header {
    z-index: 999;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #1d7bff;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
```

#### `GoodsItem/index.js`

```js
import React from 'react'
import './index.scss'
export default function GoodsItem({ goods_count, goods_img, goods_name, goods_price, goods_state, id, changeState }) {
    return (
        <div className='my-goods-item'>
            <div className='left'>
                <div className='custom-control custom-checkbox'>
                    <input type='checkbox' className='custom-control-input' checked={goods_state} id={id} onChange={() => changeState(id)} />
                    <label className='custom-control-label' htmlFor={id}>
                        <img src={goods_img} alt='' />
                    </label>
                </div>
            </div>
            <div className='right'>
                <div className='top'>{goods_name}</div>
                <div className='bottom'>
                    <span className='price'>¥ {goods_price}</span>
                    <span>counter组件</span>
                </div>
            </div>
        </div>
    )
}
```

#### `GoodsItem/index.scss`

```scss
.my-goods-item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .left {
        img {
            width: 120px;
            height: 120px;
            margin-right: 8px;
            border-radius: 10px;
        }
        .custom-control-label::before,
        .custom-control-label::after {
            top: 50px;
        }
    }
    .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .bottom {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            .price {
                color: red;
                font-weight: bold;
            }
        }
    }
}
```

#### `MyFooter/index.js`

```js
import React from 'react'
import './index.scss'
export default function MyFooter({ list, changeAll }) {
    const totalCount = list
        .filter((item) => item.goods_state)
        .reduce((acc, cur) => {
            return acc + cur.goods_count
        }, 0)

    const totalPrice = list
        .filter((item) => item.goods_state)
        .reduce((acc, cur) => {
            return acc + cur.goods_count * cur.goods_price
        }, 0)

    const isCheckAll = list.every((item) => item.goods_state)
    return (
        <div className='my-footer'>
            <div className='custom-control custom-checkbox'>
                <input type='checkbox' className='custom-control-input' id='footerCheck' checked={isCheckAll} onChange={() => changeAll(!isCheckAll)} />
                <label className='custom-control-label' htmlFor='footerCheck'>
                    全选
                </label>
            </div>
            <div>
                <span>合计:</span>
                <span className='price'>¥ {totalPrice}</span>
            </div>
            <button type='button' className='footer-btn btn btn-primary'>
                结算 ({totalCount})
            </button>
        </div>
    )
}
```

#### `MyFooter/index.scss`

```scss
.my-footer {
    z-index: 999;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background: #fff;

    .price {
        color: red;
        font-weight: bold;
        font-size: 15px;
    }
    .footer-btn {
        min-width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 25px;
        padding: 0;
    }
}
```
