Flux

# 核心思想

“数据应该是单向流动的”

# react 与 flux 的关系？

- react 是框架，包含语法；
- flux 是架构设计，如何设计你的模块

flux 基本：

1. dispatcher
2. stores
3. views (React components)

These should not be confused with Model-View-Controller. Controllers do exist in a Flux application, but they are controller-views -- views often found at the top of the hierarchy that retrieve data from the stores and pass this data down to their children. 

Additionally, action creators — dispatcher helper methods — are often used to support a semantic dispatcher API. It can be useful to think of them as a fourth part of the Flux update cycle.

# flux 流程

![flux flow](data/framework/flux1.png)

# 结构和数据流

![Structure and Data Flow](data/framework/flux2.png)

# 学习demo －todo

https://github.com/facebook/flux/tree/master/examples/flux-todomvc/

# 一些文章

- 理解Flux http://www.html-js.com/article/The-use-of-Reactjs-development-web-applications-to-understand-Flux
- http://www.infoq.com/cn/news/2014/05/facebook-mvc-flux

# 其他

暂时不需要学这个吧？先把 react 核心的一些理解透彻，真正打算用 react 来构建一些自己项目时候再了解一下。