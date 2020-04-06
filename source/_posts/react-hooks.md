---
title: React Hooks
date: 2020-04-01 22:19:44
tags:
---

相关 API 的使用及注意！

<!-- more -->

## useState

### 基本使用

```javascript
import React, { useState } from 'react';

function Example() {
	// 声明一个叫 "count" 的 state 变量
	const [count, setCount] = useState(0);
	return (
		<div>
			<p>
				You clicked {count} times
			</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}

function App() {
	return <Example />;
}

export default App;
```

和下面的 class 写法等价！

```javascript
class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		};
	}
	render() {
		return (
			<div>
				<p>
					You clicked {this.state.count} times
				</p>
				<button onClick={() => this.setState({ count: this.state.count + 1 })}>Click me</button>
			</div>
		);
	}
}
```

### 一个问题

```javascript
import React, { useState } from 'react';

function Example(props) {
	console.log('每次点击按钮渲染这里都会执行，其实 defaultCount 的赋值没必要每次都进行');
	const defaultCount = props.defaultCount || 0;
	const [count, setCount] = useState(defaultCount);
	return (
		<div>
			<p>
				You clicked {count} times
			</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}

function App() {
	return <Example defaultCount={3} />;
}

export default App;
```

### 解决方案

```javascript
import React, { useState } from 'react';

function Example(props) {
	// useState 参数可以是一个回调函数，可以把初始值当做此函数的返回值
	const [count, setCount] = useState(() => {
		console.log('这里只是初始化时执行一次！');
		return props.defaultCount || 0;
	});
	return (
		<div>
			<p>
				You clicked {count} times
			</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}
```

## useEffect

可以在函数组件中执行副作用操作

### 基本使用

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
	const [count, setCount] = useState(0);
	// 模拟 componentDidMount 和 componentDidUpdate
	useEffect(() => {
		// 初始化和任何状态发生变化的时触发
		document.title = `You clicked ${count} times`;
	});

	return (
		<div>
			<p>
				You clicked {count} times
			</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}
```

### 清除 Effect

有些副作用可能需要清除，需要返回一个函数！

```javascript
function Example() {
	const [size, setSize] = useState({
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight
	});
	const onResize = () => {
		setSize({
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		});
	};
	useEffect(() => {
		// useEffect 第二个参数传递空数组，初始化时才会执行，而绑定事件的操作也只需要执行这一次！
		window.addEventListener('resize', onResize);
		return () => {
			// useEffect 第一个参数中返回的函数，在组件卸载时会触发
			window.removeEventListener('resize', onResize);
		};
	}, []);
	return (
		<div>
			<p id="size">
				width: {size.width}, height: {size.height}
			</p>
		</div>
	);
}
```

### 一个问题

由于选择元素绑定事件的操作只是初始化的时候对**当前的 DOM 元素**执行了一次

一旦 count 变化（DOM 元素被替换/其实是销毁了，下次加载的又是全新的），点击事件的效果就“失效”了。DOM 元素在相同标签下替换无此问题，因为 DOM Diff 时会被复用！

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
	const [count, setCount] = useState(0);
	const onClick = () => {
		console.log('一旦绑定事件的元素被替换过了，此元素就不再具备事件效果了，因为新替换的元素并没有进行事件绑定');
	};
	useEffect(() => {
		document.querySelector('#size').addEventListener('click', onClick);
		return () => {
			document.querySelector('#size').removeEventListener('click', onClick);
		};
	}, []);
	return (
		<div>
			<p>
				{count}
			</p>
			<button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				click
			</button>
			{count % 2 ? <div id="size">hello world2</div> : <p id="size">hello world1</p>}
		</div>
	);
}
```

### 解决方案

有涉及到【根据状态】来进行元素切换（此元素绑定的有事件），每次状态变化时都进行重新绑定！

```javascript
useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick);
    return () => {
        document.querySelector('#size').removeEventListener('click', onClick);
    };
}, [count]);
```