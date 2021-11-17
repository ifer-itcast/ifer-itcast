---
title: 05_Hooks 基础
date: 2021-11-10 09:36:20
tags:
---

✔ 了解 React Hooks。

✔ 掌握 useState hook。

✔ 掌握 useEffect hook。

<!-- more -->

## Hooks 是什么

### 目标

能够说出 React Hooks 是什么？

### 内容

-   `Hooks`：钩子、钩住，是 React v16.8 提供的新功能，作用：为函数组件提供状态、生命周期等原本 class 组件中才有的功能，可以理解为通过 Hooks 为函数式组件钩入了 class 组件的特性。

-   React v16.8 以前：class 组件（提供状态和生命周期） + 函数组件（展示内容）。

-   React v16.8 以后：

    1. class 组件（提供状态和生命周期） + 函数组件（展示内容）。

    2. Hooks（提供状态和生命周期） + 函数组件（展示内容）。

    3. 混用以上两种方式：部分功能用 class 组件，部分功能用 Hooks + 函数组件。

-   注意：**Hooks 只能在函数组件中使用**，虽然有了 Hooks，但 React 官方并没有计划从 React 库中移除 class。

### 总结

-   Hooks 是什么？

-   有了 Hooks 以后，不能再把函数式组件称为无状态组件了，因为通过 Hooks 可以为函数式组件提供状态啦。

## 为什么要有 Hooks

### 目标

能够说出为什么要有 Hooks，Hooks 解决什么问题？

### 内容

-   组件的状态逻辑复用问题

    a，在 Hooks 之前，组件的状态逻辑复用经历了：mixins（混入）、HOC（高阶组件）、render props 等模式。

    b，（早已废弃）mixins 的问题：数据来源不清晰；命名冲突。

    c，HOC、render props 的问题：重构组件结构，导致组件形成 JSX 嵌套地狱问题。

-   class 组件自身的问题

    a，选择：函数组件和 class 组件之间的区别以及使用哪种组件更合适。

    b，需要理解 class 中的 this 是如何工作的。

    c，同一业务的状态或业务逻辑被拆分到不同位置。

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

<img src="/resource/images/hook.gif"/>

-   相比于函数组件来说，不利于代码压缩和优化，也不利于 TS 的类型推导。

```bash
# 例如不能把 componentDidMount 压缩成 c
# Webpack 打包的时候会自动把没有用到的代码进行 tree shaking，但是对于类组件来说，例如即便没有用到 componentDidMount，其实相关代码也会打包，因为它属于源代码的一部分
# 例如写 this 的时候没有提示，因为 this 只有在调用的时候才能确定指向，编写代码期间 TS 是不知道的
```

### 总结

Hooks 解决了什么问题？

## Hooks 渐进策略

### 目标

能够了解 Hooks 和之前 class 的写法是可以共存的。

### 内容

-   官方没有计划从 React 中移除 class [文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)。

-   Hooks 和现有代码可以同时工作，你可以渐进式地使用他们。

    a，不推荐：大规模使用 Hooks 直接重构现有组件。

    b，推荐：新功能用 Hooks，Hooks 实现不了的复杂功能，也可以继续用 class。

    c，具体操作，从一些功能简单、非核心功能的组件开始使用 Hooks。

-   不能在 Hooks 组件中，使用 class 组件相关的 API。

    a，state 与 setState。

    b，钩子函数，`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`。

    c，`this` 相关的用法。

-   原来学习的绝大部分知识点还是要用的。

    a，JSX：`{}`、`onClick={handleClick}`、条件渲染、列表渲染、样式处理等。

    b，组件：函数组件、组件通讯。

    c，React 开发理念：`单向数据流`、`状态提升` 等。

    d，解决问题的思路、技巧、常见错误的分析等。

### 小结

项目当中 class 组件和 函数配合 Hooks 的写法可以共存吗？

## useState 基本使用

### 目标

能够掌握 `useState` 的基本使用。

### 内容

<font color=e32d40>**作用：为函数组件提供状态和修改状态的方法。**</font>

### 需求

<img src="/resource/images/ifer_calc.png"/>

1. 导入 `useState` 函数。

2. 调用 `useState` 函数，并传入状态的初始值。

3. 从 `useState` 函数的返回值中，拿到状态和修改状态的函数。

核心代码

```jsx
import React, { useState } from 'react'

const App = () => {
    const [count, setCount] = useState(0)
    return (
        <div style={{ textAlign: 'center' }}>
            <h3>计数器：{count}</h3>
            <div>
                <button onClick={() => setCount(count + 1)}>+1</button>
            </div>
        </div>
    )
}

export default App
```

### 细节

