---
title: MongoDB 基本操作
date: 2019-12-05 20:15:41
tags:
---

## 操作数据库

```javascript
mongod --dbpath=./ // 通过 shell 连接 MongoDB 服务

show dbs // 查看有哪些数据库

db use school // 使用 school 数据库

db.students.insert({name: 'ifer', age: 18}) // 当前数据库中创建集合并插入文档

db // 查看当前在哪个数据库

db.dropDatabase() // 删除当前数据库
```

<!-- more -->

## 操作集合

```javascript
// 查看集合使用帮助
db.students.help()
db.students.find().help()

// 查看集合
show collections
// 创建集合，一般使用 db.students.insert(document) 创建集合并插入文档
db.createCollection('teachers')
```

## 创建文档

```javascript
// insert 不能插入重复的 _id
db.students.insert({_id: 1, name: 'ifer', age: 18})

// save 当插入有重复 _id 的时候，会当前当前文档
db.students.save({_id: 1, name: 'ifer', age: 18})
```

## 更新文档

```javascript
db.collection.update(
    <queryObj>, // 查询条件
    <updateObj>, // 更新的对象
    {
        upsert: <boolean>, // 如果不存在符合条件的记录时，是否插入，默认 false
        multi: <boolean> // 默认只更新符合条件的第一条记录，如果为 true 则更新所有符合条件的
    }
)
```

```javascript
db.students.update({
    name: 'ifer'
},{
    name:'elser' // 注意这里没有加 $set 会整体把匹配到的文档变成只有 {name: elser}
},{
    upsert:true
})

// 把所有 name 为 elser 的更新为 ifer
db.students.update({
    name: 'elser'
},{
    $set: { // 注意这里要配合 $set 使用
        name:'ifer'
    }
},{
    multi:true
})
```

## 更新符号

**$set**：指定需要更新的字段

```javascript
db.students.update({_id: 1}, {$set: {name: 'test2'}})
```

**$inc**：在此字段基础上增加数字，例如之前 age 是 1，下面代码执行后 age 就变成了 19

```javascript
db.students.update({_id: 1}, {$inc: {age: 18}})
```

**$unset**：删除指定的字段和值

```javascript
db.students.update({_id: 1}, {$unset: {age: 18}})
```

**$push**：向数组中增加元素

```javascript
// 原来的 hobbies 字段不必存在
db.students.update({_id: 1}, {$push: {hobbies: '喝酒'}})
```

**$ne**：not in / not exist / not equal

```javascript
// 之前的 hobbies 字段要保证是一个数组才能 push
db.students.update({name:'ifer',hobbies:{$ne:'抽烟'}},{$push:{"hobbies":"烫头"}});
```

**$addToSet**: 向集合（这个集合指的是 hobbies）中增加元素

```javascript
db.students.update({name:'ifer'},{$addToSet:{'hobbies':'烫头'}}, {multi: true});
```

**$each**: 把数组中的元素逐个添加到集合中

```javascript
const arr = ['JS', 'Node', 'HTML'];
db.students.update({name:'ifer'},{$addToSet:{hobbies:{$each:arr}}});
```

**$pop**: 删除数组中指定索引对应的元素

```javascript
// -1 顺着删，1 倒着删
db.students.update({name:'ifer'},{$pop:{hobbies:1}});

// 修改指定索引元素
db.students.update({name:'ifer'},{$set:{'hobbies.1': 'hello world'}});
```

## 删除文档

```javascript
db.collection.remove(
    <query>, // 查询条件
    {
        justOne: <boolean> // 为 true 或 1 则只删除匹配多条中的1个
    }
)
```

```javascript
db.students.remove({name:'zfpx2'});
```

## 查询文档

**find**

```javascript
db.students.find()
// 1 显示，0 不显示
db.students.find({},{name:1, _id:0})
```

**findOne**

```javascript
db.students.findOne()
```

**$in**: 查询包含某些项

```javascript
// 查询 age 为 10 或 11 的 document
db.students.find({age:{$in:[10,11]}},{age:1});
```

**$nin**: 不查询包含某些项

```javascript
// 查询 age 不为 10 或 11 的 document
db.students.find({age:{$nin:[10,11]}},{age:1});
```

**$not**: 对特定条件取反

```javascript
// 不要年龄大于 20 小于 30的
db.students.find({age:{$not:{$gte:20,$lte:30}}});
```

