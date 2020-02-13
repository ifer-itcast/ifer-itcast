---
title: Redux
date: 2020-02-08 10:04:00
tags:
---

## Redux 干嘛用的

用来处理复杂数据交互的，例如一个组件需要改变全局状态，或者改变另一个组件（两个组件间关系模糊）的状态。

```javascript
yarn add redux
```

<!-- more -->

## Redux 最基础使用

下面代码在基于 create-react-app 创建的项目 src/index.js 中进行测试。

Step1：创建 reducer

```javascript
import { createStore } from 'redux';

const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
        default:
            return state;
    }
};
```

Step2：根据 reducer 创建 store

```javascript
const store = createStore(reducer);
```

Step3：可以使用 store.getState() 获取初始状态，或通过 store.dispatch 派发事件后，再通过 store.getState() 获取新的 state

```javascript
console.log(store.getState()); // 可以直接拿到初始数据 0
```

Step4：也可以 dispatch 后再取出数据

```javascript
store.dispatch({
    type: 'add'
});
console.log(store.getState()); // 1

store.dispatch({
    type: 'sub'
});
console.log(store.getState()); // 0
```

## Store.subscribe

上面代码有个小小的问题，每次 dispatch 后，想拿到最新的数据还要手工的调用 store.getState()，通过订阅的方式可以实现每次 dispatch 后就直接拿到最新的数据。

store.subscribe 接收一个监听函数，一般函数里面书写我们想要得到的结果或想要得到的最终数据。

```javascript
const store = createStore(reducer);

const listener = () => {
    console.log(store.getState());
};

store.subscribe(listener);

store.dispatch({ type: '@@INIT' }); // 0
store.dispatch({ type: 'add' }); // 1
store.dispatch({ type: 'sub' }); // 0
```

上面完整的代码如下

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const reducer = (state = 0, action) => {
	switch (action.type) {
		case 'add':
			return state + 1;
		case 'sub':
			return state - 1;
		default:
			return state;
	}
};
const store = createStore(reducer);

const listener = () => {
	console.log(store.getState());
};
store.subscribe(listener);

// actionCreator
const initAction = () => ({ type: '@@INIT' });
const addAction = () => ({ type: 'add' });
const subAction = () => ({ type: 'sub' });

store.dispatch(initAction()); // 0
store.dispatch(addAction()); // 1
store.dispatch(subAction()); // 0

ReactDOM.render(<div>hello</div>, document.querySelector('#root'));
```

## bindActionCreators

上面我们拿到最终的状态是这么写的

```javascript
const initAction = () => ({ type: '@@INIT' });
// 调用 store.dispatch 并传递一个 actionCreator
store.dispatch(initAction());
```

bindActionCreators 也是 Redux 的一个方法，它接收一个 actionCreator 和 dispatch，并返回一系列方法，调用对应的方法能帮我们自动 dispatch 对应的 action，代替上面直接 store.dispatch 的写法，使代码看起来更加简洁，可以把上面代码改造如下：

index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import * as actionCreators from './actionCreators';

const reducer = (state = 0, action) => {
	switch (action.type) {
		case 'add':
			return state + 1;
		case 'sub':
			return state - 1;
		default:
			return state;
	}
};

const store = createStore(reducer);

const listener = () => {
	console.log(store.getState());
};

store.subscribe(listener);

let { initAction, addAction, subAction } = bindActionCreators(actionCreators, store.dispatch);

// 看，我可以直接这样调用~
initAction(); // 0
addAction(); // 1
subAction(); // 0

ReactDOM.render(<div>hello</div>, document.querySelector('#root'));
```

actionCreators.js

```javascript
export const initAction = () => ({ type: '@@INIT' });
export const addAction = () => ({ type: 'add' });
export const subAction = () => ({ type: 'sub' });
```

## combineReducers

实际项目中会有很多很多的组件，我们不可能把所有数据的处理都放到一个 reducer 里，通常我们会把不同组件或者不同类别的数据处理放到不同的（对应的）reducer 里，以方便更加清晰的管理。

