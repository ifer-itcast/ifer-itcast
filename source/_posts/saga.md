---
title: redux-saga
date: 2020-08-12 19:20:30
tags: redux-saga
categories: React
---

redux-saga 通过拦截 action 来执行有副作用的 task，以保持 action 的简洁！

<!-- more -->

## redux-thunk 异步计数器

```
npx create-react-app saga
yarn add redux react-redux redux-thunk
```

`src/index.js`

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);
```

`src/App.jsx`

```javascript
import React, { Component } from "react";
import Counter from "./pages/counter";
export default class App extends Component {
    render() {
        return (
            <div>
                <Counter />
            </div>
        );
    }
}
```

`src/store/reducers.js`

```javascript
import { combineReducers } from 'redux';
import { reducer as counterReducer } from '../pages/counter/store';
export default combineReducers({
    counter: counterReducer
});
```

`src/store/index.js`

```javascript
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 中间件、createStore、reducer
// const store = composeEnhancers(applyMiddleware(thunk))(createStore)(rootReducer);
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
export default store;
```

`src/pages/counter/index.jsx`

```javascript
import React, { Component } from 'react'
import { connect } from "react-redux";
import { incrementAsync } from './store/actionCreators';
class Counter extends Component {
    render() {
        return (
            <div>
                <p>
                    {this.props.counter}
                </p>
                <button onClick={this.props.incrementAsync}>click</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        counter: state.counter,
    };
};

export default connect(mapStateToProps, { incrementAsync })(Counter);
```

`src/pages/counter/store/index.js`

```javascript
import reducer from './reducer';
import * as actionCreators from './actionCreators';

export {
    reducer,
    actionCreators
};
```

`src/pages/counter/store/reducer.js`

```javascript
import {
    INCREMENT
} from './actionTypes';

const counter = (state = 1, action = {}) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        default:
            return state;
    }
}

export default counter;
```

`src/pages/counter/store/actionCreators.js`

```javascript
import { INCREMENT } from './actionTypes';

const increment = () => ({
    type: INCREMENT
});

export const incrementAsync = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment());
        }, 1000);
    }
};
```

`src/pages/counter/store/actionTypes.js`

```javascript
export const INCREMENT = 'INCREMENT';
```

[redux-thunk异步计数器代码](https://github.com/ifer-itcast/saga/tree/redux-thunk%E5%BC%82%E6%AD%A5%E8%AE%A1%E6%95%B0%E5%99%A8)

## redux-saga 基础配置

```
yarn add redux-saga
```

`src/store/index.js`

```javascript
import { createStore, compose, applyMiddleware } from 'redux';
// #1 引入
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import { helloSaga } from '../sagas';
// #2 创建
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    // #3 应用
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
// #4 启用，相当于执行了 helloSaga 这个 generator 函数，原理 co 库
sagaMiddleware.run(helloSaga);
export default store;
```

`src/sagas/index.js`

```javascript
export function* helloSaga() {
    yield console.log('Hello Saga!');
}
```

## 异步计数器

`src/pages/counter/index.jsx`

```javascript
import React, { Component } from 'react'
import { connect } from "react-redux";
import { incrementAsync } from './store/actionCreators';
class Counter extends Component {
    render() {
        return (
            <div>
                <p>
                    {this.props.counter}
                </p>
                {/* 这里直接执行的是一个 actionCreator，无需手动进行 dispatch 的操作 */}
                {/* 这里派发的 action 能被 saga 监听到，然后做对应的处理 */}
                <button onClick={this.props.incrementAsync}>click</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        counter: state.counter,
    };
};

export default connect(mapStateToProps, { incrementAsync })(Counter);
```

`src/pages/counter/store/actionCreators.js`

```javascript
import { INCREMENT, INCREMENT_ASYNC } from './actionTypes';

export const increment = () => ({
    type: INCREMENT
});

export const incrementAsync = () => ({
    type: INCREMENT_ASYNC
});
```

`src/sagas/index.js`

```javascript
import { takeEvery, delay, put } from 'redux-saga/effects';
import { increment } from '../pages/counter/store/actionCreators';
import { INCREMENT_ASYNC } from '../pages/counter/store/actionTypes';

export function* helloSaga() {
    yield console.log('Hello Saga!');
}

// #2 异步代码
function* incrementAsync() {
    yield delay(2000);
    yield put(increment());
}

// #3 注意不要忘了在外部 run watchIncrementAsync
export function* watchIncrementAsync() {
    // #1 监听 action，触发 incrementAsync 函数
    yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}
```

[代码](https://github.com/ifer-itcast/saga/tree/redux-thunk%E5%BC%82%E6%AD%A5%E8%AE%A1%E6%95%B0%E5%99%A8)

## 如何组织 saga

当有多个 Saga 时如何同时运行呢，下面为了演示又增加了 `<User/>` 组件

`src/pages/user/index.jsx`

```javascript
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUser } from './store/actionCreators';

