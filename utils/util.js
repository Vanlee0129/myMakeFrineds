const app = getApp()

const config = require('../config/config.js').config

const formatTime = function() {
  var date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const weekdayId = date.getDay()
  var o = {
    'year': year,
    'month': month,
    'day': day,
    'weekdayId': weekdayId
  }
  return o
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var log = function() {
  if (config.debugMode) {
    console.log.apply(console, arguments)
    var s = Date.now()
    // console.log('time:', s)
  }

}

var request = function(url, method, data, header, successCallback) {
  log('url', url)
  log('method', method)
  log('data', data)
  wx.request({
    url: url,
    method: method,
    data: data,
    header: header,
    fail: function(e) {
      log('request fail:', e)
    },
    success: function(res) {
      successCallback(res)
    }
  })
}

var navigateTo = function(url) {
  wx.navigateTo({
    url: url
  })
}

var switchTabTo = function(url) {
  wx.switchTab({
    url: url,
  })
}


var uploadImgs = function(callback) {
  var uploadImgUrl = config.uploadImgUrl
  wx.chooseImage({
    success(res) {
      const paths = res.tempFilePaths

      for (var i = 0; i < paths.length; i++) {
        var p = paths[i]

        wx.uploadFile({
          url: uploadImgUrl,
          filePath: p,
          name: 'photo',
          success(res) {
            callback(res)
          }
        })

      }
    }
  })

}


var uploadMsgFile = function(callback) {
  var uploadFileUrl = config.uploadFileUrl
  wx.chooseMessageFile({
    count: 10,
    type: 'file',
    success(res) {
      var files = res.tempFiles
      for (var i = 0; i < files.length; i++) {
        var f = files[i]
        var p = f.path
        wx.uploadFile({
          url: uploadFileUrl,
          filePath: p,
          name: 'file',
          success(res) {
            //   log(res)
            callback(res)

          }
        })
      }



    }
  })


}

var parseTime = function(s) {
  var o = {

  }
  var jar = []
  var temp = ''
  for (var i = 0; i < s.length; i++) {
    var e = s[i]
    if (e == '-' || e == 'T' || e == ':' || e == '.') {
      jar.push(temp)
      temp = ''
    } else {
      temp += e
    }

  }
  o.year = parseInt(jar[0])
  o.month = parseInt(jar[1])
  o.date = parseInt(jar[2])
  o.hour = parseInt(jar[3])
  o.minute = parseInt(jar[4])
  o.second = parseInt(jar[5])
  return o
}

var readableTime = function(o) {
  // eg: o = {'year': 2019, 'month':20 ...}
  var date = new Date()
  date.setYear(o.year)
  date.setMonth(o.month - 1) //草他妈的月份 是按照 index 来的。。反人类的设计。。
  date.setDate(o.date)
  date.setHours(o.hour)
  date.setMinutes(o.minute)
  date.setSeconds(o.second)
  var ts = date.getTime()
  return getDateDiff(ts)

  function getDateDiff(ts) {
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var halfamonth = day * 15
    var month = day * 30

    var now = new Date().getTime()
    var diffValue = now - ts

    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute

    var result = ''
    if (monthC >= 2) {
      result = `${o.year}-${o.month}-${o.date} ${o.hour}:${o.minute}:${o.second}`
    } else if (monthC >= 1) {
      result = parseInt(monthC) + "个月前"
    } else if (weekC >= 1) {
      result = parseInt(weekC) + "周前"
    } else if (dayC >= 1) {
      result = parseInt(dayC) + "天前"
    } else if (hourC >= 1) {
      result = parseInt(hourC) + "个小时前"
    } else if (minC >= 1) {
      result = parseInt(minC) + "分钟前"
    } else
      result = "刚刚"
    return result
  }

}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  log: log,
  request: request,
  navigateTo: navigateTo,
  switchTabTo: switchTabTo,
  uploadImgs: uploadImgs,
  uploadMsgFile: uploadMsgFile,
  parseTime: parseTime,
  readableTime: readableTime,
}