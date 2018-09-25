# let 和 const

使用 `let` 和 `const` 声明的变量解决了提升问题，因为它们的作用域是**到块**，而不是函数。之前，当你使用 `var` 时，变量要么为全局作用域，要么为本地作用域，也就是整个函数作用域。

如果在代码块（用花括号 `{ }` 表示）中使用 `let` 或 `const` 声明变量，那么该变量会陷入**暂时性死区**，直到该变量的声明被处理。这种行为会阻止变量被访问，除非它们被声明了。

- 使用 `let` 声明的变量可以重新赋值，但是不能在同一作用域内重新声明。
- 使用 `const` 声明的变量必须赋初始值，但是不能在同一作用域内重新声明，也无法重新赋值。

# for...of 循环

它结合了其兄弟循环形式 **for 循环**和 **for...in 循环**的优势，可以循环任何**可迭代**（也就是遵守[可迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)）类型的数据。默认情况下，包含以下数据类型：String、Array、Map 和 Set，注意不包含 `Object` 数据类型（即 `{}`）。默认情况下，对象不可迭代。

# for...in 循环

for...in 循环改善了 for 循环的不足之处，它消除了计数器逻辑和退出条件。

当你需要向数组中添加额外的方法（或另一个对象）时，for...in 循环会带来很大的麻烦。因为 for...in 循环循环访问所有可枚举的属性，意味着如果向数组的原型中添加任何其他属性，这些属性也会出现在循环中。

```js
Array.prototype.decimalfy = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```

> **Prints:**
> 0
> 1
> 2
> 3
> 4
> 5
> 6
> 7
> 8
> 9
> function() {
>  for (let i = 0; i < this.length; i++) {
>   this[i] = this[i].toFixed(2);
>  }
> }

而 for...of 不用担心向对象中添加新的属性。for...of 循环将只循环访问对象中的值。