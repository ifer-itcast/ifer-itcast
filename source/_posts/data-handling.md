---
title: 数据处理
date: 2020-07-31 18:58:38
tags: [数据处理, Array.prototype.reduce]
categories: JS 高级
---

后端响应的数据多数情况下是需要处理成符合自己需要的格式才能使用，这就是新手面临的第一个问题，数据处理！

<!-- more -->

## Array.prototype.reduce 原理及应用

### 基本语法

[_.add(array)](https://lodash.com/docs/4.17.15#sum)

```javascript
const arr = [1, 2, 3];
const result = arr.reduce((acc, cur, curIdx, arr) => acc + cur, init);
```

注意：`acc` 初始累积值，要么是 `init`，要么是数组中索引为 `0` 的那一项，`cur` 同理！详见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

### 原理分析

```javascript
Array.prototype.reduce = Array.prototype.reduce || function (cb, init) {
    let startIdx = 0;
    if (typeof init === 'undefined') {
        // 没提供初始值，就把 0 个当做初始值，从第 1 个开始循环
        init = this[0];
        startIdx = 1;
    }
    for (startIdx; startIdx < this.length; startIdx++) {
        init = cb(init, this[startIdx], startIdx, this);
    }
    return init;
};
```

## Array.prototype.reduce 举例

### 数组转对象1

把 `['a', 'b', 'c']` 转成 `{ a: { b: { c: {} } } }` 的形式

```javascript
const arr = ['a', 'b', 'c'];
const format = arr.reverse().reduce((accVal, curVal) => ({[curVal]: accVal}), {});
```

```javascript
Array.prototype.reduceRight2 = function (cb, init) {
    let startIdx = this.length - 1;
    if (typeof init === 'undefined') {
        // 没提供初始值，就把 【最后一项】 个当做初始值，从 【倒数第二项】 开始循环
        init = this[startIdx];
        startIdx = this.length - 2;
    }
    for (startIdx; startIdx >= 0; startIdx--) {
        init = cb(init, this[startIdx], startIdx, this);
    }
    return init;
};
```

```javascript
const format = arr.reduceRight((accVal, curVal) => ({[curVal]: accVal}), {});
```

### 数组转对象2

数组转对象，把 id 当做 key，使用 lodash 的 [_.keyBy()](https://lodash.com/docs/4.17.15#keyBy)

```javascript
const userList = [
    { id: 1, username: 'ifer', email: 'ifer@gmail.com' },
    { id: 2, username: 'elser', email: 'elser@gmail.com' },
    { id: 3, username: 'for', email: 'for@gmail.com' }
];
```

```javascript
// 分析错误写法
const r = userList.reduce((acc, cur, curIndex, arr) => {
    return {
        [acc.id]: acc
    };
});
const r = {
    'undefined': {
        1: { id: 1, username: 'ifer', email: 'ifer@gmail.com' }
    }
};
```

```javascript
// 每次的 return 值也会累计到 acc 上面，每次的累计值是一个对象，需要解构
// acc 是一个对象，一般情况下，不会让它作为一个 key 存在
userList.reduce((acc, cur, curIndex, origin) => ({ ...acc, [cur['id']]: cur }), {});
```

```javascript
// 思路：实际上咱们知道最终的计算结果都会累计到 acc 上面
userList.reduce((acc, cur, curIndex) => {
    acc[cur['id']] = cur;
    return acc;
}, {});
```

### 拆分大数组

```javascript
const arr = [
    '留蕴，犁白萱，之怜翠，张莹莹，杭专，势飞语，碧鲁彗',
    '崔宏，旷候，涵宗玛，丽恭义，郁畅畅，欧阳姣丽，晁天青',
    '果芷容，左丘山雁，乘雨文，佟梦菲，叶建华，源逸馨，鲁才',
    '滕思，於晴雪，厍涵衍，贝勇毅，南宫格，管诗珊，郯姝美'
];
```

```javascript
arr.reduce((acc, cur, curIndex, origin) => acc.concat(cur.split('，')), []);
```

## Polyfill

需求：实现 forEach、filter、map、some、every 的 Polyfill

```javascript
// forEach
Array.prototype.forEach = Array.prototype.forEach || function (fn, _this) {
    for (let i = 0; i < this.length; i++) {
        fn.call(_this, this[i], i, this);
    }
}
```

## 树形菜单

<a href="/resource/files/data-handling/data.js" target="_blank">数据</a>

### 基本操作

```javascript
// 基本操作
const render = (datas) => {
    let str = '';
    datas.forEach(item => {
        str += `<li><span>${item.name}</span>`;
        if (Array.isArray(item.children)) {
            str += `<ul>${render(item.children)}</ul></li>`;
        }
    });
    return str;
}
```

```javascript
// 优雅优雅
const render = (datas) => datas.map(item => {
    let str = `<li><span>${item.name}</span>`;
    if (Array.isArray(item.children)) {
        str += `<ul>${render(item.children)}</ul></li>`;
    }
    return str;
}).join('');
```

### 查找数据

```javascript
// 基本操作
let r = null;
const findItem = (datas, id) => {
    datas.forEach(item => {
        if (item.id === id) {
            r = item;
        } else if (Array.isArray(item.children)) {
            findItem(item.children, id);
        }
    });
};
```

```javascript
// 优化优化
let r = null;
const findItem = (datas, id) => {
    datas.some(item => {
        if (item.id === id) {
            return r = item;
        } else if (Array.isArray(item.children)) {
            return findItem(item.children, id);
        }
    });
    return r;
};
```

### 扁平化

当数组中的对象的 value 也是数组的时候，原生的 flat 并不起作用

```javascript
let arr = [];
function flat(datas) {
    datas.forEach(item => {
        arr.push(item);
        if (Array.isArray(item.children)) {
            flat(item.children);
        }
    });
    return arr;
}
```

```javascript
function flat(datas) {
    let arr = [];
    datas.forEach(item => {
        arr.push(item);
        if (Array.isArray(item.children)) {
            // arr.push(...flat(item.children));
            arr = arr.concat(flat(item.children));
        }
    });
    return arr;
}
```

```javascript
// 递归 + reduce
function flat(datas) {
    return datas.reduce((acc, cur, curIndex) => {
        return acc.concat(cur, Array.isArray(cur.children) ? flat(cur.children) : []);
    }, []);
}
```

```javascript
// 精简演示
const datas = [{
    id: 1,
    children: [{
        id: 2,
        children: [{
            id: 3
        }]
    }]
}];
```

> 思考？？

## 数据关联

```javascript
// 原始数据
const arr = [
    {
        id: 1, category: '英语学习', parentId: null
    },
    {
        id: 11, category: '实用英语', parentId: 1
    },
    {
        id: 12, category: '英语基础', parentId: 1
    },
    {
        id: 2, category: '职业考试', parentId: null
    },
    {
        id: 21, category: '小学', parentId: 2
    },
    {
        id: 22, category: '初中', parentId: 2
    }
];
```

```javascript
// 需要结果
let r = [
    {
        "id": 1,
        "category": "英语学习",
        "parentId": null,
        "subCategories": [
            { "id": 12, "category": "英语基础", "parentId": 1 },
            { "id": 11, "category": "实用英语", "parentId": 1 }
        ]
    },
    {
        "id": 2,
        "category": "职业考试",
        "parentId": null,
        "subCategories": [
            { "id": 22, "category": "初中", "parentId": 2 },
            { "id": 21, "category": "小学", "parentId": 2 }
        ]
    }
];
```

```javascript
// 先用当前父 id 逐项往后比较 parentId
for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].parentId && arr[i].id === arr[j].parentId) {
            if (arr[i].sub) {
                arr[i].sub.push(arr.splice(j, 1)[0])
            } else {
                arr[i].sub = [arr.splice(j, 1)[0]];
            }
            j--;
        }
    }
}
```

```javascript
// 确定父亲找儿子~~~
for (let i = 0; i < arr.length; i++) {
    if (!arr[i].parentId) {
        let idx = arr.findIndex(item => arr[i].id === item.parentId);
        if (idx !== -1) {
            if (arr[i].sub) {
                arr[i].sub.push(arr.splice(idx, 1)[0]);
            } else {
                arr[i].sub = arr.splice(idx, 1);
            }
            i--;
        }
    }
}
```

```javascript
// 确定儿子找父亲
for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i].parentId) {
        let idx = arr.findIndex(item => item.id === arr[i].parentId);
        if (idx) {
            if (arr[idx]['subCategories']) {
                arr[idx]['subCategories'].push(...arr.splice(i, 1));
            } else {
                arr[idx]['subCategories'] = arr.splice(i, 1);
            }
        }
    }
}
```

## 数据筛选

需求：取出相同 rate 的 key 作为数组放进一个大数组中；输出结果为：`[["a", "c"], ["d", "e", "f"]]`

```javascript
const r = [
    { key: "a", rate: 0.1 },
    { key: "b", rate: 0.2 },
    { key: "c", rate: 0.1 },
    { key: "d", rate: 0.3 },
    { key: "e", rate: 0.3 },
    { key: "f", rate: 0.3 },
    { key: "g", rate: 0.4 },
];
```

```javascript
// 错误写法
let arr = [];
for (let i = 0; i < r.length; i++) {
    let temp = [];
    for (let j = i + 1; j < r.length; j++) {
        if (r[i].rate === r[j].rate) {
            // 会有重复的，因为没有删除
            temp.push(r[j].key);
        }
    }
    temp.unshift(r[i].key);
    arr.push(temp);
}
console.log(arr);
```

```javascript
// 逐个比较，结合 splice
const all = [];
for (let i = 0; i < r.length; i++) {
    const arr = [];
    let bBar = false;
    for (let j = i + 1; j < r.length; j++) {
        if (r[i].rate === r[j].rate) {
            bBar = true;
            arr.push(r.splice(j, 1)[0]['key']);
            j--;
        }
    }
    if (bBar) {
        arr.unshift(r[i]['key']);
        all.push(arr);
    }
}
console.log(all);
```

```javascript
let json = {};
for (let i = 0; i < arr.length; i++) {
    if (!json[arr[i]['rate']]) {
        json[arr[i]['rate']] = [arr[i]['key']];
    } else {
        json[arr[i]['rate']].push(arr[i]['key']);
    }
}
let r = Object.values(json).filter(item => item.length > 1);
console.log(r);
```

类似技巧举例

```
// 找出字符串 '85872637471533203552943982' 中出现次数最多的数字及次数
```