class ActivityItemPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivityItemSkin.exml";
    }

    public txtStr: eui.Label;
    public bg: eui.Image;
    public icon: eui.Image;

    protected childrenCreated(): void {
        //EventManage.addButtonEvent(this, this, egret.TouchEvent.TOUCH_TAP, this.click.bind(this));
    }

    public setData(data): void {
        this.txtStr.text = data.stt;
        this.icon.source=data.state;
    }

    public click(flag): void {
        if (flag) {
            if (this.bg.source != "hd.selected") {
                this.bg.source = "hd.selected";
            }
        } else {
            if (this.bg.source != "hd.noselect") {
                this.bg.source = "hd.noselect";
            }
        }
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