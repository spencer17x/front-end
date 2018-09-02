---
title: dom
date: 2018-07-23 23:21:57
tags:
	- 2018.7
categories:
	- JavaScript学习笔记
---

# DOM基本操作

- document代表整个文档
- document.getElementById() 
  - 元素id在ie8以下的浏览器，不区分id大小写，而且也返回匹配name属性的元素
- .getElementsByTagName()
  - 标签名
- .getElementsByName()
  - 需注意，只有部分标签name可生效(表单，表单元素，img，iframe等等)
- .getElementsByClassName()
  - 类名，ie8和ie8以下的ie版本中没有，可以多个class一起
- .querySeletor() 
  - css选择器，在ie7和ie7以下的版本中没有
- .querySelectorAll()
  - css选择器，在ie7和ie7以下的版本中没有(getlementsByTagName等方法是动态更新的，而querySelectorAll是静态的)

# 遍历节点树

- parentNode
  - 父节点(最顶端的parentNode为#document);
- childNodes
  - 子节点们
- firstChild
  - 第一个子节点
- lastChild
  - 最后一个子节点
- nextSibling
  - 后一个兄弟节点
- previousSibling
  - 前一个兄弟节点

# 基于元素节点树的遍历

- parentElement
  - 返回当前元素的父元素节点(IE不兼容)
- children
  - 只返回当前元素的元素子节点
- Node.childElementCount === node.children.length
  - 当前元素节点的子元素节点个数(IE不兼容)
- firstElementChild
  - 返回的是第一个元素节点(IE不兼容)
- lastElementChild
  - 返回的是最后一个元素节点(IE不兼容)
- nextElementSibling/previousElementSibling
  - 返回后一个/前一个兄弟元素节点(IE不兼容)

# 节点的四个属性

- nodeName
  - 元素的标签名，以大写形式表示(只读)
- nodeValue
  - Text节点或Comment节点的文本内容(可读写)
- nodeType
  - 该节点的类型(只读)
- attributes
  - Element节点的属性集合(可读写)

> 节点的一个方法Node.hasChildNodes();

# 节点的类型(nodeType)

- 元素节点 —— 1
- 属性节点 —— 2
- 文本节点 —— 3
- 注释节点 —— 8
- document —— 9
- DocumentFragment —— 11

封装元素节点children方法:

```javascript
1.
var div = document.getElementsByTagName('div')[0];
function retElementChild(node) {
    var arr = [],
    	child = node.childNodes,
    	len = child.length;
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType === 1) {
            arr.push(child[i]);
        }
    }
    return arr;
}
2.
var div = document.getElementsByTagName('div')[0];
function retElementChild(node) {
    var temp = {
        length: 0,
        push: Array.prototype.push
    },
    	child = node.childNodes,
    	len = child.length;
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType === 1) {
            temp.push(child[i]);
        }
    }
    return temp;
}
3.
var div = document.getElementsByTagName('div')[0];
function retElementChild(node) {
    var temp = {
        length: 0,
        push: Array.prototype.push,
        splice: Array.prototype.splice
    },
    	child = node.childNodes,
    	len = child.length;
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType === 1) {
            temp.push(child[i]);
        }
    }
    return temp;
}
```

# DOM结构树

- Node
  - Document(文档)
    - HTMLDocument
  - CharacterData
    - Text
    - Comment
  - Element(文档中的元素)
    - HTMLElement
      - HTMLHeadElement
      - HTMLBodyElement
      - HTMLTitleElement
      - HTMLParagraphElement
      - HTMLInputElement
      - HTMLTableElement
      - ...etc
  - Attr

# DOM继承树

1. getElementById方法定义在Document.prototype上, 即Element节点上不能使用
2. getElementsByName方法定义在HTMLDocument.prototype上, 即非html中的document不能使用(xml document,Element)
3. getElementsByTagName方法定义在Document.prototype和Element.prototype上
4. HTMLDocument.prototype定义了一些常用的属性, body、head分别指代HTML文档中的\<body\>\<head\>标签
5. Document.prototype上定义了documentElement属性, 指代文档的根元素,在HTML文档中, 他总是指代\<html\>元素
6. getElementsByClassName、 querySelectorAll、querySelector在Document.prtotype,Element.prototype类中均有定义

# DOM操作

- 增
  - document.createElement()
  - document.createTextNode()
  - document.createComment()
  - document.createDocumentFragment()
- 插
  - PARENTNODE.appendChild()
  - PARENTNODE.insertBefore(a,b)
- 删
  - parent.removeChild()
  - child.remove()
- 替换
  - parent.replaceChild(new,origin)

# Element节点的一些属性

- innerHTML
- innerText(火狐不兼容)/textContent(老版本IE不好使)

# Element节点的一些方法

- ele.setAttribute()
- ele.getAttribute()

