// pages/cart/cart.js
var bmap = require('../../libs/bmap-wx.min.js'); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ak: "W9CXeMlUjGm0iht8dd5VZtlLFr9I8hSd", //填写申请到的ak  
    markers: [],
    longitude: '',   //经度  
    latitude: '',    //纬度  
    address: '定位中',     //地址  
    cityInfo: {},    //城市信息 
    srcs: [{
      src: '/carImgs/car1.jpg',
      word: '汽车租赁'
    },
    {
      src: '/carImgs/car6.jpg',
      word: '机车租赁'
    },
    {
      src: '/carImgs/car12.jpg',
      word: '商车租赁'
    },
    {
      src: '/carImgs/car9.jpg',
      word: '拖车租赁'
    }],
    firms: [{
      title : '华融租车',
      pic: '/carImgs/huarong.jpg',
      addition : '免费WIFI，免费停车，矿泉水，儿童座椅',
      opentime : '00:00-23:59',
      distance : '2583.2',
      hot : '1000',
      phone: '18742511111',
      shopkeeper: '赵师傅'
    },{
      title : '瑞卡租车',
      pic: '/carImgs/ruika.jpg',
      addition : '免费WIFI，免费停车',
      opentime : '00:00-23:59',
      distance: '23.2',
      hot : '500',
      phone: '18742512222',
      shopkeeper: '孙师傅'
    },{
      title : '神州租车',
      pic : '/carImgs/shengzhou.jpg',
      addition : '免费WIFI，免费停车，儿童座椅',
      opentime : '07:00-22:20',
      distance : '583.2',
      hot: '300',
      phone: '18742513333',
      shopkeeper: '魏师傅'
    },{
      title : '一嗨租车',
      pic : '/carImgs/yihai.jpg',
      addition : '免费停车，矿泉水',
      opentime : '08:00-23:20',
      distance : '283.2',
      hot: '10',
      phone: '18742514444',
      shopkeeper: '关师傅'
    }],
    items: [
      { name: '24小时营业', value: '24小时营业'},
      { name: '免费WIFI', value: '免费WIFI' },
      { name: '儿童座椅', value: '儿童座椅' }
    ],
    firmsTemp: [

    ], 
    selectArray : [{
      "id" : "01",
      "text" : "综合"
    },{
      "id" : "02",
      "text" : "人气"
    },{
      "id" : "03",
      "text" : "距离"
    },{
      "id" : "04",
      "text" : "开业时间"
    }],
    sortList: {
      "人气": "hot",
      "距离": "distance",
      "开业时间": "opentime",
      "综合": "all"
    },
    searchValue : ''
  },
  listenCheckboxChange: function (e) {
    //复选框选择匹配公司
    var that = this;
    var values = e.detail.value;
    var tempFirms = [];
    let backNum = 0;
    for (var index in that.data.firms) {
      var flag = 1;
      for (var index2 in values) {
        //添加(方法很好使，果然换一种思路很重要)
        if (values[index2] == "24小时营业" ) {
          if (that.data.firms[index].opentime != "00:00-23:59") {
            flag = 0;
            break;
          }
          continue;
        }
        if (that.data.firms[index].addition.indexOf(values[index2]) == -1) {
          flag = 0;
          break;
        }
        //删除有BUG
        // if (values[index2] == "24小时营业") {
        //   if (that.data.firms[index].opentime != "00:00-23:59") {
        //     tempFirms.splice(index - backNum, 1);
        //     backNum++;
        //   }
        //   continue;
        // }
        // if (that.data.firms[index].addition.indexOf(values[index2]) == -1) {
        //   tempFirms.splice(index - backNum, 1);
        //   backNum++;
        // }
      }
      if (flag == 1) tempFirms.push(that.data.firms[index]);
    }
    this.setData({
      firmsTemp: tempFirms
    });
  },
  getSelect: function (e) {
    var that = this
    var property = that.data.sortList[e.detail.text];
    var tempFirms = this.copyArray(that.data.firmsTemp);
    var sortRule = true; // 正序倒序
    if (property != "all" || property != "opentime") {
      tempFirms = tempFirms.sort(that.compare(property, sortRule))
    }
    this.setData({
      firmsTemp: tempFirms
    })
  },
  compare: function (property, bol) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      if (bol) {
        return value1 - value2;
      } else {
        return value2 - value1;
      }
    }
  },
  copyArray: function(list) {
    var tempFirms = [];
    for (var index in list) {
      tempFirms.push(list[index]);
    }
    return tempFirms;
  },
  getNowLocation: function() {
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {  
      // console.log(data);
      var wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内  
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
        cityInfo: data.originalData.result.addressComponent
      });
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },
  getAllAddress: function() {
    var that = this;
    wx.showToast({
      title: that.data.address,
      icon: 'none',
      duration: 1500,
      mask: true
    });
  },
  getData: function () {
    var that = this;
    wx.navigateTo({
      url: '../home/children/searchcar?type=2&limit=' + that.data.searchValue
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      firmsTemp: this.copyArray(this.data.firms)
    });
    this.getNowLocation();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})