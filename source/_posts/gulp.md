---
title: Gulp
date: 2020-04-24 17:01:56
tags: [自动化构建, Gulp]
categories: 工具
---

## 基本使用

```
npm init -y
npm i gulp -D
```

```javascript
// 创建入口文件：code gulpfile.js
exports.foo = done => {
    console.log('hello world');
    done(); // 标记当前任务已完成
};
exports.default = done => {
    console.log('hello default');
    done();
};
```

```
npx gulp foo
npx gulp // 会自动运行 default 任务
```

<!-- more -->

## 组合任务

串行任务：一个接一个执行

```javascript
const { series, parallel } = require('gulp');

const task1 = done => {
    setTimeout(() => {
        console.log('task1~');
        done();
    }, 1000);
};
const task2 = done => {
    setTimeout(() => {
        console.log('task2~');
        done();
    }, 1000);
};
const task3 = done => {
    setTimeout(() => {
        console.log('task3~');
        done();
    }, 1000);
};

exports.foo = series(task1, task2, task3);
```

```
npx gulp foo // 会依次打印 task1、task2、task3
```

并行任务：一起执行

```javascript
npx gulp foo // 会同时打印 task1、task2、task3
```

## 异步任务

Gulp 是如何处理异步任务的呢？即如何通知 Gulp 异步任务的完成了

回调函数

```javascript
exports.callback = done => {
    console.log('callback task~');
    done();
};
```

```javascript
// 报出错误
exports.callback_error = done => {
    console.log('callback task~');
    done(new Error('task failed!'));
};
```

Promise

```javascript
exports.promise = () => {
    console.log('promise task~');
    return Promise.resolve();
};

exports.promise_error = () => {
    console.log('promise task~');
    return Promise.reject(new Error('task failed!'));
};
```

async

```javascript
const timeout = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
};

exports.async = async () => {
    await timeout(1000);
    console.log('async task~');
};
```

stream

```javascript
const fs = require('fs');

exports.stream = () => {
    const readStream = fs.createReadStream('package.json');
    const writeStream = fs.createWriteStream('temp.txt');
    readStream.pipe(writeStream);
    return readStream;
};
```

上面 `return readStream;` 的操作，类似于：

```javascript
readStream.on('end', () => {
    done();
});
```

## 构建原理

输入（读取文件） => 加工（压缩文件） => 输出（写入文件）

```javascript
const fs = require('fs');
const { Transform } = require('stream');

exports.default = () => {
    // 读取流
    const read = fs.createReadStream('normalize.css');
    // 写入流
    const write = fs.createWriteStream('normalize.min.css');
    // 转换流
    const transform = new Transform({
        transform: (chunk, encoding, callback) => {
            // chunk => 读取流读取到的内容（Buffer）
            const input = chunk.toString();
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '');
            // callback is a error first function
            callback(null, output);
        }
    });

    // 读取流转换后再导入到写入流
    read.pipe(transform).pipe(write);
    // 需要返回读取流，Gulp 能根据流的状态来判断此任务是否完成
    return read;
};
```

## 常规操作

Gulp 大多数时候就是对文件的处理，Gulp 提供 `src` 方法充当读取流，各种各样的`插件`充当转换流，`dest` 方法充当写入流

```javascript
const { src, dest } = require('gulp');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');

exports.default = () => {
    return src('src/*.css') // 读取流
        .pipe(cleanCss()) // 转换流
        .pipe(rename({ extname: '.min.css' })) // 转换流
        .pipe(dest('dist')); // 写入流
};
```

## 样式处理

```javascript
const { src, dest } = require('gulp');
const sass = require('gulp-sass');

const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' }) // 基准路径，即保留 src 后面的路径
        .pipe(sass({ outputStyle: 'expanded' })) // expanded 代表完全展开
        .pipe(dest('dist'));
};

module.exports = { style };
```

## 脚本处理

```
npm i gulp-babel @babel/core @babel/preset-env -D
```

```javascript
const babel = require('gulp-babel');
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('dist'));
};
```

## 模板编译

```
npm i gulp-swig -D
```

```javascript
// 可以传递一些静态的数据，可以单独配置成一个文件
const data = { age: 18 };
const page = () => {
    return src('src/*.html', { base: 'src' })
        .pipe(plugins.swig({
            data,
            defaults: { cache: false } // 为了后面 browser-sync 的热更新
        }))
        .pipe(dest('dist'));
};
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    {% include 'partials/header.html' %}

    {{ age }}
</body>
</html>
```

## 图片处理

```
npm i gulp-imagemin -D
```

