// pages/home/home.js
var api = require('../../api/api.js').api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usercard: [],
    hotPost: [],
    idx: true,
    idxx: false,
    imagelike: false,
    imagecollection: false
  },

  changelike(e) {
    var that = this
    var data = that.data
    var index = e.currentTarget.dataset.index
    var postId = data.usercard[index].post_id
    console.log(postId)
    let num = data.usercard[index].like
    console.log(e)
    if (!data.usercard[index].imagelike){
      that.setData({
        ['usercard[' + index + '].imagelike']: true,
        ['usercard[' + index + '].like']: num + 1
      }, () => {
        let result = num + 1 
        console.log(result)
        wx.request({
          url: 'http://192.168.0.8:3000/updatePostLike',
          method: 'POST',
          data: {
            postId: postId,
            likeStatus: 1,
            likeNum: num + 1
          },
          success: function() {
            console.log('update ok')
          }
        })
      })
    }else{
      that.setData({
        ['usercard[' + index + '].imagelike']: false,
        ['usercard[' + index + '].like']: num - 1
      }, () => {
        let result = num - 1 
        wx.request({
          url: 'http://192.168.0.8:3000/updatePostLike',
          method: 'POST',
          data: {
            postId: postId,
            likeStatus: 1,
            likeNum: result
          },
          success: function () {
            console.log('update ok')
          }
        })
      })
    }
  },

  changecollection(e) {
    var that = this
    var data = that.data
    var index = e.currentTarget.dataset.index
    var postId = data.usercard[index].post_id
    console.log(postId)
    console.log(e)
    if (!data.usercard[index].imagecollection) {
      that.setData({
        ['usercard[' + index + '].imagecollection']: true,
      })
    } else {
      that.setData({
        ['usercard[' + index + '].imagecollection']: false,
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
    let that = this
    wx.showTabBar({

    })
    wx.request({
      url: 'http://192.168.0.8:3000/showNewPost',
      success: function(res) {
        that.setData({
          usercard: res.data.data
        })
        // for (let index = 0; index < res.data.data.length; index++){
        //   const element = res.data.data[index]
        //   if(element.likeStatus == 0){
        //     that.setData({
        //       ['usercard[' + index + '].imagelike']: false
        //     })
        //   }else{
        //     that.setData({
        //       ['usercard[' + index + '].imagelike']: true
        //     })
        //   }
        // }
        console.log(res.data.data)
      }
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