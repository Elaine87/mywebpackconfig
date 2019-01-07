/* eslint-disable */
(function () {
  if (window.bridge) {
    return;
  }

  window.bridge = {};

  var messages = {};
  var call_id = 0;

  // 注册handler，native调用
  window.bridge.register = function (name) {
    if (this[name]) {
      return;
    }

    // 设置handler为bridge的属性方法
    this[name] = function (params, callback) {
      invokeNative(name, params, callback);
    };
  };

  // 根据call_id获取参数，native调用
  window.bridge.obtain = function (id) {
    return JSON.stringify(messages[id].params);
  };

  // 根据call_id和回调数据执行JS的回调函数，native调用
  window.bridge.callback = function (id, data) {
    var message = messages[id];
    if (!message) {
      return;
    }

    if (message.callback) {
      message.callback(JSON.parse(data));
    }

    delete messages[id]; // 删除参数和回调函数
  };

  // 给native发送消息
  function invokeNative(name, params, callback) {
    call_id++; // call_id递增
    messages[call_id] = {
      params: params,
      callback: callback
    }; // 保存参数和回调函数

    if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {
      // Android
      window.prompt(JSON.stringify({
        cmd: name,
        id: call_id,
        params: params
      }), '');
    } else {
      // iOS
      // 方式1：
      var iframe = document.createElement('iframe');
      iframe.src = 'bridge://invoke.native.method?handler=' + name + '&id=' + call_id;
      iframe.style.display = 'none';
      document.documentElement.appendChild(iframe);
      setTimeout(function () {
        document.documentElement.removeChild(iframe);
      }, 0);

      // 方式2：
      // try{
      //     var msg = JSON.stringify({id : call_id, params : params});
      //     eval('window.webkit.messageHandlers.' + name + '.postMessage(' + msg + ')');
      // } catch (error) {
      //     console.log(error)
      // }

      // 方式3：
      // window.prompt(JSON.stringify({cmd : name, id : call_id, params : params}), '');
    }
  }
})();
/* eslint-disable */
