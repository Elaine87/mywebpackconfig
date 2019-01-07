/* eslint-disable */

// import 'Lib/utils/bridge';

const clientTypeFun = function () {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return 'phone';
  } else {
    return 'PC';
  }
}

const haveBridge = function () {
  let clientType = clientTypeFun()
  let ua = window.navigator.userAgent;
  let reg = RegExp(/zhidao/i);
  return new Promise((resolve, reject) => {
    if (clientType == 'phone' && reg.test(ua)) {
      let num = 0;
      const timer = setInterval(() => {
        num++;
        if (window.bridge) {
          resolve();
          clearInterval(timer);
        };
        if (num >= 10) {
          console.log('端上方法未加载完成...');
          clearInterval(timer);
          reject();
        }
      }, 100)
    }
  })
}

//获取端上公共参数
export const getPublicParams = function (__params) {
  let params = __params || null;
  return new Promise((resolve, reject) => {
    haveBridge().then(() => {
      window.bridge.trackerPublicParams(params, function (data) {
        if (!data) {
          reject();
        }
        resolve(data);
      });
    })
  })
}

//获取签名参数
export const getParamsSignature = function (__params) {
  let params = __params || null;
  return new Promise((resolve, reject) => {
    haveBridge().then(() => {
      window.bridge.getParamsSignature(params, function (data) {
        if (!data) {
          reject();
        }
        resolve(data);
      });
    })
  })
}

//设置右上角分享
export const setNavigationRightAction = function (__params) {
  let params = __params || null;
  return new Promise((resolve, reject) => {
    haveBridge().then(() => {
      window.bridge.setNavigationRightAction({
        title: params.title || "分享", //默认分享
        iconUrl: params.iconUrl || "", //默认传空
        actionType: params.actionType || "sharePanel", //默认分享面板
        actionParams: params.actionParams || null, //分享渠道配置
        tracker: params.shareBtnTracker || null //分享按钮埋点
      }, function (data) {
        if (!data) {
          reject();
        }
        resolve(data);
      });
    })
  })
}
/* eslint-disable */
