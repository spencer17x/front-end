**纯函数**

纯函数指的是给定固定的输入，就一定会有固定的输出，而且不会有任何副作用。

**核心 api **

createStore

store.dispatch

store.getState

store.subscribe

补充：

* store 是唯一的，reducer 可以接受 state，但是绝不能修改state。
* 只有 store 能改变自己的内容。
* reducer 必须是纯函数。

