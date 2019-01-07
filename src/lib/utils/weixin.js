const _obj2params = Symbol('_obj2params');
const _post = Symbol('_post');


export default class Wechat {
  
  constructor(localUrl = location.href.split('#')[0], appId = 'wx172094d8bc36895f') { //给参数传默认值，防止调用时忘记传实参而报错
    this.localUrl = localUrl;
    this.appId = appId;
  }

  [_obj2params](obj) {
    let result = '';
    let item;
    for (item in obj) {
      result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }
    if (result) {
      result = result.slice(1);
    }
    return result;
  }

  [_post](url, paramsObj) {
    let result = fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: this[_obj2params](paramsObj)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('something went wrong!');
      }
    }).catch(error => console.log(error));
    return result;
  }
  

  getConfig(url, params) {
    return new Promise((resolve) => {
      let body = {
        url: this.localUrl
      };
      this[_post](url, body).then((res) => {
        let {
          timestamp,
          nonceStr,
          signature
        } = res;
        let appId = this.appId;
        timestamp = parseInt(timestamp);
        wx.config({
          debug: params.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名
          jsApiList: params.jsApiList
        });
        return resolve();
      });
    });
  }

  ready() {
    return new Promise((resolve, reject) => {
      if (wx) {
        wx.ready(() => {
          return resolve();
        });
      } else {
        console.log('wx不存在');
        return reject();
      }
    });
  }

  share(params,callback){
    //新版接口
    // this._updateAppMessageShareData(params,callback);
    // this._updateTimelineShareData(params,callback);

    //老版接口
    this._onMenuShareQQ(params,callback);
    this._onMenuShareQZone(params,callback);
    this._onMenuShareAppMessage(params,callback);
    this._onMenuShareTimeline(params,callback);
    this._onMenuShareWeibo(params,callback);
  }

  /* 新版接口 start*/
  //微信和QQ
  _updateAppMessageShareData(params, callback) {
    alert(11);
    let {
      title,
      imgUrl,
      desc
    } = params;
    wx.updateAppMessageShareData({
      title, // 分享标题
      desc, // 分享描述
      link: this.localUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: callback
    });
  }

  //QQ空间和朋友圈
  _updateTimelineShareData(params, callback) {
    let {
      title,
      imgUrl
    } = params;
    wx.updateTimelineShareData({
      title, // 分享标题
      link: this.localUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: callback
    });
  }

  /* 新版接口 end*/
  
  /* 老版接口 start*/
  //分享到QQ
  _onMenuShareQQ(params, callback) {
    wx.onMenuShareQQ({
      ...params,
      link: this.localUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      success: callback
    });
  }

  //分享到QQ空间
  _onMenuShareQZone(params, callback) {
    wx.onMenuShareQZone({
      ...params,
      link: this.localUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      success: callback
    });
  }

  //分享到微信
  _onMenuShareAppMessage(params, callback) {
    wx.onMenuShareAppMessage({
      ...params,
      link: this.localUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      success: callback
    });
  }

  //分享到朋友圈
  _onMenuShareTimeline(params, callback) {
    params.title = params.desc;
    wx.onMenuShareTimeline({
      ...params,
      link: this.localUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      success: callback
    });
  }
  /* 老版接口 end*/
  _onMenuShareWeibo(params, callback) {
    wx.onMenuShareWeibo({
      ...params,
      link: this.localUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      success: callback
    });
  }
}

