class LoginPanel extends eui.Component implements fany.IDispose {
    private regGroup: eui.Group;
    private loginGroup: eui.Group;
    private quickGroup: eui.Group;
    private btnTongxingzheng: eui.Image;
    private btnQuick: eui.Image;
    private btnCloseLogin: eui.Image;

    private btnLoginTrue: eui.Image;
    private txtUserLogin: eui.EditableText;
    private txtMimaLogin: eui.EditableText;
    private btnRegGroup: eui.Image;

    private btnRegTrue: eui.Image;
    private txtUser: eui.EditableText;
    private txtMima: eui.EditableText;
    private txtMima2: eui.EditableText;
    private btnBack: eui.Image;

    private isClickQuick: boolean = false;
    private isClickLogin: boolean = false;
    private isClickReg: boolean = false;
    private flag: boolean = false;
    private txtTips: eui.Label;
    constructor(flag) {
        super();
        this.skinName = "resource/skins/login/LoginPanelSkin.exml";
        this.flag = flag;
    }
    protected childrenCreated(): void {
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
    }
    private btnRegTrueHandle(): void {
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
        } else {
            if (fany.SocketManage.isConnect == true) {
                if (this.isClickReg == false) {
                    this.isClickReg = true;
                    var url = GlobalData.configData.data.regapi+"?service=user.register&username=" + this.txtUser.text + "&pwd=" + this.txtMima.text + "&from=" + GlobalData.platform + "&token=" + GlobalData.openid;
                    window["regLogin"](url, {}, this.regback.bind(this));
                    //Net.send(Protocol.GAME_REG, { username: this.txtUser.text, password: this.txtMima.text, pid: "@" + GlobalData.platform }, this.regback.bind(this));
                } else {
                    TipsManage.showTips("请勿频繁操作!");
                }
            } else {
                TipsManage.showTips("请等待服务器连接。。。!");
            }
        }
    }
    private btnLoginTrueHandle(): void {
        if (this.txtMimaLogin.text == "" || this.txtMimaLogin.text.length > 20 || this.txtMimaLogin.text.length < 2) {
            TipsManage.showTips("请输入有效密码!");
            return;
        }
        if (this.txtUserLogin.text == "" || this.txtUserLogin.text.length > 20 || this.txtUserLogin.text.length < 2) {
            TipsManage.showTips("请输入有效用户名!");
        } else {
            if (fany.SocketManage.isConnect == true) {
                if (this.isClickLogin == false) {
                    var url = GlobalData.configData.data.regapi+"?service=user.login&username=" + this.txtUserLogin.text + "&pwd=" + this.txtMimaLogin.text;
                    window["regLogin"](url, {}, this.loginback.bind(this));
                    // Net.send(Protocol.GAME_USER_LOGIN, { username: this.txtUserLogin.text, password: this.txtMimaLogin.text, pid: "@" + GlobalData.platform }, this.loginback.bind(this));
                    this.isClickLogin = true;
                } else {
                    TipsManage.showTips("请勿频繁操作!");
                }
            } else {
                TipsManage.showTips("请等待服务器连接。。。!");
            }
        }
    }
    private loginback(r): void {
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
            } else {
                if (r.data.code == 203) {
                    TipsManage.showTips("用户名或密码错误!");
                } else if (r.data.code == 202) {
                    TipsManage.showTips("用户名不存在!");
                } else {
                    TipsManage.showTips("系统错误!");
                }
            }
        } else {
            TipsManage.showTips("系统错误!");
        }
    }
    private regback(r): void {
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
            } else {
                if (r.data.code == 201) {
                    TipsManage.showTips("用户名已存在!");
                } else {
                    TipsManage.showTips("系统错误!");
                }
            }
        } else {
            TipsManage.showTips("系统错误!");
        }
    }
    private btnRegGroupHandle(): void {
        this.quickGroup.visible = false;
        this.loginGroup.visible = false;
        this.regGroup.visible = true;
    }
    private btnTongxingzhengHandle(): void {
        this.quickGroup.visible = false;
        this.loginGroup.visible = true;
        this.regGroup.visible = false;
    }
    private btnCloseLoginHandle(): void {
        this.quickGroup.visible = true;
        this.loginGroup.visible = false;
        this.regGroup.visible = false;
    }
    private btnQuickHandle(): void {
        if (this.flag == true) {
            TipsManage.showTips("请点击通行证登陆!");
            return;
        }
        GlobalData.openid = localStorage.getItem("uuid");
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.LOGIN_REG_ROLE));
        this.dispose();
    }
    public dispose(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}