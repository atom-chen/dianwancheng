class DaShangTips extends eui.Component implements fany.IDispose {
    constructor(data) {
        super();
        this.skinName = "resource/skins/dashang/DashangTipSkin.exml";
        this.data = data;
    }

    private data;
    public labName: eui.Label;
    public labMoney: eui.Label;
    public btnSure: eui.Image;
    protected childrenCreated(): void {
        this.labName.text = this.data.name;
        this.labMoney.text = QuickManage.moneyStr(parseInt(this.data.gold));
        GlobalData.user.gold = parseInt(GlobalData.user.gold) + this.data.gold;
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.onTouchSure.bind(this));
        EventManage.addEvent(this, this, egret.TouchEvent.TOUCH_TAP, this.onTouchSure.bind(this));
    }

    private onTouchSure(): void {
        this.dispose();
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