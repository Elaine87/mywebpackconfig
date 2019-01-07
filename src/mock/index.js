


const proxy = {

  // 支付宝
  [`POST ${isBondAccount}`]: {
    'code': 0,
    'msg': 'success',
    'result': {
      'acount': 'abc@123.com',
      'accountType': 'alipay'
    }
  }

};
module.exports = proxy;
