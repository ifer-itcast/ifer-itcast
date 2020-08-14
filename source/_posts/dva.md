---
title: DvaJS
date: 2020-08-12 19:56:50
tags: DvaJS
categories: React
---

[快速上手](https://dvajs.com/guide/getting-started.html)，[快速入门](https://dvajs.com/guide/introduce-class.html)，[案例代码](https://github.com/ifer-itcast/dva)

<!-- more -->

## 案例初探

**安装 dva**

```javascript
// 安装 dva-cli
npm install dva-cli -g
dva -v
```

**创建项目**

```javascript
// 创建项目
dva new dva-quickstart
cd dva-quickstart
npm start
```

**一个警告**

<font size=2 color=#ccc>index.js:2177 Warning: Please use require("history").createHashHistory instead of require("history/createHashHistory"). Support for the latter will be removed in the next major release.</font>

<p style="margin-top: 20px;">其实不用管，纠结的话可以修改`node_moduels/dva/lib/index.js`</p>

~~var _createHashHistory = _interopRequireDefault(require("history/createHashHistory"));~~

```javascript
var _createHashHistory = _interopRequireDefault(require("history").createHashHistory);
```

**使用 AntD**

```javascript
npm install antd babel-plugin-import
```

```javascript
// 编辑 .webpackrc，使 babel-plugin-import 插件生效
{
    "extraBabelPlugins": [
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    ]
}
```

**定义 Products 组件**

`src/routes/Products.jsx`

```javascript
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Popconfirm, Button } from "antd";

class Products extends Component {
    columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Actions",
            render: (text, record) => {
                return (
                    <Popconfirm
                        title="Delete?"
                        onConfirm={() => {}}
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                );
            },
        },
    ];
    render() {
        return <Table dataSource={this.props.products} columns={this.columns} />;
    }
}

Products.propTypes = {
    products: PropTypes.array.isRequired,
};

export default Products;
```

**配置路由**

`src/router.js`

```javascript
import React from "react";
import { Router, Route, Switch } from "dva/router";
import Products from "./routes/Products";

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/products" exact component={Products} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;
```

**定义 Model**

`src/models/products.js`

```javascript
export default {
    namespace: 'products',
    state: [
        { key: 1, name: '手机', id: 1 },
        { key: 2, name: '电脑', id: 2 },
    ],
    reducers: {
        'delete'(state, { payload: id }) {
            return state.filter(item => item.id !== id);
        }
    }
}
```

别忘了在 `src/index.js` 中载入 model

```javascript
app.model(require('./models/products').default);
```

**connect**

`src/routes/Products.jsx`

```javascript
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Popconfirm, Button } from "antd";
import { connect } from "dva";

class Products extends Component {
    columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Actions",
            render: (text, record) => {
                return (
                    <Popconfirm
                        title="Delete?"
                        onConfirm={() => this.handleDelete(record.id)}
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                );
            },
        },
    ];
    // 注意这里加了删除的功能
    handleDelete = id => {
        this.props.dispatch({
            type: "products/delete",
            payload: id,
        });
    };
    render() {
        return (
            <Table dataSource={this.props.products} columns={this.columns} />
        );
    }
}

Products.propTypes = {
    products: PropTypes.array.isRequired,
};

// const mapStateToProps = state => ({ products: state.products });
export default connect(({ products }) => ({ products }))(Products);
```

**使用 BrowserHistory**

`src/index.js`

```javascript
import { createBrowserHistory as createHistory } from 'history';
const app = dva({ history: createHistory() });
```

## 路由跳转

**标签导航**

```javascript
import { Link } from 'dva/router';
<Link to="/">Home</Link>
```

**编程式导航**

```javascript
// 如果不是直接挂在到 Route 下面的组件，需要用到高阶组件 withRouter
<Button type="primary" onClick={() => this.props.history.push('/')}>Home</Button>
```

```javascript
import { routerRedux } from 'dva/router';
<Button type="primary" onClick={() => this.props.dispatch(routerRedux.push('/'))}>Home</Button>
```

## 数据模拟

`/mock/products.js`

```javascript
const products = [
    { key: 1, name: '手机', id: 1 },
    { key: 2, name: '电脑', id: 2 }
];

// 以函数的形式进行，可以做一些更加灵活的处理（也可以直接写一个对象）
module.exports = {
    "GET /api/products": (req, res) => {
        res.send(products);
    },
}
```

`/mock/users.js`

```javascript
module.exports = {
    "GET /api/users": [
        { name: 'ifer' },
        { name: 'elser' },
    ]
}
```

`/.roadhogrc.mock.js`

```javascript
export default {
    ...require("./mock/products"),
    ...require("./mock/users")
};
```

```javascript
// 优化
import fs from "fs";
import path from "path";

const mock = {};
fs.readdirSync(path.join(__dirname, "/mock")).forEach(file => {
    if (file.match(/\.js$/)) {
        Object.assign(mock, require("./mock/" + file));
    }
});
export default mock;
```

`/src/services/products.js`

```javascript
import request from "../utils/request";

export const getProducts = () => request("/api/products");
```

`/src/services/users.js`

```javascript
import request from "../utils/request";

export const getUsers = () => request("/api/users");
```

`/src/services/index.js`

```javascript
export * as users from './users';
export * as products from './products';
```

`/src/routes/Products.jsx`

```javascript
import { users, products } from '../services';
class Products extends Component {
    componentDidMount() {
        users.getUsers().then(console.log);
        products.getProducts().then(console.log);
    }
}
```

## 数据交互

实现数据的获取、删除

**获取数据**

`src/models/products.js`

```javascript
import { products } from '../services';

export default {
    namespace: 'products',
    state: [],
    reducers: {
        'init'(state, { payload }) {
            return [...payload];
        }
    },
    effects: {
        *getProducts(action,{ call, put }) {
            const { data } = yield call(products.getProducts);
            yield put({ type: 'init', payload: data } );
        }
    }
}
```

`src/routes/Products.jsx`

```javascript
class Products extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'products/getProducts' });
    }
}
```

**删除数据**

`src/routes/Products.jsx`

```javascript
handleDelete = id => {
    this.props.dispatch({
        type: "products/deleteProduct",
        payload: id,
    });
};
```

`src/models/products.js`

```javascript
import { products } from '../services';

export default {
    namespace: 'products',
    state: [],
    reducers: {
        'init'(state, { payload }) {
            return [...payload];
        }
    },
    effects: {
        *deleteProduct({ payload }, { call, put }) {
            const { data } = yield call(products.deleteProduct, payload);
            yield put({ type: 'init', payload: data } );
        }
    }
}
```

`src/services/products.js`

```javascript
export const deleteProduct = id => request(`/api/deleteProduct?id=${id}`);
```

`mock/products.js`

```javascript
// 以函数的形式进行，可以做一些更加灵活的处理（也可以直接写一个对象）
module.exports = {
    "GET /api/deleteProduct": (req, res) => {
        const idx = products.findIndex(item => item.id === req.query.id);
        products.splice(idx, 1);
        res.send(products);
    },
}
```

## 优化引入 models

`src/models/index.js`

```javascript
const context = require.context('./', false, /\.js$/);

export default context.keys().filter(item => item !== './index.js').map(key => context(key));
```

`src/index.js`

```javascript
require('./models').default.forEach(key => app.model(key.default));
```

## redux-actions

```javascript
yarn add redux-actions
```

`src/actions/index.js`

```javascript
import { createAction } from 'redux-actions';

export const getProducts = createAction('products/getProducts');
export const deleteProduct = createAction('products/deleteProduct');
```

`src/routes/Products.jsx`

```javascript
import { deleteProduct, getProducts } from '../actions';
class Products extends Component {
    handleDelete = id => {
        // this.props.dispatch({
        //     type: "products/deleteProduct",
        //     payload: id,
        // });
        this.props.dispatch(deleteProduct(id));
    };
    componentDidMount() {
        // this.props.dispatch({ type: 'products/getProducts' });
        this.props.dispatch(getProducts());
    }
}
```
<!-- ## subscriptions

`src/models/products.js`

```javascript
export default {
    subscriptions: {
        // 第一次上来时就会触发此函数
        ifer({dispatch, history}) {
            window.onresize = function() {
                console.log('window reseize');
            };

            history.listen(location => {
                console.log(location);
            });
        }
    }
}
```

## request 函数封装

```javascript
import fetch from "dva/fetch";
import qs from "querystring";

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function handleHeaders(options) {
    const headers = (options.headers = options.headers ? options.headers : {});
    const defaultHeaders = {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    options.headers = Object.assign({}, defaultHeaders, headers);

    if (options.method === "post") {
        var body = options.body ? options.body : {};
        body = qs.stringify(body);
        options.body = body;
    }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
    if (!options.method) {
        url += `?${qs.stringify(options.params)}`;
    }
    handleHeaders(options);

    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => ({
            data,
        }))
        .catch(err => ({
            err,
        }));
}
``` -->