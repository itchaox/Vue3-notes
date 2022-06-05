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

### 3.5 计算属性 computed

* 特点：

  1. 数据有缓存，相较方法而言性能更好
  2. 一般是直接写一个方法，实际为 getter 的方法简写形式
  3. template 标签模板中，尽量使用简单直观的变量名，不要进行过多计算操作。如果要进行复杂的计算操作，可以使用计算属性

* 源码位置（传入函数或者对象的处理方式）：

  <img src="C:\Users\Administrator\Desktop\Vue3+TypeScript\Vue3-notes\【课堂笔记】深入学习 Vue3.assets\image-20220604232650877.png" alt="image-20220604232650877" style="zoom:80%;" />

### 3.6 侦听器 watch

* 作用：在代码逻辑 (JavaScript) 中监听某个数据的变化

* watch 配置项写法：

  1. 侦听某个对象：（函数式简写形式）

     ```javascript
     watch: {
       info(newValue, oldValue) {
         this.name = newValue
       }
     }
     ```

  2. 侦听某个对象：（对象式完整写法）

     ```javascript
     watch: {
       info: {
         handler(newValue, oldValue) {
           this.name = newValue
         },
           deep: true, // 是否开启深度侦听
           immediate: true // 是否开启立即侦听（即首次加载会侦听一次） 
       }
     }
     ```

  3. 侦听某个对象的具体值：

     ```javascript
     watch: {
       'info.name'(newValue, oldValue) {
         this.name = newValue
       }
     }
     ```

* $watch 全局写法：

  1. 说明：

     * 第一个参数：侦听源，就是需要侦听的值
     * 第二个参数：callback 回调函数
     * 第三个参数：watch 相关配置项
     * 存在一个返回值，该返回值是一个函数，调佣该函数即可取消侦听

  2. 示例：（侦听某个对象）

     ```javascript
     
     created() {
       this.$watch('info', (newValue, oldValue) => {
         this.name = newValue
       }, {
         deep: true, // 开启深度侦听
         immediate: true // 开启立即侦听
       })
     }
     ```
     

### 3.7 v-model

* 特点：创建双向数据绑定
* 本质：v-model 是一个语法糖（即简写形式）
* 作用：监听用户的输入来更新数据
* 原理：
  1. v-bind 绑定 value 属性值
  2. v-on 绑定 input 事件监听到函数中，函数会获取最新的值并赋值到绑定 value 中

## 4. 组件化开发

### 4.1 全局组件

* 概念：在任何组件中都可以使用的组件

* 注册方式：

  ```javascript
  app.component('my-nav-button', { // 注册全局组件
    template: '#app',
    data() {
    },
    methods: {
    }
  })
  ```

### 4.2 局部组件

* 概念：在注册的组件中才能使用的组件

* 注册方式：

  ```javascript
  const App = {
    template: '#app',
    components: { // 和 data 一样的配置项
      MyNavButton // 注册局部组件
    }
  }
  ```

### 4.3 组件名称

1.  kebab-case（短横线分隔符）：
   * 注意：使用时也必须使用 kebab-case 短横线分隔符
   * 例子：`<my-nav-button />`
2. PascalCase （驼峰标识符）：
   * 注意：（两种使用方式）
     1. 使用 PascalCase 驼峰标识符（在 template 模板中不推荐使用）
     2. 使用kebab-case 短横线分隔符
   * 例子：
     1. `<MyNavButton />`
     2. `<my-nav-button />`

### 4.4 Vue 开发模式

* 创建 .vue 单文件组件进行开发
* .vue 文件内部结构划分：
  1. template 标签：写 HTML 相关内容
  2. script 标签：写 JavaScript 相关内容
  3. style 标签：写 CSS 相关内容
* 由于浏览器不认识 .vue 文件，所以需要使用 webpack、vite 之类的打包工具将 .vue 代码进行打包处理
* 单文件组件特点：
  1. 代码高亮
  2. ES6、CommonJS 模块化能力
  3. 组件作用域的 CSS
  4. 使用 预处理器构建更加丰富的组件，比如：TypeScript、Less 等
* 支持单文件组件的方式（SFC）：
  * 方式一：使用 Vue CLI 创建项目，可以直接配置好所有的配置选项，然后可以直接使用 .vue 文件
  * 方式二：使用 Webpack、Vite 等打包构建工具，自行配置相关是需要打包的内容

## 5. Webpack

### 5.1 Webpack 基础

* 使用 Webpack 原因：随着前端快速发展，前端变得越来越复杂，需要一个打包处理工具进行相关操作
* Vue、React、Angular 三个框架的脚手架都是基于 Webpack 进行搭建的
* 概念：一个静态的模块化打包工具，服务于现代的 JavaScript 应用程序
* 作用：将 TypeScript、Sass 等浏览器不能识别的代码，通过 Webpack 的打包编译后，让浏览器能识别和运行
* 使用前提：Webpack 基于 Node 环境运行，所以必须安装 Node 环境才能使用 Webpack

### 5.2 Vue 项目加载的文件

1. JavaScript 打包：
   * 将 ES6 转换成 ES5 的语法
   * 将 TypeScript 语法，转换成 JavaScript
2. CSS 处理：
   * CSS 文件模块的加载和提取
   * Less、Sass 等预处理器的处理
3. 资源文件 img、font：
   * 图片 img 文件的加载
   * 字体 font 文件的加载
4. HTML 资源的处理
   * 打包 HTML 资源文件
5. 处理 vue 项目的 SFC 文件的 .vue 文件

### 5.3 Webpack 依赖图

* webpack 处理应用程序时，会根据命令或者配置文件找到入口文件
* 从入口开始，会生成一个依赖关系图，这个依赖关系图包含应用程序中所需的所有模块（比如 .js 文件、css 文件等）
* 然后遍历图结构，打包一个个的模块（根据文件的不同使用不同的 loader 来解析）

### 5.4 loader 配置方式

* 在 webpack.config.js 文件中写明配置信息
* module.rules 运行配置多个 loader，这种方式能更好的表示 loader 的配置，便于后期维护
* module.rules 配置如下：
  1. rules 属性值是一个数组
  2. 数组中的每个 Rule 是一个对象
     * test 属性：使用正则表达式匹配需要规则限定的资源
     * use 属性：对应值是一个数组
     * loader 属性：Rule.use[{ loader }] 的简写

### 5.5 css-loader

* loader：用于对模块源代码进行转换
* 可以将 css-loader 看成是一个模块，因为是通过 import 来加载这个模块的
* webpack 无法直接解析 css 模块，需要通过 css 对应的 loader 进行加载解析
* 常用 CSS 的 loader：css-loader
* css-loader 作用：解析 .css 文件

### 5.6 style-loader

* style-loader 作用：插入 style 操作
* 需要先加载 css-loader，之后才加载 style-loader
* 但是因为 loader 加载顺序是从后往前，所有 style-loader 应该写在 css-loader 之后

### 5.7 处理 less 文件方式

1. 安装 less 依赖
2. 安装 less-loader 依赖
3. 配置 rule 相关内容

### 5.7 PostCSS 工具

* 概念：一个通过 JavaScript 来转换样式的工具

