---
title: react-music
date: 2020-08-23 00:24:26
tags:
---

网易云音乐

<!-- more -->

## 目录结构

```
|-- public
|   |-- favicon.ico
|   `-- index.html 
|-- src
|   |-- App.jsx
|   |-- assets
|   |   |-- css
|   |   |-- font
|   |   `-- img
|   |-- common
|   |-- components
|   |-- index.js
|   |-- pages
|   |-- router
|   |-- services
|   |-- store
|   `-- utils
```

## 样式重置

`src/assets/css/reset.css`

```css
@import "~normalize.css";

/* 样式的重置 */
body,
html,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
dl,
dt,
dd,
header,
menu,
section,
p,
input,
td,
th,
ins {
    padding: 0;
    margin: 0;
}

ul,
ol,
li {
    list-style: none;
}

a {
    text-decoration: none;
    color: #666;
}

a:hover {
    color: #666;
    text-decoration: underline;
}

i,
em {
    font-style: normal;
}

input,
textarea,
button,
select,
a {
    outline: none;
    border: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

img {
    border: none;
    vertical-align: middle;
}

/* 全局样式 */
body,
textarea,
select,
input,
button {
    font-size: 12px;
    color: #333;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f5f5f5;
}

.text-nowrap {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.wrap-v1 {
    width: 1100px;
    margin: 0 auto;
}

.wrap-v2 {
    width: 980px;
    margin: 0 auto;
}

.sprite_01 {
    background: url(../img/sprite_01.png) no-repeat 0 9999px;
}

.sprite_02 {
    background: url(../img/sprite_02.png) no-repeat 0 9999px;
}

.sprite_covor {
    background: url(../img/sprite_cover.png) no-repeat 0 9999px;
}

.sprite_icon {
    background: url(../img/sprite_icon.png) no-repeat 0 9999px;
}

.sprite_icon2 {
    background: url(../img/sprite_icon2.png) no-repeat 0 9999px;
}

.sprite_button {
    background: url(../img/sprite_button.png) no-repeat 0 9999px;
}

.sprite_button2 {
    background: url(../img/sprite_button2.png) no-repeat 0 9999px;
}

.sprite_table {
    background: url(../img/sprite_table.png) no-repeat 0 9999px;
}

.image_cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-indent: -9999px;
    background: url(../img/sprite_cover.png) no-repeat -145px -57px;
}

.sprite_player {
    background: url(../img/playbar_sprite.png) no-repeat 0 9999px;
}

.lyric-class .ant-message-notice-content {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;
}
```

## 配置别名

```
yarn add @craco/craco
```

`craco.config.js`

```javascript
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
    webpack: {
        alias: {
            "@": resolve("src"),
            "components": resolve("src/components")
        }
    }
};
```

`package.json`

```javascript
{
    "scripts": {
        "start": "craco start",
        "build": "craco build",
        "test": "craco test",
        "eject": "react-scripts eject"
    }
}
```

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import "@/assets/css/reset.css";
import App from './App';

ReactDOM.render(<App/>, document.querySelector('#root'));
```

## 路由配置

```
yarn add react-router-dom react-router-config
```

`src/App.jsx`

```javascript
import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter as Router } from 'react-router-dom';

import routes from './router';

import YKAppHeader from '@/components/app-header';
import YKAppFooter from '@/components/app-footer';

export default memo(function App() {
    return (
        <Router>
            <YKAppHeader />
            {renderRoutes(routes)}
            <YKAppFooter />
        </Router>
    );
});
```

`src/components/app-footer/index.jsx`

```javascript
import React, { memo } from 'react'

export default memo(function YKAppFooter() {
    return (
        <div>
            Footer
        </div>
    )
})
```

`src/components/app-header/index.jsx`

```javascript
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

export default memo(function YKAppHeader() {
    return (
        <div>
            <NavLink to="/">发现音乐</NavLink>
            <NavLink to="/mine">我的音乐</NavLink>
            <NavLink to="/friend">我的朋友</NavLink>
        </div>
    );
});
```

`src/pages/discover/index.jsx`

```javascript
import React, { memo } from 'react';

export default memo(function YKDiscover() {
    return <div>YKDiscover</div>;
});
```

`src/pages/friend/index.jsx`

```javascript
import React, { memo } from 'react';

export default memo(function YKFriend() {
    return <div>YKFriend</div>;
});
```

`src/pages/mine/index.jsx`

```javascript
import React, { memo } from 'react';

export default memo(function YKMine() {
    return <div>YKMine</div>;
});
```

`src/router/index.js`