class User extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.fetchUser}>获取数据</button>
            </div>
        )
    }
}

export default connect(null, { fetchUser })(User);
```

`src/App.jsx`

```javascript
import React, { Component } from "react";
import Counter from "./pages/counter";
import User from "./pages/user";
export default class App extends Component {
    render() {
        return (
            <div>
                <Counter />
                <User />
            </div>
        );
    }
}
```

`src/pages/user/store/actionCreators.js`

```javascript
import { FETCH_USER } from './actionTypes';
export const fetchUser = () => {
    return {
        type: FETCH_USER
    };
}
```

`src/pages/user/store/actionTypes.js`

```javascript
export const FETCH_USER = 'FETCH_USER';
```

`src/sagas/index.js`

```javascript
import { takeEvery, delay, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { increment } from '../pages/counter/store/actionCreators';
import { INCREMENT_ASYNC } from '../pages/counter/store/actionTypes';
import { FETCH_USER } from "../pages/user/store/actionTypes";

function* incrementAsync() {
    yield delay(2000);
    yield put(increment());
}
function* fetchUser() {
    const user = yield call(axios.get, "https://api.github.com/users");
    console.log(user);
}

export default function* rootSaga() {
    // 你会发现 10s 之内点击按钮或请求数据无效，因为这里是串行的
    yield delay(10000);
    yield takeEvery(INCREMENT_ASYNC, incrementAsync);
    yield takeEvery(FETCH_USER, fetchUser);
}
```

### 利用 all

```javascript
// #1 worker saga
function* incrementAsync() {
    yield delay(2000);
    yield put(increment());
}
function* fetchUser() {
    const user = yield call(axios.get, "https://api.github.com/users");
    console.log(user);
}

// #2 watcher saga
function* watchIncrementAsync() {
    yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}
function* watchFetchUser() {
    yield takeEvery(FETCH_USER, fetchUser);
}
// #3 root saga
export default function* rootSaga() {
    yield all([
        watchIncrementAsync(),
        watchFetchUser()
    ]);
}
```

### 拆分不同的文件

`src/sagas/counter.js`

```javascript
import { takeEvery, delay, put } from 'redux-saga/effects';
import { increment } from '../pages/counter/store/actionCreators';
import { INCREMENT_ASYNC } from '../pages/counter/store/actionTypes';

function* incrementAsync() {
    yield delay(2000);
    yield put(increment());
}
export function* watchIncrementAsync() {
    yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}
```

`src/sagas/user.js`

```javascript
import axios from 'axios';
import { takeEvery, call } from 'redux-saga/effects';
import { FETCH_USER } from "../pages/user/store/actionTypes";

function* fetchUser() {
    const user = yield call(axios.get, "https://autumnfish.cn/api/joke");
    console.log(user);
}
export function* watchFetchUser() {
    yield takeEvery(FETCH_USER, fetchUser);
}
```

`src/sagas/index.js`

```javascript
import { all, fork } from "redux-saga/effects";
import * as counterSagas from './counter';
import * as userSagas from './user';

export default function* rootSaga() {
    // #1 需要自己执行每一个 watch saga
    /* yield all([
        counterSagas.watchIncrementAsync(),
        userSagas.watchFetchUser(),
    ]); */
    // #2 可以利用 fork 帮我们执行 watch saga
    /* yield all([
        fork(counterSagas.watchIncrementAsync),
        fork(userSagas.watchFetchUser),
    ]); */
    // #3 优化优化
    yield all([
        ...Object.values(userSagas),
        ...Object.values(counterSagas)
    ].map(fork));
}
```

### 每个文件组织好后再导出

`src/sagas/counter.js`

```javascript
import { takeEvery, delay, put } from 'redux-saga/effects';
import { increment } from '../pages/counter/store/actionCreators';
import { INCREMENT_ASYNC } from '../pages/counter/store/actionTypes';

function* incrementAsync() {
    yield delay(2000);
    yield put(increment());
}
function* watchIncrementAsync() {
    yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}

export const counterSagas = [
    watchIncrementAsync();
];
```

`src/sagas/user.js`

```javascript
import { takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_USER } from "../pages/user/store/actionTypes";
function* fetchUser() {
    const user = yield call(axios.get, "https://autumnfish.cn/api/joke");
    console.log(user);
}
function* watchFetchUser() {
    yield takeEvery(FETCH_USER, fetchUser);
}
export const userSagas = [
    watchFetchUser();
]
```

`src/sagas/index.js`

```javascript
import { all } from "redux-saga/effects";
import { counterSagas } from './counter';
import { userSagas } from './user';

export default function* rootSaga() {
    yield all([
        ...counterSagas,
        ...userSagas
    ]);
}
```

## 单元测试

```
yarn add @babel/core @babel/node @babel/plugin-transform-modules-commonjs tape
```

```javascript
{
  "scripts": {
    "test": "babel-node src/sagas/counter.test.js --plugins @babel/plugin-transform-modules-commonjs",
  },
}
```

`src/sagas/counter.js`

```javascript
// 这里需要导出，用于单元测试
export function* incrementAsync() {
    yield delay(2000);
    yield put(increment());
}
```

`src/sagas/sagas/counter.test.js`

```javascript
import test from 'tape';
import { delay, put } from 'redux-saga/effects';
import { incrementAsync } from './counter';
import { increment } from '../pages/counter/store/actionCreators';

test('incrementAsync saga test', function(assert) {
    const it = incrementAsync();
    // yield 什么，这里的 it.next().value 就是什么
    assert.deepEqual(
        it.next().value,
        delay(2000),
        "A promise with a delay of 2 s should be returned"
    );
    assert.deepEqual(
        it.next().value,
        put(increment()),
        "An increase action should be initiated"
    );
    assert.end();
});
```

```
npm test
```

## take 和 select

**take**

```javascript
export function* incrementAsync() {
    yield delay(2000);
    yield put(increment());
}
function* watchIncrementAsync() {
    // yield takeEvery(INCREMENT_ASYNC, incrementAsync);
    // 只会箭头触发的第一次 action
    const action = yield take(INCREMENT_ASYNC);
    console.log(action); // {type: "INCREMENT_ASYNC"}
    yield incrementAsync();
}
```

```javascript
// 触发 2 次
export function* incrementAsync() {
    yield delay(2000);
    yield put(increment());
}
function* watchIncrementAsync() {
    // yield take(INCREMENT_ASYNC);
    // yield incrementAsync();
    // yield take(INCREMENT_ASYNC);
    // yield incrementAsync();
    for(let i = 0; i < 2; i ++) {
        yield take(INCREMENT_ASYNC);
        yield incrementAsync();
    }
    console.log('会执行 2 次');
}
```

```javascript
// 模拟 takeEvery
function* watchIncrementAsync() {
    while(true) {
        yield take(INCREMENT_ASYNC);
        yield incrementAsync();
    }
}
```

**takeEvery**

```javascript
export function* watchIncrementAsync() {
    // takeEvery  会监听每一次 action
    yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}
```

**takeLatest**

```javascript
export function* watchIncrementAsync() {
    // takeLatest 会以最后一次 action 为准
    yield takeLatest(INCREMENT_ASYNC, incrementAsync);
}
```

**select**

```javascript
function* watchAll() {
    while(true) {
        // 监听所有的 action，获取最新的状态树
        console.log(yield take('*'));
        console.log(yield select());
        // 也可以传递函数对状态进行过滤
        // console.log(yield select(state => state.counter));
    }
}
```

## call/apply 和 cps

都可以调用方法并传递参数，以及改变方法中的 this 指向

```javascript
export function* incrementAsync() {
    // delay 函数中的 this 就是 o，注意 delay 不能是一个箭头函数
    const o = { name: 'ifer' };
    yield call([o, delay], 2000);
    // 同样 apply 也可以调用函数，参数分别是this、函数、参数
    // yield apply(o, delay, [2000]);
    yield put(increment());
}
```

```javascript
// delay 是自己封装的，不是 saga 提供的，注意用到 this 的话这里的 delay 不能是一个箭头函数
const delay = function (ms) {
    return new Promise(resolve => {
        console.log(this);
        setTimeout(resolve, ms);
    });
}
```

**cps**

```javascript
// Node style function的方式调用 fn
const getCon = function(type, callback) {
    setTimeout(() => {
        callback(null, type + ' hello world');
    }, 1000);
};

// call 只能用于调用返回 Promise 的方法，cps 可以等待回调的返回结果
let con = yield cps(getCon, 'xxx');
console.log(con)
```

## all

```javascript
// 可以并行执行任务
function* incrementAsync() {
    yield all([
        delay(2000),
        put(increment())
    ]);
}
```

```javascript
// 也可以这样使用
function* fetchJoke() {
    const [data1, data2] = yield all([
        call(axios.get, "https://autumnfish.cn/api/joke"),
        call(axios.get, "https://autumnfish.cn/api/joke/list?num=3")
    ]);
    console.log(data1, data2);
}
```

一般用于组织多个 Saga，并行执行，作为 rootSaga 统一导出

```javascript
export default function* rootSaga() {
    yield all([
        watchIncrementAsync(),
        watchFetchUser()
    ]);
}
```

## loading 和错误处理

`src/pages/user/index.jsx`

```javascript
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUser } from './store/actionCreators';

