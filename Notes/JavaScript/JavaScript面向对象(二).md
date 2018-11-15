# 原型

1. 定义: 原型是function对象的一个属性，它定义了构造函数制造出的对象的公共祖先。通过该构造函数产生的对象，可以继承该原型的属性和方法。原型也是对象。
2. 利用原型特点和概念，可以提取共有属性。
3. 对象如何查看原型 —> 隐式属性 \__proto__
4. 对象如何查看对象的构造函数—>constructor(可手动更改)

# 原型链

- 绝大多数对象的最终都会继承自Object.prototype
- Object.create(null)是个特例

# 注意点(易错点)

```javascript
隐式调用toString方法:
var obj = Object.create(null);
obj.toString = function () {
    return 123;
}
document.write(obj); //123
```

```javascript
0到100随机数:
for (var i = 0; i < 10; i++) {						console.log(Math.random().toFixed(2)*100);
} //会因精度问题得不到想到的答案 
改为:
for (var i = 0; i < 10; i++) {
    console.log(Math.floor(Math.random()*100));
}
//可正常计算的范围 小数点前16位，后16位
```

```javascript
Grand.prototype.lastName = "Deng";
function Grand() {
    this.num = 100;
    this.obj = {
        a: 1
    }
}
var grand = new Grand();
Father.prototype = grand;
function Father() {
    this.name = 'xuming';
}
var father = new Father();
Son.prototype = father;
function Son() {
    this.hobbit = 'smoke';
}
var son = new Son();
console.log(son); //{hobbit: "smoke"}
console.log(son.num); //100
son.num++;
console.log(son.num); //101
console.log(grand.num); //100
son.obj.b = 2; 
console.log(grand.obj); //{a: 1, b: 2}
son.obj = 4;
console.log(son.obj); //4
console.log(grand.obj); //{a: 1, b: 2}
```

# 继承发展史

1. 传统形式——> 原型链

   *过多的继承了没用的属性

2. 借用构造函数

   *不能继承借用构造函数的原型

   *每次构造函数都要多走一个函数

3. 共享原型

   *不能随便改动自己的原型

4. 圣杯模式

```javascript
圣杯模式:
function inherit(Target, Origin) {
    function F() {};
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    Target.prototype.uber = Origin.prototype;//超类，知道真正继承自谁。
}

var inherit = (function () {
    var F = function () {};
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;
    }
}());
```

# 对象枚举

```javascript
var obj = {
    a: 1,
    b: 2,
    c: 3
};
for (var prop in obj) {
    console.log(obj.prop); //输出3个undefined
}
obj.prop会在内部转换为obj['prop']
应改为: 
for (var prop in obj) {
    console.log(obj[prop]); 
}
```

```javascript
1.
var obj = {
    name: 456,
    __proto__: {
        lastName: 'deng'
    }
}
Object.prototype.abc = '123';
for (var prop in obj) {
    console.log(obj[prop]); //输出456,deng,123
}

2.
var obj = {
    name: 456,
    __proto__: {
        lastName: 'deng'
    }
}
Object.prototype.abc = '123';
for (var prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
        console.log(obj[prop]); //输出deng,123
    }
}
```

# in操作符

```javascript
var obj = {
	a: 1,
	__proto__: {
        lastName: 'deng'
	},
	c: {
        d: 4
	}
};
a in obj; //报错:Uncaught ReferenceError: a is not defined
'a' in obj; //true
'lastName' in obj; //true
'd' in obj; //false
```

# instanceof

```
a instanceof b;
a对象是不是b构造函数构造出来的，
看a对象的原型链上有没有b的原型，
即instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
```

```javascript
// 定义构造函数
function C(){} 
function D(){} 

var o = new C();


o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype


o instanceof D; // false，因为 D.prototype不在o的原型链上

o instanceof Object; // true,因为Object.prototype.isPrototypeOf(o)返回true
C.prototype instanceof Object // true,同上

C.prototype = {};
var o2 = new C();

o2 instanceof C; // true

o instanceof C; // false,C.prototype指向了一个空对象,这个空对象不在o的原型链上.

D.prototype = new C(); // 继承
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true 因为C.prototype现在在o3的原型链上
```

### `instanceof`和多全局对象(多个frame或多个window之间的交互)

在浏览器中，我们的脚本可能需要在多个窗口之间进行交互。多个窗口意味着多个全局环境，不同的全局环境拥有不同的全局对象，从而拥有不同的内置类型构造函数。这可能会引发一些问题。比如，表达式 `[] instanceof window.frames[0].Array` 会返回`false`，因为 `Array.prototype !== window.frames[0].Array.prototype`，并且数组从前者继承。

起初，你会认为这样并没有意义，但是当你在你的脚本中开始处理多个frame或多个window以及通过函数将对象从一个窗口传到另一个窗口时，这就是一个有效而强大的话题。比如，实际上你可以通过使用 `Array.isArray(myObj)` 或者`Object.prototype.toString.call(myObj) === "[object Array]"`来安全的检测传过来的对象是否是一个数组。

比如检测一个`Nodes`在另一个窗口中是不是`SVGElement`，你可以使用`myNode instanceof myNode.ownerDocument.defaultView.SVGElement`

### 演示`String`对象和`Date`对象都属于`Object`类型和一些特殊情况

下面的代码使用了`instanceof`来证明：`String和``Date`对象同时也属于`Object`类型（他们是由`Object`类派生出来的）。

但是，使用对象文字符号创建的对象在这里是一个例外：虽然原型未定义，但instanceof Object返回true。

```javascript
var simpleStr = "This is a simple string"; 
var myString  = new String();
var newStr    = new String("String created with constructor");
var myDate    = new Date();
var myObj     = {};

simpleStr instanceof String; // 返回 false, 检查原型链会找到 undefined
myString  instanceof String; // 返回 true
newStr    instanceof String; // 返回 true
myString  instanceof Object; // 返回 true

myObj instanceof Object;    // 返回 true, 尽管原型没有定义
({})  instanceof Object;    // 返回 true, 同上
myNonObj instanceof Object; // 返回 false, 一种创建对象的方法，这种方法创建的对象不是Object的一个实例

myString instanceof Date; //返回 false

myDate instanceof Date;     // 返回 true
myDate instanceof Object;   // 返回 true
myDate instanceof String;   // 返回 false
```

### 演示`mycar`属于`Car`类型的同时又属于`Object`类型

下面的代码创建了一个类型`Car`，以及该类型的对象实例`mycar`. `instanceof`运算符表明了这个`mycar`对象既属于`Car`类型，又属于`Object`类型。

```javascript
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var mycar = new Car("Honda", "Accord", 1998);
var a = mycar instanceof Car;    // 返回 true
var b = mycar instanceof Object; // 返回 true
```

# this

1. 函数预编译过程this-->window
2. 全局作用域里this-->window
3. call/apply可以改变函数运行时this指向
4. obj.func();func()里面的this指向obj

```javascript
var name = "222";
var a = {
    name: "111",
    say: function () {
        console.log(this.name);
    }
};
var fun = a.say;
fun(); //222
a.say(); //111
var b = {
  name: "333",
  say: function (fun) {
      fun();
  }
};
b.say(a.say); //222
b.say = a.say;
b.say(); //333
```

