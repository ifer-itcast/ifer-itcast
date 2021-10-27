---
title: Redux
date: 2021-10-27 00:06:01
tags:
---

<!-- <img src="/resource/images/ifer_redux.png"/> -->
<img src="/resource/images/ifer_redux2.png"/>

<!-- more -->

## 静态界面

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <div className='container d-flex justify-content-center pt-3'>
                <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body'>
                        <h5 className='card-title text-center'>5</h5>
                        <div className='mt-2 d-flex justify-content-center'>
                            <button type='button' className='btn btn-primary me-2'>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2'>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success'>
                                +n
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
```

## React 版本

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        count: 0,
    }
<<<<<<< HEAD
    add = (n = 1) => {
=======
    increment = (n = 1) => {
>>>>>>> source
        this.setState({
            count: this.state.count + n,
        })
    }
<<<<<<< HEAD
    addAsync = (n = 1) => {
        this.timer = setTimeout(() => {
            this.add(n)
=======
    incrementAsync = (n = 1) => {
        this.timer = setTimeout(() => {
            this.increment(n)
>>>>>>> source
        }, 1000)
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        return (
            <div className='container d-flex justify-content-center pt-3'>
                <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body'>
                        <h5 className='card-title text-center'>{this.state.count}</h5>
                        <div className='mt-2 d-flex justify-content-center'>
<<<<<<< HEAD
                            <button type='button' className='btn btn-primary me-2' onClick={() => this.add()}>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2' onClick={() => this.addAsync()}>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success' onClick={() => this.add(3)}>
=======
                            <button type='button' className='btn btn-primary me-2' onClick={() => this.increment()}>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2' onClick={() => this.incrementAsync()}>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success' onClick={() => this.increment(3)}>
>>>>>>> source
                                +n
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
```

## Redux 版本

```bash
|-- src
|   |-- App.jsx
|   |-- components
|   |   `-- Count
|   |       `-- index.jsx
|   |-- index.js
|   `-- store
<<<<<<< HEAD
|       |-- count_reducer.js
=======
|       |-- countReducer.js
>>>>>>> source
|       `-- index.js
```

`App.jsx`

```jsx
import React, { Component } from 'react'
import Count from './components/Count'
export default class App extends Component {
    render() {
        return <Count />
    }
}
```

<<<<<<< HEAD
=======
`components/Count/index.jsx`

```jsx
import React, { Component } from 'react'
import store from '../../store'

export default class Count extends Component {
    state = {
        count: 0,
    }
    increment = (n = 1) => {
        store.dispatch({
            type: 'increment',
            payload: this.state.count + n,
        })
    }
    incrementAsync = (n = 1) => {
        this.timer = setTimeout(() => {
            this.increment(n)
        }, 1000)
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        return (
            <div className='container d-flex justify-content-center pt-3'>
                <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body'>
                        <h5 className='card-title text-center'>{store.getState()}</h5>
                        <div className='mt-2 d-flex justify-content-center'>
                            <button type='button' className='btn btn-primary me-2' onClick={() => this.increment()}>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2' onClick={() => this.incrementAsync()}>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success' onClick={() => this.increment(3)}>
                                +n
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        // 监测 redux 状态的变化，只要变化，就调用 render
        store.subscribe(() => {
            // this.render() // 自己调，但不会更新视图
            this.setState({})
        })
    }
}
```

>>>>>>> source
`store/index.js`

```js
import { createStore } from 'redux'
<<<<<<< HEAD
import countReducer from './count_reducer'
=======
import countReducer from './countReducer'
>>>>>>> source

// 根据 reducer 创建 store
export default createStore(countReducer)
```

<<<<<<< HEAD
`store/count_reducer.js`
=======
`store/constants.js`

```js
export const INCREMENT = 'increment'
```

`store/countReducer.js`
>>>>>>> source

```js
const initState = 0

export default function count(prevState = initState, action) {
    const { type, payload } = action
    switch (type) {
<<<<<<< HEAD
        case 'add':
=======
        case 'increment':
>>>>>>> source
            return prevState + payload
        default:
            return prevState
    }
}
```

