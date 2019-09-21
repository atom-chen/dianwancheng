var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KeFuPanel = (function (_super) {
    __extends(KeFuPanel, _super);
    function KeFuPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/kefu/KeFuSkin.exml";
        return _this;
    }
    KeFuPanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        this.txtWeixin.text = "关注微信公众号:" + GlobalData.configData.huodong["weixin"];
    };
    KeFuPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    KeFuPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return KeFuPanel;
}(eui.Component));
__reflect(KeFuPanel.prototype, "KeFuPanel", ["fany.IDispose"]);
