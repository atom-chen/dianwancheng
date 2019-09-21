var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopPanel = (function (_super) {
    __extends(ShopPanel, _super);
    function ShopPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/shop/ShopPanelSkin.exml";
        return _this;
    }
    ShopPanel.prototype.childrenCreated = function () {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnVip, egret.TouchEvent.TOUCH_TAP, this.onTouchVip.bind(this));
        Net.sendNeedSave(Protocol.GET_SHOP_LIST, {}, this.shoplistcallback.bind(this), "shoplist");
    };
    ShopPanel.prototype.gogo = function () {
        this.zhuan.rotation += 8;
    };
    ShopPanel.prototype.shoplistcallback = function (r) {
        if (r.code == 200) {
            this.clearItems();
            var list = r.list;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("ShopItemPanel");
                item.y = i * 95;
                this.itemGroup.addChild(item);
                item.setData({ id: list[i]._id, name: list[i].name, desc: list[i].desc, price: parseInt(list[i].rmb) / 100, icon: "shop.item" + i, price2: list[i].rmb });
                this.arr.push(item);
            }
        }
    };
    ShopPanel.prototype.clearItems = function () {
        var lenn = this.arr.length;
        for (var i = 0; i < lenn; i++) {
            if (this.arr[i]) {
                if (this.arr[i].parent) {
                    this.arr[i].parent.removeChild(this.arr[i]);
                }
                ObjManage.addObj("ShopItemPanel", this.arr[i]);
            }
        }
        this.arr = [];
    };
    ShopPanel.prototype.onTouchVip = function () {
        PanelManage.openVip();
    };
    ShopPanel.prototype.dispose = function () {
        if (!GlobalData.isHasShowActive) {
            PanelManage.openActive();
        }
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ShopPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ShopPanel;
}(eui.Component));
__reflect(ShopPanel.prototype, "ShopPanel", ["fany.IDispose"]);
