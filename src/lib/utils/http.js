/**
 * Created Date: 2018-12-18, 3:58:21 pm
 * Author: panmin
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2018 蘑菇智行
 * ------------------------------------
 * Make it Work, Make it Right, Make it Fast.
 */

import axios from 'axios';


export const isInApp = () => {
  return is('zhidao');
};

/* 判断参数是普通对象plainObjec
============================================================================= */
export const isPlainObject = obj => {
  return obj != null && typeof obj == 'object';
};


/* 判断bridge 是否建立，如果没有建立，执行循环直到bridge建立为止
* @params {*} delay 每次检查时间间隔 默认时间间隔是 100ms
============================================================================= */
export const bridgeReady = (callback, delay) => {
  // from tracker.js
  return new Promise((resolve, reject) => {
    if (isInApp) {
      let num = 0;
      const timer = setInterval(() => {
        num++;
        if (window.bridge) {
          resolve(window.bridge);
          clearInterval(timer);
        }
        if (num >= 10) {
          console.log('端上方法未加载完成...');
          clearInterval(timer);
          reject();
        }
      }, delay || 100);
    } else {
      reject('Not in MOGO App!');
    }
  });
};


/* 实例化axios,设置共用配置
* 如果在端内，根据参数，确定是否携带公共参数
* @param {*} config
* config:
*{
*headers:{}
*publicParams:{} || string || boolean
*baseURL
*timeout
}
*
============================================================================= */
export const createAxiosInstance = (config) => {
  if(isPlainObject(config)) {
    const headers = Object.assign( {
      'Content-Type': 'application/json;charset=UTF-8'
    }, config.headers || {});

    // 如果获取公共参数需要额外参数，通过config：publicParams 获取

    const publicParams = config.publicParams;

    const instance  = axios.create({
      withCredentials: config.withCredentials || false,
      baseURL: config.baseURL ? config.baseURL : '/',
      timeout: config.timeout ? config.timeout : 1000000,
      headers: {...headers},
      url: config.url,
      transformRequest: [function (data, headers) {
        // Do whatever you want to transform the data
        if( publicParams != undefined &&  (typeof publicParams == 'boolean' || isPlainObject(publicParams)) ) {

          const params = typeof publicParams == 'boolean' ? {} : publicParams;
          bridgeReady().then(bridge => {
            bridge.trackerPublicParams(params, (res) => {
              return Object.assign(res, data);
            });
          }).catch(err =>{
            console.error('there is an error when get bridge.trackerPublicParams:%s', err);
          });
        } else {
          return data;
        }
      }],

      // `transformResponse` allows changes to the response data to be made before
      // it is passed to then/catch
      transformResponse: [function (data) {
        // Do whatever you want to transform the data
        return data;
      }]

    });
    return instance;
  }
};


/* export axiosGet
* @param {*} params,
============================================================================= */
export const axiosGet = (url, params) =>{
  const instance = createAxiosInstance(url, params);
};


/* export axiosPost
* @param {*} params
============================================================================= */
export const axiosPost = (url, params) =>{

};

/* 携带端上公共参数的get请求
============================================================================= */
/**
 * url: 请求链接
 * params: 需要的参数，于axiosGet相似，只是多了一层端上签名校验
 */

export const axiosGetWithSignature  = (url, params) => {
  //
};

/* 携带端上公共参数的post请求
============================================================================= */
/**
 * url: 请求链接
 * params: 需要的参数，于axiosPost相似，只是多了一层端上签名校验
 */

export const axiosPostWithSignature  = (url, params) => {
  //
};

