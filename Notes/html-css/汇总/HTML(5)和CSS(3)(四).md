### margin塌陷

####嵌套关系(常见)

```html
 1 /*CSS部分*/
 2 <style>
 3 .box1{
 4     width:400px;
 5     height:400px;
 6     background: pink;
 7 }
 8 .box2{
 9     width:200px;
10     height:200px;
11     background: lightblue;
12 }
13 </style>
14 /*HTML部分*/
15 <body>
16     <div class="box1">
17         <div class="box2"></div>
18 	   </div>
19 </body>
```

​	子盒子和父盒子之间并没出现期望的10px间隙而是父盒子与子盒子一起与页面顶端产生了10px间隙。

解决方法:

1.为父盒子设置border，为外层添加border后父子盒子就不是真正意义上的贴合。

2.触发一个盒子的bfc。

### margin合并

#### 垂直并列（少见）

首先设置两个DIV,并为其制定宽高

```html
 1 /*HTML部分*/
 2 <body>
 3     <div class="box1">box1</div>
 4     <div class="box2">box2</div>
 5 </body>
 6 /*CSS部分*/
 7 <style> 
 8     *{
 9          margin: 0; 
10          padding: 0; 
11     }
12      .box1{ 
13          width: 200px; 
14          height: 200px; 
15          background: yellowgreen;
16      } 
17     .box2{ 
18          width: 200px; 
19          height: 200px; background: gray; 
20     }
21 </style>    
```

　　　  对box1我们为其设置margin-bottom：50px;

　　 　　对box2我们为其设置margin-top： 40px;

```
 1 <style>
 2 *{
 3     margin:0;
 4     padding:0;
 5 }
 6 .box1{
 7     width:200px;
 8     height:200px;
 9     background: yellowgreen;
10     margin-bottom: 50px;
11 }
12 .box2{
13     width:200px;
14     height:200px;
15     background: gray;
16     margin-top: 40px;
17 }
18 </style>
```

​	我们肯定会很理所当然的认定这两个盒子之间的距离为90px，事实上并非如此.

两盒子之间的距离仅是50px，也就是说两盒子之间的margin出现了重叠部分，故而我们可以得出：**垂直之间塌陷的原则是以两盒子最大的外边距为准。**

解决方法:

同解决margin塌陷的方法一样，不过一般最好的方法个人认为不解决(即将第一个盒子的margin-bottom的值直接设置为总间距，或者将第二个盒子的margin-top的值直接设置为总间距)。

### 如何触发一个盒子的bfc(块级格式化上下文)

1.position:absolute;

2.display:inline-block;

3.float:left/right;

4.overflow:hidden;

### 浮动元素

浮动元素产生了浮动流

所有产生了浮动流的元素，块级元素看不懂他们

产生了bfc的元素和文本类属性(inline，inline-block)的元素以及文本都能看到浮动元素

### css清除浮动带来的影响的方法

1. 首先，定义三个div：父容器container、子容器box1、box2，这里container没有给定高度。

   首先要知道，css中的块级元素是独占一行的，从上往下排列，我们称为标准流，这里的div就是块级元素。

2. 可以看到，两个box是从上往下排列的，但假如这时候我们要让两个box在父容器里并列一排呢，最简单的方法就是加浮动float。

3. 加了float:left之后，两个box是并列一排了，我们之前给父容器加了边框线，通过边框线可以发现一个问题，就是加了浮动之后，父容器高度塌陷了。为什么会出现这种现象呢？那就是加了浮动之后的元素脱离了标准流，所以父容器出现了高度塌陷，假如父容器里面还有其他元素或者设置了背景，就会导致布局错乱或者背景看不见，这时候，我们就需要清除浮动了

4. 第一种方式：添加新元素，使用clear:both;

   这种方式优点就是代码少，容易理解，浏览器几乎都支持，出现的问题比较少，但缺点就是如果页面浮动浮动布局多的话，就要添加很多空div去清除浮动，不便优化。虽然这是常用的清除浮动方式，但不建议使用

5. 第二种方式：父容器使用overflow: auto;

   使用这种方法，必须定义width或者zoom,而且不能设置高度height，优点是代码少，缺点是不能使用position,否则超出的元素将会被隐藏

6. 第三种：父容器使用伪类:after跟zoom

   这种方式是最推荐的，目前大多数大型网站都是使用这种方式清除浮动，浏览器兼容好，不会出现什么奇怪的问题。

   zoom是IE专有属性，可解决ie6,ie7浮动问题，IE8以上和非IE浏览器才支持伪类:after。

   缺点就是代码比较多，需要伪类:after跟zoom一起使用才能兼容所有主流浏览器。

   但推荐使用，可将改样式定义为公共样式，减少代码量

7. 好了，三种清除css浮动的方式就是这样。其实清除浮动不止这三种，但这三种是比较常用的，最为推荐的就是最后一种。清除浮动时，可根据当前布局选择最为合适的方式，不一定说指定要用哪一种，最适合的就是最好的。

### 小知识点

凡是设置了postion:absolute或者float:left/right；打内部把元素转换成inline-block;