Redux 中有个 combineReducers 方法，它接收一组 reducer ，并返回合并后的 reducer。前面我们创建 store 的写法如下：

```javascript
const store = createStore(reducer);
```

假如有多个 reducer 时我们可以改写代码如下

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators, combineReducers } from 'redux';
import * as actionCreators from './actionCreators';

// Step1: 准备 reducer
const ageReducer = (state = 0, action) => {
	switch (action.type) {
		case 'add':
			return state + 1;
		case 'sub':
			return state - 1;
		default:
			return state;
	}
};
const numReducer = (state = 0, action) => {
	switch (action.type) {
		case 'add':
			return state + 1;
		case 'sub':
			return state - 1;
		default:
			return state;
	}
};

// Step2: 合并 reducer
const reducers = combineReducers({
	ageData: ageReducer,
	numData: numReducer
});

// Step3: 根据合并后的 reducer 创建 store
const store = createStore(reducers);

const listener = () => { console.log(store.getState()); };
store.subscribe(listener);

let { initAction, addAction, subAction } = bindActionCreators(actionCreators, store.dispatch);

// Step4: 注意最终输出的数据格式
initAction(); // {ageData: 0, numData: 0}
addAction(); // {ageData: 1, numData: 1}
subAction(); // {ageData: 0, numData: 0}

ReactDOM.render(<div>hello</div>, document.querySelector('#root'));
```

## Redux 和 React 配合

上面的例子我们在普通 JS 文件中进行的，那么和 React 配合时 Redux 该怎么使用呢？

actionTypes.js

```javascript
export const ADD = 'ADD';
export const SUB = 'SUB';
```

reducer.js

```javascript
import * as Types from './actionTypes';

export const counter = (state = 0, action) => {
    switch (action.type) {
        case Types.ADD:
            return state + 1;
        case Types.SUB:
            return state - 1;
        default:
            return state;
    }
};
```

index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { counter } from './reducer';
// 根据 counter reducer 创建 store 并传递给 App 组件
const store = createStore(counter);

const render = () => {
    ReactDOM.render(<App store={store} />, document.getElementById('root'));
};
render();

// 通过 subscribe 订阅 dispatch 后要触发的操作，即会执行 render
store.subscribe(render);
```

actionCreator.js

```javascript
import * as Types from './actionTypes';

export const add = () => {
    return {
        type: Types.ADD
    };
};

export const sub = () => {
    return {
        type: Types.SUB
    };
};
```

App.js

```javascript
import React, { Component } from 'react';
import { add, sub } from './actionCreator';

class App extends Component {
    render() {
        const { store } = this.props;
        const num = store.getState();
        return (
            <div>
                <h3>
                    {num}
                </h3>
                <button onClick={() => store.dispatch(add())}>add</button>
                <button onClick={() => store.dispatch(sub())}>sub</button>
            </div>
        );
    }
}

export default App;
```

上面是在入口文件 src/index.js 中完成了订阅，也可以在 src/App.js 组件中订阅，如下：

```javascript
import React, { Component } from 'react';
import { add, sub } from './actionCreators';
import { createStore } from 'redux';
import { counter } from './reducer';
// 根据 counter reducer 创建 store 并传递给 App 组件
const store = createStore(counter);
class App extends Component {
    state = {
        num: store.getState()
    };
    componentDidMount() {
        // 每次 dispatch 都会触发 subscribe，通过 store.getState() 又能拿到最新的数据
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                num: store.getState()
            });
        });
    }
    componentWillUnmount() {
        // 组件卸载时记得取消订阅
        store.unsubscribe(this.unsubscribe);
    }
    render() {
        const { num } = this.state;
        return (
            <div>
                <h3>
                    {num}
                </h3>
                <button onClick={() => store.dispatch(add())}>add</button>
                <button onClick={() => store.dispatch(sub())}>sub</button>
            </div>
        );
    }
}

export default App;
```

