const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  outputDir: 'public',
  chainWebpack:config => {
    config.resolve.alias
        .set('@', resolve('src'))
        .set('_v', resolve('src/views'))
        .set('_c', resolve('src/components'))
  },
  // procutionSourceMap:false,
  devServer: {
    open: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:10000',
    //     // ws: true,//是否代理websockets
    //     changeOrigin: true, //  设置同源  默认false，是否需要改变原始主机头为目标URL
    //     // pathRewrite: {
    //     //     '^/api': '' // 设置/article路径重定向为根目录"/";
    //     // }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/css/variable.scss";'
      },
    }
  },
  runtimeCompiler: true
}