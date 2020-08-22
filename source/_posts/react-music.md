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