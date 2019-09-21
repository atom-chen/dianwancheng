var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SetPanel = (function (_super) {
    __extends(SetPanel, _super);
    function SetPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/set/SetPanelSkin.exml";
        return _this;
    }
    SetPanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.btnCloseFn.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnOpenVoice, egret.TouchEvent.TOUCH_TAP, this.onTouchVoiceOpen.bind(this));
        EventManage.addButtonEvent(this, this.btnCloseVoice, egret.TouchEvent.TOUCH_TAP, this.onTouchVoiceClose.bind(this));
        EventManage.addButtonEvent(this, this.btnSubmit, egret.TouchEvent.TOUCH_TAP, this.onTouchSubmitAdvice.bind(this));
        EventManage.addEvent(this, this.txtVerson, egret.TouchEvent.TOUCH_TAP, this.onTouchtxtVerson.bind(this));
        this.txtVerson.text = "V:" + GlobalData.version;
        if (GlobalData.isMusic) {
            this.btnOpenVoice.visible = false;
            this.btnCloseVoice.visible = true;
        }
        else {
            this.btnOpenVoice.visible = true;
            this.btnCloseVoice.visible = false;
        }
    };
    SetPanel.prototype.onTouchtxtVerson = function () {
        localStorage.clear();
    };
    SetPanel.prototype.onTouchVoiceOpen = function () {
        this.btnOpenVoice.visible = false;
        this.btnCloseVoice.visible = true;
        GlobalData.isMusic = true;
        MusicManage.playBgMuisc();
    };
    SetPanel.prototype.onTouchVoiceClose = function () {
        this.btnOpenVoice.visible = true;
        this.btnCloseVoice.visible = false;
        GlobalData.isMusic = false;
        MusicManage.closeBgMuisc();
        MusicManage.closeMuisc();
    };
    SetPanel.prototype.onTouchSubmitAdvice = function () {
        if (this.labelAdvice.text == '') {
            TipsManage.showTips('提交的文字不能为空！');
        }
        else {
            Net.send(Protocol.HALL_SET_PROPOSAL, { proposal: this.labelAdvice.text }, this.adviceCB.bind(this));
        }
    };
    SetPanel.prototype.adviceCB = function (msg) {
        if (msg.code == 200) {
            TipsManage.showTips('感谢您的建议！');
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
        this.labelAdvice.text = '';
    };
    SetPanel.prototype.btnCloseFn = function () {
        this.dispose();
    };
    SetPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    SetPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return SetPanel;
}(eui.Component));
__reflect(SetPanel.prototype, "SetPanel", ["fany.IDispose"]);
