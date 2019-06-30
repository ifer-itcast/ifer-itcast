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

原理2：



