Page({
  data: {
    userInfo: {},
    cars: [{
      src: '/carImgs/car3.jpg',
      word: '汽车维修',
      pay: '3000',
      phone: '18742511234',
      owner: '王先生',
      type: '大巴车',
      brand: '大众',
      msg: '车辆前视镜有点损坏，不过问题不大',
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
    selectCarsArray: [{
      "id": "01",
      "text": "价格"
    },{
      "id": "02",
      "text": "人气"
    },{
      "id": "03",
      "text": "综合"
    }],
    selectCompanyArray: [{
      "id": "11",
      "text": "距离"
    }, {
      "id": "12",
      "text": "人气"
    }, {
      "id": "13",
      "text": "综合"
    }],
    sortList: {
      "价格": "pay",
      "人气": "hot",
      "距离": "distance",
      "综合": "all"
    },
    tempSearch: [],
    searchValue: '',
    show: 0,
    sortRule: true
  },
  getData: function () {
    console.log("这个功能要没了");
  },
  bindKeyInput: function (e) {
    var that = this;
    var tempData = [];
    tempData = that.searchMsg(that.data.show, e.detail.value);
    this.setData({
      tempSearch: tempData,
      searchValue: e.detail.value
    })
  },
  onLoad: function (options) {
    var that = this;
    var limit = options.limit;
    var type = options.type;
    var tempData = that.searchMsg(type, limit);
    this.setData({
      tempSearch: tempData,
      show: type,
      searchValue: limit
    })
  },
  getSelect: function (e) {
    var that = this;
    var property = that.data.sortList[e.detail.text];
    console.log(property);
    var tempData = that.searchMsg(that.data.show, that.data.searchValue);
    if (property != "all" || property != "opentime") {
      tempData = tempData.sort(that.compare(property, that.data.sortRule))
    }
    this.setData({
      tempSearch: tempData,
      sortRule: !that.data.sortRule
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
  copyArray: function (list) {
    var tempFirms = [];
    for (var index in list) {
      tempFirms.push(list[index]);
    }
    return tempFirms;
  },
  searchMsg: function(show, limit) {
    var that = this;
    var tempData = [];
    if (show == 1) {
      var cars = that.data.cars;
      if(limit == '') {
        return that.copyArray(cars);
      }
      for (var index in cars) {
        if (cars[index].type.indexOf(limit) != -1 || cars[index].brand.indexOf(limit) != -1) {
          tempData.push(cars[index]);
        }
      }
    } else {
      var firms = that.data.firms;
      if (limit == '') {
        return that.copyArray(firms);
      }
      for (var index in firms) {
        if (firms[index].title.indexOf(limit) != -1 || firms[index].addition.indexOf(limit) != -1) {
          tempData.push(firms[index]);
        }
      }
    }
    return tempData;
  }
})