---
title: React 必知必会
date: 2019-08-01 19:13:39
tags: [React 技巧, React 必知必会]
categories: React
---

## 常见绑定事件的操作

[查看代码](https://github.com/ifer-itcast/react-skill/tree/master/src/components/00)

**结论：应尽量避免 render 中使用箭头函数或 bind 绑定！**

<!-- more -->

bind 的形式

```javascript
handleClick() {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
<Button type="primary" onClick={this.handleClick.bind(this)}>点击</Button>
```

定义实例方法时采用箭头函数的形式，推荐！

```javascript
handleClick = () => {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
<Button type="primary" onClick={this.handleClick}>点击</Button>
```

绑定事件时采用箭头函数的形式

```javascript
handleClick() {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
<Button type="primary" onClick={() => this.handleClick()}>点击</Button>
```

实例方法和绑定事件都采用箭头函数的形式

```javascript
handleClick = () => {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
// 方便值的传递
<Button type="primary" onClick={() => this.handleClick()}>点击</Button>
```

constructor 中就扭正 this 的指向

```javascript
constructor(props) {
    super(props);
    this.state = {
        num: 0
    };
    this.handleClick = this.handleClick.bind(this);
}
```

```javascript
handleClick() {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
<Button type="primary" onClick={this.handleClick}>点击</Button>
```

## Error Boundaries

部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界。[查看代码](https://react.docschina.org/docs/error-boundaries.html)

```javascript
export default class App extends Component {
    render() {
        return (
            <ErrorBoundary>
                <Test/>
            </ErrorBoundary>
        );
    }
}
```

```javascript
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }
    componentDidCatch(error, info) {
        this.setState({
            error,
            info
        });
    }
    render() {
        if(this.state.error) {
            return (
                <h1>出错啦！</h1>
            );
        }
        return this.props.children;
    }
}
```

## Portals

[查看代码](https://github.com/ifer-itcast/react-skill/tree/master/src/components/08)

可以将子节点渲染到存在于父组件以外的 DOM 节点，常用于弹框、对话框等。

```javascript
class Modal extends Component {
    constructor(props) {
        super(props);
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }
    componentWillUnmount() {
        document.body.removeChild(this.container);
    }
    render() {
        return ReactDOM.createPortal(
            <div className="modal">
                <span className="close" onClick={this.props.onClose}>&times;</span>
                <div className="content">
                    {this.props.children}
                </div>
            </div>,
            this.container
        )
    }
}
```

```javascript
export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        };
    }
    closeModal = () => {
        this.setState({
            showModal: false
        });
    }
    render() {
        return (
            <>
                <h2>标题</h2>
                {
                    this.state.showModal && (
                        <Modal onClose={this.closeModal}>
                            Modal Dialog
                        </Modal>
                    )
                }
            </>
        );
    }
}
```

## Fragments

[查看代码](https://github.com/ifer-itcast/react-skill/tree/master/src/components/09)

Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点

```javascript
export default class Fragment extends Component {
    render() {
        return (
            <React.Fragment>
                <p>1</p>
                <p>2</p>
                <p>3</p>
            </React.Fragment>
        );
    }
}
```

原理实现如下

```javascript
// const Fragment = ({children}) => children;
const Fragment = (props) => props.children;
export default class Fragment extends Component {
    render() {
        return (
            <Fragment>
                <p>1</p>
                <p>2</p>
                <p>3</p>
            </Fragment>
        );
    }
}
```

## Ref 获取元素/组件

**需求：打开页面使 Input 获取焦点**，[查看代码](https://github.com/ifer-itcast/react-skill/tree/master/src/components/01)

通过 this.refs.xxx

```javascript
<input type="text" ref="inputRef"/>
```

```javascript
// 注意是 componentDidMount
componentDidMount() {
    this.refs.inputRef.focus();
}
```

通过 ref 接受一个函数进行处理

```javascript
<input type="text" ref={ele => ele.focus()}/>
```

或者

```javascript
componentDidMount() {
    this.inputRef.focus();
}
<input type="text" ref={ele => this.inputRef=ele}/>
```

利用 React.createRef()

```javascript
constructor(props) {
    super(props);
    this.inputRef = React.createRef();
}
```

```javascript
componentDidMount() {
    this.inputRef.current.focus();
}
```

```javascript
<input type="text" ref={this.inputRef}/>
```

如何自取子组件（函数）中的 DOM 节点？

```javascript
import React, {Component} from 'react';

export default class AboutRef extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
    handleClick = () => {
        // this.inputRef.current.refs.test.style.backgroundColor = 'red';
        this.inputRef.current.style.backgroundColor = 'red';
    }
    render() {
        return (
            <div>
                <Test ref={this.inputRef}/>
                <button onClick={this.handleClick}>改变组件</button>
            </div>
        );
    }
}

/* class Test extends Component {
    render() {
        return (
            <div ref="test">hello world</div>
        );
    }
} */

const Test = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>hello world</div>
    );
});
```

## 新增生命周期

v16.3 新增，v16.4 再次更新了 getDerivedStateFromProps，[查看代码](https://github.com/ifer-itcast/react-skill/tree/master/src/components/02)

```javascript
static getDerivedStateFromProps(nextProps, prevState) {
    // 将传入的 props 映射到 state 上面，props 更新 和 setState 时都会触发
    const { number } = nextProps;
    return number % 2 === 0 ? { num: number + 1 } : { num: number + 3 };
}
```

```javascript
getSnapshotBeforeUpdate() {
    // 发生于 render 之后，但并没有渲染完毕，可以从 DOM 中捕获一些信息（例如滚动之前的高度）
    // 返回值会作为 componentDidUpdate 的第三个参数
    console.log(2);
    return this.ulRef.current.offsetHeight
}
componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot);
}
```






## 跨组件传值

[查看代码](https://github.com/ifer-itcast/react-skill/tree/master/src/components/03)

### 旧版 Context API

```javascript
// Step1: 父
static childContextTypes={
    color: PropTypes.string,
    changeColor:PropTypes.func
}
```

```javascript
// Step2: 父
getChildContext() {
    return {
        color: this.state.color,
        changeColor:(color)=>{
            this.setState({color})
        }
    }
}
```

```javascript
// step3: 子孙
static contextTypes={
    color: PropTypes.string,
    changeColor:PropTypes.func
}
```

```javascript
// step4: 子孙
<button onClick={() => this.context.changeColor('pink')}>改变孙子的颜色</button>
```

### 新版 Context API

React 16.3

```javascript
// Step1: 全局
const ThemeContent = React.createContext();
```

```javascript
// Step2: 父
const ctx = {
    color: this.state.color,
    changeColor: this.changeColor
};
<ThemeContent.Provider value={ctx}>
    <div style={{ border: '3px solid red' }}>
        <h1>父</h1>
        <Large1 />
        <Large2 />
    </div>
</ThemeContent.Provider>
```

```javascript
// Step3: 子孙
<ThemeContent.Consumer>
{
    value => (
        <div style={{ border: '3px solid red', margin: 10, color: value.color }}>
            <h4>孙子2</h4>
            <button onClick={() => value.changeColor('pink')}>改变孙子的颜色</button>
        </div>
    )
}
</ThemeContent.Consumer>
```

**上面的 Step3 也可以改写如下：**

React16.6 提供的 API

```javascript
static contextType = ThemeContent;
```

```javascript
<button onClick={() => this.context.changeColor('pink')}>改变孙子的颜色</button>
```

## PureComponent

浅比较新旧 props 和 state，发生变化时才会更新组件，提高效率！[查看代码](https://github.com/ifer-itcast/react-skill/tree/master/src/components/04)

## React.memo()

[查看代码](https://github.com/ifer-itcast/react-skill/tree/master/src/components/05)

PureComponent 要和 class component 配合使用，而 React.memo() 可以和 function component 一起使用，例如：

```javascript
function Child(props) {
    console.log('res 没有变化时我不会 render ~~');
    return (
        <div>
            结果是：{props.res}
        </div>
    )
}
Child = React.memo(Child);
```

## React.lazy()

可以实现基于路由的代码分割/懒加载，[查看代码](https://github.com/ifer-itcast/react-skill/tree/master/src/components/06)

```javascript
import React, { Suspense, lazy, Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const News = lazy(() => import('./News'));

// render 时需要 return 的内容如下
<Router>
    <Suspense fallback={<div>loading...</div>}>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/news">News</Link>
            </li>
        </ul>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/news" component={News} />
        </Switch>
    </Suspense>
</Router>
```

## 高阶组件及应用

高阶组件是一个函数，能对接收过来的组件进行加工后再返回！[查看代码](https://github.com/ifer-itcast/react-skill/tree/master/src/components/12)

```javascript
// 基本操作
const Logger = (Com) => {
    return class extends Component {
        render() {
            return <Com {...this.props}/>;
        }
    }
}

const Hello = Logger((props) => {
    return (
        <p>Hello {props.name}</p>
    )
});

<Hello name="Ifer"/>
```

```javascript
// 案例
import React, {Component} from 'react';

const withFetch = url => View => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                data: null
            };
        }
        async componentDidMount() {
            const res = await fetch(url);
            const data = await res.json();
            this.setState({
                loading: false,
                data
            });
        }
        render() {
            if(this.state.loading) {
                return <div>loading...</div>
            } else {
                // 注意这里不要忘记把 this.props 继续往下传递，不然使用高阶组件封装后的组件时无法传递 props
                return <View data={this.state.data} {...this.props}></View>
            }
        }
    }
};

export default withFetch;
```

```javascript
import React from 'react';
import withFetch from './WithFetch';

const User = withFetch('https://randomuser.me/api/')(props => {
    return (
        <h1>邮箱：{props.data.results[0].email} 年龄：{props.age}</h1>
    );
});

export default User;
```

## Render Props

```javascript
import React from 'react';

export default class Mouse extends React.Component {
    state = {
        x: 0,
        y: 0
    };
    handleMousemove = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        });
    };
    componentDidMount() {
        window.addEventListener('mousemove', this.handleMousemove);
    }
    render() {
        return this.props.render(this.state);
        // return this.props.children(this.state); // 当然对应的使用方式也要改变
    }
}
```

```javascript
<Fragment>
    <Mouse
        render={mouse =>
            <p>
                x坐标：{mouse.x}y坐标：{mouse.y}
            </p>}
    />
    <Mouse
        render={({ x, y }) =>
            <img
                src={dog}
                style={{
                    width: 100,
                    position: 'absolute',
                    top: y,
                    left: x
                }}
            />}
    />
</Fragment>
```

## Hooks

### useState

```javascript
import React, { Component, useState } from 'react';

export default () => {
    const [num, setNum] = useState(0);
    return (
        <div>
            <p>
                {num}
            </p>
            <button onClick={() => setNum(num + 1)}>click</button>
        </div>
    );
};
```

### useEffect

```javascript
import React, { useState, useEffect } from 'react';

export default () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('useEffect=>' + count);
    });
    return (
        <div>
            <p>
                {count}
            </p>
            <button onClick={() => setCount(count + 1)}>click</button>
        </div>
    );
};
```

相当于之前的 `componentDidMount` 和 `componentDidUpdate`

```javascript
import React from 'react';

export default class Test extends React.Component {
    state = {
        count: 0
    };
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
    componentDidMount() {
        console.log('useEffect=>' + this.state.count);
    }
    componentDidUpdate() {
        console.log('useEffect=>' + this.state.count);
    }
    render() {
        return (
            <div>
                <p>
                    {this.state.count}
                </p>
                <button onClick={this.handleClick}>click</button>
            </div>
        );
    }
}
```

useEffect 可以实现 `componentWillUnmount`，若 useEffect 第二个参数为空数组，代表只有组件销毁时才会执行返回的函数，假如传递了一个 count，代表 count 发生变化时就会执行返回的函数。

```javascript
const Index = () => {
    useEffect(() => {
        // console.log('欢迎来到 Index 页面');
        return () => {
            console.log('你离开了 Index 页面');
        };
    }, []);
    return <div>Index</div>;
};
```

```javascript
const List = () => {
    useEffect(() => {
        // console.log('欢迎来到 List 页面');
        return () => {
            console.log('你离开了 List 页面');
        };
    }, []);
    return <div>List</div>;
};
```

```javascript
export default () => {
    const [count, setCount] = useState(0);
    useEffect(
        () => {
            return () => {
                console.log('只要 count 变化就会执行这里的函数');
            };
        },
        [count]
    );
    return (
        <div>
            <p>
                {count}
            </p>
            <button onClick={() => setCount(count + 1)}>click</button>
            <Router>
                <ul>
                    <li>
                        <Link to="/">首页</Link>
                    </li>
                    <li>
                        <Link to="/list">列表</Link>
                    </li>
                </ul>
                <Route path="/" exact component={Index} />
                <Route path="/list" component={List} />
            </Router>
        </div>
    );
};
```

### useContext

用于父子/孙组件传值

```javascript
import React, { useState, createContext, useContext } from 'react';
// step1
const CountContext = createContext();

export default () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>
                {count}
            </p>
            <button onClick={() => setCount(count + 1)}>click</button>
            {/* step2 */}
            <CountContext.Provider value={count}>
                <Counter1 />
            </CountContext.Provider>
        </div>
    );
};
```

```javascript
const Counter1 = () => {
    return <Counter2 />;
};

const Counter2 = () => {
    // step3
    const count = useContext(CountContext);
    return (
        <div>
            {count}
        </div>
    );
};
```

### userReducer

```javascript
import React, { useReducer } from 'react';

export default () => {
    const [count, dispatch] = useReducer((state, action) => {
        switch (action) {
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            default:
                return state;
        }
    }, 0);

    return (
        <div>
            <p>
                {count}
            </p>
            <button onClick={() => dispatch('add')}>add</button>
            <button onClick={() => dispatch('sub')}>sub</button>
        </div>
    );
};
```

### useReducer 模拟 redux 效果

用到了 createContext、useContext、useReducer

```javascript
import React from 'react';
import Color from './Color';
import Card from './Card';
import Buttons from './Buttons';
export default () => {
    return (
        <Color>
            <Card />
            <Buttons />
        </Color>
    );
};
```

```javascript
// Color.js
import React, { createContext } from 'react';
import { useReducer } from 'react';

// Step1
export const ColorContext = createContext({});

export const UPDATE_COLOR = 'UPDATE_COLOR';

const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_COLOR:
            return action.color;
        default:
            return state;
    }
};

const Color = props => {
    const [color, dispatch] = useReducer(reducer, 'blue');
    // Step2
    return (
        <ColorContext.Provider value={{ color, dispatch }}>
            {props.children}
        </ColorContext.Provider>
    );
};

export default Color;
```

```javascript
// Card.js
import React, { useContext } from 'react';
import { ColorContext } from './Color';
const Card = () => {
    // Step3
    const { color } = useContext(ColorContext);
    return (
        <div style={{ color }}>
            字体颜色为{color}
        </div>
    );
};

export default Card;
```

```javascript
// Buttons.js
import React from 'react';
import { ColorContext, UPDATE_COLOR } from './Color';
import { useContext } from 'react';

const Buttons = () => {
    const { dispatch } = useContext(ColorContext);
    return (
        <div>
            <button
                onClick={() => {
                    dispatch({ type: UPDATE_COLOR, color: 'red' });
                }}
            >
                红色
            </button>
            <button
                onClick={() => {
                    dispatch({ type: UPDATE_COLOR, color: 'blue' });
                }}
            >
                蓝色
            </button>
        </div>
    );
};

export default Buttons;
```

### useMemo

使用 function 的形式来声明组件，失去了 shouldCompnentUpdate（在组件更新之前）这个生命周期，也就是说我们没有办法通过组件更新前条件来决定组件是否更新。useMemo 解决此问题，它可以在某些状态变化时才执行某方法。

```javascript
// 问题：点击 number 按钮，count 的结果没变，但是改变 count 的方法每次都执行，这就是性能损耗
export default () => {
    const [count , setCount] = useState(0)
    const [number , setNumber] = useState(0)
    return (
        <>
            <button onClick={()=>{setCount(count+1)}}>count++</button>
            <button onClick={()=>{setNumber(number+1)}}>number++</button>
            <ChildComponent count={count}>{number}</ChildComponent>
        </>
    )
}
```

```javascript
import React , {useState,useMemo} from 'react';
function ChildComponent({count,children}){
    function changeCount(count){
        console.log('count 变化的方法执行了')
        return count;
    }

    // const actionCount = changeCount(count)
    // [count] 代表只有 count 变化时才执行此函数
    const actionCount = useMemo(() => changeCount(count), [count]);
    return (
        <>
            <div>{actionCount}</div>
            <div>{children}</div>
        </>
    )
}
```

### useRef

```javascript
// 获取普通元素
import React, { useRef } from 'react';

export default () => {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.value = 'hello world';
    };
    return (
        <div>
            <input type="text" ref={inputEl} />
            <button onClick={onButtonClick}>click</button>
        </div>
    );
};
```

```javascript
// 保存普通变量
export default () => {
    const [text, setText] = useState('xxx');
    const textRef = useRef();

    useEffect(() => {
        // 把每次变化的 text 挂载到 textRef.current 上
        textRef.current = text;
        console.log(textRef.current);
    });
    return (
        <input
            value={text}
            onChange={e => {
                setText(e.target.value);
            }}
        />
    );
};
```

### 自定义 Hooks

```javascript
import React, { useState, useEffect, useCallback } from 'react';

const useWinSize = () => {
    // size 初始值是一个对象
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            // 组件卸载的时候解绑事件
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return size;
};

export default () => {
    const size = useWinSize();
    return (
        <div>
            页面size: {size.width}x{size.height}
        </div>
    );
};
```