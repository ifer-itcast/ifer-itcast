---
title: Redux
date: 2020-02-13 11:05:27
tags: Redux
---

Redux 是用来处理复杂数据交互的，例如一个组件需要改变全局状态，或者改变另一个组件的状态。

<!-- more -->

## createStore

[代码](https://github.com/ifer-itcast/redux-cource/tree/01_createStore)

创建对应组件的 reducer

`src/pages/moneyCounter/store/reducer.js`

```javascript
import * as actionTypes from './actionTypes';

const defaultState = {
    moneyNum: 0
};

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actionTypes.ADD:
            newState.moneyNum += 1;
            return newState;
        case actionTypes.SUB:
            newState.moneyNum -= 1;
            return newState;
        default:
            return newState;
    }
};
```

通过 createStore 来创建 store，需要传递上面的 reducer 作为参数

`src/store/index.js`

```javascript
import { createStore } from 'redux';
import { reducer } from '../pages/moneyCounter/store';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
```

通过 store.getState() 获取数据

`src/pages/moneyCounter/index.js`

```javascript
import React, { Component } from 'react';

import store from '../../store';
import { add } from './store/actionCreators';

class MoneyCounter extends Component {
    state = store.getState();
    handleClick = () => {
        store.dispatch(add());
    };
    render() {
        const { moneyNum } = this.state;
        return (
            <div>
                <p>
                    {moneyNum}
                </p>
                <button onClick={this.handleClick}>add</button>
            </div>
        );
    }
}

export default MoneyCounter;
```

## store.subscribe

[代码](https://github.com/ifer-itcast/redux-cource/tree/02_subscribe)

上面点击按钮，store 中的数据确实可以更新，但是界面却没有任何变化。store.dispatch 会触发 store.subscribe 订阅的函数，根据这一特点，可以在订阅函数中通过 store.getState() 获取最新数据并 setState。

`src/pages/moneyCounter/index.js`

```javascript
import React, { Component } from 'react';

import store from '../../store';
import { add } from './store/actionCreators';

class MoneyCounter extends Component {
    state = store.getState()
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }
    componentWillUnmount() {
        // 记得在组件卸载时取消订阅
        store.unsubscribe(this.unsubscribe);
    }
    render() {
        const { moneyNum } = this.state;
        return (
            <div>
                <p>
                    {moneyNum}
                </p>
                <button onClick={() => store.dispatch(add())}>add</button>
            </div>
        );
    }
}

export default MoneyCounter;
```

## bindActionCreators

[代码](https://github.com/ifer-itcast/redux-cource/tree/03_bindActionCreators)

bindActionCreators 也是 Redux 的一个方法，它接收一个 actionCreator 和 dispatch，并返回一系列方法，调用对应的方法能帮我们自动 dispatch 对应的 action，代替上面直接 store.dispatch 的写法，使代码看起来更加简洁。

`src/pages/moneyCounter/index.js`

```javascript
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import store from '../../store';
import * as actionCreators from './store/actionCreators';
const { add, sub } = bindActionCreators(actionCreators, store.dispatch);

class MoneyCounter extends Component {
    state = store.getState();
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }
    componentWillUnmount() {
        store.unsubscribe(this.unsubscribe);
    }
    render() {
        const { moneyNum } = this.state;
        return (
            <div>
                <p>
                    {moneyNum}
                </p>
                <button onClick={add}>add</button>
                <button onClick={sub}>sub</button>
            </div>
        );
    }
}

export default MoneyCounter;
```

## combineReducers

[代码](https://github.com/ifer-itcast/redux-cource/tree/04_combineReducers)

实际项目中会有很多很多的组件，我们不可能把所有数据的处理都放到一个 reducer 里，通常我们会把不同组件或者不同类别的数据处理放到不同的（对应的）reducer 里，以方便更加清晰的管理。

Redux 中有个 combineReducers 方法，它接收一组 reducer ，并返回合并后的 reducer。

`src/store/reducers.js`

```javascript
import { combineReducers } from 'redux';
import { reducer as moneyCounterReducer } from '../pages/moneyCounter/store';
import { reducer as ageCounterReducer } from '../pages/ageCounter/store';

const reducers = combineReducers({
    ageCounter: ageCounterReducer,
    moneyCouter: moneyCounterReducer
});

export default reducers;
```

`src/store/index.js`

```javascript
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
```

注意这里获取数据的时候，应该和 combineReducers 中的 key 对应起来。

`src/pages/moneyCounter/index.js`

```javascript
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import store from '../../store';
import * as actionCreators from './store/actionCreators';
const { add, sub } = bindActionCreators(actionCreators, store.dispatch);

class MoneyCounter extends Component {
    state = store.getState().moneyCouter;
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState().moneyCouter);
        });
    }
    componentWillUnmount() {
        store.unsubscribe(this.unsubscribe);
    }
    render() {
        const { moneyNum } = this.state;
        return (
            <div>
                <p>
                    {moneyNum}
                </p>
                <button onClick={add}>add</button>
                <button onClick={sub}>sub</button>
            </div>
        );
    }
}

export default MoneyCounter;
```

注意这里各个组件的 actionType 不要重复了，为了避免混淆采用前缀为组件名称进行区分。

`src/pages/moneyCounter/store/actionTypes.js`

```javascript
export const MONEYCOUNTER_ADD = 'moneyCounterAdd';
export const MONEYCOUNTER_SUB = 'moneyCounterSub';
```

## redux-thunk

[代码](https://github.com/ifer-itcast/redux-cource/tree/05_redux-thunk)

使用 redux-thunk 这个第三方中间件，需要配合 applyMiddleware（Redux自带的）来开启这个中间件，具体使用套路如下。

`src/store/index.js`

```javascript
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(
    reducers,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
```

`src/pages/moneyCounter/store/actionCreators.js`

```javascript
export const addAsync = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(add());
        }, 1000);
    };
};
```

## react-redux

[代码](https://github.com/ifer-itcast/redux-cource/tree/06_react-redux)

可以使用 react-redux 这个第三方包来优雅的链接 react 和 redux。

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
```

`src/pages/moneyCounter/index.js`

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

class MoneyCounter extends Component {
    render() {
        const { moneyCouter: { moneyNum }, add, sub, addAsync } = this.props;
        return (
            <div>
                <p>
                    {moneyNum}
                </p>
                <button onClick={add}>add</button>
                <button onClick={sub}>sub</button>
                <button onClick={addAsync}>addAsync</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    moneyCouter: state.moneyCouter
});

export default connect(mapStateToProps, actionCreators)(MoneyCounter);
```

## decorator

[代码](https://github.com/ifer-itcast/redux-cource/tree/07_decorator)

connect 可以使用装饰器的方式来编写。安装：

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

`src/pages/moneyCounter/index.js`

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

@connect(state => ({moneyCouter: state.moneyCouter}), actionCreators)

class MoneyCounter extends Component {
    render() {
        const { moneyCouter: { moneyNum }, add, sub, addAsync } = this.props;
        return (
            <div>
                <p>
                    {moneyNum}
                </p>
                <button onClick={add}>add</button>
                <button onClick={sub}>sub</button>
                <button onClick={addAsync}>addAsync</button>
            </div>
        );
    }
}

export default MoneyCounter;
```

## todolist

[本地数据](https://github.com/ifer-itcast/redux-todolist1)，[线上数据](https://github.com/ifer-itcast/redux-todolist2)