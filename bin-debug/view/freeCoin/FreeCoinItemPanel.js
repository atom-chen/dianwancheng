var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FreeCoinItemPanel = (function (_super) {
    __extends(FreeCoinItemPanel, _super);
    function FreeCoinItemPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/freeCoin/FreeCoinItemSkin.exml";
        return _this;
    }
    FreeCoinItemPanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnGet, egret.TouchEvent.TOUCH_TAP, this.btnGetHandle.bind(this));
    };
    FreeCoinItemPanel.prototype.btnGetHandle = function () {
        if (this.func) {
            this.func();
        }
    };
    FreeCoinItemPanel.prototype.setData = function (data) {
        this.labTitle.text = data.title;
        this.labInfo.text = data.info;
        this.btnGet.source = data.res;
        this.func = data.func;
    };
    FreeCoinItemPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    FreeCoinItemPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return FreeCoinItemPanel;
}(eui.Component));
__reflect(FreeCoinItemPanel.prototype, "FreeCoinItemPanel", ["fany.IDispose"]);