class User extends Component {
    render() {
        const { isFetching, error, user } = this.props.user;
        let data = null;
        if(error) {
            data = error;
        } else if(isFetching) {
            data = "Loading...";
        } else {
            data = user && <ul>{
                user.jokes.map((item,index) => <li key={index}>{item}</li>)
            }</ul>;
        }
        return (
            <div>
                <div>{data}</div>
                <button onClick={this.props.fetchUser}>获取数据</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, { fetchUser })(User);
```

`src/pages/user/store/index.js`

```javascript
import reducer from './reducer';
export { reducer };
```

`src/pages/user/store/reducer.js`

```javascript
import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './actionTypes';
const initialState = {
    isFetching: false,
    error: null,
    user: null
};
export default function(state=initialState, action) {
    switch(action.type) {
        case FETCH_USER:
            return {
                isFetching: true,
                error: null,
                user: null
            };
        case FETCH_USER_SUCCESS:
            return {
                isFetching: false,
                error: null,
                user: action.payload
            };
        case FETCH_USER_FAILURE:
            return {
                isFetching: false,
                error: action.error,
                user: null
            };
        default:
            return state;
    }
}
```

`src/pages/user/store/actionTypes.js`

```javascript
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
```

`src/sagas/user.js`

```javascript
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "../pages/user/store/actionTypes";
// #1 失败了，后台返回对应的 HTTP Code，前端针对状态码处理
// #2 无论成功或失败，后端 HTTP Code 都响应 200，然后提供不同的 status 标识符，前端据此进行判断
function* fetchUser() {
    try {
        const { data } = yield call(axios.get, "https://autumnfish.cn/api/joke/list?num=3");
        yield put({ type: FETCH_USER_SUCCESS, payload: data });
    } catch(e) {
        yield put({ type: FETCH_USER_FAILURE, error: e.message });
    }
}
function* watchFetchUser() {
    yield takeEvery(FETCH_USER, fetchUser);
}
export const userSagas = [
    watchFetchUser()
];
```

`src/store/reducers.js`

```javascript
import { combineReducers } from 'redux';
import { reducer as counterReducer } from '../pages/counter/store';
import { reducer as userReducer } from '../pages/user/store';
export default combineReducers({
    counter: counterReducer,
    user: userReducer
});
```

[代码](https://github.com/ifer-itcast/saga/tree/loading%E5%A4%84%E7%90%86/src)

## 登录案例

