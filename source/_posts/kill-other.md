---
title: 排他思想
date: 2019-05-21 00:13:24
tags: 排他
categories: Web API
---

上课我们在做点击当前按钮高亮，其他按钮重置为默认颜色的需求时，用到了“排他思想”，思路是：第一步，先干掉所有的；第二步，再操作自己的，简单明了，相信大家都比较清楚了！这里我再给大家做个总结，顺便再拓展一下其他的实现思路 ~

<!-- more -->

## 排完思想

需求：有 5 个按钮，点击当前按钮变红，其他按钮恢复默认颜色

```html
<!-- HTML 结构 -->
<button>1</button>
<button>2</button>
<button>3</button>
<button>4</button>
<button>5</button>
```

```javascript
var aBtn = document.querySelectorAll('button');

for(var i = 0; i < aBtn.length; i ++) {
    aBtn[i].onclick = function() {
        // Step1: 先干掉所有人，“排完”
        for(var i = 0; i < aBtn.length; i ++) {
            aBtn[i].style.backgroundColor = '';
        }
        // Step2: 再操作自己的
        this.style.backgroundColor = 'red';
    };
}
```

## 排兄思想

```javascript
<script src="https://cdn.bootcss.com/jquery/3.4.0/jquery.min.js"></script>
<script>
$("button").on("click", function() {
    // 先操作自己的，再干掉所有的兄弟，“排兄”
    $(this).css("background", "red").siblings().css("background", "");
});
</script>
```

## 排上思想

```javascript
var aBtn = document.querySelectorAll('button');
var prev = 0;

for (var i = 0; i < aBtn.length; i++) {
    aBtn[i].index = i;
    aBtn[i].onclick = function () {
        // Step1: 先干掉上一个，“排上”
        aBtn[prev].style.backgroundColor = "";
        // Step2: 再操作自己的
        this.style.backgroundColor = 'red';
        // Step3: 操作完别忘了把自己也变成“上一个”
        prev = this.index;
    };
}
```