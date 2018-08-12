---
title: css垂直居中的方法
date: 2018-07-21 18:53:54
tags:
	- 2018.7
categories:
        - html和css学习笔记
---

# CSS Transform让百分比宽高布局元素水平垂直居中

HTML代码

```html
<div class="center">您可以尝试改变浏览器大小，这个元素依然是水平垂直居中的哦！</div>
```

CSS代码

```css
.center{
    position: absolute;
    top: 50%;
    left: 50%;
    width:50%;
    height:30%;
    padding:20px;
    text-align:center;
    background:#393;
    color:#fff;
    transform: translate(-50%, -50%);
}	
```

# flex布局

HTML代码

```html
<div class="box">
    <div class="content"></div>
</div>
```

CSS代码

```css
.box {
    background-color: #FF8C00;
    width: 300px;
    height: 300px;
    display: flex;//flex布局
    justify-content: center;//使子项目水平居中
    align-items: center;//使子项目垂直居中
}
.content {
    background-color: #F00;
    width: 100px;
    height: 100px;
}
```

# table-cell布局

>因为table-cell相当与表格的td，td为行内元素，无法设置宽和高，所以嵌套一层，嵌套一层必须设置display: inline-block;

HTML代码

```html
<div class="outter">
    <div class="inner">
        <div class="foo"></div>
    </div>
</div>
```

CSS代码

```css
html,body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.outter {
  display: table;
  background-color: lightgreen;
  width: 100%;
  height: 100%;
}

.inner {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.foo {
  background-color: lightblue;
  display: inline-block;
  width: 50%;
  height: 50%;
}
```

