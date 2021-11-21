---
title: 10_极客园（界面访问控制）
date: 2021-11-21 15:10:49
tags:
---

## 今日目标

✔ 掌握界面访问控制。

<!-- more -->

## 搭建布局组件结构

<img src="/resource/images/ifer_geek.png"/>

-   准备基本结构

```jsx
import React from 'react'
import { Layout, Menu } from 'antd'
import styles from './index.module.scss'
const { Header, Sider, Content } = Layout

// 记得修改自己的组件名，和 AntD 的 Layout 冲突了
export default function MyLayout() {
    return (
        <div className={styles.root}>
            <Layout>
                <Header className='header'>
                    <div className='logo' />
                </Header>
                <Layout>
                    <Sider width={200} className='site-layout-background'>
                        <Menu mode='inline' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
                            <Menu.Item key='1'>option1</Menu.Item>
                            <Menu.Item key='2'>option2</Menu.Item>
                            <Menu.Item key='3'>option3</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className='site-layout-background'
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
```

## 头部结构与样式

-   头部结构

```jsx
import React from 'react'
import { Layout, Menu } from 'antd'
import styles from './index.module.scss'
import { LogoutOutlined } from '@ant-design/icons'
const { Header, Sider, Content } = Layout

// 记得修改自己的组件名，和 AntD 的 Layout 冲突了
export default function MyLayout() {
    return (
        <div className={styles.root}>
            <Layout>
                <Header className='header'>
                    <div className='logo' />
                    <div className='profile'>
                        <span>黑马先锋</span>
                        <span>
                            <LogoutOutlined></LogoutOutlined>
                            {'  '}退出
                        </span>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className='site-layout-background'>
                        <Menu mode='inline' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
                            <Menu.Item key='1'>option1</Menu.Item>
                            <Menu.Item key='2'>option2</Menu.Item>
                            <Menu.Item key='3'>option3</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className='site-layout-background'
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
```

-   头部样式

```scss
.root {
    // :global 内部的样式全部没有被修改，同时又被限制在了 root 下（root 是随机生成的唯一的）
    :global {
        .ant-layout-header {
            padding: 0;
        }
        // 头部
        .header {
            // 左侧
            .logo {
                float: left;
                width: 200px;
                height: 60px;
                margin: 2px 0px;
                // background: rgba(255, 255, 255, 0.3);
                background: url(~@/assets/logo.png) no-repeat 0 0;
                background-size: 200px 60px;
            }
            // 右侧
            .profile {
                position: absolute;
                right: 20px;
                color: #fff;
                font-weight: 700;
                span {
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
        }
    }
}
```

## 左侧菜单样式与结构

-   导入图标

```jsx
import { HomeOutlined, HddOutlined, EditOutlined } from '@ant-design/icons'
```

-   修改菜单的结构

```jsx
<Menu mode='inline' theme='dark' defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
    <Menu.Item icon={<HomeOutlined />} key='1'>
        数据概览
    </Menu.Item>
    <Menu.Item icon={<HddOutlined />} key='2'>
        内容管理
    </Menu.Item>
    <Menu.Item icon={<EditOutlined />} key='3'>
        发布文章
    </Menu.Item>
</Menu>
```

-   修改菜单的样式

```scss
.root {
    // #1
    height: 100%;
    :global {
        .ant-layout-header {
            padding: 0;
        }
        // 头部
        .header {
            // 左侧
            .logo {
                float: left;
                width: 200px;
                height: 60px;
                margin: 2px 0px;
                // background: rgba(255, 255, 255, 0.3);
                background: url(~@/assets/logo.png) no-repeat 0 0;
                background-size: 200px 60px;
            }
            // 右侧
            .profile {
                position: absolute;
                right: 20px;
                color: #fff;
                font-weight: 700;
                span {
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
        }
        // #2
        .ant-layout {
            height: 100%;
        }
        // #3
        .site-layout-background {
            background-color: #fff;
        }
    }
}
```

-   `App.js`

```js
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import NotFound from '@/pages/NotFound'

export default function App() {
    return (
        <Router>
            <div className='app'>
                <Switch>
                    {/* from 默认模糊匹配，表示以 '/' 开头就匹配 */}
                    <Redirect exact from='/' to='/home' />
                    <Route path='/login' component={Login}></Route>
                    <Route path='/home' component={Layout}></Route>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    )
}
```

