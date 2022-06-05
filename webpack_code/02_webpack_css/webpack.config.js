/*
 * @Desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-06-05 22:54:22
 * @LastEditors: wc
 * @LastEditTime: 2022-06-06 00:45:36
 */

const path = require('path'); // 导入 node 的 path 模块,用于处理路径相关问题

module.exports = {
  entry: './src/main.js', // 入口文件路径
  output: { // 出口文件路径
    path: path.resolve(__dirname, './build'), // path 必须使用绝对路径
    filename: 'bundle.js' // 打包后的文件名
  },
  module: {
    rules: [ // 配置加载 loader 方式
    {
     test: /\.css$/, // 匹配对应正则表达式 

    //  1. 直接写 loader(语法糖)
    //  loader: 'css-loader' // 执行对应 loader

    //  2. use (完整写法)
    use:[ // use 执行顺序,从后往前
      // {loader: 'css-loader'} // 携带其他配置项
     'style-loader', // 无其他配置项
     'css-loader', // 无其他配置项
    ]
    },
    {
    test: /\.less$/, // 匹配对应正则表达式 
     use:[
      'style-loader', // 插入 style 操作,渲染样式
      'css-loader', // 加载 .css 文件
      'less-loader', // 先把 less 转换成 css
     ]
     }
    ]
  }
}