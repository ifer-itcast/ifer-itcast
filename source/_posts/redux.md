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
    add = (n = 1) => {
        this.setState({
            count: this.state.count + n,
        })
    }
    addAsync = (n = 1) => {
        this.timer = setTimeout(() => {
            this.add(n)
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
                            <button type='button' className='btn btn-primary me-2' onClick={() => this.add()}>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2' onClick={() => this.addAsync()}>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success' onClick={() => this.add(3)}>
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
|       |-- count_reducer.js
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

`store/index.js`

```js
import { createStore } from 'redux'
import countReducer from './count_reducer'

// 根据 reducer 创建 store
export default createStore(countReducer)
```

`store/count_reducer.js`

```js
const initState = 0

export default function count(prevState = initState, action) {
    const { type, payload } = action
    switch (type) {
        case 'add':
            return prevState + payload
        default:
            return prevState
    }
}
```

`components/Count/index.jsx`

```jsx
import React, { Component } from 'react'
import store from '../../store'

export default class Count extends Component {
    state = {
        count: 0,
    }
    add = (n = 1) => {
        store.dispatch({
            type: 'add',
            payload: this.state.count + n,
        })
    }
    addAsync = (n = 1) => {
        this.timer = setTimeout(() => {
            this.add(n)
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
                            <button type='button' className='btn btn-primary me-2' onClick={() => this.add()}>
                                +1
                            </button>
                            <button type='button' className='btn btn-dark me-2' onClick={() => this.addAsync()}>
                                Async +1
                            </button>
                            <button type='button' className='btn btn-success' onClick={() => this.add(3)}>
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
