/**
 * Created Date: 2018-11-05, 5:00:58 pm
 * Author: panmin
 * -----
 * Last Modified: Mon Jan 07 2019
 * Modified By: panmin
 * -----
 * Copyright (c)
 * ------------------------------------
 * Make it Work, Make it Right, Make it Fast.
 */

/* dependencis
 ============================================================================= */
const webpackMerge = require('webpack-merge');
const WebpackZipPlugin = require('webpack-zip-plugin');
const path = require('path');

/* custom config
============================================================================= */
const webpackProConfig = require('./webpack.prod.config');
const webpackSpecialConfig = require('./webpack.special.config.js');
const config = require('../config/index.js');

const webpackQaConfig = {
  devtool: config.qa.prodSourceMap
    ? config.qa.devtool
    : false, // 是否开启 sourceMap
  plugins: [
    new WebpackZipPlugin({
      initialFile: ('.', config.build.assetsRoot), //需要打包的文件夹(一般为dist)
      endPath: '.', //打包到对应目录（一般为当前目录'./'）
      zipName: 'qa.dist.zip' //打包生成的文件名
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: { //缓存组
        vendors: {
          chunks: 'all',
          name: true,
          minChunks: 2,
          priority: 3
          // name: 'vendors',
          // test: /[\\/]vendors[\\/]/,
        }
      }
    }
  }
};

module.exports = webpackMerge(webpackQaConfig, webpackProConfig, webpackSpecialConfig);
