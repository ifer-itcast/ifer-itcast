---
title: Redux 版 ToDoList
date: 2020-02-09 18:03:38
tags:
---

## src/index.js

入口文件，用到了 react-redux 提供的 Provider，用于给所有组件提供数据！

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
```

## src/App.js

```javascript
// src/App.js
import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <Content />
                <Footer />
            </Fragment>
        );
    }
}

export default App;
```

## src/components/Header.js

一定要明确什么时候才需要 dispatch action，例如对于 input 框中文本的处理，每次 change 确实都需要同步 store，所以可以直接在当前组件中调用此 action，相当于 dispatch(actionCreator())，业务逻辑也可以都写在此 action 中。

对于回车时提交数据这一操作，只有回车的那一刻才需要改变数据 list，所以 dispatch action 的时机应该是在判断 keyCode 之后，也就意味着这部分逻辑代码应放在当前组件中，如果代码较多则可以考虑 UI 和 JS 分离。切勿每次 keyUp 都 dispatch action，然后在 actionCreator 中判断 keyCode，大错而特错！

actionCreator 中可以做业务逻辑的处理，但要保证 actionCreator 每次都返回一个带 type 的对象，除非用到 redux-thunk，然后在 actionCreator 的回调函数中做业务逻辑的处理，最后再进行 dispatch action。

最后建议：尽可能的把业务逻辑的处理都放到 actionCreator 中

```javascript
import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators';

const Header = props => {
    const { inputValue, inputChangeAction, inputKeyUpAction } = props;
    const handleKeyUp = e => {
        // 确实是 keyCode 等于 13 的时候才需要发起 action
        if (e.keyCode === 13) {
            if (!e.target.value) {
                return alert('内容不能为空');
            }
            inputKeyUpAction(e.target.value);
        }
    };
    return (
        <header>
            <section>
                <label htmlFor="title">ToDoList</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="添加ToDo"
                    required="required"
                    autoComplete="off"
                    value={inputValue}
                    onChange={inputChangeAction}
                    onKeyUp={handleKeyUp}
                />
            </section>
        </header>
    );
};

const mapStateToProps = state => ({
    inputValue: state.inputValue
});

export default connect(mapStateToProps, actionCreators)(Header);
```

## src/components/Content.js

```javascript
import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators';

const Content = props => {
    const { list, checkboxChangeAction, btnClickAction } = props;
    const renderItem = completed => {
        return list.filter(item => item.completed === completed).map(item =>
            <li key={item.id}>
                <input type="checkbox" checked={completed} onChange={checkboxChangeAction} data-id={item.id} />
                <p>
                    {item.title}
                </p>
                <i data-id={item.id} onClick={btnClickAction} />
            </li>
        );
    };
    return (
        <section>
            <h2>
                正在进行 <span id="todocount">{renderItem(false).length}</span>
            </h2>
            <ol id="todolist" className="demo-box">
                {renderItem(false)}
            </ol>
            <h2>
                已经完成 <span id="donecount">{renderItem(true).length}</span>
            </h2>
            <ul id="donelist">
                {renderItem(true)}
            </ul>
        </section>
    );
};
const mapStateToProps = state => ({
    list: state.list
});

export default connect(mapStateToProps, actionCreators)(Content);
```

## src/store/index.js

```javascript
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
```

## src/store/actionTypes.js

```javascript
export const CHANGE_INPUT = 'changeInput';
export const ADD_ITEM = 'addItem';
export const MODIFY_ITEM = 'modifyItem';
export const DELETE_ITEM = 'deleteItem';
```

## src/store/actionCreators.js

```javascript
import { CHANGE_INPUT, ADD_ITEM, MODIFY_ITEM,DELETE_ITEM } from './actionTypes';
export const inputChangeAction = e => ({
    type: CHANGE_INPUT,
    value: e.target.value
});

export const inputKeyUpAction = value => ({
    type: ADD_ITEM,
    title: value,
    completed: false,
    id: (+new Date()).toString()
});

export const checkboxChangeAction = e => ({
    type: MODIFY_ITEM,
    completed: e.target.checked,
    id: e.target.dataset.id
});

export const btnClickAction = e => ({
    type: DELETE_ITEM,
    id: e.target.dataset.id
});
```

## src/store/reducer.js

```javascript
import { CHANGE_INPUT, ADD_ITEM, MODIFY_ITEM, DELETE_ITEM } from './actionTypes';

const defaultState = {
    inputValue: '',
    list: []
};

const reducer = (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    const idx = newState.list.findIndex(item => item.id === action.id);
    switch (action.type) {
        case CHANGE_INPUT:
            newState.inputValue = action.value;
            return newState;
        case ADD_ITEM:
            newState.list.unshift({
                title: action.title,
                completed: action.completed,
                id: action.id
            });
            newState.inputValue = '';
            return newState;
        case MODIFY_ITEM:
            newState.list[idx].completed = action.completed;
            return newState;
        case DELETE_ITEM:
            newState.list.splice(idx, 1);
            return newState;
        default:
            return state;
    }
};
export default reducer;
```