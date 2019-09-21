var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EmailItemPanel = (function (_super) {
    __extends(EmailItemPanel, _super);
    function EmailItemPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/email/EmailItemPanelSkin.exml";
        return _this;
    }
    EmailItemPanel.prototype.childrenCreated = function () {
    };
    EmailItemPanel.prototype.setData = function (data) {
        this.labName.text = data.sname;
        this.labDesc.text = data.title;
        this.labTime.text = (new Date(data._id)).toLocaleString();
    };
    EmailItemPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    EmailItemPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return EmailItemPanel;
}(eui.Component));
__reflect(EmailItemPanel.prototype, "EmailItemPanel", ["fany.IDispose"]);
