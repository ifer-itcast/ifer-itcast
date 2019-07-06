---
title: Webpack 基础篇
date: 2019-07-06 00:32:08
tags: Webpack
---

打通 Webpack 任督之基础篇 ~

<!-- more -->

## 基本跑通

### 初始化 package.json

```javascript
npm init -y
```

### 安装 webpack 和命令行工具

```javascript
// 为了避免不必要的版本问题，不建议全局安装！
npm i webpack webpack-cli -D
```

### 配置 webpack.config.js

约定大于配置，默认会把 `src/index.js` 打包到 `dist/main.js`，这里的默认配置名是 `webpack.config.js`，如果修改了需要按这种方式 `npx webpack --config webpack.config.my.js` 去寻找配置文件

```javascript
const path = require('path');
// 采用 CommonJS 模块规范
module.exports = {
    mode: 'development',     // 默认
    entry: './src/index.js', // 默认
    output: {
        path: path.resolve(__dirname, 'dist'), // 默认，__dirname 可省略，或 path.join(__dirname, './dist')
        filename: 'main.js'  // 默认
    }
};
```

### 配置 package.json

``` javascript
// webpack --mode production 可以执行模式
// 注意这里 package.json 中的 webpack 不是全局的，是 node_modules/.bin 下的
"scripts": {
    "build": "webpack"
}
```

### 打包并测试

执行 `npx webpack` 或者 `npm run build`，dist 中建个 HTML 文件引入打包后的代码可以测试打包的结果

### 命令行传参

关于如何给 package.json 中的命令传参？

``` javascript
// 如果 package.json 中只配置了这些
"scripts": {
    "build": "webpack"
}
```

``` javascript
// 可以通过 -- 的形式传参，相当于执行 webpack --config webpack.config.my.js
npm run build -- --config webpack.config.my.js
npm run build -- --config development
```

## 本地启动服务

通过 `webpack-dev-server` 可以启动一个服务（内部依赖的是 Express），它也可以在内存中生成打包后的代码 main.js，这点可以通过访问 `localhost:8080/main.js` 可以证明！也可以对 index 中的代码进行热更新等，需要在 index.html 中引入 `<script src="/main.js"></script>`

### 安装

``` javascript
cnpm i webpack-dev-server -D
```

### 配置 package.json

``` javascript
"scripts": {
    "dev": "webpack-dev-server"
}
```

也可以像下面一样配置一些参数，不过一般还是建议在 webpack.config.js 中进行配置

```javascript
"script": {
    "dev": "webpack-dev-server --open firefox --port 3000 --hot --progress --compress --host 127.0.0.1"
}
```

### 配置 webpack.config.js

默认启动服务的根目录是和 `webpack.config.js` 平级的目录，我想用 dist 当做根目录就需要通过 contentBase 来指定。例如配置后访问 localhost:8080/a.js 就是指的 dist 下的 a.js

``` javascript
module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "dist"), // 无论这里怎么配置，内存中的 main.js 还是通过 localhost:8080/main.js 访问
        progress: true, // 显示打包进度
        compress: true, // 开启 GZIP 压缩
        port: 9000,
        open: true,
    }
};
```

### 使用

运行 `npm run dev`，此时访问 http://localhost:8080/main.js 可以看到**内存**中的 main.js 文件

### 热更新 JS

在 dist 目录下新建一个 html 文件如下：

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src="/main.js"></script>
</body>
</html>
```

通过 localhost:8080 访问，修改 JS 文件会发现页面也进行了刷新。想在不刷新页面的情况下也更新 JS，这就是热更新（注意把 index.html 放在和 webpack.config.js 平级目录下，或通过 contentBase 修改根目录并在 index.html 放在其中）！

``` javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',     // 默认
    entry: './src/index.js', // 默认
    output: {
        path: path.resolve(__dirname, 'dist'), // 默认，__dirname 可省略
        filename: 'main.js'  // 默认
    },
    devServer: {
        contentBase: path.resolve('dist'),
        // step 1
        hot: true
    },
    plugins: [
        // step 2
        new webpack.HotModuleReplacementPlugin()
    ]
};
```

``` javascript
console.log('hello world');

// step 3
if(module.hot) {
    module.hot.accept();
}
```

### 注意

以上只是 JS 文件的热更新，修改 dist 中的 HTML 文件别说热更新，刷新都刷新不了，当然这也是正常的，后面解决！

~~如果关闭 JS 热更新（hot），更改 HTML 文件便会自动刷新！~~

## 模板文件

通过 `html-webpack-plugin` 可以引用模板文件，配合 `webpack-dev-server` 可以让此 HTML 文件也生成于内存中（快），当然也可以打包进 dist，打包后的文件中会自动帮我们引入 JS 等，这样也就不必在模板文件中手动引入 main.js 了！

### 安装

``` javascript
cnpm i html-webpack-plugin -D
```

### 配置 plugins

``` javascript
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    // 引入的模板
    template: path.join(__dirname, './src/index.html'),
    // 在内存中生成的文件的名称
    filename: 'index.html',
    // npm run build 或者运行 webpack-dev-server 时删除 html 文件中属性的双引号
    minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true // HTML 变成一行
    },
    // 给 HTML 中引入的文件加 Hash，防止缓存
    hash: true
});

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[hash:8].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        htmlPlugin
    ]
};
```

### 测试

此时修改 `src/index.js` 和 `src/index.html` 会自动的帮我们刷新页面！注意此时我删除了 index.js 中的如下热更新代码：

```javascript
// 暂时关闭热更新，为了让修改 index.html 时也实时刷新页面
if(module.hot) {
    module.hot.accept();
}
```

