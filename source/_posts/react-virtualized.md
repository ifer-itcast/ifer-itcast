---
title: react-virtualized
date: 2020-02-06 10:02:08
tags: react-virtualized
categories: React
---

react-virtualized 是一个优化长列表的插件，下面使用 List 基础组件，配合 AutoSizer、CellMeasurer、InfiniteLoader 等高阶组件，来做一个案例！

<!-- more -->

## lorem-ipsum

使用 [lorem-ipsum](https://www.npmjs.com/package/lorem-ipsum) 先来生成 3000 个列表

```javascript
// 生成 3000 个列表
const rowCount = 3000;
const list = Array(rowCount).fill().map(() => {
    return loremIpsum({
        count: 1, // 单词、句子或段落的数量
        units: 'sentences', // word(单词)、sentence(段落)、paragraph(句子)
        sentenceLowerBound: 3, // 每句话的最小字数
        sentenceUpperBound: 3 // 每句话的最大字数
    });
});
```

## List

使用 List 组件渲染，把上面 3000 条数据渲染到页面中

```javascript
function rowRenderer({
    index, // 数组的索引
    isScrolling, // 列表是否正在滚动中
    isVisible, // 当前行在列表中是否是可见的
    key, // 唯一 key
    parent, // 对父列表实例的引用
    style // 应用到行列表的样式，用于定位
}) {
    const item = list[index];
    return (
        <div key={key} style={style}>
            {item}
        </div>
    );
}
```

```javascript
export default class NewsList extends React.Component {
    render() {
        return <List width={300} height={300} rowCount={list.length} rowHeight={20} rowRenderer={rowRenderer} />;
    }
}
```

## AutoSizer

List 组件必须指定具体大小，使用 AutoSizer 可以使其动态适配父元素高度

```javascript
<AutoSizer>
    {({ height, width }) =>
        <List
            width={width}
            height={height}
            rowCount={list.length}
            rowHeight={20}
            rowRenderer={rowRenderer}
        />}
</AutoSizer>
```

## CellMeasurer

子元素太长时，使用 CellMeasurer 组件自适应高度。注意实现的效果是页面加载时的自适应，window.onresize 并不会自适应

```javascript
// #1 修改了 List 组件的 rowHeight={cache.rowHeight}
// #2 修改了 List 组件的 rowRenderer
// #3 新增了 List 组件 deferredMeasurementCache 属性
<List
    width={width}
    height={height}
    rowCount={list.length}
    rowHeight={cache.rowHeight}
    rowRenderer={rowRenderer}
    deferredMeasurementCache={cache}
/>
```

关于 rowRenderer 函数的解释

```javascript
// defaultHeight: 行最初的高度
// fixedWidth: 行的宽度是否是动态的
const cache = new CellMeasurerCache({ defaultHeight: 30, fixedWidth: true });
// cache: Cache to be shared between CellMeasurer and its parent Grid
// columnIndex: 列的索引，渲染的只有行没有列，写 0 即可
// rowIndex: 行的索引
function rowRenderer({
    index, // 数组的索引
    key, // 唯一 key
    parent, // 对父列表实例的引用
    style // 应用到行列表的样式，用于定位
}) {
    return (
        <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
            <div style={style}>
                {list[index]}
            </div>
        </CellMeasurer>
    );
}
```

## InfiniteLoader

使用 InfiniteLoader 动态加载数据，[代码链接](https://github.com/ifer-itcast/react-virtualized-study/blob/master/src/NewsList.js)