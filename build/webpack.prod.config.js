/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const config = require('../config/index.js');
const projectConfig = require('../config/project.config.js'); //打包项目配置
const WebpackZipPlugin = require('webpack-zip-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');
const webpackSpecialConfig = require('./webpack.special.config.js');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');

/* EntryPointChunkPlugin
============================================================================= */
const projectName = projectConfig.projectName;
const publichPath = config.build.assetsPublicPath;
const publichRootPath = `/${publichPath}/${projectName}/`;

const webpackProConfig = {
  mode: 'production',

  devtool: config.build.prodSourceMap ? config.build.devtool : false, // 是否开启 sourceMap

  output: {
    path: path.join(__dirname, '..',config.build.assetsRoot),
    filename: 'static/js/[name].[chunkhash:7].js', //name为入口名称
    publicPath: publichRootPath //这里要配置对应的项目名称
  },

  // stats: config.build.stats ? config.build.stats : 'errors-only',
  /* 输入控制台相关信息 stats
  ============================================================================= */
  stats:{
    // 添加 children 信息
    children: false,

    // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    chunks: false,

    // 添加 namedChunkGroups 信息
    chunkGroups: true,

    // 将构建模块信息添加到 chunk 信息
    chunkModules: false,

    // 添加 chunk 和 chunk merge 来源的信息
    chunkOrigins: true,
    // 显示哪个模块导出被用到
    usedExports: false,


    // 添加构建模块信息
    modules: false,

  },

  module: {
    rules:[
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.(sc|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(stylus|styl)$/,
        loader: MiniCssExtractPlugin.loader+'!css-loader!postcss-loader!stylus-loader',
      }
    ]
  },
  plugins: [
    //每次build之前先删除dist
    new CleanWebpackPlugin([config.build.assetsRoot+'/*', 'qa.dist.zip', config.build.assetsRoot+'.zip'], {
      root: path.resolve(__dirname, '..'), //根目录
      verbose: true, //开启在控制台输出信息
      dry: false //启用删除文件
    }),

     /* 提取css
    ============================================================================= */
    new MiniCssExtractPlugin({
      filename: path.join(config.build.assetsSubDirectory, 'css/[name].[contenthash:7].css'),
      chunkFilename:  path.join(config.build.assetsSubDirectory, 'css/[name].[contenthash:7].css'),
    }),

    new webpack.DefinePlugin({
      'process.env': config.build.env,
      URL_PREFIX_DEV: JSON.stringify(publichRootPath)
    }),

    //压缩文件
    new WebpackZipPlugin({
      initialFile: ('.', config.build.assetsRoot), //需要打包的文件夹(一般为dist)
      endPath: '.', //打包到对应目录（一般为当前目录'./'）
      zipName: config.build.assetsRoot+'.zip' //打包生成的文件名
    }),

    /* static下不需要编译部分直接copy到dist下
    ============================================================================= */
    new CopyWebpackPlugin([
    {
      from: path.join(__dirname, '..',`static/`), //微信公众号需要额外配置的文件
      to: path.join(__dirname, '..','dist/')
    }
    ]),

    /* *.d.ts文件打包到输出为一个文件
    ============================================================================= */
    new DeclarationBundlerPlugin({
        moduleName:'some.path.moduleName',
        out:'../lib/bundle.d.ts',
    })

  ],

  //提取公共文件(common)
  optimization: {
    /* js & css 压缩以及混淆，使用webpack4
    ============================================================================= */
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: config.build.prodSourceMap,
        parallel: true, // 使用多进程并行运行和文件缓存来提高构建速度
        uglifyOptions: {
          compress: {
            warnings: true, // 显示警告
            drop_debugger: true, // 去除debugger
            drop_console: true // 去除console
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                safe: true,
                soureMap: true
            }
        })
    ],
    // wbpack运行时文件缓存
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      chunks: 'initial', //块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all
      minSize: 0, //压缩前的最小模块大小，默认为0
      minChunks: 1, //被引用次数，默认为1
      maxAsyncRequests: 5, //最大的按需(异步)加载次数，默认为1；
      maxInitialRequests: 3, //最大的初始化加载次数，默认为1；
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: { //缓存组
        vendors: {
          chunks: 'initial',
          minChunks: 2,
          priority: 1
        }
      }
    }
  }
}

module.exports = webpackMerge(webpackBaseConfig, webpackProConfig, webpackSpecialConfig);
