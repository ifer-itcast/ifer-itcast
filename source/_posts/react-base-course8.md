---
title: 08_React Router
date: 2021-11-20 21:22:37
tags:
---

## 今日目标

✔ 了解什么是单页应用。

✔ 掌握 react-router-dom 的使用。

<!-- more -->

## 了解 SPA

-   [网易云音乐](https://music.163.com/)。

-   SPA： `Single Page Application` 单页面应用程序，整个应用中只有一个页面（index.html）。

-   MPA : `Multiple Page Application` 多页面应用程序，整个应用中有很多个页面（\*.html）。

-   优势：页面响应速度快，体验好（无刷新），降低了对服务器的压力。

    a，传统的多页面应用程序，每次请求服务器返回的都是一整个完整的页面。

    b，单页面应用程序只有第一次会加载完整的页面，以后每次请求仅仅获取必要的数据。

-   缺点：不利于 SEO 搜索引擎优化。

    a，因为爬虫只爬取 HTML 页面中的文本内容，不会执行 JS 代码。

    b，可以通过 SSR（服务端渲染 Server Side Rendering）来解决 SEO 问题，即先在服务器端把内容渲染出来，返回给浏览器的就是纯 HTML 内容了。

## 前端路由

现代的前端应用大多都是 SPA，也就是只有一个 HTML 页面的应用程序，因为它的用户体验更好、对服务器的压力更小，所以更受欢迎。

为了有效的使用单个页面来管理原来多页面的功能，前端路由应运而生，功能：让用户从一个视图（页面）导航到另一个视图（页面）。

-   前端路由是一套<font color=e32d40>**映射规则**</font>，是 URL 路径 与组件之间的对应关系。

-   使用 React 路由简单来说就是：配置路径和组件（配对）。

<img src="/resource/images/ifer_router.png"/>

## 模拟 Hash 路由

需求：点击链接显示对应的组件。

<img src="/resource/images/ifer_hash.png"/>

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

[官网](https://reactrouter.com/)，[Releases](https://github.com/remix-run/react-router/releases)，[v5](https://v5.reactrouter.com/)

1. 安装。

```bash
yarn add react-router-dom@5.3.0
```

2. `react-router-dom` 这个包提供了三个核心的组件。

```js
import { HashRouter, Route, Link } from 'react-router-dom'
```

3. 使用 `HashRouter` 包裹整个应用，一个项目中只会有一个 Router。

```html
<HashRouter>
    <div className="App">App</div>
</HashRouter>
```

4. 使用 Link 指定导航链接。

```html
<Link to="/first">页面一</Link>
<Link to="/two">页面二</Link>
```

5. 使用 `Route` 指定路由规则。

```js
// 在哪里写的 Route，最终匹配到的组件就会渲染到哪里
<Route path='/first' component={First}></Route>
```

`App.js`，改造上面的案例。

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

-   常用有两种 Router：`HashRouter` 和 `BrowserRouter`，用来包裹整个应用，一个 React 应用只需要使用一次。

-   HashRouter：使用 URL 的哈希值实现（`http://localhost:3000/#/first`），是通过监听 window 的 `hashchange` 事件来实现的。

-   BrowserRouter：使用 H5 的 history API 实现（`http://localhost:3000/first`），是通过监听 window 的 `popstate` 事件来实现的。

```js
// 使用时建议通过 as 起一个别名，方便修改
import { HashRouter as Router, Route, Link } from 'react-router-dom'
```

## 路由的执行过程

1. 点击 Link 组件（a 标签），浏览器地址栏中的 url 发生变化。

2. React 路由监听到了地址栏 url 的变化，通过 `hashchange` 或 `popState` 事件。

3. React 路由内部遍历所有 Route 组件，使用路由规则（path）与 pathname（hash）进行匹配。

4. 当路由规则（path）能够匹配地址栏中的 pathname（hash）时，就展示该 Route 对应的组件。

## Link 与 NavLink

-   `Link` 组件最终会渲染成 a 标签，用于指定路由导航。

    a，to 属性，将来会渲染成 a 标签的 href 属性。

    b，`Link` 组件无法实现导航的高亮效果。

-   `NavLink` 组件，一个更特殊的 `Link` 组件，可以用于指定当前导航高亮。

    a，to：用于指定地址，会渲染成 a 标签的 href 属性。

    b，activeClass：用于指定高亮的类名，默认 `active`。

    c，exact：精确匹配，表示必须精确匹配类名才会应用 class，默认是模糊模糊匹配。

> 需求：访问 `/` 时展示首页内容，点击当前高亮。

`App.js`，`<Link></Link>` 改成了 `<NavLink></NavLink>` 组件，to 对应的值改成了 `/`，同时出口 Route 组件的 path 属性也改成了 `/`，代码如下。

```js
import React from 'react'
import { HashRouter, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Comment from './pages/Comment'

export default function App() {
    return (
        <HashRouter>
            <div>
                <ul>
                    <li>
                        <NavLink to='/'>首页</NavLink>
                    </li>
                    <li>
                        <NavLink to='/search'>搜索</NavLink>
                    </li>
                    <li>
                        <NavLink to='/comment'>评论</NavLink>
                    </li>
                </ul>
                <hr />
                <Route path='/' component={Home} />
                <Route path='/search' component={Search} />
                <Route path='/comment' component={Comment} />
            </div>
        </HashRouter>
    )
}
```

问题：点击搜索发现首页也应用了激活的 class 类名。

```jsx
// 以 / 开头的，就会被添加 class，当访问 /search 的时候，发现是以 / 开头的，所以这里也加了 class
<NavLink to='/'>首页</NavLink>
```

解决方法。

```jsx
// 必须是 / 才会被加 class
<NavLink exact to='/'>
    首页
</NavLink>
```

## Route 匹配规则

```jsx
{
    /* 默认是以  '/' 开头的路径就会被匹配到组件，添加 exact 属性可以开启精确匹配 */
}
;<Route path='/' exact component={Home}></Route>
```

-   默认情况下，path 为 `/` 能够匹配所有路由组件，因为所有路由组件都是以 `/` 开头的，一般来说，如果路径配置了 `/`，往往都需要配置 exact 属性。

-   如果 path 的路径匹配上了，那么对应的组件就会被 render，否则就会 render null。

-   如果没有指定 path，那么一定会被渲染，例如 `<Route component={NotFound}></Route>`。

## Switch 与 404

-   通常，会把一个个的 `Route` 包裹在一个 `Switch` 组件中，这样只会渲染第一个匹配的组件，往往是我们期望的。

-   通过 `Switch` 组件配合不带 path 属性的 Route 组件能实现 404 效果，即便不需要实现 404，也可以用 Switch 包裹来提升性能。

```js
<Switch>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/user' component={User} />
    <Route component={NotFound} />
</Switch>
```

## 嵌套路由的配置

配置嵌套路由的时候，必须要先匹配到父路由，才能匹配到子路由，需求：在发现音乐里面再展示排行榜和歌单。

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

-   编程式导航：通过 JS 代码来实现页面跳转，可以处理相关逻辑，更加灵活。

-   需求：在 Search 组件，点击按钮跳转到 Comment 组件。

-   第一种方式通过 props 拿到 history 进行跳转，`props.history.push('/comment')`。

-   第二种方式通过 react-router-dom 提供的 useHistory 勾子进行跳转。

```js
import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Search(props) {
    const history = useHistory()
    const handleClick = () => {
        history.push('/comment')
    }
    return (
        <div>
            <h3>Search</h3>
            <button onClick={handleClick}>click</button>
        </div>
    )
}
```

## 动态路由传参

1. 入口传参。

```jsx
<NavLink to='/user/111'>用户111</NavLink>
<NavLink to='/user/222'>用户222</NavLink>
```

2. 出口匹配。

```js
<Route path='/user/:id' component={User} />
```

3. 组件中接收。

```js
import React from 'react'
import { useParams } from 'react-router-dom'

export default function User(props) {
    const params = useParams()
    return (
        <div>
            <h2>User</h2>
            <p>props 获取参数: {props.match.params.id}</p>
            <p>useParams 获取参数: {params.id}</p>
        </div>
    )
}
```
