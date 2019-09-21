class ZhuangListItemPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/jinsha/ZhuangListItemPanelSkin.exml";
    }
    private txtNum: eui.Label;
    private txtVip: eui.Label;
    private txtName: eui.Label;
    private txtGold: eui.Label;
    protected childrenCreated(): void {
        // EventManage.addButtonEvent(this,this.btnClose,egret.TouchEvent.TOUCH_TAP,this.dispose.bind(this,8));
    }
    public setData(data): void {
        this.txtGold.text = QuickManage.moneyStr(parseInt(data.gold+""));
        this.txtName.text = data.name;
        this.txtNum.text = data.num;
        this.txtVip.text = "VIP"+data.vip;
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