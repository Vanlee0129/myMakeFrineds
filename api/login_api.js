const util = require('../utils/util.js')
const api = require('api.js').api
const kbApi = require('api.js').kbApi
var log = util.log


class loginApi {
    constructor() {

    }
}

loginApi.__proto__.getLoginToken = function(callback){
    wx.login({
	  success: res => {
	        // 发送 res.code 到后台换取 token
            api.auth.get(
                {
                    'code':res.code
                },
                function(__res){
                    callback(__res)

                }
            )

	      }
	    })
}

loginApi.__proto__.getOpenid = function(callback){
    wx.login({
	  success: res => {
	        // 发送 res.code 到后台换取 token
            kbApi.openid.get(
                {
                    'code':res.code
                },
                function(__res){
                    callback(__res)

                }
            )

	      }
	    })
}


module.exports = {
    loginApi: loginApi
}
