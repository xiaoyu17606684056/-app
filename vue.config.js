const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './'
})
// const port = process.env.port || 8080 // 配置端口号
// module.exports = {
//   devServer: {
//     port: 8080, // 端口号就是自己设置的值
//     public: require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[0]][1].address + ':' + port // 设置访问ip端口
//   }
// }
