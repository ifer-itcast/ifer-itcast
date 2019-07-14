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
// 为了避免不必要的版本问题，不建议全局安装！webpack 是核心模块，webpack-cli 是命令行工具
npm i webpack webpack-cli -D
```

```javascript
// 安装完成后可以使用以下命令检测版本号
npx webpack -v
npx webpack-cli -v
```

### 打包第一个应用

entry: 资源打包的入口，webpack 默认的入口就是 src/index.js，其实可以省略 entry 配置
output-filename: 输出资源名，默认会输出到 dist 目录
mode: 打包模式，webpack 会自动添加适合当前模式的一些配置

```javascript
npx webpack --entry=./src/index.js --output-filename=bundle.js --mode=development
```

### 使用 npm scripts

上面每次打包都要输入一大串命令，不好！这时候可以配置 package.json 如下：

```javascript
{
    "scripts": {
        "build": "webpack --output-filename=bundle.js --mode=development"
    }
}
```

下次只需执行 `npm run build` 即可

### 使用配置文件

可以使用 `npx webpack -h` 查看 webpack 相关的配置项以及命令行参数！当项目需要越来越多的配置项时，往 package.json 中添加就会变得越来越难以维护，为了解决这个问题，可以把所有的配置放在某个文件中，webpack 每次打包的时候会读取该文件的配置。

这里的默认配置文件是 `webpack.config.js`，如果修改了需要按这种方式 `npx webpack --config webpack.config.my.js` 去寻找对应的配置文件！约定大于配置，默认会把 `src/index.js` 打包到 `dist/main.js`。

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

通过 `webpack-dev-server` 可以启动一个服务（内部依赖的是 Express），它也可以在内存中生成打包后的代码 main.js，这点可以通过访问 `localhost:8080/main.js` 可以证明！

还有一项特性是 live-reloading（自动刷新），在 index.html 中引入 `<script src="/main.js"></script>` 可以进行测试！

还有更先进的功能 hot-module-replacement（模块热替换），不需要刷新浏览器就能展示更新后的内容！

### 安装

``` javascript
// 注意是开发依赖，项目上线时可以通过 npm install --production 过滤掉 devDependencies 中的模块
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
        contentBase: path.join(__dirname, "dist"), // 无论这里怎么配置，内存中的 main.js 还是通过 localhost:8080/main.js 访问，但这样配置时会影响实际资源的存放路径，例如通过 localhost:8080 想访问首页时，就要把 index.html 就要放在 dist 目录下
        // publicPath: '/dist', // 会为内存中的资源添加一个前缀，这时候再访问内存中的 main.js 就需要 localhost:8080/dist/main.js
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

