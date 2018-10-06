# 内容已加载事件

当文档对象模型被完全加载时，浏览器将触发一个事件。这个事件被称为 `DOMContentLoaded` 事件，我们可以使用监听任何其他事件的方式来监听这个事件：

```js
document.addEventListener('DOMContentLoaded', function () {
    console.log('the DOM is ready to be interacted with!');
});
```

当初始的 **HTML** 文档被完全加载和解析完成之后，**DOMContentLoaded** 事件被触发，而无需等待样式表、图像和子框架的完成加载。另一个不同的事件 `load `应该仅用于检测一个完全加载的页面。 在使用 `DOMContentLoaded` 更加合适的情况下使用 [`load`](https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/load) 是一个令人难以置信的流行的错误，所以要谨慎。注意：**DOMContentLoaded** 事件必须等待其所属script之前的样式表加载解析完成才会触发。

# 使用 `DOMContentLoaded` 事件

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="/css/styles.css" />
    <script>
      document.addEventListener('DOMContentLoaded', function () {
          document.querySelector('footer').style.backgroundColor = 'purple';
      });
    </script>
```

我们将 JavaScript 代码放在 `<head>` 元素中，但它现在被包裹在 `DOMContentLoaded` 事件的事件监听器中。这将阻止 DOM-styling 代码在浏览器到达它时运行。然后，当 DOM 被构建后，事件将会触发，这个代码将会运行。

如果你去查看别人的代码，你可能会发现，他们的代码监听的是正在使用的 `load` 事件（例如 `document.onload(...)`）。

`load` 会比 `DOMContentLoaded` 更晚触发——`load`会等到所有图像、样式表等加载完毕（HTML 引用的所有东西）。很多年长的开发者会使用 `load` 来代替 `DOMContentLoaded`，因为后者不被最早的浏览器支持。但是，如果你需要检测代码的运行时间，通常 `DOMContentLoaded` 是更好的选择。

但是，仅仅因为你_可以*使用 DOMContentLoaded 事件在 \<head> 中编写 JavaScript 代码，并不意味着你就*应该*这样做。因为这样做的话，我们必须编写*更多_代码（所有事件监听器之类），而更多代码通常并不总是最好的办法。相反，更好的选择是将代码移到 HTML 文件底部，放在结束 `</body>` 标签之前。

那么，什么时候应该使用这个技能呢？由于 `<head>` 中的 JavaScript 代码会在 `<body>` 中的 JavaScript 代码之前运行，因此如果你确实有 JavaScript 代码需要_尽快_运行，则可以将该代码放在 `<head>` 中，并将其包裹在一个 `DOMContentLoaded` 事件监听器中。这样，它既可以尽早运行，又不会在 DOM 尚未准备就绪的时候过早运行。

