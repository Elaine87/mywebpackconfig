/* eslint-disable no-unused-vars */
/* eslint-disable complexity */

const detectUa = function () {
  let regs = {
    // 系统
    'android': /android/i,

    // 机型
    'iphone': /iphone/i,
    'ipad': /ipad/i,
    'ipod': /ipod/i,
    'safari': /Safari/i,

    // 环境
    'weixin': /micromessenger/i,
    'mqq': /mqq/i,

    // 浏览器
    'chrome': /chrome\//i,

    // 端内
    'zhidao': / Zhidao/i
  };
  let ret = {};
  let ua = window.navigator.userAgent;
  for (let i in regs) {
    let item = regs[i];
    ret[i] = item.test(ua);
  }

  ret.ios = ret.iphone || ret.ipad || ret.iphone;

  ret.mobile = ret.ios || ret.android;
  ret.pc = !ret.mobile;

  if (window.chrome) {
    ret.chrome = true;
  }

  return ret;
};

/**
 * 环境判断
 */

export const is = (strs) => {
  let str = strs.split(',');
  let ua = detectUa();
  //根据链式表达式检查UA
  function check(rote) {
    if (!rote) {
      return false;
    }
    //按照点.分割
    let rotes = rote.split('.');
    let ret = true;
    let i;
    for (i = 0; i < rotes.length; i++) {
      let item = rotes[i];
      if (!ua[item]) {
        ret = false;
        break;
      }
    }
    return ret;
  }

  let ret = false;

  for (let i = 0; i < str.length; i++) {
    let item = str[i];
    if (check(item)) {
      ret = true;
      break;
    }
  }

  return ret;
};

/**
 * 获取URL参数
 */

export const getQueryParams = (_url) => {
  let url = _url
    ? _url
    : window.location;
  if (!url) {
    return;
  }

  let searchString = url
    .search
    .slice(1);
  let searchArr = decodeURI(searchString).split('&');
  let searchParams = {};
  searchArr.forEach(function (item) {
    let tempArr = item.split('=');
    searchParams[tempArr[0]] = tempArr[1];
  });
  return searchParams;
  // var
};

/**
 * FormData
 */

export const isFormData = (val) => {
  return typeof FormData !== 'undefined' && val instanceof FormData;
};

/**
 * 参数转对象
 */

export const queryParamsToObj = (queryParams) => {
  let arr = queryParams.split('&');
  let paramObj = {};
  arr.forEach((item) => {
    let data = item.split('=');
    paramObj[data[0]] = data[1];
  });
  return paramObj;
};

/**
 * 获取URL指定参数
 */

export const getQueryString = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = decodeURIComponent(window.location.search.substr(1)).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 处理端上公共参数
 */

export const serializeParams = (query, isencode) => {
  let _isencode = isencode != undefined
    ? isencode
    : false;
  let serializeQuery = query || null;
  let publicParams = '';
  let _tempArr = [];

  if (serializeQuery) {
    serializeQuery = typeof serializeQuery == 'string'
      ? JSON.parse(serializeQuery)
      : serializeQuery;
  }
  // let hasown = Object.prototype.hasOwnProperty.call(serializeQuery);

  for (let item in serializeQuery) {
    if (serializeQuery.hasOwnProperty(item)) {
      _tempArr.push(item + '=' + _isencode
        ? encodeURIComponent(serializeQuery[item])
        : serializeQuery[item]);
    }
  }

  publicParams = _tempArr.join('&');
  return publicParams;
};

/**
 *
 * @param {*} c_name
 * @param {*} value
 * @param {*} expiremMinutes
 */

export const setCookie = (c_name, value, expiremMinutes) => {
  let exdate = new Date();
  exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
  document.cookie = c_name + '=' + escape(value) + (expiremMinutes == null
    ? ''
    : ';expires=' + exdate.toGMTString());
};

/**
 *
 * @param {*} c_name
 */

export const getCookie = (c_name) => {
  if (document.cookie.length > 0) {
    let c_start = document
      .cookie
      .indexOf(c_name + '=');
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document
        .cookie
        .indexOf(';', c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
};

/**
 *
 * @param {*} c_name
 */

export const delCookie = (c_name) => {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(c_name);
  if (cval != null) {
    document.cookie = c_name + '=' + cval + ';expires=' + exp.toGMTString();
  }
};

/**
 * 设置sessionStorage,
 * @param {*} name  存储名称
 * @param {*} content  存储的值，不需要json 化
 */

export const setStore = (name, content) => {
  if (!name) {
    return;
  }
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  if(sessionStorage in window) {
    window.sessionStorage.setItem(name, content);
  }

};

/**
 * 获取sessionStorage
 */

export const getStore = (name) => {
  if (!name) {
    return;
  }
  if(sessionStorage in window)
  {
    return window.sessionStorage.getItem(name);
  }
};

/**
 * 删除sessionStorage
 */

export const removeStore = (name) => {
  if (!name) {
    return;
  }
  if(sessionStorage in window)
  {
    return window.sessionStorage.removeItem(name);
  }

};

/**
 *  日期 => YYYY—MM-DD
 *  参数(无, YYYY-MM-DD, 时间戳)
 */

function add0(value) {
  return value < 10
    ? '0' + value
    : value;
}
export const getFormatDate = (__time) => {
  let time = __time || new Date();
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  // let fillDate = year + '-' + add0(month) + '-' + add0(day); let fillDate =
  // year + '-' + add0(month) + '-' + add0(day)+' '+ add0(hour) +':'+ add0(minute)
  // +':'+ add0(second);
  let fillDate = add0(minute) + ':' + add0(second);
  return fillDate;
};

/**
 * @description
 * @param {*} elem
 * @param {*} type
 * @param {*} handler
 */

export const addEvent = (elem, type, handler) => {
  if (elem.addEventListener) {
    elem
      .addEventListener(type, function () {
        handler.call(elem);
      }, false);
  } else if (elem.attachEvent) {
    elem
      .attachEvent('on' + type, function () {
        handler.call(elem);
      });
  } else {
    elem['on' + type] = handler;
  }
};


/**
 * 节流函数，自动搜索
 * @param {*} fn
 * @param {*} delay
 * @param {*} mustRunDelay
 */

export const throttle = (fn, delay, mustRunDelay) => {
  let timer = null;
  let t_start;
  return function () {
    const context = this;
    const args = arguments;
    let t_curr = +new Date();

    clearTimeout(timer);
    if (!t_start) {
      t_start = t_curr;
    }
    if (t_curr - t_start >= mustRunDelay) {
      fn.apply(context, args);
      t_start = t_curr;
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  };
};



/* eslint-disable */
