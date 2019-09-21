/**
  * 网络公共类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 存放网络公共方法
  * 注意：是异步请求
  */
var Network;
(function (Network) {
    Network.netArr = [];
    //发送消息
    //url 网络地址
    //data exp "name='dily'&age:18"
    function sendInfo(url, urlData, callback, str) {
        if (url === void 0) { url = ""; }
        if (urlData === void 0) { urlData = ""; }
        if (callback === void 0) { callback = function () { }; }
        if (str === void 0) { str = egret.URLRequestMethod.POST; }
        this.netArr.push({ "key": url, "fun": callback });
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        var request = new egret.URLRequest(url);
        request.method = str;
        request.data = new egret.URLVariables(urlData);
        loader.load(request);
    }
    Network.sendInfo = sendInfo;
    //GET请求完成
    //发送消息 消息为 网址名称
    function onGetComplete(event) {
        var loader = event.target;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var data = loader.data;
        var notify = loader._request.url;
        var variables = loader._request.method;
        if (!variables || variables == "post" || variables == "get")
            variables = "";
        var len = this.netArr.length;
        for (var i = 0; i < this.netArr.length; i++) {
            if (this.netArr[i].key == notify + variables) {
                this.netArr[i].fun.apply(null, [data]);
                this.netArr.splice(i, 1);
                break;
            }
        }
    }
    Network.onGetComplete = onGetComplete;
})(Network || (Network = {}));
