# React.lazy

> 注意：
>
> `React.lazy` 和 Suspense 尚不可用于服务器端呈现。如果要在服务器呈现的应用程序中进行代码拆分，我们建议使用 [可加载组件](https://github.com/smooth-code/loadable-components)。它有一个很好的 [指南，用于捆绑服务器端渲染](https://github.com/smooth-code/loadable-components/blob/master/packages/server/README.md)。

`React.lazy` 目前仅支持默认导出。如果要导入的模块使用命名导出，则可以创建一个中间模块，将其重新导出为默认模块。这可确保树木继续工作，并且您不会引入未使用的组件。

> lazy 要和 Suspense 一起用。

# 基于路由的代码拆分

![](D:\Sev\front-end\Notes\React\汇总\react高阶组件\error\1.png)

![](D:\Sev\front-end\Notes\React\汇总\react高阶组件\error\3.png)

![](D:\Sev\front-end\Notes\React\汇总\react高阶组件\error\2.png)

**报错原因：**lazy 的返回值不是 function，提供给 Route 的的类型是 Object 而不是 function，期望返回的是 function。

**解决方法：**

![](D:\Sev\front-end\Notes\React\汇总\react高阶组件\error\4.jpg)

# 命名出口

`React.lazy`目前仅支持默认导出。如果要导入的模块使用命名导出，则可以创建一个中间模块，将其重新导出为默认模块。这可确保树木继续工作，并且您不会引入未使用的组件。

```js
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;

// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";

// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

