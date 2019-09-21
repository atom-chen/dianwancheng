var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ZhuangListItemPanel = (function (_super) {
    __extends(ZhuangListItemPanel, _super);
    function ZhuangListItemPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/jinsha/ZhuangListItemPanelSkin.exml";
        return _this;
    }
    ZhuangListItemPanel.prototype.childrenCreated = function () {
        // EventManage.addButtonEvent(this,this.btnClose,egret.TouchEvent.TOUCH_TAP,this.dispose.bind(this,8));
    };
    ZhuangListItemPanel.prototype.setData = function (data) {
        this.txtGold.text = QuickManage.moneyStr(parseInt(data.gold + ""));
        this.txtName.text = data.name;
        this.txtNum.text = data.num;
        this.txtVip.text = "VIP" + data.vip;
    };
    ZhuangListItemPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ZhuangListItemPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ZhuangListItemPanel;
}(eui.Component));
__reflect(ZhuangListItemPanel.prototype, "ZhuangListItemPanel", ["fany.IDispose"]);
