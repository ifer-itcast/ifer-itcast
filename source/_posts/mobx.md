---
title: Mobx
date: 2020-08-17 23:55:11
tags: 
---

## 初体验 Mobx

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
    // 定义一个可被观测的对象
    // @observable fruits;
    // constructor() {
    //     this.fruits = ['apple']
    // }
    @observable fruits = ['apple', 'orange'];
}
const store = window.store = new FruitStore();
export default store;

autorun(() => {
    console.log(store.fruits); // Proxy {0: "apple", 1: "orange", Symbol(mobx administration): ObservableArrayAdministration}
    console.log(toJS(store.fruits)); // ["apple", "orange"]
    console.log(isObservableObject(store)); // 可被观测的对象
    console.log(isObservableArray(store.fruits)); // 可被观测的数组
});
```

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import FruitStore from './stores/FruitStore';
ReactDOM.render(<App FruitStore={FruitStore}/>, document.querySelector('#root'));
```

`src/App.jsx`

observer 是观测者，observable 是可被观测的

```javascript
import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class App extends Component {
    render() {
        return (
            <div>
                {this.props.FruitStore.fruits.join(",")}
            </div>
        );
    }
}

export default App;
```

控制台修改 `store.fruits = ['banana', 'watermelon']` 试试

## 如何修改数据

**不推荐在组件中直接对可观测的数据进行修改**

`src/App.jsx`

```javascript
import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class App extends Component {
    fruit = React.createRef();
    handleSubmit = e => {
        e.preventDefault();
        const fruit = this.fruit.current.value;
        this.props.FruitStore.fruits.unshift(fruit);
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

可以在入口文件 `src/index.js` 中通过 configure 配置项阻止这种不推荐的写法

```javascript
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
    @observable fruits = ['apple', 'orange'];
    @action addFruit = fruit => {
        this.fruits.unshift(fruit);
    };
}
const store = window.store = new FruitStore();
export default store;
```

**action.bound**

```javascript
import { observable, action } from 'mobx';
class Test {
    @observable num = 0
    @action.bound
    increment() {
        console.log(this.num); // When defining, we determined the direction of this, which is what we expected
        this.num++;
    }
}
const test = new Test();
setInterval(test.increment, 1000);
export default test;
```

## computed 获取计算数据

`src/stores/FruitStore.js`

```javascript
import { observable, action, computed } from 'mobx';
class FruitStore {
    @observable fruits = ['apple', 'orange'];
    @action addFruit = fruit => {
        this.fruits.unshift(fruit);
    };
    /* getFruits = () => {
        return this.fruits.join(',');
    }; */
    @computed get getFruits() {
        return this.fruits.join(',');
    }
    @computed get getCount() {
        return this.fruits.length;
    }
}
const store = window.store = new FruitStore();
export default store;
```

`src/App.jsx`

```javascript
<div>
    <p>数据：{this.props.FruitStore.getFruits}</p>
    <p>长度：{this.props.FruitStore.getCount}</p>
</div>
```

## 如何组织多个 store

`src/stores/index.js`

```javascript
import FruitStore from './FruitStore';
import FriendStore from './FriendStore';

/* class Store {
    constructor() {
        this.FruitStore = FruitStore;
        this.FriendStore = FriendStore;
    }
}
export default new Store(); */

export default {
    FruitStore,
    FriendStore
};
```

`src/stores/FruitStore.js`

```javascript
import { observable, action, computed } from 'mobx';
class FruitStore {
    @observable fruits = ['apple', 'orange'];
    @action addFruit = fruit => {
        this.fruits.unshift(fruit);
    };
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

`src/stores/FriendStore.js`

```javascript
import { observable, action, computed } from 'mobx';
class FriendStore {
    @observable friends = ['ifer', 'elser'];
    @action addFriend = friend => {
        this.friends.unshift(friend);
    };
    @computed get getFriends() {
        return this.friends.join(',');
    }
    @computed get getCount() {
        return this.friends.length;
    }
}
const store = new FriendStore();
export default store;
```

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import stores from './stores';
import { configure } from 'mobx';
configure({ enforceActions: 'observed' });
ReactDOM.render(<App {...stores}/>, document.querySelector('#root'));
```

## Provider 和 inject

`src/components/Fruit.jsx`

```javascript
import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject('FruitStore')
@observer
class Fruit extends Component {
    fruit = React.createRef();
    handleSubmit = e => {
        e.preventDefault();
        const fruit = this.fruit.current.value;
        this.props.FruitStore.addFruit(fruit);
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="fruit" ref={this.fruit} />
                    <button>添加</button>
                </form>
                <div>
                    <p>
                        数据：{this.props.FruitStore.getFruits}
                    </p>
                    <p>
                        长度：{this.props.FruitStore.getCount}
                    </p>
                </div>
            </div>
        );
    }
}

