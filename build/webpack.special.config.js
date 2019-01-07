//不同项目所需要的特殊配置, 配置名称:项目名Config;
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const projectConfig = require('../config/project.config.js'); //打包项目配置
const projectName = projectConfig.projectName;
const projectSpeConfig = projectName + 'Config';
const publicSrc = `../src/specialfiles/${projectName}`;


const configs = {
  wxmycarConfig: { //微信公众号-我的爱车
    plugins: [
      new CopyWebpackPlugin([{
        from: path.join(__dirname, `xxx`), //无需编译的文件或者文件夹
        to: path.join(__dirname, '../dist')
      }])
    ]
  }
};


if (projectConfig && projectConfig.isHaveSpecialConfig) {
  module.exports = configs[projectSpeConfig] ? configs[projectSpeConfig] : {};
} else {
  module.exports = {};
}
