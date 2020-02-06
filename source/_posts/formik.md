---
title: formik
date: 2020-02-06 21:07:30
tags:
---

## 简单登录功能

```javascript
import React from 'react';
import { WingBlank } from 'antd-mobile';
import styles from './index.module.css';
export default class Login extends React.Component {
    state = {
        username: '',
        password: ''
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        // 这里可以进行数据校验后提交...
    };
    render() {
        const { username, password } = this.state;
        return (
            <WingBlank>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles.formItem}>
                        <input
                            className={styles.input}
                            onChange={this.handleChange}
                            name="username"
                            value={username}
                            placeholder="请输入账号"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <input
                            className={styles.input}
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            value={password}
                            placeholder="请输入密码"
                        />
                    </div>
                    <div className={styles.formSubmit}>
                        <button className={styles.submit} type="submit">
                            登 录
                        </button>
                    </div>
                </form>
            </WingBlank>
        );
    }
}
```

## formik 重构登录功能

```javascript
import React from 'react';
import { WingBlank } from 'antd-mobile';

// #1 导入
import { withFormik } from 'formik';

import styles from './index.module.css';
class Login extends React.Component {
    render() {
        // #5 通过 props 获取高阶组件提供的状态（属性和方法），handleChange 是高阶组件自带的，可以打印 this.props 查看
        const { values, handleSubmit, handleChange } = this.props;
        // #6 替换 state 中的 username 为 values.username，自身的 this.handleSubmit、this.handleChange 都替换成高阶组件提供的
        return (
            <WingBlank>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formItem}>
                        <input
                            className={styles.input}
                            onChange={handleChange}
                            name="username"
                            value={values.username}
                            placeholder="请输入账号"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <input
                            className={styles.input}
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={values.password}
                            placeholder="请输入密码"
                        />
                    </div>
                    <div className={styles.formSubmit}>
                        <button className={styles.submit} type="submit">
                            登 录
                        </button>
                    </div>
                </form>
            </WingBlank>
        );
    }
}
```

```javascript
// #2 withFormik 调用返回的是一个高阶组件，这种写法方便传值，然后再包装 Login，并为 Login 提供相关状态（属性和方法）
Login = withFormik({
    // #3 为组件提供状态
    mapPropsToValues: () => ({ username: '', password: '' }),
    // #4 表单的提交事件
    handleSubmit: (values, { props }) => {
        // 内部已经阻止了默认行为（跳转），props 中可以获取路由相关的信息
        // #7 获取表单中的数据
        const { username, password } = values;

        console.log(username, password, props);
    }
})(Login);
export default Login;
```

## validate 配置项实现校验

```javascript
import React from 'react';
import { WingBlank } from 'antd-mobile';

import { withFormik } from 'formik';

import styles from './index.module.css';
const REG_USER = /^\w{5,8}$/;
const REG_PWD = /^\w{5,12}$/;

class Login extends React.Component {
    render() {
        // 注意：必须给 input 框绑定 handleBlur 才能正确的获取 touched
        // validate2 接受错误信息 errors，获取 touched 用来查看是否已访问过 input，访问过的才进行错误提示，不然一个触发时其他没有访问过的也会触发
        const { values, handleSubmit, handleChange, errors, touched, handleBlur } = this.props;
        return (
            <WingBlank>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formItem}>
                        <input
                            className={styles.input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="username"
                            value={values.username}
                            placeholder="请输入账号"
                        />
                    </div>
                    {/* validate3 展示错误信息 */}
                    {errors.username &&
                        touched.username &&
                        <div className={styles.error}>
                            {errors.username}
                        </div>}
                    <div className={styles.formItem}>
                        <input
                            className={styles.input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            type="password"
                            value={values.password}
                            placeholder="请输入密码"
                        />
                    </div>
                    {errors.password &&
                        touched.password &&
                        <div className={styles.error}>
                            {errors.password}
                        </div>}
                    <div className={styles.formSubmit}>
                        <button className={styles.submit} type="submit">
                            登 录
                        </button>
                    </div>
                </form>
            </WingBlank>
        );
    }
}

```

```javascript
Login = withFormik({
    mapPropsToValues: () => ({ username: '', password: '' }),
    // #validate1 添加 validate 字段进行错误信息的收集
    validate: values => {
        const errors = {};
        if (!values.username) {
            errors.username = '必须填写用户名';
        } else if (!REG_USER.test(values.username)) {
            errors.username = '用户名必须为5到8位的数字、字母、下划线';
        }

        if (!values.password) {
            errors.password = '必须填写密码';
        } else if (!REG_PWD.test(values.password)) {
            errors.password = '密码必须为5到12位的数字、字母、下划线';
        }

        return errors;
    },
    handleSubmit: (values, { props }) => {
        const { username, password } = values;

        console.log(username, password, props);
    }
})(Login);
export default Login;
```

## validationSchema 配置项配合 Yup 实现校验