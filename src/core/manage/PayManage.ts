/**
 * 消息管理
 * by fany 2015 7.5
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
class PayManage {
    private static instance: PayManage = null;
    private wupin: any;
    private url: string = "http://" + GlobalData.connectIP + ":82/paytest.nd";
    public constructor() {
        if (PayManage.instance) {
            throw new Error("Instance is alreally exist");
        }
    }
    public static getInstance(): PayManage {
        if (this.instance == null) {
            this.instance = new PayManage();
        }
        return this.instance;
    }
    // public pay1(shopid, name = "", ss = ""): void {
    //     window["pay"](this.url, { userid: GlobalData.openid + "@" + GlobalData.platform, shopid: shopid, total_fee: ss }, this.payBack1.bind(this));
    // }
    // private payBack1(r): void {
    // }
    public pay(shopid, gname, price): void {
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
        } else if (GlobalData.userfrom == PlatformData.USER_FROM_SELF) {
            var url = GlobalData.configData.data.regapi + "?service=user.existuser&token=" + GlobalData.openid;
            window["regLogin"](url, {}, this.checkBind.bind(this));
        } else {
            if (GlobalData.platform == PlatformData.PLATFORM_MENGDOU) {
                var url = "" + (GlobalData.openid + "@" + GlobalData.platform) + "&goodId=" + shopid + "&rmb=" + price;
                window["getPayInfo"](url, {}, this.mengdoupayBack.bind(this));
            } else if (GlobalData.platform == PlatformData.PLATFORM_QUNHEI) {
                var url = "http://" + GlobalData.connectIP + ":82/createQunheiData.nd?playerId=" + (GlobalData.openid + "@" + GlobalData.platform) + "&shopId=" + shopid + "&username=" + GlobalData.openid;
                window["getPayInfo"](url, {}, this.qunheipayBack.bind(this));
            } else if (GlobalData.platform == PlatformData.PLATFORM_YOUXIDOU) {
                var url = "http://" + GlobalData.connectIP + ":82/yxdCreatePay.nd?playerId=" + (GlobalData.openid + "@" + GlobalData.platform) + "&shopId=" + shopid;
                window["getPayInfo"](url, {}, this.youxidoupayBack.bind(this));
            }
        }
    }
    private mengdoupayBack(r): void {
        //console.log(r)
        if (r == "fail") {
            TipsManage.showTips("参数错误!");
        } else {
            top.location.href = r;
        }
    }
    private youxidoupayBack(r): void {
        if (r == "fail") {
            TipsManage.showTips("参数错误!");
        } else {
            window["youxidoupay"](JSON.parse(r));
        }
    }
    private jiuyaowanpayBack(r): void {
        if (r == "fail") {
            TipsManage.showTips("参数错误!");
        } else {
            console.log(r);
            //window.location.href = r;
            top.location.href = r;
        }
    }
    private qunheipayBack(r): void {
        if (r == "fail") {
            TipsManage.showTips("参数错误!");
        } else {
            window["qunheipay"](JSON.parse(r));
        }
    }
    private checkBind(r): void {
        if (r.ret == 200) {
            if (r.data.code == 200) {
                if (GlobalData.platform == PlatformData.PLATFORM_BAIDU) {
                    var type = "";
                    if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
                        type = "1";
                    } else {
                        type = "2";
                    }
                    window['getPayInfo']("http://" + GlobalData.connectIP + ":82/baiduCreateOrder.nd?playerId=" + (GlobalData.openid + "@" + GlobalData.platform) + "&shopId=" + this.wupin.shopid, {}, this.payBack.bind(this)) + "&paytype=" + type;
                }
            } else {
                PanelManage.openLogin(true);
            }
        } else {
            TipsManage.showTips("请求异常,请稍后再试!");
        }
    }
    private payBack(url): void {
        if (url == "notreg") {
            PanelManage.openLogin(true);
        } else if (url == "fail") {
            TipsManage.showTips("充值失败,请重新再试!");
        } else {
            window.location.href = url;
        }
    }
    private getPayback(r): void {
        var obj = JSON.parse(r);
        window.location.href = obj.url;
    }
}