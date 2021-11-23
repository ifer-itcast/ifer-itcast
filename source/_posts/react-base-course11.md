---
title: 11_极客园
date: 2021-11-22 00:50:54
tags:
---

## 今日目标

✔ 理解内容管理的业务逻辑。

<!-- more -->

## Card 组件与面包屑导航

-   Card 组件，文档：https://ant.design/components/card-cn/

```js
import React from 'react'
import { Card } from 'antd'
import styles from './index.module.scss'

export default function Article() {
    return (
        <div className={styles.root}>
            <Card title='面包屑导航'>我是内容</Card>
        </div>
    )
}
```

-   面包屑导航

```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Breadcrumb } from 'antd'
import styles from './index.module.scss'

export default function Article() {
    return (
        <div className={styles.root}>
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/home'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                我是内容
            </Card>
        </div>
    )
}
```

## 搜索表单结构

-   表单结构。

```jsx
<Form>
    <Form.Item label='状态'></Form.Item>
    <Form.Item label='频道'></Form.Item>
    <Form.Item label='日期'></Form.Item>
    <Form.Item>
        <Button type='primary' htmlType='submit'>
            筛选
        </Button>
    </Form.Item>
</Form>
```

-   状态。

```jsx
<Form initialValues={{ status: -1 }}>
    <Form.Item label='状态' name='status'>
        <Radio.Group>
            <Radio value={-1}>全部</Radio>
            <Radio value={0}>草稿</Radio>
            <Radio value={1}>待审核</Radio>
            <Radio value={2}>审核通过</Radio>
            <Radio value={3}>审核失败</Radio>
        </Radio.Group>
    </Form.Item>
</Form>
```

-   下拉框。

```jsx
<Form.Item label='频道' name='channel_id'>
    <Select placeholder='请选择频道' style={{ width: 200 }}>
        <Select.Option value='jack'>Jack</Select.Option>
        <Select.Option value='lucy'>Lucy</Select.Option>
        <Select.Option value='rose'>Rose</Select.Option>
    </Select>
</Form.Item>
```

-   日期选择。

```jsx
<Form.Item label='日期' name='date'>
    <DatePicker.RangePicker />
</Form.Item>
```

-   完整代码。

```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, Select, DatePicker } from 'antd'
import styles from './index.module.scss'

export default function Article() {
    return (
        <div className={styles.root}>
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/home'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form initialValues={{ status: -1 }}>
                    <Form.Item label='状态' name='status'>
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='频道' name='channel_id'>
                        <Select placeholder='请选择频道' style={{ width: 200 }}>
                            <Select.Option value='jack'>Jack</Select.Option>
                            <Select.Option value='lucy'>Lucy</Select.Option>
                            <Select.Option value='rose'>Rose</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='日期' name='date'>
                        <DatePicker.RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
```

## 日期中文处理

https://ant-design.gitee.io/components/date-picker-cn/

`index.js`，入口文件。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
import store from './store'
import 'antd/dist/antd.css'
import './index.scss'
import App from './App'
ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={locale}>
            <App />
        </ConfigProvider>
    </Provider>,
    document.querySelector('#root')
)
```

## 请求频道数据并渲染

### 步骤

1. 在 `store/constants/index.js` 文件中创建 actionType。

2. 在 `store/actions/article.js` 文件中创建异步的 action 和 actionCreator。

3. 在 `store/reducers/article.js` 文件中创建 reducer。

4. 在 `store/reducers/index.js` 文件中合并 reducer。

5. 在 `pages/Article/index.js` 组件中通过 useDispatch 来触发 action，通过 useSelector 来拿到数据。

### 代码

`store/constants/index.js`

```jsx
export const LOGIN = 'LOGIN'
export const GET_USER_INFO = 'GET_USER_INFO'
export const LOGOUT = 'LOGOUT'
export const GET_CHANNEL_LIST = 'GET_CHANNEL_LIST'
```

`store/actions/article.js`

```jsx
import request from '@/utils/request'
import { GET_CHANNEL_LIST } from '../constants'

export const getChannelListAc = (payload) => ({
    type: GET_CHANNEL_LIST,
    payload,
})

