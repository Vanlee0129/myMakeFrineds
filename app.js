const api = require('/api/api.js').api
App({
  data: {

  },
  onLaunch: function (options) {
    var that = this
    wx.showShareMenu({
      withShareTicket: true
    })
  }

})
