- **textContent** 会获取所有元素的内容，包括 &lt;script> 和 &lt;style> 元素，然而 **innerText** 不会。
- `innerText` 受 CSS 样式的影响，并且不会返回隐藏元素的文本，而textContent会。
- 由于 `innerText` 受 CSS 样式的影响，它会触发重排（reflow），但`textContent` 不会。
- `与 textContent 不同的是`, 在 Internet Explorer (对于小于等于 IE11 的版本) 中对 innerText 进行修改， 不仅会移除当前元素的子节点，而且还会永久性地破坏所有后代文本节点（所以不可能再次将节点再次插入到任何其他元素或同一元素中）。

插：**检查事件代理中的节点类型**

```html
<article id="content">
  <p>Brownie lollipop <span>carrot cake</span> gummies lemon drops sweet roll dessert tiramisu. Pudding muffin <span>cotton candy</span> croissant fruitcake tootsie roll. Jelly jujubes brownie. Marshmallow jujubes topping sugar plum jelly jujubes chocolate.</p>

  <p>Tart bonbon soufflé gummi bears. Donut marshmallow <span>gingerbread cupcake</span> macaroon jujubes muffin. Soufflé candy caramels tootsie roll powder sweet roll brownie <span>apple pie</span> gummies. Fruitcake danish chocolate tootsie roll macaroon.</p>
</article>
```

验证事件目标是否*确实是一个 \<span\> 元素*

```js
document.querySelector('#content').addEventListener('click', function (evt) {
    if (evt.nodeName === 'SPAN') {  // ← 验证目标是我们需要的元素
        console.log('A span was clicked with text ' + evt.target.textContent);
    }
});
```

请记住，每个元素都从 [节点接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 继承属性。从节点接口继承的属性之一就是 `.nodeName`。我们可以使用这个属性来验证目标元素确实是我们正在查找的元素。当一个 `<span>` 元素被点击时，它将有一个 `.nodeName` 属性为`“SPAN”`，因此检查将通过，并且该消息将会被记录。但是，如果一个 `<p>` 元素被点击，它将有一个 `.nodeName` 属性为`“P”`，因此检查将失败，并且该消息将不会被记录。

**⚠️ `nodeName` 的大写问题 ⚠️**

> `.nodeName` 属性将返回一个大写字符串，而不是一个小写字符串。因此，当你执行检查时，请确保：
>
> * 检查大写字母，或者
>
> * 将 `.nodeName` 转换为小写

```js
// 用大写字母检查 
if (evt.nodeName === 'SPAN') { 
    console.log('A span was clicked with text ' + evt.target.textContent); 
}
```

```js
//将 nodeName 转换为小写 
if (evt.nodeName.toLowerCase() === 'span') { 
    console.log('A span was clicked with text ' + evt.target.textContent); 
} 
```