export default Fruit;
```

上面导出的另一种写法

```javascript
export default inject('FruitStore')(observer(Fruit));
```

`src/App.jsx`

```javascript
import React, { Component } from 'react';
import Fruit from './components/Fruit';

class App extends Component {
    render() {
        return (
            <div>
                <Fruit/>
            </div>
        );
    }
}

export default App;
```

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import stores from './stores';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
configure({ enforceActions: 'observed' });

ReactDOM.render(<Provider {...stores}>
    <App/>
</Provider>, document.querySelector('#root'));
```

## 如何发起异步请求

`src/App.jsx`

```javascript
import React, { Component } from 'react';
import Joke from './components/Joke';

class App extends Component {
    render() {
        return (
            <div>
                <Joke/>
            </div>
        );
    }
}

export default App;
```

`src/components/Joke.jsx`

```javascript
import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("JokeStore")
@observer
class Joke extends Component {
    renderJokes = () => {
        return this.props.JokeStore.jokes.map((item, index) =>
            <li key={index}>
                {item}
            </li>
        );
    };
    render() {
        return (
            <div>
                <button onClick={this.props.JokeStore.fetchJokes}>
                    Get a joke
                </button>
                <ul>
                    {this.renderJokes()}
                </ul>
            </div>
        );
    }
}

export default Joke;
```

`src/stores/index.js`

```javascript
import FruitStore from './FruitStore';
import FriendStore from './FriendStore';
import JokeStore from './JokeStore';

export default {
    FruitStore,
    FriendStore,
    JokeStore
};
```

`src/stores/JokeStore.js`

```javascript
import { observable, action, runInAction } from 'mobx';

class JokeStore {
    @observable jokes = [];
    fetchJokes = () => {
        fetch('https://autumnfish.cn/api/joke/list?num=3').then(res => res.json()).then(data => {
            /* runInAction(() => {
                this.jokes = data.jokes;
            }); */
            this.saveJokes(data.jokes);
        });
    };

    // Modifying the observed data needs to be decorated with action
    @action
    saveJokes = data => {
        this.jokes = data;
    }
}

export default new JokeStore();
```

**async/await**

```javascript
import { observable, runInAction } from 'mobx';
class JokeStore {
    @observable jokes = [];
    fetchJokes = async () => {
        const response = await fetch('https://autumnfish.cn/api/joke/list?num=3');
        const json = await response.json();
        runInAction(() => {
            this.jokes = json.jokes;
        });
    };
}

export default new JokeStore();
```

**Generator**

```html
<button onClick={() => this.props.JokeStore.fetchJokes()}>Get a joke</button>
```

```javascript
import { observable, flow } from 'mobx';
class JokeStore {
    @observable jokes = [];
    fetchJokes = flow(function* () {
        const response = yield fetch("https://autumnfish.cn/api/joke/list?num=3")
        const json = yield response.json();
        this.jokes = json.jokes;
    });
}
export default new JokeStore();
```

## loading 和 error 处理

`src/components/Joke.jsx`

```javascript
import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("JokeStore")
@observer
class Joke extends Component {
    renderJokes = () => {
        const jokes = this.props.JokeStore.jokes;
        if (!jokes.length) return null;
        return (
            <ul>
                {jokes.map((item, index) =>
                    <li key={index}>
                        {item}
                    </li>
                )}
            </ul>
        );
    };
    render() {
        const JokeStore = this.props.JokeStore;

        let data = null;
        if (JokeStore.error) {
            data = (<div>{JokeStore.error}</div>);
        } else if (JokeStore.loading) {
            data = <div>loading...</div>;
        } else {
            data = this.renderJokes();
        }
        return (
            <div>
                <button onClick={() => JokeStore.fetchJokes()}>
                    Get a joke
                </button>
                {data}
            </div>
        );
    }
}

export default Joke;
```

`src/stores/JokeStore.js`

```javascript
import {
    observable,
    flow
} from 'mobx';
class JokeStore {
    @observable jokes = [];
    @observable loading = false; // #1
    @observable error = null;

    fetchJokes = flow(function* () {
        this.loading = true; // #2
        this.error = null;
        try {
            const response = yield fetch("https://autumnfish.cn/api/joke/list?num=3")
            const json = yield response.json();
            this.jokes = json.jokes;
        } catch (error) {
            this.error = error.message;
        }
        this.loading = false; // #3
    });
}
export default new JokeStore();
```

