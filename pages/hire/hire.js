Page({
  data: {
    source: "/carImgs/car7.jpg",
    items: [
      { name: '需加燃油', value: '需加燃油' },
      { name: '是否破损', value: '是否破损' },
      { name: '是否违章', value: '是否违章' }
    ], 
    carTypeArray :[{
      "id" : "01",
      "text" : "小汽车"
    },{
      "id" : "02",
      "text" : "大货车"
    },{
      "id" : "03",
      "text" : "摩托车"
    },{
      "id" : "04",
      "text" : "大拖车"
    }],
    carBrandArray :[{
      "id" : "11",
      "text": "奥迪"
    },{
      "id" : "12",
      "text": "大众"
    },{
      "id" : "13",
      "text": "本田"
    },{
      "id" : "14",
      "text": "奔驰"
    }
    ,{
      "id" : "15",
      "text": "雪铁龙"
    }
    ,{
      "id" : "16",
      "text": "红旗"
    }],
    carType: '',
    carBrand: '',
    itemsBoolean: {
      '需加燃油': false,
      '是否破损': false,
      '是否违章': false
    },
    msg: ''
  },
  listenerButtonChooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function (res) {
        //重绘视图
        that.setData({
          source: res.tempFilePaths,
        })
        wx.previewImage({
          current: '/carImgs/car1.jpg', // 当前显示图片的链接，不填则默认为 urls 的第一张
          urls: ['/carImgs/car3.jpg',
            '/carImgs/car3.jpg',
            '/carImgs/car2.jpg',
            '/carImgs/car4.jpg',
            '/carImgs/car5.jpg', 
            '/carImgs/car6.jpg',
            '/carImgs/car7.jpg',
            '/carImgs/car8.jpg'],
          success: function (res) {

          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      }
    })
  },
  listenCheckboxChange: function (e) {
    var that = this;
    for(var index in e.detail.value) {
      that.data.itemsBoolean[e.detail.value[index]] = true;
    }
    this.setData({
      itemsBoolean: that.data.itemsBoolean
    });
  },
  getType: function (e) {
    this.setData({
      carType: e.detail.text
    })
  },
  getBrand: function (e) {
    this.setData({
      carBrand: e.detail.text
    })
  },
  bindFormSubmit: function(e) {
    var that = this;
    if (that.data.source == '' || that.data.carType == '' || that.data.carTBrand == '') {
      wx.showToast({
        title: '数据不充分！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return;
    }
    var msgs = {
      source: that.data.source,
      carType: that.data.carType,
      carTBrand: that.data.carTBrand,
      items: that.data.itemsBoolean,
      msg: e.detail.value.textarea
    };
    wx.showToast({
      title: '成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    });
    setTimeout(function () { wx.switchTab({ url: '../home/home' }) }, 1200);
    console.log(msgs);
    this.setData({
      carType: '',
      carBrand: '',
      itemsBoolean: {
        '需加燃油': false,
        '是否破损': false,
        '是否违章': false
      }
    })
  }
})