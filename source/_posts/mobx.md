---
title: Mobx
date: 2020-08-17 23:55:11
tags: 
---

## 体验 Mobx

```
npx create-react-app mobx
yarn add mobx mobx-react
```

**支持装饰器**

```
yarn run eject
```

```javascript
{
    "name": "mobx",
    "babel": {
        "presets": [
            "react-app"
        ],
        "plugins": [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }]
        ]
    }
}
```

`src/stores/FruitStore.js`

```javascript
import { observable, autorun, toJS, isObservableObject, isObservableArray } from 'mobx';

class FruitStore {
    @observable fruits = [];
}
const store = window.store = new FruitStore();

export default store;

autorun(() => {
    console.log(store.fruits, 233);
    console.log(toJS(store.fruits), 234);
    console.log(isObservableObject(store), 235); // 可被观测的对象
    console.log(isObservableArray(store.fruits), 236); // 可被观测的数组
});
```

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import './stores/FruitStore';

ReactDOM.render(<div>hello</div>, document.querySelector('#root'));
```

## 实现 Store 和 View 同步

observer 是观测者，observable 是可被观测的

`src/App.jsx`

```javascript
import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class App extends Component {
    render() {
        return (
            <div>
                {this.props.FruitStore.fruits.join(',')}
            </div>
        )
    }
}

export default App;
```

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import FruitStore from './stores/FruitStore';
ReactDOM.render(<App FruitStore={FruitStore}/>, document.querySelector('#root'));
```

`src/stores/FruitStore.js`

```javascript
import { observable } from 'mobx';
class FruitStore {
    @observable fruits = ['apple', 'orange'];
}
const store = window.store = new FruitStore();
export default store;
```

控制台修改 store.fruits = ['banana', 'watermelon'] 试试

## action 修改数据

**不推荐写法**

`src/App.jsx`

```javascript
import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class App extends Component {
    fruit = React.createRef();
    handleSubmit = e => {
        const fruit = this.fruit.current.value;
        this.props.FruitStore.fruits.unshift(fruit);
        e.preventDefault();
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="fruit" ref={this.fruit} />
                    <button>添加</button>
                </form>
                <div>
                    {this.props.FruitStore.fruits.join(",")}
                </div>
            </div>
        );
    }
}

export default App;
```

`src/index.js`

```javascript
// 可以强制使用 action，这样的话上面的写法就不能使用了
import { configure } from 'mobx';
configure({ enforceActions: 'observed' });
```

**优化，通过 action 来改变数据**

`src/App.jsx`

```javascript
import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class App extends Component {
    fruit = React.createRef();
    handleSubmit = e => {
        const fruit = this.fruit.current.value;
        this.props.FruitStore.addFruit(fruit);
        e.preventDefault();
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="fruit" ref={this.fruit} />
                    <button>添加</button>
                </form>
                <div>
                    {this.props.FruitStore.fruits.join(",")}
                </div>
            </div>
        );
    }
}

export default App;
```

`src/stores/FruitStore.js`

```javascript
import { observable, action } from 'mobx';
class FruitStore {
    // @observable fruits;
    // constructor() {
    //     this.fruits = ['apple']
    // }
    @observable fruits = ['apple'];
    @action addFruit = fruit => {
        this.fruits.unshift(fruit);
    };
}
const store = new FruitStore();
export default store;
```

## computed 获取数据

`src/App.jsx`

```javascript
{this.props.FruitStore.getFruits}{this.FruitStore.store.getCount}
```

`src/stores/FruitStore.js`

```javascript
import { observable, action, computed } from 'mobx';
class FruitStore {
    @observable fruits = ['apple'];
    @action addFruit = fruit => {
        this.fruits.unshift(fruit);
    };
    // getFruits = () => {
    //     return this.fruits.join(',');
    // };
    @computed get getFruits() {
        return this.fruits.join(',');
    }
    @computed get getCount() {
        return this.fruits.length;
    }
}
const store = new FruitStore();
export default store;
```

## 如何组织多个 store

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import stores from './stores';

ReactDOM.render(<App {...stores}/>, document.querySelector('#root'));
```

`src/stores/index.js`

```javascript
import FruitStore from './FruitStore';
import TodoListStore from './TodoListStore';

// 两种导出方式都 ok
/* class Store {
    constructor() {
        this.FruitStore = FruitStore;
        this.TodoListStore = TodoListStore;
    }
}
export default new Store(); */

export default {
    FruitStore,
    TodoListStore
};
```

`src/stores/TodoListStore.js`

```javascript
import { observable, computed, action } from 'mobx';

class TodoStore {
    id = Math.random();
    @observable title;
    @observable finished = false;
    constructor(title) {
        this.title = title;
    }
}

