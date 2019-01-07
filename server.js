const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const apiMocker = require('webpack-api-mocker');
const mocker = path.resolve(__dirname, './src/mock/index');
const chalk = require('chalk');

//跨域
const app = express();
const config = require('./config/index');
const utils = require('./build/utils');
const projectConfig = require('./config/project.config');
const {entryPoints} = utils.getEntryPage();



const projectStaticRoot = `${config.build.assetsPublicPath}/${projectConfig.projectName}`;
console.log('------------------------------------projectStaticRooth---start');
console.log(`/${projectStaticRoot}/static/js`);
console.log('------------------------------------projectStaticRooth---end');

app.use(`/${projectStaticRoot}/static/js`, express.static('./dist/static/js'));
app.use(`/${projectStaticRoot}/static/css`, express.static('./dist/static/css'));
app.use(`/${projectStaticRoot}/static/images`, express.static('./dist/static/images'));



/* 默认入口
============================================================================= */

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, `./${config.build.assetsRoot}/index.html`));
});

/* 所有入口文件统一处理
============================================================================= */
if(entryPoints) {
  entryPoints.map( page => {
    app.get(`/${page}.html`, (req, res) => {
      res.sendFile(path.join(__dirname, `./${config.build.assetsRoot}/${page}.html`));
    });
  });
}


/* 如果使用mock数据，node server.js mock
============================================================================= */


//使用mock
if(process.argv[2] && process.argv[2] == 'mock'){

  console.log(chalk.red('mock data'));
  apiMocker(app, mocker);
  app.get('/tasklist.json', function (req, res) {
    res.sendFile(path.join(__dirname, './api/tasklist.json'));
  });

  app.get('/invitelist.json', function (req, res) {
    res.sendFile(path.join(__dirname, './api/invitelist.json'));
  });
} else {

  app.use(['/activity','/carlife','/cashierBizServer'], proxy({
    target: 'http://carlife-dev.zhidaohulian.com/',
    // target: 'http://api.zhidaohulian.com/',
    // target: 'http://carlife-test.zhidaohulian.com/',
    changeOrigin: true
  // pathRewrite:
  //     '^/activity': '',
  // },
  }));

  // 微信分享设置
  app.use('/test/wx', proxy({
  // target: 'http://carlife-dev.zhidaohulian.com/',
  // target: 'http://api.zhidaohulian.com/',
    target: 'http://carlife-test.zhidaohulian.com/',
    changeOrigin: true
  // pathRewrite:
  //     '^/activity': '',
  // },
  }));

  app.use('/push/sms/appSendToSingle', proxy({
    target: 'http://carlife-dev.zhidaohulian.com/',
    // target: 'http://carlife-test.zhidaohulian.com/',
    changeOrigin: true
  // pathRewrite:
  //     '^/activity': '',
  // },
  }));
}


app.listen(8090, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.info('server is running at: http://localhost:8090 ');
  }
});
