---
title: move
date: 2020-08-06 23:52:36
tags: [运动, animate]
categories: Web API
---

给大家补充几种运动形式，挺有意思的~

<!-- more -->

## 匀速运动

```javascript
function move(ele, target, callback) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        let speed = 7;
        speed = ele.offsetLeft > target ? -speed : speed;
        // 停止条件：距离目标点不到“一步”的时候
        if (Math.abs(target - ele.offsetLeft) <= speed) {
            clearInterval(ele.timer);
            ele.style.left = target + 'px';
            callback && callback.call(ele);
        } else {
            ele.style.left = ele.offsetLeft + speed + 'px';
        }
    }, 16);
}
```

## 缓冲运动

```javascript
function move(ele, target, callback) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        // 核心计算：距离目标点越近速度就越慢
        let speed = (target - ele.offsetLeft) / 7;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        // 停止条件：到达目标点的时候
        if (ele.offsetLeft === target) {
            clearInterval(ele.timer);
            callback && callback.call(ele);
        } else {
            ele.style.left = ele.offsetLeft + speed + 'px';
        }
    }, 16);
}
```

## 弹性运动

```javascript
function move(ele, target, callback) {
    clearInterval(ele.timer);
    let speed = 0;
    ele.timer = setInterval(function () {
        // #1 距离目标点越近，加速度越小
        speed += (target - oDiv.offsetLeft) / 6;
        // #2 配合摩擦系数，让 speed 无线接近于 0
        speed *= .75;
        // #3 停止条件：速度够小，距离目标点够近
        console.log(oDiv.offsetLeft);
        if (Math.abs(speed) <= 1 && Math.abs(target - oDiv.offsetLeft) <= 1) {
            clearInterval(ele.timer);
            ele.style.left = target + 'px';
            callback && callback.call(ele);
        } else {
            ele.style.left = ele.offsetLeft + speed + 'px';
        }
    }, 16);
}
```

## 碰撞运动

```javascript
// 核心：到边时对速度进行取反
function move(ele) {
    clearInterval(ele.timer);
    let speedX = 5;
    let speedY = 5;
    ele.timer = setInterval(function () {
        let l = ele.offsetLeft + speedX;
        let t = ele.offsetTop + speedY;
        if (t > document.documentElement.clientHeight - ele.offsetHeight) {
            t = document.documentElement.clientHeight - ele.offsetHeight;
            speedY *= -1;
        } else if (t < 0) {
            t = 0;
            speedY *= -1;
        }
        if (l > document.documentElement.clientWidth - ele.offsetWidth) {
            l = document.documentElement.clientWidth - ele.offsetWidth;
            speedX *= -1;
        } else if (l < 0) {
            l = 0;
            speedX *= -1;
        }
        ele.style.left = l + 'px';
        ele.style.top = t + 'px';
    }, 16);
}
```

## 自由落体

```javascript
function move(ele) {
    clearInterval(ele.timer);
    let speedY = 5;
    ele.timer = setInterval(function () {
        // 垂直加速
        speedY += 3;
        let t = ele.offsetTop + speedY;
        if (t >= document.documentElement.clientHeight - ele.offsetHeight) {
            t = document.documentElement.clientHeight - ele.offsetHeight;
            // 到边时速度取反 + 摩擦系数
            speedY *= -1;
            speedY *= 0.75;
        }
        if (Math.abs(speedY) <= 0.1) {
            clearInterval(ele.timer);
        }
        ele.style.top = t + 'px';
    }, 16);
}
```