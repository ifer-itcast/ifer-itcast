---
title: React Router
date: 2021-10-26 15:43:25
tags:
---

a，明确好界面中的导航区、展示区。

b，导航区的 a 标签改为 Link 标签，`<Link to="/xxx">Demo</Link>`。

c，展示区写 Route 标签进行路径的匹配，`<Route path="/xxx" component={Demo}/>`。

d，App 组件的最外层包裹一个 `<BrowserRouter>` 或 `<HashRouter>`。

## 静态页面

`App.jsx`

```jsx
import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div className='container-fluid'>
                        <a className='navbar-brand' href='##'>
                            React Router
                        </a>
                        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item'>
                                    <a className='nav-link active' aria-current='page' href='##'>
                                        Home
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' aria-current='page' href='##'>
                                        About
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='card mt-3'>
                    <div className='card-body'>This is some text within a card body.</div>
                </div>
            </div>
        )
    }
}
```

## 基本使用

```jsx
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div className='container-fluid'>
                        <Link className='navbar-brand' to='/'>
                            React Router
                        </Link>
                        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item'>
                                    <Link className='nav-link active' to='/home'>
                                        Home
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/about'>
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <Route path='/home' component={Home} />
                        <Route path='/about' component={About} />
                    </div>
                </div>
            </div>
        )
    }
}
```

`index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import App from './App'

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.querySelector('#root')
)
```

## 组件分类

组件分类：普通组件和路由组件

a，写法不同

```bash
普通组件：`<Demo/>`，路由组件：`<Route path="/demo" component={Demo}/>`
```

b，存放文件夹不同

普通组件：components，路由组件：pages

c，接收到的 Props 不同

普通组件：写什么接收什么，路由组件：Props 中自带路由相关的信息

```bash
history:
  go: f go(n)
  goBack: f goForward()
  push: f push(path, state)
  replace: f replace(path, state)

location:
  pathname: '/about'
  search: ''
  state: undefined

match:
  isExact: true
  params: {}
  path: '/about'
  url: '/about'
```

## 点击高亮

把 Link 组件换成 NavLink 组件，激活时默认加上的是 active class，可以通过 activeClassName 属性进行指定。

```jsx
import React, { Component } from 'react'
import { Link, NavLink, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div className='container-fluid'>
                        <Link className='navbar-brand' to='/'>
                            React Router
                        </Link>
                        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/home'>
                                        Home
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/about'>
                                        About
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <Route path='/home' component={Home} />
                        <Route path='/about' component={About} />
                    </div>
                </div>
            </div>
        )
    }
}
```

## 二次封装 NavLink

目的：简化外部的写法

`App.jsx`

```jsx
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import MyNavLink from './components/MyNavLink'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div className='container-fluid'>
                        <Link className='navbar-brand' to='/'>
                            React Router
                        </Link>
                        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item'>
                                    <MyNavLink to='/home'>Home</MyNavLink>
                                </li>
                                <li className='nav-item'>
                                    <MyNavLink to='/about'>About</MyNavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <Route path='/home' component={Home} />
                        <Route path='/about' component={About} />
                    </div>
                </div>
            </div>
        )
    }
}
```

`components/MyNavLink.jsx`

```jsx
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink extends Component {
    render() {
        return <NavLink className='nav-link' {...this.props} />
    }
}
```

## Switch

a，通常情况下，path 和 component 应该是一一对应的关系

b，Switch 可以提高路由的匹配效率（进行单一匹配）

```jsx
import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import MyNavLink from './components/MyNavLink'

class Test extends Component {
    render() {
        return <div>Test~~~~~~~~</div>
    }
}

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div className='container-fluid'>
                        <Link className='navbar-brand' to='/'>
                            React Router
                        </Link>
                        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item'>
                                    <MyNavLink to='/home'>Home</MyNavLink>
                                </li>
                                <li className='nav-item'>
                                    <MyNavLink to='/about'>About</MyNavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/about' component={About} />
                            <Route path='/about' component={Test} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}
```

## 404 问题

1、`public/index.html`，去掉点（.）

```html
<link rel="stylesheet" href="/css/bootstrap.css" />
```

2、`%PUBLIC_URL%` 代表的就是 public 的绝对路径

```html
<link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css" />
```

3、使用 HashRouter

## 严格匹配

