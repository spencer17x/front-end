# background-size: contain 与cover的区别：

**作用**： 都是将图片以**相同宽高比**缩放以适应整个容器的宽高。

**不同之处在于：**

1. 在no-repeat情况下，如果容器宽高比与图片宽高比不同，

　　cover：图片宽高比不变、铺满整个容器的宽高，而图片多出的部分则会被截掉；

　　contain：图片自身的宽高比不变，缩放至图片自身能完全显示出来，所以容器会有留白区域；

PS:其实，从英文的意思来说：cover意味着“遮罩、遮盖”---此处理解为“塞满”较恰当，contain意为“包含”--也就是：我图片虽然缩放了，但是整个图是被“包含”在你里面的，你必须把我显示完整、不能裁剪我一丝一毫。

2. 在repeat情况下：cover 与上述相同；contain 容器内至少有一张完整的图，容器留白区域则平铺背景图，铺不下的再裁掉。

# background-size 在ie7\8的兼容写法：用filter滤镜

css中加入一句：

```css
filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../img/justice.jpg',sizingMethod='scale');
```

参数解释：

src="图片路径"，可以是相对，也可以是绝对；

sizingMethod：“scale|crop|image” 可选项。字符串(String)。设置或检索滤镜作用的对象的图片在对象容器边界内的显示方式。

　　 crop：剪切图片以适应对象尺寸。 
　　image：默认值。增大或减小对象的尺寸边界以适应图片的尺寸。 
　　scale：缩放图片以适应对象的尺寸边界。

PS:注意：如果设置了background-attachment:fixed;会是background-size属性失效

