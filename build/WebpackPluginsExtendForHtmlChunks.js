/**
 * Created Date: 2018-12-11, 4:03:50 pm
 * Author: panmin
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2018
 * ------------------------------------
 * Make it Work, Make it Right, Make it Fast.
 */


/**
 * {@description}： EntryPointChunkPlugin for multiple entry
 * it is webpack plugin
 * use after HtmlWebpackPlugin for change chunks included in the page
 * special for multiple entry points
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

class EntryPointChunkPlugin {
  apply (compiler) {
    compiler.hooks.compilation.tap('EntryPointChunkPlugin', (compilation) => {
      console.log('The compiler is starting a new compilation...');

      // Staic Plugin interface |compilation |HOOK NAME | register listener
      /* HtmlWebpackPlugin hooks
      *beforeAssetTagGeneration
      *alterAssetTags
      *alterAssetTagGroups
      *afterTemplateExecution
      *beforeEmit
      *afterEmit
      ============================================================================= */
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        'EntryPointChunkPlugin',
        (data, cb) => {

          const assetsJsJson =  data.assets.js;
          const assetsCssJson =  data.assets.css;

          const entry = data.plugin.options.entry;
          const reg = new RegExp('^.*'+entry+'.*', 'im');

          const getEntryPointName = (assetArr=[]) => {
            const assets =  typeof assetArr == 'string' ? JSON.parse(assetArr) : assetArr;

            return assets.map(chunk => {

              console.log('chunkname:%', path.basename(chunk));
              const chunkname = path.basename(chunk);

              console.log('page  inclued this chunk is:%', reg.test(chunkname));

              if (reg.test(chunkname) || chunkname.indexOf('manifest') > -1) {
                return chunk;
              }
            }).filter(chunk=>{
              // map will return a child include undefined,so needed this
              return !!chunk;
            });
          };

          data.assets.js = getEntryPointName(assetsJsJson);
          data.assets.css = getEntryPointName(assetsCssJson);

          // Tell webpack to move on, must be execute!
          cb(null, data);
          // console.log('------------------------------------data---start');
          // console.log(data.plugin);
          // console.log('------------------------------------data---end');
        }
      );
    });
  }
}

module.exports = EntryPointChunkPlugin;

