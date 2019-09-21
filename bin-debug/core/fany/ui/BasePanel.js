var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基础面板
 * @author  fany
 *
 */
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel() {
        return _super.call(this) || this;
    }
    BasePanel.prototype.childrenCreated = function () {
        this.setTouchEnabled();
    };
    BasePanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    BasePanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return BasePanel;
}(eui.Component));
__reflect(BasePanel.prototype, "BasePanel", ["fany.IDispose"]);
