var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DaShangTips = (function (_super) {
    __extends(DaShangTips, _super);
    function DaShangTips(data) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/dashang/DashangTipSkin.exml";
        _this.data = data;
        return _this;
    }
    DaShangTips.prototype.childrenCreated = function () {
        this.labName.text = this.data.name;
        this.labMoney.text = QuickManage.moneyStr(parseInt(this.data.gold));
        GlobalData.user.gold = parseInt(GlobalData.user.gold) + this.data.gold;
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.onTouchSure.bind(this));
        EventManage.addEvent(this, this, egret.TouchEvent.TOUCH_TAP, this.onTouchSure.bind(this));
    };
    DaShangTips.prototype.onTouchSure = function () {
        this.dispose();
    };
    DaShangTips.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    DaShangTips.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return DaShangTips;
}(eui.Component));
__reflect(DaShangTips.prototype, "DaShangTips", ["fany.IDispose"]);
