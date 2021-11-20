---
title: 09_极客园基础
date: 2021-11-21 00:48:17
tags:
---

## 项目介绍

-   极客园 PC 端项目：个人自媒体管理端

> 「极客园」对标`CSDN`、`博客园`等竞品，致力成为更加贴近年轻 IT 从业者（学员）的科技资讯类应用  
> 产品关键词：IT、极客、活力、科技、技术分享、前沿动态、内容社交  
> 用户特点：年轻有活力，对 IT 领域前言科技信息充满探索欲和学习热情

-   项目功能和演示，包括

    -   登录、退出
    -   首页
    -   内容（文章）管理：文章列表、发布文章、修改文章

-   技术栈：
    -   项目搭建：React 官方脚手架 `create-react-app`
    -   react hooks
    -   状态管理：redux
    -   UI 组件库：`antd` v4
    -   ajax 请求库：`axios`
    -   路由：`react-router-dom` 以及 `history`
    -   富文本编辑器：`react-quill`
    -   CSS 预编译器：`sass`
    -   CSS Modules 避免组件之间的样式冲突

## 项目搭建

**目标**：能够基于脚手架搭建项目基本结构
**步骤**：

1. 使用 React CLI 搭建项目：`npx create-react-app geek-pc-88`
2. 进入项目根目录：`cd geek-pc-88`
3. 启动项目：`yarn start`
4. 调整项目目录结构：

```tree
/src
  /assets         项目资源文件，比如，图片 等
  /components     通用组件
  /pages          页面
  /store          Redux 状态仓库
  /utils          工具，比如，token、axios 的封装等
  App.js          根组件
  index.css       全局样式
  index.js        项目入口
```

**核心代码**：

src/index.js 中：

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
```

src/App.js 中：

```js
export default function App() {
    return <div>根组件</div>
}
```

_注：为了统一操作，直接删除 src 下的所有文件后，再调整_

## 使用 git/gitee 管理项目

**目标**：能够将项目推送到 gitee 远程仓库
**步骤**：

1. 在项目根目录打开终端，并初始化 git 仓库（如果已经有了 git 仓库，无需重复该步），命令：`git init`
2. 添加项目内容到暂存区：`git add .`
3. 提交项目内容到仓库区：`git commit -m 项目初始化`
4. 添加 remote 仓库地址：`git remote add origin [gitee 仓库地址]`
5. 将项目内容推送到 gitee：`git push origin master -u`

-   以后只需要：`git push` 即可

## 使用 CSS 预编译器 - SASS

`SASS` 是一种预编译的 CSS，作用类似于 Less。由于 React 中内置了处理 SASS 的配置，所以，在 CRA 创建的项目中，可以直接使用 SASS 来写样式。

[SASS 支持两种后缀](https://sass.bootcss.com/documentation/syntax)，分别是：`.sass` 和 `.scss`。区别如下：

1. `.sass` 是一种简化语法形式（_用缩进代替{}_ / _用换行代替;_）

```scss
.button
  display: inline-flex
  border: none

  &:hover
    cursor: pointer
```

2. `.scss` 是传统的语法形式【推荐使用】

```scss
.button {
    display: inline-flex;
    border: none;

    &:hover {
        cursor: pointer;
    }
}
```

**目标**：能够在 CRA 中使用 sass 写样式
**步骤**：

1. 安装解析 sass 的包：`yarn add sass`
2. 创建全局样式文件：`index.scss`

**核心代码**：

src/index.scss 中：

```scss
body {
    margin: 0;
}

#root {
    height: 100%;
}
```

## 配置基础路由

**目标**：能够配置登录页面的路由并显示在页面中
**步骤**：

1. 安装路由：`yarn add react-router-dom@5.3.0`
2. 在 pages 目录中创建两个文件夹：Login、Layout、NotFound
3. 分别在两个目录中创建 index.js 文件，并创建一个简单的组件后导出
4. 在 App 组件中，导入路由组件以及两个页面组件
5. 配置 Login 和 Layout 的路由规则

**核心代码**：

pages/Login/index.js 中：

```js
const Login = () => {
    return <div>登录页面</div>
}
export default Login
```

App.js 中：

```js
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'
export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/layout' component={Layout}></Route>
                    {/* 增加一个404 */}
                    <Route component={NotFound}></Route>
                </Switch>
            </div>
        </Router>
    )
}
```

-   增加了路由的重定向

```jsx
<Router>
    <div>
        <Switch>
            {/* 路由的重定向 */}
            <Redirect exact from='/' to='/home' />
            <Route path='/login' component={Login}></Route>
            <Route path='/home' component={Layout}></Route>
            {/* 增加一个404 */}
            <Route component={NotFound}></Route>
        </Switch>
    </div>
</Router>
```

## 组件库 - antd

[Ant Design](https://ant.design/index-cn)
[antd PC 端组件库文档](https://ant.design/docs/react/introduce-cn)

> `antd` 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。
> **开箱即用**

**目标**：能够使用 antd 的 Button 组件渲染按钮
**步骤**：

1. 安装 antd 组件库：`yarn add antd`
2. 全局导入 antd 组件库的样式
3. 导入 Button 组件
4. 在 Login 页面渲染 Button 组件

**核心代码**：

src/index.js 中：

```js
// 先导入 antd 样式文件
import 'antd/dist/antd.css'
// 再导入全局样式文件，防止样式覆盖！
import './index.scss'
```

pages/Login/index.js 中：

```js
import { Button } from 'antd'

const Login = () => (
    <div>
        <Button type='primary'>Button</Button>
    </div>
)
```

**总结**：

1. 在哪个文件中导入 antd 的样式文件？
2. antd 的样式文件和我们自己的全局样式文件的导入顺序？

## 配置路径别名

[自定义 CRA 的默认配置](https://ant.design/docs/react/use-with-create-react-app-cn#%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE)
[craco 配置文档](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration)

-   注意：CRA 将所有工程化配置，都隐藏在了 `react-scripts` 包中，所以，项目中看不到任何配置信息
-   如果要修改 CRA 的默认配置，有以下几种方案：
    1. 【推荐】通过第三方库来修改，比如，`@craco/craco`
    2. 通过执行 `yarn eject` 命令，释放 `react-scripts` 中的所有配置到项目中（注意：该操作不可逆！！！）

**目标**：能够配置@路径别名简化路径处理
**步骤**：

1. 安装修改 CRA 配置的包：`yarn add -D @craco/craco`
2. 在项目根目录中创建 craco 的配置文件：`craco.config.js`，并在配置文件中配置路径别名
3. 修改 `package.json` 中的脚本命令
4. 在代码中，就可以通过 `@` 来表示 src 目录的绝对路径
5. 重启项目，让配置生效

**核心代码**：

/craco.config.js 中：

```js
const path = require('path')
module.exports = {
    webpack: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
}
```

package.json 中：

```json
// 将 start/build/test 三个命令修改为 craco 方式

"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
},
```

## @别名路径提示

**目标**：能够让 vscode 识别@路径并给出路径提示
**步骤**：

1. 在项目根目录创建 `jsconfig.json` 配置文件
2. 在配置文件中添加以下配置

**核心代码**：

/jsconfig.json 中：

```json
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": ["src/*"]
        }
    }
}
```

**总结**：

1. VSCode 会自动读取 `jsconfig.json` 中的配置，让 vscode 知道 @ 就是 src 目录
