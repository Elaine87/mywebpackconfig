/* eslint-disable */
const path = require('path')
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const config = require('../config/index.js');
const apiMocker = require('webpack-api-mocker');
const mocker = path.resolve(__dirname, '../src/mock/index.js');
const projectConfig = require('../config/project.config.js'); //打包项目配置

const webpackDevConfig = {
  mode: 'development',

  devtool: config.dev.devSourceMap ? config.dev.devtool : false, // 是否开启 sourceMap

  devServer: {
    open: true, // 启动devServer
    host: config.dev.host,
    port: config.dev.port,
    compress: true, // 启用gzip压缩
    // contentBase: "../dist/", // dev服务器的根目录，用于加载静态。决定了static的位置范围
    quiet: false, // 启动则不再node控制台打印任何信息。
    // clientLogLevel: "warning", // 内联模式 哪些构建消息将会出现在浏览器控制台
    hot: true, // 热更新
    inline: true, // 实时加载脚本
    historyApiFallback: true,
    proxy: config.dev.proxyTable,
    openPage: projectConfig.openPage || 'index.html',
    useLocalIp: true,
    before(app) {
      if(process.env.MOCK){
        apiMocker(app, mocker);
      }
    }
  },
  // 配置出口
  output: {
    path: path.join(__dirname, '..', config.build.assetsRoot),
    filename: 'static/js/[name].[hash:7].js',
    publicPath: '/',
  },
  module: {
    rules: [
      /**
      * css loaders
      */
     {
       test: /\.css$/,
       loader: 'style-loader!css-loader!postcss-loader',
       // loader: MiniCssExtractPlugin.loader +'!style-loader!css-loader!sass-loader!less-loader',
     },
     {
       test: /\.(sc|sa)ss$/,
       loader: 'style-loader!css-loader!postcss-loader!sass-loader',
       // loader: MiniCssExtractPlugin.loader +'!style-loader!css-loader!sass-loader!less-loader',
     },{
       test: /\.less$/,
       loader: 'style-loader!css-loader!postcss-loader!less-loader',
     },
     {
      test: /\.(stylus|styl)$/,
      loader: 'style-loader!css-loader!postcss-loader!stylus-loader',
    }
   ]
  },
  plugins: [
    // 开启全局的模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),

    // 当模块热替换(HMR)时在浏览器控制台输出模块名字信息
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      URL_PREFIX_DEV: ''
    })
  ],
};


module.exports = webpackMerge(webpackBaseConfig, webpackDevConfig);