<<<<<<< HEAD
=======
## 优化 `store.subscribe`

`src/index.js`

```js
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'

ReactDOM.render(<App />, document.getElementById('root'))

store.subscribe(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})
```

删除 `components/Count/index.jsx` `componentDidMount()` 中的内容

```jsx
import React, { Component } from 'react'
import store from '../../store'

export default class Count extends Component {
    componentDidMount() {
        // 监测 redux 状态的变化，只要变化，就调用 render
        store.subscribe(() => {
            // this.render() // 自己调，但不会更新视图
            this.setState({})
        })
    }
}
```

## 提取 countActionCreator 和 constants

`store/countActionCreator.js`

```js
import { INCREMENT } from './constants'
export const createIncrementAction = (payload) => ({
    type: INCREMENT,
    payload,
})
```

`store/constants.js`

```js
export const INCREMENT = 'increment'
```

>>>>>>> source
`components/Count/index.jsx`

```jsx
import React, { Component } from 'react'
import store from '../../store'
<<<<<<< HEAD
=======
import { createIncrementAction } from '../../store/countActionCreator'
>>>>>>> source

export default class Count extends Component {
    state = {
        count: 0,
    }
<<<<<<< HEAD
    add = (n = 1) => {
        store.dispatch({
            type: 'add',
            payload: this.state.count + n,
        })
    }
    addAsync = (n = 1) => {
        this.timer = setTimeout(() => {
            this.add(n)
=======
    increment = (n = 1) => {
        store.dispatch(createIncrementAction(this.state.count + n))
    }
    incrementAsync = (n = 1) => {
        this.timer = setTimeout(() => {
            this.increment(n)
>>>>>>> source
        }, 1000)
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        return (
<<<<<<< HEAD
=======
            <div className='container pt-3 d-flex justify-content-center'>
                <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body'>
                        <h5 className='text-center card-title'>{store.getState()}</h5>
                        <div className='mt-2 d-flex justify-content-center'>
                            <button type='button' className='btn btn-primary me-2' onClick={() => this.increment()}>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2' onClick={() => this.incrementAsync()}>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success' onClick={() => this.increment(3)}>
                                +n
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
```

## redux-thunk

`store/index.js`

```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import countReducer from './countReducer'

// 根据 reducer 创建 store
export default createStore(countReducer, applyMiddleware(thunk))
```

`store/countActionCreator.js`

```js
import { INCREMENT } from './constants'
export const createIncrementAction = (payload) => ({
    type: INCREMENT,
    payload,
})
export const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data * 1))
        }, time)
    }
}
```

`components/Count/index.jsx`

```jsx
import React, { Component } from 'react'
import store from '../../store'
import { createIncrementAction, createIncrementAsyncAction } from '../../store/countActionCreator'

export default class Count extends Component {
    state = {
        count: 0,
    }
    increment = (n = 1) => {
        store.dispatch(createIncrementAction(this.state.count + n))
    }
    incrementAsync = (n = 1) => {
        store.dispatch(createIncrementAsyncAction(n, 1000))
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        return (
>>>>>>> source
            <div className='container d-flex justify-content-center pt-3'>
                <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body'>
                        <h5 className='card-title text-center'>{store.getState()}</h5>
                        <div className='mt-2 d-flex justify-content-center'>
<<<<<<< HEAD
                            <button type='button' className='btn btn-primary me-2' onClick={() => this.add()}>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2' onClick={() => this.addAsync()}>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success' onClick={() => this.add(3)}>
=======
                            <button type='button' className='btn btn-primary me-2' onClick={() => this.increment()}>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2' onClick={() => this.incrementAsync()}>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success' onClick={() => this.increment(3)}>
>>>>>>> source
                                +n
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
<<<<<<< HEAD
    componentDidMount() {
        // 监测 redux 状态的变化，只要变化，就调用 render
        store.subscribe(() => {
            // this.render() // 自己调，但不会更新视图
            this.setState({})
        })
=======
}
```

## react-redux

`App.jsx`

