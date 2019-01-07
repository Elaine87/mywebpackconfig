/**
 * Created Date: 2018-12-18, 11:37:31 am
 * Author: panmin
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2018
 * ------------------------------------
 * Make it Work, Make it Right, Make it Fast.
 */

/* dependencies
============================================================================= */
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const stripAnsi = require('strip-ansi');


/**
 * Require ./webpack.dev.config.js and make a bundler from it
 */
let webpackDevConfig = require('./webpack.dev.config');
let bundler = webpack(webpackDevConfig);

/**
 * Reload all devices when bundle is complete
 * or send a fullscreen error message to the browser instead
 */
bundler.plugin('done', function(stats) {
  if (stats.hasErrors() || stats.hasWarnings()) {
    return browserSync.sockets.emit('fullscreen:message', {
      title: 'Webpack Error:',
      body: stripAnsi(stats.toString()),
      timeout: 100000
    });
  }
  browserSync.reload();
});

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
  // server: '../src',
  // open: false,
  open: 'ui',
  ui: {
    port: 8080,
    weinre: {
      port: 9090
    }
  },
  proxy: 'localhost:3433',
  logPrefix: 'withdraw',
  browser: ['google chrome'],
  logFileChanges: false,
  middleware: [
    webpackDevMiddleware(bundler, {
      publicPath: webpackDevConfig.output.publicPath,
      stats: {
        colors: true,
        env: 'development'
      }
    })
  ],
  plugins: ['bs-fullscreen-message'],
  files: ['../src', '../dist']
});

// browserSync.reload();


