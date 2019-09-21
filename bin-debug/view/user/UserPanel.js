var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserPanel = (function (_super) {
    __extends(UserPanel, _super);
    function UserPanel() {
        var _this = _super.call(this) || this;
        _this.selectImg = "";
        _this.sex = "";
        _this.skinName = "resource/skins/user/UserSkin.exml";
        return _this;
    }
    UserPanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.btnSureHandle.bind(this));
        for (var i = 1; i < 5; i++) {
            EventManage.addButtonEvent(this, this["nan_" + i], egret.TouchEvent.TOUCH_TAP, this.imgClick.bind(this, "nan_" + i));
            EventManage.addButtonEvent(this, this["nv_" + i], egret.TouchEvent.TOUCH_TAP, this.imgClick.bind(this, "nv_" + i));
            this["nan_" + i].source = GlobalData.configData.data.headurl + "nan_" + i + ".png";
            this["nv_" + i].source = GlobalData.configData.data.headurl + "nv_" + i + ".png";
        }
    };
    UserPanel.prototype.imgClick = function (stt) {
        for (var i = 1; i < 5; i++) {
            this["nan_" + i].scaleX = 1;
            this["nan_" + i].scaleY = 1;
            this["nv_" + i].scaleX = 1;
            this["nv_" + i].scaleY = 1;
        }
        this[stt].scaleX = 1.1;
        this[stt].scaleY = 1.1;
        this.selectImg = stt;
        if (stt.split("_")[0] == "nan") {
            this.sex = "1";
        }
        else {
            this.sex = "2";
        }
    };
    UserPanel.prototype.btnSureHandle = function () {
        if (this.txtUserName.text == "") {
            TipsManage.showTips("昵称不能为空!");
            return;
        }
        if (this.txtUserName.text.length > 6) {
            TipsManage.showTips("昵称太长!");
            return;
        }
        if (this.selectImg == "") {
            TipsManage.showTips("请选择一个头像!");
            return;
        }
        Net.send(Protocol.UPDATE_NAME, { sex: this.sex, name: this.txtUserName.text, headurl: this.selectImg }, this.updateCallBack.bind(this));
    };
    UserPanel.prototype.updateCallBack = function (r) {
        if (r.code == 200) {
            TipsManage.showTips("修改成功!");
            GlobalData.user.nickname = this.txtUserName.text;
            GlobalData.user.sex = this.sex;
            GlobalData.user.headurl = GlobalData.configData.data.headurl + this.selectImg + ".png";
            PanelManage.hall.updateHeadurl();
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    };
    UserPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    UserPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return UserPanel;
}(eui.Component));
__reflect(UserPanel.prototype, "UserPanel", ["fany.IDispose"]);
