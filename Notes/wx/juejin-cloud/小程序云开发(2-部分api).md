# api

```js
// 初始化
wx.cloud.init({
    env: 'tianqi-xxx'
})
// 获取数据库实例
const db = wx.cloud.database();
// 增
db.collection('集合名称').add({
    data: {} // 插入的数据
}).then(res => {
    // 可以通过 res._id 获取创建的记录的 id
    console.log(res._id);
})
// 删
db.collection('集合名称').doc('文档 ID').remove().then(res => {
    console.log('removed');
})
// 改
db.collection('集合名称').doc('文档 ID').update({
    data: {
        title: '我的第 1 篇文章' // 只更新 title 字段，其它不更新
    }
}).then(res => {
    // 可以通过 res._id 获取创建的记录的 id
    console.log(res._id);
})
// 查
db.collection('集合名称').doc('文档 ID').get().then(res => {
    // 打印结果，res.data 即为记录的数据
    console.log(res);
})
const _ = db.command // 取指令
db.collection('集合名称').where({
    // 查找条件
    category: 'computer',
    properties: {
        memory: _.gt(8), // 表示大于 8
    }
})
```

以下指令挂载在 `db.command` 下：

| 比较类型 | 接口 |                说明                |
| :------: | :--: | :--------------------------------: |
| 比较运算 |  eq  |              字段 ==               |
|          | neq  |              字段 !=               |
|          |  gt  |               字段 >               |
|          | gte  |              字段 >=               |
|          |  lt  |               字段 <               |
|          | lte  |              字段 <=               |
|          |  in  |           字段值在数组里           |
|          | nin  |          字段值不在数组里          |
| 逻辑运算 | and  |    表示需同时满足指定的所有条件    |
|          |  or  | 表示需同时满足指定条件中的至少一个 |

**举例：**

```js
// 在 diary 集合中找出 openid 某个值并且创建时间（tsModified）在 start 和 end 之间的文档。
db
	.collection('diary')
	.where({
        openid,
       	tsModified: _.gte(start).and(_.lt(end))
	})
	.get()
```

# 文件存储

公共使用的静态资源，可以通过「云开发 -> 存储」界面直接上传和管理，上传之后，就可以在界面内找到资源的 CDN 地址。

而对于小程序内需要上传和管理的则通过下面几个 API 来实现：

```js
// 上传，上传后会返回资源的 ID
wx.cloud.uploadFile
// 下载
wx.cloud.downloadFile
// 根据资源 ID 获取资源访问地址
wx.cloud.getTempFileURL
// 根据资源 ID 列表删除某资源
wx.cloud.removeFile
```

# 云函数

云函数是腾讯云提供的一套函数计算解决方案，我们可以将每个功能 API 做成单个可执行的函数，然后放到腾讯云上去托管，每个云函数是相互独立可执行的。代码编写完成后放到云端，不执行不调用不收费，执行调用按照调用次数和 CPU 等计算资源的占用情况收费。有了云函数，开发者无须搭建和购买服务器，只需要将写好的云函数代码上传部署到腾讯云，即可以在小程序内通过 wx.cloud.callFunction 的方法进行调用。

```js
// 命名为 test 的函数内容 index.js
exports.main = async (event, context) => {
    let {a, b} = event;
    return new Promise((resolve, reject) => {
        resolve({result: parseInt(a) + parseInt(b)})
    });
}
// 或者
exports.main = async (event, context, callback) => {
    let {a, b} = event;
    callback(null, {result: parseInt(a) + parseInt(b)});
}
```

> TIPS:
>
> 1. 云函数如果不存在 `main` 的方法，上传部署的时候会报错！
> 2. 云函数回调方式写法遵循「错误优先」原则（Error-First Callback）。

* event：平台将 event 入参传递给执行方法，通过此 event 入参对象，代码将与触发函数的事件（event）交互，event 可以获取 wx.cloud.callFunction 调用的参数 data
* context：平台将 context 入参传递给执行方法，通过此 context 入参对象，代码将能了解到运行环境及当前请求的相关内容

> TIPS： 开发者可以在云函数内获取到每次调用的上下文（appId、openId 等），无需维护复杂的鉴权机制，即可获取天然可信任的用户登录态（openId），这俩值可以从`event.userInfo`中读取。

test 的函数上传到腾讯云之后，我们在小程序的 js 代码中可以使用下面的方法进行调用：

```js
wx.cloud.callFunction({
    name: 'test',
    data: {
        a: 1,
        b: 2
    }
}).then(r => {
    // main 的方法实际是个 promisify 的返回，所以可以直接使用 then、catch
    console.log(r);
}).catch(e => {
    console.log(e);
})
```

