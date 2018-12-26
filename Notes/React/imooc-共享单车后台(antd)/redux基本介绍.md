# Redux 基本介绍

* 单向数据流：从父组件流向子组件，兄弟组件无法共享数据
* State：React 中的状态，是只读对象，不可直接修改
* Reducer：基本函数，用于对 State 的业务处理
* Action：普通对象，用于描述事件行为，改变 State

# Redux 安装

```shell
yarn add redux --save
yarn add react-redux --save
```



# Redux 集承

* 创建 Action 模块
* 创建 Reducer 模块
* 创建 Store 模块
* 通过 connect 方法将 React 组件和 Redux 连接起来
* 添加 Provider 作为项目的根组件，用于数据的存储

