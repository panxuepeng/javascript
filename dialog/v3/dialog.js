/**
 * 弹窗
 * 
 * 1. 构造弹窗html，添加到body尾部
 * 2. 计算显示位置
 *
 *
 * 3. 绑定确定、取消、关闭按钮事件
 * 4. 可以自动关闭
 *
 *
 * # 5. 浏览器窗口改变时可以自动调整到上下左右居中位置
 *    1) 在window的resize事件，重新计算位置
 *    2) 将left将像素单位改为百分比，同时使用 margin-left，top同理 （选择此方式）
 * 
 * # 6. 增加确定和关闭事件，以在用户点击确定或关闭按钮时执行特殊操作
 *
 */

// 外层使用匿名即时函数包裹
~function ($, window, document) {

var win = $(window)
	, dom = $(document)
	
	// 弹窗的累计个数
	, dialogCount = 1

// 默认值
var defaults = {
	title: '提示'
	, content: ''
	, width: 350
	, height: 'auto'
	, autoClose: 0
	, ok: {text:'确定'}
	, cancel: {text:'取消'}
}

var dialogHtml = '<div id="mod-dialog-%dialogCount%" class="mod-dialog" style="left:-2000px; width: %width%px;">'
	+ '<div class="mod-dialog-title">%title%</div>'
	+ '<div class="mod-dialog-content" style="height: %height%px; overflow:hidden;">%content%</div>'
	+ '<div class="mod-dialog-buttons">'
		+ '<input type="button" name="ok" value="%ok.value%">'
		+ '<input type="button" name="cancel" value="%cancel.value%">'
	+ '</div>'
	+ '<a title="关闭" class="mod-dialog-close" name="cancel">×</a>'
+ '</div>'

// @option string 内容
// @option object 配置项
function Dialog(option) {
	var self = this
	
	if ( typeof option === 'string' ) {
		option = {content: option}
	}
	
	option = $.extend(true, {}, defaults, option)
	self.option = option
	
	var html = dialogHtml
		.replace('%dialogCount%', dialogCount)
		.replace('%title%', option.title)
		.replace('%width%', option.width)
		.replace('%height%', option.height)
		.replace('%content%', option.content)
		.replace('%ok.value%', option.ok.text)
		.replace('%cancel.value%', option.cancel.text)
		
	// 将弹窗添加到body
	$('body').append(html)
	
	var o = $('#mod-dialog-'+dialogCount)
	
	// 计算显示位置，上下左右居中
	var winW = win.width()
		, winH = win.height()
		, dialogW = o.outerWidth(true)
		, dialogH = o.outerHeight(true)
		, pos={}
	
	// 窗口大小改变时，可以自动居中
	pos.left = '50%'
	pos.top = '50%'
	pos.marginLeft = -(dialogW / 2)
	pos.marginTop = -(dialogH / 2)
	
	o.css(pos)
	
	self.$el = o
	
	o.data('dialog', self)
	
	dialogCount += 1
	
	// 自动关闭
	if ( option.autoClose ) {
		setTimeout(function() {
			// 这里使用 this.close() 可以吗，为什么？
			self.close()
		}, option.autoClose)
	}
}

// 事件委托
dom.delegate('.mod-dialog', 'click', function(e) {

	var target = $(e.target)
		, name = target.attr('name')
		, dialog = $(this).data('dialog')
		
	if( name && dialog && /^(cancel|ok)$/i.test(name) && dialog[name] ) {
		return dialog[name]()
	}
})

$.extend(Dialog.prototype, {
	ok: function() {
		if ( typeof this.option.ok.callback === 'function' ) {
			this.option.ok.callback.call(this)
			// 和 this.option.ok.callback() 有什么区别？
		} else {
			this.close()
		}
		
	},
	cancel: function() {
		if ( typeof this.option.cancel.callback === 'function' ) {
			this.option.cancel.callback.call(this)
		} else {
			this.close()
		}
	},
	close: function() {
		this.$el.remove()
	}
})

// 外部暴露接口
window.dialog = function (option) {
	return new Dialog(option)
}

}(jQuery, window, document)
