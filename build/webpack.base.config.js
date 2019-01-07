// 基础配置文件，包含了不同环境通用配置
const path = require('path');
const vConsolePlugin = require('vconsole-webpack-plugin');
const utils = require('./utils.js');
const projectConfig = require('../config/project.config.js'); //打包项目配置
const projectName = projectConfig.projectName;
const env = process.env.DEV_ENV;

let HTMLPlugins = []; //存放多个入口的打包配置（按文件夹存放）
let Entries = {}; //入口名称容器

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
//多入口文件
if (projectName) {
  Entries = utils.getEntryPage().Entries;
  HTMLPlugins = utils.getEntryPage().HTMLPlugins;
}

module.exports = {
  entry: Entries,

  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: [".ts", ".tsx", ".js", ".css",".scss"]
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [resolve('src')],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              'modules': false
            }]
          ]
        }
      }
    },
    { test: /\.tsx?$/,
      loader: "ts-loader" ,
      options: {
        reportFiles: ['src/**/*.{ts,tsx}', '!src/skip.ts']
      }
    },

    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 8192, // 大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用
        name: "static/images/[name].[hash:7].[ext]"
      }
    },
    // html中的img标签
    {
      test: /\.html$/,
      loader: "html-loader",
      include: [resolve("src")],
      options: {
        limit: 8192,
        name: "static/images/[name].[hash:7].[ext]"
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: "url-loader",
      options: {
        name: "static/media/[name].[hash:7].[ext]"
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
      options: {
        limit: 10000,
        name: "static/fonts/[name].[hash:7].[ext]"
      }
    }

    ]
  },
  plugins: [
    //html模板
    ...HTMLPlugins,

    //vconsole
    new vConsolePlugin({
      filter: [], // 需要过滤的文件
      enable: env === "production" ? false : true
    })
  ]
};
