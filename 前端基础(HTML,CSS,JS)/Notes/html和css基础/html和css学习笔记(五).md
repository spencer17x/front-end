### 文字溢出处理

#### 单行文本溢出处理

overflow: hidden;溢出隐藏

white-space: nowrap;文字不能转行

text-overflow:ellipsis;隐藏的部分用...表示

 ![实现单行、多行文本溢出显示省略号](https://imgsa.baidu.com/exp/w=500/sign=eb5f759fad1ea8d38a227404a70b30cf/dcc451da81cb39db6e58a572db160924ab18307e.jpg) 



![实现单行、多行文本溢出显示省略号](https://imgsa.baidu.com/exp/w=500/sign=224ca9ce8acb39dbc1c06756e01709a7/8326cffc1e178a824689b284fd03738da977e85a.jpg)

####多行文本溢出显示...有2种方式，

（1）适用于WebKit浏览器或者移动端；

（2）适用于各种终端

首先介绍第一种：有一定的局限性。代码如下：

display: -webkit-box;

-webkit-box-orient: vertical;

-webkit-line-clamp: 3;

overflow: hidden;

overflow: hidden;首先是溢出隐藏，不可或缺

display: -webkit-box;弹性盒模型显示

-webkit-box-orient: vertical;盒模型元素的排列方式

-webkit-line-clamp: 3;显示行数

[![实现单行、多行文本溢出显示省略号](https://imgsa.baidu.com/exp/w=500/sign=7e20ccee898ba61edfeec82f713497cc/ac6eddc451da81cbf6ce49e95966d016092431ee.jpg)](http://jingyan.baidu.com/album/9f7e7ec09f44966f281554b5.html?picindex=3)

[![实现单行、多行文本溢出显示省略号](https://imgsa.baidu.com/exp/w=500/sign=da9c6029f3dcd100cd9cf821428b47be/43a7d933c895d1434c102e0778f082025aaf07b4.jpg)](http://jingyan.baidu.com/album/9f7e7ec09f44966f281554b5.html?picindex=4)

另一种方法，适合各种终端，但有一个bug：文字未超出行的情况下也会出现省略号,可结合js优化该方法。

代码如下：

.text {

  position: relative; 

  line-height: 30px; 

  max-height: 60px;

  overflow: hidden;

  width: 400px;

  margin: 20% 30%;

  border: 1px solid #ccc;

}

.text::after{

  content: "..."; 

  position: absolute; 

  bottom: 0; 

  right: 0; 

  padding-left: 40px;

  background: -webkit-linear-gradient(left, transparent, red 50%);

  background: -o-linear-gradient(right, transparent, red 50%);

  background: -moz-linear-gradient(right, transparent, red 50%);

  background: linear-gradient(to right, transparent, red 50%);

}

需要注意的事项：

1.将height设置为line-height的整数倍，防止超出的文字露出。

2.给p::after添加渐变背景可避免文字只显示一半。

3.由于ie6-7不显示content内容，所以要添加标签兼容ie6-7（如：<span>…<span/>）；兼容ie8需要将::after替换成:after。

[![实现单行、多行文本溢出显示省略号](https://imgsa.baidu.com/exp/w=500/sign=76b78620eedde711e7d243f697eecef4/b03533fa828ba61e0b06fe0a4a34970a304e592e.jpg)](http://jingyan.baidu.com/album/9f7e7ec09f44966f281554b5.html?picindex=5)

[![实现单行、多行文本溢出显示省略号](https://imgsa.baidu.com/exp/w=500/sign=99073a142a3fb80e0cd161d706d02ffb/574e9258d109b3de046cd24dc7bf6c81810a4cc7.jpg)](http://jingyan.baidu.com/album/9f7e7ec09f44966f281554b5.html?picindex=6)

 