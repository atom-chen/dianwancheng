var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TeHuiPanel = (function (_super) {
    __extends(TeHuiPanel, _super);
    function TeHuiPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/tehui/TeHuiPanelSkin.exml";
        return _this;
    }
    TeHuiPanel.prototype.childrenCreated = function () {
        this.bg.source = GlobalData.cdnResUrl + "resource/assets/noload/noload.tehui.jpg";
        EventManage.addButtonEvent(this, this, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
    };
    TeHuiPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        PanelManage.openShop();
    };
    TeHuiPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return TeHuiPanel;
}(eui.Component));
__reflect(TeHuiPanel.prototype, "TeHuiPanel", ["fany.IDispose"]);