-   index.scss

```scss
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
#root,
.app {
    height: 100%;
}
```

## 嵌套路由配置

### 目标

能够在右侧内容区域展示左侧菜单对应的页面内容。

### 步骤

1. 在 pages 目录中，分别创建：`Home`（数据概览）/`Article`（内容管理）/`Publish`（发布文章）页面文件夹。

2. 分别在三个文件夹中创建 index.js 并创建基础组件后导出。

3. 在 Layout 页面组件中，配置子路由。

4. 使用 Link 修改左侧菜单内容，与子路由规则匹配实现路由切换。

### 代码

`pages/Home/index.js`

```js
const Home = () => {
    return <div>Home</div>
}
export default Home
```

`pages/Layout/index.js`

```js
import React from 'react'
import styles from './index.module.scss'
import { Layout, Menu } from 'antd'
import { LogoutOutlined, HomeOutlined, HddOutlined, EditOutlined } from '@ant-design/icons'
import { Switch, Route, Link } from 'react-router-dom'
import Home from '../Home'
import Article from '../Article'
import Publish from '../Publish'
const { Header, Sider } = Layout

// 记得修改自己的组件名，和 AntD 的 Layout 冲突了
export default function MyLayout() {
    return (
        <div className={styles.root}>
            <Layout>
                <Header className='header'>
                    <div className='logo' />
                    <div className='profile'>
                        <span>黑马先锋</span>
                        <span>
                            <LogoutOutlined></LogoutOutlined>
                            {'  '}退出
                        </span>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className='site-layout-background'>
                        <Menu mode='inline' theme='dark' defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
                            {/* #1 入口 */}
                            <Menu.Item icon={<HomeOutlined />} key='1'>
                                <Link to='/home'>数据概览</Link>
                            </Menu.Item>
                            <Menu.Item icon={<HddOutlined />} key='2'>
                                <Link to='/home/article'>内容管理</Link>
                            </Menu.Item>
                            <Menu.Item icon={<EditOutlined />} key='3'>
                                <Link to='/home/publish'>发布文章</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px', backgroundColor: '#fff' }}>
                        {/* #2 出口 */}
                        <Switch>
                            <Route exact path='/home' component={Home} />
                            <Route path='/home/article' component={Article} />
                            <Route path='/home/publish' component={Publish} />
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
```

注意：由于嵌套路由展示的内容是放在某个父级路由中的，所以，要展示嵌套路由的前提就是先展示父级路由内容，因此，嵌套路由的路径是基于父级路由路径的。比如，当前项目功能中，`/home/article` 就是在父级路由 `/home` 的基础上，添加了 `/article`

## 菜单高亮

### 目标

能够在刷新页面时保持对应菜单高亮。

### 步骤

-   思路：将当前访问页面的路由地址作为 Menu 选中项的值（selectedKeys）即可。

1. 将 Menu 的 key 属性修改为与其对应的路由地址。

2. 获取到当前正在访问页面的路由地址。

3. 将当前路由地址设置为 selectedKeys 属性的值。

注意：不要是 defaultSelectedKeys，此属性只会在第一次进入的时候生效（为什么点击侧边栏的时候没有问题呢？因为侧边栏自带点击高亮的效果），可以从 Publish 组件中跳转到首页时发现这个问题。

### 代码

`pages/Layout/index.js`

```js
import React from 'react'
import styles from './index.module.scss'
import { Layout, Menu } from 'antd'
import { LogoutOutlined, HomeOutlined, HddOutlined, EditOutlined } from '@ant-design/icons'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import Home from '../Home'
import Article from '../Article'
import Publish from '../Publish'
const { Header, Sider } = Layout

export default function MyLayout() {
    // #1
    const location = useLocation()
    return (
        <div className={styles.root}>
            <Layout>
                <Header className='header'>
                    <div className='logo' />
                    <div className='profile'>
                        <span>黑马先锋</span>
                        <span>
                            <LogoutOutlined></LogoutOutlined>
                            {'  '}退出
                        </span>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className='site-layout-background'>
                        {/* #2 */}
                        <Menu mode='inline' theme='dark' selectedKeys={[location.pathname]} style={{ height: '100%', borderRight: 0 }}>
                            <Menu.Item icon={<HomeOutlined />} key='/home'>
                                <Link to='/home'>数据概览</Link>
                            </Menu.Item>
                            <Menu.Item icon={<HddOutlined />} key='/home/article'>
                                <Link to='/home/article'>内容管理</Link>
                            </Menu.Item>
                            <Menu.Item icon={<EditOutlined />} key='/home/publish'>
                                <Link to='/home/publish'>发布文章</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px', backgroundColor: '#fff' }}>
                        <Switch>
                            <Route exact path='/home' component={Home} />
                            <Route path='/home/article' component={Article} />
                            <Route path='/home/publish' component={Publish} />
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
```

