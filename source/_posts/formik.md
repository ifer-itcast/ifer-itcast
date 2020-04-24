---
title: 表单处理
date: 2020-02-06 21:07:30
tags: Formik
categories: React
---

[表单处理代码](https://github.com/ifer-itcast/formik-demo)

<!-- more -->

## 简单登录功能

React 中简单的表单处理我们一般会如下写法，依靠 React 自身的机制来完成

```javascript
export default class Login extends React.Component {
    state = {
        username: '',
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
                <button className={styles.submit} type="submit">登 录</button>
            </form>
        );
    }
}
```

## formik 重构

涉及到复杂表单数据时，可以使用 formik 这个库来解决表单处理的痛点（获取值、表单校验、表单提交等），把上面代码先改写如下

```javascript
// #step1: 导入
import { withFormik } from 'formik';

class Login extends React.Component {
    render() {
        // #step5: 通过 props 获取高阶组件提供的状态（属性和方法），handleChange 是高阶组件自带的，可以打印 this.props 查看
        const { values, handleSubmit, handleChange } = this.props;
        // #step6: 替换 state 中的 username 为 values.username，自身的 this.handleSubmit、this.handleChange 都替换成高阶组件提供的
        return (
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
                <button className={styles.submit} type="submit">登 录</button>
            </form>
        );
    }
}
```

```javascript
// #step2: withFormik 调用返回的是一个高阶组件，这种写法方便传值，然后再包装 Login，并为 Login 提供相关状态（属性和方法）
Login = withFormik({
    // #step3: 为组件提供状态
    mapPropsToValues: () => ({ username: '', password: '' }),
    // #step4: 监听表单的提交事件
    handleSubmit: (values, { props }) => {
        // 内部已经阻止了默认行为（跳转），props 中可以获取路由相关的信息
        // #step7: 获取表单中的数据
        const { username, password } = values;
        console.log(username, password, props);
    }
})(Login);
```

## validate 校验

通过 formik 提供的 validate 配置项可以实现表单校验

```javascript
const REG_USER = /^\w{5,8}$/;
const REG_PWD = /^\w{5,12}$/;

class Login extends React.Component {
    render() {
        // 注意：必须给 input 框绑定 handleBlur 才能正确的获取 touched
        // #step2: 接受错误信息 errors，获取 touched 用来查看是否已访问过 input，访问过的才进行错误提示，不然一个触发时其他没有访问过的也会触发
        const { values, handleSubmit, handleChange, errors, touched, handleBlur } = this.props;
        return (
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
                {errors.username && touched.username && <div className={styles.error}>{errors.username}</div>}
                <button className={styles.submit} type="submit">登 录</button>
            </form>
        );
    }
}

```

```javascript
Login = withFormik({
    mapPropsToValues: () => ({ username: '', password: '' }),
    // #step1: 添加 validate 字段进行错误信息的收集
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
```

## validationSchema 配合 Yup 校验

官方推荐使用更加友好的方式来进行校验，即 formik 提供的 validationSchema 配置和第三方库 Yup 来完成

```javascript
// #step1: 导入
import * as Yup from 'yup';
class Login extends React.Component {
    render() {
        const { values, handleSubmit, handleChange } = this.props;
        // #step3: 接收错误提示信息和是否 touched 信息，touched 用于记录这个框是否被访问过（失去焦点肯定能证明访问过）
        const { errors, touched, handleBlur } = this.props;
        // #step4: 想要获取到 touched 需要给表单元素添加 handleBlur 事件
        return (
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
                {/* #step5: 进行错误信息提示 */}
                {errors.username && touched.username && <div className={styles.error}>{errors.username}</div>}
                <button className={styles.submit} type="submit">登 录</button>
            </form>
        );
    }
}
```

```javascript
Login = withFormik({
    mapPropsToValues: () => ({ username: '', password: '' }),
    // #step2: 添加表单校验规则
    validationSchema: Yup.object().shape({
        username: Yup.string().required('账号为必填项').matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
        password: Yup.string().required('密码为必填项').matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')
    }),
    handleSubmit: (values, { props }) => {
        const { username, password } = values;
        console.log(username, password, props);
    }
})(Login);
```

## 简化表单处理

formik 还提供了 Form、Field、ErrorMessage 等组件来简化表单的处理

```javascript
import { withFormik, Form, Field, ErrorMessage } from 'formik';

class Login extends React.Component {
    render() {
        // #step4: 去掉所有 props
        return (
            {/* #step1: 导入 Form 组件，替换 form 元素，去掉 onSubmit */}
            <Form>
                <div className={styles.formItem}>
                    {/* #step2: 导入 Field 组件，替换 input 表单元素，去掉 onChange，onBlur，value */}
                    <Field className={styles.input} name="username" placeholder="请输入账号" />
                </div>
                {/* #step3: 导入 ErrorMessage 组件，替换原来的错误消息逻辑代码 */}
                <ErrorMessage className={styles.error} name="username" component="div" />
                <button className={styles.submit} type="submit">登 录</button>
            </Form>
        );
    }
}
```