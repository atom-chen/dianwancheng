var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopItemPanel = (function (_super) {
    __extends(ShopItemPanel, _super);
    function ShopItemPanel() {
        var _this = _super.call(this) || this;
        _this.price = "";
        _this.skinName = "resource/skins/shop/ShopItemPanelSkin.exml";
        return _this;
    }
    ShopItemPanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnChong, egret.TouchEvent.TOUCH_TAP, this.btnChongHandle.bind(this));
    };
    ShopItemPanel.prototype.btnChongHandle = function () {
        PayManage.getInstance().pay(this.shopid, this.txtName.text, this.price);
    };
    ShopItemPanel.prototype.setData = function (data) {
        this.shopid = data.id + "";
        this.txtPrice.text = data.price + "元";
        this.txtName.text = data.name;
        this.txtDesc.text = data.desc;
        this.icon.source = data.icon;
        this.price = data.price2 + "";
    };
    ShopItemPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ShopItemPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ShopItemPanel;
}(eui.Component));
__reflect(ShopItemPanel.prototype, "ShopItemPanel", ["fany.IDispose"]);
