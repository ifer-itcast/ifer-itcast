---
title: JS 运动补充
date: 2020-08-06 11:03:35
tags: [运动, animate]
categories: Web API
---

## 缓冲运动

### 基本运动函数封装

下面是课上讲过的代码

```javascript
function animate(ele, target, callback) {
    // #1 先清除定时器
    clearInterval(ele.timer);
    var speed = 0;
    ele.timer = setInterval(function () {
        // #2 速度的计算
        speed = (target - ele.offsetLeft) / 7;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (ele.offsetLeft === target) {
            clearInterval(ele.timer);
            // #3 支持回调
            callback && callback.call(ele);
        } else {
            ele.style.left = ele.offsetLeft + speed + 'px';
        }
    }, 16);
};
```

### 支持多属性单独运动

上面的问题是只支持 left 值的变化，例如宽高的变化并不支持，**核心是把所有的 ele.offsetLeft 换成获取当前属性值的操作**

```javascript
animate(oDiv, 'width', 500);
```

```javascript
function getCurStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
}
function animate(ele, attr, target, callback) {
    clearInterval(ele.timer);
    var speed = 0;
    var nowValue = 0;
    ele.timer = setInterval(function () {
        // #1 实时获取 nowValue
        nowValue = parseInt(getCurStyle(ele, attr));

        speed = (target - nowValue) / 7;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (nowValue === target) {
            clearInterval(ele.timer);
            callback && callback.call(ele);
        } else {
            // #2 修改对应的 attr
            ele.style[attr] = nowValue + speed + 'px';
        }
    }, 16);
};
```

### 支持多属性同时运动

例如想同时把宽高改为 222，下面写法肯定不 ok，后面的会覆盖前面的，最终修改的只有高度

```javascript
animate(oDiv, 'width', 222);
animate(oDiv, 'height', 222);
```

```javascript
// 使用改造
animate(oDiv, { width: 222, height: 222 });
```

**核心是对每一个属性都进行处理，目标点也就有了多个**

```javascript
function animate(ele, data, callback) {
    clearInterval(ele.timer);
    var speed = 0;
    var nowValue = 0;
    var target = 0;
    ele.timer = setInterval(function () {
        // #1 for 遍历
        for (var attr in data) {
            nowValue = parseInt(getCurStyle(ele, attr));
            // #2 目标值的变化
            target = data[attr];

            speed = (target - nowValue) / 7;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (nowValue === target) {
                clearInterval(ele.timer);
                callback && callback.call(ele);
            } else {
                ele.style[attr] = nowValue + speed + 'px';
            }
        }
    }, 16);
};
```

上面代码有个 Bug，例如这样调用 `animate(oDiv, { width: 222, height: 555 });` 会出现高度到达不了目标点的现象。原因是：速度一样，距离变化小的肯定先到达目标点，这时候就会把定时器给清了，导致后续的属性就不再运动了，解决如下：

```javascript
function animate(ele, data, callback) {
    clearInterval(ele.timer);
    var speed = 0;
    var nowValue = 0;
    var target = 0;
    ele.timer = setInterval(function () {
        var flag = true;
        for (var attr in data) {
            nowValue = parseInt(getCurStyle(ele, attr));
            target = data[attr];

            speed = (target - nowValue) / 7;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // #1 未到达目标标记 false
            if (nowValue !== target) {
                flag = false;
                ele.style[attr] = nowValue + speed + 'px';
            }
        }
        // #2 最后收尾
        if (flag) {
            clearInterval(ele.timer);
            callback && callback.call(ele);
        }
    }, 16);
};
```

### 支持透明度的变化

```javascript
function animate(ele, data, callback) {
    clearInterval(ele.timer);
    var speed = 0;
    var nowValue = 0;
    var target = 0;
    ele.timer = setInterval(function () {
        var flag = true;
        for (var attr in data) {
            // #1
            if (attr === 'opacity') {
                // 转成 100 进行计算，主要原因是对 speed 小数取整后直接会是绝对值 1，看不到动画效果
                // 低版本 Chrome 获取到的 opacity 可能是一个接近值，例如把 0.3，获取为 0.30000001 或 0.29888888
                nowValue = Math.round(getCurStyle(ele, attr) * 100);
            } else {
                nowValue = parseInt(getCurStyle(ele, attr));
            }

            target = data[attr];

            speed = (target - nowValue) / 7;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (nowValue !== target) {
                flag = false;
                // #2
                if (attr === 'opacity') {
                    ele.style[attr] = (nowValue + speed) / 100;
                    ele.style['filter'] = 'alpha(opacity=' + (nowValue + speed) + ')';
                } else {
                    ele.style[attr] = nowValue + speed + 'px';
                }
            }
        }
        if (flag) {
            clearInterval(ele.timer);
            callback && callback.call(ele);
        }
    }, 16);
};
```

## 弹性运动

## 碰撞运动

## 自由落体