## Redux 处理异步

这里使用了 redux-thunk 这个第三方中间件，还需要使用 applyMiddleware（Redux自带的）来开启这个中间件，具体使用套路如下。

```javascript
yarn add redux-thunk
```

actionCreator.js

```javascript
export const addAsync = () => {
    // thunk 插件的使用，这里可以返回函数
    return dispatch => {
        setTimeout(() => {
            // 异步结束后，手动执行 dispatch
            dispatch(add());
        }, 2000);
    }
}
```

index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// step1: 引入 applyMiddleware
import { createStore, applyMiddleware } from 'redux';
// step2: 引入 thunk
import thunk from 'redux-thunk';
// step3: 注意这里多了个 addAsync，是个异步增加数字的函数
import { counter } from './reducer';
// step4: 使用 applyMiddleware 开启 thunk 中间件
const store = createStore(counter, applyMiddleware(thunk));

const render = () => {
    ReactDOM.render(<App store={store} />, document.getElementById('root'));
};
render();

// 通过 subscribe 订阅 dispatch 后要触发的操作，即会执行 render
store.subscribe(render);
```

App.js

```javascript
import React, { Component } from 'react';
import { add, sub, addAsync } from './actionCreator';

class App extends Component {
    render() {
        const { store } = this.props;
        const num = store.getState();
        return (
            <div>
                <h3>
                    {num}
                </h3>
                <button onClick={() => store.dispatch(add())}>add</button>
                <button onClick={() => store.dispatch(sub())}>sub</button>
                <button onClick={() => store.dispatch(addAsync())}>addAsync</button>
            </div>
        );
    }
}

export default App;
```

## 调试 Redux

安装 Chrome 扩展工具 Redux DevTools，然后配置 index.js 如下：

index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// step1: 引入 compose
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { counter } from './reducer';
// step2: 关联调用调试工具
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

const render = () => {
    ReactDOM.render(<App store={store} />, document.getElementById('root'));
};
render();

// 通过 subscribe 订阅 dispatch 后要触发的操作，即会执行 render
store.subscribe(render);
```

## 优雅的链接 React 和 Redux

这里依赖第三方包 react-redux，其提供 provider 和 connect 两个接口来链接。

```javascript
yarn add react-redux
```

Provider 组件应用在最外层，传入 store 即可，只用一次。Connect 负责从外部获取组件需要的参数。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// step1: 引入 Provider
import { Provider } from 'react-redux';
import { counter } from './reducer';
const store = createStore(
    counter,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

// step2: 只传 store
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

App.js

```javascript
import React, { Component } from 'react';
import * as actionCreators from './actionCreators';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        const { num, add, sub, addAsync } = this.props;
        return (
            <div>
                <h3>
                    {num}
                </h3>
                <button onClick={add}>add</button>
                <button onClick={sub}>sub</button>
                <button onClick={addAsync}>addAsync</button>
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        num: state
    };
};

// 属性和方法分别给出，注意这里的第二个参数可以是 mapDispatchToProps
App = connect(mapStatetoProps, actionCreators)(App);
export default App;
```

## Connect 可以用装饰器的方式来写

安装

```javascript
yarn eject // 弹出自定义配置
yarn add @babel/plugin-proposal-decorators --dev
```

配置 package.json

```javascript
"babel": {
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
}
```

使用

```javascript
import React, { Component } from 'react';
import * as actionCreators from './actionCreators';
import { connect } from 'react-redux';

// 装饰器
@connect(state => ({ num: state }), actionCreators)
class App extends Component {
    render() {
        const { num, add, sub, addAsync } = this.props;
        return (
            <div>
                <h3>
                    {num}
                </h3>
                <button onClick={add}>add</button>
                <button onClick={sub}>sub</button>
                <button onClick={addAsync}>addAsync</button>
            </div>
        );
    }
}

export default App;
```

[以上代码](https://github.com/ifer-itcast/redux-cource)