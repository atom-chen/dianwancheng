var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var ClownHelpPanel = (function (_super) {
    __extends(ClownHelpPanel, _super);
    function ClownHelpPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/skins/clown/ClownHelpSkin.exml';
        return _this;
    }
    ClownHelpPanel.prototype.childrenCreated = function () {
        EventManage.addEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
    };
    ClownHelpPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    return ClownHelpPanel;
}(eui.Component));
__reflect(ClownHelpPanel.prototype, "ClownHelpPanel");
