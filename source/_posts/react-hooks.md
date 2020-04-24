---
title: React Hooks
date: 2020-04-01 22:19:44
tags: React Hooks
categories: React
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

## useLayoutEffect

用法和 useEffect 一致，与 useEffect 的差别是执行时机，useLayoutEffect 是在浏览器绘制节点之前执行（和 componentDidMount 以及 componentDidUpdate 执行时机相同）

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
    const child = useMemo(() => {
        console.log(233);
        return <Child num={num} />;
    }, [num]);
    return (
        <div>
            {child}
        </div>
    );
}

function App() {
    const [count, setCount] = useState(0);
    // 初始化时执行或 count === 3 整体的状态（true or false）发生变化时才会触发函数的执行
    const num = useMemo(
        () => count * 2,
        [count === 3]
    );
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>click me</button>
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

## useImperativeHandle

通过 useImperativeHandle 配合 forwardRef，可以让父组件获取子组件内的 DOM 引用

```javascript
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

function ChildInputComponent(props, ref) {
    const inputRef = useRef(null);
    // Step1
    useImperativeHandle(ref, () => inputRef.current);
    return <input type="text" name="child input" ref={inputRef} />;
}

// Step2
const ChildInput = forwardRef(ChildInputComponent);

function App() {
    const inputRef = useRef(null);
    useEffect(() => {
        // Step3
        inputRef.current.focus();
    }, []);
    return (
        <div>
            <ChildInput ref={inputRef} />
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

## useReducer

useReducer 在使用上几乎跟 Redux/React-Redux 一模一样，唯一缺少的就是无法使用 redux 提供的中间件

```javascript
import React, { useReducer } from 'react';

const initialState = {
    count: 0
};

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + action.payload };
        case 'decrement':
            return { count: state.count - action.payload };
        default:
            throw new Error();
    }
}
function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement', payload: 5 })}>-</button>
        </div>
    );
}
```

## Custom Hooks

自定义 Hooks 其实就可以理解为对函数的封装！

### 功能型封装

```javascript
import React, { useEffect, useState, useRef } from 'react';

function useCount(defaultCount) {
    const [count, setCount] = useState(defaultCount);
    const it = useRef();
    useEffect(() => {
        it.current = setInterval(() => {
            setCount(count => count + 1);
        }, 1000);
    }, []);
    useEffect(() => {
        if (count >= 5) {
            clearInterval(it.current);
        }
    });
    return [count, setCount];
}

function App() {
    // 会自动变化的 count
    const [count, setCount] = useCount(0);

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
        </div>
    );
}
```

### 组件型封装

```javascript
import React from 'react';

function useCounter(count) {
    return (
        <span>
            {count}
        </span>
    );
}
function App() {
    // Counter 得到的是一个组件
    const Counter = useCounter(0);
    return (
        <div>
            <p>
                {Counter}
            </p>
        </div>
    );
}
```

### 计算结果型封装

```javascript
import React, { useEffect, useState, useCallback } from 'react';

function useSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });
    const onResize = useCallback(() => {
        // 主动触发时才会执行
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        });
    }, []);
    useEffect(
        () => {
            // 初始化和 onResize 变化时执行，不错这里的 onResize 也不会变化，所以也是只执行了一次
            window.addEventListener('resize', onResize);
            return () => {
                window.removeEventListener('resize', onResize);
            };
        },
        [onResize]
    );
    return size;
}

function App() {
    // size 是一个对象
    const size = useSize();

    return (
        <div>
            <p>
                width: {size.width} height: {size.height}
            </p>
        </div>
    );
}
```

## TodoList

### 版本 1

```javascript
import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
const TODO_KEY = 'TODO';

function App() {
    const [todos, setTodos] = useState([]);
    // useCallback 目的是优化
    const addTodo = useCallback(todo => {
        // setTodos([...todos, todo]);
        // 这种写法能避免对 todos 的依赖
        setTodos(todos => [...todos, todo]);
    }, []);
    const removeTodo = useCallback(id => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }, []);
    const toggleTodo = useCallback(id => {
        setTodos(todos =>
            todos.map(todo => {
                return todo.id === id
                    ? {
                            ...todo,
                            completed: !todo.completed
                        }
                    : todo;
            })
        );
    }, []);

    useEffect(() => {
        // 只初始化时执行一次
        const todos = JSON.parse(localStorage.getItem(TODO_KEY) || '[]');
        setTodos(todos);
    }, []);

    useEffect(
        () => {
            // 初始化时和 todos 发生变化就存储到本地
            localStorage.setItem(TODO_KEY, JSON.stringify(todos));
        },
        [todos]
    );

    return (
        <section className="todoapp">
            {/* 头部 */}
            <Header addTodo={addTodo} />
            {/* 主体 */}
            <Content removeTodo={removeTodo} todos={todos} toggleTodo={toggleTodo} />
        </section>
    );
}

