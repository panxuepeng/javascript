/**
 * 幻灯片
 * 
 * # 1. 计算胶片总长度
 * # 2. 实现单方向单次移动效果
        a) 点击触发移动
	    b) 绑定事件
 * 3. 实现单方向连续移动效果
 * 4. 实现左右方向移动效果
 */

~function ($, window, document) {

var dom = $(document)
var win = $(window)

// 默认值
var defaults = {
	// 幻灯片节点的选择器
	selector: ''
	
	// 一次移动花费的时间，单位毫秒
	, speed: 200
	
	// 每次移动完成之后的停留时间，单位毫秒
	, timeout: 3000
}

function Slides(option) {
	var self = this
	
	self.option = option
	
	var $el = $(option.selector)
	
	Slides.init(option)
	
	// 将实例对象放到元素data里面，方便其他地方使用
	$el.data('slides', self)
	self.$el = $el
}

// 实现点击滚动效果
dom.delegate('.mod-slides', 'click', function() {
	var slides = $(this).data('slides')
	
	slides.next()
})

// 实例方法
$.extend(Slides.prototype, {

	// 向左移动
	next: function() {
		var self = this
			$el = self.$el
			, scrollLeft = $el.scrollLeft()
			, boxWidth = $el.outerWidth()
			, listWidth = $el.find('.mod-slides-list').outerWidth()
			, pos = null
		
		if ( listWidth - scrollLeft - boxWidth >= boxWidth ) {
			// 胶片的长度，减去已经
			
			pos = {scrollLeft: scrollLeft + boxWidth}
		
		}
			
		$el.animate(pos, self.speed)
	},
	
	prev: function() {
		
	},
	
	stop: function() {
	
	}
})

// 一些初始化操作
Slides.init = function(option) {
	// 计算胶片总长度
	var width = 0
	var list = $(option.selector+' .mod-slides-list')
	var childs = list.children()
	
	log([option.selector+' 幻灯片子元素个数', childs.length])
	childs.each(function() {
		width += $(this).outerWidth(true)
	})
	
	list.width(width)
	log([option.selector+' 计算胶片总长度', width])
}


// 外部暴露接口
window.slides = function(option) {
	// 参数默认值
	option = option || {}
	
	if ( typeof option === 'string' ) {
		option = {selector: option}
	}
	
	option = $.extend(true, {}, defaults, option)
	
	log([option.selector+' option', option])
	
	return new Slides(option)
}

// 打印日志
function log(data, method) {

	method = method || 'log'
	
	if ( log.isDebug() ) {
		if ( data instanceof Array && console[method].apply ) {
			console[method].apply(console, data)
		} else {
			console[method](data)
		}
		
	}
	
}

// 是否开启日志调试
log.isDebug = function() {
	return /(file:|&debug)/.test(location.href) && typeof console === 'object'
}


}(jQuery, window, document)
