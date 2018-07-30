# 使用严格模式
如果在JavaScript文件开头写上'use strict';那么Node在执行该JavaScript时将使用严格模式。但是，在服务器环境下，如果有很多JavaScript文件，每个文件都写上'use strict';很麻烦。我们可以给Nodejs传递一个参数，让Node直接为所有js文件开启严格模式：

```javascript
node --use_strict demo.js
```

#  模块

在计算机程序的开发过程中，随着程序代码越写越多，在一个文件里代码就会越来越长，越来越不容易维护。

为了编写可维护的代码，我们把很多函数分组，分别放到不同的文件里，这样，每个文件包含的代码就相对较少，很多编程语言都采用这种组织代码的方式。在 Node 环境中，一个 .js 文件就称之为一个模块（module）。

使用模块的最大的好处就是大大提高了代码的可维护性。其次，编写代码不必从零开始。当一个模块编写完毕，就可以被其他地方引用。我们在编写程序的时候，也经常引用其他模块，包括 Node 内置的模块和来自第三方的模块。

使用模块还可以避免函数名和变量名冲突。相同名字的函数和变量完全可以分别存在不同的模块中，因此，我们自己在编写模块时，不必考虑名字会与其他模块冲突。

创建一个 hello.js:

```javascript
'use strict';
var s = 'hello';
function greet(name) {
    console.log(s + ',' + name + '!');
}
module.exports = greet;
```

如上，那么 hello.js 文件就是一个模块，模块的名字就是文件名(去掉 .js 后缀)，所以 hello.js 文件就是名为 hello 的模块。

module.exports = greet 意为把函数作为模块的输出暴露出去，这样其他模块就可以使用 greet 函数了。

我们在编写一个 main.js 文件，调用 hello 模块的 greet 函数:

```javascript
'use strict';
//引入 hello 模块;
var greet = require('./hello');
var s = 'Michael';
greet(s) //Hello,Michael!
```

在使用`require()`引入模块的时候，请注意模块的相对路径。因为`main.js`和`hello.js`位于同一个目录，所以我们用了当前目录`.`

如果只写模块名：

```
var greet = require('hello');
```

则Node会依次在内置模块、全局模块和当前模块下查找`hello.js`，你很可能会得到一个错误：

```
module.js
    throw err;
          ^
Error: Cannot find module 'hello'
    at Function.Module._resolveFilename
    at Function.Module._load
    ...
    at Function.Module._load
    at Function.Module.runMain
```

遇到这个错误，你要检查：

- 模块名是否写对了；
- 模块文件是否存在；
- 相对路径是否写对了。

# CommonJS规范

这种模块加载机制被称为 CommonJS 规范。在这个规范下，每个`.js`文件都是一个模块，它们内部各自使用的变量名和函数名都互不冲突，例如，`hello.js`和`main.js`都申明了全局变量`var s = 'xxx'`，但互不影响。

一个模块想要对外暴露变量（函数也是变量），可以用`module.exports = variable;`，一个模块要引用其他模块暴露的变量，用`var ref = require('module_name');`就拿到了引用模块的变量。

