---
title: JS中e.target、e.currentTarget、this的区别
date: 2018-08-05 16:33:10
tags:
	- 2018.8
categories:
	- JavaScript学习笔记
---

e.target 指向触发事件监听的对象

e.currentTarget 指向添加监听事件的对象

一般 this 与函数调用有关系，而在这里 this 指向与 e.currentTarget 指向一致

以下就是所列举的实例：

html 部分:

```html
<ul>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
</ul>
```

js 部分:

````javascript
let ulEle = document.getElementsByTagName('ul')[0];
ulEle.onclick = function (e) {
    console.log(this); //ul元素
    console.log(e.currentTarget); //ul元素
    console.log(e.target); //当前点击的元素
};
````

解析: 当点击 li 元素或者 ul 元素时 this 和 e.currentTarget 都指向 ul 元素，因为此时被绑定事件的元素是 ul 元素，验证了 this 和 e.currentTarget 都指向被绑定事件的元素。而当点击 li 元素的时候，e.target 输出的是 li 元素，当点击 ul 时，e.target 输出的是 ul 元素，则验证了 e.target 指向当前触发事件的元素。

可能有部分小伙伴会有疑问，你明明只给 ul 元素绑定了事件为什么点击 li 元素会出发事件呢？

其实，当你点击 li 的时候，会触发事件冒泡，ul 是 li 的父级，所以当你点击 li 元素的时候，实例中的 click 事件会逐级冒泡至 ul 元素触发 ul 元素的 click 事件。