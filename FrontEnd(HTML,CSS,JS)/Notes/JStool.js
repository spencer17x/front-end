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

// IE5.0 之前的版本不支持 document.getElementById()这个 DOM 方法
function getElement(id) {
    if (document.getElementById) {
        return document.getElementById(id);
    } else if (document.all) {
        return document.all[id];
    } else {
        throw new Error("No way to retrieve element!");
    }
}

// 迭代元素的每一个特性，然后将它们构造成 name="value" name="value"这样的字符串格式，
// 每个特性节点都有一个名为 specified 的属性，这个属性的值如果为 true，则意味着要么是在 HTML 中指
// 定了相应特性，要么是通过 setAttribute()方法设置了该特性。在 IE 中，所有未设置过的特性的该
// 属性值都为 false，而在其他浏览器中根本不会为这类特性生成对应的特性节点（因此，在这些浏览器
// 中，任何特性节点的 specified 值始终为 true）。
// 可以确保即使在 IE7 及更早的版本中，也会只返回指定的特性。
function outputAttributes(element){
	var pairs = new Array(),
		attrName,
		attrValue,
		i,
		len;
	for (i=0, len=element.attributes.length; i < len; i++) {
		attrName = element.attributes[i].nodeName;
		attrValue = element.attributes[i].nodeValue;
		if (element.attributes[i].specified) {
			pairs.push(attrName + "=\"" + attrValue + "\"");
		}
	}
	return pairs.join(" ");
} 

//动态创建脚本
function loadScript(url){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
} 
//尝试标准的 DOM 文本节点方法，因为除了 IE（在 IE 中会导致抛出错误），所有浏览器
// 都支持这种方式。如果这行代码抛出了错误，那么说明是 IE，于是就必须使用 text 属性了。
function loadScriptString(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex){
        script.text = code;
    }
    document.body.appendChild(script);
} 

//动态样式
function loadStyles(url){
    var link = document.createElement("link"); 
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
} 
//与动态添加嵌入式脚本类似，重写后的代码使用了 try-catch 语句来捕获 IE 抛出的错误，然后再
// 使用针对 IE 的特殊方式来设置样式。
function loadStyleString(css){
    var style = document.createElement("style"); 
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));
    } catch (ex) {
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
} 