// pages/home/home.js
var util = require('../../utils/util.js')
var log = util.log
var api = require('../../api/api.js').api
var loginApi = require('../../api/login_api.js').loginApi
var getLoginToken = loginApi.getLoginToken
let parseTime = util.parseTime
let readableTime = util.readableTime
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx: true,
    idxx: false,
    like:100,
    comment:100,
    collection:100,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
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
    wx.showTabBar({
      
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

  },

  changeColor(e) {
    var that = this
    console.log(e)
    let index = e.currentTarget.dataset.index;
    if (index == 1) {
      that.setData({
        idx: false,
        idxx: true
      })
    } else {
      that.setData({
        idx: true,
        idxx: false
      })
    }
  },

  details(){
    var that = this
    wx.navigateTo({
      url: '../details/details',
    })
  }
})