export const getChannelList = () => {
    return async (dispatch) => {
        const res = await request.get('/channels')
        // 注意这里是 getChannelListAc 而不是 getChannelList
        dispatch(getChannelListAc(res.data.data.channels))
    }
}
```

`reducers/article.js`

```jsx
import { GET_CHANNEL_LIST } from '../constants'
const initValue = {
    channels: [],
}
export default function article(state = initValue, action) {
    switch (action.type) {
        case GET_CHANNEL_LIST:
            return {
                ...state,
                channels: action.payload,
            }
        default:
            return state
    }
}
```

`store/reducers/index.js`

```jsx
import { combineReducers } from 'redux'

import login from './login'
import user from './user'
import article from './article'

const rootReducer = combineReducers({
    login,
    user,
    article,
})

export default rootReducer
```

`pages/Article/index.js`

```jsx
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Breadcrumb, Form, Button, Radio, Select, DatePicker } from 'antd'
import styles from './index.module.scss'
import { getChannelList } from '@/store/actions/article'

export default function Article() {
    const dispatch = useDispatch()
    const channels = useSelector((state) => state.article.channels)
    useEffect(() => {
        dispatch(getChannelList())
    }, [dispatch])
    return (
        <div className={styles.root}>
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/home'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form initialValues={{ status: -1 }}>
                    <Form.Item label='状态' name='status'>
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='频道' name='channel_id'>
                        <Select placeholder='请选择频道' style={{ width: 200 }}>
                            {channels.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label='日期'>
                        <DatePicker.RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
```

## 表格基本结构

```jsx
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
]
```

```jsx
<Card title='根据筛选条件共查询到xxx条结果:' style={{ marginTop: 10 }}>
    <Table dataSource={dataSource} columns={columns} />
</Card>
```

## 获取表格数据

### 步骤

1. 在 `store/constants/index.js` 文件中创建 actionType。

2. 在 `store/actions/article.js` 文件中创建异步的 action 和 actionCreator。

3. 在 `store/reducers/article.js` 文件中创建 reducer。

4. 在 `pages/Article/index.js` 组件中通过 useDispatch 来触发 action，通过 useSelector 来拿到数据。

### 代码

`store/constants/index.js`

```js
export const LOGIN = 'LOGIN'
export const GET_USER_INFO = 'GET_USER_INFO'
export const LOGOUT = 'LOGOUT'
export const GET_CHANNEL_LIST = 'GET_CHANNEL_LIST'
export const GET_ARTICLE_LIST = 'GET_ARTICLE_LIST'
```

`store/actions/article.js`

```jsx
import request from '@/utils/request'
import { GET_ARTICLE_LIST, GET_CHANNEL_LIST } from '../constants'

export const getChannelListAc = (payload) => ({
    type: GET_CHANNEL_LIST,
    payload,
})

export const getChannelList = () => {
    return async (dispatch) => {
        const res = await request.get('/channels')
        dispatch(getChannelListAc(res.data.data.channels))
    }
}

export const getArticleListAc = (payload) => ({
    type: GET_ARTICLE_LIST,
    payload,
})

export const getArticleList = (params) => {
    return async (dispatch) => {
        const res = await request({
            url: '/mp/articles',
            params,
        })
        dispatch(getArticleListAc(res.data.data))
    }
}
```

`store/reducers/article.js`

```js
import { GET_ARTICLE_LIST, GET_CHANNEL_LIST } from '../constants'
const initValue = {
    channels: [],
    articles: {},
}
export default function article(state = initValue, action) {
    switch (action.type) {
        case GET_CHANNEL_LIST:
            return {
                ...state,
                channels: action.payload,
            }
        case GET_ARTICLE_LIST:
            return {
                ...state,
                articles: action.payload,
            }
        default:
            return state
    }
}
```

`pages/Article/index.js`

```jsx
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Breadcrumb, Form, Button, Radio, Select, DatePicker, Table } from 'antd'
import styles from './index.module.scss'
import { getArticleList, getChannelList } from '@/store/actions/article'

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
]

