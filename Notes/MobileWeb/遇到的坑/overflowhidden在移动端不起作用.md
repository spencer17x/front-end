# body 设置 overflow: hidden 在移动端失效

这是由于移动端的 web 内核不允许所导致的。

解决方法：

```css
body { position:fixed; width:100%; height:100% }
/* 或者 */
给滚动的元素添加一个父级，设定高度，并且，overflow:auto; 
/* 或者 */
html, body{ width:100%; overflow:hidden } 
```