[以上代码](https://github.com/ifer-itcast/webpack/tree/master/00_base)

## 使用 Loader

使用 loader 常写的有三种方式，以 css-loader 和 style-loader 为例，如下：

- loader

``` javascript
module: {
    rules: [
        {
            test: /\.css$/,
            loader: ["style-loader", "css-loader"]
        }
    ]
}
```

- use

``` javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        }
    ]
}
```

- use + loader

``` javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: [{
                loader: "style-loader",
                options: {
                    // 插入头部
                    insertAt: 'top'
                }
            }, "css-loader"]
        }
    ]
}
```

## 使用 HTML 片段

```javascript
cnpm i html-loader -D
```

```javascript
{
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]
    }
}
```

```javascript
import headerHtml from './header.html';
document.body.innerHTML = headerHtml;
```

## 使用样式

### 使用 CSS

#### 安装

```
cnpm i style-loader css-loader -D
```

#### 配置

``` javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
}
```

#### 使用

``` javascript
import './index.css';
require('./index.css');
```

### 使用 Less

#### 安裝

```
cnpm i less less-loader -D
```

#### 配置

module rules 下配置 loader

``` javascript
module: {
    rules: [
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }
    ]
}
```

### 使用 Sass

#### 安裝

```
cnpm i node-sass sass-loader -D
```

#### 配置

``` javascript
module: {
    rules: [
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }
    ]
}
```

### 给样式加前缀

使用 autoprefixer，并配合 postcss-loader 可以处理 CSS3 的前缀，最后打包时会自动带上

#### 安装

```
cnpm i postcss-loader autoprefixer -D
```

#### 配置

``` javascript
// 配置 loader
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', "css-loader", "postcss-loader"]
        }
    ]
}
```

根目录新建 postcss.config.js 并配置如下：

``` javascript
module.exports = {
    plugins: [require('autoprefixer')]
};
```

### 抽离样式

利用 `mini-css-extract-plugin` 插件可以抽离出 CSS，但使用此插件再次修改 CSS 后页面不会自动刷新或热更新，所以一般生产环境才使用！

#### 安装

```
cnpm i mini-css-extract-plugin -D
```

#### 配置

``` javascript
// 抽离 Less 同理
module: {
    rules: [
        {
            test: /\.css$/,
            use: [{
                // Step 1
                loader: MiniCssExtractPlugin.loader
            }, "css-loader", "postcss-loader"]
        }
    ]
},
plugins: [
    // Step 2
    new MiniCssExtractPlugin({
        // name 指的是入口文件的属性名，单入口默认是 main
        filename: '[name].css'
    })
]
```

#### 修改 CSS 导出的路径

也可以给导出的 CSS 划分目录等

``` javascript
new MiniCssExtractPlugin({
    // entry 的名字 main
    filename: 'css/[name].css'
})
```

[以上代码](https://github.com/ifer-itcast/webpack/tree/master/02_style)

## 使用图片

### JS 和 CSS 中使用

- file-loader 解决 CSS 和 JS 文件引入图片的路径问题
- url-loader 当图片小于 limit 的时候对图片进行 BASE64 编码，大于 limit 调用 file-loader 进行拷贝

#### 安装

```
cnpm i file-loader url-loader@1.0.1 -D
```

#### 配置

``` javascript
module: {
    rules: [
        {
            test: /\.(gif|jpg|jpeg|png|bmp|eot|woff|woff2|ttf|svg)$/,
            use: [
                {
                    // url-loader 里面封装了 file-loader
                    loader: 'url-loader',
                    options: {
                        // 小于 10kb 才需要 base64，这时候起作用的 url-loader
                        // 大于 10kb 会在内部自动调用 file-loader 去处理图片
                        // 默认不加这个参数全部是用 url-loader 搞成 base64
                        limit: 10 * 1024,
                        // 将打包的图片放到 img 目录，图片并不会放到缓存中，缓存的是 HTML、JS 和 CSS 文件
                        // 可以先 npm run build 到 dist/img 目录，当然也要把 devServer 的 contentBase 配置为 dist
                        outputPath: '/img/', // 资源的打包路径
                        // 给引入的图片资源加上前缀
                        publicPath: 'http://www.zhihur.com' // 资源的引用路径
                    }
                }
            ]
        }
    ]
}
```

#### 使用

``` javascript
// 若图片大小小于 limit imgSrc 将是一个 base64，否则是一个路径
import imgSrc from './images/timg.jpg';
const img = new Image();
img.src = imgSrc;
img.width = 100;
document.body.appendChild(img);
```

``` css
.logo {
    width: 300px;
    height: 100px;
    background: url(./images/timg.jpg) no-repeat;
}
```

### HTML 中使用

此 `html-withimg-loader` 插件可以帮助我们在 HTML 中使用图片

#### 安裝

```
cnpm i html-withimg-loader -D
```

#### 配置

``` javascript
module: {
    rules: [
        {
            test: /\.html$/,
            use: 'html-withimg-loader'
        }
    ]
}
```

#### 使用

``` html
<img src="timg.jpg" width="100" alt="">
```

[以上代码](https://github.com/ifer-itcast/webpack/tree/master/03_image)

## 使用 JS

主要是对高版本的 JS 代码进行转换，使浏览器兼容

### 转换箭头函数等

如下使用箭头函数，会发现打包后的代码也是箭头函数，没有转成 ES5，这不是我们所期望的

```javascript
let aaa = () => {
    console.log('hello1');
}
aaa();
```

解决如下

```javascript
// 需要使用 loader 并配合 presets
cnpm i babel-loader @babel/core @babel/preset-env -D
```

```javascript
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ]
        }
    },
    // 别忘记排除这个，注意这里的值没有引号！
    exclude: /node_modules/,
    // 最好写上
    include: path.resolve(__dirname, 'src')
}
```

上面 presets 的配置也可以写在 `.babelrc` 单独的文件中，例如：

```javascript
{
    "presets": ["@babel/preset-env"]
}
```

配置完上面再使用 uglifyjs 进行代码压缩时也就不会报错了

### 转换类等

```javascript
// 直接使用报错
class A {
    a = 1
}
let b = new A();
console.log(b.a);
```

```javascript
// 注意这里使用的是一个针对 JS 文件的插件，而不是 loader 或 预设
cnpm i @babel/plugin-proposal-class-properties -D
```

```javascript
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                ['@babel/plugin-proposal-class-properties',{loose: true}]
            ]
        }
    }
}
```

或 `.bablerc` 中配置如下：

```javascript
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        ["@babel/plugin-proposal-class-properties",{"loose": true}]
    ]
}
```

### 转换装饰器等

VSCode 中修改这个参数 `experimentalDecorators` 可以禁用使用装饰器时的警告

```javascript
@log
class A {
    a = 1
}

function log(target) {
    console.log(target);
}
```

```javascript
// 使用的也是一个插件
cnpm i @babel/plugin-proposal-decorators -D
```

```javascript
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                // 注意这里是有顺序讲究的
                ['@babel/plugin-proposal-decorators', {legacy: true}],
                ['@babel/plugin-proposal-class-properties',{loose: true}]
            ]
        }
    }
}
```

### 转换生成器等

```javascript
function *aaa(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
let it = aaa(1);
console.log(it.next()); // {value: 2, done: false}
console.log(it.next()); // {value: 3, done: false}
console.log(it.next()); // {value: 4, done: true}
```

```javascript
// 注意 @babel/runtime 是生产依赖
cnpm i @babel/plugin-transform-runtime -D
cnpm i @babel/runtime -S
```

```javascript
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                // 注意这里是有顺序讲究的
                ['@babel/plugin-proposal-decorators', {legacy: true}],
                ['@babel/plugin-proposal-class-properties',{loose: true}],
                ['@babel/plugin-transform-runtime']
            ]
        }
    }
}
```

### 转换 includes 等

```javascript
// 直接使用是可以允许，但并不会将打包后的代码转换成 ES5
console.log('aaa'.includes('a'));
```

```
cnpm i @babel/polyfill -S
```

```javascript
// 使用
require('@babel/polyfill')
console.log('aaa'.includes('a'));
```

注意：Babel 7.4.0 以后使用有变化，[参见](https://babeljs.io/docs/en/babel-polyfill#docsNav)

[以上代码](https://github.com/ifer-itcast/webpack/tree/master/04_js)

## 使用 TS

### 安装

```javascript
cnpm i typescript -g
cnpm i typescript ts-loader -D
```

### 配置

```javascript
// 生成 tsconfig.json 配置文件
tsc --init
```

```javascript
{
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                // 注意这里我配在了 src/ts 目录下
                include: path.resolve(__dirname, 'src/ts'),
                exclude: /node_modules/
            }
        ]
    }
}
```

### 使用

``` typescript
function sum(...args:number[]): number {
    return eval( args.join('+') );
}
export default sum;
```

``` javascript
import sum from './ts/test.ts';
console.log(sum(1, 2, 3));
```

[以上代码](https://github.com/ifer-itcast/webpack/tree/master/05_ts)

## 使用 React

### 安装

```
cnpm i react react-dom -S
```

### 使用

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

// 元素类型、属性、子节点
const virtualH1 = React.createElement('h1', {
    id: 'title',
    title: 'hello world'
}, 'hello world');

const virtualDiv = React.createElement('div', null, '嘻嘻', virtualH1);

// 要渲染的虚拟 DOM、容器
ReactDOM.render(virtualDiv, document.querySelector('#root'));
```

## 使用 JSX

上面的 React.createElement 的写法太累，想使用 JSX 语法，注意 JSX 最终还是会转换成 React.createElement 的形式去执行

### 安装

```
cnpm install @babel/preset-react -D
```

### 配置

```javascript
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react'
            ],
        }
    }
}
```

``` javascript
// 也可以在 .babelrc 中进行配置
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

```javascript
// 或者简写
{
    "presets": ["@babel/env", "@babel/react"]
}
```

### 使用

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<div>
    hello world
</div>, document.querySelector('#root'));
```

[以上代码](https://github.com/ifer-itcast/webpack/tree/master/06_react)

## 使用 jQuery

### 安装

```
cnpm i jquery -S
```

### 使用

``` javascript
import $ from 'jquery';
console.log($);
console.log(window.$);  // undefined
```

### 暴露给 window

为什么要暴露给 window 呢？因为有一些第三方模块依赖的是**全局** $，这时候就会出问题，例如 jQueryUI 依赖的就是 window.$

```
cnpm i expose-loader -D
```

``` javascript
// 注意 index.html 中需要 DOMContentLoaded 后才能拿到 $ 或 window.$
let $ = require('expose-loader?$!jquery');
console.log($);
console.log(window.$);
```

也可以在 rules 中进行如下配置：

```javascript
{
    test: require.resolve('jquery'),
    use: 'expose-loader?$'
}
// 后面只需下面写法
import $ from 'jquery';
```

### 全局变量

不希望每个模块使用时都 import $ from 'jquery'; 麻烦！

```javascript
{
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery' // $ 来自于 jquery 包，相当于 import $ from 'jquery'，每个模块中都注入了 $，并且 window 下也有，因为上面配置了 expose-loader
        })
    ]
}
```

``` javascript
// 无需引用，直接使用，真好！
console.log($);
console.log(window.$);
```

### 使用 CDN

``` javascript
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
```

``` javascript
// 模块和 HTML 文件中都可以直接使用 $ 和 window.$ 了
console.log($);
console.log(window.$);
```

### 最后优化

上面虽然模块中不引用也可以直接使用 $，但感觉怪怪的，并且使用 TS 时也通不过语法检查！我想引用后再使用，这样就解决了看起来奇怪和通不过 TS 语法检查的问题！

但是又引来了一个新的问题，HTML 中以及 通过 CDN 引入 jQuery 了，模块中再次引入的话会被打包，这样就多了一套重复的代码！

目的：JS 文件中引入第三方库但不想被打包！

解决：配置 [externals](https://webpack.docschina.org/configuration/externals/)，它可以指定一个变量是外部（script）来的，不需要被打包

``` javascript
module.exports = { 
    externals: {
        // 意思是这个 jquery 是外部提供的，别再给老子打包进去了
        jquery: '$'
    }
};
```

``` javascript
// 模块中随便用，不会被打包，美滋滋~
import $ from 'jquery';
console.log($, window.$);
```

[以上代码](https://github.com/ifer-itcast/webpack/tree/master/07_jquery)

## 文件压缩

注意在 production 模式下 build 文件，压缩功能才会生效！

### JS

Webpack4 中 production 模式会自动对 JS 文件进行压缩，再配合此插件如虎添翼！

#### 安装

```
cnpm i uglifyjs-webpack-plugin -D
```

#### 配置

``` javascript
optimization: {
    minimizer: [
        // 注意对 JS 的压缩需要在配置 babel 之后
        new UglifyjsWebpackPlugin({
            cache: true,
            parallel: true, // 多线程打包
            sourceMap: true // ES5 到 ES6 的映射方便调试
        })
    ]
}
```

### CSS

Webpack4 中 production 模式会自动对 JS 压缩不假，但并不会对 CSS 压缩

#### 安装

```
cnpm i optimize-css-assets-webpack-plugin -D
```

#### 配置

```javascript
{
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin()
        ]
    }
}
```

## 打包资源分类

- 图片分类通过配置 outputPath 将其统一分配到对应目录
- CSS 分类通过配置 plugins 中的 MiniCssExtractPlugin
- 通过配置 publicPath 可以在引用资源（例如CSS、Img）的时候会统一加上一个前缀
- 若只想给图片加前缀，也可以单独配置图片的 publicPath

## 打包多页应用

多入口 JS 文件，利用 html-webpack-plugin 它也可以自动帮我们引入 JS，src 指定多入口时也同样会帮我们打包进去，打包成一个文件引入

### 多入口单出口

``` javascript
const path = require('path');