```javascript
import YKDiscover from '@/pages/discover';
import YKFriend from '@/pages/friend';
import YKMine from '@/pages/mine';
const routes = [{
    path: '/',
    exact: true,
    component: YKDiscover
}, {
    path: '/mine',
    component: YKMine
}, {
    path: '/friend',
    component: YKFriend
}];

export default routes;
```

## 头部样式

```
yarn add styled-components antd @ant-design/icons
```

`src/assets/css/reset.css`

```
@import "~antd/dist/antd.css";
```

`src/common/local-data.js`

```javascript
export const headerLinks = [{
        title: "发现音乐",
        link: "/"
    },
    {
        title: "我的音乐",
        link: "/mine"
    },
    {
        title: "朋友",
        link: "/friend"
    },
    {
        title: "商城",
        link: "https://music.163.com/store/product"
    },
    {
        title: "音乐人",
        link: "https://music.163.com/nmusician/web/index#/"
    },
    {
        title: "下载客户端",
        link: "https://music.163.com/#/download"
    }
]

export const footerLinks = [{
        title: "服务条款",
        link: "https://st.music.163.com/official-terms/service"
    },
    {
        title: "隐私政策",
        link: "https://st.music.163.com/official-terms/privacy"
    },
    {
        title: "儿童隐私政策",
        link: "https://st.music.163.com/official-terms/children"
    },
    {
        title: "版权投诉指引",
        link: "https://music.163.com/st/staticdeal/complaints.html"
    },
    {
        title: "意见反馈",
        link: "#"
    }
]

export const footerImages = [{
        link: "https://music.163.com/st/userbasic#/auth"
    },
    {
        link: "https://music.163.com/recruit"
    },
    {
        link: "https://music.163.com/web/reward"
    },
    {
        link: "https://music.163.com/uservideo#/plan"
    }
]

// discover中的数据
export const dicoverMenu = [{
        title: "推荐",
        link: "/discover/recommend"
    },
    {
        title: "排行榜",
        link: "/discover/ranking"
    },
    {
        title: "歌单",
        link: "/discover/songs"
    },
    {
        title: "主播电台",
        link: "/discover/djradio"
    },
    {
        title: "歌手",
        link: "/discover/artist"
    },
    {
        title: "新碟上架",
        link: "/discover/album"
    },
]
```

`src/components/app-footer/index.jsx`

```javascript
import React, { memo, Fragment } from 'react';

import { footerLinks, footerImages } from '@/common/local-data';

import { AppFooterWrapper, FooterLeft, FooterRight } from './style';

export default memo(function YKAppFooter() {
    return (
        <AppFooterWrapper>
            <div className="wrap-v2 content">
                <FooterLeft className="left">
                    <div className="link">
                        {footerLinks.map(item => {
                            return (
                                <Fragment key={item.title}>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.title}
                                    </a>
                                    <span className="line">|</span>
                                </Fragment>
                            );
                        })}
                    </div>
                    <div className="copyright">
                        <span>网易公司版权所有©1997-2020</span>
                        <span>
                            杭州乐读科技有限公司运营：
                            <a
                                href="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                浙网文[2018]3506-263号
                            </a>
                        </span>
                    </div>
                    <div className="report">
                        <span>违法和不良信息举报电话：0571-89853516</span>
                        <span>
                            举报邮箱：
                            <a
                                href="mailto:ncm5990@163.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ncm5990@163.com
                            </a>
                        </span>
                    </div>
                    <div className="info">
                        <span>粤B2-20090191-18</span>
                        <a
                            href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            工业和信息化部备案管理系统网站
                        </a>
                    </div>
                </FooterLeft>
                <FooterRight className="right">
                    {footerImages.map((item, index) => {
                        return (
                            <li className="item" key={item.link}>
                                <a
                                    className="link"
                                    href={item.link}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {' '}
                                </a>
                                <span className="title">
                                    {item.title}
                                </span>
                            </li>
                        );
                    })}
                </FooterRight>
            </div>
        </AppFooterWrapper>
    );
});
```

`src/components/app-footer/style.js`

```javascript
import styled from 'styled-components';

export const AppFooterWrapper = styled.div `
    height: 172px;
    background-color: #f2f2f2;
    color: #666;
    border-top: 1px solid #d3d3d3;

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

export const FooterLeft = styled.div `
    padding-top: 15px;
    line-height: 24px;

    .link {
        a {
            color: #999;
        }

        .line {
            margin: 0 10px;
            color: #999;
        }
    }

    .copyright {
        span {
            margin-right: 15px;
        }
    }
`

