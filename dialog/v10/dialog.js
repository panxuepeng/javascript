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
 * 5. 浏览器窗口改变时可以自动调整到上下左右居中位置
 *    1) 在window的resize事件，重新计算位置
 *    2) 将left将像素单位改为百分比，同时使用 margin-left，top同理 （选择此方式）
 * 
 * 6. 增加确定和关闭事件，以在用户点击确定或关闭按钮时执行特殊操作
 *
 *
 * 7. 遮罩层
 *
 *
 * 8. 窗口实现简单的拖动效果，能动就行
 * 
 * 9. 完善拖动效果，以点击的那个点为拖动中心
 * 
 * 10. 多窗口共存，触摸当前窗口时，将其置为最顶层
 *
 * 11. 支持通过接口修改标题和内容
 *
 * 12. 窗口大小支持根据内容自适应（计算内容的宽和高）
 *
 * # 13. 窗口主要部分可自定义样式
 *
 */

// 外层使用匿名即时函数包裹
~function ($, window, document) {

var win = $(window)
	, dom = $(document)
	, ContainerId = 'container-mod-dialog'
	
	// 弹窗的累计个数
	, dialogCount = 1
	
	, zIndex = 10001

// 默认值
var defaults = {
	title: '提示'
	, content: ''
	, width: 350
	, height: 'auto'
	, autoClose: 0
	, ok: {text:'确定'}
	, cancel: {text:'取消'}
	
	// 遮罩层
	, lock: false
	
	// 是否可拖动
	, drag: false
	
	// 自定义窗口各部分样式，方便样式微调
	// style: {title: {key:value, key2:value2, .....}}
	/*
	style: {
		'dialog': null
		, 'title': null
		, 'content': null
		, 'bottom': null
		, 'ok': null
		, 'cancel': null
		, 'close': null
	}
	*/
	, style: null
}

setTimeout(function() {
	// 所有table都放到此区域
	$('body').append('<div id="'+ContainerId+'"><table><tr><td></td></tr></table></div>')
})

// 注意：
// width 样式放到最外层的div上，否则ie7下标题div宽度会适应文字的宽度
// height 样式放到内容div上，否则内容区域会使用内容的真实高度，按钮div会跟上去
// 内容区域的边距使用padding
var dialogHtml = '<div id="mod-dialog-%dialogCount%" class="mod-dialog" style="width: %width%px; left:-2000px;">'
	+ '<div class="mod-dialog-title">%title%</div>'
	+ '<div class="mod-dialog-content" style="height: %height%px; padding:%padding%;">%content%</div>'
	+ '<div class="mod-dialog-bottom">'
		+ '<input class="mod-dialog-ok" type="button" name="ok" value="%ok.value%">'
		+ '<input class="mod-dialog-cancel" type="button" name="cancel" value="%cancel.value%">'
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
	$('#'+ContainerId).append(html)
	
	var o = $('#mod-dialog-'+dialogCount)
	
	// 设置自定义样式
	if (option.style && typeof option.style === "object") {
		for (var name in option.style) {
			var s = option.style[name]
			
			if (s) {
				if ( name === 'dialog' ) {
					o.css(s)
				} else {
					o.find('.mod-dialog-'+name).css(s)
				}
				
			}
		}
	}
	
	// 计算显示位置，上下左右居中
	var winW = win.width()
		, winH = win.height()
		, dialogW = o.outerWidth()
		, dialogH = o.outerHeight()
		, pos={}
	
	// 窗口大小改变时，可以自动居中
	pos.left = '50%'
	pos.top = '50%'
	pos.marginLeft = -(dialogW / 2)
	pos.marginTop = -(dialogH / 2)
	
	zIndex += 1
	pos.zIndex = zIndex
	
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
	
	// 遮罩层
	if ( option.lock ) {
		$('body').append('<div class="mod-overlay"></div>')
	}
}

// 事件委托