-   参数：初始状态，比如传入 0 就表示该状态的初始值为 0。

-   注意：此处的状态可以是任意值（比如，数值、字符串等），对比 class 组件中的 state 必须是对象。

-   返回值：数组，包含两个值，状态和修改该状态的方法。

-   约定：修改状态的方法以 set 开头，后面跟上状态的名称。

### 小结

-   useState 的作用和返回值是什么？

## useState 状态的读取和修改

### 目标

能够在函数组件中获取和修改状态。

### 内容

-   读取状态

    useState 只能在函数内部调用，返回的状态也是函数内部的局部变量，只可以在函数的内部使用。

-   修改状态

    a，`setCount(newValue)` 是一个函数调用，参数表示新的状态值。

    b，调用该函数后，将使用新的状态值直接替换旧状态。

    c，修改状态后，组件会自动重新渲染。

### 注意

修改状态的时候，要使用新的状态替换掉旧的状态，而不要直接修改原状态（状态的不可变性）。

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

### 小结

useState 只能写在函数的内部。

## useState 组件的更新过程

### 目标

能够说出使用功能 `useState` 之后，组件的更新过程。

### 内容

-   组件第 1 次渲染

    1.  调用函数式组件，从头开始执行组件中的代码逻辑。

    2.  调用 `useState(0)` 将传入的参数作为初始状态值，即：0。

    3.  开始渲染组件，此时得到的状态 count 值为：0。

-   组件第 2 次渲染

    1. 点击按钮，调用 `setCount(count + 1)` 来修改状态，因为状态发生改变，所以，该组件会重新渲染。

    2. 组件重新渲染时，会再次执行该组件中的代码逻辑。

    3. 再次调用 `useState(0)`，此时 <font color=d32e40>**React 内部会拿到最新的状态值而非初始值**</font>，比如该案例中的最新状态值为 1。

    4. 再次渲染组件，此时，获取到的状态 count 值为：1。

-   <font color=e32d40>**注意：useState 的初始值(参数)只会在组件第一次渲染时生效**。</font>也就是说，以后的每次渲染，useState 获取到都是最新的状态值。React 组件会记住每次更新后的最新状态值!

## useState 另一种写法

需求：把通过大量计算得到的结果当做初始值。

```js
import React, { useState } from 'react'

export default function App() {
    let defaultCount = 0
    for (let i = 0; i < 100; i++) {
        defaultCount += i
    }
    const [count, setCount] = useState(defaultCount)
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}
```

参数也可以是函数，函数的返回值就是初始值，这个函数只会在第一次的时候执行，函数里面也可以写一些复杂的业务逻辑代码！

## useState 使用规则

### 目标

能够为函数组件提供多个状态及注意点。

### 内容

-   如何为函数组件提供多个状态？

    多次调用 useState 即可，每一次调用返回的 [state, setState] 之间，互不影响。

-   useState 的使用规则

    a，React Hooks 只能直接出现在函数组件中。

    b，**React Hooks 不能嵌套在 if/for/其他函数 中！**（if 的条件判断、for 循环的次数、函数的调用与否都可能会影响 hook 的顺序）。

    c，React 是按照 Hooks 的调用顺序来识别每一个 Hook，如果每次调用的顺序不同，导致 React 无法知道是哪一个状态和修改状态的方法。

    d，可以通过开发者工具进行查看。

```js
import React, { useState } from 'react'

export default function App() {
    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(3)
    const [num3, setNum3] = useState(6)
    return (
        <div>
            <div>
                num1: {num1}
                <button onClick={() => setNum1(num1 + 1)}>修改 num1</button>
            </div>
            <div>
                num2: {num2}
                <button onClick={() => setNum2(num2 + 1)}>修改 num1</button>
            </div>
            <div>
                num3: {num3}
                <button onClick={() => setNum3(num3 + 1)}>修改 num1</button>
            </div>
        </div>
    )
}
```

## useEffect 副作用介绍

### 目标

能够说出什么是副作用（side effect）。

### 内容

-   类比，对于 999 感冒灵来说

    a，主作用：用于治疗感冒引起的头痛，发热，鼻塞，流涕，咽痛等。

    b，副作用：可见困倦、嗜睡、口渴、虚弱感。

-   那组件或一般函数的副作用是什么呢

    a，组件的副作用：对于 React 组件来说，主作用就是根据数据（state/props）<font color=e32d40>**渲染 UI**</font>，除此之外都是副作用，比如手动修改 DOM、数据（Ajax）请求、localStorage 操作等。

    b，函数的副作用：如果一个函数修改了其局部环境之外的数据，那么它就被称为有副作用。

-   关于 useEffect

    作用：当你想要在函数组件中处理副作用（side effect），就要使用 useEffect 了。

