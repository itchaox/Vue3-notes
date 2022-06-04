# 深入学习 Vue3

## 1. 邂逅 Vue3

### 1.1 命令式编程和声明式编程

* 命令式编程：编写一条 js 代码，然后给浏览器一个指令
* 声明式编程：声明一些需要使用的内容，然后由机器或框架完成

## 2. Vue3 源码调试

1. 从 github 下载对应 Vue3 tag 源码版本

## 3. Vue3 基础语法

1. template 标签中允许存放多个根元素
2. 通过v-bind 传递一个对象 `v-bind='info'`，在封装高阶组件时常用

### 3.1 VNode

* 概念：VNode 虚拟节点
* 解析过程：template 标签内元素被 Vue 通过解析成  VNode 之后，再渲染成真实 Node

### 3.2 VDOM

* 概念：VDOM 虚拟DOM
* 解析过程：tempalte 标签中 DOM 内容被解析成 VDOM 之后，再渲染成真实 DOM
* 注意：VDOM 由许多 VNode 节点构成

### 3.3 v-for 中 key 的作用

* 注意：使用 v-for 遍历时，一般都需要绑定对应的 key 值
* 作用：主要用于 Vue 中虚拟 DOM 的 diff 算法，在新旧 nodes 比较时，用于辨识 VNode，以便复用旧 VNode，提高遍历效率
* 不使用 key：Vue 使用尽可能的修改/复用相同类型元素的算法
* 使用 key：基于 key 的变化，重新排列元素顺序，并且会移除/销毁 key 不存在的元素

### 3.4 diff 算法

* 概念：比较新 VNode 和 旧 VNode 差异

* 源码位置（无 key）：

  <img src="C:\Users\Administrator\Desktop\Vue3+TypeScript\Vue3-notes\【课堂笔记】深入学习 Vue3.assets\image-20220604175136339.png" alt="image-20220604175136339" style="zoom: 80%;" />

* 源码位置（有 key）：

  <img src="C:\Users\Administrator\Desktop\Vue3+TypeScript\Vue3-notes\【课堂笔记】深入学习 Vue3.assets\image-20220604205226957.png" alt="image-20220604205226957" style="zoom:80%;" />
