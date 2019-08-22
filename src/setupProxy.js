
 const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/manage", {
        target: "http://admintest.happymmall.com" , //配置你要请求的服务器地址
        changeOrigin: true,
    }))
    app.use(proxy('/user/logout.do', {
        target: "http://admintest.happymmall.com" ,
        changeOrigin: true,
    }))
};
// 安装http-proxy-middleware,在src/下新建setupProxy.js