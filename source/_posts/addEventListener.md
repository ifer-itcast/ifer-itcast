---
title: 再说事件绑定
date: 2019-06-27 11:03:11
tags: addEventListener
categories: Web API
---

大家都清楚，常用的事件绑定有两种形式，一种是**传统绑定**形式，例如 `oBtn.onclick = fn;` 还有一种是通过**事件监听**的形式，例如 `oBtn.addEventListener('click', fn, false);` 两种绑定方式最大的差异我相信大家也比较清楚，就是传统方式给同一元素绑定多个事件处理程序时生效的是最后的那个（后面的覆盖前面的），事件监听的形式给同一元素绑定多个**不同的**事件处理程序时都会生效。但是在具体使用时**用什么方式绑**？**绑定在谁身上**（是点击的当前元素还是父元素）？**什么时候绑**（是点击的时候绑还是程序加载的时候绑）？都是你需要关注的细节，这里我举了一个例子来说明这三个问题！

<!-- more -->

## 基本需求

<img src="/resource/images/pages/webapi/send-message__1.png" alt="">

需求：点击添加按钮，把 input 框中的内容放入新创建的 li，并给 li 中添加删除按钮可以删除当前行，最后把 li 添加到 ul 中，如上图

代码实现：

```html
<input type="text">
<button>添加</button>
<ul style="width: 200px;"></ul>
```

```javascript
var oInput = document.querySelector('input');
var oBtn = document.querySelector('button');
var oUl = document.querySelector('ul');

oBtn.onclick = function() {
    // 创建 li
    var oLi = document.createElement('li');
    // 给 li 添加内容
    oLi.innerHTML = oInput.value;
    // 添加 li 到 ul
    oUl.appendChild(oLi);

    // 创建删除按钮 span
    var oBtn = document.createElement('span');
    // 添加文字
    oBtn.innerHTML = '删除';
    // 添加删除按钮到 li
    oLi.appendChild(oBtn);

    // 每次点击时选择所有按钮，并绑定点击事件做删除操作
    var aBtn = document.querySelectorAll('span');
    for(var i = 0; i < aBtn.length; i ++) {
        aBtn[i].onclick = function() {
            oUl.removeChild(this.parentNode);
        };
    }
};
```

## 问题重现

上面删除当前列表的功能，我们是用普通的事件绑定形式(onclick)去做的，没有什么问题。有同学尝试用事件监听的形式(addEventListener)改写代码如下：

```javascript
var aBtn = document.querySelectorAll('span');
for(var i = 0; i < aBtn.length; i ++) {
    aBtn[i].addEventListener('click', function() {
        oUl.removeChild(this.parentNode);
    });
}
```

点击添加按钮，增加了 2 个或大于 2 个元素，此时再删除非最后一个列表时（非最后一个还是非第一个取决于是用 appendChild 还是 insertBefore 插入的），却发现出现了错误！打开控制台报错信息如下（删除了一个不是 oUl 子元素的节点）：

<img src="/resource/images/pages/webapi/send-message__2.png" alt="">

## 问题分析

第 1 次点击按钮添加完成后，会通过 `var aBtn = document.querySelectorAll('span');` 选择所有的删除按钮，绑定事件

第 2 次点击添加按钮完成后，会通过 `var aBtn = document.querySelectorAll('span');` 选择所有的删除按钮，绑定事件。问题就出在这里，选择所有删除按钮并绑定事件的操作，其实又会把之前**已经绑定事件的元素再次绑定了一次**。所以点击删除按钮时会发现 `oUl.removeChild(this.parentNode);` 执行了多次（取决于重复绑定了多少次），第 1 次执行时已经把当前 li 从 ul 中移除，下次再执行 `oUl.removeChild(this.parentNode);` 时其实 ul 中已经没有了这个 li，删除一个不存在的子节点就会报错！

第 3 次点击添加按钮完成后，同理...

## 解决方案

**Way1:** 使用普通的事件绑定形式（onclick）

**Way2:** 对于**同样的事件处理程序**独立出去变成同一个函数，每次保证绑定的是同一个（函数），例如：

```javascript
var aBtn = document.querySelectorAll('span');
for(var i = 0; i < aBtn.length; i ++) {
    // aBtn[i].removeEventListener('click', rm); // 这里就没有必要进行先解绑了，因为每次绑定的是同一个 rm，会覆盖掉之前的
    aBtn[i].addEventListener('click', rm);
}
// 注意这里巧妙的用到了 e.target 查找当前点击的元素，不要试图通过传参的形式使用 this 查找当前元素！
function rm(e) {
    oUl.removeChild(e.target.parentNode);
}
```

**Way3:** 其实前面每次添加列表就通过 `querySelectorAll` 重新选择所有删除按钮并绑定事件，本身就是一个糟糕的思路！其实只需要找到最新添加的那一个进行事件绑定就可以了，往前插入的话可以直接通过 `var oBtn = document.querySelector('span');` 找到最新添加的那个，往后插入的话代码如下：

```javascript
var oBtn = document.querySelectorAll('span')[oUl.children.length-1];
oBtn.addEventListener('click', function() {
    oUl.removeChild(this.parentNode);
});
```

除了上面通过元素选择的方式查找最新添加的那一个，最正确的方式其实是根本不用查找，它就在那里！每次添加列表的时候，当前创建的删除按钮就是最新的，直接给其绑定事件即可，这样无论是从效率，还是代码简洁度上都最佳，代码如下：

```javascript
var oBtn = document.createElement('span');
// 给一个创建的元素单独绑定事件，而不是每次点击通过 querySelectorAll 选择的形式
oBtn.addEventListener('click', function() {
    oUl.removeChild(this.parentNode);
});
oBtn.innerHTML = '删除';
oLi.appendChild(oBtn);
```

**Way4:** 使用事件委托，推荐！

```javascript
// 把事件绑定在父级上
oUl.addEventListener('click', function(e) {
    // 根据点击当前元素的名字（或其他）来判断是否是 span（即删除按钮），然后做相应的操作
    if(e.target.nodeName.toLowerCase() === 'span') {
        e.currentTarget.removeChild(e.target.parentNode);
    }
});
```