export default function Article() {
    const dispatch = useDispatch()
    const channels = useSelector((state) => state.article.channels)
    useEffect(() => {
        dispatch(getChannelList())
        dispatch(getArticleList())
    }, [dispatch])
    return (
        <div className={styles.root}>
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/home'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form initialValues={{ status: -1 }}>
                    <Form.Item label='状态' name='status'>
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='频道' name='channel_id'>
                        <Select placeholder='请选择频道' style={{ width: 200 }}>
                            {channels.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label='日期' name='date'>
                        <DatePicker.RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title='根据筛选条件共查询到xxx条结果:' style={{ marginTop: 10 }}>
                <Table dataSource={dataSource} columns={columns} />
            </Card>
        </div>
    )
}
```

## 渲染表格数据

### 准备 columns

```js
const columns = [
    {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '发布时间',
        dataIndex: 'pubdate',
        key: 'pubdate',
    },
    {
        title: '阅读数',
        dataIndex: 'read_count',
        key: 'read_count',
    },
    {
        title: '评论数',
        dataIndex: 'comment_count',
        key: 'comment_count',
    },
    {
        title: '点赞数',
        dataIndex: 'like_count',
        key: 'like_count',
    },
    {
        title: '操作',
        key: 'id',
    },
]
```

### 状态处理

```js
const STATUS = [
    { id: -1, title: '全部', color: 'magenta' },
    { id: 0, title: '草稿', color: 'red' },
    { id: 1, title: '待审核', color: 'volcano' },
    { id: 2, title: '审核通过', color: 'lime' },
    { id: 3, title: '审核失败', color: 'gold' },
]
```

重新处理表单。

```jsx
<Form.Item label='状态' name='status'>
    <Radio.Group>
        {STATUS.map((item) => (
            <Radio key={item.id} value={item.id}>
                {item.title}
            </Radio>
        ))}
    </Radio.Group>
</Form.Item>
```

表格中的 status 单独处理渲染。

```jsx
{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
        const obj = STATUS.find((item) => item.id === status)
        return <Tag color={obj.color}>{obj.title}</Tag>
    },
},
```

### 封面处理

```js
{
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    render(cover) {
        if (cover.type === 0) {
            return <Image width={200} height={150} src={img} />
        } else {
            return <Image width={200} height={150} src={cover.images[0]} fallback={img} />
        }
    },
}
```

### 操作处理

```js
{
    title: '操作',
    render() {
        return (
            <Space>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                ></Button>
                <Button
                    type="primary"
                    shape="circle"
                    danger
                    icon={<DeleteOutlined />}
                ></Button>
            </Space>
        )
    },
},
```

### 通用样式处理

`pages/Layout/index.js`

```jsx
<Layout style={{ padding: 20, overflow: 'auto' }}>
```

### key 属性处理

-   如果数据中有 key 属性，那么久不用指定 key 属性。

-   如果数据中没有 key 属性，必须通过 rowKey 进行指定。

```jsx
<Table rowKey='id' dataSource={this.state.articles} columns={columns} />

<Table rowKey={(record) => record.id} dataSource={articles.results} columns={columns}/>
```

## 筛选功能

```jsx
<Form initialValues={{ status: -1 }} onFinish={onFinish}>
```

```js
const onFinish = (values) => {
    const params = {}
    if (values.status !== -1) {
        params.status = values.status
    }
    if (values.channel_id) {
        params.channel_id = values.channel_id
    }
    if (values.date) {
        params.begin_pubdate = values.date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss')
        params.end_pubdate = values.date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss')
    }
    dispatch(getArticleList(params))
}
```

## 完整代码

`pages/Article/index.js`

```jsx
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Breadcrumb, Form, Button, Radio, Select, DatePicker, Table, Tag, Image, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { getArticleList, getChannelList } from '@/store/actions/article'
import img from '@/assets/error.png'