module.exports = {
    // 注意这里一个数组，最后会把代码合成一个 index.js
    entry: [
        './src/test.js',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js' // 合成 index.js
    },
    mode: 'development'
};
```

### 多入口多出口

``` javascript
module.exports = {
    // 注意这里是一个 JSON
    entry: {
        test: './src/test.js',
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js' // 这里 name 是一个变量，会输出多个文件并引入到 index.html
    }
};
```

### 多入口多出口多文件

``` javascript
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlIndexPlugin = new HtmlWebpackPlugin({
    // 模板文件
    template: path.join(__dirname, './src/index.html'),
    // 生成文件
    filename: 'index.html',
    // 引入的 JS 文件
    chunks: ['test', 'index']
});

const htmlTestPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/test.html'),
    filename: 'test.html',
    chunks: ['test']
});

module.exports = {
    entry: {
        test: './src/test.js',
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        htmlIndexPlugin,
        htmlTestPlugin
    ],
    mode: 'development'
};
```

## 调试打包后的代码

解析 JS 的过程中可能会把高级语法转成低级语法，也可能对代码进行压缩，配置 source-map（源码映射） 可以调试原味代码

- devtool: 'source-map', 生成一个新的 sourcemap 文件，可以映射到列
- devtool: 'eval-source-map', 在当前打包文件中生成，可以映射到列
- devtool: 'cheap-module-source-map', 生成一个新的 sourcemap 文件，可以保留起来，不能调试
- devtool: 'cheap-module-eval-source-map', 在同一文件中生成，不能映射到列

## 实时打包

npx webpack --mode development 编译完就断开了，默认 watch: false，希望实时打包成实体文件

``` javascript
watch: true,
watchOptions: {
    ignored: /node_modules/,
    // 每秒向文件询问的次数
    poll: 1000,
    // 多少毫秒内重复保存不打包
    aggregateTimeout: 500
}
```

用 webpack-dev-server 其实对上面已经处理了

## 版权声明

``` javascript
// 会在请求头加上代码信息
new webpack.BannerPlugin('weixian')
```

## 拷贝静态文件

例如文档，设计稿等

### 安装

```
npm i copy-webpack-plugin -D
```

### 配置

```
new CopyWebpackPlugin([{
    from: path.resolve(__dirname, 'src/assets'),
    to: path.resolve(__dirname, 'dist/assets')
}])
```

## 打包前先清空输出目录

### 安装

```
npm i clean-webpack-plugin -D
```
### 配置

```javascript
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
```

```javascript
plugins: [
    new CleanWebpackPlugin()
]
```

## 服务器代理

### 场景一

**前端代码**

``` javascript
// 8080 下的页面请求 3001 下的数据必然不行
fetch('/api/user').then(res => {
    return res.json();
}).then(data => {
    console.log(data);
});
```

**Webpack 配置**

``` javascript
devServer: {
    contentBase: './dist',
    port: 8080,
    host: 'localhost',
    proxy: {
        // 如果请求 `localhost:8080/api/users` 开头的就会被代理到 `localhost:3001/api/users`
        // 自己定义个接口的特点，例如 call
        "/api": "http://localhost:3001"
    }
}
```

**服务端代码**

``` javascript
const express = require('express');
const app = express();