const Header = memo(function Header(props) {
    const { addTodo } = props;
    const inputRef = useRef();
    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            const title = inputRef.current.value.trim();
            if (!title) return;
            addTodo({
                id: Date.now() + '',
                title: title,
                completed: false
            });
            inputRef.current.value = '';
        }
    };
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                ref={inputRef}
                className="new-todo"
                placeholder="What needs to be done?"
                id="task"
                onKeyUp={handleKeyUp}
                autoFocus
            />
        </header>
    );
});

const Content = memo(function Content(props) {
    const { todos, toggleTodo, removeTodo } = props;
    return (
        <section className="main">
            <input className="toggle-all" type="checkbox" />
            <ul className="todo-list" id="todo-list">
                {todos.map(todo => <Item key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />)}
            </ul>
        </section>
    );
});

const Item = memo(function Item(props) {
    const { todo: { id, title, completed }, toggleTodo, removeTodo } = props;
    const handleChange = () => {
        // 每一个 Item 都绑定了自己的事件，可以直接获取到自己的 ID，无需自定义属性
        toggleTodo(id);
    };
    const handleClick = () => {
        removeTodo(id);
    };
    return (
        <li className={completed ? 'completed' : ''}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={completed} onChange={handleChange} />
                <label>
                    {title}
                </label>
                <button className="destroy" onClick={handleClick} />
            </div>
            <input className="edit" placeholder="Rule the web" />
        </li>
    );
});

export default App;
```

### 版本 2

把 addTodo、removeTodo、toggleTodo 都封装到了 dispatch 中

```javascript
import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import { createSet, createAdd, createRemove, createToggle } from './actions';
const TODO_KEY = 'TODO';

function App() {
    const [todos, setTodos] = useState([]);
    const dispatch = useCallback(action => {
        const { type, payload } = action;
        switch (type) {
            case 'SET':
                setTodos(payload);
                break;
            case 'ADD':
                setTodos(todos => [...todos, payload]);
                break;
            case 'REMOVE':
                setTodos(todos => todos.filter(todo => todo.id !== payload));
                break;
            case 'TOGGLE':
                setTodos(todos =>
                    todos.map(todo => {
                        return todo.id === payload
                            ? {
                                    ...todo,
                                    completed: !todo.completed
                                }
                            : todo;
                    })
                );
                break;
            default:
        }
    }, []);

    useEffect(() => {
        // 只初始化时执行一次
        const todos = JSON.parse(localStorage.getItem(TODO_KEY) || '[]');
        // Step2: 每次都需要传递 action，所以封装了 actionCreator
        dispatch(createSet(todos));
    }, []);

    useEffect(
        () => {
            // 初始化时和 todos 发生变化就存储到本地
            localStorage.setItem(TODO_KEY, JSON.stringify(todos));
        },
        [todos]
    );

    return (
        <section className="todoapp">
            {/* 头部 */}
            <Header dispatch={dispatch} />
            {/* 主体 */}
            <Content dispatch={dispatch} todos={todos} />
        </section>
    );
}

const Header = memo(function Header(props) {
    const { dispatch } = props;
    const inputRef = useRef();
    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            const title = inputRef.current.value.trim();
            if (!title) return;
            dispatch(
                createAdd({
                    id: Date.now() + '',
                    title: title,
                    completed: false
                })
            );
            inputRef.current.value = '';
        }
    };
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                ref={inputRef}
                className="new-todo"
                placeholder="What needs to be done?"
                id="task"
                onKeyUp={handleKeyUp}
                autoFocus
            />
        </header>
    );
});

const Content = memo(function Content(props) {
    const { todos, dispatch } = props;
    return (
        <section className="main">
            <input className="toggle-all" type="checkbox" />
            <ul className="todo-list" id="todo-list">
                {todos.map(todo => <Item key={todo.id} todo={todo} dispatch={dispatch} />)}
            </ul>
        </section>
    );
});

const Item = memo(function Item(props) {
    const { todo: { id, title, completed }, dispatch } = props;
    const handleChange = () => {
        // 每一个 Item 都绑定了自己的事件，可以直接获取到自己的 ID，无需自定义属性
        dispatch(createToggle(id));
    };
    const handleClick = () => {
        dispatch(createRemove(id));
    };
    return (
        <li className={completed ? 'completed' : ''}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={completed} onChange={handleChange} />
                <label>
                    {title}
                </label>
                <button className="destroy" onClick={handleClick} />
            </div>
            <input className="edit" placeholder="Rule the web" />
        </li>
    );
});
```

### 版本 3

把 actionCreator 和 dispatch 打包到一起给组件调用

```javascript
import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import { createSet, createAdd, createRemove, createToggle } from './actions';
const TODO_KEY = 'TODO';

