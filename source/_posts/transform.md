---
title: 拖了个拽
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

## transform 对拖拽的影响

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

<font color=#d58512>当使用了 translate 移动了盒子之后，光标到盒子的计算结果是不对的，那为什么最终还能实现正确的拖拽效果呢？</font>那是因为 offsetLeft 的计算并不会把 translateX 包括在内，移动时操作的是 oDiv.style.left（并没有管 translate 的事情，原来是多少移动时还是多少），所以也就能得到正确的结果！

上面我们明白了即便使用 translate 改变元素的初始位置，也不会对拖拽本身产生影响，但是！如果拖拽过程中有涉及到范围的判断时，要格外小心了。例如限制元素不能超出窗口的左侧，就不能简单的 `if(x < 0) {x = 0}`，因为当 x 为负的 translateX 才是真正的到达边界，所以再判断时应该 `if(x < -translateX) {x = -translateX}`，其他边界的判断同理！

<a href="/resource/demos/demo04/06_drag.html">查看代码</a>

## margin 对拖拽的影响

首先建议不要给想要拖拽的元素加 margin，如果想要改变它的初始位置，完全可以使用 top 或 left（既然是拖拽，元素应该就有了绝对定位！）

如果在应用了定位的同时竟然又加了 margin（不推荐，因为这里 top、left 完全可以搞定 margin 的功能），那需要在 mousemove 的时候减去这个值，当然你在按下的时候 disX = e.pageX - this.offsetLeft + marginLeft 也是 ok！

<a href="/resource/demos/demo04/07_drag.html">查看代码</a>

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

**核心原理：把上次移动位置（结果）变成下次按下时的起始位置！**

**第一种写法**

mousemove 时当前鼠标位置 **减去** 按下时的鼠标位置 **加上** 一次原来的 moveX，注意在 mousedown 加 moveX 才能保证是 1 次

<a href="/resource/demos/demo04/03_drag.html">代码实现1</a>

**第二种写法**

定义上次的 translate 值 `var startX = 50;`，定义默认当前需要移动的值 `var needMoveX = 0;`，mousemove 时 `needMoveX = startX + moveX(e.pageX - originPageX);`，mouseup 时则需要 `startX = needMoveX;`

<a href="/resource/demos/demo04/04_drag.html">代码实现2</a>

**第三种写法**

和上面同理，只不过把初始值挂载到了移动的元素上

<a href="/resource/demos/demo04/05_drag.html">代码实现3</a>







