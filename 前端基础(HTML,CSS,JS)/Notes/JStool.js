// 跨浏览器取得窗口左边和上边的位置。
var leftPos = (typeof window.screenLeft == "number")? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;

//取得页面视口的大小
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
if (typeof pageWidth != "number"){
    if (document.compatMode == "CSS1Compat"){ //确定页面是否处于标准模式，是则执行 if
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}

//检测出弹出窗口是否被屏蔽
var blocked = false;
try {
    var wroxWin = window.open("http://www.wrox.com", "_blank");
    if (wroxWin == null){
        blocked = true;
    }
} catch (ex) {
    blocked = true;
}
if (blocked) {
    alert("The popup was blocked!");
}