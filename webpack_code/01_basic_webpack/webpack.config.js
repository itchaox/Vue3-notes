/*
 * @Desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-06-05 22:54:22
 * @LastEditors: wc
 * @LastEditTime: 2022-06-05 23:02:57
 */

const path = require('path'); // 导入 node 的 path 模块,用于处理路径相关问题

module.exports = {
  entry: './src/main.js', // 入口文件路径
  output: { // 出口文件路径
    path: path.resolve(__dirname, './build'), // path 必须使用绝对路径
    filename: 'bundle.js' // 打包后的文件名
  }
}