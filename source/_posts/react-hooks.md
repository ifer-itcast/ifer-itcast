---
title: React Hooks
date: 2020-04-01 22:19:44
tags:
---

相关 API 的使用及注意！

<!-- more -->

## useState

### 基本使用

```javascript
import React, { useState } from 'react';

function Example() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>
                You clicked {count} times
            </p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}

function App() {
    return <Example />;
}

export default App;
```

和下面的 class 写法等价！

```javascript
class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }
    render() {
        return (
            <div>
                <p>
                    You clicked {this.state.count} times
                </p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>Click me</button>
            </div>
        );
    }
}
```

### 一个问题

```javascript
import React, { useState } from 'react';

function Example(props) {
    console.log('每次点击按钮渲染这里都会执行，其实 defaultCount 的赋值没必要每次都进行');
    const defaultCount = props.defaultCount || 0;
    const [count, setCount] = useState(defaultCount);
    return (
        <div>
            <p>
                You clicked {count} times
            </p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}

function App() {
    return <Example defaultCount={3} />;
}

export default App;
```

### 解决方案

```javascript
import React, { useState } from 'react';

function Example(props) {
    // useState 参数可以是一个回调函数，可以把初始值当做此函数的返回值
    const [count, setCount] = useState(() => {
        console.log('这里只是初始化时执行一次！');
        return props.defaultCount || 0;
    });
    return (
        <div>
            <p>
                You clicked {count} times
            </p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
```

## useEffect

可以在函数组件中执行副作用操作

