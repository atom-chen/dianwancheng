var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginPanel = (function (_super) {
    __extends(LoginPanel, _super);
    function LoginPanel(flag) {
        var _this = _super.call(this) || this;
        _this.isClickQuick = false;
        _this.isClickLogin = false;
        _this.isClickReg = false;
        _this.flag = false;
        _this.skinName = "resource/skins/login/LoginPanelSkin.exml";
        _this.flag = flag;
        return _this;
    }
    LoginPanel.prototype.childrenCreated = function () {
        this.setTouchEnabled();
        EventManage.addButtonEvent(this, this.btnTongxingzheng, egret.TouchEvent.TOUCH_TAP, this.btnTongxingzhengHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnQuick, egret.TouchEvent.TOUCH_TAP, this.btnQuickHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnLoginTrue, egret.TouchEvent.TOUCH_TAP, this.btnLoginTrueHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnRegGroup, egret.TouchEvent.TOUCH_TAP, this.btnRegGroupHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnCloseLogin, egret.TouchEvent.TOUCH_TAP, this.btnCloseLoginHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnRegTrue, egret.TouchEvent.TOUCH_TAP, this.btnRegTrueHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnBack, egret.TouchEvent.TOUCH_TAP, this.btnTongxingzhengHandle.bind(this));
        this.txtTips.visible = false;
        if (this.flag == true) {
            this.txtTips.visible = true;
            this.btnBack.visible = false;
            this.btnRegGroupHandle();
        }
    };
    LoginPanel.prototype.btnRegTrueHandle = function () {
        if (this.txtMima.text == "" || this.txtMima.text.length > 20 || this.txtMima.text.length < 2) {
            TipsManage.showTips("请输入有效密码!");
            return;
        }
        if (this.txtMima2.text == "" || this.txtMima2.text.length > 20 || this.txtMima2.text.length < 2) {
            TipsManage.showTips("请输入有效密码!");
            return;
        }
        if (this.txtMima2.text != this.txtMima.text) {
            TipsManage.showTips("两次密码不一致!");
            return;
        }
        if (this.txtUser.text == "" || this.txtUser.text.length > 20 || this.txtUser.text.length < 2) {
            TipsManage.showTips("请输入有效用户名!");
        }
        else {
            if (fany.SocketManage.isConnect == true) {
                if (this.isClickReg == false) {
                    this.isClickReg = true;
                    var url = GlobalData.configData.data.regapi + "?service=user.register&username=" + this.txtUser.text + "&pwd=" + this.txtMima.text + "&from=" + GlobalData.platform + "&token=" + GlobalData.openid;
                    window["regLogin"](url, {}, this.regback.bind(this));
                }
                else {
                    TipsManage.showTips("请勿频繁操作!");
                }
            }
            else {
                TipsManage.showTips("请等待服务器连接。。。!");
            }
        }
    };
    LoginPanel.prototype.btnLoginTrueHandle = function () {
        if (this.txtMimaLogin.text == "" || this.txtMimaLogin.text.length > 20 || this.txtMimaLogin.text.length < 2) {
            TipsManage.showTips("请输入有效密码!");
            return;
        }
        if (this.txtUserLogin.text == "" || this.txtUserLogin.text.length > 20 || this.txtUserLogin.text.length < 2) {
            TipsManage.showTips("请输入有效用户名!");
        }
        else {
            if (fany.SocketManage.isConnect == true) {
                if (this.isClickLogin == false) {
                    var url = GlobalData.configData.data.regapi + "?service=user.login&username=" + this.txtUserLogin.text + "&pwd=" + this.txtMimaLogin.text;
                    window["regLogin"](url, {}, this.loginback.bind(this));
                    // Net.send(Protocol.GAME_USER_LOGIN, { username: this.txtUserLogin.text, password: this.txtMimaLogin.text, pid: "@" + GlobalData.platform }, this.loginback.bind(this));
                    this.isClickLogin = true;
                }
                else {
                    TipsManage.showTips("请勿频繁操作!");
                }
            }
            else {
                TipsManage.showTips("请等待服务器连接。。。!");
            }
        }
    };
    LoginPanel.prototype.loginback = function (r) {
        this.isClickLogin = false;
        this.isClickReg = false;
        if (r.ret == 200) {
            if (r.data.code == 200) {
                TipsManage.showTips("登陆成功!");
                GlobalData.openid = r.data.token;
                console.log("openid=" + GlobalData.openid);
                lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.LOGIN_REG_ROLE));
                GlobalData.isLogin = true;
                this.dispose();
            }
            else {
                if (r.data.code == 203) {
                    TipsManage.showTips("用户名或密码错误!");
                }
                else if (r.data.code == 202) {
                    TipsManage.showTips("用户名不存在!");
                }
                else {
                    TipsManage.showTips("系统错误!");
                }
            }
        }
        else {
            TipsManage.showTips("系统错误!");
        }
    };
    LoginPanel.prototype.regback = function (r) {
        this.isClickLogin = false;
        this.isClickReg = false;
        if (r.ret == 200) {
            if (r.data.code == 200) {
                TipsManage.showTips("注册成功!");
                GlobalData.openid = r.data.token;
                console.log("openid=" + GlobalData.openid);
                lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.LOGIN_REG_ROLE));
                GlobalData.isLogin = true;
                this.dispose();
                if (this.flag == true) {
                    PanelManage.openShop();
                    return;
                }
            }
            else {
                if (r.data.code == 201) {
                    TipsManage.showTips("用户名已存在!");
                }
                else {
                    TipsManage.showTips("系统错误!");
                }
            }
        }
        else {
            TipsManage.showTips("系统错误!");
        }
    };
    LoginPanel.prototype.btnRegGroupHandle = function () {
        this.quickGroup.visible = false;
        this.loginGroup.visible = false;
        this.regGroup.visible = true;
    };
    LoginPanel.prototype.btnTongxingzhengHandle = function () {
        this.quickGroup.visible = false;
        this.loginGroup.visible = true;
        this.regGroup.visible = false;
    };
    LoginPanel.prototype.btnCloseLoginHandle = function () {
        this.quickGroup.visible = true;
        this.loginGroup.visible = false;
        this.regGroup.visible = false;
    };
    LoginPanel.prototype.btnQuickHandle = function () {
        if (this.flag == true) {
            TipsManage.showTips("请点击通行证登陆!");
            return;
        }
        GlobalData.openid = localStorage.getItem("uuid");
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.LOGIN_REG_ROLE));
        this.dispose();
    };
    LoginPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    LoginPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return LoginPanel;
}(eui.Component));
__reflect(LoginPanel.prototype, "LoginPanel", ["fany.IDispose"]);
