// textarea高度随文本自适应
$.fn.extend({
  autoHeight: function () {
    return this.each(function () {
      var $this = $(this);
      if (!$this.attr('_initAdjustHeight')) {
        $this.attr('_initAdjustHeight', $this.outerHeight());
      }
      _adjustH(this).on('input', function () {
        _adjustH(this);
      });
    });
    /**
     * 重置高度
     * @param {Object} elem
     */
    function _adjustH(elem) {
      var $obj = $(elem);
      return $obj.css({
        height: $obj.attr('_initAdjustHeight'),
        'overflow-y': 'hidden'
      }).height(elem.scrollHeight);
    }
  }
});
// 使用
$(function () {
  $('.introduction').autoHeight();
});

//请输入正确的邮箱地址(弱提示框)
$('.correct-mailbox').change(function () {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
    $emailbox = $('.correct-mailbox').val();
  if (!reg.test($emailbox)) {
    layer.msg('请输入有效的邮箱地址', {
      time: 2000, //2秒消失
    });
  }
});

//验证手机号码
$(document).on("blur", ".phone", function () {
  //移动号码归属地支持号段:134 135 136 137 138 139 147 150 151 152 157 158 159 178  182 183 184 187 188

  //联通号码归属地支持号段:130 131 132  145 155 156 176  186

  //电信号码归属地支持号段:133 153 177 180 181 189

  //移动运营商:170
  var len = $.trim($(this).val()).length;
  var phone = $(this).val();
  var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (phone == '') {
    layer.msg('手机号码不能为空！', {
      time: 2000, //2秒消失
    });
  } else if (len !== 11) {
    layer.msg('请输入有效的手机号码！', {
      time: 2000, //2秒消失
    });
  } else if (!myreg.test(phone)) {
    layer.msg('请输入有效的手机号码！', {
      time: 2000, //2秒消失
    });
  } else {
    return true;
  }
});

//验证身份证号
$(document).on("blur", ".identity-card", function () {
  var $identityCard = $(this).val();
  var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!myreg.test($identityCard)) {
    layer.msg('请输入有效的身份证号', {
      time: 2000, //2秒消失
    });
  }
});

/**
 * 扩展 jq 长按事件
 */
$.fn.longPress = function (fn) {
  var timeout = undefined;
  var $this = this;
  for (var i = 0; i < $this.length; i++) {
    $this[i].addEventListener('touchstart', function (event) {
      timeout = setTimeout(fn, 800); //长按时间超过800ms，则执行传入的方法
    }, false);
    $this[i].addEventListener('touchend', function (event) {
      clearTimeout(timeout); //长按时间少于800ms，不会执行传入的方法
    }, false);
  }
}