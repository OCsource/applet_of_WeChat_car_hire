Page({
  data: {
    pic: '/carImgs/car3.jpg',
    pay: '0',
    phone: '无',
    owner: '无名氏',
    type: '无',
    brand: '无',
    msg: '无'
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      pic: options.pic.split("'")[1],
      pay: options.pay,
      phone: options.phone,
      owner: options.owner,
      type: options.type,
      brand: options.brand,
      msg: options.msg
    })
  },
  payForMoney: function() {
    wx.showToast({
      title: '支付成功',
      icon: 'succes',
      duration: 1500,
      mask: true
    });
    setTimeout(function () { wx.navigateBack();}, 1200);
  }
})