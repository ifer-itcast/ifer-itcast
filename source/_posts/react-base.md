---
title: React 必知必会
date: 2019-08-01 19:13:39
tags: [React 技巧, React 必知必会]
categories: React
---

努力更新中...

<!-- more -->

## 常见绑定事件的操作

**结论：应尽量避免 render 中使用箭头函数或 bind 绑定！**

bind 的形式

```javascript
handleClick() {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
<Button type="primary" onClick={this.handleClick.bind(this)}>点击</Button>
```

定义实例方法时采用箭头函数的形式，推荐！

```javascript
handleClick = () => {
    this.setState((prevState, props) => ({num: prevState.num+1}));
}
```

```javascript
<Button type="primary" onClick={this.handleClick}>点击</Button>
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

## 生命周期

```javascript
static getDerivedStateFromProps(nextProps, prevState) {
    // 将传入的 props 映射到 state 上面
    const { number } = nextProps;
    return number % 2 === 0 ? { num: number + 1 } : { num: number + 3 };
}
```

```javascript
getSnapshotBeforeUpdate() {
    // 发生于 render 之后，但并没有渲染完毕，可以从 DOM 中捕获一些信息（例如滚动之前的高度）
    // 返回值会作为 componentDidUpdate 的第三个参数
    console.log(2);
    return this.ulRef.current.offsetHeight
}
componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot);
}
```

## 跨组件传值

### 旧版 Context API

```javascript
// Step1: 父
static childContextTypes={
	color: PropTypes.string,
	changeColor:PropTypes.func
}
```

```javascript
// Step2: 父
getChildContext() {
	return {
		color: this.state.color,
		changeColor:(color)=>{
			this.setState({color})
		}
	}
}
```

```javascript
// step3: 子孙
static contextTypes={
	color: PropTypes.string,
	changeColor:PropTypes.func
}
```

```javascript
// step4: 子孙
<button onClick={() => this.context.changeColor('pink')}>改变孙子的颜色</button>
```

### 新版 Context API

```javascript
// Step1: 全局
const ThemeContent = React.createContext();
```

```javascript
// Step2: 父
const ctx = {
    color: this.state.color,
    changeColor: this.changeColor
};
<ThemeContent.Provider value={ctx}>
    <div style={{ border: '3px solid red' }}>
        <h1>父</h1>
        <Large1 />
        <Large2 />
    </div>
</ThemeContent.Provider>
```

```javascript
// Step3: 子孙
static contextType = ThemeContent;
```

```javascript
// Step4: 子孙
<button onClick={() => this.context.changeColor('pink')}>改变孙子的颜色</button>
```

**上面的 Step3 和 Step4 也可以改写如下：**

```javascript
<ThemeContent.Consumer>
{
	value => (
		<div style={{ border: '3px solid red', margin: 10, color: value.color }}>
			<h4>孙子2</h4>
			<button onClick={() => value.changeColor('pink')}>改变孙子的颜色</button>
		</div>
	)
}
</ThemeContent.Consumer>
```