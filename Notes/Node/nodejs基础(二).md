# querystring — 查询字符串

`querystring` 模块提供了一些实用函数，用于解析与格式化 URL 查询字符串。 可以通过以下方式使用：

```js
const querystring = require('querystring);
```

**querystring.escape(str)**：

对给定的 `str` 进行 URL 编码。

该方法是提供给 `querystring.stringify()` 使用的，通常不直接使用。 它之所以对外开放，是为了在需要时可以通过给 `querystring.escape` 赋值一个函数来重写编码的实现。

**querystring.parse(str[, sep[, eq[, options]]])**：

- `str` &lt;string&gt;要解析的 URL 查询字符串。
- `sep` &lt;string&gt; 用于界定查询字符串中的键值对的子字符串。默认为 `'&'`。
- `eq` &lt;string&gt;用于界定查询字符串中的键与值的子字符串。默认为 `'='`。
- `options` &lt;Object&gt;
  - `decodeURIComponent`  &lt;Function&gt; 解码查询字符串的字符时使用的函数。默认为 `querystring.unescape()`。
  - `maxKeys`  &lt;number&gt; 指定要解析的键的最大数量。指定为 `0` 则不限制。默认为 `1000`。

该方法会把一个 URL 查询字符串 `str` 解析成一个键值对的集合。