### 总结

1. 通过哪个属性指定 Menu 组件的选中项？

2. 如何做到切换页面时对应菜单高亮？

## 展示个人信息

### 目标

能够在布局页面右上角展示登录用户名。

### 步骤

1. 在 Layout 组件中 dispatch 获取个人信息的异步 action。

2. 在 actions/user.js 中，创建异步 action 并获取个人信息。

3. 将接口返回的个人信息 dispatch 到 reducer 来存储该状态。

4. 在 reducers/user.js 中，处理个人信息的 action，将状态存储到 Redux 中。

5. 在 Layout 组件中获取个人信息并展示。

### 代码

1. `store/constants/index.js` 文件中创建 actionType。

```jsx
export const LOGIN = 'LOGIN'
export const GET_USER_INFO = 'GET_USER_INFO'
```

2. `store/actions/user.js` 文件中创建获取用户信息的异步 action 和 actionCreator。

```jsx
import request from '@/utils/request'
import { GET_USER_INFO, LOGIN } from '../constants'
import { setToken } from '@/utils'

export const loginAc = (payload) => ({
    type: LOGIN,
    payload,
})

export const login = (payload) => {
    return async (dispatch) => {
        const res = await request({
            method: 'post',
            url: '/authorizations',
            data: payload,
        })
        const token = res.data.data.token
        setToken(token)
        dispatch(loginAc(token))
    }
}

export const getUserInfoAc = (payload) => ({
    type: GET_USER_INFO,
    payload,
})

export const getUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(getUserInfoAc(res.data.data))
    }
}
```

3. 在 `store/reducers/user.js` 文件中创建 user 的 reducer。

```jsx
import { GET_USER_INFO } from '../constants'

export default function user(state = {}, action) {
    switch (action.type) {
        case GET_USER_INFO:
            return action.payload
        default:
            return state
    }
}
```

4. 在 `store/reducers/index.js` 文件中融合 user 模块。

```jsx
import { combineReducers } from 'redux'

import login from './login'
import user from './user'

const rootReducer = combineReducers({
    login,
    user,
})

export default rootReducer
```

5. 在 `pages/Layout/index.js` 组件中发送请求。

```jsx
import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { Layout, Menu } from 'antd'
import { LogoutOutlined, HomeOutlined, HddOutlined, EditOutlined } from '@ant-design/icons'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from '../Home'
import Article from '../Article'
import Publish from '../Publish'
import { getUserInfo } from '@/store/actions/login'
const { Header, Sider } = Layout

export default function MyLayout() {
    const location = useLocation()
    const dispatch = useDispatch()
    // 拿到用户信息并渲染
    const user = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])
    return (
        <div className={styles.root}>
            <Layout>
                <Header className='header'>
                    <div className='logo' />
                    <div className='profile'>
                        <span>{user.name}</span>
                        <span>
                            <LogoutOutlined></LogoutOutlined>
                            {'  '}退出
                        </span>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className='site-layout-background'>
                        <Menu mode='inline' theme='dark' selectedKeys={[location.pathname]} style={{ height: '100%', borderRight: 0 }}>
                            <Menu.Item icon={<HomeOutlined />} key='/home'>
                                <Link to='/home'>数据概览</Link>
                            </Menu.Item>
                            <Menu.Item icon={<HddOutlined />} key='/home/article'>
                                <Link to='/home/article'>内容管理</Link>
                            </Menu.Item>
                            <Menu.Item icon={<EditOutlined />} key='/home/publish'>
                                <Link to='/home/publish'>发布文章</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px', backgroundColor: '#fff' }}>
                        <Switch>
                            <Route exact path='/home' component={Home} />
                            <Route path='/home/article' component={Article} />
                            <Route path='/home/publish' component={Publish} />
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
```

