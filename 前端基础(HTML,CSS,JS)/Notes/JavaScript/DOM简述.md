# part1

当你请求一个网站时：

- 收到 HTML
- HTML 标签被转换为令牌
- 令牌被转换为节点
- 节点被转换为 DOM

无论该网站的后端语言是什么，它都会用 HTML 进行响应。浏览器会接收到一连串的 HTML。这些字节通过一个复杂的（但完全记录在案的）解析过程来运行，该过程可以确定不同的字符（例如开始标签字符 `<`，像 `href` 这样的属性，像 `>` 这样的右尖括号）。解析发生后，接下来是一个称为**标记化**的过程。标记化过程每次使用一个字符来构建**令牌**。这些令牌包括：

- 文档类型（DOCTYPE）
- 开始标签（start tag）
- 结束标签（end tag）
- 注释（comment）
- 字符（character）
- 文件结束（end-of-file）

在这个阶段，浏览器已经收到了服务器发送的字节，并将字节转换为标签，然后读取了所有标签，进而创建了一个令牌列表。

接下来，这个令牌列表将会通过树构建阶段。这个阶段的输出结果是一个树状结构——这就是 DOM！

> 一个树状结构，反映了 HTML 的内容和属性，以及节点之间的所有关系

> DOM 是 HTML 的完整解析表示

DOM 代表“文档对象模型”，是一种树状结构，是 HTML 文档的表示，反映了元素之间的关系，并包含元素的内容和属性。

DOM 不是：

- JavaScript 语言的一部分

DOM 是：

- 从浏览器构建的
- 可以通过使用 `document` 对象供 JavaScript 代码全局访问

# part2 — innerHTML 和 textContent

`.innerText` 会获取元素的可见文本。这是一个重要的区别！如果使用了 CSS 来隐藏该元素内的任何文本，`.innerText` 将不会返回该文本，而 `.textContent` 则会返回该文本。而且，`.innerText` 不仅遵循 CSS 的隐藏/显示性质，`.innerText` 还会遵循像大小写这样的更改。

# part3 

- 如果 *DOM 中已经存在*一个元素，并将该元素传递给 `.appendChild()`，则 `.appendChild()` 方法会*移动它*，而不是复制它
- 元素的 `.textContent` 属性比使用 `.createTextNode()` 方法创建文本节点更经常被用到
- `.insertAdjacentHTML()` 方法的第二个参数必须是文本，而不能传递一个元素

可以使用 `.style.cssText` 属性一次设置多个 CSS 样式！

```js
const mainHeading = document.querySelector('h1');
mainHeading.style.cssText = 'color: blue; background-color: orange; font-size: 3.5em';
```

请注意，在使用 `.style.cssText` 属性时，你要像在样式表中一样编写 CSS 样式；因此，要写 `font-size`，而不是 `fontSize`。这与使用单独的 `.style.<property>` 方式有所不同。

