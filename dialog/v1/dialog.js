/**
 * 弹窗
 * 
 * 1. 构造弹窗html，添加到body尾部
 * 2. 计算显示位置
 */
 

/*
 即时函数
 
 几种常见的写法：
 1. !function(){  }()
 2. (function(){  })()
 3. (function(){  }()) 
 4. void function(){  }()
 
 优点：
 1. 避免全局变量
 2. 避免不同的js文件或代码块之间变量冲突
*/
 
 
// 外层使用匿名即时函数包裹
~function ($, window, document) {

var win = $(window)

	// 弹窗的累计个数
	, dialogCount = 1
	
// 默认值
var defaults = {
	title: '提示'
	, content: ''
	, width: 350
	, height: 'auto'
	, autoClose: 0
	, ok: ['确定']
	, cancel: ['取消']
}

var dialogHtml = '<div id="mod-dialog-%dialogCount%" class="mod-dialog" style="left:-2000px; width: %width%px;">'
	+ '<div class="mod-dialog-title">%title%</div>'
	+ '<div class="mod-dialog-content" style="height: %height%px; overflow:hidden;">%content%</div>'
	+ '<div class="mod-dialog-buttons">'
		+ '<input type="button" name="ok" value="%ok.value%">'
		+ '<input type="button" name="close" value="%cancel.value%">'
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
	this.option = option
	
	var html = dialogHtml
		.replace('%dialogCount%', dialogCount)
		.replace('%title%', option.title)
		.replace('%width%', option.width)
		.replace('%height%', option.height)
		.replace('%content%', option.content)
		.replace('%ok.value%', option.ok[0])
		.replace('%cancel.value%', option.cancel[0])
		
	// 将弹窗添加到body
	$('body').append(html)
	
	var o = $('#mod-dialog-'+dialogCount)
	
	// 计算显示位置，上下左右居中
	// 窗口宽（高）度减去弹窗宽（高）度，再除以2
	var winW = win.width()
		, winH = win.height()
		, dialogW = o.outerWidth(true)
		, dialogH = o.outerHeight(true)
		, pos={}
	
	pos.left = (winW - dialogW) / 2
	pos.top = (winH - dialogH) / 2
	
	o.css(pos)
	
	dialogCount += 1
}


// 外部暴露接口
window.dialog = function (option) {
	return new Dialog(option)
}

}(jQuery, window, document)