### 基本使用

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);
    // 模拟 componentDidMount 和 componentDidUpdate
    useEffect(() => {
        // 初始化和任何状态发生变化的时触发
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>
                You clicked {count} times
            </p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
```

### 清除 Effect

有些副作用可能需要清除，需要返回一个函数！

```javascript
function Example() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });
    const onResize = () => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        });
    };
    useEffect(() => {
        // useEffect 第二个参数传递空数组，初始化时才会执行，而绑定事件的操作也只需要执行这一次！
        window.addEventListener('resize', onResize);
        return () => {
            // useEffect 第一个参数中返回的函数，在组件卸载时会触发
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return (
        <div>
            <p id="size">
                width: {size.width}, height: {size.height}
            </p>
        </div>
    );
}
```

### 一个问题

由于选择元素绑定事件的操作只是初始化的时候对**当前的 DOM 元素**执行了一次

一旦 count 变化（DOM 元素被替换/其实是销毁了，下次加载的又是全新的），点击事件的效果就“失效”了。DOM 元素在相同标签下替换无此问题，因为 DOM Diff 时会被复用！

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);
    const onClick = () => {
        console.log('一旦绑定事件的元素被替换过了，此元素就不再具备事件效果了，因为新替换的元素并没有进行事件绑定');
    };
    useEffect(() => {
        document.querySelector('#size').addEventListener('click', onClick);
        return () => {
            document.querySelector('#size').removeEventListener('click', onClick);
        };
    }, []);
    return (
        <div>
            <p>
                {count}
            </p>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                click
            </button>
            {count % 2 ? <div id="size">hello world2</div> : <p id="size">hello world1</p>}
        </div>
    );
}
```

### 解决方案

有涉及到【根据状态】来进行元素切换（此元素绑定的有事件），每次状态变化时都进行重新绑定！

```javascript
useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick);
    return () => {
        document.querySelector('#size').removeEventListener('click', onClick);
    };
}, [count]);
```

## useCallback

### 问题重现

App 组件的 props 或者状态发生变化就会触发重渲染，即使跟 Foo 组件不相关，倘若 Foo 组件是一个大型的组件树，Virtual DOM Diff 的浪费是巨大的！

```javascript
import React, { Component, PureComponent } from 'react';

class Foo extends PureComponent {
    render() {
        console.log('Foo render');
        return <div>hello world</div>;
    }
}

class App extends Component {
    state = {
        count: 0
    };
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
    render() {
        const { count } = this.state;
        return (
            <div>
                {count}
                <button onClick={this.handleClick}>add</button>
                <Foo
                    doSomething={() => {
                        console.log('do something');
                    }}
                />
            </div>
        );
    }
}
```

### 常规解决

**可以把 doSomething 抽离出去**

```javascript
import React, { Component, PureComponent } from 'react';

class Foo extends PureComponent {
    render() {
        console.log('Foo render');
        return <div>hello world</div>;
    }
}

class App extends Component {
    state = {
        count: 0
    };
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
    doSomething = () => {
        console.log('do something');
    };
    render() {
        const { count } = this.state;
        return (
            <div>
                {count}
                <button onClick={this.handleClick}>add</button>
                <Foo doSomething={this.doSomething} />
            </div>
        );
    }
}
```

### Hooks 实现

类组件可以通过 this 挂载函数，但函数组件就没有这么轻松了！

```javascript
import React, { useState, memo, useCallback } from 'react';

const Foo = memo(function Foo() {
    console.log('Foo render');
    return <div>hello world</div>;
});

function App() {
    const [count, setCount] = useState(0);
    // 第二个参数为空数组代表无论什么情况下该函数都不会发生改变
    // 非空数组，数组中的任一项一旦值或者引用发生改变，useCallback 就会重新返回一个新的记忆函数提供给后面进行渲染
    const doSomething = useCallback(() => {
        console.log('do something');
    }, []);
    return (
        <div>
            {count}
            <button onClick={() => setCount(count + 1)}>add</button>
            <Foo doSomething={doSomething} />
        </div>
    );
}
```

## useMemo

useCallback 的功能完全可以由 useMemo 所取代，如果你想通过使用 useMemo 返回一个记忆函数也是完全可以的。

```javascript
useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs)
```

上面的例子可以用 useMemo 改写如下

```javascript
const doSomething = useMemo(() => {
    console.log('初始化的时候会执行一次！');
    return () => {
        console.log('do something');
    };
}, []);
```

区别：useCallback 不会执行第一个参数函数，而是将它返回给你；useMemo 会执行第一个函数并且将函数执行结果返回给你。所以 useCallback 常用记忆函数，生成记忆后的函数并传递给子组件使用，而 useMemo 更适合经过函数计算得到一个确定的值，比如记忆组件。

```javascript
import React, { useState, useMemo } from 'react';

function Child(props) {
    return (
        <div>
            child: {props.num}
        </div>
    );
}

function Parent({ num }) {
    // 只有在第二个参数 num 的值发生变化时，才会触发子组件的更新
    const child = useMemo(() => <Child num={num} />, [num]);
    return (
        <div>
            {child}
        </div>
    );
}

function App() {
    const [count, setCount] = useState(0);
    // count === 3 整体的状态（true or false）发生变化时才会触发函数的执行
    const num = useMemo(
        () => {
            return count * 2;
        },
        [count === 3]
    );
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>click</button>
            <Parent num={num} />
        </div>
    );
}
```

## useRef

useRef 跟 createRef 类似，都可以用来生成对 DOM 或组件的引用

### 对 DOM 元素的引用

```javascript
import React, { useState, useRef } from 'react';

function App() {
    let [name, setName] = useState('Ifer');

    let nameRef = useRef();

    const handleClick = () => {
        // nameRef 是 input dom 元素的引用
        setName(nameRef.current.value);
    };
    return (
        <div className="App">
            <p>
                {name}
            </p>
            <div>
                <input ref={nameRef} type="text" defaultValue={name} />
                <button type="button" onClick={handleClick}>
                    Submit
                </button>
            </div>
        </div>
    );
}
```

### 对类组件的引用

```javascript
import React, { useCallback, useRef, Component } from 'react';

// 函数组件不能被 Ref 获取，所以函数组件有时候并不能完全替代类组件
class Counter extends Component {
    speak() {
        console.log('牛逼');
    }
    render() {
        return <h1 onClick={this.props.onClick}>点我输出</h1>;
    }
}

function App() {
    const counterRef = useRef();
    const onClick = useCallback(
        () => {
            // counterRef 是 Counter 组件的引用
            counterRef.current.speak();
        },
        [counterRef]
    );
    return <Counter ref={counterRef} onClick={onClick} />;
}
```

### 问题重现

```javascript
import React, { useEffect, useState } from 'react';

function App() {
    const [count, setCount] = useState(0);

    let it;

    useEffect(() => {
        it = setInterval(() => {
            setCount(count => count + 1);
        }, 1000);
    }, []);
    useEffect(() => {
        if (count >= 5) {
            // 这样并不能停止定时器，每次 setCount 都会重新渲染整个 App
            // 后续的 it 句柄已经不是第一次的 setInterval 的返回值了
            clearInterval(it);
        }
    });
    return (
        <div>
            {count}
        </div>
    );
}
```

### 解决方案

当然可以把 `let it;` 的声明提取到函数外面，也可以利用 useRef 绕过 Capture Value 的特性，可以认为 ref 在所有 Render 过程中保持着唯一引用！

```javascript
import React, { useEffect, useState, useRef } from 'react';

function App() {
    const [count, setCount] = useState(0);

    let it = useRef();

    useEffect(() => {
        // 这一这里挂载到的是 it.current
        it.current = setInterval(() => {
            setCount(count => count + 1);
        }, 1000);
    }, []);

    useEffect(() => {
        if (count >= 5) {
            // 清除的也是 it.current
            clearInterval(it.current);
        }
    });
    return (
        <div>
            {count}
        </div>
    );
}
```

## useContext

### 基本使用

父组件

```javascript
import React, { Component, useState, createContext, useContext } from 'react';
const CountContext = createContext();

function App() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                click {count}
            </button>
            <CountContext.Provider value={count}>
                <Foo />
                <Bar />
                <Counter />
            </CountContext.Provider>
        </div>
    );
}
```

基础写法

```javascript
class Foo extends Component {
    render() {
        return (
            <CountContext.Consumer>
                {count =>
                    <h1>
                        {count}
                    </h1>}
            </CountContext.Consumer>
        );
    }
}
```

优雅写法

```javascript
class Bar extends Component {
    static contextType = CountContext;
    render() {
        const count = this.context;
        return (
            <h1>
                {count}
            </h1>
        );
    }
}
```

Hooks 写法

```javascript
function Counter() {
    const count = useContext(CountContext);
    return (
        <h1>
            {count}
        </h1>
    );
}
```

### 优化多状态嵌套

```javascript
import React, { createContext, Component } from 'react';
const BatteryContext = createContext();
const OnlineContext = createContext();

class App extends Component {
    state = {
        battery: 60,
        online: false
    };
    render() {
        const { battery, online } = this.state;
        return (
            <BatteryContext.Provider value={battery}>
                <OnlineContext.Provider value={online}>
                    <button onClick={() => this.setState({ battery: battery - 1 })}>Battery</button>
                    <button onClick={() => this.setState({ online: !online })}>Online</button>
                    <Middle />
                </OnlineContext.Provider>
            </BatteryContext.Provider>
        );
    }
}
```

```javascript
// Middle 组件
class Middle extends Component {
    render() {
        return <Leaf />;
    }
}
```

```javascript
// 之前写法：Leaf 组件
class Leaf extends Component {
    render() {
        return (
            <BatteryContext.Consumer>
                {battery =>
                    <OnlineContext.Consumer>
                        {online =>
                            <h1>
                                Battery: {battery}, Online: {String(online)}
                            </h1>}
                    </OnlineContext.Consumer>}
            </BatteryContext.Consumer>
        );
    }
}
```

Hooks 改写 Leaf 组件

```javascript
function Leaf() {
    const battery = useContext(BatteryContext);
    const online = useContext(OnlineContext);
    return (
        <h1>
            Battery: {battery}, Online: {String(online)}
        </h1>
    );
}
```