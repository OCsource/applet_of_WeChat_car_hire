Page({
  data: {
    userInfo: {},
    title: '无',
    pic: '',
    addition: '无',
    opentime: '无',
    distance: '0',
    longitude: '0',
    latitude: '0',
    phone: '',
    shopkeeper: '无',
    markers: [{
      id: 0,
      latitude: 38.95410,
      longitude: 121.5212,
      width: 35,
      height: 45,
      title: '目的地'
    }]
  },
  getData: function() {

  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      pic: options.pic.split("'")[1],
      title: options.title,
      addition: options.addition,
      opentime: options.opentime,
      distance: options.distance,
      longitude: options.longitude,
      latitude: options.latitude,
      phone: options.phone,
      shopkeeper: options.shopkeeper
    })
  }
})