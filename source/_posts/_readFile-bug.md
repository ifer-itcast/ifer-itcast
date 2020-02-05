---
title: readFile_bug
date: 2019-12-27 22:44:59
tags:
---

- nodemon 会监听当前目录下 JS 文件的变化，不会监听 txt 等文件，可以通过新建 a.js 和 a.txt 证明

- 执行 `nodemon index.js`，会使 a.js 发生变化，a.js 变化会重新执行当前文件，即 `nodemon index.js`，执行当前文件会再次重写文件，此时文件信息发生变化（例如修改时间），会再次运行 `nodemon index.js`，如此往复！

- 如何证明是文件修改时间发生变化时，就会重启 nodemon 呢？随便打开一个 JS 文件测试，不修改任何内容直接 ctrl + s 会导致文件的修改时间变化，此时会发现 nodemon 重启了！

```javascript
// 解决1：当前文件不存在的情况下才进行写入
const fs = require('fs');
if (!fs.existsSync('./a.js')) {
	fs.writeFile('./a.js', 'hello', err => {
		if (err) {
			return console.log(err);
		}
		console.log('写入成功');
	});
}
```

```javascript
// 解决2：package.json 文件中忽略某个文件的变化
{
  "nodemonConfig": {
    "ignore": "a.js"
  }
}
```