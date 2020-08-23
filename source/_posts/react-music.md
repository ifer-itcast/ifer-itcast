---
title: react-music
date: 2020-08-23 00:24:26
tags:
---

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