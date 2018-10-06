# 浏览器组成

1. shell部分

2. 内核部分

   *渲染引擎(语法规则和渲染)

   *js引擎

   *其他模块

# script的三种加载方式 异步加载顺序

- `<script>`: 脚本的获取和执行是同步的。此过程中页面被阻塞，停止解析。
- `<script defer = "defer">`：脚本的获取是异步的，执行是同步的。脚本加载不阻塞页面的解析，脚本在获取完后并不立即执行，而是等到`DOM`ready之后才开始执行。
- `<script async = "async">`: 脚本的获取是异步的，执行是同步的。但是和`<script defer = "defer">`的不同点在于脚本获取后会立刻执行，这就会造成脚本的执行顺序和页面上脚本的排放顺序不一致，可能造成脚本依赖的问题。

# 主流浏览器及其内核

1. IE浏览器内核：Trident内核，也是俗称的IE内核；
2. Chrome浏览器内核：统称为Chromium内核或Chrome内核，以前是Webkit内核，现在是Blink内核；
3. Firefox浏览器内核：Gecko内核，俗称Firefox内核；
4. Safari浏览器内核：Webkit内核；
5. Opera浏览器内核：最初是自己的Presto内核，后来加入谷歌大军，从Webkit又到了Blink内核；

# js语句基本规则

- js语法错误会引发后续代码终止，但不会影响其他js代码块

# 逻辑运算符

短路语句:

- &&: 找为假的值并返回其值，并不继续往下找了，如果全为真，则返回最后一个值。(找假值)

  ```
  var a = 2 && 0 && 3 && false; //返回0 
  ```

- ||: 找为真的值并返回其值，并不继续往下找了，如果全为假，则返回最后一个值。(找真值)

  ```
  var a = 2 || 0 || 3 || false; //返回2 
  ```

# parseInt与toString()

- parseInt(a,radix): 以a为radix进制，转换为十进制。
- a.toString(radix): 将a转换为radix进制。

> radix取值为0到32，如果基数没有指定，则使用 10。

# 隐式转换

> isNaN()在接收到一个值之后，会尝试将这个值转换为数值，即相当于先调用Number()。
>
> a++ ,a--, --a, ++a, -a, +a ,-, /, *, %同理。

# 补充:

```infinity == infinity;
undefined == undefined;
null == null;
null == undefined;都为true
1%0为NaN;
parseInt(true),parseInt(false)都为NaN;
```

# 数组常用的方法

*改变原数组

​	* push,pop,shift,unshift,sort,reverse

​	* splice

*不改变原数组

​	* concat,join—>split,toString,slice

# 类数组

1. 可以利用属性名模拟数组的特性
2. 可以动态的增长length属性
3. 如果强行让类数组调用push方法，则会根据length属性值的位置进行属性的扩充

```javascript
var obj = {
    "2": "a",
    "3": "b",
    "length": 2,
    "push": Array.prototype.push
}
obj.push('c');
obj.push('d');
obj为{2: "c", 3: "d", length: 4, push: ƒ}
```

```javascript
将一个对象转换为类数组:
var objArr = {
    '0': 1,
    '1': 2
}
console.log(objArr);
var objArr = {
    '0': 1,
    '1': 2,
    'length': 2,
    'splice': Array.prototype.splice
}
console.log(objArr);
```

> 类数组必备length属性，索引(数字)属性，最好加上push