export const FooterRight = styled.ul `
    display: flex;

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;

        .link {
            display: block;
            width: 50px;
            height: 45px;

            background-image: url(${require("@/assets/img/sprite_footer_02.png")});
            background-size: 110px 450px;
        }

        :nth-child(1) .link {
            background-position: -60px -101px;
        }
        :nth-child(2) .link {
            background-position: 0 0;
        }
        :nth-child(3) .link {
            background-position: -60px -50px;
        }
        :nth-child(4) .link {
            background-position: 0 -101px;
        }

        .title {
            margin-top: 5px;
            display: block;
            width: 52px;
            height: 10px;
            background-image: url(${require("@/assets/img/sprite_footer_01.png")});
            background-size: 180px 100px;
        }

        :nth-child(1) .title {
            background-position: -1px -90px;
        }
        :nth-child(2) .title {
            background-position: 0 0;
            margin-top: 7px;
        }
        :nth-child(3) .title {
            background-position: 0 -54px;
            margin-top: 6px;
        }

        :nth-child(4) .title {
            background-position: -1px -72px;
            margin-top: 6px;
        }
    }
`
```

`src/components/app-header/index.jsx`

```javascript
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { headerLinks } from '@/common/local-data';

import { HeaderWrapper, HeaderLeft, HeaderRight } from './style';

export default memo(function YKAppHeader() {
    // 业务代码
    const showSelectItem = (item, index) => {
        if (index < 3) {
            return (
                <NavLink to={item.link} exact>
                    {item.title}
                    <i className="sprite_01 icon" />
                </NavLink>
            );
        } else {
            return (
                <a href={item.link}>
                    {item.title}
                </a>
            );
        }
    };
    return (
        <HeaderWrapper>
            <div className="content wrap-v1">
                <HeaderLeft>
                    <a href="#/" className="logo sprite_01">
                        网抑云
                    </a>
                    <div className="select-list">
                        {headerLinks.map((item, index) => {
                            return (
                                <div key={item.title} className="select-item">
                                    {showSelectItem(item, index)}
                                </div>
                            );
                        })}
                    </div>
                </HeaderLeft>
                <HeaderRight>
                    <Input
                        className="search"
                        placeholder="音乐/视频/电台/用户"
                        prefix={<SearchOutlined />}
                    />
                    <div className="center">创作者中心</div>
                    <div>登录</div>
                </HeaderRight>
            </div>
            <div className="divider" />
        </HeaderWrapper>
    );
});
```

`src/components/app-header/style.js`

```javascript
import styled from "styled-components";

export const HeaderWrapper = styled.div `
    height: 75px;
    font-size: 14px;
    color: #fff;
    background-color: #242424;

    .content {
        height: 70px;

        display: flex;
        justify-content: space-between;
    }

    .divider {
        height: 5px;
        background-color: #C20C0C;
    }
`

export const HeaderLeft = styled.div `
    display: flex;

    .logo {
        display: block;
        width: 176px;
        height: 69px;
        background-position: 0 0;
        text-indent: -9999px;
    }

    .select-list {
        display: flex;
        line-height: 70px;
        
        .select-item {
            position: relative;
            a {
                display: block;
                padding: 0 20px;
                color: #ccc;
            }

            :last-of-type a {
                position: relative;
                ::after {
                    position: absolute;
                    content: "";
                    width: 28px;
                    height: 19px;
                    background-image: url(${require("@/assets/img/sprite_01.png")});
                    background-position: -190px 0;
                    top: 20px;
                    right: -15px;
                }
            }

            &:hover a, a.active {
                color: #fff;
                background: #000;
                text-decoration: none;
            }
            
            .active .icon {
                position: absolute;
                display: inline-block;
                width: 12px;
                height: 7px;
                bottom: -1px;
                left: 50%;
                transform: translate(-50%, 0);
                background-position: -226px 0;
            }
        }
    }
`

export const HeaderRight = styled.div `
    display: flex;
    align-items: center;
    color: #ccc;
    font-size: 12px;


    .search {
        width: 158px;
        height: 32px;
        border-radius: 16px;

        input {
            &::placeholder {
                font-size: 12px;
            }
        }
    }

    .center {
        width: 90px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #666;
        border-radius: 16px;
        margin: 0 16px;
        background-color: transparent;
    }
`
```

## 路由优化

`src/common/local-data.js`

```javascript
export const headerLinks = [{
        title: "发现音乐",
        link: "/discover"
    },
]
```

`src/components/app-header/index.jsx`

```javascript
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { headerLinks } from '@/common/local-data';

import { HeaderWrapper, HeaderLeft, HeaderRight } from './style';

