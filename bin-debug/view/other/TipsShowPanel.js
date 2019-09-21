var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TipsShowPanel = (function (_super) {
    __extends(TipsShowPanel, _super);
    function TipsShowPanel() {
        var _this = _super.call(this) || this;
        //  指定当前类的皮肤名称
        _this.skinName = "resource/skins/other/TipsShowPanelSkin.exml";
        return _this;
    }
    TipsShowPanel.prototype.childrenCreated = function () {
        this.setTouchEnabled();
        this.touchChildren = false;
        this.touchEnabled = false;
    };
    TipsShowPanel.prototype.setStr = function (str) {
        this.txtNotice.text = str;
    };
    TipsShowPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        this.removeChildren();
    };
    TipsShowPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return TipsShowPanel;
}(eui.Component));
__reflect(TipsShowPanel.prototype, "TipsShowPanel", ["fany.IDispose"]);