6. 在 `utils/request.js` 文件中通过请求拦截器统一携带 Token。

```jsx
import axios from 'axios'
import { getToken } from '.'

const instance = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0/',
    timeout: 5000,
})

instance.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance
```

## 退出登录

### 目标

能够实现退出功能。

### 步骤

1. 在 `store/constants/index.js` 文件中创建 actionType。

2. 在 `store/actions/login.js` 文件中创建退出的 action（清除本地和 Redux 中的 Token）。

3. 在 `store/reducers/login.js` 文件中处理 Redux 中的数据（Token）。

4. 在 `pages/Layout/index.js` 组件中进行退出的操作。

### 代码

`store/constants/index.js`

```js
export const LOGIN = 'LOGIN'
export const GET_USER_INFO = 'GET_USER_INFO'
export const LOGOUT = 'LOGOUT'
```

`store/actions/login.js`

```js
import request from '@/utils/request'
import { GET_USER_INFO, LOGIN, LOGOUT } from '../constants'
import { setToken, removeToken } from '@/utils'

export const loginAc = (payload) => ({
    type: LOGIN,
    payload,
})

export const login = (payload) => {
    return async (dispatch) => {
        const res = await request({
            method: 'post',
            url: '/authorizations',
            data: payload,
        })
        const token = res.data.data.token
        setToken(token)
        dispatch(loginAc(token))
    }
}

export const getUserInfoAc = (payload) => ({
    type: GET_USER_INFO,
    payload,
})

export const getUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(getUserInfoAc(res.data.data))
    }
}

export const logoutAc = () => ({
    type: LOGOUT,
})
export const logout = () => {
    return (dispatch) => {
        removeToken()
        dispatch(logoutAc())
    }
}
```

`store/reducers/login.js`

```js
import { LOGIN, LOGOUT } from '../constants'
const initValue = {
    token: '',
}

export default function login(state = initValue, action) {
    if (action.type === LOGIN) {
        return {
            ...state,
            token: action.payload,
        }
    }
    if (action.type === LOGOUT) {
        return {
            ...state,
            token: '',
        }
    }
    return state
}
```

`pages/Layout/index.js`

```jsx
import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { Layout, Menu, Popconfirm, message } from 'antd'
import { LogoutOutlined, HomeOutlined, HddOutlined, EditOutlined } from '@ant-design/icons'
import { Switch, Route, Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from '../Home'
import Article from '../Article'
import Publish from '../Publish'
import { getUserInfo, logout } from '@/store/actions/login'
const { Header, Sider } = Layout

export default function MyLayout() {
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])

    const onConfirm = () => {
        // #1 清除 Token
        dispatch(logout())
        // #2 跳转到登录页
        history.push('/login')
        // #3 提示消息
        message.success('退出成功', 1)
    }
    return (
        <div className={styles.root}>
            <Layout>
                <Header className='header'>
                    <div className='logo' />
                    <div className='profile'>
                        <span>{user.name}</span>
                        <Popconfirm title='你确定要退出本系统吗?' okText='确定' cancelText='取消' placement='bottomRight' onConfirm={onConfirm}>
                            <span>
                                <LogoutOutlined></LogoutOutlined> 退出
                            </span>
                        </Popconfirm>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className='site-layout-background'>
                        <Menu mode='inline' theme='dark' selectedKeys={[location.pathname]} style={{ height: '100%', borderRight: 0 }}>
                            <Menu.Item icon={<HomeOutlined />} key='/home'>
                                <Link to='/home'>数据概览</Link>
                            </Menu.Item>
                            <Menu.Item icon={<HddOutlined />} key='/home/article'>
                                <Link to='/home/article'>内容管理</Link>
                            </Menu.Item>
                            <Menu.Item icon={<EditOutlined />} key='/home/publish'>
                                <Link to='/home/publish'>发布文章</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px', backgroundColor: '#fff' }}>
                        <Switch>
                            <Route exact path='/home' component={Home} />
                            <Route path='/home/article' component={Article} />
                            <Route path='/home/publish' component={Publish} />
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
```

## 处理 Token 失效

`utils/request.js`

