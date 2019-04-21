// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pheight: 0
  },

  getfocus(e) {
    var that = this
    console.log(e.detail.height)
    that.setData({
      pheight: e.detail.height
    })
  },

  delfocus(e) {
    var that = this
    console.log(e)
    that.setData({
      pheight: 0
    })
  },

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