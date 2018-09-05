# vue 项目之去哪儿踩过的坑

## better scroll 插件里的元素无法触发原生的click事件

配置 click 为 `true` 即可解决。

better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 `_constructed`，值为 true。

## css属性之 touch-action

在用 vue 做去哪儿项目测试时发现在 iphoneX 下点击的时候会报错，通过对元素设置  `touch-action: none` 解决了该问题，添加适当的 touch-action CSS 规则以明确禁用触摸滚动。 

报错如下：

> [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See…

CSS 属性 touch-action 用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作（比如浏览器自带的划动、缩放等）。

还有一种方法是直接传递 `passive:false` 解决 treated as passive 错误。

具体可见 [张鑫旭](https://www.zhangxinxu.com/wordpress/2018/07/chrome-safari-touchmove-preventdefault-treated-as-passive/) 大大的博客。

# vue 中的 keep-alive 

在vue `2.1.0` 版本之后，`keep-alive` 新加入了两个属性:  `include`(包含的组件缓存生效) 与  `exclude  `  (排除的组件不缓存，优先级大于include) 。

`include` 和 `exclude` 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示。

需要注意的地方： 

1. `<keep-alive>` 先匹配被包含组件的 `name` 字段，如果 `name` 不可用，则匹配当前组件 `componetns` 配置中的注册名称。
2. `<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例。
3. 当匹配条件同时在 `include` 与 `exclude` 存在时，以 `exclude` 优先级最高(当前vue 2.4.2 version)。比如：包含于排除同时匹配到了组件A，那组件A不会被缓存。
4. 包含在 `<keep-alive>` 中，但符合 `exclude` ，不会调用`activated` 和 `deactivated`。

源自于 [tangdaohai](http://blog.myweb.kim/vue/keep-alive/?utm-source=segmentfault) 的博客。