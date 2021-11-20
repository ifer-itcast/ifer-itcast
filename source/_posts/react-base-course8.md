---
title: 08_React Router
date: 2021-11-20 21:22:37
tags:
---

## 今日目标

✔ 了解什么是单页应用。

✔ 掌握 react-router-dom 的使用。

## 了解 SPA

[网易云音乐](https://music.163.com/)

-   SPA： `Single Page Application` 单页面应用程序，整个应用中只有一个页面（index.html）

-   MPA : `Multiple Page Application`多页面应用程序，整个应用中有很多个页面（\*.html）

优势

-   加快页面响应速度，降低了对服务器的压力

    a，传统的多页面应用程序，每次请求服务器返回的都是一整个完整的页面

    b，单页面应用程序只有第一次会加载完整的页面，以后每次请求仅仅获取必要的数据

-   更好的用户体验，运行更加流畅

缺点

-   不利于 SEO 搜索引擎优化，因为爬虫只爬取 HTML 页面中的文本内容，不会执行 JS 代码

-   可以通过 SSR（服务端渲染 Server Side Rendering）来解决 SEO 问题，即先在服务器端把内容渲染出来，然后，返回给浏览器的就是纯 HTML 内容了

<!-- more -->

## 前端路由

现代的前端应用大多都是 SPA（单页应用程序），也就是只有一个 HTML 页面的应用程序。因为它的用户体验更好、对服务器的压力更小，所以更受欢迎。为了**有效的使用单个页面来管理原来多页面的功能，前端路由应运而生**。前端路由的功能：让用户从一个视图（页面）导航到另一个视图（页面）

-   前端路由是一套**映射规则**，在 React 中，是 URL 路径 与组件的对应关系

-   使用 React 路由简单来说就是：配置路径和组件（配对）

<img src="/resource/images/ifer_router.png"/>

## 模拟 Hash 路由原理

`App.js`

```js
import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import Comment from './pages/Comment'

export default function App() {
    const [current, setCurrent] = useState('')
    useEffect(() => {
        const onChange = () => {
            setCurrent(window.location.hash.slice(1))
        }
        window.addEventListener('hashchange', onChange)
        return () => {
            window.removeEventListener('hashchange', onChange)
        }
    }, [])
    return (
        <div>
            <ul>
                <li>
                    <a href='#/home'>首页</a>
                </li>
                <li>
                    <a href='#/search'>搜索</a>
                </li>
                <li>
                    <a href='#/comment'>评论</a>
                </li>
            </ul>
            {current === '/home' && <Home />}
            {current === '/search' && <Search />}
            {current === '/comment' && <Comment />}
        </div>
    )
}
```

## React Router

官网：https://reactrouter.com/，https://v5.reactrouter.com/

1. 安装

```js
yarn add react-router-dom@5.3.0
```

2. `react-router-dom` 这个包提供了三个核心的组件

```js
import { HashRouter, Route, Link } from 'react-router-dom'
```

3. 使用 `HashRouter` 包裹整个应用，一个项目中只会有一个 Router

```js
<Router>
    <div className='App'>// … 省略页面内容</div>
</Router>
```

4. 使用 Link 指定导航链接

```js
<Link to="/first">页面一</Link>
<Link to="/two">页面二</Link>
```

5. 使用 `Route` 指定路由规则

```js
// 在哪里写的Route,最终匹配到的组件就会渲染到这
<Route path='/first' component={First}></Route>
```

```js
import React from 'react'
import { HashRouter, Link, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Comment from './pages/Comment'

export default function App() {
    return (
        <HashRouter>
            <div>
                <ul>
                    <li>
                        <Link to='/home'>首页</Link>
                    </li>
                    <li>
                        <Link to='/search'>搜索</Link>
                    </li>
                    <li>
                        <Link to='/comment'>评论</Link>
                    </li>
                </ul>
                <hr />
                <Route path='/home' component={Home} />
                <Route path='/search' component={Search} />
                <Route path='/comment' component={Comment} />
            </div>
        </HashRouter>
    )
}
```

## Router 详细说明

-   Router 组件：包裹整个应用，一个 React 应用只需要使用一次

-   两种常用 Router：`HashRouter` 和 `BrowserRouter`

-   HashRouter：使用 URL 的哈希值实现（http://localhost:3000/#/first），是通过监听 window 的 `hashchange` 事件来实现的

-   （推荐）BrowserRouter：使用 H5 的 history.pushState() API 实现（http://localhost:3000/first），是通过监听 window 的 `popstate` 事件来实现的

最佳实践

```js
import { HashRouter as Router, Route, Link } from 'react-router-dom'

<Router>
```

## 路由的执行过程

1. 点击 Link 组件（a 标签），修改了浏览器地址栏中的 url

2. React 路由监听到地址栏 url 的变化 hashChange popState

3. React 路由内部遍历所有 Route 组件，使用路由规则（path）与 pathname（hash）进行匹配

4. 当路由规则（path）能够匹配地址栏中的 pathname（hash） 时，就展示该 Route 组件的内容

## Link 与 NavLink

`Link`组件最终会渲染成 a 标签，用于指定路由导航

-   to 属性，将来会渲染成 a 标签的 href 属性
-   `Link`组件无法实现导航的高亮效果

`NavLink`组件，一个更特殊的`Link`组件，可以用用于指定当前导航高亮

-   to 属性，用于指定地址，会渲染成 a 标签的 href 属性
-   activeClass: 用于指定高亮的类名，默认`active`
-   exact: 精确匹配，表示必须精确匹配类名才生效，默认模糊

```js
// 地址栏必须是 / 才有类名，而不是以 / 开头，exact 控制的是样式
<NavLink exact to='/'>
    首页
</NavLink>
```

## Route

> 配置路由规则

```jsx
{/*
  如果path是 '/',能够匹配到任意的路径，，需要加上exact
*/}
<Route path="/" exact component={Home}></Route>
<Route path="/comment" component={Comment}></Route>
<Route path="/search" component={Search}></Route>
// 一定会渲染，例如 404 兜底
<Route component={Home}></Route>
```

-   path 的说明
    -   默认情况下，/能够匹配任意/开始的路径
    -   如果 path 的路径匹配上了，那么就可以对应的组件就会被 render
    -   如果 path 没有匹配上，那么会 render null
    -   如果没有指定 path，那么一定会被渲染
-   exact 的说明， exact 表示精确匹配某个路径
    -   一般来说，如果路径配置了 /， 都需要配置 exact 属性

## Switch 与 404

-   通常，我们会把`Route`包裹在一个`Switch`组件中

-   在`Switch`组件中，不管有多少个路由规则匹配到了，都只会渲染第一个匹配的组件
-   通过`Switch`组件非常容易的就能实现 404 错误页面的提示

```js
<Switch>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/user' component={User} />
    <Route component={NoMatch} />
</Switch>
```

## 嵌套路由的配置

-   在 React 中，配置嵌套路由非常的简单，因为`Route`就是一个组件，可以在任意想配置的地方进行配置

-   但是配置嵌套路由的时候，需要对路径进行处理，必须要先匹配到父级路由，才能匹配到子路由

```js
<Switch>
    <Route path='/find/top' component={Top}></Route>
    <Route path='/find/list' component={List}></Route>
</Switch>
```

`App.js`

```js
import React from 'react'
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import Find from './pages/Find'
import My from './pages/My'
import Friend from './pages/Friend'

export default function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <NavLink to='/find'>发现音乐</NavLink>
                    </li>
                    <li>
                        <NavLink to='/my'>我的音乐</NavLink>
                    </li>
                    <li>
                        <NavLink to='/friend'>朋友</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route path='/find' component={Find} />
                    <Route path='/my' component={My} />
                    <Route path='/friend' component={Friend} />
                </Switch>
            </div>
        </Router>
    )
}
```

`Find.js`

```js
import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import Top from './Top'
import List from './List'

export default function Find() {
    return (
        <div>
            <h3>发现音乐</h3>
            <ul>
                <li>
                    <NavLink to='/find/top'>排行榜</NavLink>
                </li>
                <li>
                    <NavLink to='/find/list'>歌单</NavLink>
                </li>
            </ul>
            <Switch>
                <Route path='/find/top' component={Top} />
                <Route path='/find/list' component={List} />
            </Switch>
        </div>
    )
}
```

## 编程式导航

-   第一种方式通过 props 拿到 history

-   场景：点击登录按钮，登录成功后，通过代码跳转到后台首页，如何实现？
-   编程式导航：通过 JS 代码来实现页面跳转
-   history 是 React 路由提供的，用于获取浏览器历史记录的相关信息
-   push(path)：跳转到某个页面，参数 path 表示要跳转的路径
-   go(n)： 前进或后退到某个页面，参数 n 表示前进或后退页面数量（比如：-1 表示后退到上一页）

```js
// 如果使用js代码的方式实现路由的跳转----》编程式导航
const history = useHistory()

history.push('地址')
history.go() 1 -1  前进和后退
history.replace('地址') 跳转，，会替换当前的记录，演示
```

## 动态路由与路由参数获取

-   可以使用`:id`的方式来配置动态的路由参数

```js
// 可以匹配 /users/1  /users/2  /users/xxx
<Route path='/users/:id' component={Users} />
```

-   在组件中，通过`props`可以接收到路由的参数

```js
render(){
    console.log(this.props.match.params)
}

建议直接使用 useParams()，useHistory()，useLocation()
```