## TodoList

```
yarn add mobx-react-lite shortid
```

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

`src/App.jsx`

```javascript
import React, { Component } from 'react';
import TodoList from './components/TodoList';

class App extends Component {
    render() {
        return (
            <div>
                <TodoList/>
            </div>
        );
    }
}

export default App;
```

`src/index.js`

```javascript
import 'mobx-react-lite/batchingForReactDom'
```

`src/components/Todo.jsx`

```javascript
import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";

const Todo = observer(({ item }) => {
    return (
        <li className="list-group-item">
            {item.todo}
            <input
                className="float-right mt-2"
                type="checkbox"
                checked={item.completed}
                onChange={action(() => (item.completed = !item.completed))}
            />
        </li>
    );
});

export default Todo;
```

`src/components/TodoList.jsx`

```javascript
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import Todo from "./Todo";

@inject("TodoListStore")
@observer
class TodoList extends Component {
    // #1
    @observable todo = "";
    // #2
    // Modify observation data
    @action
    handleChagne = e => {
        this.todo = e.target.value;
    };

    @action
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.props.TodoListStore.addTodo(this.todo);
            this.todo = "";
        }
    };

    render() {
        const { todos, getUnCompletedCount } = this.props.TodoListStore;
        return (
            <div className="container">
                <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="todo"
                    value={this.todo}
                    onChange={this.handleChagne}
                    onKeyUp={this.handleKeyUp}
                />
                <ul className="list-group mt-3">
                    {todos.map(item => <Todo key={item.id} item={item} />)}
                </ul>
                <div>
                    <span className="badge badge-primary">
                        {getUnCompletedCount}
                    </span>
                </div>
            </div>
        );
    }
}
export default TodoList;
```

上面 #1、#2 处的代码可以改写如下

```javascript
constructor(props) {
    super(props);
    extendObservable(this, {
        todo: "",
        handleChagne: action(e => {
            this.todo = e.target.value;
        }),
    });
}
```

`src/stores/index.js`

```javascript
import TodoListStore from './TodoListStore';
export default { TodoListStore };
```

`src/stores/TodoListStore.js`

```javascript
import { observable, action, computed } from 'mobx';
import shortid from 'shortid';

class Todo {
    id = shortid.generate();
    @observable todo;
    @observable completed = false;
    constructor(todo) {
        this.todo = todo;
    }
}

class TodoListStore {
    @observable todos = [new Todo('吃饭')];
    @action addTodo = todo => {
        this.todos.unshift(new Todo(todo));
    };
    @computed get getUnCompletedCount() {
        return this.todos.filter(item => !item.completed).length;
    }
}
const store = new TodoListStore();
export default store;
```

其实上面 `TodoList.jsx` 中可观测数据以及相关操作都可以提取到 `TodoListStore.js` 中比较好，可改写代码如下：

`src/components/TodoList.jsx`

```javascript
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Todo from "./Todo";

@inject("TodoListStore")
@observer
class TodoList extends Component {
    render() {
        const {
            todos,
            getUnCompletedCount,
            todo,
            handleChange,
            handleKeyUp,
        } = this.props.TodoListStore;
        return (
            <div className="container">
                <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="todo"
                    value={todo}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <ul className="list-group mt-3">
                    {todos.map(item => <Todo key={item.id} item={item} />)}
                </ul>
                <div>
                    <span className="badge badge-primary">
                        {getUnCompletedCount}
                    </span>
                </div>
            </div>
        );
    }
}
export default TodoList;
```

`src/stores/TodoListStore.js`

```javascript
import {
    observable,
    action,
    computed
} from 'mobx';
import shortid from 'shortid';

class Todo {
    id = shortid.generate();
    @observable todo;
    @observable completed = false;
    constructor(todo) {
        this.todo = todo;
    }
}
class TodoListStore {
    @observable todos = [new Todo('吃饭')];
    @observable todo = "";

    @action handleChange = e => {
        this.todo = e.target.value;
    }
    @action handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.todos.unshift(new Todo(this.todo));
            this.todo = "";
        }
    }
    @action addTodo = todo => {
        this.todos.unshift(new Todo(todo));
    };
    @computed get getUnCompletedCount() {
        return this.todos.filter(item => !item.completed).length;
    }
}
const store = new TodoListStore();
export default store;
```