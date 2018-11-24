# npm 介绍

## Package.json 属性说明

- **name** - 包名。
- **version** - 包的版本号。
- **description** - 包的描述。
- **homepage** - 包的官网 url 。
- **author** - 包的作者姓名。
- **contributors** - 包的其他贡献者姓名。
- **dependencies** - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- **repository** - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- **main** - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
- **keywords** - 关键字

## 版本号

语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。

- 如果只是修复bug，需要更新Z位。
- 如果是新增了功能，但是向下兼容，需要更新Y位。
- 如果有大变动，向下不兼容，需要更新X位。

版本号有了这个保证后，在申明第三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。

# node.js 介绍

## events 模块

### 方法：

1. addListener(event, listener)：为指定事件添加一个监听器到监听器数组的尾部。
2. on(event, listener)：为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。

```js
server.on('connection', function (steam) {
    console.log('some connected!');
});
```

3. once(event, listener)：为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻接触该监听器。

```js
server.once('connection', function (stream) {
  console.log('Ah, we have our first user!');
});
```

4. removeListener(event, listener)： 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。

   它接受两个参数，第一个是事件名称，第二个是回调函数名称。

```js
var callback = function(stream) {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

5. removeAllListeners([event])：移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。

6. setMaxListeners(n)：默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。
7. listeners(event)：返回指定事件的监听器数组。
8. emit(event, [arg1], [arg2], [...])：按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

### 类方法

listenerCount(emitter, event)：返回指定事件的监听器数量。

```js
events.EventEmitter.listenerCount(emitter, eventName) //已废弃，不推荐
events.emitter.listenerCount(eventName) //推荐
```

### 事件

1. newListener：

   * **event** - 字符串，事件名称
   * **listener** - 处理事件函数

   > 该事件在添加新监听器时被触发。

2. removeListener：

   * **event** - 字符串，事件名称
   * **listener** - 处理事件函数

   > 从指定监听器数组中删除一个监听器。需要注意的是，此操作将会改变处于被删监听器之后的那些监听器的索引。

### error 事件

EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，我们在遇到 异常的时候通常会触发 error 事件。

当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。

我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。

