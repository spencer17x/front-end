/**
 * 检查一个数据是否为整数
 */
function isInt(num) {
  return num % 1 === 0;
}

/**
 * url中获取参数
 */
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}