### 总结

对于 React 组件来说，除了渲染 UI 之外的其他操作，都可以称之为副作用。

## useEffect 基本使用

### 目标

能够在函数组件中操作 DOM（处理副作用）。

### 内容

<img src="/resource/images/ifer_useEffect.gif" class="highlight2"/>

在实际开发中，副作用是不可避免的，需求：点击按钮，让数字加 1，并把变化后的数字展示在网页标题上。

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

## useEffect 依赖

### 目标

能够设置 useEffect 的依赖，只在 count 变化时，才执行相应的 effect。

### 内容

-   问题：如果组件中还有其他状态，其他状态更新时，刚刚的 effect 回调（修改标题的操作）也会执行。

-   默认：函数中的任何状态发生更新，useEffect 的回调函数都会执行。

-   优化：**跳过不必要的执行，只在 count 变化时，才执行相应的 effect**。

-   操作：第二个参数可以传一个数组，表示只有当数组中的选项/依赖项改变时，才会重新执行该 effect。

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

## useEffect 依赖是一个空数组

### 目标

通过 useEffect 如何让组件只有在第一次渲染后会执行。

### 内容

useEffect 的第二个参数，还可以是一个空数组（[]），表示只有在组件第一次渲染后执行，一般会进行**事件绑定**、**发送请求**等。

### 代码

```js
useEffect(() => {
    const handleResize = () => {}
    window.addEventListener('resize', handleResize)
}, [])
```

### 解释

-   仅相当于 class 组件的 componentDidMount 钩子函数的作用。

-   和 useState 一样，一个组件中也可以调用多次 useEffect。

-   推荐：一个 useEffect 只处理一个功能，有多个功能时，使用多次 useEffect。

## useEffect 不要对依赖项撒谎

### 目标

能够理解如果不正确使用依赖项的可能会带来的问题。

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

能够说出对 useEffect 第 2 个参数的几种处理方式。

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

### 目标

<img src="/resource/images/ifer_cart.png" width="300" class="highlight2"/>

### 基本步骤

1. 初始化项目基本结构。

2. 封装 MyHeader 组件。

3. 封装 MyFooter 组件。

4. 封装 GoodsItem 组件。

5. 商品列表数据展示。

6. 切换选中状态。

7. 底部合计和结算。

8. 商品全选。

9. 数据持久化。

### 项目初始化

-   初始化项目并清理无关目录

```bash
npx create-react-app cart
```

-   安装 bootstrap

```bash
yarn add bootstrap@4.5.0
```

-   入口文件中引入 bootstrap

```js
import 'bootstrap/dist/css/bootstrap.css'
```

### 封装 MyHeader 组件

#### 目标

能够封装 MyHeader 组件的基本结构。

#### 步骤

1. 创建 MyHeader 组件。

2. 提供 MyHeader 样式。

3. 在 App.js 中渲染。

#### 代码

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

export default function MyHeader() {
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

```bash
yarn add sass sass-loader -D
```

#### 需求

让标题组件的内容由外部来决定。

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

能够封装 MyFooter 组件的基本结构。

#### 步骤

1. 创建 MyFooter 组件。

2. 提供 MyFooter 样式。

3. 在 App.js 中渲染。

#### 代码

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

能够封装 GoodsItem 组件的基本结构。

#### 步骤

1. 创建 GoodsItem 组件。

2. 提供 GoodsItem 样式。

3. 在 App.js 中渲染。

#### 代码

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

#### 代码

`App.js` 中提供数据。

```js
// 建议放到函数外面即可
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
```

```js
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

完成商品的选中状态切换功能。

#### 步骤

1. 父组件准备修改状态的方法并传递给子组件。

2. 子组件点击 checkBox 的时候调用父组件传递过来的方法，并传递过去 id。

3. 父组件根据传递过来的 id 进行对应数据的修改。

#### 代码

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

`GoodsItem/index.js`

```js
<input type='checkbox' className='custom-control-input' checked={goods_state} id={id} onChange={() => changeState(id)} />
```

### 底部合计和结算

#### 步骤

1. 父组件传递过去 list 到 MyFooter 组件。

2. MyFooter 组件通过 props 拿到数据，统计<font color=e32d40>**已选中**</font>的数量和总价。

#### 代码

`App.js`

```js
<MyFooter list={list} />
```

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

### 商品全选功能

#### 目标

完成商品全选切换功能。

#### 步骤

1. 初始状态计算（单选控制全选，直接根据 list 数据进行计算）。

2. 全选控制单选（子传父）。

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
    // #1
    const [list, setList] = useState(() => {
        return JSON.parse(localStorage.getItem('list')) || arr
    })
    // #2
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
