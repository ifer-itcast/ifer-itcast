---
title: React Hooks
date: 2020-04-01 22:19:44
tags:
---

相关 API 的使用及注意！

<!-- more -->

## useState

### 使用

```javascript
function Test() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>
                {count}
            </p>
            <button onClick={() => setCount(count + 1)}>add</button>
        </div>
    );
}
```

### 问题

```javascript
function Test(props) {
    console.log('每次点击按钮渲染这里都会执行，其实 defaultCount 的赋值没必要每次都进行');
    const defaultCount = props.defaultCount || 0;
    const [count, setCount] = useState(defaultCount);
    return (
        <div>
            <p>
                {count}
            </p>
            <button onClick={() => setCount(count + 1)}>add</button>
        </div>
    );
}
```

### 解决

```javascript
function Test(props) {
    // useState 参数可以是一个回调函数，可以把初始值当做此函数的返回值
    const [count, setCount] = useState(() => props.defaultCount || 0);
    return (
        <div>
            <p>
                {count}
            </p>
            <button onClick={() => setCount(count + 1)}>add</button>
        </div>
    );
}
```