app.get('/api/user', (req, res) => {
    res.send({
        name: 'ifer',
        age: 18
    });
});

app.listen(3001);
```

### 场景二

后端写接口的时候不可能都加上 /api 吧，太蛋疼了，需要路径的重命名！

``` javascript
devServer: {
    // 生成静态文件根目录
    contentBase: './dist',
    port: 8080,
    host: 'localhost',
    proxy: {
        // 请求的 http://localhost:8080/api/users 映射到 http://localhost:3001/users
        // 如果请求的是 /api/users 把 /api 去掉
        "/api": {
            target: "http://localhost:3001",
            pathRewrite: {
                // "^/api": ""
                "/api": ""
            }
        }
    }
},
```

**后端只需**

``` javascript
app.get('/user', (req, res) => {
    res.send({
        name: 'test',
        age: 18
    });
});
```

### 场景三

通过配置 Webpack 也可以实现简单的数据 Mock

``` javascript
devServer: {
    // 生成静态文件根目录
    contentBase: './dist',
    port: 8080,
    host: 'localhost',
    // 钩子，启动服务之前做一些事情
    before(app) {
        app.get('/api/user', (req, res)=> {
            res.send({
                user: 'ifer',
                age: 18
            });
        });
    }
},
```

一般使用的时候最好把 mock 数据独立成一个文件，例如：

``` javascript
const mock = require('./mock');
devServer: {
    // 生成静态文件根目录
    contentBase: './dist',
    port: 8080,
    host: 'localhost',
    before(app) {
        mock(app);
    }
},
```

```javascript
// mock.js
module.exports = function(app) {
    app.get('/api/user', (req, res) => {
        res.send({
            user: 'ifer',
            age: 18
        });
    });
};
```

### 场景四

希望在已有的 Express 服务中集成 webpack，好处是方便利用 Express，不需要代理了，下次只需要启动一个服务（server.js）即可，webpack.config.js 的 devServer 最好不要再配置 proxy 了

```javascript
npm i webpack-dev-middleware -D
```

``` javascript
// express 虽然 package.json 中没有，webpack-dev-server 已经依赖了 ...
const express = require('express');
const morgan = require('morgan');
const app = express();
const webpack = require('webpack');