下面意思是：<font color=#e32d40>**匹配以`/home`开头的地址**</font>

```jsx
<Route path='/home' component={Home} />
```

精准匹配

```jsx
<Route path='/home' exact component={Home} />
```

## Redirect

```jsx
import React, { Component } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import MyNavLink from './components/MyNavLink'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div className='container-fluid'>
                        <Link className='navbar-brand' to='/'>
                            React Router
                        </Link>
                        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item'>
                                    <MyNavLink to='/home'>Home</MyNavLink>
                                </li>
                                <li className='nav-item'>
                                    <MyNavLink to='/about'>About</MyNavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/about' component={About} />
                            {/* 兜底 */}
                            <Redirect to='/about' />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}
```

## 嵌套路由

静态结构：`pages/Home.jsx`

```jsx
import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div className='d-flex'>
                <div className='card' style={{ width: '18rem' }}>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>An item</li>
                        <li className='list-group-item'>A second item</li>
                        <li className='list-group-item'>A third item</li>
                    </ul>
                </div>
                <div className='border p-3 flex-grow-1 ms-2'>xxx</div>
            </div>
        )
    }
}
```

代码实现：`pages/Home.jsx`

```jsx
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Vuecmp from '../components/VueCmp'
import ReactCmp from '../components/ReactCmp'
import Angular from '../components/AngularCmp'
import MyNavLink from '../components/MyNavLink'

export default class Home extends Component {
    render() {
        return (
            <div className='d-flex'>
                <div className='card' style={{ width: '18rem' }}>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <MyNavLink to='/home/vue'>Vue</MyNavLink>
                        </li>
                        <li className='list-group-item'>
                            <MyNavLink to='/home/react'>React</MyNavLink>
                        </li>
                        <li className='list-group-item'>
                            <MyNavLink to='/home/angular'>Angular</MyNavLink>
                        </li>
                    </ul>
                </div>
                <div className='border p-3 flex-grow-1 ms-2'>
                    <Switch>
                        <Route path='/home/vue' component={Vuecmp} />
                        <Route path='/home/react' component={ReactCmp} />
                        <Route path='/home/angular' component={Angular} />
                    </Switch>
                </div>
            </div>
        )
    }
}
```

## Params 路由传参

`components/ReactCmp.jsx`

```jsx
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MyNavLink from './MyNavLink'
import ReactDetail from './ReactDetail'

export default class ReactCmp extends Component {
    render() {
        return (
            <div>
                <ul className='nav'>
                    <li className='nav-item'>
                        <MyNavLink to='/home/react/redux'>Redux</MyNavLink>
                    </li>
                    <li className='nav-item'>
                        <MyNavLink to='/home/react/saga'>Saga</MyNavLink>
                    </li>
                    <li className='nav-item'>
                        <MyNavLink to='/home/react/mobx'>Mobx</MyNavLink>
                    </li>
                </ul>
                <div className='p-2'>
                    <Route path='/home/react/:container' component={ReactDetail} />
                </div>
            </div>
        )
    }
}
```

`components/ReactDetail.jsx`

```jsx
import React, { Component } from 'react'

export default class ReactDetail extends Component {
    render() {
        return <div className='container'>{this.props.match.params.container}~~~~~~~</div>
    }
}
```

## Query 路由传参

`components/ReactCmp.jsx`

```jsx
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MyNavLink from './MyNavLink'
import ReactDetail from './ReactDetail'

export default class ReactCmp extends Component {
    render() {
        return (
            <div>
                <ul className='nav'>
                    <li className='nav-item'>
                        <MyNavLink to='/home/react/?container=redux'>Redux</MyNavLink>
                    </li>
                    <li className='nav-item'>
                        <MyNavLink to='/home/react/?container=saga'>Saga</MyNavLink>
                    </li>
                    <li className='nav-item'>
                        <MyNavLink to='/home/react/?container=mobx'>Mobx</MyNavLink>
                    </li>
                </ul>
                <div className='p-2'>
                    <Route path='/home/react' component={ReactDetail} />
                </div>
            </div>
        )
    }
}
```

`components/ReactDetail.jsx`

```jsx
import React, { Component } from 'react'
import qs from 'qs'

export default class ReactDetail extends Component {
    render() {
        const { container } = qs.parse(this.props.location.search.slice(1))
        return <div className='container'>{container}~~~~~~~</div>
    }
}
```
