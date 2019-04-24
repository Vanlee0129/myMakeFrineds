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
    usercard: [{
        username: '我是用户名',
        time: '一小时以前',
        content: '我是渣男,来网恋啊',
        imagelike: false,
        imagecollection: false,
        like: 100,
        comment: 100,
        collection: 100
      },
      {
        username: '我是用户名',
        time: '两小时以前',
        content: '我也是渣男,来网恋啊',
        imagelike: false,
        imagecollection: false,
        like: 100,
        comment: 100,
        collection: 100
      },
      {
        username: '我是用户名',
        time: '两小时以前',
        content: '我也是渣男,来网恋啊',
        imagelike: false,
        imagecollection: false,
        like: 100,
        comment: 100,
        collection: 100
      }
    ],
    idx: true,
    idxx: false
  },

  changelike(e) {
    var that = this
    var data = that.data
    var index = e.currentTarget.dataset.index
    let num = data.usercard[index].like
    console.log(e)
    if(!data.usercard[index].imagelike){
      that.setData({
        ['usercard[' + index + '].imagelike']: true,
        ['usercard[' + index + '].like']: num + 1
      })
    }else{
      that.setData({
        ['usercard[' + index + '].imagelike']: false,
        ['usercard[' + index + '].like']: num - 1
      })
    }
  },

  changecollection(e) {
    var that = this
    var data = that.data
    var index = e.currentTarget.dataset.index
    let num = data.usercard[index].collection
    console.log(e)
    if (!data.usercard[index].imagecollection) {
      that.setData({
        ['usercard[' + index + '].imagecollection']: true,
        ['usercard[' + index + '].collection']: num + 1
      })
    } else {
      that.setData({
        ['usercard[' + index + '].imagecollection']: false,
        ['usercard[' + index + '].collection']: num - 1
      })
    }
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

  details() {
    var that = this
    wx.navigateTo({
      url: '../details/details',
    })
  }
})