---
title: React 必知必会
date: 2019-08-01 19:13:39
tags: [React 技巧, React 必知必会]
categories: React
---

努力更新中...

<!-- more -->

## 常见绑定事件的操作

**根据是否需要传值的情况择优使用！**

bind 的形式

```javascript
handleClick() {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
<Button type="primary" onClick={this.handleClick.bind(this)}>点击</Button>
```

定义实例方法时采用箭头函数的形式

```javascript
handleClick = () => {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
<Button type="primary" onClick={this.handleClick.bind(this)}>点击</Button>
```

绑定事件时采用箭头函数的形式

```javascript
handleClick() {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
<Button type="primary" onClick={() => this.handleClick()}>点击</Button>
```

实例方法和绑定事件都采用箭头函数的形式

```javascript
handleClick = () => {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
// 方便值的传递
<Button type="primary" onClick={() => this.handleClick()}>点击</Button>
```

constructor 中就扭正 this 的指向

```javascript
constructor(props) {
    super(props);
    this.state = {
        num: 0
    };
    this.handleClick = this.handleClick.bind(this);
}
```

```javascript
handleClick() {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
<Button type="primary" onClick={this.handleClick}>点击</Button>
```

## 通过 Ref 获取元素的几种方式

**需求：打开页面使 Input 获取焦点**

通过 this.refs.xxx

```javascript
<input type="text" ref="inputRef"/>
```

```javascript
// 注意是 componentDidMount
componentDidMount() {
    this.refs.inputRef.focus();
}
```

通过 ref 接受一个函数进行处理

```javascript
<input type="text" ref={ele => ele.focus()}/>
```

或者

```javascript
componentDidMount() {
    this.inputRef.focus();
}
<input type="text" ref={ele => this.inputRef=ele}/>
```

利用 React.createRef()

```javascript
constructor(props) {
    super(props);
    this.inputRef = React.createRef();
}
```

```javascript
componentDidMount() {
    this.inputRef.current.focus();
}
```

```javascript
<input type="text" ref={this.inputRef}/>
```