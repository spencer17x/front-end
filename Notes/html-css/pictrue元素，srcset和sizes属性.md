# 什么是 picture 元素

所述`picture`元件是一种标记图案，允许开发者声明多个源的图像。通过使用媒体查询，它使开发人员可以控制何时以及是否将这些图像呈现给用户。

该`picture`元素是[HTML规范的](https://html.spec.whatwg.org/multipage/embedded-content.html#the-picture-element)一部分 。

picture的示例标记：

```html
<picture>
  <source media="(min-width: 40em)"
    srcset="big.jpg 1x, big-hd.jpg 2x">
  <source 
    srcset="small.jpg 1x, small-hd.jpg 2x">
  <img src="fallback.jpg" alt="">
</picture>
```

# 什么是 srcset 和 sizes 属性

img元素的`srcset`和`sizes`属性扩展`img`和`source`元件，以提供可用的图像源和它们的尺寸的列表。然后，浏览器可以使用此信息来选择最佳图像源。

两者`srcset`和`sizes`是的一部分[HTML规范](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-srcset)和可单独或与一起使用`picture`的元素。

srcset 和 sizes 的示例标记

```html
<img src="small.jpg"
     srcset="large.jpg 1024w, medium.jpg 640w, small.jpg 320w"
     sizes="(min-width: 36em) 33.3vw, 100vw"
     alt="A rad wolf">
```

另一个示例：

```html
srcset="128px.jpg 128w, 256px.jpg 256w, 512px.jpg 512w"
```

表示，当`<img>`元素的宽度规格为128的时候，加载128px.jpg，宽度规格为256的时候，加载256px.jpg， 宽度规格为512的时候，加载512px.jpg。

这里的宽度规格就是`w`描述符的另外一种理解，其与`sizes`属性设定和屏幕密度密切相关。

举个例子，假设屏幕密度是2的iPhone6手机，`sizes`属性计算值是`128px`，则此时`<img>`实际的宽度规格应该是`128*2`也就是`256w`，因此会加载256px.jpg这张图。

**不同的2x显示策略**

还有些时候，使用同尺寸的高清图片作为`2x`对应图片，虽然两者图片大小差不多，但个人觉得还是2倍尺寸优化大图更好一点，为什么呢？![img](https://mat1.gtimg.com/www/mb/images/face/32.gif)

`srcset`当初设计的用意是为了高密度屏幕上图片更好的显示，如果世界上就只有“不同设备密度”这一个戏剧冲突的话，`2x`图片是高清图还是2倍尺寸图其实都无伤大雅。然而，事实上，生活无处不戏剧，现代web布局中，有种布局不可忽略，那就是「响应式布局」，剧本往往会这样，PC浏览器上显示大图，Mobile浏览器上显示小图。发现没，同样是“大小图的要求”，和设备像素比有类似的戏剧冲突。

于是，如果我们`2x`图片使用的是高清图，结合响应式布局，我们可能需要4张图片资源，即：小图、小图高清和大图、大图高清。但是，`2x`图片走的是2倍尺寸图片，我们只需要3张图片资源，即：小图、中图以及中图、大图。

走2倍尺寸路线的：

```html
<img src="small.jpg" srcset="small.jpg 1x, medium.jpg 2x">
```

意为1倍屏时加载small，2倍屏时加载medium。

**sizes** 属性

```html
<img src="128px.jpg"
     srcset="128px.jpg 128w, 256px.jpg 256w, 512px.jpg 512w"
     sizes="(max-width: 360px) 340px, 128px">

<img src="128px.jpg"
     srcset="128px.jpg 128w, 256px.jpg 256w, 512px.jpg 512w"
     sizes="(max-width: 360px) calc(100vw - 20px), 128px">
```

上面的`<img>`元素设置的`sizes`属性值`(max-width: 360px) 340px, 128px`表示当视区宽度不大于360像素时候，图片的宽度限制为340像素；其他情况下，使用128像素。
下面的`<img>`元素设置的`sizes`属性值`(max-width: 360px) calc(100vw - 20px), 128px`表示当视区宽度不大于360像素时候，图片的宽度限制为屏幕宽度减20像素；其他情况下，使用128像素。

此部分摘自 [张鑫旭大大]('https://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/')，可访问 https://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/ 查看。

