var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ServerErrorPanel = (function (_super) {
    __extends(ServerErrorPanel, _super);
    function ServerErrorPanel(str) {
        var _this = _super.call(this) || this;
        //  指定当前类的皮肤名称
        _this.skinName = "resource/skins/other/ServerErrorPanelSkin.exml";
        _this.notice = str;
        return _this;
    }
    ServerErrorPanel.prototype.childrenCreated = function () {
        egret.Tween.removeAllTweens();
        this.setTouchEnabled();
        this.txtNotice.text = this.notice;
        EventManage.addEvent(this, this, egret.TouchEvent.TOUCH_TAP, this.btnSureHandle.bind(this));
    };
    ServerErrorPanel.prototype.btnSureHandle = function () {
        this.dispose();
        window.location.reload();
    };
    ServerErrorPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        this.removeChildren();
    };
    ServerErrorPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ServerErrorPanel;
}(eui.Component));
__reflect(ServerErrorPanel.prototype, "ServerErrorPanel", ["fany.IDispose"]);