```javascript
// 图片处理
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(imagemin())
        .pipe(dest('dist'));
};
```

```javascript
// 字体处理
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(imagemin())
        .pipe(dest('dist'));
};
```

## 其他操作

拷贝 public 下的文件

```javascript
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'));
};
```

清除文件

```javascript
// npm i del -D
const clean = () => del(['dist']); // del 返回的是一个 Promise，可以标记任务完成
```

## 组合任务

```javascript
// 并行任务
const compile = parallel(style, script, page, image, font);
// 清除文件的操作要是串行的
const build = series(clean, parallel(compile, extra));
module.exports = { build };
```

## 自动加载插件

```javascript
// npm i gulp-load-plugins -D
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();
```

```javascript
// 把之前如下引入插件的方式都删了
const sass = require('gulp-sass');
const babel = require('gulp-babel');
```

```javascript
// 后续再使用 sass、babel 插件的时候只需要，替换成如下的形式
plugins.sass();
plugins.babel();
```

## 配置服务器

```
npm i browser-sync -D
```

```javascript
const browserSync = require('browser-sync');
const bs = browserSync.create();

const serve = () => {
    bs.init({
        // notify: false, // 去掉连接小提示
        // port: 3000, // 默认
        // open: false, // 是否自动打开浏览器
        files: 'dist/**', // dist 下的所有文件发生变化就热更新
        server: {
            baseDir: 'dist',
            routes: {
                // 先走这里，匹配的话就使用这里的配置，以 '/node_modules' 开头的都去 node_modules 文件夹去找资源
                '/node_modules': 'node_modules'
            }
        }
    });
};
```

## 监视 src 变化

```javascript
const serve = () => {
    // 服务开始的时候监视文件变化并构建
    watch('src/assets/styles/*.scss', style);
    watch('src/assets/scripts/*.js', script);
    watch('src/*.html', page);
    // 图片、字体的处理只是压缩，不影响页面效果的呈现，在开发阶段不需要构建，会降低开发阶段构建的效率，但同样需要监听变化并热更新！
    watch(['src/assets/images/**', 'src/assets/fonts/**', 'public/**'], bs.reload);
    bs.init({
        files: 'dist/**',
        server: {
            baseDir: ['dist', 'src', 'public'], // 会依次去每个文件夹里面去找需要的资源
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    });
};

const compile = parallel(style, script, page);
const build = series(clean, parallel(compile, extra, image, font));
const develop = series(compile, serve); // 先编译有内容后才能托管服务

module.exports = { build, develop };
```

其他写法，也可以不配置 `{ files: 'dist/**' }`，在 style、script、page 任务的最后加上 `.pipe(bs.reload({ stream: true }))`

```javascript
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(dest('dist'))
        .pipe(bs.reload({ stream: true }));
};
```

## 处理资源引用

功效：提取、合并，也可以配合其他插件进行压缩

```
npm i gulp-useref -D
npm i gulp-htmlmin gulp-uglify gulp-clean-css gulp-if -D
```

```javascript
const useref = () => {
    return src('dist/*.html', { base: 'dist' })
        .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
        // 读取流中有 3 种类型的文件：HTML、CSS、JS
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        })))
        .pipe(dest('release')); // 这里不再是 dist 了，边读边写同一个文件会冲突
};
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- build:css assets/styles/vendor.css -->
    <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
    <!-- endbuild -->
    <!-- build:css assets/styles/main.css -->
    <link rel="stylesheet" href="assets/styles/main.css">
    <!-- endbuild -->
</head>

<body>
    <button type="button" class="btn btn-primary">Pri</button>
    {% include 'partials/header.html' %}

    {{ age }}
    <!-- build:js assets/scripts/main.js -->
    <script type="text/javascript" src="assets/scripts/main.js"></script>
    <!-- endbuild -->
</body>

</html>
```

## 规划构建过程

```javascript
// 生成的临时文件放到了 temp
const clean = () => del(['dist', 'temp']);
```

```javascript
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' }) // 基准路径，即保留 src 后面的路径
        .pipe(dest('temp'));
};

const script = () => {};
const page = () => {};

// image、font、extra 只是 build 的时候才需要处理的，开发阶段不需要放到临时目录 temp
// 只有被 useref 影响的操作才需要放到临时目录 temp
```

```javascript
bs.init({
    server: {
        baseDir: ['temp', 'src', 'public']
    }
});
```

```javascript
const useref = () => {
    return src('temp/*.html', { base: 'temp' })
        .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
        .pipe(dest('dist'))
};
```

```javascript
const build = series(clean, parallel(series(compile, useref), extra, image, font));
```