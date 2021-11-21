---
title: 10_极客园
date: 2021-11-21 15:10:49
tags:
---

## 今日目标

✔ 学习。

<!-- more -->

## 搭建布局组件结构

![image-20210825144229158](images/image-20210825144229158.png)

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
            <div className='layout'>
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
            <div className='layout'>
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
import { LogoutOutlined, HomeOutlined, HddOutlined, EditOutlined } from '@ant-design/icons'
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

-   修改侧边栏的样式 layout/index.module.scss

```jsx
.root {
  height: 100%;

  :global {
      .ant-layout {
          height: 100%;
        }
  }
}
```

-   index.scss

```jsx
#root,
.app {
  height: 100%;
}

```

## 布局-完整结构与样式

**目标**：能够根据 antd 布局组件搭建基础布局
**步骤**：

1. 打开 antd/Layout 布局组件文档，找到示例：顶部-侧边布局-通栏
2. 拷贝示例代码到我们的 Layout 页面中
3. 分析并调整页面布局

**核心代码**：

pages/Layout/index.js 中：

```js
import React from 'react'
import styles from './index.module.scss'
import { Layout, Menu, Breadcrumb } from 'antd'
import { LogoutOutlined, HomeOutlined, HddOutlined, EditOutlined } from '@ant-design/icons'

const { Header, Content, Sider } = Layout

export default function MyLayout() {
    return (
        <div className={styles.root}>
            <Layout>
                <Header className='header'>
                    <div className='logo' />
                    {/* 右侧内容 */}
                    <div className='profile'>
                        <span>黑马先锋</span>
                        <span>
                            <LogoutOutlined></LogoutOutlined> 退出
                        </span>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className='site-layout-background'>
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
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
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

page/Layout/index.scss 中：

```scss
// BEM规范
// xxx.module.scss 会对样式文件中修改样式的类名, 保证类名一定是唯一的
.root {
    height: 100%;
    :global {
        .ant-layout-header {
            padding: 0;
        }
        .header {
            .logo {
                float: left;
                width: 200px;
                height: 60px;
                margin: 2px 0px;
                // background: rgba(255, 255, 255, 0.3);
                background: url(~@/assets/logo.png) no-repeat 0 0;
                background-size: 200px 60px;
            }
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
        .ant-layout {
            height: 100%;
        }
        .site-layout-background {
            background-color: #fff;
        }
    }
}
```

## 布局-嵌套路由配置

**目标**：能够在右侧内容区域展示左侧菜单对应的页面内容
**步骤**：

1. 在 pages 目录中，分别创建：`Home`（数据概览）/`Article`（内容管理）/Publish（发布文章）页面文件夹
2. 分别在三个文件夹中创建 index.js 并创建基础组件后导出
3. 在 Layout 页面组件中，配置子路由
4. 使用 Link 修改左侧菜单内容，与子路由规则匹配实现路由切换

**核心代码**：

pages/Home/index.js 中：

```js
const Home = () => {
    return <div>Home</div>
}

export default Home
```

pages/Layout/index.js 中：

```js
import Home from '../Home'
import Article from '../Article'
import Publish from '../Publish'


<Layout style={{ padding: '24px' }}>
  <Switch>
    <Route exact path="/home" component={Home}></Route>
    <Route path="/home/article" component={Article}></Route>
    <Route path="/home/publish" component={Publish}></Route>
  </Switch>
</Layout>


<Menu
  mode="inline"
  theme="dark"
  defaultSelectedKeys={['1']}
  style={{ height: '100%', borderRight: 0 }}
>
  <Menu.Item icon={<HomeOutlined />} key="1">
    <Link to="/home">数据概览</Link>
  </Menu.Item>
  <Menu.Item icon={<HddOutlined />} key="2">
    <Link to="/home/article">内容管理</Link>
  </Menu.Item>
  <Menu.Item icon={<EditOutlined />} key="3">
    <Link to="/home/publish">发布文章</Link>
  </Menu.Item>
</Menu>
```

-   嵌套路由：由于 React 路由是组件，所以，组件写在哪就会在哪个地方渲染。因此，对于 Route 来说，根据实际需求放在相应的页面位置即可。
    -   需要注意的是：嵌套路由的配置，由于嵌套路由展示的内容是放在某个父级路由中的，所以，要展示嵌套路由的前提就是先展示父级路由内容。因此，嵌套路由的路径是基于父级路由路径的。
    -   比如，当前项目功能中，`/home/article` 就是在父级路由 `/home` 的基础上，添加了 '/article'

## 布局-菜单高亮

**目标**：能够在刷新页面时保持对应菜单高亮

-   思路：将当前访问页面的路由地址作为 Menu 选中项的值（selectedKeys）即可
    -   注意：当我们点击菜单切换路由时，Layout 组件会重新渲染，因为，每次都可以拿到当前页面的路由地址

**步骤**：

1. 将 Menu 的 key 属性修改为与其对应的路由地址
2. 获取到当前正在访问页面的路由地址
3. 将当前路由地址设置为 selectedKeys 属性的值

**核心代码**：

pages/Layout/index.js 中：

```js
import { useLocation } from 'react-router-dom'

const GeekLayout = () => {
    const location = useLocation()
    const selectedKey = location.pathname

    return (
        // ...
        <Menu mode='inline' theme='dark' selectedKeys={[selectedKey]} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item icon={<HomeOutlined />} key='/home'>
                <Link to='/home'>数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key='/home/article'>
                <Link to='/home/article'>内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key='/home/publish'>
                <Link to='/home/publish'>发布文章</Link>
            </Menu.Item>
        </Menu>
    )
}
```

**总结**：

1. 通过哪个属性指定 Menu 组件的选中项？
2. 如何做到切换页面时对应菜单高亮？

## 布局-展示个人信息

**目标**：能够在布局页面右上角展示登录用户名
**步骤**：

1. 在 Layout 组件中 dispatch 获取个人信息的异步 action
2. 在 actions/user.js 中，创建异步 action 并获取个人信息
3. 将接口返回的个人信息 dispatch 到 reducer 来存储该状态
4. 在 reducers/user.js 中，处理个人信息的 action，将状态存储到 redux 中
5. 在 Layout 组件中获取个人信息并展示

**核心代码**：

1. 需要给 axios 配置请求拦截器，添加 token `utils/request.js`

```jsx
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const token = getToken()
        if (token) {
            // 添加token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
```

2. 新增一个 user 的 reducer store/reducers/user.js

```jsx
import { GET_USER_INFO } from '../constants'

export default function user(state = {}, action) {
    if (action.type === GET_USER_INFO) {
        return action.payload
    }
    return state
}
```

3. 在`store/reducers/index.js`增加 user 模块

```jsx
import login from './login.js'
import user from './user.js'
const rootReducer = combineReducers({
    login,
    user,
})
```

4. 在`store/actions/user.js`中增加一个获取用户信息的 action

```jsx
import request from '@/utils/request'
import { GET_USER_INFO } from '../constants'
export function getUserInfo() {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch({
            type: GET_USER_INFO,
            payload: res.data.data,
        })
    }
}
```

5. 在`store/constants/index.js`增加了类型

```jsx
export const LOGIN = 'LOGIN'
export const GET_USER_INFO = 'GET_USER_INFO'
```

6. 在`pages/Layout/index.js`中发送请求

```jsx
const dispatch = useDispatch()

useEffect(() => {
    dispatch(getUserInfo())
}, [dispatch])
```

## 布局-退出登录

**目标**：能够实现退出功能
**步骤**：

1. 为气泡确认框添加确认回调事件
2. 在回调事件中，分发退出的异步 action
3. 在异步 action 中删除本地 token，并且分发 action 来清空 redux 状态
4. 退出后，返回到登录页面

**核心代码**：

pages/Layout/index.js 中：

```js
{
    /* 右侧内容 */
}
;<div className='profile'>
    <span>{user.name}</span>
    <Popconfirm title='你确定要退出本系统吗?' okText='确定' cancelText='取消' placement='bottomRight' onConfirm={onConfirm}>
        <span>
            <LogoutOutlined></LogoutOutlined> 退出
        </span>
    </Popconfirm>
</div>

const onConfirm = () => {
    // 清除token
    dispatch(logout())

    // 跳转到登录页
    history.push('/login')
    // 提示消息
    message.success('退出成功', 1)
}
```

actions/login.js 中：

```js
export const logout = () => {
    return (dispatch) => {
        removeToken()
        dispatch({
            type: LOGOUT,
        })
    }
}
```

reducers/login.js 中：

```js
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

## 布局-处理 token 失效

**目标**：能够统一处理 token 失效重定向到登录页面

说明：为了能够在非组件环境下拿到路由信息，需要我们自定义 Router 的 history

**步骤**：

1. 安装：`yarn add history@4.10.1`（固定版本）
2. 创建 utils/history.js 文件
3. 在该文件中，创建一个 hisotry 对象并导出
4. 在 App.js 中导入 history 对象，并设置为 Router 的 history
5. 通过响应拦截器处理 token 失效

**核心代码**：

utils/history.js 中：

```js
// 自定义history对象
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

export default history
```

App.js 中：

```js
// 注意：此处，需要导入 Router 组件
import { Router } from 'react-router-dom'
import history from '@/utils/history'

function App() {
    return <Router history={history}></Router>
}
```

utils/request.js 中：

```js
// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response
    },
    function (err) {
        if (err.response.status === 401) {
            // token过期了
            // 提示消息
            message.error('登录信息过期', 1)
            // 清除token
            store.dispatch(logout())
            // 跳转到登录 history

            history.push('/login')
        }
        // 对响应错误做点什么
        return Promise.reject(err)
    }
)
```

**总结**：

1. 如何在非组件环境下实现路由跳转？
2. 使用自定义 history 时，需要使用哪个路由组件？

## 登录访问控制 - 鉴权

对于极客园 PC 端项目来说，

-   有的页面*不需要登录*就可以访问，比如，登录页
-   有的页面*需要登录*后才能访问，比如，项目后台首页、内容管理等（除了登录页面，其他页面需要登录才能访问）

因此，就需要对项目进行登录访问控制，让需要登录才能访问的页面，必须在登录后才能访问。
在没有登录时，直接跳转到登录页面，让用户进行登录。

-   如何实现登录访问控制呢？
    -   分析：不管哪个页面都是通过**路由**来访问的，因此，需要从路由角度来进行控制
    -   思路：创建 `AuthRoute` 组件，判断是否登录，1 登录直接显示要访问的页面 2 没有登录跳转到登录页面

**难点：react 中没有导航守卫，需要自己封装**

### 分析 AuthRoute 鉴权路由组件

-   场景：限制某个页面只能在登录的情况下访问。
-   说明：在 React 路由中并没有直接提供该组件，需要手动封装，来实现登录访问控制（类似于 Vue 路由的导航守卫）。
-   如何封装？参考 react-router-dom 文档中提供的鉴权示例 。https://v5.reactrouter.com/web/example/auth-workflow
-   如何使用？使用 AuthRoute 组件代替默认的 Route 组件，来配置路由规则。
-   AuthRoute 组件实际上就是对原来的 Route 组件做了一次包装，来实现了一些额外的功能。
-   `<Route path component render>` render 方法，指定该路由要渲染的组件内容（类似于 component 属性）。
-   Redirect 组件：重定向组件，通过 to 属性，指定要跳转到的路由信息。
-   state 属性：表示给路由附加一些额外信息，此处，用于指定登录成功后要进入的页面地址。

```js
// 使用方式：
<PrivateRoute path='/rent/add' component={Rent} />
```

### 实现自己的 PrivateRoute 组件

-   权限判断

```js
import { hasToken } from '@/utils/storage'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// 我们需要解构所有的属性，除了component属性
export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={() => {
                if (hasToken()) {
                    return <Component></Component>
                } else {
                    return <Redirect to='/login'></Redirect>
                }
            }}
        ></Route>
    )
}
```

-   使用 PrivateRoute

```jsx
{
    /* 路由规则 */
}
;<Switch>
    <Redirect exact from='/' to='/home'></Redirect>
    <PrivateRoute path='/home' component={Layout}></PrivateRoute>
    <Route path='/login' component={Login}></Route>
</Switch>
```

-   登录成功处理

```jsx
submit = async (values) => {
    const { mobile, code } = values
    console.log(this.props)
    try {
        const res = await login(mobile, code)
        // 存储token
        // localStorage.setItem('itcast_geek_pc', res.data.token)
        setToken(res.data.token)
        // 跳转到首页
        const { state } = this.props.location
        if (state) {
            this.props.history.push(state.from.pathname)
        } else {
            this.props.history.push('/home')
        }
        message.success('登录成功', 1)
    } catch (err) {
        message.warning(err.response.data.message, 1)
    }
}
```

### PrivateRoute 优化

-   封装 PrivateRoute 增加了 state 传参

```jsx
import { hasToken } from '@/utils/storage'
import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
// 我们需要解构所有的属性，除了component属性
export default function PrivateRoute({ children, component: Component, ...rest }) {
    const location = useLocation()
    return (
        <Route
            {...rest}
            render={() => {
                if (hasToken()) {
                    return children ? children : <Component></Component>
                } else {
                    return (
                        <Redirect
                            to={{
                                // 跳转的路径
                                pathname: '/login',
                                // 会通过state来传递额外的参数
                                state: {
                                    from: location.pathname,
                                },
                            }}
                        ></Redirect>
                    )
                }
            }}
        ></Route>
    )
}
```

-   修改了登录的逻辑

```jsx
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
```

## 优化-token 过期回跳处理

-   修改 request.js

```jsx
if (err.response.status === 401) {
    // token过期了
    // 提示消息
    message.error('登录信息过期', 1)
    // 清除token
    store.dispatch(logout())
    // 跳转到登录 history
    console.log(history.location.pathname)
    history.replace({
        pathname: '/login',
        // token失效，跳转到登录页之前的那个页面
        state: {
            from: history.location.pathname,
        },
    })
}
```

## 布局-首页展示

**目标**：能够渲染首页
**核心代码**：

将 chart.png 拷贝到 assets 目录中

pages/Home/index.js 中：

```js
import React from 'react'
import styles from './index.module.scss'
export default function Home() {
    return <div className={styles.root}></div>
}
```

pages/Home/index.scss 中：

```scss
.root {
    width: 100%;
    height: 100%;
    background: #f5f5f5 url(../../assets/chart.png) no-repeat center / contain;
}
```
