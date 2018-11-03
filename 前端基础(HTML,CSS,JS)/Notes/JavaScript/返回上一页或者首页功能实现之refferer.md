 之前写了一篇用 history 对象来实现一个点击按钮返回上一页，如果是直接链接打开的则返回首页的一个需求。

结果发现这个方法会有一些问题。

首先，当你a - b - a - b - b -a (a,b分别代替两个带有返回按钮的页面)的时候你发现当你退到第一个 a 时，点击按钮则返回不了首页。因为此时 history 的 length 不是 1，而是6，因为当你回退的时候 history.length 并不会递减。

其次，当你在微信开发者公众号网页打开网页的时候，此时的 history.length 并不是和其他浏览器一样为 1，而是为2，当时做项目的时候测出来是3，不知道微信内置浏览器(此处指代pc端的微信内置浏览器，移动端测试是为1的)是咋算的。

所以该方法不可行。此时我们可以换一个 api 来实现需求。

他就是 document.refferer。

refferer 属性可返回载入当前文档的文档的 URL，如果当前文档不是通过超级链接访问的，则为 null。

所以我们可以使用如下方法实现该需求，目前还没发现有啥问题：

```js
$('.back-btn').click(function () {
    if (document.refferer) {
   		window.history.back();
    } else {
        location.href = 'www.xxx.com';
    }
})
```