export default memo(function YKAppHeader() {
    // 业务代码
    const showSelectItem = (item, index) => {
        if (index < 3) {
            // 这里去掉了 exact
            return (
                <NavLink to={item.link}>
                    {item.title}
                    <i className="sprite_01 icon" />
                </NavLink>
            );
        } else {
            return (
                <a href={item.link}>
                    {item.title}
                </a>
            );
        }
    };
});
```

`src/router/index.js`

```javascript
import React from 'react';
import { Redirect } from 'react-router-dom';
const routes = [{
    path: '/',
    exact: true,
    render: () => (<Redirect to="/discover"/>)
}, {
    path: '/discover',
    component: YKDiscover
}];
```

## discover 二级路由配置

`src/common/local-data.js`

准备 discoverMenu，二级路由数据

`src/pages/discover/index.jsx`

```javascript
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { discoverMenu } from '@/common/local-data';
import { DiscoverWrapper, TopMenu } from './style';

export default memo(function YKDiscover(props) {
    const { route } = props;
    return (
        <DiscoverWrapper>
            <div className="top">
                <TopMenu className="wrap-v1">
                    {discoverMenu.map((item, index) => {
                        return (
                            <div className="item" key={item.title}>
                                <NavLink to={item.link}>
                                    {item.title}
                                </NavLink>
                            </div>
                        );
                    })}
                </TopMenu>
            </div>
            {renderRoutes(route.routes)}
        </DiscoverWrapper>
    );
});
```

`src/pages/discover/style.js`

```javascript
import styled from 'styled-components';

export const DiscoverWrapper = styled.div`
    .top {
        height: 30px;
        background-color: #C20C0C;
    }
`

export const TopMenu = styled.div`
    display: flex;
    padding-left: 180px;
    position: relative;
    top: -4px;

    .item {
        a {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            padding: 0 13px;
            margin: 7px 17px 0;
            color: #fff;

            &:hover, &.active {
                text-decoration: none;
                background-color: #9B0909;
                border-radius: 20px;
            }
        }
    }
`
```

`src/pages/discover/c-pages/album/index.jsx`

```javascript
import React, { memo } from 'react'

export default memo(function YKAlbum() {
    return (
        <div>
            YKAlbum
        </div>
    )
})
```

`src/pages/discover/c-pages/artist/index.jsx`

```javascript
import React, { memo } from 'react'

export default memo(function YKArtist() {
    return (
        <div>
            YKArtist
        </div>
    )
})
```

`src/pages/discover/c-pages/djradio/index.jsx`

```javascript
import React, { memo } from 'react'

export default memo(function YKDjradio() {
    return (
        <div>
            YKDjradio
        </div>
    )
})
```

`src/pages/discover/c-pages/ranking/index.jsx`

```javascript
import React, { memo } from 'react'

export default memo(function YKRanking() {
    return (
        <div>
            YKRanking
        </div>
    )
})
```

`src/pages/discover/c-pages/recommend/index.jsx`

```javascript
import React, { memo } from 'react'

export default memo(function YKRecommend() {
    return (
        <div>
            YKRecommend
        </div>
    )
})
```

`src/pages/discover/c-pages/songs/index.jsx`

```javascript
import React, { memo } from 'react'

export default memo(function YKSongs() {
    return (
        <div>
            YKSongs
        </div>
    )
})
```

`src/router/index.js`

```javascript
import React from 'react';
import {
    Redirect
} from 'react-router-dom';
// 发现及其子路由
import YKDiscover from '@/pages/discover';
import YKRecommend from "../pages/discover/c-pages/recommend";
import YKRanking from "../pages/discover/c-pages/ranking";
import YKSongs from "../pages/discover/c-pages/songs";
import YKDjradio from "../pages/discover/c-pages/djradio";
import YKArtist from "../pages/discover/c-pages/artist";
import YKAlbum from "../pages/discover/c-pages/album";

import YKFriend from '@/pages/friend';
import YKMine from '@/pages/mine';

const routes = [{
    path: '/',
    exact: true,
    render: () => ( < Redirect to = "/discover" / > )
}, {
    path: '/discover',
    component: YKDiscover,
    routes: [
        {
            path: "/discover",
            exact: true,
            render: () => (
              <Redirect to="/discover/recommend"/>
            )
        },{
            path: "/discover/recommend",
            component: YKRecommend
        },
        {
            path: "/discover/ranking",
            component: YKRanking
        },
        {
            path: "/discover/songs",
            component: YKSongs
        },
        {
            path: "/discover/djradio",
            exact: true,
            component: YKDjradio
        },
        {
            path: "/discover/artist",
            component: YKArtist
        },
        {
            path: "/discover/album",
            component: YKAlbum
        },
    ]
}, {
    path: '/mine',
    component: YKMine
}, {
    path: '/friend',
    component: YKFriend
}];

export default routes;
```

## axios 请求数据

`src/services/config.js`

```javascript
const devBaseURL = "http://123.207.32.32:9001";
const proBaseURL = "http://123.207.32.32:9001";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;
export const TIMEOUT = 5000;
```

`src/services/request.js`

```javascript
import axios from 'axios';

