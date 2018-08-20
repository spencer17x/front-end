尺寸单位. rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。

scaleToFill：不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素，mode属性的默认值就是 `scaleToFill`。

# URL格式说明

URL（统一资源定位符）是 URI（通用资源标识）的特定类型。

URL 通常由以下三或四个组成部分组成，第四部分可省略：

1. 协议。它可以是 HTTP（不带 SSL）或 HTTPS（带 SSL）。
2. 主机。例如：cn.udacity.com。
3. 路径。例如：/course/wechat-mini-program--nd666-cn-1。
4. 查询字符串。规则为?后显示参数查询值，伪url为：?param1=value1&param2=value2。

**综上**，url的书写规则为：http:/path/path/path?param1=value1&param2=value2

# JSON语法规则

JSON 语法是 JavaScript 对象表示法语法的子集。

1. 数据通过**"名称":"值"**成对出现

2. 数据间由**逗号**分隔
3. **花括号**用于保存对象
4. **方括号**用于保存数组

JSON 值可以是：

- 数字（整数或浮点数）
- 字符串（在双引号中）
- 逻辑值（true 或 false）
- 数组（在方括号中）
- 对象（在花括号中）
- null