/**
 * 1、webpack 中集成了 express(webpack-dev-server)
 * 2、express 中集成 webpack
 */

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));
app.use(morgan('dev'));

app.get('/user', (req, res) => {
    res.send({
        name: "ifer",
        age: 17
    });
});

app.listen(3001);
```

[以上代码](https://github.com/ifer-itcast/webpack/tree/master/10_server)

## resolve 解析

### extensions

指定 extensions 之后可以不用在 require 或是 import 的时候加文件扩展名，会依次寻找。当然本来默认引入 JS 也是不用加扩展名的，例如可以自定义个 .yangk 的文件。

```javascript
resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
}
```

### alias

```javascript
// 会根据 bootstrap 下的 package.json 中的 main 字段查找，main 中是什么这里引入的就是什么
import 'bootstrap';
```

```javascript
// 所以一般引入CSS时一般这样引入，查找慢，容易出错
import 'bootstrap/dist/css/bootstrap.min.css';
```



```javascript
// 解决，配置别名，可以加快 webpack 查找模块的速度
const bootstrapPath = path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css');

resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
    alias: {
        bootstrap: bootstrapPath
    }
}
```

使用

```javascript
// 应用的就是 node_modules/bootstrap/dist/css/bootstrap.min.css
import 'bootstrap';
```

在 HTML 文件中测试是否成功

``` html
<button class="btn btn-primary">hello world</button>
```

### modules

寻找 modules 的配置

``` javascript
modules: [
    // 不要东奔西走了，都去 node_modules 下找，node_modules 找不到去 test 下找
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, 'test')
]
```

```javascript
// node_modules 同级目录下新建 test 文件夹，里面存放 a.js
import 'a.js';
```

### resolveLoader

寻找 loader 的配置，单独有一个入口

``` javascript
resolveLoader: {
    modules: [
        path.resolve('node_modules'),
        path.resolve('src/loaders')
    ]
}
```

### mainFiles

``` javascript
// 默认先找先找模块中的 index.js 再找 root
mainFiles: ['index', 'root'],
```

### mainFields

默认情况下 package.json 文件按照文件中 main 字段的文件名来查找文件，其实是否先找 main 是可以配置的。先找 package.json 中的 style，再找 main，那上面 bootstrap alias 就不用配了，因为 style 中有指明路径。

```javascript
mainFields: ['style', 'main'],
```

## 开发和线上环境

生产环境一般需要分离 CSS 成单独的文件，以便多个页面共享同一个CSS文件、需要压缩 HTML/CSS/JS 代码、需要压缩图片等

开发环境需要生成 sourcemap 文件、需要打印 debug 信息、需要 live reload 或者 hot reload 功能等

### 定义可以到处使用的全局变量

```javascript
plugins: [
    new webpack.DefinePlugin({
        // DEV: "'dev'" // 'dev': 代表的是 dev 变量
        DEV: JSON.stringify('dev'),
        FLAG: 'true' // 会把单引号去掉，就是布尔 true
    })
]
```

### 怎么拿到 mode

env 环境变量，argv 命令行环境变量

``` javascript
module.exports = (env,argv) => ({
    // 优化相关的
    optimization: {
        minimizer: argv.mode === 'production' ? [
            new UglifyjsWebpackPlugin(), // 压缩 JS
            new OptimizeCssAssetsWebpackPlugin() // 压缩 CSS
        ] : []
    }
})
```

### 拆分配置

```
yarn add webpack-merge -D
```

```javascript
// webpack.prod.js
const {smart} = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = smart(base, {
    mode: 'production',
    optimization: {
        minimizer: []
    },
    plugins: []
});
```

```javascript
// webpack.dev.js
const {smart} = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = smart(base, {
    mode: 'development',
    devServer: {},
    devtool: 'source-map'
});
```

```
npm run build -- --config webpack.dev.js
```

## Webpack 优化

### noParse

如果知道一个包没有依赖项，可以使用 noParse 将其忽略掉

```javascript
module: {
    noParse: /jquery/ // 不再去解析 jQuery 中的依赖关系
}
```

### exclude 和 include

匹配文件解析时进行排除和包含

### IgnorePlugin

忽略不希望打包的模块，例如 moment 语言包

```javascript
plugins: [
    // moment 中引入的包忽略掉 ./locale 引入的文件
    new webpack.IgnorePlugin(/^\.\/locale/,/moment$/)
]
```

```javascript
import moment from 'moment';
import 'moment/locale/zh-cn'; // 需要手动引入 moment 下的中文包
moment.locale('zh-cn');

