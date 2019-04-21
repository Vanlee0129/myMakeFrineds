const util = require('../utils/util.js')
const config = require('../config/config.js').config
var log = util.log
var request = util.request


var log = console.log.bind(console)

var isMethod = function(property){
	var x = ['get', 'post', 'delete', 'put']
	for(var i=0; i<x.length; i++){
		if(x[i]==property){
			return true
		}
	}
	return false
}

var isPathArg = function(property){
	if(property == 'pathArg'){
		return true
	}
	return false
}

var createProxy = function(handler){
	var revocable = Proxy.revocable({}, handler)
	var proxy = revocable.proxy
	return proxy
}

var handlePathArg = function(property, handler){
	var path = handler.path
	var wrap = function(){
		var arg = arguments[0]//f接收到的参数
		var newPath = path + '/' + arg
		handler.path = newPath
		var proxy = createProxy(handler)
		return proxy
	}
	return wrap
}

var handleMethod = function(method, handler, apiConfig){
	var path = handler.path
	handler.path = '' //在最终的方法调用的时候清零， 路径清零
	var wrap = function(){
		var data = arguments[0]
		var callback = arguments[1]
		var url = apiConfig.baseUrl + path
		// var header = apiConfig.header
        // var header = { }
        var header = {}
		request(url, method.toUpperCase(), data, header, function(res){
			callback(res)
		})
	}
	return wrap
}

var handlePath = function(property, handler){
	// if(handler.last == property){
	// 	//do noting
	// }else{
		handler.path += `/${property}`
		handler.last = property
	// }
	return createProxy(handler)
}

class apiGenerator {
	constructor(apiConfig) {
		this.handler = {
			last: '',
			path: '',
			get(target, property) {
				if(isMethod(property)){
					var call = handleMethod(property, this, apiConfig)
					return call
				}else if(isPathArg(property)){
					var proxy = handlePathArg(property, this)
					return proxy
				}else{
					var proxy = handlePath(property, this)
					return proxy
				}

			}
		}
		this.proxy = createProxy(this.handler)
		return this.proxy
	}
}

var apiConfig = {
	baseUrl: config.apiBaseUrl,
	header: '' //default application json
}

var api = new apiGenerator(apiConfig)

var kbApiConfig = {
	baseUrl: config.kbBaseUrl,
	header: ''
}

var kbApi = new apiGenerator(kbApiConfig)

module.exports = {
	api: api,
	kbApi: kbApi
}
