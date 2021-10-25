---
title: Tree
date: 2021-10-23 15:01:28
tags:
---

## 封装函数

```js
const arr = [
    { id: 'a', pid: '', name: '总裁办' },
    { id: 'b', pid: '', name: '行政部' },
    { id: 'c', pid: '', name: '财务部' },
    { id: 'd', pid: 'c', name: '财务核算部' },
    { id: 'e', pid: 'c', name: '税务管理部' },
]
```

需求：把上面的数据转成下面的结果

```js
const arr = [
    { id: 'a', pid: '', name: '总裁办' },
    { id: 'b', pid: '', name: '行政部' },
    {
        id: 'c',
        pid: '',
        name: '财务部',
        children: [
            { id: 'd', pid: 'c', name: '财务核算部' },
            { id: 'e', pid: 'c', name: '税务管理部' },
        ],
    },
]
```

<!-- more -->

代码实现

```js
const fn = (list, rootId) => {
    const arr = []
    list.forEach((item) => {
        if (item.pid === rootId) {
            const children = fn(list, item.id)
            if (children.length) {
                item.children = children
            }
            arr.push(item)
        }
    })
    return arr
}
```

## 第三方包

可以使用 `array-to-tree`

```js
const arrayToTree = require('array-to-tree')
arrayToTree(arr, { parentProperty: 'pid' })
```

复杂场景建议使用 `performant-array-to-tree`

```js
const p = require('performant-array-to-tree')
p.arrayToTree(arr, {
    parentId: 'pid',
    dataField: null,
    rootParentIds: { '': true },
})
```

## 递归查找

forEach

```js
let o = {}
function findOById(arr, id) {
    arr.forEach(function (item) {
        if (item.id == id) {
            o = item
        } else if (item.children && item.children.length > 0) {
            o = findOById(item.children, id)
        }
    })
    return o
}
console.log(findOById(arr, 'd'))
```

优化

```js
function findOById(arr, id, callback) {
    arr.some(function (item) {
        if (item.id === id) {
            callback(item)
            return true
        } else if (item.children && item.children.length > 0) {
            findOById(item.children, id, callback)
        }
    })
}
findOById(arr, 'b', console.log)
findOById(arr, 'c', console.log)
```

## 树形菜单

`src/App.vue`

```html
<template>
    <div class="el-container" :style="{ '-webkit-user-select': 'none' }">
        <el-tree :arr="arr" />
    </div>
</template>

<script>
    import ElTree from './components/ElTree.vue'
    export default {
        name: 'App',
        components: {
            ElTree,
        },
        data() {
            return {
                arr: [
                    { id: 'a', pid: '', name: '总裁办' },
                    { id: 'b', pid: '', name: '行政部', children: [] },
                    {
                        id: 'c',
                        pid: '',
                        name: '财务部',
                        children: [
                            { id: 'd', pid: 'c', name: '财务核算部' },
                            { id: 'e', pid: 'c', name: '税务管理部' },
                        ],
                    },
                ],
            }
        },
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
    }

    .el-container {
        padding: 20px;
        margin: 50px;
        box-shadow: 0 0 10px #ccc;
    }

    /* ul */
    .el-container .el-list {
        padding-left: 50px;
        position: relative;
    }

    /* 竖线 */
    .el-container .el-list::before {
        content: '';
        border-left: 1px dashed #999999;
        height: calc(100%);
        position: absolute;
        left: 8px;
        top: 0px;
    }

    /* li */
    .el-container .el-list .el-item {
        position: relative;
        line-height: 30px;
    }

    /* 横线 */
    .el-container .el-list .el-item::after {
        content: '';
        width: 42px;
        height: 0;
        border-bottom: 1px dashed #000;
        position: absolute;
        top: 15px;
        left: -42px;
    }

    /* li */
    .el-container .el-list .el-item {
        position: relative;
    }

    /* 按钮 */
    .el-container .el-list .el-item .el-btn {
        display: inline-block;
        text-align: center;
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 2px;
        background-color: #409eff;
        color: #fff;
        border-color: #409eff;
        cursor: pointer;
    }

    /* 第一个 ul 的竖线 */
    .el-container > .el-list::before {
        display: none;
    }

    /* 第一个ul中所有li的竖线 */
    .el-container > .el-list > .el-item::after {
        display: none;
    }

    /* 每一个 ul 中的最后一个 li 多出来的那竖线不要，盖上！ */
    .el-list .el-item:last-child::before {
        content: '';
        width: 3px;
        height: calc(100% - 16px);
        display: block;
        background-color: #fff;
        position: absolute;
        bottom: 0;
        left: -43px;
    }
</style
```

`src/components/ElTree.vue`

```html
<template>
    <ul class="el-list">
        <li class="el-item" v-for="item in arr" :key="item.id">
            <div class="el-title">
                <span @click="toggle(item)" class="el-btn" v-if="isHasChild(item)">{{ item.show ? '+' : '-' }}</span>&nbsp;
                <span class="el-txt">{{ item.name }}</span>
            </div>
            <el-tree v-show="!item.show" v-if="isHasChild(item)" :arr="item.children" />
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'ElTree',
        props: {
            arr: {
                type: Array,
                isRequired: true,
            },
        },
        methods: {
            toggle(item) {
                this.$set(item, 'show', !item.show)
            },
            isHasChild(item) {
                return item.children && item.children.length > 0
            },
        },
    }
</script>
```