let r = moment().endOf('day').fromNow();
console.log(r);
```

### DefinePlugin

定义一些可以在模块中使用的全局变量，例如 PRODUCTION、VERSION 等等

``` javascript
new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(false), // 是否生成环境
    VERSION: "1+1",
    INFO: {
        NAME: JSON.stringify("XXX")
    }
}),
```

### 动态链接库

打包时速度和主文件大小（dll文件会当做单独的文件引入）优化

把 React 和 ReactDOM 不需要每次都重新打包，可以先打包好，在开发时引用打包好的文件即可

下次引入 import React from 'react' 时，会去 react.manifest.json 中找有没有 var 这个文件的 name，这里就是有没有 var react_dll，然后会找 content 中的属性，例如 "./node_modules/_react-dom@16.7.0@react-dom/index.js" 在 dll.js 中对应的区域代码，这个文件就是打包好的文件了

DLL 文件是动态链接库，动态库中可以包含给其他模块调用的函数和数据

react，redux，react-dom 很大，我希望只编译一次再也不需要编译了

- 把基础模块独立出来打包到单独的动态链接库

- 当需要导入的模块在动态库里的时候，模块不能再次被打包，而是去动态库里获取

- 生成 dll 依赖 webpack/lib/DllPlugin

- 引入 dll 依赖 webpack/lib/DllReferencePlugin

#### 新建 dll 配置文件

例如：react.webpack.config.js

#### 配置单独的生成 dll 的 webpack

```
npx webpack --config react.webpack.config.js --mode development
```

``` javascript
// 或 packge.json 中
{
    "test": "webpack --config react.webpack.config.js"
}
```

``` javascript
const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

