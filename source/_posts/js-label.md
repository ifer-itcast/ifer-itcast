---
title: 标记语句
date: 2019-06-21 11:03:06
tags: 标记语句
categories: JS 基础
---

<img src="/resource/images/pages/jsbase/label.png" alt="初始界面">

<!-- more -->

之前课上做过一个计算器的案例，选择 1、2、3、4 后会对后面填入的数字进行对应的运算并弹出结果，点击确定后又会回到初始界面。如果用户在初始界面输入的是数字 5，点击确定就会进行退出操作，不再回到初始界面了！

可实现代码如下：

```javascript
// 输入内容并返回
function inputValue() {
    var num1 = parseFloat(prompt('请输入第一个数：'));
    var num2 = parseFloat(prompt('请输入第二个数：'));
    return [num1, num2];
}

// 相当于创建了一个开关，默认开启状态
var bBar = true;

do {
    var opration = prompt('请选择要进行的运算：\n1. 加法运算\n2. 减法运算\n3. 乘法运算\n4. 除法运算\n5. 退出');
    opration = parseInt(opration);

    switch (opration) {
        case 1:
            var arr = inputValue();
            alert('相加的结果是：' + (arr[0] + arr[1]));
            break;
        case 2:
            var arr = inputValue();
            alert('相减的结果是：' + (arr[0] - arr[1]));
            break;
        case 3:
            var arr = inputValue();
            alert('相乘的结果是：' + (arr[0] * arr[1]));
            break;
        case 4:
            var arr = inputValue();
            alert('相除的结果是：' + (arr[0] / arr[1]));
            break;
        case 5:
            alert('退出...');
            // 如果用户输入的是 5，则关闭开关，那下次的循环 bBar 就是 false，while(bBar) 也就不会执行了
            bBar = false;
            // 默认只会退出当前的 switch
            break;
    }
} while (bBar);
```

其实上面退出循环的操作也可以使用**标记语句**来完成，感兴趣的同学可以点击[链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label)进去学习下，修改后的代码如下：

```javascript
// Step1: 指定标记点
loopPoint:
do {
    // ...
    switch (opration) {
        // ...
        case 5:
            alert('退出...');
            // Step2: 跳到标记点
            break loopPoint;
    }
} while (true);
```

**下面是测试代码：**

```javascript
var num = 0;
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        // 当 i 等于 3 并且 j 等于 3 时，会直接 break 里面一层的 for 循环，继续外面的 for 循环
        // 当 i 等于 3 时，导致 j 值为 [3,6) 之间的没有进行，num 少加了 3 次
        // 所以最终的 num 值为 33
        if (i == 3 && j == 3) {
            // 跳出当前循环
            break;
        }
        num++;
    }
}
console.log(num); // 打印结果是多少？
```

```javascript
var num = 0;
outerMark:
for (var i = 0; i < 6; i++) {
    // 外层 for 循环，i 等于 0 时，里层执行完 6 次
    // 外层 for 循环，i 等于 1 时，里层执行完 6 次
    // 外层 for 循环，i 等于 2 时，里层执行完 6 次
    // 外层 for 循环，i 等于 3 时，里层循环 j 执行了 3 次 [0, 3)
    // 最终的 num 值是 21
    for (var j = 0; j < 6; j++) {
        if (i == 3 && j == 3) {
            // 跳出到 outerMark 标记的地方
            break outerMark;
        }
        num++;
    }
}
console.log(num); // 打印结果是多少？
```

```javascript
var num = 0;
outerMark:
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        if (i == 3 && j == 3) {
            // 跳出外层的当前循环，继续下次 i++
            continue outerMark;
        }
        num++;
    }
}
console.log(num);  // 打印结果是多少？
```