class TotoListStore {
    @observable todos = [];
    @computed get unfinishedCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
    @action addTodo(title) {
        this.todos.push(new TodoStore(title));
    }
}

export default new TotoListStore();
```

## Mobx 的 render 机制

## Provider 和 inject

`src/App.jsx`

```javascript
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Test from './pages/test';

@inject('FruitStore')
@observer
class App extends Component {
    fruit = React.createRef();
    get FruitStore() {
        return this.props.FruitStore;
    }
    handleSubmit = e => {
        const fruit = this.fruit.current.value;
        this.FruitStore.addFruit(fruit);
        e.preventDefault();
    };
    render() {
        return (
            <div>
                <Test/>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="fruit" ref={this.fruit} />
                    <button>添加</button>
                </form>
                <div>
                    {this.FruitStore.getFruits}
                </div>
            </div>
        );
    }
}

export default App;
```

```javascript
// 上面导出的另一种写法
export default inject('FruitStore')(observer(App));
```

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';

import stores from './stores';

ReactDOM.render(<Provider {...stores}>
    <App/>
</Provider>, document.querySelector('#root'));
```

`src/pages/test.jsx`

```javascript
import React from "react";
import { observer ,inject } from 'mobx-react';

const Test = inject(['TodoListStore'])(observer((props) => {
    return <div>{props.TodoListStore.getTodos}</div>;
}));

export default Test;
```

`src/stores/TodoListStore.js`

```javascript
import { observable, computed, action } from 'mobx';

class TodoStore {
    id = Math.random();
    @observable title;
    @observable finished = false;
    constructor(title) {
        this.title = title;
    }
}

class TotoListStore {
    @observable todos = ['umi'];
    @computed get getTodos() {
        return this.todos.join(',');
    }
    @computed get unfinishedCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
    @action addTodo(title) {
        this.todos.push(new TodoStore(title));
    }
}

// 为了测试
const store = window.store = new TotoListStore();
export default store;
```

## TodoList

`src/App.jsx`

```javascript
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Test from './pages/test';
import TodoList from './pages/TodoList';
class App extends Component {
    fruit = React.createRef();
    get FruitStore() {
        return this.props.FruitStore;
    }
    handleSubmit = e => {
        const fruit = this.fruit.current.value;
        this.FruitStore.addFruit(fruit);
        e.preventDefault();
    };
    render() {
        return (
            <div>
                {/* <Test/> */}
                <TodoList/>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="fruit" ref={this.fruit} />
                    <button>添加</button>
                </form>
                <div>
                    {this.FruitStore.getFruits}
                </div>
            </div>
        );
    }
}

export default inject('FruitStore')(observer(App));
```

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import stores from './stores';
import { configure } from 'mobx';
import 'mobx-react-lite/batchingForReactDom'
configure({ enforceActions: 'observed' });

ReactDOM.render(<Provider {...stores}>
    <App/>
</Provider>, document.querySelector('#root'));
```

`src/pages/Todo.jsx`

```javascript
import React from "react";
import { action } from 'mobx';
import { observer } from 'mobx-react';

const Todo = observer(({ todo }) => {
    return (
        <li>
            <input type="checkbox" checked={todo.finished} onChange={action(() => todo.finished = !todo.finished)} />
            {todo.title}
        </li>
    );
});

export default Todo;
```

`src/pages/TodoList.jsx`

```javascript
import React, { Component } from "react";
import { extendObservable, action, observable  } from "mobx";
import { observer, inject } from "mobx-react";
import Todo from './Todo';

@inject('TodoListStore')
@observer
class TodoList extends Component {
    /* constructor(props) {
        super(props);
        extendObservable(this, {
            newTodoTitle: "",
            // 严格模式下这些方法都要用 action 包起来
            handleChange: action(e => {
                this.newTodoTitle = e.target.value;
            }),
        });
    } */
    // 可观测的数据尽量还是添加到 store 中
    @observable newTodoTitle = "";
    @action
    handleChange = e => {
        this.newTodoTitle = e.target.value;
    }

    @action
    handleSubmit = e => {
        e.preventDefault();
        this.props.TodoListStore.addTodo(this.newTodoTitle);
        this.newTodoTitle = '';
    }
    render() {
        return (
            <div onSubmit={this.handleSubmit}>
                <form>
                    <input
                        type="text"
                        value={this.newTodoTitle}
                        onChange={this.handleChange}
                    />
                    <button>添加</button>
                </form>
                <ul>
                    {
                        this.props.TodoListStore.todos.map(todo => <Todo key={todo.id} todo={todo}/>)
                    }
                </ul>
                <div>Tasks left: {this.props.TodoListStore.unfinishedCount}</div>
            </div>
        );
    }
}
export default TodoList;
```