// 动态链接库，会打包出 dll.js 和 react.manifest.json
module.exports = {
    mode: 'development',
    entry: {
        // 这里的 react key 随便起不是固定的
        react: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dll.js',
        library: '[name]_dll' // var react_dll = xxx
    },
    plugins: [
        new DllPlugin({
            name: '[name]_dll',
            path: path.resolve(__dirname, 'dist', '[name].manifest.json')
        })
    ]
};
```

```
// 先生成动态链接库
npm run test
```

#### 打包并引用

``` javascript
// 另外一个主 webpack 配置文件中再次进行关联 manifest 的配置
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
plugins: [
    // 关联
    new DllReferencePlugin({
        manifest: path.resolve(__dirname, 'dist', 'react.manifest.json')
    })
]
```

```
// 速度大提升
npm run build
```

需要先 npm run test 保证 dist 中存在 dll 和 manifest 文件

重新 npm run dev 发现并不可用，需要在模板文件中引如 dll 文件，然后再 npm run dev

``` html
<div id="root"></div>
<script src="/dll.js"></script>
```

### 多线程打包

HappyPack 打包时优化，快乐打包，多线程打包 ~~

基于NodeJS 的 Webpack 是单线程的，CPU 处理慢，Node IO 操作还可以，但 CPU 计算不行，因为是单线程的

需要修改和配置 module rules 下的 loader 和 plugins，npm run build 进行测试

项目小的时候慎用！例如切一张破图分给10个人，还要合在一起。分配进程（需要时间）的时间都打包好了

``` javascript
const HappyPack = require('happypack');
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'happypack/loader?id=css'
            },
            {
                test: /\.jsx?$/,
                // use: 'babel-loader',
                use: 'happypack/loader?id=js',
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            }
        ]
    },
    plugins: [
        // 把上面的 use 移到了这里
        // 上面的 use 可以不用数组，例如 babel-loader，但这里必须是数组的形式
        new HappyPack({
            id: 'js',
            use: ['babel-loader']
        }),
        new HappyPack({
            id: 'css',
            use: ['style-loader', 'css-loader', 'postcss-loader']
        })
    ]
};
```

### Tree Shaking

webpack4 production 模式默认就实现 Tree Shaking，打包时 production mode 下并不会打包 minus，会自动去除掉死（无用的）代码

内部调用的是 uglifyjs

注意 Tree Shaking 默认只会针对 ES6 import 的语法，不支持 require 语法

```javascript
let sum = (a, b) => {
    return a + b + 'sum';
};
let minus = (a, b) => {
    return a - b + 'minus';
};

