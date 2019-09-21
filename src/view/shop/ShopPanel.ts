class ShopPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/shop/ShopPanelSkin.exml";
    }
    private btnClose: eui.Image;
    private itemGroup: eui.Group;
    private arr: Array<any>;
    private btnVip: eui.Image;
    private zhuan: eui.Image;
    private closeRect: eui.Rect;
    protected childrenCreated(): void {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnVip, egret.TouchEvent.TOUCH_TAP, this.onTouchVip.bind(this));
        Net.sendNeedSave(Protocol.GET_SHOP_LIST, {}, this.shoplistcallback.bind(this), "shoplist");
    }
    public gogo(): void {
        this.zhuan.rotation += 8;
    }
    private shoplistcallback(r): void {
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
    }
    private clearItems(): void {
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
    }

    private onTouchVip(): void {
        PanelManage.openVip();
    }

    public dispose(): void {
        if (!GlobalData.isHasShowActive) {
            PanelManage.openActive();
        }
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}