```js
import { logout } from '@/store/actions/login'
import { message } from 'antd'
import axios from 'axios'
import { getToken } from '.'
import store from '../store'

const instance = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0/',
    timeout: 5000,
})

instance.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (err) => {
        if (err.response.status === 401) {
            // 提示消息
            message.error('登录信息过期', 1)
            // 清除 Token（本地和 Redux 的）
            store.dispatch(logout())
            // 用此跳转有问题：看不到提示消息了，因为此 API 会导致页面刷新
            window.location.href = '/login'
        }
        return Promise.reject(err)
    }
)

export default instance
```

## 处理 location.href 的问题

### 目标

非组件中如何使用 history。

### 步骤

说明：为了能够在非组件环境下拿到路由信息，需要我们自定义 Router 的 history。

<!-- 1. 安装：`yarn add history@4.10.1`（固定版本）。 -->

1. 在 `utils/history.js` 文件中创建 hisotry 对象并导出。

2. 在 App.js 中导入 history 对象，并设置为 Router 的 history。

3. 通过响应拦截器处理 Token 失效。

### 代码

`utils/history.js`

```js
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
export default history
```

`App.js`

```js
// Router + history = BrowserRouter
// Router + hash = HashRouter
import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import NotFound from '@/pages/NotFound'
import history from '@/utils/history'

export default function App() {
    return (
        <Router history={history}>
            <div className='app'>
                <Switch>
                    {/* from 默认模糊匹配，表示以 '/' 开头就匹配 */}
                    <Redirect exact from='/' to='/home' />
                    <Route path='/login' component={Login}></Route>
                    <Route path='/home' component={Layout}></Route>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    )
}
```

`utils/request.js`

```js
instance.interceptors.response.use(
    (response) => {
        return response
    },
    (err) => {
        if (err.response.status === 401) {
            // 提示消息
            message.error('登录信息过期', 1)
            // 清除 Token（本地和 Redux 的）
            store.dispatch(logout())
            // 用此跳转有问题：看不到提示消息了
            // window.location.href = '/login'
            history.push('/login')
        }
        return Promise.reject(err)
    }
)
```

优化：把网络改到最慢，超时时间改成 500，这个时候可能连 err.response 都没有，程序会崩掉，所以要在 #1 处处理一下。

```js
instance.interceptors.response.use(
    (response) => {
        return response
    },
    (err) => {
        // #1
        if (!err.response) {
            message.error('网络繁忙，请稍后重试')
            return Promise.reject(err)
        }
        if (err.response.status === 401) {
            // 提示消息
            message.error('登录信息过期', 1)
            // 清除 Token（本地和 Redux 的）
            store.dispatch(logout())
            // 用此跳转有问题：看不到提示消息了
            // window.location.href = '/login'
            history.push('/login')
        }
        return Promise.reject(err)
    }
)
```

### 总结

1. 如何在非组件环境下实现路由跳转？

2. 使用自定义 history 时，需要使用哪个路由组件？

## 界面访问控制

### 概述

-   让需要登录才能访问的页面，必须在登录后才能访问，在没有登录时访问，直接跳转到登录页面，让用户进行登录。

-   不需要登录就可以访问的页面：登录页，需要登录才能访问的页面：后台首页、内容管理等（除了登录页面，其他页面需要登录才能访问）。

-   如何实现登录访问控制呢？

    a，分析：不管哪个页面都是通过路由来访问的，因此，需要从路由角度来进行控制。

    b，难点：React 中没有导航守卫，需要自己封装。

    c，思路：封装 `PrivateRoute` 组件代替默认的 Route 组件，里面会进行判断是否登录，1.登录直接显示要访问的页面 2.没有登录跳转到登录页面。

### 分析 PrivateRoute 鉴权路由组件

-   如何封装？参考 react-router-dom 文档中提供的鉴权示例，https://v5.reactrouter.com/web/example/auth-workflow

-   PrivateRoute 组件实际上就是对原来的 Route 组件做了一次包装，来实现了一些额外的功能（判断是否登录来做相应操作）。

-   Route 组件 render 属性的使用。

```js
<Route
    path='/home'
    render={() => {
        const token = getToken()
        if (token) {
            return <Layout />
        } else {
            return <Redirect to='/login' />
        }
    }}
></Route>
```

