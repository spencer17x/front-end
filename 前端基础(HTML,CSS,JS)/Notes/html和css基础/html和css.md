### 主流浏览器及其内核

> 浏览器包括shell和内核。
>
> IE(trident),Firefox(Gecko),Google chrome(Webkit/blink),Safari(Webkit),Opera(presto)。

### html中外部css文件link加载

> <link rel="stylesheet" type="text/css" href="xxx.css">为异步加载，即加载过程中同时下载css文件

### css权重

> !important>行间样式>id>class|属性>标签选择器>通配符。
>
> !important(Infinity),行间样式(1000),id(100),class|属性|伪类(10),标签|伪元素(1),通配符(0)。

### css复杂选择器

> 浏览器真正的遍历父子选择器的顺序为自右向左。

### 有关body的默认margin值

>在很多浏览器中，body都有默认的margin值，这个值为8像素。

### 如何触发一个盒子的bfc

>position:absolute;
>
>display:inline-block;
>
>float:left/right;
>
>overflow:hidden;

### 浮动元素产生了浮动流

> 所有产生了浮动的元素,块级元素看不到他们,产生了bfc的元素和文本类属性(inline)的元素以及文本都能看到浮动元素。
>
> position:absolute;float:left/rigtht;打内部把元素转换成inline-block；

### 溢出容器，要打点展示

> 单行文本设置:
>
> white-space:nowrap;
>
> overflow:hidden;
>
> text-overflow:ellipsis;

