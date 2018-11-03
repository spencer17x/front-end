# Nodejs版本常识

偶数位为稳定版本

* 0.6.x
* 0.8.x
* 0.10.x

奇数为非稳定版本

* 0.7.x
* 0.9.x
* 0.11.x

# 模块的分类

* 核心模块
  * http, fs, path
* 文件模块
  * var util = require('./util.js')
* 第三方模块
  * var promise = require('bluebird')

# 模块的流程

* 创建模块
  * teacher.js
* 导出模块
  * exports.add = function () {}
* 加载模块
  * var teacher = require('./teacher.js')
* 使用模块
  * teahcer.add('Scott')

# url 和 uri

URL：统一资源定位符，是 URI 的子集。

URI：统一资源标识符，是字符串格式规范。

# url.parse()

protocol：协议

slashes： 是否有协议的双斜线

host： ip地址或者域名

port：域名

hostName：主机名

hash：哈希值，通常对应的是页面的锚点，滚动到当前位置

search：查询字符串参数

query：发送到 http 服务器的数据

pathname：访问资源路径名

path：路径

**url.parse(a,b,c)接受三个参数**：

a：一个网址

url.parse('http://imooc.com/course/list?from=echo&num=1')

结果如下：

```js
Url {

  protocol: 'http:',

  slashes: true,

  auth: null,

  host: 'imooc.com',

  port: null,

  hostname: 'imooc.com',

  hash: null,

  search: '?from=echo&num=1',

  query: 'from=echo&num=1',

  pathname: '/course/list',

  path: '/course/list?from=echo&num=1',

  href: 'http://imooc.com/course/list?from=echo&num=1' }
```

b：布尔值，默认为false，为true时，可将query解析成json对象

url.parse('http://imooc.com/course/list?from=echo&num=1'，true)

结果如下：

```js
Url {

  protocol: 'http:',

  slashes: true,

  auth: null,

  host: 'imooc.com',

  port: null,

  hostname: 'imooc.com',

  hash: null,

  search: '?from=echo&num=1',

  query: { from: 'echo', num: '1' },

  pathname: '/course/list',

  path: '/course/list?from=echo&num=1',

  href: 'http://imooc.com/course/list?from=echo&num=1' }
```

c：默认为false，为true时，可解析不知协议的URL

url.parse('//imooc.com/course/list',true,true)

```js
结果如下：

Url {

  protocol: null,

  slashes: true,

  auth: null,

  host: 'imooc.com',

  port: null,

  hostname: 'imooc.com',

  hash: null,

  search: null,

  query: {},

  pathname: '/course/list',

  path: '/course/list',

  href: '//imooc.com/course/list' }
```

