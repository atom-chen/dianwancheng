
class FreeCoinItemPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/freeCoin/FreeCoinItemSkin.exml";
    }
    public labTitle: eui.Label;
    public labInfo: eui.Label;
    public btnGet: eui.Image;
    private func: Function;
    protected childrenCreated(): void {
        EventManage.addButtonEvent(this, this.btnGet, egret.TouchEvent.TOUCH_TAP, this.btnGetHandle.bind(this));
    }
    private btnGetHandle(): void {
        if (this.func) {
            this.func();
        }
    }
    public setData(data): void {
        this.labTitle.text = data.title;
        this.labInfo.text = data.info;
        this.btnGet.source = data.res;
        this.func = data.func;
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