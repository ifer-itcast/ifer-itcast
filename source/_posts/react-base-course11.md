---
title: 11_极客园
date: 2021-11-22 00:50:54
tags:
---

## 首页展示

-   `pages/Home/index.module.scss`

```scss
.root {
    width: 100%;
    height: 100%;
    background: #f5f5f5 url(../../assets/chart.png) no-repeat center / contain;
}
```

-   `pages/Home/index.js`

```js
import React from 'react'
import styles from './index.module.scss'

export default function Home() {
    return <div className={styles.root}>Home</div>
}
```

-   去掉了 `pages/Layout/index.js` 中右侧 `<Layout/>` 组件上的 padding。
