jq 中 .width()：为匹配的元素集合中获取第一个元素的当前计算宽度值或给每个匹配的元素设置宽度。

js 中 getComputedStyle()：`Window.getComputedStyle()` 方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。 私有的CSS属性值可以通过对象提供的API或通过简单地使用CSS属性名称进行索引来访问。

在做项目时，起初以为 jq 中的 width() 的方法只能获取行内样式的宽度值，所以一开始就使用了 getComputedStyle() 获取了某元素的 width 值，当时 width 设置为 fit-content。获取时发现取到的值有时是 'fit-content'，有时是计算后的 width 实际值(如1024px)，具体原因不明，也许是 jq 封装过这个方法了，可能是 jq 会影响到 getComputedStyle() 方法。

总结：在使用 jq 的时候通过 .width() 方法获取当前计算宽度值。