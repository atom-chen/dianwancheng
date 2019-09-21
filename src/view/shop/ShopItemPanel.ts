class ShopItemPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/shop/ShopItemPanelSkin.exml";
    }
    private txtPrice: eui.Label;
    private txtName: eui.Label;
    private txtDesc: eui.Label;
    private icon: eui.Image;
    private btnChong: eui.Image;
    private shopid: string;
    private price: string = "";
    protected childrenCreated(): void {
        EventManage.addButtonEvent(this, this.btnChong, egret.TouchEvent.TOUCH_TAP, this.btnChongHandle.bind(this));
    }
    private btnChongHandle(): void {
        PayManage.getInstance().pay(this.shopid, this.txtName.text, this.price);
    }
    public setData(data): void {
        this.shopid = data.id + "";
        this.txtPrice.text = data.price + "元";
        this.txtName.text = data.name;
        this.txtDesc.text = data.desc;
        this.icon.source = data.icon;
        this.price = data.price2 + "";
    }
    public dispose(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}