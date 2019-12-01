// module.exports = {
//     productionSourceMap:false,//是否打包
//     publicPath:"./",
//     outputDir:'dist',//设置输出目录
//     assetsDir:'assets',//静态资源目录
//     lintOnSave:false,//是否开启eslint保存检测
//     devServer: {
//         open:true,//是否自动打开页面
//         https:false,
//         hotOnly:false,//热更新
//         // port: 8888,
//             // 配置跨域
//         proxy:{
//             '/api':{
//                 target:'http://www.weichuang.com',
//                 ws:true,
//                 changOrigin:true,
//                 pathRewrite:{
//                     '^/api':''
//                 }
//             }
//         }
//       },
// }

// const path = require('path');
// const CompressionPlugin = require('compression-webpack-plugin');

// module.exports = {
//     productionSourceMap: false,
//     devServer: {
//         open: true
//     },
//     configureWebpack: config => {
//         if(process.env.NODE_ENV === 'production'){
//             return {
//                 plugins: [
//                     new CompressionPlugin({
//                         test: /\.js$|\.html$|\.css$/,
//                         threshold: 10240,
//                         deleteOriginalAssets: false
//                     })
//                 ]
//             }
//         }
//     }
// }