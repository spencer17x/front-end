# 值类型 vs 引用类型

```js
function foo(a){
	a = a * 10;
}
function bar(b){
	b.value = 'new';
}
var a = 1;
var b = {value: 'old'};
foo(a);
bar(b);
console.log(a); // 1
console.log(b); // value: new
```

通过代码执行，会发现：

- `a`的值没有发生改变
- 而`b`的值发生了改变

这就是因为`Number`类型的`a`是按值传递的，而`Object`类型的`b`是按共享传递的。

JS 中这种设计的原因是：按值传递的类型，复制一份存入栈内存，这类类型一般不占用太多内存，而且按值传递保证了其访问速度。按共享传递的类型，是复制其引用，而不是整个复制其值（C 语言中的指针），保证过大的对象等不会因为不停复制内容而造成内存的浪费。

# 原型和原型链

* **所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（null除外）**

* 所有的引用类型（数组、对象、函数），都有一个 \__proto__ 属性，属性值是一个普通的对象
* 所有的函数，都有一个 prototype 属性，属性值也是一个普通的对象
* 所有的引用类型（数组、对象、函数），\__proto__ 属性值指向它的构造函数的 prototype 属性值

**当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的 \__proto__（即它的构造函数的 prototype）中寻找**。

如果在 f.\_\_proto\_\_ 中没有找到 toString，那么就继续去 f.\_\_proto\_\_\.\_\_proto\_\_ 中寻找，因为 f.\__proto__ 就是一个普通的对象而已嘛！

* f.\_\_proto\_\_即 Foo.prototype，没有找到 toString，继续往上找
* f.\_\_proto\_\_.\_\_proto\_\_ 即 Foo.prototype.\_\_proto\_\_。Foo.prototype 就是一个普通的对象，因此Foo.prototype.\_\_proto\_\_就是 Object.prototype，在这里可以找到 toString
* 因此 f.toString 最终对应到了 Object.prototype.toString
* 这样一直往上找，你会发现是一个链式的结构，所以叫做“原型链”。如果一直找到最上层都没有找到，那么就宣告失败，返回 undefined。最上层是什么 —— Object.prototype.\_\_proto\_\_ === null

# 执行上下文

<p>在一段 JS 脚本（即一个<code>&lt;script&gt;</code>标签中）执行之前，要先解析代码（所以说 JS 是解释执行的脚本语言），解析的时候会先创建一个 <strong>全局执行上下文</strong> 环境，先把代码中即将执行的（内部函数的不算，因为你不知道函数何时执行）变量、函数声明都拿出来。变量先暂时赋值为<code>undefined</code>，函数则先声明好可使用。这一步做完了，然后再开始正式执行程序。再次强调，这是在代码执行之前才开始的工作。</p>

另外，一个函数在执行之前，也会创建一个 **函数执行上下文** 环境，跟 **全局上下文** 差不多，不过 **函数执行上下文** 中会多出`this` `arguments`和函数的参数。参数和`arguments`好理解，这里的`this`咱们需要专门讲解。

总结一下：

- 范围：一段`<script>`、js 文件或者一个函数
- 全局上下文：变量定义，函数声明
- 函数上下文：变量定义，函数声明，`this`，`arguments`

# 作用域链

首先认识一下什么叫做 **自由变量** 。如下代码中，`console.log(a)`要得到`a`变量，但是在当前的作用域中没有定义`a`（可对比一下`b`）。当前作用域没有定义的变量，这成为 **自由变量** 。自由变量如何得到 —— 向父级作用域寻找。

```js
var a = 100
function fn() {
    var b = 200
    console.log(a)
    console.log(b)
}
fn()
```

如果父级也没呢？再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是 **作用域链** 。

```js
var a = 100
function F1() {
    var b = 200
    function F2() {
        var c = 300
        console.log(a) // 自由变量，顺作用域链向父作用域找
        console.log(b) // 自由变量，顺作用域链向父作用域找
        console.log(c) // 本作用域的变量
    }
    F2()
}
F1()
```

# 闭包

```javascript
function F1() {
    var a = 100
    return function () {
        console.log(a)
    }
}
var f1 = F1()
var a = 200
f1()
```

自由变量将从作用域链中去寻找，但是 **依据的是函数定义时的作用域链，而不是函数执行时**，以上这个例子就是闭包。闭包主要有两个应用场景：

- **函数作为返回值**，上面的例子就是
- **函数作为参数传递**，看以下例子

```js
function F1() {
    var a = 100
    return function () {
        console.log(a)
    }
}
function F2(f1) {
    var a = 200
    console.log(f1())
}
var f1 = F1()
F2(f1)
```

至此，对应着「作用域和闭包」这部分一开始的点击弹出`alert`的代码再看闭包，就很好理解了。

# property 和 attribute

DOM 节点就是一个 JS 对象，它符合之前讲述的对象的特征 —— 可扩展属性，因为 DOM 节点本质上也是一个 JS 对象。因此，如下代码所示，p可以有style属性，有className nodeName nodeType属性。注意，这些都是 JS 范畴的属性，符合 JS 语法标准的。

property 的获取和修改，是直接改变 JS 对象，而 attribute 是直接改变 HTML 的属性，两种有很大的区别。attribute 就是对 HTML 属性的 get 和 set，和 DOM 节点的 JS 范畴的 property 没有关系。

而且，get 和 set attribute 时，还会触发 DOM 的查询或者重绘、重排，频繁操作会影响页面性能。

