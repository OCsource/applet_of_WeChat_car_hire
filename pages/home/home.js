Page({
  data: {
    userInfo: {},
    src: '/imgs/home.jpg',
    srcs: [{
      src: '/carImgs/car3.jpg',
      word: '汽车维修',
      pay : '3000',
      phone: '18742511234',
      owner: '王先生',
      type: '大巴车',
      brand: '大众',
      msg: '车辆前视镜有点损坏',
      hot: '1000'
    },
    {
      src: '/carImgs/car9.jpg',
      word: '汽车保养',
      pay: '4000',
      phone: '18742512234',
      owner: '张先生',
      type: '拖车',
      brand: '大众',
      msg: '车辆前视镜有点损坏',
      hot: '900'
    },
    {
      src: '/carImgs/car6.jpg',
      word: '汽车保险',
      pay: '1000',
      phone: '18742511214',
      owner: '赵先生',
      type: '摩托车',
      brand: '大众',
      msg: '车辆前视镜有点损坏',
      hot: '200'
    },
    {
      src: '/carImgs/car7.jpg',
      word: '购买汽车',
      pay: '500',
      phone: '18742511264',
      owner: '钱先生',
      type: '观光车',
      brand: '大众',
      msg: '车辆前视镜有点损坏',
      hot: '500'
    },
    {
      src: '/carImgs/car2.jpg',
      word: '请求拖车',
      pay: '2000',
      phone: '18742511254',
      owner: '孙先生',
      type: '小汽车',
      brand: '奔驰',
      msg: '车辆前视镜有点损坏',
      hot: '400'
    },
    {
      src: '/carImgs/car5.jpg',
      word: '社区论坛',
      pay: '5000',
      phone: '18742511244',
      owner: '李先生',
      type: '大巴车',
      brand: '大众',
      msg: '车辆前视镜有点损坏',
      hot: '800'
    },
    {
      src: '/carImgs/car1.jpg',
      word: '商谈杂谈',
      pay: '3000',
      phone: '18742511334',
      owner: '周先生',
      type: '小汽车',
      brand: '劳斯莱斯',
      msg: '车辆完好',
      hot: '1200'
    },
    {
      src: '/carImgs/car8.jpg',
      word: '联系我们',
      pay: '200',
      phone: '18742511224',
      owner: '杨先生',
      type: '电动车',
      brand: '小刀',
      msg: '车辆前视镜有点损坏',
      hot: '100'
    }],
    searchValue : ''
  },
  getData: function () {
    var that = this;
    wx.navigateTo({
      url: './children/searchcar?type=1&limit=' + that.data.searchValue
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  }
})