```jsx
import React, { Component } from 'react'
import Count from './containers/Count'
import store from './store'
export default class App extends Component {
    render() {
        return <Count store={store} />
    }
}
```

`src/containers/Count/index.jsx`

```jsx
import { connect } from 'react-redux'
import CountUI from '../../components/Count'
import { createIncrementAction, createIncrementAsyncAction } from '../../store/countActionCreator'

const mapStateToProps = (state) => ({
    count: state,
})

const mapDispatchToProps = (dispatch) => ({
    increment: (data) => dispatch(createIncrementAction(data)),
    incrementAsync: (data, time) => dispatch(createIncrementAsyncAction(data, time)),
})

// 容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
```

`src/components/Count/index.jsx`

全部通过 props 去获取数据和修改数据的方法

```jsx
import React, { Component } from 'react'

export default class Count extends Component {
    state = {
        count: 0,
    }
    increment = (n = 1) => {
        this.props.increment(this.state.count + n)
    }
    incrementAsync = (n = 1) => {
        this.props.incrementAsync(n, 1000)
    }
    render() {
        return (
            <div className='container pt-3 d-flex justify-content-center'>
                <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body'>
                        <h5 className='text-center card-title'>{this.props.count}</h5>
                        <div className='mt-2 d-flex justify-content-center'>
                            <button type='button' className='btn btn-primary me-2' onClick={() => this.increment()}>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2' onClick={() => this.incrementAsync()}>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success' onClick={() => this.increment(3)}>
                                +n
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
```

## 简化 mapDispatchToProps

`containers/Count/index.jsx`

```jsx
import { connect } from 'react-redux'
import CountUI from '../../components/Count'
import { createIncrementAction, createIncrementAsyncAction } from '../../store/countActionCreator'

// 容器组件
export default connect(
    (state) => ({
        count: state,
    }),
    {
        increment: createIncrementAction,
        incrementAsync: createIncrementAsyncAction,
    }
)(CountUI)
```

## Provider

`App.jsx`

```jsx
import React, { Component } from 'react'
import Count from './containers/Count'
export default class App extends Component {
    render() {
        return <Count />
>>>>>>> source
    }
}
```

<<<<<<< HEAD
优化 `store.subscribe`，`src/index.js`

```js
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'

ReactDOM.render(<App />, document.getElementById('root'))

store.subscribe(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})
```
=======
`index.js`

```js
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```

## 整合容器组件与 UI 组件

`containers/Count/index.jsx`

```jsx
import { connect } from 'react-redux'
import { createIncrementAction, createIncrementAsyncAction } from '../../store/countActionCreator'

import React, { Component } from 'react'

class CountUI extends Component {
    increment = (n = 1) => {
        this.props.increment(n)
    }
    incrementAsync = (n = 1) => {
        this.props.incrementAsync(n, 1000)
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        return (
            <div className='container d-flex justify-content-center pt-3'>
                <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body'>
                        <h5 className='card-title text-center'>{this.props.count}</h5>
                        <div className='mt-2 d-flex justify-content-center'>
                            <button type='button' className='btn btn-primary me-2' onClick={() => this.increment()}>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2' onClick={() => this.incrementAsync()}>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success' onClick={() => this.increment(3)}>
                                +n
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// 容器组件
export default connect(
    (state) => ({
        count: state,
    }),
    {
        increment: createIncrementAction,
        incrementAsync: createIncrementAsyncAction,
    }
)(CountUI)
```

## 编写 Person 组件

<img src="/resource/images/ifer_person.png"/>

`containers/Person/index.jsx`

```jsx
import React, { Component } from 'react'

export default class Person extends Component {
    addPerson = () => {
        const name = this.nameNode.value
        const age = this.ageNode.value
        console.log(name, age)
    }
    render() {
        return (
            <div className='container d-flex justify-content-center'>
                <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body'>
                        <div className='input-group'>
                            <input ref={(dom) => (this.nameNode = dom)} type='text' aria-label='name' className='form-control' />
                            <input ref={(dom) => (this.ageNode = dom)} type='text' aria-label='age' className='form-control' />
                            <button onClick={this.addPerson} className='input-group-text btn btn-dark'>
                                添加
                            </button>
                        </div>
                        <ul className='mt-3 list-group'>
                            <li className='list-group-item'>An item</li>
                            <li className='list-group-item'>A second item</li>
                            <li className='list-group-item'>A third item</li>
                            <li className='list-group-item'>A fourth item</li>
                            <li className='list-group-item'>And a fifth one</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
```

