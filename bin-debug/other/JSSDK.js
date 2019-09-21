/**
* Created by d8q8 on 2015/1/19.
* @class JSSDK
* @constructor
**/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var JSSDK = (function () {
    function JSSDK() {
        this.CLASS_NAME = "JSSDK";
    }
    /**
    * 初始化
    **/
    JSSDK.prototype.init = function () {
        var data = GlobalData.configData;
        var ss = location.href.split("#")[0];
        this.title = "听风娱乐城给你非凡享受";
        this.desc = "听风娱乐城给你非凡享受";
        this.link = data.data.linkhall + "?yid=" + GlobalData.account;
        this.imgUrl = data.data.imgurl;
        this.url = data.data.shareurl;
        //Network.sendInfo(this.url, "url=" + encodeURIComponent(ss), this.getSignPackage.bind(this), egret.URLRequestMethod.GET);
        //H5pop.getWxConfig({ url: encodeURIComponent(ss) },this.getSignPackage.bind(this));
        window["getShareInfo"](this.url + "?url=" + encodeURIComponent(ss), {}, this.getSignPackage.bind(this));
    };
    JSSDK.prototype.setTitle = function () {
        var data = GlobalData.configData;
        this.title = "听风娱乐城给你非凡享受";
        this.desc = "听风娱乐城给你非凡享受";
        this.link = data.data.linkhall + "?yid=" + GlobalData.account;
        this.imgUrl = data.data.imgurl;
        var ss = location.href.split("#")[0];
        this.url = data.data.shareurl;
        window["getShareInfo"](this.url + "?url=" + encodeURIComponent(ss), {}, this.getSignPackage.bind(this));
    };
    /**
    * 获取签名分享
    */
    JSSDK.prototype.getSignPackage = function (e) {
        this.signPackage = JSON.parse(e);
        window["setWxConfig"](this.signPackage);
        window["setShare"](this.title, this.desc, this.imgUrl, this.link);
    };
    return JSSDK;
}());
__reflect(JSSDK.prototype, "JSSDK");
