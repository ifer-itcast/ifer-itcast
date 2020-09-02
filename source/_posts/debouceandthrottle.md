---
title: 防抖和节流
date: 2020-02-05 20:20:43
tags: [debounce, throttle]
categories: 面试
---

防抖和节流容易混淆，其实一句话就能说清楚！

<!-- more -->

**防抖：持续触发（事件）不执行，不触发的一段时间之后再执行**

```javascript
const debounce = (fn, time) => {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            // 这样写需要上面传递一下
            // fn.call(this, e);
        }, time);
    };
};

const box = document.getElementById('box');
box.onmousemove = debounce(function (e) {
    console.log(this, e);
}, 1000);
```

**节流：持续触发（事件）也执行，但执行的频率变低了**

```javascript
const throttle = (fn, time) => {
    let bBar = true;
    return function () {
        // if (!bBar) return; // true 才走，也就是保证 false 的时候不会走
        if (bBar) {
            // 持续触发的话，bBar 一直是 false，这里就不会再次进来
            bBar = false;
            setTimeout(() => {
                fn.apply(this, arguments);
                // 这样写需要上面传递一下
                // fn.call(this, e);
                // 定时器到达之后再把开关打开，函数就会执行
                bBar = true;
            }, time);
        }
    };
};
const box = document.getElementById('box');
box.onmousemove = throttle(function (e) {
    console.log(this, e);
}, 1000);
```