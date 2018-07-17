---
layout: post
title:  关于 position: fixed 失效问题
date:   2015-11-24
categories: Note
tag: "学习笔记"
desc: "从 css 动画导致了 position: fixed 属性失效的问题，探究 css 动画的秘密。"
imgUrl: "data/post_imgs/position-fixed2.png"
---

### 一、背景

	当即将离开可视区域时，让下拉框固定在头部

### 二、解决思路

通过“position: fixed”属性去定位

	$(window).scroll(function(){
		var H = $(window).scrollTop();

		var h = $('.container').offset().top;

		if(H > h){
			// 添加 position: fixed; 属性
		}
	})

![position-fixed](/data/post_imgs/position-fixed.png)

### 三、然而事情并不如我预期

`position: fixed; `看上去失效了，并不以浏览器为坐标系，固定在上方。

![position-fixed](/data/post_imgs/position-fixed2.png)

### 四、分析原因

此外层容器是有一个渐入显示的动画效果的（transform）。而正是这个动画使得该容器新增了坐标系。

![position-fixed](/data/post_imgs/position-fixed4.png)

### 五、为什么浏览器为了实现动画效果，需要建立新的坐标系？

![position-fixed](/data/post_imgs/position-fixed3.png)

### 六、解决方案

用 absolute 模拟 fixed 的效果

![position-fixed](/data/post_imgs/position-fixed5.png)
