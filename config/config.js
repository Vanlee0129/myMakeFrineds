

const devConfig = {
	apiBaseUrl : 'http://120.79.78.236:3000/mock/39',
	kbBaseUrl: 'http://localhost:5000',
	uploadImgUrl: "https://www.how2up.cn:8883/upload/photo",
	uploadFileUrl: "https://www.how2up.cn:8883/upload/file",
	debugMode : true
}

const productConfig = {
    apiBaseUrl: 'https://www.how2up.cn:8883',
    kbBaseUrl: 'http://localhost:5000',
	uploadImgUrl: "https://www.how2up.cn:8883/upload/photo",
	uploadFileUrl: "https://www.how2up.cn:8883/upload/file",
	debugMode : true
}


module.exports = {
    config: productConfig
}
