1. 移动端video播放后层级覆盖了其他元素(解决方法：移动端点击播放默认全屏，window.onresize根据paused属性判断视频是否播放来选择是否替换video为图片)。
2. 时间倒计时（递归）。
3. 微信授权登录，先判断是否登录，未登录再判断url中是否有code，有code去用code换用户信息，无code则跳转微信链接去拿code。
4. 分享报错签名无效(将请求的url改成encodeURIComponent(location.href.split('#')[0]))
5. 画线无法保存上次绘制记录(draw带参数draw(true))

