---
## 参考资料
* [Arale编码规范](https://github.com/aralejs/aralejs.org/wiki/JavaScript-%E7%BC%96%E7%A0%81%E9%A3%8E%E6%A0%BC)
* [jQuery编码规范](http://contribute.jquery.org/style-guide/js/)

下面是一些常用注意点：


## 编码

统一用 utf-8


## 长度

单行长度不超过 80 个字符。


## 缩进

缩进统一使用 tab，宽度为 4，或者统一使用 4 个空格。
注意：一定要避免空格和 tab 混用。


## 花括号

### 花括号不换行

好

````
if (foo) {
}
````

坏

````
if (foo)
{
}
````

**不允许一行判断，一律换行**

坏

````
if (foo) return
````

##命名约定

1. 常量 UPPERCASE_WORD
2. 变量 camelName
3. 类名 CamelName
4. 文件 camel_name.js


## 空格

### 行尾推荐不带分好

已没有带分好的必要


### 行内不要使用tab

好

````
var x = y + z // ...
````

坏

````
var x=y+z	// ... 
````


### 操作符之间需要空格，逗号和冒号后面一定要跟空格

好

````
var x = y + z
````

````
if ( blah === "foo" ) {
  foo("bar", "baz", {zoo: 1})
}
````

坏

````
var x=y+z
````

````
if(blah==="foo"){
  foo("bar","baz",{zoo:1})
}
````

### 只空一格

好

````
{
    a: 'short',
    looooongname: 'long'
}
````

坏

````
{
    a           : 'short',
    looooongname: 'long'
}
````

## 逗号与换行

建议用自然人的处理方法

````
{
   a: 'a',
   b: 'b',
   c: 'c'
}
````

不建议使用 npm 风格的逗号与换行，即

````
{
   a: 'a'
  ,b: 'b'
  ,c: 'c'
}
````


## 变量声明

首先，**变量在使用前必须声明**。

对于单 var 模式和多 var 模式，不做强行约定，但同一个文件里，风格必须一致。



## 判断

尽量使用严格的等价判断符 === ，尽量不用 ==

## 代码块

### if/else/for/while/try 要使用花括号，且要换行

````
// 错:
if ( true )
   blah()

// 对:
if ( true ) {
   blah()
}
````

### else/else if/catch 要和花括号在同一行

````
if ( blah ) {
   baz()
} else {
   baz2()
}
````

### switch

````
switch ( event.keyCode ) {
	case $.ui.keyCode.ENTER:
	case $.ui.keyCode.SPACE:
	x()
	break
	case $.ui.keyCode.ESCAPE:
	y()
	break
	default:
	z()
}
````

## 字符串推荐使用单引号

因双引号常会出现在HTML、JSON等数据内容里面


## 条件判断或参数特别多时

好

````
ctx.setTransform(
	Math.random() * 0.5 + 2
	, Math.random() * 0.4
	, Math.random() * 0.4
	, Math.random() * 0.5 + 1
	, Math.floor(options.width/options.stringLength) * i* 0.8
	, options.height * 0.7
)
````

坏

````
ctx.setTransform(Math.random() * 0.5 + 2, Math.random() * 0.4, Math.random() * 0.4, Math.random() * 0.5 + 1, Math.floor(options.width/options.stringLength) * i* 0.8, options.height * 0.7)
````


## 相关讨论
- [编码与文档风格讨论](https://github.com/aralejs/aralejs.org/issues/36)
