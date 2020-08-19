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
import {
    observable,
    action
} from 'mobx';

class JokeStore {
    @observable jokes = [];
    fetchJokes = () => {
        fetch('https://autumnfish.cn/api/joke/list?num=3').then(res => res.json()).then(data => {
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

## 发送异步请求的几种写法

`src/stores/TopicStore.js`

```javascript
import {
    observable,
    action,
    runInAction,
    flow
} from 'mobx';
class TopicStore {
    @observable topics = [];

    loadTopics = () => {
        fetch("https://cnodejs.org/api/v1/topics")
            .then(response => response.json())
            .then(({
                data
            }) => {
                this.saveTopics(data);
            })
    }

    loadTopicsInline = () => {
        fetch("https://cnodejs.org/api/v1/topics")
            .then(response => response.json())
            .then(({
                data
            }) => {
                runInAction(() => {
                    this.topics = data;
                })
            })
    }

    loadTopicsAsync = async () => {
        const response = await fetch("https://cnodejs.org/api/v1/topics");
        const json = await response.json();
        runInAction(() => {
            this.topics = json.data;
        })
    }

    // 这种外面调用的时候要这样
    // <button onClick={() => this.props.TopicStore.loadTopicsGenerator()}>Get Topic4</button>
    loadTopicsGenerator = flow(function* () {
        const response = yield fetch("https://cnodejs.org/api/v1/topics")
        const json = yield response.json();
        // console.log(this, 2333) // TopicStore
        this.topics = json.data;
    })

    @action
    saveTopics(data) {
        // 修改被观测数据要用 action 修饰
        this.topics = data;
    }
}

export default new TopicStore();
```

## loading 处理

`src/pages/Topic.jsx`

```javascript
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("TopicStore")
@observer
class Topic extends Component {
    componentDidMount() {
        this.props.TopicStore.loadTopics();
    }
    render() {
        const store = this.props.TopicStore;
        let data;
        if (store.loading) {
            data = "loading...";
        } else {
            data = store.topics[0] && store.topics[0].title;
        }
        return (
            <div>
                {data}
                <button onClick={this.props.TopicStore.loadTopics}>
                    Get Topic1
                </button>
            </div>
        );
    }
}

export default Topic;
```

`src/stores/TopicStore.js`

```javascript
import {
    observable,
    action,
    runInAction,
    flow
} from 'mobx';
class TopicStore {
    @observable topics = [];
    @observable loading = true;

    loadTopics = () => {
        runInAction(() => {
            this.loading = true;
        });

        fetch("https://cnodejs.org/api/v1/topics")
            .then(response => response.json())
            .then(({
                data
            }) => {
                this.saveTopics(data);
            })
    }

    loadTopicsInline = () => {
        fetch("https://cnodejs.org/api/v1/topics")
            .then(response => response.json())
            .then(({
                data
            }) => {
                runInAction(() => {
                    this.topics = data;
                })
            })
    }

    loadTopicsAsync = async () => {
        const response = await fetch("https://cnodejs.org/api/v1/topics");
        const json = await response.json();
        runInAction(() => {
            this.topics = json.data;
        })
    }

    loadTopicsGenerator = flow(function* () {
        const response = yield fetch("https://cnodejs.org/api/v1/topics")
        const json = yield response.json();
        // console.log(this, 2333) // TopicStore
        this.topics = json.data;
    })

    @action
    saveTopics(data) {
        // 修改被观测数据要用 action 修饰
        this.topics = data;
        this.loading = false;
    }
}

export default new TopicStore();
```

## 错误处理

`src/pages/Topic.jsx`

```javascript
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("TopicStore")
@observer
class Topic extends Component {
    componentDidMount() {
        this.props.TopicStore.loadTopics();
    }
    render() {
        const store = this.props.TopicStore;
        let data;
        if(store.error) {
            data = store.error;
        } else if (store.loading) {
            data = "loading...";
        } else {
            data = store.topics[0] && store.topics[0].title;
        }
        return (
            <div>
                {data}
                <button onClick={this.props.TopicStore.loadTopics}>
                    Get Topic1
                </button>
            </div>
        );
    }
}

export default Topic;
```

`src/stores/TopicStore.js`

```javascript
import {
    observable,
    action,
    runInAction,
    flow
} from 'mobx';
class TopicStore {
    @observable topics = [];
    @observable loading = true;
    @observable error;

    loadTopics = () => {
        runInAction(() => {
            this.loading = true;
            this.error = null; // mark
        });

        fetch("https://cnodejxs.org/api/v1/topics")
            .then(response => response.json())
            .then(({
                data
            }) => {
                this.saveTopics(data);
            }).catch(error => {
                // console.log(error.message, 333);
                runInAction(() => {
                    this.error = error.message;
                });
            });
    }

    loadTopicsInline = () => {
        fetch("https://cnodejs.org/api/v1/topics")
            .then(response => response.json())
            .then(({
                data
            }) => {
                runInAction(() => {
                    this.topics = data;
                })
            })
    }

    loadTopicsAsync = async () => {
        try {
            const response = await fetch("https://cnodejs.org/api/v1/topics");
            const json = await response.json();
            runInAction(() => {
                this.topics = json.data;
            })
        } catch(e) {
            
        }
    }

    loadTopicsGenerator = flow(function* () {
        const response = yield fetch("https://cnodejs.org/api/v1/topics")
        const json = yield response.json();
        // console.log(this, 2333) // TopicStore
        this.topics = json.data;
    })

    @action
    saveTopics(data) {
        // 修改被观测数据要用 action 修饰
        this.topics = data;
        this.loading = false;
    }
}

export default new TopicStore();
```

## action.bound

```javascript
class Ticker {
    @observable tick = 0
    @action.bound
    increment() {
        console.log(1);
        this.tick++; // 定义的时候就绑定 this，this 永远是对的
    }
}

const ticker = window.ticker = new Ticker();
setInterval(ticker.increment, 1000);
```

## reaction

```javascript
class AuthStore {
  constructor(){
    reaction(
      () => this.userAuth,
      userAuth => this.getUserData(userAuth.id)
    )
  }

  @observable userAuth//Here we can use cookies (= but...
  @observable userData
  @observable error

  @action
  tryLogin = async (email, password) => {
    const body = {
      email, password
    }
    const resp = await fetcher.post('/api/auth/', body)
    const json = await resp.json()

    if(json.error){
      this.error = json.message
    } else {
      this.userAuth = json.data
    }
  }

  @action
  getUserData = async (id) => {
    const resp = await fetcher.get(`/api/users/${id}`)
    const json = await resp.json()

    if(json.error){
      this.error = json.message
    } else {
      this.userData = json.data
    }
  }

  @computed get token(){
    return this.userAuth?.token || false
  }

  @computed get user(){
    return toJS(this.userData)
  }

  @computed get ownerId(){
    return this.userAuth?.id?.toString()
  }
}

export const authStore = new AuthStore()
```

## 项目实战

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.bootcdn.net/ajax/libs/font-awesome/4.6.0/css/font-awesome.min.css" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

`src/App.css`

```javascript
.App {
  text-align: center;
}

.formSection {
  margin-top: 30px;
}

.formSection p {
  font-weight: bold;
  font-size: 20px;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
```

`src/App.jsx`

```javascript
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Test from './pages/test';
import TodoList from './pages/TodoList';
import Topic from './pages/Topic';
import ReviewApp from './pages/ReviewApp'
import "./App.css";
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
            <div className="container">
                {/* <Test/> */}
                {/* <TodoList/> */}
                {/* <Topic/> */}
                {/* <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="fruit" ref={this.fruit} />
                    <button>添加</button>
                </form>
                <div>
                    {this.FruitStore.getFruits}
                </div> */}
                <ReviewApp/>
            </div>
        );
    }
}

export default inject('FruitStore')(observer(App));
```

`src/pages/Dashboard.jsx`

```javascript
import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Dashboard;
```

`src/pages/Form.jsx`

```javascript
import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <div className="formSection">
        <div className="form-group">
          <p>Submit a Review</p>
        </div>
        <form>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <input type="text" placeholder="Write a review" className="form-control" />
              </div>
            </div>

            <div className="col-md-4">
              <div className="from-group">
                <select id="start" name="stars" className="form-control">
                  <option value="1">1 Star</option>
                  <option value="2">2 Star</option>
                  <option value="3">3 Star</option>
                  <option value="4">4 Star</option>
                  <option value="5">5 Star</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <button className="btn btn-success" type="submit">SUBMIT REVIEW</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
```

`src/pages/ReviewApp.jsx`

```javascript
import React, { Component } from 'react';
import Form from './Form';
import Dashboard from './Dashboard';
import Reviews from './Reviews';

class ReviewApp extends Component {
  render() {
    return (
      <div>
        <Form />
        <Dashboard />
        <Reviews />
      </div>
    );
  }
}

export default ReviewApp;
```

`src/pages/Reviews.jsx`

```javascript
import React, { Component } from 'react';

class Reviews extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Reviews;
```

https://github.com/hfpp2012/hello-mobx