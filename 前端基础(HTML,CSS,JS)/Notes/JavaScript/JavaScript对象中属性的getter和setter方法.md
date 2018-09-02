---
title: JavaScript对象中属性的getter和setter方法
date: 2018-07-13 22:34:15
tags:
	- 2018.7
categories:
	- JavaScript学习笔记
---

JavaScript对象的属性是由名字、值和一组特性（可写、可枚举、可配置等）构成的。在ECMAScript 5中，属性值可以用一个或两个方法代替，这两个方法就是getter和setter。

```
var myObj = {
    a: 2,
    get b(){
        return 3;
    }   
};

console.log(myObj.a);//2
console.log(myObj.b);//3
```

上面的代码中，属性a称为“**数据属性**”，它只有一个简单的值；像属性b这种用getter和setter方法定义的属性称为“**存取器属性**”。

存取器属性定义为一个或两个**与属性同名的函数**，这个函数定义没有使用function关键字，而是使用get或set，也没有使用冒号将属性名和函数体分开，但函数体的结束和下一个方法之间有逗号隔开。

当程序查询存取器的属性值时，JavaScript代用getter方法（无参数），这个方法的返回值就是该属性存取表达式的值。当程序设置一个存取器属性值时，JavaScript调用setter方法，将赋值表达式右侧的值当作参数传入setter。从某种意义上来说，这个方法负责设置属性值，可以忽略该方法的返回值。

当一个属性被定义为存取器属性时，JavaScript会忽略它的value和writable特性，取而代之的是set和get（还有configurable和enumerable）特性。

```
var myObj = {
    get a(){
        return 2;
    }   
};

myObj.a = 3;

console.log(myObj.a);//2
```

如上面代码所示，由于我们只定义了属性a的getter，所以对a进行设置（即赋值）时set会忽略赋值操作，不会抛出错误。

```
var myObj = {
    get a(){
        return this._a_;
    },
    set a(val){
        this._a_ = val;
    }   
};
myObj.a = 3;
console.log(myObj.a);//3
```

正确的写法如上所示。**getter和setter方法中的this都指向myObj对象。**这里我们把赋值操作中的3存储到另一个中间变量 `_a_` 中。名称 `_a_` 只是一种惯例，并没有其它任何特殊行为，它只是一个普通的属性。把它换成其它任意合法名称如 `_b_` 都行，甚至可以在外面将它打印出来。

```
var myObj = {
    get a(){
        return this._b_;
    },
    set a(val){
        this._b_ = val;
    }   
};
myObj.a = 3;
console.log(myObj.a);//3
console.log(myObj._b_);//3
```

另外，存取器属性也是可以继承的：

```
var myObj = {
    get a(){
        return this._b_;
    },
    set a(val){
        this._b_ = val;
    }   
};

myObj.a = 3;

var anotherObj = Object.create(myObj);
console.log(anotherObj.a);//3
```

