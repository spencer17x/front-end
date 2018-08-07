### margin塌陷

####嵌套关系(常见)

```
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

​      ![img](https://images2015.cnblogs.com/blog/979950/201609/979950-20160923182706012-1314391800.png)

　　　 当为子盒子添加margin-top:10px;时会发生如下情况：

​          ![img](https://images2015.cnblogs.com/blog/979950/201609/979950-20160923182706340-1945431455.png)

​	子盒子和父盒子之间并没出现期望的10px间隙而是父盒子与子盒子一起与页面顶端产生了10px间隙。

解决方法:

1.为父盒子设置border，为外层添加border后父子盒子就不是真正意义上的贴合。

2.触发一个盒子的bfc。

### margin合并

#### 垂直并列（少见）

首先设置两个DIV,并为其制定宽高

```
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

​          ![img](https://images2015.cnblogs.com/blog/979950/201609/979950-20160923182705262-115857842.png)

 　　　 

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

　　　  如下图所示：

​          ![img](https://images2015.cnblogs.com/blog/979950/201609/979950-20160923182705668-1224958822.png)

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

   首先要知道，css中的块级元素是独占一行的，从上往下排列，我们称为标准流，这里的div就是块级元素。先看看没加浮动之前的效果是怎么的。

   [![css怎么清除浮动](https://imgsa.baidu.com/exp/w=500/sign=53d02f7a743e6709be0045ff0bc69fb8/34fae6cd7b899e51fbe5e94949a7d933c8950d00.jpg)](http://jingyan.baidu.com/album/a24b33cd2eb0e519fe002bbe.html?picindex=1)

   [![css怎么清除浮动](https://imgsa.baidu.com/exp/w=500/sign=04327d3d44c2d562f208d0edd71190f3/810a19d8bc3eb1358ef064e6ad1ea8d3fd1f44bc.jpg)](http://jingyan.baidu.com/album/a24b33cd2eb0e519fe002bbe.html?picindex=2)

2. 

   可以看到，两个box是从上往下排列的，但假如这时候我们要让两个box在父容器里并列一排呢，最简单的方法就是加浮动float，看看加完浮动之后的效果

   [![css怎么清除浮动](https://imgsa.baidu.com/exp/w=500/sign=aa8fbdc2af0f4bfb8cd09e54334e788f/9f2f070828381f30c1a95ff4a2014c086e06f03f.jpg)](http://jingyan.baidu.com/album/a24b33cd2eb0e519fe002bbe.html?picindex=3)

   [![css怎么清除浮动](https://imgsa.baidu.com/exp/w=500/sign=4d32be83366d55fbc5c676265d234f40/d439b6003af33a8782f5d247cd5c10385243b5d7.jpg)](http://jingyan.baidu.com/album/a24b33cd2eb0e519fe002bbe.html?picindex=4)

3. 

   加了float:left之后，两个box是并列一排了，我们之前给父容器加了边框线，通过边框线可以发现一个问题，就是加了浮动之后，父容器高度塌陷了。为什么会出现这种现象呢？那就是加了浮动之后的元素脱离了标准流，所以父容器出现了高度塌陷，假如父容器里面还有其他元素或者设置了背景，就会导致布局错乱或者背景看不见，这时候，我们就需要清除浮动了

4. 

   第一种方式：添加新元素，使用clear:both;

   这种方式优点就是代码少，容易理解，浏览器几乎都支持，出现的问题比较少，但缺点就是如果页面浮动浮动布局多的话，就要添加很多空div去清除浮动，不便优化。虽然这是常用的清除浮动方式，但不建议使用

   [![css怎么清除浮动](https://imgsa.baidu.com/exp/w=500/sign=9a5ebd62d2f9d72a1764101de42a282a/77094b36acaf2edd23de90b4861001e939019344.jpg)](http://jingyan.baidu.com/album/a24b33cd2eb0e519fe002bbe.html?picindex=5)

   [![css怎么清除浮动](https://imgsa.baidu.com/exp/w=500/sign=2277ccc94d2309f7e76fad12420f0c39/11385343fbf2b211fe2e5c13c18065380cd78e6f.jpg)](http://jingyan.baidu.com/album/a24b33cd2eb0e519fe002bbe.html?picindex=6)

5. 

   第二种方式：父容器使用overflow: auto;

   使用这种方法，必须定义width或者zoom,而且不能设置高度height，优点是代码少，缺点是不能使用position,否则超出的元素将会被隐藏

   [![css怎么清除浮动](https://imgsa.baidu.com/exp/w=500/sign=cfcb4026da1373f0f53f6f9f940e4b8b/8601a18b87d6277f80a7ea6523381f30e924fc32.jpg)](http://jingyan.baidu.com/album/a24b33cd2eb0e519fe002bbe.html?picindex=7)

   [![css怎么清除浮动](https://imgsa.baidu.com/exp/w=500/sign=38fb9da230c79f3d8fe1e4308aa0cdbc/0eb30f2442a7d93339533c2ea64bd11372f001f0.jpg)](http://jingyan.baidu.com/album/a24b33cd2eb0e519fe002bbe.html?picindex=8)

6. 

   第三种：父容器使用伪类:after跟zoom

   这种方式是最推荐的，目前大多数大型网站都是使用这种方式清除浮动，浏览器兼容好，不会出现什么奇怪的问题。

   zoom是IE专有属性，可解决ie6,ie7浮动问题，IE8以上和非IE浏览器才支持伪类:after。

   缺点就是代码比较多，需要伪类:after跟zoom一起使用才能兼容所有主流浏览器。

   但推荐使用，可将改样式定义为公共样式，减少代码量

   [![css怎么清除浮动](https://imgsa.baidu.com/exp/w=500/sign=5d1a177c9bef76c6d0d2fb2bad17fdf6/838ba61ea8d3fd1ff9f367673b4e251f94ca5ff1.jpg)](http://jingyan.baidu.com/album/a24b33cd2eb0e519fe002bbe.html?picindex=9)

   [![css怎么清除浮动](https://imgsa.baidu.com/exp/w=500/sign=0bec67b0aa44ad342ebf8787e0a30c08/b58f8c5494eef01fa0e6dd98ebfe9925bd317df9.jpg)](http://jingyan.baidu.com/album/a24b33cd2eb0e519fe002bbe.html?picindex=10)

7. 

   好了，三种清除css浮动的方式就是这样。其实清除浮动不止这三种，但这三种是比较常用的，最为推荐的就是最后一种。清除浮动时，可根据当前布局选择最为合适的方式，不一定说指定要用哪一种，最适合的就是最好的。

### 小知识点

凡是设置了postion:absolute或者float:left/right；打内部把元素转换成inline-block;