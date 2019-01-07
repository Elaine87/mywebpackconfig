'use strict';

const path = require('path');
const projectConfig = require('./project.config.js'); //打包项目配置
const projectName = projectConfig.projectName;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const config = {
  //开发环境
  dev: {
    host: 'localhost',
    port: '3433',
    devSourceMap: true, // 是否开启SourceMap
    devtool: 'cheap-module-eval-source-map',
    env: 'development',
    proxyTable: [{
      context: [
        '/api'
      ],
      target: 'http://test.com', // 测试环境
      target: 'http://qa.com', // 开发环境
      target: 'http://prod.com', // 生产环境环境
      changeOrigin: true
    }],
  },

  //生产环境
  build: {
    // 默认打包在dist下，可以不写
    assetsRoot: 'dist',
    assetsSubDirectory: 'static',
    assetsPublicPath: 'appactivity',
    soureMap: true, // 是否开启SourcMap
    /*
    *对外生产环境，sourceMap推荐
    *none
    *source-map， 但是应该在服务器禁止用户访问source-map文件
    * hidden-source-map 映射那些源自错误报告的错误堆栈跟踪信息，但不想为浏览器开发工具暴露你的 source map，这个选项会很有用
    * nosources-source-map 创建的 source map 不包含 sourcesContent(源代码内容)，可以部署到服务器
    ============================================================================= */
    devtool: 'nosources-source-map',
    bundleAnalyzerReport: false,

    prodSourceMap: true,
    gzip: true,
    env: 'production',
    // stats: {
    //   // copied from `'minimal'`
    //   all: false,
    //   modules: false,
    //   maxModules: 0,
    //   errors: true,
    //   warnings: false,
    //   chunks: false,
    //   chunkModules: false,
    //   children: false,
    //   entrypoints: false,
    //   // our additional options
    //   moduleTrace: false,
    //   errorDetails: false,
    // },
    stats: 'none' // 只有发生错误时输出  = 上边配置结果一样
  },

  //测试环境
  qa: {
    prodSourceMap: true, // 是否开启SourcMap
    devtool: '#cheap-module-eval-source-map', // 方便查看源码
    assetsRoot: path.resolve(__dirname, '../qa'), // 构建根目录
    gzip: true
  }
};

console.log('\n/------------配置信息------------/\n');
console.log(`页面运行在 http://${config.dev.host}:${config.dev.port}`);
console.log('\n/------------配置信息------------/\n');

module.exports = config;
