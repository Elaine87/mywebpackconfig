(function (config) {
  (function (a, b) {
    function c(a) {
      let c = b.createElement('script');
      c.charset = 'utf-8';
      c.src = a;
      c.id = 'amap_main_js';
      (a = h || k) && a.appendChild(c);
    }

    function d() {
      var a = ['v=' + config[4], 'key=' + config[0], 'cache=0'];
      config[7] && a.push('plugin=' + config[7]);
      config[5] && a.push('callback=' + config[5]);
      for (var d = config[2] + '/maps?' + a.join('&'), a = config[2].split(',')[0], e = b.getElementsByTagName('script'), f, k = 0; k < e.length; k += 1) {
        if (0 === e[k].src.indexOf(a.split(':')[1] + '/maps?')) {
          f = e[k];
          break;
        }
      }
      config[5] || f && f.async ? c(d) : (b.write('<script crossorigin="anonymous" id="amap_main_js" src="' +
        d + '" type="text/javascript">\x3c/script>'), setTimeout(function () {
        b.getElementById('amap_main_js') || c(d);
      }, 1));
    }

    function e() {
      for (let a in localStorage) {
        localStorage.hasOwnProperty(a) && 0 === a.indexOf('_AMap_') && localStorage.removeItem(a);
      }
    }
    var f = function () {
        let a = !1;
        try {
          let b = (new Date).getTime();
          localStorage.setItem('_test', b);
          localStorage.getItem('_test') == b && (a = !0);
        } catch (c) {}
        return a;
      }(),
      h = b.head || b.getElementsByTagName('head')[0],
      k = b.body || b.getElementsByTagName('body')[0];
    if (f) {
      try {
        let l = JSON.parse(localStorage.getItem('_AMap_raster'));
        if (l && '1540436862167' === l.version) {
          config.jA = !0, eval(l.script);
        } else {
          throw e(), Error('localStorage\'s version is ' + l.version + ', but the latest version is 1540436862167');
        }
      } catch (m) {
        d();
      }
    } else {
      d();
    }
  })(window, document);
})(['4c4750ffc646b8931b0c3de3b9bf4bf7', [115.423411, 39.442758, 117.514625, 41.060816, 116.405285, 39.904989], 'https://webapi.amap.com', 1, '1.4.10', null, '110000', '', true, true, true, true, '1541510637-1']);
