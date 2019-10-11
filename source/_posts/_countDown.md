---
title: 倒计时
date: 2019-09-23 16:46:31
tags: 倒计时
---

倒计时原理：未来时间（固定） - 当前时间（越来越大） = 剩余时间（越来越小）

## 本地时间

```javascript
// 写法1
const aSpan = document.querySelectorAll('#wrap span');
const oInput = document.querySelector('input');

let oFeatureTime = new Date('2019-09-24 18:00:00');
let oNowTime = null;
let iDisTime = 0;

countDown();

function countDown() {
    oNowTime = new Date();

    iDisTime = (oFeatureTime - oNowTime) / 1000; // 毫秒 => 秒

    aSpan[0].innerHTML = Math.floor(iDisTime / 60 / 60 / 24); // 分 => 时 => 天
    aSpan[1].innerHTML = Math.floor(iDisTime / 60 / 60 % 24); // 时
    aSpan[2].innerHTML = Math.floor(iDisTime / 60 % 60); // 分
    aSpan[3].innerHTML = Math.floor(iDisTime % 60); // 秒
}

setInterval(countDown, 1000);

oInput.onkeydown = function(e) {
    if(e.keyCode === 13) {
        oFeatureTime = new Date(this.value);
    }
};
```

```javascript
// 写法2
const aSpan = document.querySelectorAll('#wrap span');
const oInput = document.querySelector('input');

let oFeatureTime = new Date('2019-09-24 18:00:00');
let oNowTime = null;
let iDisTime = 0;

let [days, hours, minutes, seconds] = [0, 0, 0, 0];

countDown();

function countDown() {
    oNowTime = new Date();

    iDisTime = (oFeatureTime - oNowTime) / 1000; // 毫秒 => 秒

    days = Math.floor(iDisTime / 60 / 60 / 24); // 天
    aSpan[0].innerHTML = days;
    iDisTime = iDisTime - days * 60 * 60 * 24;

    hours = Math.floor(iDisTime / 60 / 60); // 时
    aSpan[1].innerHTML = hours;
    iDisTime = iDisTime - hours * 60 * 60;

    minutes = Math.floor(iDisTime / 60); // 分
    aSpan[2].innerHTML = minutes
    iDisTime = iDisTime - minutes * 60;

    seconds = Math.floor(iDisTime); // 秒
    aSpan[3].innerHTML = seconds;
}

setInterval(countDown, 1000);

oInput.onkeydown = function(e) {
    if(e.keyCode === 13) {
        oFeatureTime = new Date(this.value);
    }
};
```

## 服务端时间

```javascript
const aSpan = document.querySelectorAll('#wrap span');
const oInput = document.querySelector('input');

let oFeatureTime = new Date('2019-09-24 18:00:00');
let oNowTime = null;
let iDisTime = 0;

function countDown() {
    iDisTime = (oFeatureTime - oNowTime) / 1000; // 毫秒 => 秒

    oNowTime = +oNowTime + 1000;

    aSpan[0].innerHTML = Math.floor(iDisTime / 60 / 60 / 24); // 分 => 时 => 天
    aSpan[1].innerHTML = Math.floor(iDisTime / 60 / 60 % 24); // 时
    aSpan[2].innerHTML = Math.floor(iDisTime / 60 % 60); // 分
    aSpan[3].innerHTML = Math.floor(iDisTime % 60); // 秒
}

setInterval(countDown, 1000);

function loadSerTime() {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', 'blank.json');
    xhr.onreadystatechange = function() {
        // 非2或3开头的状态码直接返回
        if(!/^(2|3)\d{2}$/.test(xhr.status)) return;
        
        // HEAD 请求状态码是没有 3 的，因为不需要等待响应主体
        if(xhr.readyState === 2) {
            oNowTime = new Date(xhr.getResponseHeader('date'));
            countDown();
        }
    };
    xhr.send();
}
loadSerTime();
```