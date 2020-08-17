---
title: Mobx
date: 2020-08-17 23:55:11
tags: 
---

## 体验 Mobx

```
npx create-react-app mobx
yarn add mobx mobx-react
```

**支持装饰器**

```
yarn run eject
```

```javascript
{
    "name": "mobx",
    "babel": {
        "presets": [
            "react-app"
        ],
        "plugins": [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }]
        ]
    }
}
```

`src/stores/FruitStore.js`

```javascript
import { observable, autorun, toJS, isObservableObject, isObservableArray } from 'mobx';

class FruitStore {
    @observable fruits = [];
}
const store = window.store = new FruitStore();

export default store;

autorun(() => {
    console.log(store.fruits, 233);
    console.log(toJS(store.fruits), 234);
    console.log(isObservableObject(store), 235); // 可被观测的对象
    console.log(isObservableArray(store.fruits), 236); // 可被观测的数组
});
```

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import './stores/FruitStore';

ReactDOM.render(<div>hello</div>, document.querySelector('#root'));
```