const STATUS = [
    { id: -1, title: '全部', color: 'magenta' },
    { id: 0, title: '草稿', color: 'red' },
    { id: 1, title: '待审核', color: 'volcano' },
    { id: 2, title: '审核通过', color: 'lime' },
    { id: 3, title: '审核失败', color: 'gold' },
]
const columns = [
    {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
        render(cover) {
            if (cover.type === 0) {
                return <Image width={200} height={150} src={img} />
            } else {
                return <Image width={200} height={150} src={cover.images[0]} fallback={img} />
            }
        },
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            const obj = STATUS.find((item) => item.id === status)
            return <Tag color={obj.color}>{obj.title}</Tag>
        },
    },
    {
        title: '发布时间',
        dataIndex: 'pubdate',
        key: 'pubdate',
    },
    {
        title: '阅读数',
        dataIndex: 'read_count',
        key: 'read_count',
    },
    {
        title: '评论数',
        dataIndex: 'comment_count',
        key: 'comment_count',
    },
    {
        title: '点赞数',
        dataIndex: 'like_count',
        key: 'like_count',
    },
    {
        title: '操作',
        dataIndex: 'id',
        render() {
            return (
                <Space>
                    <Button type='primary' shape='circle' icon={<EditOutlined />}></Button>
                    <Button type='primary' shape='circle' danger icon={<DeleteOutlined />}></Button>
                </Space>
            )
        },
    },
]

