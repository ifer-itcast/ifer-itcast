# i35Tab

## 简介

## 特点

## 使用

Step1:

```javascript
<script src="./js/i35tab.js"></script>
```

Step2:

```javascript
$("body").i35Tab();
```

## API

### 使用方法

```javascript
$("body").i35Tab({
    eventType: "mouseover"
});
```

### 配置列表

参数名 | 类型 | 是否必填 | 默认值 | 描述
-    |  -  | - | - | -
titles | array | 否 | ["News", "Sports", "Education"] |标题
contents | array | 否 | ["News con...", "Sports con...", "Education ..."] |内容
eventType | string | 否 | click | 事件类型
delayTime | number | 否 | 0 | eventType 为 mouseover 时才生效，节流时间
color | string | 否 | #6341a5 | 主题颜色
effect | string | 否 | default | 默认普通的显示/隐藏；支持 slide、fade
autoPlay | boolean/number | 否 | false | 自动播放时间间隔

### 事件回调

