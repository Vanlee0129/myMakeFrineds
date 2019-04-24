const api = require('/api/api.js').api
App({
  data: {

  },
  globalData: {
    isIphonex: false
  },
  onLaunch: function (options) {
    var that = this
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow: function () {
    let _self = this;
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          _self.globalData.isIphoneX = true
        }
      }
    })
  }
})
