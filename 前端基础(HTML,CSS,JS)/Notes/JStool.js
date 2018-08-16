// 跨浏览器取得窗口左边和上边的位置。
var leftPos = (typeof window.screenLeft == "number")? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;

//查看可视窗口尺寸
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') { //怪异模式
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else { //标准模式
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
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

// 用以解析查询字符串，然后返回包含所有参数的一个对象
function getQueryStringArgs(){
    //取得查询字符串并去掉开头的问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        //保存数据的对象
        args = {},
        //取得每一项
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        //在 for 循环中使用
        i = 0,
        len = items.length;
    //逐个将每一项添加到 args 对象中
    for (i=0; i < len; i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}


//检测插件（在 IE 中无效）
function hasPlugin(name) {
    name = name.toLowerCase();
    for (var i=0; i < navigator.plugins.length; i++) {
        if (navigator. plugins [i].name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}
//检测 IE 中的插件
function hasIEPlugin(name) {
    try {
        new ActiveXObject(name);
        return true;
    } catch (ex) {
        return false;
    }
}
//检测所有浏览器中的 QuickTime
function hasQuickTime(){
    var result = hasPlugin("QuickTime");
    if (!result){
        result = hasIEPlugin("QuickTime.QuickTime");
    }
    return result;
}
//检测 Flash
alert(hasFlash());
//检测 QuickTime
alert(hasQuickTime());