// Step3: actionCreator 都要给 dispatch 用，封装了 bindActionCreators
// 把 actionCreator 和 dispatch 打包到一起给组件调用
// bindActionCreators({ addTodo: createAdd, removeTodo: createRemove }, dispatch)
const bindActionCreators = (actionCreators, dispatch) => {
    const ret = {};
    for (let key in actionCreators) {
        ret[key] = function(...args) {
            const actionCreator = actionCreators[key];
            const action = actionCreator(...args);
            dispatch(action);
        };
    }
    /* {
        addTodo: function(...args) {
            dispatch(createAdd(...args))
        },
        removeTodo: function(...args){
            dispatch(createRemove(...args))
        }
    } */
    return ret;
};

function App() {
    const [todos, setTodos] = useState([]);
    // Step1: 把 addTodo、removeTodo、toggleTodo 都封装到了 dispatch 中
    const dispatch = useCallback(action => {
        const { type, payload } = action;
        switch (type) {
            case 'SET':
                setTodos(payload);
                break;
            case 'ADD':
                setTodos(todos => [...todos, payload]);
                break;
            case 'REMOVE':
                setTodos(todos => todos.filter(todo => todo.id !== payload));
                break;
            case 'TOGGLE':
                setTodos(todos =>
                    todos.map(todo => {
                        return todo.id === payload
                            ? {
                                    ...todo,
                                    completed: !todo.completed
                                }
                            : todo;
                    })
                );
                break;
            default:
        }
    }, []);

    useEffect(() => {
        // 只初始化时执行一次
        const todos = JSON.parse(localStorage.getItem(TODO_KEY) || '[]');
        // Step2: 每次都需要传递 action，所以封装了 actionCreator
        dispatch(createSet(todos));
    }, []);

    useEffect(
        () => {
            // 初始化时和 todos 发生变化就存储到本地
            localStorage.setItem(TODO_KEY, JSON.stringify(todos));
        },
        [todos]
    );

    return (
        <section className="todoapp">
            {/* 头部 */}
            <Header {...bindActionCreators({ addTodo: createAdd }, dispatch)} />
            {/* 主体 */}
            <Content
                {...bindActionCreators({ removeTodo: createRemove, toggleTodo: createToggle }, dispatch)}
                todos={todos}
            />
        </section>
    );
}

const Header = memo(function Header(props) {
    const { addTodo } = props;
    const inputRef = useRef();
    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            const title = inputRef.current.value.trim();
            if (!title) return;
            // addTodo 已经具备了 dispatch 和 createAdd 的双重功能
            addTodo({
                id: Date.now() + '',
                title: title,
                completed: false
            });
            inputRef.current.value = '';
        }
    };
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                ref={inputRef}
                className="new-todo"
                placeholder="What needs to be done?"
                id="task"
                onKeyUp={handleKeyUp}
                autoFocus
            />
        </header>
    );
});

const Content = memo(function Content(props) {
    const { todos, removeTodo, toggleTodo } = props;
    return (
        <section className="main">
            <input className="toggle-all" type="checkbox" />
            <ul className="todo-list" id="todo-list">
                {todos.map(todo => <Item key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />)}
            </ul>
        </section>
    );
});

const Item = memo(function Item(props) {
    const { todo: { id, title, completed }, removeTodo, toggleTodo } = props;
    const handleChange = () => {
        // 每一个 Item 都绑定了自己的事件，可以直接获取到自己的 ID，无需自定义属性
        toggleTodo(id);
    };
    const handleClick = () => {
        removeTodo(id);
    };
    return (
        <li className={completed ? 'completed' : ''}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={completed} onChange={handleChange} />
                <label>
                    {title}
                </label>
                <button className="destroy" onClick={handleClick} />
            </div>
            <input className="edit" placeholder="Rule the web" />
        </li>
    );
});
```

### 版本 4

```javascript
import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import { createSet, createAdd, createRemove, createToggle } from './actions';
import reducer from './reducers';
const TODO_KEY = 'TODO';
const bindActionCreators = (actionCreators, dispatch) => {
    const ret = {};
    for (let key in actionCreators) {
        ret[key] = function(...args) {
            const actionCreator = actionCreators[key];
            const action = actionCreator(...args);
            dispatch(action);
        };
    }
    return ret;
};