`App.jsx`

```jsx
import React, { Component } from 'react'
import Count from './containers/Count'
import Person from './containers/Person'

export default class App extends Component {
    render() {
        return (
            <>
                <Count />
                <hr />
                <Person />
            </>
        )
    }
}
```

## 编写 Person 组件的 reducer

`store/reducers/person.js`

```js
import { ADDPERSON } from '../constants'

const initState = [
    {
        id: '001',
        name: 'tom',
        age: 18,
    },
]

export default function person(prevState = initState, action) {
    const { type, data } = action
    switch (type) {
        case ADDPERSON:
            return [data, ...prevState]
        default:
            return prevState
    }
}
```

把 `countReducer.js` 迁移到 `store/reducers/count.js`

```js
import { INCREMENT } from '../constant'
const initState = 0

export default function count(prevState = initState, action) {
    const { type, payload } = action
    switch (type) {
        case INCREMENT:
            return prevState + payload
        default:
            return prevState
    }
}
```

修改引入的路径：`store/index.js`

```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import countReducer from './reducers/count'

// 根据 reducer 创建 store
export default createStore(countReducer, applyMiddleware(thunk))
```

## combineReducers

`store/reducers/index.js`

```js
import { combineReducers } from 'redux'
import CountReducer from './count'
import PersonReducer from './person'

export default combineReducers({
    count: CountReducer,
    person: PersonReducer,
})
```

`store/index.js`

```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

// 根据 reducer 创建 store
export default createStore(reducers, applyMiddleware(thunk))
```

`containers/Count/index.jsx`

```jsx
// ...
// 容器组件
export default connect(
    (state) => ({
        count: state.count,
    }),
    {
        increment: createIncrementAction,
        incrementAsync: createIncrementAsyncAction,
    }
)(CountUI)
```

## 编写 Person 的 actionCreator

`store/actionCreator/person.js`

```js
import { ADDPERSON } from '../constants'

export const createAddPersonAction = (personObj) => ({
    type: ADDPERSON,
    data: personObj,
})
```

把 `countActionCreator.js` 迁移到 `store/actionCreator/count.js`，并修改 `container/Count/index.jsx` 中的引入路径。

## 添加用户与组件间通信

`containers/Person/index.jsx`

```jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import { createAddPersonAction } from '../../store/actionCreator/person'

class PersonUI extends Component {
    addPerson = () => {
        const personObj = {
            id: nanoid(),
            name: this.nameNode.value,
            age: this.ageNode.value,
        }
        this.props.addPerson(personObj)
        this.nameNode.value = ''
        this.ageNode.value = ''
    }
    render() {
        return (
            <div className='container d-flex justify-content-center'>
                <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body'>
                        <h3 className='text-center'>{this.props.count}</h3>
                        <div className='input-group'>
                            <input ref={(dom) => (this.nameNode = dom)} type='text' aria-label='name' className='form-control' />
                            <input ref={(dom) => (this.ageNode = dom)} type='text' aria-label='age' className='form-control' />
                            <button onClick={this.addPerson} className='input-group-text btn btn-dark'>
                                添加
                            </button>
                        </div>
                        <ul className='mt-3 list-group'>
                            {this.props.person.map((item) => (
                                <li className='list-group-item' key={item.id}>
                                    Name: {item.name} / Age: {item.age}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    (state) => ({
        person: state.person,
        count: state.count,
    }),
    {
        addPerson: createAddPersonAction,
    }
)(PersonUI)
```

## redux-devtools-extension

`store/index.js`

```jsx
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'

// 根据 reducer 创建 store
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
```
>>>>>>> source