// 窗口点击事件
dom.delegate('.mod-dialog', 'click', function(e) {

	var target = $(e.target)
		, name = target.attr('name')
		, dialog = $(this).data('dialog')
	
	if( name && dialog && /^(cancel|ok)$/i.test(name) && dialog[name] ) {
		return dialog[name]()
	}
	
}).delegate('.mod-dialog', 'mousedown', function(e) {

	// 处理 zIndex
	zIndex += 1
	$(this).css({'z-index': zIndex})
})

// 窗口拖动效果
// 以点击的那个点为拖动中心
// 当存在横向滚动条，并且左侧有偏移时，也可以正常拖动
function mousemove(e) {
	var left = e.pageX - draggingOffset.left - dom.scrollLeft()
	var top = e.clientY - draggingOffset.top
	
	$(this).css({
		left: left
		, top:  top
		
		// 必须清除可能存在的 margin 值，防止出现偏移
		, margin: 0
	})
}

function mouseup() {
	dom.unbind('mousemove.drag')
	.unbind('mouseup.drag')
	.unbind("selectstart.drag")
}

// 记录点击的点相对窗口左上角的偏移
// 以便于拖动时以点击的点为中心移动窗口
var draggingOffset

// 窗口拖动相关事件
dom.delegate('.mod-dialog-title', 'mousedown', function(e) {
	var self = this
	var panel = $(this).closest('.mod-dialog')
	var dialog = panel.data('dialog')
	var offset = panel.offset()
	
	// 窗口可以拖动
	if ( dialog.option.drag ) {
		draggingOffset = {
			left: e.pageX - offset.left
			, top: e.pageY - offset.top
		}
		
		dom.bind('mousemove.drag', function(e) {
			mousemove.call(panel, e)
			
		}).bind('mouseup.drag', function(e) {
		
			mouseup.call(panel, e)
			
		}).bind("selectstart.drag", function() {
			return false
		})
		
	}
})

// 弹窗实例方法（接口）
$.extend(Dialog.prototype, {
	// 点击确定按钮
	ok: function() {
		if ( typeof this.option.ok.callback === 'function' ) {
			this.option.ok.callback.call(this)
			// 和 this.option.ok.callback() 有什么区别？
		} else {
			this.close()
		}
		
	},
	
	// 点击取消按钮
	cancel: function() {
		if ( typeof this.option.cancel.callback === 'function' ) {
			this.option.cancel.callback.call(this)
		} else {
			this.close()
		}
	},
	
	// 关闭弹窗
	close: function() {
		this.$el.remove()
		
		// 同时删除遮罩层
		$('.mod-overlay').remove()
	},
	
	// 修改弹窗标题
	title: function (html) {
		var self = this
		self.$el.find('.mod-dialog-title').html(html)
		return self
	},
	
	// 修改弹窗内容
	// 内容在被赋值到内容区域之前，需计算一下新内容所需的宽和高
	content: function (html) {
		var self = this
		var wh = getContentSize.call(this, html)
		self.$el.find('.mod-dialog-content').html(html)
		this.resize(wh.width, wh.height)
		return self
	},
	
	// 调整弹窗的大小，同时更新位置坐标
	resize: function(width, height) {
		var self = this
		var o = self.$el
		var pos = {}
		
		o.width(width)
		o.find('.mod-dialog-content').height(height)
		
		pos.marginLeft = -(width / 2)
		pos.marginTop = -(o.height() / 2)

		o.css(pos)
	}
})


// 计算内容的宽和高
function getContentSize(html) {
	var self = this
	var o = self.$el
	var td = $('#'+ContainerId).children('table').find('td')
	
	td.attr('width', o.width())
	td.css('padding', o.find('.mod-dialog-content').css('padding'))
	
	td.append(html)
	var val = {width: td.outerWidth(true), height: td.height()}
	td.empty()
	
	return val
}

// 外部暴露接口
window.dialog = function (option) {
	return new Dialog(option)
}

}(jQuery, window, document)