function App() {
    const [todos, setTodos] = useState([]);
    const [incrementCount, setIncrementCount] = useState(0);
    /* const reducer = (state, action) => {
        const { type, payload } = action;
        const { todos, incrementCount } = state;
        switch (type) {
            case 'SET':
                return {
                    ...state,
                    todos: payload,
                    incrementCount: incrementCount + 1
                };
            case 'ADD':
                return {
                    ...state,
                    todos: [...todos, payload],
                    incrementCount: incrementCount + 1
                };
            case 'REMOVE':
                return {
                    ...state,
                    todos: todos.filter(todo => todo.id !== payload)
                };
            case 'TOGGLE':
                return {
                    ...state,
                    todos: todos.map(todo => {
                        return todo.id === payload
                            ? {
                                    ...todo,
                                    completed: !todo.completed
                                }
                            : todo;
                    })
                };
            default:
                return state;
        }
    }; */

    const dispatch = useCallback(
        action => {
            const state = {
                todos,
                incrementCount
            };
            const setters = {
                todos: setTodos,
                incrementCount: setIncrementCount
            };
            const newState = reducer(state, action);
            for (let key in newState) {
                setters[key](newState[key]);
            }
        },
        [todos, incrementCount]
    );

    useEffect(() => {
        // 只初始化时执行一次
        const todos = JSON.parse(localStorage.getItem(TODO_KEY) || '[]');
        // Step2: 每次都需要传递 action，所以封装了 actionCreator
        dispatch(createSet(todos));
    }, []); // 这里不要 [dispatch]

    useEffect(
        () => {
            // 初始化时和 todos 发生变化就存储到本地
            localStorage.setItem(TODO_KEY, JSON.stringify(todos));
        },
        [todos]
    );

    return (
        <section className="todoapp">
            {/* 头部 */}
            <Header {...bindActionCreators({ addTodo: createAdd }, dispatch)} />
            {/* 主体 */}
            <Content
                {...bindActionCreators({ removeTodo: createRemove, toggleTodo: createToggle }, dispatch)}
                todos={todos}
            />
        </section>
    );
}

const Header = memo(function Header(props) {
    const { addTodo } = props;
    const inputRef = useRef();
    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            const title = inputRef.current.value.trim();
            if (!title) return;
            addTodo({
                id: Date.now() + '',
                title: title,
                completed: false
            });
            inputRef.current.value = '';
        }
    };
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                ref={inputRef}
                className="new-todo"
                placeholder="What needs to be done?"
                id="task"
                onKeyUp={handleKeyUp}
                autoFocus
            />
        </header>
    );
});

const Content = memo(function Content(props) {
    const { todos, removeTodo, toggleTodo } = props;
    return (
        <section className="main">
            <input className="toggle-all" type="checkbox" />
            <ul className="todo-list" id="todo-list">
                {todos.map(todo => <Item key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />)}
            </ul>
        </section>
    );
});

const Item = memo(function Item(props) {
    const { todo: { id, title, completed }, toggleTodo, removeTodo } = props;
    const handleChange = () => {
        // 每一个 Item 都绑定了自己的事件，可以直接获取到自己的 ID，无需自定义属性
        toggleTodo(id);
    };
    const handleClick = () => {
        removeTodo(id);
    };
    return (
        <li className={completed ? 'completed' : ''}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={completed} onChange={handleChange} />
                <label>
                    {title}
                </label>
                <button className="destroy" onClick={handleClick} />
            </div>
            <input className="edit" placeholder="Rule the web" />
        </li>
    );
});
```

```javascript
// reducers.js
function combineReducers(reducers) {
    return function reducer(state, action) {
        const changed = {};
        for (let key in reducers) {
            changed[key] = reducers[key](state[key], action);
        }
        return {
            ...state,
            ...changed
        };
    };


}

const reducers = {
    todos(state, action) {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case 'SET':
                return payload;
            case 'ADD':
                return [...state, payload];
            case 'REMOVE':
                return state.filter(todo => todo.id !== payload);
            case 'TOGGLE':
                return state.map(todo => {
                    return todo.id === payload ? {
                            ...todo,
                            completed: !todo.completed
                        } :
                        todo;
                });
            default:
                return state;
        }
    },
    incrementCount(state, action) {
        const {
            type
        } = action;
        switch (type) {
            case 'SET':
            case 'ADD':
                return state + 1;
            default:
                return state;
        }
    }
};
export default combineReducers(reducers);
```

```javascript
// actions.js
export const createSet = (payload) => ({
    type: 'SET',
    payload
});

export const createAdd = (payload) => ({
    type: 'ADD',
    payload
});

export const createRemove = (payload) => ({
    type: 'REMOVE',
    payload
});

export const createToggle = (payload) => ({
    type: 'TOGGLE',
    payload
});
```