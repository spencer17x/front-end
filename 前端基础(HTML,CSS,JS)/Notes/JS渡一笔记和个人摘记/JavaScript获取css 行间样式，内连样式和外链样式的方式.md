---
title: JavaScript获取css 行间样式，内连样式和外链样式的方式
date: 2018-06-24 23:02:13
tags:
	- 2018.6
categories:
	- JavaScript学习笔记
---
# 行内样式获取

```
<div id='div1' style="backgroud:red">测试</div>

<script>

​   var odiv=document.getElementById('div1');　

//先获取到要获取样式的元素标签，也就是获取到div1

　　console.log(odiv.style.background);   　　　　

//这样我们就可以获取到了行间的样式了

</script>
```


# 内联样式获取
```
<html>

　　<head>

　　　　<style>

　　　　　　.div2{

　　　　　　　　background:red;

　　　　　　　　}

　　　　</style>

　　</head>

　　<body>

　　　　<div id="div1" class="div2">测试</div>

　　　　<script>

　　　　　　var odiv=document.getElementById('div1');
//先获取到要获取样式的元素标签，也就是获取到div1
//console.log(getComputedStyle(odiv,null).background);getComputedStyle("元素"，"伪类")是获取到计算后的样式，第二个参数是伪类，如果没有直接使用null但是万恶的IE8及之前不支持所以需要用到下面的方法
//console.log(currentStyle.background)这个只有IE本身支持 也是获取到计算后的样式
         console.log(window.getComputedStyle?getComputedStyle(odiv,null).background:odiv.currentStyle);　　　　　　
//跨浏览器兼容
　　　　</script>
　　</body>
</html>
```

# 外链样式获取
```
<html>

　　<head>

　　　　<link rel="stylesheet"   type="text/css" href="basic.css"　 />　　　　　　//外链的样式表

　　</head>

　　<body>

　　　　<div id="div1" class="div2" >测试</div>

　　　　<script>

　　　　　　var sheet=document.styleSheets[0]　　　　//获取到外链的样式表

　　　　　　var rule=sheet.cssRules[0]  　　　　　　//获取到外链样式表中的第一个样式

　　　　　　console.log(rule.style.background)　　　　//red   这样就可以获得了外链样式表中指定的样式了

　　　　</script>

　　</body>

</html>

外链样式表

.div2{

　　background:red;

}
```
