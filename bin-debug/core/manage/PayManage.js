var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息管理
 * by fany 2015 7.5
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
var PayManage = (function () {
    function PayManage() {
        this.url = "http://" + GlobalData.connectIP + ":82/paytest.nd"; //211.149.207.220   kaixuan-pc
        if (PayManage.instance) {
            throw new Error("Instance is alreally exist");
        }
    }
    PayManage.getInstance = function () {
        if (this.instance == null) {
            this.instance = new PayManage();
        }
        return this.instance;
    };
    // public pay1(shopid, name = "", ss = ""): void {
    //     window["pay"](this.url, { userid: GlobalData.openid + "@" + GlobalData.platform, shopid: shopid, total_fee: ss }, this.payBack1.bind(this));
    // }
    // private payBack1(r): void {
    // }
    PayManage.prototype.pay = function (shopid, gname, price) {
        this.wupin = { shopid: shopid, gname: gname, price: price };
        if (GlobalData.userfrom == PlatformData.USER_FROM_WEIXIN) {
            var url = GlobalData.configData.data.payurl +
                '?shopid=' + shopid +
                '&goods=' + gname +
                '&userid=' + (GlobalData.openid + "@" + GlobalData.platform) +
                '&price=' + price +
                '&url=' + encodeURIComponent(GlobalData.configData.data.link) +
                '&time=' + (new Date()).getTime();
            window.location.href = url;
        }
        else if (GlobalData.userfrom == PlatformData.USER_FROM_SELF) {
            var url = GlobalData.configData.data.regapi + "?service=user.existuser&token=" + GlobalData.openid;
            window["regLogin"](url, {}, this.checkBind.bind(this));
        }
        else {
            if (GlobalData.platform == PlatformData.PLATFORM_MENGDOU) {
                var url = "http://h5.17letui.com/pro/index.php?g=Admin&m=Pay&a=createOrder&playerId=" + (GlobalData.openid + "@" + GlobalData.platform) + "&goodId=" + shopid + "&rmb=" + price;
                window["getPayInfo"](url, {}, this.mengdoupayBack.bind(this));
            }
            else if (GlobalData.platform == PlatformData.PLATFORM_QUNHEI) {
                var url = "http://" + GlobalData.connectIP + ":82/createQunheiData.nd?playerId=" + (GlobalData.openid + "@" + GlobalData.platform) + "&shopId=" + shopid + "&username=" + GlobalData.openid;
                window["getPayInfo"](url, {}, this.qunheipayBack.bind(this));
            }
            else if (GlobalData.platform == PlatformData.PLATFORM_YOUXIDOU) {
                var url = "http://" + GlobalData.connectIP + ":82/yxdCreatePay.nd?playerId=" + (GlobalData.openid + "@" + GlobalData.platform) + "&shopId=" + shopid;
                window["getPayInfo"](url, {}, this.youxidoupayBack.bind(this));
            }
        }
    };
    PayManage.prototype.mengdoupayBack = function (r) {
        //console.log(r)
        if (r == "fail") {
            TipsManage.showTips("参数错误!");
        }
        else {
            top.location.href = r;
        }
    };
    PayManage.prototype.youxidoupayBack = function (r) {
        if (r == "fail") {
            TipsManage.showTips("参数错误!");
        }
        else {
            window["youxidoupay"](JSON.parse(r));
        }
    };
    PayManage.prototype.jiuyaowanpayBack = function (r) {
        if (r == "fail") {
            TipsManage.showTips("参数错误!");
        }
        else {
            console.log(r);
            //window.location.href = r;
            top.location.href = r;
        }
    };
    PayManage.prototype.qunheipayBack = function (r) {
        if (r == "fail") {
            TipsManage.showTips("参数错误!");
        }
        else {
            window["qunheipay"](JSON.parse(r));
        }
    };
    PayManage.prototype.checkBind = function (r) {
        if (r.ret == 200) {
            if (r.data.code == 200) {
                if (GlobalData.platform == PlatformData.PLATFORM_BAIDU) {
                    var type = "";
                    if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
                        type = "1";
                    }
                    else {
                        type = "2";
                    }
                    window['getPayInfo']("http://" + GlobalData.connectIP + ":82/baiduCreateOrder.nd?playerId=" + (GlobalData.openid + "@" + GlobalData.platform) + "&shopId=" + this.wupin.shopid, {}, this.payBack.bind(this)) + "&paytype=" + type;
                }
            }
            else {
                PanelManage.openLogin(true);
            }
        }
        else {
            TipsManage.showTips("请求异常,请稍后再试!");
        }
    };
    PayManage.prototype.payBack = function (url) {
        if (url == "notreg") {
            PanelManage.openLogin(true);
        }
        else if (url == "fail") {
            TipsManage.showTips("充值失败,请重新再试!");
        }
        else {
            window.location.href = url;
        }
    };
    PayManage.prototype.getPayback = function (r) {
        var obj = JSON.parse(r);
        window.location.href = obj.url;
    };
    return PayManage;
}());
PayManage.instance = null;
__reflect(PayManage.prototype, "PayManage");