### 封装 PrivateRoute 鉴权路由组件

<font color=e32d40>**1. 基本写法**</font>

`components/PrivateRoute/index.js`

```js
import React from 'react'
import { isAuth } from '@/utils/token'
import { Route, Redirect } from 'react-router-dom'
// 除了 component 属性，把所有的属性收集到 rest 中
export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={() => {
                if (isAuth()) {
                    return <Component />
                } else {
                    return <Redirect to='/login' />
                }
            }}
        />
    )
}
```

`App.js` 中使用

```js
<PrivateRoute path='/home' component={Layout} />
```

<font color=e32d40>**2. 另一种写法**</font>

```js
import React from 'react'
import { isAuth } from '@/utils/token'
import { Route, Redirect } from 'react-router-dom'
// 除了 component 属性，把所有的属性收集到 rest 中
export default function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={() => {
                if (isAuth()) {
                    return children
                } else {
                    return <Redirect to='/login' />
                }
            }}
        />
    )
}
```

`App.js` 中使用

```jsx
<PrivateRoute path='/home'>
    <Layout />
</PrivateRoute>
```

<font color=e32d40>**3. 综合写法**</font>

```js
import React from 'react'
import { isAuth } from '@/utils/token'
import { Route, Redirect } from 'react-router-dom'
// 除了 component 属性，把所有的属性收集到 rest 中
export default function PrivateRoute({ children, component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={() => {
                if (isAuth()) {
                    return children ? children : <Component />
                } else {
                    return <Redirect to='/login' />
                }
            }}
        />
    )
}
```

`App.js`

```jsx
<PrivateRoute path='/home'>
    <Layout />
</PrivateRoute>
```

或

```jsx
<Route path='/login' component={Login}></Route>
```

### 优化 PrivateRoute

场景：在发布文章页把 Token 清除了，刷新，期望再次登录成功后还是到发布文章页。

`components/PrivateRoute/index.js`

```jsx
import React from 'react'
import { isAuth } from '@/utils/token'
import { Route, Redirect, useLocation } from 'react-router-dom'
export default function PrivateRoute({ children, component: Component, ...rest }) {
    const location = useLocation()
    return (
        <Route
            {...rest}
            render={() => {
                if (isAuth()) {
                    return children ? children : <Component />
                } else {
                    {
                        /* Redirect 默认是 replace，也可以添加 push 属性 */
                    }
                    return (
                        <Redirect
                            to={{
                                // 跳转路径
                                pathname: '/login',
                                // 通过 state 来传递额外的参数
                                state: {
                                    from: location.pathname,
                                },
                            }}
                        />
                    )
                }
            }}
        />
    )
}
```

登录成功后处理，`pages/Login/index.js`

```jsx
const onFinish = async (values) => {
    setLoading(true)
    try {
        await dispatch(login(values))
        message.success('登录成功', 1, () => {
            // setLoading(true) // 跳走了，所以这一行不加也没关系
            // history.push('/home')
            if (location.state?.from) {
                history.push(location.state.from)
            } else {
                history.push('/home')
            }
        })
    } catch (e) {
        message.error(e.response.data.message, 1, () => {
            setLoading(false)
        })
    }
}
```

问题：返回到了登录页。

```js
const onFinish = async (values) => {
    setLoading(true)
    try {
        await dispatch(login(values))
        message.success('登录成功', 1, () => {
            const from = location.state ? location.state.from : '/home'
            history.replace(from)
        })
    } catch (e) {
        message.error(e.response.data.message, 1, () => {
            setLoading(false)
        })
    }
}
```

## 优化 Token 过期回跳处理

期望：登录成功后跳转回过期时的那个页面。

`utils/request.js`

```jsx
instance.interceptors.response.use(
    (response) => {
        return response
    },
    (err) => {
        if (!err.response) {
            message.error('网络繁忙，请稍后重试')
            return Promise.reject(err)
        }
        if (err.response.status === 401) {
            // 提示消息
            message.error('登录信息过期', 1)
            // 清除 Token（本地和 Redux 的）
            store.dispatch(logout())
            // history.push('/login')
            history.replace({
                pathname: '/login',
                state: {
                    from: history.location.pathname,
                },
            })
        }
        return Promise.reject(err)
    }
)
```
