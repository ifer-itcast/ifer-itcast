---
title: redux-course
date: 2020-02-13 11:05:27
tags:
---

## createStore

```
├── App.js // 根组件
├── index.js // 入口文件
├── pages // 所有的页面都在这里
|  └── moneyCounter
|     ├── index.js
|     └── store // moneyCounter 组件的 store
|        ├── actionCreators.js
|        ├── actionTypes.js
|        ├── index.js
|        └── reducer.js
└── store // 总 store
   └── index.js
```

创建 reducer

src/pages/moneyCounter/store/reducer.js

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

src/pages/moneyCounter/index.js

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

上面点击按钮，store 中的数据确实可以更新，但是界面却没有任何变化。每次 store.dispatch 会触发 store.subscribe 订阅的函数。

src/pages/moneyCounter/index.js

```javascript
import React, { Component } from 'react';

import store from '../../store';
import { add } from './store/actionCreators';

class MoneyCounter extends Component {
	state = store.getState();
	handleClick = () => {
		store.dispatch(add());
	};
	componentDidMount() {
		store.subscribe(() => {
			this.setState(store.getState());
		});
	}
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

## bindActionCreators

使用 bindActionCreators 可以简化代码。

src/pages/moneyCounter/index.js

```javascript
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import store from '../../store';
import * as actionCreators from './store/actionCreators';
const { add, sub } = bindActionCreators(actionCreators, store.dispatch);

class MoneyCounter extends Component {
	state = store.getState();
	componentDidMount() {
		store.subscribe(() => {
			this.setState(store.getState());
		});
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

实际项目中会有很多很多的组件，我们不可能把所有数据的处理都放到一个 reducer 里，通常我们会把不同组件或者不同类别的数据处理放到不同的（对应的）reducer 里，以方便更加清晰的管理。

Redux 中有个 combineReducers 方法，它接收一组 reducer ，并返回合并后的 reducer。

src/store/reducers.js

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

src/store/index.js

```javascript
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
```

注意这里获取数据的时候，应该和 combineReducers 中的 key 对应起来

src/pages/moneyCounter/index.js

```javascript
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import store from '../../store';
import * as actionCreators from './store/actionCreators';
const { add, sub } = bindActionCreators(actionCreators, store.dispatch);

class MoneyCounter extends Component {
	state = store.getState().moneyCouter;
	componentDidMount() {
		store.subscribe(() => {
			this.setState(store.getState().moneyCouter);
		});
	}
	render() {
		const { moneyNum } = this.state;
		console.log(store.getState());
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

src/pages/moneyCounter/store/actionTypes.js

```javascript
export const MONEYCOUNTER_ADD = 'moneyCounterAdd';
export const MONEYCOUNTER_SUB = 'moneyCounterSub';
```

## redux-thunk

src/store/index.js

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

src/pages/moneyCounter/store/actionCreators.js

```javascript
export const addAsync = () => {
	return dispatch => {
		setTimeout(() => {
			dispatch(add());
		}, 1000);
	};
};
```