import {
    BASE_URL,
    TIMEOUT
} from "./config";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
});

instance.interceptors.request.use(config => {
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件

    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面

    // 3.params/data序列化的操作

    return config;
}, err => {

});

instance.interceptors.response.use(res => {
    return res.data;
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                console.log("请求错误");
                break;
            case 401:
                console.log("未授权访问");
                break;
            default:
                console.log("其他错误信息");
        }
    }
    return err;
});

export default instance;
```

`src/pages/discover/index.jsx`

```javascript
import request from '@/services/request';

export default memo(function YKDiscover(props) {
    const { route } = props;
    useEffect(() => {
        request({
            url: '/banner',
        }).then(res => {
            console.log(res);
        });
    }, []);
    return (
        
    );
});
```

## 配置 Redux

```
yarn add redux react-redux redux-thunk
```

`src/App.jsx`

```javascript
import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './router';
import store from './store';

import YKAppHeader from '@/components/app-header';
import YKAppFooter from '@/components/app-footer';

export default memo(function App() {
    return (
        <Provider store={store}>
            <Router>
                <YKAppHeader />
                {renderRoutes(routes)}
                <YKAppFooter />
            </Router>
        </Provider>
    );
});
```

`src/pages/discover/c-pages/recommend/store/actionTypes.js`

```javascript
export const CHANGE_TOP_BANNERS = "recommend/CHANGE_TOP_BANNERS";
```

`src/pages/discover/c-pages/recommend/store/index.js`

```javascript
import reducer from './reducer';
export { reducer };
```

`src/pages/discover/c-pages/recommend/store/reducer.js`

```javascript
import * as actionTypes from './actionTypes';
const defaultState = {
    topBanners: []
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TOP_BANNERS:
            return {
                ...state,
                topBanners: []
            };
        default:
            return state;
    }
}
```

`src/store/index.js`

```javascript
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
```

`src/store/reducer.js`

```javascript
import { combineReducers } from 'redux';
import { reducer as recommendReducer } from '../pages/discover/c-pages/recommend/store';

export default combineReducers({
    recommend: recommendReducer
});
```

## 推荐数据的获取流程并存储到 Redux

`src/pages/discover/c-pages/recommend/index.jsx`

```javascript
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTopBannerAction } from './store/actionCreators';

function YKRecommend(props) {
    const { getBanners, topBanners } = props;
    useEffect(
        () => {
            getBanners();
        },
        [getBanners]
    );
    return (
        <div>
            YKRecommend: {topBanners.length}
        </div>
    );
}

const mapStateToState = state => ({
    topBanners: state.recommend.topBanners,
});
const mapDispatchToProps = dispatch => ({
    getBanners: () => {
        dispatch(getTopBannerAction());
    },
});

export default connect(mapStateToState, mapDispatchToProps)(memo(YKRecommend));
```

`src/pages/discover/c-pages/recommend/store/actionCreators.js`

```javascript
import * as actionTypes from './actionTypes';
import { getTopBanners } from '@/services/recommend';

const changeTopBannerAction = res => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners: res.banners   
});

export const getTopBannerAction = () => {
    return dispatch => {
        getTopBanners().then(res => {
            dispatch(changeTopBannerAction(res));
        });
    };
};
```

`src/pages/discover/c-pages/recommend/store/reducer.js`

```javascript
import * as actionTypes from './actionTypes';
const defaultState = {
    topBanners: []
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TOP_BANNERS:
            return {
                ...state,
                topBanners: action.topBanners
            };
        default:
            return state;
    }
}
```

`src/services/recommend.js`

```javascript
import request from './request';

export function getTopBanners() {
    return request({
        url: '/banner'
    });
}
```

## useDispatch 和 useSelector 优化上面代码

`src/pages/discover/c-pages/recommend/index.jsx`

```javascript
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getTopBannerAction } from './store/actionCreators';

function YKRecommend() {
    const { topBanners } = useSelector(
        state => ({
            topBanners: state.recommend.topBanners,
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(getTopBannerAction());
        },
        [dispatch]
    );
    return (
        <div>
            YKRecommend: {topBanners.length}
        </div>
    );
}

export default memo(YKRecommend);
```

## 项目中集成 immutable

```
yarn add immutable redux-immutable
```

`src/pages/discover/c-pages/recommend/store/reducer.js`

```javascript
import { Map } from 'immutable';
import * as actionTypes from './actionTypes';
const defaultState = Map({
    topBanners: []
});

export default function (state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TOP_BANNERS:
            return state.set('topBanners', action.topBanners);
        default:
            return state;
    }
}
```

`src/store/reducer.js`

```javascript
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../pages/discover/c-pages/recommend/store';

