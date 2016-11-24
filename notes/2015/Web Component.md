Web Component
======================

### 名词

Web Component
	［技术］“组件的概念”，CSS 和 HTML, JS 封装在一起。外部的样式可覆盖内部，内部的样式不影响外部。像写原生标签 <video> 一样。

Shadow DOM
	［术语］浏览器隐藏内部元素的解决方案。

Polymer
	［框架］封装了 Web Component 的原生 API, 如“创建自定义标签，注册标签”等动作。

X-Tag
	［框架］大概和 Polymer 做的事情差不多，提供的 API 不同而已。

Polyfill
	［术语］对针对跨浏览器、跨版本兼容的这类解决方案的统称。

HTML Imports
	［技术］HTML 中引入新的 HTML.


### Web Component 语法

<template>
	<style>
	</style>
</template>


createShadowRoot()
	return a document fragment which you can then fill with content.

document.importNode()
	appended to the shadow root.

Shadow Host
	It's the only piece visible to the user

descendants
	hidden from the user

insertion points. <content> tag
	the contents are the tags you nest inside of it

### HTML Imports

"HTML 导入让你以一个合并的HTML文件来加载这些资源。"
	但浏览器还是一个个去顺序去加载的。这里是指提高了开发效率？以及优化代码结构吧？

<link rel="import" href="https://www.polymer-project.org/0.5/components/polymer/polymer.html">


只是 snippet 片段？还是必须是一个完整的 html？

有什么弊端？
	浏览器加载顺序 －如果引入的 HTML, 里面再有 JS. 整体的加载流程是如何的？递归加载 还是 hoisting 全部异步请求的方式？

为何要用 HTML Imports ？如果用 js 方式，是 string 引入吗？

### 疑问：

如果写一个自定义标签，需要什么支持？
	需要浏览器支持，比如 createShadowRoot() 这些方法；

Shadow DOM 封装 HTML 后，用户是否可以访问子节点？

	一：
		所有渲染在屏幕上的节点都是可访问的，即使在浏览器上对用户“隐藏”了。

	二：
		防止了外部 JS 遍历内部 DOM 节点。
		"The shadow boundary prevents CSS in the parent document from bleeding into the shadow DOM, and it also prevents external JavaScript from traversing into the shadow root."

	三：
		使用内部 API 可访问到  －待测试


其他：
	querySelector 是 HTML5 语法吗？
	Object.create(HTMLElement.prototype);
	HTMLElement



### 联想 －直播厅项目抽离出导航条

<html>
	<nav></nav>
	<header></header>
	<section></section>
	<footer></footer>
</html>

方式：
	1. 后端方式：$变量
	2. 模版方式
		－本质还是引入 JS 字符串 方式
		－ JS 动态加载
	3. Angular 方式：做成一个 Directive
	4. Web Component 方式：


### 资源

custom HTML elements,
encapsulate all of their HTML and CSS
the Shadow DOM

[A Guide to Web Components - Rob Dodson - NOVEMBER 11, 2013](https://css-tricks.com/modular-future-web-components/)

================================  NEXT STEP   ================================

Polymer

Polymer 为何必须引入 html
如何使用，基本api

在自定义标签内部，只能通过 rel="import" 去引入新文件吗？
<link rel="import" type="css" href="contact-card.css">
<link rel="stylesheet" href="">

vuejs

和 webcompont 是如何结合的？

其他

new CSS selectors

为何要使用组件化
“Web组件化方面无序和缺乏标准的”，如一个日期控件，有无数方案。接口层面完全不兼容



