---
title: steps(number[, end | start])
date: 2019-05-31 21:03:25
tags:
---

<img src="/resource/images/pages/h5css3/wolf.gif" alt="">

<!-- more -->

## 缘起

CSS3 中用于设置动画的 animation 语法如下：

```css
animation: name duration timing-function delay iteration-count direction;
```

其中，timing-function 取值如下：

```css
timing-function: linear / ease / ease-in / ease-out / ease-in-out / cubic-bezier() / steps()
```

上面 `timing-function` 的取值除了 steps() 都代表补间动画（线性动画），steps() 代表帧动画，有时候一些动画效果必须用它才能实现，例如上面图奔跑的动物是我们曾经做过的动画，就是通过 steps() 配合改变雪碧图（1600px宽）的位置实现的，代码如下：

```css
@keyframes aniSelf {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -1600px 0;
    }
}
```

```css
.wolf{
    animation: aniSelf 1s steps(8) infinite;
}
```

上面代码确实能实现预期的效果，但不知道大家有没有这样一个疑问：当背景位置为 `background-position: -1600px 0;` 时，图片在盒子中应该是看不到的才对（因为图片总共是1600px，这样刚好是图片的最右边卡到盒子的最左边），但为什么动画还能正常跑起来，而没有出现空白的问题呢？

要解答上面的疑问，我们就要明白关于 `steps(number[, end | start])` 参数的含义，第一个参数大家都知道是什么意思，第二个参数是可选的，表示**在每个间隔的起点或是终点发生阶跃变化**，如果忽略，**默认是 end**。

看完上面加粗部分的定义，我不知道你作何感想...😣

## 我的感性认识

我的理解：steps() 第二个参数如果是 end 则代表**忽略结束帧**，如果是 start 则代表**忽略开始帧**，如何理解这句话呢？

<img src="/resource/images/pages/h5css3/steps.png" alt="">

上面是一张 `50 * 200` 的图片，作为 `50 * 50` 盒子的背景图，我想实现在 hover 盒子的时候背景从 A 变化到 A 的逐帧动画。由于我们知道 steps(4, end) 时会忽略最后一帧，动画走完时没有 forwards，又会回到初始状态，故可以用以下方法来实现：

```css
.box {
    border: 1px solid #333;
    width: 50px;
    height: 50px;
    background: url(./images/steps.png) no-repeat;
}

.box:hover {
    /* 分为 4 步来完成，会忽略最后一步 background-position: 0 -150px; 到 background-position: 0 -200px; 这个区间！ */
    animation: way1 2s steps(4);
}

@keyframes way1 {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 0 -200px;
    }
}
```

上面代码其实就是和我们课上实现动物运动的代码是一样的思路，那如果我把上面的代码改为 steps(4, start) 会怎样的，根据我们之前的结论，start 会忽略第一帧，也就是 hover 上的一刹那就会定位到 B，然后也会走 `background-position: 0 -150px;` 到 `background-position: 0 -200px;` 最后一帧这个区间，即会出现空白，最后又回到初始状态 A，可见，这并不是我们所需要的。

## 我就想用 start

如果实在想用 start 可以改写代码如下：

```css
/* Step1: 分为 3 步走 */
.box:hover {
    animation: way1 2s steps(3, start);
}

/* Step2: 最后一帧的位置改成严丝合缝的最后一样图片 */
@keyframes way1 {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 0 -150px;
    }
}
```

> 注意：以上代码虽然能实现 hover 时背景从 A、B、C、D 到 A 的变换，但并不推荐这样做，因为 hover 的一刹那 A 到 B 的变换是没有动画的（逐帧动画也是动画）

## 其他写法

注意看我的注释部分！

```css
.box {
    border: 1px solid #333;
    width: 50px;
    height: 50px;
    /* Step1: 背景重复！ */
    background: url(./images/steps.png) repeat-y;
}

.box:hover {
    /* Step2: 这时候 steps 第二个参数是 start or end 只是开始时第一帧有没有动画的区别，并不会出现空白了，因为背景平铺了 */
    animation: way1 2s steps(4);
}

@keyframes way1 {
    0% {
        background-position: 0 0; /* A */
    }
    100% {
        background-position: 0 -200px; /* A */
    }
}
```

```css
/* 设置是这样的写法 */
@keyframes way1 {
    0% {
        background-position: 0 200px; /* A */
    }
    100% {
        background-position: 0 0px; /* A */
    }
}
```

## 其他属性对 step 的影响

当 steps() 第二个参数为 end 时会忽略结束帧，但 `animation-fill-mode: forwards;` 是会影响 steps() 的表现的，例如我想让一个盒子从 0 运动到 100，可写代码如下：

```javascript
.box{
    width: 100px;
    height: 100px;
    background-color: pink;
    position: absolute;
    top: 70px;
    animation: move 3s steps(5) forwards;
}
@keyframes move {
    0%{
        left: 0;
    }
    100%{
        left: 100px;
    }
}
```

结果如下：

<img src="/resource/images/pages/h5css3/boxmove.gif" alt="">

说好的 steps() 第二个参数为 end 时会忽略最后一帧，但最后却停在了 100px 的位置上，说明 animation-fill-mode 为 forwards 时会对 steps() 帧动画造成影响，以 forwards 为准！当然你如果又设置了 infinite，那 forwards 也就“失效”了...

## 再来个小栗子

<a href="/resource/demos/demo01/index.html">点我去远方</a>