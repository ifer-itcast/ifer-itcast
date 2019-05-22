---
title: 触发全选按钮的几种思路
date: 2019-05-22 15:50:24
tags: 全选
categories: Web API
---

<img src="/resource/images/pages/webapi/select-all__0.png" alt="">

需求：点击全选，选中上面所有的列表项；点击列表项中的每一个水果，如果有未选中则取消全选按钮，如果都选中了则激活全选按钮。

<!-- more -->

## 常规操作

点击每个列表选项时，遍历所有列表选项并检查是否有未选中的，如果有则可以确定全选按钮的状态为未选中，否则全选按钮置为选中。

```javascript
var oAllInput = document.querySelector('#all');
var aInput = document.querySelectorAll('ul input');

// 点击全选 input 时根据自己的状态来控制其他列表项的 input
oAllInput.onchange = function() {
    for(var i = 0; i < aInput.length; i ++) {
        aInput[i].checked = this.checked;
    }
};

// 每次点击每一个列表项的 input 时，判断全选的 input 是否需要被选中
for(var i = 0; i < aInput.length; i ++) {
    aInput[i].onclick = function() {
        if (!this.checked) {
            // 如果当前点击的按钮未选中，那就可以直接确定全选按钮的状态了
            oAllInput.checked = false;
            // 也就没有必要进行下去了
            return;
        }
        var bBar = true;
        for(var i = 0; i < aInput.length; i ++) {
            // 发现有一个没选中的
            if(!aInput[i].checked) {
                bBar = false;
                // 发现有一个没选中的也就可以断定 oAllInput 的状态了，就没有必要再进行下去了
                // 当然你不写 break 逻辑上也是对的，只是存在性能浪费
                break;
            }
        }
        oAllInput.checked = bBar;
    };
}
```

## 注意细节

思路和上面一样，下面的写法也是可以的，但有一点需要注意：点击列表中的每一项进行循环时，碰到未选中的一定要跳出循环，不然前面全选按钮的状态都会被最后一个按钮的状态所覆盖。

```javascript
for (var i = 0; i < aInput.length; i++) {
    aInput[i].onclick = function () {
        if (!this.checked) {
            // 如果当前点击的按钮未选中，那就可以直接确定全选按钮的状态了
            oAllInput.checked = false;
            // 也就没有必要进行下去了
            return;
        }
        for (var i = 0; i < aInput.length; i++) {
            if (!aInput[i].checked) {
                oAllInput.checked = false;
                // 这里的 break 是必须要加的！不然全选按钮的状态永远是以最后一个的选中状态为准，这并不是我们所希望的
                break;
            } else {
                oAllInput.checked = true;
            }
        }
    };
}
```

## 其他方法

每次点击列表中的按钮时，获取所有已选中 input 的长度，并判断已选中 input 的 length 是否等于所有 input 的 length，如果相等，就可以激活全选按钮啦，否则则取消全选。

```javascript
for (var i = 0; i < aInput.length; i++) {
    aInput[i].onclick = function () {
        var aInputChecked = document.querySelectorAll('ul input:checked');
        // 已选中 length 等于所有 length 就证明全选中了，也就可以激活全选按钮啦
        if (aInputChecked.length === aInput.length) {
            oAllInput.checked = true;
        } else {
            oAllInput.checked = false;
        }
    };
}
```