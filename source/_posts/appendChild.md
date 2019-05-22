---
title: 认清 Node.appendChild()
date: 2019-05-19 21:55:45
tags: appendChild
categories: Web API
---

Node.appendChild() 方法用于将一个节点添加到指定父节点的子节点列表的末尾，但在具体使用时还有其他一些需要我们关注的细节，以及对应的应用场景。

<!-- more -->

## 常规操作

大家都清楚 [appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) 可以把创建好的元素插入到另一个元素内容的最后面，常规操作如下：

```javascript
// 创建元素
var oDiv = document.createElement('div');
// 给创建好的元素加点内容
oDiv.innerHTML = 'hello world';
// 添加到 body 里面
document.body.appendChild(oDiv);
```

## 需要注意

上面代码必然没有任何问题，但这里还有一点需要大家注意的是，appendChild 在插入已存在元素的时候其实是做了两件事的：

1. 先把原来已存在的元素删除
2. 再进行后续的添加操作

具体是什么意思呢？大家看下面的例子就清楚了。需求：每次点击按钮把上面 ul 中的第一个元素移动到下面的 ul 中：

```html
<ul id="ul1">
    <li>aaa</li>
    <li>bbb</li>
    <li>ccc</li>
    <li>ddd</li>
</ul>
<button id="btn">插入下面</button>
<ul id="ul2"></ul>
<script>
// 选择元素
var oUl1 = document.querySelector('#ul1');
var oBtn = document.querySelector('#btn');
var oUl2 = document.querySelector('#ul2');
oBtn.onclick = function() {
    var oLi = oUl1.children[0];
    // 每次点击按钮确实在 oUl2 中添加了一个新的元素，但同时 oUl1 中也相应少了这个元素
    // 所以 appendChild 时相当于偷偷帮我们做了这么一步操作：oUl1.removeChild(oLi);
    oUl2.appendChild(oLi);
};
</script>
```

## 实际应用

好，现在我们清楚了当用 appendChild 插入已存在元素时会先删除之前再进行插入，那明白这个特性有什么实际的用处吗？答案是肯定的。例如下面一个需求，点击按钮，根据元素中的数字大小对这组元素进行排序：

```html
<!-- HTML 结构 -->
<ul id="ul1">
    <li>5</li>
    <li>2</li>
    <li>3</li>
    <li>1</li>
    <li>4</li>
</ul>
<button id="btn">点击</button>
```

```javascript
// 选择元素
var oUl1 = document.querySelector('#ul1');
var aLi = oUl1.querySelectorAll('li');
var oBtn = document.querySelector('#btn');

// 把伪数组 aLi 中的每一项都放到数组里面，目的是为了进行排序
var arr = [];
for(var i = 0; i < aLi.length; i ++) {
    arr.push(aLi[i]);
}

oBtn.onclick = function () {
    // 这就是我们熟悉的冒泡排序，你还记得吗
    for (var i = 0; i < arr.length - 1; i++) { // 需要走 arr.length - 1 轮
        for (var j = 0; j < arr.length - i - 1; j++) { // 每轮比较 arr.length - i - 1 次
            var prevNum = parseFloat(arr[j].innerText);
            var nextNum = parseFloat(arr[j + 1].innerText);
            if (prevNum > nextNum) {
                // 不能对伪数组中其中一些直接赋值，例如：aLi[j] = aLi[j+1]，所以需要把伪数组转换成数组后再进行排序
                var temp = null;
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    // 此时 arr 中装的已经是排好序的一堆 li 元素了
    for(var i = 0; i < arr.length; i ++) {
        // 分别把排好序的数组中的每个元素插入到 oUl1 内容的最后
        // 注意每次插入的同时也会把 oUl1 中那个相同的元素先给干掉，所以 oUl1 中也就不会存在重复元素的问题
        oUl1.appendChild(arr[i]);
    }
};
```

## 优化代码

这里优化相关的代码我们并没有学（不建议查看），我这里也提供一种较佳实战，是给你们**以后看**的（甚至是工作后），优化后的 JS 代码如下：

```javascript
const oUl1 = document.querySelector('#ul1');
const aLi = oUl1.querySelectorAll('li');
const oBtn = document.querySelector('#btn');

oBtn.addEventListener('click', () => {
    // Array.from 可以把伪数组转成数组，sort 的原理就是上面写的冒泡排序
    Array.from(aLi).sort((li1, li2) => {
        return parseFloat(li1.innerText) - parseFloat(li2.innerText);
    }).forEach(li => {
        oUl1.appendChild(li);
    })
});
```

