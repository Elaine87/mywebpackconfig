const path = require('path');
const fs = require('fs');
const projectConfig = require('../config/project.config.js'); //打包项目配置
const projectName = projectConfig.projectName;
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.getEntryPage = () => {
  let result = {};
  let EntriesObj = {}; //入口名称容器'
  let HTMLPluginsArr = []; //存放多个入口的打包配置（按文件夹存放）
  let entryPoints = [];
  let files = fs.readdirSync(path.join(__dirname,'..', `src/pages/${projectName}`)); //获取当前page目录下的项目目录（一级目录）
  files = files.filter((item) => {
    return !item.includes('.');
  });
  files.map(page => {
    EntriesObj[page] = path.join(__dirname, '..',`src/pages/${projectName}/${page}/${page}.js`);
    entryPoints.push(page);
    HTMLPluginsArr.push(new HtmlWebpackPlugin({
      filename: path.join(__dirname, '..',`dist/${page}.html`), //打包后的输出html名称
      template: path.join(__dirname, '..',`src/pages/${projectName}/${page}/${page}.html`), //模版位置
      favicon: path.join(__dirname, '..', 'static/favicon.ico'),
      inject: true, //当传入 true或者 ‘body’时所有javascript资源将被放置在body元素的底部，“head”则会放在head元素内。
      chunks: ['manifest', page],
      // inlineSource: '.(js|css)$',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
      // chunksSortMode: 'dependency' //在chunk被插入到html之前，你可以控制它们的排序，允许的值 ‘none’ | ‘auto’ | ‘dependency’ | {function} 默认为‘auto’.
    }));
  });
  result = {
    Entries: EntriesObj,
    HTMLPlugins: HTMLPluginsArr,
    entryPoints
  };
  return result;
};
