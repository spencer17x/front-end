1. 移动端video播放后层级覆盖了其他元素(解决方法：移动端点击播放默认全屏，window.onresize根据paused属性判断视频是否播放来选择是否替换video为图片)。
2. 时间倒计时（递归）。
3. 微信授权登录，先判断是否登录，未登录再判断url中是否有code，有code去用code换用户信息，无code则跳转微信链接去拿code。
4. 分享报错签名无效(将请求的url改成encodeURIComponent(location.href.split('#')[0]))
5. 画线无法保存上次绘制记录(draw带参数draw(true))
6. shadowDOM 了解下
7. JS 单线程遇到的问题(canvas 动画阻塞了自己写的动画导致卡顿)
8. 小程序中的 onLauch 和 onLoad
9. vue 中 scoped 样式穿透问题
10. 嵌套 img 样式跑偏使用 background-image 解决
11. 二维码长按识别不了，需将 background-image 修改为 img 标签
12. 浏览器的重绘与重排