export default combineReducers({
    recommend: recommendReducer
});
```

`src/pages/discover/c-pages/recommend/index.jsx`

```javascript
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getTopBannerAction } from './store/actionCreators';

function YKRecommend() {
    const { topBanners } = useSelector(
        state => ({
            // topBanners: state.get('recommend').get('topBanners'),
            topBanners: state.getIn(['recommend', 'topBanners']),
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(getTopBannerAction());
        },
        [dispatch]
    );
    return (
        <div>
            YKRecommend: {topBanners.length}
        </div>
    );
}

export default memo(YKRecommend);
```

## 轮播图

`src/pages/discover/c-pages/recommend/index.jsx`

```javascript
import React, { memo } from 'react';
import TopBanner from './c-cpns/top-banner';
import { RecommendWrapper } from './style';

function YKRecommend() {
    return (
        <RecommendWrapper>
            <TopBanner/>
        </RecommendWrapper>
    );
}

export default memo(YKRecommend);
```

`src/pages/discover/c-pages/recommend/style.js`

```javascript
import styled from 'styled-components';

export const RecommendWrapper = styled.div``;
```

`src/pages/discover/c-pages/recommend/c-cpns/top-banner/index.jsx`

```javascript
// 第三方的
import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// 功能性的
import { getTopBannerAction } from '../../store/actionCreators';

// 组件的
import { Carousel } from 'antd';
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from './style';

export default memo(function YKTopBanner() {
    // state
    const [currentIndex, setCurrentIndex] = useState(0);
    // 组件和 redux 关联，获取/操作数据
    const { topBanners } = useSelector(
        state => ({
            // topBanners: state.get('recommend').get('topBanners'),
            topBanners: state.getIn(['recommend', 'topBanners']),
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    const bannerRef = useRef();
    // 其他 hooks
    useEffect(
        () => {
            dispatch(getTopBannerAction());
        },
        [dispatch]
    );
    const beforeChange = useCallback((from, to) => {
        setCurrentIndex(to);
    }, []);
    // 其他逻辑
    const bgImage =
        topBanners[currentIndex] &&
        topBanners[currentIndex].imageUrl + '?imageView&blur=40x20';
    return (
        <BannerWrapper bgImage={bgImage}>
            <div className="banner wrap-v2">
                <BannerLeft>
                    <Carousel
                        effect="fade"
                        autoplay
                        ref={bannerRef}
                        beforeChange={beforeChange}
                    >
                        {topBanners.map((item, index) => {
                            return (
                                <div
                                    className="banner-item"
                                    key={item.imageUrl}
                                >
                                    <img
                                        className="image"
                                        src={item.imageUrl}
                                        alt={item.typeTitle}
                                    />
                                </div>
                            );
                        })}
                    </Carousel>
                </BannerLeft>
                <BannerRight />
                <BannerControl>
                    <button
                        className="btn left"
                        onClick={e => bannerRef.current.prev()}
                    />
                    <button
                        className="btn right"
                        onClick={e => bannerRef.current.next()}
                    />
                </BannerControl>
            </div>
        </BannerWrapper>
    );
});
```

`src/pages/discover/c-pages/recommend/c-cpns/top-banner/style.js`

```javascript
import styled from 'styled-components';

export const BannerWrapper = styled.div `
    background: url(${props => props.bgImage}) center center/6000px;

    .banner {
        height: 270px;
        background-color: red;

        display: flex;
        position: relative;
    }
`

export const BannerLeft = styled.div `
    width: 730px;

    .banner-item {
        overflow: hidden;
        height: 270px;
        .image {
            width: 100%;
        }
    }
`

export const BannerRight = styled.a.attrs({
    href: "https://music.163.com/#/download",
    target: "_blank"
})
`
    width: 254px;
    height: 270px;
    background: url(${require("@/assets/img/download.png")});
`

export const BannerControl = styled.div `
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    .btn {
        position: absolute;
        width: 37px;
        height: 63px;
        background-image: url(${require("@/assets/img/banner_sprite.png")});
        background-color: transparent;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, .1);
        }
    }

    .left {
        left: -68px;
        background-position: 0 -360px;
    }

    .right {
        right: -68px;
        background-position: 0 -508px;
    }
`
```

## 标题组件

`src/components/theme-header-rcm/index.jsx`

```javascript
import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { HeaderWrapper } from './style';

const YKThemeHeaderRCM = memo(function(props) {
    const { title, keywords } = props;

    return (
        <HeaderWrapper className="sprite_02">
            <div className="left">
                <h3 className="title">
                    {title}
                </h3>
                <div className="keyword">
                    {keywords.map((item, index) => {
                        return (
                            <div className="item" key={item}>
                                <a href="todo">
                                    {item}
                                </a>
                                <span className="divider">|</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="right">
                <a href="todo">更多</a>
                <i className="icon sprite_02" />
            </div>
        </HeaderWrapper>
    );
});

YKThemeHeaderRCM.propTypes = {
    title: PropTypes.string.isRequired,
    keywords: PropTypes.array,
};

YKThemeHeaderRCM.defaultProps = {
    keywords: [],
};

export default YKThemeHeaderRCM;
```

`src/components/theme-header-rcm/style.js`

```javascript
import styled from 'styled-components';

export const HeaderWrapper = styled.div `
    height: 33px;
    border-bottom: 2px solid #C10D0C;
    padding: 0 10px 4px 34px;
    background-position: -225px -156px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        display: flex;
        align-items: center;

        .title {
            font-size: 20px;
            font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
            margin-right: 20px;
        }

        .keyword {
            display: flex;

        .item {
                .divider {
                    margin: 0 15px;
                    color: #ccc;
                }
            }
        }
    }

    .right {
        display: flex;
        align-items: center;
        .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-left: 4px;
            background-position: 0 -240px;
        }
    }
`
```

`src/pages/discover/c-pages/recommend/c-cpns/hot-recommend/index.jsx`

```javascript
import React, { memo } from 'react';
import YKThemeHeaderRCM from '@/components/theme-header-rcm';
import { HotRecommendWrapper } from './style';

export default memo(function YKHotRecommend() {
    return (
        <HotRecommendWrapper>
            <YKThemeHeaderRCM
                title="热门推荐"
                keywords={['华语', '流行', '民谣', '摇滚', '电子']}
            />
        </HotRecommendWrapper>
    );
});
```

`src/pages/discover/c-pages/recommend/c-cpns/hot-recommend/style.js`

```javascript
import styled from "styled-components";

export const HotRecommendWrapper = styled.div`
    .recommend-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
`
```

`src/pages/discover/c-pages/recommend/index.jsx`

```javascript
import React, { memo } from 'react';
import TopBanner from './c-cpns/top-banner';
import YKHotRecommend from './c-cpns/hot-recommend';
import { RecommendWrapper, Content, RecommendLeft, RecommendRight } from './style';

function YKRecommend() {
    return (
        <RecommendWrapper>
            <TopBanner/>
            <Content className="wrap-v2">
                <RecommendLeft>
                    <YKHotRecommend/>
                </RecommendLeft>
                <RecommendRight></RecommendRight>
            </Content>
        </RecommendWrapper>
    );
}

export default memo(YKRecommend);
```

`src/pages/discover/c-pages/recommend/style.js`

```javascript
import styled from 'styled-components';

export const RecommendWrapper = styled.div`

`

export const Content = styled.div`
    background-color: #fff;
    display: flex;
`

export const RecommendLeft = styled.div`
    padding: 20px;
    width: 729px;
`

export const RecommendRight = styled.div`
    width: 250px;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
`
```

## 获取推荐数据

`src/common/constants.js`

```javascript
export const HOT_RECOMMEND_LIMIT = 8;
```

`src/pages/discover/c-pages/recommend/c-cpns/hot-recommend/index.jsx`

```javascript
import React, { memo, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
// 组件
import YKThemeHeaderRCM from '@/components/theme-header-rcm';
// 功能
import { getHotRecommendAction } from '../../store/actionCreators';
import { HOT_RECOMMEND_LIMIT } from '@/common/constants';
// 样式
import { HotRecommendWrapper } from './style';

export default memo(function YKHotRecommend() {
    // redux hooks
    const { hotRecommends } = useSelector(
        state => ({
            hotRecommends: state.getIn(['recommend', 'hotRecommends']),
        }),
        shallowEqual
    );
    const dispatch = useDispatch();

    // other hooks
    useEffect(
        () => {
            dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT));
        },
        [dispatch]
    );
    console.log(hotRecommends);
    return (
        <HotRecommendWrapper>
            <YKThemeHeaderRCM
                title="热门推荐"
                keywords={['华语', '流行', '民谣', '摇滚', '电子']}
            />
        </HotRecommendWrapper>
    );
});
```

`src/pages/discover/c-pages/recommend/store/actionCreators.js`

```javascript
import * as actionTypes from './actionTypes';
import { getTopBanners, getHotRecommends } from '@/services/recommend';

const changeTopBannerAction = res => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners: res.banners   
});

export const getTopBannerAction = () => {
    return dispatch => {
        getTopBanners().then(res => {
            dispatch(changeTopBannerAction(res));
        });
    };
};

const changeHotRecommendAction = (res) => ({
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    hotRecommends: res.result
})

export const getHotRecommendAction = (limit) => {
    return dispatch => {
        getHotRecommends(limit).then(res => {
            dispatch(changeHotRecommendAction(res));
        });
    }
}
```

`src/pages/discover/c-pages/recommend/store/actionTypes.js`

```javascript
export const CHANGE_TOP_BANNERS = "recommend/CHANGE_TOP_BANNERS";
export const CHANGE_HOT_RECOMMEND = "recommend/CHANGE_HOT_RECOMMEND";
```

`src/pages/discover/c-pages/recommend/store/reducer.js`

```javascript
import { Map } from 'immutable';
import * as actionTypes from './actionTypes';
const defaultState = Map({
    topBanners: [],
    hotRecommends: []
});

export default function (state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TOP_BANNERS:
            return state.set('topBanners', action.topBanners);
        case actionTypes.CHANGE_HOT_RECOMMEND:
            return state.set("hotRecommends", action.hotRecommends);
        default:
            return state;
    }
}
```

`src/services/recommend.js`

```javascript
import request from './request';

export function getTopBanners() {
    return request({
        url: '/banner'
    });
}
export function getHotRecommends(limit) {
    return request({
        url: "/personalized",
        params: {
            limit
        }
    })
}
```

## 渲染推荐内容

`src/components/songs-cover/index.jsx`

```javascript
import React, { memo } from 'react';

import { getCount, getSizeImage } from '@/utils/format-utils';

import { SongsCoverWrapper } from './style';

export default memo(function HYSongsCover(props) {
    const { info } = props;

    return (
        <SongsCoverWrapper>
            <div className="cover-top">
                <img src={getSizeImage(info.picUrl, 140)} alt="" />
                <div className="cover sprite_covor">
                    <div className="info sprite_covor">
                        <span>
                            <i className="sprite_icon erji" />
                            {getCount(info.playCount)}
                        </span>
                        <i className="sprite_icon play" />
                    </div>
                </div>
            </div>
            <div className="cover-bottom text-nowrap">
                {info.name}
            </div>
            <div className="cover-source text-nowrap">
                by {info.copywriter || info.creator.nickname}
            </div>
        </SongsCoverWrapper>
    );
});
```

`src/components/songs-cover/style.js`

```javascript
import styled from "styled-components";

export const SongsCoverWrapper = styled.div`
    width: 140px;
    margin: 20px ${props => (props.right || 0)} 20px 0;

    .cover-top {
        position: relative;

        &>img {
            width: 140px;
            height: 140px;
        }
        
        .cover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-position: 0 0;

            .info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 10px;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background-position: 0 -537px;
                color: #ccc;
                height: 27px;

                .erji {
                    margin-right: 5px;
                    display: inline-block;
                    width: 14px;
                    height: 11px;
                    background-position: 0 -24px;
                }

                .play {
                    display: inline-block;
                    width: 16px;
                    height: 17px;
                    background-position: 0 0;
                }
            }
        }
    }

    .cover-bottom {
        font-size: 14px;
        color: #000;
        margin-top: 5px;
    }

    .cover-source {
        color: #666;
    }
`
```

`src/pages/discover/c-pages/recommend/c-cpns/hot-recommend/index.jsx`

```javascript
import React, { memo, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
// 组件
import YKThemeHeaderRCM from '@/components/theme-header-rcm';
import YKSongsCover from '@/components/songs-cover';
// 功能
import { getHotRecommendAction } from '../../store/actionCreators';
import { HOT_RECOMMEND_LIMIT } from '@/common/constants';
// 样式
import { HotRecommendWrapper } from './style';

export default memo(function YKHotRecommend() {
    // redux hooks
    const { hotRecommends } = useSelector(
        state => ({
            hotRecommends: state.getIn(['recommend', 'hotRecommends']),
        }),
        shallowEqual
    );
    const dispatch = useDispatch();

    // other hooks
    useEffect(
        () => {
            dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT));
        },
        [dispatch]
    );
    return (
        <HotRecommendWrapper>
            <YKThemeHeaderRCM
                title="热门推荐"
                keywords={['华语', '流行', '民谣', '摇滚', '电子']}
            />
            <div className="recommend-list">
                {hotRecommends.map(item => {
                    return <YKSongsCover key={item.id} info={item} />;
                })}
            </div>
        </HotRecommendWrapper>
    );
});
```

`/src/utils/format-utils.js`

```javascript
export function getCount(count) {
    if (count < 0) return;
    if (count < 10000) {
        return count;
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count / 1000) / 10 + "万";
    } else {
        return Math.floor(count / 10000000) / 10 + "亿";
    }
}

export function getSizeImage(imgUrl, size) {
    return `${imgUrl}?param=${size}x${size}`;
}
```