export default {
    sum, minus
};
```

```javascript
import calc from './test2.js';
calc.sum(1,2);
```

### Scope Hoisting

Webpack4 production mode 下实现了 Scope Hoisting，作用域提升，可以让 webpack 打包出来的代码更小更快

```javascript
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c; // 在 webpack 中可以自动省略简化一些代码，直接 1+2+3
console.log(d);
```

### 提取公共代码

可以实现多页面打包的时候抽离出公共的代码文件

```javascript
// 新版本无需安装了
cnpm i common-chunk-and-vendor-chunk -D
```

```javascript
// index.js
import './a';
import './b';
console.log('index.js');
```

```javascript
// other.js
import './a';
import './b';
console.log('other.js');
```

上面会抽离出一个 common~index~other.js

假如 A 页面用了 jQuery，B 页面也引用了 jQuery，需要提取出公共的代码块 jQuery

``` javascript
module.exports = {
    entry: {
        pageA: './src/pageA.js',
        pageB: './src/pageB.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0, // 有1个字符重了就拿出来
                },
                vendor: {
                    test: /node_modules/, // 只有第三方的我要
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0,
                    priority: 10 // 权重，先走这里，先抽离第三方，再抽离自己的
                }
            }
        }
    }
};
```

### 懒加载

```
yarn add @babel/plugin-syntax-dynamic-import -D
```

```javascript
// 配置
{
    test: /\.js$/,
    use: [{
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react'
            ],
            plugins: [
                '@babel/plugin-syntax-dynamic-import'
            ]
        }
    }]
}
```

```javascript
// source.js
export default 'xxx';

// 使用
let btn = document.createElement('button');
btn.innerHTML = 'xxx';
btn.addEventListener('click', function() {
    // ES6 草案中的语法，JSONP 实现动态加载文件
    import('./source.js').then(res => {
        console.log(res.default);
    });
});
document.body.appendChild(btn);
```

### 热更新

HMR 可以理解为增强版的 Hot Reloading，但不用整个页面刷新，而是局部替换掉部分模块代码并且使其生效

```javascript
// devServer
hot 为 true
```

```javascript
{
    plugins: [
        new webpack.NamedModulesPlugin(), // 打印哪个模块更新了
        new webpack.HotModuleReplacementPlugin(),
    ]
}
```

```javascript
// JS 模块中
if(module.hot) {
    module.hot.accept();
}
```


``` javascript
// 可以在入口里面一气呵成
render();
if(DEVELOPMENT) {
    if(module.hot) {
        // 不指定入口代表所有的模块
        module.hot.accept(() => {
            render();
        });
    }
}
```

### 封装 log 方法

webpack 时传递的 mode 参数，是可以在我们的应用代码运行时，通过 process.env.NODE_ENV 这个变量获取的

``` javascript
export default function log(...args) {
    if(process.env.NODE_ENV === 'development') {
        console.log.apply(console,args);
    }
}
```

### 拆分配置

- webpack.base.js
- webpack.development.js
- webpack.production.js
- webpack.test.js

可以把 webpack 的配置按照不同的环境拆分成多个文件，运行时根据环境加载

依赖 webpack-merge 组合到一起

以上代码 `03_development`

### 多入口

最后会生成 pageA.js 和 pageB.js

``` javascript
// 多文件，多入口
module.exports = {
    entry: {
        pageA: './src/pageA',
        pageB: './src/pageB'
    },
    output: {
        path: path.resolve('dist'),
        // name 就是入口的 key，例如 pageA
        filename: '[name].js'
    },
};
```

生成多 HTML 引用对应的多 JS

``` javascript
module.exports = {
    entry: {
        pageA: './src/pageA',
        pageB: './src/pageB'
    },
    output: {
        path: path.resolve('dist'),
        // name 就是入口的 key，例如 pageA
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'pageA.html',
            chunks: ['pageA']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'pageB.html',
            chunks: ['pageB']
        }),
    ]
};
```

### librayTarget 和 library

当用 webpack 去构建一个可以被其他模块导入使用的库时需要用到它们

- libraryTarget 配置以何种方式导出库

- library 配置导出库的名称

``` javascript
const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HappyPack = require('happypack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        libraryTarget: 'var', // 默认
        // libraryTarget: 'commonjs',
        // libraryTarget: 'commonjs2',
        // libraryTarget: 'this',
        // libraryTarget: 'window',
        // libraryTarget: 'global',
        library: 'weixian'
    }
};
```

打包的结果就是：

``` javascript
var weixian=(function(mudules){})();
```

### CDN

- 内容分发网络，把资源部署到世界各地可以就近获取资源，从而加快速度
- 文件名加上 Hash 值避免缓存
- 为了并行加载不阻塞，把不同的静态资源分配到不同的CDN服务器上

### 输出分析

```
npx webpack --profile --json > stats.json
```

```
https://webpack.github.io/analyse
```