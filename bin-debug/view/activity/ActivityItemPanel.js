var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActivityItemPanel = (function (_super) {
    __extends(ActivityItemPanel, _super);
    function ActivityItemPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/activity/ActivityItemSkin.exml";
        return _this;
    }
    ActivityItemPanel.prototype.childrenCreated = function () {
        //EventManage.addButtonEvent(this, this, egret.TouchEvent.TOUCH_TAP, this.click.bind(this));
    };
    ActivityItemPanel.prototype.setData = function (data) {
        this.txtStr.text = data.stt;
        this.icon.source = data.state;
    };
    ActivityItemPanel.prototype.click = function (flag) {
        if (flag) {
            if (this.bg.source != "hd.selected") {
                this.bg.source = "hd.selected";
            }
        }
        else {
            if (this.bg.source != "hd.noselect") {
                this.bg.source = "hd.noselect";
            }
        }
    };
    ActivityItemPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ActivityItemPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ActivityItemPanel;
}(eui.Component));
__reflect(ActivityItemPanel.prototype, "ActivityItemPanel", ["fany.IDispose"]);
