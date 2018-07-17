---
layout: post
title:  Object.defineProperty()函数 在 vue 响应式系统的中应用
date:   2016-03-04
categories: Note
tag: "学习笔记"
desc: "Vue.js 框架是一个入门门槛低、上手非常快的框架，它也实现了类似 `Angular` MVVM 双向绑定响应系统，但实现方式更为优雅、简洁。其中最主要使用了 ES5 `Object.defineProperty()`，通过设置 getter/setter 勾子，实现监听 model 的变化，作出相应的视图响应。下面我们从 ES5 的 JS 对象说起..."
imgUrl: "data/post_imgs/define-property/attributes-object.png"
---

### 一、前言

[Vue.js](http://cn.vuejs.org) 框架是一个入门门槛低、上手非常快的框架，它也实现了类似 `Angular` MVVM 双向绑定响应系统，但实现方式更为优雅、简洁。其中最主要使用了 ES5 `Object.defineProperty()`，通过设置 getter/setter 勾子，实现监听 model 的变化，作出相应的视图响应。下面我们从 ES5 的 JS 对象说起...

### 二、attributes 对象

![defineProperty](/data/post_imgs/define-property/attributes-object.png)

1. JS 对象里每个属性都有一个对应的 `attributes 对象`，保存该属性的一些元信息；
2. 使用 `Object.getOwnPropertyDescriptor(people, ‘name')` 可读取 `attributes 对象`;
3. `Object.defineProperty()` 方法，通过定义 attributes 对象，来定义或修改一个属性。


### 三、getter/setter

除了直接定义 value 以外，属性还可以用 get/set 函数定义;
当对其取值时，get 函数会自动调用；当对其赋值时，set 函数会自动调用

![defineProperty](/data/post_imgs/define-property/get-set.png)
![defineProperty](/data/post_imgs/define-property/get-set-result.png)

### 四、mvvm in vuejs

> 把一个普通对象传给 Vue 实例作为它的 data 选项，Vue.js 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。这是 ES5 特性，不能打补丁实现，这便是为什么 Vue.js 不支持 IE8 及更低版本。

[进入 vuejs 官网](http://cn.vuejs.org/guide/reactivity.html)

![defineProperty](/data/post_imgs/define-property/mvvm-in-vuejs-intro.png)

### 五、简单实现一个数据双向绑定功能

![defineProperty](/data/post_imgs/define-property/mvvm-in-vuejs-demo.png)

![defineProperty](/data/post_imgs/define-property/mvvm-in-vuejs-demo-flow.png)


[在 jsfiddle 中查看](https://jsfiddle.net/justworm/crxhvcow/)
