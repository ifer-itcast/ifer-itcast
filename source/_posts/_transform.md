---
title: 拖拽，你会了吗
date: 2019-06-30 19:15:49
tags: 拖拽
categories: Web API
---

<img src="/resource/images/pages/webapi/transform__3.jpg" alt="">

<!-- more -->

## 殊途同归

原理1：**按下时获取光标到盒子的距离**，即 disX = e.pageX（红线） - oDiv.offsetLeft（蓝线） ，**移动时再用当前光标到窗口的距离减去上次获得的 disX**，就可实时得到蓝线的距离，即盒子当前应该距离窗口左侧的距离。

<a href="/resource/demos/demo04/01_drag.html">原理1代码实现</a>

原理2：按下时记录当前光标位置（红线）和盒子原来的位置（蓝线），移动时用盒子原来的位置加上移动的距离（移动距离=当前移动时的光标位置-按下时的光标位置）。

<a href="/resource/demos/demo04/02_drag.html">原理2代码实现</a>

## 一个细节

上面使用**原理1**确实可以实现想要的拖拽效果，但获取到的光标到盒子的距离却是错误的！比实际的大小多了个 translate 值，测试代码如下：

```css
#box {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: pink;
    transform: translate(100px, 100px);
}
```

```javascript
var oBox = document.querySelector('#box');
oBox.onmousemove = function (e) {
    var disX = e.clientX - this.offsetLeft;
    var disY = e.clientY - this.offsetTop;
    this.innerHTML = 'x: ' + disX + ', y: ' + disY;
};
```

当使用了 translate 移动了盒子之后，光标到盒子的计算结果是不对的，那为什么最终还能实现正确的拖拽效果呢？那是因为 offsetLeft 的计算并不会把 translateX 包括在内，移动时再对 oDiv.style.left 赋值时刚好也就能得到正确的结果！

*思考：如果对盒子初始位置的改变使用 margin，那么再拖拽时还能得到正确的效果吗？*

## 使用 translate 改变盒子的位置

可以直接把之前对 oBox.style.left 的修改变成 oBox.style.transform 吗？

```javascript
document.onmousemove = function (e) {
    var l = e.clientX - disX;
    var t = e.clientY - disY;
    // oBox.style.left = l + 'px';
    // oBox.style.top = t + 'px';
    oBox.style.transform = 'translate(' + l + 'px, ' + t + 'px)';
};
```

l 本来指的应该是 oBox 的 left 值，这里直接把 l 使用在了 translate 上，那就相当于在原来定位的基础上又直接 translate 了 l 的值，肯定是不行的！

核心原理：上次移动位置变成下次起始位置！

<a href="/resource/demos/demo04/03_drag.html">代码实现1</a>

<a href="/resource/demos/demo04/04_drag.html">代码实现2</a>

<a href="/resource/demos/demo04/05_drag.html">代码实现3</a>







