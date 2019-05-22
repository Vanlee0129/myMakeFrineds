const api = require('../../api/api.js').api
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const app = getApp()
    var appId = 'wx56f1758be4623252'
    var secret = 'bd1ab9db98dba0478bb2db68aa45b81d'
    var reurl = 'https://api.weixin.qq.com/sns/jscode2session?appid='
    var retail = '&grant_type=authorization_code'
    wx.login({
      //获取code
      success: function(res) {
        var code = res.code; //返回code
        console.log(code);
        wx.request({
          url: reurl + appId + '&secret=' + secret + '&js_code=' + code + retail,
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function(res) {
            app.globalData.openid = res.data.openid //返回openid
            console.log('openid为' + app.globalData.openid);
          }
        })
      }
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              app.globalData.userName = res.userInfo.nickName
              app.globalData.avatarUrl = res.userInfo.avatarUrl
              if (res.userInfo.gender == 1) {
                var sex = '男'
              } else {
                var sex = '女'
              }
              wx.request({
                url: 'http://192.168.0.8:3000/isUser',
                method: "POST",
                data: {
                  user_id: app.globalData.openid
                },
                success: function(res) {
                  if(res == null){
                    wx.request({
                      url: 'http://192.168.0.8:3000/userInfo',
                      method: "POST",
                      data: {
                        sex: sex,
                        user_id: app.globalData.openid
                      }
                    })
                  }else{
                    return true
                  }
                }
              })
              wx.switchTab({
                url: '/pages/home/home',
                success: function(e) {
                  console.log("------")
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onShow();
                }
              })
            }
          })
        }
      }
    })
  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    wx.switchTab({
      url: '/pages/home/home',
      success: function(e) {
        console.log("------")
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onShow();
      }
    })
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