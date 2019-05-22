// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pheight: 0,
    btuBottom:"",
    contentValue:'',
  },

  submitPost() {
    var that = this
    const app = getApp()
    let data = that.data
    wx.request({
      url: 'http://192.168.0.8:3000/postArticl',
      method: 'POST',
      data: {
        content: data.contentValue,
        user_id: app.globalData.openid,
        userName: app.globalData.userName,
        avatarUrl: app.globalData.avatarUrl
      },
      success: function() {
        wx.showToast({
          title: '成功',
        })
      }
    })
  },

  getTitleValue(e) {
    var that = this
    that.setData({
      titleValue: e.detail.value
    })
  },

  getContentValue(e) {
    var that = this
    that.setData({
      contentValue: e.detail.value
    })
  },

  // getfocus(e) {
  //   var that = this
  //   console.log(e.detail.height)
  //   that.setData({
  //     pheight: e.detail.height
  //   })
  // },

  // delfocus(e) {
  //   var that = this
  //   console.log(e)
  //   that.setData({
  //     pheight: 0
  //   })
  // },

  navback() {
    var that = this
    wx.switchTab({
      url: '/pages/home/home',
      success: function(e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onShow();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const app = getApp()
    var that = this
    console.log(app.globalData.openid)
    that.setData({
      user_id: app.globalData.openid
    })
    // let isIphoneX = app.globalData.isIphoneX;
    // if (isIphoneX) {
    //   this.setData({
    //     btuBottom: "68rpx",
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.hideTabBar({

    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})