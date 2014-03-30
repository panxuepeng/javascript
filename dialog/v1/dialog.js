/**
 * 弹窗
 * 
 * 1. 构造弹窗html，添加到body尾部
 * 2. 计算显示位置
 * 3. 绑定确定、取消、关闭按钮事件
 */

// 外层使用匿名即时函数包裹
~function ($, window, document) {

var win = $(window), dom = $(document)

// 默认值
var defaults = {
	title: '提示'
	, content: ''
	, width: 350
	, height: 'auto'
	, autoClose: 0
	, ok: ['确定', function(){}]
	, cancel: ['取消']
}

var dialogHtml = '<div class="mod-dialog" style="left:-2000px;">'
	+ '<div class="mod-dialog-title">%title%</div>'
	+ '<div class="mod-dialog-content" style="width: %width%px; height: %height%px; overflow:hidden;">%content%</div>'
	+ '<div class="mod-dialog-buttons">'
		+ '<input type="button" name="ok" value="%ok.value%">'
		+ '<input type="button" name="cancel" value="%cancel.value%">'
	+ '</div>'
	+ '<a title="关闭" class="mod-dialog-close" name="close">×</a>'
+ '</div>'

// @option string 内容
// @option object 配置项
function Dialog(option) {
	if ( typeof option === 'string' ) {
		option = {content: option}
	}
	
	option = $.extend({}, defaults, option)
	
	var html = dialogHtml
		.replace('%title%', option.title)
		.replace('%width%', option.width)
		.replace('%height%', option.height)
		.replace('%content%', option.content)
		.replace('%ok.value%', option.ok[0])
		.replace('%cancel.value%', option.cancel[0])
		
	// 将弹窗添加到body
	var div = document.createElement('div')
	div.innerHTML = html
	document.body.appendChild(div)
	
	var o = $(div).children()
	
	// 计算显示位置
	var winW = win.width()
		, winH = win.height()
		, dialogW = o.outerWidth()
		, dialogH = o.outerHeight()
		, pos={}
	
	pos.left = (winW - dialogW) / 2
	pos.top = (winH - dialogH) / 2
	
	o.css(pos)
	
	// 绑定事件
	
	
	
}

$.extend(Dialog.prototype, {
	hide: function() {
		
	}
})

// 外部暴露接口
window.dialog = function (option) {
	return new Dialog(option)
}

}(jQuery, window, document)
