var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.tt = 0;
        _this.arr = ["新玩法欢乐21点,每日送出上万点券", "首冲豪送千万金币", "每天在线1小时,能够抽奖", "开服起，每分钟都会有几率发送系统红包,请注意抢红包哦", "提游戏建议和BUG,采纳会发放50W金币哦", "邀请好友送点券，送大礼"];
        _this.skinName = "resource/skins/other/LoadingPanelSkin.exml";
        _this.set();
        return _this;
    }
    LoadingUI.prototype.set = function () {
        this.barbg.source = GlobalData.cdnResUrl + "resource/assets/noload/barbg.png";
        this.bar.source = GlobalData.cdnResUrl + "resource/assets/noload/loadingbar.png";
        this.bg.source = GlobalData.cdnResUrl + "resource/assets/noload/loadingbg.jpg";
        this.t3.source = GlobalData.cdnResUrl + "resource/assets/noload/t3.png";
        this.loadingtip.source = GlobalData.cdnResUrl + "resource/assets/noload/loadingtip.png";
    };
    LoadingUI.prototype.childrenCreated = function () {
        window["hideDiv"]();
        this.setTouchEnabled();
        this.init();
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.CREATE_ROLE, this.connectSucc.bind(this));
        //EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.LOGIN_REG_ROLE, this.loginRegSucc.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.HIDE_LOADING_TXT, this.hideTxt.bind(this));
        //this.txtTips.text = "正在连接服务器...";
        this.loadingtip.visible = true;
        egret.Tween.get(this.t3).to({ alpha: 0, y: 700 }, 2000).call(this.play1.bind(this));
        this.txtTishi.text = RandomUtils.randomArray(this.arr);
    };
    LoadingUI.prototype.hideTxt = function () {
        this.loadingtip.visible = false;
        GlobalData.user = new UserInfo();
        if (GlobalData.userfrom == PlatformData.USER_FROM_WEIXIN) {
            if (window["isWeiXin"]()) {
                var obj = JSON.parse(localStorage.getItem('wxopeniddata'));
                GlobalData.openid = obj.openid;
                GlobalData.user.nickname = obj.nickname;
                GlobalData.user.headurl = obj.headimgurl;
                GlobalData.user.sex = obj.sex + "";
                Net.login();
            }
            else {
                this.autoLogin();
            }
        }
        else if (GlobalData.userfrom == PlatformData.USER_FROM_PLATFORM) {
            if (GlobalData.platform == PlatformData.PLATFORM_MENGDOU) {
                this.mengdouLogin();
            }
            else if (GlobalData.platform == PlatformData.PLATFORM_QUNHEI) {
                var uuid = QuickManage.$GET("username");
                if (uuid == "") {
                    alert("获取用户信息失败!");
                    window.history.go(-1);
                }
                else {
                    GlobalData.openid = uuid;
                    GlobalData.user.nickname = QuickManage.$GET("nname");
                    GlobalData.user.headurl = QuickManage.$GET("uimg");
                    GlobalData.user.sex = "0";
                    Net.login();
                }
            }
            else if (GlobalData.platform == PlatformData.PLATFORM_YOUXIDOU) {
                var uuid = QuickManage.$GET("token");
                if (uuid == "") {
                    alert("获取用户信息失败!");
                    window.history.go(-1);
                }
                else {
                    window["getPayInfo"]("http://" + GlobalData.connectIP + ":3000/getUserInfo.nd?token=" + uuid, {}, this.getYxdUser.bind(this));
                }
            }
        }
    };
    LoadingUI.prototype.getYxdUser = function (r) {
        var data = JSON.parse(r);
        if (data == "fail") {
            alert("获取用户信息失败2!");
        }
        else {
            GlobalData.openid = data.open_id;
            GlobalData.user.sex = "0";
            GlobalData.user.nickname = data.name;
            GlobalData.user.headurl = data.avatar;
            Net.login();
        }
    };
    LoadingUI.prototype.mengdouLogin = function () {
        GlobalData.openid = QuickManage.$GET("uid");
        GlobalData.user.headurl = "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46";
        GlobalData.user.sex = "0"; //值为1时是男性，值为2时是女性，值为0时是未知
        Net.login();
    };
    LoadingUI.prototype.autoLogin = function () {
        GlobalData.openid = localStorage.getItem("uuid");
        GlobalData.user.headurl = "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46";
        GlobalData.user.sex = "0"; //值为1时是男性，值为2时是女性，值为0时是未知
        Net.login();
    };
    LoadingUI.prototype.play1 = function () {
        this.tt = egret.setTimeout(this.play2.bind(this), this, 1000);
        this.txtTishi.text = RandomUtils.randomArray(this.arr);
    };
    LoadingUI.prototype.play2 = function () {
        egret.clearTimeout(this.tt);
        this.t3.y = 720;
        egret.Tween.get(this.t3).to({ alpha: 1 }, 300).call(this.play3.bind(this));
    };
    LoadingUI.prototype.play3 = function () {
        this.txtTishi.text = RandomUtils.randomArray(this.arr);
        egret.clearTimeout(this.tt);
        egret.Tween.get(this.t3).to({ alpha: 0, y: 700 }, 2000).call(this.play1.bind(this));
    };
    LoadingUI.prototype.connectSucc = function (data) {
        //console.log(JSON.stringify(data.param))
        GlobalData.isSign = data.param.sign;
        GlobalData.user.nickname = data.param.name;
        GlobalData.user.gold = data.param.gold;
        GlobalData.account = data.param.account;
        GlobalData.user.headurl = data.param.headurl;
        GlobalData.user.quan = data.param.quan;
        GlobalData.user.vip = data.param.vip;
        GlobalData.user.taskstate = data.param.taskstate;
        GlobalData.user.emailstate = data.param.emailstate;
        GlobalData.user.isOneLogin = data.param.isOneLogin;
        GlobalData.user.hasRecharge = data.param.hasRecharge;
        GlobalData.user.sex = data.param.sex;
        GlobalData.isComplete = true;
        this.loadingtip.visible = false;
        var stt = GlobalData.user.headurl.split("_")[0];
        if (stt == "nan" || stt == "nv") {
            GlobalData.user.headurl = GlobalData.configData.data.headurl + GlobalData.user.headurl + ".png";
        }
        if (GlobalData.isLoadingResCom) {
            this.dispose();
            GameManage.init();
        }
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        var val = (current / total) * 100;
        this.txtTips.text = Math.floor(val) + "%";
        this.bar.width = current * 441 / total;
        this.bar.x = 104;
        if (current == total) {
            GlobalData.isLoadingResCom = true;
            if (GlobalData.isComplete) {
                this.dispose();
                GameManage.init();
            }
        }
    };
    LoadingUI.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        this.removeChildren();
    };
    LoadingUI.prototype.init = function () {
        if (GlobalData.isDebug == false) {
            GlobalData.connectIP = GlobalData.configData.data.connectIP;
        }
        Net.connectServer();
        GlobalData.isLoadingResCom = false;
    };
    LoadingUI.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return LoadingUI;
}(eui.Component));
__reflect(LoadingUI.prototype, "LoadingUI", ["fany.IDispose"]);