**array**: 查询 array 中的内容

```javascript
// 按所有元素匹配
// db.students.find({hobbies:[ "JS", "hello world", "HTML"]});

// 匹配一项 包含A的就可以
// db.students.find({hobbies:"JS"});

// $all 必须同时包含A B
// db.students.find({hobbies:{$all:['JS',"hello world"]}});

// $in 或者关系 ，包含A或者B
// db.students.find({hobbies:{$in:['JS',"Node"]}});

// $size 按数组的长度去匹配
// db.students.find({hobbies:{$size:4}});

// $slice 只返回数组中的某一部分
// db.students.find({hobbies:{$size:3}},{name:1,hobbies:{$slice:2}}); // 前 2 项
// db.students.find({hobbies:{$size:3}},{name:1,hobbies:{$slice:-2}}); // 后 2 项
```

**where**

```javascript
db.students.find({$where:"this.age>30"});
```

**cursor**: 游标不是查询结果，而是查询的一个返回资源或者接口，通过这个接口，可以逐条读取数据

## 条件操作符

```javascript
// 大于
db.students.find({age:{$gt:30}})

// 大于等于
db.students.find({age:{$gte:30}})

// 小于
db.students.find({age:{$lt:30}})

// 小于等于
db.students.find({age:{$lte:30}})

// 大于等于 10 小于等于 18
db.students.find({age: {$gte: 10, $lte: 18}})

// 等于
db.students.find({"age": 18})
```

```javascript
// 使用 ID 进行查询
db.students.find({_id:ObjectId("5de8f76b5bcdb8733a40a325")})
```

```javascript
// 查询结果集的条数
db.students.find().count()
```

```javascript
// 正则匹配
db.students.find({name:/f/}) // 包含 f

db.students.find({name:/^i/}) // 以 i 开头
```

## 与和或

```javascript
// 与
db.students.find({name:'ifer',age:1})
```

```javascript
// $or
db.students.find({$or:[{age:18},{age:19}]})
```

```javascript
// 与或连用
db.students.find({name:'ifer',$or:[{age:18},{age:19}]})
```

## 分页查询

```javascript
// limit
db.students.find().limit(3)

// skip
db.students.find().skip(1)

// skip + limit，第 3 ~ 4 之间的数据
db.students.find().skip(2).limit(2)

// sort，1 升序，-1 降序
db.students.find().sort({age:1})
```

## 执行脚本

```javascript
let user = {name: 'elser', age: 15 };
let db = connect('school'); // 选择 school 数据库，所以当前不必在 school 数据库下
db.students.insert(user);
```

```javascript
let start = Date.now();
let db = connect('school'); // scholl 数据库
for (let i = 0; i < 1000; i++) {
    db.students.insert({ name: 'elser' + i }); // students 集合
}
let cost = Date.now() - start;
print('cost ' + cost + ' ms');
```

```javascript
let start = Date.now();
// mongodb://127.0.0.1:27017/school
let db = connect('school');
let users = [];
for (let i = 0; i < 1000; i++) {
    users.push({ name: 'ifer' + i });
}
db.students.insert(users);
let cost = Date.now() - start;
print('cost ' + cost + ' ms');
```

```javascript
// 命令行中执行
mongo test.js
```

**备份与导出**

```javascript
mongodump // 会把所有数据备份到当前命令行目录的 dump 目录下
mongodump -h 127.0.0.1 -d school -o "D:\Mongo\bak"
```

```javascript
// school 数据库名字（随意）、备份时候的数据库路径
mongorestore -d school "D:\Mongo\bak\school"
```

## 权限管理

```javascript
// 进入数据库
mongo

// 创建超级管理员
use admin
db.createUser({user: 'root', pwd: 'root', roles: ['root']})

// 创建普通用户
use blog
db.createUser({user: 'ifer', pwd: 'ifer', roles: ['readWrite']})

// 斩断之前的服务
net stop MongoDB
mongod --remove

// 开启新的服务
mongod --bind_ip 0.0.0.0 --logpath="D:\Soft\MongoDb\log\mongod.log" --dbpath="D:\Soft\MongoDb\data" --install --auth
net start MongoDB

// 上面命令行中的所有配置信息，也可以通过配置并加载mongod.cfg文件完成
mongod --config "D:\Soft\MongoDb\bin\mongod.cfg"
```


