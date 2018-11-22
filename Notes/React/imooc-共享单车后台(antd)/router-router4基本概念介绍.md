# react-router 4.0 基本概念介绍

**react-router 和 react-router-dom 理解**

* 4.0版本已不需要路由配置，一切皆组件
* react-router：提供了一些 router 的核心 api，包括 Router，Route，Switch 等
* react-router-dom：提供了 BrowserRouter，HashRouter，Route，Link，NavLink

定义：\<Route path="/three/:number" />

取值：this.props.match.params.number

**Link：**

```js
// 一个基本的 location 对象
{pathname: '/', search: '', hash: '', key: 'abc123', state: {}}
```

**Switch（类似 js 中的 switch 语法）**：

```js
<Switch>
	<Route path='/admin/ui/buttons' component={Buttos} />
	<Route path='/admin/ui/modals' component={Modals} />
	<Route path='/admin/ui/loading' component={Loading} />
</Switch>
```

**Redirect**

```js
路由重定向：<Redirect to='/admin/home' />
```

