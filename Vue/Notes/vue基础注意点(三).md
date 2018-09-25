# 路由

路由就是根据网址的不同，返回不同的内容给用户。

# 多页面应用和单页面应用

* 多页面应用：页面跳转 —— 返回 HTML
  * 优点：首屏时间快，SEO效果好
  * 缺点：页面切换慢
* 单页面应用：页面跳转 —— JS渲染
  * 优点：页面切换快
  * 缺点：首屏时间稍慢，SEO差

# 不要在选项属性或回调上使用箭头函数

不要在选项属性或回调上使用[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数是和父级上下文绑定在一起的，`this` 不会是如你所预期的 Vue 实例，经常导致 `Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误。