---
title: 单元测试
date: 2021-02-04 08:35:03
tags: [单元测试]
categories: 面试
---


测试是一种验证我们**代码是否可以按照预期工作**的一种方法，单元测试是指对软件中的**最小可测试单元进行检测和校验**！

<!-- more -->

## 基本写法

```js
const add = (num1, num2) => num1 * num2;

const r = add(1, 2);

const expect = 3;

if (r !== expect) {
    try {
        throw new Error('测试不通过');
    } catch (e) {
        console.log(e.message);
    }
} else {
    console.log('测试通过');
}
```

## 函数封装

```js
const add = (num1, num2) => num1 * num2;

const expect = res => {
    return {
        toBe: actual => {
            // 函数封装不要替外界决定做什么事情
            throw new Error('测试失败');
        },
    };
};

const test = (desc, fn) => {
    try {
        fn();
    } catch (e) {
        console.log(`${desc}没有通过`);
    }
};

test('加法测试', () => {
    expect(add(1, 2)).toBe(3);
});
```

## 使用 Jest

```bash
npm init -y
npm i jest -D
```

```js
// add.js
const add = (num1, num2) => num1 * num2;
module.exports = { add };
```

```js
// add.test.js
const { expect } = require('@jest/globals');
const { add } = require('./add');

test('加法测试', () => {
    expect(add(1, 2)).toBe(3);
});
```

```bash
npx jest
```