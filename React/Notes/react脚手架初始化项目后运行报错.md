当使用 react-create-app (react脚手架)初始化项目时有时候会遇到报错，你会发现项目有了，但是运行的时候会报如下错误，并且运行不了项目。

![](react脚手架初始化项目后运行报错/initReactPro.jpg)

解决方法：在文件夹下新建一个 .env 文件，并在该文件下添加如下代码：

```js
SKIP_PREFLIGHT_CHECK=true
```

重新启动项目，你就可以运行项目了。