export default function Article() {
    const dispatch = useDispatch()
    const channels = useSelector((state) => state.article.channels)
    const articles = useSelector((state) => state.article.articles)
    const onFinish = (values) => {
        const params = {}
        if (values.status !== -1) {
            params.status = values.status
        }
        if (values.channel_id) {
            params.channel_id = values.channel_id
        }
        if (values.date) {
            params.begin_pubdate = values.date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss')
            params.end_pubdate = values.date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss')
        }
        dispatch(getArticleList(params))
    }
    useEffect(() => {
        dispatch(getChannelList())
        dispatch(getArticleList())
    }, [dispatch])
    return (
        <div className={styles.root}>
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/home'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form initialValues={{ status: -1 }} onFinish={onFinish}>
                    <Form.Item label='状态' name='status'>
                        <Radio.Group>
                            {STATUS.map((item) => (
                                <Radio key={item.id} value={item.id}>
                                    {item.title}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='频道' name='channel_id'>
                        <Select placeholder='请选择频道' style={{ width: 200 }}>
                            {channels.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label='日期' name='date'>
                        <DatePicker.RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`根据筛选条件共查询到${articles.total_count}条结果:`} style={{ marginTop: 10 }}>
                <Table rowKey={(record) => record.id} dataSource={articles.results} columns={columns} />
            </Card>
        </div>
    )
}
```

## 配置分页

```jsx
<Table
    rowKey={(record) => record.id}
    dataSource={articles.results}
    columns={columns}
    pagination={{
        position: ['bottomCenter'],
        total: articles.total_count,
        pageSize: articles.per_page,
        current: articles.page,
    }}
/>
```

## Hooks 的函数特性

### 目标

能够理解 Hooks 的函数特性。

### 内容

对于 React 的函数组件来说，只要修改状态，组件就会更新。同时，函数中的代码都会从头到尾重新执行一遍。
每一次的组件更新，都是一次全新的函数调用，在这一次的调用中都会创建新的：

1. 变量，比如：存储状态的变量 count
2. 函数，比如：事件处理程序 handleClick

此处，我们重点来关注下*状态变量的值*，因为我们需要在接下来的操作中拿到状态的值。

需要特殊说明的是：当一个*函数内部访问了外部的状态变量时*（比如，handleClick 访问了外部变量 count），由于 **JS 函数闭包机制**的存在，这个**函数内部只能访问到本次组件更新时创建的变量值**。比如：

组件第一次执行（第一次创建的闭包）：

```tsx
变量 count 的值为：0
函数 handleClick 访问到的外部变量 count 的值就是：0
```

点击 +1 按钮，组件重新渲染，组件第二次执行（第二次创建的闭包）：

```tsx
变量 count 的值为：1
函数 handleClick 访问到的外部变量 count 的值就是：1
```

怎么理解这个过程呢？
**可以把组件的每次更新想象成给组件拍照，组件每次更新都会对应到一张照片，而每一张特定的照片都记录了那一刻组件特定的状态。**

比如：

```tsx
1. 第一张照片（组件第一次执行）中 count 的值为：0
2. 第二张照片（组件更新会后，第二次执行）中 count 的值为：1
```

从原理层面来看，每一张照片实际上就是每次调用组件函数时创建的闭包。

```tsx
const Counter = () => {
    const [count, setCount] = useState(0)

    // 直接获取状态的值
    console.log(count)

    const handleClick = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <button onClick={handleClick}>+1</button>
            <h1>计数器：{count}</h1>
        </div>
    )
}
```

### 总结

1. 函数组件状态更新时，组件中的代码会重新执行吗？
2. 组件两次更新中的 handleClick 是同一个函数吗？

## 定时器与 hooks

### 目标

能够使用 hooks 的函数特性分析出定时器打印的结果

### 内容

```tsx
// 问题：定时器打印的 count 值为多少？
//
// 操作过程如下：
// 1 先点击【延迟获取 count 值】按钮
// 2 立即点击【+1】按钮 3 次
const Counter = () => {
    const [count, setCount] = useState(0)

    console.log(count)

    const handleClick = () => {
        setCount(count + 1)
    }

    const getCount = () => {
        setTimeout(() => {
            console.log(count)
        }, 3000)
    }

    return (
        <div>
            <button onClick={handleClick}>+1</button>
            <button onClick={getCount}>延迟获取 count 值</button>
            <h1>计数器：{count}</h1>
        </div>
    )
}
```

分析该问题的出发点：点击【延迟获取 count 值】按钮时，组件是第几次更新？

什么时候获取就是什么时候的状态。

## 突破闭包限制 useRef

### 目标

能够使用 useRef 实现清理定时器功能

### 内容

从一个问题出发：如何清理定时器？

```tsx
// 问题：这种方式能正确清理定时器吗？
//
// 操作过程如下：
// 1 先点击【+1】按钮 1 次
// 2 再点击【清理定时器】按钮
const Counter = () => {
    const [count, setCount] = useState(0)
    let timerId = -1

    useEffect(() => {
        timerId = setInterval(() => {
            console.log('interval')
        }, 1000)
    }, [])

    const clear = () => {
        clearInterval(timerId)
    }

    const handleClick = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <button onClick={handleClick}>+1</button>
            <button onClick={clear}>清理定时器</button>
            <h1>计数器：{count}</h1>
        </div>
    )
}
```

分析该问题的出发点：clearInterval 的 timerId 和 useEffect 中的 timerId 是不是同一个？（提示：可以通过打印的方式，查看两处 timerId 的值）

所以，要想在组件更新后清理定时器，就需要让两处的 timerId 值是同一个，也就是要**保持 timerId 的值在组件更新期间保持不变**。此时，就用到：`useRef` Hook 了。

-   `useRef` 作用：在组件更新期间给你相同的 ref 对象（或者：可以在组件每次重新渲染时，拿到同一个对象）
-   注意：修改 ref 对象的值不会导致组件重新渲染

```tsx
// 创建 ref 对象
const timerRef = useRef(-1)

useEffect(() => {
    // 将定时器id存储到 ref 对象中
    timerRef.current = setInterval(() => {
        console.log('interval')
    }, 1000)
}, [])

const clear = () => {
    // 从 ref 对象中拿到之前存储的定时器id
    clearInterval(timerRef.current)
}

// 说明：两个地方拿到的 timerRef.current 是同一个对象！
```

### 总结

1. 使用 useRef 为什么可以清理掉定时器？
2. 修改 ref 对象的值，会导致组件重新渲染吗？

说明：在 React 中，很多“奇怪”的问题，都可以通过 useRef Hook 来解决。

---

思考：如何在上述定时器中，获取到最新的状态值？

```tsx
const Counter = () => {
    const [count, setCount] = useState(0)
    // 创建 ref 对象
    const countRef = useRef(0)

    const handleClick = () => {
        const newCount = count + 1
        setCount(newCount)
        // 将最新的 count 值存在 ref 中
        countRef.current = newCount
    }

    const getCount = () => {
        setTimeout(() => {
            console.log(count)
            // 获取最新的 count 值
            console.log('最新值：', countRef.current)
        }, 3000)
    }

    return (
        <div>
            <button onClick={handleClick}>+1</button>
            <button onClick={getCount}>延迟获取 count 值</button>
            <h1>计数器：{count}</h1>
        </div>
    )
}
```

## 内容管理-**useRef**优化分页功能

### 目标

能够使用 useRef 优化分页功能

-   思路：表单搜索数据时，将筛选条件数据保存到 `useRef` 创建的 ref 对象中。在分页时直接从 ref 对象中取出表单筛选数据即可
-   为什么要使用 `useRef` hook？
    -   因为 `useRef` hook 创建的对象，能够**在组件更新期间维持一个值**。
    -   这样，在筛选时选中的数据就会被存储起来，将来在分页时就可以使用了
    -   React 函数组件的特点：函数组件每次更新时，都会重新执行函数中的所有代码，因此，函数中的变量、函数等都会重新创建。所以，如果使用一个普通的变量是无法实现的。
-   `useRef` hook 创建的 ref 对象的特点：
    1. ref 对象有一个 current 属性，值存储在该 current 对象中
    2. 该 ref 对象可以存储任意值
    3. 修改 ref 对象的值不会导致组件重新渲染

### 步骤

1. 导入 `useRef` hook，并创建一个 ref 对象
2. 筛选表单数据时，将筛选数据存储到 ref 对象中
3. 在分页时，从 ref 对象中拿到筛选数据

### 代码

pages/Article/index.js 中：

```js
const params = useRef({})


// 筛选的时候，把参数存放到ref中
const onFinish = (values) => {
  if (values.status !== -1) {
    params.current.status = values.status
  }

  params.current.channel_id = values.channel_id
  if (values.date) {
    params.current.begin_pubdate = values.date[0]
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss')
    params.current.end_pubdate = values.date[1]
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss')
  }
  // 从第一页开始筛选
  params.current.page = 1
  dispatch(getArticleList(params.current))
  // console.log(params.current)
}

// 分页的时候，也把参数放到ref
pagination={{
  position: ['bottomCenter'],
  total: articles.total_count,
  pageSize: articles.per_page,
  current: articles.page,
  onChange(page, pageSize) {
    params.current.page = page
    params.current.per_page = pageSize
    dispatch(getArticleList(params.current))
  }
}}
```

### 总结

1. 如果要在组件更新期间维持一个值不变，用哪个 hook？

2. 修改 useRef 创建的 ref 对象中的值会导致组件重新渲染吗？

## 内容管理-删除文章（弹窗确认）

### 目标

能够实现点击删除按钮时弹窗确认

### 步骤

1. 给删除文章按钮绑定点击事件

2. 弹出确认窗口，询问用户是否确定删除文章

### 代码

-   提供一个删除的 action

```jsx
export const delArticle = (id) => {
    return async () => {
        await request({
            method: 'delete',
            url: `/mp/articles/${id}`,
        })
    }
}
```

-   在组件中，弹窗提醒

```jsx
{
  title: '操作',
  dataIndex: 'id',
  render(id) {
    return (
      <Space>
        <Button shape="circle" type="primary" icon={<EditOutlined />} />
        <Popconfirm title="确定要删除该文章吗？" onConfirm={() => del(id)}>
          <Button shape="circle" type="danger" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    )
  }
}
```

-   提供 del 方法，进行删除

```jsx
const del = async (id) => {
    await dispatch(delArticle(id))
    // 重新发送请求
    await dispatch(getArticleList(params.current))
    message.success('删除成功')
}
```

## 内容管理-编辑文章跳转

### 目标

能够实现编辑文章跳转功能

### 代码

pages/Article/index.js 中：

```js
const columns = [
    // ...
    {
        title: '操作',
        render: (data) => (
            <Space size='middle'>
                <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={() => history.push(`/home/publish/${data.id}`)} />
            </Space>
        ),
    },
]
```
