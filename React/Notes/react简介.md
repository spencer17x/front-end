# part1— react简介

* facebook 推出
* 2013年开源
* 函数式编程
* ......

react fiber 指的是 react 16 版本。

# part2 — 父子组件间通信

* 父组件通过属性的形式向子组件传递参数，子组件通过 props 接受父组件传递过来的参数。
* 子组件如果想和父组件通信，子组件要调用父组件传递过来的方法。

# part3 — 围绕 React 衍生出的思考

* 声明式开发
* 可以与其他框架并存
* 组件化
* 单向数据流
* 视图层框架
* 函数式编程(更容易实现前端自动化测试)

# part4 — props，state与render函数的关系

当组件的 state 或者 props 发生改变的时候，render 函数就会重新执行。

当父组件的 render 函数被运行时，它的子组件的 render 都将被重新运行一次。

# part5 — React 中的虚拟 DOM

1. state 数据
2. JSX 模版
3. 数据 + 模版 结合，生成真实的 DOM 来显示
4. state 发生改变
5. 数据 + 模版 结合，生成真实的 DOM，替换原始的 DOM

> 缺陷：
>
> 第一次生成了一个完整的 DOM 片段
>
> 第二次生成了一个完整的 DOM 片段
>
> 第二次的 DOM 替换第一次的 DOM，非常耗性能

1. state 数据
2. JSX 模版
3. 数据 + 模版 结合，生成真实的 DOM 来显示
4. state 发生改变
5. 数据 + 模版 结合，生成真实的 DOM，并不直接替换原始的 DOM 
6. 新的 DOM (DocumentFragment) 和原始的 DOM 做比对，找差异
7. 找出发生的变化(比如 input 框发生了变化)
8. 只用发生的变化替换掉老 DOM 中。(即只用新的 DOM 中的 input 元素替换掉老 DOM 中的 input 元素)

> 缺陷：性能的提升并不明显

1. state 数据
2. JSX 模版
3. 数据 + 模版，生成虚拟 DOM （虚拟 DOM 就是一个 JS 对象，用它来描述真实 DOM）（损耗了性能，极小）

`['div', {id: 'abc'}, ['span', {}, 'hello world']]`

4. 用虚拟 DOM 的结构生成真实的 DOM 来显示

`<div id='abc'><span>hello world</span></div>`

5. state 发生变化
6. 数据 + 模版，生成新的虚拟 DOM

`['div', {id: 'abc'}, ['span', {}, 'bye bye']]`

7. 比较原始虚拟 DOM 和新的虚拟 DOM 的区别，找出区别是 span 中的内容（极大的提升性能）
8. 直接操作 DOM，改变 span 中的内容

> 生成一个 JS 对象比生成一个 DOM 对象小很多。
>
> 优点：
>
> 1.性能提升了。
>
> 2.它使得跨端应用得以实现。React Native

> **JSX ——> createElement ——> 虚拟DOM(JS对象) ——> 真实的DOM**

# 虚拟 DOM 中的 diff 算法

- setState 可以把多次 setState 结合成一次，减少虚拟 DOM 比对的次数，setState 是异步的
- 同层虚拟 DOM 比对，如果一层不满足匹配的要求，后面就不会再比对，直接废弃，用新的替换掉老的
- key 值尽量不要用 index。

key 值不用 index 的原因：

循环时假设，key 为 index 即 a: 0，b: 1，c: 2，数据发生改变时假设 a 被删除，则 key 为 b: 0，c: 1。以前的 b 与现在的 b 无法直接建立起关系，导致 key 值不稳定，无法提升虚拟 DOM 比对的性能了。
